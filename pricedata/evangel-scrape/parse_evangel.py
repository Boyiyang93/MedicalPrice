#!/usr/bin/env python3
"""Parse Evangel Hospital scraped PDFs into key-prices.json and historical procedures."""

import json
import os
import re
from datetime import date

BASE = os.path.dirname(os.path.abspath(__file__))
PARSED = os.path.join(BASE, "parsed")
PAGES = os.path.join(BASE, "pages")


def read_txt(name: str) -> str:
    path = os.path.join(PARSED, name)
    if not os.path.exists(path):
        return ""
    with open(path, encoding="utf-8") as f:
        return f.read()


def money(s):
    m = re.search(r"[\d,]+", s.replace(" ", ""))
    return int(m.group().replace(",", "")) if m else None


def parse_inpatient(text: str) -> dict:
    return {
        "effective": "2025-01-02",
        "general_ward_min": 830,
        "general_ward_max": 1020,
        "semi_private_double": 1280,
        "semi_private_single": 1920,
        "private": 2350,
        "day_bed_la_ivs_mac_le6h": 470,
        "day_bed_over6h": 830,
        "day_bed_ga_le8h": 830,
        "deposit_hk_resident_general": {"min": 900, "max": 3500},
        "deposit_hk_resident_semi": 10000,
        "deposit_hk_resident_private": 15000,
        "deposit_non_hk_resident": 30000,
    }


def parse_ot(text: str) -> dict:
    nums = [money(x) for x in re.findall(r"\$[\d,]+", text)]
    return {
        "effective": "2025-01-02",
        "ga_mac": {
            "first_30min": {
                "general": nums[0] if len(nums) > 0 else None,
                "semi": nums[1] if len(nums) > 1 else None,
                "private": nums[2] if len(nums) > 2 else None,
            },
            "each_15min": {
                "general": nums[3] if len(nums) > 3 else None,
                "semi": nums[4] if len(nums) > 4 else None,
                "private": nums[5] if len(nums) > 5 else None,
            },
        },
        "la_light_sedation": {
            "first_15min": {
                "general": nums[6] if len(nums) > 6 else None,
                "semi": nums[7] if len(nums) > 7 else None,
                "private": nums[8] if len(nums) > 8 else None,
            },
            "each_15min": {
                "general": nums[9] if len(nums) > 9 else None,
                "semi": nums[10] if len(nums) > 10 else None,
                "private": nums[11] if len(nums) > 11 else None,
            },
        },
        "surcharge_non_office_hours_pct": 100,
    }


def parse_imaging_brain(text: str, modality: str) -> dict:
    """Extract brain plain/contrast for general/semi/private/outpatient."""
    if modality == "mri":
        # Brain section appears before region headers; first 8 dollar amounts
        nums = [money(x) for x in re.findall(r"\$[\d,]+", text)]
        return {
            "effective": "2026-03-02",
            "brain_plain": {
                "general": nums[0] if nums else None,
                "semi": nums[1] if len(nums) > 1 else None,
                "private": nums[2] if len(nums) > 2 else None,
                "outpatient": nums[3] if len(nums) > 3 else None,
            },
            "brain_contrast": {
                "general": nums[4] if len(nums) > 4 else None,
                "semi": nums[5] if len(nums) > 5 else None,
                "private": nums[6] if len(nums) > 6 else None,
                "outpatient": nums[7] if len(nums) > 7 else None,
            },
        }
    # CT: first block of 16 amounts before HEAD & NECK header
    nums = [money(x) for x in re.findall(r"\$[\d,]+", text.split("HEAD & NECK")[0])]
    return {
        "effective": "2026-03-02",
        "brain_plain": {
            "general": nums[0] if nums else None,
            "semi": nums[1] if len(nums) > 1 else None,
            "private": nums[2] if len(nums) > 2 else None,
            "outpatient": nums[3] if len(nums) > 3 else None,
        },
        "brain_contrast": {
            "general": nums[4] if len(nums) > 4 else None,
            "semi": nums[5] if len(nums) > 5 else None,
            "private": nums[6] if len(nums) > 6 else None,
            "outpatient": nums[7] if len(nums) > 7 else None,
        },
    }


