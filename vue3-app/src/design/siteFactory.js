export const LOBBY_LAYOUT_STORAGE_KEY = 'cms-v3:lobby-layout';
export const LEGACY_LOBBY_ORDER_STORAGE_KEY = 'cms-v3:lobby-section-order';

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

export function readLobbyLayout(storage = window.localStorage) {
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
