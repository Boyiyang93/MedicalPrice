#!/usr/bin/env python3
"""Prefer hospital scrape over Bowtie for surgery fields in db.js."""
from __future__ import annotations

import re
from pathlib import Path

DB = Path("/Users/boyiyang/Desktop/medicalprice/MedicalPrice/data/db.js")
COMPARE = Path(
    "/Users/boyiyang/Desktop/medicalprice/MedicalPrice/pricedata/bowtie-surgery-2026/COMPARE.md"
)


def find_brace(src: str, start: int) -> int:
    depth = 0
    for i in range(start, len(src)):
        if src[i] == "{":
            depth += 1
        elif src[i] == "}":
            depth -= 1
            if depth == 0:
                return i
    raise SystemExit(f"unclosed {start}")


def replace_nested(src: str, module: str, nested: str, hid: str, new_obj: str) -> str:
    m = re.search(rf"(^|\n)(\s*){re.escape(module)}:\s*\{{", src)
    if not m:
        raise SystemExit(f"missing {module}")
    start = m.end() - 1
    mod_end = find_brace(src, start)
    section = src[start : mod_end + 1]
    nm = re.search(rf"\b{re.escape(nested)}:\s*\{{", section)
    if not nm:
        raise SystemExit(f"missing {module}.{nested}")
    ns = nm.end() - 1
    ne = find_brace(section, ns)
    nested_sec = section[ns : ne + 1]
    pat = re.compile(rf"(\n\s*){re.escape(hid)}:\s*\{{")
    hm = pat.search(nested_sec)
    if not hm:
        raise SystemExit(f"missing {hid} in {nested}")
    bs = hm.end() - 1
    be = find_brace(nested_sec, bs)
    indent = hm.group(1)
    replacement = f"{indent}{hid}: {new_obj.strip()}"
    had_comma = nested_sec[be + 1 :].startswith(",")
    if had_comma:
        replacement += ","
        new_nested = nested_sec[: hm.start()] + replacement + nested_sec[be + 2 :]
    else:
        rest = nested_sec[be + 1 :]
        if re.search(r"\n\s*\w+:\s*\{", rest):
            replacement += ","
        new_nested = nested_sec[: hm.start()] + replacement + nested_sec[be + 1 :]
    new_section = section[:ns] + new_nested + section[ne + 1 :]
    return src[:start] + new_section + src[mod_end + 1 :]


def obj(
    price: int,
    label: str,
    display: str,
    remarks: str,
    link: str | None = None,
) -> str:
    lines = [
        "{",
        f"        price: {price},",
        f'        priceLabel: "{label}",',
        f'        displayPrice: "{display}",',
        f'        remarks: "{remarks}"' + ("," if link else ""),
    ]
    if link:
        lines.append(f'        link: "{link}"')
    lines.append("      }")
    return "\n".join(lines)


