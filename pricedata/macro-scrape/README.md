# 首頁宏觀數據抓取（公營收費 + 需求手術開支）

抓取日期: 2026-07-19

## 來源

| 區塊 | 來源 | 網址 |
| --- | --- | --- |
| 醫管局公立收費 | HA 醫療收費頁（2026-01-01 起生效） | https://www.ha.org.hk/visitor/fees_and_charges.asp?lang=CHIB5 |
| 需求最多手術 Top 10 | VHISGuide 理賠估算器（普通房／日間中位數） | https://vhisguide.com/claim-estimator |

## 產出

| 檔案 | 內容 |
| --- | --- |
| `pages/ha-fees.html` | 醫管局收費頁原文 |
| `parsed/ha-public-fees.json` | 首頁左側五項對照 |
| `parsed/top-surgeries.json` | 右側滾動 Top 10 手術 |

## 公立收費（符合資格／非符合資格）

與首頁左側一致：急症室 $400、急症住院 $300／日、專科門診 $250、非居民普通科住院 $7,400／日、ICU $35,600／日。

## Top 10 手術

按香港私家市場常見理賠／需求排序；日間術取日間價，住院術取普通房中位數。首頁以垂直自動滾動展示（懸停暫停）。
