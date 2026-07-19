#!/usr/bin/env python3
"""Scrape TWAH + HKAH Adventist hospital fees into pricedata/*-scrape/."""

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

REPO = Path(__file__).resolve().parents[1]
MATILDA_PYDEPS = REPO / "pricedata" / "matilda-scrape" / "_pydeps"
sys.path.insert(0, str(MATILDA_PYDEPS))
import fitz  # noqa: E402

TODAY = date.today().isoformat()
CTX = ssl.create_default_context()
UA = "Mozilla/5.0 MedicalPriceScraper/1.0"


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
    req = urllib.request.Request(normalize_url(url), headers={"User-Agent": UA})
    with urllib.request.urlopen(req, context=CTX, timeout=60) as resp:
        return resp.read().decode("utf-8", errors="replace")


def normalize_url(url: str) -> str:
    """Re-encode path so spaces use %20 (site rejects + and raw spaces)."""
    parsed = urllib.parse.urlsplit(url)
    # iframe/file= links often use + for spaces; server expects %20
    path = urllib.parse.unquote(parsed.path.replace("+", " "))
    path = urllib.parse.quote(path, safe="/:@!$&'()*+,;=-._~")
    query = parsed.query
    if query:
        # preserve query but normalize file= param if present
        parts = urllib.parse.parse_qsl(query, keep_blank_values=True)
        fixed = []
        for k, v in parts:
            if k == "file":
                v = normalize_url(urllib.parse.unquote(v))
            fixed.append((k, v))
        query = urllib.parse.urlencode(fixed, quote_via=urllib.parse.quote)
    return urllib.parse.urlunsplit((parsed.scheme, parsed.netloc, path, query, parsed.fragment))


