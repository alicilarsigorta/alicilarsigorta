"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  HeartPulse,
  Home,
  Car,
  Navigation,
  Briefcase,
  FileText,
  Plane,
  ArrowUpRight,
} from "lucide-react";
import Link from "next/link";
import { fadeUp, stagger, viewportSnappy } from "@/lib/motion";

interface Category {
  id: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; color?: string }>;
  title: string;
  desc: string;
  /** Bento layout span on lg breakpoint (3 / 4 / 6) */
  span: 3 | 4 | 6;
  /** Featured = paper-stock background + bigger headline + tag */
  featured?: boolean;
}

const categories: Category[] = [
  { id: "kasko", icon: Car, title: "Kasko", desc: "Aracınızı kaza, çalınma ve doğal afetlere karşı tam kapsamlı koruyun.", span: 6, featured: true },
  { id: "saglik-sigortasi-fiyatlari", icon: HeartPulse, title: "Tamamlayıcı Sağlık", desc: "Özel hastanelerde fark ödemeden kapsamlı tedavi güvencesi.", span: 3 },
  { id: "trafik-sigortasi", icon: Navigation, title: "Trafik Sigortası", desc: "Zorunlu trafik poliçenizi en iyi fiyattan anında yenileyin.", span: 3 },
  { id: "konut-sigortasi", icon: Home, title: "Konut Sigortası", desc: "Evinizi yangın, sel, hırsızlık ve doğal afetlere karşı güvenceye alın.", span: 4 },
  { id: "dask-sorgulama", icon: ShieldCheck, title: "DASK", desc: "Zorunlu deprem sigortanızı saniyeler içinde sorgulayın ve yenileyin.", span: 4 },
  { id: "is-yeri-sigortasi", icon: Briefcase, title: "İş Yeri Sigortası", desc: "İşletmenizi tüm finansal ve fiziksel risklere karşı izole edin.", span: 4 },
  { id: "sorumluluk-sigortasi", icon: FileText, title: "Sorumluluk Sigortası", desc: "3. şahıslara verilebilecek zararlara karşı tam hukuki teminat.", span: 6 },
  { id: "seyahat-sigortasi", icon: Plane, title: "Seyahat Sigortası", desc: "Yurt içi/dışı tüm vizelerde geçerli sağlık ve bagaj güvencesi.", span: 6 },
];

