"use client";

import { motion, Variants } from "framer-motion";
import { ShieldCheck, HeartPulse, Home, Car, Navigation, Briefcase, FileText, Plane, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const categories = [
  { id: "trafik-sigortasi",           icon: Navigation, title: "Trafik Sigortaları",      desc: "Zorunlu trafik poliçenizi en iyi fiyata anında yenileyin.", color: "#f59e0b" },
  { id: "kasko",                       icon: Car,         title: "Kasko",                  desc: "Aracınızı kaza, çalınma ve hasara karşı tam kapsamlı koruyun.", color: "#3b82f6" },
  { id: "konut-sigortasi",             icon: Home,        title: "Konut Sigortaları",      desc: "Evinizi yangın, sel, hırsızlık ve doğal afetlere karşı güvenceye alın.", color: "#10b981" },
  { id: "saglik-sigortasi-fiyatlari",  icon: HeartPulse,  title: "Sağlık Sigortaları",    desc: "Özel hastanelerde fark ödemeden kapsamlı tedavi güvencesi.", color: "#ef4444" },
  { id: "dask-sorgulama",              icon: ShieldCheck, title: "DASK",                   desc: "Zorunlu deprem sigortanızı saniyeler içinde kolayca güncelleyin.", color: "#8b5cf6" },
  { id: "is-yeri-sigortasi",           icon: Briefcase,   title: "İş Yeri Sigortaları",   desc: "İşletmenizi tüm finansal ve fiziksel risklere karşı izole edin.", color: "#06b6d4" },
  { id: "sorumluluk-sigortasi",        icon: FileText,    title: "Sorumluluk Sigortası",   desc: "3. şahıslara verilebilecek zararlara karşı tam hukuki teminat.", color: "#f97316" },
  { id: "seyahat-sigortasi",           icon: Plane,       title: "Seyahat Sigortası",      desc: "Yurt içi/dışı tüm vizelerde geçerli sağlık ve bagaj güvencesi.", color: "#ec4899" },
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } }
};

const item: Variants = {
  hidden: { opacity: 0, y: 50, scale: 0.9, filter: "blur(8px)" },
  visible: { 
    opacity: 1, y: 0, scale: 1, filter: "blur(0px)", 
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } 
  }
};

export default function InsuranceCards() {
  return (
    <motion.div
      className="grid-4"
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {categories.map(({ id, icon: Icon, title, desc, color }, idx) => (
        <motion.div key={id} variants={item} style={{ height: "100%" }}>
          <Link href={`/urunlerimiz/${id}`} style={{ display: "block", height: "100%", textDecoration: "none" }}>
            <motion.div
              className="card"
              style={{ height: "100%", padding: "2.5rem 2rem", display: "flex", flexDirection: "column", gap: "1rem", cursor: "pointer" }}
              whileHover={{ y: -12, scale: 1.02, boxShadow: `0 30px 80px ${color}22, 0 0 0 1px ${color}44` }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <motion.div
                className="icon-box"
                whileHover={{ rotate: 10, scale: 1.15, background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <Icon size={32} />
              </motion.div>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 900, color: "var(--black)", letterSpacing: "-0.02em" }}>
                {title}
              </h3>
              <p style={{ fontSize: "0.95rem", color: "var(--gray)", lineHeight: 1.65, flex: 1, fontWeight: 500 }}>
                {desc}
              </p>
              <motion.div
                style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--gold-dark)", fontWeight: 800, fontSize: "0.9rem", letterSpacing: "0.5px" }}
                initial={{ x: 0 }}
                whileHover={{ x: 8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Detayları Gör
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowUpRight size={16} />
                </motion.span>
              </motion.div>
            </motion.div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}
