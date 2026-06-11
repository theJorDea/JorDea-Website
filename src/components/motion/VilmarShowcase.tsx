"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import type { MotionValue } from "motion/react";
import {
  ChartLine,
  FileText,
  Rows,
  TreeStructure,
  Waveform,
} from "@phosphor-icons/react";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import type { ProjectData } from "@/data/siteData";

const projectIcons = {
  fileText: FileText,
  rows: Rows,
  treeStructure: TreeStructure,
  waveform: Waveform,
  chartLine: ChartLine,
};

const smoothScrollSpring = { stiffness: 150, damping: 34, mass: 0.42 };
const softOpacitySpring = { stiffness: 180, damping: 36, mass: 0.36 };

export function VilmarShowcase({ items }: { items: readonly ProjectData[] }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    container: wrapperRef,
  });

  useEffect(() => {
    const handleScrollUpdate = (latest: number) => {
      const maxIndex = items.length - 1;
      const segment = 1 / items.length;
      const index = Math.min(
        Math.max(Math.floor((latest + segment * 0.5) / segment), 0),
        maxIndex
      );
      setActiveIndex(index);
    };

    const unsubscribe = scrollYProgress.on("change", handleScrollUpdate);
    return () => unsubscribe();
  }, [scrollYProgress, items.length]);

  return (
    <div ref={wrapperRef} className="project-showcase-scroll">
      <div className="project-showcase-sticky">
        <div className="project-left-sticky">
          {items.map((item, idx) => {
            const isActive = idx === activeIndex;
            return (
              <MemoProjectTitleItem
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
            <MemoProjectDetailPanel
              index={index}
              item={item}
              key={item.title}
              progress={scrollYProgress}
              total={items.length}
            />
          ))}
        </div>
      </div>

      {items.map((_, i) => (
        <div key={i} className="project-snap-spacer" aria-hidden="true" />
      ))}
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

  const { inputRange, yRange, opacityRange, scaleRange } = useMemo(() => {
    const ir: number[] = [];
    const yr: number[] = [];
    const or: number[] = [];
    const sr: number[] = [];

    function addPoint(point: number, activeProjectIndex: number) {
      const clampedPoint = Math.min(Math.max(point, 0), 1);
      const distance = Math.abs(index - activeProjectIndex);

      if (ir.length && clampedPoint <= ir[ir.length - 1]) {
        return;
      }

      ir.push(clampedPoint);
      yr.push((index - activeProjectIndex) * titleGap);
      or.push(distance === 0 ? 1 : distance === 1 ? 0.34 : 0.16);
      sr.push(distance === 0 ? 1 : 0.96);
    }

    for (let p = 0; p < total; p++) {
      const segStart = p * step;
      const holdEnd = segStart + step * 0.85;
      const segEnd = (p + 1) * step;

      addPoint(p === 0 ? 0 : segStart, p);
      addPoint(holdEnd, p);

      if (p < total - 1) {
        addPoint(segEnd, p + 1);
      }
    }

    return { inputRange: ir, yRange: yr, opacityRange: or, scaleRange: sr };
  }, [index, step, total, titleGap]);

  const y = useTransform(progress, inputRange, yRange);
  const opacity = useTransform(progress, inputRange, opacityRange);
  const scale = useTransform(progress, inputRange, scaleRange);
  const smoothY = useSpring(y, smoothScrollSpring);
  const smoothOpacity = useSpring(opacity, softOpacitySpring);
  const smoothScale = useSpring(scale, smoothScrollSpring);

  return (
    <div
      className={
        isActive ? "project-title-slot is-active" : "project-title-slot"
      }
    >
      <motion.div
        className={
          isActive ? "project-title-item is-active" : "project-title-item"
        }
        style={{ y: smoothY, opacity: smoothOpacity, scale: smoothScale }}
      >
        <span>{item.status}</span>
        <strong>{item.title}</strong>
      </motion.div>
    </div>
  );
}

const MemoProjectTitleItem = memo(ProjectTitleItem);

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
  const reduceMotion = useReducedMotion();
  const articleRef = useRef<HTMLElement>(null);
  const isInView = useInView(articleRef, { amount: 0.3 });

  const step = 1 / total;
  const isFirst = index === 0;
  const isLast = index === total - 1;

  const { inputRange, opacityRange, yRange, scaleRange } = useMemo(() => {
    let ir: number[];
    let or: number[];
    let yr: number[];
    let sr: number[];

    const enterStart = isFirst ? 0 : (index - 1) * step + step * 0.85;
    const enterEnd = index * step;
    const holdEnd = index * step + step * 0.85;
    const exitEnd = isLast ? 1 : (index + 1) * step;

    if (isFirst) {
      ir = [0, holdEnd, exitEnd];
      or = [1, 1, 0];
      yr = [0, 0, -260];
      sr = [1, 1, 0.985];
    } else if (isLast) {
      ir = [enterStart, enterEnd, 1];
      or = [0, 1, 1];
      yr = [260, 0, 0];
      sr = [0.985, 1, 1];
    } else {
      ir = [enterStart, enterEnd, holdEnd, exitEnd];
      or = [0, 1, 1, 0];
      yr = [260, 0, 0, -260];
      sr = [0.985, 1, 1, 0.985];
    }

    return { inputRange: ir, opacityRange: or, yRange: yr, scaleRange: sr };
  }, [index, isFirst, isLast, step]);

  const opacity = useTransform(progress, inputRange, opacityRange);
  const y = useTransform(progress, inputRange, yRange);
  const scale = useTransform(progress, inputRange, scaleRange);
  const smoothOpacity = useSpring(opacity, softOpacitySpring);
  const smoothY = useSpring(y, smoothScrollSpring);
  const smoothScale = useSpring(scale, smoothScrollSpring);

  return (
    <motion.article
      ref={articleRef}
      className="project-detail-panel"
      style={{ opacity: smoothOpacity, y: smoothY, scale: smoothScale }}
    >
      <div className="project-row-top">
        <motion.div
          className="project-icon-motion"
          initial={false}
          animate={
            reduceMotion || !isInView
              ? undefined
              : { rotate: [0, -5, 0], y: [0, -3, 0] }
          }
          transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Icon size={30} weight="duotone" />
        </motion.div>
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

const MemoProjectDetailPanel = memo(ProjectDetailPanel);
