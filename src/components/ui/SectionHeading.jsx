import { motion, useReducedMotion } from 'framer-motion';

// Consistent catalog-style heading: oversized index number, a hairline,
// and a display title. Used to bind sections into one continuous log.
export default function SectionHeading({ num, title, kicker, align = 'left' }) {
  const reduce = useReducedMotion();
  const anim = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.6 },
        transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] },
      };

  return (
    <motion.header {...anim} className={align === 'right' ? 'text-right' : ''}>
      <div
        className={`flex items-baseline gap-4 ${
          align === 'right' ? 'justify-end' : ''
        }`}
      >
        <span className="index-num text-[0.72rem] tracking-[0.3em] opacity-70">{num}</span>
        <span className="tickline flex-1 max-w-[7rem] opacity-70" aria-hidden="true" />
        {kicker && <span className="label label--faint">{kicker}</span>}
      </div>
      <h2 className="font-display text-4xl md:text-6xl font-medium leading-[1.02] mt-3 tracking-[-0.01em]">
        {title}
      </h2>
    </motion.header>
  );
}
