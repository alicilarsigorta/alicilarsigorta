"use client";

import { motion } from "framer-motion";
import { ClipboardList, GitCompare, MousePointerClick, FileCheck2, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { fadeUp, stagger, viewportOnce, easeOutExpo } from "@/lib/motion";

const steps = [
  {
    n: "01",
    icon: ClipboardList,
    title: "Bilgilerinizi paylaşın",
    desc: "TC kimlik, doğum tarihi ve iletişim bilginiz yeterli. 30 saniyede tamamlanır, hiçbir gizli alan yok.",
  },
  {
    n: "02",
    icon: GitCompare,
    title: "20+ şirket karşılaştırılır",
    desc: "Akıllı motorumuz anlaşmalı tüm sigorta şirketlerine eş zamanlı sorgu atar, teminat ve fiyat tablosunu sunar.",
  },
  {
    n: "03",
    icon: MousePointerClick,
    title: "Size uygun olanı seçin",
    desc: "Uzman danışmanlar tercihinize göre öneri yapar. Komisyonsuz, baskısız, şeffaf bir seçim deneyimi.",
  },
  {
    n: "04",
    icon: FileCheck2,
    title: "Poliçeniz anında hazır",
    desc: "Onay sonrası dijital poliçeniz cebinizde. PDF olarak indirin, e-postanıza kaydedin, anında geçerli.",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="section how-section"
      style={{
        background: "var(--paper-soft)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Editorial header — asymmetric, not centered */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease: easeOutExpo }}
          className="how-header"
        >
          <div className="how-header-left">
            <span className="issue-marker">Süreç &nbsp;·&nbsp; Dört Adım</span>
            <h2 className="headline-l how-headline">
              Dakikalar içinde, <em>baştan sona</em> dijital.
            </h2>
          </div>
          <div className="how-header-right">
            <p className="how-lede">
              Bürokrasi yok, evrak yok, ofis ziyareti yok. Türkiye'nin en hızlı sigorta sürecini gazete kolaylığında yaşayın.
            </p>
            <Link href="/teklif-al" className="ed-link" style={{ marginTop: 24 }}>
              İlk adımı at <ArrowUpRight size={14} strokeWidth={2.4} />
            </Link>
          </div>
        </motion.div>

        <div className="rule-editorial" aria-hidden style={{ marginBottom: 0 }} />

        {/* Editorial table-style steps */}
        <motion.div
          variants={stagger(0.1, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="how-table"
        >
          {steps.map(({ n, icon: Icon, title, desc }) => (
            <motion.div
              key={n}
              variants={fadeUp}
              className="how-row"
            >
              <div className="how-row-num">
                <span className="idx-large">{n}</span>
              </div>
              <div className="how-row-icon">
                <Icon size={22} strokeWidth={1.5} />
              </div>
              <h3 className="how-row-title">{title}</h3>
              <p className="how-row-desc">{desc}</p>
              <div className="how-row-rule" aria-hidden />
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .how-section {
          padding-top: clamp(80px, 10vw, 140px);
          padding-bottom: clamp(80px, 10vw, 140px);
        }

        .how-header {
          display: grid;
          grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
          gap: clamp(2rem, 6vw, 6rem);
          align-items: flex-end;
          margin-bottom: 56px;
        }
        .how-header-left .issue-marker { margin-bottom: 24px; }
        .how-headline {
          margin: 0;
          max-width: 720px;
        }
        .how-lede {
          font-size: 1.04rem;
          line-height: 1.7;
          color: var(--gray);
          font-weight: 500;
          max-width: 460px;
        }

        .how-table {
          display: grid;
          grid-template-columns: 1fr;
        }
        .how-row {
          position: relative;
          display: grid;
          grid-template-columns: 120px 60px 1fr 1.4fr;
          align-items: center;
          gap: 32px;
          padding: 36px 0;
          transition: padding-left 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .how-row:hover { padding-left: 18px; }
        .how-row-num {
          align-self: stretch;
          display: flex;
          align-items: center;
        }
        .how-row-num .idx-large {
          font-style: italic;
          background: linear-gradient(135deg, var(--gold-deep) 0%, var(--gold) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .how-row-icon {
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: var(--white);
          border: 1px solid var(--border-strong);
          color: var(--ink);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .how-row:hover .how-row-icon {
          background: var(--ink);
          color: var(--gold-light);
          border-color: transparent;
          transform: rotate(-6deg);
        }
        .how-row-title {
          font-family: var(--font-display);
          font-weight: 500;
          font-size: clamp(1.3rem, 2.2vw, 1.8rem);
          color: var(--ink);
          letter-spacing: -0.02em;
          line-height: 1.18;
          font-optical-sizing: auto;
        }
        .how-row-desc {
          font-size: 1rem;
          line-height: 1.7;
          color: var(--gray);
          font-weight: 500;
          max-width: 52ch;
        }
        .how-row-rule {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: var(--border);
        }

        @media (max-width: 1024px) {
          .how-header {
            grid-template-columns: 1fr;
            gap: 24px;
            align-items: flex-start;
          }
          .how-row {
            grid-template-columns: 80px 1fr;
            grid-template-rows: auto auto auto;
            gap: 16px 20px;
            padding: 28px 0;
          }
          .how-row-num { grid-row: 1 / 4; }
          .how-row-icon { grid-column: 2; grid-row: 1; width: 44px; height: 44px; }
          .how-row-title { grid-column: 2; grid-row: 2; }
          .how-row-desc { grid-column: 2; grid-row: 3; }
        }
        @media (max-width: 540px) {
          .how-row { grid-template-columns: 70px 1fr; gap: 12px 16px; padding: 24px 0; }
          .how-row-num .idx-large { font-size: 3rem; }
          .how-row-title { font-size: 1.25rem; }
          .how-row-desc { font-size: 0.95rem; }
        }
        `,
      }} />
    </section>
  );
}
