import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

const CX = 500;
const CY = 500;
const TILT = -19;

// Each body: elliptical orbit (rx/ry) inside a group rotated by TILT,
// a slow sidereal period, a starting phase, a radius and a colour.
const BODIES = [
  { rx: 132, ry: 52, period: 24, phase: 0.4, r: 4.5, fill: 'var(--color-amber-bright)' },
  { rx: 228, ry: 108, period: 41, phase: 2.1, r: 7, fill: 'var(--color-blue-soft)' },
  { rx: 330, ry: 150, period: 67, phase: 4.0, r: 3.5, fill: 'var(--color-paper)' },
  { rx: 430, ry: 232, period: 103, phase: 5.2, r: 10, fill: 'var(--color-amber)', ring: true },
];

function ellipsePos(rx, ry, angle) {
  return { x: CX + rx * Math.cos(angle), y: CY + ry * Math.sin(angle) };
}

export default function Orrery({ className = '' }) {
  const reduce = useReducedMotion();
  const bodyRefs = useRef([]);
  const ringRefs = useRef([]);
  const backRef = useRef(null);
  const frontRef = useRef(null);
  const target = useRef({ x: 0, y: 0 });
  const cur = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Place bodies at their static phase positions once.
    BODIES.forEach((b, i) => {
      const p = ellipsePos(b.rx, b.ry, b.phase);
      const el = bodyRefs.current[i];
      if (el) {
        el.setAttribute('cx', p.x);
        el.setAttribute('cy', p.y);
      }
      const rg = ringRefs.current[i];
      if (rg) rg.setAttribute('transform', `translate(${p.x} ${p.y}) rotate(-24)`);
    });

    if (reduce) return;

    let raf;
    const start = performance.now();

    const onMove = (e) => {
      const nx = e.clientX / window.innerWidth - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      target.current = { x: nx, y: ny };
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    const tick = (now) => {
      const t = (now - start) / 1000;

      BODIES.forEach((b, i) => {
        const angle = b.phase + (t * (Math.PI * 2)) / b.period;
        const p = ellipsePos(b.rx, b.ry, angle);
        const el = bodyRefs.current[i];
        if (el) {
          el.setAttribute('cx', p.x);
          el.setAttribute('cy', p.y);
        }
        const rg = ringRefs.current[i];
        if (rg) rg.setAttribute('transform', `translate(${p.x} ${p.y}) rotate(-24)`);
      });

      // Ease parallax toward pointer target for gentle depth.
      cur.current.x += (target.current.x - cur.current.x) * 0.04;
      cur.current.y += (target.current.y - cur.current.y) * 0.04;
      if (backRef.current) {
        backRef.current.setAttribute(
          'transform',
          `translate(${cur.current.x * 10} ${cur.current.y * 10})`,
        );
      }
      if (frontRef.current) {
        frontRef.current.setAttribute(
          'transform',
          `translate(${cur.current.x * 26} ${cur.current.y * 26})`,
        );
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
    };
  }, [reduce]);

  const ticks = Array.from({ length: 72 }, (_, i) => i * 5);

  return (
    <svg
      className={className}
      viewBox="0 0 1000 1000"
      role="img"
      aria-label="An orrery: a small planetary system with bodies on elliptical orbits."
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <radialGradient id="star-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff3dc" />
          <stop offset="35%" stopColor="var(--color-amber-bright)" />
          <stop offset="100%" stopColor="var(--color-amber)" />
        </radialGradient>
        <radialGradient id="star-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(214,154,69,0.34)" />
          <stop offset="60%" stopColor="rgba(214,154,69,0.06)" />
          <stop offset="100%" stopColor="rgba(214,154,69,0)" />
        </radialGradient>
      </defs>

      {/* Coordinate frame — a measured circle with fine ticks */}
      <g ref={backRef}>
        <circle cx={CX} cy={CY} r={470} fill="none" stroke="var(--color-night-line)" strokeWidth="1" />
        <g className="spin-slow">
          {ticks.map((deg) => {
            const long = deg % 30 === 0;
            const a = (deg * Math.PI) / 180;
            const r1 = 470;
            const r2 = 470 - (long ? 16 : 8);
            return (
              <line
                key={deg}
                x1={CX + r1 * Math.cos(a)}
                y1={CY + r1 * Math.sin(a)}
                x2={CX + r2 * Math.cos(a)}
                y2={CY + r2 * Math.sin(a)}
                stroke="var(--color-night-line)"
                strokeWidth={long ? 1.4 : 1}
              />
            );
          })}
        </g>

        {/* Orbit ellipses */}
        <g transform={`rotate(${TILT} ${CX} ${CY})`}>
          {BODIES.map((b, i) => (
            <ellipse
              key={i}
              cx={CX}
              cy={CY}
              rx={b.rx}
              ry={b.ry}
              fill="none"
              stroke="var(--color-night-line)"
              strokeWidth="1"
              strokeDasharray={i === 2 ? '3 7' : undefined}
            />
          ))}
        </g>
      </g>

      {/* The star */}
      <circle cx={CX} cy={CY} r={210} fill="url(#star-halo)" />
      <circle cx={CX} cy={CY} r={30} fill="url(#star-core)" />
      <circle cx={CX} cy={CY} r={30} fill="none" stroke="rgba(255,243,220,0.5)" strokeWidth="1" />

      {/* Bodies (rendered inside the tilted frame so they track the orbits) */}
      <g ref={frontRef}>
        <g transform={`rotate(${TILT} ${CX} ${CY})`}>
          {BODIES.map((b, i) => (
            <g key={i}>
              {b.ring && (
                <ellipse
                  ref={(el) => (ringRefs.current[i] = el)}
                  rx={b.r + 9}
                  ry={(b.r + 9) * 0.36}
                  fill="none"
                  stroke="var(--color-amber-bright)"
                  strokeOpacity="0.7"
                  strokeWidth="1.4"
                />
              )}
              <circle
                ref={(el) => (bodyRefs.current[i] = el)}
                r={b.r}
                fill={b.fill}
                stroke="rgba(15,27,42,0.55)"
                strokeWidth="0.75"
              />
            </g>
          ))}
        </g>
      </g>
    </svg>
  );
}
