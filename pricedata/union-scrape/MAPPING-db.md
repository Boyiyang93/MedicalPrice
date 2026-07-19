# 仁安醫院抓取 ↔ db.js 映射

来源目录: `pricedata/union-scrape/`  
写入日期: 2026-07-19  
医院 ID: `union`

## 价目规则

| 类型 | `price` | `displayPrice` | 备注风格 |
| --- | --- | --- | --- |
| 常见手术统计 PDF | `total_mean` | `HK$min – $max`（total_min–total_max） | ⚠️ 2025 H2 统计，标准房 |
| 套餐/门市价目 | 标价或中位 | 单值或区间 | ✓ 套餐/价目表 |
| 急症诊金 | 日间基准 420 | 时段区间 | 急症门诊中心 |

## 已写入卡片

| 模块 | procedure | 来源项目 | price |
| --- | --- | --- | ---: |
| outpatient | — | EMC 诊金 | 420 |
| outpatientSpecialty | — | MIC 专科诊症 | 760 |
| ward | — | price-room-tc.pdf | 600 / 1080 / 2500 |
| generalSurgery | cholecystectomy | 腹腔镜胆囊切除 | 110660 |
| generalSurgery | hemorrhoid | 痔疮切除 | 46540 |
| generalSurgery | breast_lump | 超声引导乳房肿块切除 | 64130 |
| generalSurgery | breast_surgery | 乳房切除 | 126660 |
| ent | tonsillectomy | 扁桃体切除 | 71290 |
| ent | micro_laryngoscopy | 显微喉内窥镜 | 59790 |
| ent | sinus_surgery | FESS | 140700 |
| orthopedics | knee_replacement | 全膝置换 | 173980 |
| orthopedics | knee_arthroscopy | 膝关节内窥镜 | 89110 |
| orthopedics | sports_ortho | ACL 重建 | 134470 |
| orthopedics | orif_* | 开放复位内固定（未分上下肢） | 89530 |
| gynecology | myomectomy | 肌瘤切除 | 121810 |
| gynecology | hysterectomy | 腹腔镜辅助子宫切除 | 162930 |
| gynecology | ovarian_cyst | 腹腔镜卵巢囊肿切除 | 103550 |
| gynecology | hysteroscopy | 宫腔镜+刮宫 | 39370 |
| gynecology | contraception | 刮宫术 | 29650 |
| urology | prostate | TURP + 等离子气化区间 | 111675 |
| urology | andrology | 睾丸固定 | 69660 |
| urology | urodynamics | MIC 尿动力 | 3800 |
| ophthalmology | cataract | 白内障套餐（单眼日间） | 20100 |
| imaging | ct_brain | CT 脑部 ±显影 | 3450 |
| imaging | mri_brain | MRI 脑部 ±显影 | 8600 |

## 有抓取但未写入（无对应卡片或仅门诊小项）

- 鼻中隔成形术、腹腔镜直肠切除
- 内镜（胃/肠/双镜）— 仁安本次无套餐价
- 产科分娩套餐 PDF（扫描件，待 OCR）
- MIC 伤口缝合/石膏等零碎门诊程序
