"use client";

import Image from "next/image";
import { motion } from "framer-motion";

type Social = {
  label: string;
  href: string;
  image: string;
  handle: string;
  accent: string;
};

const SOCIALS: Social[] = [
  {
    label: "Phone",
    href: "https://wa.me/9779851049353",
    image: "/contact/phone.jpg",
    handle: "+977 985-104-9353",
    accent: "#25D366",
  },
  {
    label: "Email",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=rhs.meh@gmail.com",
    image: "/contact/mail.jpg",
    handle: "rhs.meh@gmail.com",
    accent: "#EA4335",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/hem.shr/",
    image: "/contact/instagram.jpg",
    handle: "@hem.shr",
    accent: "#E1306C",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/hem.shr1",
    image: "/contact/facebook.jpg",
    handle: "hem.shr1",
    accent: "#1877F2",
  },
  {
    label: "Linkedin",
    href: "https://www.linkedin.com/in/hem-shrestha/?isSelfProfile=false",
    image: "/contact/linkedin.jpg",
    handle: "Hem Shrestha",
    accent: "#0A66C2",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.3, y: 40, rotate: -12 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotate: 0,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 14,
      mass: 0.9,
    },
  },
};

export function Contact() {
  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full gradient-blob opacity-15" />
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-balance text-foreground">
          Get in Touch
        </h2>
        <p className="mt-3 text-base sm:text-lg font-medium text-foreground text-balance">
          Let&apos;s build something great
        </p>

        <style>{`
          .wildstone-contact-card,
          .wildstone-contact-card * {
            cursor: pointer !important;
          }
          .wildstone-contact-card:hover {
            border-color: var(--accent) !important;
            box-shadow: 0 16px 32px color-mix(in srgb, var(--accent) 28%, transparent);
          }
        `}</style>

        {/* flex-wrap layout: with 4 items per row (desktop) / 2 per row
            (mobile), each full row's item widths already sum to exactly
            100% (calc() accounts for gaps), so justify-start has zero
            effect on those full rows. It only matters for the leftover
            5th item (Linkedin), pinning it to the start of its row —
            i.e. directly under the first card (Phone) — instead of
            floating in the row's center. */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="mt-10 flex flex-wrap justify-start gap-4 max-w-2xl"
        >
          {SOCIALS.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              style={{ ["--accent" as string]: s.accent } as React.CSSProperties}
              className="wildstone-contact-card group flex w-[calc(50%-0.5rem)] sm:w-[calc(25%-0.75rem)] cursor-pointer flex-col items-center gap-3 rounded-2xl border border-border/60 bg-muted/30 p-5 text-center transition-colors duration-300"
            >
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  // Deterministic delay based on index instead of Math.random().
                  // Math.random() during render produces a different value on
                  // the server vs. the client, causing a Next.js hydration
                  // mismatch. This keeps the staggered float effect without it.
                  delay: i * 0.12,
                }}
                whileHover={{ rotate: 8, scale: 1.15 }}
                className="h-11 w-11 overflow-hidden rounded-full ring-1 ring-border/50 shadow-sm"
              >
                <Image
                  src={s.image}
                  alt={s.label}
                  width={44}
                  height={44}
                  className="h-full w-full object-cover"
                />
              </motion.div>
              <div>
                <p className="text-sm font-semibold text-foreground">{s.label}</p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}