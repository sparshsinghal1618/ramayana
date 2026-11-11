import { useMemo } from 'react';
import { locations, getLocation } from '../data/locations';
import { getCharacter } from '../data/characters';
import type { Location } from '../data/types';
import { SceneArt } from '../art/SceneArt';
import { useExperience } from '../experience/ExperienceContext';
import { scrollToId } from '../lib/hooks';
import { chapterAnchor, chapterLabel } from '../data/visuals';
import { Reveal } from './Reveal';

interface AtlasProps {
  selected: string | null;
  onSelect: (id: string | null) => void;
  onCharacter?: (id: string) => void;
}

const labelOffsets: Record<string, { dx: number; dy: number; anchor: 'start' | 'middle' | 'end' }> = {
  ayodhya: { dx: -26, dy: -18, anchor: 'end' },
  mithila: { dx: 26, dy: 10, anchor: 'start' },
  chitrakoot: { dx: -24, dy: 16, anchor: 'end' },
  dandakaranya: { dx: 26, dy: 6, anchor: 'start' },
  panchavati: { dx: 26, dy: 8, anchor: 'start' },
  kishkindha: { dx: -24, dy: 14, anchor: 'end' },
  rishyamukha: { dx: 24, dy: 20, anchor: 'start' },
  mahendra: { dx: 26, dy: 6, anchor: 'start' },
  ocean: { dx: 0, dy: 30, anchor: 'middle' },
  lanka: { dx: 26, dy: 8, anchor: 'start' },
  ashoka: { dx: -26, dy: -10, anchor: 'end' },
  dronagiri: { dx: 0, dy: -24, anchor: 'middle' },
  'valmiki-ashram': { dx: 24, dy: 4, anchor: 'start' },
};

const journey = [
  'dronagiri',
  'ayodhya',
  'mithila',
  'chitrakoot',
  'dandakaranya',
  'panchavati',
  'kishkindha',
  'mahendra',
  'ocean',
  'lanka',
  'ashoka',
];

