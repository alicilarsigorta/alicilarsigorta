"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useContent } from "@/lib/content-context";
import { viewportOnce, easeOutExpo } from "@/lib/motion";

/**
 * CampaignCarousel — continuous "kayan" marquee of campaign image cards.
 * Inspired by the alicilarbeton.com "ENDÜSTRİYEL ÇÖZÜMLER" services row:
 * tall full-bleed image cards with the title overlaid at the bottom.
 * The row auto-scrolls horizontally (seamless loop), pausing on hover.
 */
export default function CampaignCarousel() {
  const { content } = useContent();
  const slides = content.campaigns;
  if (!slides.length) return null;

  // Repeat enough that one half of the track exceeds any viewport → seamless loop.
  const reel = [...slides, ...slides, ...slides, ...slides];

  return (
    <section className="cm-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="cm-head"
        >
          <span className="eyebrow">Kampanyalar</span>
          <h2 className="headline-l">Size özel <em>fırsatlar.</em></h2>
        </motion.div>
      </div>

      {/* Full-bleed marquee (escapes container for edge-to-edge scroll) */}
      <div className="cm-marquee">
        <div className="cm-track">
          {reel.map((s, i) => (
            <Link href="/teklif-al" key={`${s.id}-${i}`} className="cm-card" style={{ background: s.color }} aria-label={s.title}>
              <div className="cm-card-img">
                <Image
                  src={s.image}
                  alt={s.title}
                  fill
                  sizes="340px"
                  style={{ objectFit: "contain", objectPosition: "center 42%" }}
                />
              </div>
              <div className="cm-card-overlay">
                <span className="cm-card-tag">{s.tag}</span>
                <h3 className="cm-card-title">{s.title}</h3>
                <span className="cm-card-cta">Teklif Al <ArrowUpRight size={15} strokeWidth={2.4} /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .cm-section { background: var(--bg); padding: clamp(48px, 6vw, 84px) 0; overflow: hidden; }
        .cm-head { margin-bottom: 30px; }
        .cm-head .headline-l { margin: 0; }

        .cm-marquee {
          position: relative;
          width: 100%;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 3%, #000 97%, transparent 100%);
          mask-image: linear-gradient(90deg, transparent 0, #000 3%, #000 97%, transparent 100%);
        }
        .cm-track {
          display: flex;
          gap: 20px;
          width: max-content;
          padding: 8px 20px;
          animation: cm-scroll 42s linear infinite;
          will-change: transform;
        }
        .cm-marquee:hover .cm-track { animation-play-state: paused; }
        @keyframes cm-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cm-track { animation: none; }
        }

        .cm-card {
          position: relative;
          flex-shrink: 0;
          width: 340px;
          height: 440px;
          border-radius: 20px;
          overflow: hidden;
          text-decoration: none;
          box-shadow: var(--shadow-card);
          border: 1px solid var(--border);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .cm-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-hover); }

        .cm-card-img {
          position: absolute;
          inset: 0 0 38% 0;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .cm-card:hover .cm-card-img { transform: scale(1.05); }

        .cm-card-overlay {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          padding: 26px 22px 22px;
          background: linear-gradient(to top, rgba(11,20,40,0.92) 0%, rgba(11,20,40,0.78) 55%, rgba(11,20,40,0) 100%);
          display: flex; flex-direction: column; align-items: flex-start; gap: 8px;
        }
        .cm-card-tag {
          display: inline-block;
          padding: 4px 11px; border-radius: 100px;
          background: var(--orange); color: #fff;
          font-size: 0.62rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase;
        }
        .cm-card-title {
          font-family: var(--font-sans); font-weight: 800;
          font-size: 1.18rem; line-height: 1.18; letter-spacing: -0.02em;
          color: #fff; margin: 0;
        }
        .cm-card-cta {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 0.78rem; font-weight: 700; color: #8fd0ff;
          margin-top: 2px;
          transition: gap 0.25s ease;
        }
        .cm-card:hover .cm-card-cta { gap: 9px; }

        @media (max-width: 540px) {
          .cm-card { width: 264px; height: 360px; }
        }
      ` }} />
    </section>
  );
}
