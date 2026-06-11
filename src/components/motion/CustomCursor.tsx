"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(-120);
  const y = useMotionValue(-120);
  const [hovered, setHovered] = useState(false);
  const isHovering = useRef(false);

  useEffect(() => {
    if (reduceMotion || window.matchMedia("(pointer: coarse)").matches) {
      document.body.classList.remove("has-custom-cursor");
      return;
    }

    document.body.classList.add("has-custom-cursor");

    function handlePointerMove(event: PointerEvent) {
      x.set(event.clientX);
      y.set(event.clientY);

      const target = event.target as HTMLElement;
      const isClickable =
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        target.closest("[role='button']") !== null ||
        target.closest(".hover-lift-container") !== null;

      if (isClickable !== isHovering.current) {
        isHovering.current = isClickable;
        setHovered(isClickable);
      }
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [reduceMotion, x, y]);

  const cursorX = useSpring(x, { stiffness: 720, damping: 42, mass: 0.18 });
  const cursorY = useSpring(y, { stiffness: 720, damping: 42, mass: 0.18 });

  if (reduceMotion) {
    return null;
  }

  return (
    <motion.div
      className={`custom-cursor ${hovered ? "active" : ""}`}
      style={{ left: cursorX, top: cursorY, x: "-50%", y: "-50%" }}
      aria-hidden="true"
    />
  );
}
