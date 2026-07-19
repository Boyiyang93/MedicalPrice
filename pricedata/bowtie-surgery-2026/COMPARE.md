# Bowtie 手術比價 × db.js 對照
來源: https://www.bowtie.com.hk/blog/zh/%e7%a7%81%e5%ae%b6%e9%86%ab%e9%99%a2%e7%99%be%e7%a7%91/%e6%89%8b%e8%a1%93%e8%b2%bb-%e5%a5%97%e9%a4%90%e5%83%b9%e9%8c%a2-%e6%af%94%e8%bc%83-%e9%a6%99%e6%b8%af-%e7%a7%81%e5%ae%b6%e9%86%ab%e9%99%a2-%e5%b8%b8%e8%a6%8b-%e6%89%8b%e8%a1%93%e6%94%b6%e8%b2%bb/
抓取/匯總日: Bowtie 更新 2026-03-10；對照執行 2026-07-19

## 缺口與差異摘要
| 術式 | 現有實價醫院 | 仍為 Coming Soon | 明顯差異（已有實價 vs Bowtie） |
| --- | --- | --- | --- |
| cholecystectomy | cuhk, ghk, pbh, sth, twah, baptist, hksh, sph, union, evangel, canossa | hkah, matilda | twah db=50,325 vs Bowtie≈143,844 (HK$129,070 – $158,617); evangel db=37,347 vs Bowtie≈91,262 (HK$77,875 – $104,648) |
| hemorrhoid | ghk, union | cuhk, pbh, sth, hkah, twah, baptist, hksh, sph, matilda, evangel, canossa | — |
| circumcision | cuhk, ghk | pbh, sth, hkah, twah, baptist, hksh, sph, union, matilda, evangel, canossa | — |
| cataract | cuhk, ghk, union | pbh, twah, baptist, hksh, sph, evangel | cuhk db=55,825 vs Bowtie≈36,787 (HK$32,920 – $40,654); ghk db=67,540 vs Bowtie≈26,462 (HK$22,600 – $30,325) |
| hernia_unilateral | cuhk, ghk | pbh, sth, twah, baptist, hksh, sph, union, matilda, evangel, canossa | — |
| breast_lump | cuhk, ghk, union | pbh, sth, hkah, twah, baptist, hksh, sph, matilda, evangel, canossa | ghk db=73,500 vs Bowtie≈111,354 (HK$82,996 – $139,712) |
| orif_upper_limb | cuhk, union | ghk, pbh, sth, hkah, twah, baptist, hksh, sph, matilda, evangel, canossa | cuhk db=207,750 vs Bowtie≈132,110 (HK$117,118 – $147,103) |
| orif_lower_limb | cuhk, union | ghk, pbh, sth, hkah, twah, baptist, hksh, sph, matilda, evangel, canossa | — |

## 填充策略
- 只填補 `price: 9999999` 占位（及膽囊術 evangel/twah 明顯偏低項）。
- `price` 取區間中位；`displayPrice` 保留 Bowtie 區間；remarks 標註二手匯總來源。
- 不覆寫已有一手抓取/套餐數據（如 ghk 痔瘡套餐、多數膽囊一手歷史）。
- 港安（司徒拔道）疝氣文章數字異常偏高，暫不自動寫入。
- 不新增 sysu7/donghua。

