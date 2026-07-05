/**
 * Patch data/db.js with generated surgery modules (safe: writes .new first).
 */
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '../data/db.js');
const OUT_PATH = DB_PATH + '.new';
const DATA_PATH = path.join(__dirname, 'surgery-modules-output.json');

const HOSPITAL_ORDER = [
  'szufh', 'cuhk', 'hksh', 'ghk', 'matilda', 'sth', 'baptist', 'union',
  'canossa', 'sph', 'pbh', 'evangel', 'twah', 'hkah'
];

const PLACEHOLDER_REMARKS = {
  imaging: '定額內窺鏡數據核對中。',
  gynecology: '婦產科套餐數據核對中。',
  generalSurgery: '定額一般外科手術數據核對中。',
  orthopedics: '骨科手術數據核對中。',
  ent: '耳鼻喉科手術數據核對中。',
  ophthalmology: '眼科手術數據核對中。',
  urology: '泌尿外科手術數據核對中。',
  painManagement: '疼痛管理數據核對中。',
  cardiology: '心臟導管造影數據核對中。',
  plastics: '整形外科手術數據核對中。'
};

const { store } = JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
const dbText = fs.readFileSync(DB_PATH, 'utf8');

function fmt(n) {
  return Number(n).toLocaleString('en-US');
}

function formatDisplay(min, max) {
  if (min === max) return 'HK$' + fmt(min);
  return 'HK$' + fmt(min) + ' – $' + fmt(max);
}

function findModuleRange(text, moduleName) {
  const needle = `    ${moduleName}: {`;
  const start = text.indexOf(needle);
  if (start < 0) return null;
  let depth = 0;
  for (let i = start + needle.length - 1; i < text.length; i++) {
    const ch = text[i];
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) return { start, end: i + 1 };
    }
  }
  return null;
}

function extractProcedureBlock(text, procedure) {
  const range = findModuleRange(text, procedure);
  if (range) return text.slice(range.start, range.end);
  const needle = `      ${procedure}: {`;
  const start = text.indexOf(needle);
  if (start < 0) return null;
  let depth = 0;
  for (let i = start + needle.length - 1; i < text.length; i++) {
    const ch = text[i];
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) return text.slice(start, i + 1);
    }
  }
  return null;
}

function hospitalEntry(hid, entry, module, tags) {
  if (!entry) {
    return [
      `      ${hid}: {`,
      `        price: 9999999,`,
      `        remarks: "${PLACEHOLDER_REMARKS[module]}"`,
      `      }`
    ].join('\n');
  }
  const lines = [
    `      ${hid}: {`,
    `        price: ${Math.round((entry.min + entry.max) / 2)},`,
    `        priceLabel: "${entry.priceLabel}",`,
    `        displayPrice: "${formatDisplay(entry.min, entry.max)}",`,
    `        remarks: "${String(entry.remarks).replace(/"/g, '\\"')}"`
  ];
  if (entry.link) {
    lines[lines.length - 1] += ',';
    lines.push(`        link: "${entry.link}"`);
  }
  if (tags && tags.length) {
    lines[lines.length - 1] += ',';
    lines.push(`        tags: [${tags.map((t) => `"${t}"`).join(', ')}]`);
  }
  lines.push('      }');
  return lines.join('\n');
}

const TAGS = {
  'imaging.gastroscopy': {
    hksh: ['頂尖專家'], ghk: ['100%全包', '港島旗艦'], sth: ['九龍核心'],
    pbh: ['常規體檢首選'], szufh: ['跨境免找數']
  },
  'imaging.colonoscopy': {
    ghk: ['港島推薦'], baptist: ['常規程序'], pbh: ['預算優選'],
    szufh: ['瘜肉全包', '當天出報告']
  },
  'imaging.dual_scope': {
    ghk: ['全包保障'], pbh: ['極致低價'], szufh: ['一次麻醉', '節省近35%']
  }
};

function renderProcedure(module, procedure, preservedBlock) {
  if (preservedBlock) return preservedBlock;
  const key = `${module}.${procedure}`;
  const data = store[key] || { hospitals: {} };
  const parts = HOSPITAL_ORDER.map((hid) => {
    const entry = data.hospitals[hid];
    const tags = TAGS[key] && TAGS[key][hid];
    return hospitalEntry(hid, entry, module, tags);
  });
  return `      ${procedure}: {\n${parts.join(',\n\n')}\n      }`;
}

