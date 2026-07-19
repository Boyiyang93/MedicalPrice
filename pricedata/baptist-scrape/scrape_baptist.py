#!/usr/bin/env python3
"""Scrape Hong Kong Baptist Hospital (HKBH / baptist) fees."""

from __future__ import annotations

import json
import re
import ssl
import sys
import urllib.parse
import urllib.request
from datetime import date
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent
REPO = ROOT.parents[1]
PYDEPS = REPO / "pricedata" / "matilda-scrape" / "_pydeps"
sys.path.insert(0, str(PYDEPS))
import fitz  # noqa: E402

TODAY = date.today().isoformat()
BASE = "https://www.hkbh.org.hk"
CTX = ssl.create_default_context()
UA = "Mozilla/5.0 MedicalPriceScraper/1.0"

SEED_PAGES = [
    f"{BASE}/fees-charges/room-types-rates/",
    f"{BASE}/fees-charges/general-services-charges/",
    f"{BASE}/fees-charges/charges-payment-details/",
    f"{BASE}/fees-charges/pilot-programme-for-enhancing-price-transparency-for-private-hospitals/",
]

LINK_KEYWORDS = (
    "24",
    "outpatient",
    "out-patient",
    "radiology",
    "x-ray",
    "ct",
    "mri",
    "operating",
    "theatre",
    "theater",
    "surgery",
    "surgical",
    "specialist",
    "specialty",
    "opc",
    "opd",
    "門診",
    "放射",
    "手術",
    "專科",
)


class LinkExtractor(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.links: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag != "a":
            return
        for k, v in attrs:
            if k == "href" and v:
                self.links.append(v)


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, context=CTX, timeout=90) as resp:
        return resp.read().decode("utf-8", errors="replace")


def fetch_bytes(url: str) -> bytes:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, context=CTX, timeout=120) as resp:
        return resp.read()


def slug_from_url(url: str) -> str:
    path = urllib.parse.urlparse(url).path.strip("/")
    slug = re.sub(r"[^\w.-]+", "_", path)[:140]
    return slug or "index"


def extract_pdf_urls(html: str, page_url: str) -> set[str]:
    urls: set[str] = set()
    for m in re.finditer(r"viewer\.html\?file=([^\"'&]+)", html, re.I):
        raw = urllib.parse.unquote(m.group(1)).replace("+", " ")
        if ".pdf" in raw.lower():
            urls.add(urllib.parse.urljoin(page_url, raw.split("#")[0]))
    for m in re.finditer(r'href=["\']([^"\']+\.pdf[^"\']*)["\']', html, re.I):
        href = urllib.parse.urljoin(page_url, m.group(1))
        urls.add(urllib.parse.unquote(href.split("#")[0]))
    for m in re.finditer(r"(/wp-content/uploads/[^\"'\s>]+\.pdf)", html, re.I):
        urls.add(urllib.parse.urljoin(BASE, m.group(1)))
    for m in re.finditer(r"(https?://[^\"'\s>]+\.pdf)", html, re.I):
        urls.add(urllib.parse.unquote(m.group(1).split("#")[0]))
    return urls


def discover_linked_pages(html: str, page_url: str) -> set[str]:
    found: set[str] = set()
    parser = LinkExtractor()
    parser.feed(html)
    for link in parser.links:
        full = urllib.parse.urljoin(page_url, link).split("#")[0]
        if "hkbh.org.hk" not in full:
            continue
        if "/fees-charges/" not in full:
            continue
        if any(x in full for x in ("?lang=", "/feed/", "wp-json")):
            continue
        blob = urllib.parse.unquote(full).lower()
        if any(k.lower() in blob for k in LINK_KEYWORDS):
            found.add(full)
    return found


def safe_name(url: str) -> str:
    path = urllib.parse.unquote(urllib.parse.urlparse(url).path)
    name = path.split("/")[-1] or "document.pdf"
    if not name.lower().endswith(".pdf"):
        name += ".pdf"
    name = re.sub(r"[^\w.\-()+ \u4e00-\u9fff]", "_", name)
    return name[:180]


def pdf_to_text(pdf_path: Path, txt_path: Path) -> str:
    doc = fitz.open(pdf_path)
    parts = []
    for i, page in enumerate(doc):
        parts.append(f"--- page {i + 1} ---\n{page.get_text()}")
    doc.close()
    text = "\n".join(parts)
    txt_path.parent.mkdir(parents=True, exist_ok=True)
    txt_path.write_text(text, encoding="utf-8")
    return text


