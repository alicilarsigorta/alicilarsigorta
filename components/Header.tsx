"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageCircle, ArrowRight, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const nav = [
  { name: "Ürünler", href: "/urunlerimiz" },
  { name: "Hakkımızda", href: "/hakkimizda" },
  { name: "Blog", href: "/blog" },
  { name: "SSS", href: "/sss" },
  { name: "İletişim", href: "/iletisim" },
];

/**
 * Header — fintech glass single-layer.
 * Logo left, center nav, right user + mint CTA. Backdrop-blur, dark navy.
 * Mobile: glass full-screen menu sheet.
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
        <div className="container header-inner">
          {/* LEFT — Logo wordmark */}
          <Link href="/" className="header-brand">
            <span className="header-brand-mark" aria-hidden>
              <span className="header-brand-dot" />
            </span>
            <span className="header-brand-name">
              alıcılar<span className="header-brand-name-accent">.</span>sigorta
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

          {/* RIGHT — Theme + CTA */}
          <div className="header-actions">
            <ThemeToggle />

            <Link href="/admin/login" className="header-user" aria-label="Giriş">
              <User size={17} strokeWidth={1.8} />
            </Link>

            <Link href="/teklif-al" className="btn btn-gold header-cta">
              Teklif Al
              <ArrowRight size={15} strokeWidth={2.3} />
            </Link>
          </div>

          {/* MOBILE TOGGLE */}
          <div className="mobile-toggle">
            <ThemeToggle />
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
            font-family: var(--font-sans);
            font-weight: 600;
            font-size: 1.05rem;
            color: var(--text-primary);
            letter-spacing: -0.02em;
            transition: opacity 0.2s ease;
          }
          .header-brand:hover { opacity: 0.85; }
          .header-brand-mark {
            position: relative;
            width: 30px;
            height: 30px;
            border-radius: 9px;
            background: linear-gradient(135deg, var(--mint) 0%, var(--violet) 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 6px 20px var(--mint-glow);
          }
          .header-brand-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: var(--navy-deep);
          }
          .header-brand-name {
            font-family: var(--font-sans);
            font-weight: 700;
            letter-spacing: -0.02em;
          }
          .header-brand-name-accent { color: var(--mint); }

          .header-nav {
            flex: 1;
            justify-content: center;
            gap: 2rem;
          }

          .header-actions {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .header-user {
            width: 38px;
            height: 38px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--glass-bg);
            border: 1px solid var(--glass-border);
            color: var(--text-secondary);
            text-decoration: none;
            transition: all 0.25s ease;
          }
          .header-user:hover {
            color: var(--mint);
            border-color: var(--mint);
            background: var(--mint-soft);
          }
          .header-cta {
            padding: 0.65rem 1.3rem !important;
            font-size: 0.88rem !important;
            min-height: 38px;
            font-weight: 600 !important;
          }

          .header-mobile-btn {
            width: 38px;
            height: 38px;
            border-radius: 50%;
            background: var(--glass-bg-strong);
            border: 1px solid var(--glass-border);
            color: var(--text-primary);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }

          @media (max-width: 1024px) {
            .header-actions { display: none; }
            .header-nav { display: none !important; }
          }
          @media (max-width: 480px) {
            .header-brand-name { font-size: 0.95rem; }
            .header-brand-mark { width: 26px; height: 26px; border-radius: 7px; }
            .header-brand-dot { width: 6px; height: 6px; }
          }
        ` }} />
      </header>

      {/* MOBILE GLASS MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.3 } }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "fixed",
              top: 0, left: 0, right: 0, bottom: 0,
              background: "rgba(6, 11, 28, 0.85)",
              backdropFilter: "blur(28px) saturate(160%)",
              WebkitBackdropFilter: "blur(28px) saturate(160%)",
              zIndex: 99,
              display: "flex",
              flexDirection: "column",
              padding: "calc(var(--header-h) + 1rem) 1.5rem calc(env(safe-area-inset-bottom, 0px) + 1.5rem) 1.5rem",
              overflowY: "auto",
              WebkitOverflowScrolling: "touch",
            }}
          >
            <div style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "4px",
              marginTop: "0.5rem",
            }}>
              {nav.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                  transition={{ delay: i * 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    style={{
                      display: "block",
                      fontSize: "clamp(1.8rem, 7vw, 2.6rem)",
                      fontWeight: 600,
                      color: isActive(link.href) ? "var(--mint)" : "var(--text-primary)",
                      padding: "10px 0",
                      textDecoration: "none",
                      letterSpacing: "-0.03em",
                      lineHeight: 1.1,
                    }}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
              style={{ paddingBottom: "1rem", marginTop: "1.5rem" }}
            >
              <Link
                href="/teklif-al"
                className="btn btn-gold"
                style={{
                  width: "100%",
                  justifyContent: "center",
                  fontSize: "1rem",
                  padding: "1rem",
                  borderRadius: "14px",
                }}
              >
                Hemen Ücretsiz Teklif Al
                <ArrowRight size={18} strokeWidth={2.3} />
              </Link>

              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.75rem",
                marginTop: "0.75rem",
              }}>
                <a
                  href="tel:+908501234567"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    background: "var(--glass-bg-strong)",
                    border: "1px solid var(--glass-border)",
                    padding: "0.9rem",
                    borderRadius: "12px",
                    textDecoration: "none",
                    color: "var(--text-primary)",
                    fontWeight: 600,
                    fontSize: "0.92rem",
                    minHeight: 46,
                  }}
                >
                  <Phone size={16} color="var(--mint)" />
                  Ara
                </a>
                <a
                  href="https://wa.me/908501234567"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    background: "rgba(0, 212, 168, 0.10)",
                    border: "1px solid var(--mint)",
                    padding: "0.9rem",
                    borderRadius: "12px",
                    textDecoration: "none",
                    color: "var(--mint)",
                    fontWeight: 600,
                    fontSize: "0.92rem",
                    minHeight: 46,
                  }}
                >
                  <MessageCircle size={16} color="var(--mint)" />
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
