import { motion, useReducedMotion } from 'framer-motion';

// Deterministic pseudo-random so the plot is stable across renders.
function seeded(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function buildPoints(w, h, n = 46) {
  const rand = seeded(7);
  const pts = [];
  const padX = 56;
  const padY = 24;
  for (let i = 0; i < n; i++) {
    const t = rand();
    // "expected" on x, "observed" on y with correlation + spread
    const x = padX + t * (w - padX - 24);
    const base = padY + (1 - t) * (h - padY - 40);
    const spread = (rand() - 0.5) * (h * 0.28);
    const y = Math.max(padY, Math.min(h - 40, base + spread));
    pts.push([x, y, 2 + rand() * 3.4]);
  }
  return pts;
}

export default function ScatterPlot({ className = '' }) {
  const reduce = useReducedMotion();
  const W = 640;
  const H = 300;
  const pts = buildPoints(W, H);

  return (
    <svg
      className={className}
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="A scatter plot of observed versus expected performance, with a fitted trend line."
      preserveAspectRatio="xMidYMid meet"
    >
      {/* axes */}
      <line x1="56" y1="20" x2="56" y2={H - 34} stroke="var(--color-line)" strokeWidth="1" />
      <line x1="56" y1={H - 34} x2={W - 24} y2={H - 34} stroke="var(--color-line)" strokeWidth="1" />

      {/* reference diagonal (y = x) */}
      <line x1="56" y1={H - 34} x2={W - 24} y2="34" stroke="var(--color-blue)" strokeWidth="0.75" strokeDasharray="3 5" opacity="0.8" />

      {/* fitted trend line */}
      <motion.line
        x1="70"
        y1={H - 70}
        x2={W - 44}
        y2="70"
        stroke="var(--color-amber)"
        strokeWidth="1.6"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={reduce ? undefined : { pathLength: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.6, ease: 'easeInOut' }}
      />

      {/* points */}
      {pts.map((p, i) => (
        <motion.circle
          key={i}
          cx={p[0]}
          cy={p[1]}
          r={p[2]}
          fill="var(--color-ink)"
          fillOpacity="0.72"
          initial={reduce ? false : { opacity: 0, scale: 0 }}
          whileInView={reduce ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: reduce ? 0 : 0.4 + (i % 12) * 0.03 }}
          style={{ transformOrigin: `${p[0]}px ${p[1]}px` }}
        />
      ))}

      <text x="60" y="16" className="u-mono" fontSize="10" fill="var(--color-graphite)">
        OBSERVED
      </text>
      <text x={W - 24} y={H - 16} textAnchor="end" className="u-mono" fontSize="10" fill="var(--color-graphite)">
        EXPECTED →
      </text>
      <text x={W - 60} y="60" textAnchor="end" className="u-mono" fontSize="10" fill="var(--color-amber)">
        FIT
      </text>
    </svg>
  );
}
