"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Menu, X, Phone, MessageCircle, ArrowRight, ArrowUpRight, Instagram, Twitter, Linkedin, MapPin } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { name: "Ürünlerimiz", href: "/urunlerimiz" },
  { name: "Kampanyalar", href: "/blog" },
  { name: "Hakkımızda", href: "/hakkimizda" },
  { name: "SSS", href: "/sss" },
  { name: "İletişim", href: "/iletisim" },
];

// Luxury mobile-menu motion
const overlayVariants: Variants = {
  hidden: { clipPath: "circle(0% at 92% 4%)", transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] } },
  visible: { clipPath: "circle(150% at 92% 4%)", transition: { duration: 0.66, ease: [0.76, 0, 0.24, 1] } },
};
const listVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.28 } },
  exit: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
};
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -12, filter: "blur(4px)", transition: { duration: 0.2 } },
};

/**
 * Header — sigortam.net-style light bar.
 * Orange logo left, center nav, right: phone + blue "Teklif Al".
 * White, soft, sticky, blur on scroll.
 */
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [menuOpen]);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <header className={`header ${scrolled ? "scrolled" : ""}`}>
        <div className="container header-inner">
          {/* LEFT — Logo (real ALC emblem + wordmark) */}
          <Link href="/" className="header-brand">
            <img src="/logo-emblem.png" alt="Alıcılar Sigorta" className="header-brand-logo" />
            <span className="header-brand-name">
              ALICILAR<span className="header-brand-name-accent">SİGORTA</span>
            </span>
          </Link>

          {/* CENTER — Nav */}
          <nav className="desktop-nav header-nav">
            {nav.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`nav-link ${isActive(link.href) ? "active" : ""}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* RIGHT — Phone + CTA */}
          <div className="header-actions">
            <a href="tel:+905421127878" className="header-phone">
              <span className="header-phone-icon"><Phone size={15} strokeWidth={2.2} /></span>
              <span className="header-phone-text">
                <span className="header-phone-label">Yardıma hazırız</span>
                <span className="header-phone-num">0542 112 78 78</span>
              </span>
            </a>

            <Link href="/teklif-al" className="btn btn-gold header-cta">
              Teklif Al
              <ArrowRight size={15} strokeWidth={2.4} />
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <div className="mobile-toggle">
            <Link href="/teklif-al" className="btn btn-gold header-cta-mobile">
              Teklif Al
            </Link>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={menuOpen}
              className="header-mobile-btn"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          .header-inner {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 100%;
            gap: 24px;
          }
          .header-brand {
            display: inline-flex;
            align-items: center;
            gap: 10px;
            text-decoration: none;
            transition: opacity 0.2s ease;
          }
          .header-brand:hover { opacity: 0.82; }
          .header-brand-logo {
            height: 48px;
            width: auto;
            object-fit: contain;
            flex-shrink: 0;
            filter: drop-shadow(0 2px 4px rgba(120, 80, 0, 0.16));
          }
          .header-brand-name {
            font-family: var(--font-sans);
            font-weight: 800;
            font-size: 1.16rem;
            color: var(--ink);
            letter-spacing: 0.04em;
            white-space: nowrap;
            line-height: 1;
          }
          .header-brand-name-accent {
            color: var(--brand-gold);
            font-weight: 700;
            margin-left: 6px;
          }
          @media (max-width: 380px) {
            .header-brand-name { display: none; }
          }

          .header-nav { flex: 1; justify-content: center; gap: 1.7rem; }

          .header-actions { display: flex; align-items: center; gap: 18px; }
          .header-phone {
            display: inline-flex; align-items: center; gap: 9px;
            text-decoration: none;
          }
          .header-phone-icon {
            width: 34px; height: 34px; border-radius: 50%;
            background: var(--blue-tint); color: var(--blue);
            display: flex; align-items: center; justify-content: center;
            flex-shrink: 0;
          }
          .header-phone-text { display: flex; flex-direction: column; line-height: 1.1; }
          .header-phone-label { font-size: 0.66rem; color: var(--text-muted); font-weight: 600; }
          .header-phone-num { font-size: 0.92rem; color: var(--ink); font-weight: 800; letter-spacing: -0.01em; }
          .header-cta {
            padding: 0.62rem 1.4rem !important;
            font-size: 0.92rem !important;
            min-height: 42px;
          }
          .header-cta-mobile {
            padding: 0.5rem 1.05rem !important;
            font-size: 0.85rem !important;
            min-height: 38px;
          }
          .header-mobile-btn {
            width: 40px; height: 40px; border-radius: 11px;
            background: var(--surface); border: 1px solid var(--border);
            color: var(--ink); display: flex; align-items: center; justify-content: center;
            cursor: pointer;
          }
          .mobile-toggle { gap: 10px; }

          @media (max-width: 1180px) {
            .header-phone-text { display: none; }
          }
          @media (max-width: 1024px) {
            .header-actions { display: none; }
            .header-nav { display: none !important; }
          }
          @media (max-width: 420px) {
            .header-brand-name { font-size: 1.05rem; }
            .header-brand-mark { width: 32px; height: 32px; }
          }
        ` }} />
      </header>

      {/* LUXURY MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="lux-menu"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="lux-menu"
          >
            {/* ambient gold glow + faint grid */}
            <div className="lux-glow" aria-hidden />
            <div className="lux-grid" aria-hidden />

            {/* Top bar */}
            <motion.div
              className="lux-top"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.32, duration: 0.4 } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              <Link href="/" className="lux-brand" onClick={() => setMenuOpen(false)}>
                <img src="/logo-emblem.png" alt="Alıcılar Sigorta" className="lux-brand-logo" />
                <span className="lux-brand-name">ALICILAR<span>SİGORTA</span></span>
              </Link>
              <motion.button
                onClick={() => setMenuOpen(false)}
                aria-label="Menüyü kapat"
                className="lux-close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1, transition: { delay: 0.36, duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
                whileHover={{ rotate: 90 }}
                whileTap={{ scale: 0.9 }}
              >
                <X size={22} strokeWidth={2} />
              </motion.button>
            </motion.div>

            {/* Nav list */}
            <motion.nav
              className="lux-nav"
              variants={listVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {nav.map((link, i) => (
                <motion.div key={link.href} variants={itemVariants} className="lux-link-row">
                  <Link
                    href={link.href}
                    className={`lux-link ${isActive(link.href) ? "active" : ""}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="lux-link-idx">0{i + 1}</span>
                    <span className="lux-link-name">{link.name}</span>
                    <span className="lux-link-arrow"><ArrowUpRight size={22} strokeWidth={2} /></span>
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            {/* Footer block */}
            <motion.div
              className="lux-foot"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.62, duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              <Link href="/teklif-al" className="lux-cta" onClick={() => setMenuOpen(false)}>
                Hemen Ücretsiz Teklif Al
                <ArrowRight size={18} strokeWidth={2.4} />
              </Link>

              <a href="tel:+905421127878" className="lux-phone">
                <span className="lux-phone-label">Yardıma hazırız · 7/24</span>
                <span className="lux-phone-num"><Phone size={16} strokeWidth={2.4} /> 0542 112 78 78</span>
              </a>

              <div className="lux-foot-row">
                <a href="https://wa.me/905421127878" target="_blank" rel="noreferrer" className="lux-wa">
                  <MessageCircle size={16} strokeWidth={2.2} /> WhatsApp
                </a>
                <div className="lux-social">
                  <a href="#" aria-label="Instagram"><Instagram size={17} /></a>
                  <a href="#" aria-label="Twitter"><Twitter size={17} /></a>
                  <a href="#" aria-label="LinkedIn"><Linkedin size={17} /></a>
                </div>
              </div>

              <div className="lux-addr"><MapPin size={13} /> Kurtuluş Mah. Atatürk Blv. No:73A, Merkez / Karabük</div>
            </motion.div>

            <style dangerouslySetInnerHTML={{ __html: `
              .lux-menu {
                position: fixed; inset: 0; z-index: 1001;
                background: radial-gradient(120% 90% at 92% 0%, #14213d 0%, #0b1428 42%, #060b18 100%);
                display: flex; flex-direction: column;
                padding: calc(env(safe-area-inset-top, 0px) + 20px) clamp(22px, 6vw, 40px) calc(env(safe-area-inset-bottom, 0px) + 26px);
                overflow-y: auto; -webkit-overflow-scrolling: touch;
                will-change: clip-path;
              }
              .lux-glow {
                position: absolute; top: -15%; right: -10%;
                width: 460px; height: 460px; border-radius: 50%;
                background: radial-gradient(circle, rgba(179,133,42,0.22) 0%, transparent 62%);
                filter: blur(40px); pointer-events: none;
              }
              .lux-grid {
                position: absolute; inset: 0; pointer-events: none;
                background-image: radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0);
                background-size: 30px 30px;
                mask-image: radial-gradient(ellipse at 80% 10%, #000 0%, transparent 75%);
                -webkit-mask-image: radial-gradient(ellipse at 80% 10%, #000 0%, transparent 75%);
              }

              .lux-top {
                position: relative; z-index: 2;
                display: flex; align-items: center; justify-content: space-between;
              }
              .lux-brand { display: inline-flex; align-items: center; gap: 10px; text-decoration: none; }
              .lux-brand-logo { height: 44px; width: auto; filter: drop-shadow(0 4px 10px rgba(0,0,0,0.4)); }
              .lux-brand-name { font-weight: 800; font-size: 1.05rem; letter-spacing: 0.04em; color: #fff; }
              .lux-brand-name span { color: var(--brand-gold-light); margin-left: 5px; font-weight: 700; }
              .lux-close {
                width: 46px; height: 46px; border-radius: 50%;
                background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.16);
                color: #fff; display: flex; align-items: center; justify-content: center;
                cursor: pointer;
              }
              .lux-close:hover { background: rgba(179,133,42,0.2); border-color: var(--brand-gold); }

              .lux-nav {
                position: relative; z-index: 2;
                flex: 1; display: flex; flex-direction: column; justify-content: center;
                gap: 2px; padding: 24px 0;
              }
              .lux-link-row { border-bottom: 1px solid rgba(255,255,255,0.08); }
              .lux-link {
                display: flex; align-items: center; gap: 16px;
                padding: clamp(13px, 2.4vh, 20px) 4px;
                text-decoration: none;
                transition: padding-left 0.35s cubic-bezier(0.16,1,0.3,1);
              }
              .lux-link:hover, .lux-link:active { padding-left: 14px; }
              .lux-link-idx {
                font-family: var(--font-mono, monospace);
                font-size: 0.8rem; font-weight: 700; letter-spacing: 0.04em;
                color: var(--brand-gold-light); width: 26px; flex-shrink: 0;
              }
              .lux-link-name {
                flex: 1;
                font-family: var(--font-sans);
                font-size: clamp(1.6rem, 7vw, 2.3rem);
                font-weight: 700; letter-spacing: -0.03em; line-height: 1.1;
                color: rgba(255,255,255,0.92);
                transition: color 0.25s ease;
              }
              .lux-link:hover .lux-link-name { color: #fff; }
              .lux-link.active .lux-link-name { color: var(--brand-gold-light); }
              .lux-link-arrow {
                color: var(--brand-gold-light); opacity: 0; transform: translate(-6px, 6px);
                transition: opacity 0.3s ease, transform 0.3s ease;
              }
              .lux-link:hover .lux-link-arrow, .lux-link.active .lux-link-arrow { opacity: 1; transform: translate(0,0); }

              .lux-foot { position: relative; z-index: 2; display: flex; flex-direction: column; gap: 14px; }
              .lux-cta {
                display: flex; align-items: center; justify-content: center; gap: 8px;
                width: 100%; min-height: 54px; border-radius: 14px;
                background: linear-gradient(135deg, var(--blue) 0%, var(--blue-light) 100%);
                color: #fff; font-weight: 800; font-size: 1rem; text-decoration: none;
                box-shadow: 0 14px 34px rgba(0,137,236,0.4);
              }
              .lux-phone {
                display: flex; flex-direction: column; align-items: center; gap: 3px;
                text-decoration: none; padding: 4px 0;
              }
              .lux-phone-label { font-size: 0.72rem; color: rgba(255,255,255,0.55); font-weight: 600; letter-spacing: 0.04em; }
              .lux-phone-num { display: inline-flex; align-items: center; gap: 8px; font-size: 1.2rem; font-weight: 800; color: #fff; letter-spacing: 0.01em; }
              .lux-phone-num svg { color: var(--brand-gold-light); }

              .lux-foot-row { display: flex; align-items: center; gap: 12px; }
              .lux-wa {
                flex: 1; display: inline-flex; align-items: center; justify-content: center; gap: 8px;
                min-height: 48px; border-radius: 12px;
                background: rgba(34,197,94,0.14); border: 1px solid rgba(34,197,94,0.4);
                color: #4ade80; font-weight: 700; font-size: 0.92rem; text-decoration: none;
              }
              .lux-social { display: flex; gap: 8px; }
              .lux-social a {
                width: 48px; height: 48px; border-radius: 12px;
                background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
                color: rgba(255,255,255,0.8);
                display: flex; align-items: center; justify-content: center;
                transition: all 0.25s ease;
              }
              .lux-social a:hover { background: rgba(179,133,42,0.2); border-color: var(--brand-gold); color: var(--brand-gold-light); }
              .lux-addr {
                display: inline-flex; align-items: center; gap: 6px; justify-content: center;
                font-size: 0.76rem; color: rgba(255,255,255,0.45); font-weight: 500; margin-top: 2px;
              }
              .lux-addr svg { color: var(--brand-gold-light); }
            ` }} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
