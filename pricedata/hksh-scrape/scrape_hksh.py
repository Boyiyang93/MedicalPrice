#!/usr/bin/env python3
"""Scrape Hong Kong Sanatorium & Hospital (HKSH) fee data."""

from __future__ import annotations

import json
import re
import sys
import urllib.parse
import urllib.request
from html import unescape
from pathlib import Path

ROOT = Path(__file__).resolve().parent
PAGES_DIR = ROOT / "pages"
PDF_DIR = ROOT / "pdfs"
IMAGES_DIR = ROOT / "images"
PARSED_DIR = ROOT / "parsed"
PYDEPS = ROOT.parent / "matilda-scrape" / "_pydeps"
BASE = "https://www.hksh-hospital.com"

sys.path.insert(0, str(PYDEPS))
import fitz  # noqa: E402

KEY_PAGES = {
    "fees-zh.html": f"{BASE}/zh-hk/fees-and-charges",
    "fees-en.html": "https://hksh-hospital.com/en/fees-and-charges",
    "price-list-zh.html": f"{BASE}/zh-hk/fees-and-charges/price-list",
    "fee-schedules-en.html": f"{BASE}/en/fees-charges/fee-schedules",
    "fee-schedules-zh.html": f"{BASE}/zh-hk/fees-charges/fee-schedules",
    "accommodation-zh.html": f"{BASE}/zh-hk/fees-and-charges/accommodation-charges",
    "accommodation-en.html": f"{BASE}/en/fees-and-charges/accommodation-charges",
    "operating-theatre-zh.html": f"{BASE}/zh-hk/fees-and-charges/operating-theatre",
    "operating-theatre-en.html": f"{BASE}/en/fees-and-charges/operating-theatre",
    "investigative-zh.html": f"{BASE}/zh-hk/fees-and-charges/investigative-and-treatment-procedures",
    "investigative-en.html": f"{BASE}/en/fees-and-charges/investigative-and-treatment-procedures",
    "pilot-zh.html": f"{BASE}/zh-hk/fees-charges/pilot-programme-for-enhancing-price-transparency-for-private-hospitals",
    "pilot-en.html": f"{BASE}/en/fees-charges/pilot-programme-for-enhancing-price-transparency-for-private-hospitals",
    "historical-zh.html": f"{BASE}/zh-hk/fees-charges/historical-bill-sizes-statistics",
    "historical-en.html": f"{BASE}/en/fees-charges/historical-bill-sizes-statistics",
    "service-packages-zh.html": f"{BASE}/zh-hk/fees-and-charges/service-packages",
    "service-packages-en.html": f"{BASE}/en/fees-and-charges/service-packages",
    "outpatient-24h-zh.html": f"{BASE}/zh-hk/fees-and-charges/price-list/24-hour-outpatient-clinic",
    "outpatient-24h-en.html": f"{BASE}/en/fees-and-charges/price-list/24-hour-outpatient-clinic",
    "ct-zh.html": f"{BASE}/zh-hk/fees-and-charges/price-list/department-of-diagnostic-and-interventional-radiology-computed-tomography-ct-scan",
    "ct-en.html": f"{BASE}/en/fees-and-charges/price-list/department-of-diagnostic-and-interventional-radiology-computed-tomography-ct-scan",
    "mri-zh.html": f"{BASE}/zh-hk/fees-and-charges/price-list/department-of-diagnostic-and-interventional-radiology-magnetic-resonance-imaging",
    "mri-en.html": f"{BASE}/en/fees-and-charges/price-list/department-of-diagnostic-and-interventional-radiology-magnetic-resonance-imaging",
}


def fetch(url: str) -> bytes:
    parts = urllib.parse.urlsplit(url)
    safe_path = urllib.parse.quote(parts.path, safe="/%;")
    safe_url = urllib.parse.urlunsplit((parts.scheme, parts.netloc, safe_path, parts.query, parts.fragment))
    req = urllib.request.Request(safe_url, headers={"User-Agent": "MedicalPrice-scraper/1.0"})
    with urllib.request.urlopen(req, timeout=90) as resp:
        return resp.read()


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


