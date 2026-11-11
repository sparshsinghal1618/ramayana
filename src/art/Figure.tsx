import type { FigureKind } from '../data/types';

interface Look {
  skin: string;
  skinShade: string;
  robe: string;
  robeShade: string;
  sash: string;
  hair: string;
  accent: string;
}

const looks: Record<string, Look> = {
  rama: {
    skin: '#5C7A92',
    skinShade: '#445F76',
    robe: '#C39A52',
    robeShade: '#9C783E',
    sash: '#4C6A5C',
    hair: '#181A23',
    accent: '#E7CE93',
  },
  sita: {
    skin: '#C99B70',
    skinShade: '#A87A54',
    robe: '#AE4A35',
    robeShade: '#833124',
    sash: '#D5AE67',
    hair: '#211819',
    accent: '#F0D49D',
  },
  lakshmana: {
    skin: '#B98D68',
    skinShade: '#966C4D',
    robe: '#3C5442',
    robeShade: '#2A3D30',
    sash: '#B28A46',
    hair: '#1D1A1B',
    accent: '#DCC08A',
  },
  hanuman: {
    skin: '#C18D4F',
    skinShade: '#986A36',
    robe: '#C49B52',
    robeShade: '#94733C',
    sash: '#9E3F31',
    hair: '#39291D',
    accent: '#F3DEA8',
  },
  ravana: {
    skin: '#5A474E',
    skinShade: '#3E3036',
    robe: '#5C3038',
    robeShade: '#3F1F27',
    sash: '#C9A15C',
    hair: '#171318',
    accent: '#E7C67F',
  },
  dasharatha: {
    skin: '#A87C58',
    skinShade: '#876042',
    robe: '#31405F',
    robeShade: '#202B42',
    sash: '#C9A15C',
    hair: '#D9CCB7',
    accent: '#EBD7A5',
  },
  bharata: {
    skin: '#C39A72',
    skinShade: '#A17753',
    robe: '#6D5141',
    robeShade: '#4D392D',
    sash: '#C9A15C',
    hair: '#211A18',
    accent: '#E4CC9A',
  },
  shatrughna: {
    skin: '#B98F68',
    skinShade: '#966D4C',
    robe: '#4A5B45',
    robeShade: '#344231',
    sash: '#B28A46',
    hair: '#221A18',
    accent: '#DCC08A',
  },
  janaka: {
    skin: '#B48460',
    skinShade: '#8F6547',
    robe: '#6D4B3A',
    robeShade: '#4D3428',
    sash: '#C9A15C',
    hair: '#2F2620',
    accent: '#E4CC9A',
  },
  vishwamitra: {
    skin: '#A97E5C',
    skinShade: '#846144',
    robe: '#9A7A50',
    robeShade: '#725837',
    sash: '#B28A46',
    hair: '#E7DDCA',
    accent: '#D6B56D',
  },
  vashistha: {
    skin: '#B08A66',
    skinShade: '#8C6A4A',
    robe: '#C7AD86',
    robeShade: '#9C8463',
    sash: '#8C6B3F',
    hair: '#E4DAC7',
    accent: '#D6B56D',
  },
  sugriva: {
    skin: '#B68753',
    skinShade: '#8D6539',
    robe: '#9C4B3C',
    robeShade: '#743228',
    sash: '#C9A15C',
    hair: '#2E2219',
    accent: '#E7CE93',
  },
  vali: {
    skin: '#92704E',
    skinShade: '#6E5137',
    robe: '#5C3038',
    robeShade: '#3F1F27',
    sash: '#C9A15C',
    hair: '#2A1E18',
    accent: '#E0C489',
  },
  vibhishana: {
    skin: '#807363',
    skinShade: '#5D5348',
    robe: '#2C3A55',
    robeShade: '#1C273B',
    sash: '#C9A15C',
    hair: '#201C1C',
    accent: '#E2CA96',
  },
  kumbhakarna: {
    skin: '#5E4B50',
    skinShade: '#423237',
    robe: '#3A2F33',
    robeShade: '#251D21',
    sash: '#B28A46',
    hair: '#1C1718',
    accent: '#D6B56D',
  },
  indrajit: {
    skin: '#57444B',
    skinShade: '#3B2D32',
    robe: '#26344D',
    robeShade: '#172236',
    sash: '#C9A15C',
    hair: '#191419',
    accent: '#E0C489',
  },
  sage: {
    skin: '#AE8763',
    skinShade: '#8C6848',
    robe: '#B99C6F',
    robeShade: '#8F7650',
    sash: '#8C6B3F',
    hair: '#E6DCC9',
    accent: '#D6B56D',
  },
  citizen: {
    skin: '#B88963',
    skinShade: '#91694A',
    robe: '#8A7254',
    robeShade: '#65523E',
    sash: '#B28A46',
    hair: '#2A211B',
    accent: '#DCC08A',
  },
  army: {
    skin: '#A57A52',
    skinShade: '#7F5B3B',
    robe: '#6C5740',
    robeShade: '#4C3C2C',
    sash: '#B28A46',
    hair: '#241C17',
    accent: '#C9A15C',
  },
};

