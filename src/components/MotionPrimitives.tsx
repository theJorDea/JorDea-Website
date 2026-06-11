"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "motion/react";
import type { MotionValue } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import Snap from "lenis/snap";

/* Shared Lenis instance so sections (e.g. project snap) can hook into it. */
const lenisRef: { current: Lenis | null } = { current: null };

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
      anchors: {
        offset: -72,
      },
    });

    lenisRef.current = lenis;

    let frame = 0;

    function raf(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    }

    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return null;
}

/* --- STAGGERED WORD REVEAL (masked lines) --- */
export function WordReveal({
  text,
  className = "",
  delay = 0,
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "span" | "h1" | "h2";
}) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  if (reduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={`word-reveal ${className}`} aria-label={text}>
      {words.map((word, index) => (
        <span className="word-mask" key={`${word}-${index}`} aria-hidden="true">
          <motion.span
            className="word-inner"
            initial={{ y: "112%", rotate: 5 }}
            animate={{ y: "0%", rotate: 0 }}
            transition={{
              duration: 0.92,
              delay: delay + index * 0.085,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/* --- HERO ENTRANCE (staggered fade for kicker / lead / actions) --- */
export function HeroEntrance({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28, filter: "blur(8px)" }}
      animate={reduceMotion ? undefined : { opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.96, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* --- BIG FOOTER NAME (scroll-linked outline type) --- */
export function FooterName() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="footer-name-wrap" aria-hidden="true">
      <motion.span
        className="footer-name"
        initial={reduceMotion ? false : { y: "42%", opacity: 0 }}
        whileInView={reduceMotion ? undefined : { y: "0%", opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        JorDea
      </motion.span>
    </div>
  );
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
        target.closest(".hover-lift-container") !== null;

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
          <span className="hero-side-kicker">Risk workflow</span>
          <h2>От рыночных данных до проверенной риск-метрики</h2>
          <p>
            Собираю модели полностью: данные, оценка волатильности, расчёт VaR/ES,
            бэктестинг и честный разбор того, где модель ошибается.
          </p>
          <p>Фокус: Quant Risk, кредитный скоринг, Python и ML.</p>
        </motion.aside>

        <motion.div className="scroll-hint" style={{ opacity: introHeaderOpacity }}>
          Scroll to explore
        </motion.div>
      </div>
    </section>
  );
}



/* --- PROJECT SHOWCASE (title left / description right, one scroll = one project) --- */
type ProjectData = {
  title: string;
  status: string;
  text: string;
  stack: readonly string[];
};

const panelEase = [0.22, 1, 0.36, 1] as const;
const smoothScrollSpring = { stiffness: 150, damping: 34, mass: 0.42 };
const softOpacitySpring = { stiffness: 180, damping: 36, mass: 0.36 };

export function ProjectShowcase({ items }: { items: readonly ProjectData[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Discrete active index: each project owns an equal slice of the scroll range.
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const index = Math.min(
        Math.max(Math.round(latest * (items.length - 1)), 0),
        items.length - 1
      );
      setActiveIndex(index);
    });
    return () => unsubscribe();
  }, [scrollYProgress, items.length]);

  // Lenis snap points: one viewport step per project, so a single scroll
  // settles on the next/previous project (poly-block style).
  useEffect(() => {
    const container = containerRef.current;
    const lenis = lenisRef.current;
    if (!container || !lenis) return;
    if (window.matchMedia("(max-width: 1024px)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const snap = new Snap(lenis, {
      type: "proximity",
      distanceThreshold: "62%",
      duration: 0.78,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
      debounce: 160,
    });

    let removers: (() => void)[] = [];

    function setPoints() {
      removers.forEach((remove) => remove());
      removers = [];
      if (!container) return;
      const top = container.getBoundingClientRect().top + window.scrollY;
      const step =
        (container.offsetHeight - window.innerHeight) / (items.length - 1);
      for (let i = 0; i < items.length; i += 1) {
        removers.push(snap.add(top + i * step));
      }
    }

    setPoints();
    window.addEventListener("resize", setPoints);

    return () => {
      window.removeEventListener("resize", setPoints);
      removers.forEach((remove) => remove());
      snap.destroy();
    };
  }, [items.length]);

  const active = items[activeIndex];

  return (
    <div
      ref={containerRef}
      className="project-showcase-container"
      style={{ "--project-count": items.length } as CSSProperties}
    >
      <div className="project-showcase-sticky">
        <div className="project-stage-left">
          <span className="project-counter">
            {String(activeIndex + 1).padStart(2, "0")}
            <em>/ {String(items.length).padStart(2, "0")}</em>
          </span>

          <AnimatePresence mode="wait">
            <motion.h3
              animate={{ y: "0%", opacity: 1 }}
              className="project-stage-title"
              exit={{ y: "-46%", opacity: 0 }}
              initial={{ y: "52%", opacity: 0 }}
              key={active.title}
              transition={{ duration: 0.52, ease: panelEase }}
            >
              {active.title}
            </motion.h3>
          </AnimatePresence>

          <div className="project-progress" aria-hidden="true">
            {items.map((item, index) => (
              <span
                className={index === activeIndex ? "is-active" : undefined}
                key={item.title}
              />
            ))}
          </div>
        </div>

        <div className="project-stage-right">
          <AnimatePresence mode="wait">
            <motion.div
              animate={{ y: 0, opacity: 1 }}
              className="project-stage-detail"
              exit={{ y: -34, opacity: 0 }}
              initial={{ y: 44, opacity: 0 }}
              key={active.title}
              transition={{ duration: 0.52, ease: panelEase, delay: 0.05 }}
            >
              <span className="project-stage-status">{active.status}</span>
              <p>{active.text}</p>
              <div className="stack-tags">
                {active.stack.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Static fallback list for mobile / stacked layout */}
      <div className="project-static-list">
        {items.map((item) => (
          <article className="project-static-item" key={item.title}>
            <span className="project-stage-status">{item.status}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <div className="stack-tags">
              {item.stack.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
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
  const smoothOpacity = useSpring(opacity, softOpacitySpring);
  const smoothY = useSpring(y, smoothScrollSpring);
  const smoothBlur = useSpring(blurValue, smoothScrollSpring);
  const filter = useMotionTemplate`blur(${smoothBlur}px)`;

  return (
    <motion.article className="pinned-frame" style={{ opacity: smoothOpacity, y: smoothY, filter }}>
      <span className="plain-kicker">{item.label}</span>
      <h2>{item.title}</h2>
    </motion.article>
  );
}
