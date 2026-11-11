import type { Tradition } from './types';

export const traditions: Tradition[] = [
  {
    id: 'valmiki',
    name: 'Valmiki Ramayana',
    language: 'Sanskrit',
    period: 'Composed over centuries; conventionally dated to the last centuries BCE and the early centuries CE',
    region: 'South Asia',
    emphasis:
      'The oldest surviving complete literary Ramayana and the primary narrative reference for this project. It is traditionally attributed to the poet-sage Valmiki and is organised into seven kandas.',
    differences:
      'Its Rama is a prince and king whose dharma is debated as much as celebrated. The poem gives space to dissent — Vali’s challenge, Sita’s arguments, Tara’s grief — and does not resolve every moral question. The Uttara Kanda is widely regarded by scholars as a later addition.',
  },
  {
    id: 'ramcharitmanas',
    name: 'Ramcharitmanas',
    language: 'Awadhi',
    period: '1574 CE',
    region: 'North India',
    emphasis:
      'Tulsidas’s retelling recasts the story as a devotional poem centred on Rama as the supreme divine. Its language and imagery have shaped popular North Indian understandings of the epic more than any other version.',
    differences:
      'The Manas emphasises bhakti, the saving power of Rama’s name, and a more explicitly devotional frame. Characters such as Shabari and Hanuman receive expanded roles, and the narrative is presented as a sacred telling rather than a courtly chronicle.',
  },
  {
    id: 'kamban',
    name: 'Kamban’s Ramavataram',
    language: 'Tamil',
    period: '12th century',
    region: 'Tamil Nadu',
    emphasis:
      'A monumental Tamil retelling known for its psychological depth, lyrical force and attention to the inner lives of its characters. Kamban’s Sita and Ravana are especially complex.',
    differences:
      'Kamban expands emotional and rhetorical passages, reimagines scenes in Tamil literary conventions, and often gives characters greater interiority. The work is both a Ramayana and a masterpiece of Tamil poetry.',
  },
  {
    id: 'adhyatma',
    name: 'Adhyatma Ramayana',
    language: 'Sanskrit',
    period: 'Late medieval period',
    region: 'North India / pan-regional',
    emphasis:
      'A devotional retelling that reads the epic as an allegory of the soul’s journey toward the divine. Rama is explicitly identified with the supreme reality, and the narrative is shaped for spiritual instruction.',
    differences:
      'The text foregrounds inner meaning over historical sequence, and its influence is visible in Ramcharitmanas and later devotional traditions. It is a key example of how the Ramayana is read as theology as well as story.',
  },
  {
    id: 'living',
    name: 'Living traditions',
    language: 'Many languages',
    period: 'Ongoing',
    region: 'South and Southeast Asia',
    emphasis:
      'The Ramayana lives in Ramlila performances, Kathakali, Yakshagana, shadow puppetry, sculpture, film, television and regional poetry. Jain, Buddhist and Southeast Asian versions tell the story with different emphases and sometimes different endings.',
    differences:
      'There is no single global Ramayana. The Thai Ramakien, the Kakawin Ramayana of Java, Jain Ramayanas and countless regional tellings adapt characters, episodes and moral frameworks to their own worlds. This project follows the Valmiki narrative while flagging points where traditions diverge.',
  },
];

export const sourceNotes = [
  'Primary narrative frame: the Valmiki Ramayana, with its seven kandas. The retelling here is interpretive and does not reproduce a critical edition or a single published translation.',
  'Devotional and regional traditions — especially the Ramcharitmanas, Kamban’s Ramavataram, the Adhyatma Ramayana and living performance traditions — are identified where their emphases differ.',
  'Passages that later traditions made famous but that are absent from the Valmiki text (such as the Lakshmana rekha) are explicitly noted rather than presented as canonical.',
  'The Uttara Kanda is treated as a contested part of the tradition. The project presents its narrative while acknowledging that its authorship, dating and portrayal of Rama and Sita are debated.',
  'No quotation in this project is attributed to an ancient text unless explicitly identified. The narrative prose is original.',
];
