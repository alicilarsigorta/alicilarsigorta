"use client";

import { motion } from "framer-motion";
import { useContent } from "@/lib/content-context";

export default function PartnerMarquee() {
  const { content } = useContent();
  const partners = content.partners;
  const all = [...partners, ...partners];

  return (
    <div className="pm-editorial">
      <p className="pm-editorial__title">Türkiye&apos;nin en güçlü sigorta ağı</p>

      <div className="pm-editorial__track-wrap">
        <div className="pm-editorial__fade pm-editorial__fade--l" />
        <div className="pm-editorial__fade pm-editorial__fade--r" />
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="pm-editorial__track"
        >
          {all.map((name, i) => (
            <span key={i} className="pm-editorial__item">{name}</span>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        .pm-editorial {
          padding: clamp(48px, 6vw, 80px) 0;
          background: var(--white);
          border-bottom: 1px solid var(--hairline);
          overflow: hidden;
        }
        .pm-editorial__title {
          text-align: center;
          font-family: var(--font-sans);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--gold-dark);
          margin: 0 0 36px;
        }
        .pm-editorial__track-wrap { position: relative; display: flex; overflow: hidden; }
        .pm-editorial__fade {
          position: absolute;
          top: 0; bottom: 0;
          width: 80px;
          z-index: 2;
          pointer-events: none;
        }
        .pm-editorial__fade--l { left: 0; background: linear-gradient(to right, var(--white), transparent); }
        .pm-editorial__fade--r { right: 0; background: linear-gradient(to left, var(--white), transparent); }
        .pm-editorial__track {
          display: flex;
          gap: clamp(40px, 5vw, 72px);
          flex-shrink: 0;
          width: max-content;
          padding: 0 24px;
          align-items: center;
        }
        .pm-editorial__item {
          font-family: var(--font-serif);
          font-size: clamp(1.15rem, 1.8vw, 1.45rem);
          font-weight: 400;
          color: var(--muted);
          letter-spacing: -0.01em;
          white-space: nowrap;
          transition: color 0.3s ease;
        }
        .pm-editorial__item:hover { color: var(--ink); }

        @media (max-width: 768px) {
          .pm-editorial__fade { width: 40px; }
        }
      `}</style>
    </div>
  );
}
