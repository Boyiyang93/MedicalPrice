#!/usr/bin/env node
/**
 * Fetch every unique source URL in data/db.js and match listed prices against page/PDF text.
 * Writes pricedata/_audit-2026-08/REPORT.json
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const { spawnSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const DB_PATH = path.join(ROOT, 'data', 'db.js');
const OUT_DIR = path.join(ROOT, 'pricedata/_audit-2026-08');
const PLACEHOLDER_COMING = 9999999;
const PLACEHOLDER_NA = 9999;
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36 MedicalPriceAudit/1.0';

function loadDb() {
  const code = fs.readFileSync(DB_PATH, 'utf8');
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(code + '\nthis.__db = globalMedicalData;', sandbox);
  return sandbox.__db;
}

function walkRows(db) {
  const rows = [];
  function kindOf(mod) {
    if (mod === 'outpatient' || mod === 'outpatientSpecialty') return 'B';
    if (mod === 'ward') return 'C';
    return 'D';
  }
  function walk(modName, node, procId) {
    if (!node || typeof node !== 'object') return;
    const hids = db.hospitalOrder || [];
    const isHosp = hids.some((id) => Object.prototype.hasOwnProperty.call(node, id));
    if (isHosp) {
      const kind = kindOf(modName);
      for (const hid of hids) {
        const row = node[hid];
        if (!row) continue;
        let nums = [];
        if (kind === 'B') nums = ['regular', 'night', 'holiday'].map((k) => row.prices && row.prices[k]).filter((n) => typeof n === 'number');
        else if (kind === 'C') nums = ['standard', 'semiPrivate', 'private'].map((k) => row.prices && row.prices[k]).filter((n) => typeof n === 'number');
        else if (typeof row.price === 'number') nums = [row.price];
        const placeholder = nums.some((n) => n === PLACEHOLDER_COMING || n === PLACEHOLDER_NA);
        const extra = [];
        const disp = row.displayPrice || '';
        const ranges = row.ranges || {};
        const blob = [disp, ranges.standard, ranges.semiPrivate, ranges.private, row.displayPrices && JSON.stringify(row.displayPrices)].filter(Boolean).join(' ');
        for (const m of blob.matchAll(/(\d{1,3}(?:,\d{3})+|\d{3,7})/g)) {
          extra.push(Number(String(m[1]).replace(/,/g, '')));
        }
        rows.push({
          module: modName,
          procedure: procId || '',
          hospital: hid,
          kind,
          price: kind === 'D' ? row.price : null,
          nums: nums.filter((n) => n !== PLACEHOLDER_COMING && n !== PLACEHOLDER_NA),
          extra: extra.filter((n) => n !== PLACEHOLDER_COMING && n !== PLACEHOLDER_NA),
          display: disp || JSON.stringify(row.displayPrices || row.ranges || ''),
          link: row.link || '',
          placeholder
        });
      }
      return;
    }
    for (const [k, v] of Object.entries(node)) {
      if (v && typeof v === 'object') walk(modName, v, k);
    }
  }
  for (const [name, node] of Object.entries(db.modules || {})) walk(name, node, null);
  return rows;
}

function domainKind(url) {
  try {
    const h = new URL(url).hostname.replace(/^www\./, '');
    if (/hongkongcard\.com/i.test(h)) return 'hongkongcard';
    if (/bowtie\.com/i.test(h)) return 'bowtie';
    if (/shemom\.com/i.test(h)) return 'shemom';
    return 'first_party';
  } catch (e) {
    return 'invalid';
  }
}

function extractNumbers(text) {
  const set = new Set();
  const s = String(text || '').replace(/\u00a0/g, ' ');
  for (const m of s.matchAll(/(\d{1,3}(?:,\d{3}){1,3}|\d{4,7})/g)) {
    const n = Number(String(m[1]).replace(/,/g, ''));
    if (n >= 100 && n <= 9999999) set.add(n);
  }
  return set;
}

function pdfText(buf) {
  const tmp = path.join(OUT_DIR, '_tmp.pdf');
  fs.writeFileSync(tmp, buf);
  const pdftotext = spawnSync('pdftotext', ['-layout', tmp, '-'], { encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 });
  if (pdftotext.status === 0 && pdftotext.stdout) {
    try { fs.unlinkSync(tmp); } catch (e) { /* ignore */ }
    return pdftotext.stdout;
  }
  const py = spawnSync('python3', ['-c', 'from pypdf import PdfReader; import sys; r=PdfReader(sys.argv[1]); print("\\n".join((p.extract_text() or "") for p in r.pages))', tmp], { encoding: 'utf8', maxBuffer: 8 * 1024 * 1024 });
  try { fs.unlinkSync(tmp); } catch (e) { /* ignore */ }
  if (py.status === 0) return py.stdout || '';
  return '';
}

