#!/usr/bin/env node
/**
 * Full census: every D-type procedure card × hospital vs lane title / priceLabel / known source names.
 * Writes pricedata/_audit-2026-08/MAPPING.json
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const DB_PATH = path.join(ROOT, 'data', 'db.js');
const HKC_TABLES = path.join(ROOT, 'pricedata/hongkongcard-surgery-2026/tables.json');
const OUT_DIR = path.join(ROOT, 'pricedata/_audit-2026-08');
const PLACEHOLDER_COMING = 9999999;
const PLACEHOLDER_NA = 9999;
const SKIP_MODULES = new Set(['outpatient', 'outpatientSpecialty', 'ward']);

const LANE_TITLES = {
  'generalSurgery.cholecystectomy': '腹腔鏡膽囊切除術',
  'generalSurgery.breast_lump': '乳房腫塊切除術',
  'generalSurgery.circumcision': '包皮環切術',
  'generalSurgery.thyroid_fna': '甲狀腺細針穿刺檢查',
  'generalSurgery.hemithyroidectomy': '偏側甲狀腺切除術',
  'generalSurgery.thyroidectomy': '甲狀腺/副甲狀腺切除術',
  'generalSurgery.hernia_abdominal': '腹腔疝氣修補術',
  'generalSurgery.hernia_unilateral': '單側腹股溝疝氣修補術',
  'generalSurgery.hernia_bilateral': '雙側腹股溝疝氣修補術',
  'generalSurgery.appendectomy': '闌尾切除術',
  'generalSurgery.hemorrhoid': '痔瘡專項處置',
  'generalSurgery.thyroid_surgery': '甲狀腺處置手術',
  'generalSurgery.port_a_cath': '輸液港手術',
  'generalSurgery.breast_biopsy': '乳腺抽針及旋切活檢',
  'generalSurgery.breast_surgery': '乳腺外科手術',
  'imaging.gastroscopy': '日間胃鏡檢查套餐',
  'imaging.colonoscopy': '日間大腸鏡檢查套餐',
  'imaging.dual_scope': '胃鏡加大腸鏡聯合檢查',
  'imaging.bronchoscopy': '支氣管鏡檢查',
  'imaging.ct_brain': 'CT 腦部掃描套餐',
  'imaging.mri_brain': 'MRI 腦部掃描套餐',
  'gynecology.normal_delivery': '自然分娩套餐',
  'gynecology.c_section': '剖腹產套餐',
  'gynecology.cervical_treatment': '子宮頸病變治療手術',
  'gynecology.hysteroscopy': '子宮鏡診治手術',
  'gynecology.myomectomy': '子宮肌瘤切除術',
  'gynecology.hysterectomy': '子宮切除術',
  'gynecology.tubal_ectopic': '輸卵管及宮外孕手術',
  'gynecology.ovarian_cyst': '卵巢囊腫切除術',
  'gynecology.contraception': '避孕及終止妊娠',
  'orthopedics.knee_replacement': '全人工膝關節置換術',
  'orthopedics.hip_replacement': '髖關節全關節置換',
  'orthopedics.joint_replacement': '人工關節置換術 (全膝/單髁/全髖)',
  'orthopedics.shoulder_arthroscopy': '肩關節鏡手術',
  'orthopedics.shoulder_replacement': '全肩關節置換術',
  'orthopedics.knee_arthroscopy': '膝關節鏡手術',
  'orthopedics.sports_ortho': '骨科小手術及運動醫學',
  'orthopedics.spine_surgery': '脊柱手術',
  'orthopedics.orif_upper_limb': 'ORIF (鎖骨/橈骨遠端骨折)',
  'orthopedics.orif_lower_limb': 'ORIF (髕骨/足踝骨折)',
  'orthopedics.carpal_tunnel': '內視鏡腕管解除術',
  'orthopedics.trigger_finger': '板機狀指鬆解術',
  'orthopedics.achilles_ankle': '跟腱修補/踝關節鏡韌帶修補',
  'cardiology.pci': '冠狀動脈造影及支架置入 (PCI)',
  'cardiology.angiography': '冠狀動脈造影',
  'ophthalmology.cataract': '白內障超聲乳化手術',
  'ophthalmology.strabismus': '斜視手術',
  'ent.tonsillectomy': '扁桃體切除術',
  'ent.micro_laryngoscopy': '微型喉鏡檢查',
  'ent.adenoid_tonsil': '腺樣體及扁桃體手術',
  'ent.sinus_surgery': '鼻竇炎及鼻中隔手術',
  'ent.tympanoplasty': '鼓膜修補及顯微喉鏡',
  'painManagement.nerve_block': '疼痛管理 (神經阻滯/射頻等)',
  'painManagement.spine_endoscopy': '脊柱內鏡診療手術',
  'painManagement.scs_implant': '脊髓電刺激植入術',
  'plastics.laceration_repair': '急症/整形外科縫合套餐',
  'plastics.rhinoplasty': '鼻整形手術',
  'urology.prostate': '前列腺診療手術',
  'urology.kidney_stone': '泌尿系結石碎石手術',
  'urology.urodynamics': '尿動力及膀胱鏡檢查',
  'urology.andrology': '男科處置手術'
};

/** HKC tables.json key → original article column name */
const HKC_SOURCE_NAME = {
  circumcision: '包皮環切術',
  hemorrhoid: '痔瘡切除術',
  breast_lump: '乳房腫瘤切除術',
  cholecystectomy: '膽囊切除術（腹腔鏡）',
  hernia_unilateral: '疝氣（小腸氣）修補術（腹腔鏡）',
  hernia_abdominal: '疝氣（小腸氣）手術',
  thyroidectomy: '全甲狀腺切除術',
  hemithyroidectomy: '甲狀腺切除術（半邊切除）',
  sports_ortho: '膝關節內視鏡檢查',
  knee_arthroscopy: '膝關節內視鏡檢查',
  spine_surgery: '椎板切除術',
  orif_upper_limb: '（骨折）開復位內固定術（上肢）',
  orif_lower_limb: '（骨折）開復位內固定術（下肢）',
  carpal_tunnel: '腕管鬆解術',
  trigger_finger: '板機狀指鬆解術 (彈弓指)',
  hysterectomy: '子宮切除術（開放式或腹腔鏡）',
  ovarian_cyst: '卵巢囊腫切除術（腹腔鏡）',
  contraception: '刮宮術',
  bronchoscopy: '支氣管鏡檢查',
  colonoscopy: '大腸鏡檢查',
  gastroscopy: '胃鏡檢查',
  dual_scope: '胃鏡檢查 + 大腸鏡檢查',
  adenoid_tonsil: '扁桃腺切除術',
  tonsillectomy: '扁桃腺切除術'
};