interface FigureProps {
  kind: FigureKind;
  x: number;
  y: number;
  scale?: number;
  flip?: boolean;
  opacity?: number;
}

/** Stylised, shadow-puppet-inspired figures with a shared visual grammar. */
export function Figure({ kind, x, y, scale = 1, flip = false, opacity = 1 }: FigureProps) {
  if (kind === 'deer') return <GoldenDeer x={x} y={y} scale={scale} opacity={opacity} />;
  if (kind === 'jatayu') return <Jatayu x={x} y={y} scale={scale} opacity={opacity} />;
  if (kind === 'hanuman-flight') return <FlyingHanuman x={x} y={y} scale={scale} opacity={opacity} />;
  if (kind === 'army') return <Army x={x} y={y} scale={scale} opacity={opacity} />;

  const look = looks[kind] ?? looks.citizen;
  const feminine = kind === 'sita';
  const vanara = kind === 'hanuman' || kind === 'sugriva' || kind === 'vali';
  const rakshasa = kind === 'ravana' || kind === 'kumbhakarna' || kind === 'indrajit' || kind === 'vibhishana';
  const holdsBow = kind === 'rama' || kind === 'lakshmana' || kind === 'indrajit' || kind === 'shatrughna';
  const holdsGada = kind === 'hanuman' || kind === 'sugriva' || kind === 'vali' || kind === 'kumbhakarna';
  const holdsStaff = kind === 'vishwamitra' || kind === 'vashistha' || kind === 'sage' || kind === 'janaka' || kind === 'bharata';
  const holdsSword = kind === 'ravana';

  return (
    <g
      transform={`translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`}
      opacity={opacity}
      aria-hidden="true"
    >
      {vanara && (
        <path
          d="M 8 -96 C 62 -86 74 -18 48 26 C 38 44 20 42 22 28 C 44 2 38 -40 -4 -52"
          fill="none"
          stroke={look.skinShade}
          strokeWidth="11"
          strokeLinecap="round"
        />
      )}
      {kind === 'hanuman' && (
        <path
          d="M -10 -90 C 58 -96 82 -20 54 32"
          fill="none"
          stroke={look.accent}
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.55"
        />
      )}

      {/* Feet and lower garment */}
      <ellipse cx="-14" cy="-2" rx="15" ry="5" fill={look.skinShade} />
      <ellipse cx="17" cy="-2" rx="15" ry="5" fill={look.skinShade} />
      <path
        d={feminine ? 'M -34 0 L -21 -142 L 22 -142 L 36 0 Z' : 'M -30 0 L -20 -142 L 20 -142 L 32 0 Z'}
        fill={look.robe}
      />
      <path d="M -2 -142 L 4 -4" stroke={look.robeShade} strokeWidth="3" opacity="0.7" />
      <path
        d={feminine ? 'M -31 -136 C -44 -84 -36 -20 -25 0 L -10 0 C -20 -64 -12 -106 -8 -136 Z' : 'M -25 -136 L -10 -140 L -4 0 L -22 0 Z'}
        fill={look.robeShade}
        opacity="0.65"
      />
      {feminine && (
        <>
          <path
            d="M 12 -142 C 30 -118 34 -78 24 -34 C 18 -8 8 -2 2 0 L 14 0 C 34 -30 40 -94 25 -143 Z"
            fill={look.sash}
            opacity="0.9"
          />
          <path d="M -26 -140 C -40 -108 -38 -66 -28 -40" fill="none" stroke={look.accent} strokeWidth="2" opacity="0.7" />
        </>
      )}
      {!feminine && <path d="M 20 -142 C 30 -110 28 -76 18 -56" fill="none" stroke={look.robeShade} strokeWidth="5" opacity="0.6" />}

      {/* Waist ornament */}
      <path d="M -27 -140 Q 0 -132 27 -140" fill="none" stroke={look.accent} strokeWidth="3.5" />
      <path d="M -22 -137 Q 0 -130 22 -137" fill="none" stroke={look.accent} strokeWidth="1" opacity="0.6" />

      {/* Torso */}
      <path
        d={
          feminine
            ? 'M -25 -143 C -33 -168 -31 -205 -18 -222 C -8 -232 14 -231 22 -218 C 31 -200 31 -166 24 -143 Z'
            : 'M -29 -143 C -38 -172 -34 -211 -20 -225 C -8 -237 14 -235 23 -222 C 34 -205 35 -169 27 -143 Z'
        }
        fill={look.skin}
      />
      <path
        d="M -8 -220 C -2 -196 -1 -170 -4 -146 L 8 -146 C 8 -176 8 -200 12 -222 Z"
        fill={look.accent}
        opacity="0.25"
      />

      {/* Neck and head */}
      <path d="M -8 -226 L -7 -242 L 10 -242 L 12 -226 Z" fill={look.skinShade} />
      <circle cx="2" cy="-262" r={vanara ? 24 : 22} fill={look.skin} />
      <path
        d="M -19 -268 C -18 -292 12 -302 27 -284 C 32 -277 29 -269 24 -265 L 23 -250 C 10 -243 -10 -244 -20 -254 Z"
        fill={look.hair}
      />
      {feminine && (
        <path
          d="M -20 -258 C -32 -238 -30 -204 -22 -188 L -9 -190 C -16 -214 -12 -240 -6 -256 Z"
          fill={look.hair}
        />
      )}

      {/* Facial plane, deliberately sparse */}
      <path d="M 14 -262 Q 23 -260 24 -253" fill="none" stroke={look.skinShade} strokeWidth="2.4" strokeLinecap="round" />
      <path d="M 12 -268 Q 17 -270 21 -267" fill="none" stroke={look.hair} strokeWidth="1.7" strokeLinecap="round" opacity="0.85" />
      <path d="M 13 -249 Q 18 -248 21 -250" fill="none" stroke={look.skinShade} strokeWidth="1.4" strokeLinecap="round" opacity="0.7" />

      {/* Earring */}
      <circle cx="22" cy="-251" r="3.4" fill={look.accent} />
      <path d="M 20 -247 L 20 -241" stroke={look.accent} strokeWidth="1.4" />

      {/* Crown / hair ornament */}
      {(kind === 'rama' || kind === 'lakshmana' || kind === 'bharata' || kind === 'shatrughna') && (
        <g>
          <path d="M -20 -282 Q 2 -294 25 -282 L 23 -274 Q 2 -284 -18 -274 Z" fill={look.accent} />
          <path d="M -13 -283 L -10 -298 L -3 -286 L 2 -302 L 8 -286 L 15 -297 L 18 -281" fill={look.accent} />
        </g>
      )}
      {(kind === 'dasharatha' || kind === 'janaka') && (
        <g>
          <path d="M -23 -282 Q 2 -296 29 -282 L 27 -270 Q 2 -284 -21 -270 Z" fill={look.accent} />
          <path d="M -16 -284 L -12 -308 L -4 -288 L 2 -316 L 9 -288 L 17 -307 L 21 -282" fill={look.accent} />
          <path d="M -24 -279 L 28 -279" stroke={look.accent} strokeWidth="1.2" opacity="0.6" />
        </g>
      )}
      {(kind === 'vishwamitra' || kind === 'vashistha' || kind === 'sage') && (
        <g>
          <path d="M -20 -282 C -12 -298 20 -298 26 -280 C 14 -286 -8 -286 -20 -282 Z" fill={look.hair} />
          <path d="M -10 -246 C -6 -208 4 -196 4 -188" fill="none" stroke={look.hair} strokeWidth="7" strokeLinecap="round" opacity="0.9" />
          <circle cx="2" cy="-280" r="4" fill={look.accent} />
        </g>
      )}
      {vanara && (
        <g>
          <path d="M -22 -282 Q 2 -298 26 -282 L 25 -272 Q 2 -284 -21 -272 Z" fill={look.accent} />
          <path d="M -11 -285 L -8 -299 L 0 -287 L 6 -302 L 11 -286 L 19 -296 L 21 -281" fill={look.accent} />
          <ellipse cx="14" cy="-253" rx="14" ry="9" fill={look.skinShade} opacity="0.6" />
          <circle cx="22" cy="-257" r="2" fill={look.hair} />
        </g>
      )}
      {rakshasa && (
        <g>
          {kind === 'ravana' &&
            [
              [-34, -12],
              [38, -12],
              [-18, -26],
              [22, -26],
            ].map(([dx, dy], index) => (
              <g key={index} transform={`translate(${dx} ${dy})`}>
                <circle cx="2" cy="-262" r="17" fill={look.skinShade} />
                <path d="M -12 -270 C -5 -284 14 -284 21 -270 Z" fill={look.hair} />
                <path d="M -8 -282 L -3 -294 L 3 -282 L 9 -293 L 13 -281" fill="none" stroke={look.accent} strokeWidth="2.4" />
              </g>
            ))}
          <path d="M -26 -283 Q 2 -298 31 -283 L 30 -271 Q 2 -286 -25 -271 Z" fill={look.accent} />
          <path d="M -18 -285 L -12 -310 L -4 -289 L 2 -318 L 9 -289 L 18 -308 L 23 -283" fill={look.accent} />
          <path d="M -24 -280 L 28 -280" stroke={look.robeShade} strokeWidth="1.5" opacity="0.7" />
        </g>
      )}

      {/* Necklaces */}
      <path d="M -17 -230 Q 2 -216 21 -230" fill="none" stroke={look.accent} strokeWidth="2.5" />
      <path d="M -13 -224 Q 2 -212 18 -224" fill="none" stroke={look.accent} strokeWidth="1.2" opacity="0.85" />
      <circle cx="2" cy="-213" r="2.8" fill={look.accent} />

      {/* Arms */}
      <path d="M -24 -216 C -40 -198 -45 -170 -39 -150" fill="none" stroke={look.skin} strokeWidth="10" strokeLinecap="round" />
      <path d="M -39 -150 L -37 -136" stroke={look.skinShade} strokeWidth="8" strokeLinecap="round" />
      <path d="M 24 -216 C 38 -204 41 -184 38 -166" fill="none" stroke={look.skin} strokeWidth="10" strokeLinecap="round" />
      <path d="M 38 -166 L 38 -150" stroke={look.skinShade} strokeWidth="8" strokeLinecap="round" />
      <path d="M -29 -202 Q -38 -185 -36 -168" fill="none" stroke={look.accent} strokeWidth="2" opacity="0.8" />
      <path d="M 30 -202 Q 37 -188 35 -174" fill="none" stroke={look.accent} strokeWidth="2" opacity="0.8" />
      <circle cx="-23" cy="-212" r="3" fill={look.accent} />
      <circle cx="23" cy="-212" r="3" fill={look.accent} />

      {/* Held objects */}
      {holdsBow && (
        <g>
          <path d="M 44 -32 C 63 -82 60 -178 38 -226" fill="none" stroke={look.accent} strokeWidth="3.4" strokeLinecap="round" />
          <path d="M 44 -32 L 38 -226" fill="none" stroke={look.accent} strokeWidth="1.1" opacity="0.75" />
          <path d="M 42 -127 L 55 -127" stroke={look.robeShade} strokeWidth="4" />
        </g>
      )}
      {holdsGada && (
        <g>
          <path d="M 45 -34 L 41 -150" stroke={look.accent} strokeWidth="4" />
          <circle cx="41" cy="-174" r="24" fill={look.accent} />
          <circle cx="41" cy="-174" r="17" fill="none" stroke={look.robeShade} strokeWidth="2" opacity="0.7" />
          <path d="M 41 -198 L 41 -150" stroke={look.robeShade} strokeWidth="1.4" opacity="0.6" />
        </g>
      )}
      {holdsStaff && (
        <g>
          <path d="M 46 -20 L 35 -260" stroke={look.accent} strokeWidth="3.6" strokeLinecap="round" />
          <circle cx="34" cy="-266" r="7" fill="none" stroke={look.accent} strokeWidth="2.5" />
          <path d="M 34 -258 C 42 -252 45 -244 43 -238" fill="none" stroke={look.accent} strokeWidth="1.6" opacity="0.8" />
        </g>
      )}
      {holdsSword && (
        <g>
          <path d="M 43 -146 L 60 -246" stroke={look.accent} strokeWidth="5" strokeLinecap="round" />
          <path d="M 43 -139 L 56 -132" stroke={look.robeShade} strokeWidth="5" strokeLinecap="round" />
          <circle cx="44" cy="-146" r="4" fill={look.accent} />
        </g>
      )}

      {/* Shoulder drape */}
      <path
        d="M -23 -224 C -8 -214 13 -214 24 -224 C 20 -202 8 -192 -2 -192 C -13 -194 -21 -206 -23 -224 Z"
        fill={look.sash}
        opacity="0.95"
      />
      <path d="M 17 -218 C 34 -190 36 -158 30 -132" fill="none" stroke={look.sash} strokeWidth="7" opacity="0.55" />
    </g>
  );
}

