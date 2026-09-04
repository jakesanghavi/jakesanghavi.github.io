import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import PlanetLimb from '../visuals/PlanetLimb';
import { profile, portrait } from '../../data/content';

export default function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const planetY = useTransform(scrollYProgress, [0, 1], ['0%', '-14%']);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const rise = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1, delay, ease: [0.2, 0.7, 0.2, 1] },
        };

  return (
    <section
      id="top"
      ref={ref}
      data-nav-theme="dark"
      className="on-dark relative min-h-[100svh] bg-night text-paper overflow-hidden"
    >
      <PlanetLimb style={reduce ? undefined : { y: planetY }} />

      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to bottom, rgba(8,13,20,0.85) 0%, rgba(8,13,20,0) 24%, rgba(8,13,20,0) 56%, rgba(8,13,20,0.6) 100%)',
        }}
        aria-hidden="true"
      />

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 min-h-[100svh] flex items-center pt-24 pb-20 lg:py-0 max-w-[1500px] mx-auto px-6 md:px-14"
      >
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center w-full">
          {/* name + summary */}
          <div className="lg:col-span-7">
            <h1 className="display display-tight">
              <motion.span {...rise(0.1)} className="block text-[clamp(3rem,10vw,8.5rem)]">
                Jake
              </motion.span>
              <motion.span
                {...rise(0.22)}
                className="block text-[clamp(3rem,10vw,8.5rem)] text-paper/85"
              >
                Sanghavi
              </motion.span>
            </h1>

            <motion.p {...rise(0.42)} className="eyebrow mt-6 ml-1">
              {profile.role}
            </motion.p>

            <motion.p
              {...rise(0.54)}
              className="mt-6 max-w-[46ch] text-lg leading-relaxed text-paper/70"
            >
              {profile.summary}
            </motion.p>
          </div>

          {/* portrait */}
          <motion.div
            {...(reduce
              ? {}
              : {
                  initial: { opacity: 0, y: 30 },
                  animate: { opacity: 1, y: 0 },
                  transition: { duration: 1.1, delay: 0.5, ease: [0.2, 0.7, 0.2, 1] },
                })}
            className="lg:col-span-5 flex justify-center lg:justify-end"
          >
            <figure className="relative w-[15rem] sm:w-[17rem] lg:w-[20rem]">
              <div className="relative aspect-[632/711] overflow-hidden ring-1 ring-white/15 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
                <img
                  src={portrait}
                  alt="Jake Sanghavi"
                  fetchPriority="high"
                  className="w-full h-full object-cover"
                  style={{ filter: 'saturate(0.92) contrast(1.02)' }}
                />
                {/* subtle warm-to-cool grade to seat the photo in the scene */}
                <div
                  className="absolute inset-0 mix-blend-soft-light"
                  style={{
                    background:
                      'linear-gradient(150deg, rgba(235,162,79,0.16) 0%, rgba(0,0,0,0) 45%, rgba(56,96,138,0.18) 100%)',
                  }}
                  aria-hidden="true"
                />
              </div>
            </figure>
          </motion.div>
        </div>
      </motion.div>

      {/* scroll cue */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2">
        <span className="eyebrow text-[0.62rem]">Scroll</span>
        <span
          className={`block w-px h-9 bg-gradient-to-b from-blue-soft/70 to-transparent ${
            reduce ? '' : 'motion-safe:animate-pulse'
          }`}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
