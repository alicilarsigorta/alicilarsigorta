"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, Sparkles, Shield, TrendingDown, Check } from "lucide-react";
import Link from "next/link";
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
 * Hero — Fintech / SaaS-app glass dashboard.
 *
 * Left: big bold sans headline + lede + dual CTA + trust pills.
 * Right: stacked glass "dashboard tile" cards (live policy preview,
 * comparison engine, ambient stats).
 */
export default function Hero() {
  const { content } = useContent();
  const { hero } = content;

  const scrollToNext = () => {
    const next = document.getElementById("how-it-works");
    if (next) {
      next.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollBy({ top: window.innerHeight * 0.8, behavior: "smooth" });
    }
  };

  return (
    <section className="hero-section">
      {/* Ambient glows */}
      <div aria-hidden className="hero-glow-mint" />
      <div aria-hidden className="hero-glow-violet" />
      <div className="mesh-bg" aria-hidden />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="hero-grid">
          {/* LEFT — Copy */}
          <motion.div
            variants={stagger(0.1, 0.05)}
            initial="hidden"
            animate="visible"
            className="hero-left"
          >
            <motion.div variants={fadeUp}>
              <span className="eyebrow">
                <Sparkles size={11} strokeWidth={2.4} />
                {hero.badge}
              </span>
            </motion.div>

            <motion.h1 variants={fadeUpBlur} className="hero-title">
              {hero.title}{" "}
              <em>{hero.titleHighlight}.</em>
            </motion.h1>

            <motion.p variants={fadeUp} className="hero-sub">
              {hero.subtitle}
            </motion.p>

            <motion.div variants={fadeUp} className="hero-cta-row">
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={spring.snappy}
              >
                <Link href="/teklif-al" className="btn btn-gold hero-cta-primary">
                  {hero.ctaText}
                  <ArrowRight size={17} strokeWidth={2.3} />
                </Link>
              </motion.div>

              <motion.button
                onClick={scrollToNext}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={spring.snappy}
                className="btn btn-outline hero-cta-secondary"
                aria-label="Sayfada aşağı kaydır — nasıl çalıştığımızı gör"
              >
                Nasıl Çalışıyor
                <ArrowDown size={17} strokeWidth={2.3} />
              </motion.button>
            </motion.div>

            {/* Trust pills */}
            <motion.div variants={fadeUp} className="hero-trust">
              <span className="trust-pill">
                <span className="dot" />
                SEGEM Lisanslı
              </span>
              <span className="trust-pill">
                <span className="dot" />
                T.C. Hazine Denetimi
              </span>
              <span className="trust-pill">
                <span className="dot" />
                KVKK Uyumlu
              </span>
            </motion.div>
          </motion.div>

          {/* RIGHT — Dashboard glass tiles */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: easeOutExpo, delay: 0.3 }}
            className="hero-right"
          >
            {/* Top card — "ANLIK KARŞILAŞTIRMA" */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: easeOutExpo }}
              className="hero-card hero-card-compare"
            >
              <div className="hero-card-head">
                <span className="byline">Anlık Karşılaştırma</span>
                <span className="data-chip data-chip-mint">
                  <span className="live-dot" style={{ width: 6, height: 6 }} />
                  Canlı
                </span>
              </div>

              <div className="hero-card-rows">
                {[
                  { name: "Allianz", price: "₺6.842", best: false },
                  { name: "Aksigorta", price: "₺5.451", best: true },
                  { name: "HDI", price: "₺7.180", best: false },
                ].map((row, i) => (
                  <motion.div
                    key={row.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + i * 0.1, duration: 0.5 }}
                    className={`hero-card-row ${row.best ? "hero-card-row-best" : ""}`}
                  >
                    <span className="hero-card-row-logo" aria-hidden>
                      {row.name[0]}
                    </span>
                    <span className="hero-card-row-name">{row.name}</span>
                    <span className="hero-card-row-price">{row.price}</span>
                    {row.best && (
                      <span className="hero-card-row-best-tag">
                        <Check size={11} strokeWidth={3} />
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>

              <div className="hero-card-foot">
                <TrendingDown size={14} color="var(--mint)" />
                <span>
                  En düşük tekliften <strong>%24 tasarruf</strong>
                </span>
              </div>
            </motion.div>

            {/* Bottom card — "POLİÇE BAKIŞ" */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8, ease: easeOutExpo }}
              className="hero-card hero-card-policy"
            >
              <div className="hero-card-policy-icon">
                <Shield size={20} strokeWidth={1.6} />
              </div>
              <div>
                <div className="byline" style={{ marginBottom: 4 }}>
                  Aktif Poliçe
                </div>
                <div className="hero-card-policy-title">Kasko + Trafik</div>
                <div className="hero-card-policy-meta">
                  Bitiş: 14 Mart 2027 · 248 gün kaldı
                </div>
                <div className="hero-card-policy-progress" aria-hidden>
                  <div className="hero-card-policy-progress-bar" />
                </div>
              </div>
            </motion.div>

            {/* Floating stat chip */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="hero-floating-chip"
              aria-hidden
            >
              <div className="hero-floating-chip-num">
                <CountUp value="1.247" duration={1800} />K+
              </div>
              <div className="hero-floating-chip-label">Koruma altındaki hayat</div>
            </motion.div>
          </motion.div>
        </div>

        {/* 6-stat dashboard strip */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.9, ease: easeOutExpo, delay: 0.1 }}
          className="hero-stats"
        >
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
              className="hero-stat-cell"
            >
              <div className="stat-number hero-stat-num">
                <CountUp value={s.value} duration={1700 + i * 80} />
              </div>
              <div className="hero-stat-label">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .hero-section {
          position: relative;
          padding: clamp(48px, 7vw, 96px) 0 clamp(60px, 8vw, 120px);
          background: var(--navy-deep);
          overflow: hidden;
        }
        .hero-glow-mint {
          position: absolute;
          top: -10%;
          right: -10%;
          width: 700px;
          height: 700px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--mint-glow) 0%, transparent 60%);
          filter: blur(50px);
          pointer-events: none;
          z-index: 0;
        }
        .hero-glow-violet {
          position: absolute;
          bottom: -20%;
          left: -10%;
          width: 600px;
          height: 600px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--violet-glow) 0%, transparent 60%);
          filter: blur(50px);
          pointer-events: none;
          z-index: 0;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
          gap: clamp(2.4rem, 6vw, 5rem);
          align-items: center;
          min-height: 600px;
        }
        .hero-left {
          display: flex;
          flex-direction: column;
          max-width: 660px;
        }
        .hero-title {
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: clamp(2.6rem, 6.6vw, 5.4rem);
          line-height: 1.02;
          letter-spacing: -0.04em;
          color: var(--text-primary);
          margin: 14px 0 28px;
        }
        .hero-title em {
          font-style: normal;
          font-weight: 700;
          background: linear-gradient(135deg, var(--mint) 0%, var(--violet) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: inline-block;
        }
        .hero-sub {
          font-size: 1.08rem;
          line-height: 1.7;
          color: var(--text-secondary);
          font-weight: 400;
          margin-bottom: 40px;
          max-width: 540px;
        }
        .hero-cta-row {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 32px;
        }
        .hero-cta-primary {
          padding: 1rem 2rem !important;
          font-size: 0.98rem;
          font-weight: 700;
        }
        .hero-cta-secondary {
          padding: 1rem 1.7rem !important;
          font-weight: 600;
        }
        .hero-trust {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        /* RIGHT — Dashboard tiles */
        .hero-right {
          position: relative;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .hero-card {
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 18px;
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          padding: 22px 24px;
          position: relative;
          overflow: hidden;
          color: var(--text-primary);
        }
        .hero-card::before {
          content: "";
          position: absolute;
          top: 0; left: 24px; right: 24px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--mint), transparent);
          opacity: 0.5;
        }

        .hero-card-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
        }
        .hero-card-rows {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 16px;
        }
        .hero-card-row {
          display: grid;
          grid-template-columns: 28px 1fr auto auto;
          align-items: center;
          gap: 12px;
          padding: 10px 12px;
          background: var(--glass-bg);
          border: 1px solid transparent;
          border-radius: 10px;
          font-family: var(--font-mono);
          font-size: 0.84rem;
          font-weight: 500;
          color: var(--text-secondary);
          transition: all 0.3s;
        }
        .hero-card-row-best {
          background: var(--mint-soft);
          border-color: var(--mint);
          color: var(--text-primary);
        }
        .hero-card-row-logo {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--mint) 0%, var(--violet) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--navy-deep);
          font-family: var(--font-sans);
        }
        .hero-card-row-best .hero-card-row-logo {
          background: var(--mint);
        }
        .hero-card-row-name {
          font-family: var(--font-sans);
          font-weight: 600;
          letter-spacing: -0.005em;
        }
        .hero-card-row-price {
          font-variant-numeric: tabular-nums;
          font-weight: 600;
          color: var(--text-primary);
        }
        .hero-card-row-best-tag {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: var(--mint);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--navy-deep);
        }
        .hero-card-foot {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-sans);
          font-size: 0.82rem;
          color: var(--text-muted);
        }
        .hero-card-foot strong {
          color: var(--mint);
          font-weight: 600;
        }

        .hero-card-policy {
          display: grid;
          grid-template-columns: 56px 1fr;
          gap: 16px;
          align-items: flex-start;
          padding: 20px 22px;
        }
        .hero-card-policy-icon {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          background: linear-gradient(135deg, var(--mint) 0%, var(--violet) 100%);
          color: var(--navy-deep);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .hero-card-policy-title {
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 1.08rem;
          color: var(--text-primary);
          letter-spacing: -0.015em;
          margin-bottom: 4px;
        }
        .hero-card-policy-meta {
          font-family: var(--font-mono);
          font-size: 0.74rem;
          color: var(--text-muted);
          margin-bottom: 10px;
        }
        .hero-card-policy-progress {
          width: 100%;
          height: 4px;
          background: var(--glass-bg-strong);
          border-radius: 100px;
          overflow: hidden;
        }
        .hero-card-policy-progress-bar {
          width: 68%;
          height: 100%;
          background: linear-gradient(90deg, var(--mint) 0%, var(--mint-light) 100%);
          border-radius: 100px;
          animation: progressGrow 1.6s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes progressGrow {
          0% { width: 0; }
          100% { width: 68%; }
        }

        .hero-floating-chip {
          position: absolute;
          left: -28px;
          bottom: 24%;
          background: var(--glass-bg-strong);
          border: 1px solid var(--mint);
          backdrop-filter: var(--glass-blur);
          padding: 12px 18px;
          border-radius: 14px;
          box-shadow: 0 20px 50px rgba(0, 212, 168, 0.18);
          z-index: 2;
        }
        .hero-floating-chip-num {
          font-family: var(--font-mono);
          font-weight: 700;
          font-size: 1.3rem;
          color: var(--mint);
          letter-spacing: -0.03em;
          line-height: 1;
        }
        .hero-floating-chip-label {
          font-family: var(--font-sans);
          font-size: 0.7rem;
          color: var(--text-muted);
          font-weight: 500;
          margin-top: 4px;
        }

        /* Stats strip */
        .hero-stats {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 1px;
          margin-top: clamp(56px, 8vw, 96px);
          background: var(--glass-border);
          border-radius: 18px;
          overflow: hidden;
          border: 1px solid var(--glass-border);
          backdrop-filter: var(--glass-blur);
        }
        .hero-stat-cell {
          background: var(--glass-bg);
          padding: 28px 18px;
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 8px;
          transition: background 0.3s;
        }
        .hero-stat-cell:hover { background: var(--glass-bg-strong); }
        .hero-stat-num {
          font-size: clamp(1.4rem, 2.4vw, 2.1rem) !important;
        }
        .hero-stat-label {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          color: var(--text-muted);
          font-weight: 500;
          letter-spacing: 0.02em;
          line-height: 1.3;
        }

        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr;
            min-height: 0;
          }
          .hero-floating-chip { left: auto; right: 16px; bottom: -10px; }
          .hero-stats { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 640px) {
          .hero-section { padding: 36px 0 48px; }
          .hero-title { font-size: clamp(2rem, 9vw, 3rem); line-height: 1.04; }
          .hero-sub { font-size: 1rem; margin-bottom: 26px; }
          .hero-cta-row { width: 100%; flex-direction: column; align-items: stretch; gap: 10px; }
          .hero-cta-primary, .hero-cta-secondary {
            width: 100%;
            justify-content: center;
          }
          .hero-trust { gap: 6px; }
          .trust-pill { font-size: 0.62rem; padding: 6px 10px; }
          .hero-card { padding: 18px; }
          .hero-floating-chip { display: none; }
          .hero-stats { grid-template-columns: repeat(2, 1fr); border-radius: 14px; }
          .hero-stat-cell { padding: 20px 12px; }
        }
      ` }} />
    </section>
  );
}
