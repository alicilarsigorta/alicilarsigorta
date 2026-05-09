"use client";

import { motion, Variants } from "framer-motion";
import { Award, Zap, HeadphonesIcon, Lock } from "lucide-react";
import { useContent } from "@/lib/content-context";

const iconMap: Record<string, any> = {
  Award, Zap, Headphones: HeadphonesIcon, Lock,
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

export default function WhyUs() {
  const { content } = useContent();
  const { whyUs } = content;

  return (
    <section className="whyus-editorial">
      <div className="container">
        <motion.div
          className="whyus-editorial__head"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="section-badge">{whyUs.badge}</motion.div>
          <motion.h2 variants={fadeUp} className="section-title">
            {whyUs.title} <span className="gold">{whyUs.titleHighlight}</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="section-sub">
            {whyUs.subtitle}
          </motion.p>
        </motion.div>

        <motion.div
          className="whyus-editorial__grid"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {whyUs.features.map(({ icon, title, desc }, idx) => {
            const Icon = iconMap[icon] || Award;
            return (
              <motion.div key={title} variants={fadeUp} className="whyus-feat">
                <div className="whyus-feat__top">
                  <span className="editorial-number">{String(idx + 1).padStart(2, "0")}</span>
                  <span className="whyus-feat__icon">
                    <Icon size={20} strokeWidth={1.5} />
                  </span>
                </div>
                <h3 className="whyus-feat__title">{title}</h3>
                <p className="whyus-feat__desc">{desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <style jsx>{`
        .whyus-editorial {
          padding: clamp(64px, 9vw, 128px) 0;
          background: var(--off-white);
        }
        .whyus-editorial__head {
          max-width: 720px;
          margin-bottom: clamp(48px, 6vw, 88px);
        }
        .whyus-editorial__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          border-top: 1px solid var(--hairline);
        }
        .whyus-feat {
          padding: clamp(28px, 3vw, 40px) clamp(20px, 2.5vw, 32px);
          border-right: 1px solid var(--hairline);
          background: var(--white);
        }
        .whyus-feat:last-child { border-right: 0; }
        .whyus-feat__top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: clamp(28px, 4vw, 48px);
        }
        .whyus-feat__icon {
          width: 40px; height: 40px;
          border-radius: 50%;
          border: 1px solid var(--hairline);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--ink);
        }
        .whyus-feat__title {
          font-family: var(--font-serif);
          font-size: clamp(1.2rem, 2vw, 1.45rem);
          font-weight: 400;
          color: var(--ink);
          letter-spacing: -0.015em;
          line-height: 1.2;
          margin: 0 0 12px;
        }
        .whyus-feat__desc {
          font-family: var(--font-sans);
          font-size: 0.93rem;
          line-height: 1.6;
          color: var(--muted);
          margin: 0;
        }

        @media (max-width: 1024px) {
          .whyus-editorial__grid { grid-template-columns: repeat(2, 1fr); }
          .whyus-feat:nth-child(2n) { border-right: 0; }
          .whyus-feat:nth-child(-n+2) { border-bottom: 1px solid var(--hairline); }
        }
        @media (max-width: 640px) {
          .whyus-editorial__grid { grid-template-columns: 1fr; }
          .whyus-feat { border-right: 0; border-bottom: 1px solid var(--hairline); }
          .whyus-feat:last-child { border-bottom: 0; }
        }
      `}</style>
    </section>
  );
}
