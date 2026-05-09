import { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Hakkımızda | Alıcılar Sigorta",
  description: "Alıcılar Sigorta olarak Türkiye'nin önde gelen 20+ sigorta şirketiyle anlaşmalı güvenilir sigorta platformuyuz.",
};

const stats = [
  { value: "15+", label: "Yıl Deneyim" },
  { value: "20+", label: "Anlaşmalı Şirket" },
  { value: "500K+", label: "Mutlu Müşteri" },
  { value: "7/24", label: "Destek" },
];

export default function HakkimizdaPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="page-hero__inner">
            <div className="section-badge">Kurumsal</div>
            <h1 className="page-hero__title">
              Biz <span className="gold">kimiz</span>?
            </h1>
            <p className="page-hero__sub">
              Yılların getirdiği tecrübe ile Türkiye&apos;nin en seçkin sigorta şirketlerini tek bir platformda sizin için buluşturuyoruz.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--white)" }}>
        <div className="container">
          <div className="hk-grid">
            <div className="hk-text">
              <h2 className="hk-h2">
                Güveniniz, bizim <span className="gold">en büyük sermayemiz</span>
              </h2>
              <p>
                Alıcılar Sigorta, müşteri odaklı hizmet anlayışıyla sektörde fark yaratan bağımsız bir sigorta platformudur. Amacımız, müşterilerimizin karmaşık sigorta dünyasında yollarını kolayca bulmalarını sağlamak ve onlara en uygun fiyatlarla en geniş kapsamlı korumayı sunmaktır.
              </p>
              <p>
                20&apos;den fazla lider sigorta şirketi ile yaptığımız güçlü ortaklıklar sayesinde, Kasko&apos;dan Sağlığa, DASK&apos;tan İşyeri Sigortalarına kadar geniş bir yelpazede tamamen şeffaf ve karşılaştırmalı teklifler üretiyoruz.
              </p>
            </div>

            <div className="hk-stats">
              {stats.map((s, i) => (
                <div key={i} className="hk-stat">
                  <div className="stat-number">{s.value}</div>
                  <div className="hk-stat__label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--ink)", padding: "clamp(72px, 10vw, 128px) 0", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 400, color: "#fff", marginBottom: 20, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
            Hemen <span style={{ fontStyle: "italic", color: "var(--gold-light)", fontWeight: 300 }}>güvence altına</span> alın
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", marginBottom: 32, lineHeight: 1.6 }}>
            Siz de binlerce mutlu müşterimiz arasına katılın. Saniyeler içinde ücretsiz teklifinizi alın.
          </p>
          <Link href="/teklif-al" className="btn" style={{ background: "#fff", color: "var(--ink)", padding: "1.05rem 2.25rem", borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 500 }}>
            Teklif Al <ArrowUpRight size={16} strokeWidth={1.5} />
          </Link>
        </div>
      </section>

      <style>{`
        .hk-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: clamp(40px, 6vw, 96px);
          align-items: start;
        }
        .hk-h2 {
          font-family: var(--font-serif);
          font-size: clamp(1.75rem, 3.5vw, 2.75rem);
          font-weight: 400;
          line-height: 1.1;
          letter-spacing: -0.025em;
          color: var(--ink);
          margin: 0 0 24px;
        }
        .hk-h2 .gold { font-style: italic; color: var(--gold-dark); font-weight: 300; }
        .hk-text p {
          font-family: var(--font-sans);
          font-size: 1.02rem;
          line-height: 1.7;
          color: var(--muted);
          margin: 0 0 18px;
        }
        .hk-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0;
          border-top: 1px solid var(--hairline);
          border-left: 1px solid var(--hairline);
        }
        .hk-stat {
          padding: clamp(28px, 4vw, 44px);
          border-right: 1px solid var(--hairline);
          border-bottom: 1px solid var(--hairline);
        }
        .hk-stat__label {
          font-family: var(--font-sans);
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--muted);
          margin-top: 8px;
        }
        @media (max-width: 768px) {
          .hk-grid { grid-template-columns: 1fr; gap: 32px; }
        }
      `}</style>
    </>
  );
}
