import { Fragment, useCallback, useEffect, useState } from 'react';
import { ExperienceProvider, useExperience } from './experience/ExperienceContext';
import { chapters } from './data/story';
import { romanNumerals } from './data/visuals';
import { Loader } from './components/Loader';
import { Navigation } from './components/Navigation';
import { ProgressRail } from './components/ProgressRail';
import { AudioDock } from './components/AudioDock';
import { Hero } from './components/Hero';
import { Prologue } from './components/Prologue';
import { BooksIndex } from './components/BooksIndex';
import { ChapterSection } from './components/ChapterSection';
import { LeapSequence, SetuSequence } from './components/SpecialSequences';
import { CharacterArchive } from './components/CharacterArchive';
import { Atlas } from './components/Atlas';
import { Timeline } from './components/Timeline';
import { Objects } from './components/Objects';
import { Traditions } from './components/Traditions';
import { Epilogue } from './components/Epilogue';
import { About } from './components/About';
import { Credits } from './components/Credits';
import { Footer } from './components/Footer';
import { scrollToId, useBodyLock } from './lib/hooks';
import { Reveal } from './components/Reveal';

function Experience() {
  const [ready, setReady] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const { reducedMotion } = useExperience();
  useBodyLock(!ready);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  const onLoaded = useCallback(() => setReady(true), []);

  const openCharacter = useCallback((id: string) => {
    setSelectedCharacter(id);
  }, []);

  const openLocation = useCallback(
    (id: string) => {
      setSelectedLocation(id);
      setSelectedCharacter(null);
      window.setTimeout(() => scrollToId('atlas', reducedMotion), 60);
    },
    [reducedMotion],
  );

  return (
    <>
      {!ready && <Loader onComplete={onLoaded} />}
      <a className="skip-link" href="#main">
        Skip to the story
      </a>
      <span className="grain-overlay" aria-hidden="true" />
      <Navigation />
      <ProgressRail />
      <AudioDock />
      <main id="main">
        <Hero />
        <Prologue />
        <BooksIndex />

        <div className="chapters" id="chapters">
          <div className="chapters-intro shell">
            <Reveal className="chapters-intro-grid">
              <div>
                <div className="section-index">
                  <span>Story</span>
                  <span className="section-index-label">The Twelve Books</span>
                </div>
                <p className="eyebrow">The journey</p>
                <h2 className="display display-lg">
                  Enter the story
                  <br />
                  where you are.
                </h2>
              </div>
              <div className="chapters-intro-copy">
                <p>
                  Each book opens with a full-bleed illustration, then a pinned sequence of featured
                  scenes. Beneath it, the complete scene list can be opened one scene at a time.
                </p>
                <div className="chapter-jump" role="group" aria-label="Jump to a book">
                  {chapters.map((chapter) => (
                    <button
                      key={chapter.id}
                      type="button"
                      onClick={() => scrollToId(`chapter-${String(chapter.number).padStart(2, '0')}`, reducedMotion)}
                      title={chapter.title}
                    >
                      {romanNumerals[chapter.number - 1]}
                    </button>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {chapters.map((chapter) => (
            <Fragment key={chapter.id}>
              <ChapterSection
                chapter={chapter}
                onCharacter={openCharacter}
                onLocation={openLocation}
              />
              {chapter.number === 8 && <LeapSequence />}
              {chapter.number === 9 && <SetuSequence />}
            </Fragment>
          ))}
        </div>

        <CharacterArchive
          selected={selectedCharacter}
          onSelect={setSelectedCharacter}
          onLocation={openLocation}
        />
        <Atlas
          selected={selectedLocation}
          onSelect={setSelectedLocation}
          onCharacter={openCharacter}
        />
        <Timeline onLocation={openLocation} />
        <Objects />
        <Traditions />
        <Epilogue />
        <About />
        <Credits />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <ExperienceProvider>
      <Experience />
    </ExperienceProvider>
  );
}
