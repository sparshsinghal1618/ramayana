import { useRef, useState, type KeyboardEvent } from 'react';
import { traditions, sourceNotes } from '../data/traditions';
import { Reveal } from './Reveal';
import { Ornament } from './Ornament';

const contested = [
  {
    title: 'The Lakshmana rekha',
    body:
      'The protective line drawn around Sita is one of the most famous images in the Ramayana — and it is absent from the Valmiki text. It belongs to later retellings and performance traditions. This edition does not present it as canonical.',
  },
  {
    title: 'The Uttara Kanda',
    body:
      'The final book, with Sita’s return to the earth and the lives of Lava and Kusha, is widely regarded by scholars as a later addition. It is part of the living tradition and is presented here with that debate intact.',
  },
  {
    title: 'Shabari’s berries',
    body:
      'Valmiki has Rama meet the ascetic Shabari; the beloved detail of the tasted berries is developed in later devotional tellings, especially the Ramcharitmanas. The scene is marked as a tradition note rather than folded into the oldest layer.',
  },
  {
    title: 'Rama and Vali',
    body:
      'Valmiki gives Vali a formidable argument against Rama’s concealed attack. The epic does not resolve the moral question for the reader. Later traditions often defend Rama’s act; this edition leaves the wound visible.',
  },
];

export function Traditions() {
  const [active, setActive] = useState(traditions[0].id);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const tradition = traditions.find((entry) => entry.id === active) ?? traditions[0];
  const activeIndex = traditions.findIndex((entry) => entry.id === active);

  const onKeyDown = (event: KeyboardEvent) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let next = activeIndex;
    if (event.key === 'ArrowLeft') next = (activeIndex - 1 + traditions.length) % traditions.length;
    if (event.key === 'ArrowRight') next = (activeIndex + 1) % traditions.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = traditions.length - 1;
    setActive(traditions[next].id);
    tabs.current[next]?.focus();
  };

  return (
    <section className="traditions section" id="traditions" aria-labelledby="traditions-title">
      <div className="shell">
        <Reveal className="archive-head">
          <div className="section-index">
            <span>06</span>
            <span className="section-index-label">Traditions & Sources</span>
          </div>
          <div className="archive-head-grid">
            <h2 id="traditions-title" className="display display-lg">
              One story,
              <br />
              many tellings.
            </h2>
            <div className="archive-intro">
              <p>
                There is no single Ramayana. There is a family of texts, performances and
                interpretations, each making its own promise to the past. This edition follows
                Valmiki’s narrative and marks the places where other voices enter.
              </p>
              <p className="archive-count">
                {traditions.length} traditions <span aria-hidden="true">·</span> an open inheritance
              </p>
            </div>
          </div>
        </Reveal>

        <div className="tradition-layout">
          <div className="tradition-tabs" role="tablist" aria-label="Ramayana traditions" onKeyDown={onKeyDown}>
            {traditions.map((entry, index) => (
              <button
                key={entry.id}
                ref={(node) => {
                  tabs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`tradition-tab-${entry.id}`}
                aria-selected={active === entry.id}
                aria-controls="tradition-panel"
                tabIndex={active === entry.id ? 0 : -1}
                className={active === entry.id ? 'is-active' : ''}
                onClick={() => setActive(entry.id)}
              >
                <span className="tradition-tab-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="tradition-tab-copy">
                  <strong>{entry.name}</strong>
                  <small>{entry.language}</small>
                </span>
                <span className="tradition-tab-period">{entry.period.split(';')[0]}</span>
              </button>
            ))}
          </div>

          <div
            className="tradition-panel"
            id="tradition-panel"
            role="tabpanel"
            aria-labelledby={`tradition-tab-${tradition.id}`}
            tabIndex={0}
            key={tradition.id}
          >
            <div className="tradition-panel-head">
              <p className="eyebrow">
                {tradition.language} <span aria-hidden="true">·</span> {tradition.region}
              </p>
              <h3>{tradition.name}</h3>
              <p className="tradition-period">{tradition.period}</p>
            </div>
            <div className="tradition-columns">
              <div>
                <p className="eyebrow">Emphasis</p>
                <p>{tradition.emphasis}</p>
              </div>
              <div>
                <p className="eyebrow">What differs</p>
                <p>{tradition.differences}</p>
              </div>
            </div>
            <Ornament className="tradition-ornament" variant="diamond" />
            <p className="tradition-close">
              {tradition.id === 'valmiki'
                ? 'This project’s primary narrative frame.'
                : 'Read alongside the Valmiki narrative, not instead of it.'}
            </p>
          </div>
        </div>

        <div className="contested-section">
          <Reveal className="contested-head" delay={0.04}>
            <p className="eyebrow">Read with care</p>
            <h3>Four places where the story argues with itself.</h3>
          </Reveal>
          <div className="contested-grid">
            {contested.map((entry, index) => (
              <Reveal key={entry.title} delay={index * 0.05}>
                <article className="contested-card">
                  <span className="contested-number">{String(index + 1).padStart(2, '0')}</span>
                  <h4>{entry.title}</h4>
                  <p>{entry.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="source-notes">
          <div className="source-notes-head">
            <p className="eyebrow">Notes on method</p>
            <h3>How this retelling handles its sources.</h3>
          </div>
          <ol>
            {sourceNotes.map((note, index) => (
              <li key={note}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p>{note}</p>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
