/**
 * Patch all SZUFH specialty prices from scraped HTML → ￥ in data/db.js
 * Run: node scripts/patch-szufh-rmb.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SCRAPE = path.join(ROOT, 'pricedata/szufh-scrape');
const DB_PATH = path.join(ROOT, 'data/db.js');

function decode(s) {
  return s
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&le;/g, '≤')
    .replace(/&ge;/g, '≥');
}

function parseCell(td, { keepEng = false } = {}) {
  let html = td;
  if (keepEng) {
    html = html.replace(/<span[^>]*class="eng-text"[^>]*>([\s\S]*?)<\/span>/gi, ' $1 ');
  } else {
    html = html.replace(/<span[^>]*class="eng-text"[^>]*>[\s\S]*?<\/span>/gi, '');
  }
  return decode(html.replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, ''))
    .replace(/\s+/g, ' ')
    .trim();
}

function toNum(s) {
  const m = String(s || '').replace(/,/g, '').match(/(\d+)/);
  return m ? parseInt(m[1], 10) : null;
}

function parsePage(fname) {
  const html = fs.readFileSync(path.join(SCRAPE, fname), 'utf8');
  const items = [];
  const tables = html.match(/<table[^>]*class="xtablewjz"[^>]*>[\s\S]*?<\/table>/gi) || [];
  for (const table of tables) {
    const rows = [];
    const trs = table.match(/<tr[^>]*>[\s\S]*?<\/tr>/gi) || [];
    for (const tr of trs) {
      const rawCells = (tr.match(/<t[dh][^>]*>[\s\S]*?<\/t[dh]>/gi) || []).map((c) =>
        c.replace(/^<t[dh][^>]*>/i, '').replace(/<\/t[dh]>$/i, '')
      );
      if (!rawCells.length) continue;
      rows.push({
        zh: rawCells.map((c) => parseCell(c)),
        header: rawCells.map((c) => parseCell(c, { keepEng: true }))
      });
    }
    if (!rows.length) continue;
    const headers = rows[0].header;
    const hjoin = headers.join(' ');
    const isHeader = /套餐|價格|价格|住院|風險|风险|優惠|优惠|Package/.test(hjoin);
    const data = isHeader ? rows.slice(1) : rows;
    let loI = null;
    let hiI = null;
    if (isHeader) {
      headers.forEach((h, i) => {
        if (/一般|套餐價|套餐价/.test(h) && loI == null) loI = i;
        else if (/中等/.test(h)) hiI = i;
        else if (/香港|優惠|优惠/.test(h)) {
          /* ignore */
        } else if (/價格|价格|Price/.test(h) && loI == null && !/住院/.test(h)) loI = i;
      });
      if (loI == null && headers.length >= 3) loI = 2;
      if (hiI == null && headers.length >= 4 && /中等|風險|风险/.test(headers[3])) hiI = 3;
    }
    for (const r of data) {
      const name = r.zh[0] || '';
      if (!name || /whatsapp/i.test(name) || /^點擊|^点击/.test(name)) continue;
      const lo = loI != null && loI < r.zh.length ? toNum(r.zh[loI]) : null;
      const hi = hiI != null && hiI < r.zh.length ? toNum(r.zh[hiI]) : null;
      if (lo == null) continue;
      items.push({ name, lo, hi, page: fname });
    }
  }
  return items;
}

function pick(items, pred) {
  return items.filter((x) => pred(x.name));
}

function agg(items) {
  if (!items.length) return null;
  const lows = [];
  const highs = [];
  for (const it of items) {
    lows.push(it.lo);
    highs.push(it.hi == null ? it.lo : it.hi);
  }
  let lo = Math.min(...lows);
  let hi = Math.max(...highs);
  if (items.length === 1 && items[0].hi == null) hi = Math.round(lo * 1.25);
  return [lo, hi];
}

function fmt(n) {
  return n.toLocaleString('en-US');
}

function disp(lo, hi) {
  return lo === hi ? `￥${fmt(lo)}` : `￥${fmt(lo)} – ￥${fmt(hi)}`;
}

function makeBlock(label, lo, hi, remarks, link, tags) {
  const mid = Math.round((lo + hi) / 2);
  const lines = [
    '      szufh: {',
    `        price: ${mid},`,
    `        priceLabel: "${label}",`,
    `        displayPrice: "${disp(lo, hi)}",`,
    `        remarks: "${remarks}",`,
    `        link: "${link}"`
  ];
  if (tags) {
    lines[lines.length - 1] += ',';
    lines.push(`        tags: ${tags}`);
  }
  lines.push('      }');
  return lines.join('\n');
}

