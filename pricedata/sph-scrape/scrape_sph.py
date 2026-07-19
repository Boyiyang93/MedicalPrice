#!/usr/bin/env python3
"""Scrape St. Paul's Hospital (SPH) fee data from stpaul.org.hk."""

from __future__ import annotations

import json
import re
import sys
import urllib.parse
import urllib.request
from html import unescape
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent
PDF_DIR = ROOT / "pdfs"
PARSED_DIR = ROOT / "parsed"
PAGES_DIR = ROOT / "pages"
PYDEPS = ROOT / "_pydeps"
BASE = "https://www.stpaul.org.hk"

sys.path.insert(0, str(PYDEPS))
import fitz  # noqa: E402

CHARGE_PAGES = {
    "charges": f"{BASE}/tc/charges",
    "room-charge": f"{BASE}/tc/charges/room-charge",
    "24h-outpatient": f"{BASE}/tc/charges/detail/24-hour-outpatient-department-general",
    "radiology": f"{BASE}/tc/charges/detail/radiology-department",
    "endoscopy": f"{BASE}/tc/charges/detail/endoscopy-centre",
    "operating-theatre": f"{BASE}/tc/charges/detail/operating-theatre",
    "specialist-outpatient": f"{BASE}/tc/charges/detail/specialist-outpatient-department",
    "surgery-centre": f"{BASE}/tc/charges/detail/surgery-centre",
    "reference-procedures": f"{BASE}/tc/charges/reference-charges-for-common-procedures",
}


def all_charge_pages() -> dict[str, str]:
    pages = dict(CHARGE_PAGES)
    main = fetch(pages["charges"]).decode("utf-8", "ignore")
    for url in sorted(set(re.findall(r"href=(https://www\.stpaul\.org\.hk/tc/charges/detail/[^\s>\"]+)", main))):
        slug = url.rsplit("/", 1)[-1]
        pages.setdefault(slug, url)
    return pages

PDF_URLS = {
    "HistoricalBill2025CHT.pdf": f"{BASE}/storage/media/Charges/Reference Charges For Common Procedures Page/HistoricalBill2025CHT.pdf",
    "HistoricalBill2025EN.pdf": f"{BASE}/storage/media/Charges/Reference Charges For Common Procedures Page/HistoricalBill2025EN.pdf",
}


def fetch(url: str) -> bytes:
    parts = urllib.parse.urlsplit(url)
    safe_path = urllib.parse.quote(parts.path, safe="/%")
    safe_url = urllib.parse.urlunsplit((parts.scheme, parts.netloc, safe_path, parts.query, parts.fragment))
    req = urllib.request.Request(safe_url, headers={"User-Agent": "MedicalPrice-scraper/1.0"})
    with urllib.request.urlopen(req, timeout=60) as resp:
        return resp.read()


def discover_pdfs() -> dict[str, str]:
    found = dict(PDF_URLS)
    main = fetch(CHARGE_PAGES["charges"]).decode("utf-8", "ignore")
    detail_urls = set(re.findall(r"href=(https://www\.stpaul\.org\.hk/tc/charges/detail/[^\s>\"]+)", main))
    for url in sorted(detail_urls):
        try:
            page = fetch(url).decode("utf-8", "ignore")
        except Exception:
            continue
        for m in re.findall(r'href="([^"]+\.pdf[^"]*)"', page, re.I):
            full = urllib.parse.urljoin(url, m)
            name = Path(urllib.parse.unquote(full.split("?")[0])).name
            if "Identification Documents" in name:
                continue
            if "Charges" in full or "Historical" in name or "Health Checkup" in name:
                found[name] = full
    return found


def strip_html(html: str) -> str:
    html = re.sub(r"(?is)<script.*?>.*?</script>", " ", html)
    html = re.sub(r"(?is)<style.*?>.*?</style>", " ", html)
    html = re.sub(r"(?is)<br\s*/?>", "\n", html)
    html = re.sub(r"(?is)</tr>", "\n", html)
    html = re.sub(r"(?is)</t[dh]>", "\t", html)
    html = re.sub(r"<[^>]+>", " ", html)
    html = unescape(html)
    html = html.replace("\xa0", " ")
    lines = [re.sub(r"\s+", " ", ln).strip() for ln in html.splitlines()]
    return "\n".join(ln for ln in lines if ln)


def extract_charges_section(html: str) -> str:
    m = re.search(r'id="charges-detail".*?(id="charges-detail-other"|class="footer-b")', html, re.S)
    if m:
        return strip_html(m.group(0))
    m = re.search(r'class="content-table-container".*?class="footer-b"', html, re.S)
    if m:
        return strip_html(m.group(0))
    return strip_html(html)


def parse_table_prices(text: str, row_label: str) -> list[str]:
    for line in text.splitlines():
        if row_label in line:
            return re.findall(r"\$[\d,]+", line)
    return []


def pdf_to_text(path: Path) -> str:
    doc = fitz.open(path)
    parts = []
    for i, page in enumerate(doc):
        parts.append(f"--- page {i + 1} ---\n{page.get_text()}")
    doc.close()
    return "\n".join(parts)