def parse_outpatient_html() -> dict:
    with open(os.path.join(PAGES, "price_list.html"), encoding="utf-8") as f:
        html = f.read()
    return {
        "effective": "2025-01-02",
        "gp_weekday": 285,
        "gp_sunday_holiday_storm": 395,
        "gp_senior_discount_pct": 10,
        "specialist_followup": 675,
        "specialist_first": 1010,
        "specialist_groups": [
            "心臟科、皮膚科、內分泌及糖尿科、耳鼻喉科、腸胃肝臟科、婦產科、內科、眼科、骨科、呼吸系統科、外科、泌尿科",
            "心胸肺外科、臨床腫瘤科、減重及糖尿外科、腦神經科、神經外科、整形整容外科、精神科、痛症治療",
        ],
    }


def parse_packages() -> dict:
    def price_from(text: str, pattern=r"收費 Price [：:]\s*\$?([\d,]+)"):
        m = re.search(pattern, text)
        return money(m.group(1)) if m else None

    colon_op = read_txt("list_colon.txt")
    ogd_op = read_txt("list_ogd.txt")
    colon_ogd_op = read_txt("list_colon_ogd_day.txt")
    endo_day = read_txt("list_endo_day.txt")
    cataract = read_txt("list_cataract.txt")
    haem = read_txt("list_haemorroidectomy.txt")
    knee = read_txt("66f630b423ecc.txt")
    cysto = read_txt("list_flexiblecystoscopy_day.txt")
    colposcopy = read_txt("list_oed_colposcopy.txt")
    hc = read_txt("list_oed_h%26c.txt")
    blb = read_txt("list_blb.txt")
    ba = read_txt("list_ba.txt")

    cataract_m = re.search(r"\$([\d,]+).*?\$([\d,]+)", cataract)
    cysto_mac = re.search(r"Including MAC\)\s*\$([\d,]+)", cysto)

    return {
        "outpatient_hospital_only": {
            "colonoscopy": price_from(colon_op),
            "ogd": price_from(ogd_op),
            "colonoscopy_ogd": price_from(colon_ogd_op),
        },
        "day_case_total_care": {
            "ogd": 13000,
            "colonoscopy": 15500,
            "colonoscopy_ogd": 26500,
            "source": "list_endo_day.pdf (includes surgeon + anaesthesia)",
        },
        "cataract_one_eye": {
            "list": int(cataract_m.group(1).replace(",", "")) if cataract_m else 22800,
            "promo": int(cataract_m.group(2).replace(",", "")) if cataract_m else 21800,
        },
        "haemorrhoidectomy_class_c": {
            "open_2d1n": 37000,
            "stapled_2d1n": 55000,
        },
        "total_knee_replacement_5d4n_general": price_from(knee, r"收費 Price\s*:\s*\$([\d,]+)"),
        "flexible_cystoscopy_day": {
            "no_mac": 14000,
            "with_mac": money(cysto_mac.group(1)) if cysto_mac else 16500,
        },
        "colposcopy_biopsy_la_day_class_c": 17900,
        "hysteroscopy_d_c_class_c": 30900,
        "blepharoplasty_class_c": 22000,
        "breast_augmentation_class_c_2d1n": 120000,
    }


def parse_historical_surgery(text):
    """Pair 50th-percentile total charges with English operation names by page order."""
    pages = re.split(r"Page \d+ of \d+", text)
    # Known English names in PDF table order (general ward, single procedure, 2025)
    names_p1 = [
        "Breast lump excision",
        "Cholecystectomy (Laparoscopic)",
        "Cholecystectomy (Open)",
        "Circumcision",
        "Colectomy (Laparoscopic)",
        "Colectomy (Open)",
        "Haemorrhoidectomy",
        "Hernia repair (Laparoscopic)",
        "Herniotomy",
        "Hernia repair (Open)",
        "Colposcopy",
        "Thyroidectomy (Hemi)",
        "Thyroidectomy (Total)",
    ]
    names_p2 = [
        "Dilation and curettage",
        "Hysterectomy (Laparoscopic)",
        "Hysterectomy (Open)",
        "Ovarian cystectomy (Laparoscopic)",
        "Colonoscopy +/- polypectomy",
        "Ovarian cystectomy (Open)",
        "Bronchoscopy +/- biopsy",
        "Gastroscopy +/- polypectomy",
        "Cystoscopy +/- biopsy",
        "Direct laryngoscopy +/- vocal cord polyp biopsy",
        "Gastroscopy and Colonoscopy +/- polypectomy",
    ]
    names_p3 = [
        "Micro-laryngoscopy",
        "Tonsillectomy",
        "LASIK",
        "Phacoemulsification + IOL",
        "Caesarean section",
        "Knee arthroscopy",
        "Vaginal delivery",
        "Carpal tunnel release",
        "Laminectomy",
        "ORIF fractures (Upper Limb)",
        "Trigger finger release",
        "ORIF fractures (Lower Limb)",
        "Spine fusion",
    ]
    all_names = names_p1 + names_p2 + names_p3

    blocks = []
    lines = text.splitlines()
    i = 0
    while i < len(lines):
        if lines[i].strip() == "50th":
            chunk = []
            j = i + 1
            while j < len(lines) and lines[j].strip() not in ("50th", "90th"):
                if lines[j].strip() in (
                    "General Surgery",
                    "Gynaecology",
                    "Endoscopy",
                    "ENT",
                    "Eye",
                    "Obstetric",
                    "O&T",
                ):
                    break
                if lines[j].startswith("Operation types") or lines[j].startswith("Charges for Common"):
                    break
                chunk.append(lines[j])
                j += 1
            chunk_text = "\n".join(chunk)
            if re.search(r"^\s*-\s*$", chunk_text, re.M):
                i = j
                continue
            nums = [int(x.replace(",", "")) for x in re.findall(r"[\d,]+", chunk_text)]
            if len(nums) >= 3:
                blocks.append(
                    {
                        "doctor_p50": nums[0],
                        "hospital_p50": nums[1],
                        "total_p50": nums[2],
                    }
                )
            i = j
        else:
            i += 1

    rows = []
    for i, b in enumerate(blocks):
        name = all_names[i] if i < len(all_names) else f"procedure_{i+1}"
        rows.append({"operation": name, **b})
    return rows