# Hospital-scrape authoritative updates (overwrite Bowtie if present)
UPDATES = [
    # --- cholecystectomy ---
    (
        "generalSurgery",
        "cholecystectomy",
        "evangel",
        obj(
            37347,
            "腹腔鏡膽囊切除術",
            "HK$37,347",
            "⚠️ 2025年歷史統計（普通房）五十分位總收費。另有日間/套餐價目請查官网。",
            "https://www.evangel.org.hk/zh-hant/charges/price_list/",
        ),
    ),
    (
        "generalSurgery",
        "cholecystectomy",
        "twah",
        obj(
            50325,
            "腹腔鏡膽囊切除術",
            "HK$50,325",
            "⚠️ 2025年常見手術統計（標準房）。總收費含醫生費及醫院費。",
            "https://www.twah.org.hk/tc/fees-and-charges",
        ),
    ),
    # --- hemorrhoid ---
    (
        "generalSurgery",
        "hemorrhoid",
        "sth",
        obj(
            42417,
            "痔瘡切除術",
            "HK$42,417",
            "⚠️ 2025年歷史統計（標準房）五十分位總收費。總收費=醫生費+醫院費。平均住院約1.5日。",
            "https://www.sth.org.hk/download/zh/ccssp.pdf",
        ),
    ),
    (
        "generalSurgery",
        "hemorrhoid",
        "canossa",
        obj(
            61892,
            "痔瘡切除術",
            "HK$61,892",
            "⚠️ 2025年常見程序參考費用（普通病房）五十分位總收費。總收費=醫生費+醫院費。",
            "https://www.canossahospital.org.hk/tc/fee/pilot_programme_for_enhancing_price_transparency_for_private_hospitals/",
        ),
    ),
    (
        "generalSurgery",
        "hemorrhoid",
        "baptist",
        obj(
            50163,
            "痔瘡切除術",
            "HK$50,163 – $53,372",
            "⚠️ 2025年歷史統計（標準房）。總收費=醫生費+醫院費。日間手術五十分位約 HK$36,206。",
            "https://www.hkbh.org.hk/fees-charges/pilot-programme-for-enhancing-price-transparency-for-private-hospitals/",
        ),
    ),
    (
        "generalSurgery",
        "hemorrhoid",
        "sph",
        obj(
            49935,
            "痔瘡切除術",
            "HK$49,935",
            "⚠️ 2025年歷史賬目（標準房）五十分位總收費。總收費=醫生費+醫院費。平均住院約1.0日。",
            "https://www.stpaul.org.hk/tc/charges",
        ),
    ),
    (
        "generalSurgery",
        "hemorrhoid",
        "twah",
        obj(
            70732,
            "痔瘡切除術",
            "HK$70,732",
            "⚠️ 2025年常見手術統計（標準房）五十分位總收費。總收費含醫生費及醫院費。",
            "https://www.twah.org.hk/tc/fees-and-charges",
        ),
    ),
    (
        "generalSurgery",
        "hemorrhoid",
        "matilda",
        obj(
            44000,
            "痔瘡切除術（傳統・全面護理套餐）",
            "HK$44,000 – $75,850",
            "✓ 明德全面護理套餐（含醫生費，標準/雙人/私家房）。痔瘡槍套餐另計。",
            "https://www.matilda.org/fees-and-packages/general-survery/haemorrhoidectomy-package?hsLang=zh-hk",
        ),
    ),
    (
        "generalSurgery",
        "hemorrhoid",
        "evangel",
        obj(
            37000,
            "痔瘡切除術（普通房套餐）",
            "HK$37,000 – $55,000",
            "✓ 播道套餐（普通房，傳統約$37,000／痔瘡槍約$55,000，約2日1夜）。歷史統計五十分位另有偏高紀錄，以套餐口徑為準。",
            "https://www.evangel.org.hk/zh-hant/charges/price_list/",
        ),
    ),
    # --- circumcision ---
    (
        "generalSurgery",
        "circumcision",
        "canossa",
        obj(
            48060,
            "包皮環切術",
            "HK$48,060",
            "⚠️ 2025年常見程序參考費用（普通病房）五十分位總收費。總收費=醫生費+醫院費。",
            "https://www.canossahospital.org.hk/tc/fee/pilot_programme_for_enhancing_price_transparency_for_private_hospitals/",
        ),
    ),
    (
        "generalSurgery",
        "circumcision",
        "matilda",
        obj(
            34090,
            "包皮環切術（全面護理套餐）",
            "HK$34,090 – $57,230",
            "✓ 明德全面護理套餐（含醫生費，標準/雙人/私家房）。",
            "https://www.matilda.org/fees-and-packages/general-survery/circumcision-package?hsLang=zh-hk",
        ),
    ),
    # --- hernia ---
    (
        "generalSurgery",
        "hernia_unilateral",
        "canossa",
        obj(
            118319,
            "腹腔鏡腹股溝疝修補術（單側）",
            "HK$118,319",
            "⚠️ 2025年常見程序參考費用（普通病房）腹腔鏡疝修補五十分位總收費。",
            "https://www.canossahospital.org.hk/tc/fee/pilot_programme_for_enhancing_price_transparency_for_private_hospitals/",
        ),
    ),
    (
        "generalSurgery",
        "hernia_unilateral",
        "sph",
        obj(
            81323,
            "腹腔鏡腹股溝疝修補術",
            "HK$81,323",
            "⚠️ 2025年歷史賬目（標準房）五十分位總收費。總收費=醫生費+醫院費。平均住院約1.0日。",
            "https://www.stpaul.org.hk/tc/charges",
        ),
    ),
    (
        "generalSurgery",
        "hernia_unilateral",
        "matilda",
        obj(
            81980,
            "腹股溝疝氣切除術（腹腔鏡單邊）",
            "HK$81,980 – $141,670",
            "✓ 明德全面護理套餐（含醫生費；不含人工網膜）。標準/雙人/私家房。",
            "https://www.matilda.org/fees-and-packages/general-survery/inguinal-hernia-repair-package?hsLang=zh-hk",
        ),
    ),
    # --- breast lump ---
    (
        "generalSurgery",
        "breast_lump",
        "hksh",
        obj(
            96693,
            "乳房腫塊切除術",
            "HK$96,693",
            "⚠️ 2025年先導計劃歷史賬目中位數（普通房）。總收費=醫生費+醫院費。",
            "https://www.hksh-hospital.com/zh-hk/fees-charges/historical-bill-sizes-statistics",
        ),
    ),
    (
        "generalSurgery",
        "breast_lump",
        "pbh",
        obj(
            37242,
            "乳房腫塊切除術",
            "HK$37,242",
            "⚠️ 2025年常見手術參考（標準房）五十分位總收費。",
            "https://www.pbh.hk/service-fee-adjustment/",
        ),
    ),
    (
        "generalSurgery",
        "breast_lump",
        "sph",
        obj(
            76746,
            "乳房腫塊切除術",
            "HK$76,746",
            "⚠️ 2025年歷史賬目（標準房）五十分位總收費。總收費=醫生費+醫院費。平均住院約1.0日。",
            "https://www.stpaul.org.hk/tc/charges",
        ),
    ),
    # --- cataract ---
    (
        "ophthalmology",
        "cataract",
        "evangel",
        obj(
            21800,
            "白內障超聲乳化+人工晶體植入（單眼套餐）",
            "HK$21,800 – $22,800",
            "✓ 播道套餐價（列表價約$22,800；推廣約$21,800）。實際晶體級別與是否日間依估價單為準。",
            "https://www.evangel.org.hk/zh-hant/charges/price_list/",
        ),
    ),
]


