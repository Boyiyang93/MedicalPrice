#!/usr/bin/env python3
"""Finalize TWAH/HKAH scrapes: download PDFs from cached pages, extract text, write key-prices."""

from __future__ import annotations

import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

REPO = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(REPO / "pricedata"))
from adventist_scrape import (  # noqa: E402
    TODAY,
    download,
    extract_pdf_urls,
    normalize_url,
    pdf_to_text,
    safe_name,
    write_readme,
)

MATILDA_PYDEPS = REPO / "pricedata" / "matilda-scrape" / "_pydeps"
sys.path.insert(0, str(MATILDA_PYDEPS))


class TextExtractor(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.parts: list[str] = []
        self._skip = False

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag in ("script", "style"):
            self._skip = True

    def handle_endtag(self, tag: str) -> None:
        if tag in ("script", "style"):
            self._skip = False
        if tag in ("p", "br", "tr", "div", "li", "h1", "h2", "h3", "td"):
            self.parts.append("\n")

    def handle_data(self, data: str) -> None:
        if not self._skip and data.strip():
            self.parts.append(data.strip() + " ")

    def text(self) -> str:
        return re.sub(r"\n{3,}", "\n\n", "".join(self.parts))


def html_to_text(html: str) -> str:
    p = TextExtractor()
    p.feed(html)
    return p.text()


def collect_pdfs_from_pages(pages_dir: Path) -> dict[str, str]:
    pdfs: dict[str, str] = {}
    for page in pages_dir.glob("*.html"):
        html = page.read_text(encoding="utf-8")
        base = "https://example.com/" + page.name
        for pdf in extract_pdf_urls(html, base):
            pdfs.setdefault(pdf, page.name)
    return pdfs


def sync_pdfs(out_dir: Path) -> list[dict]:
    pages_dir = out_dir / "pages"
    pdfs_dir = out_dir / "pdfs"
    parsed_dir = out_dir / "parsed"
    manifest: list[dict] = []
    for pdf_url, source in sorted(collect_pdfs_from_pages(pages_dir).items()):
        fname = safe_name(pdf_url)
        pdf_path = pdfs_dir / fname
        entry = {"url": normalize_url(pdf_url), "source_page": source}
        try:
            download(pdf_url, pdf_path)
            txt_path = parsed_dir / (pdf_path.stem + ".txt")
            if not txt_path.exists() or txt_path.stat().st_size == 0:
                pdf_to_text(pdf_path, txt_path)
            entry["file"] = f"pdfs/{fname}"
            entry["text"] = f"parsed/{txt_path.name}"
        except Exception as exc:
            entry["error"] = str(exc)
        manifest.append(entry)
    return manifest


def save_key_html_extracts(out_dir: Path, mapping: dict[str, str]) -> None:
    parsed = out_dir / "parsed"
    for slug, page_name in mapping.items():
        page = out_dir / "pages" / page_name
        if page.exists():
            (parsed / f"{slug}.txt").write_text(html_to_text(page.read_text(encoding="utf-8")), encoding="utf-8")


def build_twah_key(pdfs: list[dict]) -> dict:
    return {
        "hospital_id": "twah",
        "name": "荃灣港安醫院",
        "scraped": TODAY,
        "sources": {
            "fees_pages": [
                "https://www.twah.org.hk/tc/fees-and-charges",
                "https://www.twah.org.hk/en/fees-and-charges",
            ],
            "domain": "https://www.twah.org.hk",
        },
        "effective": {
            "opd_pdf": "2026-06-29",
            "operating_theatre": "2026-06-01",
            "radiology": "2026-06",
            "surgery_historical": "2025 calendar year data",
            "ward_html": "current on website",
        },
        "pdfs_downloaded": sum(1 for p in pdfs if p.get("file")),
        "pdfs": pdfs,
        "outpatient": {
            "general_gp_weekday": 270,
            "urgent_care_weekday_08_20": 480,
            "urgent_care_night_20_24": 800,
            "urgent_care_night_0_8": 950,
            "urgent_care_weekend_holiday_08_24": 800,
            "specialist_examples": {
                "general_surgery": 600,
                "cardiology": "800-1200",
                "dermatology_ent": 650,
            },
            "note": "4 OPD_2026 PDF; facility fee HK$500/30min + HK$1500 procedure from site policy",
        },
        "ward_daily_general_ward": {
            "standard_3_beds": 1000,
            "semi_private_2_beds": 1250,
            "semi_private_single": 2200,
            "premium_private_single": 3500,
            "day_bed_standard": 700,
            "deposit_standard": 10000,
        },
        "operating_theatre_first_30min": {
            "standard": 3000,
            "semi_private": 4500,
            "premium_private": 5100,
            "low_charge_bed": 2250,
        },
        "imaging_standard_ward": {
            "ct_brain_plain": 2900,
            "ct_brain_contrast": 3900,
            "ct_brain_plain_contrast": 4800,
            "mri_brain_plain": 6900,
            "mri_brain_contrast": 10700,
            "opd_ct_brain_plain": 2500,
            "opd_mri_brain_plain": 6400,
        },
        "surgery_historical_p50_total": {
            "note": "2025 standard-room statistics; includes doctor + hospital",
            "cholecystectomy_lap": 50325,
            "colonoscopy_day": 46678,
            "gastro_colonoscopy_day": 57452,
            "caesarean": 130111,
            "haemorrhoidectomy": 70732,
        },
        "notes": [
            "Hospital fee PDFs exclude doctor fees unless package/total",
            "Not written to data/db.js",
        ],
    }


def build_hkah_key(pdfs: list[dict]) -> dict:
    return {
        "hospital_id": "hkah",
        "name": "香港港安醫院–司徒拔道",
        "scraped": TODAY,
        "sources": {
            "fees_pages": [
                "https://www.hkah.org.hk/tc/fees-and-charges",
                "https://www.hkah.org.hk/en/fees-and-charges",
                "https://www.hkah.org.hk/en/fees-and-charges/out-patient-consultation-fee/out-patient-consultation-fee-2",
            ],
            "domain": "https://www.hkah.org.hk",
        },
        "effective": {
            "imaging": "2026-01-01",
            "ward_html": "current on website",
            "surgery_historical_pdf": "2025 Historical Bill Size",
        },
        "pdfs_downloaded": sum(1 for p in pdfs if p.get("file")),
        "pdfs": pdfs,
        "outpatient": {
            "urgent_care_24h": 1200,
            "facility_fee_30min": 500,
            "facility_procedure": 1500,
            "general_practice_initial": 980,
            "general_practice_followup": 780,
            "specialist_initial_range": {"min": 800, "max": 2800},
            "note": "OPD consultation HTML table + facility fees from Oct 2021",
        },
        "ward_daily_general_ward": {
            "standard_3_4_beds": 900,
            "semi_private_single": 2300,
            "semi_private_range": "2300-2800",
            "private_single": 3900,
            "vip_private": 9000,
            "day_bed_standard": 500,
        },
        "operating_theatre_first_hour_standard": {
            "major_or": 3570,
            "minor_or": 950,
            "note": "Operating Rooms HTML; first-hour tier for standard ward",
        },
        "imaging_standard_ward_effective_2026_01_01": {
            "ct_brain_plain": 3450,
            "ct_brain_with_contrast": 6220,
            "mri_brain_plain": 9320,
            "mri_brain_with_contrast": 14560,
            "opd_ct_brain_plain": 2833,
            "opd_mri_brain_plain": 7644,
        },
        "surgery_historical": {
            "note": "2025 Historical Bill Size PDF on reference surgical procedures page",
            "source_pdf": "2025 Historical Bill Szie_v4 (4)_.pdf",
        },
        "notes": [
            "Hospital fees exclude doctor fees unless package stated",
            "Not written to data/db.js",
        ],
    }


def main() -> None:
    configs = [
        (
            REPO / "pricedata" / "twah-scrape",
            build_twah_key,
            {
                "ward-accommodation": "en_fees-and-charges_charges-for-in-patient-services_charges-on-ward-accommodation-2.html",
                "opd-consultation-page": "en_fees-and-charges_charges-for-out-patient-services_charges-for-opd-specialist-clinic-consultation-2.html",
            },
        ),
        (
            REPO / "pricedata" / "hkah-scrape",
            build_hkah_key,
            {
                "opd-consultation": "en_fees-and-charges_out-patient-consultation-fee_out-patient-consultation-fee-2.html",
                "daily-room-rates": "en_fees-and-charges_facilities_daily-room-rates.html",
                "diagnostic-imaging": "en_fees-and-charges_ancillary-services-fees_diagnostic-imaging-department.html",
                "operating-rooms": "en_fees-and-charges_facilities_operating-rooms.html",
            },
        ),
    ]
    for out_dir, builder, html_map in configs:
        print(f"Finalizing {out_dir.name}...")
        pdfs = sync_pdfs(out_dir)
        save_key_html_extracts(out_dir, html_map)
        key = builder(pdfs)
        parsed = out_dir / "parsed" / "key-prices.json"
        parsed.write_text(json.dumps(key, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        write_readme(out_dir, key["name"], key)
        print(f"  PDFs ok: {key['pdfs_downloaded']}/{len(pdfs)}")


if __name__ == "__main__":
    main()
