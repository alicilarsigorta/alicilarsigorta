"use client";

import InsuranceCards from "@/components/InsuranceCards";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const stats = [
  { value: "20+", label: "Sigorta Şirketi" },
  { value: "8", label: "Farklı Branş" },
  { value: "%99", label: "Memnuniyet" },
];

export default function UrunlerimizPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--white)" }}>
      <section className="page-hero">
        <div className="container">
          <div className="page-hero__inner">
            <div className="section-badge">8 Farklı Branş</div>
            <h1 className="page-hero__title">Tüm <span className="gold">sigorta hizmetlerimiz</span></h1>
            <p className="page-hero__sub">
              Türkiye&apos;nin en kapsamlı sigorta portföyü. İhtiyacınıza en uygun branşı seçin ve ücretsiz teklif alın.
            </p>
          </div>

          <div className="urn-stats">
            {stats.map((s) => (
              <div key={s.label} className="urn-stat">
                <div className="stat-number">{s.value}</div>
                <div className="urn-stat__label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--white)" }}>
        <div className="container">
          <InsuranceCards />
        </div>
      </section>

      <section style={{ background: "var(--ink)", padding: "clamp(72px, 10vw, 128px) 0", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.85rem, 4.5vw, 3rem)", fontWeight: 400, color: "#fff", marginBottom: 18, lineHeight: 1.05, letterSpacing: "-0.025em" }}>
            Hangi sigortaya ihtiyacınız var?{" "}
            <span style={{ fontStyle: "italic", color: "var(--gold-light)", fontWeight: 300 }}>Biz bulalım.</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", marginBottom: 32, lineHeight: 1.6 }}>
            Size en uygun poliçeyi saniyeler içinde belirleyelim. Ücretsiz ve bağlayıcı değildir.
          </p>
          <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
            <Link href="/teklif-al" className="btn" style={{ background: "#fff", color: "var(--ink)", padding: "1.05rem 2.25rem", borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 500 }}>
              Ücretsiz Teklif Al <ArrowUpRight size={16} strokeWidth={1.5} />
            </Link>
            <Link href="/iletisim" style={{ color: "rgba(255,255,255,0.85)", fontWeight: 500, textDecoration: "none", borderBottom: "1px solid rgba(255,255,255,0.4)", paddingBottom: 4 }}>
              İletişime geç
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        .urn-stats {
          display: grid;
          grid-template-columns: repeat(3, auto);
          gap: clamp(32px, 6vw, 80px);
          padding-top: clamp(40px, 5vw, 64px);
          margin-top: clamp(40px, 5vw, 64px);
          border-top: 1px solid var(--hairline);
          justify-content: start;
        }
        .urn-stat__label {
          font-family: var(--font-sans);
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
          margin-top: 8px;
        }
        @media (max-width: 640px) {
          .urn-stats { grid-template-columns: repeat(3, 1fr); gap: 16px; }
        }
      `}</style>
    </div>
  );
}
