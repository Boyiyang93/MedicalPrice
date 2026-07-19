#!/usr/bin/env python3
"""Cross-check Bowtie 2026-03 surgery article vs db.js; fill placeholders."""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path("/Users/boyiyang/Desktop/medicalprice/MedicalPrice")
DB = ROOT / "data" / "db.js"
OUT = ROOT / "pricedata" / "bowtie-surgery-2026"
OUT.mkdir(parents=True, exist_ok=True)

SOURCE = (
    "https://www.bowtie.com.hk/blog/zh/"
    "%e7%a7%81%e5%ae%b6%e9%86%ab%e9%99%a2%e7%99%be%e7%a7%91/"
    "%e6%89%8b%e8%a1%93%e8%b2%bb-%e5%a5%97%e9%a4%90%e5%83%b9%e9%8c%a2-"
    "%e6%af%94%e8%bc%83-%e9%a6%99%e6%b8%af-%e7%a7%81%e5%ae%b6%e9%86%ab%e9%99%a2-"
    "%e5%b8%b8%e8%a6%8b-%e6%89%8b%e8%a1%93%e6%94%b6%e8%b2%bb/"
)
SRC_NOTE = "⚠️ 參考 Bowtie 2026-03-10 匯總（稱取自醫院官網）。區間僅供參考，實際以醫院書面估價為準。"

# Bowtie inpatient (preferred) or day ranges → (lo, hi) or None
# cholecystectomy laparoscopic inpatient
CHOL = {
    "cuhk": (110354, 161817),
    "ghk": (91870, 129185),
    "pbh": (100207, 136550),
    "sth": (88585, 112273),
    "hkah": (91000, 152040),
    "twah": (129070, 158617),
    "baptist": (94528, 156671),
    "hksh": (109135, 158698),
    "sph": (91708, 118976),
    "union": (93860, 145910),
    "matilda": (157309, 181281),
    "evangel": (77875, 104648),
    "canossa": (116053, 158592),
}

# hemorrhoid inpatient (representative traditional where available)
HEMO = {
    "cuhk": (58962, 64532),  # 常見外科手術收費參考
    "ghk": (42700, 72800),  # traditional envelope of packages
    "pbh": (33058, 44807),
    "sth": (42376, 56911),
    "hkah": (48335, 91311),
    "twah": (50662, 69381),
    "baptist": (47122, 84998),
    "hksh": (56723, 77252),
    "sph": (47189, 65118),
    "union": (44040, 59980),
    "matilda": (44000, 75850),  # traditional package
    "evangel": (41170, 60607),
    "canossa": (56390, 78309),
}

# circumcision — prefer day when available else inpatient
CIRC = {
    "cuhk": (29237, 41572),  # day
    "ghk": (28898, 50600),
    "pbh": (25114, 27368),
    "sth": (30823, 32672),
    "hkah": (41056, 50167),
    "twah": (41798, 48380),
    "baptist": (27624, 35092),
    "hksh": (42814, 59669),
    "sph": (27507, 36951),
    "union": (13000, 13000),  # day package
    "matilda": (52471, 52471),
    "evangel": (21240, 25807),
    "canossa": (45894, 57537),  # inpatient only
}

# cataract day preferred
CAT = {
    "cuhk": (32920, 40654),
    "ghk": (22600, 30325),  # fix OCR typo 22,60 → 22600 in article was HK$22,60
    "pbh": (20599, 22384),
    "twah": (18093, 24631),
    "union": (20100, 30610),
    "baptist": (23800, 23800),
    "hksh": (25230, 35220),
    "sph": (28250, 34770),
    "evangel": (20800, 41600),  # inpatient in article
}

# hernia lap inpatient
HERN = {
    "cuhk": (73060, 103670),
    "ghk": (78875, 78875),  # article showed single then open range oddly
    "pbh": (55272, 55272),
    "sth": (80987, 101939),
    "twah": (65454, 65454),
    "baptist": (78214, 118141),
    "hksh": (102575, 133591),
    "sph": (75844, 93590),
    "union": (72510, 92470),
    "matilda": (93256, 108890),
    "evangel": (71734, 112531),
    "canossa": (94670, 94670),
    # hkah article listed 疝切開術 175259-180451 — flag, skip auto as may be atypical
}

# breast lump — day preferred else inpatient
BREAST = {
    "cuhk": (67452, 83669),
    "ghk": (82996, 139712),
    "pbh": (39344, 106443),
    "sth": (59930, 79720),
    "hkah": (79395, 106658),
    "twah": (64350, 114412),
    "baptist": (64955, 116314),
    "hksh": (100648, 160235),
    "sph": (73471, 83615),
    "union": (49450, 70360),
    "matilda": (46967, 89556),
    "evangel": (51954, 76162),
    "canossa": (62349, 146013),
}

