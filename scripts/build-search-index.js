#!/usr/bin/env node
/**
 * Build expanded searchIndex from specialty HTML sections + existing db.js entries.
 * Writes data/search-index.js (for search.html) and patches data/db.js searchIndex.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const DB_PATH = path.join(ROOT, 'data', 'db.js');
const OUT_PATH = path.join(ROOT, 'data', 'search-index.js');

const MODULE_PAGES = {
  imaging: 'imaging.html',
  gynecology: 'gyn.html',
  generalSurgery: 'general-surgery.html',
  orthopedics: 'orthopedics.html',
  painManagement: 'pain-management.html',
  ent: 'ent.html',
  ophthalmology: 'ophthalmology.html',
  cardiology: 'cardiology.html',
  plastics: 'plastics.html',
  urology: 'urology.html',
  outpatient: 'outpatient.html',
  ward: 'ward.html',
  outpatientSpecialty: 'outpatient.html'
};

/** Dev / internal pages that must never appear in the public search index */
const EXCLUDED_PAGES = new Set([
  'card-explorer.html',
  'consulting.html',
  'articles/_template.html'
]);

/**
 * Lay / symptom / colloquial aliases → page#hash
 * Helps users who do not know the formal procedure name.
 */
const LAY_ALIASES = {
  'imaging.html#gastroscopy': [
    '胃痛', '胃唔舒服', '胃不適', '胃脹', '胃氣脹', '吞嚥困難', '吞嘢困難', '難吞嚥',
    '反酸', '胃酸倒流', '胃酸反流', '燒心', '心口灼熱', '胃潰瘍', '十二指腸潰瘍', '胃病',
    '照胃', '照胃鏡', '做胃鏡', '胃鏡檢查', '無痛胃鏡', '鎮靜胃鏡', '睡眠胃鏡',
    'OGD', 'EGD', '胃窺鏡', '上消化道', '上消化道內視鏡', '胃出血', '黑便', '柏油便',
    '幽門螺桿菌', 'HP', '胃息肉', '胃瘜肉'
  ],
  'imaging.html#colonoscopy': [
    '大便帶血', '便血', '大便有血', '屎有血', '腸癌篩查', '大腸癌篩查', '腸癌檢查',
    '照腸', '照腸鏡', '做腸鏡', '腸鏡', '肠镜', '大腸鏡', '無痛腸鏡', '鎮靜腸鏡',
    '便秘', '肚屙', '肚瀉', '腹瀉', '大便潛血', 'FIT', '瘜肉', '息肉', '大腸瘜肉', '大腸息肉',
    '下消化道', '排便習慣改變', '大便習慣改變', '腸絞痛', '左下腹痛', '腸炎症',
    '潰瘍性結腸炎', '克隆氏', 'IBD', 'colonoscopy'
  ],
  'imaging.html#dual_scope': [
    '胃腸鏡', '雙鏡', '兩鏡', '胃加腸', '胃腸聯查', '一次過照', '一次做兩樣',
    '無痛雙鏡', '胃肠镜', '胃鏡大腸鏡', '上下消化道', '套餐雙鏡'
  ],
  'imaging.html#bronchoscopy': [
    '支氣管鏡', '照肺', '肺鏡', '咳血', '咯血', '痰有血', '氣喘檢查', '長期咳',
    '慢性咳嗽', '肺檢查', '支氣管檢查', '呼吸科檢查'
  ],
  'imaging.html#ct_brain': [
    '頭痛 CT', '頭 CT', '腦 CT', '頭部掃描', '腦掃描', '頭顱掃描', '電腦斷層腦',
    '中風檢查', '中風 CT', '撞頭', '頭部外傷', '頭暈 CT', '腦出血檢查', 'CT腦'
  ],
  'imaging.html#mri_brain': [
    '頭痛 MRI', '腦 MRI', '頭 MRI', '磁力共振腦', '核磁共振腦', 'MRI腦',
    '腦腫瘤檢查', '多發性硬化', '偏頭痛檢查', '磁力共振頭部'
  ],
  'general-surgery.html#cholecystectomy': [
    '膽石', '膽結石', '割膽', '切膽', '切膽囊', '除膽囊', '膽囊切除', '胆囊', '膽囊',
    '右上腹痛', '膽痛', '膽絞痛', '食油膩肚痛', '膽固醇石', '泥沙膽', '腹腔鏡割膽',
    '無創割膽', 'cholecystectomy', 'gallstone', 'gallbladder'
  ],
  'general-surgery.html#appendectomy': [
    '盲腸', '割盲腸', '闌尾', '阑尾', '闌尾炎', '盲腸炎', '右下腹痛', '急性腹痛',
    '割闌尾', '闌尾切除', 'appendicitis', 'appendectomy'
  ],
  'general-surgery.html#hernia_unilateral': [
    '疝氣', '小腸氣', '單側疝', '一邊疝氣', '腹股溝', '腹股溝疝', '鼠蹊', '站久凸出',
    '下腹凸', 'hernia', 'inguinal'
  ],
  'general-surgery.html#hernia_bilateral': [
    '雙側疝', '兩邊疝氣', '雙邊疝', '雙側小腸氣', '兩邊小腸氣', '兩側腹股溝疝'
  ],
  'general-surgery.html#hernia_abdominal': [
    '腹壁疝', '切口疝', '肚臍疝', '臍疝', '手術後疝', '腹部凸出', '腹疝'
  ],
  'general-surgery.html#hemorrhoid': [
    '痔瘡', '痔核', '痔', '大便流血', '屎血', '肛裂', '肛門痛', '脫肛', '痔瘡手術',
    '結紮痔瘡', '激光痔瘡', 'hemorrhoid', 'piles'
  ],
  'general-surgery.html#circumcision': [
    '割包皮', '包皮', '包莖', '包皮過長', '包皮手術', '小兒割包皮', 'circumcision'
  ],
  'general-surgery.html#breast_lump': [
    '乳房腫塊', '乳房硬塊', '乳核', '乳房有粒', '摸到粒', '乳房檢查', '乳房腫瘤',
    '乳腺增生', '乳房囊腫'
  ],
  'general-surgery.html#breast_biopsy': [
    '乳房切片', '乳組織檢查', '乳房活檢', '乳房穿刺', '乳房針刺', '乳房活組織'
  ],
  'general-surgery.html#breast_surgery': [
    '乳房手術', '乳癌手術', '乳房切除', '全乳切除', '乳癌', '乳房腫瘤切除', '乳腺手術'
  ],
  'general-surgery.html#thyroidectomy': [
    '甲狀腺切除', '甲狀腺手術', '甲亢手術', '全甲狀腺切除', '甲狀腺全切', '甲狀腺癌手術'
  ],
  'general-surgery.html#hemithyroidectomy': [
    '半甲狀腺', '單側甲狀腺', '甲狀腺半切', '一邊甲狀腺', '甲狀腺葉切除'
  ],
  'general-surgery.html#thyroid_fna': [
    '甲狀腺針刺', '甲狀腺穿刺', '甲狀腺結節', '甲狀腺抽針', '甲狀腺 FNA', '頸部結節',
    '甲狀腺檢查', '甲狀腺細針'
  ],
  'general-surgery.html#thyroid_surgery': [
    '甲狀腺', '甲狀腺瘤', '甲狀腺腫', '大頸泡', '頸前腫塊', '甲亢'
  ],
  'general-surgery.html#port_a_cath': [
    '輸液港', '输液港', '输液埠', 'Port-A', 'Port A', 'portacath', '化療導管',
    '化療埠', '皮下貯器', '中央靜脈導管', 'chemoport'
  ],
  'cardiology.html#pci': [
    '通波仔', '放支架', '心臟支架', '冠脈支架', '冠心病', '心血管堵塞', '血管塞',
    '心肌梗塞', '心梗', '胸痛通波仔', 'PCI', 'PTCA', '支架置入', '冠狀動脈介入',
    '通血管', '心臟通波'
  ],
  'cardiology.html#angiography': [
    '心導管', '冠狀動脈造影', '心臟造影', '通波仔檢查', '心導管檢查', '冠脈造影',
    '心血管造影', 'angiogram', '心導管手術'
  ],
  'ophthalmology.html#cataract': [
    '白內障', '白内障', '眼睛朦', '眼矇', '視力模糊', '睇嘢矇', '換晶體', '換人工晶體',
    '超聲乳化', '超聲波乳化', '白內障手術', 'cataract', 'IOL'
  ],
  'ophthalmology.html#strabismus': [
    '斜視', '鬥雞眼', '眼斜', '對眼', '斜眼', '眼球不正', '斜視手術', 'strabismus'
  ],
  'gyn.html#myomectomy': [
    '子宮肌瘤', '肌瘤', '子宮瘤', '經痛嚴重', '月經量大', '經血多', '肌瘤切除',
    '保留子宮', 'fibroid', 'myoma'
  ],
  'gyn.html#hysterectomy': [
    '切除子宮', '全宮切除', '子宮切除', '割子宮', '拿子宮', '子宮全切', 'hysterectomy'
  ],
  'gyn.html#hysteroscopy': [
    '子宮鏡', '宮腔鏡', '異常出血', '月經失調', '子宮內膜息肉', '宮腔息肉', '診刮'
  ],
  'gyn.html#normal_delivery': [
    '順產', '自然分娩', '生仔', '產科套餐', '分娩', '自然產', '陰道分娩', '生產套餐',
    '產子', '生B', 'maternity'
  ],
  'gyn.html#c_section': [
    '剖腹產', '剖宮產', '剖腹', '剖腹生产', '剖腹生產', '剖腹生', '剖腹取胎',
    'C-section', 'caesarean', 'cesarean'
  ],
  'gyn.html#ovarian_cyst': [
    '卵巢囊腫', '卵巢瘤', '盆腔痛', '卵巢水泡', '卵巢手術', '附件腫塊', '卵巢囊肿'
  ],
  'gyn.html#tubal_ectopic': [
    '宮外孕', '異位妊娠', '輸卵管妊娠', '子宮外孕', '宫外孕', 'ectopic'
  ],
  'gyn.html#cervical_treatment': [
    '子宮頸', '柏氏塗片異常', '子宮頸治療', '子宮頸炎', '子宮頸瘜肉', 'LEEP',
    '冷療', '錐切', 'HPV', '子宮頸癌前'
  ],
  'gyn.html#contraception': [
    '結紮', '避孕手術', '輸卵管結紮', '絕育', '女性結紮', '永久避孕'
  ],
  'orthopedics.html#knee_replacement': [
    '換膝', '換膝頭', '膝關節置換', '膝痛', '退化性膝關節', '膝骨刺', '膝關節炎',
    '人工膝', '全膝置換', 'knee replacement', 'TKR', '行路膝痛'
  ],
  'orthopedics.html#hip_replacement': [
    '換髖', '換骹', '髖關節置換', '股骨頭', '髋关节', '股骨頭壞死', '髖痛',
    '人工髖', 'hip replacement', 'THR', '跌倒斷骹'
  ],
  'orthopedics.html#knee_arthroscopy': [
    '膝關節鏡', '半月板', '半月板撕裂', '十字韌帶', '前十字', 'ACL', '膝受傷',
    '膝扭傷', '膝鎖死', '運動傷膝'
  ],
  'orthopedics.html#shoulder_arthroscopy': [
    '肩關節鏡', '肩旋轉袖', '旋轉袖', '肩袖', '肩痛', '手臂舉唔到', '肩撞擊',
    '肩周炎手術', '冰凍肩手術'
  ],
  'orthopedics.html#shoulder_replacement': [
    '換肩', '肩關節置換', '人工肩', '嚴重肩退化'
  ],
  'orthopedics.html#carpal_tunnel': [
    '腕管', '手腕管', '手麻痺', '手指麻痺', '滑鼠手', '手腕痛', '半夜手痺',
    '腕隧道', 'carpal tunnel', 'CTS'
  ],
  'orthopedics.html#trigger_finger': [
    '彈弓指', '手指卡住', '扳机指', '板機指', '手指彈響', '手指伸唔直', 'trigger finger'
  ],
  'orthopedics.html#spine_surgery': [
    '脊椎手術', '腰椎', '椎間盤', '坐骨神經', '坐骨神經痛', '腰脫', '椎間盤突出',
    '脊椎退化', '腰痛腳痺', '頸椎手術', '腰椎手術', '脊柱手術'
  ],
  'orthopedics.html#orif_upper_limb': [
    '手骨折', '手腕骨折', '鎖骨骨折', '上肢骨折', '手臂骨折', '肘骨折', '打鋼板',
    '骨折手術', 'ORIF 上肢', '橈骨骨折'
  ],
  'orthopedics.html#orif_lower_limb': [
    '腳骨折', '腳踝骨折', '下肢骨折', '小腿骨折', '脛骨骨折', '足踝骨折',
    '打鋼釘', 'ORIF 下肢'
  ],
  'orthopedics.html#achilles_ankle': [
    '跟腱', '腳踝韌帶', '阿基里斯腱', '跟腱斷裂', '腳踝扭傷手術', '踝關節不穩',
    'Achilles'
  ],
  'orthopedics.html#joint_replacement': [
    '換骹', '關節置換', '人工關節', '換關節', '關節退化手術'
  ],
  'orthopedics.html#sports_ortho': [
    '運動創傷', '運動傷科', '運動受傷', '韌帶撕裂', '運動員手術', 'sports injury'
  ],
  'ent.html#tonsillectomy': [
    '割扁桃腺', '扁桃體', '扁桃腺', '經常喉嚨痛', '扁桃腺發炎', '扁桃體切除',
    '年年喉嚨痛', 'tonsil', 'tonsillectomy'
  ],
  'ent.html#adenoid_tonsil': [
    '腺樣體', '小兒鼻塞', '小兒打鼾', '小朋友鼻塞', '腺樣體肥大', '割腺樣體',
    '小兒睡眠窒息', '口呼吸'
  ],
  'ent.html#sinus_surgery': [
    '鼻竇', '鼻息肉', '慢性鼻炎', '鼻塞手術', '鼻竇炎', '鼻竇手術', 'FESS',
    '嗅覺差', '鼻塞好耐', '鼻息肉手術'
  ],
  'ent.html#tympanoplasty': [
    '鼓膜', '耳膜修補', '中耳炎', '耳穿', '耳膜穿', '耳仔穿窿', '長期流耳水',
    '聽力差', '鼓室成形', 'tympanoplasty'
  ],
  'ent.html#micro_laryngoscopy': [
    '聲帶', '聲嘶', '喉鏡', '聲沙', '失聲', '聲帶息肉', '聲帶結節',
    '顯微喉鏡', '聲帶手術'
  ],
  'urology.html#kidney_stone': [
    '腎石', '尿石', '腎絞痛', '血尿', '结石', '腎結石', '輸尿管石', '碎石',
    'ESWL', '尿道石', '小便赤痛', '腰突然劇痛', 'kidney stone'
  ],
  'urology.html#prostate': [
    '前列腺', '小便困難', '夜尿', '攝護腺', '前列腺肥大', 'BPH', '尿無力',
    '尿線幼', '尿頻', 'TURP', '前列腺手術', '老人家夜尿'
  ],
  'urology.html#urodynamics': [
    '尿動力學', '小便失禁檢查', '尿失禁', '尿急', '膀胱檢查', '尿控檢查',
    '壓力性失禁檢查'
  ],
  'urology.html#andrology': [
    '男科', '包皮過長', '勃起', '陽痿', 'ED', '男性不育', '精索靜脈', '男科手術'
  ],
  'pain-management.html#nerve_block': [
    '神經阻滯', '注射止痛', '慢性痛', '痛症注射', '封閉針', '神經注射',
    '脊骨注射', '痛症科注射'
  ],
  'pain-management.html#spine_endoscopy': [
    '脊椎內視鏡', '椎間盤鏡', '腰痛手術', '微創腰痛', '椎間盤微創', '內視鏡腰椎'
  ],
  'pain-management.html#scs_implant': [
    '脊髓刺激', '止痛器', '神經刺激器', 'SCS', '慢性痛植入', '脊髓電刺激'
  ],
  'plastics.html#laceration_repair': [
    '傷口縫合', '外傷縫合', '切傷', '缝针', '縫針', '裂傷', '臉部縫合',
    '急症縫合', '整形縫合', '美容縫合'
  ],
  'plastics.html#rhinoplasty': [
    '隆鼻', '鼻整形', '改鼻型', '鼻雕', '墊鼻', '鼻頭手術', 'rhinoplasty', 'nose job'
  ],
  'outpatient.html': [
    '門診', '睇醫生', '診所', '急症', '挂号', '掛號費', '診金', '普通科',
    '家庭醫生', 'GP', '門診費', '睇症', '掛號睇醫生', '私家門診'
  ],
  'outpatient.html#specialty-outpatient': [
    '專科門診', '專科診金', '看專科', '專科醫生', '专科门诊', '專科掛號'
  ],
  'ward.html': [
    '病房', '住院', '半私家', '私家房', '普通房', '日租', '病房費', '住院費',
    '大房', '三人房', '雙人房', '單人房', '私家病房', '醫院住房'
  ]
};

