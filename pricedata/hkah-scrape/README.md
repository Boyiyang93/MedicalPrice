# 香港港安醫院–司徒拔道（HKAH）价格抓取

抓取日期: 2026-07-19  
官网: https://www.hkah.org.hk  
价目页: https://www.hkah.org.hk/tc/fees-and-charges · https://www.hkah.org.hk/en/fees-and-charges  
门诊: https://www.hkah.org.hk/en/fees-and-charges/out-patient-consultation-fee/out-patient-consultation-fee-2  

## 产出文件

| 路径 | 内容 |
| --- | --- |
| `pages/` | 价目相关 HTML（中/英 + 子页 + 套餐页） |
| `pdfs/` | 35 份官方 PDF（历史统计/套餐/睡眠检查等） |
| `parsed/*.txt` | PDF 及关键 HTML 页文本提取 |
| `parsed/key-prices.json` | 与 db 模块最相关的关键价 |

## 关键价摘要（HK$）

### 门诊（HTML 价目表）

| 项目 | 收费 |
| --- | ---: |
| 24 小时急症 | 1,200 |
| 普通科初诊 / 覆诊 | 980 / 780 |
| 专科初诊（范围） | 800–2,800 |
| 设施费（2021-10 起） | 500 / 次（30 分钟）；特殊仪器 1,500 |

### 病房 / 日（Daily Room Rates HTML · General Ward）

| 房型 | 每日 |
| --- | ---: |
| 标准（3–4 床） | 900 |
| 半私家（单人间） | 2,300（区间 2,300–2,800） |
| 私家（单人间） | 3,900 |
| VIP / 私家 | 9,000 |
| 日床（标准） | 500 |

### 手术室（首小时 · 标准房 HTML）

| 类型 | 收费 |
| --- | ---: |
| 大手术房 | 3,570 |
| 小手术房 | 950 |

### 造影（标准房 · 2026-01-01 HTML）

| 项目 | 平片 | 显影 |
| --- | ---: | ---: |
| CT 脑部 | 3,450 | 6,220 |
| MRI 脑部 | 9,320 | 14,560 |
| 门诊 CT 脑部平片 | 2,833 | — |
| 门诊 MRI 脑部平片 | 7,644 | — |

### 历史统计 / 套餐 PDF

- `2025 Historical Bill Szie_v4 (4)_.pdf` — 常见手术参考总收费（2025）  
- 各专科 `services-fees-packages/` 套餐单张（心脏、外科、骨科、体检等）

## 注意

1. 造影/病房/手术室为 HTML 表；部分套餐为 PDF。  
2. 单项医院收费**不含医生费**（套餐除外）。  
3. **未写入 `data/db.js`**。
