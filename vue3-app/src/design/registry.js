export const DESIGN_STORAGE_KEY = 'cms-v3:design-modules';
export const DESIGN_SCHEMA_VERSION = 1;

export const DESIGN_VARIANTS = Object.freeze([
  Object.freeze({
    id: 'v1',
    name: 'Foundation',
    description: 'The current CMS v3 design. This remains the compatibility baseline.',
    character: 'Balanced / familiar',
    tokens: {
      radius: 'var(--radius-card)',
      border: '1px solid var(--line)',
      surface: 'var(--bg-card)',
      shadow: 'none',
      inset: 'none',
      backdrop: 'none',
      clip: 'none',
      space: '16px',
      gap: '12px',
      weight: 'var(--weight-semibold)',
      hover: 'translateY(-1px)',
    },
  }),
  Object.freeze({
    id: 'v2',
    name: 'Precision Frame',
    description: 'Crisp borders, restrained corners, and a professional exchange-style rhythm.',
    character: 'Structured / precise',
    tokens: {
      radius: '4px',
      border: '1px solid var(--line-hi)',
      surface: 'var(--bg-card)',
      shadow: 'none',
      inset: 'inset 0 1px 0 color-mix(in oklch, var(--text) 7%, transparent)',
      backdrop: 'none',
      clip: 'none',
      space: '15px',
      gap: '10px',
      weight: 'var(--weight-semibold)',
      hover: 'translateY(-1px)',
    },
  }),
  Object.freeze({
    id: 'v3',
    name: 'Capsule Flow',
    description: 'Soft continuous geometry for approachable consumer-facing journeys.',
    character: 'Soft / fluid',
    tokens: {
      radius: '24px',
      border: '1px solid var(--line)',
      surface: 'color-mix(in oklch, var(--bg-card-hi) 72%, var(--bg-card))',
      shadow: 'none',
      inset: 'inset 0 1px 0 color-mix(in oklch, var(--text) 6%, transparent)',
      backdrop: 'none',
      clip: 'none',
      space: '18px',
      gap: '12px',
      weight: 'var(--weight-semibold)',
      hover: 'translateY(-1px)',
    },
  }),
  Object.freeze({
    id: 'v4',
    name: 'Frosted Layer',
    description: 'Translucent depth with a restrained Web3 glass treatment and clear contrast.',
    character: 'Layered / transparent',
    tokens: {
      radius: '16px',
      border: '1px solid color-mix(in oklch, var(--text) 14%, transparent)',
      surface: 'color-mix(in oklch, var(--bg-card) 76%, transparent)',
      shadow: '0 12px 30px rgba(0, 0, 0, .16)',
      inset: 'inset 0 1px 0 color-mix(in oklch, var(--text) 9%, transparent)',
      backdrop: 'blur(18px) saturate(1.08)',
      clip: 'none',
      space: '18px',
      gap: '12px',
      weight: 'var(--weight-semibold)',
      hover: 'translateY(-2px)',
    },
  }),
  Object.freeze({
    id: 'v5',
    name: 'Terminal Cut',
    description: 'Chamfered fintech geometry with compact technical detailing.',
    character: 'Technical / angular',
    tokens: {
      radius: '2px',
      border: '1px solid var(--line-hi)',
      surface: 'var(--bg-elev)',
      shadow: 'none',
      inset: 'inset 0 1px 0 color-mix(in oklch, var(--accent) 24%, transparent)',
      backdrop: 'none',
      clip: 'polygon(0 0, calc(100% - 14px) 0, 100% 14px, 100% 100%, 14px 100%, 0 calc(100% - 14px))',
      space: '16px',
      gap: '10px',
      weight: 'var(--weight-semibold)',
      hover: 'translateY(-1px)',
    },
  }),
  Object.freeze({
    id: 'v6',
    name: 'Elevated Slate',
    description: 'Premium floating surfaces with controlled depth and no decorative glow.',
    character: 'Premium / elevated',
    tokens: {
      radius: '14px',
      border: '1px solid color-mix(in oklch, var(--line-hi) 74%, transparent)',
      surface: 'var(--bg-card-hi)',
      shadow: '0 16px 34px rgba(0, 0, 0, .22)',
      inset: 'inset 0 1px 0 color-mix(in oklch, var(--text) 7%, transparent)',
      backdrop: 'none',
      clip: 'none',
      space: '18px',
      gap: '14px',
      weight: 'var(--weight-bold)',
      hover: 'translateY(-3px)',
    },
  }),
  Object.freeze({
    id: 'v7',
    name: 'Compact Matrix',
    description: 'Dense operational layout optimized for repeated scanning and fast decisions.',
    character: 'Dense / efficient',
    tokens: {
      radius: '6px',
      border: '1px solid var(--line)',
      surface: 'var(--bg-card)',
      shadow: 'none',
      inset: 'none',
      backdrop: 'none',
      clip: 'none',
      space: '10px',
      gap: '7px',
      weight: 'var(--weight-medium)',
      hover: 'translateY(-1px)',
    },
  }),
  Object.freeze({
    id: 'v8',
    name: 'Editorial Luxe',
    description: 'Generous spacing, confident typography, and a quiet premium accent rule.',
    character: 'Editorial / spacious',
    tokens: {
      radius: '0px',
      border: '1px solid transparent',
      surface: 'transparent',
      shadow: 'none',
      inset: 'inset 0 2px 0 var(--accent)',
      backdrop: 'none',
      clip: 'none',
      space: '24px',
      gap: '16px',
      weight: 'var(--weight-bold)',
      hover: 'translateY(-1px)',
    },
  }),
  Object.freeze({
    id: 'v9',
    name: 'Ledger Grid',
    description: 'Subtle financial gridlines create a data-first institutional character.',
    character: 'Analytical / data-first',
    tokens: {
      radius: '8px',
      border: '1px solid var(--line-hi)',
      surface: 'repeating-linear-gradient(0deg, transparent 0 31px, color-mix(in oklch, var(--line) 72%, transparent) 31px 32px), var(--bg-card)',
      shadow: 'none',
      inset: 'inset 0 1px 0 color-mix(in oklch, var(--text) 5%, transparent)',
      backdrop: 'none',
      clip: 'none',
      space: '14px',
      gap: '10px',
      weight: 'var(--weight-semibold)',
      hover: 'translateY(-1px)',
    },
  }),
  Object.freeze({
    id: 'v10',
    name: 'Signal Rail',
    description: 'A clear semantic edge marker for high-visibility navigation and actions.',
    character: 'Directional / assertive',
    tokens: {
      radius: '8px',
      border: '1px solid var(--line)',
      surface: 'color-mix(in oklch, var(--accent) 7%, var(--bg-card))',
      shadow: 'none',
      inset: 'inset 4px 0 0 var(--accent)',
      backdrop: 'none',
      clip: 'none',
      space: '16px',
      gap: '10px',
      weight: 'var(--weight-bold)',
      hover: 'translateX(2px)',
    },
  }),
]);

