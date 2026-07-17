import { DEFAULT_SKIN, SKINS } from '../skins/index.js';
import { LANGS } from '../data/i18n.js';
import { HERO_SLIDES } from '../data/index.js';

export const LOBBY_LAYOUT_STORAGE_KEY = 'cms-v3:lobby-layout';
export const LEGACY_LOBBY_ORDER_STORAGE_KEY = 'cms-v3:lobby-section-order';
export const SKIN_VISIBILITY_STORAGE_KEY = 'cms-v3:visible-skins';
export const LOCALE_VISIBILITY_STORAGE_KEY = 'cms-v3:visible-locales';
export const STUDIO_DRAFT_STORAGE_KEY = 'cms-v3:studio-draft';
export const STUDIO_PREVIEW_QUERY_PARAM = 'studio-preview';

export function isStudioPreviewMode() {
  if (typeof window === 'undefined') return false;
  try {
    return new URLSearchParams(window.location.search).has(STUDIO_PREVIEW_QUERY_PARAM);
  } catch {
    return false;
  }
}

export function readStudioDraft(storage = window.localStorage) {
  try {
    const raw = storage.getItem(STUDIO_DRAFT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
  }
}

export function writeStudioDraft(draft, storage = window.localStorage) {
  try {
    storage.setItem(STUDIO_DRAFT_STORAGE_KEY, JSON.stringify({ ...draft, updatedAt: new Date().toISOString() }));
  } catch {
    // Live preview still degrades gracefully when persistent storage is unavailable.
  }
}

export function clearStudioDraft(storage = window.localStorage) {
  try {
    storage.removeItem(STUDIO_DRAFT_STORAGE_KEY);
  } catch {
    // Ignore.
  }
}

export const DEFAULT_LOBBY_SECTION_ORDER = Object.freeze([
  'recently-played',
  'slots',
  'live-casino',
  'live-sport',
  'top-wins',
  'promotions',
  'providers',
]);

export const LEGACY_DEFAULT_LOBBY_SECTION_ORDERS = Object.freeze([
  ['recently-played', 'slots', 'live-casino', 'top-wins', 'live-sport', 'promotions', 'providers'],
  ['recently-played', 'slots', 'live-casino', 'live-sport', 'promotions', 'top-wins', 'providers'],
]);

export const DEFAULT_VISIBLE_SKIN_IDS = Object.freeze(SKINS.map((skin) => skin.id));

export const LOBBY_SECTION_LABELS = Object.freeze({
  'recently-played': 'Recently played',
  slots: 'Slots',
  'live-casino': 'Live Casino',
  'top-wins': 'Top wins',
  'live-sport': 'Live sport',
  promotions: 'Promotions',
  providers: 'Providers',
});

export function normalizeLobbyOrder(value) {
  const input = Array.isArray(value) ? value : [];
  const known = input.filter((id) => DEFAULT_LOBBY_SECTION_ORDER.includes(id));
  const missing = DEFAULT_LOBBY_SECTION_ORDER.filter((id) => !known.includes(id));
  const normalized = [...new Set([...known, ...missing])];
  const isLegacyDefault = LEGACY_DEFAULT_LOBBY_SECTION_ORDERS.some((order) =>
    order.length === normalized.length && order.every((id, index) => id === normalized[index])
  );
  return isLegacyDefault ? [...DEFAULT_LOBBY_SECTION_ORDER] : normalized;
}

export function normalizeHiddenSections(value) {
  return [...new Set((Array.isArray(value) ? value : [])
    .filter((id) => DEFAULT_LOBBY_SECTION_ORDER.includes(id)))];
}

export const DEFAULT_VISIBLE_LOCALE_IDS = Object.freeze(Object.keys(LANGS));

export function normalizeVisibleLocaleIds(value) {
  const ids = Array.isArray(value) ? value : [];
  const known = new Set(ids);
  const normalized = DEFAULT_VISIBLE_LOCALE_IDS.filter((id) => known.has(id));
  return normalized.length ? normalized : [...DEFAULT_VISIBLE_LOCALE_IDS];
}

export function readVisibleLocaleIds(storage = window.localStorage) {
  if (isStudioPreviewMode()) {
    const draft = readStudioDraft(storage);
    if (draft?.visibleLocaleIds) return normalizeVisibleLocaleIds(draft.visibleLocaleIds);
  }
  try {
    const saved = JSON.parse(storage.getItem(LOCALE_VISIBILITY_STORAGE_KEY));
    return normalizeVisibleLocaleIds(saved);
  } catch {
    return [...DEFAULT_VISIBLE_LOCALE_IDS];
  }
}

export function writeVisibleLocaleIds(ids, storage = window.localStorage) {
  const normalized = normalizeVisibleLocaleIds(ids);
  try {
    storage.setItem(LOCALE_VISIBILITY_STORAGE_KEY, JSON.stringify(normalized));
  } catch {
    // Locale visibility still works for the current session when storage is unavailable.
  }
  return normalized;
}

export function normalizeVisibleSkinIds(value) {
  const ids = Array.isArray(value) ? value : [];
  const known = new Set(ids);
  const normalized = SKINS
    .map((skin) => skin.id)
    .filter((id) => known.has(id));

  if (normalized.length) return normalized;
  return DEFAULT_VISIBLE_SKIN_IDS.includes(DEFAULT_SKIN)
    ? [...DEFAULT_VISIBLE_SKIN_IDS]
    : [SKINS[0].id];
}

export function readLobbyLayout(storage = window.localStorage) {
  if (isStudioPreviewMode()) {
    const draft = readStudioDraft(storage);
    if (draft?.layout) {
      return {
        order: normalizeLobbyOrder(draft.layout.order),
        hidden: normalizeHiddenSections(draft.layout.hidden),
      };
    }
  }
  try {
    const saved = JSON.parse(storage.getItem(LOBBY_LAYOUT_STORAGE_KEY));
    if (saved && typeof saved === 'object') {
      return {
        order: normalizeLobbyOrder(saved.order),
        hidden: normalizeHiddenSections(saved.hidden),
      };
    }
    const legacyOrder = JSON.parse(storage.getItem(LEGACY_LOBBY_ORDER_STORAGE_KEY));
    return { order: normalizeLobbyOrder(legacyOrder), hidden: [] };
  } catch {
    return { order: [...DEFAULT_LOBBY_SECTION_ORDER], hidden: [] };
  }
}

export function writeLobbyLayout(layout, storage = window.localStorage) {
  const normalized = {
    order: normalizeLobbyOrder(layout?.order),
    hidden: normalizeHiddenSections(layout?.hidden),
  };
  try {
    storage.setItem(LOBBY_LAYOUT_STORAGE_KEY, JSON.stringify({ version: 1, ...normalized }));
    storage.setItem(LEGACY_LOBBY_ORDER_STORAGE_KEY, JSON.stringify(normalized.order));
  } catch {
    // The draft remains usable when persistent storage is unavailable.
  }
  return normalized;
}

export function readVisibleSkinIds(storage = window.localStorage) {
  if (isStudioPreviewMode()) {
    const draft = readStudioDraft(storage);
    if (draft?.visibleSkinIds) return normalizeVisibleSkinIds(draft.visibleSkinIds);
  }
  try {
    const saved = JSON.parse(storage.getItem(SKIN_VISIBILITY_STORAGE_KEY));
    return normalizeVisibleSkinIds(saved);
  } catch {
    return [...DEFAULT_VISIBLE_SKIN_IDS];
  }
}

export function writeVisibleSkinIds(ids, storage = window.localStorage) {
  const normalized = normalizeVisibleSkinIds(ids);
  try {
    storage.setItem(SKIN_VISIBILITY_STORAGE_KEY, JSON.stringify(normalized));
  } catch {
    // Skin visibility still works for the current session when storage is unavailable.
  }
  return normalized;
}

export const HERO_BANNERS_STORAGE_KEY = 'cms-v3:hero-banners';

export function defaultHeroBanners() {
  return HERO_SLIDES.map((slide, index) => ({
    id: `default-${index + 1}`,
    label: slide.title.replace('\n', ' '),
    image: slide.image,
    position: slide.position || 'center',
    mobilePosition: slide.mobilePosition || slide.position || 'center',
  }));
}

export function normalizeHeroBanners(value) {
  const list = Array.isArray(value) ? value : [];
  const normalized = list
    .filter((item) => item && typeof item.image === 'string' && item.image)
    .map((item, index) => ({
      id: typeof item.id === 'string' && item.id ? item.id : `banner-${index + 1}`,
      label: typeof item.label === 'string' && item.label ? item.label : `Banner ${index + 1}`,
      image: item.image,
      position: typeof item.position === 'string' && item.position ? item.position : 'center',
      mobilePosition: typeof item.mobilePosition === 'string' && item.mobilePosition
        ? item.mobilePosition
        : (item.position || 'center'),
    }));
  return normalized.length ? normalized : defaultHeroBanners();
}

export function readHeroBanners(storage = window.localStorage) {
  if (isStudioPreviewMode()) {
    const draft = readStudioDraft(storage);
    if (draft?.banners) return normalizeHeroBanners(draft.banners);
  }
  try {
    const saved = JSON.parse(storage.getItem(HERO_BANNERS_STORAGE_KEY));
    return saved ? normalizeHeroBanners(saved) : defaultHeroBanners();
  } catch {
    return defaultHeroBanners();
  }
}

export function writeHeroBanners(banners, storage = window.localStorage) {
  const normalized = normalizeHeroBanners(banners);
  try {
    storage.setItem(HERO_BANNERS_STORAGE_KEY, JSON.stringify(normalized));
  } catch {
    // The draft remains usable when persistent storage is unavailable.
  }
  return normalized;
}
