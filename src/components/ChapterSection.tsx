import { useRef, useState, type CSSProperties } from 'react';
import { SceneArt } from '../art/SceneArt';
import { chapters, featuredScenes, getChapterByNumber } from '../data/story';
import { getCharacter } from '../data/characters';
import { getLocation } from '../data/locations';
import type { Chapter } from '../data/types';
import {
  chapterAnchor,
  chapterLabel,
  excerpt,
  kandaByChapter,
  romanNumerals,
  sceneFigures,
  timeLabels,
} from '../data/visuals';
import { useExperience } from '../experience/ExperienceContext';
import { useLazyRender, useStageIndex, scrollToId } from '../lib/hooks';
import { SceneModal } from './SceneModal';
import { Ornament } from './Ornament';

interface ChapterSectionProps {
  chapter: Chapter;
  onCharacter?: (id: string) => void;
  onLocation?: (id: string) => void;
}

export function ChapterSection({ chapter, onCharacter, onLocation }: ChapterSectionProps) {
  const { quality, reducedMotion } = useExperience();
  const featured = featuredScenes(chapter);
  const [openScene, setOpenScene] = useState<number | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const { index, goTo } = useStageIndex(stageRef, featured.length, true, reducedMotion);
  const { ref: coverRef, visible: coverVisible } = useLazyRender('500px');
  const { ref: stageArtRef, visible: stageArtVisible } = useLazyRender('600px');

  const previous = chapter.number > 1 ? getChapterByNumber(chapter.number - 1) : undefined;
  const next = chapter.number < chapters.length ? getChapterByNumber(chapter.number + 1) : undefined;
  const activeScene = featured[Math.min(index, featured.length - 1)];
  const chapterCharacters = Array.from(new Set(chapter.scenes.flatMap((scene) => scene.characters)))
    .map((id) => getCharacter(id))
    .filter(Boolean)
    .slice(0, 10);
  const places = Array.from(new Set(chapter.scenes.map((scene) => scene.location)))
    .map((id) => getLocation(id))
    .filter(Boolean);

  const openSceneById = (id: string) => {
    const sceneIndex = chapter.scenes.findIndex((scene) => scene.id === id);
    if (sceneIndex >= 0) setOpenScene(sceneIndex);
  };

  return (
    <section
      className={`chapter chapter-${chapter.number}`}
      id={chapterAnchor(chapter.number)}
      aria-labelledby={`chapter-${chapter.number}-title`}
      data-palette={chapter.palette}
    >
      <header className="chapter-cover">
        <div className="chapter-cover-art" ref={coverRef}>
          {coverVisible ? (
            <SceneArt
              motif={chapter.motif}
              palette={chapter.palette}
              time={chapter.time}
              seed={`chapter-cover-${chapter.id}`}
              figures={[]}
              quality={quality}
              title={`Cover illustration for ${chapter.title}`}
            />
          ) : (
            <div className="art-placeholder" aria-hidden="true" />
          )}
        </div>
        <div className="chapter-cover-scrim" aria-hidden="true" />
        <div className="chapter-cover-number" aria-hidden="true">
          {String(chapter.number).padStart(2, '0')}
        </div>
        <div className="chapter-cover-content shell">
          <p className="chapter-cover-kicker">
            <span>{chapterLabel(chapter.number)}</span>
            <span className="kicker-dot" aria-hidden="true" />
            <span>{kandaByChapter[chapter.number]}</span>
            <span className="kicker-dot" aria-hidden="true" />
            <span>{chapter.emotion}</span>
          </p>
          <h2 id={`chapter-${chapter.number}-title`} className="chapter-title">
            {chapter.title}
          </h2>
          <div className="chapter-title-foot">
            <p className="chapter-devanagari" lang="sa">
              {chapter.devanagari}
            </p>
            <p className="chapter-opening">{chapter.opening}</p>
          </div>
        </div>
      </header>

      <div className="chapter-masthead shell">
        <div className="chapter-masthead-main">
          <p className="eyebrow">The book in brief</p>
          <p className="chapter-summary">{chapter.summary}</p>
        </div>
        <aside className="chapter-facts">
          <div className="chapter-fact">
            <span className="fact-label">Scenes</span>
            <span className="fact-value">{String(chapter.scenes.length).padStart(2, '0')}</span>
          </div>
          <div className="chapter-fact">
            <span className="fact-label">Places</span>
            <span className="fact-value">{String(places.length).padStart(2, '0')}</span>
          </div>
          <div className="chapter-fact">
            <span className="fact-label">Hour</span>
            <span className="fact-value fact-word">{timeLabels[chapter.time]}</span>
          </div>
          <div className="chapter-figures">
            <span className="fact-label">Figures</span>
            <div className="chip-row">
              {chapterCharacters.map((character) => (
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
        </aside>
      </div>

      {reducedMotion ? (
        <div className="chapter-stage-static shell" aria-label="Featured scenes">
          <div className="stage-static-head">
            <p className="eyebrow">Featured scenes</p>
            <p>Motion is reduced, so the sequence is presented as a gallery.</p>
          </div>
          <div className="stage-static-grid">
            {featured.map((scene) => (
              <article className="stage-static-card" key={scene.id}>
                <div className="stage-static-art">
                  <SceneArt
                    motif={scene.motif}
                    palette={chapter.palette}
                    time={scene.time}
                    seed={scene.id}
                    figures={sceneFigures(scene)}
                    quality={quality}
                    title={`Illustration for ${scene.title}`}
                  />
                </div>
                <div className="stage-static-copy">
                  <p className="eyebrow">
                    Scene {String(scene.number).padStart(2, '0')} · {timeLabels[scene.time]}
                  </p>
                  <h3>{scene.title}</h3>
                  <p>{excerpt(scene.narrative, 260)}</p>
                  <button type="button" className="text-button" onClick={() => openSceneById(scene.id)}>
                    Read this scene <span aria-hidden="true">→</span>
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      ) : (
        <div
          className="chapter-stage"
          ref={stageRef}
          style={{ '--scene-count': featured.length } as CSSProperties}
        >
          <div className="chapter-stage-sticky">
            <div className="stage-media" ref={stageArtRef} aria-hidden="true">
              {stageArtVisible && activeScene ? (
                <div className="stage-art" key={activeScene.id}>
                  <SceneArt
                    motif={activeScene.motif}
                    palette={chapter.palette}
                    time={activeScene.time}
                    seed={activeScene.id}
                    figures={sceneFigures(activeScene)}
                    quality={quality}
                    title={`Illustration for ${activeScene.title}`}
                  />
                </div>
              ) : (
                <div className="art-placeholder" />
              )}
              <span className="stage-vignette" />
            </div>
            {activeScene && (
              <div className="stage-content shell">
                <div className="stage-copy" key={activeScene.id} aria-live="polite">
                  <p className="stage-kicker">
                    <span>
                      Scene {String(activeScene.number).padStart(2, '0')}
                      <span className="stage-slash"> / </span>
                      {String(chapter.scenes.length).padStart(2, '0')}
                    </span>
                    <span className="kicker-dot" aria-hidden="true" />
                    <span>{timeLabels[activeScene.time]}</span>
                    <span className="kicker-dot" aria-hidden="true" />
                    <span>{getLocation(activeScene.location)?.name}</span>
                  </p>
                  <h3 className="stage-title">{activeScene.title}</h3>
                  <p className="stage-narrative">{activeScene.narrative}</p>
                  {activeScene.context && (
                    <p className="stage-context">
                      <span>Note</span> {activeScene.context}
                    </p>
                  )}
                  <div className="stage-actions">
                    <button
                      type="button"
                      className="button button-small button-primary"
                      onClick={() => openSceneById(activeScene.id)}
                    >
                      Read the scene
                    </button>
                    <button
                      type="button"
                      className="button button-small button-ghost"
                      onClick={() => scrollToId(`${chapterAnchor(chapter.number)}-sequence`, reducedMotion)}
                    >
                      Full sequence
                    </button>
                  </div>
                </div>
                <div className="stage-controls">
                  <p className="stage-counter">
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <span className="stage-counter-line" aria-hidden="true" />
                    <span>{String(featured.length).padStart(2, '0')}</span>
                  </p>
                  <div className="stage-dots" role="group" aria-label="Featured scenes">
                    {featured.map((scene, dotIndex) => (
                      <button
                        key={scene.id}
                        type="button"
                        className={dotIndex === index ? 'is-active' : ''}
                        aria-label={`Go to featured scene ${dotIndex + 1}: ${scene.title}`}
                        aria-current={dotIndex === index ? 'true' : undefined}
                        onClick={() => goTo(dotIndex)}
                      >
                        <span>{String(dotIndex + 1).padStart(2, '0')}</span>
                      </button>
                    ))}
                  </div>
                  <p className="stage-hint">
                    Scroll to turn the page
                    <span className="stage-hint-line" aria-hidden="true" />
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="chapter-sequence shell" id={`${chapterAnchor(chapter.number)}-sequence`}>
        <div className="sequence-head">
          <div>
            <p className="eyebrow">The full sequence</p>
            <h3>
              Every scene in <em>{chapter.title}</em>
            </h3>
          </div>
          <p className="sequence-count">
            <span>{String(chapter.scenes.length).padStart(2, '0')}</span> scenes
          </p>
        </div>
        <Ornament className="sequence-ornament" variant="diamond" />
        <ol className="scene-list">
          {chapter.scenes.map((scene, sceneIndex) => {
            const location = getLocation(scene.location);
            const sceneCharacters = scene.characters
              .map((id) => getCharacter(id))
              .filter(Boolean)
              .slice(0, 4);
            return (
              <li key={scene.id}>
                <button
                  type="button"
                  className="scene-row"
                  onClick={() => setOpenScene(sceneIndex)}
                  aria-label={`Read scene ${scene.number}: ${scene.title}`}
                >
                  <span className="scene-row-number">{String(scene.number).padStart(2, '0')}</span>
                  <span className="scene-row-main">
                    <span className="scene-row-title-line">
                      <span className="scene-row-title">{scene.title}</span>
                      {scene.context && <span className="scene-row-flag">Tradition note</span>}
                    </span>
                    <span className="scene-row-excerpt">{excerpt(scene.narrative)}</span>
                    <span className="scene-row-meta">
                      <span>{location?.name}</span>
                      <span aria-hidden="true">·</span>
                      <span>{timeLabels[scene.time]}</span>
                      {sceneCharacters.length > 0 && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span>{sceneCharacters.map((character) => character.name).join(', ')}</span>
                        </>
                      )}
                    </span>
                  </span>
                  <span className="scene-row-arrow" aria-hidden="true">
                    ↗
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <nav className="chapter-pager shell" aria-label="Chapter navigation">
        {previous ? (
          <a
            href={`#${chapterAnchor(previous.number)}`}
            onClick={(event) => {
              event.preventDefault();
              scrollToId(chapterAnchor(previous.number), reducedMotion);
            }}
          >
            <span className="pager-direction">← Book {romanNumerals[previous.number - 1]}</span>
            <span className="pager-title">{previous.title}</span>
          </a>
        ) : (
          <span className="pager-placeholder" />
        )}
        {next ? (
          <a
            href={`#${chapterAnchor(next.number)}`}
            className="pager-next"
            onClick={(event) => {
              event.preventDefault();
              scrollToId(chapterAnchor(next.number), reducedMotion);
            }}
          >
            <span className="pager-direction">Book {romanNumerals[next.number - 1]} →</span>
            <span className="pager-title">{next.title}</span>
          </a>
        ) : (
          <span className="pager-placeholder" />
        )}
      </nav>

      <SceneModal
        chapter={chapter}
        index={openScene}
        onClose={() => setOpenScene(null)}
        onNavigate={(nextIndex) => setOpenScene(nextIndex)}
        onCharacter={(id) => {
          setOpenScene(null);
          onCharacter?.(id);
        }}
        onLocation={(id) => {
          setOpenScene(null);
          onLocation?.(id);
        }}
      />
    </section>
  );
}
