import { motion } from 'framer-motion';

// A single large celestial body cropped by the viewport. The limb is defined by
// a crisp atmospheric rim (a bright ring drawn exactly along the sphere's edge)
// so it reads as a planet against the dark sky rather than a vague glow.
// `style` receives a parallax MotionValue from the hero.
const SIZE = '172vw';
const APEX = '52vh'; // height of the limb's crest above the viewport bottom
const BOTTOM = `calc(${APEX} - ${SIZE})`;

export default function PlanetLimb({ style, className = '' }) {
  const disc = {
    bottom: BOTTOM,
    width: SIZE,
    height: SIZE,
  };

  return (
    <motion.div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={style}
      aria-hidden="true"
    >
      {/* cool atmospheric haze rising off the crest */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: `calc(${APEX} - 24vh)`,
          width: '160vw',
          height: '52vh',
          background:
            'radial-gradient(52% 100% at 50% 100%, rgba(120,168,214,0.38) 0%, rgba(84,126,178,0.14) 44%, rgba(0,0,0,0) 72%)',
          filter: 'blur(28px)',
        }}
      />

      {/* planet surface (dark, faintly lit toward the crest) */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          ...disc,
          background:
            'radial-gradient(circle at 50% 40%, #1b2c40 0%, #0f1d2c 30%, #0a1420 44%, #070e17 49.4%, rgba(7,14,23,0) 49.9%)',
        }}
      />

      {/* warm day-side crescent near the crest, slowly breathing */}
      <div
        className="breathe absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          ...disc,
          background:
            'radial-gradient(circle at 38% 6%, rgba(240,176,96,0.55) 0%, rgba(214,120,60,0.12) 9%, rgba(0,0,0,0) 16%)',
          mixBlendMode: 'screen',
        }}
      />

      {/* crisp atmospheric rim exactly along the sphere edge */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          ...disc,
          background:
            'radial-gradient(circle, rgba(0,0,0,0) 49.1%, rgba(173,206,240,0.95) 49.75%, rgba(126,168,214,0.45) 50.2%, rgba(126,168,214,0.12) 51%, rgba(0,0,0,0) 52.2%)',
        }}
      />
    </motion.div>
  );
}
