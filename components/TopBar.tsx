"use client";

import { Phone, Mail, Instagram, Facebook, Twitter, MapPin, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function TopBar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  return (
    <div className="topbar">
      <div className="container topbar__inner">
        <div className="topbar__left">
          <a href="tel:+908501234567" className="topbar__link">
            <Phone size={13} strokeWidth={1.75} />
            <span>0850 123 45 67</span>
          </a>
          <a href="mailto:bilgi@alicilarsigorta.com.tr" className="topbar__link topbar__hide-sm">
            <Mail size={13} strokeWidth={1.75} />
            <span className="topbar__ellipsis">bilgi@alicilarsigorta.com.tr</span>
          </a>
        </div>

        <div className="topbar__right">
          <div className="topbar__socials topbar__hide-sm">
            <Link href="#" aria-label="Instagram" className="topbar__icon"><Instagram size={13} strokeWidth={1.75} /></Link>
            <Link href="#" aria-label="Facebook" className="topbar__icon"><Facebook size={13} strokeWidth={1.75} /></Link>
            <Link href="#" aria-label="Twitter" className="topbar__icon"><Twitter size={13} strokeWidth={1.75} /></Link>
          </div>
          <Link href="/iletisim" className="topbar__link topbar__hide-sm">
            <MapPin size={13} strokeWidth={1.75} />
            Acentelerimiz
          </Link>
          {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="topbar__icon"
              aria-label="Tema değiştir"
            >
              {resolvedTheme === "dark" ? <Sun size={14} strokeWidth={1.75} /> : <Moon size={14} strokeWidth={1.75} />}
            </button>
          )}
        </div>
      </div>

      <style jsx>{`
        .topbar {
          background: var(--ink);
          color: rgba(255,255,255,0.72);
          font-size: 0.78rem;
          padding: 9px 0;
          z-index: 1001;
          position: relative;
          letter-spacing: 0.005em;
        }
        .topbar__inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
        }
        .topbar__left { display: flex; gap: 22px; align-items: center; min-width: 0; flex: 1 1 auto; }
        .topbar__right { display: flex; gap: 18px; align-items: center; flex-shrink: 0; }
        .topbar__link {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          color: inherit;
          text-decoration: none;
          transition: color 0.2s ease;
          font-weight: 500;
          min-width: 0;
        }
        .topbar__link:hover { color: var(--gold-light); }
        .topbar__ellipsis { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
        .topbar__socials { display: flex; gap: 14px; align-items: center; padding-right: 16px; border-right: 1px solid rgba(255,255,255,0.12); }
        .topbar__icon {
          color: rgba(255,255,255,0.72);
          background: transparent;
          border: 0;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          transition: color 0.2s ease;
          padding: 4px;
        }
        .topbar__icon:hover { color: var(--gold-light); }

        @media (max-width: 768px) {
          .topbar__hide-sm { display: none !important; }
        }
      `}</style>
    </div>
  );
}
