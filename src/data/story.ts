import type { Chapter, Scene } from './types';

type SceneSeed = Pick<Scene, 'title' | 'narrative' | 'characters' | 'location'> &
  Partial<Pick<Scene, 'context' | 'motif' | 'time' | 'featured'>>;

interface ChapterSeed {
  id: string;
  number: number;
  title: string;
  devanagari: string;
  translation: string;
  emotion: string;
  palette: Chapter['palette'];
  motif: Chapter['motif'];
  time: Chapter['time'];
  summary: string;
  opening: string;
  scenes: SceneSeed[];
}

function makeChapter({ scenes, ...chapter }: ChapterSeed): Chapter {
  return {
    ...chapter,
    scenes: scenes.map((scene, index) => ({
      ...scene,
      id: `ch${String(chapter.number).padStart(2, '0')}-s${String(index + 1).padStart(2, '0')}`,
      number: index + 1,
      motif: scene.motif ?? chapter.motif,
      time: scene.time ?? chapter.time,
    })),
  };
}

export const chapters: Chapter[] = [
  makeChapter({
    id: 'ayodhya',
    number: 1,
    title: 'The Kingdom of Ayodhya',
    devanagari: 'अयोध्या',
    translation: 'The city that cannot be conquered',
    emotion: 'Wonder',
    palette: 'gold',
    motif: 'palace',
    time: 'dawn',
    summary:
      'Before the exile, before the war, there was a city by the river Sarayu where a childless king prayed for an heir. The Ramayana begins with a longing answered by the divine, and with four princes whose lives will carry an entire civilisation’s questions about duty.',
    opening:
      'A golden city wakes beside a slow river. Somewhere in the palace, a king is asking the heavens for a child.',
    scenes: [
      {
        title: 'The city by the Sarayu',
        narrative:
          'Ayodhya rises beside the Sarayu in a haze of morning gold: wide avenues, market bells, temple towers and the high white walls of the Ikshvaku palace. Elephants carry provisions through the gates while the river moves patiently below the city.',
        characters: [],
        location: 'ayodhya',
        featured: true,
      },
      {
        title: 'Dasharatha, the wheel-turner',
        narrative:
          'King Dasharatha rules with a reputation for justice and spacious generosity. In the Ikshvaku line he is a celebrated charioteer, but beneath the royal composure lies the private grief of a king without an heir.',
        characters: ['dasharatha'],
        location: 'ayodhya',
        motif: 'court',
      },
      {
        title: 'Three queens',
        narrative:
          'Kaushalya, Kaikeyi and Sumitra each bring a different grace to the palace. Their households are separate, their temperaments distinct, yet the kingdom’s peace depends upon the delicate balance between them.',
        characters: ['kaushalya', 'kaikeyi', 'sumitra'],
        location: 'ayodhya',
        featured: true,
      },
      {
        title: 'The longing for an heir',
        narrative:
          'Dasharatha consults Vashistha, the family preceptor, and shares the sorrow that no ritual or victory has healed. The sage counsels patience and speaks of a rite that can invite divine grace.',
        characters: ['dasharatha', 'vashistha'],
        location: 'ayodhya',
        motif: 'court',
      },
      {
        title: 'Rishyasringa and the Putrakameshti',
        narrative:
          'The young sage Rishyasringa is invited to Ayodhya to officiate the Putrakameshti, a rite offered for the gift of children. Fires are kindled, hymns rise, and the whole city holds its breath.',
        characters: ['dasharatha', 'vashistha'],
        location: 'ayodhya',
        context:
          'The Valmiki Ramayana’s Bala Kanda describes Dasharatha’s Ashvamedha and Putrakameshti rites, with Rishyasringa as officiating priest. The sequence is narrative scripture, not a prescription for modern practice.',
      },
      {
        title: 'The divine offering',
        narrative:
          'From the sacred fire comes a radiant being bearing a vessel of divine payasam. Dasharatha receives it with trembling hands and divides it among his queens according to the sage’s instruction.',
        characters: ['dasharatha', 'kaushalya', 'kaikeyi', 'sumitra'],
        location: 'ayodhya',
        motif: 'court',
        featured: true,
      },
      {
        title: 'The birth of Rama',
        narrative:
          'In Kaushalya’s chamber, dawn arrives with a child whose name will become a refuge for millions. The palace bells answer one another across the city, and the Sarayu seems to brighten.',
        characters: ['rama', 'kaushalya', 'dasharatha'],
        location: 'ayodhya',
        motif: 'palace',
        featured: true,
      },
      {
        title: 'The birth of Bharata',
        narrative:
          'Kaikeyi’s son Bharata is born beneath a sky of high cloud. Even as an infant he is described as steady and affectionate, a prince whose loyalty will one day be tested against his own claim to a throne.',
        characters: ['bharata', 'kaikeyi', 'dasharatha'],
        location: 'ayodhya',
        motif: 'palace',
      },
      {
        title: 'Lakshmana and Shatrughna',
        narrative:
          'Sumitra gives birth to twins, Lakshmana and Shatrughna. The palace nurses say the two arrived like a pair of doors: one always turned toward Rama, the other always turned toward Bharata.',
        characters: ['lakshmana', 'shatrughna', 'sumitra'],
        location: 'ayodhya',
        motif: 'palace',
      },
      {
        title: 'The childhood of four princes',
        narrative:
          'The four boys grow through the courtyards together: racing chariots, stealing mangoes, learning the weight of a wooden bow. Their laughter fills the palace, and the city begins to speak of them as one bright constellation.',
        characters: ['rama', 'bharata', 'lakshmana', 'shatrughna'],
        location: 'ayodhya',
        motif: 'garden',
        featured: true,
      },
      {
        title: 'The teaching of Vashistha',
        narrative:
          'Under Vashistha the princes study the Vedas, statecraft, grammar, astronomy and the arts of peace. The sage teaches them that a king’s first discipline is the mind, and that power without restraint is only another kind of hunger.',
        characters: ['rama', 'bharata', 'lakshmana', 'shatrughna', 'vashistha'],
        location: 'ayodhya',
        motif: 'court',
        context:
          'The education of the princes is described in the Bala Kanda. Vashistha, the family guru, is central to their formation in dharma and statecraft.',
      },
      {
        title: 'The training of warriors',
        narrative:
          'In the training yard the princes learn chariots, swords, archery and the ethics of battle. Rama’s stillness with a bow becomes legendary; Lakshmana’s fierce focus becomes his shadow.',
        characters: ['rama', 'lakshmana', 'bharata', 'shatrughna'],
        location: 'ayodhya',
        motif: 'garden',
        featured: true,
      },
    ],
  }),
  makeChapter({
    id: 'sage-and-princes',
    number: 2,
    title: 'The Sage and the Princes',
    devanagari: 'विश्वामित्र',
    translation: 'The crossing of the forest',
    emotion: 'Initiation',
    palette: 'sage',
    motif: 'forest',
    time: 'day',
    summary:
      'Vishwamitra arrives at court and asks for Rama. What begins as a request for protection becomes an education in the world beyond palace walls: forests, demons, forgotten curses and the first exercise of divine weapons.',
    opening:
      'A sage walks out of the forest and into a king’s hall. He asks for a boy, and the boy’s life changes shape.',
    scenes: [
      {
        title: 'Vishwamitra at the court',
        narrative:
          'The court falls silent as Vishwamitra enters. The sage carries no ornament but the authority of austerity, and Dasharatha rises to receive him with the reverence owed to a living flame.',
        characters: ['vishwamitra', 'dasharatha', 'rama', 'vashistha'],
        location: 'ayodhya',
        motif: 'court',
        featured: true,
      },
      {
        title: 'The request',
        narrative:
          'Vishwamitra asks for Rama’s protection at his forest sacrifice. Dasharatha’s composure breaks; he offers armies, treasure, even his own life, but not his eldest son.',
        characters: ['vishwamitra', 'dasharatha'],
        location: 'ayodhya',
        motif: 'court',
      },
      {
        title: 'A father’s fear',
        narrative:
          'The king confesses that Rama is barely more than a boy. Vashistha reminds him that destiny does not measure its tasks by age, and that a guru’s protection is not a small thing.',
        characters: ['dasharatha', 'vashistha'],
        location: 'ayodhya',
        motif: 'court',
      },
      {
        title: 'Rama and Lakshmana depart',
        narrative:
          'Rama accepts the sage’s command with a calm that unsettles the court. Lakshmana follows without being asked, his bow already slung across his shoulder.',
        characters: ['rama', 'lakshmana', 'vishwamitra'],
        location: 'ayodhya',
        motif: 'palace',
      },
      {
        title: 'Into the ancient forest',
        narrative:
          'Beyond the last field, the road enters a forest older than any kingdom. Light falls in green columns, birds call from unseen branches, and the princes learn to read a landscape that has no map.',
        characters: ['rama', 'lakshmana', 'vishwamitra'],
        location: 'dandakaranya',
        featured: true,
      },
      {
        title: 'The encounter with Tataka',
        narrative:
          'In a ravaged grove the sage shows Rama a shape of violence and grief: Tataka, a yaksha woman transformed by a curse. Vishwamitra tells him that protection sometimes requires ending a threat, not merely resisting it.',
        characters: ['rama', 'lakshmana', 'vishwamitra'],
        location: 'dandakaranya',
        context:
          'In the Valmiki account, Tataka is a yaksha woman cursed into a destructive form. Rama’s hesitation and Vishwamitra’s counsel frame the episode as a lesson in the difficult ethics of protection.',
      },
      {
        title: 'Rama confronts Tataka',
        narrative:
          'Rama draws his bow, but the first arrow is held back by compassion. At the sage’s insistence he releases it. The forest goes still, and the boy who left Ayodhya has become a protector of the sages.',
        characters: ['rama', 'lakshmana', 'vishwamitra'],
        location: 'dandakaranya',
      },
      {
        title: 'Guardians of the yajna',
        narrative:
          'For six nights the princes keep watch around the sacred fire. The ritual is a fragile circle of light in the dark, and every shadow beyond it must be answered.',
        characters: ['rama', 'lakshmana', 'vishwamitra'],
        location: 'dandakaranya',
        featured: true,
      },
      {
        title: 'Subahu and Maricha',
        narrative:
          'The rakshasa brothers Subahu and Maricha descend upon the sacrifice, scattering embers and drowning the mantras in dust. Rama’s arrows send Maricha far across the sea and Subahu to his end; the rite is completed.',
        characters: ['rama', 'lakshmana', 'vishwamitra'],
        location: 'dandakaranya',
      },
      {
        title: 'The liberation of Ahalya',
        narrative:
          'On the road to Mithila, the sage leads the princes to an ashram grown over with silence. There they meet Ahalya, restored by the touch of Rama’s foot and the grace of her long penance.',
        characters: ['rama', 'lakshmana', 'vishwamitra'],
        location: 'mithila',
        motif: 'ashram',
        context:
          'The Ahalya episode is told differently across traditions. In the Valmiki Ramayana, Gautama’s curse and her restoration are bound up with the arrival of Rama; the story is handled here with restraint and without graphic detail.',
      },
      {
        title: 'The road to Mithila',
        narrative:
          'The forest thins into cultivated fields. Far ahead, the flags of Mithila appear above the trees, and the princes hear for the first time the city where a bow waits for a bridegroom.',
        characters: ['rama', 'lakshmana', 'vishwamitra'],
        location: 'mithila',
        motif: 'garden',
      },
    ],
  }),
  makeChapter({
    id: 'mithila',
    number: 3,
    title: 'Mithila and Sita',
    devanagari: 'मिथिला',
    translation: 'The bow and the garland',
    emotion: 'Love and devotion',
    palette: 'vermilion',
    motif: 'garden',
    time: 'day',
    summary:
      'In Mithila, King Janaka has set an impossible condition for his daughter’s hand: lift and string the bow of Shiva. Kings fail, pride fractures, and a young prince from Ayodhya does what no army could.',
    opening:
      'Flowers everywhere, and at the centre of the hall, a bow that has not been moved in a generation.',
    scenes: [
      {
        title: 'King Janaka of Mithila',
        narrative:
          'Janaka rules Mithila as a philosopher-king, equally at home in debate and in ceremony. His court is famous for its learning, and his daughter Sita is said to have grown up among its questions.',
        characters: ['janaka'],
        location: 'mithila',
        motif: 'court',
      },
      {
        title: 'Sita of the furrow',
        narrative:
          'Sita is found as a child in a furrow of the field, and Janaka raises her as his own daughter. Her name remembers the earth that gave her, and her presence seems to carry that generosity into the palace.',
        characters: ['sita', 'janaka'],
        location: 'mithila',
        motif: 'garden',
      },
      {
        title: 'The bow of Shiva',
        narrative:
          'The great bow of Shiva rests in Mithila, too heavy for ordinary hands. Janaka has vowed that only the one who can lift and string it may wed Sita, turning a weapon of the gods into the threshold of a marriage.',
        characters: ['janaka'],
        location: 'mithila',
        motif: 'court',
        featured: true,
      },
      {
        title: 'The swayamvar is proclaimed',
        narrative:
          'Messengers carry the invitation across the kingdoms. Princes, armies and ambitions begin to move toward Mithila, and the city prepares itself for a gathering in which most will leave humbled.',
        characters: ['janaka'],
        location: 'mithila',
        motif: 'city',
        featured: true,
      },
      {
        title: 'Kings arrive',
        narrative:
          'Chariots crowd the approach roads. Banners of a dozen houses snap in the wind, and the guest palaces fill with princes comparing lineages, weapons and the favour of the gods.',
        characters: [],
        location: 'mithila',
        motif: 'city',
      },
      {
        title: 'The assembly',
        narrative:
          'The hall fills with kings, sages and citizens. Janaka takes his seat beneath the painted rafters; at the far end, the bow rests on its stand like a sleeping mountain.',
        characters: ['janaka', 'sita'],
        location: 'mithila',
        motif: 'court',
      },
      {
        title: 'Rama enters the hall',
        narrative:
          'Vishwamitra enters with two princes from Ayodhya. Rama’s gaze passes over the assembly and settles, for a moment, on the garland in Sita’s hands. The room notices; the moment is not yet a story.',
        characters: ['rama', 'lakshmana', 'vishwamitra', 'janaka', 'sita'],
        location: 'mithila',
        motif: 'court',
        featured: true,
      },
      {
        title: 'Approaching the bow',
        narrative:
          'Rama walks the length of the hall. His footsteps are unhurried. The kings who have failed watch him with a mixture of scorn and hope, and the bow waits in the hush.',
        characters: ['rama', 'janaka', 'sita'],
        location: 'mithila',
        motif: 'court',
      },
      {
        title: 'The lifting of Shiva’s bow',
        narrative:
          'Rama bows to the weapon before touching it. Then he lifts the bow of Shiva as if it were a branch, and the hall understands that strength can be quiet.',
        characters: ['rama', 'sita', 'janaka'],
        location: 'mithila',
        motif: 'court',
        featured: true,
      },
      {
        title: 'The breaking of the bow',
        narrative:
          'As Rama strings it, the bow breaks with a sound that rolls across Mithila. The assembly is stunned; the earth itself seems to have been struck like a bell.',
        characters: ['rama', 'sita', 'janaka'],
        location: 'mithila',
        motif: 'court',
        featured: true,
      },
      {
        title: 'The celebration',
        narrative:
          'Conch shells answer one another across the city. Flowers fall through the hall, and Janaka rises to proclaim the marriage, his voice finally unsteady with joy.',
        characters: ['rama', 'sita', 'janaka'],
        location: 'mithila',
        motif: 'city',
      },
      {
        title: 'The wedding garland',
        narrative:
          'Sita lifts the garland and places it around Rama’s neck. The gesture is simple; everything around it changes. Two families, two kingdoms and two destinies are now joined.',
        characters: ['rama', 'sita'],
        location: 'mithila',
        motif: 'garden',
      },
      {
        title: 'The wedding ceremony',
        narrative:
          'The sacred fire is lit, and the mantras bind the couple before the assembled kings. The sisters of Mithila are wed to Bharata, Lakshmana and Shatrughna, and the two houses become one.',
        characters: ['rama', 'sita', 'lakshmana', 'bharata', 'shatrughna', 'janaka'],
        location: 'mithila',
        motif: 'garden',
        featured: true,
      },
      {
        title: 'The palace in celebration',
        narrative:
          'Lamps are lit in every window. Musicians move through the courtyards, children chase petals, and the night passes in a golden blur of food, laughter and prayer.',
        characters: ['rama', 'sita', 'janaka'],
        location: 'mithila',
        motif: 'palace',
      },
      {
        title: 'The return to Ayodhya',
        narrative:
          'The wedding party turns homeward beneath a wide sky. Sita leaves the city of her childhood; Rama rides beside her, and the road to Ayodhya has never looked so long or so bright.',
        characters: ['rama', 'sita', 'lakshmana'],
        location: 'ayodhya',
        motif: 'palace',
      },
    ],
  }),
  makeChapter({
    id: 'exile',
    number: 4,
    title: 'The Promise and the Exile',
    devanagari: 'वनवास',
    translation: 'The promise that costs everything',
    emotion: 'Sacrifice',
    palette: 'earth',
    motif: 'palace',
    time: 'dusk',
    summary:
      'On the eve of coronation, a queen remembers an old promise and asks for two boons. A king is trapped by his own word, a son chooses exile, and the idea of dharma becomes painfully concrete: a promise kept at the cost of a crown.',
    opening:
      'The city is decorated for a coronation. By morning, the heir will be walking into the forest.',
    scenes: [
      {
        title: 'Ayodhya prepares',
        narrative:
          'Garlands climb the palace columns and the streets are washed for Rama’s coronation. Traders lay out sweets, children practise songs, and the whole city leans toward a golden tomorrow.',
        characters: ['rama'],
        location: 'ayodhya',
        motif: 'city',
      },
      {
        title: 'The eve of celebration',
        narrative:
          'Dasharatha watches the lamps come on and allows himself to believe that his old age has finally been given a gentle shore. He has no way of knowing that the city’s joy is already borrowed.',
        characters: ['dasharatha'],
        location: 'ayodhya',
        motif: 'palace',
      },
      {
        title: 'Manthara’s counsel',
        narrative:
          'In Kaikeyi’s chamber, the old nurse Manthara works with the patience of a slow poison. She turns the news of Rama’s coronation into a portrait of Kaikeyi’s humiliation and her son’s permanent eclipse.',
        characters: ['manthara', 'kaikeyi'],
        location: 'ayodhya',
        motif: 'court',
        featured: true,
      },
      {
        title: 'The two boons',
        narrative:
          'Kaikeyi remembers the battlefield where she saved Dasharatha’s life and the two boons he swore to grant her. Manthara brings the memory to its sharpest point: a promise unused can still become a weapon.',
        characters: ['kaikeyi', 'manthara'],
        location: 'ayodhya',
        motif: 'court',
      },
      {
        title: 'Bharata’s coronation demanded',
        narrative:
          'Kaikeyi demands that Bharata be crowned in Rama’s place. The first boon falls like a stone into still water; the king still does not see the second rising behind it.',
        characters: ['kaikeyi', 'dasharatha'],
        location: 'ayodhya',
        motif: 'court',
      },
      {
        title: 'Fourteen years of exile',
        narrative:
          'The second boon is spoken: Rama must leave for fourteen years. Dasharatha collapses under the weight of his own promise, unable to break it and unable to bear it.',
        characters: ['kaikeyi', 'dasharatha'],
        location: 'ayodhya',
        motif: 'court',
        featured: true,
      },
      {
        title: 'A king in pieces',
        narrative:
          'Dasharatha pleads with Kaikeyi, then with himself, then with the gods. The decorations outside become unbearable; the palace has become a room with no door.',
        characters: ['dasharatha', 'kaikeyi'],
        location: 'ayodhya',
        motif: 'court',
      },
      {
        title: 'Rama learns of the boons',
        narrative:
          'Rama is called to his father’s chamber expecting instructions for the coronation. He finds a king who cannot speak and a queen who has already spoken.',
        characters: ['rama', 'dasharatha', 'kaikeyi'],
        location: 'ayodhya',
        motif: 'court',
      },
      {
        title: 'The promise accepted',
        narrative:
          'Rama bows to his father and accepts exile without argument. A promise, he says, belongs to the one who gave it; a son’s duty is to make it possible for his father to keep it.',
        characters: ['rama', 'dasharatha', 'kaikeyi'],
        location: 'ayodhya',
        motif: 'court',
        featured: true,
      },
      {
        title: 'Sita chooses the forest',
        narrative:
          'Sita refuses to remain behind. Her place, she says, is beside her husband; a palace without him is only a larger kind of wilderness.',
        characters: ['rama', 'sita'],
        location: 'ayodhya',
        motif: 'palace',
      },
      {
        title: 'Lakshmana chooses the road',
        narrative:
          'Lakshmana does not ask permission. He lays his bow beside Rama’s and declares that the forest with his brother is more royal than a throne without him.',
        characters: ['rama', 'lakshmana'],
        location: 'ayodhya',
        motif: 'palace',
      },
      {
        title: 'Farewell to the family',
        narrative:
          'Kaushalya holds her son’s face in her hands. Sumitra blesses Lakshmana with a steadiness that costs her everything. The farewell is spoken in ordinary words because the largest griefs have no language.',
        characters: ['rama', 'lakshmana', 'kaushalya', 'sumitra'],
        location: 'ayodhya',
        motif: 'palace',
        featured: true,
      },
      {
        title: 'The city says goodbye',
        narrative:
          'Word spreads through Ayodhya. Citizens line the streets with folded hands, walking behind the exiles until the road leaves the city. Tears are everywhere, but no one dares to call the exile unjust.',
        characters: ['rama', 'sita', 'lakshmana'],
        location: 'ayodhya',
        motif: 'city',
      },
      {
        title: 'Leaving Ayodhya',
        narrative:
          'The gates close behind them. Rama does not look back; Sita looks once; Lakshmana looks at Rama. The city they leave is no longer the city they will return to.',
        characters: ['rama', 'sita', 'lakshmana'],
        location: 'ayodhya',
        motif: 'palace',
      },
      {
        title: 'The road into exile',
        narrative:
          'Dust gathers on royal garments. The three exiles walk toward the forest, and the epic quietly changes genre: from courtly succession to a journey through the living world.',
        characters: ['rama', 'sita', 'lakshmana'],
        location: 'chitrakoot',
        motif: 'forest',
      },
      {
        title: 'Guha of the Nishadas',
        narrative:
          'At the river, the Nishada chief Guha receives them with a hunter’s plain hospitality. He offers boats, food and his own allegiance; Rama accepts the kindness and refuses the throne.',
        characters: ['rama', 'lakshmana'],
        location: 'chitrakoot',
        motif: 'forest',
        context:
          'Guha and the Nishada people appear in the Ayodhya Kanda. His friendship with Rama is one of the epic’s early images of devotion crossing social boundaries.',
      },
      {
        title: 'Crossing the river',
        narrative:
          'The boat slides away from the bank under a low sky. Sita watches the familiar shore recede, while Lakshmana rows in silence and Rama keeps his gaze on the far forest.',
        characters: ['rama', 'sita', 'lakshmana'],
        location: 'chitrakoot',
        motif: 'forest',
      },
      {
        title: 'Chitrakoot',
        narrative:
          'Chitrakoot rises in layered hills and waterfalls. Here the exiles build a simple dwelling, and the forest gives them a beauty so complete that grief has nowhere to hide.',
        characters: ['rama', 'sita', 'lakshmana'],
        location: 'chitrakoot',
        motif: 'mountain',
      },
      {
        title: 'The passing of Dasharatha',
        narrative:
          'In Ayodhya, Dasharatha dies of grief, whispering Rama’s name. The palace that prepared for a coronation now prepares for a funeral, and the old promise outlives the man who made it.',
        characters: ['dasharatha', 'kaushalya'],
        location: 'ayodhya',
        motif: 'palace',
        time: 'night',
        featured: true,
      },
      {
        title: 'Bharata returns',
        narrative:
          'Bharata comes home from Kekeya to find the city in mourning and the throne empty. He refuses to enter it, demanding to know what has been done in his name.',
        characters: ['bharata'],
        location: 'ayodhya',
        motif: 'city',
      },
      {
        title: 'Bharata learns the truth',
        narrative:
          'Kaikeyi explains the boons. Bharata recoils from his mother’s victory and from the crown that has been placed in his hands without his consent.',
        characters: ['bharata', 'kaikeyi'],
        location: 'ayodhya',
        motif: 'court',
      },
      {
        title: 'The weight of a crown',
        narrative:
          'Bharata’s grief turns to resolve. He will bring Rama home or he will not rule at all; a kingdom without its rightful king is only an inheritance of guilt.',
        characters: ['bharata', 'kaikeyi'],
        location: 'ayodhya',
        motif: 'court',
      },
      {
        title: 'Bharata goes to Chitrakoot',
        narrative:
          'Bharata follows the exiles with the army and the citizens at his back, but he enters the forest barefoot and without royal ornament. He comes not to command but to beg.',
        characters: ['bharata', 'rama', 'lakshmana'],
        location: 'chitrakoot',
        motif: 'forest',
      },
      {
        title: 'The brothers meet',
        narrative:
          'The brothers see each other across the clearing. Bharata falls at Rama’s feet; Rama lifts him and holds him, and for a moment the forest contains the whole broken palace.',
        characters: ['rama', 'bharata', 'lakshmana'],
        location: 'chitrakoot',
        motif: 'forest',
      },
      {
        title: 'A plea to return',
        narrative:
          'Bharata asks Rama to come back and rule. Rama refuses, not from anger but from fidelity: their father’s word cannot be undone by a son who loves him.',
        characters: ['rama', 'bharata'],
        location: 'chitrakoot',
        motif: 'forest',
      },
      {
        title: 'The sandals on the throne',
        narrative:
          'Rama gives his sandals to Bharata as a sign of authority. Bharata carries them back to Ayodhya and places them on the throne, ruling as a regent while the rightful king lives in the forest.',
        characters: ['rama', 'bharata'],
        location: 'chitrakoot',
        motif: 'forest',
        featured: true,
      },
      {
        title: 'A kingdom held in trust',
        narrative:
          'For fourteen years Bharata governs from a hermit’s hut outside the capital. He wears no crown, sits below the sandals, and waits for the day the exile ends.',
        characters: ['bharata'],
        location: 'ayodhya',
        motif: 'palace',
      },
    ],
  }),
  makeChapter({
    id: 'forest-years',
    number: 5,
    title: 'The Forest Years',
    devanagari: 'दण्डकारण्य',
    translation: 'The living forest',
    emotion: 'Exploration',
    palette: 'emerald',
    motif: 'forest',
    time: 'day',
    summary:
      'The exile becomes a life. Rama, Sita and Lakshmana move through hermitages and forests, protect the sages who live there, and learn the rhythms of a world whose beauty is inseparable from danger. Then Surpanakha arrives.',
    opening:
      'The forest is not empty. It is a city of trees, a parliament of birds, and a home to those who have left everything else behind.',
    scenes: [
      {
        title: 'Exploring the forest',
        narrative:
          'The exiles move deeper into Dandakaranya, following rivers and ridge lines. Sita learns which leaves are useful, Lakshmana learns the sounds of predators, and Rama learns how little a prince knows about soil.',
        characters: ['rama', 'sita', 'lakshmana'],
        location: 'dandakaranya',
        featured: true,
      },
      {
        title: 'The sages of the forest',
        narrative:
          'Hermitages appear between the trees: small fires, swept thresholds, children carrying water. The sages greet the exiles as a king and queen who have chosen to become guests.',
        characters: ['rama', 'lakshmana'],
        location: 'dandakaranya',
        motif: 'ashram',
      },
      {
        title: 'Life at Chitrakoot',
        narrative:
          'At Chitrakoot the days settle into a gentle pattern: morning prayer, gathering fruit, repairing the hut before rain. Sita makes a home out of very little, and the happiness is real.',
        characters: ['rama', 'sita', 'lakshmana'],
        location: 'chitrakoot',
        motif: 'ashram',
      },
      {
        title: 'Journey into Dandakaranya',
        narrative:
          'They leave Chitrakoot when the grief of Bharata’s visit becomes too heavy. The road south takes them into a denser, stranger forest where even the sages keep their voices low.',
        characters: ['rama', 'sita', 'lakshmana'],
        location: 'dandakaranya',
        featured: true,
      },
      {
        title: 'Protectors of the sages',
        narrative:
          'The forest sages have lived under the shadow of rakshasa raids. Rama promises protection and asks only for their blessing; the exiles become the guardians of small, fragile places of prayer.',
        characters: ['rama', 'lakshmana'],
        location: 'dandakaranya',
        featured: true,
      },
      {
        title: 'Hermitages of prayer',
        narrative:
          'Each hermitage has its own austerity and its own beauty. At one, a sage has not spoken for years; at another, children weave garlands for a guest they have never seen before.',
        characters: ['rama', 'sita', 'lakshmana'],
        location: 'dandakaranya',
        motif: 'ashram',
      },
      {
        title: 'Creatures of the forest',
        narrative:
          'Peacocks open their fans in the rain, deer step delicately around the dwelling, and a family of langurs claims the roof. Sita’s delight in them softens the harshness of exile.',
        characters: ['sita', 'rama'],
        location: 'dandakaranya',
        motif: 'forest',
      },
      {
        title: 'Surpanakha arrives',
        narrative:
          'A rakshasa woman comes out of the trees, drawn by the scent of a human household. Surpanakha is Ravana’s sister, quick in desire and quicker to take offence, and she fixes her gaze on Rama.',
        characters: ['surpanakha', 'rama', 'sita', 'lakshmana'],
        location: 'panchavati',
        context:
          'Surpanakha is Kaikeyi’s opposite in the epic’s moral geometry: another woman whose wounded pride becomes a hinge of the plot. Later retellings often turn her into a caricature; Valmiki’s portrait is more complicated.',
        featured: true,
      },
      {
        title: 'The encounter',
        narrative:
          'Surpanakha offers herself to Rama with the confidence of someone unused to refusal. Rama declines with courtesy and points her toward Lakshmana; the forest narrows around the three of them.',
        characters: ['surpanakha', 'rama', 'lakshmana', 'sita'],
        location: 'panchavati',
      },
      {
        title: 'The confrontation',
        narrative:
          'Humiliation sharpens into attack. Lakshmana intervenes, and the encounter ends in injury. Surpanakha flees into the trees, carrying pain and a resolve that will reach all the way to Lanka.',
        characters: ['surpanakha', 'lakshmana', 'rama'],
        location: 'panchavati',
        context:
          'The mutilation is told in the Valmiki Ramayana but is often softened or re-framed in performance. The adaptation avoids depicting the injury directly, focusing on consequence rather than spectacle.',
      },
      {
        title: 'Surpanakha returns to Khara',
        narrative:
          'Surpanakha reaches the rakshasa camp of Khara and Dushana with her grievance. Their pride is provoked; an army is assembled to punish a pair of forest exiles.',
        characters: ['surpanakha'],
        location: 'dandakaranya',
        time: 'night',
      },
      {
        title: 'The battle with Khara and Dushana',
        narrative:
          'Khara and Dushana attack with a full rakshasa force. Rama sends Lakshmana to guard Sita and meets the assault alone, and the forest becomes a battlefield lit by arrows.',
        characters: ['rama', 'lakshmana', 'sita'],
        location: 'dandakaranya',
        motif: 'battle',
        featured: true,
      },
      {
        title: 'The road to Panchavati',
        narrative:
          'After the battle, the forest is too exposed. Lakshmana leads the way toward Panchavati, a quieter stretch of riverbank where the trees form a natural shelter.',
        characters: ['rama', 'sita', 'lakshmana'],
        location: 'panchavati',
        motif: 'forest',
      },
      {
        title: 'Building the dwelling',
        narrative:
          'They build a hut of branches and grass beside the Godavari. It is small, clean and temporary, and Sita plants a few flowers by the door because a home is a decision, not a possession.',
        characters: ['rama', 'sita', 'lakshmana'],
        location: 'panchavati',
        motif: 'ashram',
      },
      {
        title: 'The peace of Panchavati',
        narrative:
          'For a season, life is gentle. Sita collects water at dawn, Lakshmana keeps watch, and Rama speaks of the day they will return to Ayodhya without knowing that the worst is still ahead.',
        characters: ['rama', 'sita', 'lakshmana'],
        location: 'panchavati',
        featured: true,
      },
    ],
  }),
  makeChapter({
    id: 'abduction',
    number: 6,
    title: 'The Golden Deer',
    devanagari: 'मायामृग',
    translation: 'The illusion and the abduction',
    emotion: 'Suspense and sorrow',
    palette: 'dusk',
    motif: 'forest',
    time: 'dusk',
    summary:
      'In a forest at the height of its beauty, a golden deer appears. What follows is the epic’s darkest turning: desire, deception, an empty hut and a journey of grief. Panchavati’s peace is broken in a single afternoon.',
    opening:
      'The light is golden. Everything is exactly as it should be. That is how the deception begins.',
    scenes: [
      {
        title: 'Surpanakha reaches Lanka',
        narrative:
          'Surpanakha stands before her brother Ravana, king of Lanka, and describes the exiles who humiliated her. She sharpens her account with desire, knowing exactly which of Ravana’s appetites to wake.',
        characters: ['surpanakha', 'ravana'],
        location: 'lanka',
        motif: 'lanka',
        time: 'night',
      },
      {
        title: 'Ravana’s decision',
        narrative:
          'Ravana listens to the description of Sita and mistakes appetite for destiny. The king who has conquered gods begins planning a theft, and the pride that made Lanka great begins to hollow it.',
        characters: ['ravana', 'surpanakha'],
        location: 'lanka',
        motif: 'court',
        time: 'night',
      },
      {
        title: 'Maricha is summoned',
        narrative:
          'Ravana calls Maricha, the rakshasa once spared by Rama. Maricha remembers the force of that arrow and warns that the enterprise is ruin. Ravana does not want advice; he wants obedience.',
        characters: ['ravana', 'maricha'],
        location: 'lanka',
        motif: 'court',
        time: 'night',
      },
      {
        title: 'The golden deer',
        narrative:
          'A deer of impossible gold steps out of the trees near Panchavati. Its body catches the light like beaten metal, and Sita, who has lived so long without a gift, cannot look away.',
        characters: ['sita', 'rama', 'lakshmana'],
        location: 'panchavati',
        motif: 'forest',
        featured: true,
      },
      {
        title: 'Sita’s request',
        narrative:
          'Sita asks Rama to bring the deer. He hesitates, sensing a trap, but her delight is difficult to refuse after so many months of loss.',
        characters: ['sita', 'rama'],
        location: 'panchavati',
      },
      {
        title: 'The pursuit',
        narrative:
          'Rama follows the deer deeper into the forest. It stays just beyond the arrow, leading him away from the hut with the patience of a hunter who is not hunting.',
        characters: ['rama'],
        location: 'dandakaranya',
        featured: true,
      },
      {
        title: 'Maricha’s deception',
        narrative:
          'When the arrow finally strikes, the deer changes shape and calls out in Rama’s voice, begging Sita and Lakshmana for help. The cry travels through the trees and reaches the hut.',
        characters: ['rama', 'maricha', 'sita', 'lakshmana'],
        location: 'dandakaranya',
        context:
          'Maricha’s hour-long deception is an act of illusion rather than transformation. The episode shows how the epic tests not only strength but judgement and trust.',
      },
      {
        title: 'The distant cry',
        narrative:
          'Sita hears Rama calling and believes he is in danger. Lakshmana, bound by his brother’s instruction to stay, feels the trap closing and cannot explain it.',
        characters: ['sita', 'lakshmana'],
        location: 'panchavati',
      },
      {
        title: 'Sita urges Lakshmana',
        narrative:
          'Sita’s fear becomes accusation: why does Lakshmana remain when his brother may be dying? Her words cut, and the duty to protect her collides with the duty to obey Rama.',
        characters: ['sita', 'lakshmana'],
        location: 'panchavati',
        context:
          'The famous “Lakshmana rekha” — a protective line Lakshmana draws around the hut — is not found in the Valmiki Ramayana. It belongs to later retellings. It is therefore not depicted here.',
      },
      {
        title: 'Lakshmana leaves',
        narrative:
          'Bound by Sita’s plea and his own dread, Lakshmana leaves the dwelling. Before he goes, he warns the forest itself to keep watch, and the trees seem to draw closer.',
        characters: ['lakshmana', 'sita'],
        location: 'panchavati',
      },
      {
        title: 'Ravana arrives in disguise',
        narrative:
          'An ascetic appears at the door with a bowl and a blessing. Beneath the calm face is Ravana, and beneath his courtesy is the plan he has carried from Lanka.',
        characters: ['ravana', 'sita'],
        location: 'panchavati',
        featured: true,
      },
      {
        title: 'The disguise falls away',
        narrative:
          'The ascetic reveals himself in a blaze of ornament. Ravana declares his lineage and his desire, and Sita’s fear becomes a refusal so absolute that it fills the small hut.',
        characters: ['ravana', 'sita'],
        location: 'panchavati',
      },
      {
        title: 'The abduction',
        narrative:
          'Ravana seizes Sita and rises into the air. She calls the trees, the river and every listening creature to witness; the forest cannot hold her, but it remembers.',
        characters: ['ravana', 'sita'],
        location: 'panchavati',
        motif: 'forest',
        time: 'dusk',
        featured: true,
      },
      {
        title: 'The Pushpaka Vimana',
        narrative:
          'Ravana’s airborne chariot carries them south over mountains and rivers. Sita looks down at the world she is losing and drops her ornaments, one by one, as evidence for those who will follow.',
        characters: ['ravana', 'sita'],
        location: 'ocean',
        motif: 'leap',
        context:
          'The Pushpaka is a divine flying palace, not a mechanical aircraft. Its depiction here is symbolic: power that moves without touching the earth.',
      },
      {
        title: 'Jatayu sees',
        narrative:
          'The old vulture-king Jatayu spots the flying chariot and knows that something is deeply wrong. Age has not dulled his loyalty to the line of Dasharatha.',
        characters: ['jatayu', 'sita', 'ravana'],
        location: 'dandakaranya',
        motif: 'mountain',
      },
      {
        title: 'Jatayu fights Ravana',
        narrative:
          'Jatayu attacks the chariot with beak and claw, a frail shape against an airborne king. He tears at the vehicle and at Ravana’s pride, buying Sita a few precious moments.',
        characters: ['jatayu', 'ravana', 'sita'],
        location: 'dandakaranya',
        motif: 'mountain',
        featured: true,
      },
      {
        title: 'The fall of Jatayu',
        narrative:
          'Ravana cuts the old bird down. Jatayu falls into the forest, broken but alive, holding the knowledge of which direction the chariot took.',
        characters: ['jatayu', 'ravana'],
        location: 'dandakaranya',
        motif: 'forest',
      },
      {
        title: 'The empty dwelling',
        narrative:
          'Rama returns to a hut with no Sita. The deer was a lie, the voice was a lie, and the silence around the doorway is the loudest thing he has ever heard.',
        characters: ['rama', 'lakshmana'],
        location: 'panchavati',
        featured: true,
      },
      {
        title: 'The search begins',
        narrative:
          'Rama and Lakshmana search the riverbank, the paths and the clearings. Rama’s grief is not theatrical; it is methodical, and therefore more terrible.',
        characters: ['rama', 'lakshmana'],
        location: 'dandakaranya',
      },
      {
        title: 'Finding Jatayu',
        narrative:
          'They find the vulture-king in a pool of shadow. Jatayu’s breath is failing, but he tells them what he saw and points his gaze south toward Lanka.',
        characters: ['rama', 'lakshmana', 'jatayu'],
        location: 'dandakaranya',
        motif: 'forest',
      },
      {
        title: 'Jatayu’s last rites',
        narrative:
          'Rama performs the funerary rites for Jatayu himself, honouring the bird as a kinsman. The forest watches a prince become a mourner, and the search for Sita acquires its first debt.',
        characters: ['rama', 'lakshmana', 'jatayu'],
        location: 'dandakaranya',
        motif: 'forest',
        featured: true,
      },
      {
        title: 'The path south',
        narrative:
          'The brothers turn their faces south. Somewhere beyond the forests and the sea is a city they have never seen, ruled by a king who has taken everything from them.',
        characters: ['rama', 'lakshmana'],
        location: 'dandakaranya',
        motif: 'forest',
      },
      {
        title: 'The search continues',
        narrative:
          'They move through unfamiliar land, asking trees, rivers and hermits for news. The Ramayana becomes a journey of listening, and every small kindness keeps the search alive.',
        characters: ['rama', 'lakshmana'],
        location: 'dandakaranya',
        motif: 'forest',
      },
    ],
  }),
  makeChapter({
    id: 'sugriva',
    number: 7,
    title: 'The Friendship of Sugriva',
    devanagari: 'सुग्रीव',
    translation: 'An alliance in the hills',
    emotion: 'Hope',
    palette: 'amber',
    motif: 'forest',
    time: 'day',
    summary:
      'In the southern hills, Rama finds a kingdom divided and a friend who has lost everything. The alliance with Sugriva turns grief into strategy, and a chance encounter with Hanuman changes the direction of the epic.',
    opening:
      'A prince who has lost his wife meets a monkey king who has lost his kingdom. Their alliance begins with fire and becomes one of the epic’s great friendships.',
    scenes: [
      {
        title: 'The search westward',
        narrative:
          'Rama and Lakshmana cross rivers and ridges, following rumour and instinct. The forest gives way to rocky hills, and with every step the world grows larger and less familiar.',
        characters: ['rama', 'lakshmana'],
        location: 'dandakaranya',
      },
      {
        title: 'Kabandha',
        narrative:
          'A monstrous headless creature blocks their path, and in the fight that follows, the brothers release it from a curse. Kabandha, restored, tells them to seek Sugriva at Rishyamukha.',
        characters: ['rama', 'lakshmana'],
        location: 'dandakaranya',
        motif: 'forest',
      },
      {
        title: 'Shabari’s devotion',
        narrative:
          'At the edge of the hills they find the hermitage of Shabari, an old woman who has waited years for Rama’s arrival. She offers him berries she has tasted to make sure they are sweet.',
        characters: ['rama', 'shabari'],
        location: 'rishyamukha',
        motif: 'ashram',
        context:
          'Shabari appears in the Ramcharitmanas and other devotional retellings more prominently than in the Sanskrit Valmiki text. Her story is a beloved image of devotion across traditions.',
      },
      {
        title: 'The berries',
        narrative:
          'Lakshmana hesitates at the half-eaten fruit; Rama accepts it without hesitation. The moment becomes a lesson not about food but about the worth of a gift offered without calculation.',
        characters: ['rama', 'shabari', 'lakshmana'],
        location: 'rishyamukha',
        motif: 'ashram',
      },
      {
        title: 'The road to Kishkindha',
        narrative:
          'Shabari’s directions lead deeper into the hills. The landscape becomes a maze of cliffs and waterfalls, and somewhere beyond them waits a king with a hidden mountain fortress.',
        characters: ['rama', 'lakshmana'],
        location: 'rishyamukha',
        motif: 'mountain',
        featured: true,
      },
      {
        title: 'Hanuman observes',
        narrative:
          'From a high rock, Hanuman studies the two strangers. He recognises the carriage of a prince even in exile, and he is cautious enough to approach as a mendicant rather than a warrior.',
        characters: ['hanuman', 'rama', 'lakshmana'],
        location: 'rishyamukha',
        motif: 'mountain',
      },
      {
        title: 'Hanuman approaches',
        narrative:
          'Hanuman descends with folded hands and a voice carefully calibrated to peace. The first meeting between Rama and Hanuman is quiet; the epic’s greatest devotion begins with an ordinary greeting.',
        characters: ['hanuman', 'rama', 'lakshmana'],
        location: 'rishyamukha',
        motif: 'mountain',
        featured: true,
      },
      {
        title: 'Hanuman introduces himself',
        narrative:
          'Hanuman names himself as a servant of Sugriva and a son of the wind. His manner is intelligent, courteous and entirely unafraid; Rama recognises a companion, not a subordinate.',
        characters: ['hanuman', 'rama', 'lakshmana'],
        location: 'rishyamukha',
        motif: 'mountain',
      },
      {
        title: 'The meeting with Sugriva',
        narrative:
          'Sugriva receives the exiles on the slopes of Rishyamukha, where he lives in fear of his brother. He and Rama look at each other and see two men whose losses have given them a common grammar.',
        characters: ['sugriva', 'rama', 'lakshmana', 'hanuman'],
        location: 'rishyamukha',
        motif: 'mountain',
      },
      {
        title: 'Sugriva’s story',
        narrative:
          'Sugriva tells how Vali, his elder brother, accused him of treason and took his kingdom and his wife. He has lived in exile not from weakness but because Vali’s strength is immense.',
        characters: ['sugriva', 'rama', 'hanuman'],
        location: 'rishyamukha',
        motif: 'mountain',
        featured: true,
      },
      {
        title: 'The alliance of fire',
        narrative:
          'Rama and Sugriva make a covenant before a fire: Rama will help restore Sugriva’s kingdom, and Sugriva will lend his vanara host to the search for Sita. It is a friendship made of need and honour.',
        characters: ['rama', 'sugriva', 'lakshmana', 'hanuman'],
        location: 'rishyamukha',
        motif: 'mountain',
      },
      {
        title: 'The challenge to Vali',
        narrative:
          'Sugriva calls Vali to single combat. Rama waits in hiding, and the plan depends on a distinction that will trouble the epic for centuries: how does one fight an enemy whose strength is greater and whose fault is not simple?',
        characters: ['sugriva', 'vali', 'rama'],
        location: 'kishkindha',
        motif: 'forest',
      },
      {
        title: 'The first duel',
        narrative:
          'The brothers fight with terrible symmetry, and Rama cannot tell them apart. Sugriva is beaten and flees; the alliance is nearly broken by a confusion that no one anticipated.',
        characters: ['sugriva', 'vali', 'rama'],
        location: 'kishkindha',
        motif: 'forest',
      },
      {
        title: 'A sign agreed',
        narrative:
          'Sugriva returns wearing a garland as a sign, and the brothers meet again. This time Rama’s arrow finds Vali, and the duel ends with a death that will cast a long shadow over the throne.',
        characters: ['sugriva', 'vali', 'rama'],
        location: 'kishkindha',
        motif: 'forest',
      },
      {
        title: 'The death of Vali',
        narrative:
          'Vali falls and demands an explanation. Rama speaks of dharma and the protection of Sugriva; Vali’s reply is not easily dismissed, and the epic allows the argument to remain unresolved.',
        characters: ['vali', 'rama', 'sugriva'],
        location: 'kishkindha',
        motif: 'forest',
        context:
          'Rama’s killing of Vali from concealment is one of the most debated episodes in the Ramayana. Valmiki gives Vali a powerful counter-argument; later traditions interpret the act in different ways. The scene is presented here as a moral wound, not a simple victory.',
        featured: true,
      },
      {
        title: 'Tara’s grief',
        narrative:
          'Vali’s wife Tara mourns a king who was also a tyrant to his brother. Her lament gives the victory a human cost, and the new king must begin his reign in the presence of grief.',
        characters: ['sugriva', 'hanuman'],
        location: 'kishkindha',
        motif: 'court',
      },
      {
        title: 'Sugriva is crowned',
        narrative:
          'Sugriva takes the throne of Kishkindha under a sky still raw with loss. Hanuman sets the crown on his friend’s head, and the kingdom turns toward the work that must be done.',
        characters: ['sugriva', 'hanuman'],
        location: 'kishkindha',
        motif: 'court',
        featured: true,
      },
      {
        title: 'The search for Sita begins',
        narrative:
          'Sugriva sends messengers across the land. Vanara bands gather from forests and mountains, and an army of the living landscape is assembled for a single purpose.',
        characters: ['sugriva', 'rama', 'hanuman'],
        location: 'kishkindha',
        motif: 'city',
      },
      {
        title: 'The search parties depart',
        narrative:
          'Warriors leave in four directions, carrying Rama’s description of Sita and the memory of her ornaments. The epic opens outward like a hand.',
        characters: ['hanuman', 'sugriva', 'rama'],
        location: 'kishkindha',
        motif: 'mountain',
      },
      {
        title: 'The southern party',
        narrative:
          'The southern party travels farthest, into forests where the maps end. Hanuman, Angada and Jambavan lead with different kinds of courage.',
        characters: ['hanuman', 'angada', 'jambavan'],
        location: 'ocean',
        motif: 'forest',
      },
      {
        title: 'Meeting Sampati',
        narrative:
          'On a barren cliff they meet Sampati, the elder brother of Jatayu, whose wings were burned long ago. He cannot fly, but he can see across impossible distances.',
        characters: ['hanuman', 'angada', 'jambavan', 'sampati'],
        location: 'ocean',
        motif: 'mountain',
      },
      {
        title: 'The view of Lanka',
        narrative:
          'Sampati describes a city of gold across the sea, where a woman is held in an ashoka grove. The southern party finally has a direction, and the impossible becomes a horizon to cross.',
        characters: ['hanuman', 'angada', 'sampati'],
        location: 'ocean',
        motif: 'ocean',
        featured: true,
      },
    ],
  }),
  makeChapter({
    id: 'leap',
    number: 8,
    title: 'Hanuman’s Great Leap',
    devanagari: 'हनुमान',
    translation: 'The servant who crossed the sea',
    emotion: 'Hope and courage',
    palette: 'ocean',
    motif: 'leap',
    time: 'dawn',
    summary:
      'At the edge of the sea, the vanara host has no ships. Jambavan reminds Hanuman who he is. What follows is the epic’s most exhilarating journey: a single leap across an ocean, a search through Lanka, and a message carried back in fire.',
    opening:
      'The sea has no road. Hanuman is told to remember his own name, and then there is only sky.',
    scenes: [
      {
        title: 'The host reaches the sea',
        narrative:
          'The southern search party stands at the edge of the water. Beyond the breakers, the sea stretches to a horizon that offers no bridge and no answer.',
        characters: ['hanuman', 'angada', 'jambavan'],
        location: 'ocean',
        motif: 'ocean',
      },
      {
        title: 'The impossible crossing',
        narrative:
          'Angada wonders aloud whether anyone can cross. The vanaras can change shape, but the sea is not a wall to be climbed; it is a world with its own laws.',
        characters: ['angada', 'hanuman', 'jambavan'],
        location: 'ocean',
        motif: 'ocean',
      },
      {
        title: 'Jambavan’s reminder',
        narrative:
          'Jambavan, the ancient bear, turns to Hanuman. He reminds him of the strength, speed and size that lie dormant within him, forgotten only because no one has named them for a long time.',
        characters: ['jambavan', 'hanuman'],
        location: 'mahendra',
        motif: 'mountain',
        context:
          'In the Valmiki Sundara Kanda, Jambavan reminds Hanuman of his powers; Hanuman then grows and leaps. The popular motif of a curse that made him forget his strength is developed in later retellings.',
        featured: true,
      },
      {
        title: 'Hanuman remembers',
        narrative:
          'Something in Hanuman answers the old voice. He straightens, and the air around him changes; the mountain is no longer a place he stands on but a platform from which he will leave.',
        characters: ['hanuman', 'jambavan'],
        location: 'mahendra',
        motif: 'mountain',
        featured: true,
      },
      {
        title: 'Hanuman grows',
        narrative:
          'Hanuman expands to a size equal to the task. His ornaments stretch with him, his tail sweeps the ridge, and the vanaras below become small as seeds.',
        characters: ['hanuman'],
        location: 'mahendra',
        motif: 'mountain',
      },
      {
        title: 'On Mahendra mountain',
        narrative:
          'He climbs to the highest shoulder of Mahendra. The sea is a silver field below, and Lanka is a rumour at the edge of sight.',
        characters: ['hanuman'],
        location: 'mahendra',
        motif: 'mountain',
      },
      {
        title: 'The mountain prepares',
        narrative:
          'Hanuman presses his feet into the rock and offers a prayer. The mountain trembles under him, releasing dust and birds, as if the earth itself is taking a breath.',
        characters: ['hanuman'],
        location: 'mahendra',
        motif: 'mountain',
      },
      {
        title: 'The leap',
        narrative:
          'He springs. For a moment there is no separation between sky and body, only motion; the sea recedes beneath him, and the wind closes over the place he stood.',
        characters: ['hanuman'],
        location: 'ocean',
        motif: 'leap',
        featured: true,
      },
      {
        title: 'Mainaka rises',
        narrative:
          'A golden mountain rises from the sea to offer Hanuman rest. He touches it with a blessing and keeps going, grateful for the courtesy but unwilling to spend a moment of the mission.',
        characters: ['hanuman'],
        location: 'ocean',
        motif: 'ocean',
        time: 'day',
      },
      {
        title: 'The test of Surasa',
        narrative:
          'The serpent mother Surasa opens her jaws and says that no one may pass without being eaten. Hanuman enters her mouth and leaves again in the space between two breaths, fulfilling the letter of her challenge.',
        characters: ['hanuman'],
        location: 'ocean',
        motif: 'ocean',
      },
      {
        title: 'The shadow of Simhika',
        narrative:
          'A sea demoness catches Hanuman’s shadow and tries to drag him down. He defeats her without losing altitude, and the ocean below closes over another obstacle.',
        characters: ['hanuman'],
        location: 'ocean',
        motif: 'ocean',
        time: 'dusk',
      },
      {
        title: 'Across the water',
        narrative:
          'The sun moves across the sky. Hanuman flies on, a small warm shape above an enormous blue, and the distance between two worlds shrinks.',
        characters: ['hanuman'],
        location: 'ocean',
        motif: 'ocean',
        featured: true,
      },
      {
        title: 'First sight of Lanka',
        narrative:
          'Lanka appears: a city of towers on an island, golden roofs rising out of forest. Hanuman slows, takes the measure of its walls, and chooses a smaller form.',
        characters: ['hanuman'],
        location: 'lanka',
        motif: 'lanka',
        featured: true,
      },
      {
        title: 'Entering the city',
        narrative:
          'He enters as a small monkey among a thousand shadows. The city is beautiful, guarded and full of ordinary life; evil here is not a storm but an architecture.',
        characters: ['hanuman'],
        location: 'lanka',
        motif: 'city',
        time: 'night',
      },
      {
        title: 'Lankini at the gate',
        narrative:
          'The guardian spirit Lankini blocks his path. Hanuman greets her with respect and then, when she insists, with force; she recognises the sign of a destiny larger than her watch.',
        characters: ['hanuman'],
        location: 'lanka',
        motif: 'lanka',
        time: 'night',
      },
      {
        title: 'Searching the palace',
        narrative:
          'Hanuman moves through courtyards and halls, past sleeping guards and fountains, searching for one woman among a city. He does not find Sita in Ravana’s palace, and hope begins to thin.',
        characters: ['hanuman'],
        location: 'lanka',
        motif: 'court',
        time: 'night',
      },
      {
        title: 'The ashoka grove',
        narrative:
          'Beyond the palace, in a grove of ashoka trees, he sees a woman seated beneath a tree. She is thin with grief, but her stillness is not defeat; it is the centre of everything Hanuman has crossed the sea for.',
        characters: ['hanuman', 'sita'],
        location: 'ashoka',
        motif: 'garden',
        time: 'night',
      },
      {
        title: 'Finding Sita',
        narrative:
          'Hanuman watches from the branches, unwilling to frighten her. He sees her refuse Ravana’s messengers and keep her gaze turned toward a memory of Rama.',
        characters: ['hanuman', 'sita'],
        location: 'ashoka',
        motif: 'garden',
        time: 'night',
        featured: true,
      },
      {
        title: 'Rama’s ring',
        narrative:
          'Hanuman drops Rama’s ring into her hands. Sita recognises it and looks up; the small circle of gold carries an entire forest, a promise and a journey across the sea.',
        characters: ['hanuman', 'sita'],
        location: 'ashoka',
        motif: 'garden',
        time: 'night',
      },
      {
        title: 'Sita’s message',
        narrative:
          'Sita gives Hanuman her Chudamani, the jewel from her hair, and asks him to tell Rama that her life is now measured in waiting. The message is both a plea and a proof of survival.',
        characters: ['hanuman', 'sita'],
        location: 'ashoka',
        motif: 'garden',
        time: 'night',
      },
      {
        title: 'The grove destroyed',
        narrative:
          'Before he leaves, Hanuman allows his grief and anger to speak. He tears through the ashoka grove, and the garden that was Sita’s prison becomes a field of fallen branches.',
        characters: ['hanuman'],
        location: 'ashoka',
        motif: 'garden',
        time: 'night',
      },
      {
        title: 'The battle in Lanka',
        narrative:
          'Lanka’s warriors surround him. Hanuman fights with controlled fury, a single vanara against a city’s guard, until the sky is full of broken weapons.',
        characters: ['hanuman'],
        location: 'lanka',
        motif: 'battle',
        time: 'night',
      },
      {
        title: 'Indrajit’s capture',
        narrative:
          'Indrajit, Ravana’s son, uses the Brahmastra to bind Hanuman. Hanuman submits to the capture deliberately, allowing himself to be brought before the king he came to study.',
        characters: ['hanuman', 'indrajit'],
        location: 'lanka',
        motif: 'battle',
        time: 'night',
      },
      {
        title: 'Before Ravana',
        narrative:
          'Hanuman stands before the throne of Lanka and delivers Rama’s warning with a courtesy that cuts deeper than insult. Ravana’s court hears that a vanara messenger has crossed the sea alone.',
        characters: ['hanuman', 'ravana'],
        location: 'lanka',
        motif: 'court',
        time: 'night',
        featured: true,
      },
      {
        title: 'The burning tail',
        narrative:
          'Ravana orders Hanuman’s tail set alight. Hanuman accepts the fire and turns it into a journey, leaping across the rooftops of Lanka as the city’s pride catches light.',
        characters: ['hanuman', 'ravana'],
        location: 'lanka',
        motif: 'lanka',
        time: 'night',
      },
      {
        title: 'Lanka burns',
        narrative:
          'Fire moves from roof to roof. Hanuman sees the city as it is: a magnificent structure built on taking, now visible in the dark. He is careful to leave the ashoka grove untouched.',
        characters: ['hanuman', 'sita'],
        location: 'lanka',
        motif: 'lanka',
        time: 'night',
      },
      {
        title: 'The return to the sea',
        narrative:
          'Hanuman puts out his tail in the ocean and turns homeward. The water hisses, the night closes over Lanka, and the message he carries is worth more than the fire he leaves.',
        characters: ['hanuman'],
        location: 'ocean',
        motif: 'ocean',
        time: 'night',
        featured: true,
      },
      {
        title: 'The leap home',
        narrative:
          'The return crossing is faster, lighter, powered by certainty. The sea is no longer an obstacle but a road he has already made.',
        characters: ['hanuman'],
        location: 'ocean',
        motif: 'leap',
        time: 'dawn',
      },
      {
        title: 'The host sees him',
        narrative:
          'From Mahendra, the vanaras see a shape growing larger over the water. Angada shouts; Jambavan rises; the camp turns toward the returning hero.',
        characters: ['hanuman', 'angada', 'jambavan'],
        location: 'mahendra',
        motif: 'mountain',
        time: 'dawn',
      },
      {
        title: 'The meeting with Rama',
        narrative:
          'Hanuman lands and goes directly to Rama. He does not embellish his own feats; he begins with Sita, because that is the only news that matters.',
        characters: ['hanuman', 'rama', 'lakshmana'],
        location: 'mahendra',
        motif: 'mountain',
        time: 'dawn',
      },
      {
        title: 'The Chudamani',
        narrative:
          'Hanuman places Sita’s jewel in Rama’s hand. Rama holds it as if it were a living thing, and the entire war to come is contained in that small brightness.',
        characters: ['rama', 'hanuman', 'sita'],
        location: 'mahendra',
        motif: 'mountain',
        time: 'dawn',
        featured: true,
      },
      {
        title: 'Renewed resolve',
        narrative:
          'Rama’s grief becomes direction. Sugriva is summoned, the vanara host is prepared, and the road to Lanka is no longer a rumour but a campaign.',
        characters: ['rama', 'hanuman', 'sugriva'],
        location: 'kishkindha',
        motif: 'city',
        time: 'day',
      },
    ],
  }),
  makeChapter({
    id: 'ram-setu',
    number: 9,
    title: 'Ram Setu',
    devanagari: 'रामसेतु',
    translation: 'The bridge of stones',
    emotion: 'Faith and unity',
    palette: 'teal',
    motif: 'bridge',
    time: 'day',
    summary:
      'The army reaches the sea and finds no passage. Rama prays, the ocean answers, and a host of vanaras and bears begins carrying stones. The bridge that emerges is less a feat of engineering than a portrait of shared purpose.',
    opening:
      'The sea will not part. So they begin, stone by stone, to give it a road.',
    scenes: [
      {
        title: 'The army reaches the shore',
        narrative:
          'The vanara host arrives at the southern coast. Hundreds of thousands of feet stop at the water’s edge, and the sea continues to be the sea.',
        characters: ['rama', 'lakshmana', 'sugriva', 'hanuman'],
        location: 'ocean',
        motif: 'ocean',
        context:
          'The Ram Setu narrative belongs to the literary geography of the Ramayana. The story is sacred to many traditions; this presentation does not make geological or historical claims about any physical structure.',
        featured: true,
      },
      {
        title: 'The impassable water',
        narrative:
          'Sugriva’s scouts search the coast for boats and find none. The army can cross mountains, but the ocean is an enemy that cannot be fought with a spear.',
        characters: ['sugriva', 'rama'],
        location: 'ocean',
        motif: 'ocean',
      },
      {
        title: 'Rama’s prayer',
        narrative:
          'Rama sits at the shoreline and prays to the ocean. He does not command the water; he asks, waits, and when the sea remains silent, his patience acquires the weight of a weapon.',
        characters: ['rama', 'lakshmana'],
        location: 'ocean',
        motif: 'ocean',
        featured: true,
      },
      {
        title: 'The ocean answers',
        narrative:
          'The ocean deity rises from the waves to speak with Rama. He explains the limits of his nature but offers a way: the vanaras may build across his surface, and he will hold what they place.',
        characters: ['rama'],
        location: 'ocean',
        motif: 'ocean',
      },
      {
        title: 'Vibhishana arrives',
        narrative:
          'A rakshasa prince appears in the sky, asking for refuge. Ravana’s brother Vibhishana has chosen dharma over blood, and the army watches to see what Rama will do with an enemy’s kin.',
        characters: ['vibhishana', 'rama', 'sugriva', 'hanuman'],
        location: 'ocean',
        motif: 'ocean',
      },
      {
        title: 'Refuge is granted',
        narrative:
          'Rama accepts Vibhishana, saying that a person who comes for protection is not to be turned away. The decision creates an ally, a future king and a quiet rebuke to every politics of suspicion.',
        characters: ['rama', 'vibhishana'],
        location: 'ocean',
        motif: 'ocean',
        featured: true,
      },
      {
        title: 'The council of builders',
        narrative:
          'Sugriva calls the host together. Nala and Nila, the master builders, study the currents and the distance. The work is impossible, which is why it requires everyone.',
        characters: ['sugriva', 'nala', 'nila', 'rama'],
        location: 'ocean',
        motif: 'ocean',
      },
      {
        title: 'Nala and Nila',
        narrative:
          'Nala and Nila mark the line of the bridge. Their confidence is not bravado but the calm of craftsmen who have learned that a large thing is only a sequence of small, exact things.',
        characters: ['nala', 'nila'],
        location: 'ocean',
        motif: 'bridge',
        featured: true,
      },
      {
        title: 'The first stones',
        narrative:
          'The first stones are carried to the water. Some are enormous; some are small enough for a child. Each is placed with a prayer, and the sea takes the first edge of the road.',
        characters: ['rama', 'hanuman', 'sugriva'],
        location: 'ocean',
        motif: 'bridge',
      },
      {
        title: 'The work of many hands',
        narrative:
          'Vanaras, bears and rakshasas who have chosen Rama work side by side. Stones travel in living chains from the hills to the shore, and the bridge begins to extend.',
        characters: ['hanuman', 'sugriva', 'nala', 'nila'],
        location: 'ocean',
        motif: 'bridge',
      },
      {
        title: 'The bridge extends',
        narrative:
          'Day after day the causeway reaches farther into the sea. The horizon changes by a few stones at a time, and what was impossible becomes a line of footprints over water.',
        characters: ['rama', 'hanuman'],
        location: 'ocean',
        motif: 'bridge',
        featured: true,
      },
      {
        title: 'The army crosses',
        narrative:
          'The host moves across the bridge in a long, bright river of bodies and banners. Below them the ocean moves, holding the road with a patience older than kings.',
        characters: ['rama', 'lakshmana', 'sugriva', 'hanuman'],
        location: 'ocean',
        motif: 'bridge',
        featured: true,
      },
      {
        title: 'Lanka from the far shore',
        narrative:
          'The far shore rises out of the haze. Lanka’s towers are no longer a story across the water; they are a destination, and the war has a door.',
        characters: ['rama', 'hanuman', 'vibhishana'],
        location: 'lanka',
        motif: 'lanka',
        time: 'dusk',
      },
    ],
  }),
  makeChapter({
    id: 'war',
    number: 10,
    title: 'The War of Lanka',
    devanagari: 'लंकायुद्ध',
    translation: 'The great confrontation',
    emotion: 'Determination',
    palette: 'ash',
    motif: 'battle',
    time: 'storm',
    summary:
      'Two armies face each other across the water. What follows is not a celebration of violence but a long examination of loyalty, grief and the cost of refusing to return what has been taken. Lanka’s greatest warriors fall one by one.',
    opening:
      'Before the first arrow, there is still a chance for peace. Ravana is offered it, and refuses.',
    scenes: [
      {
        title: 'The army enters Lanka',
        narrative:
          'Rama’s host crosses the Setu and enters the island. The city that looked golden from the sea is a maze of fortifications, and every street can become a front.',
        characters: ['rama', 'lakshmana', 'hanuman', 'vibhishana'],
        location: 'lanka',
        motif: 'lanka',
      },
      {
        title: 'The army assembles',
        narrative:
          'The vanara and bear battalions form on the plain below Lanka’s walls. Sugriva’s commanders take their positions, and the noise of the host rolls up toward a silent palace.',
        characters: ['rama', 'sugriva', 'angada', 'hanuman'],
        location: 'lanka',
        motif: 'battle',
      },
      {
        title: 'Angada’s embassy',
        narrative:
          'Angada enters Ravana’s court as an envoy, not a warrior. He offers peace with the dignity of someone who would rather return home than win a war.',
        characters: ['angada', 'ravana'],
        location: 'lanka',
        motif: 'court',
      },
      {
        title: 'Ravana refuses',
        narrative:
          'Ravana listens, dismisses and threatens. The refusal is not a strategic decision but a refusal to imagine himself as wrong, and the war becomes inevitable.',
        characters: ['ravana', 'angada'],
        location: 'lanka',
        motif: 'court',
      },
      {
        title: 'The first battle',
        narrative:
          'The armies meet below the walls. Dust rises, banners fall, and the epic’s language shifts into the terrible arithmetic of battle.',
        characters: ['rama', 'lakshmana', 'sugriva', 'hanuman'],
        location: 'lanka',
        motif: 'battle',
        featured: true,
      },
      {
        title: 'Warriors enter the field',
        narrative:
          'Duel after duel begins: Sugriva against rakshasa commanders, Angada against the palace guard, Hanuman against whatever the battlefield sends him. The field becomes a map of loyalties.',
        characters: ['sugriva', 'angada', 'hanuman'],
        location: 'lanka',
        motif: 'battle',
      },
      {
        title: 'Kumbhakarna wakes',
        narrative:
          'Ravana’s giant brother Kumbhakarna is woken from his long sleep. He eats, listens, and then speaks a truth the court does not want: the king’s desire is not worth the kingdom.',
        characters: ['kumbhakarna', 'ravana'],
        location: 'lanka',
        motif: 'court',
        featured: true,
      },
      {
        title: 'Kumbhakarna on the field',
        narrative:
          'Kumbhakarna fights because his brother asks him to, not because he believes in the cause. His size turns the battlefield into a landscape, and the vanaras scatter before him.',
        characters: ['kumbhakarna'],
        location: 'lanka',
        motif: 'battle',
      },
      {
        title: 'The fall of Kumbhakarna',
        narrative:
          'Rama’s arrows bring the giant down. Even in death Kumbhakarna is enormous, and the war pauses around the body of a man who chose family over judgement.',
        characters: ['kumbhakarna', 'rama'],
        location: 'lanka',
        motif: 'battle',
      },
      {
        title: 'Indrajit’s sorcery',
        narrative:
          'Indrajit enters the war with weapons that bend perception. He can become invisible, strike from nowhere, and make the battlefield itself untrustworthy.',
        characters: ['indrajit'],
        location: 'lanka',
        motif: 'battle',
        featured: true,
      },
      {
        title: 'Lakshmana faces Indrajit',
        narrative:
          'Lakshmana takes the field against Ravana’s son. The fight is not only between warriors but between two kinds of devotion: one turned toward power, the other toward a brother.',
        characters: ['lakshmana', 'indrajit'],
        location: 'lanka',
        motif: 'battle',
      },
      {
        title: 'Lakshmana falls',
        narrative:
          'Indrajit’s weapon strikes Lakshmana down. Rama’s composure breaks; the war becomes personal again, and the question is no longer victory but whether a brother will breathe.',
        characters: ['lakshmana', 'rama', 'hanuman'],
        location: 'lanka',
        motif: 'battle',
      },
      {
        title: 'Hanuman is called',
        narrative:
          'The physicians say that only the herb sanjeevani can save Lakshmana. Hanuman does not wait for a map; he asks for a direction and rises into the sky.',
        characters: ['hanuman', 'rama'],
        location: 'lanka',
        motif: 'battle',
      },
      {
        title: 'The flight north',
        narrative:
          'Hanuman races toward the Himalayas. The ocean and mountains pass beneath him in a single line of purpose, and the world becomes an obstacle between a friend and a herb.',
        characters: ['hanuman'],
        location: 'dronagiri',
        motif: 'leap',
        featured: true,
      },
      {
        title: 'Dronagiri',
        narrative:
          'He reaches the mountain of herbs but cannot identify the sanjeevani among the many plants. Rather than return with the wrong medicine, Hanuman lifts the entire mountain.',
        characters: ['hanuman'],
        location: 'dronagiri',
        motif: 'mountain',
      },
      {
        title: 'The mountain carried',
        narrative:
          'Hanuman flies south with Dronagiri in his arms. The image is enormous and almost tender: strength used not for destruction but for the rescue of a single life.',
        characters: ['hanuman'],
        location: 'dronagiri',
        motif: 'mountain',
        featured: true,
      },
      {
        title: 'The return to Lanka',
        narrative:
          'He lands among the army with the mountain still intact. The herb is found, Lakshmana breathes, and the host sees that devotion can be as practical as medicine.',
        characters: ['hanuman', 'lakshmana', 'rama'],
        location: 'lanka',
        motif: 'battle',
      },
      {
        title: 'Lakshmana recovers',
        narrative:
          'Lakshmana opens his eyes. Rama’s relief is quiet, almost invisible, but the army feels it and takes up the war again with renewed resolve.',
        characters: ['lakshmana', 'rama', 'hanuman'],
        location: 'lanka',
        motif: 'battle',
      },
      {
        title: 'The battle renewed',
        narrative:
          'The war resumes with greater ferocity. Both sides have lost much, and the field is no longer a place of glory but of endurance.',
        characters: ['rama', 'sugriva', 'hanuman'],
        location: 'lanka',
        motif: 'battle',
      },
      {
        title: 'Indrajit’s last stand',
        narrative:
          'Indrajit returns to the field with all his illusions. Lakshmana meets him again, and this time the contest is not interrupted by sorcery but brought to its end.',
        characters: ['lakshmana', 'indrajit'],
        location: 'lanka',
        motif: 'battle',
      },
      {
        title: 'The defeat of Indrajit',
        narrative:
          'Indrajit falls. Ravana loses a son and a shield; the king’s grief turns his resolve into something harder and more reckless.',
        characters: ['indrajit', 'ravana'],
        location: 'lanka',
        motif: 'battle',
      },
      {
        title: 'Ravana’s grief',
        narrative:
          'The king of Lanka receives the news in private, and for a moment the ten-headed monarch is only a father. Then the grief hardens into the decision to fight Rama himself.',
        characters: ['ravana'],
        location: 'lanka',
        motif: 'court',
        time: 'night',
      },
      {
        title: 'Rama prepares',
        narrative:
          'Rama prepares for the final confrontation. He does not celebrate the losses of his enemy; he asks for the blessings of the sages and the army, and takes up his bow.',
        characters: ['rama', 'lakshmana', 'vibhishana'],
        location: 'lanka',
        motif: 'battle',
      },
      {
        title: 'Rama and Ravana face each other',
        narrative:
          'The two kings meet on the field. Ravana is magnificent, exhausted and unrepentant; Rama is calm, armed with a purpose that has survived every loss.',
        characters: ['rama', 'ravana'],
        location: 'lanka',
        motif: 'battle',
        featured: true,
      },
      {
        title: 'The divine chariot',
        narrative:
          'Rama receives a divine chariot and the weapons of the gods. The final battle is fought between two visions of strength: one that takes, and one that protects.',
        characters: ['rama', 'ravana'],
        location: 'lanka',
        motif: 'battle',
      },
      {
        title: 'The final battle',
        narrative:
          'The duel moves across the field and into the sky. Each blow is an argument; each defence a memory. The war narrows to two figures and the question of what will be left standing.',
        characters: ['rama', 'ravana'],
        location: 'lanka',
        motif: 'battle',
      },
      {
        title: 'Ravana falls',
        narrative:
          'Rama’s arrow finds the source of Ravana’s invulnerability. The king of Lanka falls, and the city that was built around his will goes silent.',
        characters: ['rama', 'ravana'],
        location: 'lanka',
        motif: 'battle',
        featured: true,
      },
      {
        title: 'The war ends',
        narrative:
          'The fighting stops. The dead are counted, the wounded tended, and the sea continues to move against the shore as if nothing has happened.',
        characters: ['rama', 'lakshmana', 'hanuman'],
        location: 'lanka',
        motif: 'battle',
      },
      {
        title: 'The victory',
        narrative:
          'The vanara host celebrates, but the joy is tempered. Rama’s face holds no triumph; he has won a war and still cannot undo what was taken.',
        characters: ['rama', 'sugriva', 'hanuman', 'vibhishana'],
        location: 'lanka',
        motif: 'battle',
      },
      {
        title: 'The cost of victory',
        narrative:
          'Rama looks over the field and thinks of Jatayu, of Vali, of every family on both sides. Victory, the epic suggests, is not innocence; it is responsibility.',
        characters: ['rama'],
        location: 'lanka',
        motif: 'battle',
        time: 'dusk',
        featured: true,
      },
    ],
  }),
  makeChapter({
    id: 'return',
    number: 11,
    title: 'Return to Ayodhya',
    devanagari: 'अयोध्या',
    translation: 'The lamp lifted home',
    emotion: 'Joy and peace',
    palette: 'marigold',
    motif: 'coronation',
    time: 'dawn',
    summary:
      'After the war, Rama must do the harder work of return: restore a kingdom, honour a promise, meet a brother who has ruled without a crown, and sit on a throne that cost him everything. Ayodhya prepares its lamps.',
    opening:
      'The exile is over. The road home is not a return to what was, but the beginning of what must be built.',
    scenes: [
      {
        title: 'After the war',
        narrative:
          'Lanka is quiet. The sea wind moves through broken walls, and the survivors begin the slow work of deciding what comes next.',
        characters: ['rama', 'lakshmana', 'vibhishana'],
        location: 'lanka',
        motif: 'battle',
        time: 'dawn',
      },
      {
        title: 'Vibhishana is crowned',
        narrative:
          'Rama installs Vibhishana as king of Lanka. The rakshasa who chose refuge becomes the ruler of the city he left, and the epic allows an enemy’s family to become part of its future.',
        characters: ['vibhishana', 'rama'],
        location: 'lanka',
        motif: 'coronation',
      },
      {
        title: 'Rama and Sita reunited',
        narrative:
          'Sita comes out of the ashoka grove. Rama meets her with a restraint that the years have taught him, and the reunion is not a simple embrace but a recognition of how much has been carried.',
        characters: ['rama', 'sita', 'hanuman'],
        location: 'ashoka',
        motif: 'garden',
        featured: true,
      },
      {
        title: 'Preparations for departure',
        narrative:
          'The host prepares to leave Lanka. Gifts are exchanged, alliances are sealed, and Hanuman refuses every reward, asking only to remain near Rama.',
        characters: ['rama', 'sita', 'hanuman', 'vibhishana'],
        location: 'lanka',
        motif: 'city',
      },
      {
        title: 'The Pushpaka Vimana',
        narrative:
          'The Pushpaka Vimana is brought for the journey home. The flying palace that carried Sita away becomes the vessel of her return, transformed by the hand that now commands it.',
        characters: ['rama', 'sita', 'lakshmana', 'hanuman'],
        location: 'ocean',
        motif: 'leap',
        featured: true,
      },
      {
        title: 'The journey home',
        narrative:
          'The vimana rises over Lanka and crosses the sea. Below, the Setu looks like a line drawn by a careful hand, and the forests of the south open one after another.',
        characters: ['rama', 'sita', 'lakshmana', 'hanuman'],
        location: 'ocean',
        motif: 'leap',
        featured: true,
      },
      {
        title: 'Places remembered',
        narrative:
          'They pass over Panchavati, Chitrakoot and the river crossings of the exile. Each place holds a version of them that no longer exists; the journey home is also a journey through grief.',
        characters: ['rama', 'sita', 'lakshmana'],
        location: 'chitrakoot',
        motif: 'forest',
      },
      {
        title: 'Approaching Ayodhya',
        narrative:
          'From the air, Ayodhya is a golden cluster beside the Sarayu. Fourteen years have changed the city; it is smaller and more precious than memory.',
        characters: ['rama', 'sita', 'bharata'],
        location: 'ayodhya',
        motif: 'city',
        featured: true,
      },
      {
        title: 'Bharata waits',
        narrative:
          'Bharata has kept his vigil every day of the exile. When the news arrives, he does not wait for the vimana to land; he runs toward the edge of the city.',
        characters: ['bharata', 'hanuman'],
        location: 'ayodhya',
        motif: 'city',
      },
      {
        title: 'Hanuman brings the news',
        narrative:
          'Hanuman reaches Ayodhya first, carrying the announcement of the return. The city begins to wake, and lamps are lit before the sun has fully risen.',
        characters: ['hanuman', 'bharata'],
        location: 'ayodhya',
        motif: 'city',
      },
      {
        title: 'Bharata’s joy',
        narrative:
          'Bharata falls at Rama’s feet. The sandals are returned to their owner; the regent becomes a brother again, and the weight he has carried for fourteen years lifts in a single gesture.',
        characters: ['bharata', 'rama', 'lakshmana'],
        location: 'ayodhya',
        motif: 'city',
      },
      {
        title: 'Rama comes home',
        narrative:
          'The exiles enter the city they left as heirs and return as survivors. The streets are lined with faces; some are familiar, some are new, and all are part of the homecoming.',
        characters: ['rama', 'sita', 'lakshmana', 'bharata'],
        location: 'ayodhya',
        motif: 'city',
      },
      {
        title: 'The reunion of brothers',
        narrative:
          'Rama, Bharata, Lakshmana and Shatrughna stand together in the palace courtyard. Four princes left this place; four men have returned, each carrying a different part of the same promise.',
        characters: ['rama', 'bharata', 'lakshmana', 'shatrughna'],
        location: 'ayodhya',
        motif: 'palace',
        featured: true,
      },
      {
        title: 'The city celebrates',
        narrative:
          'Ayodhya decorates itself in marigold, lamp oil and relief. Musicians return to the squares, and the Sarayu carries the sound of celebration downstream.',
        characters: ['rama', 'sita'],
        location: 'ayodhya',
        motif: 'city',
      },
      {
        title: 'The coronation preparations',
        narrative:
          'The priests prepare the sacred fire; the queens prepare the garments; the city cleans its thresholds. This time the coronation is not interrupted.',
        characters: ['rama', 'sita', 'vashistha'],
        location: 'ayodhya',
        motif: 'coronation',
      },
      {
        title: 'The coronation of Rama',
        narrative:
          'Rama is crowned beneath a rain of flowers. Sita sits beside him, and the throne is finally occupied by the promise that was kept.',
        characters: ['rama', 'sita', 'vashistha', 'bharata', 'lakshmana', 'hanuman'],
        location: 'ayodhya',
        motif: 'coronation',
        featured: true,
      },
      {
        title: 'Hanuman’s devotion',
        narrative:
          'Hanuman stands at the edge of the ceremony with folded hands, refusing a throne of his own. For him, service is not a lesser role; it is the whole of dharma.',
        characters: ['hanuman', 'rama', 'sita'],
        location: 'ayodhya',
        motif: 'coronation',
      },
      {
        title: 'Ram Rajya',
        narrative:
          'Under Rama’s rule, the kingdom is described as a time of abundance and justice, where the well-being of the least is the measure of the whole. The image becomes an ideal that later generations never stop reaching for.',
        characters: ['rama', 'sita', 'bharata', 'hanuman'],
        location: 'ayodhya',
        motif: 'coronation',
        featured: true,
      },
    ],
  }),
  makeChapter({
    id: 'uttara',
    number: 12,
    title: 'Uttara Kanda',
    devanagari: 'उत्तरकाण्ड',
    translation: 'What the story leaves behind',
    emotion: 'Reflection',
    palette: 'indigo',
    motif: 'ashram',
    time: 'dusk',
    summary:
      'The epic’s final book turns from battle to the unease of a kingdom at peace. Public opinion, tenderness, separation and the birth of Lava and Kusha complicate the idea of a perfect reign. Traditions differ sharply about these events, and this chapter holds those differences openly.',
    opening:
      'A kingdom can be peaceful and still be wounded. The last book asks what a society owes to the truth of its own stories.',
    scenes: [
      {
        title: 'The kingdom under Rama',
        narrative:
          'Ayodhya prospers under Rama’s rule. The palace is calm, the granaries are full, and the king spends long hours listening to the concerns of ordinary people.',
        characters: ['rama', 'sita'],
        location: 'ayodhya',
        motif: 'city',
        time: 'day',
      },
      {
        title: 'The question of public opinion',
        narrative:
          'A whisper reaches the palace: some citizens question whether a king should live with a woman who has been in another man’s house. The whisper is unjust, but it is also public, and Rama must decide what a king owes to a story.',
        characters: ['rama'],
        location: 'ayodhya',
        motif: 'court',
        context:
          'The Uttara Kanda is widely regarded as a later addition to the Valmiki Ramayana, and the Sita episode is interpreted very differently across traditions. Some treat it as canonical; others reject its portrayal of Rama. This chapter presents it as a contested literary and devotional inheritance.',
      },
      {
        title: 'Sita is asked to leave',
        narrative:
          'Rama arranges for Sita to be taken to the forest. The decision is described with grief and restraint, but no explanation can make it gentle; the epic records a wound rather than resolving it.',
        characters: ['rama', 'sita'],
        location: 'ayodhya',
        motif: 'palace',
        time: 'night',
      },
      {
        title: 'To Valmiki’s ashram',
        narrative:
          'Sita arrives at the hermitage of Valmiki, the poet who will one day tell her story. The forest receives her with the same patience it offered the exiles years before.',
        characters: ['sita', 'vishwamitra'],
        location: 'valmiki-ashram',
        motif: 'ashram',
        featured: true,
      },
      {
        title: 'Life in the hermitage',
        narrative:
          'Sita finds a quiet rhythm among the sages: water, prayer, learning, the company of women who ask no questions about palaces. The ashram becomes a place of survival and, briefly, of peace.',
        characters: ['sita'],
        location: 'valmiki-ashram',
        motif: 'ashram',
        featured: true,
      },
      {
        title: 'The birth of Lava and Kusha',
        narrative:
          'Sita gives birth to twin sons, Lava and Kusha. In the smallness of the hermitage their arrival is enormous: the future of a lineage held in two sleeping bodies.',
        characters: ['sita'],
        location: 'valmiki-ashram',
        motif: 'ashram',
      },
      {
        title: 'Children of the ashram',
        narrative:
          'The boys grow among the sages, learning the forest, the Vedas and the discipline of the bow. They know their mother’s love before they know their father’s name.',
        characters: ['sita'],
        location: 'valmiki-ashram',
        motif: 'ashram',
        featured: true,
      },
      {
        title: 'Valmiki teaches the Ramayana',
        narrative:
          'Valmiki composes the Ramayana and teaches it to Lava and Kusha. The children become the first singers of their own origin story, carrying a poem that contains the truth their father cannot speak.',
        characters: ['vishwamitra'],
        location: 'valmiki-ashram',
        motif: 'manuscript',
        time: 'day',
      },
      {
        title: 'The Ashvamedha',
        narrative:
          'Rama performs the Ashvamedha, a royal rite of sovereignty. The kingdom gathers around its king, but the ceremony cannot fill the absence at the centre of the palace.',
        characters: ['rama', 'sita'],
        location: 'ayodhya',
        motif: 'coronation',
        time: 'day',
      },
      {
        title: 'Lava and Kusha encounter the story',
        narrative:
          'The young singers travel to Ayodhya and recite the Ramayana in the king’s presence. Rama listens to his own life become poetry, and the court hears events it had tried to place beyond memory.',
        characters: ['rama', 'sita'],
        location: 'ayodhya',
        motif: 'court',
      },
      {
        title: 'The meeting with Rama',
        narrative:
          'Rama recognises the boys. The recognition is not a simple reunion; it arrives inside a poem, with Sita’s absence standing beside it. The family is revealed and divided at the same moment.',
        characters: ['rama', 'sita'],
        location: 'ayodhya',
        motif: 'court',
        featured: true,
      },
      {
        title: 'The final assembly',
        narrative:
          'Sita is called to the assembly to speak for herself. She does not argue; she calls the earth that gave her to witness a life lived without concealment.',
        characters: ['sita', 'rama', 'vishwamitra'],
        location: 'ayodhya',
        motif: 'court',
        time: 'dusk',
        featured: true,
      },
      {
        title: 'Sita returns to the earth',
        narrative:
          'The earth opens and receives Sita. The moment is not rendered as punishment but as return: the daughter of the furrow goes back to the ground from which she came, leaving grief and a story behind.',
        characters: ['sita', 'rama'],
        location: 'ayodhya',
        motif: 'court',
        time: 'dusk',
        context:
          'Sita’s return to the earth is told in the Uttara Kanda. Many later traditions reinterpret or resist the episode; it remains one of the epic’s most debated and emotionally charged passages.',
      },
      {
        title: 'The legacy of the Ramayana',
        narrative:
          'Rama rules on, and the story travels beyond him: into languages, performance traditions, devotional song, sculpture and film. The Ramayana ceases to belong to one teller and becomes a library of tellings.',
        characters: ['rama', 'hanuman'],
        location: 'ayodhya',
        motif: 'coronation',
        time: 'dusk',
        featured: true,
      },
    ],
  }),
];

export const totalScenes = chapters.reduce((sum, chapter) => sum + chapter.scenes.length, 0);

export function getChapterByNumber(number: number) {
  return chapters.find((chapter) => chapter.number === number);
}

export function getSceneById(id: string): { chapter: Chapter; scene: Scene } | undefined {
  for (const chapter of chapters) {
    const scene = chapter.scenes.find((entry) => entry.id === id);
    if (scene) return { chapter, scene };
  }
  return undefined;
}

export const featuredScenes = (chapter: Chapter) => {
  const selected = chapter.scenes.filter((scene) => scene.featured);
  return selected.length >= 4 ? selected : chapter.scenes.slice(0, Math.min(5, chapter.scenes.length));
};
