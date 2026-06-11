"use client";

import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import { useRef } from "react";

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

  const rightX = useTransform(scrollYProgress, [0, 0.42, 0.72], [0, 150, 1400]);
  const rightScale = useTransform(scrollYProgress, [0, 0.45, 0.72], [1, 1.12, 1.58]);
  const rightOpacity = useTransform(scrollYProgress, [0, 0.42, 0.65], [1, 0.55, 0]);

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

          <div className="intro-burger" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
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
      </div>
    </section>
  );
}
