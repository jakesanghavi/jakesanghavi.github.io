import { useRef } from 'react';
import { useReducedMotion, useScroll, useTransform } from 'framer-motion';
import CelestialField from '../visuals/CelestialField';
import Reveal from '../Reveal';
import { interludeLine } from '../../data/content';

export default function Interlude() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const coreY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);

  return (
    <section
      ref={ref}
      data-nav-theme="dark"
      className="on-dark relative min-h-[92svh] bg-night text-paper overflow-hidden flex items-end"
    >
      <CelestialField style={reduce ? undefined : { y: coreY }} />

      <div className="relative z-10 w-full max-w-[1500px] mx-auto px-6 md:px-14 pb-20 md:pb-28">
        <Reveal
          as="p"
          amount={0.5}
          className="display italic text-[clamp(1.55rem,3.6vw,3.3rem)] leading-[1.15] max-w-[22ch] text-paper/90"
        >
          {interludeLine}
        </Reveal>
      </div>
    </section>
  );
}