const MODULE_PROCEDURES = {
  generalSurgery: [
    'cholecystectomy', 'breast_lump', 'circumcision', 'thyroid_fna', 'hemithyroidectomy',
    'thyroidectomy', 'hernia_abdominal', 'hernia_unilateral', 'hernia_bilateral',
    'appendectomy', 'hemorrhoid', 'thyroid_surgery', 'port_a_cath', 'breast_biopsy', 'breast_surgery'
  ],
  imaging: ['gastroscopy', 'colonoscopy', 'dual_scope', 'bronchoscopy', 'ct_brain', 'mri_brain'],
  gynecology: [
    'normal_delivery', 'c_section', 'cervical_treatment', 'hysteroscopy', 'myomectomy',
    'hysterectomy', 'tubal_ectopic', 'ovarian_cyst', 'contraception'
  ],
  orthopedics: [
    'knee_replacement', 'shoulder_arthroscopy', 'shoulder_replacement', 'orif_upper_limb',
    'carpal_tunnel', 'trigger_finger', 'knee_arthroscopy', 'orif_lower_limb',
    'hip_replacement', 'achilles_ankle', 'joint_replacement', 'spine_surgery', 'sports_ortho'
  ],
  cardiology: ['angiography', 'pci'],
  ophthalmology: ['cataract', 'strabismus'],
  ent: ['tonsillectomy', 'micro_laryngoscopy', 'adenoid_tonsil', 'sinus_surgery', 'tympanoplasty'],
  painManagement: ['nerve_block', 'spine_endoscopy', 'scs_implant'],
  plastics: ['rhinoplasty', 'laceration_repair'],
  urology: ['prostate', 'kidney_stone', 'urodynamics', 'andrology']
};

function renderModule(moduleName, sourceText) {
  const ctBlock = extractProcedureBlock(sourceText, 'ct_brain');
  const mriBlock = extractProcedureBlock(sourceText, 'mri_brain');
  const rhinoBlock = extractProcedureBlock(sourceText, 'rhinoplasty');

  const blocks = MODULE_PROCEDURES[moduleName].map((p) => {
    if (moduleName === 'imaging' && p === 'ct_brain' && ctBlock) return ctBlock;
    if (moduleName === 'imaging' && p === 'mri_brain' && mriBlock) return mriBlock;
    if (moduleName === 'plastics' && p === 'rhinoplasty' && rhinoBlock) return rhinoBlock;
    return renderProcedure(moduleName, p, null);
  });

  return `    ${moduleName}: {\n${blocks.join(',\n')}\n    }`;
}

function replaceModule(text, moduleName, newBlock) {
  const range = findModuleRange(text, moduleName);
  if (!range) return null;
  return text.slice(0, range.start) + newBlock + text.slice(range.end);
}

let patched = dbText;
const sourceForPreserve = dbText;

for (const mod of Object.keys(MODULE_PROCEDURES)) {
  if (mod === 'urology') continue;
  const block = renderModule(mod, sourceForPreserve);
  const next = replaceModule(patched, mod, block);
  if (!next) throw new Error('Missing module: ' + mod);
  patched = next;
  console.log('OK', mod);
}

// Insert urology before modules close
const urologyBlock = renderModule('urology', sourceForPreserve);
const modulesClose = patched.indexOf('\n  },\n  searchIndex:');
if (modulesClose < 0) throw new Error('Cannot find modules close');
patched = patched.slice(0, modulesClose) + ',\n' + urologyBlock + patched.slice(modulesClose);

fs.writeFileSync(OUT_PATH, patched);
try {
  eval(patched.replace('const globalMedicalData', 'globalMedicalData'));
  console.log('Syntax OK — replacing db.js');
  fs.writeFileSync(DB_PATH, patched);
  fs.unlinkSync(OUT_PATH);
} catch (e) {
  console.error('Syntax error:', e.message);
  console.error('Left at', OUT_PATH);
  process.exit(1);
}