export function Atlas({ selected, onSelect, onCharacter }: AtlasProps) {
  const { quality, reducedMotion } = useExperience();
  const active = getLocation(selected ?? 'ayodhya') ?? locations[0];
  const characters = active.characters.map((id) => getCharacter(id)).filter(Boolean).slice(0, 8);
  const journeyPath = useMemo(() => {
    const points = journey
      .map((id) => getLocation(id))
      .filter((entry): entry is Location => Boolean(entry));
    return points
      .map((point, index) => `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`)
      .join(' ');
  }, []);

  return (
    <section className="atlas section" id="atlas" aria-labelledby="atlas-title">
      <div className="shell">
        <Reveal className="archive-head">
          <div className="section-index">
            <span>03</span>
            <span className="section-index-label">The Atlas</span>
          </div>
          <div className="archive-head-grid">
            <h2 id="atlas-title" className="display display-lg">
              A geography
              <br />
              of the imagination.
            </h2>
            <div className="archive-intro">
              <p>
                From Ayodhya on the Sarayu to a Lanka across the sea, the Ramayana moves through a
                landscape that is partly remembered, partly imagined and entirely meaningful.
              </p>
              <p className="archive-count">
                {locations.length} places <span aria-hidden="true">·</span> one impossible journey
              </p>
            </div>
          </div>
        </Reveal>

        <div className="atlas-layout">
          <div className="atlas-map-wrap">
            <div className="atlas-map-head">
              <p className="eyebrow">Map of the telling</p>
              <p>Tap a place to read its part in the story.</p>
            </div>
            <div className="atlas-map">
              <svg
                viewBox="0 0 1000 1120"
                role="group"
                aria-label="Interpretive map of the Ramayana's literary geography"
              >
                <defs>
                  <linearGradient id="atlas-sea" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#162A31" />
                    <stop offset="0.52" stopColor="#10232B" />
                    <stop offset="1" stopColor="#09171D" />
                  </linearGradient>
                  <linearGradient id="atlas-land" x1="0" y1="0" x2="0.4" y2="1">
                    <stop offset="0" stopColor="#5B513C" />
                    <stop offset="0.5" stopColor="#3F3B2F" />
                    <stop offset="1" stopColor="#2C2C26" />
                  </linearGradient>
                  <radialGradient id="atlas-halo" cx="0.5" cy="0.5" r="0.5">
                    <stop offset="0" stopColor="#D9BC83" stopOpacity="0.4" />
                    <stop offset="1" stopColor="#D9BC83" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <rect width="1000" height="1120" fill="url(#atlas-sea)" />
                <g opacity="0.14" stroke="#D7C69E" strokeWidth="0.7" fill="none">
                  {Array.from({ length: 10 }, (_, i) => (
                    <path key={`v-${i}`} d={`M ${80 + i * 100} 0 L ${80 + i * 100} 1120`} />
                  ))}
                  {Array.from({ length: 11 }, (_, i) => (
                    <path key={`h-${i}`} d={`M 0 ${60 + i * 100} L 1000 ${60 + i * 100}`} />
                  ))}
                </g>
                <g opacity="0.35" fill="none" stroke="#A8C7C2">
                  {Array.from({ length: 12 }, (_, i) => (
                    <path
                      key={i}
                      d={`M ${-80 + i * 30} ${880 + i * 18} Q 300 ${860 + i * 18} 700 ${880 + i * 18} T 1080 ${876 + i * 18}`}
                      strokeWidth={0.7}
                    />
                  ))}
                </g>

                <g>
                  <path
                    d="M 330 60 C 420 30 530 38 620 70 C 710 100 790 130 810 200 C 832 274 792 336 782 398 C 774 448 806 490 784 542 C 764 590 704 606 682 654 C 660 702 642 760 590 800 C 548 832 522 890 488 888 C 452 886 438 826 416 782 C 388 724 348 690 322 638 C 294 582 258 550 248 492 C 238 430 280 388 272 330 C 264 270 282 216 300 160 C 312 120 300 78 330 60 Z"
                    fill="url(#atlas-land)"
                    stroke="#C9AE7C"
                    strokeWidth="1.4"
                  />
                  <path
                    d="M 330 60 C 420 30 530 38 620 70 C 710 100 790 130 810 200 C 832 274 792 336 782 398"
                    fill="none"
                    stroke="#E2C896"
                    strokeWidth="0.8"
                    opacity="0.45"
                  />
                  <g fill="none" stroke="#D5BE8E" strokeWidth="0.7" opacity="0.5">
                    {Array.from({ length: 9 }, (_, i) => (
                      <path
                        key={i}
                        d={`M ${360 + i * 3} ${120 + i * 54} q ${-24 + i * 7} 30 ${8 + i * 5} 62 t ${12 + i * 4} 70`}
                      />
                    ))}
                  </g>
                  <path
                    d="M 390 118 C 480 190 510 250 470 320 C 440 372 500 428 560 470 C 610 504 620 560 590 610"
                    fill="none"
                    stroke="#789B9B"
                    strokeWidth="2"
                    opacity="0.65"
                  />
                  <path
                    d="M 470 320 C 420 370 380 420 390 470 C 398 512 440 540 500 552"
                    fill="none"
                    stroke="#789B9B"
                    strokeWidth="1.1"
                    opacity="0.45"
                  />
                  <g fill="#C5AE81" opacity="0.6">
                    <path d="M 382 212 L 404 168 L 420 206 L 442 150 L 464 210 L 430 224 L 400 220 Z" />
                    <path d="M 440 392 L 456 360 L 468 390 L 484 352 L 498 396 L 470 404 Z" />
                    <path d="M 328 512 L 344 478 L 356 508 L 372 470 L 386 514 Z" />
                  </g>
                </g>

                <g>
                  <path
                    d="M 630 972 C 662 946 720 948 748 978 C 772 1004 758 1042 722 1052 C 688 1062 646 1048 634 1018 C 626 1000 620 986 630 972 Z"
                    fill="#3E3A2E"
                    stroke="#C9AE7C"
                    strokeWidth="1.2"
                  />
                  <path d="M 670 1010 L 680 960 L 690 954 L 702 960 L 710 1010 Z" fill="#27251F" />
                  <path d="M 706 1016 L 714 978 L 726 972 L 736 980 L 742 1018 Z" fill="#27251F" />
                </g>

                <path
                  d={journeyPath}
                  fill="none"
                  stroke="#D9B77E"
                  strokeWidth="1.4"
                  strokeDasharray="3 8"
                  opacity="0.65"
                />
                <path
                  d="M 555 810 Q 620 862 690 1000"
                  fill="none"
                  stroke="#D9B77E"
                  strokeWidth="1"
                  strokeDasharray="2 10"
                  opacity="0.4"
                />

                <g fill="#C7B58C" opacity="0.55" fontFamily="DM Sans, sans-serif" fontSize="12" letterSpacing="3">
                  <text x="820" y="760" transform="rotate(90 820 760)">THE SOUTHERN OCEAN</text>
                  <text x="110" y="340" transform="rotate(-78 110 340)">WESTERN SEA</text>
                  <text x="852" y="260" transform="rotate(78 852 260)">EASTERN SEA</text>
                </g>

                <g transform="translate(880 1000)" stroke="#D9B77E" fill="none" opacity="0.65">
                  <circle r="30" strokeWidth="0.8" />
                  <path d="M 0 -38 L 0 38 M -38 0 L 38 0" strokeWidth="0.7" />
                  <path d="M 0 -38 L 7 -8 L 0 0 L -7 -8 Z" fill="#D9B77E" stroke="none" />
                  <text y="-48" fill="#D9B77E" stroke="none" fontFamily="DM Sans, sans-serif" fontSize="11" textAnchor="middle" letterSpacing="2">N</text>
                </g>

                <circle cx={active.x} cy={active.y} r="72" fill="url(#atlas-halo)" aria-hidden="true" />
                {locations.map((location) => {
                  const isActive = location.id === active.id;
                  const offset = labelOffsets[location.id] ?? { dx: 18, dy: 4, anchor: 'start' as const };
                  return (
                    <g
                      key={location.id}
                      className={`atlas-point ${isActive ? 'is-active' : ''}`}
                      role="button"
                      tabIndex={0}
                      aria-label={`${location.name}, ${location.region}`}
                      aria-pressed={isActive}
                      onClick={() => onSelect(location.id)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          onSelect(location.id);
                        }
                      }}
                    >
                      <circle cx={location.x} cy={location.y} r={isActive ? 20 : 13} fill="transparent" />
                      <circle
                        cx={location.x}
                        cy={location.y}
                        r={isActive ? 6.5 : 4}
                        fill={isActive ? '#F0D8A5' : '#C9A15C'}
                        stroke="#1A1719"
                        strokeWidth="1"
                      />
                      {isActive && (
                        <circle
                          cx={location.x}
                          cy={location.y}
                          r="14"
                          fill="none"
                          stroke="#E4C88F"
                          strokeWidth="0.8"
                          opacity="0.7"
                        />
                      )}
                      <text
                        x={location.x + offset.dx}
                        y={location.y + offset.dy}
                        textAnchor={offset.anchor}
                        fill={isActive ? '#F4E7CC' : '#D6C4A2'}
                        fontFamily="DM Sans, sans-serif"
                        fontSize={isActive ? 14 : 12}
                        letterSpacing="1.6"
                        opacity={isActive ? 1 : 0.8}
                      >
                        {location.name.toUpperCase()}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
            <p className="atlas-map-note">
              An interpretive diagram, not a historical atlas. Epic geography blends real places,
              imagined terrain and symbolic direction.
            </p>
          </div>

          <aside className="atlas-detail" aria-live="polite">
            <div className="atlas-detail-art">
              <SceneArt
                key={active.id}
                motif={active.motif}
                palette={active.palette}
                seed={`atlas-${active.id}`}
                quality={quality === 'high' ? 'medium' : 'low'}
                title={`Illustration of ${active.name}`}
              />
              <span className="atlas-detail-index">{String(locations.indexOf(active) + 1).padStart(2, '0')}</span>
            </div>
            <div className="atlas-detail-copy">
              <p className="eyebrow">{active.region}</p>
              <div className="atlas-name-row">
                <h3>{active.name}</h3>
                <span lang="sa">{active.devanagari}</span>
              </div>
              <p className="atlas-description">{active.description}</p>
              <div className="atlas-block">
                <p className="eyebrow">Significance</p>
                <p>{active.significance}</p>
              </div>
              <div className="atlas-block">
                <p className="eyebrow">Events</p>
                <ul className="plain-list">
                  {active.events.map((event) => (
                    <li key={event}>{event}</li>
                  ))}
                </ul>
              </div>
              <div className="atlas-block">
                <p className="eyebrow">Figures here</p>
                <div className="chip-row">
                  {characters.map((character) => (
                    <button
                      key={character.id}
                      type="button"
                      className="chip chip-button chip-small"
                      onClick={() => onCharacter?.(character.id)}
                    >
                      {character.name}
                    </button>
                  ))}
                </div>
              </div>
              <div className="atlas-block">
                <p className="eyebrow">Books</p>
                <div className="chip-row">
                  {active.chapters.map((chapter) => (
                    <button
                      key={chapter}
                      type="button"
                      className="chapter-chip"
                      onClick={() => scrollToId(chapterAnchor(chapter), reducedMotion)}
                    >
                      {chapterLabel(chapter)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="atlas-note">
                <span>Note</span>
                <p>{active.note}</p>
              </div>
            </div>
            <div className="atlas-index" role="group" aria-label="All places">
              {locations.map((location) => (
                <button
                  key={location.id}
                  type="button"
                  className={location.id === active.id ? 'is-active' : ''}
                  onClick={() => onSelect(location.id)}
                  aria-pressed={location.id === active.id}
                >
                  {location.name}
                </button>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
