"use client";

import { useContent } from "@/lib/content-context";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ChevronDown, ArrowRight, ShieldCheck, Phone, MessageCircle, Star } from "lucide-react";
import { useState, use } from "react";

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const { content } = useContent();
  const product = content.products?.find(p => p.id === resolvedParams.id);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (!product) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "160px 20px 80px" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "var(--black)", marginBottom: "16px" }}>Ürün Bulunamadı</h1>
        <p style={{ color: "var(--gray)", marginBottom: "32px" }}>Aradığınız sigorta ürünü mevcut değil.</p>
        <Link href="/urunlerimiz" className="btn btn-gold">Tüm Ürünlere Dön</Link>
      </div>
    );
  }

  const detailedDescription = product.detailedDescription || `${product.title} poliçemiz ile geleceğinizi güvence altına alın. ${product.desc} Size en uygun fiyatlarla en geniş kapsamlı korumayı sunuyoruz.`;
  const coverages = product.coverages && product.coverages.length > 0 ? product.coverages : [
    "7/24 Ücretsiz Asistanlık Hizmeti",
    "Türkiye'nin Her Yerinde Geçerli Geniş Acente Ağı",
    "Özel İndirim ve Avantajlar",
    "Hasar Anında Hızlı Çözüm Desteği",
  ];
  const faqs = product.faqs && product.faqs.length > 0 ? product.faqs : [
    { q: `${product.title} kapsamı neleri içerir?`, a: "Poliçeniz seçtiğiniz pakete göre geniş bir yelpazede teminat sunar. Detaylı bilgi için teklif formunu doldurabilirsiniz." },
    { q: "Fiyatlandırma nasıl yapılıyor?", a: "Uzmanlarımız risk analizinize ve ihtiyaçlarınıza en uygun fiyatı 20+ sigorta şirketi arasından karşılaştırarak belirler." },
  ];

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
        {/* Decorative elements */}
        <div
          style={{
            position: "absolute",
            top: "-30%",
            right: "-15%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(212,160,23,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-40%",
            left: "-8%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(212,160,23,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          className="container product-hero-inner"
          style={{
            position: "relative",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Link
              href="/urunlerimiz"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: "var(--gray)",
                fontSize: "0.9rem",
                fontWeight: 600,
                textDecoration: "none",
                marginBottom: "32px",
                transition: "color 0.2s",
              }}
            >
              <ArrowLeft size={16} /> Tüm Ürünlere Dön
            </Link>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "48px",
              alignItems: "center",
            }}
            className="product-hero-grid"
          >
            {/* Left Column - Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="section-badge" style={{ marginBottom: "20px" }}>
                <Star size={14} /> {product.title}
              </div>
              <h1
                className="section-title"
                style={{ marginBottom: "20px" }}
              >
                En İyisini İsteyenlere <br />
                <span className="gold">Özel Koruma</span>
              </h1>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "var(--gray)",
                  lineHeight: 1.75,
                  marginBottom: "32px",
                  fontWeight: 500,
                  maxWidth: "560px",
                }}
              >
                {detailedDescription}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "14px" }}>
                <Link href="/teklif-al" className="btn btn-gold" style={{ padding: "14px 32px" }}>
                  Hemen Teklif Al <ArrowRight size={18} />
                </Link>
                <a
                  href={`https://wa.me/${content.contact.whatsapp}?text=Merhaba,%20${product.title}%20hakkında%20bilgi%20almak%20istiyorum.`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline"
                  style={{ padding: "14px 32px" }}
                >
                  <MessageCircle size={18} /> WhatsApp&apos;tan Sor
                </a>
              </div>
            </motion.div>

            {/* Right Column - Coverages Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ position: "relative" }}
            >
              {/* Card glow */}
              <div
                style={{
                  position: "absolute",
                  inset: "-16px",
                  borderRadius: "48px",
                  background: "radial-gradient(ellipse at center, rgba(212,160,23,0.12) 0%, transparent 70%)",
                  filter: "blur(20px)",
                  zIndex: 0,
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  background: "var(--white)",
                  borderRadius: "var(--radius-xl)",
                  border: "1px solid var(--border)",
                  padding: "clamp(28px, 4vw, 44px)",
                  position: "relative",
                  zIndex: 1,
                  boxShadow: "var(--shadow-soft)",
                  overflow: "hidden",
                }}
              >
                {/* Decorative circle */}
                <div
                  style={{
                    position: "absolute",
                    top: "-20px",
                    right: "-20px",
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, rgba(212,160,23,0.08), rgba(212,160,23,0.02))",
                    pointerEvents: "none",
                  }}
                />

                <h3
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: 900,
                    color: "var(--black)",
                    marginBottom: "28px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    letterSpacing: "-0.01em",
                  }}
                >
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, var(--gold), var(--gold-light))",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      flexShrink: 0,
                    }}
                  >
                    <ShieldCheck size={20} />
                  </div>
                  Ana Teminatlar
                </h3>

                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
                  {coverages.map((cov, i) => (
                    <motion.li
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "14px",
                        padding: "14px 16px",
                        borderRadius: "16px",
                        background: "var(--cream)",
                        border: "1px solid var(--border)",
                        transition: "all 0.3s ease",
                      }}
                    >
                      <CheckCircle2
                        size={20}
                        style={{
                          color: "#10b981",
                          flexShrink: 0,
                          marginTop: "1px",
                        }}
                      />
                      <span
                        style={{
                          fontSize: "0.95rem",
                          color: "var(--dark)",
                          fontWeight: 600,
                          lineHeight: 1.5,
                        }}
                      >
                        {cov}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Advantages Strip ── */}
      <div
        style={{
          background: "var(--white)",
          borderBottom: "1px solid var(--border)",
          padding: "40px 0",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "24px",
              textAlign: "center",
            }}
          >
            {[
              { icon: "🛡️", label: "Kapsamlı Koruma" },
              { icon: "⚡", label: "Anında Poliçe" },
              { icon: "💰", label: "En İyi Fiyat" },
              { icon: "📞", label: "7/24 Destek" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                <span style={{ fontSize: "1.5rem" }}>{item.icon}</span>
                <span
                  style={{
                    fontSize: "0.9rem",
                    fontWeight: 700,
                    color: "var(--black)",
                    letterSpacing: "0.3px",
                  }}
                >
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FAQ Section ── */}
      <div className="container product-faq-section" style={{ maxWidth: "800px" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ textAlign: "center", marginBottom: "48px" }}>
            <div className="section-badge">SSS</div>
            <h2
              className="section-title"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", marginTop: "12px" }}
            >
              Sıkça Sorulan <span className="gold">Sorular</span>
            </h2>
            <p
              className="section-sub"
              style={{ margin: "16px auto 0", textAlign: "center" }}
            >
              {product.title} ile ilgili en çok merak edilenler.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: "var(--white)",
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--border)",
                  overflow: "hidden",
                  transition: "all 0.3s ease",
                  boxShadow: openFaq === i ? "0 10px 40px rgba(212,160,23,0.1)" : "none",
                  borderColor: openFaq === i ? "var(--gold)" : "var(--border)",
                }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%",
                    padding: "20px clamp(16px, 3vw, 28px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "'Outfit', sans-serif",
                    transition: "background 0.2s",
                  }}
                >
                  <span
                    style={{
                      fontWeight: 800,
                      color: "var(--black)",
                      fontSize: "1rem",
                      paddingRight: "16px",
                      lineHeight: 1.4,
                    }}
                  >
                    {faq.q}
                  </span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "10px",
                      background: openFaq === i
                        ? "linear-gradient(135deg, var(--gold), var(--gold-light))"
                        : "var(--cream)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      color: openFaq === i ? "#fff" : "var(--gold-dark)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <ChevronDown size={18} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div
                        style={{
                          padding: "0 clamp(16px, 3vw, 28px) 24px",
                          color: "var(--gray)",
                          fontSize: "0.95rem",
                          lineHeight: 1.7,
                          fontWeight: 500,
                        }}
                      >
                        <div className="gold-divider" style={{ marginBottom: "18px" }} />
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── CTA Section ── */}
      <div
        className="product-cta"
        style={{
          background: "var(--black)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "300px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(212,160,23,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container"
          style={{ maxWidth: "700px", position: "relative" }}
        >
          <h2
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
              fontWeight: 900,
              color: "#fff",
              marginBottom: "16px",
              lineHeight: 1.2,
            }}
          >
            {product.title} <span className="gold-shimmer">Teklifiniz Hazır</span>
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
            Uzman danışmanlarımız size özel en uygun poliçeyi hazırlasın.
          </p>
          <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/teklif-al" className="btn btn-gold">
              Ücretsiz Teklif Al <ArrowRight size={18} />
            </Link>
            <a
              href={`tel:${content.contact.phone}`}
              className="btn btn-outline"
              style={{ color: "#fff", borderColor: "rgba(212,160,23,0.4)" }}
            >
              <Phone size={18} /> Hemen Ara
            </a>
          </div>
        </motion.div>
      </div>

      {/* Responsive CSS */}
      <style jsx global>{`
        .product-hero-inner { padding: 130px 1.25rem 80px; }
        .product-faq-section { padding: 80px 1.25rem; }
        .product-cta { padding: 80px 1.25rem; }
        @media (min-width: 1024px) {
          .product-hero-grid {
            grid-template-columns: 1.1fr 1fr !important;
            gap: 64px !important;
          }
        }
        @media (max-width: 768px) {
          .product-hero-inner { padding: 80px 1rem 56px; }
          .product-faq-section { padding: 56px 1rem; }
          .product-cta { padding: 56px 1rem; }
        }
      `}</style>
    </div>
  );
}