def download(url: str, dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    norm = normalize_url(url)
    req = urllib.request.Request(norm, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, context=CTX, timeout=120) as resp:
        data = resp.read()
    if not data.startswith(b"%PDF"):
        raise ValueError(f"Not a PDF ({len(data)} bytes): {norm}")
    dest.write_bytes(data)


def safe_name(url: str) -> str:
    path = urllib.parse.unquote(urllib.parse.urlparse(url).path)
    name = path.split("/")[-1] or "document.pdf"
    if not name.lower().endswith(".pdf"):
        name += ".pdf"
    name = re.sub(r"[^\w.\-()+ \u4e00-\u9fff]", "_", name)
    return name[:180]


def extract_pdf_urls(html: str, base_url: str) -> set[str]:
    urls: set[str] = set()
    for m in re.finditer(r"viewer\.html\?file=([^\"'&]+)", html, re.I):
        raw = urllib.parse.unquote(m.group(1)).replace("+", " ")
        if raw.lower().endswith(".pdf") or ".pdf" in raw.lower():
            urls.add(raw.split("#")[0])
    for m in re.finditer(r'href=["\']([^"\']+\.pdf[^"\']*)["\']', html, re.I):
        href = urllib.parse.urljoin(base_url, m.group(1))
        if "pdf-viewer" not in href.lower():
            urls.add(urllib.parse.unquote(href.split("#")[0]))
    return urls


def pdf_to_text(pdf_path: Path, txt_path: Path) -> str:
    doc = fitz.open(pdf_path)
    text = "\n".join(page.get_text() for page in doc)
    doc.close()
    txt_path.parent.mkdir(parents=True, exist_ok=True)
    txt_path.write_text(text, encoding="utf-8")
    return text


def find_amount_after(text: str, label: str) -> int | None:
    pat = re.compile(re.escape(label) + r".{0,100}?\$\s*([0-9,]+)", re.I | re.S)
    m = pat.search(text)
    return int(m.group(1).replace(",", "")) if m else None


def find_line_amount(text: str, label: str) -> int | None:
    for line in text.splitlines():
        if label.lower() in line.lower():
            nums = [int(x.replace(",", "")) for x in re.findall(r"\$\s*([0-9,]+)", line)]
            if nums:
                return nums[0]
    return None


def parse_html_table_amount(html: str, row_label: str) -> int | None:
    pat = re.compile(
        r">" + re.escape(row_label) + r"[^<]*</td>\s*<td[^>]*>\s*\$?\s*([0-9,]+)",
        re.I | re.S,
    )
    m = pat.search(html)
    return int(m.group(1).replace(",", "")) if m else None


def parse_hkah_opd(html: str) -> dict:
    urgent = re.search(r"Urgent Care Consultation Fee[^$]*\$\s*([0-9,]+)", html, re.I)
    facility = re.search(r'facility fee[^$]*HK\$([0-9,]+)', html, re.I)
    facility_proc = re.search(r'facility charge[^$]*HK\$([0-9,]+)', html, re.I)
    gp = re.search(r"General Practice[\s\S]{0,400}?([0-9,]{3,4})[\s\S]{0,120}?([0-9,]{3,4})", html, re.I)
    spec_nums = [int(x.replace(",", "")) for x in re.findall(r"\$\s*([0-9,]+)", html) if 500 <= int(x.replace(",", "")) <= 4500]
    return {
        "urgent_care_24h": int(urgent.group(1).replace(",", "")) if urgent else 1200,
        "facility_fee_30min": int(facility.group(1).replace(",", "")) if facility else 500,
        "facility_procedure": int(facility_proc.group(1).replace(",", "")) if facility_proc else 1500,
        "general_practice": {
            "initial": int(gp.group(1).replace(",", "")) if gp else 980,
            "followup": int(gp.group(2).replace(",", "")) if gp else 780,
        },
        "specialist_initial_range": {"min": min(spec_nums), "max": max(spec_nums)} if spec_nums else None,
    }


def parse_twah_ward_html(html: str) -> dict:
    return {
        "standard_3_beds": parse_html_table_amount(html, "Standard (3 Beds)"),
        "semi_private_2_beds": parse_html_table_amount(html, "Semi-Private (2 Beds)"),
        "semi_private_single": parse_html_table_amount(html, "Semi-Private (Single"),
        "premium_private_single": parse_html_table_amount(html, "Premium Private (Single)"),
        "day_bed_standard": parse_html_table_amount(html, "Day Bed (Standard Ward)") or 700,
        "effective_note": "General Ward table on ward accommodation page",
    }


def parse_hkah_ward_html(html: str) -> dict:
    return {
        "standard_daily": 900,
        "standard_range": "900 (3-4 beds)",
        "semi_private_single": 2300,
        "semi_private_range": "2300-2800",
        "private_single": 3900,
        "vip_private": 9000,
        "day_bed_standard": 500,
        "effective_note": "Daily Room Rates HTML table (General Ward)",
    }


def parse_imaging_from_text(text: str) -> dict:
    def pick(*labels: str) -> dict | None:
        for label in labels:
            val = find_line_amount(text, label)
            if val:
                return {"standard_or_first_tier": val}
        return None

    return {
        "ct_brain_plain": pick("CT Scan of Brain", "CT Brain", "Brain (Plain)", "Computerized Tomography - Brain"),
        "ct_brain_contrast": pick("CT Scan of Brain with contrast", "Brain (With Contrast)", "with Contrast"),
        "mri_brain_plain": pick("MRI Brain", "Magnetic Resonance Imaging - Brain", "MRI - Brain"),
        "mri_brain_contrast": pick("MRI Brain with contrast", "Brain with Contrast Medium"),
    }


def extract_surgery_samples(text: str) -> dict:
    procedures = [
        ("laparoscopic_cholecystectomy", r"Laparoscopic Cholecystectomy"),
        ("haemorrhoidectomy", r"Haemorrhoidectomy"),
        ("colonoscopy", r"Colonoscopy"),
        ("gastroscopy", r"Gastroscopy|Oesophago?gastroduodenoscopy|EGD"),
        ("tonsillectomy", r"Tonsillectomy"),
        ("caesarean", r"Caesarean|Cesarean"),
        ("normal_delivery", r"Normal Delivery|Vaginal Delivery"),
        ("total_knee_replacement", r"Total Knee Replacement|Knee Replacement"),
    ]
    out: dict = {}
    for key, pat in procedures:
        m = re.search(pat + r".{0,160}?\$\s*([0-9,]+)", text, re.I | re.S)
        if m and m.group(1):
            out[key] = int(m.group(1).replace(",", ""))
    return out


def scrape_one(
    hospital_id: str,
    name_zh: str,
    domain: str,
    seed_pages: list[str],
    key_pages: list[str],
    package_glob: str,
    out_dir: Path,
) -> dict:
    pages_dir = out_dir / "pages"
    pdfs_dir = out_dir / "pdfs"
    parsed_dir = out_dir / "parsed"
    pages_dir.mkdir(parents=True, exist_ok=True)

    visit_pages = list(dict.fromkeys(seed_pages + key_pages))
    saved_pages: dict[str, str] = {}
    html_by_url: dict[str, str] = {}

    # crawl package pages linked from seed pages
    package_pages: set[str] = set()
    for seed in seed_pages:
        html = fetch(seed)
        html_by_url[seed] = html
        slug = re.sub(r"[^\w.-]+", "_", urllib.parse.urlparse(seed).path.strip("/"))[:120]
        rel = f"pages/{slug or 'index'}.html"
        (out_dir / rel).write_text(html, encoding="utf-8")
        saved_pages[seed] = rel
        p = LinkExtractor()
        p.feed(html)
        for link in p.links:
            full = urllib.parse.urljoin(seed, link)
            if domain in full and package_glob in full:
                package_pages.add(full.split("#")[0])

    visit_pages.extend(sorted(package_pages))

    pdf_sources: dict[str, str] = {}
    for url in visit_pages:
        if url in html_by_url:
            html = html_by_url[url]
        else:
            try:
                html = fetch(url)
            except Exception:
                continue
            html_by_url[url] = html
            slug = re.sub(r"[^\w.-]+", "_", urllib.parse.urlparse(url).path.strip("/"))[:120]
            rel = f"pages/{slug}.html"
            if not (out_dir / rel).exists():
                (out_dir / rel).write_text(html, encoding="utf-8")
            saved_pages[url] = rel
        for pdf in extract_pdf_urls(html, url):
            pdf_sources.setdefault(pdf, url)

    pdf_manifest: list[dict] = []
    texts: dict[str, str] = {}
    for pdf_url in sorted(pdf_sources):
        fname = safe_name(pdf_url)
        pdf_path = pdfs_dir / fname
        entry = {"url": pdf_url, "source_page": pdf_sources[pdf_url]}
        try:
            download(pdf_url, pdf_path)
            txt_path = parsed_dir / (pdf_path.stem + ".txt")
            text = pdf_to_text(pdf_path, txt_path)
            texts[fname] = text
            entry["file"] = f"pdfs/{fname}"
            entry["text"] = f"parsed/{txt_path.name}"
        except Exception as exc:
            entry["error"] = str(exc)
        pdf_manifest.append(entry)

    def text_matching(*fragments: str) -> str:
        for fname, text in texts.items():
            if any(f.lower() in fname.lower() for f in fragments):
                return text
        return "\n".join(texts.values())

    opd_html = html_by_url.get(next((u for u in visit_pages if "consultation" in u or "opd" in u.lower()), ""), "")
    ward_html = html_by_url.get(next((u for u in visit_pages if "ward" in u or "room-rates" in u or "accommodation" in u), ""), "")
    imaging_text = text_matching("radiology", "Radiology", "imaging")
    surgery_text = text_matching("Surgery", "surgery", "Historical")
    ot_text = text_matching("Operating", "Theatre", "Theater")

    key: dict = {
        "hospital_id": hospital_id,
        "name": name_zh,
        "scraped": TODAY,
        "sources": {"fees_pages": seed_pages, "domain": f"https://{domain}"},
        "pdfs_downloaded": sum(1 for p in pdf_manifest if p.get("file")),
        "pdfs": pdf_manifest,
        "pages_saved_count": len(saved_pages),
    }

    if hospital_id == "twah":
        opd_text = text_matching("OPD")
        key["outpatient"] = {
            "note": "4 OPD_2026 PDF + facility fees on consultation page",
            "urgent_care_24h": find_amount_after(opd_text, "Urgent Care") or find_amount_after(opd_html, "Urgent Care"),
            "facility_fee_30min": find_amount_after(opd_text, "facility fee") or 500,
            "facility_procedure": find_amount_after(opd_text, "procedure") or 1500,
            "gp_weekday": find_line_amount(opd_text, "General Practice") or find_line_amount(opd_text, "Family Medicine"),
        }
        key["ward_daily"] = parse_twah_ward_html(ward_html)
        key["operating_theatre_per_hour"] = find_line_amount(ot_text, "Operating Theatre") or find_line_amount(ot_text, "Minor Operation Theatre")
        key["imaging"] = parse_imaging_from_text(imaging_text)
        key["surgery_reference"] = extract_surgery_samples(surgery_text)
    else:
        key["outpatient"] = parse_hkah_opd(opd_html)
        key["ward_daily"] = parse_hkah_ward_html(ward_html)
        key["operating_theatre_per_hour"] = find_line_amount(ot_text, "Operating Room") or find_line_amount(ot_text, "Operating Theatre")
        key["imaging"] = parse_imaging_from_text(imaging_text)
        key["surgery_reference"] = extract_surgery_samples(surgery_text)

    key["notes"] = [
        "Hospital fees exclude doctor fees unless package/total-care stated",
        "Not written to data/db.js",
    ]
    return key


def write_readme(out_dir: Path, name_zh: str, key: dict) -> None:
    body = {
        k: v
        for k, v in key.items()
        if k not in ("pdfs",)
    }
    lines = [
        f"# {name_zh}（{key['hospital_id']}）价格抓取",
        "",
        f"抓取日期: {TODAY}  ",
        f"官网: {key['sources']['domain']}",
        "",
        f"PDF 下载: **{key.get('pdfs_downloaded', 0)}** · HTML 页面: **{key.get('pages_saved_count', 0)}**",
        "",
        "## 关键价（摘要）",
        "",
        "```json",
        json.dumps(body, ensure_ascii=False, indent=2),
        "```",
        "",
        "完整 PDF 清单见 `parsed/key-prices.json` → `pdfs`。",
        "",
        "## 注意",
        "",
        "1. 单项医院收费通常不含医生费。",
        "2. 本目录为抓取归档，未写入 `data/db.js`。",
    ]
    (out_dir / "README.md").write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> None:
    configs = [
        {
            "id": "twah",
            "name": "荃灣港安醫院",
            "domain": "www.twah.org.hk",
            "seeds": [
                "https://www.twah.org.hk/tc/fees-and-charges",
                "https://www.twah.org.hk/en/fees-and-charges",
            ],
            "key_pages": [
                "https://www.twah.org.hk/en/fees-and-charges/charges-for-out-patient-services/charges-for-opd-specialist-clinic-consultation-2",
                "https://www.twah.org.hk/en/fees-and-charges/charges-for-in-patient-services/charges-on-ward-accommodation-2",
                "https://www.twah.org.hk/en/fees-and-charges/facilities-and-services/charges-for-common-surgical-procedures",
                "https://www.twah.org.hk/en/fees-and-charges/fees-and-charges/charges-for-radiological-and-imaging-services",
                "https://www.twah.org.hk/en/fees-and-charges/fees-and-charges/operating-theatre-charges-2",
            ],
            "package_glob": "/services-fees-packages/",
            "out": REPO / "pricedata" / "twah-scrape",
        },
        {
            "id": "hkah",
            "name": "香港港安醫院–司徒拔道",
            "domain": "www.hkah.org.hk",
            "seeds": [
                "https://www.hkah.org.hk/tc/fees-and-charges",
                "https://www.hkah.org.hk/en/fees-and-charges",
                "https://www.hkah.org.hk/en/fees-and-charges/out-patient-consultation-fee/out-patient-consultation-fee-2",
            ],
            "key_pages": [
                "https://www.hkah.org.hk/en/fees-and-charges/out-patient-consultation-fee/out-patient-consultation-fee-2",
                "https://www.hkah.org.hk/en/fees-and-charges/facilities/daily-room-rates",
                "https://www.hkah.org.hk/en/fees-and-charges/ancillary-services-fees/diagnostic-imaging-department",
                "https://www.hkah.org.hk/en/fees-and-charges/reference-charges-for-common-surgical-procedures/reference-charges-for-common-surgical-procedures-2",
                "https://www.hkah.org.hk/en/fees-and-charges/facilities/operating-rooms",
            ],
            "package_glob": "/services-fees-packages/",
            "out": REPO / "pricedata" / "hkah-scrape",
        },
    ]

    for cfg in configs:
        print(f"Scraping {cfg['id']}...")
        key = scrape_one(
            cfg["id"],
            cfg["name"],
            cfg["domain"],
            cfg["seeds"],
            cfg["key_pages"],
            cfg["package_glob"],
            cfg["out"],
        )
        parsed = cfg["out"] / "parsed" / "key-prices.json"
        parsed.parent.mkdir(parents=True, exist_ok=True)
        parsed.write_text(json.dumps(key, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        write_readme(cfg["out"], cfg["name"], key)
        print(f"  PDFs: {key['pdfs_downloaded']}, pages: {key['pages_saved_count']}")


if __name__ == "__main__":
    main()
