import { motion } from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';
import { useExperience } from '../experience/ExperienceContext';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
}

export function Reveal({ children, className = '', delay = 0, style }: RevealProps) {
  const { reducedMotion } = useExperience();
  if (reducedMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-70px' }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