export default function InsuranceCards() {
  return (
    <motion.div
      className="bento ins-bento"
      variants={stagger(0.06, 0.05)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportSnappy}
    >
      {categories.map(({ id, icon: Icon, title, desc, span, featured }, i) => (
        <motion.div
          key={id}
          variants={fadeUp}
          className={`bento-cell bento-cell-${span}`}
        >
          <Link
            href={`/urunlerimiz/${id}`}
            className={`ins-card ${featured ? "ins-card--featured" : ""} ins-card--span-${span}`}
          >
            {/* Editorial index — top corner like a magazine section number */}
            <span className="ins-card-idx">{String(i + 1).padStart(2, "0")}</span>

            {featured && (
              <span className="ins-card-tag">
                <span className="ins-card-tag-dot" />
                EN ÇOK SEÇİLEN
              </span>
            )}

            <div className="ins-card-content">
              <div className="ins-card-icon">
                <Icon size={26} strokeWidth={1.6} />
              </div>

              <div className="ins-card-text">
                <h3 className="ins-card-title">{title}</h3>
                <p className="ins-card-desc">{desc}</p>
              </div>
            </div>

            <div className="ins-card-rule" aria-hidden />

            <div className="ins-card-cta">
              <span>Detayları gör</span>
              <ArrowUpRight size={16} strokeWidth={2.2} />
            </div>
          </Link>
        </motion.div>
      ))}

      <style dangerouslySetInnerHTML={{
        __html: `
        .ins-bento { gap: 16px; }
        @media (min-width: 1024px) { .ins-bento { gap: 18px; } }

        .ins-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          min-height: 220px;
          padding: 28px 26px 22px;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 4px;
          text-decoration: none;
          color: inherit;
          position: relative;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
          isolation: isolate;
        }
        .ins-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: var(--ink);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ins-card:hover {
          transform: translateY(-4px);
          border-color: rgba(14,16,20,0.30);
          box-shadow: 0 30px 60px -20px rgba(14,16,20,0.18);
        }
        .ins-card:hover::before {
          transform: scaleX(1);
        }

        .ins-card--featured {
          background: linear-gradient(170deg, var(--paper-deep) 0%, var(--paper-soft) 100%);
          border-color: rgba(14,16,20,0.18);
          min-height: 280px;
        }
        .ins-card--featured::before {
          background: var(--gold);
          transform: scaleX(1);
        }

        /* Index marker — magazine section number */
        .ins-card-idx {
          position: absolute;
          top: 22px;
          right: 24px;
          font-family: var(--font-display);
          font-style: italic;
          font-weight: 500;
          font-size: 0.92rem;
          color: var(--light-gray);
          letter-spacing: -0.01em;
          font-variant-numeric: tabular-nums lining-nums;
        }
        .ins-card--featured .ins-card-idx {
          color: var(--gold-dark);
        }

        .ins-card-tag {
          position: absolute;
          top: 18px;
          left: 22px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 10px;
          background: var(--ink);
          color: #fff;
          font-size: 0.6rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          border-radius: 100px;
          z-index: 1;
        }
        .ins-card-tag-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--gold);
        }
        .ins-card--featured { padding-top: 56px; }

        .ins-card-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 18px;
          margin-bottom: 22px;
        }

        .ins-card-icon {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: var(--paper);
          border: 1px solid var(--border);
          color: var(--ink);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ins-card:hover .ins-card-icon {
          background: var(--ink);
          color: var(--gold-light);
          border-color: transparent;
          transform: rotate(-4deg);
        }
        .ins-card--featured .ins-card-icon {
          width: 60px;
          height: 60px;
          background: var(--ink);
          color: var(--gold-light);
          border-color: transparent;
          box-shadow: 0 14px 28px rgba(14,16,20,0.18);
        }

        .ins-card-title {
          font-family: var(--font-display);
          font-weight: 500;
          font-size: 1.32rem;
          color: var(--ink);
          letter-spacing: -0.02em;
          line-height: 1.14;
          margin-bottom: 10px;
          font-optical-sizing: auto;
        }
        .ins-card--featured .ins-card-title {
          font-size: clamp(1.6rem, 2.6vw, 2.2rem);
          line-height: 1.05;
          margin-bottom: 14px;
        }
        .ins-card-desc {
          font-size: 0.94rem;
          line-height: 1.6;
          color: var(--gray);
          font-weight: 500;
          max-width: 56ch;
        }
        .ins-card--featured .ins-card-desc {
          font-size: 1.02rem;
          line-height: 1.65;
          max-width: 48ch;
        }

        .ins-card-rule {
          height: 1px;
          background: var(--border);
          margin-bottom: 14px;
        }
        .ins-card--featured .ins-card-rule {
          background: rgba(14,16,20,0.18);
        }

        .ins-card-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-sans);
          font-size: 0.74rem;
          font-weight: 800;
          color: var(--ink);
          letter-spacing: 0.18em;
          text-transform: uppercase;
          transition: gap 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ins-card:hover .ins-card-cta { gap: 12px; color: var(--gold-dark); }
        .ins-card-cta svg { transition: transform 0.3s ease; }
        .ins-card:hover .ins-card-cta svg { transform: translate(2px, -2px); }

        /* SPAN-6 cards — horizontal-friendly layout option */
        @media (min-width: 768px) {
          .ins-card--span-6 .ins-card-content {
            flex-direction: row;
            align-items: flex-start;
            gap: 24px;
          }
          .ins-card--span-6 .ins-card-icon {
            flex-shrink: 0;
          }
          .ins-card--span-6 .ins-card-text {
            flex: 1;
          }
        }

        @media (max-width: 768px) {
          .ins-card { padding: 22px 20px 18px; min-height: 0; }
          .ins-card--featured { padding-top: 52px; min-height: 0; }
          .ins-card-icon { width: 48px; height: 48px; border-radius: 12px; }
          .ins-card--featured .ins-card-icon { width: 52px; height: 52px; }
          .ins-card-title { font-size: 1.18rem; }
          .ins-card--featured .ins-card-title { font-size: 1.6rem; }
          .ins-card-desc { font-size: 0.88rem; }
          .ins-card-idx { top: 16px; right: 18px; font-size: 0.82rem; }
        }
        `,
      }} />
    </motion.div>
  );
}
