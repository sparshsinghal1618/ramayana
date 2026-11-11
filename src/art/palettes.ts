import type { PaletteName, TimeOfDay } from '../data/types';

export interface Palette {
  skyTop: string;
  skyMid: string;
  skyBottom: string;
  sun: string;
  glow: string;
  far: string;
  mid: string;
  near: string;
  ground: string;
  water: string;
  waterLight: string;
  accent: string;
  accentSoft: string;
  ink: string;
  light: string;
  haze: string;
}

const base: Record<PaletteName, Palette> = {
  gold: {
    skyTop: '#202A46',
    skyMid: '#7A5247',
    skyBottom: '#E2B56E',
    sun: '#F6DCA6',
    glow: '#E8B96C',
    far: '#5E5A5C',
    mid: '#4A3D3A',
    near: '#241F22',
    ground: '#1A1719',
    water: '#8C6A4C',
    waterLight: '#E7C58C',
    accent: '#C9A15C',
    accentSoft: '#E8D3A2',
    ink: '#1A1719',
    light: '#F5EFE2',
    haze: '#D9B77E',
  },
  sage: {
    skyTop: '#28362F',
    skyMid: '#6C7C64',
    skyBottom: '#CDBF94',
    sun: '#EFE2B4',
    glow: '#CCD39B',
    far: '#63735E',
    mid: '#40533F',
    near: '#1D2A21',
    ground: '#131C16',
    water: '#536B5C',
    waterLight: '#B7C9A3',
    accent: '#B7A46A',
    accentSoft: '#DCD1A4',
    ink: '#152018',
    light: '#F1EDDC',
    haze: '#B9C1A0',
  },
  vermilion: {
    skyTop: '#33263A',
    skyMid: '#97513F',
    skyBottom: '#E7B77A',
    sun: '#FFE1AA',
    glow: '#F0A361',
    far: '#7D5346',
    mid: '#65362F',
    near: '#2A1B20',
    ground: '#1D1518',
    water: '#8B5A47',
    waterLight: '#E6BE8B',
    accent: '#D2A059',
    accentSoft: '#F0D4A3',
    ink: '#24161A',
    light: '#F7E8D2',
    haze: '#E0A976',
  },
  earth: {
    skyTop: '#2D2B2E',
    skyMid: '#6F5D4E',
    skyBottom: '#C9AC7E',
    sun: '#E9D3A2',
    glow: '#BC9B6C',
    far: '#6B5B4D',
    mid: '#4A3D33',
    near: '#24201C',
    ground: '#171412',
    water: '#6F5D4F',
    waterLight: '#C5AE87',
    accent: '#A98A5C',
    accentSoft: '#D8C29B',
    ink: '#1C1814',
    light: '#F0E8D8',
    haze: '#B7A181',
  },
  emerald: {
    skyTop: '#1F2C2A',
    skyMid: '#4F6B58',
    skyBottom: '#B9C08A',
    sun: '#F1E6B4',
    glow: '#C9D39A',
    far: '#4B6453',
    mid: '#2F4B3A',
    near: '#15251D',
    ground: '#0D1813',
    water: '#4B6C5A',
    waterLight: '#B3C9A6',
    accent: '#C0A667',
    accentSoft: '#E1D1A0',
    ink: '#112018',
    light: '#F1EEDF',
    haze: '#A9BC97',
  },
  dusk: {
    skyTop: '#1A1C2C',
    skyMid: '#4E4054',
    skyBottom: '#C68563',
    sun: '#E8A879',
    glow: '#B76E55',
    far: '#4C414F',
    mid: '#342C38',
    near: '#1B1720',
    ground: '#110F15',
    water: '#5A4A50',
    waterLight: '#C29482',
    accent: '#B9875A',
    accentSoft: '#DDBB99',
    ink: '#17131A',
    light: '#EFE5DF',
    haze: '#B48570',
  },
  amber: {
    skyTop: '#2A2D36',
    skyMid: '#7B6550',
    skyBottom: '#DAB87F',
    sun: '#F7E0AE',
    glow: '#D5A768',
    far: '#6E5C4C',
    mid: '#4D3F33',
    near: '#241F1B',
    ground: '#181410',
    water: '#79644C',
    waterLight: '#DCC08F',
    accent: '#BE9C64',
    accentSoft: '#E6D0A4',
    ink: '#1B1713',
    light: '#F4EBD9',
    haze: '#C8AC7F',
  },
  ocean: {
    skyTop: '#18253A',
    skyMid: '#486A7C',
    skyBottom: '#D7B985',
    sun: '#F7E3B6',
    glow: '#D8B479',
    far: '#536C74',
    mid: '#2D4D58',
    near: '#142A34',
    ground: '#0A1820',
    water: '#28505C',
    waterLight: '#A9C9C1',
    accent: '#C4A267',
    accentSoft: '#E4D1A6',
    ink: '#0F1E26',
    light: '#F2EDE0',
    haze: '#9FB8AE',
  },
  teal: {
    skyTop: '#162630',
    skyMid: '#3F6570',
    skyBottom: '#C9B987',
    sun: '#F3E2B5',
    glow: '#CBB780',
    far: '#4D6D72',
    mid: '#2C4E57',
    near: '#122A32',
    ground: '#091B22',
    water: '#24545E',
    waterLight: '#AACBC5',
    accent: '#C0A368',
    accentSoft: '#E2D2AA',
    ink: '#0D2028',
    light: '#F0EDE0',
    haze: '#9DBDB7',
  },
  ash: {
    skyTop: '#17181E',
    skyMid: '#4A4145',
    skyBottom: '#A98466',
    sun: '#D9A47D',
    glow: '#A7604C',
    far: '#4F454A',
    mid: '#342C31',
    near: '#181417',
    ground: '#0D0B0D',
    water: '#4C3C3B',
    waterLight: '#A78670',
    accent: '#A67F53',
    accentSoft: '#CDB18B',
    ink: '#121012',
    light: '#E9DFD6',
    haze: '#9A7564',
  },
  marigold: {
    skyTop: '#2A2437',
    skyMid: '#87513F',
    skyBottom: '#EDC182',
    sun: '#FFE4B0',
    glow: '#E9A45C',
    far: '#775445',
    mid: '#56382F',
    near: '#291A1B',
    ground: '#1A1213',
    water: '#8A6148',
    waterLight: '#EBC994',
    accent: '#D2A054',
    accentSoft: '#F4DCA8',
    ink: '#211518',
    light: '#FAEBD2',
    haze: '#DFAC74',
  },
  indigo: {
    skyTop: '#111729',
    skyMid: '#303C5A',
    skyBottom: '#9A8063',
    sun: '#D9C193',
    glow: '#998765',
    far: '#445064',
    mid: '#263449',
    near: '#121A27',
    ground: '#0A101A',
    water: '#273647',
    waterLight: '#9AA6A6',
    accent: '#AF9767',
    accentSoft: '#D5C7A7',
    ink: '#0C121C',
    light: '#EDE8DC',
    haze: '#87909A',
  },
  night: {
    skyTop: '#0D1322',
    skyMid: '#1E2A44',
    skyBottom: '#4D5268',
    sun: '#D8D6C4',
    glow: '#8B92A8',
    far: '#2A3447',
    mid: '#1A2433',
    near: '#0C121B',
    ground: '#070B11',
    water: '#162231',
    waterLight: '#7F94A0',
    accent: '#B39863',
    accentSoft: '#D4C39C',
    ink: '#080D14',
    light: '#EBE9DF',
    haze: '#67758B',
  },
  manuscript: {
    skyTop: '#DCCBA9',
    skyMid: '#E7D8BB',
    skyBottom: '#F0E4CA',
    sun: '#C9A25F',
    glow: '#D8B77D',
    far: '#B7A27E',
    mid: '#9B7F58',
    near: '#5D4A35',
    ground: '#4A3928',
    water: '#8E8464',
    waterLight: '#D5C49E',
    accent: '#A67B3D',
    accentSoft: '#C9AA72',
    ink: '#3A2D20',
    light: '#F7EFDD',
    haze: '#C5B190',
  },
};

