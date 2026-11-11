import type { ObjectItem } from '../data/types';

export function ObjectGlyph({ glyph }: { glyph: ObjectItem['glyph'] }) {
  return (
    <svg className="object-glyph" viewBox="0 0 200 200" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {glyph === 'bow' && (
          <>
            <path d="M 54 22 C 150 60 150 140 54 178" strokeWidth="3.4" />
            <path d="M 54 22 L 54 178" strokeWidth="1" />
            <path d="M 24 100 L 146 100" />
            <path d="M 146 94 L 158 100 L 146 106" />
            <path d="M 54 100 L 70 92 M 54 100 L 70 108" strokeWidth="1" opacity="0.6" />
          </>
        )}
        {glyph === 'gada' && (
          <>
            <path d="M 100 96 L 100 176" strokeWidth="6" />
            <path d="M 88 176 L 112 176" strokeWidth="4" />
            <circle cx="100" cy="67" r="34" strokeWidth="3" />
            <circle cx="100" cy="67" r="22" strokeWidth="1" opacity="0.7" />
            <path d="M 66 67 L 134 67 M 100 33 L 100 101" strokeWidth="1" opacity="0.45" />
            <path d="M 84 96 L 116 96" strokeWidth="2" />
          </>
        )}
        {glyph === 'ring' && (
          <>
            <circle cx="100" cy="116" r="44" strokeWidth="4" />
            <circle cx="100" cy="116" r="34" strokeWidth="1" opacity="0.6" />
            <path d="M 100 100 L 109 84 L 100 68 L 91 84 Z" fill="currentColor" fillOpacity="0.2" />
            <path d="M 86 130 L 114 130 M 100 118 L 100 142" strokeWidth="1" opacity="0.5" />
          </>
        )}
        {glyph === 'jewel' && (
          <>
            <path d="M 76 58 L 100 34 L 124 58 L 112 82 L 100 94 L 88 82 Z" strokeWidth="2.4" />
            <path d="M 100 94 L 100 128" />
            <path d="M 100 128 C 80 140 76 160 100 174 C 124 160 120 140 100 128 Z" />
            <circle cx="100" cy="156" r="6" fill="currentColor" fillOpacity="0.5" />
            <path d="M 76 58 L 124 58 M 100 34 L 100 94" strokeWidth="1" opacity="0.5" />
          </>
        )}
        {glyph === 'vimana' && (
          <>
            <path d="M 40 126 L 160 126 L 144 156 L 56 156 Z" />
            <path d="M 58 126 L 64 84 L 136 84 L 142 126" />
            <path d="M 74 84 L 80 52 L 120 52 L 126 84" />
            <path d="M 92 52 Q 100 28 108 52" />
            <path d="M 82 108 L 118 108 M 88 126 L 88 156 M 112 126 L 112 156" strokeWidth="1" opacity="0.6" />
            <path d="M 36 160 L 164 160" strokeWidth="1" opacity="0.5" />
          </>
        )}
        {glyph === 'bridge' && (
          <>
            <path d="M 20 118 Q 100 62 180 118" strokeWidth="3" />
            <path d="M 20 144 Q 100 88 180 144" />
            {Array.from({ length: 7 }, (_, i) => (
              <path key={i} d={`M ${36 + i * 21} ${132 - Math.sin((i / 6) * Math.PI) * 40} L ${36 + i * 21} 170`} strokeWidth="1" opacity="0.55" />
            ))}
            <path d="M 20 176 Q 100 166 180 176" strokeWidth="1" opacity="0.5" />
            <path d="M 32 118 Q 100 74 168 118" strokeWidth="1" opacity="0.4" />
          </>
        )}
        {glyph === 'mountain' && (
          <>
            <path d="M 24 158 L 74 58 L 104 112 L 126 78 L 176 158 Z" strokeWidth="2.4" />
            <path d="M 74 58 L 84 84 L 64 84 Z" fill="currentColor" fillOpacity="0.15" />
            <path d="M 126 78 L 136 96 L 116 96 Z" fill="currentColor" fillOpacity="0.15" />
            <path d="M 58 138 Q 76 128 88 142 M 116 132 Q 132 120 146 136" strokeWidth="1" opacity="0.45" />
            <path d="M 100 32 L 100 48 M 92 40 L 108 40" strokeWidth="1.4" />
          </>
        )}
        {glyph === 'crown' && (
          <>
            <path d="M 48 142 L 32 78 L 68 104 L 84 58 L 100 94 L 116 58 L 132 104 L 168 78 L 152 142 Z" strokeWidth="2.6" />
            <path d="M 52 154 L 148 154 L 142 168 L 58 168 Z" />
            <circle cx="84" cy="58" r="6" fill="currentColor" fillOpacity="0.35" />
            <circle cx="116" cy="58" r="6" fill="currentColor" fillOpacity="0.35" />
            <circle cx="68" cy="104" r="4" fill="currentColor" fillOpacity="0.3" />
            <circle cx="132" cy="104" r="4" fill="currentColor" fillOpacity="0.3" />
          </>
        )}
        {glyph === 'sandals' && (
          <>
            <path d="M 46 62 L 78 62 L 84 118 C 84 138 66 148 50 138 C 38 130 38 114 46 104 L 52 86 Z" />
            <path d="M 118 76 L 150 76 L 158 132 C 158 152 140 162 124 152 C 112 144 112 128 120 118 L 126 100 Z" />
            <path d="M 52 62 L 52 48 L 78 48 L 78 62 M 124 76 L 124 62 L 150 62 L 150 76" strokeWidth="1.2" opacity="0.6" />
            <path d="M 46 112 Q 62 102 82 114 M 118 126 Q 134 116 154 128" strokeWidth="1" opacity="0.45" />
          </>
        )}
        {glyph === 'sword' && (
          <>
            <path d="M 100 22 L 114 62 L 108 142 L 100 158 L 92 142 L 86 62 Z" strokeWidth="2.2" />
            <path d="M 62 142 L 138 142" strokeWidth="4" />
            <path d="M 100 158 L 100 184" strokeWidth="5" />
            <circle cx="100" cy="184" r="6" />
            <path d="M 100 30 L 100 142" strokeWidth="1" opacity="0.45" />
          </>
        )}
        {glyph === 'lotus' && (
          <>
            {Array.from({ length: 9 }, (_, i) => {
              const angle = -90 + (i - 4) * 26;
              return (
                <ellipse
                  key={i}
                  cx="100"
                  cy="106"
                  rx="16"
                  ry="56"
                  transform={`rotate(${angle} 100 130)`}
                  strokeWidth="1.6"
                  opacity={0.8}
                />
              );
            })}
            <circle cx="100" cy="130" r="16" />
            <path d="M 30 166 Q 100 152 170 166" strokeWidth="1" opacity="0.45" />
          </>
        )}
      </g>
    </svg>
  );
}
