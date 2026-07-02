# MedicalPrice

香港私立醫院醫療價格透明化門戶（繁體中文）。對比 14 家醫院在門診、病房、影像、手術等專科的定額收費。

## 技術架構

- **前端**：純靜態 HTML + Tailwind CDN + 原生 JavaScript
- **數據源**：[`data/db.js`](data/db.js) — `globalMedicalData` 統一數據底層
- **渲染引擎**：[`js/engine.js`](js/engine.js) — `updateView()` 統一比價流水線

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

## 新增專科模組

1. 在 `db.js` 的 `modules` 下添加模組數據
2. 複製 `general-surgery.html`，修改 `data-page-module` 和 `data-module`
3. 多項目專科：每個 `procedure_id` 一個 `<div class="compare-group" data-module="..." data-procedure="...">`

## 本地預覽

```bash
npx serve .
# 或
python3 -m http.server 8080
```

## 部署

靜態站點，可部署至 GitHub Pages / Netlify。見 [`netlify.toml`](netlify.toml)。

## 免責聲明

本平台數據僅供預算參考，不構成醫療診斷或理賠承諾。