function loadDb() {
  const code = fs.readFileSync(DB_PATH, 'utf8');
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(code + '\nthis.__db = globalMedicalData;', sandbox);
  return sandbox.__db;
}

function trad(s) {
  const map = { 术: '術', 肠: '腸', 胆: '膽', 疗: '療', 诊: '診', 检: '檢', 费: '費', 价: '價', 医: '醫', 护: '護', 单: '單', 产: '產', 关: '關', 门: '門', 时: '時', 发: '發', 经: '經', 东: '東', 过: '過', 对: '對', 国: '國', 页: '頁', 网: '網', 肿: '腫', 宫: '宮', 颈: '頸', 肾: '腎', 脏: '臟', 脉: '脈', 脑: '腦', 髋: '髖', 髌: '髕', 锁: '鎖', 桡: '橈', 结: '結', 节: '節', 缝: '縫', 挂: '掛', 号: '號', 阑: '闌', 疮: '瘡', 换: '換', 腺: '腺', 镜: '鏡', 针: '針', 块: '塊', 侧: '側', 沟: '溝', 补: '補', 气: '氣', 腔: '腔', 视: '視', 历: '歷', 史: '史', 中: '中', 位: '位', 开: '開', 放: '放', 式: '式', 半: '半', 边: '邊', 全: '全', 切: '切', 除: '除' };
  return String(s || '').replace(/./g, (ch) => map[ch] || ch);
}

function compact(s) {
  return trad(s)
    .replace(/[（(].*?[）)]/g, '')
    .replace(/歷史中位|全面護理套餐|標準房|日間|套餐價格比較|套餐|價格比較/g, '')
    .replace(/[\s\-_/·.,，。]/g, '')
    .toLowerCase();
}

function containsAny(hay, needles) {
  const h = compact(hay);
  return needles.some((n) => h.includes(compact(n)));
}

