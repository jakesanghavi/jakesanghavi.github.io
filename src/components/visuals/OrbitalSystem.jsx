import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

// A flat, quiet solar system — the memorable object on the opening screen.
// Circular orbits (a "ball"), a few bodies, no labels, no 3D.
const CX = 200;
const CY = 200;
const ORBITS = [92, 124, 156, 186];
const BODIES = [
  { orbit: 0, period: 36, phase: 0.4, r: 3.4, fill: '#f0d2a4' },
  { orbit: 1, period: 58, phase: 2.1, r: 2.4, fill: '#b7c9d8' },
  { orbit: 2, period: 84, phase: 3.6, r: 4.6, fill: '#e0a15a' },
  { orbit: 3, period: 120, phase: 5.0, r: 2.2, fill: '#f4efe5' },
];

function place(radius, angle) {
  return [CX + radius * Math.cos(angle), CY + radius * Math.sin(angle)];
}

export default function OrbitalSystem({ className = '' }) {
  const reduce = useReducedMotion();
  const refs = useRef([]);

  useEffect(() => {
    const set = (i, angle) => {
      const el = refs.current[i];
      if (!el) return;
      const [x, y] = place(ORBITS[BODIES[i].orbit], angle);
      el.setAttribute('cx', x);
      el.setAttribute('cy', y);
    };

    BODIES.forEach((b, i) => set(i, b.phase));
    if (reduce) return;

    let raf;
    const start = performance.now();
    const tick = (now) => {
      const t = (now - start) / 1000;
      BODIES.forEach((b, i) => set(i, b.phase + (t * Math.PI * 2) / b.period));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduce]);

  return (
    <svg
      className={className}
      viewBox="0 0 400 400"
      role="img"
      aria-label="A quiet orbital system."
      preserveAspectRatio="xMidYMid meet"
    >
      <circle cx={CX} cy={CY} r="196" fill="none" stroke="rgba(233,238,245,0.08)" strokeWidth="1" />
      {ORBITS.map((r) => (
        <circle
          key={r}
          cx={CX}
          cy={CY}
          r={r}
          fill="none"
          stroke="rgba(233,238,245,0.22)"
          strokeWidth="1"
        />
      ))}
      {BODIES.map((b, i) => (
        <circle
          key={i}
          ref={(el) => {
            refs.current[i] = el;
          }}
          r={b.r}
          fill={b.fill}
        />
      ))}
    </svg>
  );
}
