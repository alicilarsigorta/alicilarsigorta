"use client";

import { motion } from "framer-motion";
import { Star, Check } from "lucide-react";
import Link from "next/link";
import { useContent } from "@/lib/content-context";
import { fadeRight, stagger, viewportOnce, easeOutExpo } from "@/lib/motion";
import CountUp from "./CountUp";

const slideLeft = {
  hidden: { opacity: 0, x: -48, filter: "blur(8px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: easeOutExpo } },
};
const slideRight = {
  hidden: { opacity: 0, x: 48, filter: "blur(8px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: easeOutExpo, delay: 0.15 } },
};

export default function PromoSection() {
  const { content } = useContent();
  const { promo } = content;

  return (
    <section className="section promo-section" style={{ background: "var(--white)", overflow: "hidden" }}>
      <div className="container">
        <div className="grid-2 promo-grid" style={{ alignItems: "center", gap: "5rem" }}>

          {/* Images column */}
          <motion.div
            variants={slideRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="promo-images"
          >
            {/* Main image */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
              className="promo-main-img"
            >
              <div className="promo-main-img-inner">
                <img
                  src="/promo-1.png"
                  alt="Müşteri deneyimi"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
              </div>
              <div className="promo-status-pill">
                <span className="live-dot" />
                Anlık teklif sistemi aktif
              </div>
            </motion.div>

            {/* Second image */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              className="promo-second-img"
            >
              <img
                src="/promo-2.png"
                alt="Detay görseli"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />
            </motion.div>

            {/* Rating card — static, editorial */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.5 }}
              className="promo-rating-card"
            >
              <div className="promo-rating-stars">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} size={14} fill="var(--gold)" color="var(--gold)" />
                ))}
              </div>
              <div className="promo-rating-num">
                <CountUp value="4,9" duration={1400} />
                <span className="promo-rating-out">/5,0</span>
              </div>
              <div className="promo-rating-meta">10.000+ değerlendirme</div>
            </motion.div>
          </motion.div>

          {/* Text column */}
          <motion.div
            variants={slideLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
          >
            <span className="eyebrow">{promo.badge.replace(/^[●•·]\s*/, "")}</span>
            <h2 className="section-title">
              {promo.title}{" "}
              <span className="gold">{promo.titleHighlight.toLowerCase()}</span>{" "}
              tanımlıyoruz.
            </h2>
            <p className="section-sub" style={{ marginBottom: 36 }}>{promo.subtitle}</p>

            <motion.div
              variants={stagger(0.08, 0.2)}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 36 }}
            >
              {promo.bullets.map((b, i) => (
                <motion.div
                  key={i}
                  variants={fadeRight}
                  className="promo-bullet"
                >
                  <div className="promo-bullet-check" aria-hidden>
                    <Check size={12} color="#fff" strokeWidth={3} />
                  </div>
                  <p>{b}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.6 }}
              style={{ display: "flex", gap: 14, flexWrap: "wrap" }}
            >
              <Link href="/teklif-al" className="btn btn-gold" style={{ padding: "1rem 2.2rem" }}>
                Hemen Teklif Al
              </Link>
              <Link href="/hakkimizda" className="btn hero-cta-secondary" style={{ padding: "1rem 2.2rem" }}>
                Hakkımızda
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .promo-images {
          position: relative;
          height: 560px;
        }
        .promo-main-img {
          position: absolute;
          top: 0;
          right: 0;
          width: 85%;
          height: 80%;
          border-radius: 28px;
          overflow: hidden;
          border: 1px solid var(--border);
          box-shadow: var(--shadow-elev);
        }
        .promo-main-img-inner {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, var(--cream) 0%, #fbf5e3 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .promo-main-img-inner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .promo-status-pill {
          position: absolute;
          bottom: 18px;
          left: 18px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          background: #fff;
          border-radius: 100px;
          font-size: 0.82rem;
          font-weight: 700;
          color: var(--ink);
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
        }

        .promo-second-img {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 55%;
          height: 50%;
          border-radius: 24px;
          overflow: hidden;
          border: 6px solid var(--white);
          box-shadow: 0 30px 60px rgba(0,0,0,0.12);
          background: linear-gradient(135deg, var(--ink) 0%, var(--navy-deep) 100%);
        }
        .promo-second-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .promo-rating-card {
          position: absolute;
          top: 8%;
          left: -6%;
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 18px;
          padding: 18px 22px;
          box-shadow: var(--shadow-elev);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          z-index: 3;
        }
        .promo-rating-stars {
          display: flex;
          gap: 3px;
        }
        .promo-rating-num {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1.7rem;
          color: var(--ink);
          line-height: 1;
          letter-spacing: -0.02em;
          font-variant-numeric: tabular-nums;
        }
        .promo-rating-out {
          font-size: 0.95rem;
          color: var(--gray);
          font-weight: 500;
        }
        .promo-rating-meta {
          font-size: 0.72rem;
          color: var(--gray);
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        .promo-bullet {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        .promo-bullet-check {
          flex-shrink: 0;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--gold-dark) 0%, var(--gold) 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 4px;
        }
        .promo-bullet p {
          font-weight: 500;
          color: var(--dark);
          font-size: 1.02rem;
          line-height: 1.55;
        }

        @media (max-width: 1024px) {
          .promo-grid { gap: 3rem !important; }
        }
        @media (max-width: 768px) {
          .promo-grid { gap: 2rem !important; }
          .promo-images { height: 360px; order: 2; }
          .promo-rating-card { left: 4%; transform: scale(0.85); transform-origin: top left; }
        }
        @media (max-width: 480px) {
          .promo-images { height: 300px; }
        }
        `,
      }} />
    </section>
  );
}