function sourceKind(row) {
  const link = row.link || '';
  const remarks = row.remarks || '';
  if (/hongkongcard\.com/i.test(link) || /Hong Kong Card/i.test(remarks)) return 'hongkongcard';
  if (/bowtie\.com/i.test(link) || /Bowtie/i.test(remarks)) return 'bowtie';
  if (/shemom\.com/i.test(link)) return 'shemom';
  if (link) return 'first_party';
  return 'no_link';
}

/**
 * Does priceLabel name the same disease/site as the card?
 * Approach (open vs lap) is allowed.
 */
function labelVsLane(mod, proc, priceLabel, lane) {
  const lab = compact(priceLabel);
  const ln = compact(lane);
  if (!lab) return { ok: true, note: 'no_label' };
  if (lab.includes(ln) || ln.includes(lab)) return { ok: true, note: 'substring' };

  const key = `${mod}.${proc}`;
  const rules = {
    'generalSurgery.cholecystectomy': { yes: ['膽囊', '胆囊'], no: ['疝', '甲狀腺', '闌尾'] },
    'generalSurgery.breast_lump': { yes: ['乳房腫塊', '乳房腫瘤', '乳腺腫塊'], no: ['全乳', '乳房切除術', '活檢', '旋切'] },
    'generalSurgery.circumcision': { yes: ['包皮'], no: [] },
    'generalSurgery.thyroid_fna': { yes: ['細針', '穿刺'], no: ['切除'] },
    'generalSurgery.hemithyroidectomy': { yes: ['偏側', '半甲', '半邊甲', '次全'], no: ['全甲', '全邊'] },
    'generalSurgery.thyroidectomy': { yes: ['全甲', '甲狀腺/副', '甲狀腺全', '全邊甲'], no: ['半甲', '偏側', '細針'] },
    'generalSurgery.hernia_abdominal': { yes: ['腹腔疝', '腹壁疝', '切口疝', '臍疝'], no: ['腹股溝', '小腸氣', '開放式疝氣'] },
    'generalSurgery.hernia_unilateral': { yes: ['腹股溝', '單側疝', '單邊疝', '小腸氣', '疝氣修補'], no: ['腹腔疝', '腹壁疝', '雙側', '雙邊'] },
    'generalSurgery.hernia_bilateral': { yes: ['雙側腹股溝', '雙邊腹股溝', '雙側疝'], no: ['單側', '腹腔疝'] },
    'generalSurgery.appendectomy': { yes: ['闌尾', '盲腸'], no: [] },
    'generalSurgery.hemorrhoid': { yes: ['痔'], no: [] },
    'generalSurgery.thyroid_surgery': { yes: ['甲狀腺'], no: ['細針'] },
    'generalSurgery.port_a_cath': { yes: ['輸液港', 'port'], no: [] },
    'generalSurgery.breast_biopsy': { yes: ['抽針', '旋切', '活檢', '活組織'], no: ['腫塊切除'] },
    'generalSurgery.breast_surgery': { yes: ['乳腺外科', '乳房腫瘤', '乳房切除', '全乳'], no: ['抽針'] },
    'imaging.gastroscopy': { yes: ['胃鏡', '胃窺鏡', '胃內窺', '胃內視', '日間中心程序', '日間定額醫療程序'], no: ['支氣管'] },
    'imaging.colonoscopy': { yes: ['大腸鏡', '結腸鏡', '腸鏡', '日間定額全包', '日間常規程序', '日間大房'], no: ['支氣管'] },
    'imaging.dual_scope': { yes: ['胃鏡加大腸', '聯合', '雙鏡', '聯查', '胃腸鏡', '腸胃鏡', '胃＋腸', '胃+腸', '兩項程序', '兩鏡', '同照', '合併', '胃鏡＋大腸', '胃鏡+大腸', '胃鏡＋腸', '結腸鏡及胃鏡', '胃鏡及大腸'], no: [] },
    'imaging.bronchoscopy': { yes: ['支氣管鏡', '支氣管內視', '支氣管內窺'], no: [] },
    'imaging.ct_brain': { yes: ['ct', '電腦斷層', '無造影'], no: ['mri', '磁力'] },
    'imaging.mri_brain': { yes: ['mri', '磁力'], no: ['ct'] },
    'gynecology.normal_delivery': { yes: ['自然分娩', '順產', '陰道分娩'], no: ['剖'] },
    'gynecology.c_section': { yes: ['剖腹', '剖宮'], no: ['自然分娩'] },
    'gynecology.cervical_treatment': { yes: ['子宮頸', '陰道窺鏡', '子宮頸抹'], no: [] },
    'gynecology.hysteroscopy': { yes: ['子宮鏡', '宮腔鏡'], no: [] },
    'gynecology.myomectomy': { yes: ['肌瘤'], no: ['子宮切除'] },
    'gynecology.hysterectomy': { yes: ['子宮切除'], no: ['肌瘤切除', '子宮鏡'] },
    'gynecology.tubal_ectopic': { yes: ['輸卵管', '宮外孕', '異位'], no: [] },
    'gynecology.ovarian_cyst': { yes: ['卵巢囊腫', '卵巢'], no: ['子宮切除'] },
    'gynecology.contraception': { yes: ['避孕', '終止妊娠', '刮宮', '人流'], no: ['卵巢囊腫'] },
    'orthopedics.knee_replacement': { yes: ['膝', '全人工膝'], no: ['髖', '肩'] },
    'orthopedics.hip_replacement': { yes: ['髖'], no: ['膝', '肩'] },
    'orthopedics.joint_replacement': { yes: ['關節置換', '全膝', '全髖', '單髁'], no: ['關節鏡'] },
    'orthopedics.shoulder_arthroscopy': { yes: ['肩關節鏡', '肩'], no: ['置換'] },
    'orthopedics.shoulder_replacement': { yes: ['肩', '置換'], no: ['關節鏡'] },
    'orthopedics.knee_arthroscopy': { yes: ['膝關節鏡', '膝關節內視', '膝關節內窺', '膝關節腔內窺'], no: ['置換'] },
    'orthopedics.sports_ortho': { yes: ['運動醫學', '骨科小手術', '交叉韌帶', '半月板', '十字韌帶'], no: [] },
    'orthopedics.spine_surgery': { yes: ['脊柱', '椎板', '腰椎'], no: ['膝關節'] },
    'orthopedics.orif_upper_limb': { yes: ['上肢', '鎖骨', '橈骨', '開復位', '開放性復位', '內固定'], no: ['髕骨', '足踝'] },
    'orthopedics.orif_lower_limb': { yes: ['下肢', '髕骨', '足踝', '開復位', '開放性復位', '內固定'], no: ['鎖骨', '橈骨'] },
    'orthopedics.carpal_tunnel': { yes: ['腕管'], no: [] },
    'orthopedics.trigger_finger': { yes: ['板機', '彈弓指'], no: [] },
    'orthopedics.achilles_ankle': { yes: ['跟腱', '踝'], no: [] },
    'cardiology.pci': { yes: ['支架', 'pci', '介入'], no: [] },
    'cardiology.angiography': { yes: ['造影'], no: ['支架'] },
    'ophthalmology.cataract': { yes: ['白內障'], no: [] },
    'ophthalmology.strabismus': { yes: ['斜視'], no: [] },
    'ent.tonsillectomy': { yes: ['扁桃'], no: ['腺樣', '鼻竇', '鼓膜'] },
    'ent.micro_laryngoscopy': { yes: ['喉鏡', '喉內視', '喉內窺'], no: ['鼓膜'] },
    'ent.adenoid_tonsil': { yes: ['腺樣', '扁桃'], no: [] },
    'ent.sinus_surgery': { yes: ['鼻竇', '鼻中隔'], no: [] },
    'ent.tympanoplasty': { yes: ['鼓膜'], no: [] },
    'painManagement.nerve_block': { yes: ['神經阻滯', '疼痛', '射頻'], no: ['脊髓電刺激'] },
    'painManagement.spine_endoscopy': { yes: ['脊柱內鏡'], no: [] },
    'painManagement.scs_implant': { yes: ['脊髓電刺激'], no: [] },
    'plastics.laceration_repair': { yes: ['縫合', '撕裂', '急症'], no: ['鼻整形'] },
    'plastics.rhinoplasty': { yes: ['鼻整形'], no: [] },
    'urology.prostate': { yes: ['前列腺'], no: [] },
    'urology.kidney_stone': { yes: ['結石', '碎石'], no: [] },
    'urology.urodynamics': { yes: ['尿動力', '膀胱鏡'], no: ['前列腺切除'] },
    'urology.andrology': { yes: ['男科', '輸精管', '睾丸', '睪丸'], no: [] }
  };

  const r = rules[key];
  if (!r) return { ok: lab.length > 0, note: 'no_rule' };
  if (r.no.some((n) => lab.includes(compact(n)))) return { ok: false, note: 'forbidden_token' };
  if (r.yes.some((n) => lab.includes(compact(n)))) return { ok: true, note: 'alias' };
  return { ok: false, note: 'no_alias' };
}

