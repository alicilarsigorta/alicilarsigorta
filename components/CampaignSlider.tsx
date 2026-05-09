"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContent } from "@/lib/content-context";

export default function CampaignSlider() {
  const { content } = useContent();
  const slides = content.campaigns;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) return null;
  const next = () => setCurrent((p) => (p + 1) % slides.length);
  const prev = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);

  return (
    <section className="campaign-editorial">
      <div className="container campaign-editorial__inner">
        <div className="campaign-editorial__head">
          <div className="section-badge">Kampanyalar</div>
          <div className="campaign-editorial__nav">
            <span className="campaign-editorial__counter">
              <strong>{String(current + 1).padStart(2, "0")}</strong>
              <em>/ {String(slides.length).padStart(2, "0")}</em>
            </span>
            <div className="campaign-editorial__arrows">
              <button onClick={prev} aria-label="Önceki"><ArrowLeft size={16} strokeWidth={1.5} /></button>
              <button onClick={next} aria-label="Sonraki"><ArrowRight size={16} strokeWidth={1.5} /></button>
            </div>
          </div>
        </div>

        <div className="campaign-editorial__stage">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="campaign-editorial__slide"
            >
              <div className="campaign-editorial__text">
                <span className="campaign-editorial__tag">{slides[current].tag}</span>
                <h2 className="campaign-editorial__title">{slides[current].title}</h2>
                <p className="campaign-editorial__desc">{slides[current].desc}</p>
                <Link href="/teklif-al" className="campaign-editorial__cta">
                  Daha Fazla Bilgi
                  <ArrowUpRight size={16} strokeWidth={1.5} />
                </Link>
              </div>
              <div className="campaign-editorial__image">
                <Image
                  src={slides[current].image}
                  alt={slides[current].title}
                  fill
                  style={{ objectFit: "contain" }}
                  priority
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style jsx>{`
        .campaign-editorial {
          background: var(--cream);
          padding-top: var(--header-h);
          border-bottom: 1px solid var(--hairline);
        }
        .campaign-editorial__inner {
          padding-top: clamp(40px, 6vw, 80px);
          padding-bottom: clamp(40px, 6vw, 80px);
        }
        .campaign-editorial__head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: clamp(24px, 4vw, 40px);
          gap: 16px;
        }
        .campaign-editorial__head :global(.section-badge) { margin-bottom: 0; }
        .campaign-editorial__nav { display: flex; align-items: center; gap: 24px; }
        .campaign-editorial__counter {
          font-family: var(--font-serif);
          font-size: 1rem;
          color: var(--ink);
          font-feature-settings: "tnum" 1, "lnum" 1;
        }
        .campaign-editorial__counter strong { font-weight: 500; }
        .campaign-editorial__counter em { font-style: normal; color: var(--muted); margin-left: 4px; }
        .campaign-editorial__arrows { display: flex; gap: 6px; }
        .campaign-editorial__arrows button {
          width: 38px; height: 38px;
          border-radius: 50%;
          border: 1px solid var(--hairline);
          background: var(--white);
          color: var(--ink);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }
        .campaign-editorial__arrows button:hover { background: var(--ink); color: var(--gold-light); border-color: var(--ink); }

        .campaign-editorial__stage {
          position: relative;
          min-height: clamp(320px, 40vw, 460px);
        }
        .campaign-editorial__slide {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: clamp(32px, 5vw, 64px);
          align-items: center;
        }
        .campaign-editorial__tag {
          font-family: var(--font-sans);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold-dark);
          margin-bottom: 18px;
          display: inline-block;
        }
        .campaign-editorial__title {
          font-family: var(--font-serif);
          font-size: clamp(2rem, 5vw, 3.75rem);
          font-weight: 400;
          line-height: 1.05;
          letter-spacing: -0.025em;
          color: var(--ink);
          margin: 0 0 18px;
        }
        .campaign-editorial__desc {
          font-family: var(--font-sans);
          font-size: 1rem;
          line-height: 1.6;
          color: var(--muted);
          max-width: 480px;
          margin: 0 0 28px;
        }
        .campaign-editorial__cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--ink);
          font-weight: 500;
          text-decoration: none;
          padding-bottom: 4px;
          border-bottom: 1px solid var(--ink);
          transition: gap 0.3s ease, opacity 0.2s ease;
        }
        .campaign-editorial__cta:hover { gap: 14px; opacity: 0.7; }

        .campaign-editorial__image {
          position: relative;
          aspect-ratio: 1 / 1;
          width: 100%;
          max-width: 480px;
          margin-left: auto;
        }

        @media (max-width: 768px) {
          .campaign-editorial__slide { grid-template-columns: 1fr; gap: 28px; }
          .campaign-editorial__image { aspect-ratio: 4/3; max-width: 100%; order: -1; }
        }
      `}</style>
    </section>
  );
}
