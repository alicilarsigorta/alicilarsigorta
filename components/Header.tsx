"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageCircle, ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { name: "Ürünlerimiz", href: "/urunlerimiz" },
  { name: "Kampanyalar", href: "/blog" },
  { name: "Hakkımızda", href: "/hakkimizda" },
  { name: "SSS", href: "/sss" },
  { name: "İletişim", href: "/iletisim" },
];

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
          {/* LEFT — Logo */}
          <Link href="/" className="header-brand">
            <span className="header-brand-mark" aria-hidden>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L4 5.5V11C4 16 7.5 20.5 12 22C16.5 20.5 20 16 20 11V5.5L12 2Z" fill="#fff"/>
                <path d="M9.2 11.8L11.2 13.8L15 9.5" stroke="var(--orange)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <span className="header-brand-name">
              alıcılar<span className="header-brand-name-accent">sigorta</span>
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
            <a href="tel:+908501234567" className="header-phone">
              <span className="header-phone-icon"><Phone size={15} strokeWidth={2.2} /></span>
              <span className="header-phone-text">
                <span className="header-phone-label">Yardıma hazırız</span>
                <span className="header-phone-num">0850 123 45 67</span>
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
            gap: 9px;
            text-decoration: none;
            transition: opacity 0.2s ease;
          }
          .header-brand:hover { opacity: 0.85; }
          .header-brand-mark {
            width: 36px; height: 36px;
            border-radius: 10px;
            background: var(--orange);
            display: flex; align-items: center; justify-content: center;
            box-shadow: 0 5px 14px var(--orange-glow);
          }
          .header-brand-name {
            font-family: var(--font-sans);
            font-weight: 800;
            font-size: 1.18rem;
            color: var(--ink);
            letter-spacing: -0.03em;
          }
          .header-brand-name-accent { color: var(--orange); }

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

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              top: 0, left: 0, right: 0, bottom: 0,
              background: "rgba(255, 255, 255, 0.98)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              zIndex: 99,
              display: "flex",
              flexDirection: "column",
              padding: "calc(var(--header-h) + 1rem) 1.5rem calc(env(safe-area-inset-bottom, 0px) + 1.5rem) 1.5rem",
              overflowY: "auto",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "2px", marginTop: "0.5rem" }}>
              {nav.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8, transition: { duration: 0.18 } }}
                  transition={{ delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "space-between",
                      fontSize: "clamp(1.5rem, 6vw, 2.1rem)",
                      fontWeight: 700,
                      color: isActive(link.href) ? "var(--blue)" : "var(--ink)",
                      padding: "14px 0",
                      textDecoration: "none",
                      letterSpacing: "-0.025em",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    {link.name}
                    <ChevronDown size={20} style={{ transform: "rotate(-90deg)", color: "var(--text-muted)" }} />
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.22, duration: 0.4 }}
              style={{ paddingBottom: "1rem", marginTop: "1.5rem" }}
            >
              <Link href="/teklif-al" className="btn btn-gold" style={{ width: "100%", justifyContent: "center", fontSize: "1rem", padding: "1rem", borderRadius: "14px" }}>
                Hemen Ücretsiz Teklif Al
                <ArrowRight size={18} strokeWidth={2.3} />
              </Link>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginTop: "0.75rem" }}>
                <a href="tel:+908501234567" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", background: "var(--blue-tint)", padding: "0.9rem", borderRadius: "12px", textDecoration: "none", color: "var(--blue)", fontWeight: 700, fontSize: "0.92rem", minHeight: 46 }}>
                  <Phone size={16} /> Ara
                </a>
                <a href="https://wa.me/908501234567" target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", background: "#e8f7ea", padding: "0.9rem", borderRadius: "12px", textDecoration: "none", color: "#16a34a", fontWeight: 700, fontSize: "0.92rem", minHeight: 46 }}>
                  <MessageCircle size={16} /> WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
