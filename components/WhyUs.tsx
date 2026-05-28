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
        background: "var(--white)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Editorial 2-column header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease: easeOutExpo }}
          className="whyus-header"
        >
          <div className="whyus-header-left">
            <span className="issue-marker">Neden Biz &nbsp;·&nbsp; Dört İlke</span>
            <h2 className="headline-l">
              {whyUs.title} <em>{whyUs.titleHighlight.toLowerCase()}</em>{" "}
              sigorta platformu.
            </h2>
          </div>
          <div className="whyus-header-right">
            <p className="whyus-lede">{whyUs.subtitle}</p>
          </div>
        </motion.div>

        <div className="rule-editorial" aria-hidden style={{ marginBottom: 0 }} />

        <motion.div
          variants={stagger(0.1, 0.1)}
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
                  <span className="idx-large">{num}</span>
                  <div className="whyus-cell-icon">
                    <Icon size={20} strokeWidth={1.6} />
                  </div>
                </div>
                <h3 className="whyus-cell-title">{title}</h3>
                <p className="whyus-cell-desc">{desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .whyus-section {
          padding-top: clamp(80px, 10vw, 140px);
          padding-bottom: clamp(80px, 10vw, 140px);
        }
        .whyus-header {
          display: grid;
          grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
          gap: clamp(2rem, 6vw, 6rem);
          align-items: flex-end;
          margin-bottom: 56px;
        }
        .whyus-header-left .issue-marker { margin-bottom: 24px; }
        .whyus-lede {
          font-size: 1.04rem;
          line-height: 1.7;
          color: var(--gray);
          font-weight: 500;
          max-width: 460px;
        }

        .whyus-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
        }
        .whyus-cell {
          padding: 48px 28px 36px;
          display: flex;
          flex-direction: column;
          gap: 18px;
          border-right: 1px solid var(--border);
          transition: background 0.3s ease;
          cursor: default;
          position: relative;
        }
        .whyus-cell:last-child { border-right: none; }
        .whyus-cell::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--ink);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .whyus-cell:hover { background: var(--paper-soft); }
        .whyus-cell:hover::before { transform: scaleX(1); }

        .whyus-cell-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        .whyus-cell-head .idx-large {
          font-size: clamp(2.6rem, 4vw, 3.4rem);
          background: linear-gradient(135deg, var(--gold-deep) 0%, var(--gold) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .whyus-cell-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--paper);
          border: 1px solid var(--border-strong);
          color: var(--ink);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .whyus-cell:hover .whyus-cell-icon {
          background: var(--ink);
          color: var(--gold-light);
          border-color: transparent;
        }
        .whyus-cell-title {
          font-family: var(--font-display);
          font-weight: 500;
          font-size: 1.35rem;
          color: var(--ink);
          letter-spacing: -0.02em;
          line-height: 1.18;
          font-optical-sizing: auto;
        }
        .whyus-cell-desc {
          font-size: 0.96rem;
          line-height: 1.65;
          color: var(--gray);
          font-weight: 500;
          flex: 1;
        }

        @media (max-width: 1024px) {
          .whyus-header { grid-template-columns: 1fr; align-items: flex-start; gap: 24px; }
          .whyus-grid {
            grid-template-columns: repeat(2, 1fr);
            border-top: 1px solid var(--border);
          }
          .whyus-cell {
            border-bottom: 1px solid var(--border);
            padding: 36px 24px 28px;
          }
          .whyus-cell:nth-child(2n) { border-right: none; }
          .whyus-cell:nth-child(2n + 1) { border-right: 1px solid var(--border); }
        }
        @media (max-width: 540px) {
          .whyus-grid { grid-template-columns: 1fr; }
          .whyus-cell { padding: 30px 8px 26px; border-right: none !important; }
        }
        `,
      }} />
    </section>
  );
}
