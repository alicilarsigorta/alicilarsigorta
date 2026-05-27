"use client";

import { motion } from "framer-motion";
import { Award, Zap, Headphones, Lock } from "lucide-react";
import { useContent } from "@/lib/content-context";
import { fadeUp, stagger, viewportOnce, easeOutExpo } from "@/lib/motion";

const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; color?: string }>> = {
  Award,
  Zap,
  Headphones,
  Lock,
};

export default function WhyUs() {
  const { content } = useContent();
  const { whyUs } = content;

  return (
    <section
      className="section whyus-section"
      style={{
        background: "var(--off-white)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="mesh-bg" aria-hidden style={{ opacity: 0.7 }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease: easeOutExpo }}
          style={{
            textAlign: "center",
            marginBottom: 72,
            maxWidth: 720,
            margin: "0 auto 72px",
          }}
        >
          <span className="eyebrow">{whyUs.badge.replace(/^[●•·]\s*/, "")}</span>
          <h2 className="section-title">
            {whyUs.title}{" "}
            <span className="gold">{whyUs.titleHighlight}</span>{" "}
            sigorta platformu
          </h2>
          <p className="section-sub" style={{ margin: "20px auto 0" }}>
            {whyUs.subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={stagger(0.12, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="whyus-grid"
        >
          {whyUs.features.map(({ icon, title, desc }, idx) => {
            const Icon = iconMap[icon] || Award;
            const num = String(idx + 1).padStart(2, "0");
            return (
              <motion.div
                key={title}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, ease: easeOutExpo }}
                className="whyus-cell"
              >
                <div className="whyus-cell-head">
                  <span className="bracket-num">{num}</span>
                  <div className="whyus-cell-icon">
                    <Icon size={20} strokeWidth={1.7} color="var(--gold-dark)" />
                  </div>
                </div>
                <h3 className="whyus-cell-title">{title}</h3>
                <p className="whyus-cell-desc">{desc}</p>
                <div className="whyus-cell-rule" aria-hidden />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .whyus-section {
          padding-top: clamp(72px, 9vw, 130px);
          padding-bottom: clamp(72px, 9vw, 130px);
        }
        .whyus-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          background: var(--border);
          border: 1px solid var(--border);
          border-radius: 24px;
          overflow: hidden;
        }
        .whyus-cell {
          background: var(--white);
          padding: 36px 28px 32px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          transition: background 0.3s ease, box-shadow 0.4s ease;
          cursor: default;
        }
        .whyus-cell:hover {
          background: var(--white);
          box-shadow: inset 3px 0 0 var(--gold);
        }
        .whyus-cell-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
        }
        .whyus-cell-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: var(--gold-soft);
          border: 1px solid var(--border-gold);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .whyus-cell-title {
          font-family: var(--font-display);
          font-size: 1.3rem;
          font-weight: 600;
          color: var(--ink);
          letter-spacing: -0.015em;
          line-height: 1.2;
          font-optical-sizing: auto;
        }
        .whyus-cell-desc {
          font-size: 0.93rem;
          line-height: 1.65;
          color: var(--gray);
          font-weight: 500;
          flex: 1;
        }
        .whyus-cell-rule {
          height: 1px;
          background: linear-gradient(90deg, var(--gold) 0%, transparent 100%);
          margin-top: 10px;
          width: 40%;
          transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .whyus-cell:hover .whyus-cell-rule {
          width: 100%;
        }

        @media (max-width: 1024px) {
          .whyus-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 540px) {
          .whyus-grid { grid-template-columns: 1fr; }
          .whyus-cell { padding: 28px 24px; }
        }
        `,
      }} />
    </section>
  );
}
