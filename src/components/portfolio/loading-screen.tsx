"use client";

import * as React from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";

const NAME = "Portfolio";
const LETTER_STAGGER = 0.12;
const LETTER_DURATION = 0.45;
const HOLD_AFTER = 250;
const ENTRANCE_DELAY = 0.2;

const LETTER_START_DELAY = ENTRANCE_DELAY;
const LAST_LETTER_DELAY = LETTER_START_DELAY + (NAME.length - 1) * LETTER_STAGGER;
const TOTAL_REVEAL_TIME = LAST_LETTER_DELAY + LETTER_DURATION;

const COUNTDOWN_DURATION = TOTAL_REVEAL_TIME - ENTRANCE_DELAY;

const letterVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: LETTER_START_DELAY + i * LETTER_STAGGER,
      duration: LETTER_DURATION,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  }),
};

type LoadingScreenProps = {
  onComplete?: () => void;
};

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [phase, setPhase] = React.useState<"active" | "done">("active");

  const countMV = useMotionValue(100);
  const rounded = useTransform(countMV, (v) => Math.max(0, Math.round(v)).toString());

  React.useEffect(() => {
    const controls = animate(countMV, 0, {
      duration: COUNTDOWN_DURATION,
      delay: ENTRANCE_DELAY,
      ease: "linear",
    });
    // Dismiss on a normal timer instead of relying on the motion animation's
    // completion callback, so the page is always revealed if that animation
    // is interrupted or throttled by the browser.
    const finishTimer = window.setTimeout(() => {
      setPhase("done");
      onComplete?.();
    }, TOTAL_REVEAL_TIME * 1000 + HOLD_AFTER);

    return () => {
      controls.stop();
      window.clearTimeout(finishTimer);
    };
  }, [countMV, onComplete]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="loader"
          // Dropped `w-[100vw]` — `fixed` + `inset-0` already sizes this to
          // fill the viewport exactly. `100vw` can measure wider than the
          // visible viewport when a scrollbar reserves space, which conflicts
          // with `right: 0` from inset-0 and can trigger a stray horizontal
          // scrollbar on desktop-width browsers while this is mounted.
          className="fixed inset-0 z-[100] hidden h-[100dvh] items-center justify-center overflow-hidden bg-white md:flex"
          initial={{ y: 0 }}
          exit={{ y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
        >
          <div className="pointer-events-none absolute inset-0 grid-pattern opacity-20" />
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 gradient-blob rounded-full opacity-20" />

          <div className="relative inline-block px-4">
            <motion.h1
              className="relative flex justify-center text-center font-display font-black tracking-tight text-neutral-950 text-[clamp(2.5rem,15vw,9rem)] whitespace-nowrap"
              animate={{ scale: [1, 1, 1.03], transition: { duration: TOTAL_REVEAL_TIME + (HOLD_AFTER/1000), times: [0, 0.8, 1] } }}
            >
              {NAME.split("").map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate="visible"
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}

              <motion.span
                initial={{ opacity: 0, x: "-150%" }}
                animate={{ opacity: [0, 1, 0], x: "150%" }}
                transition={{ duration: 0.9, delay: TOTAL_REVEAL_TIME + 0.15, ease: "easeOut" }}
                className="pointer-events-none absolute inset-y-0 left-0 w-1/3 skew-x-[-20deg]"
                style={{
                  background:
                    "linear-gradient(100deg, transparent 20%, oklch(1 0 0 / 0.85) 50%, transparent 80%)",
                  mixBlendMode: "overlay",
                }}
              />
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: ENTRANCE_DELAY, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-[max(1rem,5vw)] right-[max(1rem,5vw)]"
          >
            <motion.span
              className="block font-display font-black leading-none tabular-nums text-neutral-950 text-[clamp(1.5rem,8vw,6rem)]"
              animate={{ opacity: [1, 1, 0], transition: { duration: TOTAL_REVEAL_TIME + (HOLD_AFTER/1000), times: [0, 0.85, 1] } }}
            >
              {rounded}
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
