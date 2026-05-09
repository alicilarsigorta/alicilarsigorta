"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageCircle, ArrowUpRight } from "lucide-react";
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
        <div className="container header__inner">

          <nav className="header__nav header__nav--left desktop-nav">
            {navLeft.map(link => (
              <Link key={link.href} href={link.href} className={`nav-link ${isActive(link.href) ? "active" : ""}`}>
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="header__logo-wrap">
            <Link href="/" className="header__logo">
              <img src="/logo.png" alt="Alıcılar Sigorta" className="header__logo-img" />
              <span className="header__logo-text">Alıcılar Sigorta</span>
            </Link>
          </div>

          <nav className="header__nav header__nav--right desktop-nav">
            {navRight.map(link => (
              <Link key={link.href} href={link.href} className={`nav-link ${isActive(link.href) ? "active" : ""}`}>
                {link.name}
              </Link>
            ))}
            <span className="header__divider" />
            <ThemeToggle />
            <Link href="/teklif-al" className="header__cta">
              Teklif Al
              <ArrowUpRight size={14} strokeWidth={1.75} />
            </Link>
          </nav>

          <div className="mobile-toggle">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={menuOpen}
              className="header__menu-btn"
            >
              {menuOpen ? <X size={20} strokeWidth={1.75} /> : <Menu size={20} strokeWidth={1.75} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25 } }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="mobile-menu"
          >
            <div className="mobile-menu__nav">
              {[...navLeft, ...navRight].map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                  transition={{ delay: i * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link href={link.href} className={`mobile-menu__link ${isActive(link.href) ? "is-active" : ""}`}>
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
              className="mobile-menu__footer"
            >
              <Link href="/teklif-al" className="btn btn-gold mobile-menu__cta">
                Ücretsiz Teklif Al
                <ArrowUpRight size={16} strokeWidth={1.75} />
              </Link>
              <div className="mobile-menu__contact">
                <a href="tel:+908501234567"><Phone size={16} strokeWidth={1.75} />Ara</a>
                <a href="https://wa.me/908501234567" target="_blank" rel="noreferrer"><MessageCircle size={16} strokeWidth={1.75} />WhatsApp</a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .header__inner {
          display: flex;
          align-items: center;
          height: 100%;
          position: relative;
        }
        .header__nav {
          flex: 1;
          display: none;
          gap: 28px;
          align-items: center;
        }
        .header__nav--left { justify-content: flex-start; }
        .header__nav--right { justify-content: flex-end; }
        .header__logo-wrap {
          flex: 1;
          display: flex;
          align-items: center;
          z-index: 100;
        }
        .header__logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }
        .header__logo-img { width: 38px; height: 38px; object-fit: contain; }
        .header__logo-text {
          font-family: var(--font-serif);
          font-size: 1rem;
          font-weight: 400;
          color: var(--ink);
          letter-spacing: -0.01em;
          white-space: nowrap;
        }
        .header__divider {
          width: 1px;
          height: 18px;
          background: var(--hairline);
          margin: 0 8px;
        }
        .header__cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: var(--ink);
          color: var(--white);
          padding: 0.6rem 1.1rem;
          border-radius: 999px;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 500;
          text-decoration: none;
          transition: background 0.25s ease, transform 0.25s ease;
        }
        .header__cta:hover { background: var(--gold-dark); transform: translateY(-1px); }
        .mobile-toggle {
          flex: 1;
          display: none;
          justify-content: flex-end;
          align-items: center;
          gap: 8px;
          z-index: 100;
        }
        .header__menu-btn {
          background: transparent;
          border: 1px solid var(--hairline);
          border-radius: 50%;
          width: 40px;
          height: 40px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--ink);
          transition: background 0.25s ease, border-color 0.25s ease;
        }
        .header__menu-btn:hover { background: var(--cream); border-color: var(--ink); }

        @media (min-width: 1024px) {
          .header__nav { display: flex !important; }
          .header__logo-wrap { flex: 0 0 auto; position: absolute; left: 50%; transform: translateX(-50%); }
          .header__logo { flex-direction: column; gap: 2px; }
          .header__logo-img { width: 52px; height: 52px; }
          .header__logo-text { font-size: 0.62rem; letter-spacing: 0.22em; text-transform: uppercase; color: var(--gold-dark); font-family: var(--font-sans); font-weight: 600; }
        }
        @media (max-width: 1024px) {
          .mobile-toggle { display: flex; }
        }
        @media (max-width: 480px) {
          .header__logo-text { font-size: 0.92rem; }
          .header__logo-img { width: 34px; height: 34px; }
        }

        .mobile-menu {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: var(--white);
          z-index: 99;
          display: flex;
          flex-direction: column;
          padding: calc(var(--header-h) + 1.25rem) 1.5rem calc(env(safe-area-inset-bottom, 0px) + 1.5rem);
          overflow-y: auto;
        }
        .mobile-menu__nav {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 4px;
          padding-top: 1rem;
          border-top: 1px solid var(--hairline);
          padding-block: 24px;
        }
        .mobile-menu__link {
          display: block;
          font-family: var(--font-serif);
          font-size: clamp(2rem, 8vw, 3rem);
          font-weight: 400;
          color: var(--ink);
          padding: 14px 0;
          text-decoration: none;
          letter-spacing: -0.025em;
          line-height: 1.1;
          border-bottom: 1px solid var(--hairline);
        }
        .mobile-menu__link.is-active { font-style: italic; color: var(--gold-dark); }
        .mobile-menu__footer { padding-top: 1.5rem; }
        .mobile-menu__cta { width: 100% !important; justify-content: center; padding: 1.05rem !important; }
        .mobile-menu__contact {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-top: 12px;
        }
        .mobile-menu__contact a {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: var(--cream);
          padding: 0.95rem;
          border-radius: var(--radius-md);
          text-decoration: none;
          color: var(--ink);
          font-weight: 500;
          font-size: 0.95rem;
          min-height: 48px;
          border: 1px solid var(--hairline);
        }
      `}</style>
    </>
  );
}
