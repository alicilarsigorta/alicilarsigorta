"use client";

import { useContent } from "@/lib/content-context";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Check, Plus, Minus, ArrowUpRight, MessageCircle, Phone } from "lucide-react";
import { useState, use } from "react";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { content } = useContent();
  const product = content.products?.find(p => p.id === resolvedParams.id);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (!product) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "160px 20px 80px", textAlign: "center" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.25rem", fontWeight: 400, color: "var(--ink)", marginBottom: 16, letterSpacing: "-0.025em" }}>Ürün Bulunamadı</h1>
        <p style={{ color: "var(--muted)", marginBottom: 32, fontFamily: "var(--font-sans)" }}>Aradığınız sigorta ürünü mevcut değil.</p>
        <Link href="/urunlerimiz" className="btn btn-gold">Tüm Ürünlere Dön</Link>
      </div>
    );
  }

  const detailedDescription = product.detailedDescription || `${product.title} poliçemiz ile geleceğinizi güvence altına alın. ${product.desc} Size en uygun fiyatlarla en geniş kapsamlı korumayı sunuyoruz.`;
  const coverages = product.coverages?.length ? product.coverages : [
    "7/24 Ücretsiz Asistanlık Hizmeti",
    "Türkiye'nin Her Yerinde Geçerli Geniş Acente Ağı",
    "Özel İndirim ve Avantajlar",
    "Hasar Anında Hızlı Çözüm Desteği",
  ];
  const faqs = product.faqs?.length ? product.faqs : [
    { q: `${product.title} kapsamı neleri içerir?`, a: "Poliçeniz seçtiğiniz pakete göre geniş bir yelpazede teminat sunar. Detaylı bilgi için teklif formunu doldurabilirsiniz." },
    { q: "Fiyatlandırma nasıl yapılıyor?", a: "Uzmanlarımız risk analizinize ve ihtiyaçlarınıza en uygun fiyatı 20+ sigorta şirketi arasından karşılaştırarak belirler." },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "var(--white)" }}>
      {/* Hero */}
      <section className="page-hero">
        <div className="container">
          <Link href="/urunlerimiz" className="pd-back">
            <ArrowLeft size={14} strokeWidth={1.5} /> Tüm Ürünlere Dön
          </Link>

          <div className="pd-hero-grid">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
              <div className="section-badge">{product.title}</div>
              <h1 className="page-hero__title">
                En iyisini isteyenlere<br/><span className="gold">özel koruma.</span>
              </h1>
              <p className="page-hero__sub" style={{ marginTop: 24, marginBottom: 32 }}>
                {detailedDescription}
              </p>
              <div className="pd-cta-row">
                <Link href="/teklif-al" className="btn btn-gold">
                  Hemen Teklif Al <ArrowUpRight size={16} strokeWidth={1.5} />
                </Link>
                <a
                  href={`https://wa.me/${content.contact.whatsapp}?text=Merhaba,%20${product.title}%20hakkında%20bilgi%20almak%20istiyorum.`}
                  target="_blank"
                  rel="noreferrer"
                  className="pd-link"
                >
                  <MessageCircle size={16} strokeWidth={1.5} /> WhatsApp&apos;tan sor
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="pd-coverage"
            >
              <p className="pd-coverage__title">Ana Teminatlar</p>
              <ul className="pd-coverage__list">
                {coverages.map((cov, i) => (
                  <li key={i}>
                    <span className="pd-coverage__num">{String(i + 1).padStart(2, "0")}</span>
                    <Check size={16} strokeWidth={1.75} className="pd-coverage__check" />
                    <span className="pd-coverage__text">{cov}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Advantages strip */}
      <section style={{ background: "var(--cream)", borderBottom: "1px solid var(--hairline)" }}>
        <div className="container" style={{ padding: "clamp(28px, 4vw, 48px) 1.25rem" }}>
          <div className="pd-adv">
            {[
              { label: "Kapsamlı Koruma" },
              { label: "Anında Poliçe" },
              { label: "En İyi Fiyat" },
              { label: "7/24 Destek" },
            ].map((it, i) => (
              <div key={it.label} className="pd-adv__item">
                <span className="pd-adv__num">{String(i + 1).padStart(2, "0")}</span>
                <span className="pd-adv__label">{it.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: "var(--white)" }}>
        <div className="container" style={{ maxWidth: 880 }}>
          <div style={{ marginBottom: "clamp(40px, 5vw, 64px)" }}>
            <div className="section-badge">SSS</div>
            <h2 className="section-title">Sıkça sorulan <span className="gold">sorular</span></h2>
            <p className="section-sub">{product.title} ile ilgili en çok merak edilenler.</p>
          </div>

          <div className="pd-faq-list">
            {faqs.map((faq, i) => (
              <div key={i} className={`pd-faq ${openFaq === i ? "is-open" : ""}`}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="pd-faq__q">
                  <span>{faq.q}</span>
                  <span className="pd-faq__icon">
                    {openFaq === i ? <Minus size={16} strokeWidth={1.5} /> : <Plus size={16} strokeWidth={1.5} />}
                  </span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <p className="pd-faq__a">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--ink)", padding: "clamp(72px, 10vw, 128px) 0", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.85rem, 4.5vw, 3rem)", fontWeight: 400, color: "#fff", marginBottom: 18, lineHeight: 1.05, letterSpacing: "-0.025em" }}>
            {product.title} <span style={{ fontStyle: "italic", color: "var(--gold-light)", fontWeight: 300 }}>teklifiniz hazır.</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", marginBottom: 32, lineHeight: 1.6 }}>
            Uzman danışmanlarımız size özel en uygun poliçeyi hazırlasın.
          </p>
          <div style={{ display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
            <Link href="/teklif-al" className="btn" style={{ background: "#fff", color: "var(--ink)", padding: "1.05rem 2.25rem", borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 500 }}>
              Ücretsiz Teklif Al <ArrowUpRight size={16} strokeWidth={1.5} />
            </Link>
            <a href={`tel:${content.contact.phone}`} style={{ color: "rgba(255,255,255,0.85)", fontWeight: 500, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, borderBottom: "1px solid rgba(255,255,255,0.4)", paddingBottom: 4 }}>
              <Phone size={14} strokeWidth={1.5} /> Hemen Ara
            </a>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .pd-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--muted);
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 500;
          text-decoration: none;
          margin-bottom: 32px;
          transition: color 0.2s ease;
        }
        .pd-back:hover { color: var(--ink); }

        .pd-hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: clamp(40px, 6vw, 80px);
          align-items: start;
        }
        .pd-cta-row { display: flex; align-items: center; gap: 24px; flex-wrap: wrap; }
        .pd-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--ink);
          font-family: var(--font-sans);
          font-weight: 500;
          font-size: 0.95rem;
          text-decoration: none;
          padding-bottom: 4px;
          border-bottom: 1px solid var(--ink);
          transition: gap 0.3s ease, opacity 0.2s ease;
        }
        .pd-link:hover { gap: 10px; opacity: 0.7; }

        .pd-coverage {
          background: var(--cream);
          border: 1px solid var(--hairline);
          border-radius: var(--radius-lg);
          padding: clamp(28px, 4vw, 40px);
        }
        .pd-coverage__title {
          font-family: var(--font-sans);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--muted);
          margin: 0 0 24px;
        }
        .pd-coverage__list { list-style: none; padding: 0; margin: 0; }
        .pd-coverage__list li {
          display: grid;
          grid-template-columns: 32px 20px 1fr;
          align-items: center;
          gap: 14px;
          padding: 16px 0;
          border-top: 1px solid var(--hairline);
        }
        .pd-coverage__list li:last-child { border-bottom: 1px solid var(--hairline); }
        .pd-coverage__num {
          font-family: var(--font-serif);
          font-size: 0.95rem;
          color: var(--gold-dark);
          font-feature-settings: "tnum" 1, "lnum" 1;
        }
        .pd-coverage__check { color: var(--gold-dark); }
        .pd-coverage__text {
          font-family: var(--font-sans);
          font-size: 0.95rem;
          color: var(--ink);
          line-height: 1.5;
        }

        .pd-adv {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(16px, 3vw, 32px);
        }
        .pd-adv__item {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .pd-adv__num {
          font-family: var(--font-serif);
          font-size: 0.95rem;
          color: var(--gold-dark);
          font-feature-settings: "tnum" 1, "lnum" 1;
        }
        .pd-adv__label {
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--ink);
          letter-spacing: 0.005em;
        }

        .pd-faq-list { border-top: 1px solid var(--hairline); }
        .pd-faq { border-bottom: 1px solid var(--hairline); }
        .pd-faq__q {
          width: 100%;
          padding: clamp(20px, 2.5vw, 28px) 0;
          background: transparent;
          border: 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          text-align: left;
          font-family: var(--font-serif);
          font-size: clamp(1.05rem, 1.8vw, 1.3rem);
          font-weight: 400;
          color: var(--ink);
          letter-spacing: -0.015em;
          line-height: 1.35;
        }
        .pd-faq__icon {
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 1px solid var(--hairline);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--ink);
          flex-shrink: 0;
          transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
        }
        .pd-faq.is-open .pd-faq__icon { background: var(--ink); color: var(--gold-light); border-color: var(--ink); }
        .pd-faq__a {
          padding: 0 0 clamp(20px, 2.5vw, 28px) 0;
          font-family: var(--font-sans);
          font-size: 0.97rem;
          line-height: 1.7;
          color: var(--muted);
          margin: 0;
          max-width: 720px;
        }

        @media (max-width: 768px) {
          .pd-hero-grid { grid-template-columns: 1fr; gap: 36px; }
          .pd-adv { grid-template-columns: repeat(2, 1fr); }
        }
      `}</style>
    </div>
  );
}