function findMatchingBrace(s, openIdx) {
  let depth = 0;
  for (let i = openIdx; i < s.length; i++) {
    if (s[i] === '{') depth++;
    else if (s[i] === '}') {
      depth--;
      if (depth === 0) return i;
    }
  }
  return -1;
}

function replaceSzufhAll(text, module, procedure, newBlock) {
  const modRe = new RegExp(`\\n    ${module}:\\s*\\{`, 'g');
  const targets = [];
  let modM;
  while ((modM = modRe.exec(text))) {
    const modStart = modM.index + modM[0].length - 1;
    const modEnd = findMatchingBrace(text, modStart);
    if (modEnd < 0) continue;
    const modBody = text.slice(modStart, modEnd + 1);
    const procM = modBody.match(new RegExp(`\\n      ${procedure}:\\s*\\{`));
    if (!procM) continue;
    const procAbs = modStart + procM.index + procM[0].length - 1;
    const procEnd = findMatchingBrace(text, procAbs);
    const procBody = text.slice(procAbs, procEnd + 1);
    const szM = procBody.match(/\n      szufh:\s*\{/);
    if (!szM) continue;
    const szStart = procAbs + szM.index + 1;
    const szOpen = procAbs + szM.index + szM[0].length - 1;
    const szEnd = findMatchingBrace(text, szOpen);
    targets.push([szStart, szEnd + 1]);
  }
  targets.sort((a, b) => b[0] - a[0]);
  for (const [a, b] of targets) {
    text = text.slice(0, a) + newBlock + text.slice(b);
  }
  return [text, targets.length];
}

const FILES = [
  'gi-endoscopy-fees.html',
  'gynecology-surgery-fees.html',
  'urology-surgery-fees.html',
  'colorectal-and-anal-surgery-fees.html',
  'general-surgery-fees.html',
  'breast-surgery-fees.html',
  'orthopedic-surgery-fees.html',
  'pain-management-procedure-fees.html',
  'ent-surgery-fees.html',
  'ophthalmic-surgery-fees.html',
  'emergency-and-plastic-surgery-fees.html',
  'cardiology-surgery-fees.html'
];
const pages = Object.fromEntries(FILES.map((f) => [f, parsePage(f)]));

let text = fs.readFileSync(DB_PATH, 'utf8');

function apply(module, procedure, label, items, remarks, link, tags) {
  const r = agg(items);
  if (!r) {
    console.log('SKIP', module + '.' + procedure);
    return;
  }
  const [lo, hi] = r;
  const block = makeBlock(label, lo, hi, remarks, link, tags);
  const [next, n] = replaceSzufhAll(text, module, procedure, block);
  text = next;
  console.log(`${n ? 'OK' : 'FAIL'} ${module}.${procedure} x${n}: ${disp(lo, hi)}`);
}

const GS = pages['general-surgery-fees.html'];
const BR = pages['breast-surgery-fees.html'];
const CR = pages['colorectal-and-anal-surgery-fees.html'];
const GI = pages['gi-endoscopy-fees.html'];
const GY = pages['gynecology-surgery-fees.html'];
const UR = pages['urology-surgery-fees.html'];
const OR = pages['orthopedic-surgery-fees.html'];
const PA = pages['pain-management-procedure-fees.html'];
const EN = pages['ent-surgery-fees.html'];
const OP = pages['ophthalmic-surgery-fees.html'];
const PL = pages['emergency-and-plastic-surgery-fees.html'];
const CA = pages['cardiology-surgery-fees.html'];

const L = {
  gs: 'https://www.szufh.hk/general-surgery-fees.html',
  br: 'https://www.szufh.hk/breast-surgery-fees.html',
  cr: 'https://www.szufh.hk/colorectal-and-anal-surgery-fees.html',
  gi: 'https://www.szufh.hk/gi-endoscopy-fees.html',
  gy: 'https://www.szufh.hk/gynecology-surgery-fees.html',
  ur: 'https://www.szufh.hk/urology-surgery-fees.html',
  or: 'https://www.szufh.hk/orthopedic-surgery-fees.html',
  pa: 'https://www.szufh.hk/pain-management-procedure-fees.html',
  en: 'https://www.szufh.hk/ent-surgery-fees.html',
  op: 'https://www.szufh.hk/ophthalmic-surgery-fees.html',
  pl: 'https://www.szufh.hk/emergency-and-plastic-surgery-fees.html',
  ca: 'https://www.szufh.hk/cardiology-surgery-fees.html'
};

// —— generalSurgery ——
apply('generalSurgery', 'cholecystectomy', '腹腔鏡膽囊切除術', pick(GS, (n) => /膽囊/.test(n)), '✓ 手術形式（常規腹腔鏡／開放式）與風險等級；標準住院天數為 2 晚。', L.gs);
apply('generalSurgery', 'appendectomy', '闌尾切除術', pick(GS, (n) => /闌尾/.test(n)), '✓ 手術形式（常規腹腔鏡／開放式）與風險等級；標準住院天數為 1 晚。', L.gs);
apply('generalSurgery', 'hernia_unilateral', '單側腹股溝疝氣修補術', pick(GS, (n) => /腹股溝疝/.test(n) && /單側/.test(n)), '✓ 是否含補片與風險等級；標準住院天數為 2 晚。', L.gs);
apply('generalSurgery', 'hernia_bilateral', '雙側腹股溝疝氣修補術', pick(GS, (n) => /腹股溝疝/.test(n) && /雙側/.test(n)), '✓ 是否含補片與風險等級；標準住院天數為 2 晚。', L.gs);
apply('generalSurgery', 'thyroid_fna', '超聲波導引甲狀腺細針穿刺', pick(GS, (n) => /甲狀腺穿刺|甲狀腺細針/.test(n)), '✓ 超聲引導下甲狀腺穿刺活檢；日間操作；一般／中等風險。', L.gs);
apply('generalSurgery', 'hemithyroidectomy', '甲狀腺次全切術', pick(GS, (n) => /甲狀腺次全/.test(n)), '✓ 甲狀腺次全切術；標準住院天數為 3 晚；一般／中等風險。', L.gs);
apply('generalSurgery', 'thyroidectomy', '甲狀腺全切術', pick(GS, (n) => /甲狀腺全切/.test(n)), '✓ 甲狀腺全切術；標準住院天數為 3 晚；一般／中等風險。', L.gs);
apply('generalSurgery', 'thyroid_surgery', '甲狀腺處置手術', pick(GS, (n) => /甲狀腺/.test(n)), '✓ 術式（穿刺活檢／次全切除／全切除）與風險等級；日間至 3 晚。', L.gs);
apply('generalSurgery', 'port_a_cath', '輸液港手術', pick(GS, (n) => /輸液港/.test(n)), '✓ 處置形式（置入／取出）與麻醉及風險等級；日間手術。', L.gs);
apply('generalSurgery', 'breast_lump', '乳房腫塊切除術', pick(BR, (n) => /乳房腫塊切除/.test(n)), '✓ 單側／雙側腫塊切除與風險等級。', L.br);
apply('generalSurgery', 'breast_biopsy', '乳腺抽針及旋切活檢', pick(BR, (n) => /幼針|粗針|真空輔助/.test(n) && !/加項|囊腫/.test(n)), '✓ 術式（幼針／粗針／真空輔助）及麻醉；日間操作。不含加項。', L.br);
apply('generalSurgery', 'breast_surgery', '乳腺外科手術', pick(BR, (n) => /乳房腫塊切除|部分乳房切除|乳腺癌根治/.test(n)), '✓ 術式（腫塊切除／部分切除+前哨／乳腺癌根治）與風險等級。', L.br);
apply('generalSurgery', 'hemorrhoid', '痔瘡專項處置', pick(CR, (n) => /痔切除|痔瘡膠圈|痔瘡硬化|RBL/.test(n)), '✓ 術式（傳統切除／RBL／庫克套扎／硬化劑）與風險等級。', L.cr);
apply('generalSurgery', 'circumcision', '包皮環切術', pick(UR, (n) => /包皮/.test(n)), '✓ 術式、年齡與麻醉及風險等級。', L.ur);

// —— imaging ——
apply('imaging', 'gastroscopy', '無痛胃鏡健康檢查 (監察麻醉)', pick(GI, (n) => /無痛胃鏡/.test(n) && !/腸鏡|胃腸|加項|EMR|同台/.test(n)), '✓ 套餐形式（標準日間／PRO精英版／PRO休養版）。不含超出套餐外的病理活檢及息肉切除。', L.gi, '["跨境免找數"]');
apply('imaging', 'colonoscopy', '無痛腸鏡健康檢查 (監察麻醉)', pick(GI, (n) => /無痛腸鏡/.test(n) && !/胃|加項|EMR|同台/.test(n)), '✓ 套餐形式（標準日間／PRO精英版／PRO休養版）。不含超出套餐外的病理活檢及息肉切除。', L.gi, '["瘜肉全包", "當天出報告"]');
apply('imaging', 'dual_scope', '無痛胃腸鏡健康檢查 (雙鏡聯合)', pick(GI, (n) => /無痛胃腸鏡/.test(n) && !/加項|EMR|同台/.test(n)), '✓ 套餐形式（標準日間／PRO精英版／PRO休養版）。專為雙鏡聯合設計。', L.gi, '["一次麻醉", "節省近35%"]');

// —— gynecology ——
apply('gynecology', 'cervical_treatment', '子宮頸病變治療手術', pick(GY, (n) => /錐形切除|電環切除|LEEP|環紮|射頻/.test(n)), '✓ 術式（錐切／LEEP／環紮／射頻）及麻醉。', L.gy);
apply('gynecology', 'hysteroscopy', '子宮鏡診治手術', pick(GY, (n) => /子宮鏡診治/.test(n)), '✓ 一般／中等風險。含活檢、息肉、縱隔、黏連及異物取出。', L.gy);
apply('gynecology', 'myomectomy', '子宮肌瘤切除術', pick(GY, (n) => /子宮肌瘤/.test(n)), '✓ 路徑（子宮鏡／腹腔鏡／開放式）與風險等級。', L.gy);
apply('gynecology', 'hysterectomy', '子宮切除術', pick(GY, (n) => /子宮切除/.test(n)), '✓ 術式（腹腔鏡／LAVH／開放式）與風險等級。', L.gy);
apply('gynecology', 'tubal_ectopic', '輸卵管及宮外孕手術', pick(GY, (n) => /輸卵管|宮外孕|子宮輸卵管造影/.test(n)), '✓ 項目（造影／結紮／取胚／宮外孕切除）與風險等級。', L.gy);
apply('gynecology', 'ovarian_cyst', '卵巢囊腫切除術', pick(GY, (n) => /卵巢囊腫/.test(n)), '✓ 範圍（腹腔鏡單側／雙側／開放式）與風險等級。', L.gy);
apply('gynecology', 'contraception', '避孕及終止妊娠', pick(GY, (n) => /子宮環|避孕|終止妊娠|擴刮/.test(n)), '✓ 子宮環／皮下避孕劑／終止妊娠擴刮術；日間操作。', L.gy);

// —— orthopedics ——
apply('orthopedics', 'joint_replacement', '人工關節置換術', pick(OR, (n) => /膝關節置換|單髁|全髖|髖關節/.test(n)), '✓ 全膝／單髁／機械臂CORI／全髖及植入物選項與風險等級。', L.or);
apply('orthopedics', 'knee_replacement', '單側全膝關節置換術', pick(OR, (n) => /全膝關節|單髁/.test(n)), '✓ 植入物選項及機械臂輔助 CORI；一般／中等風險。', L.or);
apply('orthopedics', 'hip_replacement', '單側全髖關節置換術', pick(OR, (n) => /全髖|髖關節/.test(n)), '✓ 陶瓷對陶瓷／陶瓷對聚乙烯及品牌選項；一般／中等風險。', L.or);
apply('orthopedics', 'spine_surgery', '脊柱手術', pick(OR, (n) => /腰椎|頸椎|脊柱內鏡|椎間盤|單開門/.test(n)), '✓ 腰椎減壓融合／ACDF／人工椎間盤／UBE及集採選項與風險等級。', L.or);
apply('orthopedics', 'sports_ortho', '骨科小手術及運動醫學', pick(OR, (n) => /腫塊切除|腱鞘囊腫|冰凍肩|十字韌帶|半月板|滑膜|軟骨成形|踝關節韌帶|臀肌/.test(n)), '✓ 腫塊／腱鞘／冰凍肩／交叉韌帶／半月板等與風險等級。', L.or);
apply('orthopedics', 'knee_arthroscopy', '膝關節鏡手術', pick(OR, (n) => /十字韌帶|半月板|滑膜切除|軟骨成形/.test(n) && !/踝|臀/.test(n)), '✓ 關節鏡術式與風險等級。', L.or);

// —— cardiology ——
apply('cardiology', 'angiography', '冠狀動脈造影', pick(CA, (n) => /冠狀動脈造影/.test(n) && !/支架/.test(n)), '✓ 日間手術或住院 1 晚。', L.ca);
apply('cardiology', 'pci', '冠狀動脈造影及支架置入 (PCI)', pick(CA, (n) => /冠狀動脈/.test(n) && !/每增加/.test(n)), '✓ 造影日間／住院／造影+支架；每增加一個支架另計。', L.ca);

// —— ophthalmology ——
apply('ophthalmology', 'cataract', '白內障超聲乳化晶體植入', pick(OP, (n) => /白內障|玻璃體注藥/.test(n)), '✓ 晶體級別（單焦／雙焦／EDOF／三焦）及玻璃體注藥；局麻日間。', L.op);
apply('ophthalmology', 'strabismus', '斜視手術', pick(OP, (n) => /斜視/.test(n)), '✓ 矯正眼外肌數量（1條／2條）；全身麻醉日間。', L.op);

// —— ent ——
apply('ent', 'adenoid_tonsil', '腺樣體及扁桃體手術', pick(EN, (n) => /腺樣|扁桃/.test(n)), '✓ 腺樣體／扁桃體／同台複合；日間手術室。', L.en);
apply('ent', 'sinus_surgery', '鼻竇炎及鼻中隔手術', pick(EN, (n) => /鼻竇|鼻中隔|鼻甲骨/.test(n)), '✓ FESS／鼻中隔矯正／複合術與風險等級。', L.en);
apply('ent', 'tympanoplasty', '鼓膜修補及顯微喉鏡', pick(EN, (n) => /鼓膜|顯微喉鏡|喉鏡/.test(n)), '✓ 鼓膜修補／顯微喉鏡±活檢。未標中等風險項按 1.25 倍拉齊上限。', L.en);
apply('ent', 'tonsillectomy', '扁桃體切除術', pick(EN, (n) => /扁桃體切除/.test(n) && !/腺樣/.test(n)), '✓ 扁桃體切除術；日間手術；一般／中等風險。', L.en);
apply('ent', 'micro_laryngoscopy', '顯微喉鏡檢查', pick(EN, (n) => /顯微喉鏡|喉鏡/.test(n)), '✓ 顯微喉鏡±活檢；未標中等風險項按 1.25 倍拉齊上限。', L.en);

// —— pain ——
apply('painManagement', 'nerve_block', '疼痛管理 (神經阻滯/射頻等)', pick(PA, (n) => /神經阻滯|神經造影|神經射頻|三叉神經|鞘內/.test(n)), '✓ 阻滯／造影／射頻／三叉神經球囊／鞘內鎮痛泵與風險等級。', L.pa);
apply('painManagement', 'spine_endoscopy', '脊柱內鏡診療手術', pick(PA, (n) => /脊柱內鏡/.test(n)), '✓ 腰椎／頸椎；監測麻醉下日間；一般／中等風險。', L.pa);
apply('painManagement', 'scs_implant', '脊髓電刺激植入術', pick(PA, (n) => /脊髓電刺激/.test(n)), '✓ 第一期測試／第二期永久植入與風險等級。', L.pa);

// —— plastics ——
apply('plastics', 'laceration_repair', '急症/整形外科縫合套餐', pick(PL, (n) => /美容縫合|整形外科/.test(n)), '✓ 傷口長度與材料；日間操作。', L.pl);

// —— urology ——
apply('urology', 'prostate', '前列腺診療手術', pick(UR, (n) => /前列腺|Rezum|Urolift|TURP|HoLEP/.test(n)), '✓ MRI融合活檢／Rezum／Urolift／TURP／HoLEP與風險等級。', L.ur);
apply('urology', 'kidney_stone', '泌尿系結石碎石手術', pick(UR, (n) => /碎石|雙J管|URSL/.test(n)), '✓ 硬鏡／軟鏡碎石、雙J管拔除與風險等級。', L.ur);
apply('urology', 'urodynamics', '尿動力及膀胱鏡檢查', pick(UR, (n) => /尿動力|膀胱尿道鏡/.test(n) || (/^膀胱鏡/.test(n) && !/雙J/.test(n))), '✓ 尿動力套餐／膀胱尿道鏡±活檢與風險等級。', L.ur);
apply('urology', 'andrology', '男科處置手術', pick(UR, (n) => /輸精管|包皮/.test(n)), '✓ 輸精管結紮／包皮術式與麻醉及年齡段。', L.ur);

// Drop duplicate urology if still present
const uros = [...text.matchAll(/\n    urology:\s*\{/g)];
if (uros.length >= 2) {
  const start = uros[0].index;
  const brace = start + uros[0][0].length - 1;
  const end = findMatchingBrace(text, brace);
  let chunkEnd = end + 1;
  if (text[chunkEnd] === ',') chunkEnd++;
  text = text.slice(0, start) + text.slice(chunkEnd);
  console.log('removed duplicate urology module');
}

fs.writeFileSync(DB_PATH, text);
console.log('Wrote', DB_PATH);
console.log('￥ count', (text.match(/displayPrice:\s*"￥/g) || []).length);
console.log('urology modules', (text.match(/\n    urology:\s*\{/g) || []).length);
