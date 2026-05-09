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
      <section className="section" style={{ background: "var(--off-white)" }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "56px", gap: 24, flexWrap: "wrap" }}
          >
            <div>
              <div className="section-badge">● Ürün Portföyümüz</div>
              <h2 className="section-title">Tüm <span className="gold">Sigorta Çözümlerimiz</span></h2>
              <p className="section-sub">İhtiyaç duyduğunuz güvence mutlaka var. Doğru branşı seçin, anında teklif alın.</p>
            </div>
            <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
              <Link href="/urunlerimiz" className="btn btn-outline" style={{ fontSize: "0.95rem", padding: "0.9rem 2rem", flexShrink: 0 }}>
                Tümünü Gör <ArrowRight size={18} />
              </Link>
            </motion.div>
          </motion.div>
          <InsuranceCards />
        </div>
      </section>

      <PromoSection />

      <WhyUs />

      {/* CTA Banner — Animated */}
      <section className="section-sm" style={{ background: "var(--black)", position: "relative", overflow: "hidden" }}>
        {/* Animated glow */}
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 800, height: 400, background: "radial-gradient(ellipse, rgba(212,160,23,0.2) 0%, transparent 70%)", pointerEvents: "none" }}
        />
        {/* Floating particles */}
        {[0,1,2,3].map(i => (
          <motion.div
            key={i}
            animate={{
              y: [0, -60 - i * 20, 0],
              x: [0, 20 * (i % 2 === 0 ? 1 : -1), 0],
              opacity: [0, 0.4, 0],
            }}
            transition={{ duration: 5 + i * 1.5, repeat: Infinity, delay: i * 1.2, ease: "easeInOut" }}
            style={{
              position: "absolute", width: 6, height: 6, borderRadius: "50%",
              background: "var(--gold)", top: `${30 + i * 15}%`, left: `${15 + i * 20}%`,
              pointerEvents: "none", filter: "blur(1px)",
            }}
          />
        ))}

        <div className="container" style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: 50, filter: "blur(12px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="section-badge"
              style={{ background: "rgba(212,160,23,0.1)", borderColor: "rgba(212,160,23,0.3)", color: "var(--gold-light)" }}
              whileHover={{ scale: 1.08 }}
            >
              <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 6, repeat: Infinity, ease: "linear" }}>
                <Sparkles size={14} />
              </motion.span>
              Hemen Başlayın
            </motion.div>
            <h2 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900, color: "#fff", letterSpacing: "-0.03em", marginBottom: 20, lineHeight: 1.1 }}>
              Güvenliğiniz İçin <span style={{ background: "linear-gradient(135deg, var(--gold), var(--gold-light))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", display: "inline-block" }}>Bir Adım Uzaktasınız</span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1.1rem", marginBottom: 40, maxWidth: 500, margin: "0 auto 40px", lineHeight: 1.7 }}>
              Ücretsiz teklif alın, 20+ şirketi karşılaştırın ve dakikalar içinde güvence altına girin.
            </p>
            <motion.div
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              style={{ display: "inline-block" }}
            >
              <Link href="/teklif-al" className="btn btn-gold" style={{ fontSize: "1.1rem", padding: "1.2rem 3rem" }}>
                Ücretsiz Teklif Al
                <motion.span animate={{ x: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight size={22} />
                </motion.span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <FAQ />
    </>
  );
}
