// utilis/animation.ts
import { Variants } from "framer-motion";

export const container: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      when: "beforeChildren",
      delayChildren: 0.2,
      staggerChildren: 0.15,
    },
  },
};

export const item: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,  // <-- `as const` tells TS this is the literal "spring"
      stiffness: 120,
      damping: 16,
    },
  },
};
