"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContent } from "@/lib/content-context";
import { viewportOnce, easeOutExpo } from "@/lib/motion";

const AUTOPLAY_MS = 5500;

/**
 * CampaignCarousel — "kayan görseller".
 * Clean, light auto-advancing campaign slider (car / health / home).
 * Pale gradient card, copy left + illustration right, dot pagination.
 */
export default function CampaignCarousel() {
  const { content } = useContent();
  const slides = content.campaigns;
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback((next: number) => {
    setDir(next > index ? 1 : -1);
    setIndex((next + slides.length) % slides.length);
  }, [index, slides.length]);

  useEffect(() => {
    if (paused || slides.length <= 1) return;
    const t = setTimeout(() => {
      setDir(1);
      setIndex((i) => (i + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, paused, slides.length]);

  if (!slides.length) return null;
  const slide = slides[index];

  return (
    <section className="cc-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="cc-head"
        >
          <div>
            <span className="eyebrow">Kampanyalar</span>
            <h2 className="headline-l">Size özel <em>fırsatlar.</em></h2>
          </div>
          <div className="cc-controls">
            <button onClick={() => go(index - 1)} aria-label="Önceki" className="cc-arrow">
              <ChevronLeft size={18} strokeWidth={2.2} />
            </button>
            <button onClick={() => go(index + 1)} aria-label="Sonraki" className="cc-arrow">
              <ChevronRight size={18} strokeWidth={2.2} />
            </button>
          </div>
        </motion.div>

        <div
          className="cc-stage"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={slide.id}
              custom={dir}
              initial={{ opacity: 0, x: dir * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -dir * 50 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="cc-slide"
              style={{ background: slide.color }}
            >
              <div className="cc-text">
                <span className="cc-tag">{slide.tag}</span>
                <h3 className="cc-title">{slide.title}</h3>
                <p className="cc-desc">{slide.desc}</p>
                <Link href="/teklif-al" className="btn btn-gold cc-cta">
                  Teklif Al <ArrowRight size={16} strokeWidth={2.3} />
                </Link>
              </div>
              <div className="cc-image">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  sizes="(max-width: 900px) 80vw, 480px"
                  style={{ objectFit: "contain", objectPosition: "center" }}
                  priority={index === 0}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="cc-dots">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => go(i)}
              aria-label={`Kampanya ${i + 1}`}
              className={`cc-dot ${i === index ? "active" : ""}`}
            />
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .cc-section { background: var(--bg); padding: clamp(48px, 6vw, 80px) 0; }
        .cc-head {
          display: flex; align-items: flex-end; justify-content: space-between;
          gap: 20px; margin-bottom: 28px;
        }
        .cc-head .headline-l { margin: 0; }
        .cc-controls { display: flex; gap: 10px; }
        .cc-arrow {
          width: 44px; height: 44px; border-radius: 50%;
          background: var(--surface); border: 1px solid var(--border-strong);
          color: var(--ink); display: flex; align-items: center; justify-content: center;
          cursor: pointer; transition: all 0.22s ease; box-shadow: var(--shadow-soft);
        }
        .cc-arrow:hover { border-color: var(--blue); color: var(--blue); transform: translateY(-2px); }

        .cc-stage {
          position: relative;
          border-radius: var(--radius-xl);
          overflow: hidden;
          min-height: 340px;
          box-shadow: var(--shadow-card);
          border: 1px solid var(--border);
        }
        .cc-slide {
          position: absolute; inset: 0;
          display: grid; grid-template-columns: 1.1fr 1fr;
          align-items: center;
          gap: 24px;
          padding: clamp(28px, 4vw, 56px);
        }
        .cc-text { position: relative; z-index: 2; }
        .cc-tag {
          display: inline-block;
          padding: 6px 14px; border-radius: 100px;
          background: var(--surface); color: var(--orange-dark);
          font-size: 0.72rem; font-weight: 800; letter-spacing: 0.08em;
          text-transform: uppercase; margin-bottom: 16px;
          box-shadow: var(--shadow-soft);
        }
        .cc-title {
          font-family: var(--font-sans); font-weight: 800;
          font-size: clamp(1.5rem, 3vw, 2.4rem);
          line-height: 1.12; letter-spacing: -0.03em;
          color: var(--ink); margin-bottom: 14px; max-width: 16ch;
        }
        .cc-desc {
          font-size: 1rem; line-height: 1.6; color: var(--ink-soft);
          font-weight: 500; margin-bottom: 24px; max-width: 42ch;
        }
        .cc-cta { padding: 0.85rem 1.8rem !important; }

        .cc-image {
          position: relative; height: 100%; min-height: 240px;
          display: flex; align-items: center; justify-content: center;
        }
        .cc-image :global(img) {
          filter: drop-shadow(0 22px 40px rgba(0,0,0,0.16));
        }

        .cc-dots { display: flex; justify-content: center; gap: 9px; margin-top: 22px; }
        .cc-dot {
          width: 9px; height: 9px; border-radius: 50%;
          background: var(--border-strong); border: none; padding: 0;
          cursor: pointer; transition: all 0.25s ease;
        }
        .cc-dot.active { background: var(--blue); width: 28px; border-radius: 5px; }

        @media (max-width: 900px) {
          .cc-slide { grid-template-columns: 1fr; gap: 16px; }
          .cc-image { display: none; }
          .cc-stage { min-height: 0; }
          .cc-slide { position: relative; }
        }
        @media (max-width: 540px) {
          .cc-head { flex-direction: column; align-items: flex-start; }
          .cc-controls { display: none; }
        }
      ` }} />
    </section>
  );
}
