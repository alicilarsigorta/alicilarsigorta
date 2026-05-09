"use client";

import { motion, Variants } from "framer-motion";
import { Award, Zap, HeadphonesIcon, Lock } from "lucide-react";
import { useContent } from "@/lib/content-context";

const iconMap: Record<string, any> = {
  Award, Zap, Headphones: HeadphonesIcon, Lock,
};

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
};

const item: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.9, filter: "blur(8px)" },
  visible: { 
    opacity: 1, y: 0, scale: 1, filter: "blur(0px)", 
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
  }
};

const titleReveal: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(12px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
};

export default function WhyUs() {
  const { content } = useContent();
  const { whyUs } = content;

  return (
    <section className="section" style={{ background: "var(--off-white)", position: "relative", overflow: "hidden" }}>

      {/* Animated orbit rings */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        style={{ position: "absolute", top: "50%", right: "-20%", transform: "translateY(-50%)", width: 700, height: 700, borderRadius: "50%", border: "1px solid rgba(212,160,23,0.1)", pointerEvents: "none" }}
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        style={{ position: "absolute", top: "50%", right: "-20%", transform: "translateY(-50%)", width: 500, height: 500, borderRadius: "50%", border: "1px dashed rgba(212,160,23,0.12)", pointerEvents: "none" }}
      />

      {/* Floating accent dots */}
      {[0,1,2].map(i => (
        <motion.div
          key={i}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 5 + i * 2, repeat: Infinity, delay: i, ease: "easeInOut" }}
          style={{
            position: "absolute", width: 8, height: 8, borderRadius: "50%",
            background: "var(--gold)", top: `${30 + i * 25}%`, left: `${5 + i * 35}%`,
            pointerEvents: "none", filter: "blur(1px)"
          }}
        />
      ))}

      <div className="container" style={{ position: "relative", zIndex: 1 }}>

        <motion.div
          variants={titleReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          style={{ textAlign: "center", marginBottom: "72px" }}
        >
          <motion.div
            className="section-badge"
            whileHover={{ scale: 1.08, boxShadow: "0 8px 25px rgba(212,160,23,0.15)" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {whyUs.badge}
          </motion.div>
          <h2 className="section-title">{whyUs.title} <span className="gold">{whyUs.titleHighlight}</span> Sigorta Platformu</h2>
          <p className="section-sub" style={{ margin: "16px auto 0", textAlign: "center" }}>
            {whyUs.subtitle}
          </p>
        </motion.div>

        <motion.div
          className="grid-4"
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {whyUs.features.map(({ icon, title, desc }, idx) => {
            const Icon = iconMap[icon] || Award;
            return (
              <motion.div key={title} variants={item}>
                <motion.div
                  className="card"
                  style={{ padding: "2.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.25rem", height: "100%" }}
                  whileHover={{ y: -10, boxShadow: "0 30px 80px rgba(212,160,23,0.15)" }}
                  transition={{ type: "spring", stiffness: 250, damping: 20 }}
                >
                  <motion.div
                    className="icon-box"
                    whileHover={{ rotate: 12, scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 400, damping: 12 }}
                  >
                    <Icon size={30} />
                  </motion.div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 900, color: "var(--black)" }}>{title}</h3>
                  <p style={{ color: "var(--gray)", lineHeight: 1.7, fontSize: "0.97rem", fontWeight: 500 }}>{desc}</p>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