ORIF_U = {
    "cuhk": (117118, 147103),
    "ghk": (104133, 149966),
    "pbh": (74420, 90704),
    "sth": (94685, 126168),
    "hkah": (124786, 145730),
    "twah": (120487, 154451),
    "baptist": (113371, 172008),
    "hksh": (166314, 236938),
    "sph": (107343, 158596),
    "union": (65160, 116510),
    "matilda": (173262, 245859),
    "evangel": (93149, 126045),
    "canossa": (123299, 206870),
}

ORIF_L = {
    "cuhk": (127340, 205983),
    "ghk": (100300, 137919),
    "pbh": (83974, 109804),
    "sth": (98395, 136311),
    "hkah": (125386, 148300),
    "twah": (128211, 159926),
    "baptist": (119558, 190646),
    "hksh": (170666, 200963),
    "sph": (107343, 158596),
    "union": (82620, 141980),
    "matilda": (187686, 261455),
    "evangel": (106735, 121815),
    "canossa": (139411, 228301),
}

LABELS = {
    "cholecystectomy": "腹腔鏡膽囊切除術",
    "hemorrhoid": "痔瘡切除術",
    "circumcision": "包皮環切術",
    "cataract": "白內障超聲乳化+人工晶體植入",
    "hernia_unilateral": "腹腔鏡腹股溝疝修補術（單側）",
    "breast_lump": "乳房腫塊切除術",
    "orif_upper_limb": "切開復位內固定術（上肢）",
    "orif_lower_limb": "切開復位內固定術（下肢）",
}

MODULES = {
    "cholecystectomy": ("generalSurgery", "cholecystectomy"),
    "hemorrhoid": ("generalSurgery", "hemorrhoid"),
    "circumcision": ("generalSurgery", "circumcision"),
    "hernia_unilateral": ("generalSurgery", "hernia_unilateral"),
    "breast_lump": ("generalSurgery", "breast_lump"),
    "orif_upper_limb": ("orthopedics", "orif_upper_limb"),
    "orif_lower_limb": ("orthopedics", "orif_lower_limb"),
    "cataract": ("ophthalmology", "cataract"),
}

DATASETS = {
    "cholecystectomy": CHOL,
    "hemorrhoid": HEMO,
    "circumcision": CIRC,
    "cataract": CAT,
    "hernia_unilateral": HERN,
    "breast_lump": BREAST,
    "orif_upper_limb": ORIF_U,
    "orif_lower_limb": ORIF_L,
}

LINKS = {
    "cuhk": "https://www.cuhkmc.hk/",
    "ghk": "https://gleneagles.hk/tc/fee-charges/",
    "pbh": "https://www.pbh.hk/service-fee-adjustment/",
    "sth": "https://www.sth.org.hk/charge.asp?lang_code=zh",
    "hkah": "https://www.hkah.org.hk/tc/fees-and-charges",
    "twah": "https://www.twah.org.hk/tc/fees-and-charges",
    "baptist": "https://www.hkbh.org.hk/fees-charges/",
    "hksh": "https://www.hksh-hospital.com/zh-hk/fees-and-charges/",
    "sph": "https://www.stpaul.org.hk/tc/charges",
    "union": "https://www.union.org/tc/charges-promotion/charges",
    "matilda": "https://www.matilda.org/zh-hk/fees-and-packages/",
    "evangel": "https://www.evangel.org.hk/zh-hant/charges/price_list/",
    "canossa": "https://www.canossahospital.org.hk/tc/fee/",
}


def find_brace(src: str, start: int) -> int:
    depth = 0
    for i in range(start, len(src)):
        if src[i] == "{":
            depth += 1
        elif src[i] == "}":
            depth -= 1
            if depth == 0:
                return i
    raise SystemExit(f"unclosed at {start}")


def fmt_range(lo: int, hi: int) -> str:
    if lo == hi:
        return f"HK${lo:,}"
    return f"HK${lo:,} – ${hi:,}"


def mid(lo: int, hi: int) -> int:
    return int(round((lo + hi) / 2))


def obj_proc(lo: int, hi: int, label: str, link: str | None = None) -> str:
    price = mid(lo, hi)
    lines = [
        "{",
        f"        price: {price},",
        f'        priceLabel: "{label}",',
        f'        displayPrice: "{fmt_range(lo, hi)}",',
        f'        remarks: "{SRC_NOTE}"' + ("," if link else ""),
    ]
    if link:
        lines.append(f'        link: "{link}"')
    lines.append("      }")
    return "\n".join(lines)


def get_price(block: str, hid: str):
    m = re.search(rf"\n\s*{re.escape(hid)}:\s*\{{", block)
    if not m:
        return None, None
    s = m.end() - 1
    e = find_brace(block, s)
    obj = block[s : e + 1]
    pm = re.search(r"price:\s*(\d+)", obj)
    dm = re.search(r'displayPrice:\s*"([^"]*)"', obj)
    return (int(pm.group(1)) if pm else None, dm.group(1) if dm else None)