function loadDb() {
  const code = fs.readFileSync(DB_PATH, 'utf8');
  const sandbox = { console };
  vm.createContext(sandbox);
  vm.runInContext(code + '\nthis.globalMedicalData = globalMedicalData;', sandbox);
  return sandbox.globalMedicalData;
}

function htmlAnchorIds(page) {
  const filePath = path.join(ROOT, page);
  if (!fs.existsSync(filePath)) return new Set();
  const text = fs.readFileSync(filePath, 'utf8');
  const ids = new Set();
  const re = /<(?:section|div|h[1-6]|article)[^>]*\bid="([^"]+)"/gi;
  let m;
  while ((m = re.exec(text))) ids.add(m[1]);
  return ids;
}

function collectFromHtml() {
  const entries = [];
  const htmlFiles = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html') && !EXCLUDED_PAGES.has(f));
  for (const file of htmlFiles) {
    const text = fs.readFileSync(path.join(ROOT, file), 'utf8');
    const sectionRe = /<section[^>]*\bid="([^"]+)"[^>]*>[\s\S]*?<h2[^>]*>([\s\S]*?)<\/h2>/gi;
    let m;
    while ((m = sectionRe.exec(text))) {
      const id = m[1];
      const label = m[2].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
      if (!label || label.length < 2) continue;
      const keywords = [label, id.replace(/_/g, ' ')];
      // also pull procedure from nearby compare-group
      const slice = text.slice(m.index, m.index + 800);
      const proc = slice.match(/data-procedure="([^"]+)"/);
      if (proc) keywords.push(proc[1].replace(/_/g, ' '));
      entries.push({
        keywords: unique(keywords),
        page: file,
        hash: '#' + id,
        label
      });
    }
  }
  return entries;
}