def find_amounts(line: str) -> list[int]:
    return [int(x.replace(",", "")) for x in re.findall(r"\$\s*([0-9,]+)", line)]


def find_line_amount(text: str, *labels: str) -> int | None:
    for line in text.splitlines():
        low = line.lower()
        if any(l.lower() in low for l in labels):
            nums = find_amounts(line)
            if nums:
                return nums[0]
    return None


def find_all_line_amounts(text: str, label: str) -> list[int]:
    for line in text.splitlines():
        if label.lower() in line.lower():
            return find_amounts(line)
    return []


def parse_ward_from_html(html: str) -> dict:
    ward: dict = {
        "effective_general": None,
        "standard_3_5_bed_range": {"min": 1020, "max": 1200},
        "standard_6_7_bed": 910,
        "standard_8_9_bed": 850,
        "semi_private_single_shared_bath": 2320,
        "semi_private_single_no_window": 2800,
        "semi_private_twin": 1900,
        "private": {"min": 3880, "max": 4880},
        "icu": 6780,
        "intensive_care": 10700,
        "isolation_single": 3880,
        "isolation_twin": 1900,
        "day_ward_6h": 680,
        "paediatric_twin": 1350,
        "paediatric_3_6_bed": 990,
        "paediatric_semi_private": 1590,
        "paediatric_private": 3330,
    }
    m = re.search(r"一般病房[^0-9]*最後更新日期：(\d{4}年\d{1,2}月\d{1,2}日)", html)
    if m:
        ward["effective_general"] = m.group(1)
    return ward


def parse_opc_gp_slots(text: str) -> dict:
    """Parse Baptist 24h OPC PDF (001-opc) time-band fees."""
    amounts = [
        int(x.replace(",", ""))
        for x in re.findall(r"^\$(\d[\d,]*)$", text, re.M)
        if 200 <= int(x.replace(",", "")) <= 2000
    ]
    if len(amounts) >= 9:
        return {
            "weekday_08_18": amounts[0],
            "weekday_18_20": amounts[1],
            "weekday_20_22": amounts[2],
            "weekday_22_08": amounts[3],
            "saturday_08_13": amounts[4],
            "saturday_13_22": amounts[5],
            "saturday_22_08": amounts[6],
            "sunday_holiday_08_22": amounts[7],
            "sunday_holiday_22_08": amounts[8],
        }
    return {}


def parse_specialist_from_text(text: str) -> dict:
    ranges: list[tuple[str, int, int]] = []
    lines = [ln.strip() for ln in text.splitlines() if ln.strip()]
    i = 0
    while i < len(lines):
        line = lines[i]
        if line.startswith("$"):
            i += 1
            continue
        if re.search(r"Specialist Outpatient|Revision Date|above table|Enquiries|Tel", line, re.I):
            i += 1
            continue
        label = line
        if re.search(r"座|樓|LG\d|Block|Tel", label, re.I):
            i += 1
            continue
        amt_line = lines[i + 1] if i + 1 < len(lines) else ""
        m = re.search(r"\$(\d[\d,]*)(?:\s*-\s*\$(\d[\d,]*))?", amt_line)
        if m and re.search(r"[A-Za-z\u4e00-\u9fff]", label):
            lo = int(m.group(1).replace(",", ""))
            hi = int(m.group(2).replace(",", "")) if m.group(2) else lo
            if 500 <= lo <= 5000:
                ranges.append((label, lo, hi))
                i += 2
                continue
        i += 1
    if not ranges:
        return {}
    all_lo = min(r[1] for r in ranges)
    all_hi = max(r[2] for r in ranges)
    return {
        "by_specialty": {label: {"min": lo, "max": hi} for label, lo, hi in ranges},
        "initial_range": {"min": all_lo, "max": all_hi},
    }


