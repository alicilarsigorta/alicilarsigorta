"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Check, ArrowRight, ShieldPlus } from "lucide-react";
import { fadeUp, stagger, viewportOnce, easeOutExpo } from "@/lib/motion";

const POINTS = [
  "Yatışlı & yatışsız tedavi teminatı",
  "Anlaşmalı özel hastane ve tanı merkezleri",
  "Check-up, diş ve göz paketleri",
];

/**
 * HospitalSection — "hastane kısmı".
 * Tamamlayıcı Sağlık feature: real hospital/agency photos on the left
 * (stacked composition + floating badge), concise health pitch on the right.
 */
export default function HospitalSection() {
  return (
    <section className="hs-section">
      <div className="container">
        <div className="hs-grid">
          {/* LEFT — image composition */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: easeOutExpo }}
            className="hs-media"
          >
            <div className="hs-img-main">
              <Image
                src="/hastane.jpg"
                alt="Anlaşmalı özel hastane — Tamamlayıcı Sağlık"
                fill
                sizes="(max-width: 900px) 90vw, 540px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="hs-img-sub">
              <Image
                src="/hastane2.jpg"
                alt="Sağlık hizmeti"
                fill
                sizes="(max-width: 900px) 40vw, 220px"
                style={{ objectFit: "cover" }}
              />
            </div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, ease: easeOutExpo, delay: 0.4 }}
              className="hs-badge"
              aria-hidden
            >
              <span className="hs-badge-ic"><ShieldPlus size={18} /></span>
              <div>
                <div className="hs-badge-num">Fark ödemeden</div>
                <div className="hs-badge-label">özel hastane tedavisi</div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT — copy */}
          <motion.div
            variants={stagger(0.08, 0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="hs-copy"
          >
            <motion.span variants={fadeUp} className="eyebrow">
              Tamamlayıcı Sağlık Sigortası
            </motion.span>
            <motion.h2 variants={fadeUp} className="headline-l hs-title">
              Özel hastanelerde, <em>fark ödemeden</em> tedavi.
            </motion.h2>
            <motion.p variants={fadeUp} className="hs-text">
              SGK&apos;lınızı kullanarak Türkiye&apos;nin önde gelen özel hastanelerinde
              muayene, tahlil ve ameliyatlarınızı fark ücreti ödemeden olun. Karabük
              merkezli uzman ekibimiz, ihtiyacınıza en uygun paketi dakikalar içinde hazırlar.
            </motion.p>

            <motion.ul variants={fadeUp} className="hs-points">
              {POINTS.map((p) => (
                <li key={p}>
                  <span className="hs-check"><Check size={13} strokeWidth={3} /></span>
                  {p}
                </li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp} className="hs-cta-row">
              <Link href="/urunlerimiz/saglik-sigortasi-fiyatlari" className="btn btn-gold hs-cta">
                Sağlık Teklifi Al <ArrowRight size={17} strokeWidth={2.3} />
              </Link>
              <Link href="/urunlerimiz/saglik-sigortasi-fiyatlari" className="ed-link">
                Detayları incele
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .hs-section { background: var(--surface); padding: clamp(56px, 7vw, 96px) 0; border-top: 1px solid var(--border); }
        .hs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(2.4rem, 6vw, 5rem);
          align-items: center;
        }

        /* Media composition */
        .hs-media {
          position: relative;
          padding-bottom: 36px;
          padding-right: 36px;
        }
        .hs-img-main {
          position: relative;
          width: 100%;
          aspect-ratio: 5 / 4;
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: var(--shadow-elev);
        }
        .hs-img-sub {
          position: absolute;
          right: 0;
          bottom: 0;
          width: 46%;
          aspect-ratio: 4 / 3;
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 5px solid var(--surface);
          box-shadow: var(--shadow-hover);
        }
        .hs-badge {
          position: absolute;
          left: -10px;
          bottom: 22%;
          display: flex;
          align-items: center;
          gap: 11px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 12px 16px;
          box-shadow: var(--shadow-hover);
          z-index: 2;
        }
        .hs-badge-ic {
          width: 38px; height: 38px; border-radius: 10px;
          background: var(--blue-tint); color: var(--blue);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .hs-badge-num { font-size: 0.95rem; font-weight: 800; color: var(--ink); letter-spacing: -0.01em; }
        .hs-badge-label { font-size: 0.74rem; color: var(--text-muted); font-weight: 500; }

        /* Copy */
        .hs-title { margin-bottom: 16px; }
        .hs-text {
          font-size: 1.04rem; line-height: 1.7; color: var(--text-secondary);
          font-weight: 400; margin-bottom: 24px; max-width: 48ch;
        }
        .hs-points {
          list-style: none; display: flex; flex-direction: column; gap: 13px; margin-bottom: 30px;
        }
        .hs-points li {
          display: flex; align-items: center; gap: 12px;
          font-size: 1rem; color: var(--ink-soft); font-weight: 500;
        }
        .hs-check {
          flex-shrink: 0; width: 24px; height: 24px; border-radius: 50%;
          background: #22c55e; color: #fff;
          display: flex; align-items: center; justify-content: center;
        }
        .hs-cta-row { display: flex; align-items: center; gap: 24px; flex-wrap: wrap; }
        .hs-cta { padding: 0.95rem 2rem !important; }

        @media (max-width: 900px) {
          .hs-grid { grid-template-columns: 1fr; gap: 40px; }
          .hs-media { max-width: 520px; }
        }
        @media (max-width: 540px) {
          .hs-badge { left: 0; padding: 9px 12px; }
          .hs-badge-num { font-size: 0.85rem; }
          .hs-cta { width: 100%; justify-content: center; }
          .hs-cta-row { width: 100%; }
        }
      ` }} />
    </section>
  );
}
