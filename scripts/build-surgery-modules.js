/**
 * Generate surgery module blocks from pricedata CSV.
 * Run: node scripts/build-surgery-modules.js
 */
const fs = require('fs');
const path = require('path');

const CSV_PATH = path.join(__dirname, '../pricedata/手术费用_CUHKMC-整理后表格.csv');
const HOSPITAL_ORDER = [
  'szufh', 'cuhk', 'hksh', 'ghk', 'matilda', 'sth', 'baptist', 'union',
  'canossa', 'sph', 'pbh', 'evangel', 'twah', 'hkah'
];
const HOSPITAL_MAP = {
  '香港中文大學醫院': 'cuhk',
  '深圳新風和睦家醫院': 'szufh',
  '香港港怡醫院': 'ghk',
  '香港養和醫院': 'hksh'
};

const MODULE_LINKS = {
  gynecology: {
    cuhk: 'https://www.cuhkmc.hk/sc/fees-and-charges/maternity',
    hksh: 'https://www.hksh-hospital.com/tc_chi/services/service_obstetrics_and_gynaecology.aspx',
    ghk: 'https://gleneagles.hk/tc/patient-care-services/obstetrics-and-gynaecology'
  },
  generalSurgery: {
    cuhk: 'https://www.cuhkmc.hk/sc/medical-packages/cumc-medical-package/general-surgery',
    hksh: 'https://www.hksh-hospital.com/tc_chi/services/service_general_surgery.aspx',
    ghk: 'https://gleneagles.hk/tc/patient-care-services/general-surgery',
    szufh: 'https://www.szufh.hk/shoushusf.html'
  },
  imaging: {
    cuhk: 'https://www.cuhkmc.hk/sc/medical-packages/cumc-medical-package/endoscopy-package-fees',
    ghk: 'https://gleneagles.hk/tc/patient-care-services/endoscopy',
    szufh: 'https://www.szufh.hk/xiaohuaneijing.html'
  },
  ent: {
    cuhk: 'https://www.cuhkmc.hk/sc/fees-and-charges/price-transparency/reference-charges-for-common-surgical-procedures',
    ghk: 'https://gleneagles.hk/tc/patient-care-services/ear-nose-throat',
    szufh: 'https://www.szufh.hk/shoushusf.html'
  },
  ophthalmology: {
    cuhk: 'https://www.cuhkmc.hk/sc/fees-and-charges/price-transparency/reference-charges-for-common-surgical-procedures',
    ghk: 'https://gleneagles.hk/tc/patient-care-services/ophthalmology',
    szufh: 'https://www.szufh.hk/shoushusf.html'
  },
  urology: {
    ghk: 'https://gleneagles.hk/tc/patient-care-services/urology',
    szufh: 'https://www.szufh.hk/shoushusf.html'
  }
};

