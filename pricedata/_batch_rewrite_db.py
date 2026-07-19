#!/usr/bin/env python3
"""Batch rewrite db.js from scraped key-prices."""
from pathlib import Path
import re
import sys

DB = Path(__file__).resolve().parents[1] / "data" / "db.js"


def fmt(n):
    return f"${int(round(n)):,}"


def fmt_range(a, b):
    if a == b:
        return fmt(a)
    return f"{fmt(a)} – {fmt(b)}"


def find_brace_block(src, open_idx):
    depth = 0
    i = open_idx
    while i < len(src):
        c = src[i]
        if c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                return i
        i += 1
    raise SystemExit(f"unclosed brace at {open_idx}")


def replace_hospital_block(src, module_anchor, hid, new_obj_js, nested_under=None):
    m = re.search(rf"(^|\n)(\s*){re.escape(module_anchor)}:\s*\{{", src)
    if not m:
        raise SystemExit(f"module not found: {module_anchor}")
    start = m.end() - 1
    mod_end = find_brace_block(src, start)
    section = src[start : mod_end + 1]

    if nested_under:
        nm = re.search(rf"\b{re.escape(nested_under)}:\s*\{{", section)
        if not nm:
            raise SystemExit(f"nested not found: {module_anchor}.{nested_under}")
        ns = nm.end() - 1
        ne = find_brace_block(section, ns)
        section_nested = section[ns : ne + 1]
        new_nested = replace_in_section(section_nested, hid, new_obj_js)
        new_section = section[:ns] + new_nested + section[ne + 1 :]
        return src[:start] + new_section + src[mod_end + 1 :]

    new_section = replace_in_section(section, hid, new_obj_js)
    return src[:start] + new_section + src[mod_end + 1 :]


def replace_in_section(section, hid, new_obj_js):
    pat = re.compile(rf"(\n\s*){re.escape(hid)}:\s*\{{")
    m = pat.search(section)
    if not m:
        raise SystemExit(f"hospital {hid} not found in section")
    brace_start = m.end() - 1
    brace_end = find_brace_block(section, brace_start)
    indent = m.group(1)
    replacement = f"{indent}{hid}: {new_obj_js.strip()}"
    had_comma = section[brace_end + 1 :].startswith(",")
    if had_comma:
        replacement += ","
        return section[: m.start()] + replacement + section[brace_end + 2 :]
    rest = section[brace_end + 1 :]
    if re.search(r"\n\s*\w+:\s*\{", rest):
        replacement += ","
    return section[: m.start()] + replacement + section[brace_end + 1 :]


def obj_outpatient(regular, night, holiday, remarks, link=None, display=None, slots=None):
    lines = ["{"]
    if link:
        lines.append(f'        link: "{link}",')
    lines.append("        prices: {")
    lines.append(f"          regular: {regular},")
    lines.append(f"          night: {night},")
    lines.append(f"          holiday: {holiday}")
    lines.append("        },")
    if display:
        lines.append("        displayPrices: {")
        lines.append(f'          regular: "{display[0]}",')
        lines.append(f'          night: "{display[1]}",')
        lines.append(f'          holiday: "{display[2]}"')
        lines.append("        },")
    if slots:
        lines.append("        timeSlots: {")
        lines.append(f'          regular: "{slots[0]}",')
        lines.append(f'          night: "{slots[1]}",')
        lines.append(f'          holiday: "{slots[2]}"')
        lines.append("        },")
    lines.append(f'        remarks: "{remarks}"')
    lines.append("      }")
    return "\n".join(lines)


def obj_ward(std, semi, priv, r_std, r_semi, r_priv, link=None):
    lines = ["{"]
    if link:
        lines.append(f'        link: "{link}",')
    lines.append("        prices: {")
    lines.append(f"          standard: {std},")
    lines.append(f"          semiPrivate: {semi},")
    lines.append(f"          private: {priv}")
    lines.append("        },")
    lines.append("        ranges: {")
    lines.append(f'          standard: "{r_std}",')
    lines.append(f'          semiPrivate: "{r_semi}",')
    lines.append(f'          private: "{r_priv}"')
    lines.append("        }")
    lines.append("      }")
    return "\n".join(lines)


