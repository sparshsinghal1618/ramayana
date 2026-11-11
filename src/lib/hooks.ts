import { useCallback, useEffect, useRef, useState, type RefObject } from 'react';

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

/** Reports which slice of a tall sticky-scroll section is currently active. */
export function useStageIndex(
  ref: RefObject<HTMLElement | null>,
  count: number,
  enabled = true,
  reducedMotion = false,
) {
  const [index, setIndex] = useState(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled || reducedMotion || count <= 1) {
      setIndex(0);
      return;
    }
    const measure = () => {
      frame.current = null;
      const element = ref.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const distance = Math.max(1, element.offsetHeight - window.innerHeight);
      const progress = clamp(-rect.top / distance);
      const next = Math.min(count - 1, Math.floor(progress * count));
      setIndex((current) => (current === next ? current : next));
    };
    const onScroll = () => {
      if (frame.current !== null) return;
      frame.current = window.requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref, count, enabled, reducedMotion]);

  const goTo = useCallback(
    (target: number) => {
      const element = ref.current;
      if (!element) return;
      const start = element.getBoundingClientRect().top + window.scrollY;
      const distance = element.offsetHeight - window.innerHeight;
      const progress = (Math.min(count - 1, Math.max(0, target)) + 0.45) / count;
      window.scrollTo({
        top: start + progress * distance,
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    },
    [ref, count, reducedMotion],
  );

  return { index, goTo };
}

/** Fine-grained 0—1 progress through a section, throttled to animation frames. */
export function useSectionProgress(
  ref: RefObject<HTMLElement | null>,
  enabled = true,
) {
  const [progress, setProgress] = useState(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const measure = () => {
      frame.current = null;
      const element = ref.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const distance = Math.max(1, element.offsetHeight - window.innerHeight);
      setProgress(clamp(-rect.top / distance));
    };
    const onScroll = () => {
      if (frame.current !== null) return;
      frame.current = window.requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame.current !== null) window.cancelAnimationFrame(frame.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref, enabled]);

  return progress;
}

/** Mounts expensive artwork only when it is within a generous viewport margin. */
export function useLazyRender(margin = '900px') {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [margin]);

  return { ref, visible };
}

export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? '');

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => Boolean(element));
    if (!elements.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

export function useBodyLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [locked]);
}

export function useEscape(handler: () => void, active = true) {
  useEffect(() => {
    if (!active) return;
    const listener = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handler();
    };
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [handler, active]);
}

export function scrollToId(id: string, reducedMotion = false) {
  const element = document.getElementById(id);
  if (!element) return;
  element.scrollIntoView({
    behavior: reducedMotion ? 'auto' : 'smooth',
    block: 'start',
  });
}
