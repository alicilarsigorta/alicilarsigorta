"use client";

import InsuranceCards from "@/components/InsuranceCards";
import { motion } from "framer-motion";
import Link from "next/link";
import { ShieldCheck, ArrowRight, Sparkles } from "lucide-react";

export default function UrunlerimizPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--off-white)" }}>
      {/* ── Hero Section ── */}
      <div
        style={{
          position: "relative",
          background: "var(--cream)",
          borderBottom: "1px solid var(--border)",
          overflow: "hidden",
        }}
      >
        {/* Decorative radials */}
        <div
          style={{
            position: "absolute",
            top: "-40%",
            right: "-15%",
            width: "700px",
            height: "700px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(176, 112, 80,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-50%",
            left: "-10%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(176, 112, 80,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          className="container urunler-hero-inner"
          style={{
            textAlign: "center",
            position: "relative",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-badge">
              <Sparkles size={14} /> 8 Farklı Branş
            </div>
            <h1 className="section-title" style={{ marginTop: "16px" }}>
              Tüm <span className="gold">Sigorta Hizmetlerimiz</span>
            </h1>
            <p
              className="section-sub"
              style={{ margin: "20px auto 0", textAlign: "center" }}
            >
              Türkiye&apos;nin en kapsamlı sigorta portföyü. İhtiyacınıza en uygun
              branşı seçin ve ücretsiz teklif alın.
            </p>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "clamp(24px, 5vw, 60px)",
              marginTop: "48px",
              flexWrap: "wrap",
            }}
          >
            {[
              { value: "20+", label: "Sigorta Şirketi" },
              { value: "8", label: "Farklı Branş" },
              { value: "%99", label: "Memnuniyet" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.1 }}
                style={{ textAlign: "center" }}
              >
                <div className="stat-number" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)" }}>
                  {stat.value}
                </div>
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--gray)",
                    fontWeight: 600,
                    marginTop: "6px",
                    letterSpacing: "0.5px",
                  }}
                >
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Insurance Cards Section ── */}
      <div className="container urunler-cards-section">
        <InsuranceCards />
      </div>

      {/* ── Trust & CTA Section ── */}
      <div
        style={{
          background: "var(--black)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "800px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(176, 112, 80,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          className="container urunler-cta"
          style={{
            textAlign: "center",
            position: "relative",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ maxWidth: "700px", margin: "0 auto" }}
          >
            <div
              style={{
                width: "72px",
                height: "72px",
                borderRadius: "20px",
                background: "linear-gradient(135deg, rgba(176, 112, 80,0.15), rgba(201, 135, 107,0.08))",
                border: "1px solid rgba(176, 112, 80,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 28px",
                color: "var(--gold)",
              }}
            >
              <ShieldCheck size={32} />
            </div>
            <h2
              style={{
                fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
                fontWeight: 900,
                color: "#fff",
                marginBottom: "16px",
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
              }}
            >
              Hangi Sigortaya İhtiyacınız Var?{" "}
              <span className="gold-shimmer">Biz Bulalım.</span>
            </h2>
            <p
              style={{
                color: "rgba(255,255,255,0.55)",
                fontSize: "1.05rem",
                lineHeight: 1.7,
                marginBottom: "36px",
                fontWeight: 500,
              }}
            >
              Size en uygun poliçeyi saniyeler içinde belirleyelim. Ücretsiz ve
              bağlayıcı değildir.
            </p>
            <div
              style={{
                display: "flex",
                gap: "16px",
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <Link href="/teklif-al" className="btn btn-gold">
                Ücretsiz Teklif Al <ArrowRight size={18} />
              </Link>
              <Link href="/iletisim" className="btn btn-outline" style={{ color: "#fff", borderColor: "rgba(176, 112, 80,0.4)" }}>
                İletişime Geç
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
      <style jsx global>{`
        .urunler-hero-inner { padding: 140px 1.25rem 80px; }
        .urunler-cards-section { padding: 80px 1.25rem; }
        .urunler-cta { padding: 80px 1.25rem; }
        @media (max-width: 768px) {
          .urunler-hero-inner { padding: 80px 1rem 56px; }
          .urunler-cards-section { padding: 56px 1rem; }
          .urunler-cta { padding: 56px 1rem; }
        }
      `}</style>
    </div>
  );
}