def parse_historical_bill_tables(pdf_path: Path) -> list[dict]:
    doc = fitz.open(pdf_path)
    rows: list[dict] = []
    current: dict | None = None

    def to_int(val: str | None) -> int | None:
        if not val or val in {"不適用", "-", "N/A"}:
            return None
        val = val.replace(",", "").strip()
        return int(val) if val.isdigit() else None

    for page in doc:
        for table in page.find_tables().tables:
            data = table.extract()
            for row in data[1:]:
                proc, discharges, los, percentile, doctor, hospital, total = row
                if proc:
                    current = {
                        "procedure": proc.strip(),
                        "discharges": discharges,
                        "avg_los": los,
                        "inpatient": {},
                        "day_surgery": {},
                    }
                    rows.append(current)
                if not current:
                    continue
                bucket = "day_surgery" if los == "日間手術" else "inpatient"
                if percentile not in {"50分位數", "90分位數"}:
                    continue
                key = "p50" if percentile == "50分位數" else "p90"
                current.setdefault(bucket, {})[key] = {
                    "doctor": to_int(doctor),
                    "hospital": to_int(hospital),
                    "total": to_int(total),
                }
    doc.close()
    return rows


def historical_highlights(rows: list[dict]) -> list[dict]:
    names = [
        "乳房腫塊切除術",
        "腹腔鏡膽囊切除術",
        "痔瘡切除術",
        "結腸鏡",
        "胃鏡",
        "全膝關節置換術",
        "扁桃體切除術",
        "自然分娩",
        "剖腹產",
        "剖腹取嬰術",
        "子宮肌瘤切除術",
        "疝氣修補術",
    ]
    out = []
    for row in rows:
        if not any(n in row["procedure"] for n in names):
            continue
        p50 = (row.get("inpatient") or {}).get("p50") or {}
        mode = "inpatient"
        if not p50.get("total"):
            p50 = (row.get("day_surgery") or {}).get("p50") or {}
            mode = "day_surgery"
        out.append(
            {
                "procedure": row["procedure"],
                "avg_los": row.get("avg_los"),
                "total_p50": p50.get("total"),
                "hospital_p50": p50.get("hospital"),
                "doctor_p50": p50.get("doctor"),
                "mode": mode,
            }
        )
    return out


