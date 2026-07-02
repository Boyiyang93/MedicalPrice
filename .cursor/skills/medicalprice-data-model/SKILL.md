---
name: medicalprice-data-model
description: MedicalPrice db.js data schema conventions, hospital IDs, placeholder rules, and module types B/C/D. Use when editing data/db.js or adding hospital pricing data from spreadsheets.
---

# MedicalPrice Data Model

## Hospital IDs (required in spreadsheet `hospital_id` column)

szufh, cuhk, hksh, ghk, matilda, sth, baptist, union, canossa, sph, pbh, evangel, twah, hkah

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
