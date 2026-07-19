#!/usr/bin/env node
'use strict';
// Structural verification for the static site (no browser needed — DOM/text
// assertions only, per CLAUDE.md 截圖鐵則: prefer assertions over screenshots).
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PAGES = [
  'account-overview', 'account-record', 'betting-record', 'customer-service',
  'deposit-record', 'deposit', 'fish', 'hot-games', 'index', 'live',
  'mini-games', 'personal-info', 'profit-loss', 'promotion', 'security-center',
  'slots', 'sports', 'support', 'withdrawal-record', 'withdrawal',
].map((s) => `${s}.html`);

let fails = [];
let oks = [];
function check(name, ok, detail) {
  if (ok) oks.push(name);
  else fails.push(`${name}${detail ? ' :: ' + detail : ''}`);
}

const missing = PAGES.filter((f) => !fs.existsSync(path.join(ROOT, f)));
check('20 pages exist', missing.length === 0, missing.join(', '));

function walk(dir, base = dir, acc = new Set()) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name === '.git') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, base, acc);
    else acc.add(path.relative(base, full));
  }
  return acc;
}
const allFiles = walk(ROOT);

let scriptTagIssues = [];
let dataVResidue = [];
let vueCommentResidue = [];
let leadingSlashIssues = [];
let missingAssets = [];
let navLinkIssues = [];

for (const page of PAGES) {
  const full = path.join(ROOT, page);
  if (!fs.existsSync(full)) continue;
  const html = fs.readFileSync(full, 'utf8');

  const scripts = html.match(/<script\b[^>]*>[\s\S]*?<\/script>/gi) || [];
  const badScripts = scripts.filter((s) => !/^<script src="assets\/js\/[a-zA-Z0-9_-]+\.js"><\/script>$/.test(s));
  if (badScripts.length) scriptTagIssues.push(`${page}: ${badScripts.length} non-conforming script tag(s)`);

  if (/data-v-[a-zA-Z0-9]+/.test(html)) dataVResidue.push(page);
  if (/<!--\[|<!--\]|<!---->/.test(html)) vueCommentResidue.push(page);

  const leadingSlash = html.match(/\b(?:href|src)="\/(?!\/)[^"]*"|url\((?:&quot;)?\/(?!\/)[^)"']*/g) || [];
  if (leadingSlash.length) leadingSlashIssues.push(`${page}: ${leadingSlash.slice(0, 5).join(' | ')}`);

  const refs = new Set();
  for (const m of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) refs.add(m[1]);
  for (const ref of refs) {
    if (!ref || ref === '#' || ref.startsWith('http://') || ref.startsWith('https://') || ref.startsWith('mailto:') || ref.startsWith('tel:') || ref.startsWith('//')) continue;
    const clean = ref.split('#')[0].split('?')[0];
    if (!clean) continue;
    if (!allFiles.has(clean)) missingAssets.push(`${page}: ${ref}`);
    if (clean.endsWith('.html') && !PAGES.includes(clean)) navLinkIssues.push(`${page}: -> ${clean} (not a known page)`);
  }
}

check('script tags: local relative src only', scriptTagIssues.length === 0, scriptTagIssues.slice(0, 10).join(' || '));
check('no data-v-* residue', dataVResidue.length === 0, dataVResidue.join(', '));
check('no Vue SSR comment residue', vueCommentResidue.length === 0, vueCommentResidue.join(', '));
check('no leading-slash internal href/src/url()', leadingSlashIssues.length === 0, leadingSlashIssues.slice(0, 10).join(' || '));
check('all referenced local assets exist', missingAssets.length === 0, missingAssets.slice(0, 15).join(' || '));
check('nav links resolve to known pages', navLinkIssues.length === 0, navLinkIssues.slice(0, 10).join(' || '));

console.log('=== VERIFY SUMMARY ===');
for (const o of oks) console.log('OK   -', o);
for (const f of fails) console.log('FAIL -', f);
console.log(`\n${fails.length === 0 ? 'OK' : 'FAIL'} (${oks.length} passed, ${fails.length} failed)`);
process.exit(fails.length === 0 ? 0 : 1);
