"use client";

import { motion, useReducedMotion, type MotionProps } from "motion/react";
import type { ReactNode, AnchorHTMLAttributes } from "react";

export type MagneticLinkProps = {
  children: ReactNode;
  className?: string;
  href: string;
} & MotionProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof MotionProps>;

export function MagneticLink({ children, className = "", href, ...rest }: MagneticLinkProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      className={className}
      href={href}
      whileHover={reduceMotion ? undefined : { x: 5 }}
      whileTap={reduceMotion ? undefined : { scale: 0.985 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
      {...rest}
    >
      {children}
    </motion.a>
  );
}
