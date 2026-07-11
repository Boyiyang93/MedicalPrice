#!/usr/bin/env node
/**
 * Replace inline <style> blocks with shared design-system.css link.
 * Run: node scripts/link-design-system.js
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const linkTag = '    <link rel="stylesheet" href="css/design-system.css">';

const htmlFiles = fs.readdirSync(root).filter((f) => f.endsWith('.html'));

for (const file of htmlFiles) {
  const filePath = path.join(root, file);
  let html = fs.readFileSync(filePath, 'utf8');

  if (html.includes('css/design-system.css')) {
    console.log(`skip (already linked): ${file}`);
    continue;
  }

  const styleRe = /\s*<style>[\s\S]*?<\/style>/;
  if (!styleRe.test(html)) {
    console.log(`skip (no style block): ${file}`);
    continue;
  }

  html = html.replace(styleRe, '\n' + linkTag);
  fs.writeFileSync(filePath, html);
  console.log(`updated: ${file}`);
}
