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
            {/* Mono index — dashboard tile number */}
            <span className="ins-card-idx">{String(i + 1).padStart(2, "0")}</span>

            {featured && (
              <span className="ins-card-tag">
                <span className="ins-card-tag-dot" />
                EN ÇOK SEÇİLEN
              </span>
            )}

            <div className="ins-card-content">
              <div className="ins-card-icon">
                <Icon size={26} strokeWidth={1.7} />
              </div>

              <div className="ins-card-text">
                <h3 className="ins-card-title">{title}</h3>
                <p className="ins-card-desc">{desc}</p>
              </div>
            </div>

            <div className="ins-card-rule" aria-hidden />

            <div className="ins-card-cta">
              <span>Detayları gör</span>
              <ArrowUpRight size={15} strokeWidth={2.2} />
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
          padding: 26px 24px 22px;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 18px;
          backdrop-filter: var(--glass-blur);
          -webkit-backdrop-filter: var(--glass-blur);
          text-decoration: none;
          color: var(--text-primary);
          position: relative;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      border-color 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      background 0.4s ease;
          overflow: hidden;
          isolation: isolate;
        }
        .ins-card::before {
          content: '';
          position: absolute;
          top: 0; left: 24px; right: 24px;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--mint), transparent);
          opacity: 0;
          transition: opacity 0.4s;
        }
        .ins-card:hover {
          transform: translateY(-4px);
          background: var(--glass-bg-strong);
          border-color: var(--mint);
          box-shadow: 0 30px 60px -20px rgba(0, 0, 0, 0.5), 0 0 40px var(--mint-soft);
        }
        .ins-card:hover::before {
          opacity: 1;
        }

        .ins-card--featured {
          background: linear-gradient(170deg, rgba(0, 212, 168, 0.08) 0%, var(--glass-bg) 100%);
          border-color: var(--mint-glow);
          min-height: 280px;
        }
        .ins-card--featured::before {
          opacity: 1;
        }

        .ins-card-idx {
          position: absolute;
          top: 20px;
          right: 22px;
          font-family: var(--font-mono);
          font-weight: 500;
          font-size: 0.8rem;
          color: var(--text-muted);
          letter-spacing: 0.04em;
          font-variant-numeric: tabular-nums lining-nums;
        }
        .ins-card--featured .ins-card-idx {
          color: var(--mint);
        }

        .ins-card-tag {
          position: absolute;
          top: 16px;
          left: 20px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 10px;
          background: var(--mint);
          color: var(--navy-deep);
          font-family: var(--font-mono);
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          border-radius: 100px;
          z-index: 1;
        }
        .ins-card-tag-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--navy-deep);
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
          width: 50px;
          height: 50px;
          border-radius: 13px;
          background: var(--glass-bg-strong);
          border: 1px solid var(--glass-border);
          color: var(--mint);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ins-card:hover .ins-card-icon {
          background: var(--mint);
          color: var(--navy-deep);
          border-color: transparent;
          transform: rotate(-4deg);
          box-shadow: 0 10px 24px var(--mint-glow);
        }
        .ins-card--featured .ins-card-icon {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, var(--mint) 0%, var(--violet) 100%);
          color: var(--navy-deep);
          border-color: transparent;
          box-shadow: 0 14px 28px var(--mint-glow);
        }

        .ins-card-title {
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 1.22rem;
          color: var(--text-primary);
          letter-spacing: -0.02em;
          line-height: 1.18;
          margin-bottom: 10px;
        }
        .ins-card--featured .ins-card-title {
          font-size: clamp(1.5rem, 2.4vw, 2rem);
          line-height: 1.06;
          margin-bottom: 14px;
        }
        .ins-card-desc {
          font-size: 0.94rem;
          line-height: 1.6;
          color: var(--text-secondary);
          font-weight: 400;
          max-width: 56ch;
        }
        .ins-card--featured .ins-card-desc {
          font-size: 1rem;
          line-height: 1.65;
          max-width: 48ch;
        }

        .ins-card-rule {
          height: 1px;
          background: var(--glass-border);
          margin-bottom: 14px;
        }

        .ins-card-cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          font-weight: 600;
          color: var(--mint);
          letter-spacing: 0.16em;
          text-transform: uppercase;
          transition: gap 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ins-card:hover .ins-card-cta { gap: 12px; color: var(--mint-light); }
        .ins-card-cta svg { transition: transform 0.3s ease; }
        .ins-card:hover .ins-card-cta svg { transform: translate(2px, -2px); }

        /* SPAN-6 cards — horizontal-friendly layout */
        @media (min-width: 768px) {
          .ins-card--span-6 .ins-card-content {
            flex-direction: row;
            align-items: flex-start;
            gap: 24px;
          }
          .ins-card--span-6 .ins-card-icon { flex-shrink: 0; }
          .ins-card--span-6 .ins-card-text { flex: 1; }
        }

        @media (max-width: 768px) {
          .ins-card { padding: 22px 20px 18px; min-height: 0; }
          .ins-card--featured { padding-top: 52px; min-height: 0; }
          .ins-card-icon { width: 46px; height: 46px; border-radius: 12px; }
          .ins-card--featured .ins-card-icon { width: 52px; height: 52px; }
          .ins-card-title { font-size: 1.12rem; }
          .ins-card--featured .ins-card-title { font-size: 1.5rem; }
          .ins-card-desc { font-size: 0.88rem; }
          .ins-card-idx { top: 16px; right: 18px; font-size: 0.72rem; }
        }
        `,
      }} />
    </motion.div>
  );
}
