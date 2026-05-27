"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown, ShieldCheck, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { useContent } from "@/lib/content-context";
import {
  fadeUp,
  fadeUpBlur,
  scaleIn,
  stagger,
  easeOutExpo,
  spring,
} from "@/lib/motion";
import CountUp from "./CountUp";

/**
 * Hero — disciplined premium.
 *
 * Replaces particle/orbit-ring composition with a single editorial layout:
 * eyebrow → serif display → body → dual CTA → 6-stat strip.
 * Animations are reveal-only (no perpetual decorative motion) except the
 * shield's subtle float.
 */
export default function Hero() {
  const { content } = useContent();
  const { hero } = content;
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // Very subtle parallax — disciplined, not theatrical.
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const shieldY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  const scrollToNext = () => {
    const next = document.getElementById("how-it-works");
    if (next) {
      next.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="hero-section"
      style={{
        position: "relative",
        backgroundColor: "var(--white)",
        overflow: "hidden",
      }}
    >
      {/* Subtle geometric grid — replaces orbit/particle chaos */}
      <div className="mesh-bg" aria-hidden />

      {/* Single soft radial glow — not animated, just atmosphere */}
      <div
        aria-hidden
        className="hero-bg-glow decor-mobile-hide"
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="hero-grid">
          {/* LEFT — editorial copy */}
          <motion.div
            variants={stagger(0.12, 0.05)}
            initial="hidden"
            animate="visible"
            className="hero-left"
            style={{ y: titleY }}
          >
            <motion.div variants={fadeUp}>
              <span className="eyebrow">
                <ShieldCheck size={14} strokeWidth={2} />
                {hero.badge}
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUpBlur}
              className="hero-title"
            >
              {hero.title}{" "}
              <span className="gold">
                {hero.titleHighlight}
              </span>
            </motion.h1>

            <motion.p variants={fadeUp} className="hero-sub">
              {hero.subtitle}
            </motion.p>

            <motion.div variants={fadeUp} className="hero-cta-row">
              <motion.div
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                transition={spring.snappy}
              >
                <Link
                  href="/teklif-al"
                  className="btn btn-gold hero-cta-primary"
                >
                  {hero.ctaText}
                  <ArrowRight size={18} strokeWidth={2.3} />
                </Link>
              </motion.div>

              <motion.button
                onClick={scrollToNext}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                transition={spring.snappy}
                className="btn hero-cta-secondary"
                aria-label="Sayfada aşağı kaydır — nasıl çalıştığımızı gör"
              >
                Nasıl Çalışıyor?
                <ArrowDown size={18} strokeWidth={2.3} />
              </motion.button>
            </motion.div>

            {/* Inline mini trust strip */}
            <motion.div variants={fadeUp} className="hero-mini-trust">
              <div className="hero-mini-trust-item">
                <Sparkles size={14} color="var(--gold-dark)" />
                <span>Anlık karşılaştırma</span>
              </div>
              <span className="hero-mini-trust-dot" />
              <div className="hero-mini-trust-item">
                <span>SEGEM Lisanslı</span>
              </div>
              <span className="hero-mini-trust-dot" />
              <div className="hero-mini-trust-item">
                <span>Komisyonsuz</span>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT — shield image, single float, no orbit rings */}
          <motion.div
            variants={scaleIn}
            initial="hidden"
            animate="visible"
            className="hero-graphics"
            style={{ y: shieldY }}
          >
            <motion.div
              animate={{ y: [0, -16, 0] }}
              transition={{
                duration: 7,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="hero-shield-wrap"
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
                  filter: "drop-shadow(0 40px 80px rgba(201, 164, 73, 0.28))",
                }}
              />
            </motion.div>

            {/* Static glow behind shield — no pulsing */}
            <div
              aria-hidden
              className="hero-shield-glow decor-mobile-hide"
            />
          </motion.div>
        </div>

        {/* 6-stat editorial strip */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.2 }}
          className="hero-stats"
        >
          {hero.stats.map((s, i) => (
            <motion.div
              key={`${s.label}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: 0.4 + i * 0.08,
                duration: 0.7,
                ease: easeOutExpo,
              }}
              className="hero-stat-cell"
            >
              <div className="stat-number">
                <CountUp value={s.value} duration={1700 + i * 80} />
              </div>
              <div className="hero-stat-label">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .hero-section {
          padding: clamp(60px, 8vw, 110px) 0 clamp(50px, 6vw, 80px);
        }
        .hero-bg-glow {
          position: absolute;
          top: -20%;
          right: -10%;
          width: 720px;
          height: 720px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(201,164,73,0.13) 0%, transparent 60%);
          pointer-events: none;
          filter: blur(20px);
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: clamp(2rem, 6vw, 6rem);
          align-items: center;
          min-height: 520px;
        }
        .hero-left { max-width: 640px; }

        .hero-title {
          font-family: var(--font-display);
          font-weight: 500;
          font-size: clamp(2.4rem, 6.2vw, 5.6rem);
          line-height: 1.02;
          letter-spacing: -0.035em;
          color: var(--ink);
          margin: 0 0 24px;
          font-optical-sizing: auto;
          font-feature-settings: "ss01" on, "ss02" on;
        }
        .hero-title .gold {
          font-style: italic;
          font-weight: 400;
          background: linear-gradient(135deg, var(--gold-deep) 0%, var(--gold-dark) 35%, var(--gold) 75%, var(--gold-light) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: inline-block;
        }

        .hero-sub {
          font-size: 1.18rem;
          line-height: 1.65;
          color: var(--gray);
          font-weight: 500;
          margin-bottom: 36px;
          max-width: 560px;
        }

        .hero-cta-row {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 28px;
        }
        .hero-cta-primary {
          padding: 1.05rem 2.2rem !important;
          font-size: 1rem;
          border-radius: 100px;
          box-shadow: 0 18px 40px rgba(201, 164, 73, 0.28);
        }
        .hero-cta-secondary {
          background: transparent;
          color: var(--ink);
          padding: 1.05rem 1.7rem !important;
          border: 1px solid var(--border-strong);
          font-weight: 700;
          font-size: 1rem;
          border-radius: 100px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero-cta-secondary:hover {
          background: var(--cream);
          border-color: var(--ink);
        }

        .hero-mini-trust {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          font-size: 0.84rem;
          color: var(--gray);
          font-weight: 600;
          letter-spacing: 0.01em;
        }
        .hero-mini-trust-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .hero-mini-trust-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--border-strong);
        }

        .hero-graphics {
          position: relative;
          height: 100%;
          min-height: 460px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-shield-wrap {
          position: relative;
          width: 100%;
          max-width: 520px;
          z-index: 2;
        }
        .hero-shield-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 480px;
          height: 480px;
          background: radial-gradient(circle, rgba(201,164,73,0.20) 0%, transparent 65%);
          filter: blur(36px);
          z-index: 1;
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 1px;
          margin-top: clamp(48px, 6vw, 80px);
          background: var(--border);
          border-radius: 24px;
          overflow: hidden;
          border: 1px solid var(--border);
        }
        .hero-stat-cell {
          background: var(--white);
          padding: 28px 18px;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 8px;
          transition: background 0.3s ease;
        }
        .hero-stat-cell:hover {
          background: var(--off-white);
        }
        .hero-stat-cell .stat-number {
          font-size: clamp(1.4rem, 2.4vw, 2.1rem);
          line-height: 1;
        }
        .hero-stat-label {
          font-size: 0.8rem;
          color: var(--gray);
          font-weight: 600;
          letter-spacing: 0.02em;
          line-height: 1.3;
        }

        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr;
            min-height: 0;
          }
          .hero-graphics { display: none; }
          .hero-stats {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 640px) {
          .hero-section {
            padding: 32px 0 36px;
          }
          .hero-title {
            font-size: clamp(2rem, 9vw, 3rem);
            line-height: 1.05;
          }
          .hero-sub {
            font-size: 1rem;
            margin-bottom: 24px;
          }
          .hero-cta-row {
            width: 100%;
            gap: 10px;
          }
          .hero-cta-primary, .hero-cta-secondary {
            width: 100%;
            padding: 0.95rem 1.4rem !important;
          }
          .hero-mini-trust {
            font-size: 0.78rem;
            gap: 10px;
          }
          .hero-stats {
            grid-template-columns: repeat(2, 1fr);
            border-radius: 18px;
          }
          .hero-stat-cell {
            padding: 20px 12px;
          }
          .hero-stat-cell .stat-number {
            font-size: clamp(1.4rem, 6.5vw, 1.9rem);
          }
          .hero-stat-label {
            font-size: 0.72rem;
          }
        }
        `,
      }} />
    </section>
  );
}