function GoldenDeer({ x, y, scale = 1, opacity = 1 }: { x: number; y: number; scale?: number; opacity?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity} aria-hidden="true">
      <path d="M -80 0 L -54 -14 L -44 -70 C -36 -96 -8 -104 18 -94 L 36 -72 L 30 -56 L 8 -62 L 2 -22 L -10 0 Z" fill="#C79B52" />
      <path d="M 18 -94 L 30 -122 L 44 -124 L 38 -102 L 32 -86 Z" fill="#D7AF69" />
      <path d="M 30 -118 C 40 -150 54 -156 60 -160 M 38 -112 C 52 -140 66 -144 70 -146" fill="none" stroke="#E6CB92" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M -66 -4 L -62 -42 L -54 -44" fill="none" stroke="#8F6939" strokeWidth="2" opacity="0.7" />
      <path d="M -34 -90 Q -6 -102 14 -90" fill="none" stroke="#EBD39B" strokeWidth="2" opacity="0.8" />
      <circle cx="29" cy="-110" r="2.2" fill="#2A2016" />
      <path d="M -42 -74 Q -26 -64 -16 -76" fill="none" stroke="#EBD39B" strokeWidth="1.5" opacity="0.65" />
    </g>
  );
}

function Jatayu({ x, y, scale = 1, opacity = 1 }: { x: number; y: number; scale?: number; opacity?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity} aria-hidden="true">
      <path d="M 0 0 C -66 -28 -132 -108 -154 -168 C -108 -144 -70 -118 -34 -86 C -58 -144 -62 -196 -48 -232 C -18 -196 6 -158 14 -110 C 32 -152 52 -188 86 -212 C 82 -166 70 -126 54 -84 C 94 -120 132 -140 172 -146 C 146 -96 94 -34 28 0 Z" fill="#6F5D4C" />
      <path d="M 0 -14 C -24 -54 -30 -96 -20 -134 C -2 -102 8 -66 8 -30 Z" fill="#8D7964" opacity="0.8" />
      <circle cx="17" cy="-118" r="18" fill="#8D7964" />
      <path d="M 31 -124 L 54 -116 L 31 -108 Z" fill="#C9A15C" />
      <circle cx="23" cy="-123" r="2.4" fill="#211A15" />
      <path d="M 4 -137 C 10 -151 26 -151 34 -139" fill="none" stroke="#C9A15C" strokeWidth="2.2" opacity="0.7" />
    </g>
  );
}

