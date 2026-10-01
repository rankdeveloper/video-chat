import type { Easing } from "framer-motion";

const easeOut: Easing = "easeOut";

export function useAnimations() {
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.55, ease: easeOut, delay },
  });

  const fadeIn = (delay = 0) => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.25, delay },
  });

  const scaleIn = (delay = 0) => ({
    initial: { opacity: 0, scale: 0.92, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.92, y: 20 },
    transition: { duration: 0.3, ease: easeOut, delay },
  });

  const slideInLeft = (delay = 0) => ({
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.55, ease: easeOut, delay },
  });

  const slideInRight = (delay = 0) => ({
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.55, ease: easeOut, delay },
  });

  const slideDown = (delay = 0) => ({
    initial: { opacity: 0, y: -16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: easeOut, delay },
  });

  const stagger = {
    initial: {},
    animate: { transition: { staggerChildren: 0.08 } },
  };

  const cardVariant = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: easeOut } },
  };

  return {
    fadeUp,
    fadeIn,
    scaleIn,
    slideInLeft,
    slideInRight,
    slideDown,
    stagger,
    cardVariant,
  };
}
