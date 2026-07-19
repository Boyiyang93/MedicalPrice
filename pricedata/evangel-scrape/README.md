# 播道醫院（Evangel Hospital）价格抓取

抓取日期: 2026-07-19  
Hospital ID: `evangel`

官网:
- [各項收費表](https://www.evangel.org.hk/zh-hant/charges/price_list/)
- [收費資料 2026](https://evangel.org.hk/zh-hant/charges/charges_2026/)

## 产出文件

| 文件 | 内容 |
| --- | --- |
| `pages/price_list.html` | 各項收費表原页 |
| `pages/charges_2026.html` | 2026 收费页 |
| `pdfs/*.pdf` | 41 份收费 PDF（病房、手術室、常見手術、MRI/CT、化驗、護理、門診/套餐等） |
| `pdfs/urls.txt` | 下载 URL 清单 |
| `parsed/*.txt` | 各 PDF 文本提取（pymupdf） |
| `parsed/key-prices.json` | 与 db 模块最相关的关键价 |
| `parsed/historical-procedures-2025.json` | 2025 常见手术统计（普通房 p50） |
| `parse_evangel.py` | 解析脚本（依赖 `../matilda-scrape/_pydeps` 的 pymupdf） |

## 关键价（HK$）

### 病房每日（2025-01-02，不含医生费）

| 房型 | 每日 |
| --- | ---: |
| 普通房 (3–5人) | 830 – 1,020 |
| 双人房 | 1,280 |
| 半私家单人 | 1,920 |
| 单人房 | 2,350 |
| 日間病床 (LA/IVS/MAC ≤6h) | 470 |
| 日間病床 (>6h 或 GA ≤8h) | 830 |

### 手術室（GA/MAC，2025-01-02）

| 时段 | 普通房 | 双人/半私家 | 单人房 |
| --- | ---: | ---: | ---: |
| 首 30 分钟 | 2,455 | 2,985 | 3,690 |
| 其后每 15 分钟 | 815 | 985 | 1,225 |

非办公时间附加 100%。

### 门诊诊金（2025-01-02）

| 项目 | 收费 |
| --- | ---: |
| 全科 (一至六) | 285 |
| 全科 (日/公众假期/黑雨/8号风球) | 395 |
| 专科覆诊 | 675 |
| 专科首次 | 1,010 |

65 岁或以上九折。诊金不含药费及检查。

### 造影 — 脑部（2026-03-02）

| 项目 | 普通房 | 双人/半私家 | 单人房 | 门诊 |
| --- | ---: | ---: | ---: | ---: |
| MRI 平扫 | 6,200 | 7,700 | 9,300 | 5,500 |
| MRI 加显影 | 10,000 | 12,000 | 15,000 | 9,000 |
| CT 平扫 | 2,300 | 2,700 | 3,400 | 2,000 |
| CT 加显影 | 4,000 | 4,800 | 5,800 | 3,500 |

### 套餐节选

| 类型 | 项目 | 收费 |
| --- | --- | ---: |
| 门诊（仅医院费） | 结肠镜 | 4,100 |
| 门诊（仅医院费） | 胃镜 | 3,100 |
| 门诊（仅医院费） | 结肠镜+胃镜 | 6,100 |
| 日間（含医生+麻醉） | 结肠镜 | 15,500 |
| 日間（含医生+麻醉） | 胃镜 | 13,000 |
| 日間（含医生+麻醉） | 结肠镜+胃镜 | 26,500 |
| 日間 | 白內障（单眼，优惠价） | 21,800 |
| 普通房 2D1N | 传统痔疮切除 | 37,000 |
| 普通房 5D4N | 全膝置换 | 133,000 |

### 2025 历史总收费（普通房 p50）节选

| 手术 | 总收费 p50 |
| --- | ---: |
| 腹腔镜胆囊切除 | 37,347 |
| 痔疮切除 | 172,255 |
| 结肠镜 +/- 息肉 | 77,260 |
| 胃镜 +/- 息肉 | 17,087 |
| 胃镜+结肠镜 | 23,116 |
| 扁桃腺切除 | 18,484 |
| 膝关节镜 | 112,556 |
| 白内障乳化+晶体 | 33,653 |

## 已下载 PDF 分类

- **住院/手术**: `list_inpatient.pdf`, `list_ot.pdf`, `list_surgery.pdf`, `list_nursing.pdf`
- **诊断**: `list_mri.pdf`, `list_ct.pdf`, `list_us.pdf`, `list_pet.pdf`, `list_xray.pdf`, `list_xray_mammo.pdf`, `list_lab.pdf`, `list_lab_blood.pdf`
- **门诊/辅助**: `list_dental.pdf`, `list_physio.pdf`, `list_pcs.pdf`, `list_diet.pdf`, `list_medicalreport.pdf`, `list_oc.pdf`（视光）
- **套餐**: `list_colon.pdf`, `list_ogd.pdf`, `list_colon_ogd_day.pdf`, `list_endo_day.pdf`, `list_cataract.pdf`, `list_haemorroidectomy.pdf`, `66f630b423ecc.pdf`（全膝）, 等
- **2026 页附加**: `693fb7bce3da4.pdf`, `693fb865473c9.pdf`, 体檢/優惠 PDF 等

## 注意

1. 单项收费表**不含医生费**（日間内窥镜套餐及手术套餐除外）。  
2. 常见手术 PDF 为 2025 年统计；文本层与表格行序需对照原 PDF。  
3. `db.js` 未修改；本目录仅供数据录入参考。  
4. 重新抓取: 更新 `pdfs/urls.txt` 后下载，运行 `python3 parse_evangel.py`（需 pymupdf）。