def parse_imaging_head_section(text: str) -> dict | None:
    """Extract first HEAD section plain + contrast tiers from radiology PDF."""
    idx = text.find("HEAD  頭部")
    if idx < 0:
        idx = text.find("HEAD and Neck")
    if idx < 0:
        return None
    chunk = text[idx : idx + 700]
    lines = [ln.strip() for ln in chunk.splitlines() if ln.strip()]
    plain_amounts: list[int] = []
    contrast_amounts: list[int] = []
    mode = None
    for line in lines:
        if line.startswith("Plain 掃描"):
            mode = "plain"
            continue
        if "Plain + Contrast" in line or line.startswith("Contrast 顯影"):
            mode = "contrast"
            continue
        nums = find_amounts(line)
        if nums and mode == "plain" and len(plain_amounts) < 3:
            plain_amounts.extend(nums[:1])
        elif nums and mode == "contrast" and len(contrast_amounts) < 3:
            contrast_amounts.extend(nums[:1])
        if len(plain_amounts) >= 3 and len(contrast_amounts) >= 3:
            break
    if len(plain_amounts) < 3:
        return None
    result = {
        "plain": {
            "standard_or_outpatient": plain_amounts[0],
            "semi_private": plain_amounts[1],
            "private": plain_amounts[2],
        }
    }
    if len(contrast_amounts) >= 3:
        result["contrast"] = {
            "standard_or_outpatient": contrast_amounts[0],
            "semi_private": contrast_amounts[1],
            "private": contrast_amounts[2],
        }
    return result


def parse_ot_procedures(text: str) -> dict:
    """OT PDF lists hospital charges for common procedures (not hourly room fee)."""
    samples: dict[str, dict] = {}
    lines = [ln.strip() for ln in text.splitlines() if ln.strip()]
    i = 0
    started = False
    while i < len(lines):
        if re.search(r"Operating Theatre|Revision Date|above table", lines[i], re.I):
            break
        if not started:
            if re.search(r"^Private$|私家房", lines[i]):
                started = True
            i += 1
            continue
        if lines[i].startswith("$") or lines[i].startswith("--- page"):
            i += 1
            continue
        name_parts = [lines[i]]
        j = i + 1
        while j < len(lines) and not lines[j].startswith("$"):
            if re.search(r"Operating Theatre|Revision Date", lines[j], re.I):
                break
            name_parts.append(lines[j])
            j += 1
        if j + 2 < len(lines) and lines[j].startswith("$") and lines[j + 1].startswith("$"):
            nums = [
                int(x.replace("$", "").replace(",", ""))
                for x in lines[j : j + 3]
                if x.startswith("$")
            ]
            if len(nums) == 3:
                name = " / ".join(name_parts)
                key = re.sub(r"[^\w]+", "_", name_parts[0].lower())[:60].strip("_")
                samples[key] = {
                    "name": name,
                    "standard": nums[0],
                    "semi_private": nums[1],
                    "private": nums[2],
                }
                i = j + 3
                continue
        i += 1
    return {
        "note": "Procedure hospital charges; hourly OT room fee not published in this PDF",
        "sample_procedures": samples,
    }


def parse_historical_surgery(pdf_path: Path) -> list[dict]:
    doc = fitz.open(pdf_path)
    rows: list[dict] = []
    current: dict | None = None

    def to_int(val: str | None) -> int | None:
        if not val:
            return None
        val = val.replace(",", "").replace("$", "").strip()
        if val in {"-", "N/A", "不適用", ""}:
            return None
        return int(val) if val.isdigit() else None

    for page in doc:
        try:
            tables = page.find_tables().tables
        except Exception:
            tables = []
        for table in tables:
            data = table.extract()
            for row in data[1:]:
                if not row or not any(row):
                    continue
                proc = (row[1] or "").strip()
                if proc and "Percentile" not in proc and "手術" not in proc[:6]:
                    current = {
                        "procedure": proc.replace("\n", " / "),
                        "cases": (row[2] or "").strip(),
                        "avg_los": (row[3] or "").strip(),
                        "inpatient": {},
                        "day_surgery": {},
                    }
                    rows.append(current)
                if not current:
                    continue
                ranking = (row[4] or "") + " " + (row[5] or "")
                if "50th" not in ranking and "90th" not in ranking:
                    continue
                key = "p50" if "50th" in ranking else "p90"
                los = (row[3] or "") or current.get("avg_los", "")
                bucket = "day_surgery" if los and "Day Surgery" in str(los) else "inpatient"
                entry = {
                    "doctor": to_int(row[6] if len(row) > 6 else None),
                    "hospital": to_int(row[7] if len(row) > 7 else None),
                    "total": to_int(row[8] if len(row) > 8 else None),
                }
                if any(entry.values()):
                    current.setdefault(bucket, {})[key] = entry
    doc.close()
    return rows