/** Explicit CSV row → module.procedure mapping */
const ROW_MAP = [
  // imaging
  { match: (r) => r.hospital === 'cuhk' && r.package.includes('支氣管鏡') && r.package.includes('日間'), module: 'imaging', procedure: 'bronchoscopy', label: '支氣管鏡檢查 (日間)' },
  { match: (r) => r.hospital === 'ghk' && r.package.includes('支氣管'), module: 'imaging', procedure: 'bronchoscopy', label: '支氣管內視鏡檢查' },
  { match: (r) => r.hospital === 'cuhk' && r.package.includes('胃鏡檢查 (鎮靜麻醉)'), module: 'imaging', procedure: 'gastroscopy', label: '日間胃鏡 (鎮靜麻醉)' },
  { match: (r) => r.hospital === 'szufh' && r.package.includes('無痛胃鏡'), module: 'imaging', procedure: 'gastroscopy', label: '無痛胃鏡健康檢查 (監察麻醉)' },
  { match: (r) => r.hospital === 'cuhk' && r.package.includes('結腸內視鏡檢查 (鎮靜麻醉)'), module: 'imaging', procedure: 'colonoscopy', label: '日間結腸鏡 (鎮靜麻醉)' },
  { match: (r) => r.hospital === 'szufh' && r.package.includes('無痛腸鏡'), module: 'imaging', procedure: 'colonoscopy', label: '無痛腸鏡健康檢查 (監察麻醉)' },
  { match: (r) => r.hospital === 'cuhk' && r.package.includes('胃鏡及大腸鏡') && r.package.includes('日間'), module: 'imaging', procedure: 'dual_scope', label: '日間胃鏡及大腸鏡聯查' },
  { match: (r) => r.hospital === 'szufh' && r.package.includes('雙鏡聯合'), module: 'imaging', procedure: 'dual_scope', label: '無痛胃腸鏡健康檢查 (雙鏡聯合)' },

  // gynecology — delivery packages (CUHK / HKSH)
  { match: (r) => r.package.includes('自然分娩套餐'), module: 'gynecology', procedure: 'normal_delivery', label: '自然分娩套餐 (二人房/一人房)' },
  { match: (r) => (r.package.includes('選擇性剖腹分娩') || r.package.includes('緊急剖腹分娩')), module: 'gynecology', procedure: 'c_section', label: '剖腹分娩套餐 (二人房/一人房)' },

  // gynecology (SZUFH + GHK)
  { match: (r) => r.package.includes('子宮頸病變'), module: 'gynecology', procedure: 'cervical_treatment', label: '子宮頸病變治療手術' },
  { match: (r) => r.hospital === 'ghk' && r.package.includes('陰道窺鏡'), module: 'gynecology', procedure: 'cervical_treatment', label: '陰道窺鏡檢查' },
  { match: (r) => r.package.includes('子宮鏡診治') || (r.hospital === 'ghk' && r.package.includes('宮腔鏡')), module: 'gynecology', procedure: 'hysteroscopy', label: '子宮鏡診治手術' },
  { match: (r) => r.package.includes('子宮肌瘤切除'), module: 'gynecology', procedure: 'myomectomy', label: '子宮肌瘤切除術' },
  { match: (r) => r.package.includes('子宮切除術'), module: 'gynecology', procedure: 'hysterectomy', label: '子宮切除術' },
  { match: (r) => r.package.includes('輸卵管及宮外孕') || (r.hospital === 'ghk' && r.package.includes('婦科小手術')), module: 'gynecology', procedure: 'tubal_ectopic', label: '輸卵管及宮外孕手術' },
  { match: (r) => r.package.includes('卵巢囊腫切除'), module: 'gynecology', procedure: 'ovarian_cyst', label: '卵巢囊腫切除術' },
  { match: (r) => r.package.includes('避孕及終止妊娠') || (r.hospital === 'ghk' && r.package.includes('終止妊娠')), module: 'gynecology', procedure: 'contraception', label: '避孕及終止妊娠' },

  // generalSurgery
  { match: (r) => r.package.includes('膽囊切除'), module: 'generalSurgery', procedure: 'cholecystectomy', label: '腹腔鏡膽囊切除術' },
  { match: (r) => r.hospital === 'ghk' && r.package.includes('乳房腫塊'), module: 'generalSurgery', procedure: 'breast_surgery', label: '乳房腫塊/腫瘤切除術' },
  { match: (r) => r.hospital === 'ghk' && r.package.includes('甲狀腺切除術'), module: 'generalSurgery', procedure: 'thyroidectomy', label: '甲狀腺切除術' },
  { match: (r) => r.hospital === 'ghk' && r.package.includes('腹股溝疝氣'), module: 'generalSurgery', procedure: 'hernia_unilateral', label: '腹股溝疝氣修補術' },
  { match: (r) => r.hospital === 'ghk' && r.package.includes('闌尾'), module: 'generalSurgery', procedure: 'appendectomy', label: '闌尾切除術' },
  { match: (r) => r.hospital === 'ghk' && r.package.includes('痔瘡切除'), module: 'generalSurgery', procedure: 'hemorrhoid', label: '痔瘡切除術' },
  { match: (r) => r.hospital === 'ghk' && r.package.includes('包皮環切'), module: 'generalSurgery', procedure: 'circumcision', label: '包皮環切術' },
  { match: (r) => r.hospital === 'cuhk' && r.package.includes('乳房腫塊切除'), module: 'generalSurgery', procedure: 'breast_lump', label: '乳房腫塊切除術' },
  { match: (r) => r.hospital === 'cuhk' && r.package.includes('包皮環切'), module: 'generalSurgery', procedure: 'circumcision', label: '包皮環切術' },
  { match: (r) => r.hospital === 'cuhk' && r.package.includes('甲狀腺細針穿刺'), module: 'generalSurgery', procedure: 'thyroid_fna', label: '超聲波導引甲狀腺細針穿刺' },
  { match: (r) => r.package.includes('偏側甲狀腺切除'), module: 'generalSurgery', procedure: 'hemithyroidectomy', label: '偏側甲狀腺切除術' },
  { match: (r) => r.package.includes('局部/次全/全甲狀腺'), module: 'generalSurgery', procedure: 'thyroidectomy', label: '甲狀腺/副甲狀腺切除術' },
  { match: (r) => r.package.includes('腹腔疝氣修補'), module: 'generalSurgery', procedure: 'hernia_abdominal', label: '腹腔疝氣修補術' },
  { match: (r) => r.package.includes('單側腹股溝疝氣'), module: 'generalSurgery', procedure: 'hernia_unilateral', label: '單側腹股溝疝氣修補術' },
  { match: (r) => r.package.includes('雙側腹股溝疝氣'), module: 'generalSurgery', procedure: 'hernia_bilateral', label: '雙側腹股溝疝氣修補術' },
  { match: (r) => r.package.includes('闌尾切除'), module: 'generalSurgery', procedure: 'appendectomy', label: '闌尾切除術' },
  { match: (r) => r.package.includes('痔瘡'), module: 'generalSurgery', procedure: 'hemorrhoid', label: '痔瘡專項處置' },
  { match: (r) => r.hospital === 'szufh' && r.package.includes('甲狀腺處置'), module: 'generalSurgery', procedure: 'thyroid_surgery', label: '甲狀腺處置手術' },
  { match: (r) => r.package.includes('輸液港'), module: 'generalSurgery', procedure: 'port_a_cath', label: '輸液港手術' },
  { match: (r) => r.package.includes('乳腺抽針'), module: 'generalSurgery', procedure: 'breast_biopsy', label: '乳腺抽針及旋切活檢' },
  { match: (r) => r.package.includes('乳腺外科手術'), module: 'generalSurgery', procedure: 'breast_surgery', label: '乳腺外科手術' },

  // orthopedics CUHK
  { match: (r) => r.package.includes('關節鏡手術 (肩部'), module: 'orthopedics', procedure: 'shoulder_arthroscopy', label: '肩關節鏡手術' },
  { match: (r) => r.package.includes('全肩關節置換'), module: 'orthopedics', procedure: 'shoulder_replacement', label: '全肩關節置換術' },
  { match: (r) => r.package.includes('鎖骨/手腕橈骨'), module: 'orthopedics', procedure: 'orif_upper_limb', label: 'ORIF (鎖骨/橈骨遠端)' },
  { match: (r) => r.package.includes('腕管解除'), module: 'orthopedics', procedure: 'carpal_tunnel', label: '內視鏡腕管解除術' },
  { match: (r) => r.package.includes('板機狀指'), module: 'orthopedics', procedure: 'trigger_finger', label: '板機狀指鬆解術' },
  { match: (r) => r.package.includes('關節鏡手術 (膝部'), module: 'orthopedics', procedure: 'knee_arthroscopy', label: '膝關節鏡手術' },
  { match: (r) => r.package.includes('全人工膝關節置換'), module: 'orthopedics', procedure: 'knee_replacement', label: '全人工膝關節置換術' },
  { match: (r) => r.package.includes('髕骨/單雙踝'), module: 'orthopedics', procedure: 'orif_lower_limb', label: 'ORIF (髕骨/足踝骨折)' },
  { match: (r) => r.package.includes('髖關節全關節置換'), module: 'orthopedics', procedure: 'hip_replacement', label: '髖關節全關節置換' },
  { match: (r) => r.package.includes('跟腱修補'), module: 'orthopedics', procedure: 'achilles_ankle', label: '跟腱修補/踝關節鏡韌帶修補' },
  // orthopedics SZUFH
  { match: (r) => r.package.includes('人工關節置換術 (全膝'), module: 'orthopedics', procedure: 'joint_replacement', label: '人工關節置換術' },
  { match: (r) => r.package.includes('脊柱手術'), module: 'orthopedics', procedure: 'spine_surgery', label: '脊柱手術' },
  { match: (r) => r.package.includes('骨科小手術'), module: 'orthopedics', procedure: 'sports_ortho', label: '骨科小手術及運動醫學' },

  // ent
  { match: (r) => r.package.includes('微型喉鏡'), module: 'ent', procedure: 'micro_laryngoscopy', label: '微型喉鏡檢查' },
  { match: (r) => r.hospital === 'cuhk' && r.package.includes('扁桃體切除'), module: 'ent', procedure: 'tonsillectomy', label: '扁桃體切除術' },
  { match: (r) => r.package.includes('腺樣體') || (r.hospital === 'ghk' && r.package.includes('扁桃腺')), module: 'ent', procedure: 'adenoid_tonsil', label: '腺樣體及扁桃體手術' },
  { match: (r) => r.package.includes('鼻竇炎及鼻中隔') || (r.hospital === 'ghk' && r.package.includes('鼻竇炎')), module: 'ent', procedure: 'sinus_surgery', label: '鼻竇炎及鼻中隔手術' },
  { match: (r) => r.package.includes('鼓膜修補') || (r.hospital === 'ghk' && r.package.includes('鼓膜')), module: 'ent', procedure: 'tympanoplasty', label: '鼓膜修補及顯微喉鏡' },
  { match: (r) => r.hospital === 'ghk' && r.package.includes('顯微喉鏡'), module: 'ent', procedure: 'micro_laryngoscopy', label: '顯微喉鏡檢查' },

  // ophthalmology
  { match: (r) => r.hospital === 'cuhk' && r.package.includes('白內障'), module: 'ophthalmology', procedure: 'cataract', label: '白內障超聲乳化手術' },
  { match: (r) => r.hospital === 'szufh' && r.package.includes('白內障'), module: 'ophthalmology', procedure: 'cataract', label: '白內障超聲乳化晶體植入' },
  { match: (r) => r.hospital === 'ghk' && r.package.includes('白內障'), module: 'ophthalmology', procedure: 'cataract', label: '白內障超聲乳化手術' },
  { match: (r) => r.package.includes('斜視手術'), module: 'ophthalmology', procedure: 'strabismus', label: '斜視手術' },

  // urology (SZUFH)
  { match: (r) => r.package.includes('前列腺診療'), module: 'urology', procedure: 'prostate', label: '前列腺診療手術' },
  { match: (r) => r.package.includes('結石碎石'), module: 'urology', procedure: 'kidney_stone', label: '泌尿系結石碎石手術' },
  { match: (r) => r.package.includes('尿動力檢查'), module: 'urology', procedure: 'urodynamics', label: '尿動力及膀胱鏡檢查' },
  { match: (r) => r.package.includes('男科處置') || (r.hospital === 'ghk' && r.package.includes('輸精管切除')), module: 'urology', procedure: 'andrology', label: '男科處置手術' },
  { match: (r) => r.hospital === 'ghk' && r.package.includes('膀胱鏡'), module: 'urology', procedure: 'urodynamics', label: '膀胱鏡檢查' },
  { match: (r) => r.hospital === 'ghk' && r.package.includes('輸尿管碎石'), module: 'urology', procedure: 'kidney_stone', label: '泌尿系結石碎石手術' },
  { match: (r) => r.hospital === 'ghk' && r.package.includes('前列腺'), module: 'urology', procedure: 'prostate', label: '前列腺及膀胱腫瘤手術' },

  // painManagement
  { match: (r) => r.package.includes('疼痛管理'), module: 'painManagement', procedure: 'nerve_block', label: '疼痛管理 (神經阻滯/射頻等)' },
  { match: (r) => r.package.includes('脊柱內鏡診療'), module: 'painManagement', procedure: 'spine_endoscopy', label: '脊柱內鏡診療手術' },
  { match: (r) => r.package.includes('脊髓電刺激'), module: 'painManagement', procedure: 'scs_implant', label: '脊髓電刺激植入術' },

  // cardiology
  { match: (r) => r.package.includes('冠狀動脈造影'), module: 'cardiology', procedure: 'pci', label: '冠狀動脈造影及支架置入 (PCI)' },

  // plastics
  { match: (r) => r.package.includes('美容縫合'), module: 'plastics', procedure: 'laceration_repair', label: '急症/整形外科縫合套餐' }
];

