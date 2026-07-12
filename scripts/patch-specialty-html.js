/**
 * Inject compare-group sections into specialty HTML pages.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

function section(id, title, module, procedure) {
  return (
    `                <section id="${id}" class="mb-8">\n` +
    `                    <h2 class="lane-header text-base font-bold text-[#2B579A] mb-2">${title}</h2>\n` +
    `                    <div class="lane-container"><div class="compare-group grid grid-cols-1 md:grid-cols-3 gap-4" data-module="${module}" data-procedure="${procedure}"></div></div>\n` +
    `                </section>`
  );
}

const PAGES = {
  'general-surgery.html': {
    module: 'generalSurgery',
    startMarker: '<div class="section-header text-xl font-bold',
    endMarker: '<script src="data/db.js">',
    introReplace: true,
    intro: `                <p class="text-xs text-gray-500 mb-6 bg-blue-50/50 inline-block px-3 py-1 rounded hidden surgery-filter-hint">ℹ️ 有定額數據的醫院自動 Top 3 排序；暫無數據沉底顯示 Coming Soon。</p>\n`,
    items: [
      ['cholecystectomy', '腹腔鏡膽囊切除術'],
      ['breast_lump', '乳房腫塊切除術'],
      ['circumcision', '包皮環切術'],
      ['thyroid_fna', '甲狀腺細針穿刺檢查'],
      ['hemithyroidectomy', '偏側甲狀腺切除術'],
      ['thyroidectomy', '甲狀腺/副甲狀腺切除術'],
      ['hernia_abdominal', '腹腔疝氣修補術'],
      ['hernia_unilateral', '單側腹股溝疝氣修補術'],
      ['hernia_bilateral', '雙側腹股溝疝氣修補術'],
      ['appendectomy', '闌尾切除術'],
      ['hemorrhoid', '痔瘡專項處置'],
      ['thyroid_surgery', '甲狀腺處置手術'],
      ['port_a_cath', '輸液港手術'],
      ['breast_biopsy', '乳腺抽針及旋切活檢'],
      ['breast_surgery', '乳腺外科手術']
    ]
  },
  'orthopedics.html': {
    module: 'orthopedics',
    startMarker: '<h2 class="section-header text-xl font-bold',
    endMarker: '<footer class="mt-16',
    introReplace: true,
    intro: `                <p class="text-xs text-gray-500 mb-6 bg-blue-50/50 inline-block px-3 py-1 rounded hidden surgery-filter-hint">ℹ️ 有定額數據的醫院自動 Top 3 排序；暫無數據沉底顯示 Coming Soon。</p>\n`,
    items: [
      ['knee_replacement', '全人工膝關節置換術'],
      ['hip_replacement', '髖關節全關節置換'],
      ['joint_replacement', '人工關節置換術 (全膝/單髁/全髖)'],
      ['shoulder_arthroscopy', '肩關節鏡手術'],
      ['shoulder_replacement', '全肩關節置換術'],
      ['knee_arthroscopy', '膝關節鏡手術'],
      ['sports_ortho', '骨科小手術及運動醫學'],
      ['spine_surgery', '脊柱手術'],
      ['orif_upper_limb', 'ORIF (鎖骨/橈骨遠端骨折)'],
      ['orif_lower_limb', 'ORIF (髕骨/足踝骨折)'],
      ['carpal_tunnel', '內視鏡腕管解除術'],
      ['trigger_finger', '板機狀指鬆解術'],
      ['achilles_ankle', '跟腱修補/踝關節鏡韌帶修補']
    ]
  },
  'gyn.html': {
    module: 'gynecology',
    startMarker: '<section id="normal_delivery"',
    endMarker: '<footer class="mt-16',
    introReplace: false,
    items: [
      ['normal_delivery', '自然分娩套餐'],
      ['c_section', '剖腹產套餐'],
      ['cervical_treatment', '子宮頸病變治療手術'],
      ['hysteroscopy', '子宮鏡診治手術'],
      ['myomectomy', '子宮肌瘤切除術'],
      ['hysterectomy', '子宮切除術'],
      ['tubal_ectopic', '輸卵管及宮外孕手術'],
      ['ovarian_cyst', '卵巢囊腫切除術'],
      ['contraception', '避孕及終止妊娠']
    ]
  },
  'imaging.html': {
    module: 'imaging',
    insertBefore: '<section id="ct_brain"',
    items: [
      ['bronchoscopy', '支氣管鏡檢查']
    ],
    insertOnly: true
  },
  'ent.html': {
    module: 'ent',
    startMarker: '<h2 class="section-header text-xl font-bold',
    endMarker: '<footer class="mt-16',
    introReplace: true,
    intro: `                <p class="text-xs text-gray-500 mb-6 bg-blue-50/50 inline-block px-3 py-1 rounded hidden surgery-filter-hint">ℹ️ 有定額數據的醫院自動 Top 3 排序；暫無數據沉底顯示 Coming Soon。</p>\n`,
    items: [
      ['tonsillectomy', '扁桃體切除術'],
      ['micro_laryngoscopy', '微型喉鏡檢查'],
      ['adenoid_tonsil', '腺樣體及扁桃體手術'],
      ['sinus_surgery', '鼻竇炎及鼻中隔手術'],
      ['tympanoplasty', '鼓膜修補及顯微喉鏡']
    ]
  },
  'ophthalmology.html': {
    module: 'ophthalmology',
    startMarker: '<h2 class="section-header text-xl font-bold',
    endMarker: '<footer class="mt-16',
    introReplace: true,
    intro: `                <p class="text-xs text-gray-500 mb-6 bg-blue-50/50 inline-block px-3 py-1 rounded hidden surgery-filter-hint">ℹ️ 有定額數據的醫院自動 Top 3 排序；暫無數據沉底顯示 Coming Soon。</p>\n`,
    items: [
      ['cataract', '白內障超聲乳化手術'],
      ['strabismus', '斜視手術']
    ]
  },
  'pain-management.html': {
    module: 'painManagement',
    startMarker: '<h2 class="section-header text-xl font-bold',
    endMarker: '<footer class="mt-16',
    introReplace: true,
    intro: `                <p class="text-xs text-gray-500 mb-6 bg-blue-50/50 inline-block px-3 py-1 rounded hidden surgery-filter-hint">ℹ️ 有定額數據的醫院自動 Top 3 排序；暫無數據沉底顯示 Coming Soon。</p>\n`,
    items: [
      ['nerve_block', '疼痛管理 (神經阻滯/射頻等)'],
      ['spine_endoscopy', '脊柱內鏡診療手術'],
      ['scs_implant', '脊髓電刺激植入術']
    ]
  },
  'cardiology.html': {
    module: 'cardiology',
    startMarker: '<h2 class="section-header text-xl font-bold',
    endMarker: '<footer class="mt-16',
    introReplace: true,
    intro: `                <p class="text-xs text-gray-500 mb-6 bg-blue-50/50 inline-block px-3 py-1 rounded hidden surgery-filter-hint">ℹ️ 有定額數據的醫院自動 Top 3 排序；暫無數據沉底顯示 Coming Soon。</p>\n`,
    items: [
      ['angiography', '心臟導管造影檢查'],
      ['pci', '冠狀動脈造影及支架置入 (PCI)']
    ]
  },
  'plastics.html': {
    module: 'plastics',
    startMarker: '<h2 class="section-header text-xl font-bold',
    endMarker: '<footer class="mt-16',
    introReplace: true,
    intro: `                <p class="text-xs text-gray-500 mb-6 bg-blue-50/50 inline-block px-3 py-1 rounded hidden surgery-filter-hint">ℹ️ 有定額數據的醫院自動 Top 3 排序；暫無數據沉底顯示 Coming Soon。</p>\n`,
    items: [
      ['rhinoplasty', '隆鼻手術'],
      ['laceration_repair', '急症/整形外科縫合套餐']
    ]
  }
};

for (const [file, cfg] of Object.entries(PAGES)) {
  const fp = path.join(ROOT, file);
  let html = fs.readFileSync(fp, 'utf8');
  const blocks = cfg.items.map(([id, title]) => section(id, title, cfg.module, id)).join('\n');

  if (cfg.insertOnly) {
    const insertBlock =
      `                <section id="${cfg.items[0][0]}" class="mb-8">\n` +
      `                    <h2 class="lane-header text-base font-bold text-[#2B579A] mb-2">${cfg.items[0][1]}</h2>\n` +
      `                    <div class="lane-container"><div class="compare-group grid grid-cols-1 md:grid-cols-3 gap-4" data-module="${cfg.module}" data-procedure="${cfg.items[0][0]}"></div></div>\n` +
      `                </section>\n                `;
    html = html.replace(cfg.insertBefore, insertBlock + cfg.insertBefore);
  } else {
    const start = html.indexOf(cfg.startMarker);
    const end = html.indexOf(cfg.endMarker);
    if (start < 0 || end < 0) throw new Error('Markers not found in ' + file);
    const intro = cfg.introReplace ? cfg.intro : '';
    html = html.slice(0, start) + intro + blocks + '\n                                ' + html.slice(end);
  }

  fs.writeFileSync(fp, html);
  console.log('Updated', file);
}

console.log('Done');
