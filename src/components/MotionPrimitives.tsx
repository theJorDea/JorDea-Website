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
import type { CSSProperties, ReactNode } from "react";
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
        target.closest(".project-detail-panel") !== null;

      if (isClickable !== isHovering.current) {
        isHovering.current = isClickable;
        setHovered(isClickable);
      }
    }

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [reduceMotion, x, y]);

  const springX = useSpring(x, { stiffness: 260, damping: 32, mass: 0.45 });
  const springY = useSpring(y, { stiffness: 260, damping: 32, mass: 0.45 });

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
    offset: ["start start", "end end"],
  });

  const heroX = useTransform(scrollYProgress, [0, 0.45, 0.75], [0, -120, -520]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.45, 0.7], [1, 0.55, 0]);
  const heroBlur = useTransform(scrollYProgress, [0, 0.55, 0.8], [0, 8, 24]);
  const heroFilter = useMotionTemplate`blur(${heroBlur}px)`;

  const introHeaderOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const introHeaderY = useTransform(scrollYProgress, [0, 0.35], [0, -24]);
  return (
    <section ref={containerRef} className="hero-scroll-scene" id="home">
      <div className="hero-sticky-stage">
        <motion.header
          className="intro-header"
          style={{ opacity: introHeaderOpacity, y: introHeaderY }}
        >
          <a className="intro-brand" href="#home">
            <span>JorDea</span>
          </a>

          <button className="intro-burger" type="button" aria-label="Меню">
            <span />
            <span />
            <span />
          </button>
        </motion.header>

        <motion.div
          className="page-shell hero-container-poly"
          style={{
            x: heroX,
            opacity: heroOpacity,
            filter: heroFilter,
          }}
        >
          {children}
        </motion.div>

        <motion.div className="scroll-hint" style={{ opacity: introHeaderOpacity }}>
          Scroll to explore
        </motion.div>
      </div>
    </section>
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
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const handleScrollUpdate = (latest: number) => {
      const maxIndex = items.length - 1;
      const index = Math.min(
        Math.max(Math.round(latest * maxIndex), 0),
        maxIndex
      );
      setActiveIndex(index);
    };

    const unsubscribe = scrollYProgress.on("change", handleScrollUpdate);
    return () => unsubscribe();
  }, [scrollYProgress, items.length]);

  return (
    <div
      ref={containerRef}
      className="project-showcase-container"
      style={{ "--project-count": items.length } as CSSProperties}
    >
      <div className="project-showcase-sticky">
        <div className="project-left-sticky">
          {items.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                className={isActive ? "project-title-item is-active" : "project-title-item"}
                key={item.title}
                type="button"
              >
                <span>{item.status}</span>
                <strong>{item.title}</strong>
              </button>
            );
          })}
        </div>

        <div className="project-right-stage">
          {items.map((item, index) => (
            <ProjectDetailPanel
              index={index}
              item={item}
              key={item.title}
              progress={scrollYProgress}
              total={items.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectDetailPanel({
  index,
  item,
  progress,
  total,
}: {
  index: number;
  item: ProjectData;
  progress: MotionValue<number>;
  total: number;
}) {
  const Icon = projectIcons[item.icon];

  const step = total > 1 ? 1 / (total - 1) : 1;
  const center = total > 1 ? index / (total - 1) : 0;

  const isFirst = index === 0;
  const isLast = index === total - 1;

  let inputRange: number[];
  let opacityRange: number[];
  let yRange: number[];
  let scaleRange: number[];
  let blurRange: number[];

  if (isFirst) {
    const end = Math.min(1, step * 0.72);

    inputRange = [0, end];
    opacityRange = [1, 0];
    yRange = [0, -84];
    scaleRange = [1, 0.97];
    blurRange = [0, 14];
  } else if (isLast) {
    const start = Math.max(0, 1 - step * 0.72);

    inputRange = [start, 1];
    opacityRange = [0, 1];
    yRange = [84, 0];
    scaleRange = [0.97, 1];
    blurRange = [14, 0];
  } else {
    const start = Math.max(0, center - step * 0.72);
    const end = Math.min(1, center + step * 0.72);

    inputRange = [start, center, end];
    opacityRange = [0, 1, 0];
    yRange = [84, 0, -84];
    scaleRange = [0.97, 1, 0.97];
    blurRange = [14, 0, 14];
  }

  const opacity = useTransform(progress, inputRange, opacityRange);
  const y = useTransform(progress, inputRange, yRange);
  const scale = useTransform(progress, inputRange, scaleRange);
  const blurValue = useTransform(progress, inputRange, blurRange);
  const filter = useMotionTemplate`blur(${blurValue}px)`;

  return (
    <motion.article className="project-detail-panel" style={{ opacity, y, scale, filter }}>
      <div className="project-row-top">
        <Icon size={30} weight="duotone" />
        <span className="project-row-status">{item.status}</span>
      </div>

      <div className="project-row-body">
        <h3>{item.title}</h3>
        <p>{item.text}</p>

        <div className="stack-tags">
          {item.stack.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>
    </motion.article>
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
