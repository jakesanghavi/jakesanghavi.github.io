import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import PlanetLimb from '../visuals/PlanetLimb';
import { profile } from '../../data/content';

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const planetY = useTransform(scrollYProgress, [0, 1], ['0%', '-14%']);
  const nameY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const nameOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const intro = reduce
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <section
      id="top"
      ref={ref}
      data-nav-theme="dark"
      className="on-dark relative min-h-[100svh] bg-night text-paper overflow-hidden"
    >
      <PlanetLimb style={reduce ? undefined : { y: planetY }} />

      {/* depth vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(8,13,20,0.85) 0%, rgba(8,13,20,0) 26%, rgba(8,13,20,0) 58%, rgba(8,13,20,0.55) 100%)',
        }}
        aria-hidden="true"
      />

      {/* vertical marginalia */}
      <div className="hidden lg:block absolute left-10 top-1/2 -translate-y-1/2 z-10">
        <span className="eyebrow block origin-left -rotate-90 whitespace-nowrap">
          Based in {profile.location}
        </span>
      </div>

      <div className="relative z-10 min-h-[100svh] flex flex-col justify-center pb-[24vh] max-w-[1500px] mx-auto px-6 md:px-14">
        <motion.h1
          style={reduce ? undefined : { y: nameY, opacity: nameOpacity }}
          className="display display-tight text-paper"
        >
          <motion.span
            {...(reduce ? {} : { ...intro, transition: { duration: 1, delay: 0.15, ease: [0.2, 0.7, 0.2, 1] } })}
            className="block text-[clamp(3.6rem,16vw,15rem)]"
          >
            Jake
          </motion.span>
          <motion.span
            {...(reduce ? {} : { ...intro, transition: { duration: 1, delay: 0.28, ease: [0.2, 0.7, 0.2, 1] } })}
            className="block text-[clamp(3.6rem,16vw,15rem)] pl-[0.06em] text-paper/85"
          >
            Sanghavi
          </motion.span>
        </motion.h1>

        <motion.p
          {...(reduce ? {} : { ...intro, transition: { duration: 1, delay: 0.5 } })}
          className="eyebrow mt-7 md:mt-9 ml-1"
        >
          {profile.role}
        </motion.p>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="eyebrow text-[0.62rem]">Scroll</span>
        <span
          className={`block w-px h-10 bg-gradient-to-b from-blue-soft/70 to-transparent ${
            reduce ? '' : 'motion-safe:animate-pulse'
          }`}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
