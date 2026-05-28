"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowDown, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { useContent } from "@/lib/content-context";
import {
  fadeUp,
  fadeUpBlur,
  stagger,
  easeOutExpo,
  spring,
} from "@/lib/motion";
import CountUp from "./CountUp";

/**
 * Hero — Editorial magazine cover.
 *
 * Layout is a magazine's front page:
 * masthead row → heavy editorial rule → asymmetric headline+image grid →
 * drop-cap lede paragraph → dual CTA → editorial stat table below.
 *
 * Inspired by Wallpaper/Monocle covers. No carousel, no decorative animation
 * loops. Single subtle float on the shield image only.
 */
export default function Hero() {
  const { content } = useContent();
  const { hero } = content;
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // Very subtle parallax on the shield image — disciplined, not theatrical.
  const shieldY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const scrollToNext = () => {
    const next = document.getElementById("how-it-works");
    if (next) {
      next.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" });
    }
  };

  const today = new Date();
  const dateStr = today
    .toLocaleDateString("tr-TR", { day: "2-digit", month: "long", year: "numeric" })
    .toLocaleUpperCase("tr-TR");

  return (
    <section
      ref={sectionRef}
      className="ed-hero"
      style={{
        position: "relative",
        backgroundColor: "var(--paper-soft)",
        overflow: "hidden",
      }}
    >
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* MASTHEAD ROW — magazine masthead */}
        <motion.div
          variants={stagger(0.05, 0)}
          initial="hidden"
          animate="visible"
          className="masthead"
        >
          <motion.span variants={fadeUp}>Alıcılar &nbsp;·&nbsp; Sigorta</motion.span>
          <motion.span variants={fadeUp} className="masthead-center">
            Issue 01 — Türkiye'nin sigorta gazetesi
          </motion.span>
          <motion.span variants={fadeUp} className="masthead-right">
            {dateStr}
          </motion.span>
        </motion.div>

        <div className="rule-editorial" aria-hidden />

        {/* HEADLINE GRID */}
        <div className="ed-hero-grid">
          {/* LEFT — Editorial copy */}
          <motion.div
            variants={stagger(0.1, 0.1)}
            initial="hidden"
            animate="visible"
            className="ed-hero-left"
          >
            <motion.span variants={fadeUp} className="issue-marker">
              <ShieldCheck size={12} strokeWidth={2.4} />
              {hero.badge}
            </motion.span>

            <motion.h1 variants={fadeUpBlur} className="ed-hero-headline headline-xl">
              {hero.title}{" "}
              <em>{hero.titleHighlight}.</em>
            </motion.h1>

            <motion.p variants={fadeUp} className="ed-hero-lede drop-cap">
              {hero.subtitle}
            </motion.p>

            <motion.div variants={fadeUp} className="ed-hero-cta-row">
              <motion.div
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                transition={spring.snappy}
              >
                <Link href="/teklif-al" className="btn btn-gold ed-hero-cta-primary">
                  {hero.ctaText}
                  <ArrowUpRight size={18} strokeWidth={2.3} />
                </Link>
              </motion.div>

              <motion.button
                onClick={scrollToNext}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                transition={spring.snappy}
                className="ed-link"
                aria-label="Sayfada aşağı kaydır — nasıl çalıştığımızı gör"
              >
                Nasıl çalışıyor
                <ArrowDown size={16} strokeWidth={2.3} />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* RIGHT — Cover image composition */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: easeOutExpo, delay: 0.2 }}
            className="ed-hero-right"
          >
            <motion.div
              style={{ y: shieldY }}
              className="ed-hero-cover"
            >
              {/* Photo credit (small caps, magazine-style) */}
              <span className="ed-hero-photo-credit">
                <span className="byline">cover</span>
                <span className="ed-hero-credit-text">
                  Issue 01 — <em className="script">Şeffaf Güvence</em>
                </span>
              </span>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="ed-hero-shield"
              >
                <Image
                  src="/hero-shield.png"
                  alt="Alıcılar Sigorta — premium koruma"
                  width={520}
                  height={520}
                  priority
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "contain",
                    filter: "drop-shadow(0 40px 80px rgba(201, 164, 73, 0.30))",
                  }}
                />
              </motion.div>

              {/* Floating editorial chips with live stats */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9, duration: 0.7, ease: easeOutExpo }}
                className="ed-hero-chip ed-hero-chip-tl"
                aria-hidden
              >
                <span className="live-dot" />
                <div>
                  <div className="ed-hero-chip-label">Şu anda</div>
                  <div className="ed-hero-chip-value">142 kişi teklif alıyor</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1, duration: 0.7, ease: easeOutExpo }}
                className="ed-hero-chip ed-hero-chip-br"
                aria-hidden
              >
                <div>
                  <div className="ed-hero-chip-label">Ortalama tasarruf</div>
                  <div className="ed-hero-chip-value">
                    %32 <em className="script">avantaj</em>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* EDITORIAL STAT TABLE — replaces the equal-grid stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.1 }}
          className="ed-hero-stats"
        >
          <div className="rule-editorial hair" aria-hidden style={{ marginBottom: 28 }} />
          <div className="ed-hero-stats-header">
            <span className="byline">Rakamlarla &nbsp;·&nbsp; 2026</span>
            <span className="ed-hero-stats-foot">
              <em className="script">Güncel performans</em>
            </span>
          </div>
          <div className="ed-hero-stats-grid">
            {hero.stats.map((s, i) => (
              <motion.div
                key={`${s.label}-${i}`}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.3 + i * 0.06,
                  duration: 0.6,
                  ease: easeOutExpo,
                }}
                className="ed-hero-stat-cell"
              >
                <span className="ed-hero-stat-idx">{String(i + 1).padStart(2, "0")}</span>
                <div className="ed-hero-stat-num stat-number">
                  <CountUp value={s.value} duration={1700 + i * 80} />
                </div>
                <div className="ed-hero-stat-lbl">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .ed-hero {
          padding: clamp(36px, 5vw, 64px) 0 clamp(40px, 6vw, 80px);
        }

        .ed-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.45fr) minmax(0, 1fr);
          gap: clamp(2rem, 5vw, 5rem);
          align-items: stretch;
          padding: clamp(36px, 6vw, 64px) 0 clamp(48px, 6vw, 80px);
        }

        .ed-hero-left {
          display: flex;
          flex-direction: column;
          justify-content: center;
          max-width: 760px;
        }
        .ed-hero-left .issue-marker { margin-bottom: 28px; }

        .ed-hero-headline {
          margin: 0 0 28px;
          color: var(--ink);
        }

        .ed-hero-lede {
          font-size: clamp(1.05rem, 1.4vw, 1.18rem);
          line-height: 1.72;
          color: var(--ink-soft);
          font-weight: 400;
          margin: 0 0 36px;
          max-width: 580px;
        }
        .dark .ed-hero-lede { color: var(--gray); }

        .ed-hero-cta-row {
          display: flex;
          align-items: center;
          gap: 24px;
          flex-wrap: wrap;
        }
        .ed-hero-cta-primary {
          padding: 1.1rem 2.2rem !important;
          font-size: 0.98rem;
          border-radius: 100px;
          box-shadow: 0 20px 44px rgba(201, 164, 73, 0.32);
          letter-spacing: 0.01em;
        }

        /* RIGHT — cover */
        .ed-hero-right {
          position: relative;
          min-height: 460px;
          display: flex;
          align-items: stretch;
          justify-content: stretch;
        }
        .ed-hero-cover {
          position: relative;
          width: 100%;
          background: linear-gradient(170deg, var(--paper) 0%, var(--paper-deep) 100%);
          border: 1px solid rgba(14,16,20,0.08);
          border-radius: 4px;
          padding: 24px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow:
            0 1px 0 rgba(14,16,20,0.05),
            0 30px 80px -20px rgba(14,16,20,0.18),
            inset 0 1px 0 rgba(255,255,255,0.6);
        }
        .ed-hero-cover::before {
          content: "";
          position: absolute;
          top: 14px; left: 14px; right: 14px; bottom: 14px;
          border: 1px solid rgba(14,16,20,0.08);
          border-radius: 2px;
          pointer-events: none;
        }
        .ed-hero-cover::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 25% 20%, rgba(201,164,73,0.18) 0%, transparent 55%),
            radial-gradient(circle at 75% 80%, rgba(201,164,73,0.10) 0%, transparent 60%);
          pointer-events: none;
        }

        .ed-hero-photo-credit {
          position: relative;
          z-index: 3;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 12px;
        }
        .ed-hero-credit-text {
          font-family: var(--font-sans);
          font-size: 0.74rem;
          color: var(--gray);
          letter-spacing: 0.04em;
        }

        .ed-hero-shield {
          position: relative;
          z-index: 2;
          flex: 1;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
        }
        .ed-hero-shield img {
          max-width: 88%;
        }

        /* Chips floating over cover */
        .ed-hero-chip {
          position: absolute;
          z-index: 4;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 10px 16px 10px 14px;
          background: rgba(255,255,255,0.96);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(14,16,20,0.08);
          border-radius: 100px;
          box-shadow: 0 18px 50px -10px rgba(14,16,20,0.16);
        }
        .ed-hero-chip-tl {
          top: 56px;
          left: 28px;
        }
        .ed-hero-chip-br {
          bottom: 32px;
          right: 28px;
          padding: 12px 18px;
        }
        .ed-hero-chip-label {
          font-family: var(--font-sans);
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gray);
        }
        .ed-hero-chip-value {
          font-family: var(--font-sans);
          font-size: 0.92rem;
          font-weight: 800;
          color: var(--ink);
          letter-spacing: -0.01em;
        }
        .ed-hero-chip-value em.script {
          color: var(--gold-dark);
          font-size: 0.95rem;
        }

        /* Stats — editorial table style */
        .ed-hero-stats {
          margin-top: 8px;
        }
        .ed-hero-stats-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 24px;
          flex-wrap: wrap;
          gap: 12px;
        }
        .ed-hero-stats-foot {
          font-size: 0.92rem;
          color: var(--gray);
        }
        .ed-hero-stats-grid {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 0;
          border-top: 1px solid var(--border-strong);
        }
        .ed-hero-stat-cell {
          padding: 26px 22px 24px;
          border-right: 1px solid var(--border);
          border-bottom: 1px solid var(--border);
          background: var(--paper-soft);
          display: flex;
          flex-direction: column;
          gap: 6px;
          position: relative;
          transition: background 0.3s ease;
        }
        .ed-hero-stat-cell:last-child { border-right: none; }
        .ed-hero-stat-cell:hover { background: var(--white); }
        .ed-hero-stat-idx {
          font-family: var(--font-sans);
          font-size: 0.62rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          color: var(--gold-dark);
          margin-bottom: 8px;
        }
        .ed-hero-stat-num {
          font-size: clamp(1.5rem, 2.4vw, 2.1rem);
          line-height: 1;
        }
        .ed-hero-stat-lbl {
          font-size: 0.82rem;
          color: var(--gray);
          font-weight: 600;
          letter-spacing: 0.01em;
          line-height: 1.4;
        }

        @media (max-width: 1024px) {
          .ed-hero-grid {
            grid-template-columns: 1fr;
          }
          .ed-hero-right { min-height: 340px; }
          .ed-hero-stats-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .ed-hero-stat-cell:nth-child(3n) { border-right: none; }
        }
        @media (max-width: 640px) {
          .ed-hero-cover { padding: 16px; }
          .ed-hero-cover::before { top: 10px; left: 10px; right: 10px; bottom: 10px; }
          .ed-hero-chip-tl { top: 28px; left: 18px; }
          .ed-hero-chip-br { bottom: 18px; right: 18px; }
          .ed-hero-chip { padding: 8px 12px 8px 10px; gap: 8px; }
          .ed-hero-chip-value { font-size: 0.82rem; }

          .ed-hero-cta-row { width: 100%; gap: 18px; flex-direction: column; align-items: stretch; }
          .ed-hero-cta-primary {
            width: 100%;
            padding: 1rem 1.4rem !important;
            justify-content: center;
          }
          .ed-link { justify-content: center; align-self: center; }

          .ed-hero-stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .ed-hero-stat-cell { padding: 20px 14px; }
          .ed-hero-stat-cell:nth-child(3n) { border-right: 1px solid var(--border); }
          .ed-hero-stat-cell:nth-child(2n) { border-right: none; }

          .masthead { font-size: 0.62rem; gap: 12px; padding: 14px 0 10px; }
          .masthead-center { font-size: 0.78rem; flex-basis: 100%; order: 99; text-align: center; }

          .ed-hero-lede { font-size: 0.98rem; line-height: 1.65; }
          .drop-cap::first-letter {
            font-size: 3.4em;
            padding-right: 8px;
          }
        }
        `,
      }} />
    </section>
  );
}
