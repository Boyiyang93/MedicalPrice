# 香港養和醫院（HKSH）价格抓取

抓取日期: 2026-07-19  
官网: https://www.hksh-hospital.com  
价目页: https://www.hksh-hospital.com/zh-hk/fees-and-charges · https://hksh-hospital.com/en/fees-charges/fee-schedules  

## 产出文件

| 路径 | 内容 |
| --- | --- |
| `pages/` | 23 份价目相关 HTML（中/英：病房、手術室、造影、先導計劃、歷史統計、套式服務等） |
| `images/` | 19 份官方价目 JPG（`hksh.com/global/pricelist/`） |
| `pdfs/` | 4 份套式服務/婦女健康 PDF |
| `parsed/*.txt` | HTML / PDF / 关键 JPG 价目文本摘要 |
| `parsed/key-prices.json` | 与 db 模块最相关的关键价 |

## 关键价摘要（HK$）

### 门诊普通科（24 小时门诊 · 跑馬地 · 2023-08 起）

| 时段 | 收费 |
| --- | ---: |
| 周一至五 9:00–19:00 | 400 |
| 周一至五 19:00–24:00 | 600 |
| 周六 8:00–9:00 / 13:00–24:00 | 600 |
| 周六 9:00–13:00 | 400 |
| 日/公众假期 8:00–24:00 | 600 |
| 每日 0:00–8:00 | 800 |
| 其他分院（中環/金鐘等）初/覆诊 | 400 |

### 病房 / 日（2026-08-01 起）

| 房型 | 每日 |
| --- | ---: |
| 普通病室（3–6 床） | 1,400 – 2,020 |
| 半私家单人房 | 3,030 – 4,030 |
| 私家房 Type B | 4,850 – 5,050 |
| 私家房 Type A | 6,150 – 6,950 |
| 套房 36/F | 13,800 |
| 套房 37/F | 23,000 |
| 日間護理（首 5 小时） | 660 |

### 手術室（普通病室 · 2024-08 起 · 首档示例）

| 级别 / 时长 | 收费 |
| --- | ---: |
| Level 1（≤15 分钟） | 1,950 |
| Level 4（≤60 分钟） | 8,510 |
| Level 7（≤240 分钟） | 51,240 |
| 复苏室（首小时后每 30 分钟） | 230 |

### 造影（门诊/普通病室 · 2026-08-01 起）

| 项目 | 平片 | 显影 |
| --- | ---: | ---: |
| CT 脑部 | 3,690 | 6,630 |
| MRI 脑部 | 9,990 | 15,970 |

### 历史统计 / 先導計劃（2025 · 普通病室 p50 总收费）

| 手术 | 中位数总收费 |
| --- | ---: |
| 腹腔镜阑尾切除 | 129,749 |
| 腹腔镜胆囊切除 | 116,362 |
| 乳房肿块切除 | 96,693 |
| 乳房切除 | 225,091 |
| 肝切除 | 323,106 |

## 数据来源说明

1. **病房、手術室、门诊、CT/MRI、历史统计** 均为官网嵌入的 JPG 价目表（`images/`），非 PDF。  
2. **套式服務收費** 页面链接的 PDF 已下载至 `pdfs/` 并用 pymupdf 提取文本。  
3. 单项医院收费**不含医生费**（历史统计及套餐除外）。  
4. **未写入 `data/db.js`**。

## 主要页面

- 收費表: `/zh-hk/fees-charges/fee-schedules`
- 病房: `/zh-hk/fees-and-charges/accommodation-charges`
- 手術室: `/zh-hk/fees-and-charges/operating-theatre`
- 造影程序: `/zh-hk/fees-and-charges/investigative-and-treatment-procedures`
- 先導計劃 / 历史统计: `/zh-hk/fees-charges/historical-bill-sizes-statistics`
- 套式服務: `/zh-hk/fees-and-charges/service-packages`
