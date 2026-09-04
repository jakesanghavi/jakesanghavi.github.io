import { motion } from 'framer-motion';

// A single large celestial body, cropped by the viewport: mostly dark, with a
// cool atmospheric rim and a warm terminator glow. Built from layered gradients
// (cheap, GPU-friendly). `style` receives a parallax MotionValue from the hero.
export default function PlanetLimb({ style, className = '' }) {
  return (
    <motion.div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={style}
      aria-hidden="true"
    >
      {/* cool atmospheric halo hugging the limb */}
      <div
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          bottom: '18%',
          width: '150vw',
          height: '70vh',
          background:
            'radial-gradient(60% 100% at 50% 100%, rgba(110,158,205,0.30) 0%, rgba(80,120,170,0.12) 40%, rgba(0,0,0,0) 72%)',
          filter: 'blur(30px)',
        }}
      />

      {/* the body */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          bottom: '-72vw',
          width: '168vw',
          height: '168vw',
          background:
            'radial-gradient(120% 120% at 50% 6%, #1a2636 0%, #111c29 34%, #0a121c 62%, #070d15 100%)',
          boxShadow:
            'inset 0 3px 0 rgba(180,205,235,0.18), inset 0 40px 120px rgba(0,0,0,0.55)',
        }}
      />

      {/* thin bright terminator line along the top edge */}
      <div
        className="absolute left-1/2 -translate-x-1/2 rounded-full"
        style={{
          bottom: '-72vw',
          width: '168vw',
          height: '168vw',
          background:
            'radial-gradient(120% 120% at 50% 4.4%, rgba(233,205,170,0.55) 0%, rgba(233,205,170,0) 5.5%)',
        }}
      />

      {/* warm sunrise glow, offset and slowly breathing */}
      <div
        className="breathe absolute"
        style={{
          bottom: '14%',
          left: '24%',
          width: '46vw',
          height: '46vw',
          background:
            'radial-gradient(circle at 50% 50%, rgba(235,162,79,0.45) 0%, rgba(214,120,60,0.14) 40%, rgba(0,0,0,0) 70%)',
          filter: 'blur(36px)',
          mixBlendMode: 'screen',
        }}
      />
    </motion.div>
  );
}
