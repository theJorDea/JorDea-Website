"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import type { MotionValue } from "motion/react";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

type HoverLiftProps = {
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
  tabIndex?: number;
};

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

export function CursorTrail() {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(-120);
  const y = useMotionValue(-120);

  useEffect(() => {
    if (reduceMotion || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    function handlePointerMove(event: PointerEvent) {
      x.set(event.clientX);
      y.set(event.clientY);
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [reduceMotion, x, y]);

  if (reduceMotion) {
    return null;
  }

  return (
    <div className="cursor-trail" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((index) => (
        <CursorDot index={index} key={index} x={x} y={y} />
      ))}
    </div>
  );
}

function CursorDot({
  index,
  x,
  y,
}: {
  index: number;
  x: MotionValue<number>;
  y: MotionValue<number>;
}) {
  const springX = useSpring(x, {
    stiffness: 460 - index * 54,
    damping: 34 + index * 5,
    mass: 0.24 + index * 0.1,
  });
  const springY = useSpring(y, {
    stiffness: 460 - index * 54,
    damping: 34 + index * 5,
    mass: 0.24 + index * 0.1,
  });

  return <motion.span style={{ x: springX, y: springY }} />;
}

export function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24, filter: "blur(10px)" }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.24 }}
      transition={{ duration: 0.72, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function TiltFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      whileHover={reduceMotion ? undefined : { rotate: -0.8, y: -8 }}
      transition={{ type: "spring", stiffness: 220, damping: 24 }}
    >
      {children}
    </motion.div>
  );
}

export function MagneticLink({
  children,
  className = "",
  href,
}: {
  children: ReactNode;
  className?: string;
  href: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.a
      className={className}
      href={href}
      whileHover={reduceMotion ? undefined : { x: 5 }}
      whileTap={reduceMotion ? undefined : { scale: 0.985 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
    >
      {children}
    </motion.a>
  );
}

export function HoverLift({ children, className = "", ariaLabel, tabIndex }: HoverLiftProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-label={ariaLabel}
      className={className}
      tabIndex={tabIndex}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      whileTap={reduceMotion ? undefined : { y: -1 }}
      transition={{ type: "spring", stiffness: 320, damping: 30, mass: 0.72 }}
    >
      {children}
    </motion.div>
  );
}

type PinnedStatement = {
  label: string;
  title: string;
  text: string;
};

export function PinnedFocus({ items }: { items: PinnedStatement[] }) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  if (reduceMotion) {
    return (
      <section className="pinned-focus reduced page-shell" ref={ref}>
        {items.map((item) => (
          <article className="pinned-card-static" key={item.title}>
            <span>{item.label}</span>
            <h2>{item.title}</h2>
            <p>{item.text}</p>
          </article>
        ))}
      </section>
    );
  }

  return (
    <section className="pinned-focus" ref={ref}>
      <div className="pinned-stage page-shell">
        <div className="pinned-counter">
          <span>scroll focus</span>
          <i>{items.length.toString().padStart(2, "0")}</i>
        </div>
        {items.map((item, index) => (
          <PinnedFrame
            index={index}
            item={item}
            key={item.title}
            progress={scrollYProgress}
            total={items.length}
          />
        ))}
      </div>
    </section>
  );
}

function PinnedFrame({
  index,
  item,
  progress,
  total,
}: {
  index: number;
  item: PinnedStatement;
  progress: MotionValue<number>;
  total: number;
}) {
  const step = 1 / total;
  const center = index * step + step / 2;
  const opacity = useTransform(
    progress,
    [Math.max(0, center - step * 0.72), center, Math.min(1, center + step * 0.72)],
    [0, 1, 0],
  );
  const y = useTransform(
    progress,
    [Math.max(0, center - step * 0.72), center, Math.min(1, center + step * 0.72)],
    [34, 0, -34],
  );

  return (
    <motion.article className="pinned-frame" style={{ opacity, y }}>
      <span>{item.label}</span>
      <h2>{item.title}</h2>
      <p>{item.text}</p>
    </motion.article>
  );
}
