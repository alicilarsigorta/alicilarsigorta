"use client";

import CampaignSlider from "@/components/CampaignSlider";
import Hero from "@/components/Hero";
import PartnerMarquee from "@/components/PartnerMarquee";
import InsuranceCards from "@/components/InsuranceCards";
import WhyUs from "@/components/WhyUs";
import PromoSection from "@/components/PromoSection";
import FAQ from "@/components/FAQ";
import Link from "next/link";
import { ArrowRight, Sparkles, Shield } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <CampaignSlider />
      <Hero />

      <PartnerMarquee />

      {/* Products */}
      <section className="section" style={{ background: "var(--white)" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "clamp(48px, 6vw, 80px)", gap: 32, flexWrap: "wrap" }}
          >
            <div style={{ maxWidth: 640 }}>
              <div className="section-badge">Ürün Portföyümüz</div>
              <h2 className="section-title">Sigorta <span className="gold">çözümlerimiz</span></h2>
              <p className="section-sub">İhtiyaç duyduğunuz güvence mutlaka var. Doğru branşı seçin, anında teklif alın.</p>
            </div>
            <Link href="/urunlerimiz" style={{ color: "var(--ink)", fontWeight: 500, fontSize: "0.95rem", textDecoration: "none", borderBottom: "1px solid var(--ink)", paddingBottom: 2, display: "inline-flex", alignItems: "center", gap: 6 }}>
              Tümünü Gör
              <ArrowRight size={16} strokeWidth={1.75} />
            </Link>
          </motion.div>
          <InsuranceCards />
        </div>
      </section>

      <PromoSection />

      <WhyUs />

      {/* CTA Banner — editorial */}
      <section style={{ background: "var(--ink)", padding: "clamp(72px, 10vw, 144px) 0", position: "relative", overflow: "hidden" }}>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            style={{ maxWidth: 920, margin: "0 auto", textAlign: "center" }}
          >
            <div className="section-badge" style={{ color: "rgba(184,134,11,0.95)" }}>Hemen Başlayın</div>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 5.5vw, 4.25rem)", fontWeight: 400, color: "#fff", letterSpacing: "-0.03em", marginBottom: 24, lineHeight: 1.05 }}>
              Güvenliğiniz için{" "}
              <span style={{ fontStyle: "italic", color: "var(--gold-light)", fontWeight: 300 }}>bir adım</span> uzaktasınız.
            </h2>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "clamp(1rem, 1.4vw, 1.15rem)", marginBottom: 44, maxWidth: 540, margin: "0 auto 44px", lineHeight: 1.6 }}>
              Ücretsiz teklif alın, 20+ şirketi karşılaştırın ve dakikalar içinde güvence altına girin.
            </p>
            <Link href="/teklif-al" className="btn" style={{ background: "#fff", color: "var(--ink)", padding: "1.05rem 2.25rem", borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 10, fontWeight: 600 }}>
              Ücretsiz Teklif Al
              <ArrowRight size={18} strokeWidth={2} />
            </Link>
          </motion.div>
        </div>
      </section>

      <FAQ />
    </>
  );
}
