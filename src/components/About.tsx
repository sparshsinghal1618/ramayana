import { chapters, totalScenes, featuredScenes } from '../data/story';
import { characters } from '../data/characters';
import { locations } from '../data/locations';
import { timeline } from '../data/timeline';
import { objects } from '../data/objects';
import { traditions } from '../data/traditions';
import { useExperience } from '../experience/ExperienceContext';
import { Reveal } from './Reveal';

export function About() {
  const { profile, profileLabel, quality, reducedMotion } = useExperience();
  const featured = chapters.reduce((sum, chapter) => sum + featuredScenes(chapter).length, 0);

  return (
    <section className="about section" id="about" aria-labelledby="about-title">
      <div className="shell">
        <Reveal className="about-head">
          <div className="section-index">
            <span>08</span>
            <span className="section-index-label">About This Edition</span>
          </div>
          <div className="about-head-grid">
            <h2 id="about-title" className="display display-lg">
              Made as a book
              <br />
              for the screen.
            </h2>
            <p className="about-lede">
              This is an independent, non-commercial interactive edition: a long-form reading
              experience rather than an encyclopaedia or a game. Everything you see and hear here was
              made for this project.
            </p>
          </div>
        </Reveal>

        <div className="about-grid">
          <Reveal className="about-card about-card-wide">
            <p className="eyebrow">The telling</p>
            <h3>An interpretive retelling, not a translation.</h3>
            <p>
              The narrative follows the Valmiki Ramayana as its primary frame. The prose is original
              and interpretive; it does not reproduce a critical edition or a published translation.
              Later retellings — the Ramcharitmanas, Kamban’s Ramavataram, the Adhyatma Ramayana and
              living performance traditions — are identified where their emphases differ.
            </p>
            <dl className="about-stats">
              <div>
                <dt>Chapters</dt>
                <dd>{chapters.length}</dd>
              </div>
              <div>
                <dt>Scenes</dt>
                <dd>{totalScenes}</dd>
              </div>
              <div>
                <dt>Featured stage scenes</dt>
                <dd>{featured}</dd>
              </div>
              <div>
                <dt>Figures</dt>
                <dd>{characters.length}</dd>
              </div>
              <div>
                <dt>Places</dt>
                <dd>{locations.length}</dd>
              </div>
              <div>
                <dt>Timeline events</dt>
                <dd>{timeline.length}</dd>
              </div>
              <div>
                <dt>Objects</dt>
                <dd>{objects.length}</dd>
              </div>
              <div>
                <dt>Traditions</dt>
                <dd>{traditions.length}</dd>
              </div>
            </dl>
          </Reveal>

          <Reveal className="about-card" delay={0.05}>
            <p className="eyebrow">The artwork</p>
            <h3>Drawn from code.</h3>
            <p>
              The illustrations are original layered SVG compositions built from a shared palette
              and figure vocabulary. They respond to the scene’s place, time of day and emotional
              register. No stock images, generated raster art or external image files are used.
            </p>
            <p>
              The visual language is deliberately theatrical: shadow-puppet bodies, painted skies,
              architectural silhouettes and a persistent film of grain. It is an interpretation, not
              a reconstruction of historical material culture.
            </p>
          </Reveal>

          <Reveal className="about-card" delay={0.1}>
            <p className="eyebrow">The sound</p>
            <h3>No autoplay. No recordings.</h3>
            <p>
              Ambience is synthesised live in the browser with the Web Audio API. There are no audio
              files to load and nothing begins until you press play. Volume and ambience are
              remembered on this device; the sound remains off after a reload until you enable it.
            </p>
          </Reveal>

          <Reveal className="about-card" delay={0.05}>
            <p className="eyebrow">Performance</p>
            <h3>Three profiles, one book.</h3>
            <p>
              The experience detects a sensible default and lets you choose. <strong>Cinematic</strong>{' '}
              renders full illustration detail; <strong>Balanced</strong> reduces complexity;{' '}
              <strong>Essential</strong> uses the lightest artwork and the least motion. Your current
              profile is <strong>{profileLabel}</strong> ({profile.toUpperCase()}), rendering at{' '}
              <strong>{quality}</strong> detail.
            </p>
            <p>
              All artwork is vector and all ambience is procedural. Nothing depends on WebGL, and the
              story remains complete when animation is switched off.
            </p>
          </Reveal>

          <Reveal className="about-card" delay={0.1}>
            <p className="eyebrow">Accessibility</p>
            <h3>Motion is an offer, not a requirement.</h3>
            <p>
              The site honours the operating system’s reduced-motion setting and includes its own
              control in the reading settings. With reduced motion, pinned sequences become static
              galleries. Controls are keyboard reachable, dialogs manage focus, and the narrative is
              always available as text.
            </p>
            <p>
              The current state is{' '}
              <strong>{reducedMotion ? 'reduced motion' : 'full motion'}</strong>. Preferences are
              stored locally and never sent anywhere.
            </p>
          </Reveal>

          <Reveal className="about-card about-card-wide">
            <p className="eyebrow">A note on certainty</p>
            <h3>The Ramayana is a living argument.</h3>
            <p>
              The epic has many versions, and its episodes carry different meanings in different
              communities. This edition flags contested material — the Lakshmana rekha, the berries
              of Shabari, the killing of Vali, the Uttara Kanda — rather than presenting one
              tradition as the only truth. Its purpose is to invite careful reading, not to settle
              the argument.
            </p>
            <p className="about-signoff">
              Built with React, TypeScript, Vite, GSAP and Framer Motion. Set in Cormorant Garamond,
              EB Garamond, DM Sans and Noto Serif Devanagari.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
