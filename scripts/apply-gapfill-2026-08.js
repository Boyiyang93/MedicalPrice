#!/usr/bin/env node
/**
 * Fill Coming Soon / split mixed procedure cards with first-party official packages.
 */
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'data', 'db.js');
const OUT_PATH = path.join(__dirname, '..', 'pricedata/_audit-2026-08/GAPFILL.json');

function findMatchingBrace(src, openIdx) {
  let depth = 0;
  for (let i = openIdx; i < src.length; i++) {
    const ch = src[i];
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) return i;
    }
  }
  throw new Error('unbalanced brace at ' + openIdx);
}

function formatRow(indent, hospital, rec) {
  const lines = [`\n${indent}${hospital}: {`];
  lines.push(`${indent}  price: ${rec.price},`);
  if (rec.priceLabel) lines.push(`${indent}  priceLabel: ${JSON.stringify(rec.priceLabel)},`);
  if (rec.displayPrice) lines.push(`${indent}  displayPrice: ${JSON.stringify(rec.displayPrice)},`);
  if (rec.remarks) lines.push(`${indent}  remarks: ${JSON.stringify(rec.remarks)},`);
  if (rec.link) lines.push(`${indent}  link: ${JSON.stringify(rec.link)}`);
  lines.push(`${indent}},`);
  return lines.join('\n');
}

function replaceHospitalInProcedure(src, procedure, hospital, rec) {
  const procRe = new RegExp(`\\n(\\s*)${procedure}: \\{`);
  const procHit = procRe.exec(src);
  if (!procHit) throw new Error('missing procedure ' + procedure);
  const procOpen = procHit.index + procHit[0].length - 1;
  const body = src.slice(procOpen + 1, findMatchingBrace(src, procOpen));
  const hospRe = new RegExp(`\\n([ \\t]*)${hospital}: \\{`);
  const hospHit = hospRe.exec(body);
  if (!hospHit) throw new Error(`missing ${procedure}.${hospital}`);
  const hospOpen = procOpen + 1 + hospHit.index + hospHit[0].length - 1;
  const hospClose = findMatchingBrace(src, hospOpen);
  let after = hospClose + 1;
  while (src[after] === ',') after++;
  const indent = hospHit[1];
  const replacement = formatRow(indent, hospital, rec);
  const from = procOpen + 1 + hospHit.index;
  return src.slice(0, from) + replacement + src.slice(after);
}

const CUHK_GS = 'https://www.cuhkmc.hk/sc/medical-packages/cumc-medical-package/general-surgery';
const CUHK_ORT = 'https://www.cuhkmc.hk/sc/medical-packages/cumc-medical-package/orthopaedics';
const CUHK_ENT = 'https://www.cuhkmc.hk/sc/medical-packages/cumc-medical-package/otorhinolaryngology';
const GHK_ORT = 'https://gleneagles.hk/tc/fee-charges/orthopaedic-procedures';
const MATILDA_ENT = 'https://www.matilda.org/fees-and-packages/ent/tonsillectomy-and-adenoidectomy-packages?hsLang=zh-hk';
const UNION_PKG = 'https://www.union.org/appassets/Charges/Surgical-Operation-Package-V1.pdf';
const HKAH_HERNIA = 'https://www.hkah.org.hk/tc/promotions/package-for-referrals-from-public-hospitals-laparoscopic-groin-hernia-repair-surgery';