const PLACEHOLDER_REMARKS = {
  imaging: '定額內窺鏡數據核對中。',
  gynecology: '婦科套餐數據核對中。',
  generalSurgery: '定額一般外科手術數據核對中。',
  orthopedics: '骨科手術數據核對中。',
  ent: '耳鼻喉科手術數據核對中。',
  ophthalmology: '眼科手術數據核對中。',
  urology: '泌尿外科手術數據核對中。',
  painManagement: '疼痛管理數據核對中。',
  cardiology: '心臟科檢查數據核對中。',
  plastics: '整形外科手術數據核對中。'
};

function parseCsv(text) {
  const lines = text.trim().split('\n');
  return lines.slice(1).map((line) => {
    const parts = [];
    let cur = '';
    let inQuote = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') { inQuote = !inQuote; continue; }
      if (ch === ',' && !inQuote) { parts.push(cur); cur = ''; continue; }
      cur += ch;
    }
    parts.push(cur);
    return {
      hospitalName: parts[0],
      hospital: HOSPITAL_MAP[parts[0]] || null,
      dept: parts[1],
      package: parts[2],
      duration: parts[3],
      stay: parts[4],
      priceRaw: parts[5],
      remarks: parts[6],
      link: parts[7] && parts[7].startsWith('http') ? parts[7] : null
    };
  }).filter((r) => r.hospital);
}

