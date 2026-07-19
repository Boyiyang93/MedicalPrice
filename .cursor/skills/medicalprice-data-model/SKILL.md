---
name: medicalprice-data-model
description: MedicalPrice db.js data schema conventions, hospital IDs, placeholder rules, and module types B/C/D. Use when editing data/db.js or adding hospital pricing data from spreadsheets.
---

# MedicalPrice Data Model

## Hospital IDs (required in spreadsheet `hospital_id` column)

szufh, cuhk, hksh, ghk, matilda, sth, baptist, union, canossa, sph, pbh, evangel, twah, hkah, sysu7, donghua

## Hospital ownership (`ownership` on each hospital meta)

| Value | Label | Meaning |
|-------|-------|---------|
| `private` | 私立 | 商業私家醫院 |
| `public` | 公立 | 公營／醫管局醫院 |
| `nonprofit` | 公益 | 非牟利／宗教慈善醫院 |

Displayed after hospital name on cards, filters, and ward table via `engine.js`.

## Placeholders

- `9999999` → Coming Soon card
- `9999` → Outpatient only: "時段不設全科門診"

## Module types

### B — outpatient
```javascript
{ prices: { regular, night, holiday }, remarks }
```

### C — ward
```javascript
{ prices: { standard, semiPrivate, private }, ranges: { standard, semiPrivate, private } }
```

### D — procedure (single or multi)
```javascript
{ price, priceLabel, displayPrice, remarks, tags: ['optional'] }
```

Multi-procedure: `modules.imaging.gastroscopy.szufh = { ... }`
Single-procedure: `modules.generalSurgery.szufh = { ... }`

## Data entry workflow

User provides tables per specialty: start with 2 hospitals, then add one hospital at a time. Only edit `db.js` — HTML auto-renders via `engine.js`.

## Scraped source archives (for later adjust / split)

- SZUFH surgery fees: `pricedata/szufh-scrape/`
- GHK general surgery (PDF 2026GES03): `pricedata/ghk-scrape/` + code→card map in `MAPPING-general-surgery.md`
- Union (仁安) fees: `pricedata/union-scrape/` + card map in `MAPPING-db.md`
- Matilda (明德) fees/packages: `pricedata/matilda-scrape/` (hospital-fees + packages, 2026-02-01)
- STH (圣德肋撒) fees: `pricedata/sth-scrape/` (FeeSchedule + RoomCharges + 2025 historical + CT/MRI)
- HKSH (养和): `pricedata/hksh-scrape/`
- Baptist (浸信会): `pricedata/baptist-scrape/`
- Canossa (嘉诺撒): `pricedata/canossa-scrape/`
- SPH (圣保禄): `pricedata/sph-scrape/`
- PBH (宝血): `pricedata/pbh-scrape/`
- Evangel (播道): `pricedata/evangel-scrape/`
- TWAH (荃湾港安): `pricedata/twah-scrape/`
- HKAH (港安司徒拔道): `pricedata/hkah-scrape/`
- SYSU7 (中山七院深圳): `pricedata/sysu7-scrape/`
- Donghua (东莞东华): `pricedata/donghua-scrape/`
- Bowtie 13院手术比价对冲/补填: `pricedata/bowtie-surgery-2026/`（COMPARE.md；二手汇总，非一手官网）
- Bowtie 私家醫院百科 A/B/C/E 归档与补洞: `pricedata/bowtie-encyclopedia-2026/`（raw/text + COMPARE.md；一手 scrape 优先）
- See also `references/ghk-general-surgery-scrape.md`
