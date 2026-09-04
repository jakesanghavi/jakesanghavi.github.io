import { motion, useReducedMotion } from 'framer-motion';

// A stylized exoplanet transit light curve: flat baseline, a flat-bottomed
// dip as the planet crosses the star, then recovery.
function buildCurve(w, h) {
  const pts = [];
  const n = 220;
  const top = h * 0.22; // flux = 1.0
  const depth = h * 0.34; // dip depth
  for (let i = 0; i <= n; i++) {
    const x = i / n;
    let flux = 1;
    const ingress = 0.4;
    const egress = 0.6;
    if (x > ingress && x < egress) {
      const edge = 0.03;
      if (x < ingress + edge) flux = 1 - ((x - ingress) / edge) * 1;
      else if (x > egress - edge) flux = 1 - ((egress - x) / edge) * 1;
      else flux = 0;
    }
    // small correlated noise
    const noise = (Math.sin(i * 1.7) + Math.sin(i * 0.6)) * 0.012;
    const px = 60 + x * (w - 90);
    const py = top + (1 - flux) * depth + noise * depth;
    pts.push([px, py]);
  }
  return pts;
}

export default function LightCurve({ className = '' }) {
  const reduce = useReducedMotion();
  const W = 640;
  const H = 300;
  const pts = buildCurve(W, H);
  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  const baselineY = H * 0.22;
  const gridY = [0.22, 0.42, 0.62, 0.82].map((f) => H * f);

  return (
    <svg
      className={className}
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="A simulated exoplanet transit light curve: brightness dips as a planet crosses its star."
      preserveAspectRatio="xMidYMid meet"
    >
      {/* frame */}
      <line x1="60" y1="20" x2="60" y2={H - 34} stroke="var(--color-line)" strokeWidth="1" />
      <line x1="60" y1={H - 34} x2={W - 30} y2={H - 34} stroke="var(--color-line)" strokeWidth="1" />

      {/* horizontal gridlines */}
      {gridY.map((y, i) => (
        <line key={i} x1="60" y1={y} x2={W - 30} y2={y} stroke="var(--color-line)" strokeWidth="0.5" strokeDasharray="2 6" />
      ))}

      {/* baseline flux = 1.0 */}
      <line x1="60" y1={baselineY} x2={W - 30} y2={baselineY} stroke="var(--color-blue)" strokeWidth="0.75" strokeDasharray="1 5" />

      {/* transit window markers */}
      {[0.4, 0.6].map((f, i) => {
        const x = 60 + f * (W - 90);
        return <line key={i} x1={x} y1="24" x2={x} y2={H - 34} stroke="var(--color-amber)" strokeWidth="0.75" strokeDasharray="2 4" opacity="0.7" />;
      })}

      {/* the curve */}
      <motion.path
        d={d}
        fill="none"
        stroke="var(--color-ink)"
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={reduce ? undefined : { pathLength: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 2.2, ease: [0.4, 0, 0.1, 1] }}
      />

      {/* labels */}
      <text x="64" y="16" className="u-mono" fontSize="10" fill="var(--color-graphite)">
        RELATIVE FLUX
      </text>
      <text x={W - 30} y={H - 16} textAnchor="end" className="u-mono" fontSize="10" fill="var(--color-graphite)">
        PHASE →
      </text>
      <text x={60 + 0.5 * (W - 90)} y={H - 44} textAnchor="middle" className="u-mono" fontSize="10" fill="var(--color-amber)">
        TRANSIT
      </text>
    </svg>
  );
}
