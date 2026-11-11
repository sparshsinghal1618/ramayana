import { useEffect, useRef, type MutableRefObject, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Figure } from '../art/Figure';
import { useExperience } from '../experience/ExperienceContext';
import { useSectionProgress } from '../lib/hooks';
import { Ornament } from './Ornament';

gsap.registerPlugin(ScrollTrigger);

const beats = [
  {
    kicker: 'The edge of the world',
    title: 'The sea has no road.',
    body: 'At the edge of the continent, the vanara host stops. Beyond the breakers there is no bridge, no boat, and no horizon that promises land.',
  },
  {
    kicker: 'Mahendra Mountain',
    title: 'Jambavan speaks his name.',
    body: 'The old bear turns to Hanuman and reminds him of the strength, speed and size that have been sleeping inside him.',
  },
  {
    kicker: 'The remembering',
    title: 'He remembers.',
    body: 'Not a curse broken, but a self recovered. Hanuman grows until the sky itself becomes a road.',
  },
  {
    kicker: 'Across the water',
    title: 'The leap.',
    body: 'He crosses the sea in a single arc, and Lanka rises out of the water like a warning.',
  },
  {
    kicker: 'A messenger arrives',
    title: 'The servant comes.',
    body: 'He comes not as a conqueror but as a messenger, carrying a ring, a question, and the grief of a prince left behind.',
  },
];