function collectFromModules(db) {
  const entries = [];
  const modules = db.modules || {};
  for (const [modName, modVal] of Object.entries(modules)) {
    const page = MODULE_PAGES[modName];
    if (!page || !modVal || typeof modVal !== 'object') continue;

    // Flat module (outpatient / ward): one entry
    const hospitalIds = db.hospitalOrder || [];
    const looksLikeHospitals = hospitalIds.some((id) => modVal[id]);
    if (looksLikeHospitals) {
      const labels = new Set();
      for (const id of hospitalIds) {
        const row = modVal[id];
        if (row && row.priceLabel) labels.add(row.priceLabel);
      }
      const pageMeta = { outpatient: '門診診金', ward: '病房收費', outpatientSpecialty: '專科門診' };
      entries.push({
        keywords: unique([modName, pageMeta[modName] || modName, ...labels].filter(Boolean)),
        page,
        hash: modName === 'outpatientSpecialty' ? '#specialty-outpatient' : '',
        label: pageMeta[modName] || modName
      });
      continue;
    }

    // Nested procedures — only index hashes that exist as <section id> on the page
    const sectionIds = htmlAnchorIds(page);
    for (const [procId, procVal] of Object.entries(modVal)) {
      if (!procVal || typeof procVal !== 'object') continue;
      if (!sectionIds.has(procId)) continue;
      const labels = new Set();
      for (const id of hospitalIds) {
        const row = procVal[id];
        if (row && row.priceLabel) labels.add(row.priceLabel);
      }
      const zhLabels = [...labels].filter((l) => /[\u3400-\u9FFF]/.test(l));
      const displayLabel = zhLabels[0] || [...labels][0] || procId.replace(/_/g, ' ');
      entries.push({
        keywords: unique([procId.replace(/_/g, ' '), displayLabel, ...labels]),
        page,
        hash: '#' + procId,
        label: displayLabel
      });
    }
  }
  return entries;
}

