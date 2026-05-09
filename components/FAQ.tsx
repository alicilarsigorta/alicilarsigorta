"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useContent } from "@/lib/content-context";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.2 } }
};

const item: Variants = {
  hidden: { opacity: 0, x: -30, filter: "blur(6px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const { content } = useContent();
  const { faq: faqs } = content;

  return (
    <section className="section" style={{ background: "var(--cream)" }}>
      <div className="container" style={{ maxWidth: 800 }}>
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: "center", marginBottom: 60 }}
        >
          <div className="section-badge">● SSS</div>
          <h2 className="section-title">Merak Ettiğiniz <span className="gold">Her Şey</span></h2>
          <p className="section-sub" style={{ margin: "16px auto 0", textAlign: "center" }}>Sigortacılık hakkında en çok sorulan sorular ve cevapları.</p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              variants={item}
              layout
            >
              <motion.div
                className="card"
                style={{
                  padding: 0, overflow: "hidden",
                  border: open === i ? "1px solid var(--gold)" : "1px solid var(--border)",
                }}
                animate={{
                  boxShadow: open === i ? "0 20px 60px rgba(212,160,23,0.12)" : "0 0 0 rgba(0,0,0,0)",
                }}
                transition={{ duration: 0.3 }}
                whileHover={{ x: 6 }}
              >
                <motion.button
                  onClick={() => setOpen(open === i ? null : i)}
                  style={{ width: "100%", padding: "24px 28px", background: "transparent", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, textAlign: "left" }}
                  whileHover={{ backgroundColor: "rgba(212,160,23,0.03)" }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <motion.div
                      animate={{ rotate: open === i ? 90 : 0, scale: open === i ? 1.1 : 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                      style={{ color: open === i ? "var(--gold)" : "var(--gray)", flexShrink: 0 }}
                    >
                      <HelpCircle size={20} />
                    </motion.div>
                    <span style={{ fontWeight: 700, fontSize: "1.05rem", color: open === i ? "var(--gold-dark)" : "var(--dark)" }}>{faq.q}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: open === i ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    style={{ flexShrink: 0 }}
                  >
                    <ChevronDown size={22} color={open === i ? "var(--gold)" : "var(--gray)"} />
                  </motion.div>
                </motion.button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <motion.p
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -10, opacity: 0 }}
                        transition={{ delay: 0.1, duration: 0.3 }}
                        style={{ padding: "0 28px 28px 62px", color: "var(--gray)", lineHeight: 1.75, fontSize: "1rem", fontWeight: 500 }}
                      >
                        {faq.a}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
