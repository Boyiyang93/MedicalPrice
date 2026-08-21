#!/usr/bin/env node
/**
 * Apply mapping census fixes: wrong_procedure / too_broad rows → Coming Soon.
 */
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'data', 'db.js');
const MAP_PATH = path.join(__dirname, '..', 'pricedata/_audit-2026-08/MAPPING.json');

const REMARKS = {
  generalSurgery: '定額一般外科手術資料整理中。',
  orthopedics: '骨科手術資料整理中。',
  ent: '耳鼻喉科手術資料整理中。'
};

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

function replaceHospitalInProcedure(src, procedure, hospital, remarks) {
  const procRe = new RegExp(`\\n(\\s*)${procedure}: \\{`);
  const procHit = procRe.exec(src);
  if (!procHit) throw new Error('missing procedure ' + procedure);
  const procOpen = procHit.index + procHit[0].length - 1;
  const procClose = findMatchingBrace(src, procOpen);
  const body = src.slice(procOpen + 1, procClose);
  const hospRe = new RegExp(`\\n(\\s*)${hospital}: \\{`);
  const hospHit = hospRe.exec(body);
  if (!hospHit) throw new Error(`missing ${procedure}.${hospital}`);
  const hospOpenInBody = hospHit.index + hospHit[0].length - 1;
  const hospOpen = procOpen + 1 + hospOpenInBody;
  const hospClose = findMatchingBrace(src, hospOpen);
  let after = hospClose + 1;
  while (src[after] === ',') after++;
  const indent = hospHit[1];
  const replacement =
    `\n${indent}${hospital}: {\n` +
    `${indent}  price: 9999999,\n` +
    `${indent}  remarks: ${JSON.stringify(remarks)}\n` +
    `${indent}},`;
  const from = procOpen + 1 + hospHit.index;
  return src.slice(0, from) + replacement + src.slice(after);
}

function main() {
  const mapping = JSON.parse(fs.readFileSync(MAP_PATH, 'utf8'));
  const targets = mapping.issues.filter((r) => r.verdict === 'wrong_procedure' || r.verdict === 'too_broad');
  let src = fs.readFileSync(DB_PATH, 'utf8');
  const done = [];
  for (const t of targets) {
    const remarks = REMARKS[t.module];
    if (!remarks) throw new Error('no remarks for ' + t.module);
    src = replaceHospitalInProcedure(src, t.procedure, t.hospital, remarks);
    done.push(`${t.module}.${t.procedure}.${t.hospital}`);
  }
  src = src.replace(/lastUpdated: "2026-07-19"/, 'lastUpdated: "2026-08-21"');
  fs.writeFileSync(DB_PATH, src);
  console.log('cleared', done.length);
  done.forEach((d) => console.log(d));
}

main();
