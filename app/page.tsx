"use client";

import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import PartnerMarquee from "@/components/PartnerMarquee";
import PremiumEstimator from "@/components/PremiumEstimator";
import HowItWorks from "@/components/HowItWorks";
import PromoSection from "@/components/PromoSection";
import LiveImpact from "@/components/LiveImpact";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Link from "next/link";
import { ArrowRight, Check, Info } from "lucide-react";
import { motion } from "framer-motion";
import { easeOutExpo, viewportOnce, fadeUp, stagger } from "@/lib/motion";

const compareCols = [
  {
    tag: "En ucuz",
    company: "A Sigorta",
    price: "5.000",
    features: ["İMM: 100.000 TL", "Yalnızca anlaşmalı yetkili servisler", "Muadil cam (muafiyetli)"],
    highlighted: false,
  },
  {
    tag: "Önerilen",
    company: "B Sigorta",
    price: "8.000",
    features: ["İMM: 1.000.000 TL", "Anlaşmalı + özel servisler", "Orijinal cam (muafiyetli)"],
    highlighted: true,
  },
  {
    tag: "En kapsamlı",
    company: "C Sigorta",
    price: "11.000",
    features: ["İMM: Limitsiz", "Tüm yetkili & özel servisler", "Orijinal cam (muafiyetsiz)"],
    highlighted: false,
  },
];

