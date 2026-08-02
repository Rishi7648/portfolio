"use client";

import * as React from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { SectionReveal, StaggerGroup, staggerItem } from "./section-reveal";
import { STATS } from "@/lib/portfolio/data";
import Image from "next/image";
import { Globe } from "@/components/ui/globe";

/* ---------- Counter ---------- */
function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = React.useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v).toString());

  React.useEffect(() => {
    if (inView) {
      const controls = animate(count, value, {
        duration: 1.6,
        ease: [0.22, 1, 0.36, 1],
      });
      return controls.stop;
    }
  }, [inView, value, count]);

  return (
    <span ref={ref} className="inline-flex items-baseline">
      <motion.span>{rounded}</motion.span>
      <span className="text-gradient">{suffix}</span>
    </span>
  );
}

/* ---------- AnimatedParagraph ---------- */
interface AnimatedParagraphProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

const AnimatedParagraph: React.FC<AnimatedParagraphProps> = ({ text, className, style }) => {
  const ref = React.useRef<HTMLParagraphElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  const words = text.split(" ");

  return (
    <p ref={ref} className={className} style={style}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: i * 0.04,
            ease: [0.22, 1, 0.36, 1],
          }}
          // break-words prevents long/unbroken words from overflowing
          // the container on very narrow (<360px) screens
          className="inline-block whitespace-pre break-words"
        >
          {word}{" "}
        </motion.span>
      ))}
    </p>
  );
};

/* ---------- Stat Image Mapping ---------- */
const STAT_IMAGES: Record<string, string> = {
  "years of experience": "/experience.jpg",
  "projects completed": "/project.jpg",
  "happy clients": "/client.jpg",
};

function getStatImage(label: string) {
  const l = label.toLowerCase();
  return STAT_IMAGES[l] ?? "/experience.jpg"; // fallback, adjust if you add more stats
}

/* ---------- About section ---------- */
export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
      {/* px-4 on the smallest screens instead of a flat px-6 */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-10 sm:gap-12 lg:grid-cols-12 lg:items-start lg:gap-4">
          {/* LEFT: Text + Stats — negative right margin pulls text INTO the gap toward globe (lg+ only) */}
          <div className="lg:col-span-8 lg:-mr-8">
            <AnimatedParagraph
              className="text-lg leading-relaxed text-pretty sm:text-xl md:text-2xl text-neutral-950"
              style={{
                fontFamily: "'Quicksand', sans-serif",
                fontWeight: 700,
              }}
              text="I'm Hem Shrestha — the founder of wildstone Solution and a WordPress developer with years of hands-on experience crafting websites that don't just look great, but perform, rank, and convert. I build business websites, portfolio sites, blogs, and fully custom solutions tailored to each client's goals. My focus is on performance, SEO, responsiveness, and a polished user experience. I treat every project as a long-term partnership — from first call to post-launch optimization — and I'm committed to delivering quality digital solutions that help businesses grow sustainably."
            />

            {/* Stats cards — 1 col on phones, 2 from 480px, 3 from sm up.
                Previously used `xs:` which is NOT a default Tailwind breakpoint —
                replaced with the arbitrary `min-[480px]:` variant so it works
                without needing a custom tailwind.config screen. */}
            <StaggerGroup
              className="mt-10 sm:mt-12 grid grid-cols-1 gap-4 min-[480px]:grid-cols-2 sm:grid-cols-3"
              stagger={0.1}
            >
              {STATS.map((stat) => {
                const imageSrc = getStatImage(stat.label);
                return (
                  <motion.div
                    key={stat.label}
                    variants={staggerItem}
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="group relative overflow-visible rounded-2xl bg-white p-5 sm:p-6 ring-1 ring-neutral-200 hover:ring-neutral-400 hover:shadow-xl hover:shadow-neutral-300/30 transition-all min-w-0"
                  >
                    <div className="relative">
                      <div className="relative h-10 w-10 overflow-hidden transition-transform group-hover:scale-105">
                        <Image
                          src={imageSrc}
                          alt={stat.label}
                          fill
                          sizes="40px"
                          className="object-cover"
                        />
                      </div>

                      <p
                        className="mt-4 font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-950 md:text-4xl tabular-nums"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          letterSpacing: "-0.04em",
                        }}
                      >
                        <Counter value={stat.value} suffix={stat.suffix} />
                      </p>

                      <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-neutral-500 leading-snug">
                        {stat.label}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </StaggerGroup>
          </div>

          {/* RIGHT: Sticky Globe — centered on mobile, pushed right on desktop */}
          <div className="lg:col-span-4">
            <div className="flex justify-center lg:sticky lg:top-24 lg:flex lg:justify-end">
              <SectionReveal direction="up" delay={0.24}>
                <div className="relative mx-auto w-full max-w-[14rem] min-[480px]:max-w-[16rem] sm:max-w-[18rem] lg:mx-0 xl:translate-x-12">
                  <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-primary/20 to-amber-400/20 blur-3xl" />
                  <Globe className="opacity-90" />
                </div>
              </SectionReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
