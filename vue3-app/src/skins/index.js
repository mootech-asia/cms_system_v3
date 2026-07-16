import '../assets/skins/blue.css';
import '../assets/skins/night-esports-green.css';
import '../assets/skins/white.css';

export const DEFAULT_SKIN = 'blue';

export const SKINS = Object.freeze([
  Object.freeze({
    id: 'blue',
    label: 'Blue',
    theme: 'dark',
    swatch: '#2473ff',
    surface: '#05080f',
  }),
  Object.freeze({
    id: 'night-esports-green',
    label: 'Night Esports Green',
    theme: 'dark',
    swatch: '#22e06f',
    surface: '#050806',
  }),
  Object.freeze({
    id: 'white',
    label: 'White',
    theme: 'light',
    swatch: '#2473ff',
    surface: '#ffffff',
  }),
]);

export function getSkin(value) {
  return SKINS.find((skin) => skin.id === value) || SKINS[0];
}

export function normalizeSkin(value) {
  return getSkin(value).id;
}