export default function Home() {
  return (
    <>
      {/* Product-launcher hero (sigortam.net style) */}
      <Hero />

      {/* Regulatory trust signals */}
      <TrustBar />

      {/* Partner logo marquee */}
      <PartnerMarquee />

      {/* Comparison feature — the conversion centerpiece */}
      <section className="section compare-section">
        <div className="container">
          <div className="compare-grid">
            {/* Left copy */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, ease: easeOutExpo }}
              className="compare-copy"
            >
              <span className="eyebrow eyebrow-navy">Karşılaştır & Seç</span>
              <h2 className="headline-l">
                Sadece 2 dakikada tüm teklifleri{" "}
                <em>kolayca karşılaştır.</em>
              </h2>
              <p className="section-sub">
                30'a yakın sigorta şirketinden teklifleri tek platformda karşılaştır,
                internete özel indirimlerle uygun fiyata sigortana anında başla.
              </p>

              <ul className="compare-points">
                {[
                  "Net teminatlar, net fiyatlar — sürpriz yok",
                  "Hangisi sana uygun, biz sıraladık bile",
                  "%100 dijital, komisyonsuz, şeffaf",
                ].map((p) => (
                  <li key={p}>
                    <span className="compare-check"><Check size={13} strokeWidth={3} /></span>
                    {p}
                  </li>
                ))}
              </ul>

              <Link href="/teklif-al" className="btn btn-gold compare-cta">
                Hemen Teklif Al <ArrowRight size={17} strokeWidth={2.3} />
              </Link>
            </motion.div>

            {/* Right comparison cards */}
            <motion.div
              variants={stagger(0.1, 0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="compare-cards"
            >
              <div className="compare-cards-head">
                <span>Sana özel en uygun teklifleri sıraladık</span>
              </div>
              <div className="compare-cards-row">
                {compareCols.map((c) => (
                  <motion.div
                    key={c.company}
                    variants={fadeUp}
                    className={`compare-card ${c.highlighted ? "compare-card--hl" : ""}`}
                  >
                    <span className={`compare-card-tag ${c.highlighted ? "compare-card-tag--hl" : ""}`}>
                      {c.tag}
                      <Info size={11} strokeWidth={2.2} />
                    </span>
                    <div className="compare-card-company">{c.company}</div>
                    <div className="compare-card-price">
                      <strong>{c.price}</strong> TL
                    </div>
                    <Link
                      href="/teklif-al"
                      className={`compare-card-btn ${c.highlighted ? "compare-card-btn--hl" : ""}`}
                    >
                      Satın Al
                    </Link>
                    <ul className="compare-card-feats">
                      {c.features.map((f) => (
                        <li key={f}>
                          <Check size={12} strokeWidth={2.6} />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
              <p className="compare-cards-note">
                Görseldeki fiyatlar temsilidir. Aracına özel fiyatları tekliflerde görebilirsin.
              </p>
            </motion.div>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          .compare-section { background: var(--surface); border-top: 1px solid var(--border); border-bottom: 1px solid var(--border); }
          .compare-grid {
            display: grid;
            grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
            gap: clamp(2rem, 5vw, 4.5rem);
            align-items: center;
          }
          .compare-copy .eyebrow { margin-bottom: 14px; }
          .compare-copy .headline-l { margin-bottom: 16px; }
          .compare-points {
            list-style: none;
            margin: 26px 0 30px;
            display: flex; flex-direction: column; gap: 14px;
          }
          .compare-points li {
            display: flex; align-items: flex-start; gap: 12px;
            font-size: 1rem; color: var(--ink-soft); font-weight: 500;
            line-height: 1.5;
          }
          .compare-check {
            flex-shrink: 0;
            width: 22px; height: 22px; border-radius: 50%;
            background: var(--blue); color: #fff;
            display: flex; align-items: center; justify-content: center;
            margin-top: 1px;
          }
          .compare-cta { margin-top: 4px; }

          /* Comparison cards */
          .compare-cards {
            background: var(--bg);
            border: 1px solid var(--border);
            border-radius: var(--radius-xl);
            padding: clamp(18px, 2.4vw, 28px);
            box-shadow: var(--shadow-elev);
          }
          .compare-cards-head {
            text-align: center;
            font-weight: 700;
            font-size: 0.98rem;
            color: var(--ink);
            margin-bottom: 18px;
          }
          .compare-cards-row {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 12px;
          }
          .compare-card {
            background: var(--surface);
            border: 1px solid var(--border);
            border-radius: var(--radius-md);
            padding: 18px 14px;
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            transition: all 0.3s ease;
          }
          .compare-card--hl {
            border-color: var(--blue);
            box-shadow: 0 12px 30px rgba(0,137,236,0.16);
            transform: translateY(-6px);
          }
          .compare-card-tag {
            display: inline-flex; align-items: center; gap: 4px;
            font-size: 0.72rem; font-weight: 700;
            color: var(--text-muted);
            margin-bottom: 10px;
          }
          .compare-card-tag--hl { color: var(--blue); }
          .compare-card-company {
            font-weight: 700; font-size: 0.92rem; color: var(--ink-soft);
            margin-bottom: 6px;
          }
          .compare-card-price {
            font-size: 1.2rem; color: var(--ink); margin-bottom: 14px;
            font-variant-numeric: tabular-nums;
          }
          .compare-card-price strong { font-weight: 800; font-size: 1.5rem; letter-spacing: -0.02em; }
          .compare-card-btn {
            width: 100%;
            padding: 9px 0;
            border-radius: 10px;
            font-size: 0.85rem; font-weight: 700;
            text-decoration: none;
            text-align: center;
            background: var(--surface);
            color: var(--blue);
            border: 1.5px solid var(--blue);
            transition: all 0.25s ease;
            margin-bottom: 16px;
          }
          .compare-card-btn:hover { background: var(--blue-tint); }
          .compare-card-btn--hl { background: var(--blue); color: #fff; border-color: var(--blue); }
          .compare-card-btn--hl:hover { background: var(--blue-dark); }
          .compare-card-feats {
            list-style: none;
            display: flex; flex-direction: column; gap: 9px;
            width: 100%;
            border-top: 1px solid var(--border);
            padding-top: 14px;
          }
          .compare-card-feats li {
            display: flex; align-items: flex-start; gap: 7px;
            font-size: 0.74rem; color: var(--text-secondary);
            line-height: 1.35; text-align: left; font-weight: 500;
          }
          .compare-card-feats svg { color: var(--blue); flex-shrink: 0; margin-top: 2px; }
          .compare-cards-note {
            text-align: center;
            font-size: 0.74rem;
            color: var(--text-muted);
            margin-top: 16px;
          }

          @media (max-width: 1024px) {
            .compare-grid { grid-template-columns: 1fr; }
          }
          @media (max-width: 560px) {
            .compare-cards-row { grid-template-columns: 1fr; }
            .compare-card--hl { transform: none; }
          }
        ` }} />
      </section>

      {/* Live price estimator */}
      <PremiumEstimator />

      {/* 4-step process */}
      <HowItWorks />

      {/* Feature article */}
      <PromoSection />

      {/* Live impact stats */}
      <LiveImpact />

      {/* Why us */}
      <WhyUs />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA banner — light blue */}
      <section className="section-sm cta-banner">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, ease: easeOutExpo }}
            className="cta-card"
          >
            <div className="cta-card-glow" aria-hidden />
            <div className="cta-card-inner">
              <span className="cta-eyebrow">Bir adımınız kaldı</span>
              <h2 className="cta-headline">Güvenceniz bir tık uzakta.</h2>
              <p className="cta-lede">
                Ücretsiz teklif alın, 20+ şirketi karşılaştırın, dakikalar içinde
                dijital poliçenize sahip olun.
              </p>
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} style={{ display: "inline-block", marginTop: 26 }}>
                <Link href="/teklif-al" className="btn cta-button">
                  Ücretsiz Teklif Al <ArrowRight size={18} />
                </Link>
              </motion.div>
              <div className="cta-foot">
                <span>SEGEM Lisanslı</span>
                <span className="cta-foot-sep" />
                <span>T.C. Hazine Denetimi</span>
                <span className="cta-foot-sep" />
                <span>KVKK Uyumlu</span>
              </div>
            </div>
          </motion.div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          .cta-banner { background: var(--bg); }
          .cta-card {
            position: relative;
            background: linear-gradient(135deg, var(--blue) 0%, var(--blue-deep) 100%);
            border-radius: var(--radius-xl);
            padding: clamp(40px, 6vw, 72px) clamp(24px, 5vw, 64px);
            overflow: hidden;
            box-shadow: 0 30px 70px -20px rgba(0,137,236,0.5);
          }
          .cta-card-glow {
            position: absolute;
            top: -40%; right: -10%;
            width: 500px; height: 500px;
            background: radial-gradient(circle, rgba(255,115,0,0.30) 0%, transparent 62%);
            pointer-events: none;
          }
          .cta-card-inner { position: relative; z-index: 1; text-align: center; max-width: 640px; margin: 0 auto; }
          .cta-eyebrow {
            display: inline-block;
            font-size: 0.8rem; font-weight: 700;
            letter-spacing: 0.04em; text-transform: uppercase;
            color: rgba(255,255,255,0.85);
            margin-bottom: 14px;
          }
          .cta-headline {
            font-family: var(--font-sans);
            font-weight: 800;
            font-size: clamp(1.9rem, 4vw, 3.2rem);
            color: #fff;
            letter-spacing: -0.03em;
            line-height: 1.08;
            margin-bottom: 14px;
          }
          .cta-lede {
            color: rgba(255,255,255,0.9);
            font-size: 1.08rem; line-height: 1.6;
            max-width: 520px; margin: 0 auto;
          }
          .cta-button {
            background: #fff !important;
            color: var(--blue) !important;
            font-size: 1rem !important;
            padding: 1.05rem 2.4rem !important;
            font-weight: 800 !important;
            box-shadow: 0 14px 30px rgba(0,0,0,0.18) !important;
          }
          .cta-button:hover { background: #fff !important; transform: translateY(-2px); }
          .cta-foot {
            display: flex; align-items: center; justify-content: center;
            gap: 14px; flex-wrap: wrap;
            margin-top: 34px; padding-top: 26px;
            border-top: 1px solid rgba(255,255,255,0.2);
            font-size: 0.78rem; font-weight: 700;
            color: rgba(255,255,255,0.9);
            letter-spacing: 0.02em;
          }
          .cta-foot-sep { width: 4px; height: 4px; border-radius: 50%; background: rgba(255,255,255,0.4); }
          @media (max-width: 640px) {
            .cta-button { width: 100%; justify-content: center; }
            .cta-foot { gap: 10px; }
          }
        ` }} />
      </section>

      <FAQ />
    </>
  );
}
