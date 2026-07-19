# GHK 普通外科抓取 ↔ 卡片映射（可拆分）

来源: https://gleneagles.hk/tc/fee-charges/general-surgery → PDF `2026GES03`  
原始文件: `GHK-general-surgery.pdf` / `ghk-general-surgery.csv` / `.json` / `.md`  
抓取日期: 2026-07-18  
货币: HKD（普通风险 / 中等风险）

## 当前写入 db.js（generalSurgery.ghk）的聚合规则

| 卡片 procedure | 纳入 PDF 代码 | 展示区间 (普通min–中等max) | 备注 |
|---|---|---|---|
| cholecystectomy | GES08A/B, GES39A/B, GES07 | 99,900 – 142,220 | 未改价，仅校正链接 |
| appendectomy | GES33A/B/C | 93,400 – 139,490 | 同上 |
| hemorrhoid | GES10, GES10B, GES11 | 42,700 – 72,800 | 同上 |
| breast_lump | GES21A/F/G/C/D/E | 48,200 – 98,800 | 仅肿块切除，不含活检 |
| breast_biopsy | GES20 | 28,900 – 37,570 | 开放式活组织切片 |
| breast_surgery | GES22*, GES23*, GES24*, GES25 | 69,000 – 196,040 | 肿瘤/全乳/根治，不含 GES21 |
| circumcision | GES01A/B, GES49 | 28,250 – 43,550 | 不再混入小手术/静脉曲张 |
| hemithyroidectomy | GES03A, GES03N | 89,000 – 131,430 | 半边 |
| thyroidectomy | GES05A, GES05N | 124,300 – 177,320 | 全边 |
| thyroid_surgery | GES03* + GES05* | 89,000 – 177,320 | 半边+全边汇总 |
| hernia_unilateral | GES12A/P, GES13A, GES14 | 42,800 – 102,050 | 仅单边 |
| hernia_bilateral | GES38A/P | 92,300 – 135,330 | 仅双边 |

## PDF 中尚未单独成卡片的套餐组（后续可拆）

- Submandibulectomy GES37
- Gastrectomy GES34B, GES35B
- Sleeve Gastrectomy GES42A/B/C
- Hemi-Colectomy GES16A, GES18A
- Anterior Resection GES43–GES48, GES47*
- Varicose Veins GES15, GES27, GES28*, GES29*
- Minor Ops GES30*, GES31, GES32

## 拆分时注意

1. `price` = round((min普通风险 + max中等风险) / 2)
2. `displayPrice` 用 `HK$min – $max`
3. 官方费用页链接优先: `https://gleneagles.hk/tc/fee-charges/general-surgery`（实际 PDF）
4. 调整聚合时以 `ghk-general-surgery.csv` 的 code 列为准，不要混用旧「小手术」区间