function hkcVerdict(mod, proc, hkcName) {
  const key = `${mod}.${proc}`;
  if (key === 'generalSurgery.hernia_abdominal' && /小腸氣/.test(hkcName)) {
    return { verdict: 'wrong_procedure', sourceName: hkcName, reason: '小腸氣=腹股溝疝，不是腹腔/腹壁疝' };
  }
  if (key === 'orthopedics.sports_ortho' && /膝關節/.test(hkcName)) {
    return { verdict: 'wrong_procedure', sourceName: hkcName, reason: '膝關節內視鏡不是「骨科小手術及運動醫學」卡片' };
  }
  if (key === 'ent.adenoid_tonsil' && hkcName === '扁桃腺切除術') {
    return { verdict: 'too_broad', sourceName: hkcName, reason: '來源僅扁桃腺切除，與扁桃體卡重複；卡片要求腺樣體及扁桃體' };
  }
  if (key === 'gynecology.contraception' && /刮宮/.test(hkcName)) {
    return { verdict: 'match', sourceName: hkcName, reason: '刮宮術屬終止妊娠程序，與卡片「避孕及終止妊娠」同病种' };
  }
  if (key === 'orthopedics.spine_surgery' && /椎板/.test(hkcName)) {
    return { verdict: 'match', sourceName: hkcName, reason: '椎板切除是脊柱手術的一種；priceLabel 已標明具體術式' };
  }
  if (key === 'generalSurgery.hernia_unilateral' && /小腸氣/.test(hkcName)) {
    return { verdict: 'match', sourceName: hkcName, reason: '小腸氣=腹股溝疝；來源未標單/雙側，入路腹腔鏡可接受' };
  }
  if (key === 'generalSurgery.breast_lump' && /乳房腫瘤/.test(hkcName)) {
    return { verdict: 'match', sourceName: hkcName, reason: '乳房腫瘤切除與腫塊切除同病种' };
  }
  return { verdict: 'match', sourceName: hkcName, reason: 'Hong Kong Card 表頭與卡片病种一致' };
}