function isPublishableEntry(item) {
  if (!item || !item.page) return false;
  if (EXCLUDED_PAGES.has(item.page)) return false;
  if (String(item.page).includes('_template')) return false;
  return true;
}

function unique(arr) {
  const seen = new Set();
  const out = [];
  for (const item of arr) {
    const k = String(item).trim();
    if (!k) continue;
    const key = k.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(k);
  }
  return out;
}

function mergeEntries(...lists) {
  const map = new Map();
  for (const list of lists) {
    for (const item of list) {
      const key = item.page + '|' + (item.hash || '');
      const prev = map.get(key);
      if (!prev) {
        map.set(key, {
          keywords: unique(item.keywords || []),
          page: item.page,
          hash: item.hash || '',
          label: item.label
        });
      } else {
        prev.keywords = unique([...(prev.keywords || []), ...(item.keywords || [])]);
        const prevZh = /[\u3400-\u9FFF]/.test(prev.label || '');
        const nextZh = /[\u3400-\u9FFF]/.test(item.label || '');
        if (nextZh && !prevZh) prev.label = item.label;
        else if (nextZh === prevZh && item.label && item.label.length > (prev.label || '').length) {
          prev.label = item.label;
        }
      }
    }
  }
  return [...map.values()];
}

function applyLayAliases(entries) {
  return entries.map((item) => {
    const key = item.page + (item.hash || '');
    const aliases = LAY_ALIASES[key] || LAY_ALIASES[item.page] || [];
    if (!aliases.length) return item;
    return {
      ...item,
      keywords: unique([...(item.keywords || []), ...aliases])
    };
  });
}

