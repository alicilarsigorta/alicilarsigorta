"use client";

import { motion } from "framer-motion";
import { ClipboardList, GitCompare, MousePointerClick, FileCheck2 } from "lucide-react";
import Link from "next/link";
import { fadeUp, stagger, viewportOnce, easeOutExpo } from "@/lib/motion";

const steps = [
  {
    n: "01",
    icon: ClipboardList,
    title: "Bilgilerinizi Paylaşın",
    desc: "TC kimlik, doğum tarihi ve iletişim bilginiz yeterli. 30 saniyede tamamlanır, hiçbir gizli alan yok.",
  },
  {
    n: "02",
    icon: GitCompare,
    title: "20+ Şirket Karşılaştırılır",
    desc: "Akıllı motorumuz anlaşmalı tüm sigorta şirketlerine eş zamanlı sorgu atar, teminat ve fiyat tablosunu sunar.",
  },
  {
    n: "03",
    icon: MousePointerClick,
    title: "Size Uygun Olanı Seçin",
    desc: "Uzman danışmanlar tercihinize göre öneri yapar. Komisyonsuz, baskısız, şeffaf bir seçim deneyimi.",
  },
  {
    n: "04",
    icon: FileCheck2,
    title: "Poliçeniz Anında Hazır",
    desc: "Onay sonrası dijital poliçeniz cebinizde. PDF olarak indirin, e-postanıza kaydedin, anında geçerli.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="section how-section"
      style={{
        background: "var(--white)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="mesh-bg" aria-hidden style={{ opacity: 0.6 }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease: easeOutExpo }}
          style={{ textAlign: "center", marginBottom: 72, maxWidth: 720, margin: "0 auto 72px" }}
        >
          <span className="eyebrow">Süreç · 4 adım · 2 dakika</span>
          <h2 className="section-title">
            Sigortanızı dakikalar içinde{" "}
            <span className="gold">edinirsiniz</span>
          </h2>
          <p className="section-sub" style={{ margin: "20px auto 0" }}>
            Bürokrasi yok, evrak yok, ofis ziyareti yok. Türkiye'nin en hızlı sigorta süreci, baştan sona dijital.
          </p>
        </motion.div>

        <motion.div
          variants={stagger(0.14, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="how-grid"
        >
          {steps.map(({ n, icon: Icon, title, desc }, i) => (
            <motion.div
              key={n}
              variants={fadeUp}
              className="how-step"
            >
              <div className="how-step-marker">
                <span className="bracket-num">{n}</span>
                {i < steps.length - 1 && <span className="step-connector" />}
              </div>

              <div className="how-step-icon">
                <Icon size={24} strokeWidth={1.6} color="var(--gold-dark)" />
              </div>

              <h3 className="how-step-title">{title}</h3>
              <p className="how-step-desc">{desc}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: easeOutExpo, delay: 0.4 }}
          style={{ marginTop: 56, textAlign: "center" }}
        >
          <Link href="/teklif-al" className="btn btn-gold" style={{ padding: "1rem 2.4rem" }}>
            İlk Adımı Atın
          </Link>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .how-section {
          padding-top: clamp(72px, 9vw, 130px);
          padding-bottom: clamp(72px, 9vw, 130px);
        }
        .how-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 48px 32px;
        }
        .how-step {
          position: relative;
          text-align: center;
          padding: 0 8px;
        }
        .how-step-marker {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          height: 72px;
        }
        .how-step-icon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: var(--gold-soft);
          border: 1px solid var(--border-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 22px;
        }
        .how-step-title {
          font-family: var(--font-display);
          font-size: 1.4rem;
          font-weight: 600;
          color: var(--ink);
          letter-spacing: -0.015em;
          line-height: 1.2;
          margin-bottom: 12px;
        }
        .how-step-desc {
          font-size: 0.95rem;
          line-height: 1.65;
          color: var(--gray);
          font-weight: 500;
          max-width: 260px;
          margin: 0 auto;
        }

        @media (max-width: 1024px) {
          .how-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 56px 24px;
          }
        }
        @media (max-width: 540px) {
          .how-grid { grid-template-columns: 1fr; gap: 40px; }
          .how-step-marker { height: 56px; }
          .bracket-num { font-size: 2.6rem !important; }
        }
        `,
      }} />
    </section>
  );
}
