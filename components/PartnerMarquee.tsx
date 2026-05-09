"use client";

import { motion } from "framer-motion";
import { useContent } from "@/lib/content-context";

export default function PartnerMarquee() {
  const { content } = useContent();
  const partners = content.partners;
  const all = [...partners, ...partners];

  return (
    <div className="partner-marquee-wrap" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", overflow: "hidden", background: "var(--off-white)" }}>
      <p className="partner-marquee-title" style={{ textAlign: "center", fontWeight: 900, textTransform: "uppercase", color: "var(--gold-dark)" }}>
        TÜRKİYE&apos;NİN EN GÜÇLÜ SİGORTA AĞI
      </p>

      {/* Track 1 - Left to Right */}
      <div style={{ display: "flex", overflow: "hidden", position: "relative" }}>
        {/* Gradient fades for seamless loop effect on edges */}
        <div className="partner-marquee-fade-l" style={{ position: "absolute", top: 0, left: 0, bottom: 0, background: "linear-gradient(to right, var(--off-white), transparent)", zIndex: 2 }} />
        <div className="partner-marquee-fade-r" style={{ position: "absolute", top: 0, right: 0, bottom: 0, background: "linear-gradient(to left, var(--off-white), transparent)", zIndex: 2 }} />

        <motion.div
           animate={{ x: ["0%", "-50%"] }}
           transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
           style={{ display: "flex", gap: "24px", flexShrink: 0, width: "max-content", paddingLeft: "12px" }}
        >
          {all.map((name, i) => (
            <div
              key={i}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "20px 48px", background: "var(--white)",
                border: "1px solid var(--border)", borderRadius: "20px",
                fontWeight: 900, fontSize: "1.1rem", color: "var(--black)",
                whiteSpace: "nowrap", letterSpacing: "-0.02em",
                minWidth: "240px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
                transition: "all 0.3s", cursor: "default"
              }}
              className="partner-card"
            >
              {name}
            </div>
          ))}
        </motion.div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .partner-marquee-wrap { padding: 80px 0; }
        .partner-marquee-title { font-size: 0.85rem; letter-spacing: 3px; margin-bottom: 48px; padding: 0 1rem; }
        .partner-marquee-fade-l, .partner-marquee-fade-r { width: 150px; }
        @media (hover: hover) {
          .partner-card:hover {
             border-color: var(--gold);
             transform: translateY(-5px);
             box-shadow: 0 15px 40px rgba(212,160,23,0.15);
             color: var(--gold-dark) !important;
          }
        }
        @media (max-width: 768px) {
           .partner-marquee-wrap { padding: 48px 0; }
           .partner-marquee-title { font-size: 0.72rem; letter-spacing: 2px; margin-bottom: 28px; }
           .partner-marquee-fade-l, .partner-marquee-fade-r { width: 60px; }
           .partner-card {
             padding: 14px 24px !important;
             font-size: 0.9rem !important;
             min-width: 160px !important;
           }
        }
      `}} />
    </div>
  );
}
