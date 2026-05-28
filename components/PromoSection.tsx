"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useContent } from "@/lib/content-context";
import { fadeUp, viewportOnce, easeOutExpo, stagger } from "@/lib/motion";
import CountUp from "./CountUp";

/**
 * PromoSection — magazine feature article spread.
 *
 * Top: eyebrow + masthead-rule.
 * Body: serif italic headline + image with caption + drop-cap body.
 * Mid: pull-quote.
 * Footer: stats strip + CTA.
 */
export default function PromoSection() {
  const { content } = useContent();
  const { promo } = content;

  // The body text in promo.subtitle is one long string with `\n\n` paragraphs.
  const paragraphs = promo.subtitle
    .split("\n\n")
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <section
      className="section promo-section"
      style={{
        background: "var(--white)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div className="container">
        {/* Editorial byline row */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: easeOutExpo }}
          className="promo-byline-row"
        >
          <span className="issue-marker">Feature &nbsp;·&nbsp; Karabük Bölge Dosyası</span>
          <span className="promo-byline-right">
            <em className="script">Alıcılar Sigorta</em> · Editör Notu
          </span>
        </motion.div>

        <div className="rule-editorial" aria-hidden style={{ marginBottom: 40 }} />

        {/* Big editorial headline */}
        <motion.h2
          initial={{ opacity: 0, y: 22, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={viewportOnce}
          transition={{ duration: 1.0, ease: easeOutExpo, delay: 0.1 }}
          className="headline-l promo-headline"
        >
          {promo.title} <em>{promo.titleHighlight.toLowerCase()}.</em>
        </motion.h2>

        {/* Two-column article layout */}
        <div className="promo-spread">
          {/* LEFT — Image */}
          <motion.figure
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1.0, ease: easeOutExpo }}
            className="promo-figure"
          >
            <div className="promo-figure-frame">
              <Image
                src="/hastane.jpg"
                alt="Anlaşmalı özel sağlık kurumları — Tamamlayıcı Sağlık güvencesi"
                width={800}
                height={1000}
                className="promo-figure-img"
              />
              {/* Overlay floating rating chip */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.6 }}
                className="promo-rating-card"
                aria-hidden
              >
                <div className="promo-rating-stars">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={12} fill="var(--gold)" color="var(--gold)" />
                  ))}
                </div>
                <div className="promo-rating-num">
                  <CountUp value="4,9" duration={1400} />
                  <span className="promo-rating-out">/5</span>
                </div>
                <div className="promo-rating-meta">10.000+ değerlendirme</div>
              </motion.div>
            </div>
            <figcaption className="promo-figcaption">
              <span className="byline">Fotoğraf</span>
              <span>
                <em className="script">Karabük</em> — anlaşmalı özel sağlık kurumları.
              </span>
            </figcaption>
          </motion.figure>

          {/* RIGHT — Article body */}
          <motion.div
            variants={stagger(0.08, 0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="promo-article"
          >
            {paragraphs.map((p, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                className={`promo-para ${i === 0 ? "drop-cap" : ""}`}
              >
                {p}
              </motion.p>
            ))}

            {/* Pull quote */}
            <motion.blockquote
              variants={fadeUp}
              className="pull-quote promo-pullquote"
            >
              "Tamamlayıcı Sağlık Sigortası'nı, bütçeyi sarsmadan yüksek kaliteli
              özel hastane hizmetine erişimin en kestirme yolu olarak görüyoruz."
              <cite>— Acente Müdürü, Karabük</cite>
            </motion.blockquote>

            <motion.div
              variants={fadeUp}
              className="promo-cta-row"
            >
              <Link href="/teklif-al" className="btn btn-gold promo-cta-primary">
                Hemen Teklif Al
                <ArrowUpRight size={18} strokeWidth={2.3} />
              </Link>
              <Link href="/hakkimizda" className="ed-link">
                Hakkımızda
                <ArrowUpRight size={14} strokeWidth={2.4} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .promo-section {
          padding-top: clamp(80px, 10vw, 140px);
          padding-bottom: clamp(80px, 10vw, 140px);
        }

        .promo-byline-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 16px;
          padding-bottom: 14px;
          flex-wrap: wrap;
        }
        .promo-byline-right {
          font-family: var(--font-sans);
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--gray);
          letter-spacing: 0.04em;
        }

        .promo-headline {
          margin: 0 0 56px;
          max-width: 920px;
        }

        .promo-spread {
          display: grid;
          grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
          gap: clamp(2.4rem, 6vw, 5rem);
          align-items: flex-start;
        }

        /* FIGURE — left image */
        .promo-figure {
          margin: 0;
          position: relative;
          align-self: stretch;
        }
        .promo-figure-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 5;
          overflow: hidden;
          border-radius: 4px;
          background: var(--paper-deep);
          box-shadow:
            0 1px 0 rgba(14,16,20,0.04),
            0 30px 60px -20px rgba(14,16,20,0.20);
        }
        .promo-figure-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          filter: grayscale(8%) contrast(1.04);
          transition: filter 0.6s ease;
        }
        .promo-figure:hover .promo-figure-img {
          filter: grayscale(0%) contrast(1.06);
        }
        .promo-figcaption {
          display: flex;
          align-items: baseline;
          gap: 14px;
          padding: 14px 4px 0;
          font-family: var(--font-sans);
          font-size: 0.84rem;
          color: var(--gray);
          font-weight: 500;
          line-height: 1.5;
        }
        .promo-figcaption em.script {
          color: var(--ink);
          font-size: 1rem;
        }

        .promo-rating-card {
          position: absolute;
          bottom: 20px;
          left: 20px;
          background: rgba(255,255,255,0.96);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(14,16,20,0.08);
          padding: 14px 18px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 4px;
          z-index: 2;
          border-radius: 4px;
          box-shadow: 0 10px 30px rgba(14,16,20,0.12);
        }
        .promo-rating-stars { display: flex; gap: 2px; margin-bottom: 4px; }
        .promo-rating-num {
          font-family: var(--font-display);
          font-style: italic;
          font-weight: 500;
          font-size: 1.5rem;
          color: var(--ink);
          line-height: 1;
          letter-spacing: -0.02em;
          font-variant-numeric: tabular-nums;
        }
        .promo-rating-out {
          font-style: italic;
          font-size: 0.9rem;
          color: var(--gray);
          font-weight: 400;
        }
        .promo-rating-meta {
          font-family: var(--font-sans);
          font-size: 0.66rem;
          color: var(--gray);
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
        }

        /* ARTICLE — right body */
        .promo-article {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }
        .promo-para {
          font-size: 1.04rem;
          line-height: 1.78;
          color: var(--ink-soft);
          font-weight: 400;
          letter-spacing: -0.002em;
        }
        .promo-pullquote {
          margin: 16px 0 8px;
        }
        .promo-cta-row {
          display: flex;
          align-items: center;
          gap: 28px;
          flex-wrap: wrap;
          margin-top: 24px;
        }
        .promo-cta-primary {
          padding: 1rem 2rem !important;
          font-size: 0.95rem;
          border-radius: 100px;
        }

        @media (max-width: 1024px) {
          .promo-spread {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .promo-figure-frame { aspect-ratio: 16 / 10; }
        }
        @media (max-width: 640px) {
          .promo-headline { margin-bottom: 36px; }
          .promo-figure-frame { aspect-ratio: 4 / 3; }
          .promo-rating-card { padding: 10px 14px; bottom: 14px; left: 14px; }
          .promo-rating-num { font-size: 1.2rem; }
          .promo-para { font-size: 0.98rem; line-height: 1.72; }
          .promo-cta-primary { width: 100%; justify-content: center; }
          .promo-cta-row { width: 100%; }
        }
        `,
      }} />
    </section>
  );
}
