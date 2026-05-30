"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Car, Navigation, HeartPulse, Home, ShieldCheck,
  Briefcase, Plane, Stethoscope, ArrowUpRight,
} from "lucide-react";
import { viewportOnce, easeOutExpo } from "@/lib/motion";

type Tone = "blue" | "orange";

interface Service {
  id: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number }>;
  title: string;
  desc: string;
  tone: Tone;
}

const SERVICES: Service[] = [
  { id: "kasko", icon: Car, title: "Kasko", desc: "Aracınıza tam kapsamlı koruma", tone: "orange" },
  { id: "trafik-sigortasi", icon: Navigation, title: "Trafik Sigortası", desc: "Zorunlu trafik, en iyi fiyata", tone: "blue" },
  { id: "saglik-sigortasi-fiyatlari", icon: HeartPulse, title: "Tamamlayıcı Sağlık", desc: "Özel hastanede fark ödemeden", tone: "orange" },
  { id: "konut-sigortasi", icon: Home, title: "Konut Sigortası", desc: "Eviniz her riske karşı güvende", tone: "blue" },
  { id: "dask-sorgulama", icon: ShieldCheck, title: "DASK", desc: "Zorunlu deprem sigortası", tone: "orange" },
  { id: "is-yeri-sigortasi", icon: Briefcase, title: "İş Yeri Sigortası", desc: "İşletmenizi tüm risklere karşı", tone: "blue" },
  { id: "seyahat-sigortasi", icon: Plane, title: "Seyahat Sağlık", desc: "Yurt içi & yurt dışı güvence", tone: "orange" },
  { id: "saglik-sigortasi-fiyatlari", icon: Stethoscope, title: "Özel Sağlık", desc: "Kapsamlı özel sağlık planı", tone: "blue" },
];

/**
 * ServicesMarquee — continuous "kayan" row of service cards.
 * Modeled on the alicilarbeton.com services row: tall cards with the
 * title overlaid at the bottom, scrolling horizontally and looping.
 * Shows the insurance branches (hizmetler) instead of campaigns.
 */
export default function ServicesMarquee() {
  // Repeat so one half of the track exceeds any viewport → seamless loop.
  const reel = [...SERVICES, ...SERVICES];

  return (
    <section className="sm-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, ease: easeOutExpo }}
          className="sm-head"
        >
          <span className="eyebrow">Hizmetlerimiz</span>
          <h2 className="headline-l">Sunduğumuz <em>sigorta çözümleri.</em></h2>
        </motion.div>
      </div>

      <div className="sm-marquee">
        <div className="sm-track">
          {reel.map((s, i) => {
            const Icon = s.icon;
            return (
              <Link
                href={`/urunlerimiz/${s.id}`}
                key={`${s.id}-${i}`}
                className={`sm-card sm-card--${s.tone}`}
                aria-label={s.title}
              >
                <div className="sm-card-iconwrap">
                  <span className="sm-card-icon"><Icon size={40} strokeWidth={1.5} /></span>
                </div>
                <div className="sm-card-overlay">
                  <h3 className="sm-card-title">{s.title}</h3>
                  <p className="sm-card-desc">{s.desc}</p>
                  <span className="sm-card-cta">Detaylar <ArrowUpRight size={15} strokeWidth={2.4} /></span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .sm-section { background: var(--bg); padding: clamp(48px, 6vw, 84px) 0; overflow: hidden; }
        .sm-head { margin-bottom: 30px; }
        .sm-head .headline-l { margin: 0; }

        .sm-marquee {
          position: relative;
          width: 100%;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(90deg, transparent 0, #000 3%, #000 97%, transparent 100%);
          mask-image: linear-gradient(90deg, transparent 0, #000 3%, #000 97%, transparent 100%);
        }
        .sm-track {
          display: flex;
          gap: 20px;
          width: max-content;
          padding: 8px 20px;
          animation: sm-scroll 46s linear infinite;
          will-change: transform;
        }
        .sm-marquee:hover .sm-track { animation-play-state: paused; }
        @keyframes sm-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) { .sm-track { animation: none; } }

        .sm-card {
          position: relative;
          flex-shrink: 0;
          width: 320px;
          height: 420px;
          border-radius: 20px;
          overflow: hidden;
          text-decoration: none;
          box-shadow: var(--shadow-card);
          border: 1px solid var(--border);
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), box-shadow 0.4s cubic-bezier(0.16,1,0.3,1);
        }
        .sm-card--blue { background: linear-gradient(160deg, #eaf4fe 0%, #f7fbff 60%); }
        .sm-card--orange { background: linear-gradient(160deg, #fff1e6 0%, #fffaf5 60%); }
        .sm-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-hover); }

        .sm-card-iconwrap {
          position: absolute;
          inset: 0 0 40% 0;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .sm-card:hover .sm-card-iconwrap { transform: scale(1.08); }
        .sm-card-icon {
          width: 96px; height: 96px; border-radius: 26px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 18px 36px rgba(0,0,0,0.12);
        }
        .sm-card--blue .sm-card-icon { background: var(--blue); color: #fff; box-shadow: 0 18px 36px rgba(0,137,236,0.32); }
        .sm-card--orange .sm-card-icon { background: var(--orange); color: #fff; box-shadow: 0 18px 36px rgba(255,115,0,0.30); }

        .sm-card-overlay {
          position: absolute;
          left: 0; right: 0; bottom: 0;
          padding: 26px 22px 22px;
          background: linear-gradient(to top, rgba(11,20,40,0.94) 0%, rgba(11,20,40,0.82) 55%, rgba(11,20,40,0) 100%);
          display: flex; flex-direction: column; align-items: flex-start; gap: 5px;
        }
        .sm-card-title {
          font-family: var(--font-sans); font-weight: 800;
          font-size: 1.24rem; line-height: 1.15; letter-spacing: -0.02em;
          color: #fff; margin: 0;
        }
        .sm-card-desc {
          font-size: 0.86rem; line-height: 1.4; color: rgba(255,255,255,0.78);
          font-weight: 500; margin: 0;
        }
        .sm-card-cta {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 0.78rem; font-weight: 700; color: #8fd0ff;
          margin-top: 6px; transition: gap 0.25s ease;
        }
        .sm-card:hover .sm-card-cta { gap: 9px; }

        @media (max-width: 540px) {
          .sm-card { width: 250px; height: 350px; }
          .sm-card-icon { width: 80px; height: 80px; border-radius: 22px; }
        }
      ` }} />
    </section>
  );
}
