"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  Car, ShieldCheck, HeartPulse, Home, Navigation,
  Plane, Briefcase, Stethoscope, ArrowRight, Sparkles,
} from "lucide-react";
import Link from "next/link";
import { fadeUp, stagger, easeOutExpo } from "@/lib/motion";

// Rotating headline words — original Alıcılar slogan, NOT sigortam.net's.
const ROTATING_WORDS = ["Doğru", "Uygun", "Hızlı", "Güvenli", "Akıllı"];

/**
 * Hero — sigortam.net-style light product launcher.
 *
 * Centered big dark headline + subtitle, then a grid of friendly white
 * product cards (each a quick entry into a quote flow). Below: a trust row.
 * This is THE signature move of Turkish comparison sites — the product
 * grid IS the hero.
 */

interface Product {
  id: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  label: string;
  badge?: string;
  tone: "blue" | "orange";
}

const products: Product[] = [
  { id: "trafik-sigortasi", icon: Navigation, label: "Trafik Sigortası", tone: "orange" },
  { id: "kasko", icon: Car, label: "Kasko", badge: "Popüler", tone: "blue" },
  { id: "saglik-sigortasi-fiyatlari", icon: HeartPulse, label: "Tamamlayıcı Sağlık", tone: "orange" },
  { id: "dask-sorgulama", icon: ShieldCheck, label: "DASK", tone: "blue" },
  { id: "konut-sigortasi", icon: Home, label: "Konut Sigortası", tone: "orange" },
  { id: "is-yeri-sigortasi", icon: Briefcase, label: "İş Yeri Sigortası", tone: "blue" },
  { id: "seyahat-sigortasi", icon: Plane, label: "Seyahat Sağlık", badge: "Yeni", tone: "orange" },
  { id: "ozel-saglik", icon: Stethoscope, label: "Özel Sağlık", tone: "blue" },
];