async function fetchUrl(url) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 25000);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      redirect: 'follow',
      headers: {
        'User-Agent': UA,
        Accept: 'text/html,application/xhtml+xml,application/pdf,application/json;q=0.9,*/*;q=0.8',
        'Accept-Language': 'zh-HK,zh-TW,zh,en;q=0.8'
      }
    });
    const buf = Buffer.from(await res.arrayBuffer());
    const ctype = (res.headers.get('content-type') || '').toLowerCase();
    let text = '';
    const isPdf = /pdf/i.test(ctype) || /\.pdf(\?|$)/i.test(url);
    if (isPdf) text = pdfText(buf) || buf.toString('latin1');
    else text = buf.toString('utf8');
    const stripped = text.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ');
    return {
      ok: res.ok,
      status: res.status,
      finalUrl: res.url,
      ctype,
      numbers: extractNumbers(stripped),
      textLen: stripped.length,
      error: null
    };
  } catch (e) {
    return { ok: false, status: 0, finalUrl: url, ctype: '', numbers: new Set(), textLen: 0, error: e.message };
  } finally {
    clearTimeout(t);
  }
}

function matchNums(want, extra, found) {
  const hits = [];
  const miss = [];
  for (const n of want) {
    if (found.has(n)) hits.push(n);
    else miss.push(n);
  }
  const extraHits = extra.filter((n) => found.has(n));
  return { hits, miss, extraHits };
}

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const db = loadDb();
  const rows = walkRows(db);
  const unique = [...new Set(rows.map((r) => r.link).filter(Boolean))];
  console.log('rows', rows.length, 'unique urls', unique.length);

  const cache = {};
  for (let i = 0; i < unique.length; i++) {
    const url = unique[i];
    process.stdout.write(`[${i + 1}/${unique.length}] ${url}\n`);
    cache[url] = await fetchUrl(url);
    await new Promise((r) => setTimeout(r, 250));
  }

  const results = rows.map((r) => {
    if (r.placeholder && !r.link) {
      return { ...r, verdict: 'skip_placeholder', httpStatus: null, reason: 'Coming Soon 無鏈接' };
    }
    if (!r.link) {
      return { ...r, verdict: r.placeholder ? 'skip_placeholder' : 'missing_link', httpStatus: null, reason: '真實價缺來源鏈接' };
    }
    const fetched = cache[r.link];
    const second = domainKind(r.link);
    if (!fetched || fetched.error || !fetched.ok) {
      return {
        ...r,
        verdict: 'dead_link',
        httpStatus: fetched && fetched.status,
        sourceKind: second,
        reason: (fetched && fetched.error) || `HTTP ${fetched && fetched.status}`
      };
    }
    if (r.placeholder) {
      return { ...r, verdict: 'link_ok_placeholder', httpStatus: fetched.status, sourceKind: second, reason: '占位行，鏈接可打開' };
    }
    const found = fetched.numbers;
    const m = matchNums(r.nums, r.extra, found);
    let verdict;
    let reason;
    if (m.hits.length === r.nums.length && r.nums.length) {
      verdict = 'ok';
      reason = '頁面出現卡片價格數字';
    } else if (m.extraHits.length && !m.hits.length) {
      verdict = 'ok';
      reason = '頁面出現 displayPrice/區間數字';
    } else if (fetched.textLen < 800 && m.hits.length === 0) {
      verdict = 'needs_manual';
      reason = '靜態 HTML 過短或疑似 JS 渲染，無法核數字';
    } else if (m.hits.length === 0 && m.extraHits.length === 0) {
      if (found.size === 0) {
        verdict = 'needs_manual';
        reason = '頁面未抽出數字';
      } else {
        verdict = 'price_mismatch';
        reason = `頁面未找到 ${r.nums.join('/')} 或區間數字`;
      }
    } else {
      verdict = 'price_mismatch';
      reason = `只命中部分數字 hits=${m.hits.join(',')} miss=${m.miss.join(',')}`;
    }
    if (second !== 'first_party' && (verdict === 'ok')) {
      verdict = 'ok_second_hand';
    }
    return {
      module: r.module,
      procedure: r.procedure,
      hospital: r.hospital,
      kind: r.kind,
      price: r.price,
      nums: r.nums,
      display: r.display,
      link: r.link,
      placeholder: r.placeholder,
      verdict,
      httpStatus: fetched.status,
      finalUrl: fetched.finalUrl,
      sourceKind: second,
      textLen: fetched.textLen,
      hits: m.hits,
      miss: m.miss,
      extraHits: m.extraHits,
      reason
    };
  });

  const counts = {};
  for (const r of results) counts[r.verdict] = (counts[r.verdict] || 0) + 1;
  const urlStatus = unique.map((url) => ({
    url,
    status: cache[url].status,
    ok: cache[url].ok,
    error: cache[url].error,
    textLen: cache[url].textLen,
    numberCount: cache[url].numbers.size,
    kind: domainKind(url)
  }));

  const report = {
    generatedAt: new Date().toISOString(),
    uniqueUrls: unique.length,
    rowCount: results.length,
    counts,
    urlStatus,
    issues: results.filter((r) => !['ok', 'ok_second_hand', 'skip_placeholder', 'link_ok_placeholder'].includes(r.verdict)),
    all: results
  };
  fs.writeFileSync(path.join(OUT_DIR, 'REPORT.json'), JSON.stringify(report, null, 2));
  fs.writeFileSync(path.join(OUT_DIR, 'URL-STATUS.json'), JSON.stringify(urlStatus, null, 2));
  console.log('counts', counts);
  console.log('dead', urlStatus.filter((u) => !u.ok).map((u) => u.status + ' ' + u.url));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
