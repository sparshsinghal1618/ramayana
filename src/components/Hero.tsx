import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SceneArt } from '../art/SceneArt';
import { chapters, totalScenes } from '../data/story';
import { characters } from '../data/characters';
import { locations } from '../data/locations';
import { useExperience } from '../experience/ExperienceContext';
import { scrollToId } from '../lib/hooks';

export function Hero() {
  const ref = useRef<HTMLElement | null>(null);
  const { quality, reducedMotion } = useExperience();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const artY = useTransform(scrollYProgress, [0, 1], ['0%', '16%']);
  const artScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.72], [1, 0]);

  return (
    <section className="hero" id="top" ref={ref} aria-label="Ramayana, an interactive manuscript">
      <motion.div
        className="hero-art"
        style={reducedMotion ? undefined : { y: artY, scale: artScale }}
      >
        <SceneArt
          motif="palace"
          palette="gold"
          time="dawn"
          seed="ramayana-hero"
          quality={quality}
          title="The palace city of Ayodhya at dawn, with mountains and a wide river"
        />
      </motion.div>
      <div className="hero-scrim" aria-hidden="true" />
      <div className="hero-rule" aria-hidden="true" />
      <motion.div
        className="hero-content shell"
        style={reducedMotion ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div className="hero-kicker">
          <span className="hero-kicker-rule" aria-hidden="true" />
          <span>An interactive retelling of the Valmiki Ramayana</span>
        </div>
        <div className="hero-title-wrap">
          <p className="hero-devanagari" lang="sa">रामायण</p>
          <h1 className="hero-title">
            Rama<span>yana</span>
          </h1>
          <p className="hero-subtitle">The eternal journey of dharma</p>
        </div>
        <p className="hero-lede">
          A prince keeps a promise. A wife is taken across the sea. A friend remembers he can fly.
          Twelve books, two hundred and thirty-two scenes, and one question carried through every
          forest and every court: what does it mean to do what is right?
        </p>
        <div className="hero-actions">
          <button type="button" className="button button-primary" onClick={() => scrollToId('prologue', reducedMotion)}>
            Begin the journey
            <span aria-hidden="true">→</span>
          </button>
          <button type="button" className="button button-ghost" onClick={() => scrollToId('books', reducedMotion)}>
            Explore the twelve books
          </button>
        </div>
      </motion.div>
      <div className="hero-footer shell">
        <dl className="hero-stats">
          <div>
            <dt>Books</dt>
            <dd>{chapters.length}</dd>
          </div>
          <div>
            <dt>Scenes</dt>
            <dd>{totalScenes}</dd>
          </div>
          <div>
            <dt>Figures</dt>
            <dd>{characters.length}</dd>
          </div>
          <div>
            <dt>Places</dt>
            <dd>{locations.length}</dd>
          </div>
        </dl>
        <button
          type="button"
          className="scroll-cue"
          onClick={() => scrollToId('prologue', reducedMotion)}
          aria-label="Scroll to the prologue"
        >
          <span className="scroll-cue-line" aria-hidden="true">
            <i />
          </span>
          <span>Scroll to enter</span>
        </button>
      </div>
      <p className="hero-side-note" aria-hidden="true">
        Valmiki · the Adi Kavya
      </p>
    </section>
  );
}
