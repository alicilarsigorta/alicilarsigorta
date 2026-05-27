"use client";

import CampaignSlider from "@/components/CampaignSlider";
import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import PartnerMarquee from "@/components/PartnerMarquee";
import InsuranceCards from "@/components/InsuranceCards";
import PremiumEstimator from "@/components/PremiumEstimator";
import HowItWorks from "@/components/HowItWorks";
import PromoSection from "@/components/PromoSection";
import LiveImpact from "@/components/LiveImpact";
import WhyUs from "@/components/WhyUs";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { easeOutExpo, viewportOnce, fadeUp, stagger } from "@/lib/motion";

export default function Home() {
  return (
    <>
      {/* Top — campaign carousel sits inside the header padding zone */}
      <CampaignSlider />

      {/* Editorial hero */}
      <Hero />

      {/* Regulatory trust signals — right below hero so they anchor first impression */}
      <TrustBar />

      {/* Partner logo marquee — sigorta şirketleri */}
      <PartnerMarquee />

      {/* Products grid */}
      <section className="section" style={{ background: "var(--off-white)" }}>
        <div className="container">
          <motion.div
            variants={stagger(0.08, 0)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              marginBottom: 56,
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <motion.div variants={fadeUp} style={{ maxWidth: 620 }}>
              <span className="eyebrow">Portföyümüz · 8 branş</span>
              <h2 className="section-title">
                Hayatınızın her alanı için{" "}
                <span className="gold">tek çatı</span>
              </h2>
              <p className="section-sub" style={{ marginTop: 16 }}>
                İhtiyacınız ne olursa olsun, doğru branşı seçin — uzman ekibimiz dakikalar içinde size en uygun teminatı bulsun.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} whileHover={{ y: -2 }}>
              <Link
                href="/urunlerimiz"
                className="btn btn-outline"
                style={{
                  fontSize: "0.95rem",
                  padding: "0.85rem 1.8rem",
                  flexShrink: 0,
                }}
              >
                Tümünü Gör <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
          <InsuranceCards />
        </div>
      </section>

      {/* Anlık tahmini fiyat — konversiyon canavarı */}
      <PremiumEstimator />

      {/* 4-step process */}
      <HowItWorks />

      {/* Editorial promo */}
      <PromoSection />

      {/* Dark live-impact bar — visual rhythm break + corporate scale signal */}
      <LiveImpact />

      {/* Why us — 4 differentiators */}
      <WhyUs />

      {/* Testimonials carousel */}
      <Testimonials />

      {/* Refined CTA banner — sade, kurumsal */}
      <section
        className="section-sm cta-banner"
        style={{
          background: "var(--ink)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="mesh-bg" aria-hidden style={{ opacity: 0.4 }} />
        <div aria-hidden className="cta-banner-glow" />

        <div
          className="container"
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            maxWidth: 720,
            margin: "0 auto",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: easeOutExpo }}
          >
            <span
              className="eyebrow"
              style={{ color: "var(--gold-light)", justifyContent: "center", marginBottom: 24 }}
            >
              Bir adımınız kaldı
            </span>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 500,
                fontSize: "clamp(2rem, 4.5vw, 3.4rem)",
                color: "#fff",
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
                marginBottom: 18,
                fontOpticalSizing: "auto",
              }}
            >
              Güvenceniz{" "}
              <span
                style={{
                  fontStyle: "italic",
                  fontWeight: 400,
                  background:
                    "linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  display: "inline-block",
                }}
              >
                bir tık uzakta.
              </span>
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: "1.08rem",
                marginBottom: 36,
                lineHeight: 1.7,
                maxWidth: 540,
                margin: "0 auto 36px",
              }}
            >
              Ücretsiz teklif alın, 20+ şirketi karşılaştırın, dakikalar içinde dijital poliçenize sahip olun.
            </p>
            <motion.div
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              style={{ display: "inline-block" }}
            >
              <Link
                href="/teklif-al"
                className="btn btn-gold"
                style={{ fontSize: "1.05rem", padding: "1.15rem 2.8rem" }}
              >
                Ücretsiz Teklif Al
                <ArrowRight size={20} />
              </Link>
            </motion.div>
          </motion.div>
        </div>

        <style dangerouslySetInnerHTML={{
          __html: `
          .cta-banner-glow {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            width: 800px;
            height: 400px;
            background: radial-gradient(ellipse, rgba(201,164,73,0.20) 0%, transparent 65%);
            filter: blur(40px);
            pointer-events: none;
          }
          `,
        }} />
      </section>

      <FAQ />
    </>
  );
}
