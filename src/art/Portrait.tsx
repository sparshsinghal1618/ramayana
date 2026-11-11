import { useId } from 'react';
import type { Character } from '../data/types';
import { mix, shade } from './palettes';

interface PortraitProps {
  character: Character;
  className?: string;
}

export function Portrait({ character, className = '' }: PortraitProps) {
  const uid = useId().replace(/:/g, '');
  const { look } = character;
  const isWoman = ['sita', 'kaushalya', 'kaikeyi', 'sumitra', 'manthara', 'shabari', 'surpanakha'].includes(character.id);
  const isVanara = character.id === 'hanuman' || character.id === 'sugriva' || character.id === 'vali' || character.id === 'angada' || character.id === 'nala' || character.id === 'nila' || character.id === 'jambavan';
  const isRakshasa = character.faction === 'rakshasa' && character.id !== 'vibhishana';
  const isBird = character.id === 'jatayu' || character.id === 'sampati';
  const isSage = character.look.crown === 'sage';
  const isRavana = character.id === 'ravana';
  const bgA = shade(look.robe, -0.58);
  const bgB = shade(look.robe, -0.78);
  const glow = mix(look.accent, '#F5E9CF', 0.4);
  const robeShade = look.robeShade ?? shade(look.robe, -0.34);
  const skinShade = look.skinShade ?? shade(look.skin, -0.22);

  return (
    <div className={`portrait-art ${className}`}>
      <svg viewBox="0 0 600 760" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="0.25" y2="1">
            <stop offset="0" stopColor={bgA} />
            <stop offset="1" stopColor={bgB} />
          </linearGradient>
          <radialGradient id={`${uid}-halo`} cx="0.5" cy="0.42" r="0.52">
            <stop offset="0" stopColor={glow} stopOpacity="0.55" />
            <stop offset="0.55" stopColor={look.accent} stopOpacity="0.16" />
            <stop offset="1" stopColor={look.accent} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${uid}-arch`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={shade(look.robe, -0.25)} />
            <stop offset="0.65" stopColor={shade(look.robe, -0.5)} />
            <stop offset="1" stopColor={bgB} />
          </linearGradient>
          <linearGradient id={`${uid}-cloth`} x1="0" y1="0" x2="1" y2="0.4">
            <stop offset="0" stopColor={look.robe} />
            <stop offset="0.48" stopColor={mix(look.robe, look.accent, 0.18)} />
            <stop offset="1" stopColor={robeShade} />
          </linearGradient>
          <linearGradient id={`${uid}-skin`} x1="0.2" y1="0" x2="0.8" y2="1">
            <stop offset="0" stopColor={mix(look.skin, '#F1D9B5', 0.18)} />
            <stop offset="0.6" stopColor={look.skin} />
            <stop offset="1" stopColor={skinShade} />
          </linearGradient>
          <radialGradient id={`${uid}-cheek`} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor={mix(look.skin, '#A94A3C', 0.25)} stopOpacity="0.35" />
            <stop offset="1" stopColor={look.skin} stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="600" height="760" fill={`url(#${uid}-bg)`} />
        <g opacity="0.2" stroke={look.accent} fill="none">
          <circle cx="300" cy="350" r="250" strokeWidth="0.8" />
          <circle cx="300" cy="350" r="225" strokeWidth="0.5" strokeDasharray="1 9" />
          <circle cx="300" cy="350" r="188" strokeWidth="0.6" />
          {Array.from({ length: 24 }, (_, i) => {
            const angle = (i / 24) * Math.PI * 2;
            return <path key={i} d={`M ${300 + Math.cos(angle) * 208} ${350 + Math.sin(angle) * 208} L ${300 + Math.cos(angle) * 232} ${350 + Math.sin(angle) * 232}`} strokeWidth="0.8" />;
          })}
        </g>

        <path
          d="M 70 712 L 70 286 Q 70 112 300 76 Q 530 112 530 286 L 530 712 Z"
          fill={`url(#${uid}-arch)`}
          stroke={look.accent}
          strokeWidth="2"
        />
        <path
          d="M 88 700 L 88 292 Q 88 132 300 100 Q 512 132 512 292 L 512 700 Z"
          fill="none"
          stroke={look.accent}
          strokeWidth="0.8"
          opacity="0.45"
        />

        <g opacity="0.16" fill="none" stroke={look.accent} strokeWidth="2.2">
          <LargeIcon icon={look.icon} />
        </g>

        <circle cx="300" cy="350" r="255" fill={`url(#${uid}-halo)`} />

        {/* Shoulders and torso */}
        <path
          d="M 76 760 C 84 620 168 552 242 532 L 358 532 C 432 552 516 620 524 760 Z"
          fill={`url(#${uid}-cloth)`}
        />
        <path d="M 242 532 C 268 570 332 570 358 532 L 380 760 L 218 760 Z" fill={robeShade} opacity="0.35" />
        <path d="M 185 600 C 230 568 270 552 300 552 C 346 552 383 576 423 610" fill="none" stroke={look.accent} strokeWidth="4" opacity="0.8" />
        <path d="M 196 620 C 240 588 268 576 300 576 C 342 576 378 598 414 626" fill="none" stroke={look.accent} strokeWidth="1.5" opacity="0.65" />
        {Array.from({ length: 7 }, (_, i) => (
          <circle key={i} cx={242 + i * 19} cy={616 + Math.sin((i / 6) * Math.PI) * 22} r="4" fill={look.accent} opacity="0.7" />
        ))}

        {/* Neck */}
        <path d="M 260 488 L 260 558 C 278 578 322 578 340 558 L 340 488 Z" fill={skinShade} />
        <path d="M 268 492 L 268 542 C 282 552 318 552 332 542 L 332 492 Z" fill={`url(#${uid}-skin)`} />

        {isRavana && (
          <g>
            {[
              [-96, 314, 0.7],
              [96, 314, 0.7],
              [-160, 352, 0.54],
              [160, 352, 0.54],
              [-58, 264, 0.52],
              [58, 264, 0.52],
            ].map(([dx, cy, s], i) => (
              <g key={i} transform={`translate(${dx} ${(cy as number) - 330}) scale(${s})`}>
                <ellipse cx="300" cy="330" rx="96" ry="110" fill={skinShade} />
                <path d="M 208 324 C 214 236 280 210 300 210 C 322 210 388 240 392 326 C 352 284 250 284 208 324 Z" fill={look.hair} />
                <path d="M 238 212 L 250 160 L 278 210 L 300 150 L 322 210 L 352 160 L 362 214" fill="none" stroke={look.accent} strokeWidth="7" strokeLinejoin="round" />
                <circle cx="300" cy="342" r="4" fill={look.hair} opacity="0.8" />
              </g>
            ))}
          </g>
        )}

        {/* Head */}
        {isBird ? (
          <BirdHead look={look} accent={look.accent} skinShade={skinShade} />
        ) : (
          <g>
            <ellipse cx="300" cy="348" rx="98" ry="116" fill={`url(#${uid}-skin)`} />
            <ellipse cx="300" cy="334" rx="96" ry="112" fill={`url(#${uid}-skin)`} />
            {isVanara ? (
              <>
                <ellipse cx="300" cy="390" rx="54" ry="46" fill={mix(look.skin, '#F0CD9A', 0.22)} />
                <ellipse cx="300" cy="372" rx="34" ry="21" fill={skinShade} opacity="0.65" />
                <circle cx="292" cy="369" r="3.4" fill={look.hair} />
                <circle cx="308" cy="369" r="3.4" fill={look.hair} />
                <path d="M 280 405 Q 300 414 320 405" fill="none" stroke={skinShade} strokeWidth="2.4" strokeLinecap="round" />
                <ellipse cx="194" cy="352" rx="26" ry="38" fill={skinShade} />
                <ellipse cx="406" cy="352" rx="26" ry="38" fill={skinShade} />
                <ellipse cx="194" cy="352" rx="14" ry="23" fill={look.skin} opacity="0.8" />
                <ellipse cx="406" cy="352" rx="14" ry="23" fill={look.skin} opacity="0.8" />
              </>
            ) : (
              <>
                <path d="M 300 352 L 300 392 Q 300 402 289 404" fill="none" stroke={skinShade} strokeWidth="2.6" strokeLinecap="round" />
                <path d="M 284 426 Q 300 434 316 426" fill="none" stroke={mix(skinShade, '#5D2A26', 0.45)} strokeWidth="2.8" strokeLinecap="round" />
                <ellipse cx="252" cy="386" rx="22" ry="13" fill={`url(#${uid}-cheek)`} />
                <ellipse cx="348" cy="386" rx="22" ry="13" fill={`url(#${uid}-cheek)`} />
                {isRakshasa && (
                  <>
                    <path d="M 244 438 Q 300 458 356 438" fill="none" stroke={look.hair} strokeWidth="5" opacity="0.7" />
                    <path d="M 272 442 Q 300 430 328 442" fill={look.hair} opacity="0.55" />
                  </>
                )}
              </>
            )}

            {/* Eyes */}
            <path d="M 232 348 Q 260 328 288 348 Q 260 362 232 348 Z" fill="#F4E7D2" opacity="0.88" />
            <path d="M 312 348 Q 340 328 368 348 Q 340 362 312 348 Z" fill="#F4E7D2" opacity="0.88" />
            <circle cx="260" cy="348" r="8" fill="#2B2019" />
            <circle cx="340" cy="348" r="8" fill="#2B2019" />
            <circle cx="262" cy="345" r="2.2" fill="#F7EFE2" />
            <circle cx="342" cy="345" r="2.2" fill="#F7EFE2" />
            <path d="M 228 344 Q 260 322 292 342" fill="none" stroke={look.hair} strokeWidth="4" strokeLinecap="round" />
            <path d="M 308 342 Q 340 322 372 344" fill="none" stroke={look.hair} strokeWidth="4" strokeLinecap="round" />

            {/* Hair */}
            <path
              d="M 200 338 C 194 236 238 190 300 190 C 364 190 407 238 400 340 C 386 282 354 248 300 248 C 248 248 216 280 200 338 Z"
              fill={look.hair}
            />
            {isWoman ? (
              <>
                <path d="M 205 320 C 176 394 178 486 196 552 L 232 552 C 212 470 212 382 228 330 Z" fill={look.hair} />
                <path d="M 395 320 C 424 394 422 486 404 552 L 368 552 C 388 470 388 382 372 330 Z" fill={look.hair} />
                <path d="M 226 302 Q 300 258 374 302" fill="none" stroke={look.accent} strokeWidth="2.4" opacity="0.4" />
              </>
            ) : (
              <path d="M 208 312 C 234 286 270 276 300 278 C 338 276 372 290 394 316 L 382 292 C 354 260 322 248 296 250 C 262 250 232 268 214 294 Z" fill={look.hair} opacity="0.9" />
            )}

            {/* Bindi / tilak */}
            {isWoman && <circle cx="300" cy="306" r="5.5" fill={look.accent} />}
            {character.id === 'rama' && (
              <path d="M 286 300 L 286 322 Q 300 332 314 322 L 314 300" fill="none" stroke={look.accent} strokeWidth="4" />
            )}
            {character.id === 'hanuman' && <path d="M 286 300 L 286 322 Q 300 332 314 322 L 314 300" fill="none" stroke={look.accent} strokeWidth="4" />}

            <Crown crown={look.crown} accent={look.accent} />
            {isSage && (
              <>
                <path d="M 262 438 C 268 500 282 534 300 548 C 318 534 332 500 338 438 C 320 462 280 462 262 438 Z" fill={mix(look.hair, '#FFFFFF', 0.12)} opacity="0.9" />
                <circle cx="300" cy="546" r="5" fill={look.accent} opacity="0.6" />
              </>
            )}
            <circle cx="204" cy="372" r="10" fill={look.accent} />
            <circle cx="396" cy="372" r="10" fill={look.accent} />
            <path d="M 204 382 L 204 398" stroke={look.accent} strokeWidth="2" />
            <path d="M 396 382 L 396 398" stroke={look.accent} strokeWidth="2" />
          </g>
        )}

        {/* Arch inner ornament */}
        <path
          d="M 92 470 Q 92 148 300 116 Q 508 148 508 470"
          fill="none"
          stroke={look.accent}
          strokeWidth="0.8"
          strokeDasharray="2 12"
          opacity="0.35"
        />
        <g opacity="0.7" fill="none" stroke={look.accent} strokeWidth="1.2">
          <circle cx="300" cy="712" r="10" />
          <circle cx="300" cy="712" r="4" />
          <path d="M 300 690 L 300 700 M 300 724 L 300 734" />
        </g>
      </svg>
      <span className="art-grain" aria-hidden="true" />
    </div>
  );
}

function Crown({ crown, accent }: { crown: Character['look']['crown']; accent: string }) {
  if (crown === 'none') {
    return (
      <g opacity="0.8">
        <path d="M 218 276 Q 300 232 382 276" fill="none" stroke={accent} strokeWidth="3" />
        <circle cx="300" cy="250" r="6" fill={accent} />
      </g>
    );
  }
  if (crown === 'sage') {
    return (
      <g>
        <path d="M 242 236 C 250 194 272 174 300 174 C 330 174 352 196 358 236 C 336 212 264 212 242 236 Z" fill="#DCD1BE" opacity="0.5" />
        <circle cx="300" cy="186" r="9" fill={accent} opacity="0.8" />
        <path d="M 300 177 L 300 160" stroke={accent} strokeWidth="2" />
      </g>
    );
  }
  const tall = crown === 'king' || crown === 'rakshasa';
  return (
    <g>
      <path d="M 214 272 Q 300 238 386 272 L 378 292 Q 300 262 222 292 Z" fill={accent} />
      <path
        d={
          tall
            ? 'M 228 272 L 216 204 L 252 238 L 260 174 L 292 220 L 300 148 L 310 220 L 342 174 L 352 238 L 386 204 L 374 272 Z'
            : 'M 232 270 L 220 224 L 254 246 L 264 202 L 292 232 L 300 184 L 310 232 L 338 202 L 348 246 L 382 224 L 370 270 Z'
        }
        fill={accent}
      />
      <path d="M 238 266 Q 300 242 364 266" fill="none" stroke="#4A3517" strokeWidth="1.4" opacity="0.4" />
      {[240, 270, 300, 330, 360].map((x, i) => (
        <circle key={i} cx={x} cy={i % 2 === 0 ? 264 : 258} r="3" fill="#F7E7BE" opacity="0.7" />
      ))}
    </g>
  );
}

function BirdHead({ look, accent, skinShade }: { look: Character['look']; accent: string; skinShade: string }) {
  return (
    <g>
      <ellipse cx="300" cy="352" rx="94" ry="104" fill={look.skin} />
      <path d="M 216 320 C 222 240 262 208 308 212 C 360 218 390 260 388 330 L 350 300 C 322 272 270 274 232 308 Z" fill={look.hair} />
      <path d="M 350 330 L 456 366 L 350 390 Z" fill={accent} />
      <path d="M 352 346 L 420 366 L 352 378 Z" fill={skinShade} opacity="0.6" />
      <circle cx="342" cy="326" r="12" fill="#F4E7D2" />
      <circle cx="344" cy="326" r="6" fill="#241B14" />
      <path d="M 320 300 Q 344 290 362 304" fill="none" stroke={look.hair} strokeWidth="5" strokeLinecap="round" />
      <path d="M 286 238 L 268 182 L 300 210 L 314 164 L 326 212 L 356 184 L 340 242" fill="none" stroke={accent} strokeWidth="5" strokeLinejoin="round" opacity="0.8" />
      <path d="M 214 368 C 226 428 252 464 300 480 C 348 464 374 428 386 368" fill={look.robe} opacity="0.5" />
      <circle cx="256" cy="392" r="7" fill={accent} />
      <circle cx="344" cy="392" r="7" fill={accent} />
    </g>
  );
}

function LargeIcon({ icon }: { icon: Character['look']['icon'] }) {
  switch (icon) {
    case 'bow':
      return (
        <g transform="translate(300 420)">
          <path d="M 60 -210 C 170 -130 170 130 60 210" strokeWidth="4" />
          <path d="M 60 -210 L 60 210" strokeWidth="1.2" />
          <path d="M 60 0 L 140 0" strokeWidth="2" />
        </g>
      );
    case 'lotus':
      return (
        <g transform="translate(300 460)">
          {Array.from({ length: 10 }, (_, i) => {
            const a = (i / 10) * 360;
            return <ellipse key={i} cx="0" cy="-96" rx="34" ry="92" transform={`rotate(${a})`} strokeWidth="1.4" />;
          })}
          <circle r="38" strokeWidth="1.6" />
        </g>
      );
    case 'gada':
      return (
        <g transform="translate(300 450)">
          <path d="M 0 -90 L 0 190" strokeWidth="6" />
          <circle cx="0" cy="-140" r="82" strokeWidth="3" />
          <circle cx="0" cy="-140" r="58" strokeWidth="1.2" />
        </g>
      );
    case 'sword':
      return (
        <g transform="translate(300 460)">
          <path d="M 0 -230 L 28 -140 L 16 120 L 0 160 L -16 120 L -28 -140 Z" strokeWidth="3" />
          <path d="M -54 140 L 54 140" strokeWidth="6" />
          <path d="M 0 160 L 0 220" strokeWidth="4" />
        </g>
      );
    case 'staff':
      return (
        <g transform="translate(300 450)">
          <path d="M 0 -230 L 0 220" strokeWidth="5" />
          <circle cx="0" cy="-244" r="26" strokeWidth="3" />
          <path d="M -30 -220 Q 0 -190 30 -220" strokeWidth="1.6" />
        </g>
      );
    case 'conch':
      return (
        <g transform="translate(300 450) rotate(-18)">
          <path d="M 0 -170 C 96 -140 130 -10 58 86 C 22 134 -40 160 -88 120 C -132 84 -126 16 -82 -8 C -46 -28 -12 -6 -18 30 C -22 54 -50 60 -64 40" strokeWidth="4" fill="none" />
          <path d="M 0 -170 C 48 -152 74 -100 70 -48" strokeWidth="1.2" fill="none" />
        </g>
      );
    case 'ring':
      return (
        <g transform="translate(300 460)">
          <circle r="120" strokeWidth="5" fill="none" />
          <circle r="96" strokeWidth="1" fill="none" />
          <path d="M 0 -120 L 22 -156 L 0 -190 L -22 -156 Z" strokeWidth="3" />
        </g>
      );
    case 'mountain':
      return (
        <g transform="translate(300 460)">
          <path d="M -180 110 L -52 -120 L 20 10 L 74 -84 L 190 110 Z" strokeWidth="3" />
          <path d="M -96 10 L -52 -120 L -10 4" strokeWidth="1.4" />
          <path d="M 48 -30 L 74 -84 L 106 -14" strokeWidth="1.4" />
        </g>
      );
    case 'feather':
      return (
        <g transform="translate(300 440)">
          <path d="M 0 220 C -30 80 -18 -60 40 -180 C 80 -60 64 80 0 220 Z" strokeWidth="3" />
          <path d="M 6 190 C 2 90 8 0 36 -140" strokeWidth="1.4" />
          {Array.from({ length: 10 }, (_, i) => (
            <path key={i} d={`M ${8 - i * 1.4} ${120 - i * 30} L ${-30 + i * 3} ${110 - i * 30}`} strokeWidth="1" />
          ))}
        </g>
      );
    default:
      return null;
  }
}
