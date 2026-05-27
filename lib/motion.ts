// ─────────────────────────────────────────────────
// Alıcılar Sigorta — Motion System
// Disciplined premium animations. Purposeful, not decorative.
// Every preset has a clear intent: reveal, emphasize, sequence.
// ─────────────────────────────────────────────────

import type { Variants, Transition } from "framer-motion";

/* ── Easings ────────────────────────────────────── */
// Apple-grade ease. Use this for everything unless you have a reason not to.
export const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];
// Subtle entry, no overshoot.
export const easeInOutSmooth: [number, number, number, number] = [0.65, 0, 0.35, 1];

/* ── Standard durations ─────────────────────────── */
export const dur = {
  micro: 0.25,
  fast: 0.45,
  base: 0.7,
  slow: 1.0,
  hero: 1.2,
} as const;

/* ── Spring presets ─────────────────────────────── */
export const spring = {
  soft: { type: "spring", stiffness: 120, damping: 20, mass: 0.8 } as Transition,
  snappy: { type: "spring", stiffness: 280, damping: 24 } as Transition,
  bouncy: { type: "spring", stiffness: 340, damping: 16 } as Transition,
};

/* ── Reveal: fadeUp (the workhorse) ─────────────── */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: dur.base, ease: easeOutExpo } },
};

/* ── Reveal: fadeUpBlur (premium first-impression) ─ */
export const fadeUpBlur: Variants = {
  hidden: { opacity: 0, y: 32, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: dur.slow, ease: easeOutExpo },
  },
};

/* ── Reveal: fadeRight (sequential lists) ───────── */
export const fadeRight: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0, transition: { duration: dur.base, ease: easeOutExpo } },
};

/* ── Reveal: scaleIn (hero / centerpiece) ───────── */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: dur.hero, ease: easeOutExpo } },
};

/* ── Stagger: row/grid orchestration ────────────── */
export const stagger = (childDelay = 0.08, initial = 0.1): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: childDelay, delayChildren: initial } },
});

/* ── Viewport options (use once: true for performance) ─ */
export const viewportOnce = { once: true, margin: "-80px" } as const;
export const viewportSnappy = { once: true, margin: "-40px" } as const;

/* ── Count-up easing for numeric reveals (use with custom hook) ─ */
export const countUpEase = (t: number) => 1 - Math.pow(1 - t, 3);

/* ── Hover lift (subtle, premium — not bouncy) ──── */
export const hoverLift = {
  whileHover: { y: -4, transition: { duration: dur.fast, ease: easeOutExpo } },
  whileTap: { scale: 0.98 },
} as const;

/* ── Underline draw (text accent) ───────────────── */
export const underlineDraw: Variants = {
  hidden: { scaleX: 0, originX: 0 },
  visible: { scaleX: 1, transition: { duration: dur.slow, ease: easeOutExpo, delay: 0.3 } },
};
