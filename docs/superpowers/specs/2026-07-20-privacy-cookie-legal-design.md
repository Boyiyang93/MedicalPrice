# Privacy, Cookie & Terms Pages + Notice Banner

**Date:** 2026-07-20  
**Status:** Approved for planning  
**Site:** MedicalPrice (medicalprice.hk)  
**Locale:** Traditional Chinese (`zh-HK`)

## Goal

Add privacy policy, cookie policy, and terms of use pages, plus an informational cookie/local-storage notice banner. Footer links on product pages (and light links on article pages) make the documents discoverable.

## Decisions

| Topic | Choice |
|-------|--------|
| Document set | Privacy + Cookie + Terms + notice banner |
| Tracking | None now, none planned — policies and banner reflect necessary local storage only |
| Operator name | Placeholder: 「本平台運營方」; contact via existing emails |
| Structure | Three separate HTML pages (aligned with `sources.html`) |
| Banner type | Informational dismissible bar — not a consent preference centre |
| Legal review | Practical PDPO-style disclosure, not lawyer-vetted; pages note general-information disclaimer |

## Out of scope

- Lawyer review / formal legal opinion
- English translations
- Cookie preference centre or Accept/Reject analytics gating
- Google Analytics or other third-party trackers
- Changing existing footer legal disclaimer body copy

## Pages

| Page | Path | Purpose |
|------|------|---------|
| 隱私政策 | `privacy.html` | What is collected, why, retention, rights, contact |
| Cookie 政策 | `cookies.html` | Local storage / cookies explanation |
| 使用條款 | `terms.html` | Use rules, disclaimers, IP, governing law |

### Shared page shell

- Match `sources.html`: fixed header, `max-w-3xl` main, `design-system.css`, `site-polish.js`
- Nav: 首頁 / 專科收費 / 資料來源 / 醫療情報
- Cross-links among the three legal pages
- Operator placeholder + last-updated date in footer of each document

### Privacy policy content outline

- Scope of collection: email when user contacts us; browser local storage (e.g. favourites); basic server logs if hosting provides them
- Not collected: medical records, ID numbers, payment data; no sale of personal data
- Purposes: reply to enquiries, improve site, security
- Retention and disclosure: reasonable period; disclose only when required by law or necessary for hosting/service providers
- Rights: access/correction via `contact@medicalprice.hk`
- Data correction for hospital pricing remains `data@medicalprice.hk`
- General-information disclaimer; placeholder operator name; update date

### Cookie policy content outline

- Current state: no third-party analytics or advertising cookies
- Uses: necessary local storage (favourites, `mp_cookie_notice` dismissal flag)
- How to clear: browser settings / clear site data
- Future: if tracking is added later, update this page and banner behaviour first

### Terms of use content outline

- Pricing data is budget reference only — not a binding quote, diagnosis, or claims promise (aligned with existing footer disclaimer)
- Prohibited: abusive scraping, impersonating hospitals, misleading republication
- IP belongs to the platform; attribution required when citing
- Service provided as-is; content may change
- Governing law: Hong Kong SAR

## Cookie notice banner

### Behaviour

- Fixed bottom bar (not a blocking modal)
- Shown on first visit until dismissed
- Primary button 「知道了」 writes `localStorage` key `mp_cookie_notice` and hides the bar
- 「了解更多」 links to `cookies.html`
- Implemented in `js/site-polish.js` (or equivalent shared script) so all pages that load polish get the banner
- Legal pages also load the script so the notice is not missed
- Keyboard focusable; accessible name; respect `prefers-reduced-motion`

### Copy (draft)

> 本網站使用瀏覽器本地存儲以記住您的偏好（例如收藏）。我們目前不使用第三方分析或廣告 Cookie。詳情見 Cookie 政策。

### Visual

- Dark bar aligned with footer tokens (`--mp-footer-bg` / related)
- Mint accent link colour consistent with footer 「資料來源」 links
- Styles in `css/design-system.css`

## Footer & coverage

### Product / module pages with full site footer

Add links next to 「資料來源與更新」:

`隱私政策` · `Cookie 政策` · `使用條款`

Priority pages include: `index.html`, `sources.html`, `intelligence.html`, and specialty/module pages that already have the site footer (e.g. `gyn.html`, `general-surgery.html`, `outpatient.html`, and peers).

### Article pages

`articles/*.html`: add the same three links in a light footer or end-of-article nav — do not duplicate the two-column CTA footer.

### Unchanged

Existing disclaimer paragraph in the deep footer stays as-is.

## Technical notes

- Static HTML site; no backend required for these documents
- Favourites already use `localStorage` in `js/engine.js` — cookie policy should describe this accurately
- Banner dismissal key must not break or conflict with favourites storage keys

## Success criteria

1. Three legal pages render with consistent chrome and readable Traditional Chinese copy
2. Footer (or article light footer) links reach all three pages
3. Banner appears once per browser until dismissed; does not reappear after `mp_cookie_notice` is set
4. Policies accurately state: no third-party tracking; necessary local storage only; placeholder operator
5. No regression to existing disclaimer or price comparison UI
