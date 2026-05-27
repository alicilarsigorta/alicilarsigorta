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
import { fadeUp, stagger, viewportSnappy, easeOutExpo } from "@/lib/motion";

interface Category {
  id: string;
  icon: React.ComponentType<{ size?: number; strokeWidth?: number; color?: string }>;
  title: string;
  desc: string;
  featured?: boolean;
}

const categories: Category[] = [
  { id: "kasko", icon: Car, title: "Kasko", desc: "Aracınızı kaza, çalınma ve doğal afetlere karşı tam kapsamlı koruyun.", featured: true },
  { id: "trafik-sigortasi", icon: Navigation, title: "Trafik Sigortası", desc: "Zorunlu trafik poliçenizi en iyi fiyattan anında yenileyin." },
  { id: "saglik-sigortasi-fiyatlari", icon: HeartPulse, title: "Tamamlayıcı Sağlık", desc: "Özel hastanelerde fark ödemeden kapsamlı tedavi güvencesi." },
  { id: "konut-sigortasi", icon: Home, title: "Konut Sigortası", desc: "Evinizi yangın, sel, hırsızlık ve doğal afetlere karşı güvenceye alın." },
  { id: "dask-sorgulama", icon: ShieldCheck, title: "DASK", desc: "Zorunlu deprem sigortanızı saniyeler içinde sorgulayın ve yenileyin." },
  { id: "is-yeri-sigortasi", icon: Briefcase, title: "İş Yeri Sigortası", desc: "İşletmenizi tüm finansal ve fiziksel risklere karşı izole edin." },
  { id: "sorumluluk-sigortasi", icon: FileText, title: "Sorumluluk Sigortası", desc: "3. şahıslara verilebilecek zararlara karşı tam hukuki teminat." },
  { id: "seyahat-sigortasi", icon: Plane, title: "Seyahat Sigortası", desc: "Yurt içi/dışı tüm vizelerde geçerli sağlık ve bagaj güvencesi." },
];

export default function InsuranceCards() {
  return (
    <motion.div
      className="grid-4 ins-cards"
      variants={stagger(0.08, 0.05)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportSnappy}
    >
      {categories.map(({ id, icon: Icon, title, desc, featured }) => (
        <motion.div key={id} variants={fadeUp} style={{ height: "100%" }}>
          <Link
            href={`/urunlerimiz/${id}`}
            className={`ins-card ${featured ? "ins-card--featured" : ""}`}
          >
            {featured && (
              <span className="ins-card-tag">
                <span className="ins-card-tag-dot" />
                EN ÇOK SEÇİLEN
              </span>
            )}

            <div className="ins-card-icon">
              <Icon size={28} strokeWidth={1.6} />
            </div>

            <h3 className="ins-card-title">{title}</h3>
            <p className="ins-card-desc">{desc}</p>

            <div className="ins-card-cta">
              <span>Detayları gör</span>
              <ArrowUpRight size={16} strokeWidth={2.2} />
            </div>

            <div className="ins-card-rule" aria-hidden />
          </Link>
        </motion.div>
      ))}

      <style dangerouslySetInnerHTML={{
        __html: `
        .ins-cards { gap: 1.5rem; }

        .ins-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          padding: 32px 28px 28px;
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 22px;
          text-decoration: none;
          color: inherit;
          position: relative;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
          isolation: isolate;
        }
        .ins-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--gold-dark), var(--gold), var(--gold-light));
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ins-card:hover {
          transform: translateY(-6px);
          border-color: var(--border-gold);
          box-shadow: var(--shadow-elev);
        }
        .ins-card:hover::before {
          transform: scaleX(1);
        }

        .ins-card--featured {
          background: linear-gradient(170deg, #fbf5e3 0%, var(--white) 60%);
          border-color: var(--border-gold);
        }
        .ins-card--featured::before {
          transform: scaleX(1);
        }

        .ins-card-tag {
          position: absolute;
          top: 18px;
          right: 18px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 10px;
          background: var(--ink);
          color: #fff;
          font-size: 0.62rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          border-radius: 100px;
          z-index: 1;
        }
        .ins-card-tag-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--gold);
        }

        .ins-card-icon {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          background: var(--gold-soft);
          border: 1px solid var(--border-gold);
          color: var(--gold-dark);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 22px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ins-card:hover .ins-card-icon {
          background: linear-gradient(135deg, var(--gold-dark) 0%, var(--gold) 100%);
          color: #fff;
          border-color: transparent;
          transform: scale(1.06) rotate(-3deg);
          box-shadow: 0 12px 30px rgba(201,164,73,0.32);
        }

        .ins-card-title {
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 1.28rem;
          color: var(--ink);
          letter-spacing: -0.015em;
          line-height: 1.18;
          margin-bottom: 10px;
          font-optical-sizing: auto;
        }
        .ins-card-desc {
          flex: 1;
          font-size: 0.93rem;
          line-height: 1.6;
          color: var(--gray);
          font-weight: 500;
          margin-bottom: 22px;
        }

        .ins-card-rule {
          height: 1px;
          background: var(--border);
          margin-bottom: 16px;
        }

        .ins-card-cta {
          order: 99;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--gold-dark);
          letter-spacing: 0.015em;
          transition: gap 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ins-card:hover .ins-card-cta {
          gap: 10px;
        }

        @media (max-width: 768px) {
          .ins-card { padding: 24px 22px 22px; border-radius: 18px; }
          .ins-card-icon { width: 48px; height: 48px; border-radius: 13px; margin-bottom: 16px; }
          .ins-card-title { font-size: 1.15rem; }
          .ins-card-desc { font-size: 0.88rem; }
        }
        `,
      }} />
    </motion.div>
  );
}
