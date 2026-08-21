#!/usr/bin/env node
/**
 * Fill 21 missing links + replace second-hand URLs when pricedata/{hid}-scrape exists.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const DB_PATH = path.join(ROOT, 'data', 'db.js');

const MISSING = [
  ['outpatient', 'ghk', 'https://gleneagles.hk/tc/fee-charges/package-charges'],
  ['ward', 'szufh', 'https://www.szufh.hk/service-fees.html'],
  ['ward', 'cuhk', 'https://www.cuhkmc.hk/'],
  ['ward', 'ghk', 'https://gleneagles.hk/tc/fee-charges/package-charges'],
  ['gastroscopy', 'hksh', 'https://www.hksh-hospital.com/zh-hk/fees-and-charges/'],
  ['colonoscopy', 'baptist', 'https://www.hkbh.org.hk/fees-charges/'],
  ['colonoscopy', 'pbh', 'https://www.pbh.hk/service-fee-adjustment/'],
  ['dual_scope', 'pbh', 'https://www.pbh.hk/service-fee-adjustment/'],
  ['ct_brain', 'szufh', 'https://www.szufh.hk/radiology-imaging-services.html'],
  ['mri_brain', 'szufh', 'https://www.szufh.hk/radiology-imaging-services.html'],
  ['mri_brain', 'cuhk', 'https://www.cuhkmc.hk/sc/fees-and-charges/price-transparency/reference-charges-for-common-surgical-procedures'],
  ['knee_replacement', 'cuhk', 'https://www.cuhkmc.hk/sc/medical-packages/cumc-medical-package/orthopaedics'],
  ['shoulder_arthroscopy', 'cuhk', 'https://www.cuhkmc.hk/sc/medical-packages/cumc-medical-package/orthopaedics'],
  ['shoulder_replacement', 'cuhk', 'https://www.cuhkmc.hk/sc/medical-packages/cumc-medical-package/orthopaedics'],
  ['orif_upper_limb', 'cuhk', 'https://www.cuhkmc.hk/sc/medical-packages/cumc-medical-package/orthopaedics'],
  ['carpal_tunnel', 'cuhk', 'https://www.cuhkmc.hk/sc/medical-packages/cumc-medical-package/orthopaedics'],
  ['trigger_finger', 'cuhk', 'https://www.cuhkmc.hk/sc/medical-packages/cumc-medical-package/orthopaedics'],
  ['knee_arthroscopy', 'cuhk', 'https://www.cuhkmc.hk/sc/medical-packages/cumc-medical-package/orthopaedics'],
  ['orif_lower_limb', 'cuhk', 'https://www.cuhkmc.hk/sc/medical-packages/cumc-medical-package/orthopaedics'],
  ['hip_replacement', 'cuhk', 'https://www.cuhkmc.hk/sc/medical-packages/cumc-medical-package/orthopaedics'],
  ['achilles_ankle', 'cuhk', 'https://www.cuhkmc.hk/sc/medical-packages/cumc-medical-package/orthopaedics']
];

const FEE_HUB = {
  szufh: 'https://www.szufh.hk/',
  hksh: 'https://www.hksh-hospital.com/zh-hk/fees-and-charges/',
  ghk: 'https://gleneagles.hk/tc/fee-charges/package-charges',
  matilda: 'https://www.matilda.org/zh-hk/fees-and-packages/',
  sth: 'https://www.sth.org.hk/download/zh/ccssp.pdf',
  baptist: 'https://www.hkbh.org.hk/fees-charges/pilot-programme-for-enhancing-price-transparency-for-private-hospitals/',
  union: 'https://www.union.org/tc/charges-promotion/charges/charges-of-common-surgery-in-union-hospital',
  canossa: 'https://www.canossahospital.org.hk/tc/fee/pilot_programme_for_enhancing_price_transparency_for_private_hospitals/',
  sph: 'https://www.stpaul.org.hk/tc/charges',
  pbh: 'https://www.pbh.hk/service-fee-adjustment/',
  evangel: 'https://www.evangel.org.hk/zh-hant/charges/price_list/',
  twah: 'https://www.twah.org.hk/tc/fees-and-charges',
  hkah: 'https://www.hkah.org.hk/tc/fees-and-charges'
};

const SHEMOM_MATERNITY = {
  ghk: 'https://gleneagles.hk/tc/facilities-services/explore-facilities-and-services/specialist-outpatient-clinics/obstetrics-gynaecology-clinic',
  union: 'https://www.union.org/tc/charges-promotion/charges',
  canossa: 'https://www.canossahospital.org.hk/tc/fee/',
  hkah: 'https://www.hkah.org.hk/tc/fees-and-charges'
};

function scrapeExists(hid) {
  return fs.existsSync(path.join(ROOT, 'pricedata', hid + '-scrape'));
}

function findMatchingBrace(src, openIdx) {
  let depth = 0;
  for (let i = openIdx; i < src.length; i++) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') {
      depth--;
      if (depth === 0) return i;
    }
  }
  throw new Error('unbalanced');
}

function hospitalBlock(src, procedure, hospital) {
  const procRe = new RegExp(`\\n(\\s*)${procedure}: \\{`);
  const procHit = procRe.exec(src);
  if (!procHit) throw new Error('missing procedure ' + procedure);
  const procOpen = procHit.index + procHit[0].length - 1;
  const procClose = findMatchingBrace(src, procOpen);
  const body = src.slice(procOpen + 1, procClose);
  const hospRe = new RegExp(`\\n(\\s*)${hospital}: \\{`);
  const hospHit = hospRe.exec(body);
  if (!hospHit) throw new Error(`missing ${procedure}.${hospital}`);
  const open = procOpen + 1 + hospHit.index + hospHit[0].length - 1;
  const close = findMatchingBrace(src, open);
  return { open, close, indent: hospHit[1] };
}

function insertLink(src, procedure, hospital, url) {
  const { open, close, indent } = hospitalBlock(src, procedure, hospital);
  const block = src.slice(open, close + 1);
  if (/\n\s*link:/.test(block)) return src;
  const insert = `{\n${indent}  link: ${JSON.stringify(url)},`;
  return src.slice(0, open) + insert + src.slice(open + 1);
}

function replaceLink(src, procedure, hospital, url) {
  const { open, close } = hospitalBlock(src, procedure, hospital);
  const block = src.slice(open, close + 1);
  if (!/\n\s*link:\s*"/.test(block)) return src;
  const next = block.replace(/\n(\s*)link:\s*"[^"]*"/, `\n$1link: ${JSON.stringify(url)}`);
  return src.slice(0, open) + next + src.slice(close + 1);
}

function walkSecondHand(src) {
  const vm = require('vm');
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(src + '\nthis.__db = globalMedicalData;', sandbox);
  const db = sandbox.__db;
  const rows = [];
  function walk(modName, node, procId) {
    if (!node || typeof node !== 'object') return;
    const hids = db.hospitalOrder || [];
    const isHosp = hids.some((id) => Object.prototype.hasOwnProperty.call(node, id));
    if (isHosp) {
      for (const hid of hids) {
        const row = node[hid];
        if (!row || !row.link) continue;
        if (/hongkongcard\.com|bowtie\.com|shemom\.com/i.test(row.link)) {
          rows.push({ mod: modName, proc: procId || modName, hid, link: row.link });
        }
      }
      return;
    }
    for (const [k, v] of Object.entries(node)) {
      if (v && typeof v === 'object') walk(modName, v, k);
    }
  }
  for (const [n, node] of Object.entries(db.modules || {})) walk(n, node, null);
  return rows;
}

function main() {
  let src = fs.readFileSync(DB_PATH, 'utf8');
  for (const [proc, hid, url] of MISSING) {
    src = insertLink(src, proc, hid, url);
  }
  const second = walkSecondHand(src);
  let replaced = 0;
  let kept = 0;
  for (const r of second) {
    if (!scrapeExists(r.hid)) { kept++; continue; }
    let url = FEE_HUB[r.hid];
    if (/shemom\.com/i.test(r.link) && SHEMOM_MATERNITY[r.hid]) url = SHEMOM_MATERNITY[r.hid];
    if (!url) { kept++; continue; }
    src = replaceLink(src, r.proc, r.hid, url);
    replaced++;
  }
  fs.writeFileSync(DB_PATH, src);
  console.log('inserted missing', MISSING.length);
  console.log('replaced second-hand', replaced, 'kept', kept);
}

main();