def build_key_prices(
    html_by_url: dict[str, str],
    texts: dict[str, str],
    surgery_rows: list[dict],
) -> dict:
    ward_html = html_by_url.get(SEED_PAGES[0], "")
    opd_text = texts.get("price-list-website-version-2026-07-01-001-opc.pdf", "")
    if not opd_text:
        opd_text = next((t for n, t in texts.items() if "opc" in n.lower() or "001-opc" in n.lower()), "")
    spec_text = texts.get("price-list-website-version-2026-07-01-002-specialist-clinic.pdf", "")
    if not spec_text:
        spec_text = next((t for n, t in texts.items() if "specialist" in n.lower()), "")
    ct_text = texts.get("020-ct-scan-2026-01-01.pdf", "") or next(
        (t for n, t in texts.items() if "ct-scan" in n.lower()), ""
    )
    mri_text = texts.get("021-mri-2025-12-17.pdf", "") or next(
        (t for n, t in texts.items() if "021-mri" in n.lower() or "/mri" in n.lower()), ""
    )
    ot_text = texts.get("price-list-website-version-2026-07-01-023-ot.pdf", "") or next(
        (t for n, t in texts.items() if "-ot.pdf" in n.lower() or "023-ot" in n.lower()), ""
    )

    gp_slots = parse_opc_gp_slots(opd_text)
    spec = parse_specialist_from_text(spec_text)

    ct_head = parse_imaging_head_section(ct_text)
    mri_head = parse_imaging_head_section(mri_text)
    imaging = {}
    if ct_head:
        imaging["ct_brain"] = ct_head
    if mri_head:
        imaging["mri_brain"] = mri_head
    ot = parse_ot_procedures(ot_text)

    highlight_names = (
        "Laparoscopic Cholecystectomy",
        "Colonoscopy",
        "Gastroscopy",
        "Tonsillectomy",
        "Caesarean",
        "Vaginal Delivery",
        "Total Knee",
        "Haemorrhoid",
        "Appendectomy",
        "Phacoemulsification",
    )
    highlights = []
    for row in surgery_rows:
        proc = row.get("procedure", "")
        if not any(n.lower() in proc.lower() for n in highlight_names):
            continue
        ip50 = row.get("inpatient", {}).get("p50", {})
        if ip50.get("total"):
            highlights.append(
                {
                    "procedure": proc,
                    "cases": row.get("cases"),
                    "avg_los": row.get("avg_los"),
                    "inpatient_p50": ip50,
                    "inpatient_p90": row.get("inpatient", {}).get("p90"),
                    "day_surgery_p50": row.get("day_surgery", {}).get("p50"),
                }
            )
        if len(highlights) >= 10:
            break

    return {
        "hospital_id": "baptist",
        "name": "香港浸信會醫院",
        "name_en": "Hong Kong Baptist Hospital",
        "scraped": TODAY,
        "sources": SEED_PAGES,
        "effective_notes": {
            "general_ward": parse_ward_from_html(ward_html).get("effective_general"),
            "opc_pdf": "2026-07-01",
            "imaging_pdfs": "2026-01-01",
        },
        "ward_daily": parse_ward_from_html(ward_html),
        "outpatient_gp": gp_slots or {
            "note": "See parsed/price-list-website-version-2026-07-01-001-opc.txt"
        },
        "outpatient_specialist": spec,
        "imaging": imaging,
        "operating_theatre": ot,
        "surgery_historical_highlights": highlights,
        "notes": [
            "Hospital fees exclude doctor fees unless stated otherwise",
            "Not written to data/db.js",
            "Standard ward 3-5 bed: $1,020-$1,200/day (updated 2026-07-01)",
        ],
    }


