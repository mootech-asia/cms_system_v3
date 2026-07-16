import { reactive, readonly } from 'vue';
import {
  DEFAULT_DESIGN_MODULES,
  DESIGN_MODULES,
  DESIGN_SCHEMA_VERSION,
  DESIGN_STORAGE_KEY,
  DESIGN_VARIANTS,
  makeDesignAttributes,
  makeDesignStyle,
  normalizeDesignModules,
} from '@/design/registry.js';

const state = reactive({
  version: DESIGN_SCHEMA_VERSION,
  modules: { ...DEFAULT_DESIGN_MODULES },
  updatedAt: null,
});

let initialized = false;

function readSavedConfig() {
  try {
    const raw = localStorage.getItem(DESIGN_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : null;
  } catch {
    return null;
  }
}

function writeRootConfig(modules) {
  const root = document.documentElement;
  const attributes = makeDesignAttributes(modules);
  const style = makeDesignStyle(modules);

  Object.entries(attributes).forEach(([key, value]) => root.setAttribute(key, value));
  Object.entries(style).forEach(([key, value]) => root.style.setProperty(key, value));
}

function persist() {
  try {
    localStorage.setItem(DESIGN_STORAGE_KEY, JSON.stringify({
      version: DESIGN_SCHEMA_VERSION,
      modules: state.modules,
      updatedAt: state.updatedAt,
    }));
  } catch {
    // The active design still works when storage is unavailable.
  }
}

function applyConfig(config, { save = true } = {}) {
  state.modules = normalizeDesignModules(config?.modules || config);
  state.updatedAt = new Date().toISOString();
  writeRootConfig(state.modules);
  if (save) persist();
}

function resetConfig() {
  applyConfig({ modules: DEFAULT_DESIGN_MODULES });
}

function initialize() {
  if (initialized || typeof document === 'undefined') return;
  initialized = true;
  const saved = readSavedConfig();
  state.modules = normalizeDesignModules(saved?.modules);
  state.updatedAt = saved?.updatedAt || null;
  writeRootConfig(state.modules);
}

export function useDesignStudio() {
  initialize();

  return {
    design: readonly(state),
    modules: DESIGN_MODULES,
    variants: DESIGN_VARIANTS,
    applyConfig,
    resetConfig,
    makeDesignAttributes,
    makeDesignStyle,
    normalizeDesignModules,
  };
}