def main():
    text = DB.read_text(encoding="utf-8")
    applied = []
    for module, nested, hid, new_obj in UPDATES:
        # only overwrite if currently Bowtie remarks or always overwrite these scrape targets
        text = replace_nested(text, module, nested, hid, new_obj)
        applied.append(f"{module}.{nested}.{hid}")
        print("SCRAPE", module, nested, hid, flush=True)

    DB.write_text(text, encoding="utf-8")

    note = (
        "\n\n## 優先級更正（2026-07-19）\n\n"
        "**醫院一手抓取 > Bowtie 二手匯總。** Bowtie 只用於醫院未抓到的術式/醫院。\n\n"
        "已從抓取档案覆寫回以下項目（覆蓋先前 Bowtie 填值）：\n\n"
        + "\n".join(f"- `{a}`" for a in applied)
        + "\n\n仍保留 Bowtie 作為補缺的典型例子：多數院 ORIF、部分包皮/白內障/乳房（無一手歷史或套餐總收費者）、"
        "`hkah`/`matilda` 膽囊等抓取未覆蓋項。\n"
        "Baptist 手術室示例價（僅 OT 分段費）**不作為**全賬總收費覆寫來源。\n"
    )
    COMPARE.write_text(COMPARE.read_text(encoding="utf-8") + note, encoding="utf-8")
    print("WROTE", len(applied), "scrape-priority rewrites")


if __name__ == "__main__":
    main()