## 本次寫入 db.js
- generalSurgery.cholecystectomy.hkah → HK$91,000 – $152,040
- generalSurgery.cholecystectomy.matilda → HK$157,309 – $181,281
- generalSurgery.hemorrhoid.cuhk → HK$58,962 – $64,532
- generalSurgery.hemorrhoid.pbh → HK$33,058 – $44,807
- generalSurgery.hemorrhoid.sth → HK$42,376 – $56,911
- generalSurgery.hemorrhoid.hkah → HK$48,335 – $91,311
- generalSurgery.hemorrhoid.twah → HK$50,662 – $69,381
- generalSurgery.hemorrhoid.baptist → HK$47,122 – $84,998
- generalSurgery.hemorrhoid.hksh → HK$56,723 – $77,252
- generalSurgery.hemorrhoid.sph → HK$47,189 – $65,118
- generalSurgery.hemorrhoid.matilda → HK$44,000 – $75,850
- generalSurgery.hemorrhoid.evangel → HK$41,170 – $60,607
- generalSurgery.hemorrhoid.canossa → HK$56,390 – $78,309
- generalSurgery.circumcision.pbh → HK$25,114 – $27,368
- generalSurgery.circumcision.sth → HK$30,823 – $32,672
- generalSurgery.circumcision.hkah → HK$41,056 – $50,167
- generalSurgery.circumcision.twah → HK$41,798 – $48,380
- generalSurgery.circumcision.baptist → HK$27,624 – $35,092
- generalSurgery.circumcision.hksh → HK$42,814 – $59,669
- generalSurgery.circumcision.sph → HK$27,507 – $36,951
- generalSurgery.circumcision.union → HK$13,000
- generalSurgery.circumcision.matilda → HK$52,471
- generalSurgery.circumcision.evangel → HK$21,240 – $25,807
- generalSurgery.circumcision.canossa → HK$45,894 – $57,537
- ophthalmology.cataract.pbh → HK$20,599 – $22,384
- ophthalmology.cataract.twah → HK$18,093 – $24,631
- ophthalmology.cataract.baptist → HK$23,800
- ophthalmology.cataract.hksh → HK$25,230 – $35,220
- ophthalmology.cataract.sph → HK$28,250 – $34,770
- ophthalmology.cataract.evangel → HK$20,800 – $41,600
- generalSurgery.hernia_unilateral.pbh → HK$55,272
- generalSurgery.hernia_unilateral.sth → HK$80,987 – $101,939
- generalSurgery.hernia_unilateral.twah → HK$65,454
- generalSurgery.hernia_unilateral.baptist → HK$78,214 – $118,141
- generalSurgery.hernia_unilateral.hksh → HK$102,575 – $133,591
- generalSurgery.hernia_unilateral.sph → HK$75,844 – $93,590
- generalSurgery.hernia_unilateral.union → HK$72,510 – $92,470
- generalSurgery.hernia_unilateral.matilda → HK$93,256 – $108,890
- generalSurgery.hernia_unilateral.evangel → HK$71,734 – $112,531
- generalSurgery.hernia_unilateral.canossa → HK$94,670
- generalSurgery.breast_lump.pbh → HK$39,344 – $106,443
- generalSurgery.breast_lump.sth → HK$59,930 – $79,720
- generalSurgery.breast_lump.hkah → HK$79,395 – $106,658
- generalSurgery.breast_lump.twah → HK$64,350 – $114,412
- generalSurgery.breast_lump.baptist → HK$64,955 – $116,314
- generalSurgery.breast_lump.hksh → HK$100,648 – $160,235
- generalSurgery.breast_lump.sph → HK$73,471 – $83,615
- generalSurgery.breast_lump.matilda → HK$46,967 – $89,556
- generalSurgery.breast_lump.evangel → HK$51,954 – $76,162
- generalSurgery.breast_lump.canossa → HK$62,349 – $146,013
- orthopedics.orif_upper_limb.ghk → HK$104,133 – $149,966
- orthopedics.orif_upper_limb.pbh → HK$74,420 – $90,704
- orthopedics.orif_upper_limb.sth → HK$94,685 – $126,168
- orthopedics.orif_upper_limb.hkah → HK$124,786 – $145,730
- orthopedics.orif_upper_limb.twah → HK$120,487 – $154,451
- orthopedics.orif_upper_limb.baptist → HK$113,371 – $172,008
- orthopedics.orif_upper_limb.hksh → HK$166,314 – $236,938
- orthopedics.orif_upper_limb.sph → HK$107,343 – $158,596
- orthopedics.orif_upper_limb.matilda → HK$173,262 – $245,859
- orthopedics.orif_upper_limb.evangel → HK$93,149 – $126,045
- orthopedics.orif_upper_limb.canossa → HK$123,299 – $206,870
- orthopedics.orif_lower_limb.ghk → HK$100,300 – $137,919
- orthopedics.orif_lower_limb.pbh → HK$83,974 – $109,804
- orthopedics.orif_lower_limb.sth → HK$98,395 – $136,311
- orthopedics.orif_lower_limb.hkah → HK$125,386 – $148,300
- orthopedics.orif_lower_limb.twah → HK$128,211 – $159,926
- orthopedics.orif_lower_limb.baptist → HK$119,558 – $190,646
- orthopedics.orif_lower_limb.hksh → HK$170,666 – $200,963
- orthopedics.orif_lower_limb.sph → HK$107,343 – $158,596
- orthopedics.orif_lower_limb.matilda → HK$187,686 – $261,455
- orthopedics.orif_lower_limb.evangel → HK$106,735 – $121,815
- orthopedics.orif_lower_limb.canossa → HK$139,411 – $228,301

共 72 項。


## 優先級更正（2026-07-19）

**醫院一手抓取 > Bowtie 二手匯總。** Bowtie 只用於醫院未抓到的術式/醫院。

已從抓取档案覆寫回以下項目（覆蓋先前 Bowtie 填值）：

- `generalSurgery.cholecystectomy.evangel`
- `generalSurgery.cholecystectomy.twah`
- `generalSurgery.hemorrhoid.sth`
- `generalSurgery.hemorrhoid.canossa`
- `generalSurgery.hemorrhoid.baptist`
- `generalSurgery.hemorrhoid.sph`
- `generalSurgery.hemorrhoid.twah`
- `generalSurgery.hemorrhoid.matilda`
- `generalSurgery.hemorrhoid.evangel`
- `generalSurgery.circumcision.canossa`
- `generalSurgery.circumcision.matilda`
- `generalSurgery.hernia_unilateral.canossa`
- `generalSurgery.hernia_unilateral.sph`
- `generalSurgery.hernia_unilateral.matilda`
- `generalSurgery.breast_lump.hksh`
- `generalSurgery.breast_lump.pbh`
- `generalSurgery.breast_lump.sph`
- `ophthalmology.cataract.evangel`

仍保留 Bowtie 作為補缺的典型例子：多數院 ORIF、部分包皮/白內障/乳房（無一手歷史或套餐總收費者）、`hkah`/`matilda` 膽囊等抓取未覆蓋項。
Baptist 手術室示例價（僅 OT 分段費）**不作為**全賬總收費覆寫來源。
