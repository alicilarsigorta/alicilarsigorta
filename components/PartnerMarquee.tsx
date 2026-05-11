"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useContent } from "@/lib/content-context";

// Map partner name → official domain (used for Clearbit logo API)
const PARTNER_DOMAINS: Record<string, string> = {
  "Allianz": "allianz.com.tr",
  "Anadolu Sigorta": "anadolusigorta.com.tr",
  "Aksigorta": "aksigorta.com.tr",
  "Türkiye Sigorta": "turkiyesigorta.com.tr",
  "HDI Sigorta": "hdisigorta.com.tr",
  "Ray Sigorta": "raysigorta.com.tr",
  "Sompo Sigorta": "sompo.com.tr",
  "Mapfre Sigorta": "mapfre.com.tr",
  "Axa Sigorta": "axasigorta.com.tr",
  "Eureko Sigorta": "eurekosigorta.com.tr",
  "Bupa Acıbadem": "bupaacibademsigorta.com.tr",
  "Neova Katılım": "neova.com.tr",
  "Koru Sigorta": "korusigorta.com.tr",
  "Türk Nippon": "turknippon.com",
  "Unico Sigorta": "unicosigorta.com.tr",
  "Bereket Sigorta": "bereketsigorta.com.tr",
};

function logoUrl(name: string): string | null {
  const domain = PARTNER_DOMAINS[name];
  if (!domain) return null;
  return `https://logo.clearbit.com/${domain}?size=200`;
}

function PartnerItem({ name }: { name: string }) {
  const [errored, setErrored] = useState(false);
  const url = logoUrl(name);

  if (!url || errored) {
    return (
      <div className="partner-card">
        <span className="partner-card__text">{name}</span>
      </div>
    );
  }

  return (
    <div className="partner-card">
      <img
        src={url}
        alt={name}
        loading="lazy"
        onError={() => setErrored(true)}
        className="partner-card__img"
      />
    </div>
  );
}

export default function PartnerMarquee() {
  const { content } = useContent();
  const partners = content.partners;
  const all = [...partners, ...partners];

  return (
    <div className="partner-marquee-wrap" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", overflow: "hidden", background: "var(--off-white)" }}>
      <p className="partner-marquee-title" style={{ textAlign: "center", fontWeight: 900, textTransform: "uppercase", color: "var(--gold-dark)" }}>
        TÜRKİYE&apos;NİN EN GÜÇLÜ SİGORTA AĞI
      </p>

      <div style={{ display: "flex", overflow: "hidden", position: "relative" }}>
        <div className="partner-marquee-fade-l" style={{ position: "absolute", top: 0, left: 0, bottom: 0, background: "linear-gradient(to right, var(--off-white), transparent)", zIndex: 2 }} />
        <div className="partner-marquee-fade-r" style={{ position: "absolute", top: 0, right: 0, bottom: 0, background: "linear-gradient(to left, var(--off-white), transparent)", zIndex: 2 }} />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
          style={{ display: "flex", gap: "24px", flexShrink: 0, width: "max-content", paddingLeft: "12px" }}
        >
          {all.map((name, i) => (
            <PartnerItem key={i} name={name} />
          ))}
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .partner-marquee-wrap { padding: 80px 0; }
        .partner-marquee-title { font-size: 0.85rem; letter-spacing: 3px; margin-bottom: 48px; padding: 0 1rem; }
        .partner-marquee-fade-l, .partner-marquee-fade-r { width: 150px; }

        .partner-card {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 18px 36px;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 20px;
          min-width: 200px;
          height: 96px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
          transition: all 0.3s ease;
          flex-shrink: 0;
        }
        .partner-card__img {
          max-width: 130px;
          max-height: 56px;
          width: auto;
          height: auto;
          object-fit: contain;
          filter: grayscale(100%) contrast(0.95);
          opacity: 0.75;
          transition: filter 0.3s ease, opacity 0.3s ease;
        }
        .partner-card__text {
          font-weight: 900;
          font-size: 1.05rem;
          color: var(--black);
          white-space: nowrap;
          letter-spacing: -0.02em;
        }
        @media (hover: hover) {
          .partner-card:hover {
            border-color: var(--gold);
            transform: translateY(-5px);
            box-shadow: 0 15px 40px rgba(212,160,23,0.15);
          }
          .partner-card:hover .partner-card__img {
            filter: grayscale(0%) contrast(1);
            opacity: 1;
          }
          .partner-card:hover .partner-card__text {
            color: var(--gold-dark);
          }
        }
        @media (max-width: 768px) {
          .partner-marquee-wrap { padding: 48px 0; }
          .partner-marquee-title { font-size: 0.72rem; letter-spacing: 2px; margin-bottom: 28px; }
          .partner-marquee-fade-l, .partner-marquee-fade-r { width: 60px; }
          .partner-card {
            padding: 14px 24px;
            min-width: 160px;
            height: 80px;
          }
          .partner-card__img { max-width: 110px; max-height: 44px; }
          .partner-card__text { font-size: 0.9rem; }
        }
      `}} />
    </div>
  );
}