def obj_imaging(price, label, display, remarks, link=None, tags=None):
    lines = ["{"]
    lines.append(f"          price: {price},")
    if price != 9999999:
        lines.append(f'          priceLabel: "{label}",')
        lines.append(f'          displayPrice: "{display}",')
    lines.append(f'          remarks: "{remarks}"' + ("," if (link or tags) else ""))
    if link:
        lines.append(f'          link: "{link}"' + ("," if tags else ""))
    if tags:
        tag_str = ", ".join(f'"{t}"' for t in tags)
        lines.append(f"          tags: [{tag_str}]")
    lines.append("        }")
    return "\n".join(lines)


def obj_proc(price, label, display, remarks, link=None):
    lines = ["{"]
    if price == 9999999:
        lines.append("        price: 9999999,")
        lines.append(f'        remarks: "{remarks}"')
    else:
        lines.append(f"        price: {int(round(price))},")
        lines.append(f'        priceLabel: "{label}",')
        lines.append(f'        displayPrice: "{display}",')
        lines.append(f'        remarks: "{remarks}"' + ("," if link else ""))
        if link:
            lines.append(f'        link: "{link}"')
    lines.append("      }")
    return "\n".join(lines)


def set_img(d, hid, price, contrast, label, remarks, link=None):
    disp = fmt_range(price, contrast) if contrast and contrast != price else fmt(price)
    rem = remarks
    if contrast and contrast != price:
        rem = remarks + f" 加顯影約 {fmt(contrast)}。"
    d[hid] = obj_imaging(price, label, disp, rem, link=link)