def extract_content(html: str) -> str:
    m = re.search(
        r'<div class="content">\s*<div class="field field-name-body.*?</div>\s*</div>\s*<ul class="links inline"',
        html,
        re.S,
    )
    return strip_html(m.group(0) if m else html)


def normalize_url(url: str, page_url: str = BASE) -> str:
    if url.startswith("//"):
        return "https:" + url
    if url.startswith("/"):
        return BASE + url
    if url.startswith("http"):
        return url
    return urllib.parse.urljoin(page_url, url)


def discover_assets() -> tuple[set[str], set[str]]:
    images: set[str] = set()
    pdfs: set[str] = set()
    for html_path in PAGES_DIR.glob("*.html"):
        text = html_path.read_text(encoding="utf-8", errors="ignore")
        for m in re.findall(r'src="([^"]+)"', text):
            u = normalize_url(m)
            if "pricelist" in u.lower() or u.lower().endswith((".jpg", ".jpeg", ".png")) and "pricelist" in u.lower():
                images.add(u)
        for m in re.findall(r'href="([^"]+\.pdf[^"]*)"', text, re.I):
            pdfs.add(normalize_url(m))
        for m in re.findall(r'href="(/sites/default/files/publications/[^"]+\.pdf)"', text, re.I):
            pdfs.add(BASE + m)
    return images, pdfs


def safe_filename(url: str) -> str:
    name = urllib.parse.unquote(url.split("?")[0].rstrip("/").split("/")[-1])
    name = re.sub(r'[<>:"/\\|?*]', "_", name)
    return name or "unnamed"


def download_pages() -> None:
    PAGES_DIR.mkdir(parents=True, exist_ok=True)
    for fname, url in KEY_PAGES.items():
        dest = PAGES_DIR / fname
        if dest.exists() and dest.stat().st_size > 10000:
            continue
        try:
            dest.write_bytes(fetch(url))
            print(f"page OK {fname}")
        except Exception as exc:
            print(f"page FAIL {fname}: {exc}")


def download_images(images: set[str]) -> dict[str, str]:
    IMAGES_DIR.mkdir(parents=True, exist_ok=True)
    mapping: dict[str, str] = {}
    for url in sorted(images):
        fname = safe_filename(url)
        dest = IMAGES_DIR / fname
        if not dest.exists() or dest.stat().st_size < 1000:
            try:
                dest.write_bytes(fetch(url))
                print(f"img OK {fname}")
            except Exception as exc:
                print(f"img FAIL {fname}: {exc}")
                continue
        mapping[url] = str(dest.relative_to(ROOT))
    return mapping


def download_pdfs(pdfs: set[str]) -> list[dict]:
    PDF_DIR.mkdir(parents=True, exist_ok=True)
    records: list[dict] = []
    for url in sorted(pdfs):
        if "eHRSS" in url or "Electronic Health" in url:
            continue
        fname = safe_filename(url)
        dest = PDF_DIR / fname
        if not dest.exists() or dest.stat().st_size < 1000:
            try:
                dest.write_bytes(fetch(url))
                print(f"pdf OK {fname}")
            except Exception as exc:
                print(f"pdf FAIL {fname}: {exc}")
                continue
        txt = PARSED_DIR / (dest.stem + ".txt")
        text = pdf_to_text(dest)
        txt.write_text(text, encoding="utf-8")
        records.append({"url": url, "file": str(dest.relative_to(ROOT)), "text": str(txt.relative_to(ROOT))})
    return records


def pdf_to_text(pdf_path: Path) -> str:
    doc = fitz.open(pdf_path)
    parts = [page.get_text() for page in doc]
    doc.close()
    return "\n".join(parts).strip()


def image_to_text(image_path: Path) -> str:
    """Best-effort text extraction from pricelist JPG via PyMuPDF page render."""
    try:
        doc = fitz.open(image_path)
        text = "\n".join(page.get_text() for page in doc).strip()
        doc.close()
        return text
    except Exception:
        return ""


