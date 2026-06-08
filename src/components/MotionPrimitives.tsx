"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "motion/react";
import {
  ChartLine,
  FileText,
  Rows,
  TreeStructure,
  Waveform,
} from "@phosphor-icons/react";
import type { MotionValue } from "motion/react";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";

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

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}

export function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const x = useMotionValue(-120);
  const y = useMotionValue(-120);
  const [hovered, setHovered] = useState(false);
  const isHovering = useRef(false);

  useEffect(() => {
    if (reduceMotion || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    function handlePointerMove(event: PointerEvent) {
      x.set(event.clientX);
      y.set(event.clientY);

      const target = event.target as HTMLElement;
      const isClickable =
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        target.closest(".hover-lift-container") !== null ||
        target.closest(".project-row-item") !== null;

      if (isClickable !== isHovering.current) {
        isHovering.current = isClickable;
        setHovered(isClickable);
      }
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [reduceMotion, x, y]);

  const springX = useSpring(x, { stiffness: 500, damping: 28, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 500, damping: 28, mass: 0.2 });

  if (reduceMotion) {
    return null;
  }

  return (
    <motion.div
      className={`custom-cursor ${hovered ? "active" : ""}`}
      style={{ left: springX, top: springY, x: "-50%", y: "-50%" }}
      aria-hidden="true"
    />
  );
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
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const background = useMotionTemplate`radial-gradient(
    300px circle at ${mouseX}px ${mouseY}px,
    rgba(255, 255, 255, 0.05),
    transparent 80%
  )`;

  return (
    <motion.div
      aria-label={ariaLabel}
      className={`hover-lift-container ${className}`}
      tabIndex={tabIndex}
      onMouseMove={handleMouseMove}
      whileHover={reduceMotion ? undefined : { y: -2 }}
      transition={{ type: "spring", stiffness: 320, damping: 30, mass: 0.72 }}
    >
      <motion.div className="spotlight-overlay" style={{ background }} />
      {children}
    </motion.div>
  );
}

/* --- POLY-BLOCK STYLE HERO ANIMATION --- */
export function PolyHero({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 0.6], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const blurValue = useTransform(scrollYProgress, [0, 0.5], [0, 15]);
  const filter = useMotionTemplate`blur(${blurValue}px)`;

  return (
    <div ref={containerRef} className="hero-section" id="home">
      <motion.div style={{ x, opacity, filter }} className="page-shell hero-container-poly">
        {children}
      </motion.div>
    </div>
  );
}


/* --- VILMAR FERNANDES STYLE PROJECT SHOWCASE --- */
type ProjectIconName =
  | "fileText"
  | "rows"
  | "treeStructure"
  | "waveform"
  | "chartLine";

type ProjectData = {
  title: string;
  status: string;
  text: string;
  stack: readonly string[];
  icon: ProjectIconName;
};

const projectIcons = {
  fileText: FileText,
  rows: Rows,
  treeStructure: TreeStructure,
  waveform: Waveform,
  chartLine: ChartLine,
};

export function VilmarShowcase({ items }: { items: readonly ProjectData[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  useEffect(() => {
    const handleScrollUpdate = (latest: number) => {
      const index = Math.min(
        Math.floor(latest * items.length),
        items.length - 1
      );
      if (index >= 0) {
        setActiveIndex(index);
      }
    };

    const unsubscribe = scrollYProgress.on("change", handleScrollUpdate);
    return () => unsubscribe();
  }, [scrollYProgress, items.length]);

  return (
    <div ref={containerRef} className="project-showcase-container">
      {/* LEFT COLUMN: Sticky Titles */}
      <div className="project-left-sticky">
        {items.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div
              key={item.title}
              className={`project-title-item ${isActive ? "mobile-active" : ""}`}
              style={{
                opacity: isActive ? 1 : 0.15,
                filter: isActive ? "blur(0px)" : "blur(4px)",
                transform: isActive ? "scale(1.02) translateX(8px)" : "scale(1) translateX(0px)",
              }}
            >
              <span className="plain-kicker">{item.status}</span>
              <h3>{item.title}</h3>
            </div>
          );
        })}
      </div>

      {/* RIGHT COLUMN: Scrolling details */}
      <div className="project-right-scroll">
        {items.map((item) => {
          const Icon = projectIcons[item.icon];
          return (
            <div className="project-row-item" key={item.title}>
              <div className="project-row-top">
                <Icon size={32} weight="duotone" />
                <span className="project-row-status">{item.status}</span>
              </div>
              <div className="project-row-body">
                <p>{item.text}</p>
                <div className="stack-tags">
                  {item.stack.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* --- PINNED STATEMENTS --- */
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
      <section className="pinned-focus page-shell" ref={ref}>
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
    [Math.max(0, center - step * 0.5), center, Math.min(1, center + step * 0.5)],
    [0, 1, 0]
  );
  const y = useTransform(
    progress,
    [Math.max(0, center - step * 0.5), center, Math.min(1, center + step * 0.5)],
    [30, 0, -30]
  );
  const blurValue = useTransform(
    progress,
    [Math.max(0, center - step * 0.5), center, Math.min(1, center + step * 0.5)],
    [10, 0, 10]
  );
  const filter = useMotionTemplate`blur(${blurValue}px)`;

  return (
    <motion.article className="pinned-frame" style={{ opacity, y, filter }}>
      <span className="plain-kicker">{item.label}</span>
      <h2>{item.title}</h2>
      <p>{item.text}</p>
    </motion.article>
  );
}
