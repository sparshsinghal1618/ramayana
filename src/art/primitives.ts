export function hashString(value: string) {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return function random() {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function seeded(seed: string | number) {
  const n = typeof seed === 'number' ? seed : hashString(seed);
  const random = mulberry32(n);
  return {
    random,
    range: (min: number, max: number) => min + random() * (max - min),
    int: (min: number, max: number) => Math.floor(min + random() * (max - min + 1)),
    pick: <T,>(items: T[]): T => items[Math.floor(random() * items.length)],
    chance: (probability: number) => random() < probability,
  };
}

interface MountainOptions {
  width?: number;
  baseY: number;
  peakY: number;
  peaks: number;
  roughness?: number;
  seed: string;
}

export function mountainPath({
  width = 1600,
  baseY,
  peakY,
  peaks,
  roughness = 0.35,
  seed,
}: MountainOptions) {
  const r = seeded(seed);
  const step = width / peaks;
  const points: Array<[number, number]> = [[0, baseY]];
  for (let i = 0; i < peaks; i++) {
    const x = step * (i + 0.5) + r.range(-step * 0.18, step * 0.18);
    const y = peakY + r.range(-1, 1) * (baseY - peakY) * roughness;
    points.push([i === 0 ? 0 : step * i, baseY - (baseY - peakY) * r.range(0.15, 0.38)]);
    points.push([x, y]);
    points.push([step * (i + 1), baseY - (baseY - peakY) * r.range(0.05, 0.3)]);
  }
  points.push([width, baseY]);
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 1; i < points.length - 1; i++) {
    const [x1, y1] = points[i];
    const [x2, y2] = points[i + 1];
    d += ` L ${x1.toFixed(1)} ${y1.toFixed(1)}`;
    if (i % 2 === 1) {
      const mx = (x1 + x2) / 2;
      const my = (y1 + y2) / 2;
      d += ` Q ${mx.toFixed(1)} ${my.toFixed(1)} ${x2.toFixed(1)} ${y2.toFixed(1)}`;
      i++;
    }
  }
  const last = points[points.length - 1];
  d += ` L ${last[0]} ${last[1]} L ${width} ${baseY + 20} L 0 ${baseY + 20} Z`;
  return d;
}

export function ridgePath(width: number, baseY: number, peakY: number, seed: string) {
  const r = seeded(seed);
  const count = Math.max(6, Math.round(width / 90));
  const step = width / count;
  let d = `M 0 ${baseY}`;
  for (let i = 0; i <= count; i++) {
    const x = i * step;
    const y = peakY + r.range(0, baseY - peakY) * (0.3 + Math.sin(i * 1.7) * 0.2);
    d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
  }
  d += ` L ${width} ${baseY + 10} L 0 ${baseY + 10} Z`;
  return d;
}

export function cloudPath(width: number, height: number, seed: string) {
  const r = seeded(seed);
  const puffs = Math.max(4, Math.round(width / 70));
  let d = `M ${width * 0.06} ${height * 0.6}`;
  for (let i = 0; i < puffs; i++) {
    const x = width * (0.08 + (i / puffs) * 0.84);
    const y = height * r.range(0.32, 0.68);
    const rx = width * r.range(0.045, 0.12);
    const ry = height * r.range(0.38, 0.72);
    d += ` C ${x - rx} ${y - ry}, ${x + rx} ${y - ry}, ${x + rx} ${y + ry * 0.35}`;
  }
  d += ` Q ${width * 0.56} ${height * 1.18} ${width * 0.04} ${height * 0.92} Z`;
  return d;
}

export function wavePath(width: number, y: number, amplitude: number, seed: string, segments = 12) {
  const r = seeded(seed);
  const step = width / segments;
  let d = `M 0 ${y}`;
  for (let i = 0; i < segments; i++) {
    const x1 = i * step;
    const x2 = (i + 1) * step;
    const cy = y + r.range(-amplitude, amplitude);
    d += ` Q ${(x1 + x2) / 2} ${cy} ${x2} ${y + r.range(-amplitude * 0.35, amplitude * 0.35)}`;
  }
  return d;
}

export function starField(count: number, seed: string, width = 1600, height = 500) {
  const r = seeded(seed);
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: r.range(0, width),
    y: r.range(0, height),
    r: r.range(0.5, 1.8),
    o: r.range(0.25, 0.9),
  }));
}

export function birdFlock(count: number, seed: string, width = 1600, height = 500) {
  const r = seeded(seed);
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: r.range(width * 0.1, width * 0.9),
    y: r.range(height * 0.12, height * 0.55),
    s: r.range(0.5, 1.5),
    o: r.range(0.25, 0.65),
  }));
}

export function concentric(cx: number, cy: number, radii: number[], count = 48) {
  return radii.map((radius, ring) =>
    Array.from({ length: count + ring * 4 }, (_, i) => {
      const angle = (i / (count + ring * 4)) * Math.PI * 2;
      return {
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
      };
    }),
  );
}

export function stonePositions(count: number, width: number, height: number, seed: string) {
  const r = seeded(seed);
  return Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1);
    return {
      id: i,
      x: width * 0.08 + t * width * 0.8,
      y: height * 0.66 + Math.sin(t * Math.PI) * -height * 0.06 + r.range(-4, 4),
      w: r.range(28, 50),
      h: r.range(14, 24),
      rot: r.range(-5, 5),
    };
  });
}
