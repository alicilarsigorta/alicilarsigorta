"use client";

import { motion, Variants } from "framer-motion";
import { ShieldCheck, HeartPulse, Home, Car, Navigation, Briefcase, FileText, Plane, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const categories = [
  { id: "trafik-sigortasi",           icon: Navigation, title: "Trafik Sigortaları",   desc: "Zorunlu trafik poliçenizi en iyi fiyata anında yenileyin." },
  { id: "kasko",                       icon: Car,         title: "Kasko",                desc: "Aracınızı kaza, çalınma ve hasara karşı tam kapsamlı koruyun." },
  { id: "konut-sigortasi",             icon: Home,        title: "Konut Sigortaları",    desc: "Evinizi yangın, sel, hırsızlık ve doğal afetlere karşı güvenceye alın." },
  { id: "saglik-sigortasi-fiyatlari",  icon: HeartPulse,  title: "Sağlık Sigortaları",   desc: "Özel hastanelerde fark ödemeden kapsamlı tedavi güvencesi." },
  { id: "dask-sorgulama",              icon: ShieldCheck, title: "DASK",                 desc: "Zorunlu deprem sigortanızı saniyeler içinde kolayca güncelleyin." },
  { id: "is-yeri-sigortasi",           icon: Briefcase,   title: "İş Yeri Sigortaları",  desc: "İşletmenizi tüm finansal ve fiziksel risklere karşı izole edin." },
  { id: "sorumluluk-sigortasi",        icon: FileText,    title: "Sorumluluk Sigortası", desc: "3. şahıslara verilebilecek zararlara karşı tam hukuki teminat." },
  { id: "seyahat-sigortasi",           icon: Plane,       title: "Seyahat Sigortası",    desc: "Yurt içi/dışı tüm vizelerde geçerli sağlık ve bagaj güvencesi." },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

export default function InsuranceCards() {
  return (
    <motion.div
      className="ins-grid"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {categories.map(({ id, icon: Icon, title, desc }, idx) => (
        <motion.div key={id} variants={item}>
          <Link href={`/urunlerimiz/${id}`} className="ins-row">
            <span className="ins-num">{String(idx + 1).padStart(2, "0")}</span>
            <span className="ins-icon"><Icon size={20} strokeWidth={1.5} /></span>
            <div className="ins-text">
              <h3 className="ins-title">{title}</h3>
              <p className="ins-desc">{desc}</p>
            </div>
            <span className="ins-arrow">
              <ArrowUpRight size={20} strokeWidth={1.5} />
            </span>
          </Link>
        </motion.div>
      ))}

      <style jsx>{`
        .ins-grid {
          display: flex;
          flex-direction: column;
          border-top: 1px solid var(--hairline);
        }
        .ins-row {
          display: grid;
          grid-template-columns: 56px 56px 1fr auto;
          align-items: center;
          gap: 24px;
          padding: clamp(20px, 3vw, 32px) clamp(8px, 2vw, 16px);
          border-bottom: 1px solid var(--hairline);
          text-decoration: none;
          color: inherit;
          transition: background 0.4s ease, padding 0.4s ease;
          position: relative;
        }
        .ins-row::before {
          content: "";
          position: absolute;
          inset: 0;
          background: var(--cream);
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }
        .ins-row:hover::before { opacity: 0.5; }
        .ins-row:hover { padding-left: clamp(20px, 3vw, 32px); padding-right: clamp(20px, 3vw, 32px); }
        .ins-row > * { position: relative; z-index: 1; }

        .ins-num {
          font-family: var(--font-serif);
          font-weight: 300;
          font-size: 1rem;
          color: var(--gold-dark);
          letter-spacing: 0.05em;
          font-feature-settings: "tnum" 1, "lnum" 1;
        }
        .ins-icon {
          width: 44px; height: 44px;
          border-radius: 50%;
          background: var(--white);
          border: 1px solid var(--hairline);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--ink);
          transition: background 0.3s ease, color 0.3s ease;
        }
        .ins-row:hover .ins-icon { background: var(--ink); color: var(--gold-light); }

        .ins-title {
          font-family: var(--font-serif);
          font-size: clamp(1.25rem, 2.4vw, 1.75rem);
          font-weight: 400;
          color: var(--ink);
          letter-spacing: -0.02em;
          line-height: 1.15;
          margin: 0 0 4px;
        }
        .ins-desc {
          font-family: var(--font-sans);
          font-size: 0.92rem;
          color: var(--muted);
          line-height: 1.55;
          margin: 0;
          max-width: 540px;
        }
        .ins-arrow {
          color: var(--muted);
          transition: transform 0.3s ease, color 0.3s ease;
          display: inline-flex;
        }
        .ins-row:hover .ins-arrow { color: var(--gold-dark); transform: translate(4px, -4px); }

        @media (max-width: 640px) {
          .ins-row { grid-template-columns: 32px 1fr auto; gap: 16px; padding: 22px 8px; }
          .ins-icon { display: none; }
          .ins-row:hover { padding-left: 14px; padding-right: 14px; }
        }
      `}</style>
    </motion.div>
  );
}