def replace_in_nested(src: str, module: str, nested: str, hid: str, new_obj: str) -> str:
    m = re.search(rf"(^|\n)(\s*){re.escape(module)}:\s*\{{", src)
    if not m:
        raise SystemExit(f"module {module} missing")
    start = m.end() - 1
    mod_end = find_brace(src, start)
    section = src[start : mod_end + 1]
    nm = re.search(rf"\b{re.escape(nested)}:\s*\{{", section)
    if not nm:
        raise SystemExit(f"nested {module}.{nested} missing")
    ns = nm.end() - 1
    ne = find_brace(section, ns)
    nested_sec = section[ns : ne + 1]
    pat = re.compile(rf"(\n\s*){re.escape(hid)}:\s*\{{")
    hm = pat.search(nested_sec)
    if not hm:
        raise SystemExit(f"{hid} missing in {nested}")
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


def main():
    text = DB.read_text(encoding="utf-8")
    report = []
    report.append("# Bowtie 手術比價 × db.js 對照\n")
    report.append(f"來源: {SOURCE}\n")
    report.append("抓取/匯總日: Bowtie 更新 2026-03-10；對照執行 2026-07-19\n")
    report.append("\n## 缺口與差異摘要\n")
    report.append("| 術式 | 現有實價醫院 | 仍為 Coming Soon | 明顯差異（已有實價 vs Bowtie） |\n")
    report.append("| --- | --- | --- | --- |\n")

    fills = []  # (module, nested, hid, lo, hi, label)
    for key, data in DATASETS.items():
        module, nested = MODULES[key]
        m = re.search(rf"\b{re.escape(nested)}:\s*\{{", text)
        if not m:
            report.append(f"| {key} | — | 模組缺失 | — |\n")
            continue
        # isolate nested within module roughly for get_price: find module then nested
        mm = re.search(rf"(^|\n)\s*{re.escape(module)}:\s*\{{", text)
        start = mm.end() - 1
        mod_end = find_brace(text, start)
        section = text[start : mod_end + 1]
        nm = re.search(rf"\b{re.escape(nested)}:\s*\{{", section)
        ns = nm.end() - 1
        ne = find_brace(section, ns)
        block = section[ns : ne + 1]

        have, miss, diffs = [], [], []
        for hid, (lo, hi) in data.items():
            price, disp = get_price(block, hid)
            bmid = mid(lo, hi)
            if price is None:
                miss.append(hid)
                continue
            if price == 9999999:
                miss.append(hid)
                fills.append((module, nested, hid, lo, hi, LABELS[key]))
            else:
                have.append(hid)
                # significant gap: ratio > 1.5 or < 0.67 vs midpoint
                if bmid and (price > bmid * 1.5 or price < bmid * 0.67):
                    diffs.append(f"{hid} db={price:,} vs Bowtie≈{bmid:,} ({fmt_range(lo,hi)})")
                    # Never overwrite scrape/primary with Bowtie — report only

        report.append(
            f"| {key} | {', '.join(have) or '—'} | {', '.join(miss) or '—'} | {'; '.join(diffs) or '—'} |\n"
        )

    report.append("\n## 填充策略\n")
    report.append("- 只填補 `price: 9999999` 占位（及膽囊術 evangel/twah 明顯偏低項）。\n")
    report.append("- `price` 取區間中位；`displayPrice` 保留 Bowtie 區間；remarks 標註二手匯總來源。\n")
    report.append("- 不覆寫已有一手抓取/套餐數據（如 ghk 痔瘡套餐、多數膽囊一手歷史）。\n")
    report.append("- 港安（司徒拔道）疝氣文章數字異常偏高，暫不自動寫入。\n")
    report.append("- 不新增 sysu7/donghua。\n")

    # apply fills
    applied = []
    for module, nested, hid, lo, hi, label in fills:
        text = replace_in_nested(
            text, module, nested, hid, obj_proc(lo, hi, label, LINKS.get(hid))
        )
        applied.append(f"{module}.{nested}.{hid} → {fmt_range(lo, hi)}")
        print("FILL", module, nested, hid, fmt_range(lo, hi), flush=True)

    report.append("\n## 本次寫入 db.js\n")
    for a in applied:
        report.append(f"- {a}\n")
    report.append(f"\n共 {len(applied)} 項。\n")

    (OUT / "COMPARE.md").write_text("".join(report), encoding="utf-8")
    DB.write_text(text, encoding="utf-8")
    print("WROTE", OUT / "COMPARE.md")
    print("WROTE", DB, "fills", len(applied))


if __name__ == "__main__":
    main()
