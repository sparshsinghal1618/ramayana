import { useState } from 'react';
import { objects } from '../data/objects';
import { useExperience } from '../experience/ExperienceContext';
import { scrollToId } from '../lib/hooks';
import { chapterAnchor, chapterLabel } from '../data/visuals';
import { Modal } from './Modal';
import { Reveal } from './Reveal';
import { ObjectGlyph } from './ObjectGlyph';

export function Objects() {
  const [selected, setSelected] = useState<string | null>(null);
  const { reducedMotion } = useExperience();
  const active = objects.find((object) => object.id === selected) ?? null;
  const activeIndex = active ? objects.indexOf(active) : -1;

  return (
    <section className="objects section" id="objects" aria-labelledby="objects-title">
      <div className="shell">
        <Reveal className="archive-head">
          <div className="section-index">
            <span>05</span>
            <span className="section-index-label">The Object Archive</span>
          </div>
          <div className="archive-head-grid">
            <h2 id="objects-title" className="display display-lg">
              Things that carry
              <br />
              a promise.
            </h2>
            <div className="archive-intro">
              <p>
                A bow, a ring, a pair of sandals, a bridge. The Ramayana thinks through objects:
                they hold memory, authority and the fragile proof that someone is still searching
                for you.
              </p>
              <p className="archive-count">
                {objects.length} objects <span aria-hidden="true">·</span> each one a turning point
              </p>
            </div>
          </div>
        </Reveal>

        <ul className="object-grid">
          {objects.map((object, index) => (
            <li key={object.id}>
              <Reveal delay={Math.min(index, 6) * 0.04}>
                <button
                  type="button"
                  className="object-card"
                  onClick={() => setSelected(object.id)}
                  aria-label={`Open ${object.name}`}
                >
                  <span className="object-card-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="object-card-glyph">
                    <ObjectGlyph glyph={object.glyph} />
                  </span>
                  <span className="object-card-copy">
                    <span className="object-card-name">
                      {object.name}
                      <span lang="sa">{object.devanagari}</span>
                    </span>
                    <span className="object-card-material">{object.material}</span>
                    <span className="object-card-bearer">Bearer · {object.bearer}</span>
                  </span>
                  <span className="object-card-arrow" aria-hidden="true">
                    ↗
                  </span>
                </button>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal className="objects-footnote">
          <p>
            Objects in the epic are rarely inert. They are evidence, instruments and arguments. The
            archive treats them as narrative devices rather than museum labels.
          </p>
          <p>All glyph drawings are original to this edition.</p>
        </Reveal>
      </div>

      <Modal
        open={Boolean(active)}
        onClose={() => setSelected(null)}
        labelledBy="object-modal-title"
        className="object-modal"
      >
        {active && (
          <div className="object-modal-body">
            <div className="object-modal-visual">
              <ObjectGlyph glyph={active.glyph} />
              <span className="object-modal-index">{String(activeIndex + 1).padStart(2, '0')}</span>
              <p>{active.material}</p>
            </div>
            <div className="object-modal-copy">
              <p className="eyebrow">Object {String(activeIndex + 1).padStart(2, '0')} · {active.bearer}</p>
              <div className="object-modal-title-row">
                <h2 id="object-modal-title">{active.name}</h2>
                <span lang="sa">{active.devanagari}</span>
              </div>
              <p className="object-modal-description">{active.description}</p>
              <div className="character-block">
                <p className="eyebrow">Significance</p>
                <p>{active.significance}</p>
              </div>
              <div className="chapter-block">
                <p className="eyebrow">Appears in</p>
                <div className="chip-row">
                  {active.chapters.map((chapter) => (
                    <button
                      key={chapter}
                      type="button"
                      className="chapter-chip"
                      onClick={() => {
                        setSelected(null);
                        scrollToId(chapterAnchor(chapter), reducedMotion);
                      }}
                    >
                      {chapterLabel(chapter)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="object-modal-nav">
                <button
                  type="button"
                  className="scene-nav-button"
                  onClick={() => {
                    const previous = objects[(activeIndex - 1 + objects.length) % objects.length];
                    setSelected(previous.id);
                  }}
                >
                  <span className="scene-nav-direction">← Previous object</span>
                  <span>{objects[(activeIndex - 1 + objects.length) % objects.length].name}</span>
                </button>
                <button
                  type="button"
                  className="scene-nav-button scene-nav-next"
                  onClick={() => {
                    const next = objects[(activeIndex + 1) % objects.length];
                    setSelected(next.id);
                  }}
                >
                  <span className="scene-nav-direction">Next object →</span>
                  <span>{objects[(activeIndex + 1) % objects.length].name}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