function classifyRow(mod, proc, hid, row, hkcTables) {
  const lane = LANE_TITLES[`${mod}.${proc}`] || proc;
  const placeholder = row.price === PLACEHOLDER_COMING || row.price === PLACEHOLDER_NA;
  if (placeholder) {
    return {
      module: mod, procedure: proc, hospital: hid, lane, price: row.price,
      priceLabel: row.priceLabel || '', link: row.link || '',
      verdict: 'no_source', reason: 'Coming Soon / 無真實價，不核名'
    };
  }

  const kind = sourceKind(row);
  const labelCheck = labelVsLane(mod, proc, row.priceLabel || '', lane);
  const hkcProc = hkcTables[proc] && Object.prototype.hasOwnProperty.call(hkcTables[proc], hid);
  const hkcPriceMatch = hkcProc && Number(hkcTables[proc][hid]) === Number(row.price);

  let verdict;
  let sourceName = '';
  let reason = '';

  if (kind === 'hongkongcard' || (hkcPriceMatch && /Hong Kong Card/i.test(row.remarks || ''))) {
    sourceName = HKC_SOURCE_NAME[proc] || '';
    const hv = hkcVerdict(mod, proc, sourceName);
    verdict = hv.verdict;
    sourceName = hv.sourceName;
    reason = hv.reason;
    if (verdict === 'match' && !labelCheck.ok) {
      verdict = 'label_mismatch';
      reason = `來源表頭可接受，但 priceLabel「${row.priceLabel}」與欄目「${lane}」不一致`;
    }
  } else if (!labelCheck.ok) {
    const lab = row.priceLabel || '';
    if (mod === 'orthopedics' && proc === 'sports_ortho' && /膝關節/.test(lab)) {
      verdict = 'wrong_procedure';
      reason = `priceLabel「${lab}」是膝關節鏡，卡片是骨科小手術及運動醫學`;
      sourceName = lab;
    } else if (mod === 'generalSurgery' && proc === 'hernia_abdominal' && /開放式疝氣|小腸氣|腹股溝/.test(lab)) {
      verdict = 'wrong_procedure';
      reason = `priceLabel「${lab}」不是腹腔疝`;
      sourceName = lab;
    } else if (mod === 'ent' && proc === 'adenoid_tonsil' && /扁桃腺切除術（歷史中位）/.test(lab) && !/腺樣/.test(lab)) {
      verdict = 'too_broad';
      reason = `priceLabel 僅扁桃腺，卡片含腺樣體`;
      sourceName = lab;
    } else {
      verdict = 'label_mismatch';
      reason = `priceLabel「${lab}」對不上欄目「${lane}」（${labelCheck.note}）`;
      sourceName = lab;
    }
  } else {
    verdict = 'match';
    sourceName = row.priceLabel || lane;
    reason = kind === 'first_party'
      ? 'priceLabel 與欄目病种一致（一手來源，數字對賬在鏈接步驟）'
      : 'priceLabel 與欄目病种一致';
  }

  return {
    module: mod,
    procedure: proc,
    hospital: hid,
    lane,
    price: row.price,
    displayPrice: row.displayPrice || '',
    priceLabel: row.priceLabel || '',
    remarks: row.remarks || '',
    link: row.link || '',
    sourceKind: kind,
    sourceName,
    verdict,
    reason
  };
}