export const DESIGN_MODULES = Object.freeze([
  Object.freeze({ id: 'game-card', label: 'Game Cards', category: 'Content', description: 'Artwork, metadata, status, and hover treatment.' }),
  Object.freeze({ id: 'promotion-card', label: 'Promotion Cards', category: 'Content', description: 'Campaign artwork, offer copy, and calls to action.' }),
  Object.freeze({ id: 'banner', label: 'Hero & Banners', category: 'Content', description: 'Primary campaign and feature media containers.' }),
  Object.freeze({ id: 'ticker', label: 'Ticker & Marquee', category: 'Content', description: 'Announcements, values, and real-time information.' }),
  Object.freeze({ id: 'button', label: 'Buttons', category: 'Controls', description: 'Primary, secondary, quiet, and destructive commands.' }),
  Object.freeze({ id: 'tabs', label: 'Tabs & Filters', category: 'Controls', description: 'Page tabs, category tabs, provider tags, and filters.' }),
  Object.freeze({ id: 'form', label: 'Form Controls', category: 'Controls', description: 'Inputs, selects, date controls, and field groups.' }),
  Object.freeze({ id: 'tag', label: 'Tags & Badges', category: 'Controls', description: 'Status, tier, count, and game metadata labels.' }),
  Object.freeze({ id: 'table', label: 'Tables', category: 'Data', description: 'Record tables, leaderboard rows, and totals.' }),
  Object.freeze({ id: 'profile', label: 'Profile & Member', category: 'Data', description: 'Member identity, progress, balance, and rollover.' }),
  Object.freeze({ id: 'panel', label: 'Panels & Cards', category: 'Structure', description: 'Account panels, dashboards, and framed tools.' }),
  Object.freeze({ id: 'navigation', label: 'Navigation', category: 'Structure', description: 'Sidebar entries and primary navigation states.' }),
  Object.freeze({ id: 'section-title', label: 'Titles & Sections', category: 'Structure', description: 'Page titles, section headings, and count hierarchy.' }),
  Object.freeze({ id: 'modal', label: 'Dialogs & Modals', category: 'Structure', description: 'Focused tasks, confirmations, and overlays.' }),
]);

export const DEFAULT_DESIGN_MODULES = Object.freeze(
  Object.fromEntries(DESIGN_MODULES.map((module) => [module.id, 'v1']))
);

const VARIANT_IDS = new Set(DESIGN_VARIANTS.map((variant) => variant.id));

export function normalizeDesignModules(value = {}) {
  return Object.fromEntries(
    DESIGN_MODULES.map((module) => [
      module.id,
      VARIANT_IDS.has(value[module.id]) ? value[module.id] : DEFAULT_DESIGN_MODULES[module.id],
    ])
  );
}

export function getDesignVariant(id) {
  return DESIGN_VARIANTS.find((variant) => variant.id === id) || DESIGN_VARIANTS[0];
}

export function makeDesignAttributes(modules) {
  return Object.fromEntries(
    DESIGN_MODULES.map((module) => [`data-ui-${module.id}`, modules[module.id]])
  );
}

export function makeDesignStyle(modules) {
  const style = {};
  DESIGN_MODULES.forEach((module) => {
    const variant = getDesignVariant(modules[module.id]);
    Object.entries(variant.tokens).forEach(([token, value]) => {
      style[`--ui-${module.id}-${token}`] = value;
    });
    const shadows = [variant.tokens.shadow, variant.tokens.inset].filter((value) => value && value !== 'none');
    style[`--ui-${module.id}-shadow-stack`] = shadows.join(', ') || 'none';
  });
  return style;
}
