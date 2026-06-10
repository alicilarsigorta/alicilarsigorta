"use client";

import { Phone, Mail, Instagram, Facebook, Twitter, MapPin, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function TopBar() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div style={{ background: "var(--black)", color: "rgba(255,255,255,0.8)", fontSize: "0.85rem", padding: "10px 0", zIndex: 1001, position: "relative" }}>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>

        {/* Left: Contact Info */}
        <div style={{ display: "flex", gap: "20px", alignItems: "center", minWidth: 0, flex: "1 1 auto" }}>
          <a href="tel:+905421127878" style={{ display: "flex", alignItems: "center", gap: "8px", color: "inherit", textDecoration: "none", transition: "color 0.2s", whiteSpace: "nowrap" }} onMouseEnter={e => e.currentTarget.style.color = "var(--gold)"} onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.8)"}>
            <Phone size={15} color="var(--gold)" />
            <span style={{ fontWeight: 600 }}>0542 112 78 78</span>
          </a>
          <a href="mailto:info@alicilarsigorta.com" style={{ display: "flex", alignItems: "center", gap: "8px", color: "inherit", textDecoration: "none", transition: "color 0.2s", minWidth: 0 }} className="hide-mobile" onMouseEnter={e => e.currentTarget.style.color = "var(--gold)"} onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.8)"}>
            <Mail size={15} color="var(--gold)" />
            <span style={{ fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>info@alicilarsigorta.com</span>
          </a>
        </div>

        {/* Right: Social & Navigation */}
        <div style={{ display: "flex", gap: "20px", alignItems: "center", flexShrink: 0 }}>
          <div style={{ display: "flex", gap: "16px", alignItems: "center", borderRight: "1px solid rgba(255,255,255,0.15)", paddingRight: "20px" }} className="hide-mobile">
            <Link href="#" aria-label="Instagram" style={{ color: "inherit", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "var(--gold)"} onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.8)"}><Instagram size={15} /></Link>
            <Link href="#" aria-label="Facebook" style={{ color: "inherit", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "var(--gold)"} onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.8)"}><Facebook size={15} /></Link>
            <Link href="#" aria-label="Twitter" style={{ color: "inherit", transition: "color 0.2s" }} onMouseEnter={e => e.currentTarget.style.color = "var(--gold)"} onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.8)"}><Twitter size={15} /></Link>
          </div>
          <Link href="/iletisim" className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: "8px", color: "white", textDecoration: "none", fontWeight: 700, transition: "color 0.2s", paddingRight: "20px", borderRight: "1px solid rgba(255,255,255,0.15)" }} onMouseEnter={e => e.currentTarget.style.color = "var(--gold)"} onMouseLeave={e => e.currentTarget.style.color = "white"}>
            <MapPin size={15} color="var(--gold)" />
            Acentelerimiz
          </Link>
          
          {mounted && (
            <button 
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              style={{ background: "transparent", border: "none", color: "white", cursor: "pointer", display: "flex", alignItems: "center", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "var(--gold)"} 
              onMouseLeave={e => e.currentTarget.style.color = "white"}
              aria-label="Toggle Dark Mode"
            >
              {resolvedTheme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          )}
        </div>
        
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
        }
        @media (max-width: 480px) {
          .topbar-phone-text { display: none; }
        }
      `}} />
    </div>
  );
}
