"use client";

import { motion } from "framer-motion";
import { TrendingUp, Users, Banknote, Headphones } from "lucide-react";
import { fadeUp, stagger, viewportOnce, easeOutExpo } from "@/lib/motion";
import CountUp from "./CountUp";

interface Impact {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; color?: string }>;
  value: string;
  label: string;
  sub: string;
}

const impacts: Impact[] = [
  {
    icon: TrendingUp,
    value: "12.430",
    label: "Bu ay onaylanan teklif",
    sub: "Geçen aya göre +%18 artış",
  },
  {
    icon: Banknote,
    value: "₺2.420.000",
    label: "Bu ay ödenen hasar",
    sub: "Ortalama ödeme süresi: 38 saat",
  },
  {
    icon: Users,
    value: "847",
    label: "Bugün yeni başvuru",
    sub: "Şu an çevrimiçi başvuru sayısı",
  },
  {
    icon: Headphones,
    value: "47",
    label: "Şu an aktif danışman",
    sub: "Ortalama yanıt süresi: 12 saniye",
  },
];

/**
 * LiveImpact — dark editorial bar showing the firm's real-time scale.
 * Large serif numbers with a "live" pulsating dot in the header.
 * The dark background gives contrast against the surrounding white sections.
 */
export default function LiveImpact() {
  return (
    <section
      className="impact-section"
      aria-label="Anlık etki tablosu"
    >
      {/* Glow */}
      <div aria-hidden className="impact-glow" />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: easeOutExpo }}
          className="impact-header"
        >
          <div className="impact-header-left">
            <span className="impact-live-tag">
              <span className="live-dot" />
              Canlı
            </span>
            <h2 className="impact-title">
              Sigortacılığı yeniden{" "}
              <span className="impact-title-italic">tanımlıyoruz.</span>
            </h2>
          </div>
          <p className="impact-header-right">
            Şu an Türkiye genelinde gerçekleşen sigorta işlemlerinden derlenen anlık veriler.
          </p>
        </motion.div>

        <motion.div
          variants={stagger(0.1, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="impact-grid"
        >
          {impacts.map((it, i) => (
            <motion.div
              key={it.label}
              variants={fadeUp}
              className="impact-cell"
            >
              <div className="impact-cell-icon">
                <it.icon size={22} strokeWidth={1.6} color="var(--gold-light)" />
              </div>
              <div className="stat-number stat-number-inverse impact-cell-num">
                <CountUp value={it.value} duration={1800 + i * 100} />
              </div>
              <div className="impact-cell-label">{it.label}</div>
              <div className="impact-cell-sub">{it.sub}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .impact-section {
          position: relative;
          background: var(--navy-deepest);
          padding: clamp(80px, 10vw, 140px) 0;
          overflow: hidden;
          color: var(--text-primary);
          border-top: 1px solid var(--glass-border);
          border-bottom: 1px solid var(--glass-border);
        }
        .impact-glow {
          position: absolute;
          top: -20%;
          left: 50%;
          transform: translateX(-50%);
          width: 1100px;
          height: 700px;
          background: radial-gradient(ellipse, rgba(176,112,80,0.16) 0%, transparent 60%);
          filter: blur(40px);
          pointer-events: none;
        }

        .impact-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: end;
          margin-bottom: 72px;
        }
        .impact-header-left { display: flex; flex-direction: column; gap: 18px; }
        .impact-live-tag {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          align-self: flex-start;
          padding: 8px 16px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 100px;
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #fff;
        }
        .impact-title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 4.4vw, 3.6rem);
          font-weight: 500;
          letter-spacing: -0.025em;
          line-height: 1.05;
          color: #fff;
          font-optical-sizing: auto;
        }
        .impact-title-italic {
          font-style: italic;
          font-weight: 400;
          background: linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .impact-header-right {
          font-size: 1.02rem;
          line-height: 1.65;
          color: rgba(255,255,255,0.7);
          font-weight: 500;
          max-width: 460px;
          justify-self: end;
        }

        .impact-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: rgba(255,255,255,0.10);
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 24px;
          overflow: hidden;
        }
        .impact-cell {
          background: var(--navy);
          padding: 36px 28px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: background 0.3s ease;
        }
        .impact-cell:hover {
          background: rgba(255,255,255,0.03);
        }
        .impact-cell-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(176, 112, 80, 0.12);
          border: 1px solid rgba(176, 112, 80, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 6px;
        }
        .impact-cell-num {
          font-size: clamp(1.9rem, 3vw, 2.8rem) !important;
        }
        .impact-cell-label {
          font-size: 0.95rem;
          font-weight: 700;
          color: #fff;
          line-height: 1.3;
          margin-top: 2px;
        }
        .impact-cell-sub {
          font-size: 0.82rem;
          color: rgba(255,255,255,0.55);
          line-height: 1.5;
          font-weight: 500;
        }

        @media (max-width: 1024px) {
          .impact-header { grid-template-columns: 1fr; gap: 16px; }
          .impact-header-right { justify-self: start; }
          .impact-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 540px) {
          .impact-grid { grid-template-columns: 1fr; border-radius: 18px; }
          .impact-cell { padding: 28px 22px; }
        }
        `,
      }} />
    </section>
  );
}
