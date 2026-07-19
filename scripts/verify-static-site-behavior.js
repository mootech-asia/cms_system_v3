#!/usr/bin/env node
'use strict';
// Behavior (Playwright) verification for the static site's vanilla JS layer.
// Usage: node scripts/serve.js &   (or any static server on PORT)
//        node scripts/verify-static-site-behavior.js
const { chromium } = require('playwright');
const path = require('path');

const PORT = process.env.PORT || 4174;
const BASE = process.env.STATIC_VERIFY_BASE || `http://localhost:${PORT}`;
const EXEC = process.env.PLAYWRIGHT_CHROMIUM || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const ROOT = path.join(__dirname, '..');
const PAGES = [
  'account-overview', 'account-record', 'betting-record', 'customer-service',
  'deposit-record', 'deposit', 'fish', 'hot-games', 'index', 'live',
  'mini-games', 'personal-info', 'profit-loss', 'promotion', 'security-center',
  'slots', 'sports', 'support', 'withdrawal-record', 'withdrawal',
];

const results = [];
function record(name, ok, detail) {
  results.push({ name, ok, detail: detail || '' });
}

async function blockExternal(page) {
  await page.route('**/*', (route) => {
    const url = route.request().url();
    if (url.indexOf(BASE) === -1 && url.indexOf('file://') !== 0) {
      return route.abort();
    }
    return route.continue();
  });
}