export function LeapSequence() {
  const { reducedMotion } = useExperience();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const flyerRef = useRef<SVGGElement | null>(null);
  const trailRef = useRef<SVGPathElement | null>(null);
  const cloudRefs = useRef<Array<SVGGElement | null>>([]);
  const lankaRef = useRef<SVGGElement | null>(null);
  const progress = useSectionProgress(rootRef, !reducedMotion);
  const active = Math.min(beats.length - 1, Math.floor(progress * beats.length));
  const beat = beats[active];

  useEffect(() => {
    if (reducedMotion) return;
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const trigger = {
        trigger: root,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.6,
      };
      if (flyerRef.current) {
        gsap.fromTo(
          flyerRef.current,
          { x: 0, y: 80, scale: 0.78, rotate: -7 },
          { x: 950, y: -360, scale: 1.18, rotate: 3, ease: 'none', scrollTrigger: trigger },
        );
      }
      if (trailRef.current) {
        const length = trailRef.current.getTotalLength();
        gsap.set(trailRef.current, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(trailRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: trigger,
        });
      }
      cloudRefs.current.forEach((cloud, index) => {
        if (!cloud) return;
        gsap.fromTo(
          cloud,
          { x: 0, y: 0 },
          {
            x: index % 2 === 0 ? -170 : 130,
            y: index % 2 === 0 ? 34 : -26,
            ease: 'none',
            scrollTrigger: trigger,
          },
        );
      });
      if (lankaRef.current) {
        gsap.fromTo(
          lankaRef.current,
          { opacity: 0.28, y: 40 },
          { opacity: 0.95, y: 0, ease: 'none', scrollTrigger: trigger },
        );
      }
    }, root);
    return () => ctx.revert();
  }, [reducedMotion]);

  if (reducedMotion) {
    return (
      <section className="interlude interlude-leap is-static" aria-labelledby="leap-title">
        <div className="interlude-head shell">
          <div className="section-index">
            <span>VIII½</span>
            <span className="section-index-label">Interlude</span>
          </div>
          <p className="eyebrow">Sundara Kanda · the crossing</p>
          <h2 id="leap-title" className="display display-lg">
            The sea has no road.
          </h2>
          <p className="interlude-intro">
            The leap across the ocean is the Ramayana’s great image of courage: not the absence of
            fear, but the recovery of a power that was there all along.
          </p>
        </div>
        <div className="leap-static shell">
          <LeapArt staticMode />
          <div className="leap-static-copy">
            {beats.map((entry) => (
              <article key={entry.title}>
                <p className="eyebrow">{entry.kicker}</p>
                <h3>{entry.title}</h3>
                <p>{entry.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="interlude interlude-leap" aria-labelledby="leap-title">
      <div className="interlude-head shell">
        <div className="section-index">
          <span>VIII½</span>
          <span className="section-index-label">Interlude</span>
        </div>
        <p className="eyebrow">Sundara Kanda · the crossing</p>
        <h2 id="leap-title" className="display display-lg">
          The sea has no road.
        </h2>
        <p className="interlude-intro">
          Scroll through the leap. Jambavan speaks; Hanuman remembers; the horizon gives way.
        </p>
      </div>
      <div className="leap-scroll" ref={rootRef}>
        <div className="leap-sticky">
          <div className="leap-art-wrap">
            <LeapArt
              flyerRef={flyerRef}
              trailRef={trailRef}
              cloudRefs={cloudRefs}
              lankaRef={lankaRef}
            />
          </div>
          <div className="leap-overlay shell">
            <div className="leap-beat" key={beat.title} aria-live="polite">
              <p className="eyebrow">{beat.kicker}</p>
              <h3>{beat.title}</h3>
              <p>{beat.body}</p>
            </div>
            <div className="leap-progress">
              <p className="leap-count">
                <span>{String(active + 1).padStart(2, '0')}</span>
                <span aria-hidden="true"> / </span>
                <span>{String(beats.length).padStart(2, '0')}</span>
              </p>
              <div className="leap-dots" aria-hidden="true">
                {beats.map((entry, index) => (
                  <span key={entry.title} className={index === active ? 'is-active' : ''} />
                ))}
              </div>
            </div>
          </div>
          <p className="interlude-note shell">
            <span>Note</span> Valmiki has Jambavan remind Hanuman of his powers. The popular motif of a
            curse that made him forget them belongs more to later retellings.
          </p>
        </div>
      </div>
    </section>
  );
}

interface LeapArtProps {
  staticMode?: boolean;
  flyerRef?: RefObject<SVGGElement | null>;
  trailRef?: RefObject<SVGPathElement | null>;
  cloudRefs?: MutableRefObject<Array<SVGGElement | null>>;
  lankaRef?: RefObject<SVGGElement | null>;
}

function LeapArt({ staticMode, flyerRef, trailRef, cloudRefs, lankaRef }: LeapArtProps) {
  return (
    <svg
      className="leap-art"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Hanuman leaping across the ocean toward Lanka at dawn"
    >
      <defs>
        <linearGradient id="leap-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0D1A2A" />
          <stop offset="0.52" stopColor="#425E66" />
          <stop offset="1" stopColor="#D9B47A" />
        </linearGradient>
        <linearGradient id="leap-sea" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8AA59E" />
          <stop offset="0.18" stopColor="#31535C" />
          <stop offset="1" stopColor="#0A1820" />
        </linearGradient>
        <radialGradient id="leap-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFE9B8" stopOpacity="0.95" />
          <stop offset="0.3" stopColor="#E9C07A" stopOpacity="0.5" />
          <stop offset="1" stopColor="#E9C07A" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="leap-trail" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#F4D8A0" stopOpacity="0" />
          <stop offset="0.4" stopColor="#F4D8A0" stopOpacity="0.65" />
          <stop offset="1" stopColor="#FFF0C9" stopOpacity="0.9" />
        </linearGradient>
      </defs>
      <rect width="1600" height="900" fill="url(#leap-sky)" />
      <circle cx="1210" cy="430" r="390" fill="url(#leap-sun)" />
      <circle cx="1210" cy="430" r="62" fill="#F7E2B0" opacity="0.92" />
      <g ref={cloudRefs ? (node) => { cloudRefs.current[0] = node; } : undefined} opacity="0.35" fill="#F3DFB9">
        <path d="M-120 250 C 80 210 260 236 430 214 C 590 194 660 232 800 218 L 800 250 C 620 272 360 266 120 292 Z" />
        <path d="M1050 160 C 1210 128 1370 150 1520 132 L 1600 150 L 1600 180 C 1440 200 1220 192 1030 214 Z" />
      </g>
      <g ref={cloudRefs ? (node) => { cloudRefs.current[1] = node; } : undefined} opacity="0.2" fill="#E7CFA4">
        <path d="M210 330 C 400 300 560 318 720 302 L 760 330 C 560 356 380 344 190 368 Z" />
        <path d="M980 280 C 1120 252 1260 264 1400 246 L 1460 266 C 1300 288 1140 288 960 310 Z" />
      </g>
      <g ref={cloudRefs ? (node) => { cloudRefs.current[2] = node; } : undefined} opacity="0.28" fill="#D6BE91">
        <path d="M420 450 C 560 430 680 442 790 430 L 830 450 C 690 468 550 466 400 484 Z" />
        <path d="M1180 390 C 1300 370 1400 382 1500 366 L 1550 388 C 1420 406 1300 402 1160 420 Z" />
      </g>
      <g ref={lankaRef} opacity={staticMode ? 0.9 : 0.35}>
        <path d="M1270 620 L 1320 548 L 1352 590 L 1402 510 L 1438 582 L 1494 536 L 1524 604 L 1600 620 L 1600 760 L 1270 760 Z" fill="#1C2730" />
        <path d="M1364 586 L 1378 480 L 1392 471 L 1408 480 L 1418 588 Z" fill="#141D24" />
        <path d="M1450 604 L 1462 522 L 1476 512 L 1488 522 L 1498 608 Z" fill="#141D24" />
        <circle cx="1392" cy="470" r="7" fill="#D9B478" opacity="0.7" />
        <circle cx="1475" cy="510" r="5" fill="#D9B478" opacity="0.6" />
      </g>
      <rect y="560" width="1600" height="340" fill="url(#leap-sea)" />
      <g opacity="0.4" stroke="#C9D6CB" fill="none">
        {Array.from({ length: 12 }, (_, i) => (
          <path
            key={i}
            d={`M${-60 + i * 20} ${620 + i * 23} Q 300 ${604 + i * 23} 780 ${620 + i * 23} T 1660 ${618 + i * 23}`}
            strokeWidth={0.9 + i * 0.06}
            opacity={0.7 - i * 0.04}
          />
        ))}
      </g>
      <path
        ref={trailRef}
        d="M260 770 C 520 560 760 330 1260 430"
        fill="none"
        stroke="url(#leap-trail)"
        strokeWidth="4"
        opacity={staticMode ? 0.65 : 1}
      />
      <g ref={flyerRef} className="leap-flyer">
        <Figure kind="hanuman-flight" x={270} y={760} scale={1.65} />
      </g>
      <g fill="#16242A" opacity="0.7">
        {[
          [520, 300, 0.8],
          [610, 340, 0.55],
          [730, 270, 0.7],
        ].map(([x, y, s], index) => (
          <path
            key={index}
            d={`M${x - 14 * s} ${y} Q ${x - 6 * s} ${y - 7 * s} ${x} ${y} Q ${x + 6 * s} ${y - 7 * s} ${x + 14 * s} ${y}`}
            fill="none"
            stroke="#16242A"
            strokeWidth="2"
          />
        ))}
      </g>
    </svg>
  );
}

export function SetuSequence() {
  const { reducedMotion } = useExperience();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const stonesRef = useRef<Array<SVGGElement | null>>([]);
  const deckRef = useRef<SVGPathElement | null>(null);
  const progress = useSectionProgress(rootRef, !reducedMotion);
  const stones = Array.from({ length: 26 }, (_, index) => {
    const t = index / 25;
    return {
      t,
      x: 100 + t * 1400,
      y: 612 - Math.sin(t * Math.PI) * 58 + (index % 3) * 4,
      w: 30 + (index % 4) * 6,
      h: 12 + (index % 3) * 4,
      rot: (index % 5) - 2,
    };
  });
  const setuBeats = [
    {
      title: 'The sea between two armies.',
      body: 'Rama’s host reaches the southern shore. Across the water, Lanka is a rumour of gold and smoke.',
    },
    {
      title: 'Nala marks the line.',
      body: 'The vanara architect Nala studies the water and begins to place the first stones. A path must be imagined before it can be walked.',
    },
    {
      title: 'Stone after stone.',
      body: 'Mountains, trees and rocks are carried to the sea. The work is immense, collective, and almost absurd. It proceeds anyway.',
    },
    {
      title: 'A road made by many hands.',
      body: 'The bridge is not the work of one hero. It is the epic’s great image of alliance: many strengths, one direction.',
    },
  ];
  const active = Math.min(setuBeats.length - 1, Math.floor(progress * setuBeats.length));
  const beat = setuBeats[active];

  useEffect(() => {
    if (reducedMotion) return;
    const root = rootRef.current;
    if (!root) return;
    const ctx = gsap.context(() => {
      const trigger = {
        trigger: root,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.7,
      };
      const nodes = stonesRef.current.filter(Boolean) as SVGGElement[];
      gsap.fromTo(
        nodes,
        { y: 130, opacity: 0, scale: 0.6 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.045,
          ease: 'power1.out',
          scrollTrigger: trigger,
        },
      );
      if (deckRef.current) {
        const length = deckRef.current.getTotalLength();
        gsap.set(deckRef.current, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(deckRef.current, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: trigger,
        });
      }
    }, root);
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section className={`interlude interlude-setu ${reducedMotion ? 'is-static' : ''}`} aria-labelledby="setu-title">
      <div className="interlude-head shell">
        <div className="section-index">
          <span>IX½</span>
          <span className="section-index-label">Interlude</span>
        </div>
        <p className="eyebrow">Yuddha Kanda · the crossing place</p>
        <h2 id="setu-title" className="display display-lg">
          A road made by many hands.
        </h2>
        <p className="interlude-intro">
          The bridge to Lanka is built stone by stone. Scroll to watch the path assemble across the
          water.
        </p>
      </div>
      <div className="setu-scroll" ref={rootRef}>
        <div className="setu-sticky">
          <svg
            className="setu-art"
            viewBox="0 0 1600 900"
            preserveAspectRatio="xMidYMid slice"
            role="img"
            aria-label="A stone bridge being built across the sea toward Lanka"
          >
            <defs>
              <linearGradient id="setu-sky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#1B2634" />
                <stop offset="0.5" stopColor="#67594F" />
                <stop offset="1" stopColor="#D9B77E" />
              </linearGradient>
              <linearGradient id="setu-sea" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#AFC2B4" />
                <stop offset="0.16" stopColor="#4D6A6B" />
                <stop offset="1" stopColor="#0C1C22" />
              </linearGradient>
              <radialGradient id="setu-glow" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0" stopColor="#FFEAC0" stopOpacity="0.8" />
                <stop offset="1" stopColor="#FFEAC0" stopOpacity="0" />
              </radialGradient>
            </defs>
            <rect width="1600" height="900" fill="url(#setu-sky)" />
            <circle cx="800" cy="420" r="430" fill="url(#setu-glow)" />
            <circle cx="800" cy="420" r="50" fill="#F6E0B4" opacity="0.85" />
            <g fill="#E8D3AA" opacity="0.25">
              <path d="M-100 260 C 180 220 360 246 560 226 C 760 206 930 232 1110 218 L 1110 250 C 860 272 610 260 360 286 L -100 300 Z" />
              <path d="M980 340 C 1180 310 1360 326 1550 306 L 1650 330 C 1400 356 1200 350 950 370 Z" />
            </g>
            <g fill="#16252B" opacity="0.85">
              <path d="M1300 585 L 1340 520 L 1370 556 L 1418 486 L 1452 548 L 1506 512 L 1536 576 L 1600 590 L 1600 720 L 1300 720 Z" />
              <path d="M1398 558 L 1410 462 L 1424 454 L 1438 462 L 1448 560 Z" />
              <path d="M1490 574 L 1500 500 L 1514 490 L 1526 500 L 1534 578 Z" />
            </g>
            <rect y="590" width="1600" height="310" fill="url(#setu-sea)" />
            <g opacity="0.38" fill="none" stroke="#C9D8CC">
              {Array.from({ length: 14 }, (_, i) => (
                <path
                  key={i}
                  d={`M-40 ${640 + i * 19} Q 320 ${624 + i * 19} 800 ${640 + i * 19} T 1640 ${636 + i * 19}`}
                  strokeWidth={0.8 + i * 0.05}
                />
              ))}
            </g>
            <path
              ref={deckRef}
              d="M20 575 Q 800 500 1580 575"
              fill="none"
              stroke="#E7CFA0"
              strokeWidth="2.4"
              opacity="0.55"
            />
            <g>
              {stones.map((stone, index) => (
                <g
                  key={index}
                  ref={(node) => {
                    stonesRef.current[index] = node;
                  }}
                  transform={`translate(${stone.x} ${stone.y}) rotate(${stone.rot})`}
                  opacity={reducedMotion ? 1 : 0}
                >
                  <ellipse cx="0" cy={stone.h * 0.9} rx={stone.w * 1.2} ry={stone.h * 0.6} fill="#07151A" opacity="0.35" />
                  <path
                    d={`M ${-stone.w / 2} ${stone.h / 2} Q ${-stone.w / 2} ${-stone.h / 2} 0 ${-stone.h / 2} Q ${stone.w / 2} ${-stone.h / 2} ${stone.w / 2} ${stone.h / 2} Q 0 ${stone.h * 0.8} ${-stone.w / 2} ${stone.h / 2} Z`}
                    fill={index % 4 === 0 ? '#8C7A5B' : index % 3 === 0 ? '#6D624F' : '#544B3D'}
                    stroke="#D6BF92"
                    strokeWidth="0.7"
                    opacity="0.95"
                  />
                </g>
              ))}
            </g>
            <g opacity="0.7" fill="#151F22">
              <path d="M70 660 C 58 620 74 590 100 586 C 128 588 142 618 132 660 Z" />
              <path d="M120 672 C 112 646 124 626 142 624 C 162 628 170 650 162 674 Z" />
              <circle cx="100" cy="578" r="13" />
              <circle cx="144" cy="616" r="9" />
            </g>
            <g fill="#1A2427" opacity="0.55">
              {[
                [420, 690, 0.6],
                [1180, 675, 0.55],
                [1050, 710, 0.45],
              ].map(([x, y, s], index) => (
                <path
                  key={index}
                  d={`M${x - 18 * s} ${y} Q ${x - 8 * s} ${y - 9 * s} ${x} ${y} Q ${x + 8 * s} ${y - 9 * s} ${x + 18 * s} ${y}`}
                  fill="none"
                  stroke="#1A2427"
                  strokeWidth="2"
                />
              ))}
            </g>
          </svg>
          <div className="setu-overlay shell">
            <div className="setu-beat" key={beat.title} aria-live="polite">
              <p className="eyebrow">The bridge</p>
              <h3>{beat.title}</h3>
              <p>{beat.body}</p>
            </div>
            <div className="setu-progress">
              {setuBeats.map((entry, index) => (
                <span key={entry.title} className={index === active ? 'is-active' : ''} />
              ))}
            </div>
          </div>
          <div className="setu-note shell">
            <Ornament className="setu-ornament" variant="diamond" />
            <p>
              <span>Note</span> Valmiki credits the bridge’s construction to Nala and the vanara host. The
              beloved later story of stones floating because Rama’s name was written on them is a
              devotional elaboration, not part of the oldest text.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