/** Shared runtime search — used by search-index.js and patched into db.js */
function searchRuntimeSource(indexExpr) {
  return (
    'function searchMedicalIndex(query) {\n' +
    "  var raw = String(query || '').trim();\n" +
    '  if (!raw) return [];\n' +
    '  var SC_TO_TC = {\n' +
    "    '肠':'腸','胆':'膽','疗':'療','术':'術','诊':'診','检':'檢','险':'險',\n" +
    "    '费':'費','价':'價','医':'醫','护':'護','单':'單','与':'與','为':'為',\n" +
    "    '这':'這','个':'個','产':'產','关':'關','开':'開','门':'門','时':'時',\n" +
    "    '间':'間','发':'發','现':'現','从':'從','经':'經','长':'長','东':'東',\n" +
    "    '车':'車','过':'過','还':'還','对':'對','说':'說','国':'國','页':'頁',\n" +
    "    '网':'網','库':'庫','录':'錄','针':'針','线':'線','头':'頭','风':'風',\n" +
    "    '湿':'濕','干':'乾','后':'後','里':'裡','准':'準','复':'復','历':'歷',\n" +
    "    '确':'確','肿':'腫','宫':'宮','颈':'頸','肾':'腎','脏':'臟','脉':'脈',\n" +
    "    '脑':'腦','髋':'髖','髌':'髕','锁':'鎖','桡':'橈','结':'結','节':'節',\n" +
    "    '枪':'槍','机':'機','缝':'縫','挂':'掛','号':'號','阑':'闌','疮':'瘡','换':'換','泻':'瀉','瘫':'癱','痹':'痺','肿':'腫','脓':'膿','聋':'聾','肿':'腫','脓':'膿','泻':'瀉','瘫':'癱','痹':'痺','聋':'聾','哑':'啞'\n" +
    '  };\n' +
    '  function normalize(s) {\n' +
    "    s = String(s || '').toLowerCase();\n" +
    "    s = s.replace(/[\\s\\u3000·・,，.。!！?？\\-_/\\\\()（）\\[\\]【】+#]/g, '');\n" +
    '    var out = \"\";\n' +
    '    for (var i = 0; i < s.length; i++) {\n' +
    '      var ch = s.charAt(i);\n' +
    '      out += SC_TO_TC[ch] || ch;\n' +
    '    }\n' +
    '    return out;\n' +
    '  }\n' +
    '  function hasCjk(s) { return /[\\u3400-\\u9FFF]/.test(String(s || \"\")); }\n' +
    '  function bigrams(s) {\n' +
    '    if (!s) return [];\n' +
    '    if (s.length < 2) return [s];\n' +
    '    var g = [];\n' +
    '    for (var i = 0; i < s.length - 1; i++) g.push(s.slice(i, i + 2));\n' +
    '    return g;\n' +
    '  }\n' +
    '  function withZhLabel(item) {\n' +
    '    if (hasCjk(item.label)) return item;\n' +
    '    var kws = item.keywords || [];\n' +
    '    for (var i = 0; i < kws.length; i++) {\n' +
    '      if (hasCjk(kws[i])) {\n' +
    '        return { keywords: item.keywords, page: item.page, hash: item.hash || \"\", label: kws[i] };\n' +
    '      }\n' +
    '    }\n' +
    '    return null;\n' +
    '  }\n' +
    '  function scoreItem(item, q) {\n' +
    '    var best = 0;\n' +
    '    var fields = [item.label].concat(item.keywords || []);\n' +
    '    for (var i = 0; i < fields.length; i++) {\n' +
    '      var k = normalize(fields[i]);\n' +
    '      if (!k) continue;\n' +
    '      if (k === q) { best = Math.max(best, 100); continue; }\n' +
    '      if (k.indexOf(q) !== -1) { best = Math.max(best, 78 + Math.min(12, q.length)); continue; }\n' +
    '      if (q.indexOf(k) !== -1 && k.length >= 2) { best = Math.max(best, 68 + Math.min(10, k.length)); continue; }\n' +
    '      if (q.length === 1 && hasCjk(q) && k.indexOf(q) !== -1) { best = Math.max(best, 58); continue; }\n' +
    '      var qb = bigrams(q);\n' +
    '      var kb = bigrams(k);\n' +
    '      if (!qb.length || !kb.length) continue;\n' +
    '      var set = {};\n' +
    '      for (var j = 0; j < kb.length; j++) set[kb[j]] = 1;\n' +
    '      var hit = 0;\n' +
    '      for (var j = 0; j < qb.length; j++) if (set[qb[j]]) hit++;\n' +
    '      var ratio = hit / qb.length;\n' +
    '      var need = q.length <= 3 ? 2 : 1;\n' +
    '      if (hit >= need && ratio >= 0.5) best = Math.max(best, Math.round(38 + ratio * 34));\n' +
    '    }\n' +
    '    return best;\n' +
    '  }\n' +
    '  var q = normalize(raw);\n' +
    '  if (!q) return [];\n' +
    '  var scored = [];\n' +
    '  (' + indexExpr + ' || []).forEach(function (item) {\n' +
    '    var s = scoreItem(item, q);\n' +
    '    if (s >= 40) scored.push({ item: item, score: s });\n' +
    '  });\n' +
    '  scored.sort(function (a, b) { return b.score - a.score; });\n' +
    '  var byKey = {};\n' +
    '  var ordered = [];\n' +
    '  scored.forEach(function (row) {\n' +
    '    var zh = withZhLabel(row.item);\n' +
    '    if (!zh) return;\n' +
    '    var key = zh.page + \"|\" + zh.label;\n' +
    '    if (byKey[key]) return;\n' +
    '    byKey[key] = true;\n' +
    '    ordered.push(zh);\n' +
    '  });\n' +
    '  return ordered;\n' +
    '}\n'
  );
}

