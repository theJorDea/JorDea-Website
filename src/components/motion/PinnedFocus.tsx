"use client";

import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import { memo, useMemo, useRef } from "react";
import type { PinnedStatement } from "@/data/siteData";

const smoothScrollSpring = { stiffness: 150, damping: 34, mass: 0.42 };
const softOpacitySpring = { stiffness: 180, damping: 36, mass: 0.36 };

export function PinnedFocus({ items }: { items: readonly PinnedStatement[] }) {
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
          <MemoPinnedFrame
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

  const { inputRange, opacityRange, yRange } = useMemo(() => {
    let ir: number[];
    let or: number[];
    let yr: number[];

    if (isFirst) {
      ir = [0, holdEnd, exitEnd, 1];
      or = [1, 1, 0, 0];
      yr = [0, 0, -96, -96];
    } else if (isLast) {
      ir = [0, enterStart, enterEnd, 1];
      or = [0, 0, 1, 1];
      yr = [96, 96, 0, 0];
    } else {
      ir = [enterStart, enterEnd, holdEnd, exitEnd];
      or = [0, 1, 1, 0];
      yr = [96, 0, 0, -96];
    }

    return { inputRange: ir, opacityRange: or, yRange: yr };
  }, [enterEnd, enterStart, exitEnd, holdEnd, isFirst, isLast]);

  const opacity = useTransform(progress, inputRange, opacityRange);
  const y = useTransform(progress, inputRange, yRange);
  const smoothOpacity = useSpring(opacity, softOpacitySpring);
  const smoothY = useSpring(y, smoothScrollSpring);

  return (
    <motion.article className="pinned-frame" style={{ opacity: smoothOpacity, y: smoothY }}>
      <span className="plain-kicker">{item.label}</span>
      <h2>{item.title}</h2>
    </motion.article>
  );
}

const MemoPinnedFrame = memo(PinnedFrame);