(async () => {
  const browser = await chromium.launch({ executablePath: EXEC });

  // 1. console sweep across all 20 pages
  for (const name of PAGES) {
    const page = await browser.newPage();
    await blockExternal(page);
    const errors = [];
    // Known external dependency (Google Fonts CDN): unreachable in sandboxed/
    // offline environments, present in the original source, not a regression
    // from static conversion. Track failures by *request URL* (not console
    // text, which omits the URL) so only LOCAL resource failures count as bugs.
    page.on('requestfailed', (req) => {
      const url = req.url();
      if (url.indexOf(`${BASE}`) === 0) errors.push(`requestfailed: ${url} (${req.failure()?.errorText})`);
    });
    page.on('response', (res) => {
      if (res.status() >= 400 && res.url().indexOf(`${BASE}`) === 0) {
        errors.push(`http${res.status()}: ${res.url()}`);
      }
    });
    page.on('pageerror', (err) => errors.push(String(err)));
    await page.goto(`${BASE}/${name}.html`, { waitUntil: 'load', timeout: 15000 });
    await page.waitForTimeout(300);
    record(`console:${name}`, errors.length === 0, errors.slice(0, 2).join(' | '));
    await page.close();
  }
  console.log('console sweep done');

  // 2. Hero carousel smoke (index.html)
  {
    const page = await browser.newPage();
    await blockExternal(page);
    await page.goto(`${BASE}/index.html`, { waitUntil: 'load' });
    await page.waitForTimeout(300);
    const activeBefore = await page.evaluate(() => {
      const s = document.querySelector('.hero-slide.active');
      return s ? Array.from(document.querySelectorAll('.hero-slide')).indexOf(s) : -1;
    });
    await page.click('.hero-controls .icon-btn[aria-label="Next"]');
    await page.waitForTimeout(300);
    const activeAfter = await page.evaluate(() => {
      const s = document.querySelector('.hero-slide.active');
      return s ? Array.from(document.querySelectorAll('.hero-slide')).indexOf(s) : -1;
    });
    const dotsCount = await page.evaluate(() => document.querySelectorAll('.hero-dot').length);
    record('smoke:hero-next', activeBefore !== activeAfter && dotsCount > 0,
      `before=${activeBefore} after=${activeAfter} dots=${dotsCount}`);
    await page.close();
  }

  // 3. Promos cat-tab switch + client-side rerender
  {
    const page = await browser.newPage();
    await blockExternal(page);
    await page.goto(`${BASE}/index.html`, { waitUntil: 'load' });
    await page.waitForTimeout(300);
    const before = await page.evaluate(() => document.querySelector('.cat-tab.active')?.textContent?.trim());
    const tabs = await page.$$('.cat-tab');
    let clicked = null;
    for (const t of tabs) {
      const txt = (await t.textContent() || '').trim();
      if (txt && txt !== before) { await t.click(); clicked = txt; break; }
    }
    await page.waitForTimeout(400);
    const after = await page.evaluate(() => document.querySelector('.cat-tab.active')?.textContent?.trim());
    record('smoke:cat-tab-switch', !!clicked && after === clicked, `before=${before} clicked=${clicked} after=${after}`);
    await page.close();
  }

  // 4. Game modal open/close via gcard click
  {
    const page = await browser.newPage();
    await blockExternal(page);
    await page.goto(`${BASE}/index.html`, { waitUntil: 'load' });
    await page.waitForTimeout(300);
    const card = await page.$('.gcard');
    let opened = false, closedOk = false;
    if (card) {
      await card.click();
      await page.waitForTimeout(300);
      opened = await page.evaluate(() => {
        const m = document.getElementById('cms-modal-game');
        return !!m && getComputedStyle(m).display !== 'none' && m.style.display !== 'none';
      });
      await page.keyboard.press('Escape');
      await page.waitForTimeout(300);
      closedOk = await page.evaluate(() => {
        const m = document.getElementById('cms-modal-game');
        return !m || getComputedStyle(m).display === 'none' || m.style.display === 'none';
      });
    }
    record('smoke:game-modal-open-close', !!card && opened && closedOk, `cardFound=${!!card} opened=${opened} closedOnEsc=${closedOk}`);
    await page.close();
  }

  // 5. Favorite toggle (localStorage) — index.html Lobby rails have no fav button;
  // use a CategoryView page (slots.html) where gcard-fav is rendered.
  {
    const page = await browser.newPage();
    await blockExternal(page);
    await page.goto(`${BASE}/slots.html`, { waitUntil: 'load' });
    await page.waitForTimeout(300);
    const favBtn = await page.$('.gcard-fav');
    let toggled = false;
    if (favBtn) {
      await favBtn.click();
      await page.waitForTimeout(200);
      toggled = await page.evaluate(() => {
        try { return JSON.parse(localStorage.getItem('lobby_favs_v1') || '[]').length > 0; }
        catch (e) { return false; }
      });
    }
    record('smoke:favorite-toggle', !!favBtn && toggled, `btnFound=${!!favBtn} persisted=${toggled}`);
    await page.close();
  }

  // 6. Skin/theme switch persists to CSS attr + localStorage
  {
    const page = await browser.newPage();
    await blockExternal(page);
    await page.goto(`${BASE}/index.html`, { waitUntil: 'load' });
    await page.waitForTimeout(300);
    const trigger = await page.$('.tb-skin-trigger');
    let applied = false, persisted = false, skinId = null;
    if (trigger) {
      await trigger.click();
      await page.waitForTimeout(200);
      const opt = await page.$('.tb-skin-option:not(.active)');
      if (opt) {
        skinId = await opt.getAttribute('data-skin');
        await opt.click();
        await page.waitForTimeout(200);
        applied = await page.evaluate((id) => document.documentElement.getAttribute('data-skin') === id, skinId);
        persisted = await page.evaluate((id) => localStorage.getItem('cms_skin') === id, skinId);
      }
    }
    record('smoke:skin-switch', !!trigger && applied && persisted, `trigger=${!!trigger} skin=${skinId} applied=${applied} persisted=${persisted}`);
    await page.close();
  }

  // 7. Sign-in modal open/close via avatar -> logout -> 登入 button chain
  {
    const page = await browser.newPage();
    await blockExternal(page);
    await page.goto(`${BASE}/index.html`, { waitUntil: 'load' });
    await page.waitForTimeout(300);
    let opened = false;
    const userCircle = await page.$('.tb-user-circle');
    if (userCircle) {
      await userCircle.click();
      await page.waitForTimeout(200);
      const logoutBtn = await page.$('[data-action="logout"]');
      if (logoutBtn) {
        await logoutBtn.click();
        await page.waitForTimeout(300);
      }
    }
    const loginBtn = await page.$('[data-action="open-signin"]');
    if (loginBtn) {
      await loginBtn.click();
      await page.waitForTimeout(300);
      opened = await page.evaluate(() => {
        const m = document.getElementById('cms-modal-signin');
        return !!m && getComputedStyle(m).display !== 'none' && m.style.display !== 'none';
      });
    }
    record('smoke:signin-modal', opened, `userCircle=${!!userCircle} loginBtnFound=${!!loginBtn} opened=${opened}`);
    await page.close();
  }

  // 8. file:// direct-open sanity (index only, per project convention)
  {
    const page = await browser.newPage();
    await page.route('**/*', (route) => {
      const url = route.request().url();
      if (url.indexOf('fonts.googleapis.com') !== -1 || url.indexOf('fonts.gstatic.com') !== -1) {
        return route.abort();
      }
      return route.continue();
    });
    const errors = [];
    page.on('requestfailed', (req) => {
      const url = req.url();
      if (url.indexOf('file://') === 0) errors.push(`requestfailed: ${url}`);
    });
    page.on('pageerror', (err) => errors.push(String(err)));
    const fileUrl = 'file://' + path.join(ROOT, 'index.html');
    let themeOk = false, bannerChanged = false;
    try {
      await page.goto(fileUrl, { waitUntil: 'load', timeout: 15000 });
      await page.waitForTimeout(300);
      const before = await page.evaluate(() => document.querySelector('.hero-slide.active') &&
        Array.from(document.querySelectorAll('.hero-slide')).indexOf(document.querySelector('.hero-slide.active')));
      await page.click('.hero-controls .icon-btn[aria-label="Next"]');
      await page.waitForTimeout(300);
      const after = await page.evaluate(() => document.querySelector('.hero-slide.active') &&
        Array.from(document.querySelectorAll('.hero-slide')).indexOf(document.querySelector('.hero-slide.active')));
      bannerChanged = before !== after;
      themeOk = await page.evaluate(() => !!document.documentElement.getAttribute('data-skin'));
    } catch (e) { errors.push(String(e)); }
    record('file://:index-console', errors.length === 0, errors.slice(0, 2).join(' | '));
    record('file://:index-smoke', themeOk && bannerChanged, `themeOk=${themeOk} bannerChanged=${bannerChanged}`);
    await page.close();
  }

  await browser.close();

  console.log('=== RESULTS ===');
  let pass = 0;
  for (const r of results) {
    console.log(`${r.ok ? 'OK  ' : 'FAIL'}  ${r.name}   ${r.detail}`);
    if (r.ok) pass++;
  }
  console.log('---');
  console.log(`${pass}/${results.length} passed`);
  process.exit(pass === results.length ? 0 : 1);
})();
