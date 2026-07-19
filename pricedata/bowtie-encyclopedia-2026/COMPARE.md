# Bowtie 私家醫院百科 — A/B/C/E

## 規則
一手醫院 scrape > Bowtie。僅填 `9999999`。

## 已寫入 db（20）
- `ct_brain.ghk`
- `mri_brain.ghk`
- `gastroscopy.baptist`
- `gastroscopy.canossa`
- `gastroscopy.sph`
- `gastroscopy.twah`
- `colonoscopy.sth`
- `colonoscopy.union`
- `colonoscopy.canossa`
- `colonoscopy.sph`
- `colonoscopy.evangel`
- `colonoscopy.twah`
- `colonoscopy.hkah`
- `dual_scope.sth`
- `dual_scope.baptist`
- `dual_scope.canossa`
- `dual_scope.sph`
- `dual_scope.evangel`
- `dual_scope.twah`
- `dual_scope.hkah`

## 說明
- A 醫院總覽：門診/病房已有一手 scrape，僅归档 pricedata/bowtie-encyclopedia-2026/
- B 内镜：缺口已补；union/hkah gastro、hksh/matilda colon 仍 Coming Soon
- C 影像：港怡 CT/MRI 脑部已补；cuhk CT、canossa CT/MRI 仍缺
- E 手术：仍为既有 13院×7术式（已重跑 bowtie-surgery）；无额外新术式可写 db
- union dual_scope 仅设施费，未写入

## 归档说明
- `text/`：去标签正文（入库）
- `raw/`：完整 HTML 体积大，本地可再抓；已 gitignore
