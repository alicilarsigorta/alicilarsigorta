"use client";

import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useContent } from "@/lib/content-context";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
};

export default function Hero() {
  const { content } = useContent();
  const { hero } = content;

  return (
    <section className="hero-editorial">
      <div className="container">
        <motion.div variants={stagger} initial="hidden" animate="visible" className="hero-editorial__inner">

          <motion.div variants={fadeUp} className="section-badge">
            {hero.badge}
          </motion.div>

          <motion.h1 variants={fadeUp} className="hero-editorial__title">
            {hero.title}{" "}
            <span className="gold">{hero.titleHighlight}</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="hero-editorial__sub">
            {hero.subtitle}
          </motion.p>

          <motion.div variants={fadeUp} className="hero-editorial__cta-row">
            <Link href="/teklif-al" className="btn btn-gold hero-editorial__cta">
              {hero.ctaText}
              <ArrowUpRight size={18} />
            </Link>
            <Link href="/urunlerimiz" className="hero-editorial__link">
              <span>Ürünlerimizi keşfedin</span>
              <ArrowUpRight size={14} />
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="hero-editorial__meta">
            <span className="hero-editorial__meta-dot" />
            <span>SEGEM lisanslı • 20+ sigorta şirketi • Saniyeler içinde teklif</span>
          </motion.div>
        </motion.div>

        {/* Editorial stats — bottom rule */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="hero-editorial__stats"
        >
          {hero.stats.map((s, i) => (
            <div key={i} className="hero-editorial__stat">
              <div className="stat-number">{s.value}</div>
              <div className="hero-editorial__stat-label">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        .hero-editorial {
          position: relative;
          background: var(--white);
          padding: clamp(64px, 10vw, 140px) 0 clamp(48px, 8vw, 100px);
          overflow: hidden;
        }
        .hero-editorial__inner {
          max-width: 920px;
          margin: 0 auto;
          padding: clamp(24px, 5vw, 80px) 0 clamp(48px, 7vw, 96px);
        }
        .hero-editorial__title {
          font-family: var(--font-serif);
          font-weight: 400;
          font-size: clamp(2.6rem, 8vw, 6.5rem);
          line-height: 1;
          letter-spacing: -0.035em;
          color: var(--ink);
          margin: 0 0 clamp(20px, 3vw, 32px);
          font-feature-settings: "ss01" 1, "kern" 1;
        }
        .hero-editorial__title :global(.gold) {
          font-style: italic;
          font-weight: 300;
          color: var(--gold-dark);
        }
        .hero-editorial__sub {
          font-family: var(--font-sans);
          font-size: clamp(1.05rem, 1.6vw, 1.25rem);
          line-height: 1.55;
          color: var(--muted);
          max-width: 620px;
          margin: 0 0 clamp(28px, 4vw, 44px);
          letter-spacing: -0.005em;
        }
        .hero-editorial__cta-row {
          display: flex;
          align-items: center;
          gap: clamp(20px, 3vw, 32px);
          flex-wrap: wrap;
          margin-bottom: clamp(36px, 5vw, 56px);
        }
        .hero-editorial__cta {
          padding: 1.05rem 2rem !important;
        }
        .hero-editorial__link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--ink);
          font-weight: 500;
          font-size: 0.95rem;
          text-decoration: none;
          padding-bottom: 2px;
          border-bottom: 1px solid var(--ink);
          transition: opacity 0.2s ease, gap 0.3s ease;
        }
        .hero-editorial__link:hover { opacity: 0.7; gap: 10px; }

        .hero-editorial__meta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-sans);
          font-size: 0.78rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--muted);
          font-weight: 500;
        }
        .hero-editorial__meta-dot {
          display: inline-block;
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 0 4px rgba(16,185,129,0.15);
        }

        .hero-editorial__stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          padding-top: clamp(28px, 4vw, 48px);
          border-top: 1px solid var(--hairline);
          gap: clamp(16px, 3vw, 32px);
        }
        .hero-editorial__stat {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .hero-editorial__stat-label {
          font-family: var(--font-sans);
          font-size: 0.78rem;
          color: var(--muted);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .hero-editorial__stats { grid-template-columns: repeat(2, 1fr); gap: 28px 16px; }
        }
        @media (max-width: 480px) {
          .hero-editorial__cta { width: 100%; justify-content: center; }
          .hero-editorial__cta-row { gap: 18px; }
        }
      `}</style>
    </section>
  );
}
