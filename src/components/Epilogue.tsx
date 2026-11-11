import { SceneArt } from '../art/SceneArt';
import { useExperience } from '../experience/ExperienceContext';
import { useLazyRender, scrollToId } from '../lib/hooks';
import { Ornament } from './Ornament';

export function Epilogue() {
  const { quality, reducedMotion } = useExperience();
  const { ref, visible } = useLazyRender('700px');

  return (
    <section className="epilogue" id="epilogue" aria-labelledby="epilogue-title">
      <div className="epilogue-art" ref={ref}>
        {visible ? (
          <SceneArt
            motif="coronation"
            palette="marigold"
            time="dusk"
            seed="epilogue-coronation"
            quality={quality}
            title="A lamp-lit coronation hall at dusk, with garlands and a distant city"
          />
        ) : (
          <div className="art-placeholder" />
        )}
      </div>
      <div className="epilogue-scrim" aria-hidden="true" />
      <div className="epilogue-content shell">
        <div className="section-index epilogue-index">
          <span>07</span>
          <span className="section-index-label">Epilogue</span>
        </div>
        <p className="eyebrow">The story after the story</p>
        <h2 id="epilogue-title" className="display display-xl">
          The story does not end.
          <br />
          It is handed on.
        </h2>
        <div className="epilogue-columns">
          <p>
            Rama returns to Ayodhya, and the city lights its lamps. But the Ramayana does not close
            with a single happy ending. It keeps asking what a promise costs, who is allowed to
            speak, and what a community does with the wounds that victory leaves behind.
          </p>
          <p>
            That unfinished quality is why the story survives. It is recited in Sanskrit courts and
            sung in village squares; it becomes Kathakali, Ramlila, shadow puppetry, television and
            political argument. Every generation finds a different question in the same journey.
          </p>
        </div>
        <Ornament className="epilogue-ornament" variant="lotus" />
        <p className="epilogue-closing">
          The book you have been reading is one telling among many. The invitation is not to agree
          with all of it, but to keep listening.
        </p>
        <div className="epilogue-actions">
          <button
            type="button"
            className="button button-primary"
            onClick={() => scrollToId('top', reducedMotion)}
          >
            Return to the beginning
            <span aria-hidden="true">↑</span>
          </button>
          <button
            type="button"
            className="button button-ghost"
            onClick={() => scrollToId('traditions', reducedMotion)}
          >
            Read the sources
          </button>
        </div>
      </div>
      <p className="epilogue-devanagari" lang="sa" aria-hidden="true">
        रामायण
      </p>
    </section>
  );
}
