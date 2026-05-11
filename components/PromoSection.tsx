"use client";

import { motion, Variants } from "framer-motion";
import { Star, PlayCircle, Check } from "lucide-react";
import Link from "next/link";
import { useContent } from "@/lib/content-context";

const slideLeft: Variants = {
  hidden: { opacity: 0, x: -80, filter: "blur(12px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
};
const slideRight: Variants = {
  hidden: { opacity: 0, x: 80, filter: "blur(12px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 } }
};

const bulletStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
};
const bulletItem: Variants = {
  hidden: { opacity: 0, x: -30, scale: 0.9 },
  visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
};

export default function PromoSection() {
  const { content } = useContent();
  const { promo } = content;

  return (
    <section className="section promo-section" style={{ background: "var(--white)", overflow: "hidden" }}>
      <div className="container">
        <div className="grid-2 promo-grid" style={{ alignItems: "center", gap: "5rem" }}>

          {/* Images column */}
          <motion.div variants={slideRight} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} className="promo-images" style={{ position: "relative", height: 560 }}>
            
            {/* Main image */}
            <motion.div
              animate={{ y: [0, -14, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.02, boxShadow: "0 40px 100px rgba(212,160,23,0.2)" }}
              style={{ position: "absolute", top: 0, right: 0, width: "85%", height: "80%", borderRadius: 32, overflow: "hidden", border: "2px solid var(--border)", boxShadow: "0 30px 80px rgba(212,160,23,0.12)", transition: "box-shadow 0.4s" }}
            >
              <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, var(--cream) 0%, #fdf4dc 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
                <img src="/promo-1.png" alt="Tanıtım Görseli" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.currentTarget.style.display = "none"; }} />
              </div>
              <motion.div
                initial={{ x: -40, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{ position: "absolute", bottom: 24, left: 24, background: "#fff", borderRadius: 16, padding: "12px 20px", fontWeight: 800, fontSize: "0.95rem", color: "var(--dark)", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", display: "flex", alignItems: "center", gap: 10 }}
              >
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ width: 10, height: 10, borderRadius: "50%", background: "#10b981", display: "inline-block" }}
                />
                Anlık Teklifler Hazır
              </motion.div>
            </motion.div>

            {/* Second image */}
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              whileHover={{ scale: 1.03 }}
              style={{ position: "absolute", bottom: 0, left: 0, width: "55%", height: "52%", borderRadius: 28, overflow: "hidden", border: "8px solid var(--white)", boxShadow: "0 30px 60px rgba(0,0,0,0.12)" }}
            >
              <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, #111 0%, #333 100%)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src="/promo-2.png" alt="Detay Görseli" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.currentTarget.style.display = "none"; }} />
              </div>
            </motion.div>

            {/* Floating star badge */}
            <motion.div
              animate={{ y: [0, -18, 0], rotate: [0, 4, -4, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{ scale: 1.1, boxShadow: "0 25px 60px rgba(212,160,23,0.25)" }}
              className="promo-star-badge"
              style={{ position: "absolute", top: "12%", left: "-8%", background: "#fff", borderRadius: 24, padding: "20px 24px", boxShadow: "0 20px 50px rgba(212,160,23,0.15)", border: "1px solid var(--border)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, zIndex: 3, cursor: "default" }}
            >
              <div style={{ display: "flex", gap: 4 }}>
                {[1,2,3,4,5].map(i => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 500 }}
                  >
                    <Star size={16} fill="var(--gold)" color="var(--gold)" />
                  </motion.div>
                ))}
              </div>
              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1.1, type: "spring", stiffness: 300 }}
                style={{ fontWeight: 900, fontSize: "1.3rem", color: "var(--black)" }}
              >
                5.0 / 5.0
              </motion.span>
              <span style={{ fontSize: "0.8rem", color: "var(--gray)", fontWeight: 700 }}>10,000+ Değerlendirme</span>
            </motion.div>
          </motion.div>

          {/* Text column */}
          <motion.div variants={slideLeft} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }}>
            <motion.div className="section-badge" whileHover={{ scale: 1.05 }}>{promo.badge}</motion.div>
            <h2 className="section-title">{promo.title} <span className="gold">{promo.titleHighlight}</span></h2>
            <p className="section-sub" style={{ marginBottom: "36px", whiteSpace: "pre-line" }}>
              {promo.subtitle}
            </p>

            <motion.div
              variants={bulletStagger}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: "40px" }}
            >
              {promo.bullets.map((b, i) => (
                <motion.div
                  key={i}
                  variants={bulletItem}
                  whileHover={{ x: 8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  style={{ display: "flex", alignItems: "flex-start", gap: 14, cursor: "default" }}
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.12, type: "spring", stiffness: 400, damping: 15 }}
                    style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, var(--gold), var(--gold-light))", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2, boxShadow: "0 4px 12px rgba(212,160,23,0.3)" }}
                  >
                    <Check size={14} color="#fff" strokeWidth={3} />
                  </motion.div>
                  <p style={{ fontWeight: 600, color: "var(--dark)", fontSize: "1.05rem", lineHeight: 1.55 }}>{b}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
              <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
                <Link href="/teklif-al" className="btn btn-gold">Teklif Al</Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
                <Link href="/hakkimizda" className="btn btn-outline" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <motion.span animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }}>
                    <PlayCircle size={20} />
                  </motion.span>
                  Daha Fazla
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 1024px) {
          .promo-grid { gap: 3rem !important; }
        }
        @media (max-width: 768px) {
          .promo-grid { gap: 2rem !important; }
          .promo-images { height: 360px !important; order: 2; }
          .promo-star-badge { left: 4% !important; padding: 14px 18px !important; transform: scale(0.85); transform-origin: top left; }
        }
        @media (max-width: 480px) {
          .promo-images { height: 300px !important; }
        }
      `}} />
    </section>
  );
}
