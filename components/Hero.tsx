"use client";

import { motion, Variants, useScroll, useTransform } from "framer-motion";
import { ChevronRight, Star, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useContent } from "@/lib/content-context";
import { useRef } from "react";

const springTransition = { type: "spring" as const, stiffness: 100, damping: 20 };

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 60, filter: "blur(10px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.8, filter: "blur(20px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } }
};

const countUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: 0.8 + i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }
  })
};

export default function Hero() {
  const { content } = useContent();
  const { hero } = content;
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"]
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const parallaxOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={sectionRef} style={{ padding: "60px 0", display: "flex", flexDirection: "column", justifyContent: "center", backgroundColor: "var(--white)", position: "relative", overflow: "hidden" }}>

      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.25, 0.1],
          x: [0, 30, 0],
          y: [0, -20, 0],
        }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        style={{ position: "absolute", top: "-10%", right: "-15%", width: 900, height: 900, borderRadius: "50%", background: "radial-gradient(circle, rgba(212,160,23,0.2) 0%, transparent 60%)", pointerEvents: "none" }}
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        style={{ position: "absolute", bottom: "-20%", left: "-10%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(212,160,23,0.15) 0%, transparent 60%)", pointerEvents: "none" }}
      />

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -40 - i * 10, 0],
            x: [0, 15 * (i % 2 === 0 ? 1 : -1), 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{ duration: 4 + i * 1.5, repeat: Infinity, delay: i * 0.8, ease: "easeInOut" }}
          style={{
            position: "absolute",
            width: 4 + i * 2, height: 4 + i * 2,
            borderRadius: "50%",
            background: "var(--gold)",
            top: `${20 + i * 15}%`,
            left: `${10 + i * 18}%`,
            pointerEvents: "none",
            filter: `blur(${i * 0.5}px)`,
          }}
        />
      ))}

      <motion.div style={{ y: parallaxY, opacity: parallaxOpacity }} className="container" >
        <div style={{ position: "relative", zIndex: 1, paddingTop: "80px", paddingBottom: "80px" }}>
          <div className="grid-2" style={{ alignItems: "center", gap: "6rem" }}>

            {/* LEFT CONTENT */}
            <motion.div variants={stagger} initial="hidden" animate="visible">
              <motion.div variants={fadeUp}>
                <motion.div
                  className="section-badge"
                  style={{ background: "rgba(212,160,23,0.08)", border: "1px solid rgba(212,160,23,0.3)", color: "var(--gold-dark)" }}
                  whileHover={{ scale: 1.05, boxShadow: "0 8px 25px rgba(212,160,23,0.2)" }}
                  transition={springTransition}
                >
                  <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
                    <Sparkles size={14} fill="var(--gold-dark)" color="var(--gold-dark)" />
                  </motion.div>
                  {hero.badge}
                </motion.div>
              </motion.div>

              <motion.h1 variants={fadeUp} style={{ fontSize: "clamp(3.2rem, 5.5vw, 5.2rem)", fontWeight: 900, color: "var(--black)", lineHeight: 1.08, letterSpacing: "-0.04em", marginBottom: "28px" }}>
                {hero.title}<br />
                <motion.span
                  className="gold"
                  style={{ position: "relative", zIndex: 1, display: "inline-block" }}
                  animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                  {hero.titleHighlight}
                  <motion.svg
                    viewBox="0 0 300 15"
                    style={{ position: "absolute", bottom: -2, left: 0, width: "100%", height: "auto", zIndex: -1 }}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
                  >
                    <motion.path
                      d="M5,10 Q150,-5 295,10"
                      fill="none"
                      stroke="rgba(212,160,23,0.3)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.8, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </motion.svg>
                </motion.span>
              </motion.h1>

              <motion.p variants={fadeUp} style={{ fontSize: "1.2rem", color: "var(--gray)", lineHeight: 1.7, marginBottom: "44px", maxWidth: 540, fontWeight: 500 }}>
                {hero.subtitle}
              </motion.p>

              <motion.div variants={fadeUp} style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "40px" }}>
                <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }} transition={springTransition}>
                  <Link href="/teklif-al" className="btn btn-gold" style={{ fontSize: "1.1rem", padding: "1.1rem 2.8rem", borderRadius: "100px", boxShadow: "0 15px 40px rgba(212,160,23,0.3)" }}>
                    {hero.ctaText}
                    <motion.span animate={{ x: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
                      <ChevronRight size={20} />
                    </motion.span>
                  </Link>
                </motion.div>
              </motion.div>

            </motion.div>

            {/* RIGHT CONTENT — 3D Shield */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              style={{ position: "relative", height: "100%", minHeight: "500px", display: "flex", alignItems: "center", justifyContent: "center" }}
              className="hero-graphics"
            >
              {/* Orbit ring 1 */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{ position: "absolute", width: 420, height: 420, borderRadius: "50%", border: "1px dashed rgba(212,160,23,0.2)", pointerEvents: "none" }}
              />
              {/* Orbit ring 2 */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                style={{ position: "absolute", width: 520, height: 520, borderRadius: "50%", border: "1px solid rgba(212,160,23,0.08)", pointerEvents: "none" }}
              />

              {/* Orbiting dots */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                style={{ position: "absolute", width: 420, height: 420, pointerEvents: "none" }}
              >
                <div style={{ position: "absolute", top: 0, left: "50%", transform: "translate(-50%, -50%)", width: 10, height: 10, borderRadius: "50%", background: "var(--gold)", boxShadow: "0 0 15px var(--gold)" }} />
                <div style={{ position: "absolute", bottom: 0, right: 0, transform: "translate(50%, 50%)", width: 6, height: 6, borderRadius: "50%", background: "var(--gold-light)", boxShadow: "0 0 10px var(--gold-light)" }} />
              </motion.div>

              <motion.div
                animate={{ y: [0, -20, 0], rotateY: [0, 5, 0, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{ position: "relative", width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center", perspective: 1000 }}
              >
                <Image
                  src="/hero-shield.png"
                  alt="Premium Insurance Shield"
                  width={500}
                  height={500}
                  style={{ objectFit: "contain", filter: "drop-shadow(0 30px 60px rgba(212,160,23,0.3))", zIndex: 2 }}
                  priority
                />
              </motion.div>

              {/* Glowing Backdrop */}
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 450, height: 450, background: "radial-gradient(circle, rgba(212,160,23,0.18) 0%, transparent 60%)", zIndex: 1, filter: "blur(40px)" }}
              />
            </motion.div>
          </div>

          {/* Stats Row — Animated counters */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "2px", marginTop: "80px", background: "var(--border)", borderRadius: "32px", overflow: "hidden", boxShadow: "0 20px 80px rgba(0,0,0,0.04)" }}
          >
            {hero.stats.map((s, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={countUp}
                initial="hidden"
                animate="visible"
                whileHover={{ backgroundColor: "var(--cream)", scale: 1.02 }}
                transition={{ duration: 0.3 }}
                style={{ background: "var(--white)", padding: "32px 24px", textAlign: "center", cursor: "default" }}
              >
                <motion.div
                  className="stat-number"
                  style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)" }}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2 + i * 0.15, duration: 0.6, type: "spring", stiffness: 200 }}
                >
                  {s.value}
                </motion.div>
                <div style={{ fontSize: "1rem", color: "var(--gray)", fontWeight: 700, marginTop: 8, letterSpacing: "-0.3px" }}>{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 1024px) { .hero-graphics { display: none !important; } }
      `}} />
    </section>
  );
}
