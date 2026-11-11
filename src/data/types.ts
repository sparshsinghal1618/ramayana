export type Motif =
  | 'palace'
  | 'city'
  | 'forest'
  | 'ocean'
  | 'lanka'
  | 'battle'
  | 'coronation'
  | 'ashram'
  | 'mountain'
  | 'garden'
  | 'court'
  | 'bridge'
  | 'leap'
  | 'manuscript';

export type TimeOfDay = 'dawn' | 'day' | 'dusk' | 'night' | 'storm';

export type PaletteName =
  | 'gold'
  | 'sage'
  | 'vermilion'
  | 'earth'
  | 'emerald'
  | 'dusk'
  | 'amber'
  | 'ocean'
  | 'teal'
  | 'ash'
  | 'marigold'
  | 'indigo'
  | 'night'
  | 'manuscript';

export type FigureKind =
  | 'rama'
  | 'sita'
  | 'lakshmana'
  | 'hanuman'
  | 'ravana'
  | 'dasharatha'
  | 'bharata'
  | 'shatrughna'
  | 'janaka'
  | 'vishwamitra'
  | 'vashistha'
  | 'sugriva'
  | 'vali'
  | 'vibhishana'
  | 'kumbhakarna'
  | 'indrajit'
  | 'jatayu'
  | 'deer'
  | 'sage'
  | 'citizen'
  | 'army'
  | 'hanuman-flight';

export interface Scene {
  id: string;
  number: number;
  title: string;
  narrative: string;
  context?: string;
  characters: string[];
  location: string;
  motif: Motif;
  time: TimeOfDay;
  featured?: boolean;
}

export interface Chapter {
  id: string;
  number: number;
  title: string;
  devanagari: string;
  translation: string;
  emotion: string;
  palette: PaletteName;
  motif: Motif;
  time: TimeOfDay;
  summary: string;
  opening: string;
  scenes: Scene[];
}

export type Faction =
  | 'ayodhya'
  | 'mithila'
  | 'sages'
  | 'vanara'
  | 'rakshasa'
  | 'allies';

export interface CharacterLook {
  skin: string;
  robe: string;
  accent: string;
  hair: string;
  skinShade?: string;
  robeShade?: string;
  crown: 'none' | 'prince' | 'king' | 'sage' | 'vanara' | 'rakshasa' | 'bird';
  icon: 'bow' | 'lotus' | 'gada' | 'sword' | 'staff' | 'conch' | 'ring' | 'mountain' | 'feather';
}

export interface Character {
  id: string;
  name: string;
  devanagari: string;
  aliases: string[];
  faction: Faction;
  kingdom: string;
  epithet: string;
  summary: string;
  personality: string;
  role: string;
  events: string[];
  objects: string[];
  locations: string[];
  chapters: number[];
  relatives: string[];
  look: CharacterLook;
}

export interface Location {
  id: string;
  name: string;
  devanagari: string;
  region: string;
  motif: Motif;
  palette: PaletteName;
  x: number;
  y: number;
  description: string;
  significance: string;
  characters: string[];
  events: string[];
  chapters: number[];
  note: string;
}

export interface TimelineEvent {
  id: string;
  chapter: number;
  label: string;
  title: string;
  description: string;
  location: string;
  characters: string[];
}

export interface ObjectItem {
  id: string;
  name: string;
  devanagari: string;
  glyph: 'bow' | 'gada' | 'ring' | 'jewel' | 'vimana' | 'bridge' | 'mountain' | 'crown' | 'sandals' | 'sword' | 'lotus';
  material: string;
  bearer: string;
  description: string;
  significance: string;
  chapters: number[];
}

export interface Tradition {
  id: string;
  name: string;
  language: string;
  period: string;
  region: string;
  emphasis: string;
  differences: string;
}
