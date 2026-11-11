import { useState, type CSSProperties } from 'react';
import { chapters, totalScenes } from '../data/story';
import { getPalette } from '../art/palettes';
import { SceneArt } from '../art/SceneArt';
import { useExperience } from '../experience/ExperienceContext';
import { scrollToId } from '../lib/hooks';
import { chapterAnchor, chapterLabel, romanNumerals } from '../data/visuals';
import { Reveal } from './Reveal';

export function BooksIndex() {
  const [active, setActive] = useState(0);
  const { quality, reducedMotion } = useExperience();
  const chapter = chapters[active];
  const palette = getPalette(chapter.palette, chapter.time);

  return (
    <section className="books section" id="books" aria-labelledby="books-title">
      <div className="shell">
        <Reveal className="books-header">
          <div className="section-index">
            <span>01</span>
            <span className="section-index-label">The Twelve Books</span>
          </div>
          <div className="books-header-grid">
            <h2 id="books-title" className="display display-lg">
              Twelve movements
              <br />
              of one long journey.
            </h2>
            <div className="books-intro">
              <p>
                From the golden walls of Ayodhya to the ashoka grove of Lanka, each book has its own
                weather, its own palette and its own moral pressure. Hover a book to preview it, or
                begin where you are drawn.
              </p>
              <p className="books-count">
                {chapters.length} books <span aria-hidden="true">·</span> {totalScenes} scenes
                <span aria-hidden="true"> · </span>
                {chapters.reduce((sum, entry) => sum + entry.scenes.length, 0)} moments of telling
              </p>
            </div>
          </div>
        </Reveal>

        <div className="books-body">
          <ol className="book-list">
            {chapters.map((entry, index) => {
              const entryPalette = getPalette(entry.palette, entry.time);
              return (
                <li key={entry.id}>
                  <a
                    href={`#${chapterAnchor(entry.number)}`}
                    className={`book-row ${active === index ? 'is-active' : ''}`}
                    onMouseEnter={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    onClick={(event) => {
                      event.preventDefault();
                      setActive(index);
                      scrollToId(chapterAnchor(entry.number), reducedMotion);
                    }}
                    style={{ '--book-accent': entryPalette.accent } as CSSProperties}
                  >
                    <span className="book-number">{romanNumerals[index]}</span>
                    <span className="book-main">
                      <span className="book-title">
                        {entry.title}
                        <span className="book-devanagari" lang="sa">
                          {entry.devanagari}
                        </span>
                      </span>
                      <span className="book-translation">{entry.translation}</span>
                    </span>
                    <span className="book-emotion">{entry.emotion}</span>
                    <span className="book-scenes">{entry.scenes.length} scenes</span>
                    <span className="book-arrow" aria-hidden="true">
                      →
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>

          <aside className="book-preview" aria-live="polite">
            <div className="book-preview-art">
              <SceneArt
                key={`${chapter.id}-preview`}
                motif={chapter.motif}
                palette={chapter.palette}
                time={chapter.time}
                seed={`book-preview-${chapter.id}`}
                figures={[]}
                quality={quality === 'high' ? 'medium' : 'low'}
                title={`Illustration for ${chapter.title}`}
              />
              <span className="book-preview-wash" aria-hidden="true" />
              <div className="book-preview-meta">
                <span>{chapterLabel(chapter.number)}</span>
                <span>{chapter.scenes.length} scenes</span>
              </div>
            </div>
            <div className="book-preview-copy">
              <p className="eyebrow">{chapter.emotion}</p>
              <h3>{chapter.title}</h3>
              <p>{chapter.opening}</p>
              <div className="book-preview-foot">
                <span
                  className="palette-chip"
                  style={{
                    background: `linear-gradient(90deg, ${palette.skyTop}, ${palette.accent}, ${palette.near})`,
                  }}
                  aria-hidden="true"
                />
                <button
                  type="button"
                  className="text-button"
                  onClick={() => scrollToId(chapterAnchor(chapter.number), reducedMotion)}
                >
                  Begin this book <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