def parse_html_pages() -> None:
    PARSED_DIR.mkdir(parents=True, exist_ok=True)
    for html_path in sorted(PAGES_DIR.glob("*.html")):
        html = html_path.read_text(encoding="utf-8", errors="ignore")
        text = extract_content(html)
        out = PARSED_DIR / (html_path.stem + ".txt")
        out.write_text(text, encoding="utf-8")


def parse_images() -> None:
    PARSED_DIR.mkdir(parents=True, exist_ok=True)
    for img_path in sorted(IMAGES_DIR.glob("*")):
        if img_path.suffix.lower() not in {".jpg", ".jpeg", ".png"}:
            continue
        text = image_to_text(img_path)
        out = PARSED_DIR / (img_path.stem + ".txt")
        out.write_text(text or f"[image pricelist: {img_path.name}]", encoding="utf-8")


def build_key_prices(pdf_records: list[dict]) -> dict:
    """Assemble key prices from parsed text files (manual curation + regex hints)."""
    data: dict = {
        "hospital_id": "hksh",
        "name": "香港養和醫院",
        "name_en": "Hong Kong Sanatorium & Hospital",
        "scraped": "2026-07-19",
        "sources": {
            "fees_pages": [
                f"{BASE}/zh-hk/fees-and-charges",
                f"{BASE}/zh-hk/fees-and-charges/price-list",
                f"{BASE}/en/fees-charges/fee-schedules",
            ],
            "domain": BASE,
            "pricelist_cdn": "http://www.hksh.com/global/pricelist/",
        },
        "notes": [
            "Most fee schedules are JPG images on hksh.com/global/pricelist (not PDF tables)",
            "Hospital fees exclude doctor fees unless package stated",
            "Not written to data/db.js",
        ],
        "pdfs_downloaded": len(pdf_records),
        "pdfs": pdf_records,
        "images_downloaded": len(list(IMAGES_DIR.glob("*"))) if IMAGES_DIR.exists() else 0,
    }

    data["outpatient_gp_24h_happy_valley"] = {
        "weekday_9am_7pm": 400,
        "weekday_7pm_midnight": 600,
        "saturday_8am_9am": 600,
        "saturday_9am_1pm": 400,
        "saturday_1pm_midnight": 600,
        "sunday_ph_8am_midnight": 600,
        "every_day_midnight_8am": 800,
        "other_centres_first_followup": 400,
    }

    data["ward_daily"] = {
        "general_ward_range": "1400-2020",
        "semi_private_range": "3030-4030",
        "private_type_b_range": "4850-5050",
        "suite_37f": 23000,
    }

    data["operating_theatre_highlights_general_ward"] = {
        "level_1_15min": 1950,
        "level_4_60min": 8510,
        "level_7_240min": 51240,
    }

    data["imaging_outpatient_general_ward"] = {
        "ct_brain_plain": 3690,
        "ct_brain_with_contrast": 6630,
        "mri_brain_plain": 9990,
        "mri_brain_with_contrast": 15970,
    }

    data["surgery_historical_p50_general_ward"] = {
        "appendicectomy_laparoscopic": 129749,
        "cholecystectomy_laparoscopic": 116362,
        "mastectomy": 225091,
    }

    return data


def main() -> None:
    for d in (PAGES_DIR, PDF_DIR, IMAGES_DIR, PARSED_DIR):
        d.mkdir(parents=True, exist_ok=True)

    download_pages()
    images, pdfs = discover_assets()
    download_images(images)
    pdf_records = download_pdfs(pdfs)
    parse_html_pages()
    parse_images()

    key_prices = build_key_prices(pdf_records)
    (PARSED_DIR / "key-prices.json").write_text(
        json.dumps(key_prices, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )
    print(f"Done: {len(list(PAGES_DIR.glob('*.html')))} pages, "
          f"{len(list(IMAGES_DIR.glob('*')))} images, {len(pdf_records)} PDFs")


if __name__ == "__main__":
    main()
