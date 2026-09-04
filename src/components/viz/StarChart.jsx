import { motion, useReducedMotion } from 'framer-motion';

// A small, invented constellation used as a quiet marginal figure.
const STARS = [
  { x: 40, y: 60, r: 2.6, m: '3.1' },
  { x: 96, y: 40, r: 3.6 },
  { x: 150, y: 84, r: 2.2 },
  { x: 208, y: 52, r: 4.2, m: '1.8' },
  { x: 250, y: 120, r: 2.0 },
  { x: 176, y: 150, r: 3.0 },
  { x: 110, y: 132, r: 2.4 },
];
const LINKS = [
  [0, 1],
  [1, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [6, 0],
  [1, 6],
];

export default function StarChart({ className = '' }) {
  const reduce = useReducedMotion();
  return (
    <svg
      className={className}
      viewBox="0 0 290 190"
      role="img"
      aria-label="A small star chart of an invented constellation."
      preserveAspectRatio="xMidYMid meet"
    >
      {LINKS.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={STARS[a].x}
          y1={STARS[a].y}
          x2={STARS[b].x}
          y2={STARS[b].y}
          stroke="var(--color-blue)"
          strokeWidth="0.75"
          strokeOpacity="0.55"
          initial={reduce ? false : { pathLength: 0 }}
          whileInView={reduce ? undefined : { pathLength: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.1, delay: 0.1 * i, ease: 'easeInOut' }}
        />
      ))}
      {STARS.map((s, i) => (
        <g key={i}>
          <circle cx={s.x} cy={s.y} r={s.r} fill="var(--color-ink)" />
          {s.m && (
            <text x={s.x + s.r + 4} y={s.y + 3} className="u-mono" fontSize="8" fill="var(--color-graphite-dim)">
              {s.m}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}
