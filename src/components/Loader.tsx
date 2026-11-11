import { useEffect, useRef, useState } from 'react';

export function Loader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const completed = useRef(false);

  useEffect(() => {
    let active = true;
    const visited = sessionStorage.getItem('ramayana.visited') === '1';
    const minimum = visited ? 380 : 1550;
    const started = performance.now();
    const tick = window.setInterval(() => {
      setProgress((current) => {
        if (current >= 92) return current;
        const step = current < 45 ? 7 : current < 75 ? 3.4 : 1.1;
        return Math.min(92, current + step);
      });
    }, 120);

    const finish = () => {
      if (!active) return;
      const wait = Math.max(0, minimum - (performance.now() - started));
      window.setTimeout(() => {
        if (!active) return;
        window.clearInterval(tick);
        setProgress(100);
        window.setTimeout(() => setLeaving(true), 420);
        window.setTimeout(() => {
          if (completed.current) return;
          completed.current = true;
          sessionStorage.setItem('ramayana.visited', '1');
          onComplete();
        }, 1420);
      }, wait);
    };

    const fontReady =
      typeof document !== 'undefined' && 'fonts' in document
        ? document.fonts.ready
        : Promise.resolve();
    const timeout = new Promise<void>((resolve) => window.setTimeout(resolve, 2400));
    void Promise.race([fontReady, timeout]).then(finish);

    return () => {
      active = false;
      window.clearInterval(tick);
    };
  }, [onComplete]);

  return (
    <div className={`loader ${leaving ? 'is-leaving' : ''}`} role="status" aria-live="polite">
      <div className="loader-grain" aria-hidden="true" />
      <div className="loader-frame" aria-hidden="true">
        <span className="loader-corner loader-corner-tl" />
        <span className="loader-corner loader-corner-tr" />
        <span className="loader-corner loader-corner-bl" />
        <span className="loader-corner loader-corner-br" />
      </div>
      <div className="loader-inner">
        <p className="loader-devanagari">रामायण</p>
        <p className="loader-kicker">An interactive manuscript</p>
        <h1 className="loader-title">Ramayana</h1>
        <p className="loader-line">The eternal journey of dharma</p>
        <div className="loader-meter" aria-hidden="true">
          <span style={{ transform: `scaleX(${progress / 100})` }} />
        </div>
        <p className="loader-status">
          <span>Opening the book</span>
          <span>{Math.round(progress).toString().padStart(3, '0')}</span>
        </p>
      </div>
      <p className="loader-fine">Valmiki’s epic · twelve books · two hundred and thirty-two scenes</p>
    </div>
  );
}