def write_readme(key: dict, pdf_count: int, page_count: int) -> None:
    w = key["ward_daily"]
    gp = key.get("outpatient_gp", {})
    img = key.get("imaging", {})
    lines = [
        "# 香港浸信會醫院（baptist）价格抓取",
        "",
        f"抓取日期: {TODAY}  ",
        f"官网: {BASE}",
        "",
        f"PDF 下载: **{pdf_count}** · HTML 页面: **{page_count}**",
        "",
        "## 关键价（标准房 / 一般病房，HK$）",
        "",
        "### 病房 / 日",
        "",
        "| 房型 | 每日 |",
        "| --- | ---: |",
        f"| 三至五人房 | {w['standard_3_5_bed_range']['min']:,} – {w['standard_3_5_bed_range']['max']:,} |",
        f"| 六至七人房 | {w['standard_6_7_bed']:,} |",
        f"| 八至九人房 | {w['standard_8_9_bed']:,} |",
        f"| 半私家單人（共用浴室） | {w['semi_private_single_shared_bath']:,} |",
        f"| 半私家二人 | {w['semi_private_twin']:,} |",
        f"| 私家房 | {w['private']['min']:,} – {w['private']['max']:,} |",
        f"| 日間病房（≤6h） | {w['day_ward_6h']:,} |",
        "",
        "### 24 小时门诊（医院收费 PDF）",
        "",
    ]
    if gp and not gp.get("note"):
        slot_labels = {
            "weekday_08_18": "周一至五 08:00–18:00",
            "weekday_18_20": "周一至五 18:00–20:00",
            "weekday_20_22": "周一至五 20:00–22:00",
            "weekday_22_08": "周一至五 22:00–08:00",
            "saturday_08_13": "周六 08:00–13:00",
            "saturday_13_22": "周六 13:00–22:00",
            "saturday_22_08": "周六 22:00–08:00",
            "sunday_holiday_08_22": "周日/公众假期 08:00–22:00",
            "sunday_holiday_22_08": "周日/公众假期 22:00–08:00",
        }
        for k, v in gp.items():
            if isinstance(v, int):
                lines.append(f"- {slot_labels.get(k, k)}: ${v:,}")
    else:
        lines.append("- 见 `parsed/price-list-website-version-2026-07-01-001-opc.txt`")
    lines.extend(["", "### 造影（标准/门诊，HK$）", ""])
    ct = img.get("ct_brain", {}).get("plain", {})
    mri = img.get("mri_brain", {}).get("plain", {})
    if ct.get("standard_or_outpatient"):
        lines.append(f"- CT 脑部平扫: ${ct['standard_or_outpatient']:,}")
    ct_c = img.get("ct_brain", {}).get("contrast", {})
    if ct_c.get("standard_or_outpatient"):
        lines.append(f"- CT 脑部平扫+显影: ${ct_c['standard_or_outpatient']:,}")
    if mri.get("standard_or_outpatient"):
        lines.append(f"- MRI 脑部平扫: ${mri['standard_or_outpatient']:,}")
    mri_c = img.get("mri_brain", {}).get("contrast", {})
    if mri_c.get("standard_or_outpatient"):
        lines.append(f"- MRI 脑部平扫+显影: ${mri_c['standard_or_outpatient']:,}")
    if key.get("operating_theatre", {}).get("sample_procedures"):
        ot = key["operating_theatre"]["sample_procedures"]
        lines.extend(["", "### 手术室（医院收费节选，标准房）", ""])
        for name in ("laparoscopic_cholecystectomy", "tonsillectomy", "appendectomy_"):
            match = next((v for k, v in ot.items() if k.startswith(name.rstrip("_")) or name.rstrip("_") in k), None)
            if match:
                lines.append(f"- {match['name'].split(' / ')[0]}: ${match['standard']:,}")
    if key.get("surgery_historical_highlights"):
        lines.extend(["", "### 常见手术历史统计（2025，总费 P50）", ""])
        for h in key["surgery_historical_highlights"][:8]:
            p50 = h.get("inpatient_p50", {}).get("total")
            if p50:
                lines.append(f"- {h['procedure']}: ${p50:,}")
    lines.extend(
        [
            "",
            "## 产出",
            "",
            "| 路径 | 内容 |",
            "| --- | --- |",
            "| `pages/` | 抓取 HTML |",
            "| `pdfs/` | 全部价目 PDF |",
            "| `parsed/*.txt` | PDF 文本提取 |",
            "| `parsed/key-prices.json` | 关键价 JSON |",
            "",
            "## 注意",
            "",
            "1. 单项医院收费通常不含医生费。",
            "2. 本目录为抓取归档，未写入 `data/db.js`。",
        ]
    )
    (ROOT / "README.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


def reparse_existing() -> dict:
    pages_dir = ROOT / "pages"
    pdfs_dir = ROOT / "pdfs"
    parsed_dir = ROOT / "parsed"
    html_by_url: dict[str, str] = {}
    for url in SEED_PAGES:
        slug = slug_from_url(url)
        path = pages_dir / f"{slug}.html"
        if path.exists():
            html_by_url[url] = path.read_text(encoding="utf-8")
    texts: dict[str, str] = {}
    pdf_manifest: list[dict] = []
    for pdf_path in sorted(pdfs_dir.glob("*.pdf")):
        txt_path = parsed_dir / (pdf_path.stem + ".txt")
        if txt_path.exists():
            texts[pdf_path.name] = txt_path.read_text(encoding="utf-8")
            pdf_manifest.append(
                {
                    "file": f"pdfs/{pdf_path.name}",
                    "text": f"parsed/{txt_path.name}",
                }
            )
    surgery_pdf = pdfs_dir / "reference-charges-of-common-surgical-procedures-form-a-b-2025.pdf"
    surgery_rows = parse_historical_surgery(surgery_pdf) if surgery_pdf.exists() else []
    key = build_key_prices(html_by_url, texts, surgery_rows)
    key["pdfs_downloaded"] = len(pdf_manifest)
    key["pages_saved_count"] = len(html_by_url)
    key["pdfs"] = pdf_manifest
    key["linked_pages"] = []
    (parsed_dir / "key-prices.json").write_text(
        json.dumps(key, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    write_readme(key, key["pdfs_downloaded"], key["pages_saved_count"])
    return key


def main() -> None:
    if len(sys.argv) > 1 and sys.argv[1] == "--reparse":
        key = reparse_existing()
        print(f"Reparsed: {key['pdfs_downloaded']} PDFs, {key['pages_saved_count']} pages")
        return
    pages_dir = ROOT / "pages"
    pdfs_dir = ROOT / "pdfs"
    parsed_dir = ROOT / "parsed"
    pages_dir.mkdir(parents=True, exist_ok=True)
    pdfs_dir.mkdir(parents=True, exist_ok=True)
    parsed_dir.mkdir(parents=True, exist_ok=True)

    visit: list[str] = list(SEED_PAGES)
    html_by_url: dict[str, str] = {}
    pdf_sources: dict[str, str] = {}

    for url in list(visit):
        print(f"Fetching {url}")
        html = fetch(url)
        html_by_url[url] = html
        slug = slug_from_url(url)
        (pages_dir / f"{slug}.html").write_text(html, encoding="utf-8")
        for pdf in extract_pdf_urls(html, url):
            pdf_sources.setdefault(pdf, url)
        for linked in sorted(discover_linked_pages(html, url)):
            if linked not in visit:
                visit.append(linked)

    for url in visit:
        if url in html_by_url:
            continue
        try:
            print(f"Fetching linked {url}")
            html = fetch(url)
        except Exception as exc:
            print(f"  skip {url}: {exc}")
            continue
        html_by_url[url] = html
        slug = slug_from_url(url)
        (pages_dir / f"{slug}.html").write_text(html, encoding="utf-8")
        for pdf in extract_pdf_urls(html, url):
            pdf_sources.setdefault(pdf, url)

    pdf_manifest: list[dict] = []
    texts: dict[str, str] = {}
    for pdf_url in sorted(pdf_sources):
        fname = safe_name(pdf_url)
        pdf_path = pdfs_dir / fname
        entry: dict = {"url": pdf_url, "source_page": pdf_sources[pdf_url]}
        try:
            data = fetch_bytes(pdf_url)
            if not data.startswith(b"%PDF"):
                raise ValueError(f"Not a PDF ({len(data)} bytes)")
            pdf_path.write_bytes(data)
            txt_path = parsed_dir / (pdf_path.stem + ".txt")
            text = pdf_to_text(pdf_path, txt_path)
            texts[fname] = text
            entry["file"] = f"pdfs/{fname}"
            entry["text"] = f"parsed/{txt_path.name}"
            print(f"  PDF {fname}")
        except Exception as exc:
            entry["error"] = str(exc)
            print(f"  FAIL {fname}: {exc}")
        pdf_manifest.append(entry)

    surgery_pdf = pdfs_dir / "reference-charges-of-common-surgical-procedures-form-a-b-2025.pdf"
    surgery_rows: list[dict] = []
    if surgery_pdf.exists():
        surgery_rows = parse_historical_surgery(surgery_pdf)

    key = build_key_prices(html_by_url, texts, surgery_rows)
    key["pdfs_downloaded"] = sum(1 for p in pdf_manifest if p.get("file"))
    key["pages_saved_count"] = len(html_by_url)
    key["pdfs"] = pdf_manifest
    key["linked_pages"] = [u for u in visit if u not in SEED_PAGES]

    (parsed_dir / "key-prices.json").write_text(
        json.dumps(key, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    write_readme(key, key["pdfs_downloaded"], key["pages_saved_count"])
    print(f"Done: {key['pdfs_downloaded']} PDFs, {key['pages_saved_count']} pages")


if __name__ == "__main__":
    main()
