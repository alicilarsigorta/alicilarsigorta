"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useContent } from "@/lib/content-context";

const AUTOPLAY_MS = 6500;

export default function CampaignSlider() {
  const { content } = useContent();
  const slides = content.campaigns;
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (slides.length === 0 || paused) return;
    const t = setTimeout(() => {
      setDirection(1);
      setCurrent(prev => (prev + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [current, slides.length, paused]);

  if (slides.length === 0) return null;

  const goTo = (i: number) => {
    setDirection(i > current ? 1 : -1);
    setCurrent(i);
  };
  const next = () => goTo((current + 1) % slides.length);
  const prev = () => goTo((current - 1 + slides.length) % slides.length);

  const slide = slides[current];

  return (
    <div
      className="campaign-slider-wrap"
      style={{ position: "relative", width: "100%", overflow: "hidden", paddingTop: "var(--header-h)", background: "var(--white)" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="campaign-slider" style={{ position: "relative", width: "100%", maxWidth: 1280, margin: "0 auto", padding: "0 20px" }}>
        <div className="campaign-stage">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -direction * 60, scale: 0.98 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="campaign-slide"
              style={{ background: slide.color, color: slide.textColor }}
            >
              {/* ambient gold glow */}
              <div className="campaign-glow" />

              {/* Left content */}
              <div className="campaign-text">
                <motion.span
                  initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.5 }}
                  className="campaign-tag"
                >
                  <span className="campaign-tag-dot" />
                  {slide.tag}
                </motion.span>

                <motion.h2
                  initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32, duration: 0.55 }}
                  className="campaign-title"
                >
                  {slide.title}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.55 }}
                  className="campaign-desc"
                >
                  {slide.desc}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.48, duration: 0.55 }}
                  style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}
                >
                  <button className="btn btn-gold campaign-cta">
                    Teklif Al <ArrowUpRight size={18} strokeWidth={2.5} />
                  </button>
                  <span className="campaign-counter">
                    <strong>{String(current + 1).padStart(2, "0")}</strong>
                    <span className="campaign-counter-sep" />
                    {String(slides.length).padStart(2, "0")}
                  </span>
                </motion.div>
              </div>

              {/* Right image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, x: 30 }}
                animate={{ opacity: 1, scale: 1, x: 0 }}
                transition={{ delay: 0.25, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="campaign-image hide-on-mobile"
              >
                <div className="campaign-image-frame">
                  <div className="campaign-image-bg" />
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    className="campaign-image-inner"
                  >
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      sizes="(max-width: 1024px) 42vw, 540px"
                      style={{ objectFit: "contain", objectPosition: "center", filter: "drop-shadow(0 24px 40px rgba(0,0,0,0.18))" }}
                      priority
                    />
                  </motion.div>
                  <div className="campaign-image-shine" />
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination dots + progress */}
        <div className="campaign-pagination">
          {slides.map((s, i) => (
            <button
              key={s.id}
              aria-label={`Slayt ${i + 1}`}
              onClick={() => goTo(i)}
              className={`campaign-dot ${i === current ? "active" : ""}`}
            >
              <span className="campaign-dot-label">{s.tag}</span>
              {i === current && (
                <motion.span
                  ref={progressRef}
                  key={`p-${current}-${paused ? "p" : "r"}`}
                  className="campaign-dot-progress"
                  initial={{ width: 0 }}
                  animate={{ width: paused ? "0%" : "100%" }}
                  transition={{ duration: paused ? 0 : AUTOPLAY_MS / 1000, ease: "linear" }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Arrows */}
        <div className="campaign-controls">
          <button onClick={prev} aria-label="Önceki" className="campaign-arrow">
            <ChevronLeft size={20} />
          </button>
          <button onClick={next} aria-label="Sonraki" className="campaign-arrow">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .campaign-stage { position: relative; height: 520px; }
        .campaign-slide {
          position: absolute; inset: 20px;
          padding: 0;
          display: grid; grid-template-columns: 1.05fr 1fr;
          align-items: stretch;
          border-radius: 28px;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(17,17,17,0.08);
          border: 1px solid rgba(212,160,23,0.12);
        }
        .campaign-glow {
          position: absolute; top: -40%; right: -10%; width: 620px; height: 620px; border-radius: 50%;
          background: radial-gradient(circle, rgba(212,160,23,0.18) 0%, transparent 65%);
          pointer-events: none;
        }
        .campaign-text {
          position: relative; z-index: 5;
          padding: 56px 56px 56px 64px;
          display: flex; flex-direction: column; justify-content: center;
          max-width: 100%;
        }
        .campaign-tag {
          display: inline-flex; align-items: center; gap: 10px;
          background: rgba(255,255,255,0.7); backdrop-filter: blur(8px);
          border: 1px solid rgba(212,160,23,0.25);
          padding: 8px 18px; border-radius: 100px;
          font-size: 0.78rem; font-weight: 800; letter-spacing: 1.4px;
          margin-bottom: 22px; color: var(--gold-dark); text-transform: uppercase;
        }
        .campaign-tag-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--gold); box-shadow: 0 0 0 4px rgba(212,160,23,0.18);
        }
        .campaign-title {
          font-size: clamp(1.8rem, 4.5vw, 3.6rem); font-weight: 900;
          line-height: 1.08; letter-spacing: -0.035em; margin-bottom: 18px;
        }
        .campaign-desc {
          color: var(--gray); line-height: 1.65; font-weight: 500;
          font-size: 1.08rem; margin-bottom: 28px; max-width: 480px;
        }
        .campaign-cta {
          padding: 1rem 1.8rem; border-radius: 100px;
          display: inline-flex; align-items: center; gap: 8px;
        }
        .campaign-counter {
          display: inline-flex; align-items: center; gap: 10px;
          font-size: 0.85rem; font-weight: 700; color: var(--gray);
          letter-spacing: 2px;
        }
        .campaign-counter strong { color: var(--dark); font-weight: 900; font-size: 1.1rem; }
        .campaign-counter-sep { width: 28px; height: 1px; background: var(--border); }
        .campaign-image {
          position: relative;
          z-index: 4;
          padding: 32px 40px;
          display: flex; align-items: center; justify-content: center;
        }
        .campaign-image-frame {
          position: relative;
          width: 100%; height: 100%;
          border-radius: 22px;
          background: linear-gradient(135deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.25) 100%);
          border: 1px solid rgba(212,160,23,0.25);
          overflow: hidden;
          backdrop-filter: blur(6px);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.6), 0 20px 50px rgba(17,17,17,0.06);
        }
        .campaign-image-bg {
          position: absolute; inset: 0;
          background:
            radial-gradient(circle at 30% 30%, rgba(212,160,23,0.18), transparent 55%),
            radial-gradient(circle at 70% 80%, rgba(212,160,23,0.10), transparent 60%);
          pointer-events: none;
        }
        .campaign-image-inner {
          position: absolute; inset: 14px;
        }
        .campaign-image-shine {
          position: absolute; top: 0; left: -40%; width: 60%; height: 100%;
          background: linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.35) 50%, transparent 100%);
          transform: skewX(-18deg);
          pointer-events: none;
          animation: campaign-shine 6s ease-in-out infinite;
        }
        @keyframes campaign-shine {
          0%, 100% { left: -40%; opacity: 0; }
          40% { left: 110%; opacity: 1; }
          41%, 99% { left: 110%; opacity: 0; }
        }

        .campaign-pagination {
          display: flex; gap: 10px; margin: 22px 24px 0; flex-wrap: wrap;
        }
        .campaign-dot {
          flex: 1; min-width: 90px; max-width: 220px;
          position: relative;
          background: transparent; border: 0;
          padding: 14px 0 0; cursor: pointer;
          border-top: 2px solid var(--border);
          transition: border-color 0.3s;
          text-align: left;
        }
        .campaign-dot.active { border-top-color: rgba(212,160,23,0.25); }
        .campaign-dot:hover .campaign-dot-label { color: var(--dark); }
        .campaign-dot-label {
          font-size: 0.72rem; font-weight: 800; letter-spacing: 1.4px;
          color: var(--gray); text-transform: uppercase;
          transition: color 0.3s;
          display: block;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }
        .campaign-dot.active .campaign-dot-label { color: var(--dark); }
        .campaign-dot-progress {
          position: absolute; top: -2px; left: 0;
          height: 2px; background: var(--gold);
        }

        .campaign-controls {
          position: absolute; top: 50%; transform: translateY(-50%);
          left: 0; right: 0;
          display: flex; justify-content: space-between;
          padding: 0 4px;
          pointer-events: none;
          z-index: 10;
        }
        .campaign-arrow {
          pointer-events: auto;
          width: 48px; height: 48px; border-radius: 50%;
          background: rgba(255,255,255,0.92);
          backdrop-filter: blur(10px);
          border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: var(--dark);
          box-shadow: 0 10px 30px rgba(0,0,0,0.08);
          transition: transform 0.2s, background 0.2s;
        }
        .campaign-arrow:hover { transform: scale(1.08); background: #fff; }

        @media (max-width: 1024px) {
          .campaign-stage { height: 460px; }
          .campaign-slide { grid-template-columns: 1.1fr 1fr; }
          .campaign-text { padding: 40px 32px 40px 44px; }
          .campaign-image { padding: 24px 28px; }
        }
        @media (max-width: 768px) {
          .campaign-stage { height: auto; }
          .campaign-slider { padding: 0 12px; }
          .campaign-slide {
            position: relative !important; inset: 0 !important;
            grid-template-columns: 1fr !important;
            border-radius: 22px !important;
            min-height: 320px;
          }
          .campaign-text { padding: 28px 22px 32px !important; }
          .campaign-desc { font-size: 0.98rem !important; margin-bottom: 22px; }
          .campaign-image { display: none; }
          .campaign-controls { display: none; }
          .campaign-pagination { margin: 18px 8px 0; }
          .campaign-dot { min-width: 60px; }
          .campaign-dot-label { font-size: 0.65rem; letter-spacing: 1px; }
        }
      `}} />
    </div>
  );
}
