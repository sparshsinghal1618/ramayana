import { useMemo, useState } from 'react';
import { timeline } from '../data/timeline';
import { getLocation } from '../data/locations';
import { getCharacter } from '../data/characters';
import { useExperience } from '../experience/ExperienceContext';
import { scrollToId } from '../lib/hooks';
import { chapterAnchor } from '../data/visuals';
import { Reveal } from './Reveal';

type Range = 'all' | 'opening' | 'forest' | 'war';

const ranges: Array<{ id: Range; label: string; note: string }> = [
  { id: 'all', label: 'The whole arc', note: '32 moments' },
  { id: 'opening', label: 'I—III', note: 'Ayodhya to Mithila' },
  { id: 'forest', label: 'IV—VI', note: 'Exile to abduction' },
  { id: 'war', label: 'VII—XII', note: 'Alliance to aftermath' },
];

export function Timeline({ onLocation }: { onLocation?: (id: string) => void }) {
  const [range, setRange] = useState<Range>('all');
  const { reducedMotion } = useExperience();
  const events = useMemo(() => {
    if (range === 'all') return timeline;
    if (range === 'opening') return timeline.filter((event) => event.chapter <= 3);
    if (range === 'forest') return timeline.filter((event) => event.chapter >= 4 && event.chapter <= 6);
    return timeline.filter((event) => event.chapter >= 7);
  }, [range]);

  return (
    <section className="timeline-section section is-light" id="timeline" aria-labelledby="timeline-title">
      <div className="shell">
        <Reveal className="timeline-head">
          <div className="section-index">
            <span>04</span>
            <span className="section-index-label">The Chronology</span>
          </div>
          <div className="timeline-head-grid">
            <h2 id="timeline-title" className="display display-lg">
              One thing
              <br />
              after another.
            </h2>
            <div className="timeline-intro">
              <p>
                The epic’s time is not the clock’s time. It moves through ritual, exile, waiting and
                war, doubling back to explain a promise or a curse. This chronology follows the
                narrative order of the Valmiki kandas.
              </p>
              <p className="timeline-dateline">c. last centuries BCE — present day · living tradition</p>
            </div>
          </div>
        </Reveal>

        <div className="timeline-toolbar">
          <div className="timeline-tabs" role="group" aria-label="Filter timeline">
            {ranges.map((entry) => (
              <button
                key={entry.id}
                type="button"
                className={range === entry.id ? 'is-active' : ''}
                onClick={() => setRange(entry.id)}
                aria-pressed={range === entry.id}
              >
                <span>{entry.label}</span>
                <small>{entry.note}</small>
              </button>
            ))}
          </div>
          <p className="timeline-count">
            {String(events.length).padStart(2, '0')} <span>events shown</span>
          </p>
        </div>

        <div className="timeline-layout">
          <aside className="timeline-aside">
            <p className="eyebrow">The shape of the journey</p>
            <ol className="act-list">
              <li>
                <span className="act-number">I</span>
                <div>
                  <strong>The promise</strong>
                  <p>Ayodhya, the interrupted coronation, and the road into exile.</p>
                </div>
              </li>
              <li>
                <span className="act-number">II</span>
                <div>
                  <strong>The search</strong>
                  <p>Abduction, alliance, and a leap across an unmarked sea.</p>
                </div>
              </li>
              <li>
                <span className="act-number">III</span>
                <div>
                  <strong>The reckoning</strong>
                  <p>War, return, and the contested afterlife of the story.</p>
                </div>
              </li>
            </ol>
            <p className="timeline-aside-note">
              Dates are deliberately withheld. The Ramayana’s textual history is layered, and the
              epic’s own chronology is moral rather than archival.
            </p>
          </aside>

          <ol className="timeline-list">
            {events.map((event, index) => {
              const location = getLocation(event.location);
              const characters = event.characters
                .map((id) => getCharacter(id))
                .filter(Boolean)
                .slice(0, 4);
              return (
                <li key={event.id}>
                  <Reveal delay={Math.min(index, 5) * 0.03}>
                    <article className="timeline-event">
                      <div className="timeline-node" aria-hidden="true">
                        <span>{String(event.chapter).padStart(2, '0')}</span>
                      </div>
                      <div className="timeline-event-copy">
                        <p className="timeline-label">
                          {event.label}
                          <button
                            type="button"
                            className="timeline-chapter-link"
                            onClick={() => scrollToId(chapterAnchor(event.chapter), reducedMotion)}
                          >
                            Read book {event.chapter} <span aria-hidden="true">→</span>
                          </button>
                        </p>
                        <h3>{event.title}</h3>
                        <p className="timeline-description">{event.description}</p>
                        <p className="timeline-meta">
                          {location && (
                            <button
                              type="button"
                              className="inline-link"
                              onClick={() => onLocation?.(location.id)}
                            >
                              {location.name}
                            </button>
                          )}
                          {characters.length > 0 && (
                            <>
                              <span aria-hidden="true">·</span>
                              <span>{characters.map((character) => character.name).join(', ')}</span>
                            </>
                          )}
                        </p>
                      </div>
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
