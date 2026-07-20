#!/usr/bin/env node
/**
 * Validate data/db.js against MedicalPrice V2 schema conventions.
 * Exit 1 on any error.
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.join(__dirname, '..');
const DB_PATH = path.join(ROOT, 'data', 'db.js');
const EXPECTED_HOSPITALS = [
  'szufh', 'cuhk', 'hksh', 'ghk', 'matilda', 'sth', 'baptist',
  'union', 'canossa', 'sph', 'pbh', 'evangel', 'twah', 'hkah'
];
const PLACEHOLDER_COMING = 9999999;
const PLACEHOLDER_NA = 9999;

const errors = [];
const warnings = [];

function fail(msg) { errors.push(msg); }
function warn(msg) { warnings.push(msg); }

function loadDb() {
  const code = fs.readFileSync(DB_PATH, 'utf8');
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(code + '\nthis.__db = globalMedicalData;', sandbox);
  return sandbox.__db;
}

function isHospitalMap(obj, hospitalOrder) {
  if (!obj || typeof obj !== 'object') return false;
  return hospitalOrder.some((id) => Object.prototype.hasOwnProperty.call(obj, id));
}

function validateHospitalRow(modPath, hid, row, kind) {
  if (!row || typeof row !== 'object') {
    fail(`${modPath}.${hid}: missing row object`);
    return;
  }
  if (kind === 'B') {
    if (!row.prices || typeof row.prices !== 'object') {
      fail(`${modPath}.${hid}: B-type needs prices`);
    }
  } else if (kind === 'C') {
    if (!row.prices || typeof row.prices !== 'object') {
      fail(`${modPath}.${hid}: C-type needs prices`);
    }
  } else if (kind === 'D') {
    if (typeof row.price !== 'number') {
      fail(`${modPath}.${hid}: D-type needs numeric price`);
    } else if (row.price !== PLACEHOLDER_COMING && row.price !== PLACEHOLDER_NA && row.price < 0) {
      fail(`${modPath}.${hid}: negative price`);
    }
  }
}

function guessKind(moduleName, node) {
  if (moduleName === 'outpatient' || moduleName === 'outpatientSpecialty') return 'B';
  if (moduleName === 'ward') return 'C';
  return 'D';
}

function validateModule(name, node, hospitalOrder, depth) {
  if (!node || typeof node !== 'object') {
    fail(`modules.${name}: not an object`);
    return;
  }
  if (isHospitalMap(node, hospitalOrder)) {
    const kind = guessKind(name, node);
    for (const hid of hospitalOrder) {
      if (!node[hid]) {
        warn(`modules.${name}: missing hospital ${hid}`);
        continue;
      }
      validateHospitalRow(`modules.${name}`, hid, node[hid], kind);
    }
    return;
  }
  // nested procedures
  for (const [procId, procVal] of Object.entries(node)) {
    if (!procVal || typeof procVal !== 'object') continue;
    if (isHospitalMap(procVal, hospitalOrder)) {
      validateModule(`${name}.${procId}`, procVal, hospitalOrder, depth + 1);
    }
  }
}

function crossCheckHtmlModules(db) {
  const moduleNames = new Set(Object.keys(db.modules || {}));
  const htmlFiles = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html'));
  for (const file of htmlFiles) {
    const text = fs.readFileSync(path.join(ROOT, file), 'utf8');
    const re = /data-module="([^"]+)"/g;
    let m;
    while ((m = re.exec(text))) {
      if (!moduleNames.has(m[1])) {
        fail(`${file}: data-module="${m[1]}" not in db.modules`);
      }
    }
  }
}

function main() {
  if (!fs.existsSync(DB_PATH)) {
    console.error('Missing', DB_PATH);
    process.exit(1);
  }
  let db;
  try {
    db = loadDb();
  } catch (e) {
    console.error('Failed to parse db.js:', e.message);
    process.exit(1);
  }

  if (!db || typeof db !== 'object') fail('globalMedicalData missing');
  if (!db.version) warn('missing version');
  if (!db.lastUpdated) fail('missing lastUpdated');
  if (!Array.isArray(db.hospitalOrder) || db.hospitalOrder.length !== 14) {
    fail(`hospitalOrder must have 14 ids (got ${db.hospitalOrder && db.hospitalOrder.length})`);
  } else {
    for (const id of EXPECTED_HOSPITALS) {
      if (!db.hospitalOrder.includes(id)) fail(`hospitalOrder missing ${id}`);
      if (!db.hospitals || !db.hospitals[id]) fail(`hospitals missing ${id}`);
      else if (!db.hospitals[id].name) fail(`hospitals.${id}.name missing`);
    }
  }

  if (!db.modules || typeof db.modules !== 'object') fail('modules missing');
  else {
    for (const [name, node] of Object.entries(db.modules)) {
      validateModule(name, node, db.hospitalOrder || EXPECTED_HOSPITALS, 0);
    }
  }

  if (!Array.isArray(db.searchIndex) || db.searchIndex.length < 10) {
    fail(`searchIndex too small (${db.searchIndex && db.searchIndex.length})`);
  }

  // Trust-strip drift: index should mention same year-month as lastUpdated
  const indexHtml = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
  const ym = String(db.lastUpdated || '').slice(0, 7); // YYYY-MM
  if (ym) {
    const [y, m] = ym.split('-');
    const monthNum = String(Number(m));
    const needle = `${y} 年 ${monthNum} 月`;
    if (!indexHtml.includes(needle) && !indexHtml.includes(`${y}年${monthNum}月`)) {
      warn(`index.html trust copy may drift from lastUpdated=${db.lastUpdated} (expected ~${needle})`);
    }
  }

  crossCheckHtmlModules(db);

  for (const w of warnings) console.warn('WARN:', w);
  if (errors.length) {
    for (const e of errors) console.error('ERROR:', e);
    console.error(`validate-db failed: ${errors.length} error(s), ${warnings.length} warning(s)`);
    process.exit(1);
  }
  console.log(`validate-db OK (${warnings.length} warning(s)) — hospitals=${(db.hospitalOrder || []).length} searchIndex=${db.searchIndex.length}`);
}

main();
