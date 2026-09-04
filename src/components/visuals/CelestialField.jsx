import { motion } from 'framer-motion';

// A mostly-abstract astronomical composition: painterly deep gradients (inspired
// by long-exposure astrophotography) with a few faint concentric rings drifting
// almost imperceptibly. No labels, no diagrams. `variant` shifts the palette so
// the same visual can distinguish two different sections.
const PALETTES = {
  night: {
    base: 'radial-gradient(120% 90% at 50% 40%, #0d1826 0%, #080d14 70%)',
    cool: 'rgba(56,96,138,0.42)',
    warm: 'rgba(224,150,86,0.40)',
    violet: 'rgba(96,84,150,0.24)',
  },
  dusk: {
    base: 'radial-gradient(120% 95% at 60% 30%, #14131f 0%, #0a0a12 72%)',
    cool: 'rgba(70,104,150,0.30)',
    warm: 'rgba(216,132,74,0.34)',
    violet: 'rgba(126,92,158,0.34)',
  },
};

export default function CelestialField({ style, variant = 'night', className = '' }) {
  const p = PALETTES[variant] || PALETTES.night;
  const rings = [
    { rx: 300, ry: 118, rot: -16 },
    { rx: 210, ry: 82, rot: -16 },
    { rx: 128, ry: 50, rot: -16 },
  ];

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <div className="absolute inset-0" style={{ background: p.base }} />

      {/* cool nebula, upper-left */}
      <div
        className="absolute"
        style={{
          top: '-10%',
          left: '-6%',
          width: '70vw',
          height: '70vw',
          background: `radial-gradient(circle at 50% 50%, ${p.cool} 0%, rgba(0,0,0,0) 62%)`,
          filter: 'blur(20px)',
        }}
      />

      {/* warm core, lower-right */}
      <motion.div
        className="absolute"
        style={{
          bottom: '-14%',
          right: '2%',
          width: '52vw',
          height: '52vw',
          background: `radial-gradient(circle at 50% 50%, ${p.warm} 0%, rgba(0,0,0,0) 68%)`,
          filter: 'blur(24px)',
          ...style,
        }}
      />

      {/* violet depth, center */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '46vw',
          height: '46vw',
          background: `radial-gradient(circle at 50% 50%, ${p.violet} 0%, rgba(0,0,0,0) 66%)`,
          filter: 'blur(30px)',
        }}
      />

      {/* faint drifting rings */}
      <svg
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 drift-rotate"
        width="820"
        height="820"
        viewBox="-410 -410 820 820"
        style={{ maxWidth: '120vw' }}
      >
        {rings.map((r, i) => (
          <ellipse
            key={i}
            cx="0"
            cy="0"
            rx={r.rx}
            ry={r.ry}
            transform={`rotate(${r.rot})`}
            fill="none"
            stroke="rgba(233,238,245,0.09)"
            strokeWidth="1"
          />
        ))}
        <circle cx="0" cy="0" r="2.5" fill="rgba(233,205,170,0.8)" />
      </svg>
    </div>
  );
}