def main():
    text = DB.read_text(encoding="utf-8")
    print(f"loaded {len(text)} chars", flush=True)

    OP = {}
    OP["matilda"] = obj_outpatient(
        590,
        900,
        800,
        "24小時門診普通科診金（2026-02-01起）。不含藥費、化驗及程序費。",
        link="https://www.matilda.org/zh-hk/fees-and-packages/hospital-fees",
        display=("$590", "$900 – $1,000", "$800"),
        slots=(
            "每日 08:00-20:00（周日及公眾假期除外）",
            "每日 20:00-08:00",
            "周日及公眾假期 08:00-20:00",
        ),
    )
    OP["sth"] = obj_outpatient(
        280,
        430,
        350,
        "門診部駐院醫生診金（FeeSchedule 2026-07-01起）。不含特別檢查/手術、藥費及物料。",
        link="https://www.sth.org.hk/charge.asp?lang_code=zh",
        display=("$280", "$430", "$350 – $470"),
        slots=(
            "一至六 08:00-19:59",
            "一至六 20:00-07:59",
            "周日及公眾假期 08:00-19:59（夜間 $470）",
        ),
    )
    OP["baptist"] = obj_outpatient(
        400,
        900,
        600,
        "24小時門診醫院診金（2026-07-01起）。不含藥費、化驗及程序費。",
        link="https://www.hkbh.org.hk/fees-charges/general-services-charges/",
        display=("$400", "$600 – $900", "$600 – $900"),
        slots=(
            "一至五 08:00-18:00；周六 08:00-13:00",
            "平日 18:00-08:00；周六 13:00-08:00",
            "周日及公眾假期全日",
        ),
    )
    OP["canossa"] = obj_outpatient(
        388,
        800,
        500,
        "24小時門診普通科診金（官网价目）。不含藥費、化驗及特別治療。",
        link="https://www.canossahospital.org.hk/tc/service/24_hours_out_patient_services/fees_and_charges/",
        display=("$388", "$500 – $800", "$500 – $800"),
        slots=(
            "一至五 08:00-17:59；周六 08:00-12:59",
            "平日 18:00-07:59；周六 13:00-07:59",
            "周日及公眾假期 08:00-23:59（夜間 $800）",
        ),
    )
    OP["sph"] = obj_outpatient(
        280,
        430,
        350,
        "24小時門診普通科診金（服務收費 2026-07-16通告）。非當值專科回院另計。",
        link="https://www.stpaul.org.hk/tc/charges",
        display=("$280", "$430 – $470", "$350 – $470"),
        slots=("一至六 08:00-20:00", "每日 20:00-08:00", "周日及公眾假期 08:00-20:00"),
    )
    OP["pbh"] = obj_outpatient(
        280,
        390,
        390,
        "門診部駐院醫生診金（2025-01-01起）。65歲以上減$20。不含藥費、化驗及程序費。",
        link="https://www.pbh.hk/service-fee-adjustment/",
        display=("$280", "$390", "$390"),
        slots=(
            "一至六 08:00-19:59",
            "一至六 20:00-22:00",
            "周日、公眾假期、八號風球及黑色暴雨",
        ),
    )
    OP["evangel"] = obj_outpatient(
        285,
        9999,
        395,
        "全科門診診金（2025-01-02起）。不設通宵急症。65歲以上診金及藥費九折。不含藥費及化驗。",
        link="https://www.evangel.org.hk/zh-hant/charges/price_list/",
        display=("$285", "時段不設全科門診", "$395"),
        slots=("一至六日間（約07:00-21:00）", "不設夜間門診", "周日、公眾假期及惡劣天氣"),
    )
    OP["twah"] = obj_outpatient(
        270,
        950,
        800,
        "門診/急症診金（OPD PDF 2026-06）。急症夜間較高。不含藥費、化驗及程序費。",
        link="https://www.twah.org.hk/tc/fees-and-charges",
        display=("$270 – $480", "$800 – $950", "$800"),
        slots=("平日全科/急症日間", "急症 20:00-08:00", "周末及公眾假期急症"),
    )
    OP["hkah"] = obj_outpatient(
        980,
        1200,
        1200,
        "普通科初診$980／覆診$780；24小時急症診金$1,200（2025-10-17起）。特別診症另收設施費。",
        link="https://www.hkah.org.hk/en/fees-and-charges/out-patient-consultation-fee/out-patient-consultation-fee-2",
        display=("$980", "$1,200", "$1,200"),
        slots=("普通科門診辦公時間", "24小時急症服務", "急症服務全日"),
    )
    OP["hksh"] = obj_outpatient(
        400,
        800,
        600,
        "Happy Valley 24小時普通科診金（價目表）。診金以取票時間為準。不含藥費及程序費。",
        link="https://www.hksh-hospital.com/zh-hk/fees-and-charges/price-list",
        display=("$400", "$600 – $800", "$600"),
        slots=(
            "一至五 09:00-19:00；周六 09:00-13:00",
            "平日夜間及每日 00:00-08:00",
            "周日及公眾假期 08:00-00:00",
        ),
    )

    WD = {
        "matilda": obj_ward(
            1100,
            2300,
            4500,
            "$1,100",
            "$2,300",
            "$4,500 – $6,500",
            link="https://www.matilda.org/zh-hk/fees-and-packages/hospital-fees",
        ),
        "sth": obj_ward(
            610,
            1000,
            2100,
            "$610 – $800",
            "$1,000 – $1,750",
            "$2,100 – $4,100",
            link="https://www.sth.org.hk/download/RoomCharges.pdf",
        ),
        "baptist": obj_ward(
            850,
            1900,
            3880,
            "$850 – $1,200",
            "$1,900 – $2,800",
            "$3,880 – $4,880",
            link="https://www.hkbh.org.hk/fees-charges/room-types-rates/",
        ),
        "canossa": obj_ward(
            800,
            2600,
            4200,
            "$800 – $1,100",
            "$2,600",
            "$4,200",
            link="https://canossahospital.org.hk/tc/fee/accommodation_charges/",
        ),
        "sph": obj_ward(
            760,
            1380,
            3800,
            "$760 – $900",
            "$1,380 – $1,480",
            "$3,800 – $4,880",
            link="https://www.stpaul.org.hk/tc/charges/room-charge",
        ),
        "pbh": obj_ward(
            850,
            1280,
            2350,
            "$850",
            "$1,280 – $1,850",
            "$2,350",
            link="https://www.pbh.hk/service-fee-adjustment/",
        ),
        "evangel": obj_ward(
            830,
            1280,
            2350,
            "$830 – $1,020",
            "$1,280 – $1,920",
            "$2,350",
            link="https://www.evangel.org.hk/images/charges/list_inpatient.pdf",
        ),
        "twah": obj_ward(
            1000,
            1250,
            3500,
            "$1,000",
            "$1,250 – $2,200",
            "$3,500",
            link="https://www.twah.org.hk/tc/fees-and-charges",
        ),
        "hkah": obj_ward(
            900,
            2300,
            3900,
            "$900",
            "$2,300 – $2,800",
            "$3,900 – $9,000",
            link="https://www.hkah.org.hk/tc/fees-and-charges",
        ),
        "hksh": obj_ward(
            1400,
            3030,
            4850,
            "$1,400 – $2,020",
            "$3,030 – $4,030",
            "$4,850 – $6,950",
            link="https://www.hksh-hospital.com/zh-hk/fees-and-charges/price-list",
        ),
    }

    CT, MRI = {}, {}
    set_img(
        CT,
        "matilda",
        2800,
        5900,
        "CT 腦部平掃（標準房）",
        "✓ 醫院收費表（2026-02-01）。標準房/基本收費。",
        "https://www.matilda.org/zh-hk/fees-and-packages/hospital-fees",
    )
    set_img(
        MRI,
        "matilda",
        6930,
        10260,
        "MRI 腦部平掃（標準房）",
        "✓ 醫院收費表（2026-02-01）。",
        "https://www.matilda.org/zh-hk/fees-and-packages/hospital-fees",
    )
    set_img(
        CT,
        "sth",
        2100,
        3900,
        "CT 腦部平掃",
        "✓ 掃描部基本收費（標準房/門診，2024-07-01／FeeSchedule 2026-07-01）。",
        "https://www.sthscan.com/hk/charges/",
    )
    set_img(
        MRI,
        "sth",
        6260,
        10100,
        "MRI 腦部平掃",
        "✓ 掃描部基本收費（標準房/門診）。",
        "https://www.sthscan.com/hk/charges/",
    )
    set_img(
        CT,
        "baptist",
        2380,
        4450,
        "CT 腦部平掃",
        "✓ 放射診斷收費（標準房/門診，2026-01-01）。",
        "https://www.hkbh.org.hk/fees-charges/general-services-charges/",
    )
    set_img(
        MRI,
        "baptist",
        6740,
        10200,
        "MRI 腦部平掃",
        "✓ 放射診斷收費（標準房/門診）。",
        "https://www.hkbh.org.hk/fees-charges/general-services-charges/",
    )
    set_img(
        CT,
        "sph",
        2400,
        4300,
        "CT 腦部平掃",
        "✓ 放射部收費（標準房/門診）。",
        "https://www.stpaul.org.hk/tc/charges",
    )
    set_img(
        MRI,
        "sph",
        6430,
        9940,
        "MRI 腦部平掃",
        "✓ 放射部收費（標準房/門診）。",
        "https://www.stpaul.org.hk/tc/charges",
    )
    set_img(
        CT,
        "pbh",
        2275,
        3950,
        "CT 腦部平掃",
        "✓ 影像診斷服務收費（2025-06-10）。",
        "https://www.pbh.hk/service-fee-adjustment/",
    )
    set_img(
        MRI,
        "pbh",
        5730,
        9245,
        "MRI 腦部平掃",
        "✓ 影像診斷服務收費（2025-06-10）。",
        "https://www.pbh.hk/service-fee-adjustment/",
    )
    set_img(
        CT,
        "evangel",
        2300,
        4000,
        "CT 腦部平掃（普通房）",
        "✓ 掃描服務收費（2026-03-02）。門診平掃約 $2,000。",
        "https://www.evangel.org.hk/zh-hant/charges/price_list/",
    )
    set_img(
        MRI,
        "evangel",
        6200,
        10000,
        "MRI 腦部平掃（普通房）",
        "✓ 磁力共振收費（2026-03-02）。門診平掃約 $5,500。",
        "https://www.evangel.org.hk/zh-hant/charges/price_list/",
    )
    set_img(
        CT,
        "twah",
        2900,
        3900,
        "CT 腦部平掃",
        "✓ 放射診斷收費（標準房，2026-06）。",
        "https://www.twah.org.hk/tc/fees-and-charges",
    )
    set_img(
        MRI,
        "twah",
        6900,
        10700,
        "MRI 腦部平掃",
        "✓ 放射診斷收費（標準房）。",
        "https://www.twah.org.hk/tc/fees-and-charges",
    )
    set_img(
        CT,
        "hkah",
        3450,
        6220,
        "CT 腦部平掃",
        "✓ 影像收費（標準房，2026-01-01）。門診平掃約 $2,833。",
        "https://www.hkah.org.hk/tc/fees-and-charges",
    )
    set_img(
        MRI,
        "hkah",
        9320,
        14560,
        "MRI 腦部平掃",
        "✓ 影像收費（標準房，2026-01-01）。門診平掃約 $7,644。",
        "https://www.hkah.org.hk/tc/fees-and-charges",
    )
    set_img(
        CT,
        "hksh",
        3690,
        6630,
        "CT 腦部平掃",
        "✓ 價目表（門診/普通房級，2026-08）。",
        "https://www.hksh-hospital.com/zh-hk/fees-and-charges/price-list",
    )
    set_img(
        MRI,
        "hksh",
        9990,
        15970,
        "MRI 腦部平掃",
        "✓ 價目表（門診/普通房級，2026-08）。",
        "https://www.hksh-hospital.com/zh-hk/fees-and-charges/price-list",
    )

    CH = {
        "sth": obj_proc(
            92680,
            "腹腔鏡膽囊切除術",
            "HK$92,680 – $115,725",
            "⚠️ 2025年歷史統計（標準房）。總收費=醫生費+醫院費。平均住院約2.2日。",
            "https://www.sth.org.hk/download/zh/ccssp.pdf",
        ),
        "baptist": obj_proc(
            97093,
            "腹腔內視鏡膽囊切除術",
            "HK$97,093 – $187,508",
            "⚠️ 2025年歷史統計（標準房）。總收費=醫生費+醫院費。平均住院約2.8日。",
            "https://www.hkbh.org.hk/fees-charges/pilot-programme-for-enhancing-price-transparency-for-private-hospitals/",
        ),
        "canossa": obj_proc(
            122704,
            "膽囊切除術（腹腔鏡）",
            "HK$122,704 – $210,661",
            "⚠️ 2025年常見程序參考費用（普通病房）。總收費=醫生費+醫院費。",
            "https://www.canossahospital.org.hk/tc/fee/pilot_programme_for_enhancing_price_transparency_for_private_hospitals/",
        ),
        "sph": obj_proc(
            91039,
            "腹腔鏡膽囊切除術",
            "HK$91,039",
            "⚠️ 2025年歷史賬目（標準房）。總收費=醫生費+醫院費。平均住院約2.0日。",
            "https://www.stpaul.org.hk/tc/charges",
        ),
        "pbh": obj_proc(
            102843,
            "膽囊切除術",
            "HK$102,843 – $124,200",
            "⚠️ 2025年常見手術參考（標準房）。總收費統計；實際視病情及醫生收費而定。",
            "https://www.pbh.hk/service-fee-adjustment/",
        ),
        "evangel": obj_proc(
            37347,
            "腹腔鏡膽囊切除術",
            "HK$37,347",
            "⚠️ 2025年歷史統計（普通房）五十分位總收費。另有日間/套餐價目請查官网。",
            "https://www.evangel.org.hk/zh-hant/charges/price_list/",
        ),
        "twah": obj_proc(
            50325,
            "腹腔鏡膽囊切除術",
            "HK$50,325",
            "⚠️ 2025年常見手術統計（標準房）。總收費含醫生費及醫院費。",
            "https://www.twah.org.hk/tc/fees-and-charges",
        ),
        "hksh": obj_proc(
            116362,
            "腹腔鏡膽囊切除術",
            "HK$116,362",
            "⚠️ 2025年先導計劃歷史賬目中位數（普通房）。總收費=醫生費+醫院費。",
            "https://www.hksh-hospital.com/zh-hk/fees-charges/historical-bill-sizes-statistics",
        ),
    }

    GS = {
        "matilda": obj_proc(
            9300,
            "胃鏡檢查 - 睡眠監察麻醉",
            "HK$9,300 – $13,700",
            "✓ 醫院套餐（不含醫生費，2026价目）。標準/雙人/私家房。全面護理套餐另計。",
            "https://www.matilda.org/zh-hk/fees-and-packages/hospital-packages",
        ),
        "sth": obj_proc(
            19870,
            "胃窺鏡 +/- 瘜肉切除術",
            "HK$19,870 – $29,054",
            "⚠️ 2025年歷史統計日間手術五十分位總收費（標準房基準）。",
            "https://www.sth.org.hk/download/zh/ccssp.pdf",
        ),
        "evangel": obj_proc(
            3100,
            "門診胃鏡（醫院收費）",
            "HK$3,100 – $13,000",
            "✓ 門診醫院收費約 $3,100；日間全面護理套餐約 $13,000（含醫生及麻醉）。",
            "https://www.evangel.org.hk/zh-hant/charges/price_list/",
        ),
        "pbh": obj_proc(
            8075,
            "胃鏡檢查",
            "HK$8,075 – $24,711",
            "⚠️ 2025年歷史統計五十分位總收費（標準房）。",
            "https://www.pbh.hk/service-fee-adjustment/",
        ),
    }

    for hid, obj in OP.items():
        text = replace_hospital_block(text, "outpatient", hid, obj)
        print("OP", hid, flush=True)

    for hid, obj in WD.items():
        text = replace_hospital_block(text, "ward", hid, obj)
        print("WD", hid, flush=True)

    for hid, obj in CT.items():
        text = replace_hospital_block(text, "ct_brain", hid, obj)
        print("CT", hid, flush=True)

    for hid, obj in MRI.items():
        text = replace_hospital_block(text, "mri_brain", hid, obj)
        print("MRI", hid, flush=True)

    for hid, obj in CH.items():
        text = replace_hospital_block(
            text, "generalSurgery", hid, obj, nested_under="cholecystectomy"
        )
        print("CH", hid, flush=True)

    for hid, obj in GS.items():
        text = replace_hospital_block(
            text, "imaging", hid, obj, nested_under="gastroscopy"
        )
        print("GS", hid, flush=True)

    # Hospital directory links (first occurrence under hospitals:)
    hm = re.search(r"\n\s*hospitals:\s*\{", text)
    if not hm:
        raise SystemExit("hospitals block not found")
    h_start = hm.end() - 1
    h_end = find_brace_block(text, h_start)
    hosp_section = text[h_start : h_end + 1]
    link_map = {
        "canossa": "https://www.canossahospital.org.hk/",
        "evangel": "https://www.evangel.org.hk/",
        "twah": "https://www.twah.org.hk/",
        "hkah": "https://www.hkah.org.hk/",
    }
    for hid, url in link_map.items():
        pat = re.compile(
            rf"(\n\s*{re.escape(hid)}:\s*\{{[^\}}]*?link:\s*)\"[^\"]*\"",
            re.S,
        )
        hosp_section2, n = pat.subn(rf'\1"{url}"', hosp_section, count=1)
        if n:
            hosp_section = hosp_section2
            print("LINK", hid, flush=True)
        else:
            print("LINK FAIL", hid, flush=True)
    text = text[:h_start] + hosp_section + text[h_end + 1 :]

    DB.write_text(text, encoding="utf-8")
    print("WROTE", DB, "bytes", DB.stat().st_size, flush=True)


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print("ERROR:", e, file=sys.stderr, flush=True)
        raise
