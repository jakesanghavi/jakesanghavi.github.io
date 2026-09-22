import { motion, useReducedMotion } from 'framer-motion';

// A single, consistent scroll-reveal primitive. Honors reduced motion by
// rendering content statically (no offset, no fade).
export default function Reveal({
  children,
  as = 'div',
  y = 28,
  delay = 0,
  duration = 0.9,
  amount = 0.35,
  once = true,
  className = '',
  ...rest
}) {
  const reduce = useReducedMotion();
  const Comp = motion[as] || motion.div;

  if (reduce) {
    const Plain = as;
    return (
      <Plain className={className} {...rest}>
        {children}
      </Plain>
    );
  }

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.2, 0.7, 0.2, 1] }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