export default function Hero() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
    }, 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="hero-section">
      <div className="container">
        {/* Headline block */}
        <motion.div
          variants={stagger(0.08, 0.05)}
          initial="hidden"
          animate="visible"
          className="hero-head"
        >
          <motion.span variants={fadeUp} className="hero-badge">
            <Sparkles size={13} strokeWidth={2.2} color="var(--orange)" />
            Karşılaştır · Seç · Güvende Kal
          </motion.span>

          <motion.h1 variants={fadeUp} className="hero-title">
            <span className="hero-rotate" aria-hidden="true">
              {/* invisible sizer reserves width of the longest word */}
              <span className="hero-rotate-sizer">Güvenli</span>
              <AnimatePresence initial={false}>
                <motion.span
                  key={wordIndex}
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.5, ease: easeOutExpo }}
                  className="hero-rotate-word"
                >
                  {ROTATING_WORDS[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
            <span className="hero-title-rest">sigorta, tek tıkla.</span>
            <span className="hero-sr-only">Doğru sigorta, tek tıkla.</span>
          </motion.h1>

          <motion.p variants={fadeUp} className="hero-sub">
            20+ sigorta şirketinin teklifini saniyeler içinde karşılaştırın;
            size en uygun poliçeyi komisyonsuz ve %100 dijital edinin.
          </motion.p>
        </motion.div>

        {/* Product grid — the centerpiece */}
        <motion.div
          variants={stagger(0.05, 0.15)}
          initial="hidden"
          animate="visible"
          className="hero-grid"
        >
          {products.map(({ id, icon: Icon, label, badge, tone }) => (
            <motion.div key={id} variants={fadeUp}>
              <Link href={`/urunlerimiz/${id}`} className={`hero-prod hero-prod--${tone}`}>
                {badge && (
                  <span className={`hero-prod-badge hero-prod-badge--${badge === "Yeni" ? "new" : "pop"}`}>
                    {badge}
                  </span>
                )}
                <span className="hero-prod-icon">
                  <Icon size={30} strokeWidth={1.7} />
                </span>
                <span className="hero-prod-label">{label}</span>
                <span className="hero-prod-cta">
                  Teklif Al <ArrowRight size={13} strokeWidth={2.4} />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6, ease: easeOutExpo }}
          className="hero-allprods"
        >
          <Link href="/urunlerimiz" className="ed-link">
            Tüm ürünleri gör <ArrowRight size={15} strokeWidth={2.4} />
          </Link>
        </motion.div>

        {/* Trust row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6, ease: easeOutExpo }}
          className="hero-trust"
        >
          <span className="trust-pill"><span className="dot" /> 1.247.000+ mutlu müşteri</span>
          <span className="trust-pill"><span className="dot" /> 20+ anlaşmalı şirket</span>
          <span className="trust-pill"><span className="dot" /> SEGEM Lisanslı</span>
          <span className="trust-pill"><span className="dot" /> 4,9/5 memnuniyet</span>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .hero-section {
          position: relative;
          padding: clamp(40px, 6vw, 72px) 0 clamp(48px, 6vw, 80px);
          background: var(--bg);
          overflow: hidden;
        }
        .hero-section::before {
          content: "";
          position: absolute;
          top: -160px; left: 50%; transform: translateX(-50%);
          width: 900px; height: 500px;
          background: radial-gradient(ellipse, rgba(0,137,236,0.07) 0%, transparent 65%);
          pointer-events: none;
        }

        .hero-head {
          text-align: center;
          max-width: 780px;
          margin: 0 auto clamp(36px, 5vw, 56px);
          position: relative;
        }
        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 100px;
          font-size: 0.82rem;
          font-weight: 600;
          color: var(--ink-soft);
          box-shadow: var(--shadow-soft);
          margin-bottom: 24px;
        }
        .hero-title {
          font-family: var(--font-sans);
          font-weight: 800;
          font-size: clamp(2.4rem, 6.2vw, 4.7rem);
          line-height: 1.02;
          letter-spacing: -0.04em;
          color: var(--ink);
          margin-bottom: 18px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }
        .hero-rotate {
          position: relative;
          display: inline-block;
          overflow: hidden;
          height: 1.3em;
          line-height: 1.3;
          vertical-align: top;
        }
        .hero-rotate-sizer {
          visibility: hidden;
          display: inline-block;
          line-height: 1.3;
          color: var(--blue);
        }
        .hero-rotate-word {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          line-height: 1.3;
          text-align: center;
          color: var(--blue);
          will-change: transform;
        }
        .hero-title-rest { color: var(--ink); }
        .hero-sr-only {
          position: absolute;
          width: 1px; height: 1px;
          padding: 0; margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
        .hero-sub {
          font-size: clamp(1rem, 1.5vw, 1.18rem);
          line-height: 1.65;
          color: var(--text-secondary);
          font-weight: 400;
          max-width: 600px;
          margin: 0 auto;
        }

        /* Product grid */
        .hero-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          max-width: 1040px;
          margin: 0 auto;
        }
        .hero-prod {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 14px;
          padding: 30px 18px 24px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          box-shadow: var(--shadow-card);
          text-decoration: none;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.3s ease;
          overflow: hidden;
        }
        .hero-prod:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-hover);
          border-color: var(--blue-light);
        }
        .hero-prod-badge {
          position: absolute;
          top: 12px; right: 12px;
          padding: 3px 9px;
          border-radius: 100px;
          font-size: 0.62rem;
          font-weight: 800;
          letter-spacing: 0.02em;
          color: #fff;
        }
        .hero-prod-badge--new { background: var(--orange); }
        .hero-prod-badge--pop { background: var(--blue); }

        .hero-prod-icon {
          width: 66px; height: 66px;
          border-radius: 18px;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hero-prod--blue .hero-prod-icon { background: var(--blue-tint); color: var(--blue); }
        .hero-prod--orange .hero-prod-icon { background: var(--orange-tint); color: var(--orange); }
        .hero-prod:hover .hero-prod-icon { transform: scale(1.08) rotate(-3deg); }
        .hero-prod--blue:hover .hero-prod-icon { background: var(--blue); color: #fff; }
        .hero-prod--orange:hover .hero-prod-icon { background: var(--orange); color: #fff; }

        .hero-prod-label {
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 1.02rem;
          color: var(--ink);
          letter-spacing: -0.015em;
          line-height: 1.25;
        }
        .hero-prod-cta {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--text-muted);
          transition: color 0.25s ease, gap 0.25s ease;
        }
        .hero-prod:hover .hero-prod-cta { color: var(--blue); gap: 8px; }

        .hero-allprods { text-align: center; margin-top: 28px; }

        .hero-trust {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          margin-top: 40px;
        }

        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 620px) {
          .hero-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .hero-prod { padding: 22px 12px 18px; gap: 11px; }
          .hero-prod-icon { width: 56px; height: 56px; border-radius: 15px; }
          .hero-prod-label { font-size: 0.92rem; }
          .hero-trust { gap: 7px; }
          .trust-pill { font-size: 0.72rem; padding: 6px 11px; }
        }
      ` }} />
    </section>
  );
}
