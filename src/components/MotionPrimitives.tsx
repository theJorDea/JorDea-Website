"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useScroll,
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

  const titleXValue = useTransform(scrollYProgress, [0, 0.42, 0.78], [0, -130, -860]);
  const titleX = useMotionTemplate`${titleXValue}px`;
  const titleScale = useTransform(scrollYProgress, [0, 0.45, 0.78], [1, 1.08, 1.58]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.5, 0.78], [1, 0.82, 0]);

  const supportYValue = useTransform(scrollYProgress, [0, 0.42, 0.78], [0, 130, 620]);
  const supportY = useMotionTemplate`${supportYValue}px`;
  const supportScale = useTransform(scrollYProgress, [0, 0.45, 0.78], [1, 1.12, 1.56]);
  const supportOpacity = useTransform(scrollYProgress, [0, 0.48, 0.78], [1, 0.72, 0]);

  const kickerYValue = useTransform(scrollYProgress, [0, 0.42, 0.78], [0, -84, -360]);
  const kickerY = useMotionTemplate`${kickerYValue}px`;
  const kickerScale = useTransform(scrollYProgress, [0, 0.45, 0.78], [1, 1.08, 1.42]);
  const kickerOpacity = useTransform(scrollYProgress, [0, 0.46, 0.78], [1, 0.68, 0]);

  const rightX = useTransform(scrollYProgress, [0, 0.42, 0.78], [0, 150, 780]);
  const rightScale = useTransform(scrollYProgress, [0, 0.45, 0.78], [1, 1.12, 1.58]);
  const rightOpacity = useTransform(scrollYProgress, [0, 0.48, 0.78], [1, 0.78, 0]);
  const rightBlur = useTransform(scrollYProgress, [0, 0.55, 0.82], [0, 5, 18]);
  const rightFilter = useMotionTemplate`blur(${rightBlur}px)`;

  const introHeaderOpacity = useTransform(scrollYProgress, [0, 0.32], [1, 0]);
  const introHeaderY = useTransform(scrollYProgress, [0, 0.34], [0, -132]);
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
          style={
            {
              "--hero-title-x": titleX,
              "--hero-title-scale": titleScale,
              "--hero-title-opacity": titleOpacity,
              "--hero-support-y": supportY,
              "--hero-support-scale": supportScale,
              "--hero-support-opacity": supportOpacity,
              "--hero-kicker-y": kickerY,
              "--hero-kicker-scale": kickerScale,
              "--hero-kicker-opacity": kickerOpacity,
            } as CSSProperties
          }
        >
          {children}
        </motion.div>

        <motion.aside
          className="hero-side-copy"
          style={{
            x: rightX,
            scale: rightScale,
            opacity: rightOpacity,
            filter: rightFilter,
          }}
        >
          <span className="hero-side-kicker">ML workflow</span>
          <h2>От данных до работающего демо</h2>
          <p>
            Учусь собирать ML-прототипы полностью: подготовка данных, обучение модели,
            проверка метрик, разбор ошибок и аккуратный API для тестирования.
          </p>
          <p>Фокус: NLP, PyTorch, Deep Learning, RAG и Audio ML.</p>
        </motion.aside>

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
      const segment = 1 / items.length;
      const index = Math.min(
        Math.max(Math.floor((latest + segment * 0.18) / segment), 0),
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
              <ProjectTitleItem
                index={idx}
                isActive={isActive}
                item={item}
                key={item.title}
                progress={scrollYProgress}
                total={items.length}
              />
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

function ProjectTitleItem({
  index,
  isActive,
  item,
  progress,
  total,
}: {
  index: number;
  isActive: boolean;
  item: ProjectData;
  progress: MotionValue<number>;
  total: number;
}) {
  const step = 1 / total;
  const titleGap = 168;
  const inputRange: number[] = [];
  const yRange: number[] = [];
  const opacityRange: number[] = [];
  const scaleRange: number[] = [];
  const blurRange: number[] = [];

  function addPoint(point: number, activeProjectIndex: number) {
    const clampedPoint = Math.min(Math.max(point, 0), 1);
    const distance = Math.abs(index - activeProjectIndex);

    if (inputRange.length && clampedPoint <= inputRange[inputRange.length - 1]) {
      return;
    }

    inputRange.push(clampedPoint);
    yRange.push((index - activeProjectIndex) * titleGap);
    opacityRange.push(distance === 0 ? 1 : distance === 1 ? 0.34 : 0.16);
    scaleRange.push(distance === 0 ? 1 : 0.96);
    blurRange.push(distance === 0 ? 0 : distance === 1 ? 5 : 8);
  }

  for (let projectIndex = 0; projectIndex < total; projectIndex += 1) {
    const start = projectIndex * step;
    const holdStart = projectIndex === 0 ? 0 : start + step * 0.08;
    const holdEnd = start + step * 0.72;
    const transitionEnd = start + step * 0.96;

    addPoint(holdStart, projectIndex);
    addPoint(holdEnd, projectIndex);

    if (projectIndex < total - 1) {
      addPoint(transitionEnd, projectIndex + 1);
    }
  }

  const y = useTransform(progress, inputRange, yRange);
  const opacity = useTransform(progress, inputRange, opacityRange);
  const scale = useTransform(progress, inputRange, scaleRange);
  const blurValue = useTransform(progress, inputRange, blurRange);
  const filter = useMotionTemplate`blur(${blurValue}px)`;

  return (
    <div className={isActive ? "project-title-slot is-active" : "project-title-slot"}>
      <motion.button
        className={isActive ? "project-title-item is-active" : "project-title-item"}
        style={{ y, opacity, scale, filter }}
        type="button"
      >
        <span>{item.status}</span>
        <strong>{item.title}</strong>
      </motion.button>
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

  const step = 1 / total;
  const start = index * step;
  const enterStart = start + step * 0.24;
  const enterEnd = start + step * 0.42;
  const holdEnd = start + step * 0.72;
  const exitEnd = start + step * 0.9;

  const isFirst = index === 0;
  const isLast = index === total - 1;

  let inputRange: number[];
  let opacityRange: number[];
  let yRange: number[];
  let scaleRange: number[];
  let blurRange: number[];

  if (isFirst) {
    inputRange = [0, enterStart, enterEnd, holdEnd, exitEnd];
    opacityRange = [0, 0, 1, 1, 0];
    yRange = [170, 170, 0, 0, -170];
    scaleRange = [0.96, 0.96, 1, 1, 0.96];
    blurRange = [18, 18, 0, 0, 18];
  } else if (isLast) {
    inputRange = [enterStart, enterEnd, 1];
    opacityRange = [0, 1, 1];
    yRange = [170, 0, 0];
    scaleRange = [0.96, 1, 1];
    blurRange = [18, 0, 0];
  } else {
    inputRange = [enterStart, enterEnd, holdEnd, exitEnd];
    opacityRange = [0, 1, 1, 0];
    yRange = [170, 0, 0, -170];
    scaleRange = [0.96, 1, 1, 0.96];
    blurRange = [18, 0, 0, 18];
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
  const start = index * step;
  const enterStart = index === 0 ? 0 : start - step * 0.08;
  const enterEnd = start + step * 0.08;
  const holdEnd = start + step * 0.74;
  const exitEnd = start + step * 0.92;
  const isFirst = index === 0;
  const isLast = index === total - 1;

  let inputRange: number[];
  let opacityRange: number[];
  let yRange: number[];
  let blurRange: number[];

  if (isFirst) {
    inputRange = [0, holdEnd, exitEnd, 1];
    opacityRange = [1, 1, 0, 0];
    yRange = [0, 0, -96, -96];
    blurRange = [0, 0, 18, 18];
  } else if (isLast) {
    inputRange = [0, enterStart, enterEnd, 1];
    opacityRange = [0, 0, 1, 1];
    yRange = [96, 96, 0, 0];
    blurRange = [18, 18, 0, 0];
  } else {
    inputRange = [enterStart, enterEnd, holdEnd, exitEnd];
    opacityRange = [0, 1, 1, 0];
    yRange = [96, 0, 0, -96];
    blurRange = [18, 0, 0, 18];
  }

  const opacity = useTransform(progress, inputRange, opacityRange);
  const y = useTransform(progress, inputRange, yRange);
  const blurValue = useTransform(progress, inputRange, blurRange);
  const filter = useMotionTemplate`blur(${blurValue}px)`;

  return (
    <motion.article className="pinned-frame" style={{ opacity, y, filter }}>
      <span className="plain-kicker">{item.label}</span>
      <h2>{item.title}</h2>
    </motion.article>
  );
}
