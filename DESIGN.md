# MedicalPrice Design System

> Based on [Mintlify](https://github.com/VoltAgent/awesome-design-md/tree/main/design-md/mintlify) (reading-optimized, sidebar + comparison layout) with MedicalPrice medical-trust brand colors.  
> Source collection: [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md)

## 1. Visual Theme & Atmosphere

MedicalPrice is a Hong Kong private-hospital price transparency portal. The visual language should feel **trustworthy, clinical, and data-dense** — like a fintech comparison tool applied to healthcare pricing.

- **Mood:** Calm authority. Clean white cards on a soft gray canvas. Deep medical blue header anchors every page.
- **Density:** Information-rich but breathable. Comparison grids show 3 hospitals per row on desktop; sidebar filters on module pages.
- **Philosophy:** Numbers are the hero. Price displays use tabular, bold numerics. Accent mint green highlights "best value" without feeling playful.
- **Language:** Traditional Chinese (`zh-HK`). Use PingFang SC / Microsoft YaHei — never Latin-only display fonts for body copy.

## 2. Color Palette & Roles

| Token | Hex | Role |
|-------|-----|------|
| `brand-primary` | `#1D4E89` | Header background, primary CTA hover, price emphasis |
| `brand-title` | `#2B579A` | Page headings, section titles, links |
| `brand-accent` | `#99D6D1` | Active nav, best-value border, section accent bar, logo mark |
| `brand-accent-soft` | `#F0FAF9` | Best-value card background |
| `brand-accent-muted` | `rgba(153, 214, 209, 0.30)` | Tag/chip backgrounds |
| `canvas` | `#FFFFFF` | Cards, sidebar, inputs |
| `canvas-soft` | `#F7F8FA` | Page background |
| `surface-muted` | `#F9FAFB` | Coming-soon cards, disabled surfaces |
| `ink` | `#333333` | Primary body text |
| `ink-secondary` | `#4B5563` | Secondary labels (gray-600) |
| `ink-muted` | `#9CA3AF` | Captions, timestamps (gray-400) |
| `hairline` | `#E5E7EB` | Card borders, dividers |
| `hairline-soft` | `#F3F4F6` | Inner card borders, subtle separators |
| `on-primary` | `#FFFFFF` | Text on blue header |
| `semantic-error` | `#DC2626` | Public hospital fee highlights, surcharge warnings |
| `semantic-error-soft` | `#F87171` | Strikethrough reference prices |
| `footer-bg` | `#1F2937` | Footer dark region (gray-800) |
| `footer-deep` | `#111827` | Disclaimer bar (gray-900) |

### Do not use
- Purple, neon, or gradient-heavy palettes from other brands in awesome-design-md
- Pure black `#000` for body text
- Random Tailwind grays not mapped above

## 3. Typography Rules

**Font stack:** `"PingFang SC", "Microsoft YaHei", "Helvetica Neue", sans-serif`

| Level | Size | Weight | Line Height | Use |
|-------|------|--------|-------------|-----|
| Display | 36px (md: 48px) | 900 | 1.1 | Homepage hero only |
| Heading 1 | 28px–32px | 900 | 1.2 | Module page titles |
| Heading 2 | 22px–24px | 700 | 1.3 | Section headers with accent bar |
| Heading 3 | 18px | 700 | 1.4 | Specialty card titles |
| Body | 14px–16px | 400 | 1.5 | Descriptions, article prose |
| Caption | 11px–13px | 400–600 | 1.4 | Timestamps, remarks, filter labels |
| Price display | 20px | 900 | 1.0 | Hospital price numerics (tabular) |
| Micro tag | 9px–10px | 700 | 1.15 | VHIS tags, procedure badges |

**Price numerics:** Always `font-black` / weight 900. Use `brand-primary` for emphasized totals.

## 4. Component Stylings

### Header (`site-header`)
- Fixed top, height 64px, `brand-primary` background, white text
- Logo mark: 28×28px square, `brand-accent` fill, 4px radius
- Active nav link: `brand-accent` color + bold
- Inactive nav: white, hover → `brand-accent`

### Search bar (`search-bar`)
- White container, 12px radius, 1px `hairline` border, shadow `0 4px 6px -1px rgba(0,0,0,0.05)`
- Input: no border, 16px text, focus ring `brand-accent`
- Button: `brand-title` bg → hover `brand-primary`, white text, 8px radius, bold

### Specialty module card (`module-card`)
- White bg, 12px radius, 1px `hairline` border
- Hover: shadow-md + border `brand-accent`
- Title hover: `brand-primary`
- CTA line: 11px bold `brand-title`

### Hospital comparison box (`hospital-box`)
- 8px radius, 16px padding, 1px `hairline-soft` border, white bg
- **best-value:** 2px `brand-accent` border, `brand-accent-soft` bg
- **coming-soon:** `surface-muted` bg, muted border
- Link: `brand-title` bold, underline on hover via `brand-accent`

### Lane container (`lane-container`)
- White card wrapping a procedure comparison group
- 12px radius, 20px padding, subtle shadow, 1px `hairline` border
- Lane header: 4px left bar in `brand-primary`

### Section header (`section-header`)
- 4px left bar in `brand-accent`, 18px bold `brand-title`

### Sidebar (`sidebar-fixed`)
- 280px fixed width, white bg, right border `hairline`
- Filter label: 10px uppercase tracking-widest, gray-400
- Active module chip: `brand-primary` text on blue-50 bg

### Footer (`site-footer`)
- Two-column CTA grid on `footer-bg`, disclaimer on `footer-deep`
- Primary CTA button: `brand-title` → hover `brand-primary`

### Buttons
| Variant | Background | Text | Radius |
|---------|-----------|------|--------|
| Primary | `brand-title` | white | 8px |
| Primary hover | `brand-primary` | white | — |
| Secondary | `gray-700` | white | 8px |
| Ghost | transparent | `brand-title` | — |

## 5. Layout Principles

**Spacing scale:** 4 / 8 / 12 / 16 / 20 / 24 / 32 / 48 / 64 px

- **Homepage:** `max-w-6xl` centered, `pt-24` below fixed header
- **Module pages:** Sidebar (280px) + main content with `max-w-6xl`
- **Grid:** Specialty cards 1→2→4 columns; hospital boxes 1→3 columns
- **Whitespace:** 48px (`space-y-12`) between major homepage sections

## 6. Depth & Elevation

| Level | Shadow | Use |
|-------|--------|-----|
| Rest | none | Flat list items |
| Card | `0 4px 6px -1px rgba(0,0,0,0.05)` | Module cards, lane containers |
| Hover | `0 4px 6px -1px rgba(0,0,0,0.10)` | Interactive cards |
| Header | `0 1px 3px rgba(0,0,0,0.1)` | Fixed nav |

## 7. Do's and Don'ts

**Do**
- Use CSS variables from `css/design-system.css` for all brand colors
- Keep price data visually dominant in hospital boxes
- Maintain Traditional Chinese typography throughout
- Use mint accent sparingly — best value, active states, accent bars only

**Don't**
- Invent new hex colors outside this palette
- Use emoji as the only visual anchor (pair with structured cards)
- Apply dark-mode inversion (site is light-mode only)
- Mix English marketing fonts (Inter, Geist) for Chinese body copy

## 8. Responsive Behavior

| Breakpoint | Behavior |
|------------|----------|
| `< 768px` | Single column grids; hide sidebar (filters collapse) |
| `≥ 768px` | 2-column specialty grid |
| `≥ 1024px` | Show fixed sidebar; 3-column hospital grid; 4-column specialty grid |

- Touch targets: minimum 44px height for buttons and checkboxes
- Header nav hidden on mobile (`hidden md:flex`)

## 9. Agent Prompt Guide

```
Build [component/page] for MedicalPrice. Follow DESIGN.md strictly.
Use css/design-system.css tokens (--mp-* variables and component classes).
Do not use colors, fonts, or spacing values outside DESIGN.md.
Language: Traditional Chinese (zh-HK).
```

**Quick color reference:**
- Header / primary: `#1D4E89`
- Headings / links: `#2B579A`
- Accent / best value: `#99D6D1`
- Page bg: `#F7F8FA`
- Card bg: `#FFFFFF`

**Implementation files:**
- Design tokens & components: `css/design-system.css`
- Render engine (hospital cards): `js/engine.js`
- Data layer: `data/db.js`