const FILLS = [
  {
    procedure: 'hernia_bilateral', hospital: 'union',
    rec: {
      price: 82900,
      priceLabel: '腹腔鏡雙側腹股溝疝修補術（含植入物）',
      displayPrice: 'HK$82,900',
      remarks: '✓ 仁安外科手術套餐（2026-08-01 起）；標準房 2 日 1 夜，含醫生費、麻醉及植入物。指定醫生。',
      link: UNION_PKG
    }
  },
  {
    procedure: 'hernia_bilateral', hospital: 'hkah',
    rec: {
      price: 57800,
      priceLabel: '微創雙側腹股溝疝修補（公立轉介日間套餐）',
      displayPrice: 'HK$57,800',
      remarks: '✓ 港安司徒拔道公立醫院轉介日間套餐（2025-07-17）；須醫管局轉介信及指定醫生。單側精選價 HK$51,500。',
      link: HKAH_HERNIA
    }
  },
  {
    procedure: 'sports_ortho', hospital: 'cuhk',
    rec: {
      price: 167080,
      priceLabel: '關節內視鏡前十字韌帶重建術（單側）',
      displayPrice: 'HK$111,360 – $222,800',
      remarks: '✓ 中大醫院定價收費（CMP）；含醫生費。病情級別 1–3。可合併半月板修復約 $133,800–$267,600。',
      link: CUHK_ORT
    }
  },
  {
    procedure: 'sports_ortho', hospital: 'ghk',
    rec: {
      price: 138000,
      priceLabel: '關節鏡前十字韌帶重建術（腿後肌腱移植，單腿）',
      displayPrice: 'HK$120,000 – $156,000',
      remarks: '✓ 港怡全包套餐 ORT05A；普通／中等風險；參考住院約 3 日。含醫生費。',
      link: GHK_ORT
    }
  },
  {
    procedure: 'knee_arthroscopy', hospital: 'cuhk',
    rec: {
      price: 117810,
      priceLabel: '膝關節內視鏡／半月板手術（單側）',
      displayPrice: 'HK$63,620 – $172,000',
      remarks: '✓ 中大醫院定價收費：游離體／部分半月板切除至半月板修復。十字韌帶重建已拆至運動醫學卡。',
      link: CUHK_ORT
    }
  },
  {
    procedure: 'knee_arthroscopy', hospital: 'ghk',
    rec: {
      price: 86210,
      priceLabel: '膝關節鏡診斷／半月板手術（單腿）',
      displayPrice: 'HK$57,500 – $114,920',
      remarks: '✓ 港怡全包套餐 ORT02A/B/C（診斷／半月板切除／修復）；普通／中等風險。十字韌帶重建見運動醫學卡。',
      link: GHK_ORT
    }
  },
  {
    procedure: 'shoulder_arthroscopy', hospital: 'ghk',
    rec: {
      price: 135800,
      priceLabel: '肩關節鏡修補／減壓／肩袖修復（單邊）',
      displayPrice: 'HK$100,000 – $171,600',
      remarks: '✓ 港怡全包套餐 ORT07B/C/D；不含純診斷鏡 ORT07A（$60,000–$78,000）。',
      link: GHK_ORT
    }
  },
  {
    procedure: 'hip_replacement', hospital: 'ghk',
    rec: {
      price: 212800,
      priceLabel: '單邊全髖關節置換術',
      displayPrice: 'HK$183,800 – $241,800',
      remarks: '✓ 港怡全包套餐（S&N／J&J／Zimmer／Stryker 植入物）；普通／中等風險。機械臂輔助約 $229,000–$297,700 另計。',
      link: GHK_ORT
    }
  },
  {
    procedure: 'knee_replacement', hospital: 'ghk',
    rec: {
      price: 200035,
      priceLabel: '單膝全膝關節置換術',
      displayPrice: 'HK$167,500 – $232,570',
      remarks: '✓ 港怡全包套餐 ORT01A–E（視植入物）；普通／中等風險。機械臂輔助及雙膝置換另計。',
      link: GHK_ORT
    }
  },
  {
    procedure: 'achilles_ankle', hospital: 'ghk',
    rec: {
      price: 99270,
      priceLabel: '跟腱修復／足踝關節鏡韌帶重建',
      displayPrice: 'HK$74,000 – $124,540',
      remarks: '✓ 港怡全包套餐：跟腱修復（簡單／複雜）及足踝關節鏡+韌帶重建；普通／中等風險。',
      link: GHK_ORT
    }
  },
  {
    procedure: 'adenoid_tonsil', hospital: 'cuhk',
    rec: {
      price: 93000,
      priceLabel: '扁桃體切除術及腺樣增殖體切除手術',
      displayPrice: 'HK$65,500 – $120,500',
      remarks: '✓ 中大醫院定價收費：常規同台 $65,500–$87,300；內視鏡輔助 $91,500–$120,500。日間／住院級別 1–2。',
      link: CUHK_ENT
    }
  },
  {
    procedure: 'adenoid_tonsil', hospital: 'matilda',
    rec: {
      price: 111230,
      priceLabel: '扁桃腺切除術及腺體切除術（全面護理）',
      displayPrice: 'HK$86,100 – $136,360',
      remarks: '✓ 明德全面護理套餐（含醫生費；標準／雙人／私家房）。單切扁桃腺見扁桃體切除術卡。',
      link: MATILDA_ENT
    }
  },
  {
    procedure: 'adenoid_tonsil', hospital: 'evangel',
    rec: {
      price: 9999999,
      remarks: '耳鼻喉科手術資料整理中。'
    }
  },
  {
    procedure: 'tonsillectomy', hospital: 'matilda',
    rec: {
      price: 85930,
      priceLabel: '扁桃腺切除術（全面護理）',
      displayPrice: 'HK$67,200 – $104,660',
      remarks: '✓ 明德全面護理套餐（含醫生費；標準／雙人／私家房）。同台腺樣體見腺樣體及扁桃體手術卡。',
      link: MATILDA_ENT
    }
  },
  {
    procedure: 'tonsillectomy', hospital: 'evangel',
    rec: {
      price: 18484,
      priceLabel: '扁桃體切除術（歷史中位）',
      displayPrice: 'HK$18,484',
      remarks: '✓ 醫院價目／歷史統計（本地 scrape）。2025 年普通房歷史五十分位總收費。',
      link: 'https://www.evangel.org.hk/zh-hant/charges/price_list/'
    }
  },
  {
    procedure: 'sinus_surgery', hospital: 'cuhk',
    rec: {
      price: 156000,
      priceLabel: '功能性內視鏡鼻竇手術（FESS）',
      displayPrice: 'HK$99,200 – $212,800',
      remarks: '✓ 中大醫院定價收費；日間至住院病情級別 3。含醫生費。香港居民、日間或 4 人房。',
      link: CUHK_ENT
    }
  },
  {
    procedure: 'thyroid_surgery', hospital: 'cuhk',
    rec: {
      price: 167380,
      priceLabel: '甲狀腺切除術（偏側／全切）',
      displayPrice: 'HK$85,960 – $248,800',
      remarks: '✓ 中大醫院定價收費：偏側至全切（含能量設備選項）；病情級別 1–3。細針穿刺見甲狀腺穿刺卡。',
      link: CUHK_GS
    }
  }
];

function main() {
  let src = fs.readFileSync(DB_PATH, 'utf8');
  const applied = [];
  for (const row of FILLS) {
    src = replaceHospitalInProcedure(src, row.procedure, row.hospital, row.rec);
    applied.push(`${row.procedure}.${row.hospital}`);
  }
  fs.writeFileSync(DB_PATH, src);
  fs.writeFileSync(OUT_PATH, JSON.stringify({
    date: '2026-08-21',
    applied: FILLS.map((r) => ({
      id: `${r.procedure}.${r.hospital}`,
      price: r.rec.price,
      priceLabel: r.rec.priceLabel || null,
      displayPrice: r.rec.displayPrice || null,
      link: r.rec.link || null
    })),
    skipped: {
      hernia_abdominal: '除中大 CMP 腹腔疝（腹壁／切口疝）外，各院公開套餐仍只有腹股溝／小腸氣，不回填。',
      sports_ortho_others: '未找到獨立交叉韌帶套餐的醫院維持 Coming Soon，不把膝關節鏡價寫回。'
    }
  }, null, 2));
  console.log('applied', applied.length);
  applied.forEach((d) => console.log(d));
}

main();
