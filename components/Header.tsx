"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const navLeft = [
  { name: "Ürünler", href: "/urunlerimiz" },
  { name: "Hakkımızda", href: "/hakkimizda" },
];

const navRight = [
  { name: "Blog", href: "/blog" },
  { name: "SSS", href: "/sss" },
  { name: "İletişim", href: "/iletisim" },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Prevent scroll when mobile menu is open
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
        <div className="container" style={{ display: "flex", alignItems: "center", height: "100%", position: "relative" }}>

          {/* LEFT NAV (Desktop) */}
          <nav className="desktop-nav" style={{ flex: 1, display: "none" }} id="nav-left">
            {navLeft.map(link => (
              <Link key={link.href} href={link.href} className={`nav-link ${isActive(link.href) ? "active" : ""}`}>
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CENTER LOGO */}
          <div style={{ flex: 1, display: "flex", justifyContent: "flex-start", alignItems: "center", zIndex: 100 }} className="logo-container">
            <Link href="/" style={{ display: "flex", flexDirection: "row", alignItems: "center", textDecoration: "none", gap: 8 }} className="logo-link">
              <motion.img
                src="/logo-dark.png"
                alt="Alıcılar Sigorta"
                className="header-logo-img"
                style={{ width: 64, height: 64, objectFit: "contain" }}
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </Link>
          </div>

          {/* RIGHT NAV (Desktop) */}
          <nav className="desktop-nav" style={{ flex: 1, justifyContent: "flex-end", display: "none" }} id="nav-right">
            {navRight.map(link => (
              <Link key={link.href} href={link.href} className={`nav-link ${isActive(link.href) ? "active" : ""}`}>
                {link.name}
              </Link>
            ))}
            <div style={{ marginLeft: "1.5rem" }}>
              <ThemeToggle />
            </div>
            <Link href="/teklif-al" className="btn btn-gold" style={{ padding: "0.7rem 1.8rem", fontSize: "0.95rem", borderRadius: "100px", marginLeft: "1.5rem" }}>
              Teklif Al
            </Link>
          </nav>

          {/* MOBILE TOGGLE */}
          <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "0.5rem", zIndex: 100 }} className="mobile-toggle">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={menuOpen}
              style={{ background: menuOpen ? "var(--cream)" : "transparent", border: "1px solid var(--border)", borderRadius: "50%", width: 44, height: 44, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s", flexShrink: 0 }}
            >
              {menuOpen ? <X size={22} color="var(--gold-dark)" /> : <Menu size={22} color="var(--dark)" />}
            </button>
          </div>

          <style dangerouslySetInnerHTML={{__html: `
            @media(min-width: 1024px) {
              #nav-left, #nav-right { display: flex !important; }
              .logo-container { flex: 0 0 auto !important; position: absolute; left: 50%; transform: translateX(-50%); }
              .logo-link { margin: 0 !important; flex-direction: column !important; gap: 0 !important; }
              .header-logo-img { width: 80px !important; height: 80px !important; }
              .mobile-toggle { display: none !important; }
            }
            @media (max-width: 480px) {
              .header-logo-img { width: 56px !important; height: 56px !important; }
            }
          `}} />

        </div>
      </header>

      {/* STUNNING MOBILE FULLSCREEN MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)", transition: { duration: 0.3 } }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
              background: "rgba(255,255,255,0.97)", zIndex: 99,
              display: "flex", flexDirection: "column",
              padding: "calc(var(--header-h) + 1rem) 1.5rem calc(env(safe-area-inset-bottom, 0px) + 1.5rem) 1.5rem",
              overflowY: "auto",
              WebkitOverflowScrolling: "touch"
            }}
          >
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "4px", marginTop: "0.5rem" }}>
              {[...navLeft, ...navRight].map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                  transition={{ delay: i * 0.06, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link href={link.href} style={{
                    display: "block", fontSize: "clamp(1.8rem, 7vw, 2.5rem)", fontWeight: 900,
                    color: isActive(link.href) ? "var(--gold)" : "var(--black)",
                    padding: "12px 0", textDecoration: "none",
                    letterSpacing: "-0.03em", lineHeight: 1.1
                  }}>
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.45 }}
              style={{ paddingBottom: "1rem", marginTop: "1.5rem" }}
            >
              <Link href="/teklif-al" className="btn btn-gold" style={{ width: "100%", justifyContent: "center", fontSize: "1.05rem", padding: "1rem", borderRadius: "16px", boxShadow: "0 20px 40px var(--gold-glow)" }}>
                Hemen Ücretsiz Teklif Al
              </Link>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginTop: "0.75rem" }}>
                <a href="tel:+908501234567" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", background: "var(--cream)", padding: "0.9rem", borderRadius: "14px", textDecoration: "none", color: "var(--dark)", fontWeight: 700, fontSize: "0.95rem", minHeight: 48 }}>
                  <Phone size={18} color="var(--gold-dark)" />
                  Ara
                </a>
                <a href="https://wa.me/908501234567" target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", background: "#e8f7ea", padding: "0.9rem", borderRadius: "14px", textDecoration: "none", color: "#10b981", fontWeight: 700, fontSize: "0.95rem", minHeight: 48 }}>
                  <MessageCircle size={18} color="#10b981" />
                  WhatsApp
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
