#!/usr/bin/env bash
# Build a slim publish tree for Netlify (excludes pricedata, tooling, scrapes).
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DIST="$ROOT/dist"
rm -rf "$DIST"
mkdir -p "$DIST"

rsync -a \
  --exclude 'dist/' \
  --exclude 'pricedata/' \
  --exclude 'scripts/' \
  --exclude '.cursor/' \
  --exclude '.codegraph/' \
  --exclude '.git/' \
  --exclude '.github/' \
  --exclude 'node_modules/' \
  --exclude '.DS_Store' \
  --exclude 'package.json' \
  --exclude 'package-lock.json' \
  --exclude 'DESIGN.md' \
  --exclude 'design-system/' \
  --exclude 'card-explorer.html' \
  --exclude 'css/card-explorer.css' \
  "$ROOT/" "$DIST/"

echo "Prepared publish dir: $DIST"
