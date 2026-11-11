import { SceneArt } from '../art/SceneArt';
import { useLazyRender, scrollToId } from '../lib/hooks';
import { useExperience } from '../experience/ExperienceContext';
import { Reveal } from './Reveal';
import { Ornament } from './Ornament';

export function Prologue() {
  const { quality, reducedMotion } = useExperience();
  const { ref, visible } = useLazyRender('700px');

  return (
    <section className="prologue section" id="prologue" aria-labelledby="prologue-title">
      <div className="shell">
        <Reveal className="section-heading prologue-heading">
          <div className="section-index">
            <span>00</span>
            <span className="section-index-label">Prologue</span>
          </div>
          <p className="eyebrow">Before the first verse</p>
          <h2 id="prologue-title" className="display display-lg">
            A story that has learned to travel.
          </h2>
        </Reveal>

        <div className="prologue-grid">
          <Reveal className="prologue-copy" delay={0.08}>
            <p className="lead">
              The Ramayana is not a single book so much as a library of tellings. It begins in
              Sanskrit with the poet Valmiki, is carried across South and Southeast Asia in stone,
              shadow, song and television, and arrives in every generation with a different
              emphasis.
            </p>
            <p>
              Its spine is a family and a promise. Dasharatha, king of Ayodhya, is forced by an old
              vow to send his eldest son into exile on the eve of his coronation. Rama accepts. His
              wife Sita and brother Lakshmana go with him. What begins as a story about obedience
              becomes a story about love, grief, alliance, violence and the terrible cost of
              principle.
            </p>
            <p>
              This edition follows the Valmiki Ramayana as its primary narrative frame. Where later
              devotional or regional traditions made an episode famous — Shabari’s berries, the
              Lakshmana rekha, the floating stones of the bridge — those layers are identified
              rather than quietly folded into the oldest text. The Uttara Kanda is presented with
              the same care and the same caveat: it is part of the living tradition, and its
              authorship and moral vision are debated.
            </p>
            <div className="prologue-signature">
              <span className="signature-mark" aria-hidden="true">॥</span>
              <p>
                The narrative prose here is original. No quotation is attributed to an ancient text
                unless it is explicitly identified as such.
              </p>
            </div>
          </Reveal>

          <Reveal className="prologue-figure" delay={0.16}>
            <div className="art-frame art-frame-tall" ref={ref}>
              {visible ? (
                <SceneArt
                  motif="manuscript"
                  palette="manuscript"
                  time="day"
                  seed="prologue-manuscript"
                  quality={quality}
                  title="An illuminated manuscript page with a palm-leaf folio and gold ornament"
                />
              ) : (
                <div className="art-placeholder" aria-hidden="true" />
              )}
              <span className="art-frame-caption">
                <span>Plate 00</span>
                <span>The book before the book</span>
              </span>
            </div>
            <blockquote className="pull-quote">
              <Ornament className="pull-ornament" variant="diamond" />
              <p>
                “Every telling of the Ramayana is an argument about what matters. This one begins
                with attention.”
              </p>
              <footer>An editorial note</footer>
            </blockquote>
          </Reveal>
        </div>

        <Reveal className="reader-compass" delay={0.05}>
          <div className="reader-compass-head">
            <p className="eyebrow">A reader’s compass</p>
            <p>Three ways into the book.</p>
          </div>
          <div className="compass-grid">
            <button type="button" className="compass-item" onClick={() => scrollToId('books', reducedMotion)}>
              <span className="compass-number">01</span>
              <strong>Scroll the books</strong>
              <span>
                Twelve illustrated chapters with pinned scene stages and the complete scene
                sequence beneath each one.
              </span>
              <span className="compass-arrow" aria-hidden="true">↘</span>
            </button>
            <button type="button" className="compass-item" onClick={() => scrollToId('characters', reducedMotion)}>
              <span className="compass-number">02</span>
              <strong>Open the archive</strong>
              <span>
                Figures, places, objects and a chronology — connected to the story rather than
                separate from it.
              </span>
              <span className="compass-arrow" aria-hidden="true">↘</span>
            </button>
            <button type="button" className="compass-item" onClick={() => scrollToId('traditions', reducedMotion)}>
              <span className="compass-number">03</span>
              <strong>Read the differences</strong>
              <span>
                A clear guide to the Valmiki text, later retellings, and the episodes whose
                meanings are still contested.
              </span>
              <span className="compass-arrow" aria-hidden="true">↘</span>
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
