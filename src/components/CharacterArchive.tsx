import { useMemo, useState } from 'react';
import { characters, factions } from '../data/characters';
import { Portrait } from '../art/Portrait';
import type { Character, Faction } from '../data/types';
import { useExperience } from '../experience/ExperienceContext';
import { useLazyRender, scrollToId } from '../lib/hooks';
import { Modal } from './Modal';
import { Reveal } from './Reveal';
import { chapterAnchor, chapterLabel } from '../data/visuals';

interface CharacterArchiveProps {
  selected: string | null;
  onSelect: (id: string | null) => void;
  onLocation?: (id: string) => void;
}

const factionOrder: Array<{ id: Faction | 'all'; label: string }> = [
  { id: 'all', label: 'All figures' },
  ...factions,
];

export function CharacterArchive({ selected, onSelect, onLocation }: CharacterArchiveProps) {
  const [filter, setFilter] = useState<Faction | 'all'>('all');
  const [query, setQuery] = useState('');
  const { quality, reducedMotion } = useExperience();

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return characters.filter((character) => {
      if (filter !== 'all' && character.faction !== filter) return false;
      if (!needle) return true;
      return [character.name, character.epithet, character.role, ...character.aliases]
        .join(' ')
        .toLowerCase()
        .includes(needle);
    });
  }, [filter, query]);

  const activeCharacter = selected
    ? characters.find((character) => character.id === selected) ?? null
    : null;
  const activeIndex = activeCharacter
    ? characters.findIndex((character) => character.id === activeCharacter.id)
    : -1;

  const step = (direction: 1 | -1) => {
    if (activeIndex < 0) return;
    const next = characters[(activeIndex + direction + characters.length) % characters.length];
    onSelect(next.id);
  };

  return (
    <section className="characters section" id="characters" aria-labelledby="characters-title">
      <div className="shell">
        <Reveal className="archive-head">
          <div className="section-index">
            <span>02</span>
            <span className="section-index-label">The Character Archive</span>
          </div>
          <div className="archive-head-grid">
            <h2 id="characters-title" className="display display-lg">
              The people
              <br />
              who carry the story.
            </h2>
            <div className="archive-intro">
              <p>
                Twenty-nine figures, from the throne room to the ashoka grove. Each portrait is an
                original drawing built from the same visual grammar as the chapter illustrations.
              </p>
              <p className="archive-count">
                {characters.length} figures <span aria-hidden="true">·</span> {factions.length} worlds
              </p>
            </div>
          </div>
        </Reveal>

        <div className="archive-controls">
          <div className="filter-row" role="group" aria-label="Filter characters">
            {factionOrder.map((entry) => (
              <button
                key={entry.id}
                type="button"
                className={filter === entry.id ? 'is-active' : ''}
                onClick={() => setFilter(entry.id)}
                aria-pressed={filter === entry.id}
              >
                {entry.label}
              </button>
            ))}
          </div>
          <label className="archive-search">
            <span className="sr-only">Search characters</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.5" cy="10.5" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.3" />
              <path d="M15.5 15.5L21 21" stroke="currentColor" strokeWidth="1.3" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search names, epithets, roles…"
            />
            {query && (
              <button type="button" onClick={() => setQuery('')} aria-label="Clear search">
                ×
              </button>
            )}
          </label>
        </div>

        {visible.length ? (
          <ul className="character-grid">
            {visible.map((character, index) => (
              <li key={character.id} style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}>
                <CharacterCard
                  character={character}
                  quality={quality}
                  onOpen={() => onSelect(character.id)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-state">
            <p>No figures match that search.</p>
            <button
              type="button"
              className="text-button"
              onClick={() => {
                setQuery('');
                setFilter('all');
              }}
            >
              Show every figure
            </button>
          </div>
        )}
      </div>

      <Modal
        open={Boolean(activeCharacter)}
        onClose={() => onSelect(null)}
        labelledBy="character-modal-title"
        className="character-modal"
      >
        {activeCharacter && (
          <div className="character-modal-body">
            <div className="character-modal-portrait">
              <Portrait character={activeCharacter} />
              <p className="character-modal-portrait-label">
                Plate {String(activeIndex + 1).padStart(2, '0')} · {activeCharacter.kingdom}
              </p>
            </div>
            <div className="character-modal-copy">
              <p className="eyebrow">
                {factions.find((faction) => faction.id === activeCharacter.faction)?.label}
              </p>
              <div className="character-modal-title-row">
                <h2 id="character-modal-title">{activeCharacter.name}</h2>
                <span lang="sa">{activeCharacter.devanagari}</span>
              </div>
              <p className="character-epithet">{activeCharacter.epithet}</p>
              {activeCharacter.aliases.length > 0 && (
                <p className="character-aliases">
                  Also known as {activeCharacter.aliases.join(', ')}.
                </p>
              )}
              <p className="character-summary">{activeCharacter.summary}</p>
              <div className="character-split">
                <div>
                  <p className="eyebrow">Character</p>
                  <p>{activeCharacter.personality}</p>
                </div>
                <div>
                  <p className="eyebrow">Role</p>
                  <p>{activeCharacter.role}</p>
                </div>
              </div>

              <div className="character-detail-grid">
                <div>
                  <p className="eyebrow">Kingdom</p>
                  <p>{activeCharacter.kingdom}</p>
                </div>
                <div>
                  <p className="eyebrow">Appears in</p>
                  <div className="mini-chapter-list">
                    {activeCharacter.chapters.map((chapter) => (
                      <button
                        key={chapter}
                        type="button"
                        className="chapter-chip"
                        onClick={() => {
                          onSelect(null);
                          scrollToId(chapterAnchor(chapter), reducedMotion);
                        }}
                      >
                        {chapterLabel(chapter)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="character-block">
                <p className="eyebrow">Life and events</p>
                <ul className="event-list">
                  {activeCharacter.events.map((event) => (
                    <li key={event}>{event}</li>
                  ))}
                </ul>
              </div>

              <div className="character-detail-grid">
                <div>
                  <p className="eyebrow">Objects</p>
                  <ul className="plain-list">
                    {activeCharacter.objects.map((object) => (
                      <li key={object}>{object}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="eyebrow">Places</p>
                  <div className="chip-row">
                    {activeCharacter.locations.map((location) => (
                      <button
                        key={location}
                        type="button"
                        className="chip chip-button chip-small"
                        onClick={() => {
                          onSelect(null);
                          onLocation?.(location);
                        }}
                      >
                        {location.replace(/-/g, ' ')}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {activeCharacter.relatives.length > 0 && (
                <div className="character-block">
                  <p className="eyebrow">Relationships</p>
                  <div className="chip-row">
                    {activeCharacter.relatives.map((relativeId) => {
                      const relative = characters.find((entry) => entry.id === relativeId);
                      if (!relative) return null;
                      return (
                        <button
                          key={relativeId}
                          type="button"
                          className="chip chip-button"
                          onClick={() => onSelect(relativeId)}
                        >
                          {relative.name}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="character-modal-nav">
                <button type="button" className="scene-nav-button" onClick={() => step(-1)}>
                  <span className="scene-nav-direction">← Previous figure</span>
                  <span>{characters[(activeIndex - 1 + characters.length) % characters.length].name}</span>
                </button>
                <button
                  type="button"
                  className="scene-nav-button scene-nav-next"
                  onClick={() => step(1)}
                >
                  <span className="scene-nav-direction">Next figure →</span>
                  <span>{characters[(activeIndex + 1) % characters.length].name}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}

function CharacterCard({
  character,
  quality,
  onOpen,
}: {
  character: Character;
  quality: 'high' | 'medium' | 'low';
  onOpen: () => void;
}) {
  const { ref, visible } = useLazyRender('700px');
  return (
    <button type="button" className="character-card" onClick={onOpen} aria-label={`Open ${character.name}`}>
      <div className="character-card-art" ref={ref}>
        {visible ? (
          <Portrait character={character} />
        ) : (
          <div className="portrait-placeholder" aria-hidden="true">
            <span>{character.name.slice(0, 1)}</span>
          </div>
        )}
        <span className="character-card-veil" aria-hidden="true" />
        <span className={`character-faction faction-${character.faction}`}>
          {character.faction}
        </span>
      </div>
      <span className="character-card-copy">
        <span className="character-card-topline">
          <span className="character-name">{character.name}</span>
          <span className="character-devanagari" lang="sa">
            {character.devanagari}
          </span>
        </span>
        <span className="character-epithet-short">{character.epithet}</span>
        <span className="character-card-foot">
          <span>{character.kingdom}</span>
          <span aria-hidden="true">↗</span>
        </span>
      </span>
      <span className="sr-only">Drawn in {quality} detail</span>
    </button>
  );
}
