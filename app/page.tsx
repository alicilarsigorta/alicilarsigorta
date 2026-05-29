"use client";

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
      {/* Fintech glass-card hero */}
      <Hero />

      {/* Regulatory trust signals — right below hero so they anchor first impression */}
      <TrustBar />

      {/* Partner logo marquee — sigorta şirketleri */}
      <PartnerMarquee />

      {/* Products — dashboard tile bento */}
      <section className="section" style={{ background: "var(--navy-deep)", position: "relative", overflow: "hidden" }}>
        <div aria-hidden className="mint-glow-bg" style={{ top: "10%", right: "-10%" }} />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <motion.div
            variants={stagger(0.08, 0)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="products-header"
          >
            <motion.div variants={fadeUp} className="products-header-left">
              <span className="eyebrow">Portföy — Sekiz Branş</span>
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
                Tüm Branşlar <ArrowRight size={14} strokeWidth={2.4} />
              </Link>
            </motion.div>
          </motion.div>

          <InsuranceCards />
        </div>

        <style dangerouslySetInnerHTML={{
          __html: `
          .products-header {
            display: grid;
            grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
            gap: clamp(2rem, 6vw, 6rem);
            align-items: flex-end;
            margin-bottom: 56px;
          }
          .products-headline { margin: 0; max-width: 720px; }
          .products-lede {
            font-size: 1.04rem;
            line-height: 1.7;
            color: var(--text-secondary);
            font-weight: 400;
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

      {/* Live impact dashboard */}
      <LiveImpact />

      {/* Why us — 4 differentiators */}
      <WhyUs />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA banner — fintech glass back-cover */}
      <section className="section-sm cta-banner">
        <div aria-hidden className="cta-glow-mint" />
        <div aria-hidden className="cta-glow-violet" />

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, ease: easeOutExpo }}
            className="cta-body"
          >
            <span className="eyebrow" style={{ justifyContent: "center" }}>
              Bir adımınız kaldı
            </span>
            <h2 className="cta-headline">
              Güvenceniz <em>bir tık uzakta.</em>
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
              <Link href="/teklif-al" className="btn btn-gold cta-button">
                Ücretsiz Teklif Al
                <ArrowRight size={18} />
              </Link>
            </motion.div>

            <div className="cta-foot">
              <span className="byline">SEGEM Lisanslı</span>
              <span className="cta-foot-sep" />
              <span className="byline">T.C. Hazine Denetimi</span>
              <span className="cta-foot-sep" />
              <span className="byline">KVKK Uyumlu</span>
            </div>
          </motion.div>
        </div>

        <style dangerouslySetInnerHTML={{
          __html: `
          .cta-banner {
            background: var(--navy-deepest);
            position: relative;
            overflow: hidden;
            border-top: 1px solid var(--glass-border);
          }
          .cta-glow-mint {
            position: absolute;
            top: -20%;
            left: 10%;
            width: 600px;
            height: 400px;
            background: radial-gradient(ellipse, var(--mint-glow) 0%, transparent 65%);
            filter: blur(50px);
            pointer-events: none;
          }
          .cta-glow-violet {
            position: absolute;
            bottom: -20%;
            right: 10%;
            width: 500px;
            height: 400px;
            background: radial-gradient(ellipse, var(--violet-glow) 0%, transparent 65%);
            filter: blur(50px);
            pointer-events: none;
          }
          .cta-body {
            text-align: center;
            max-width: 720px;
            margin: 0 auto;
          }
          .cta-headline {
            font-family: var(--font-sans);
            font-weight: 700;
            font-size: clamp(2.4rem, 5vw, 4.2rem);
            color: var(--text-primary);
            letter-spacing: -0.035em;
            line-height: 1.04;
            margin: 14px 0 18px;
          }
          .cta-headline em {
            font-style: normal;
            font-weight: 700;
            background: linear-gradient(135deg, var(--mint) 0%, var(--violet) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            display: inline-block;
          }
          .cta-lede {
            color: var(--text-secondary);
            font-size: 1.08rem;
            line-height: 1.7;
            max-width: 560px;
            margin: 0 auto;
            font-weight: 400;
          }
          .cta-lede strong { color: var(--mint); font-weight: 600; }
          .cta-button {
            font-size: 1rem !important;
            padding: 1.1rem 2.4rem !important;
            font-weight: 700 !important;
          }
          .cta-foot {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 14px;
            flex-wrap: wrap;
            margin-top: 40px;
            padding-top: 28px;
            border-top: 1px solid var(--glass-border);
          }
          .cta-foot-sep {
            width: 4px;
            height: 4px;
            border-radius: 50%;
            background: var(--glass-border-strong);
          }
          @media (max-width: 640px) {
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