def main() -> None:
    PDF_DIR.mkdir(parents=True, exist_ok=True)
    PARSED_DIR.mkdir(parents=True, exist_ok=True)
    PAGES_DIR.mkdir(parents=True, exist_ok=True)

    pdf_map = discover_pdfs()
    downloaded = {}
    for name, url in sorted(pdf_map.items()):
        dest = PDF_DIR / name
        try:
            data = fetch(url)
            if not data.startswith(b"%PDF"):
                print(f"skip non-pdf: {name}")
                continue
            dest.write_bytes(data)
            downloaded[name] = url
            print(f"downloaded {name} ({len(data)} bytes)")
        except Exception as exc:
            print(f"failed {name}: {exc}")

    page_texts = {}
    charge_pages = all_charge_pages()
    for slug, url in charge_pages.items():
        html = fetch(url).decode("utf-8", "ignore")
        (PAGES_DIR / f"{slug}.html").write_text(html, encoding="utf-8")
        page_texts[slug] = extract_charges_section(html)
        (PARSED_DIR / f"{slug}.txt").write_text(page_texts[slug], encoding="utf-8")
        print(f"saved page {slug}")

    for name in downloaded:
        txt = pdf_to_text(PDF_DIR / name)
        stem = Path(name).stem
        (PARSED_DIR / f"{stem}.txt").write_text(txt, encoding="utf-8")

    room = page_texts.get("room-charge", "")
    outpatient = page_texts.get("24h-outpatient", "")
    radiology = page_texts.get("radiology", "")

    hist_rows = []
    hist_path = PDF_DIR / "HistoricalBill2025CHT.pdf"
    if hist_path.exists():
        hist_rows = parse_historical_bill_tables(hist_path)

    highlights = historical_highlights(hist_rows)

    key_prices = {
        "hospital_id": "sph",
        "hospital_name": "聖保祿醫院",
        "source": CHARGE_PAGES["charges"],
        "effective": {
            "room_charges": "2025-12-11",
            "service_charges": "2026-07-16",
            "historical_bill": "2025",
        },
        "ward_daily": {
            "standard": {"min": 760, "max": 900, "note": "標準房三至四人"},
            "semi_private": {"min": 1380, "max": 1480, "note": "半私家房二人"},
            "private": {"min": 3800, "max": 4880, "note": "私家房"},
            "day_standard": 400,
            "day_private": 2000,
        },
        "outpatient_gp": {
            "regular_8_20": 280,
            "sunday_holiday_8_20": 350,
            "night_20_8": 430,
            "night_sunday_holiday_20_8": 470,
        },
        "imaging": {
            "ct_brain_plain": {
                "standard": 2400,
                "semi_private": 3000,
                "private": 3900,
                "outpatient": 2400,
            },
            "ct_brain_contrast": {
                "standard": 4300,
                "semi_private": 5400,
                "private": 7000,
                "outpatient": 4300,
            },
            "mri_brain_plain": {
                "standard": 6430,
                "semi_private": 8040,
                "private": 10290,
                "outpatient": 6430,
            },
            "mri_brain_contrast": {
                "standard": 9940,
                "semi_private": 12430,
                "private": 15910,
                "outpatient": 9940,
            },
        },
        "historical_surgery_highlights": highlights,
        "pdfs": downloaded,
        "notes": [
            "病房/門診/放射等主要收费以官网 HTML 表格发布（非 PDF）；已存 pages/ 与 parsed/*.txt",
            "CT 腦部私家房原页 $7,000/$3,900 疑似平扫/显影列颠倒，key-prices 已按价阶校正",
            "医生费、麻醉费另计；历史账单为 2025 标准房总收费统计",
        ],
    }

    (PARSED_DIR / "key-prices.json").write_text(
        json.dumps(key_prices, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )

    if hist_rows:
        (PARSED_DIR / "historical-procedures-2025.json").write_text(
            json.dumps(hist_rows, ensure_ascii=False, indent=2) + "\n",
            encoding="utf-8",
        )

    readme = f"""# 聖保祿醫院（SPH）价格抓取

抓取日期: 2026-07-19  
官网: https://www.stpaul.org.hk/  
中文收费: https://www.stpaul.org.hk/tc/charges  

> 说明：SPH 病房、24小时门诊、放射部等主要价目以 **HTML 表格** 发布（非 PDF）；仅「住院常见治疗/检查账目数据」提供 PDF。已保存原页 HTML + 文本提取；PDF 存于 `pdfs/`。

## 生效日期

| 类别 | 日期 |
| --- | --- |
| 房间价目 | 2025-12-11 起 |
| 服务收费（含放射部） | 2026-07-16 通告 |
| 2025 历史账单统计 | HistoricalBill2025 |

## 产出文件

| 文件 | 内容 |
| --- | --- |
| `pages/*.html` | 收费原页（房间、24h门诊、放射、内镜等） |
| `parsed/room-charge.txt` | 房间价目文本提取 |
| `parsed/24h-outpatient.txt` | 24小时门诊文本提取 |
| `parsed/radiology.txt` | 放射部（CT/MRI 等）文本提取 |
| `parsed/HistoricalBill2025CHT.txt` | 2025 常见手术历史账单 PDF 文本 |
| `parsed/key-prices.json` | 与 db 模块最相关的关键价 |
| `parsed/endoscopy.txt` / `operating-theatre.txt` | 内镜、手术室文本提取 |
| `parsed/historical-procedures-2025.json` | 2025 历史手术统计（PDF 表格解析） |
| `pdfs/HistoricalBill2025CHT.pdf` | 政府透明度历史账单（中文） |
| `pdfs/Health Checkup Plans*.pdf` | 体检中心套餐（4 份） |

## 关键价（HK$）

### 病房每日租金（普通住院房，2025-12-11，不含医生费）

| 房型 | 每日 |
| --- | --- |
| 标准房（三至四人） | 760 / 850 / 900 |
| 半私家房（二人） | 1,380 / 1,480 |
| 私家房 | 3,800 / 4,880 |
| 日間标准房 | 400 |
| 日間私家房 | 2,000 |

### 24 小时门诊普通科诊金

| 时段 | 一至六 | 日及公众假期 |
| --- | ---: | ---: |
| 08:00–19:59 | 280 | 350 |
| 20:00–07:59 | 430 | 470 |

### 造影（标准房 / 门诊）

| 项目 | 平扫 | 加显影 |
| --- | ---: | ---: |
| CT 脑部 | 2,400 | 4,300 |
| MRI 脑部 | 6,430 | 9,940 |

### 2025 历史总收费（标准房，p50）节选

"""
    if highlights:
        readme += "| 手术 | 总收费 p50 | 住院日/模式 |\n| --- | ---: | --- |\n"
        for r in highlights[:12]:
            los = r.get("avg_los") or r.get("mode", "")
            total = r.get("total_p50")
            total_s = f"{total:,}" if total else "—"
            readme += f"| {r['procedure']} | {total_s} | {los} |\n"
    else:
        readme += "（见 `parsed/HistoricalBill2025CHT.txt` 或 PDF 原文件）\n"

    readme += """
## 注意

1. 医生巡房/手术/麻醉费由主诊医生另计；上表为医院收费部分。  
2. 放射、内镜、手术室等各部门完整价目见 `pages/` 对应 HTML 页。  
3. `db.js` 未修改；导入前请对照 `parsed/key-prices.json`。  
4. 2026-07-16 收费更改通告以图片/HTML 发布，非独立 PDF。
"""
    (ROOT / "README.md").write_text(readme, encoding="utf-8")
    print("done")


if __name__ == "__main__":
    main()
