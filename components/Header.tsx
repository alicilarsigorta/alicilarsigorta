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
            <Link href="/" style={{ display: "flex", flexDirection: "column", alignItems: "center", textDecoration: "none", gap: 0, margin: "0 auto" }} className="logo-link">
              <motion.img
                src="/logo.png"
                alt="Alıcılar Sigorta"
                style={{ width: 56, height: 56, objectFit: "contain" }}
                whileHover={{ rotate: 10, scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <span style={{ fontSize: "0.65rem", fontWeight: 900, letterSpacing: "0.25em", color: "var(--gold-dark)", textTransform: "uppercase", marginTop: 2 }}>Alıcılar Sigorta</span>
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
          <div style={{ flex: 1, display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "1rem", zIndex: 100 }} className="mobile-toggle">
            <ThemeToggle />
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: menuOpen ? "var(--cream)" : "transparent", border: "1px solid var(--border)", borderRadius: "50%", width: 48, height: 48, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s" }}>
              {menuOpen ? <X size={24} color="var(--gold-dark)" /> : <Menu size={24} color="var(--dark)" />}
            </button>
          </div>
          
          <style dangerouslySetInnerHTML={{__html: `
            @media(min-width: 1024px) {
              #nav-left, #nav-right { display: flex !important; }
              .logo-container { flex: 0 0 auto !important; position: absolute; left: 50%; transform: translateX(-50%); }
              .logo-link { margin: 0 !important; }
              .mobile-toggle { display: none !important; }
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
              background: "rgba(255,255,255,0.95)", zIndex: 99, 
              display: "flex", flexDirection: "column",
              padding: "calc(var(--header-h) + 1rem) 2rem 2rem 2rem",
              overflowY: "auto"
            }}
          >
            <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "10px", marginTop: "1rem" }}>
              {[...navLeft, ...navRight].map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                  transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link href={link.href} style={{ 
                    display: "block", fontSize: "2.5rem", fontWeight: 900, 
                    color: isActive(link.href) ? "var(--gold)" : "var(--black)", 
                    padding: "10px 0", textDecoration: "none",
                    letterSpacing: "-0.03em"
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
              transition={{ delay: 0.4, duration: 0.5 }}
              style={{ paddingBottom: "2rem", marginTop: "2rem" }}
            >
              <Link href="/teklif-al" className="btn btn-gold" style={{ width: "100%", justifyContent: "center", fontSize: "1.2rem", padding: "1.2rem", borderRadius: "16px", boxShadow: "0 20px 40px var(--gold-glow)" }}>
                Hemen Ücretsiz Teklif Al
              </Link>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "1rem" }}>
                <a href="tel:08501234567" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", background: "var(--cream)", padding: "1rem", borderRadius: "16px", textDecoration: "none", color: "var(--dark)", fontWeight: 700 }}>
                  <Phone size={20} color="var(--gold-dark)" />
                  Ara Lütfen
                </a>
                <a href="https://wa.me/908501234567" target="_blank" rel="noreferrer" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", background: "#e8f7ea", padding: "1rem", borderRadius: "16px", textDecoration: "none", color: "#10b981", fontWeight: 700 }}>
                  <MessageCircle size={20} color="#10b981" />
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
