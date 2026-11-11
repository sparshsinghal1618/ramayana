import { Reveal } from './Reveal';
import { scrollToId } from '../lib/hooks';
import { useExperience } from '../experience/ExperienceContext';

const primary = [
  'Valmiki Ramayana, seven kandas — the primary narrative frame for this retelling.',
  'The Ramayana tradition in performance: Ramlila, Kathakali, Yakshagana, shadow puppetry and recitation.',
];

const retellings = [
  'Tulsidas, Ramcharitmanas (1574 CE), Awadhi.',
  'Kamban, Ramavataram (12th century), Tamil.',
  'Adhyatma Ramayana, late medieval Sanskrit devotional retelling.',
  'A. K. Ramanujan, “Three Hundred Ramayanas: Five Examples and Three Thoughts on Translation,” in Many Ramayanas, edited by Paula Richman (University of California Press, 1991).',
  'Robert Goldman et al., The Ramayana of Valmiki: An Epic of Ancient India (Princeton University Press).',
  'Paula Richman, editor, Many Ramayanas: The Diversity of a Narrative Tradition in South Asia (1991).',
];

const craft = [
  'Narrative prose, scene structures, character and place descriptions: original to this edition.',
  'Illustrations, portraits, maps and object glyphs: original procedural SVG, drawn in code for this project.',
  'Ambience: original Web Audio synthesis. No recordings, samples or external audio files.',
  'Typography: Cormorant Garamond, EB Garamond, DM Sans and Noto Serif Devanagari, served by Google Fonts.',
  'Built with React, TypeScript, Vite, GSAP and Framer Motion.',
];

export function Credits() {
  const { reducedMotion } = useExperience();

  return (
    <section className="credits section" id="credits" aria-labelledby="credits-title">
      <div className="shell">
        <Reveal className="credits-head">
          <div className="section-index">
            <span>09</span>
            <span className="section-index-label">Credits & Sources</span>
          </div>
          <div className="credits-head-grid">
            <h2 id="credits-title" className="display display-lg">
              A book made
              <br />
              from other books.
            </h2>
            <p>
              An honest account of the material behind this edition, and of the traditions it has
              tried to treat with care. Further reading is offered for context; it is not required
              to use this site.
            </p>
          </div>
        </Reveal>

        <div className="credits-grid">
          <Reveal className="credits-column">
            <p className="eyebrow">Primary frame</p>
            <ul>
              {primary.map((entry) => (
                <li key={entry}>{entry}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="credits-column" delay={0.05}>
            <p className="eyebrow">Retellings & scholarship</p>
            <ul>
              {retellings.map((entry) => (
                <li key={entry}>{entry}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="credits-column" delay={0.1}>
            <p className="eyebrow">Craft & technology</p>
            <ul>
              {craft.map((entry) => (
                <li key={entry}>{entry}</li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal className="colophon">
          <p>
            <strong>Colophon.</strong> This is an independent, non-commercial creative work. It is
            not affiliated with any temple, publisher, political organisation or streaming
            adaptation. No quotation is attributed to an ancient text unless it is explicitly
            identified. The retelling is interpretive, and all errors of emphasis remain the
            author’s.
          </p>
          <p>
            Preferences are stored in your browser’s local storage. There are no cookies, accounts,
            analytics or tracking scripts.
          </p>
          <button
            type="button"
            className="button button-ghost button-small"
            onClick={() => scrollToId('top', reducedMotion)}
          >
            Return to the beginning <span aria-hidden="true">↑</span>
          </button>
        </Reveal>
      </div>
    </section>
  );
}
