interface OrnamentProps {
  className?: string;
  variant?: 'lotus' | 'diamond' | 'sun';
}

export function Ornament({ className = '', variant = 'lotus' }: OrnamentProps) {
  if (variant === 'diamond') {
    return (
      <svg className={`ornament ${className}`} viewBox="0 0 240 16" aria-hidden="true">
        <path d="M0 8H96" stroke="currentColor" strokeWidth="0.7" />
        <path d="M144 8H240" stroke="currentColor" strokeWidth="0.7" />
        <path d="M120 1.5L126.5 8L120 14.5L113.5 8Z" fill="none" stroke="currentColor" strokeWidth="0.9" />
        <circle cx="108" cy="8" r="1.6" fill="currentColor" />
        <circle cx="132" cy="8" r="1.6" fill="currentColor" />
      </svg>
    );
  }
  if (variant === 'sun') {
    return (
      <svg className={`ornament ${className}`} viewBox="0 0 120 120" aria-hidden="true">
        <circle cx="60" cy="60" r="22" fill="none" stroke="currentColor" strokeWidth="0.8" />
        <circle cx="60" cy="60" r="7" fill="currentColor" opacity="0.8" />
        {Array.from({ length: 24 }, (_, i) => {
          const angle = (i / 24) * Math.PI * 2;
          return (
            <path
              key={i}
              d={`M ${60 + Math.cos(angle) * 32} ${60 + Math.sin(angle) * 32} L ${60 + Math.cos(angle) * (i % 2 === 0 ? 48 : 41)} ${60 + Math.sin(angle) * (i % 2 === 0 ? 48 : 41)}`}
              stroke="currentColor"
              strokeWidth="0.8"
            />
          );
        })}
      </svg>
    );
  }
  return (
    <svg className={`ornament ${className}`} viewBox="0 0 240 28" aria-hidden="true">
      <path d="M0 14H88" stroke="currentColor" strokeWidth="0.7" />
      <path d="M152 14H240" stroke="currentColor" strokeWidth="0.7" />
      {[0, 1, 2, 3, 4].map((i) => (
        <ellipse
          key={i}
          cx={120 + (i - 2) * 8}
          cy="14"
          rx="5"
          ry="11"
          fill="none"
          stroke="currentColor"
          strokeWidth="0.7"
          transform={`rotate(${(i - 2) * 24} 120 14)`}
        />
      ))}
      <circle cx="120" cy="14" r="2" fill="currentColor" />
      <circle cx="104" cy="14" r="1.4" fill="currentColor" />
      <circle cx="136" cy="14" r="1.4" fill="currentColor" />
    </svg>
  );
}