const nightTint: Partial<Palette> = {
  skyTop: '#0B101D',
  skyMid: '#22273A',
  skyBottom: '#66584F',
  sun: '#E7D6AE',
  glow: '#A7906B',
  haze: '#7B7B80',
};

const stormTint: Partial<Palette> = {
  skyTop: '#121419',
  skyMid: '#38343A',
  skyBottom: '#7C6557',
  sun: '#C89D7D',
  glow: '#8C5C4A',
  haze: '#8D7466',
};

export function getPalette(name: PaletteName, time?: TimeOfDay): Palette {
  const palette = { ...base[name] };
  if (name === 'manuscript') return palette;
  if (time === 'night') Object.assign(palette, nightTint);
  if (time === 'storm') Object.assign(palette, stormTint);
  if (time === 'dawn') {
    palette.skyTop = shade(base[name].skyTop, -0.05);
    palette.skyBottom = mix(base[name].skyBottom, '#EFC88C', 0.3);
  }
  if (time === 'dusk') {
    palette.skyBottom = mix(base[name].skyBottom, '#D3875D', 0.35);
    palette.sun = mix(base[name].sun, '#F0B27F', 0.4);
  }
  return palette;
}

function clamp(n: number) {
  return Math.min(255, Math.max(0, Math.round(n)));
}

export function shade(hex: string, amount: number) {
  const { r, g, b } = hexToRgb(hex);
  const f = amount < 0 ? 0 : 255;
  const p = Math.abs(amount);
  return `rgb(${clamp((f - r) * p + r)}, ${clamp((f - g) * p + g)}, ${clamp((f - b) * p + b)})`;
}

export function mix(a: string, b: string, amount: number) {
  const A = hexToRgb(a);
  const B = hexToRgb(b);
  return `rgb(${clamp(A.r + (B.r - A.r) * amount)}, ${clamp(A.g + (B.g - A.g) * amount)}, ${clamp(A.b + (B.b - A.b) * amount)})`;
}

function hexToRgb(hex: string) {
  if (hex.startsWith('rgb')) {
    const values = hex.match(/\d+/g)?.map(Number) ?? [0, 0, 0];
    return { r: values[0], g: values[1], b: values[2] };
  }
  const clean = hex.replace('#', '');
  const full = clean.length === 3 ? clean.split('').map((c) => c + c).join('') : clean;
  const n = parseInt(full, 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

export const heroPalette = getPalette('gold', 'dawn');
