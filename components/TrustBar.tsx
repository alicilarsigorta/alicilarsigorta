"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Landmark, BookOpenCheck, Lock } from "lucide-react";
import { fadeUp, stagger, viewportOnce } from "@/lib/motion";

type Badge = {
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; className?: string; color?: string }>;
  title: string;
  caption: string;
  registry?: string;
};

const badges: Badge[] = [
  {
    icon: ShieldCheck,
    title: "SEGEM",
    caption: "Lisanslı Aracı",
    registry: "Sicil No: AS-2018",
  },
  {
    icon: Landmark,
    title: "T.C. Hazine",
    caption: "Denetimli Faaliyet",
    registry: "Resmî Yetki",
  },
  {
    icon: BookOpenCheck,
    title: "TSB Üyesi",
    caption: "Türkiye Sigorta Birliği",
    registry: "Kurumsal Üye",
  },
  {
    icon: Lock,
    title: "KVKK · ISO 27001",
    caption: "Veri Güvenliği",
    registry: "Sertifikalı",
  },
];

/**
 * Compact, editorial trust bar — sits below Hero, above first content section.
 * Conveys regulatory and security legitimacy with disciplined visual weight.
 */
export default function TrustBar() {
  return (
    <section
      className="trust-bar-section"
      aria-label="Lisans ve sertifika rozetleri"
      style={{
        background: "var(--white)",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        padding: "40px 0",
        position: "relative",
      }}
    >
      <div className="container">
        <motion.div
          variants={stagger(0.08, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="trust-bar-grid"
        >
          <motion.div variants={fadeUp} className="trust-bar-intro">
            <span className="eyebrow" style={{ marginBottom: 0 }}>
              Lisanslı · Denetimli · Güvenli
            </span>
          </motion.div>

          {badges.map((b, i) => (
            <motion.div
              key={b.title}
              variants={fadeUp}
              whileHover={{ y: -3 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="trust-bar-item"
            >
              <div className="trust-bar-icon">
                <b.icon size={20} strokeWidth={1.6} color="var(--gold-dark)" />
              </div>
              <div className="trust-bar-text">
                <div className="trust-bar-title">{b.title}</div>
                <div className="trust-bar-caption">{b.caption}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .trust-bar-grid {
          display: grid;
          grid-template-columns: minmax(180px, 0.7fr) repeat(4, 1fr);
          gap: 24px;
          align-items: center;
        }
        .trust-bar-intro {
          display: flex;
          align-items: center;
          border-right: 1px solid var(--border);
          padding-right: 24px;
          min-height: 56px;
        }
        .trust-bar-item {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 8px 4px;
        }
        .trust-bar-icon {
          flex-shrink: 0;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: var(--gold-soft);
          border: 1px solid var(--border-gold);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .trust-bar-text { display: flex; flex-direction: column; gap: 2px; }
        .trust-bar-title {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1.02rem;
          color: var(--ink);
          letter-spacing: -0.01em;
          line-height: 1.15;
        }
        .trust-bar-caption {
          font-size: 0.78rem;
          color: var(--gray);
          font-weight: 500;
          letter-spacing: 0.01em;
        }

        @media (max-width: 1024px) {
          .trust-bar-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          .trust-bar-intro {
            grid-column: span 2;
            border-right: none;
            border-bottom: 1px solid var(--border);
            padding-right: 0;
            padding-bottom: 16px;
            justify-content: center;
            min-height: 0;
          }
        }
        @media (max-width: 480px) {
          .trust-bar-item { gap: 10px; }
          .trust-bar-icon { width: 38px; height: 38px; border-radius: 10px; }
          .trust-bar-title { font-size: 0.92rem; }
          .trust-bar-caption { font-size: 0.72rem; }
        }
        `,
      }} />
    </section>
  );
}