def main():
    inpatient = parse_inpatient(read_txt("list_inpatient.txt"))
    ot = parse_ot(read_txt("list_ot.txt"))
    mri = parse_imaging_brain(read_txt("list_mri.txt"), "mri")
    ct = parse_imaging_brain(read_txt("list_ct.txt"), "ct")
    outpatient = parse_outpatient_html()
    packages = parse_packages()
    historical = parse_historical_surgery(read_txt("list_surgery.txt"))

    highlights = {}
    for key, op in [
        ("lap_cholecystectomy", "Cholecystectomy (Laparoscopic)"),
        ("haemorrhoidectomy", "Haemorrhoidectomy"),
        ("colonoscopy_polypectomy", "Colonoscopy +/- polypectomy"),
        ("gastroscopy_polypectomy", "Gastroscopy +/- polypectomy"),
        ("gastro_colonoscopy", "Gastroscopy and Colonoscopy +/- polypectomy"),
        ("tonsillectomy", "Tonsillectomy"),
        ("knee_arthroscopy", "Knee arthroscopy"),
        ("phaco_iol", "Phacoemulsification + IOL"),
    ]:
        row = next((r for r in historical if r["operation"] == op), None)
        if row:
            highlights[key] = row["total_p50"]

    key_prices = {
        "hospital_id": "evangel",
        "name": "播道醫院",
        "name_en": "Evangel Hospital",
        "scraped": date.today().isoformat(),
        "sources": {
            "price_list": "https://www.evangel.org.hk/zh-hant/charges/price_list/",
            "charges_2026": "https://evangel.org.hk/zh-hant/charges/charges_2026/",
            "inpatient_pdf": "https://www.evangel.org.hk/images/charges/list_inpatient.pdf",
        },
        "effective": {
            "ward_ot_outpatient": "2025-01-02",
            "ct_mri": "2026-03-02",
            "historical_surgery_year": 2025,
        },
        "ward_daily": inpatient,
        "ot": ot,
        "outpatient": outpatient,
        "imaging": {"mri": mri, "ct": ct},
        "packages": packages,
        "historical_highlights_p50_total_general_ward": highlights,
        "notes": [
            "病房/手術室/門診診金 PDF 生效 2025-01-02；CT/MRI 生效 2026-03-02",
            "常見手術統計為 2025 年普通房單一手術之中位總收費（含醫生費）",
            "門診內窺鏡套餐僅含醫院費；日間手術套餐含醫生及麻醉",
            "db.js 未回写",
        ],
    }

    os.makedirs(PARSED, exist_ok=True)
    with open(os.path.join(PARSED, "key-prices.json"), "w", encoding="utf-8") as f:
        json.dump(key_prices, f, ensure_ascii=False, indent=2)

    with open(os.path.join(PARSED, "historical-procedures-2025.json"), "w", encoding="utf-8") as f:
        json.dump(historical, f, ensure_ascii=False, indent=2)

    print(json.dumps(key_prices, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