function FlyingHanuman({ x, y, scale = 1, opacity = 1 }: { x: number; y: number; scale?: number; opacity?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity} aria-hidden="true">
      <path d="M -20 42 C 56 56 112 0 122 -78" fill="none" stroke="#986A36" strokeWidth="14" strokeLinecap="round" />
      <path d="M -14 40 C 42 46 86 4 100 -54" fill="none" stroke="#F0DBA8" strokeWidth="2.4" strokeLinecap="round" opacity="0.5" />
      <path d="M -82 18 C -56 -24 -10 -48 28 -22 C 58 -2 66 32 44 56 C 18 84 -30 78 -58 48 Z" fill="#C18D4F" />
      <path d="M 24 -22 C 58 -46 88 -38 102 -14 C 110 2 102 18 88 18 C 72 18 62 6 58 -6 Z" fill="#C99B5D" />
      <circle cx="76" cy="-24" r="19" fill="#C18D4F" />
      <path d="M 60 -38 C 68 -54 92 -54 100 -38 Z" fill="#C9A15C" />
      <path d="M 62 -42 L 68 -54 L 74 -42 L 82 -55 L 88 -40 L 94 -50 L 96 -36" fill="none" stroke="#F3DEA8" strokeWidth="2.4" />
      <ellipse cx="86" cy="-18" rx="10" ry="7" fill="#986A36" opacity="0.7" />
      <circle cx="92" cy="-28" r="2.2" fill="#2C2016" />
      <path d="M 108 4 C 142 10 154 34 148 52 C 140 30 126 20 108 18 Z" fill="#B58248" />
      <path d="M -68 40 C -104 22 -132 28 -150 52 C -120 54 -100 54 -76 62 Z" fill="#B58248" />
      <path d="M -44 54 C -20 80 22 82 48 60" fill="none" stroke="#9E3F31" strokeWidth="9" opacity="0.8" />
      <circle cx="36" cy="16" r="3" fill="#F3DEA8" />
      <circle cx="18" cy="28" r="3" fill="#F3DEA8" />
    </g>
  );
}

function Army({ x, y, scale = 1, opacity = 1 }: { x: number; y: number; scale?: number; opacity?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={opacity} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} transform={`translate(${i * 38 - 76} ${i % 2 === 0 ? 0 : -8})`}>
          <ellipse cx="0" cy="0" rx="10" ry="3" fill="#171310" opacity="0.5" />
          <path d="M -8 0 L -5 -60 L 5 -60 L 8 0 Z" fill={i % 2 === 0 ? '#4A3B2B' : '#5C4A36'} />
          <circle cx="0" cy="-73" r="9" fill="#6B553D" />
          <path d="M -9 -78 C -6 -90 6 -90 9 -78 Z" fill="#2A2118" />
          <path d="M 14 -8 L 14 -104" stroke="#8F6F42" strokeWidth="2.4" />
          <path d="M 14 -104 L 20 -92 L 14 -86 Z" fill="#C9A15C" />
        </g>
      ))}
    </g>
  );
}
