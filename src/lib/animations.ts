import type { Variants, Transition } from 'framer-motion';

export const easing = [0.25, 0.4, 0.25, 1] as const;

const baseTransition: Transition = { duration: 0.55, ease: easing };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

export const fadeDown: Variants = {
  hidden: { opacity: 0, y: -28 },
  visible: { opacity: 1, y: 0, transition: baseTransition },
};

export const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -36 },
  visible: { opacity: 1, x: 0, transition: baseTransition },
};

export const fadeRight: Variants = {
  hidden: { opacity: 0, x: 36 },
  visible: { opacity: 1, x: 0, transition: baseTransition },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: baseTransition },
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: baseTransition },
};

/** Container that staggers its children */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

/** Slower stagger for category-level containers */
export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

/** Standard viewport config — trigger when 15% visible, animate only once */
export const viewport = { once: true, amount: 0.15 } as const;

/** Tight viewport config for large sections */
export const viewportLoose = { once: true, amount: 0.05 } as const;
