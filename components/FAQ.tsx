"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useContent } from "@/lib/content-context";

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } }
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
};

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const { content } = useContent();
  const { faq: faqs } = content;

  return (
    <section className="faq-editorial">
      <div className="container faq-editorial__inner">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="faq-editorial__head"
        >
          <div className="section-badge">SSS</div>
          <h2 className="section-title">Merak ettiğiniz <span className="gold">her şey</span></h2>
          <p className="section-sub">Sigortacılık hakkında en çok sorulan sorular ve cevapları.</p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="faq-editorial__list"
        >
          {faqs.map((faq, i) => (
            <motion.div key={i} variants={item} className={`faq-editorial__item ${open === i ? "is-open" : ""}`}>
              <button onClick={() => setOpen(open === i ? null : i)} className="faq-editorial__q">
                <span className="faq-editorial__q-text">{faq.q}</span>
                <span className="faq-editorial__q-icon" aria-hidden>
                  {open === i ? <Minus size={18} strokeWidth={1.5} /> : <Plus size={18} strokeWidth={1.5} />}
                </span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: "hidden" }}
                  >
                    <p className="faq-editorial__a">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <style jsx>{`
        .faq-editorial {
          padding: clamp(64px, 9vw, 128px) 0;
          background: var(--white);
        }
        .faq-editorial__inner { max-width: 880px; }
        .faq-editorial__head {
          margin-bottom: clamp(40px, 5vw, 72px);
        }
        .faq-editorial__list {
          border-top: 1px solid var(--hairline);
        }
        .faq-editorial__item {
          border-bottom: 1px solid var(--hairline);
        }
        .faq-editorial__q {
          width: 100%;
          padding: clamp(20px, 2.5vw, 28px) 8px;
          background: transparent;
          border: 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
          text-align: left;
          font-family: var(--font-serif);
          font-size: clamp(1.05rem, 1.8vw, 1.35rem);
          font-weight: 400;
          color: var(--ink);
          letter-spacing: -0.015em;
          line-height: 1.35;
        }
        .faq-editorial__q-icon {
          flex-shrink: 0;
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 1px solid var(--hairline);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--ink);
          transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
        }
        .faq-editorial__item.is-open .faq-editorial__q-icon {
          background: var(--ink);
          color: var(--gold-light);
          border-color: var(--ink);
        }
        .faq-editorial__a {
          padding: 0 8px clamp(20px, 2.5vw, 28px) 8px;
          font-family: var(--font-sans);
          font-size: 1rem;
          line-height: 1.7;
          color: var(--muted);
          margin: 0;
          max-width: 720px;
        }
      `}</style>
    </section>
  );
}
