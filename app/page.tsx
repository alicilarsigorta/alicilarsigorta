"use client";

import EditorialRibbon from "@/components/EditorialRibbon";
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
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { easeOutExpo, viewportOnce, fadeUp, stagger } from "@/lib/motion";

export default function Home() {
  return (
    <>
      {/* Top — editorial ribbon ticker sits inside the header padding zone */}
      <EditorialRibbon />

      {/* Editorial magazine-cover hero */}
      <Hero />

      {/* Regulatory trust signals — right below hero so they anchor first impression */}
      <TrustBar />

      {/* Partner logo marquee — sigorta şirketleri */}
      <PartnerMarquee />

      {/* Products — editorial bento grid */}
      <section className="section" style={{ background: "var(--paper-soft)" }}>
        <div className="container">
          <motion.div
            variants={stagger(0.08, 0)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="products-header"
          >
            <motion.div variants={fadeUp} className="products-header-left">
              <span className="issue-marker">Portföy &nbsp;·&nbsp; Sekiz Branş</span>
              <h2 className="headline-l products-headline">
                Hayatınızın her detayı için <em>tek çatı.</em>
              </h2>
            </motion.div>
            <motion.div variants={fadeUp} className="products-header-right">
              <p className="products-lede">
                İhtiyacınız ne olursa olsun, doğru branşı seçin — uzman ekibimiz
                dakikalar içinde size en uygun teminatı bulsun.
              </p>
              <Link href="/urunlerimiz" className="ed-link" style={{ marginTop: 18 }}>
                Tüm Branşlar <ArrowUpRight size={14} strokeWidth={2.4} />
              </Link>
            </motion.div>
          </motion.div>

          <div className="rule-editorial" aria-hidden style={{ marginBottom: 32 }} />

          <InsuranceCards />
        </div>

        <style dangerouslySetInnerHTML={{
          __html: `
          .products-header {
            display: grid;
            grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
            gap: clamp(2rem, 6vw, 6rem);
            align-items: flex-end;
            margin-bottom: 36px;
          }
          .products-header-left .issue-marker { margin-bottom: 24px; }
          .products-headline { margin: 0; max-width: 720px; }
          .products-lede {
            font-size: 1.04rem;
            line-height: 1.7;
            color: var(--gray);
            font-weight: 500;
            max-width: 460px;
          }
          @media (max-width: 1024px) {
            .products-header { grid-template-columns: 1fr; gap: 24px; align-items: flex-start; }
          }
          `,
        }} />
      </section>

      {/* Anlık tahmini fiyat — konversiyon canavarı */}
      <PremiumEstimator />

      {/* 4-step process */}
      <HowItWorks />

      {/* Editorial feature article */}
      <PromoSection />

      {/* Dark live-impact bar — visual rhythm break + corporate scale signal */}
      <LiveImpact />

      {/* Why us — 4 differentiators */}
      <WhyUs />

      {/* Testimonials editorial pull-quote */}
      <Testimonials />

      {/* CTA banner — magazine back-cover, disciplined editorial */}
      <section
        className="section-sm cta-banner"
        style={{
          background: "var(--ink)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div aria-hidden className="cta-banner-glow" />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          {/* Back-cover masthead */}
          <div className="cta-masthead">
            <span style={{ color: "var(--gold-light)" }}>Alıcılar &nbsp;·&nbsp; Sigorta</span>
            <span className="cta-masthead-center">
              <em className="script">Issue 01 — Son sayfa</em>
            </span>
            <span style={{ color: "var(--gold-light)" }}>{new Date().getFullYear()}</span>
          </div>

          <div className="cta-rule" aria-hidden />

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: easeOutExpo }}
            className="cta-body"
          >
            <h2 className="cta-headline headline-xl">
              Güvenceniz{" "}
              <em className="cta-headline-em">bir tık uzakta.</em>
            </h2>
            <p className="cta-lede">
              Ücretsiz teklif alın, <strong>20+ şirketi</strong> karşılaştırın,
              dakikalar içinde dijital poliçenize sahip olun.
            </p>
            <motion.div
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.97 }}
              style={{ display: "inline-block", marginTop: 32 }}
            >
              <Link
                href="/teklif-al"
                className="btn btn-gold cta-button"
              >
                Ücretsiz Teklif Al
                <ArrowUpRight size={20} />
              </Link>
            </motion.div>
          </motion.div>

          <div className="cta-rule" aria-hidden style={{ marginTop: 56 }} />
          <div className="cta-foot">
            <span className="byline" style={{ color: "var(--gold-light)" }}>SEGEM Lisanslı</span>
            <span className="byline" style={{ color: "rgba(255,255,255,0.45)" }}>·</span>
            <span className="byline" style={{ color: "var(--gold-light)" }}>T.C. Hazine Denetimi</span>
            <span className="byline" style={{ color: "rgba(255,255,255,0.45)" }}>·</span>
            <span className="byline" style={{ color: "var(--gold-light)" }}>KVKK Uyumlu</span>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{
          __html: `
          .cta-banner-glow {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            width: 900px;
            height: 500px;
            background: radial-gradient(ellipse, rgba(176,112,80,0.18) 0%, transparent 65%);
            filter: blur(50px);
            pointer-events: none;
          }
          .cta-masthead {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            padding: 8px 0 18px;
            font-family: var(--font-sans);
            font-size: 0.7rem;
            font-weight: 800;
            letter-spacing: 0.22em;
            text-transform: uppercase;
            flex-wrap: wrap;
          }
          .cta-masthead-center {
            font-size: 0.86rem;
            color: rgba(255,255,255,0.6);
            text-transform: none;
            letter-spacing: 0.04em;
          }
          .cta-rule {
            height: 1px;
            background: rgba(255,255,255,0.18);
            margin: 0 0 56px;
          }
          .cta-body {
            text-align: center;
            max-width: 820px;
            margin: 0 auto;
          }
          .cta-headline {
            color: #fff;
            margin: 0 0 26px;
          }
          .cta-headline-em {
            font-style: italic;
            font-weight: 400;
            background: linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            display: inline-block;
          }
          .cta-lede {
            color: rgba(255,255,255,0.7);
            font-size: 1.12rem;
            line-height: 1.7;
            max-width: 580px;
            margin: 0 auto;
            font-weight: 400;
          }
          .cta-lede strong { color: #fff; font-weight: 700; }
          .cta-button {
            font-size: 1.02rem;
            padding: 1.15rem 2.6rem;
            box-shadow: 0 24px 60px rgba(176, 112, 80, 0.45);
          }
          .cta-foot {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 18px;
            flex-wrap: wrap;
            padding-top: 4px;
          }
          @media (max-width: 640px) {
            .cta-masthead { font-size: 0.62rem; gap: 12px; }
            .cta-masthead-center { font-size: 0.72rem; flex-basis: 100%; order: 99; text-align: center; }
            .cta-button { width: 100%; justify-content: center; }
            .cta-foot { gap: 10px; }
          }
          `,
        }} />
      </section>

      <FAQ />
    </>
  );
}
