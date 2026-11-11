import type { Location } from './types';

export const locations: Location[] = [
  {
    id: 'ayodhya',
    name: 'Ayodhya',
    devanagari: 'अयोध्या',
    region: 'Kosala, on the river Sarayu',
    motif: 'palace',
    palette: 'gold',
    x: 500,
    y: 285,
    description:
      'A royal city of wide avenues, temple towers and the Ikshvaku palace. Ayodhya is the political and emotional centre of the epic: the place the heroes leave, and the place the whole journey bends toward.',
    significance:
      'The court of Dasharatha, the site of the interrupted coronation, and the city to which Rama returns after fourteen years. Ayodhya also gives its name to the ideal of Ram Rajya, a kingdom ordered by justice.',
    characters: ['rama', 'dasharatha', 'kaushalya', 'kaikeyi', 'sumitra', 'bharata', 'lakshmana', 'shatrughna', 'manthara', 'vashistha'],
    events: ['The Putrakameshti rite', 'The interrupted coronation', 'Dasharatha’s death', 'Bharata’s regency', 'Rama’s coronation'],
    chapters: [1, 2, 4, 11, 12],
    note: 'The Ayodhya of the epic is a literary city, not a surveyable location. Its identification with the modern city of Ayodhya is a later historical and devotional development.',
  },
  {
    id: 'mithila',
    name: 'Mithila',
    devanagari: 'मिथिला',
    region: 'Videha, north of the Ganges plain',
    motif: 'garden',
    palette: 'vermilion',
    x: 700,
    y: 310,
    description:
      'The kingdom of King Janaka, known for its learning and for the great bow of Shiva. Mithila is the setting of Sita’s swayamvar, where the epic’s love story and its theology of promise begin together.',
    significance:
      'The bow trial, the marriage of Rama and Sita, and the weddings of the four princes. Mithila represents the world of philosophical kingship and ceremonial order.',
    characters: ['sita', 'janaka', 'rama', 'lakshmana', 'bharata', 'shatrughna', 'vishwamitra'],
    events: ['Sita’s swayamvar', 'The breaking of Shiva’s bow', 'The weddings of the four princes'],
    chapters: [2, 3],
    note: 'Mithila is a cultural region as well as a literary kingdom. The epic’s geography blends real places, imagined landscapes and symbolic terrain.',
  },
  {
    id: 'chitrakoot',
    name: 'Chitrakoot',
    devanagari: 'चित्रकूट',
    region: 'The Vindhya hills',
    motif: 'mountain',
    palette: 'earth',
    x: 470,
    y: 400,
    description:
      'A hilly forest of waterfalls and layered ridges where the exiles make their first forest home. Chitrakoot is beautiful enough to make exile feel, for a moment, like a choice.',
    significance:
      'The first dwelling of Rama, Sita and Lakshmana; the place where Bharata comes to plead for Rama’s return and receives the sandals.',
    characters: ['rama', 'sita', 'lakshmana', 'bharata'],
    events: ['The first forest dwelling', 'Bharata’s visit', 'The sandals given as authority'],
    chapters: [4, 5],
    note: 'The identification of Chitrakoot with modern Chitrakoot in Uttar Pradesh and Madhya Pradesh is traditional; the epic’s landscape is primarily literary.',
  },
  {
    id: 'dandakaranya',
    name: 'Dandakaranya',
    devanagari: 'दण्डकारण्य',
    region: 'The great central forest',
    motif: 'forest',
    palette: 'emerald',
    x: 560,
    y: 505,
    description:
      'A vast forest of hermitages, rivers and rakshasa territories. Dandakaranya is not empty wilderness but a densely inhabited moral world where sages, animals and powers negotiate their survival.',
    significance:
      'The long middle of the exile: the protection of the sages, the encounter with Surpanakha, the battle with Khara and Dushana, and the road toward Panchavati.',
    characters: ['rama', 'sita', 'lakshmana', 'surpanakha', 'vishwamitra', 'jatayu'],
    events: ['Tataka’s grove', 'The protection of the sages', 'Surpanakha’s arrival', 'The battle with Khara and Dushana', 'The abduction'],
    chapters: [2, 5, 6, 7],
    note: 'Dandakaranya is a literary forest with shifting boundaries in different texts; it is not a single mapped nature reserve.',
  },
  {
    id: 'panchavati',
    name: 'Panchavati',
    devanagari: 'पञ्चवटी',
    region: 'On the river Godavari',
    motif: 'ashram',
    palette: 'emerald',
    x: 520,
    y: 590,
    description:
      'A quiet stretch of riverbank where five trees form a natural shelter. The exiles build a small dwelling here and live briefly in peace before the golden deer appears.',
    significance:
      'The home from which Sita is abducted. Panchavati is the epic’s most concentrated image of domestic happiness and its sudden loss.',
    characters: ['rama', 'sita', 'lakshmana', 'surpanakha', 'ravana', 'maricha', 'jatayu'],
    events: ['Building the forest dwelling', 'Surpanakha’s encounter', 'The golden deer', 'The abduction of Sita'],
    chapters: [5, 6],
    note: 'Panchavati is traditionally associated with a site near Nashik, but the epic’s geography is symbolic and layered across regions.',
  },
  {
    id: 'kishkindha',
    name: 'Kishkindha',
    devanagari: 'किष्किन्धा',
    region: 'The vanara kingdom in the southern hills',
    motif: 'city',
    palette: 'amber',
    x: 430,
    y: 700,
    description:
      'A hidden kingdom of the vanaras among caves, cliffs and forest. Kishkindha is a court with its own dynastic wounds, and its throne becomes essential to the search for Sita.',
    significance:
      'The kingdom of Vali and then Sugriva. The alliance formed here gives Rama an army and gives the epic its southern direction.',
    characters: ['sugriva', 'vali', 'angada', 'hanuman', 'jambavan', 'rama', 'lakshmana'],
    events: ['Sugriva’s exile', 'The alliance with Rama', 'The duel with Vali', 'Sugriva’s coronation', 'The search parties depart'],
    chapters: [7, 8],
    note: 'Kishkindha’s exact location is not fixed in the epic tradition; the landscape functions as a mythic southern frontier.',
  },
  {
    id: 'rishyamukha',
    name: 'Rishyamukha',
    devanagari: 'ऋष्यमूक',
    region: 'The hills above Kishkindha',
    motif: 'mountain',
    palette: 'amber',
    x: 475,
    y: 735,
    description:
      'The mountain where Sugriva lives in exile, protected by a curse that keeps Vali away. It is a place of waiting, negotiation and the first meeting between Rama and Hanuman.',
    significance:
      'The alliance of Rama and Sugriva, Hanuman’s first approach, and Shabari’s nearby hermitage in several retellings.',
    characters: ['sugriva', 'hanuman', 'rama', 'lakshmana', 'shabari'],
    events: ['Rama and Sugriva meet', 'The alliance of fire', 'Hanuman’s first service'],
    chapters: [7],
    note: 'Rishyamukha belongs to the epic’s literary geography. Local identifications vary across regions and traditions.',
  },
  {
    id: 'mahendra',
    name: 'Mahendra Mountain',
    devanagari: 'महेन्द्र',
    region: 'The eastern coast, above the sea',
    motif: 'mountain',
    palette: 'ocean',
    x: 555,
    y: 810,
    description:
      'The mountain from which Hanuman leaps across the ocean. Wind, rock and a horizon of water meet here, and the epic opens into its great aerial journey.',
    significance:
      'The launch point of Hanuman’s leap and the place where he returns with news of Sita.',
    characters: ['hanuman', 'jambavan', 'angada', 'rama'],
    events: ['Jambavan’s reminder', 'Hanuman’s leap', 'The return from Lanka'],
    chapters: [8],
    note: 'The Mahendra of the Sundara Kanda is a literary mountain. Traditional identifications include the Mahendragiri range on India’s eastern coast.',
  },
  {
    id: 'ocean',
    name: 'The Southern Ocean',
    devanagari: 'समुद्र',
    region: 'Between the mainland and Lanka',
    motif: 'ocean',
    palette: 'ocean',
    x: 620,
    y: 905,
    description:
      'The sea that separates the known world from Lanka. It is an obstacle, a deity, a witness and finally a road built of stones and shared labour.',
    significance:
      'Hanuman’s leap, the army’s crossing, the building of Ram Setu, and the return journey by Pushpaka.',
    characters: ['hanuman', 'rama', 'sugriva', 'nala', 'nila', 'vibhishana', 'sampati'],
    events: ['The impossible crossing', 'Hanuman’s leap', 'Vibhishana’s refuge', 'The building of the bridge'],
    chapters: [7, 8, 9, 10, 11],
    note: 'The epic ocean is a narrative threshold. This project makes no claim that any physical landform is the Ram Setu of the poem.',
  },
  {
    id: 'lanka',
    name: 'Lanka',
    devanagari: 'लङ्का',
    region: 'The island kingdom',
    motif: 'lanka',
    palette: 'dusk',
    x: 690,
    y: 1000,
    description:
      'Ravana’s island city, described as a place of extraordinary wealth, art and fortification. Lanka is beautiful and guarded, a civilisation organised around a king whose appetite outgrows his wisdom.',
    significance:
      'The abduction of Sita, Hanuman’s search, the war, Ravana’s fall, and Vibhishana’s coronation.',
    characters: ['ravana', 'sita', 'hanuman', 'vibhishana', 'kumbhakarna', 'indrajit', 'surpanakha', 'rama', 'lakshmana'],
    events: ['Sita’s captivity', 'Hanuman’s search', 'The burning of Lanka', 'The war', 'Ravana’s fall'],
    chapters: [6, 7, 8, 9, 10, 11],
    note: 'Lanka’s location is debated in traditional scholarship and is often symbolically identified with Sri Lanka; the epic’s city is a literary invention.',
  },
  {
    id: 'ashoka',
    name: 'Ashoka Vatika',
    devanagari: 'अशोक वाटिका',
    region: 'Within Lanka',
    motif: 'garden',
    palette: 'dusk',
    x: 760,
    y: 985,
    description:
      'A grove of ashoka trees inside Lanka where Sita is held. Its beauty is unbearable because it is a prison, and its shade becomes the setting for the epic’s most intimate conversation across distance.',
    significance:
      'Hanuman finds Sita here, presents Rama’s ring, receives the Chudamani, and destroys the grove before leaving Lanka.',
    characters: ['sita', 'hanuman', 'ravana'],
    events: ['Hanuman finds Sita', 'The ring and the jewel', 'The destruction of the grove', 'Rama and Sita’s reunion'],
    chapters: [6, 8, 11],
    note: 'The ashoka grove is a literary garden within a literary city. Its name evokes the ashoka tree and the sorrow (shoka) it is said to remove.',
  },
  {
    id: 'dronagiri',
    name: 'Dronagiri',
    devanagari: 'द्रोणगिरि',
    region: 'The Himalayas',
    motif: 'mountain',
    palette: 'indigo',
    x: 430,
    y: 140,
    description:
      'The mountain of healing herbs in the Himalayas. When Hanuman cannot identify the sanjeevani, he carries the entire mountain south rather than risk returning with the wrong plant.',
    significance:
      'The search for sanjeevani and Lakshmana’s recovery. Dronagiri is the epic’s great image of strength placed at the service of healing.',
    characters: ['hanuman', 'lakshmana'],
    events: ['Lakshmana is wounded', 'Hanuman flies north', 'The mountain is carried'],
    chapters: [10],
    note: 'Dronagiri is a mythic Himalayan mountain. Its story is symbolic and devotional rather than a botanical record.',
  },
  {
    id: 'valmiki-ashram',
    name: 'Valmiki’s Ashram',
    devanagari: 'वाल्मीकि आश्रम',
    region: 'The forest',
    motif: 'ashram',
    palette: 'indigo',
    x: 585,
    y: 245,
    description:
      'The hermitage of the poet-sage Valmiki, where Sita finds refuge and where Lava and Kusha are born and taught. It is a place where the epic becomes aware of itself as a story.',
    significance:
      'Sita’s later life, the birth and education of Lava and Kusha, and the first recitation of the Ramayana in some tellings.',
    characters: ['sita', 'vishwamitra', 'rama'],
    events: ['Sita’s arrival', 'The birth of Lava and Kusha', 'The teaching of the Ramayana'],
    chapters: [12],
    note: 'Valmiki is the traditional narrator of the Sanskrit Ramayana. The ashram is a literary and devotional setting; the Uttara Kanda that contains this episode is widely regarded as a later addition.',
  },
];

export const locationMap = Object.fromEntries(locations.map((location) => [location.id, location]));

export function getLocation(id: string) {
  return locationMap[id];
}
