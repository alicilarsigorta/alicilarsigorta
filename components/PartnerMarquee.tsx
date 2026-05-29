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

function logoSources(name: string): string[] {
  const domain = PARTNER_DOMAINS[name];
  if (!domain) return [];
  return [
    `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
    `https://icons.duckduckgo.com/ip3/${domain}.ico`,
    `https://logo.clearbit.com/${domain}?size=200`,
  ];
}

function PartnerItem({ name }: { name: string }) {
  const sources = logoSources(name);
  const [srcIndex, setSrcIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  if (sources.length === 0 || failed) {
    return (
      <div className="partner-card">
        <span className="partner-card__text">{name}</span>
      </div>
    );
  }

  return (
    <div className="partner-card" title={name}>
      <img
        src={sources[srcIndex]}
        alt={name}
        loading="lazy"
        onError={() => {
          if (srcIndex + 1 < sources.length) setSrcIndex(srcIndex + 1);
          else setFailed(true);
        }}
        className="partner-card__img"
      />
      <span className="partner-card__name">{name}</span>
    </div>
  );
}

export default function PartnerMarquee() {
  const { content } = useContent();
  const partners = content.partners;
  const all = [...partners, ...partners];

  return (
    <div className="partner-marquee-wrap" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", overflow: "hidden", background: "var(--off-white)" }}>
      <div className="partner-marquee-title-wrap">
        <span className="eyebrow" style={{ margin: 0 }}>
          Türkiye'nin en güçlü sigorta ağı · 20+ anlaşmalı şirket
        </span>
      </div>

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
        .partner-marquee-title-wrap { display: flex; justify-content: center; margin-bottom: 48px; padding: 0 1rem; text-align: center; }
        .partner-marquee-fade-l, .partner-marquee-fade-r { width: 150px; }

        .partner-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 18px 28px;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 18px;
          min-width: 180px;
          height: 110px;
          box-shadow: 0 1px 3px rgba(35,36,39,0.04), 0 8px 24px rgba(35,36,39,0.04);
          transition: all 0.3s ease;
          flex-shrink: 0;
        }
        .partner-card__img {
          width: 40px;
          height: 40px;
          object-fit: contain;
          filter: grayscale(100%) contrast(0.9);
          opacity: 0.7;
          transition: filter 0.3s ease, opacity 0.3s ease;
        }
        .partner-card__name {
          font-family: 'Outfit', sans-serif;
          font-weight: 700;
          font-size: 0.82rem;
          color: var(--gray);
          white-space: nowrap;
          letter-spacing: 0.02em;
          transition: color 0.3s ease;
        }
        .partner-card__text {
          font-weight: 800;
          font-size: 1rem;
          color: var(--dark);
          white-space: nowrap;
          letter-spacing: -0.01em;
        }
        @media (hover: hover) {
          .partner-card:hover {
            border-color: var(--border-gold);
            transform: translateY(-4px);
            box-shadow: 0 15px 40px rgba(176,112,80,0.12);
          }
          .partner-card:hover .partner-card__img {
            filter: grayscale(0%) contrast(1);
            opacity: 1;
          }
          .partner-card:hover .partner-card__name {
            color: var(--gold-dark);
          }
          .partner-card:hover .partner-card__text {
            color: var(--gold-dark);
          }
        }
        @media (max-width: 768px) {
          .partner-marquee-wrap { padding: 48px 0; }
          .partner-marquee-title-wrap { margin-bottom: 28px; }
          .partner-marquee-fade-l, .partner-marquee-fade-r { width: 60px; }
          .partner-card {
            padding: 14px 20px;
            min-width: 150px;
            height: 96px;
            gap: 8px;
          }
          .partner-card__img { width: 32px; height: 32px; }
          .partner-card__name { font-size: 0.75rem; }
          .partner-card__text { font-size: 0.88rem; }
        }
      `}} />
    </div>
  );
}
