---
name: medicalprice-module-migration
description: Migrate MedicalPrice specialty HTML pages to data-driven compare-group cards using db.js and engine.js. Use when editing specialty *.html pages or creating new module pages.
---

# MedicalPrice Module Migration

## Reference implementation

Copy from `general-surgery.html` (single D-type) or `imaging.html` (multi D-type).

## Required HTML pattern

```html
<body data-page-module="moduleName">
  <div id="filter-container"></div>
  <div class="compare-group" data-module="moduleName" data-procedure="procedureId"></div>
  <script src="data/db.js"></script>
  <script src="js/engine.js"></script>
```

Leave `compare-group` empty — `initModuleGroups()` fills cards from db.js.

## Checklist

1. Add module data to `data/db.js`
2. Set `data-page-module` on `<body>` for filter list
3. One `compare-group` per procedure (multi) or one without `data-procedure` (single)
4. Do NOT hardcode hospital cards in HTML
5. Verify with browser: Top 3 sort, Coming Soon sink, filters work

## Ward (C-type)

Use empty `<tbody id="ward-table-body">` — `initWardTable()` renders from `modules.ward`.