function main() {
  const db = loadDb();
  const hkcTables = JSON.parse(fs.readFileSync(HKC_TABLES, 'utf8'));
  const rows = [];
  const cards = [];

  for (const [mod, node] of Object.entries(db.modules || {})) {
    if (SKIP_MODULES.has(mod)) continue;
    for (const [proc, pval] of Object.entries(node || {})) {
      if (!pval || typeof pval !== 'object') continue;
      const hids = (db.hospitalOrder || []).filter((id) => pval[id]);
      if (!hids.length) continue;
      cards.push(`${mod}.${proc}`);
      for (const hid of hids) {
        rows.push(classifyRow(mod, proc, hid, pval[hid], hkcTables));
      }
    }
  }

  const byKey = {};
  for (const r of rows) byKey[`${r.module}.${r.procedure}.${r.hospital}`] = r;
  for (const r of rows) {
    if (r.verdict === 'no_source') continue;
    if (r.module === 'ent' && r.procedure === 'adenoid_tonsil') {
      const twin = byKey[`ent.tonsillectomy.${r.hospital}`];
      if (twin && twin.verdict !== 'no_source' && Number(twin.price) === Number(r.price)) {
        r.verdict = 'too_broad';
        r.reason = `與扁桃體切除術卡片同一數字（${r.price}），來源僅扁桃腺而非腺樣體複合術`;
      }
    }
    if (r.module === 'orthopedics' && r.procedure === 'sports_ortho') {
      const twin = byKey[`orthopedics.knee_arthroscopy.${r.hospital}`];
      if (twin && twin.verdict !== 'no_source' && Number(twin.price) === Number(r.price) && /膝關節/.test(r.priceLabel || '')) {
        r.verdict = 'wrong_procedure';
        r.reason = `與膝關節鏡卡片同一數字（${r.price}），來源是膝關節內視鏡不是運動醫學混合卡`;
      }
    }
  }

  const real = rows.filter((r) => r.verdict !== 'no_source');
  const counts = {};
  for (const r of rows) counts[r.verdict] = (counts[r.verdict] || 0) + 1;
  const missingLane = cards.filter((c) => !LANE_TITLES[c]);

  const report = {
    generatedAt: new Date().toISOString(),
    cards: cards.length,
    rows: rows.length,
    realPrices: real.length,
    counts,
    missingLaneTitles: missingLane,
    issues: real.filter((r) => r.verdict !== 'match'),
    all: rows
  };

  fs.mkdirSync(OUT_DIR, { recursive: true });
  fs.writeFileSync(path.join(OUT_DIR, 'MAPPING.json'), JSON.stringify(report, null, 2));

  console.log('cards', cards.length);
  console.log('rows', rows.length, 'real', real.length);
  console.log('counts', counts);
  if (missingLane.length) console.log('MISSING LANE', missingLane);
  console.log('\n--- issues ---');
  for (const r of report.issues) {
    console.log([r.verdict, r.module + '.' + r.procedure, r.hospital, r.priceLabel, r.reason].join('\t'));
  }
}

main();