function parsePrice(raw) {
  const cleaned = raw.replace(/\$/g, '').replace(/,/g, '');
  const nums = cleaned.split('-').map((s) => parseInt(s.trim(), 10));
  const min = nums[0];
  const max = nums.length > 1 ? nums[1] : min;
  return { min, max, mid: Math.round((min + max) / 2) };
}

function fmt(n) {
  return n.toLocaleString('en-US');
}

function formatDisplay(min, max) {
  if (min === max) return 'HK$' + fmt(min);
  return 'HK$' + fmt(min) + ' – $' + fmt(max);
}

function formatRemarks(raw, hospital) {
  let text = raw || '';
  text = text.replace(/价格变动原因是：/g, '');
  text = text.replace(/Trick点。/g, '');
  text = text.replace(/'/g, '');
  if (text.includes('不包括醫生費用')) return '⚠️ ' + text;
  if (text.includes('2025年歷史統計') || text.includes('總收費=醫生費')) return '⚠️ ' + text;
  if (text.includes('包括所有') || text.includes('包括全包') || text.includes('套餐包含')) return '✓ ' + text;
  if (hospital === 'szufh') return '✓ ' + text;
  return '⚠️ ' + text;
}

function mergeEntry(existing, row, label) {
  const p = parsePrice(row.priceRaw);
  if (!existing) {
    return {
      min: p.min, max: p.max,
      priceLabel: label,
      remarks: formatRemarks(row.remarks, row.hospital),
      link: row.link || null
    };
  }
  existing.min = Math.min(existing.min, p.min);
  existing.max = Math.max(existing.max, p.max);
  if (row.link && !existing.link) existing.link = row.link;
  return existing;
}

function buildModules(rows) {
  const store = {};
  for (const row of rows) {
    for (const rule of ROW_MAP) {
      if (!rule.match(row)) continue;
      const key = rule.module + '.' + rule.procedure;
      if (!store[key]) store[key] = { module: rule.module, procedure: rule.procedure, label: rule.label, hospitals: {} };
      const h = row.hospital;
      store[key].hospitals[h] = mergeEntry(store[key].hospitals[h], row, rule.label);
    }
  }
  return store;
}

function toHospitalBlock(hid, entry, module) {
  if (!entry) {
    return `      ${hid}: {\n        price: 9999999,\n        remarks: "${PLACEHOLDER_REMARKS[module]}"\n      }`;
  }
  const lines = [
    `      ${hid}: {`,
    `        price: ${Math.round((entry.min + entry.max) / 2)},`,
    `        priceLabel: "${entry.priceLabel}",`,
    `        displayPrice: "${formatDisplay(entry.min, entry.max)}",`,
    `        remarks: "${entry.remarks.replace(/"/g, '\\"')}"`
  ];
  if (entry.link) {
    lines[lines.length - 1] += ',';
    lines.push(`        link: "${entry.link}"`);
  }
  if (hid === 'szufh' && module === 'imaging') {
    if (entry.link) lines[lines.length - 1] += ',';
    else lines[lines.length - 1] += ',';
    lines.push('        tags: ["跨境免找數"]');
  }
  lines.push('      }');
  return lines.join('\n');
}

function renderProcedureBlock(module, procedure, data, extras) {
  const lines = [`      ${procedure}: {`];
  for (const hid of HOSPITAL_ORDER) {
    let entry = data.hospitals[hid] || null;
    if (extras && extras[procedure] && extras[procedure][hid]) {
      entry = extras[procedure][hid];
    }
    lines.push(toHospitalBlock(hid, entry, module));
    if (hid !== HOSPITAL_ORDER[HOSPITAL_ORDER.length - 1]) lines.push('');
  }
  lines.push('      }');
  return lines.join('\n');
}

// Preserve legacy entries not in CSV
const LEGACY = {
  generalSurgery: {
    cholecystectomy: {
      sth: { min: 18500, max: 22000, priceLabel: '日間普通房基準套餐', remarks: '⚠️ 雜費風險：病理化驗與耗材可能另計。' }
    }
  },
  imaging: {
    gastroscopy: {
      szufh: null, // will be overwritten by CSV
      hksh: { min: 9200, max: 10800, priceLabel: '日間中心程序起步底價', remarks: '⚠️ 非全包：醫生費、巡房費與化驗費按件累加。', tags: ['頂尖專家'] },
      ghk: { min: 7820, max: 7820, priceLabel: '日間定額醫療程序套餐', remarks: '✓ 定額保障：已包含基礎用藥與組織化驗雜費。', tags: ['100%全包', '港島旗艦'] },
      sth: { min: 6100, max: 7800, priceLabel: '日間程序普通房常規區間', remarks: '⚠️ 雜費風險：人流量大，切除活檢費與耗材另計。', tags: ['九龍核心'] },
      pbh: { min: 5800, max: 5800, priceLabel: '日間大房基準套餐價', remarks: '✓ 全港最低參考價：性價比高，標準計劃基本全覆蓋。', tags: ['常規體檢首選'] }
    },
    colonoscopy: {
      ghk: { min: 10420, max: 13440, priceLabel: '日間定額全包區間', remarks: '✓ 結構清晰：已含基礎瘜肉切除與組織活檢化驗費。', tags: ['港島推薦'] },
      baptist: { min: 11000, max: 13500, priceLabel: '日間常規程序基準', remarks: '⚠️ 瘜肉階梯：切除超出3粒後觸發階梯收費，輪候約2週。', tags: ['常規程序'] },
      pbh: { min: 8200, max: 8200, priceLabel: '日間大房基準套餐價', remarks: '✓ 價格相宜：香港本地高性價比，適合基礎篩查。', tags: ['預算優選'] }
    },
    dual_scope: {
      ghk: { min: 16800, max: 16800, priceLabel: '日間全包雙鏡定額套餐', remarks: '✓ 醫療團隊強：港島全包雙鏡天花板，放射與內窺鏡安心度高。', tags: ['全包保障'] },
      pbh: { min: 12500, max: 12500, priceLabel: '常規兩項程序大房加總底價', remarks: 'ℹ️ 本地經濟之選：香港本地參考低價的雙鏡聯合檢查方案。', tags: ['參考低價'] }
    }
  },
  gynecology: {
    normal_delivery: {
      cuhk: { min: 23200, max: 43900, priceLabel: '自然分娩套餐 (二人房/一人房)', remarks: '⚠️ 套式收費不包括醫生費用。3日2夜 HK$23,200–40,300；4日3夜 HK$26,000–43,900。', link: 'https://www.cuhkmc.hk/sc/fees-and-charges/maternity' }
    },
    c_section: {
      cuhk: { min: 31000, max: 59800, priceLabel: '剖腹分娩套餐 (二人房/一人房)', remarks: '⚠️ 套式收費不包括醫生費用。選擇性 HK$31,000–49,800；緊急 HK$39,500–59,800。含 5日4夜住院。', link: 'https://www.cuhkmc.hk/sc/fees-and-charges/maternity' }
    }
  }
};

function applyLegacy(store) {
  for (const [mod, procs] of Object.entries(LEGACY)) {
    for (const [proc, hospitals] of Object.entries(procs)) {
      const key = mod + '.' + proc;
      if (!store[key]) store[key] = { module: mod, procedure: proc, label: proc, hospitals: {} };
      for (const [hid, entry] of Object.entries(hospitals)) {
        if (entry && !store[key].hospitals[hid]) store[key].hospitals[hid] = entry;
        if (entry && store[key].hospitals[hid] && hid !== 'cuhk' && hid !== 'szufh') {
          // keep legacy for other hospitals if CSV didn't set
        }
      }
      // Merge legacy hospital overrides (non CSV hospitals)
      for (const [hid, entry] of Object.entries(hospitals)) {
        if (entry && !['cuhk', 'szufh'].includes(hid)) {
          store[key].hospitals[hid] = entry;
        }
      }
      // CUHK delivery: prefer curated remarks from LEGACY
      if (mod === 'gynecology' && (proc === 'normal_delivery' || proc === 'c_section')) {
        for (const hid of ['cuhk']) {
          if (hospitals[hid]) store[key].hospitals[hid] = hospitals[hid];
        }
      }
    }
  }
}

function applyModuleLinks(store) {
  for (const item of Object.values(store)) {
    const modLinks = MODULE_LINKS[item.module];
    if (!modLinks) continue;
    for (const [hid, link] of Object.entries(modLinks)) {
      if (store[item.module + '.' + item.procedure]?.hospitals[hid]) {
        const entry = store[item.module + '.' + item.procedure].hospitals[hid];
        if (entry && !entry.link) entry.link = link;
      }
    }
  }
  for (const key of Object.keys(store)) {
    const item = store[key];
    const modLinks = MODULE_LINKS[item.module];
    if (!modLinks) continue;
    for (const [hid, link] of Object.entries(modLinks)) {
      if (item.hospitals[hid] && !item.hospitals[hid].link) {
        item.hospitals[hid].link = link;
      }
    }
  }
}

function finalizeDeliveryPackages(store, rows) {
  const hkshNd = rows.filter((r) => r.hospital === 'hksh' && r.package.includes('自然分娩'));
  const hkshCs = rows.filter((r) => r.hospital === 'hksh' && (r.package.includes('選擇性剖腹') || r.package.includes('緊急剖腹')));
  const ndKey = 'gynecology.normal_delivery';
  const csKey = 'gynecology.c_section';
  if (store[ndKey]?.hospitals.hksh && hkshNd.length) {
    store[ndKey].hospitals.hksh.link = MODULE_LINKS.gynecology.hksh;
    store[ndKey].hospitals.hksh.remarks = '⚠️ 套式收費不包括醫生費用。';
  }
  if (store[csKey]?.hospitals.hksh && hkshCs.length) {
    store[csKey].hospitals.hksh.link = MODULE_LINKS.gynecology.hksh;
    let remarks = '⚠️ 套式收費不包括醫生費用。';
    const elective = hkshCs.find((r) => r.package.includes('選擇性'));
    const emergency = hkshCs.find((r) => r.package.includes('緊急'));
    if (elective && emergency) {
      const e1 = parsePrice(elective.priceRaw);
      const e2 = parsePrice(emergency.priceRaw);
      remarks += `選擇性 HK$${fmt(e1.min)}–${fmt(e1.max)}；緊急 HK$${fmt(e2.min)}–${fmt(e2.max)}。`;
    }
    store[csKey].hospitals.hksh.remarks = remarks;
  }
}

function renderModule(moduleName, procedures, store) {
  const procNames = procedures.sort();
  const blocks = procNames.map((p) => {
    const key = moduleName + '.' + p;
    return renderProcedureBlock(moduleName, p, store[key] || { hospitals: {} }, LEGACY[moduleName]);
  });
  return `    ${moduleName}: {\n${blocks.join(',\n')}\n    }`;
}

const csv = fs.readFileSync(CSV_PATH, 'utf8');
const rows = parseCsv(csv);
const store = buildModules(rows);
applyLegacy(store);
finalizeDeliveryPackages(store, rows);
applyModuleLinks(store);

// Group by module
const byModule = {};
for (const item of Object.values(store)) {
  if (!byModule[item.module]) byModule[item.module] = [];
  byModule[item.module].push(item.procedure);
}

const output = {
  generalSurgery: byModule.generalSurgery || [],
  orthopedics: byModule.orthopedics || [],
  imaging: [...new Set([...(byModule.imaging || []), 'gastroscopy', 'colonoscopy', 'dual_scope', 'bronchoscopy', 'ct_brain', 'mri_brain'])],
  gynecology: [...new Set([...(byModule.gynecology || []), 'normal_delivery', 'c_section'])],
  ent: byModule.ent || [],
  ophthalmology: byModule.ophthalmology || [],
  urology: byModule.urology || [],
  painManagement: byModule.painManagement || [],
  cardiology: [...new Set([...(byModule.cardiology || []), 'angiography'])],
  plastics: byModule.plastics || []
};

// ct_brain and mri_brain - keep from existing db (not in surgery CSV)
const OUT = path.join(__dirname, 'surgery-modules-output.json');
fs.writeFileSync(OUT, JSON.stringify({ store, byModule: output }, null, 2));
console.log('Wrote', OUT);
console.log('Procedures:', Object.keys(store).length);

// Print module summaries
for (const [mod, procs] of Object.entries(output)) {
  console.log(mod + ':', procs.join(', '));
}
