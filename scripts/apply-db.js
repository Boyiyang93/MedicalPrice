#!/usr/bin/env node
/**
 * Thin CLI wrapper for offline db apply / validate flows.
 *
 * Usage:
 *   node scripts/apply-db.js validate
 *   node scripts/apply-db.js build-search
 *   node scripts/apply-db.js dry-run --script pricedata/_batch_rewrite_db.py
 *   node scripts/apply-db.js apply --script pricedata/bowtie-surgery-2026/_apply_bowtie.py -- [extra args]
 */
const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

function run(cmd, args, opts = {}) {
  console.log('>', cmd, args.join(' '));
  const res = spawnSync(cmd, args, {
    cwd: ROOT,
    stdio: 'inherit',
    shell: false,
    ...opts
  });
  if (res.status !== 0) process.exit(res.status || 1);
}

function usage() {
  console.log(`MedicalPrice apply-db

Commands:
  validate              Run scripts/validate-db.js
  build-search          Rebuild search index from db + HTML
  dry-run --script <p>  Run a Python apply script with --dry-run if supported
  apply --script <p>    Run a Python apply script, then validate + build-search

Examples:
  npm run apply:db -- validate
  npm run apply:db -- build-search
  npm run apply:db -- dry-run --script pricedata/_batch_rewrite_db.py
  npm run apply:db -- apply --script pricedata/bowtie-surgery-2026/_apply_bowtie.py
`);
}

function main() {
  const argv = process.argv.slice(2);
  const cmd = argv[0];
  if (!cmd || cmd === '-h' || cmd === '--help') {
    usage();
    process.exit(0);
  }

  if (cmd === 'validate') {
    run(process.execPath, [path.join('scripts', 'validate-db.js')]);
    return;
  }

  if (cmd === 'build-search') {
    run(process.execPath, [path.join('scripts', 'build-search-index.js')]);
    run(process.execPath, [path.join('scripts', 'validate-db.js')]);
    return;
  }

  if (cmd === 'dry-run' || cmd === 'apply') {
    const scriptIdx = argv.indexOf('--script');
    if (scriptIdx < 0 || !argv[scriptIdx + 1]) {
      console.error('Missing --script <path>');
      process.exit(1);
    }
    const scriptPath = argv[scriptIdx + 1];
    const abs = path.resolve(ROOT, scriptPath);
    if (!fs.existsSync(abs)) {
      console.error('Script not found:', scriptPath);
      process.exit(1);
    }
    const passthroughStart = argv.indexOf('--');
    const extra = passthroughStart >= 0 ? argv.slice(passthroughStart + 1) : [];
    const pyArgs = [abs, ...extra];
    if (cmd === 'dry-run' && !extra.includes('--dry-run')) {
      pyArgs.push('--dry-run');
    }
    run('python3', pyArgs);
    console.log('\n--- APPLY SUMMARY ---');
    console.log('script:', scriptPath);
    console.log('mode:', cmd);
    console.log('time:', new Date().toISOString());
    if (cmd === 'apply') {
      run(process.execPath, [path.join('scripts', 'build-search-index.js')]);
      run(process.execPath, [path.join('scripts', 'validate-db.js')]);
    }
    return;
  }

  console.error('Unknown command:', cmd);
  usage();
  process.exit(1);
}

main();
