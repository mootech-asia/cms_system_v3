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
    name: 'Ticket Burst',
    description: 'Ticket cuts, perforated edges, and prize-coupon energy for campaigns and rewards.',
    character: 'Event / ticketed',
    tokens: {
      radius: '10px',
      border: '1px dashed color-mix(in oklch, var(--accent) 62%, var(--line-hi))',
      surface: 'linear-gradient(135deg, color-mix(in oklch, var(--accent) 16%, var(--bg-card)) 0 28%, var(--bg-card) 28% 72%, color-mix(in oklch, var(--accent-2) 14%, var(--bg-card)) 72% 100%)',
      shadow: '0 12px 0 color-mix(in oklch, var(--accent) 18%, transparent)',
      inset: 'inset 0 0 0 1px color-mix(in oklch, var(--text) 8%, transparent)',
      backdrop: 'none',
      clip: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)',
      space: '18px',
      gap: '14px',
      weight: 'var(--weight-bold)',
      hover: 'translateY(-4px) rotate(-.3deg)',
      motif: '"TICKET"',
      motifSize: '46px',
      motifOpacity: '.14',
    },
  }),
  Object.freeze({
    id: 'v3',
    name: 'Machine Bay',
    description: 'Arcade-machine housings, heavy rims, and control-panel proportions.',
    character: 'Machine / dimensional',
    tokens: {
      radius: '22px 22px 8px 8px',
      border: '2px solid color-mix(in oklch, var(--text) 18%, var(--line-hi))',
      surface: 'linear-gradient(180deg, color-mix(in oklch, var(--bg-card-hi) 82%, var(--accent) 18%), var(--bg-card) 42%, color-mix(in oklch, var(--bg-elev) 78%, black 22%))',
      shadow: '0 18px 36px rgba(0, 0, 0, .28)',
      inset: 'inset 0 6px 0 color-mix(in oklch, var(--accent) 32%, transparent), inset 0 -10px 0 color-mix(in oklch, black 18%, transparent)',
      backdrop: 'none',
      clip: 'none',
      space: '20px',
      gap: '14px',
      weight: 'var(--weight-bold)',
      hover: 'translateY(-5px) scale(1.015)',
      motif: '"777"',
      motifSize: '58px',
      motifOpacity: '.18',
    },
  }),
  Object.freeze({
    id: 'v4',
    name: 'Cash Glass',
    description: 'Translucent depth, money watermarks, and soft high-roller highlights.',
    character: 'Cash / glass',
    tokens: {
      radius: '18px',
      border: '1px solid color-mix(in oklch, var(--accent-2) 24%, transparent)',
      surface: 'linear-gradient(145deg, color-mix(in oklch, var(--bg-card) 68%, transparent), color-mix(in oklch, var(--accent) 10%, transparent))',
      shadow: '0 20px 46px rgba(0, 0, 0, .20)',
      inset: 'inset 0 1px 0 color-mix(in oklch, white 18%, transparent), inset 0 -1px 0 color-mix(in oklch, var(--accent) 16%, transparent)',
      backdrop: 'blur(20px) saturate(1.18)',
      clip: 'none',
      space: '20px',
      gap: '16px',
      weight: 'var(--weight-semibold)',
      hover: 'translateY(-4px)',
      motif: '"$"',
      motifSize: '76px',
      motifOpacity: '.12',
    },
  }),
  Object.freeze({
    id: 'v5',
    name: 'Lightning Cut',
    description: 'Aggressive diagonals, electric edge lines, and fast-action energy.',
    character: 'Lightning / sharp',
    tokens: {
      radius: '2px',
      border: '1px solid color-mix(in oklch, var(--accent) 72%, var(--line-hi))',
      surface: 'linear-gradient(110deg, color-mix(in oklch, var(--accent) 18%, var(--bg-elev)) 0 44%, var(--bg-elev) 44% 58%, color-mix(in oklch, var(--accent-2) 18%, var(--bg-elev)) 58% 100%)',
      shadow: '0 0 0 1px color-mix(in oklch, var(--accent) 20%, transparent), 0 18px 28px color-mix(in oklch, var(--accent) 16%, transparent)',
      inset: 'inset 6px 0 0 var(--accent), inset -1px 0 0 color-mix(in oklch, var(--accent-2) 40%, transparent)',
      backdrop: 'none',
      clip: 'polygon(0 0, calc(100% - 22px) 0, 100% 22px, calc(100% - 10px) 100%, 18px 100%, 0 calc(100% - 18px))',
      space: '18px',
      gap: '10px',
      weight: 'var(--weight-bold)',
      hover: 'translateX(5px)',
      motif: '"ZAP"',
      motifSize: '44px',
      motifOpacity: '.18',
    },
  }),
  Object.freeze({
    id: 'v6',
    name: 'Jackpot Stage',
    description: 'Spotlight depth, prize-stage framing, and marquee jackpot markers.',
    character: 'Stage / jackpot',
    tokens: {
      radius: '26px 26px 14px 14px',
      border: '1px solid color-mix(in oklch, var(--accent) 42%, var(--line-hi))',
      surface: 'radial-gradient(circle at 50% 0%, color-mix(in oklch, var(--accent) 24%, transparent), transparent 42%), linear-gradient(180deg, var(--bg-card-hi), var(--bg-card))',
      shadow: '0 24px 56px rgba(0, 0, 0, .30)',
      inset: 'inset 0 2px 0 color-mix(in oklch, var(--accent-2) 38%, transparent), inset 0 -8px 0 color-mix(in oklch, black 10%, transparent)',
      backdrop: 'none',
      clip: 'none',
      space: '22px',
      gap: '16px',
      weight: 'var(--weight-bold)',
      hover: 'translateY(-6px)',
      motif: '"JACKPOT"',
      motifSize: '38px',
      motifOpacity: '.16',
    },
  }),
  Object.freeze({
    id: 'v7',
    name: 'Trading Dense',
    description: 'Compact trading-console panels, ticks, and data-dense scanning.',
    character: 'Dense / data',
    tokens: {
      radius: '3px',
      border: '1px solid color-mix(in oklch, var(--line-hi) 82%, transparent)',
      surface: 'repeating-linear-gradient(90deg, transparent 0 18px, color-mix(in oklch, var(--line) 54%, transparent) 18px 19px), repeating-linear-gradient(0deg, transparent 0 22px, color-mix(in oklch, var(--line) 48%, transparent) 22px 23px), var(--bg-card)',
      shadow: 'inset 0 0 0 1px color-mix(in oklch, var(--accent) 12%, transparent)',
      inset: 'none',
      backdrop: 'none',
      clip: 'none',
      space: '9px',
      gap: '6px',
      weight: 'var(--weight-medium)',
      hover: 'translateY(-1px) scale(.995)',
      motif: '"01"',
      motifSize: '34px',
      motifOpacity: '.12',
    },
  }),
  Object.freeze({
    id: 'v8',
    name: 'Luxe Magazine',
    description: 'Wide whitespace, ruled editorial composition, and premium object placement.',
    character: 'Luxe / editorial',
    tokens: {
      radius: '0px',
      border: '1px solid color-mix(in oklch, var(--text) 16%, transparent)',
      surface: 'linear-gradient(90deg, transparent 0 12%, color-mix(in oklch, var(--bg-card) 72%, transparent) 12% 100%)',
      shadow: 'none',
      inset: 'inset 0 4px 0 var(--accent), inset 0 -1px 0 color-mix(in oklch, var(--text) 9%, transparent)',
      backdrop: 'none',
      clip: 'none',
      space: '28px',
      gap: '20px',
      weight: 'var(--weight-bold)',
      hover: 'translateY(-3px)',
      motif: '"VIP"',
      motifSize: '52px',
      motifOpacity: '.10',
    },
  }),
  Object.freeze({
    id: 'v9',
    name: 'Ledger Note',
    description: 'Financial grids, serial-number cues, and banknote-inspired details.',
    character: 'Ledger / finance',
    tokens: {
      radius: '8px',
      border: '1px solid color-mix(in oklch, var(--accent-2) 34%, var(--line-hi))',
      surface: 'radial-gradient(circle at 12% 50%, color-mix(in oklch, var(--accent) 10%, transparent) 0 18%, transparent 19%), repeating-linear-gradient(0deg, transparent 0 28px, color-mix(in oklch, var(--line) 76%, transparent) 28px 29px), var(--bg-card)',
      shadow: '0 10px 0 color-mix(in oklch, var(--bg-elev) 78%, transparent)',
      inset: 'inset 0 1px 0 color-mix(in oklch, var(--text) 8%, transparent), inset 0 0 0 5px color-mix(in oklch, var(--accent) 5%, transparent)',
      backdrop: 'none',
      clip: 'none',
      space: '16px',
      gap: '12px',
      weight: 'var(--weight-semibold)',
      hover: 'translateY(-2px)',
      motif: '"$"',
      motifSize: '58px',
      motifOpacity: '.11',
    },
  }),
  Object.freeze({
    id: 'v10',
    name: 'Signal Rail',
    description: 'Heavy rails, directional arrows, and high-visibility state markers.',
    character: 'Directional / assertive',
    tokens: {
      radius: '12px 4px 4px 12px',
      border: '1px solid color-mix(in oklch, var(--accent) 46%, var(--line))',
      surface: 'linear-gradient(90deg, color-mix(in oklch, var(--accent) 18%, var(--bg-card)) 0 18%, var(--bg-card) 18% 100%)',
      shadow: '0 12px 24px color-mix(in oklch, var(--accent) 12%, transparent)',
      inset: 'inset 7px 0 0 var(--accent), inset -1px 0 0 color-mix(in oklch, var(--accent-2) 32%, transparent)',
      backdrop: 'none',
      clip: 'none',
      space: '18px',
      gap: '12px',
      weight: 'var(--weight-bold)',
      hover: 'translateX(5px)',
      motif: '">>"',
      motifSize: '42px',
      motifOpacity: '.16',
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
