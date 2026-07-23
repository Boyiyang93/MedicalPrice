# MedicalPrice

港資私家醫院醫療價格透明化門戶（繁體中文）。對比港資私家醫院（現收錄 14 家）在門診、病房、影像、手術等專科的定額收費。

## 技術架構

- **前端**：純靜態 HTML + 本地 Tailwind 構建 CSS（`css/utilities.css`）+ 原生 JavaScript
- **設計系統**：[`DESIGN.md`](DESIGN.md) + [`css/design-system.css`](css/design-system.css)
- **數據源**：[`data/db.js`](data/db.js) — `globalMedicalData` 統一數據底層
- **搜尋索引**：[`data/search-index.js`](data/search-index.js)（由 `npm run build:search-index` 從 db + 專頁 HTML 生成）
- **渲染引擎**：[`js/engine.js`](js/engine.js) — `updateView()` 統一比價流水線
- **生產域**：見 [`js/site-config.js`](js/site-config.js) 的 `SITE_ORIGIN`（canonical / sitemap / OG）

## 數據模型（V2.0）

### 醫院 ID（14 家）

`szufh` `cuhk` `hksh` `ghk` `matilda` `sth` `baptist` `union` `canossa` `sph` `pbh` `evangel` `twah` `hkah`

### 頁面類型

| 類型 | 模組示例 | 數據結構 |
|------|---------|---------|
| **B 型** 門診 | `outpatient` | `prices.regular` / `night` / `holiday` + `remarks` |
| **C 型** 病房 | `ward` | `prices.*`（排序數字）+ `ranges.*`（展示文字） |
| **D 型** 套餐 | `generalSurgery`, `imaging.gastroscopy` | `price` + `priceLabel` + `displayPrice` + `remarks` + `tags[]` |

### 占位符

| 值 | 含義 |
|----|------|
| `9999999` | Coming Soon（暫無定額） |
| `9999` | 門診該時段不提供（僅 B 型） |

## 數據更新流程

```bash
# 1. 在 pricedata/*-scrape 抓取 / 整理（建議：pip install -r pricedata/requirements.txt）
# 2. dry-run 現有 apply 腳本
npm run apply:db -- dry-run --script pricedata/_batch_rewrite_db.py

# 3. 實際寫入 db.js（腳本成功後會自動 rebuild search + validate）
npm run apply:db -- apply --script pricedata/bowtie-surgery-2026/_apply_bowtie.py

# 4. 僅校驗 / 重建搜尋索引
npm run validate:db
npm run build:search-index
```

流程摘要：**scrape → apply（dry-run）→ apply → validate → commit**。

## 前端 CSS

改動 HTML / `js/engine.js` 中的 Tailwind class 後，需重建工具類 CSS：

```bash
npm run build:css
```

## 新增專科模組

1. 在 `db.js` 的 `modules` 下添加模組數據
2. 複製 `general-surgery.html`，修改 `data-page-module` 和 `data-module`
3. 多項目專科：每個 `procedure_id` 一個 `<div class="compare-group" data-module="..." data-procedure="...">`
4. 執行 `npm run build:search-index` 與 `npm run validate:db`

## 本地預覽

```bash
npx serve .
# 或
python3 -m http.server 8080
```

## 部署

靜態站點。GitHub Pages / Netlify 均透過 [`scripts/prepare-publish.sh`](scripts/prepare-publish.sh) 產出精簡 `dist/`（排除 `pricedata/`、`scripts/`、`.cursor/` 等）。見 [`netlify.toml`](netlify.toml) 與 [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml)。

## 免責聲明

本平台數據僅供預算參考，不構成醫療診斷或理賠承諾。
