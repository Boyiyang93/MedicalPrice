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

function loadDb() {
  const code = fs.readFileSync(DB_PATH, 'utf8');
  const sandbox = { console };
  vm.createContext(sandbox);
  vm.runInContext(code + '\nthis.globalMedicalData = globalMedicalData;', sandbox);
  return sandbox.globalMedicalData;
}

function collectFromHtml() {
  const entries = [];
  const htmlFiles = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html'));
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

    // Nested procedures
    for (const [procId, procVal] of Object.entries(modVal)) {
      if (!procVal || typeof procVal !== 'object') continue;
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

function formatIndexJs(entries) {
  return (
    '/** Auto-generated by scripts/build-search-index.js — do not edit by hand */\n' +
    'var medicalSearchIndex = ' +
    JSON.stringify(entries, null, 2) +
    ';\n\n' +
    'function searchMedicalIndex(query) {\n' +
    "  var q = String(query || '').toLowerCase().trim();\n" +
    '  if (!q) return [];\n' +
    '  function hasCjk(s) { return /[\\u3400-\\u9FFF]/.test(String(s || \'\')); }\n' +
    '  function withZhLabel(item) {\n' +
    '    if (hasCjk(item.label)) return item;\n' +
    '    var kws = item.keywords || [];\n' +
    '    for (var i = 0; i < kws.length; i++) {\n' +
    '      if (hasCjk(kws[i])) return { keywords: item.keywords, page: item.page, hash: item.hash || \'\', label: kws[i] };\n' +
    '    }\n' +
    '    return null;\n' +
    '  }\n' +
    '  var matched = (medicalSearchIndex || []).filter(function (item) {\n' +
    '    return (item.keywords || []).some(function (kw) {\n' +
    "      var k = String(kw).toLowerCase();\n" +
    '      return q.indexOf(k) !== -1 || k.indexOf(q) !== -1;\n' +
    '    });\n' +
    '  });\n' +
    '  var byKey = {};\n' +
    '  matched.forEach(function (item) {\n' +
    '    var zh = withZhLabel(item);\n' +
    '    if (!zh) return;\n' +
    '    var key = zh.page + \'|\' + zh.label;\n' +
    '    var prev = byKey[key];\n' +
    '    if (!prev) { byKey[key] = zh; return; }\n' +
    '    if (!(prev.hash) && zh.hash) byKey[key] = zh;\n' +
    '  });\n' +
    '  return Object.keys(byKey).map(function (k) { return byKey[k]; });\n' +
    '}\n'
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
  const next = text.slice(0, start) + '  searchIndex: ' + pretty + text.slice(end + '\n  ]'.length);
  fs.writeFileSync(DB_PATH, next);
}

function main() {
  const db = loadDb();
  const existing = db.searchIndex || [];
  const fromHtml = collectFromHtml();
  const fromModules = collectFromModules(db);
  const merged = mergeEntries(existing, fromHtml, fromModules);
  fs.writeFileSync(OUT_PATH, formatIndexJs(merged));
  patchDbSearchIndex(merged);
  // Keep searchMedicalIndex using globalMedicalData.searchIndex in db.js — already does
  console.log('Wrote', path.relative(ROOT, OUT_PATH), 'entries=', merged.length);
}

main();
