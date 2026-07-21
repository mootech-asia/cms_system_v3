/* CMS_設計後台_v3 — 靜態版行為層(vanilla)。右側 iframe 載入真實前台頁;
 * 選皮膚即時反映(同源複刻 site.js applySkin:設 data-skin + data-theme,皮膚 CSS 已靜態載入)。
 * 「套用到本站」寫 localStorage cms_skin/cms_theme(site.js restoreSkin 既有合約)—— 免改 site.js。
 * SKINS 對照 assets/js/site.js 的 SKINS(靜態站無共用匯出,故此處列同一份 id/label/theme/swatch)。 */
(function () {
  'use strict';
  var SKINS = [
    { id: 'white', label: 'Pearl Signature', theme: 'light', swatch: '#4d4941' },
    { id: 'sage-atelier', label: 'Sage Atelier', theme: 'light', swatch: '#9ab7ac' },
    { id: 'night-esports-green', label: 'Emerald Nocturne', theme: 'dark', swatch: '#9fe2d1' },
    { id: 'arctic-cyan', label: 'Arctic Cyan', theme: 'dark', swatch: '#62c8d8' },
    { id: 'midnight-gold', label: 'Midnight Gold', theme: 'dark', swatch: '#d2b465' },
    { id: 'obsidian-copper', label: 'Obsidian Copper', theme: 'dark', swatch: '#d8a06b' },
    { id: 'crimson-noir', label: 'Crimson Noir', theme: 'dark', swatch: '#df7b89' },
    { id: 'blue', label: 'Sapphire Royale', theme: 'dark', swatch: '#2473ff' },
    { id: 'cosmic-spectrum-purple', label: 'Cosmic Amethyst', theme: 'dark', swatch: '#6a48ff' }
  ];
  var PAGES = [
    { label: '大廳 Lobby', file: 'index.html' },
    { label: 'Hot Games', file: 'hot-games.html' },
    { label: 'Live', file: 'live.html' },
    { label: 'Slots', file: 'slots.html' },
    { label: 'Fish', file: 'fish.html' },
    { label: 'Sports', file: 'sports.html' },
    { label: 'Promotion', file: 'promotion.html' },
    { label: 'Account', file: 'account-overview.html' },
    { label: 'Deposit', file: 'deposit.html' },
    { label: 'Support', file: 'support.html' }
  ];
  var DEFAULT_ID = 'blue';

  function findSkin(id) { for (var i = 0; i < SKINS.length; i++) if (SKINS[i].id === id) return SKINS[i]; return null; }
  var $ = function (id) { return document.getElementById(id); };
  var frame = $('st-frame');
  var statusEl = $('st-status');

  var savedId = null;
  try { savedId = localStorage.getItem('cms_skin'); } catch (e) {}
  var draft = { skin: findSkin(savedId) ? savedId : DEFAULT_ID };

  function setStatus(msg) {
    statusEl.textContent = msg || '';
    if (msg) setTimeout(function () { if (statusEl.textContent === msg) statusEl.textContent = ''; }, 2500);
  }

  /* 複刻 site.js applySkin(同源 iframe 直接操作,免改 site.js) */
  function applySkinToFrame(id) {
    var s = findSkin(id) || findSkin(DEFAULT_ID);
    try {
      var doc = frame.contentDocument;
      if (!doc || !doc.documentElement) return;
      doc.documentElement.setAttribute('data-skin', s.id);
      doc.documentElement.setAttribute('data-theme', s.theme);
    } catch (e) { /* cross-doc during nav */ }
  }
  /* 切頁後不能只靠 iframe 'load'(前台含外部圖,load 會被卡住/延遲);改用短時間輪詢
     重套,確保套在前台 DOMContentLoaded(restoreSkin)之後,贏過其預設皮膚競態。 */
  var _reapplyTimer = null;
  function scheduleApply() {
    if (_reapplyTimer) clearInterval(_reapplyTimer);
    var n = 0;
    _reapplyTimer = setInterval(function () {
      applySkinToFrame(draft.skin);
      if (++n >= 24) { clearInterval(_reapplyTimer); _reapplyTimer = null; }
    }, 150);
  }

  function renderSkins() {
    var wrap = $('st-skins');
    wrap.innerHTML = SKINS.map(function (s) {
      var active = s.id === draft.skin;
      return '<button type="button" class="st-skin' + (active ? ' active' : '') + '" role="option" aria-selected="' + active + '" data-skin="' + s.id + '">' +
        '<span class="st-swatch" style="background:' + s.swatch + '"></span>' +
        '<span class="st-skin-label">' + s.label + '</span>' +
        '<span class="st-skin-check" aria-hidden="true">✓</span></button>';
    }).join('');
    Array.prototype.forEach.call(wrap.querySelectorAll('.st-skin'), function (btn) {
      btn.addEventListener('click', function () {
        draft.skin = btn.getAttribute('data-skin');
        renderSkinsActive();
        applySkinToFrame(draft.skin);
      });
    });
  }
  function renderSkinsActive() {
    Array.prototype.forEach.call(document.querySelectorAll('.st-skin'), function (btn) {
      var active = btn.getAttribute('data-skin') === draft.skin;
      btn.classList.toggle('active', active);
      btn.setAttribute('aria-selected', String(active));
    });
  }

  function renderPages() {
    var sel = $('st-page');
    sel.innerHTML = PAGES.map(function (p, i) {
      return '<option value="' + p.file + '"' + (i === 0 ? ' selected' : '') + '>' + p.label + '</option>';
    }).join('');
    sel.addEventListener('change', function () {
      var p = PAGES.filter(function (x) { return x.file === sel.value; })[0];
      $('st-preview-label').textContent = '即時預覽 — ' + (p ? p.label : sel.value);
      frame.src = '../' + sel.value;
      scheduleApply();
    });
  }

  $('st-apply').addEventListener('click', function () {
    var s = findSkin(draft.skin) || findSkin(DEFAULT_ID);
    try { localStorage.setItem('cms_skin', s.id); localStorage.setItem('cms_theme', s.theme); } catch (e) {}
    setStatus('已套用到本站 ✓');
  });
  $('st-reset').addEventListener('click', function () {
    var sid = null; try { sid = localStorage.getItem('cms_skin'); } catch (e) {}
    draft.skin = findSkin(sid) ? sid : DEFAULT_ID;
    renderSkinsActive();
    applySkinToFrame(draft.skin);
    setStatus('已重設為目前線上設定');
  });

  frame.addEventListener('load', function () { applySkinToFrame(draft.skin); });

  renderSkins();
  renderPages();
  scheduleApply(); /* 首次 iframe 載入也套用當前草稿皮膚 */
})();
