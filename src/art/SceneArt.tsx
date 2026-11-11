import { useId } from 'react';
import type { FigureKind, Motif, PaletteName, TimeOfDay } from '../data/types';
import { getPalette } from './palettes';
import { Figure } from './Figure';
import {
  birdFlock,
  cloudPath,
  mountainPath,
  ridgePath,
  seeded,
  starField,
  stonePositions,
  wavePath,
} from './primitives';

export interface SceneArtProps {
  motif: Motif;
  palette: PaletteName;
  time?: TimeOfDay;
  seed?: string | number;
  figures?: FigureKind[];
  className?: string;
  quality?: 'high' | 'medium' | 'low';
  title?: string;
}

const W = 1600;
const H = 900;

export function SceneArt({
  motif,
  palette,
  time = 'day',
  seed,
  figures = [],
  className = '',
  quality = 'high',
  title,
}: SceneArtProps) {
  const uid = useId().replace(/:/g, '');
  const p = getPalette(palette, time);
  const r = seeded(seed ?? `${motif}-${palette}-${time}`);
  const detail = quality === 'high' ? 1 : quality === 'medium' ? 0.72 : 0.46;
  const interior = motif === 'court' || motif === 'manuscript';
  const isNight = time === 'night';
  const sunX = time === 'dusk' ? 380 : time === 'dawn' ? 1210 : 1180;
  const sunY = time === 'dawn' || time === 'dusk' ? 500 : isNight ? 170 : 180;
  const birds = birdFlock(Math.round(8 * detail), `${seed}-birds`);
  const stars = isNight ? starField(Math.round(70 * detail), `${seed}-stars`) : [];

  return (
    <div className={`scene-art ${className}`}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid slice"
        role={title ? 'img' : undefined}
        aria-label={title}
        aria-hidden={title ? undefined : true}
        focusable="false"
      >
        {title && <title>{title}</title>}
        <defs>
          <linearGradient id={`${uid}-sky`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={p.skyTop} />
            <stop offset="0.55" stopColor={p.skyMid} />
            <stop offset="1" stopColor={p.skyBottom} />
          </linearGradient>
          <radialGradient id={`${uid}-sun`} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor={p.sun} stopOpacity="0.95" />
            <stop offset="0.28" stopColor={p.sun} stopOpacity="0.55" />
            <stop offset="0.62" stopColor={p.glow} stopOpacity="0.16" />
            <stop offset="1" stopColor={p.glow} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${uid}-ground`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={p.near} />
            <stop offset="1" stopColor={p.ground} />
          </linearGradient>
          <linearGradient id={`${uid}-water`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={p.waterLight} stopOpacity="0.85" />
            <stop offset="0.12" stopColor={p.water} />
            <stop offset="1" stopColor={p.ink} />
          </linearGradient>
          <linearGradient id={`${uid}-haze`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={p.haze} stopOpacity="0" />
            <stop offset="0.6" stopColor={p.haze} stopOpacity="0.42" />
            <stop offset="1" stopColor={p.haze} stopOpacity="0" />
          </linearGradient>
          <linearGradient id={`${uid}-shaft`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={p.accentSoft} stopOpacity="0.28" />
            <stop offset="1" stopColor={p.accentSoft} stopOpacity="0" />
          </linearGradient>
          <radialGradient id={`${uid}-vignette`} cx="0.5" cy="0.46" r="0.72">
            <stop offset="0.45" stopColor={p.ink} stopOpacity="0" />
            <stop offset="1" stopColor={p.ink} stopOpacity="0.55" />
          </radialGradient>
          <linearGradient id={`${uid}-scrim`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={p.ink} stopOpacity="0.3" />
            <stop offset="0.2" stopColor={p.ink} stopOpacity="0" />
            <stop offset="0.82" stopColor={p.ink} stopOpacity="0" />
            <stop offset="1" stopColor={p.ink} stopOpacity="0.45" />
          </linearGradient>
          <linearGradient id={`${uid}-glow`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={p.accentSoft} stopOpacity="0.9" />
            <stop offset="1" stopColor={p.accent} stopOpacity="0.15" />
          </linearGradient>
          <clipPath id={`${uid}-frame`}>
            <rect width={W} height={H} />
          </clipPath>
        </defs>

        <g clipPath={`url(#${uid}-frame)`}>
          {interior ? (
            motif === 'court' ? (
              <Court p={p} uid={uid} detail={detail} seed={seed} />
            ) : (
              <Manuscript p={p} uid={uid} detail={detail} seed={seed} />
            )
          ) : (
            <>
              <rect width={W} height={H} fill={`url(#${uid}-sky)`} />
              {stars.map((star) => (
                <circle key={star.id} cx={star.x} cy={star.y} r={star.r} fill={p.light} opacity={star.o * 0.8} />
              ))}
              {time !== 'storm' && (
                <>
                  <circle cx={sunX} cy={sunY} r={430} fill={`url(#${uid}-sun)`} />
                  <circle cx={sunX} cy={sunY} r={isNight ? 58 : 68} fill={p.sun} opacity={isNight ? 0.85 : 0.9} />
                  {isNight && <circle cx={sunX + 18} cy={sunY - 10} r={52} fill={p.skyTop} opacity="0.6" />}
                </>
              )}
              <Clouds p={getPalette(palette, time)} detail={detail} time={time} seed={seed} />
              {('mountain' === motif || 'forest' === motif || 'ashram' === motif || 'palace' === motif || 'city' === motif || 'garden' === motif || 'lanka' === motif || 'coronation' === motif || 'battle' === motif) && (
                <Mountains p={p} detail={detail} seed={seed} />
              )}
              <rect x="0" y="430" width={W} height="230" fill={`url(#${uid}-haze)`} />
              {birds.map((bird) => (
                <g key={bird.id} transform={`translate(${bird.x} ${bird.y}) scale(${bird.s})`} opacity={bird.o}>
                  <path d="M -12 0 Q -6 -5 0 0 Q 6 -5 12 0" fill="none" stroke={p.ink} strokeWidth="1.6" strokeLinecap="round" />
                </g>
              ))}
            </>
          )}

          {!interior && (
            <>
              {renderLandmark(motif, p, uid, detail, r, seed, time)}
              {renderMotif(motif, p, uid, detail, seed)}
              <FiguresLayer motif={motif} figures={figures} p={p} />
              {renderForeground(motif, p, detail, seed, uid)}
              <Atmosphere p={p} motif={motif} detail={detail} seed={seed} time={time} />
            </>
          )}

          {interior && motif === 'court' && <FiguresLayer motif="court" figures={figures} p={p} />}

          {!interior && (
            <>
              <rect width={W} height={H} fill={`url(#${uid}-scrim)`} />
              <rect width={W} height={H} fill={`url(#${uid}-vignette)`} />
            </>
          )}
        </g>
      </svg>
      <span className="art-grain" aria-hidden="true" />
    </div>
  );
}

type Palette = ReturnType<typeof getPalette>;

function Clouds({ p, detail, time, seed }: { p: Palette; detail: number; time: TimeOfDay; seed?: string | number }) {
  const r = seeded(`${seed}-clouds`);
  const count = time === 'storm' ? 4 : Math.round(3 * detail) + 1;
  return (
    <g opacity={time === 'storm' ? 0.5 : 0.28}>
      {Array.from({ length: count }, (_, i) => {
        const width = r.range(620, 1100);
        const x = r.range(-180, 1200);
        const y = r.range(80, 330);
        return (
          <g key={i} transform={`translate(${x} ${y})`} opacity={r.range(0.45, 0.95)}>
            <path d={cloudPath(width, r.range(100, 190), `${seed}-cloud-${i}`)} fill={time === 'storm' ? p.mid : p.light} />
            <path
              d={cloudPath(width * 0.85, r.range(80, 130), `${seed}-cloud-b-${i}`)}
              fill={p.accentSoft}
              opacity="0.35"
              transform={`translate(${r.range(-40, 60)} ${r.range(8, 25)})`}
            />
          </g>
        );
      })}
    </g>
  );
}

function Mountains({ p, detail, seed }: { p: Palette; detail: number; seed?: string | number }) {
  return (
    <g>
      <path d={mountainPath({ baseY: 690, peakY: 300, peaks: 9, roughness: 0.5, seed: `${seed}-far` })} fill={p.far} opacity="0.38" />
      <path d={mountainPath({ baseY: 720, peakY: 390, peaks: 7, roughness: 0.55, seed: `${seed}-mid` })} fill={p.mid} opacity="0.6" />
      <path d={mountainPath({ baseY: 760, peakY: 500, peaks: 5, roughness: 0.5, seed: `${seed}-near` })} fill={p.near} opacity="0.82" />
      {detail > 0.6 && (
        <>
          <path d={ridgePath(W, 760, 610, `${seed}-ridge-a`)} fill={p.near} opacity="0.45" />
          <path d={ridgePath(W, 800, 660, `${seed}-ridge-b`)} fill={p.ground} opacity="0.55" />
        </>
      )}
    </g>
  );
}

function renderLandmark(
  motif: Motif,
  p: Palette,
  uid: string,
  detail: number,
  r: ReturnType<typeof seeded>,
  seed: string | number | undefined,
  time: TimeOfDay,
) {
  if (motif === 'ocean' || motif === 'leap' || motif === 'bridge') {
    return (
      <>
        <Ocean p={p} uid={uid} detail={detail} seed={seed} time={time} />
        {motif === 'bridge' && <Bridge p={p} detail={detail} seed={seed} />}
      </>
    );
  }

  if (motif === 'lanka') {
    return (
      <>
        <rect y="590" width={W} height="310" fill={`url(#${uid}-ground)`} opacity="0.7" />
        <LankaFortress p={p} detail={detail} seed={seed} />
        <g opacity="0.6">
          {Array.from({ length: Math.round(10 * detail) }, (_, i) => (
            <ellipse key={i} cx={r.range(0, W)} cy={r.range(380, 560)} rx={r.range(60, 180)} ry={r.range(6, 16)} fill={p.mid} opacity={r.range(0.1, 0.3)} />
          ))}
        </g>
      </>
    );
  }

  if (motif === 'palace' || motif === 'city' || motif === 'coronation' || motif === 'garden') {
    return (
      <>
        <rect y="620" width={W} height="280" fill={`url(#${uid}-ground)`} />
        <Palace p={p} detail={detail} seed={seed} />
        {motif === 'garden' && <GardenLayer p={p} detail={detail} seed={seed} />}
        {motif === 'coronation' && <FestivalLayer p={p} detail={detail} seed={seed} />}
        {motif === 'city' && (
          <g opacity="0.65">
            {Array.from({ length: Math.round(20 * detail) }, (_, i) => (
              <g key={i} transform={`translate(${r.range(80, 1520)} ${r.range(690, 790)})`}>
                <rect x="0" y="0" width={r.range(14, 34)} height={r.range(24, 50)} fill={p.near} />
                <path d={`M -4 0 L ${r.range(4, 18)} -${r.range(14, 30)} L ${r.range(18, 40)} 0 Z`} fill={p.near} />
                <rect x="4" y="8" width="5" height="8" fill={p.accent} opacity="0.6" />
              </g>
            ))}
          </g>
        )}
      </>
    );
  }

  if (motif === 'battle') {
    return (
      <>
        <rect y="600" width={W} height="300" fill={`url(#${uid}-ground)`} />
        <LankaFortress p={p} detail={detail * 0.8} seed={seed} distant />
        <Battlefield p={p} detail={detail} seed={seed} />
      </>
    );
  }

  if (motif === 'forest' || motif === 'ashram' || motif === 'mountain') {
    return (
      <>
        <rect y="560" width={W} height="340" fill={`url(#${uid}-ground)`} />
        {motif !== 'mountain' && <Forest p={p} detail={detail} seed={seed} uid={uid} />}
        {motif === 'mountain' && <MountainValley p={p} detail={detail} seed={seed} />}
        {motif === 'ashram' && <Ashram p={p} detail={detail} seed={seed} />}
      </>
    );
  }

  return null;
}

function renderMotif(
  motif: Motif,
  p: Palette,
  uid: string,
  detail: number,
  seed: string | number | undefined,
) {
  if (motif === 'manuscript') return <Manuscript p={p} uid={uid} detail={detail} seed={seed} />;
  if (motif === 'court') return <Court p={p} uid={uid} detail={detail} seed={seed} />;
  if (motif === 'ocean' || motif === 'leap' || motif === 'bridge') {
    return (
      <>
        <Oceanfront p={p} detail={detail} seed={seed} />
      </>
    );
  }
  if (motif === 'battle') return <Crows p={p} detail={detail} seed={seed} />;
  return null;
}

function Ocean({ p, uid, detail, seed, time }: { p: Palette; uid: string; detail: number; seed?: string | number; time: TimeOfDay }) {
  const r = seeded(`${seed}-ocean`);
  return (
    <g>
      <rect y="510" width={W} height="390" fill={`url(#${uid}-water)`} />
      <rect y="500" width={W} height="30" fill={p.waterLight} opacity="0.28" />
      <g opacity="0.55">
        {Array.from({ length: Math.round(22 * detail) }, (_, i) => {
          const y = 530 + i * (340 / Math.round(22 * detail));
          const width = r.range(40, 200);
          return (
            <ellipse
              key={i}
              cx={sunWidthX(seed) + r.range(-160, 160)}
              cy={y}
              rx={width * (0.4 + (y - 500) / 500)}
              ry={r.range(1.2, 3.2)}
              fill={p.sun}
              opacity={0.15 + i * 0.012}
            />
          );
        })}
      </g>
      <g opacity="0.42">
        {Array.from({ length: Math.round(16 * detail) }, (_, i) => {
          const y = 545 + i * (330 / Math.round(16 * detail));
          return (
            <path
              key={i}
              d={wavePath(W + 120, y, 2 + i * 0.45, `${seed}-wave-${i}`, 14)}
              fill="none"
              stroke={i < 6 ? p.waterLight : p.light}
              strokeWidth={0.8 + i * 0.06}
              opacity={0.3}
              transform={`translate(${r.range(-60, 0)} 0)`}
            />
          );
        })}
      </g>
      {time === 'night' && <rect y="510" width={W} height="390" fill={p.ink} opacity="0.25" />}
    </g>
  );
}

function sunWidthX(seed: string | number | undefined) {
  const r = seeded(`${seed}-sunx`);
  return r.range(700, 1100);
}

function Oceanfront({ p, detail, seed }: { p: Palette; detail: number; seed?: string | number }) {
  const r = seeded(`${seed}-front`);
  return (
    <g>
      <path
        d={`M 0 760 Q 180 ${r.range(710, 760)} 340 745 Q 460 730 560 760 L 600 ${H} L 0 ${H} Z`}
        fill={p.ground}
        opacity="0.9"
      />
      <path d={`M 0 770 Q 140 750 300 776 L 320 850 L 0 850 Z`} fill={p.near} opacity="0.8" />
      {Array.from({ length: Math.round(9 * detail) }, (_, i) => (
        <path
          key={i}
          d={`M ${r.range(80, 520)} ${r.range(760, 840)} q ${r.range(10, 22)} -${r.range(26, 54)} ${r.range(2, 8)} -${r.range(50, 90)}`}
          fill="none"
          stroke={p.mid}
          strokeWidth={r.range(2, 5)}
          strokeLinecap="round"
          opacity="0.65"
        />
      ))}
    </g>
  );
}

function Bridge({ p, detail, seed }: { p: Palette; detail: number; seed?: string | number }) {
  const stones = stonePositions(Math.round(26 * detail) + 8, W, H, `${seed}-stones`);
  const r = seeded(`${seed}-bridge`);
  return (
    <g>
      <path d="M 0 640 Q 340 610 720 625 Q 1080 640 1380 600 L 1420 660 Q 1080 700 720 686 Q 340 672 0 704 Z" fill={p.mid} opacity="0.85" />
      <path d="M 0 650 Q 340 620 720 635 Q 1080 650 1380 612" fill="none" stroke={p.accentSoft} strokeWidth="2" opacity="0.45" />
      {stones.map((stone) => (
        <g key={stone.id} transform={`translate(${stone.x} ${stone.y}) rotate(${stone.rot})`} opacity={0.75 + r.range(0, 0.25)}>
          <rect x={-stone.w / 2} y={-stone.h / 2} width={stone.w} height={stone.h} rx="5" fill={stone.id % 3 === 0 ? p.far : p.mid} />
          <rect x={-stone.w / 2 + 3} y={-stone.h / 2 + 3} width={stone.w - 6} height={stone.h - 6} rx="3" fill="none" stroke={p.accent} strokeWidth="0.8" opacity="0.35" />
        </g>
      ))}
      <g opacity="0.85">
        <Figure kind="army" x={330} y={735} scale={0.62} />
        <Figure kind="army" x={630} y={748} scale={0.52} />
        <Figure kind="army" x={1050} y={718} scale={0.46} />
      </g>
      <g opacity="0.55">
        {Array.from({ length: 8 }, (_, i) => (
          <path key={i} d={wavePath(260, 800 + i * 12, 4, `${seed}-stonewave-${i}`, 5)} fill="none" stroke={p.waterLight} strokeWidth="1" />
        ))}
      </g>
    </g>
  );
}

function Palace({ p, detail, seed }: { p: Palette; detail: number; seed?: string | number }) {
  const r = seeded(`${seed}-palace`);
  return (
    <g>
      <rect y="688" width={W} height="70" fill={p.near} opacity="0.7" />
      <path d="M 250 700 L 300 670 L 1300 670 L 1350 700 Z" fill={p.near} />
      <Temple x={800} baseY={690} scale={1.4} fill={p.near} accent={p.accent} seed={`${seed}-main`} />
      <Temple x={540} baseY={690} scale={0.95} fill={p.mid} accent={p.accent} seed={`${seed}-t1`} />
      <Temple x={1060} baseY={690} scale={0.95} fill={p.mid} accent={p.accent} seed={`${seed}-t2`} />
      <Temple x={350} baseY={696} scale={0.62} fill={p.near} accent={p.accent} seed={`${seed}-t3`} />
      <Temple x={1250} baseY={696} scale={0.62} fill={p.near} accent={p.accent} seed={`${seed}-t4`} />
      <path d="M 600 700 L 600 620 L 1000 620 L 1000 700" fill={p.near} opacity="0.9" />
      {Array.from({ length: Math.round(8 * detail) }, (_, i) => (
        <g key={i}>
          <rect x={635 + i * 42} y="640" width="18" height="32" rx="8" fill={p.accent} opacity="0.5" />
          <rect x={635 + i * 42} y="672" width="18" height="26" fill={p.ink} opacity="0.4" />
        </g>
      ))}
      {Array.from({ length: Math.round(14 * detail) }, (_, i) => (
        <g key={`flag-${i}`} transform={`translate(${r.range(300, 1310)} ${r.range(540, 600)})`}>
          <path d="M 0 0 L 0 -52" stroke={p.accent} strokeWidth="1.4" />
          <path d="M 0 -52 L 22 -44 L 0 -36 Z" fill={p.accent} opacity="0.65" />
        </g>
      ))}
      <g opacity="0.8">
        <Figure kind="citizen" x={1470} y={800} scale={0.55} />
        <Figure kind="citizen" x={150} y={805} scale={0.5} />
      </g>
    </g>
  );
}

function Temple({ x, baseY, scale, fill, accent, seed }: { x: number; baseY: number; scale: number; fill: string; accent: string; seed: string }) {
  const r = seeded(seed);
  return (
    <g transform={`translate(${x} ${baseY}) scale(${scale})`}>
      <rect x="-58" y="-92" width="116" height="92" fill={fill} />
      <rect x="-44" y="-76" width="18" height="34" rx="9" fill={accent} opacity="0.32" />
      <rect x="26" y="-76" width="18" height="34" rx="9" fill={accent} opacity="0.32" />
      <path d="M -40 -92 L -32 -128 L -16 -128 L -8 -168 L 8 -168 L 16 -128 L 32 -128 L 40 -92 Z" fill={fill} />
      <path d="M -8 -168 L 0 -196 L 8 -168 Z" fill={fill} />
      <path d="M 0 -196 L 0 -218" stroke={accent} strokeWidth="2" opacity="0.8" />
      <circle cx="0" cy="-222" r="4" fill={accent} opacity="0.8" />
      {Array.from({ length: 4 }, (_, i) => (
        <path key={i} d={`M ${-26 - i * 6} ${-100 - i * 18} L ${26 + i * 6} ${-100 - i * 18}`} stroke={fill} strokeWidth="6" opacity="0.5" />
      ))}
      {r.chance(0.8) && <path d="M -58 -92 L 58 -92" stroke={accent} strokeWidth="1.2" opacity="0.3" />}
      <rect x="-16" y="-50" width="32" height="50" rx="16" fill={'#120E0C'} opacity="0.45" />
    </g>
  );
}

function LankaFortress({ p, detail, seed, distant = false }: { p: Palette; detail: number; seed?: string | number; distant?: boolean }) {
  const r = seeded(`${seed}-lanka`);
  const baseY = distant ? 640 : 700;
  const scale = distant ? 0.65 : 1;
  return (
    <g opacity={distant ? 0.55 : 1}>
      <rect x="0" y={baseY - 10} width={W} height={H - baseY + 10} fill={p.ground} opacity="0.75" />
      <g transform={`translate(0 ${baseY}) scale(${scale})`}>
        <rect x="300" y="-150" width="1000" height="150" fill={p.near} />
        <path d="M 300 -150 L 330 -178 L 370 -178 L 390 -150 M 530 -150 L 550 -182 L 590 -182 L 610 -150 M 990 -150 L 1010 -182 L 1050 -182 L 1070 -150 M 1230 -150 L 1260 -178 L 1300 -178 L 1320 -150" fill={p.near} />
        <Temple x={800} baseY={-150} scale={2.1} fill={p.near} accent={p.accent} seed={`${seed}-lanka-main`} />
        <Temple x={520} baseY={-150} scale={1.2} fill={p.mid} accent={p.accent} seed={`${seed}-lanka-l`} />
        <Temple x={1080} baseY={-150} scale={1.25} fill={p.mid} accent={p.accent} seed={`${seed}-lanka-r`} />
        <Temple x={360} baseY={-150} scale={0.8} fill={p.near} accent={p.accent} seed={`${seed}-lanka-l2`} />
        <Temple x={1240} baseY={-150} scale={0.8} fill={p.near} accent={p.accent} seed={`${seed}-lanka-r2`} />
        {Array.from({ length: Math.round(30 * detail) }, (_, i) => (
          <rect
            key={i}
            x={r.range(330, 1270)}
            y={r.range(-118, -24)}
            width={r.range(3, 7)}
            height={r.range(5, 11)}
            fill={p.sun}
            opacity={r.range(0.15, 0.6)}
          />
        ))}
        <path d="M 800 -520 L 800 -570" stroke={p.accent} strokeWidth="2" opacity="0.6" />
        <path d="M 800 -570 L 826 -558 L 800 -546 Z" fill={p.accent} opacity="0.6" />
      </g>
      <g opacity={distant ? 0.4 : 0.55}>
        {Array.from({ length: 6 }, (_, i) => (
          <path key={i} d={`M ${r.range(0, 1500)} ${r.range(600, 690)} q 80 -20 160 0`} fill="none" stroke={p.mid} strokeWidth="18" opacity="0.12" />
        ))}
      </g>
    </g>
  );
}

function GardenLayer({ p, detail, seed }: { p: Palette; detail: number; seed?: string | number }) {
  const r = seeded(`${seed}-garden`);
  return (
    <g>
      {Array.from({ length: Math.round(9 * detail) }, (_, i) => {
        const x = r.range(80, 1480);
        const y = r.range(690, 810);
        const h = r.range(60, 140);
        return (
          <g key={i} transform={`translate(${x} ${y})`} opacity="0.9">
            <path d={`M 0 0 L ${r.range(-4, 4)} -${h}`} stroke={p.mid} strokeWidth={r.range(3, 6)} />
            <ellipse cx={r.range(-20, 20)} cy={-h - 10} rx={r.range(24, 50)} ry={r.range(20, 36)} fill={p.near} opacity="0.8" />
            {Array.from({ length: 5 }, (_, j) => (
              <circle key={j} cx={r.range(-24, 24)} cy={-h + r.range(-28, 18)} r={r.range(2, 4)} fill={p.accentSoft} opacity={r.range(0.25, 0.7)} />
            ))}
          </g>
        );
      })}
      {Array.from({ length: Math.round(24 * detail) }, (_, i) => (
        <circle key={`petal-${i}`} cx={r.range(60, 1540)} cy={r.range(700, 880)} r={r.range(1.2, 3)} fill={p.accentSoft} opacity={r.range(0.2, 0.6)} />
      ))}
    </g>
  );
}

function FestivalLayer({ p, detail, seed }: { p: Palette; detail: number; seed?: string | number }) {
  const r = seeded(`${seed}-festival`);
  return (
    <g>
      {Array.from({ length: Math.round(10 * detail) }, (_, i) => {
        const x = 160 + i * 135;
        return (
          <g key={i} transform={`translate(${x} 640)`}>
            <path d="M 0 0 L 0 -170" stroke={p.accent} strokeWidth="1.4" opacity="0.45" />
            {Array.from({ length: 4 }, (_, j) => (
              <circle key={j} cx={r.range(-6, 6)} cy={-24 - j * 34} r={r.range(2, 4.5)} fill={p.sun} opacity="0.8" />
            ))}
          </g>
        );
      })}
      <g opacity="0.85">
        {Array.from({ length: Math.round(22 * detail) }, (_, i) => (
          <g key={i} transform={`translate(${r.range(60, 1540)} ${r.range(710, 860)})`}>
            <circle cx="0" cy="0" r={r.range(4, 7)} fill={p.accentSoft} opacity={r.range(0.3, 0.7)} />
            <path d="M 0 0 L 0 12" stroke={p.accent} strokeWidth="1" opacity="0.4" />
          </g>
        ))}
      </g>
    </g>
  );
}

function Forest({ p, detail, seed, uid }: { p: Palette; detail: number; seed?: string | number; uid: string }) {
  const r = seeded(`${seed}-forest`);
  const treeCount = Math.round(10 * detail);
  return (
    <g>
      <g opacity="0.6">
        {Array.from({ length: Math.round(16 * detail) }, (_, i) => (
          <ellipse key={i} cx={r.range(-40, W + 40)} cy={r.range(540, 650)} rx={r.range(50, 130)} ry={r.range(36, 90)} fill={p.mid} opacity={r.range(0.2, 0.55)} />
        ))}
      </g>
      {Array.from({ length: treeCount }, (_, i) => {
        const x = (i / treeCount) * W + r.range(-70, 70);
        const h = r.range(150, 340);
        const y = r.range(710, 800);
        const trunk = r.range(5, 13);
        return (
          <g key={i} opacity={r.range(0.7, 1)}>
            <path d={`M ${x} ${y} C ${x - 8} ${y - h * 0.4}, ${x + 6} ${y - h * 0.7}, ${x + r.range(-18, 18)} ${y - h}`} fill="none" stroke={p.near} strokeWidth={trunk} strokeLinecap="round" />
            <path d={`M ${x} ${y - h * 0.55} Q ${x - 40} ${y - h * 0.7} ${x - 55} ${y - h * 0.85}`} fill="none" stroke={p.near} strokeWidth={trunk * 0.35} opacity="0.7" />
            {Array.from({ length: r.int(3, 6) }, (_, j) => (
              <ellipse
                key={j}
                cx={x + r.range(-62, 62)}
                cy={y - h + r.range(-30, 34)}
                rx={r.range(30, 74)}
                ry={r.range(22, 46)}
                fill={j % 2 === 0 ? p.near : p.mid}
                opacity={r.range(0.55, 0.92)}
              />
            ))}
          </g>
        );
      })}
      <path d="M 690 900 Q 760 760 810 700 Q 860 760 920 900 Z" fill={p.ground} opacity="0.55" />
      {detail > 0.6 && (
        <g opacity="0.16">
          <path d="M 520 0 L 760 780 L 940 780 L 690 0 Z" fill={`url(#${uid}-shaft)`} />
        </g>
      )}
    </g>
  );
}

function MountainValley({ p, detail, seed }: { p: Palette; detail: number; seed?: string | number }) {
  const r = seeded(`${seed}-valley`);
  return (
    <g>
      <path d={ridgePath(W, 820, 480, `${seed}-valley-a`)} fill={p.near} opacity="0.9" />
      <path d={ridgePath(W, 870, 620, `${seed}-valley-b`)} fill={p.ground} />
      <path d="M 620 900 Q 720 760 800 720 Q 880 780 980 900 Z" fill={p.mid} opacity="0.35" />
      <path d="M 760 900 Q 800 780 812 722" fill="none" stroke={p.waterLight} strokeWidth="5" opacity="0.45" />
      {Array.from({ length: Math.round(12 * detail) }, (_, i) => {
        const x = r.range(120, 1460);
        const y = r.range(760, 860);
        return (
          <g key={i} transform={`translate(${x} ${y})`}>
            <path d="M 0 0 L 0 -40" stroke={p.near} strokeWidth="2.5" />
            <path d="M -14 -20 L 0 -52 L 14 -20 Z" fill={p.near} />
            <path d="M -9 -8 L 0 -34 L 9 -8 Z" fill={p.near} opacity="0.8" />
          </g>
        );
      })}
      {detail > 0.6 &&
        Array.from({ length: 4 }, (_, i) => (
          <path key={i} d={mountainPath({ baseY: 580 + i * 10, peakY: 420, peaks: 4, seed: `${seed}-peak-${i}` })} fill={p.mid} opacity="0.08" />
        ))}
    </g>
  );
}

function Ashram({ p, detail, seed }: { p: Palette; detail: number; seed?: string | number }) {
  const r = seeded(`${seed}-ashram`);
  return (
    <g>
      <g transform="translate(1080 735)">
        <path d="M -120 0 L -100 -95 L 100 -95 L 120 0 Z" fill={p.mid} />
        <path d="M -144 -88 L 0 -190 L 144 -88 Z" fill={p.near} />
        <path d="M -144 -88 L 0 -190 L 144 -88" fill="none" stroke={p.accent} strokeWidth="1.4" opacity="0.35" />
        <rect x="-22" y="-70" width="44" height="70" rx="20" fill={p.ink} opacity="0.65" />
        <path d="M 0 -190 L 0 -210" stroke={p.accent} strokeWidth="2" opacity="0.6" />
        <path d="M -30 -110 L 30 -110" stroke={p.accent} strokeWidth="1" opacity="0.2" />
      </g>
      <g transform="translate(780 790)" opacity="0.8">
        <circle cx="0" cy="-18" r="18" fill={p.accent} opacity="0.22" />
        <path d="M 0 -34 C 12 -48 22 -28 12 -16 C 24 -6 10 6 0 -2 C -10 6 -24 -6 -12 -16 C -22 -28 -12 -48 0 -34 Z" fill={p.accent} opacity="0.4" />
        <path d="M 0 -28 C 8 -36 14 -24 8 -16 C 16 -10 8 0 0 -6 C -8 0 -16 -10 -8 -16 C -14 -24 -8 -36 0 -28 Z" fill={p.sun} opacity="0.55" />
        {Array.from({ length: 4 }, (_, i) => (
          <path key={i} d={`M 0 -50 C ${r.range(-20, 20)} -70 ${r.range(-30, 30)} -80 ${r.range(-40, 40)} -100`} fill="none" stroke={p.haze} strokeWidth="2" opacity="0.15" />
        ))}
      </g>
      {Array.from({ length: Math.round(6 * detail) }, (_, i) => (
        <ellipse key={i} cx={r.range(180, 780)} cy={r.range(800, 860)} rx={r.range(18, 48)} ry={r.range(6, 14)} fill={p.mid} opacity="0.35" />
      ))}
    </g>
  );
}

function Battlefield({ p, detail, seed }: { p: Palette; detail: number; seed?: string | number }) {
  const r = seeded(`${seed}-battle`);
  return (
    <g>
      <g opacity="0.45">
        {Array.from({ length: 5 }, (_, i) => (
          <path key={i} d={`M -100 ${r.range(560, 700)} Q 400 ${r.range(480, 600)} 900 ${r.range(540, 660)} T 1700 ${r.range(520, 640)}`} fill="none" stroke={p.mid} strokeWidth={r.range(30, 80)} opacity="0.25" />
        ))}
      </g>
      <path d="M 0 690 Q 500 650 900 680 Q 1250 700 1600 660 L 1600 900 L 0 900 Z" fill={p.ground} />
      {Array.from({ length: Math.round(42 * detail) }, (_, i) => {
        const x = r.range(20, 1580);
        const y = r.range(660, 790);
        return (
          <g key={i} transform={`translate(${x} ${y})`} opacity={r.range(0.25, 0.75)}>
            <path d="M 0 0 L 0 -46" stroke={p.accent} strokeWidth="1.4" />
            <path d="M 0 -46 L 9 -38 L 0 -32 Z" fill={p.accent} opacity="0.5" />
            <circle cx="0" cy="4" r={r.range(3, 7)} fill={p.near} />
          </g>
        );
      })}
      <g opacity="0.85">
        <path d="M 1180 760 L 1160 590 L 1210 580 L 1245 750 Z" fill={p.near} />
        <path d="M 1170 620 L 1250 600 L 1270 650 L 1180 670 Z" fill={p.mid} opacity="0.7" />
        <path d="M 1215 590 L 1225 520" stroke={p.accent} strokeWidth="2" opacity="0.5" />
        <path d="M 1225 520 L 1254 532 L 1225 544 Z" fill={p.accent} opacity="0.5" />
      </g>
      {Array.from({ length: Math.round(26 * detail) }, (_, i) => (
        <circle key={`ember-${i}`} cx={r.range(0, W)} cy={r.range(380, 820)} r={r.range(0.8, 2.6)} fill={p.sun} opacity={r.range(0.15, 0.65)} />
      ))}
    </g>
  );
}

function Crows({ p, detail, seed }: { p: Palette; detail: number; seed?: string | number }) {
  const r = seeded(`${seed}-crows`);
  return (
    <g opacity="0.55">
      {Array.from({ length: Math.round(8 * detail) }, (_, i) => {
        const x = r.range(200, 1400);
        const y = r.range(160, 460);
        const s = r.range(0.7, 1.5);
        return (
          <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
            <path d="M -15 0 Q -7 -6 0 0 Q 7 -6 15 0" fill="none" stroke={p.ink} strokeWidth="2" strokeLinecap="round" />
          </g>
        );
      })}
    </g>
  );
}

function Court({ p, uid, detail, seed }: { p: Palette; uid: string; detail: number; seed?: string | number }) {
  const r = seeded(`${seed}-court`);
  return (
    <g>
      <rect width={W} height={H} fill={`url(#${uid}-sky)`} />
      <rect y="620" width={W} height="280" fill={p.ground} />
      <g opacity="0.5">
        {Array.from({ length: 9 }, (_, i) => (
          <path key={i} d={`M 0 ${680 + i * 24} L ${W} ${680 + i * 24}`} stroke={p.accent} strokeWidth="0.8" opacity={0.25} />
        ))}
        {Array.from({ length: 11 }, (_, i) => (
          <path key={`v-${i}`} d={`M ${140 + i * 132} 620 L ${-260 + i * 300} 900`} stroke={p.accent} strokeWidth="0.7" opacity={0.16} />
        ))}
      </g>
      <rect x="120" y="180" width="1360" height="520" fill={p.mid} opacity="0.35" />
      {[420, 800, 1180].map((x, i) => (
        <g key={i}>
          <path
            d={`M ${x - 190} 660 L ${x - 190} 390 Q ${x - 190} 270 ${x} 250 Q ${x + 190} 270 ${x + 190} 390 L ${x + 190} 660 Z`}
            fill={p.ink}
            opacity="0.28"
          />
          <path
            d={`M ${x - 170} 640 L ${x - 170} 395 Q ${x - 170} 295 ${x} 280 Q ${x + 170} 295 ${x + 170} 395 L ${x + 170} 640 Z`}
            fill={p.skyBottom}
            opacity="0.12"
          />
          <path d={`M ${x - 190} 390 Q ${x - 190} 270 ${x} 250 Q ${x + 190} 270 ${x + 190} 390`} fill="none" stroke={p.accent} strokeWidth="1.5" opacity="0.3" />
          <path d={`M ${x - 30} 470 L ${x} 420 L ${x + 30} 470`} fill="none" stroke={p.accent} strokeWidth="1" opacity="0.2" />
          <path d={`M ${x} 250 L ${x} 200`} stroke={p.accent} strokeWidth="1" opacity="0.25" />
        </g>
      ))}
      {[180, 1420].map((x, i) => (
        <g key={`pillar-${i}`}>
          <rect x={x} y="240" width="54" height="430" fill={p.ink} opacity="0.45" />
          <rect x={x - 10} y="220" width="74" height="34" fill={p.ink} opacity="0.55" />
          <rect x={x - 4} y="650" width="62" height="24" fill={p.ink} opacity="0.5" />
          {Array.from({ length: 8 }, (_, j) => (
            <path key={j} d={`M ${x + 4} ${280 + j * 46} L ${x + 50} ${280 + j * 46}`} stroke={p.accent} strokeWidth="1" opacity="0.12" />
          ))}
        </g>
      ))}
      <g transform="translate(800 610)">
        <rect x="-190" y="0" width="380" height="60" fill={p.near} opacity="0.7" />
        <path d="M -150 0 L -130 -80 L 130 -80 L 150 0 Z" fill={p.accent} opacity="0.18" />
        <path d="M -110 -80 L -90 -125 L 0 -150 L 90 -125 L 110 -80 Z" fill={p.accent} opacity="0.28" />
        <path d="M 0 -150 L 0 -210" stroke={p.accent} strokeWidth="2" opacity="0.5" />
      </g>
      {Array.from({ length: Math.round(9 * detail) }, (_, i) => {
        const x = 300 + i * 140;
        return (
          <g key={`lamp-${i}`} transform={`translate(${x} 665)`}>
            <path d="M 0 0 L 0 -26" stroke={p.accent} strokeWidth="1.4" opacity="0.5" />
            <circle cx="0" cy="-30" r={r.range(2.5, 4.5)} fill={p.sun} opacity="0.8" />
          </g>
        );
      })}
      {Array.from({ length: Math.round(18 * detail) }, (_, i) => (
        <path key={`drape-${i}`} d={`M ${r.range(120, 1480)} 180 L ${r.range(120, 1480)} ${r.range(250, 340)}`} stroke={p.accent} strokeWidth={r.range(1, 3)} opacity="0.12" />
      ))}
      <rect width={W} height={H} fill={`url(#${uid}-vignette)`} />
    </g>
  );
}

function Manuscript({ p, uid, detail, seed }: { p: Palette; uid: string; detail: number; seed?: string | number }) {
  const r = seeded(`${seed}-manuscript`);
  return (
    <g>
      <rect width={W} height={H} fill={`url(#${uid}-sky)`} />
      <g opacity="0.55">
        {Array.from({ length: Math.round(24 * detail) }, (_, i) => (
          <circle key={i} cx={r.range(0, W)} cy={r.range(0, H)} r={r.range(1, 4)} fill={p.accent} opacity={r.range(0.06, 0.22)} />
        ))}
      </g>
      <g transform="translate(800 450) rotate(-1.4)">
        <rect x="-560" y="-330" width="1120" height="660" rx="16" fill={p.near} opacity="0.18" />
        <rect x="-570" y="-340" width="1140" height="672" rx="14" fill={p.skyBottom} />
        <rect x="-540" y="-312" width="1080" height="616" rx="8" fill="none" stroke={p.accent} strokeWidth="2" opacity="0.6" />
        <rect x="-524" y="-298" width="1048" height="588" rx="5" fill="none" stroke={p.accent} strokeWidth="0.8" opacity="0.4" />
        <g transform="translate(0 -40)">
          <path d="M -430 120 L -430 -120 L 430 -120 L 430 120 Z" fill={p.mid} opacity="0.16" />
          <path d={mountainPath({ width: 700, baseY: 110, peakY: -80, peaks: 6, seed: `${seed}-ms-mountain` })} fill={p.mid} opacity="0.4" transform="translate(-350 -40)" />
          <path d={mountainPath({ width: 620, baseY: 120, peakY: -20, peaks: 4, seed: `${seed}-ms-mountain2` })} fill={p.near} opacity="0.28" transform="translate(-310 -20)" />
          <rect x="-330" y="60" width="660" height="60" fill={p.water} opacity="0.2" />
          <g opacity="0.32">
            <Temple x={-50} baseY={80} scale={0.8} fill={p.near} accent={p.accent} seed={`${seed}-ms-temple`} />
            <Temple x={180} baseY={72} scale={0.5} fill={p.near} accent={p.accent} seed={`${seed}-ms-temple2`} />
          </g>
          {Array.from({ length: 8 }, (_, i) => (
            <path key={i} d={wavePath(600, 90 + i * 8, 2, `${seed}-ms-wave-${i}`, 7)} fill="none" stroke={p.near} strokeWidth="0.8" opacity="0.22" />
          ))}
        </g>
        {Array.from({ length: 7 }, (_, row) => (
          <g key={row} opacity="0.55">
            {Array.from({ length: 18 }, (_, col) => {
              const x = -480 + col * 54 + r.range(-8, 8);
              const y = 195 + row * 36;
              const w = r.range(14, 40);
              return <rect key={col} x={x} y={y} width={w} height={r.range(2, 3.4)} rx="1.6" fill={p.ink} opacity={r.range(0.3, 0.65)} />;
            })}
          </g>
        ))}
        {[
          [-520, -300],
          [520, -300],
          [-520, 300],
          [520, 300],
        ].map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y})`} opacity="0.45">
            <circle r="24" fill="none" stroke={p.accent} strokeWidth="1" />
            <path d="M 0 -16 L 6 -5 L 17 0 L 6 5 L 0 16 L -6 5 L -17 0 L -6 -5 Z" fill="none" stroke={p.accent} strokeWidth="0.8" />
          </g>
        ))}
      </g>
      <g opacity="0.3">
        {Array.from({ length: Math.round(10 * detail) }, (_, i) => (
          <path key={i} d={`M ${r.range(80, 1520)} ${r.range(80, 820)} q ${r.range(20, 60)} ${r.range(-20, 20)} ${r.range(50, 100)} 0`} fill="none" stroke={p.accent} strokeWidth="1" />
        ))}
      </g>
      <rect width={W} height={H} fill={`url(#${uid}-vignette)`} />
    </g>
  );
}

function FiguresLayer({ motif, figures, p }: { motif: Motif; figures: FigureKind[]; p: Palette }) {
  if (!figures.length) return null;
  const layout = figureLayout(motif, figures);
  return (
    <g>
      {layout.map((item, index) => (
        <g key={`${item.kind}-${index}`}>
          <ellipse cx={item.x} cy={item.y + 2} rx={78 * item.scale} ry={12 * item.scale} fill={p.ink} opacity="0.32" />
          <Figure kind={item.kind} x={item.x} y={item.y} scale={item.scale} flip={item.flip} />
        </g>
      ))}
    </g>
  );
}

function figureLayout(
  motif: Motif,
  figures: FigureKind[],
): Array<{ kind: FigureKind; x: number; y: number; scale: number; flip: boolean }> {
  if (motif === 'leap' && figures.includes('hanuman')) {
    return [{ kind: 'hanuman-flight', x: 960, y: 370, scale: 1.55, flip: false }];
  }
  if (motif === 'battle') {
    const output: Array<{ kind: FigureKind; x: number; y: number; scale: number; flip: boolean }> = [
      { kind: 'rama', x: 930, y: 805, scale: 1.05, flip: false },
      { kind: 'ravana', x: 1290, y: 810, scale: 1.02, flip: true },
    ];
    if (figures.includes('hanuman')) output.push({ kind: 'hanuman', x: 720, y: 800, scale: 0.85, flip: false });
    if (figures.includes('army')) output.push({ kind: 'army', x: 1180, y: 770, scale: 0.5, flip: true });
    return output;
  }
  if (motif === 'court') {
    return figures.slice(0, 3).map((kind, i) => ({
      kind,
      x: 1120 + i * -115,
      y: 795 + i * 8,
      scale: 0.95 - i * 0.1,
      flip: i % 2 === 0,
    }));
  }
  if (motif === 'coronation') {
    return [
      { kind: figures[0] ?? 'rama', x: 790, y: 800, scale: 1.02, flip: false },
      { kind: figures[1] ?? 'sita', x: 945, y: 805, scale: 0.97, flip: true },
      { kind: figures[2] ?? 'hanuman', x: 650, y: 805, scale: 0.78, flip: false },
    ];
  }
  if (motif === 'ocean' || motif === 'bridge') {
    return figures.slice(0, 3).map((kind, i) => ({
      kind,
      x: 1230 - i * 130,
      y: 800 + i * 6,
      scale: 0.92 - i * 0.08,
      flip: i % 2 === 1,
    }));
  }
  if (motif === 'lanka') {
    return figures.slice(0, 2).map((kind, i) => ({
      kind,
      x: 1210 - i * 130,
      y: 800,
      scale: 1 - i * 0.16,
      flip: i === 0,
    }));
  }
  return figures.slice(0, 3).map((kind, i) => ({
    kind,
    x: 1240 - i * 132,
    y: 800 + i * 8,
    scale: (figures.length > 1 ? 0.92 : 0.98) - i * 0.12,
    flip: i % 2 === 1,
  }));
}

function renderForeground(
  motif: Motif,
  p: Palette,
  detail: number,
  seed: string | number | undefined,
  _uid: string,
) {
  const r = seeded(`${seed}-foreground`);
  if (motif === 'court' || motif === 'manuscript') return null;
  if (motif === 'ocean' || motif === 'leap' || motif === 'bridge') {
    return (
      <g>
        {Array.from({ length: Math.round(8 * detail) }, (_, i) => (
          <path
            key={i}
            d={`M ${r.range(0, W)} ${r.range(780, 900)} l ${r.range(2, 6)} -${r.range(30, 80)}`}
            stroke={p.near}
            strokeWidth={r.range(1.5, 3)}
            strokeLinecap="round"
            opacity={r.range(0.25, 0.55)}
          />
        ))}
      </g>
    );
  }
  return (
    <g opacity="0.85">
      <path d="M 0 900 Q 60 760 190 800 Q 120 860 70 900 Z" fill={p.ground} opacity="0.8" />
      <path d="M 1600 900 Q 1520 760 1400 810 Q 1480 866 1540 900 Z" fill={p.ground} opacity="0.8" />
      {Array.from({ length: Math.round(14 * detail) }, (_, i) => (
        <g key={i} transform={`translate(${r.range(30, 330)} ${r.range(800, 890)})`}>
          <path d={`M 0 0 Q ${r.range(-16, 16)} -${r.range(20, 50)} ${r.range(-30, 30)} -${r.range(40, 74)}`} fill="none" stroke={p.near} strokeWidth={r.range(1.5, 3.6)} strokeLinecap="round" />
        </g>
      ))}
      {Array.from({ length: Math.round(8 * detail) }, (_, i) => (
        <g key={`r-${i}`} transform={`translate(${r.range(1320, 1580)} ${r.range(800, 890)})`}>
          <path d={`M 0 0 Q ${r.range(-16, 16)} -${r.range(20, 50)} ${r.range(-30, 30)} -${r.range(40, 74)}`} fill="none" stroke={p.near} strokeWidth={r.range(1.5, 3.6)} strokeLinecap="round" />
        </g>
      ))}
    </g>
  );
}

function Atmosphere({ p, motif, detail, seed, time }: { p: Palette; motif: Motif; detail: number; seed?: string | number; time: TimeOfDay }) {
  const r = seeded(`${seed}-atmos`);
  const count = Math.round((motif === 'battle' || motif === 'lanka' ? 30 : 20) * detail);
  return (
    <g>
      {Array.from({ length: count }, (_, i) => (
        <circle
          key={i}
          cx={r.range(0, W)}
          cy={r.range(0, H)}
          r={r.range(0.7, 2.3)}
          fill={time === 'night' ? p.light : p.accentSoft}
          opacity={r.range(0.12, 0.5)}
        />
      ))}
      {time !== 'night' && motif !== 'battle' && (
        <g opacity="0.1">
          <rect width={W} height={H} fill={p.accentSoft} />
        </g>
      )}
    </g>
  );
}