function formatIndexJs(entries) {
  return (
    '/** Auto-generated by scripts/build-search-index.js — do not edit by hand */\n' +
    'var medicalSearchIndex = ' +
    JSON.stringify(entries, null, 2) +
    ';\n\n' +
    searchRuntimeSource('medicalSearchIndex')
  );
}

function patchDbSearchIndex(entries) {
  const text = fs.readFileSync(DB_PATH, 'utf8');
  const start = text.indexOf('  searchIndex: [');
  if (start < 0) throw new Error('searchIndex not found in db.js');
  const end = text.indexOf('\n  ]\n};', start);
  if (end < 0) throw new Error('searchIndex end not found');
  const pretty = JSON.stringify(entries, null, 2)
    .split('\n')
    .map((line, i) => (i === 0 ? line : '  ' + line))
    .join('\n');
  let next = text.slice(0, start) + '  searchIndex: ' + pretty + text.slice(end + '\n  ]'.length);

  const fnStart = next.indexOf('/** 全局搜尋索引查詢');
  const fnStartAlt = next.indexOf('function searchMedicalIndex');
  const cut = fnStart >= 0 ? fnStart : fnStartAlt;
  if (cut < 0) throw new Error('searchMedicalIndex not found in db.js');
  next =
    next.slice(0, cut) +
    '/** 全局搜尋索引查詢（俗稱／症狀別名 + 模糊匹配；回傳繁中標籤） */\n' +
    searchRuntimeSource('globalMedicalData.searchIndex');
  fs.writeFileSync(DB_PATH, next);
}

function main() {
  const db = loadDb();
  // Rebuild from HTML + modules only (skip legacy searchIndex keywords to avoid cross-topic pollution)
  const fromHtml = collectFromHtml();
  const fromModules = collectFromModules(db);
  const merged = mergeEntries(fromHtml, fromModules).filter(isPublishableEntry);
  // Drop module-only hashes that no longer exist on the HTML page
  const pageSections = new Map();
  const filtered = merged.filter((item) => {
    if (!item.hash) return true;
    const id = String(item.hash).replace(/^#/, '');
    if (!pageSections.has(item.page)) pageSections.set(item.page, htmlAnchorIds(item.page));
    const ids = pageSections.get(item.page);
    if (!ids.size) return true;
    return ids.has(id);
  });
  const withAliases = applyLayAliases(filtered);
  fs.writeFileSync(OUT_PATH, formatIndexJs(withAliases));
  patchDbSearchIndex(withAliases);
  console.log('Wrote', path.relative(ROOT, OUT_PATH), 'entries=', withAliases.length);
}

main();
