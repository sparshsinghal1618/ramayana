import type { Chapter, FigureKind, Scene, TimeOfDay } from '../data/types';

export const romanNumerals = [
  'I',
  'II',
  'III',
  'IV',
  'V',
  'VI',
  'VII',
  'VIII',
  'IX',
  'X',
  'XI',
  'XII',
];

export const kandaByChapter: Record<number, string> = {
  1: 'Bala Kanda',
  2: 'Bala Kanda',
  3: 'Bala Kanda',
  4: 'Ayodhya Kanda',
  5: 'Aranya Kanda',
  6: 'Aranya Kanda',
  7: 'Kishkindha Kanda',
  8: 'Sundara Kanda',
  9: 'Yuddha Kanda',
  10: 'Yuddha Kanda',
  11: 'Yuddha Kanda',
  12: 'Uttara Kanda',
};

const figureByCharacter: Record<string, FigureKind> = {
  rama: 'rama',
  sita: 'sita',
  lakshmana: 'lakshmana',
  hanuman: 'hanuman',
  ravana: 'ravana',
  dasharatha: 'dasharatha',
  bharata: 'bharata',
  shatrughna: 'shatrughna',
  janaka: 'janaka',
  vishwamitra: 'vishwamitra',
  vashistha: 'vashistha',
  sugriva: 'sugriva',
  vali: 'vali',
  vibhishana: 'vibhishana',
  kumbhakarna: 'kumbhakarna',
  indrajit: 'indrajit',
  jatayu: 'jatayu',
  maricha: 'deer',
  sage: 'sage',
  army: 'army',
};

export function sceneFigures(scene: Scene): FigureKind[] {
  const figures = scene.characters
    .map((id) => figureByCharacter[id])
    .filter((kind): kind is FigureKind => Boolean(kind));
  if (scene.characters.includes('hanuman') && scene.motif === 'leap') {
    return ['hanuman-flight'];
  }
  return Array.from(new Set(figures)).slice(0, 4);
}

export function chapterFigures(chapter: Chapter): FigureKind[] {
  const featured = chapter.scenes.find((scene) => scene.featured) ?? chapter.scenes[0];
  if (!featured) return [];
  const figures = sceneFigures(featured);
  if (figures.length) return figures;
  const fromChapter = chapter.scenes
    .flatMap((scene) => scene.characters)
    .map((id) => figureByCharacter[id])
    .filter((kind): kind is FigureKind => Boolean(kind));
  return Array.from(new Set(fromChapter)).slice(0, 3);
}

export const timeLabels: Record<TimeOfDay, string> = {
  dawn: 'Dawn',
  day: 'Day',
  dusk: 'Dusk',
  night: 'Night',
  storm: 'Storm',
};

export function chapterAnchor(number: number) {
  return `chapter-${String(number).padStart(2, '0')}`;
}

export function chapterLabel(number: number) {
  return `Book ${romanNumerals[number - 1] ?? number}`;
}

export function excerpt(text: string, length = 150) {
  if (text.length <= length) return text;
  const cut = text.slice(0, length);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 60 ? lastSpace : length).trim()}…`;
}

export function countLabel(count: number, singular: string, plural = `${singular}s`) {
  return `${count} ${count === 1 ? singular : plural}`;
}
