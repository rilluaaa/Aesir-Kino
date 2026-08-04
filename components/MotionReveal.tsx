"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type MotionRevealProps = {
  readonly children: ReactNode;
  readonly className?: string;
  readonly delay?: number;
  readonly immediate?: boolean;
  readonly viewportAmount?: number;
};

export function MotionReveal({
  children,
  className,
  delay = 0,
  immediate = false,
  viewportAmount = 0.22
}: MotionRevealProps) {
  const transition = {
    type: "spring" as const,
    stiffness: 50,
    damping: 15,
    delay
  };

  if (immediate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: viewportAmount }}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
}
