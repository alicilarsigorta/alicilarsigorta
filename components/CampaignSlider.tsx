"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Image from "next/image";
import { useContent } from "@/lib/content-context";

export default function CampaignSlider() {
  const { content } = useContent();
  const slides = content.campaigns;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) return null;

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div style={{ position: "relative", width: "100%", overflow: "hidden", paddingTop: "var(--header-h)", background: "var(--white)" }}>
      {/* Slider Container */}
      <div style={{ position: "relative", height: "450px", width: "100%", maxWidth: "1280px", margin: "0 auto", padding: "0 20px" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              top: "20px", left: "20px", right: "20px", bottom: "20px",
              background: slides[current].color,
              borderRadius: "32px",
              display: "flex", alignItems: "center", padding: "40px 60px",
              color: slides[current].textColor, 
              boxShadow: "0 20px 60px rgba(0,0,0,0.05)",
              overflow: "hidden"
            }}
          >
            {/* Background elements */}
            <div style={{ position: "absolute", top: "-50%", right: "-10%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(212,160,23,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

            {/* Left Content */}
            <div style={{ maxWidth: "55%", position: "relative", zIndex: 10 }}>
              <motion.span 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
                style={{ display: "inline-block", background: "rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.1)", padding: "8px 20px", borderRadius: "100px", fontSize: "0.85rem", fontWeight: 800, letterSpacing: "1px", marginBottom: "20px", color: "var(--gold-dark)" }}
              >
                {slides[current].tag}
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}
                style={{ fontSize: "clamp(2.5rem, 4vw, 3.5rem)", fontWeight: 900, marginBottom: "20px", lineHeight: 1.1, letterSpacing: "-0.03em" }}
              >
                {slides[current].title}
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.5 }}
                style={{ fontSize: "1.1rem", color: "var(--gray)", lineHeight: 1.7, fontWeight: 500, marginBottom: "32px", maxWidth: "480px" }}
              >
                {slides[current].desc}
              </motion.p>
              <motion.button 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }}
                className="btn btn-gold" style={{ padding: "1rem 2.5rem", borderRadius: "100px" }}
              >
                Daha Fazla Bilgi
              </motion.button>
            </div>

            {/* Right Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              style={{ position: "absolute", right: "2%", top: "50%", transform: "translateY(-50%)", width: "45%", height: "130%", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 5 }}
            >
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                style={{ width: "100%", height: "100%", position: "relative" }}
              >
                <Image 
                  src={slides[current].image}
                  alt={slides[current].title}
                  fill
                  style={{ objectFit: "contain", mixBlendMode: "multiply", filter: "contrast(1.1) brightness(1.05)" }}
                  priority
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <div style={{ position: "absolute", bottom: "40px", left: "60px", display: "flex", gap: "12px", zIndex: 20 }}>
          <button onClick={prevSlide} style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--white)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 5px 15px rgba(0,0,0,0.05)", color: "var(--dark)", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
            <ChevronLeft size={20} />
          </button>
          <button onClick={nextSlide} style={{ width: 44, height: 44, borderRadius: "50%", background: "var(--white)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 5px 15px rgba(0,0,0,0.05)", color: "var(--dark)", transition: "all 0.2s" }} onMouseEnter={e => e.currentTarget.style.transform = "scale(1.1)"} onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}>
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
