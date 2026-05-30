"use client";

import Hero from "@/components/Hero";
import QuickQuote from "@/components/QuickQuote";
import PartnerMarquee from "@/components/PartnerMarquee";
import CampaignCarousel from "@/components/CampaignCarousel";
import HospitalSection from "@/components/HospitalSection";
import FAQ from "@/components/FAQ";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { easeOutExpo, viewportOnce } from "@/lib/motion";

export default function Home() {
  return (
    <>
      {/* Product-launcher hero */}
      <Hero />

      {/* Teklif alma yeri — quick quote */}
      <QuickQuote />

      {/* Partner brand logos */}
      <PartnerMarquee />

      {/* Kayan görseller — campaign carousel */}
      <CampaignCarousel />

      {/* Hastane / Tamamlayıcı Sağlık */}
      <HospitalSection />

      {/* SSS */}
      <FAQ />

      {/* CTA banner — light blue card */}
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
          @media (max-width: 640px) {
            .cta-button { width: 100%; justify-content: center; }
          }
        ` }} />
      </section>
    </>
  );
}
