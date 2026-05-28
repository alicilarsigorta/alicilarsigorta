"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useContent } from "@/lib/content-context";
import { easeOutExpo } from "@/lib/motion";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOutExpo },
  },
};

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const { content } = useContent();
  const { faq: faqs } = content;

  return (
    <section
      className="section faq-section"
      style={{ background: "var(--paper-soft)" }}
    >
      <div className="container">
        {/* Editorial header */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
          className="faq-header"
        >
          <div className="faq-header-left">
            <span className="issue-marker">SSS &nbsp;·&nbsp; Q&amp;A</span>
            <h2 className="headline-l">
              Merak ettiğiniz <em>her şey.</em>
            </h2>
          </div>
          <div className="faq-header-right">
            <p className="faq-lede">
              Sigortacılık hakkında en çok sorulan sorular —{" "}
              <em className="script">uzman ekibimizden</em> net açıklamalar.
            </p>
          </div>
        </motion.div>

        <div className="rule-editorial" aria-hidden style={{ marginBottom: 0 }} />

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="faq-list"
        >
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <motion.div key={i} variants={item} className="faq-row" layout>
                <motion.button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="faq-button"
                  aria-expanded={isOpen}
                >
                  <span className="faq-idx">{String(i + 1).padStart(2, "0")}</span>
                  <span className={`faq-question ${isOpen ? "faq-question-open" : ""}`}>
                    {faq.q}
                  </span>
                  <span className={`faq-toggle ${isOpen ? "faq-toggle-open" : ""}`} aria-hidden>
                    {isOpen ? <Minus size={16} strokeWidth={2.4} /> : <Plus size={16} strokeWidth={2.4} />}
                  </span>
                </motion.button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: easeOutExpo }}
                      style={{ overflow: "hidden" }}
                    >
                      <p className="faq-answer">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .faq-section {
          padding-top: clamp(80px, 10vw, 140px);
          padding-bottom: clamp(80px, 10vw, 140px);
        }
        .faq-header {
          display: grid;
          grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
          gap: clamp(2rem, 6vw, 6rem);
          align-items: flex-end;
          margin-bottom: 56px;
        }
        .faq-header-left .issue-marker { margin-bottom: 24px; }
        .faq-lede {
          font-size: 1.04rem;
          line-height: 1.7;
          color: var(--gray);
          font-weight: 500;
          max-width: 460px;
        }
        .faq-lede em.script { color: var(--gold-dark); font-size: 1.1em; }

        .faq-list {
          max-width: 980px;
          margin: 0 auto;
        }
        .faq-row {
          border-bottom: 1px solid var(--border);
          position: relative;
        }
        .faq-button {
          width: 100%;
          padding: 28px 0;
          background: transparent;
          border: none;
          cursor: pointer;
          display: grid;
          grid-template-columns: 80px 1fr 40px;
          align-items: center;
          gap: 24px;
          text-align: left;
          font-family: inherit;
          transition: padding-left 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .faq-button:hover { padding-left: 14px; }
        .faq-idx {
          font-family: var(--font-display);
          font-style: italic;
          font-weight: 500;
          font-size: 1.4rem;
          color: var(--gold);
          letter-spacing: -0.02em;
          font-variant-numeric: tabular-nums lining-nums;
        }
        .faq-question {
          font-family: var(--font-display);
          font-weight: 500;
          font-size: clamp(1.12rem, 1.8vw, 1.4rem);
          color: var(--ink);
          letter-spacing: -0.015em;
          line-height: 1.3;
          transition: color 0.3s ease;
        }
        .faq-question-open { color: var(--gold-dark); font-style: italic; }
        .faq-toggle {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: transparent;
          border: 1px solid var(--border-strong);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--ink);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .faq-toggle-open {
          background: var(--ink);
          color: var(--gold-light);
          border-color: transparent;
        }
        .faq-answer {
          padding: 0 0 28px 104px;
          font-size: 1rem;
          line-height: 1.75;
          color: var(--gray);
          font-weight: 400;
          max-width: 720px;
        }

        @media (max-width: 1024px) {
          .faq-header { grid-template-columns: 1fr; align-items: flex-start; gap: 20px; }
        }
        @media (max-width: 540px) {
          .faq-button { grid-template-columns: 44px 1fr 32px; gap: 14px; padding: 22px 0; }
          .faq-idx { font-size: 1.1rem; }
          .faq-toggle { width: 30px; height: 30px; }
          .faq-answer { padding-left: 58px; font-size: 0.95rem; }
        }
        `,
      }} />
    </section>
  );
}
