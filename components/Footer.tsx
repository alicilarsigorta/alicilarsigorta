"use client";

import Link from "next/link";
import { Instagram, Linkedin, Twitter, Phone, Mail, MapPin, Shield } from "lucide-react";
import { useContent } from "@/lib/content-context";

export default function Footer() {
  const { content } = useContent();
  const { contact } = content;

  return (
    <footer className="footer">
      <div className="container footer-container">

        {/* Top gold line */}
        <div className="gold-divider footer-top-divider" />

        <div className="footer-grid">

          {/* Brand */}
          <div className="footer-col-brand">
            <div className="footer-brand-lockup" style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
              <img src="/logo-emblem.png" alt="" style={{ height: 56, width: "auto", objectFit: "contain", filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.3))" }} />
              <div style={{ textAlign: "center" }}>
                <div style={{ color: "#fff", fontWeight: 800, fontSize: "1.22rem", letterSpacing: "0.04em" }}>ALICILAR</div>
                <div style={{ color: "var(--brand-gold-light)", fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.24em" }}>SİGORTA</div>
              </div>
            </div>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.8, marginBottom: 24 }}>
              Türkiye&apos;nin en güvenilir sigorta karşılaştırma platformu. 20+ şirket, anında teklif, gerçek güvence.
            </p>
            <div style={{ display: "flex", gap: 14 }}>
              {[
                { Icon: Instagram, link: contact.socialLinks.instagram },
                { Icon: Twitter, link: contact.socialLinks.twitter },
                { Icon: Linkedin, link: contact.socialLinks.linkedin },
              ].map(({ Icon, link }, i) => (
                <a key={i} href={link} target="_blank" rel="noreferrer" style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background 0.2s", textDecoration: "none" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "rgba(0, 137, 236,0.25)") }
                  onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.08)")}
                >
                  <Icon size={18} color="var(--orange)" />
                </a>
              ))}
            </div>
          </div>

          {/* Ürünler */}
          <div className="footer-col-2">
            <div className="footer-col-title">Ürünler</div>
            <Link href="/urunlerimiz/trafik-sigortasi" className="footer-link">Trafik Sigortası</Link>
            <Link href="/urunlerimiz/kasko" className="footer-link">Kasko</Link>
            <Link href="/urunlerimiz/konut-sigortasi" className="footer-link">Konut Sigortası</Link>
            <Link href="/urunlerimiz/saglik-sigortasi-fiyatlari" className="footer-link">Sağlık Sigortası</Link>
            <Link href="/urunlerimiz/dask-sorgulama" className="footer-link">DASK</Link>
            <Link href="/urunlerimiz/is-yeri-sigortasi" className="footer-link">İş Yeri Sigortası</Link>
            <Link href="/urunlerimiz/sorumluluk-sigortasi" className="footer-link">Sorumluluk Sigortası</Link>
            <Link href="/urunlerimiz/seyahat-sigortasi" className="footer-link">Seyahat Sigortası</Link>
          </div>

          {/* Kurumsal */}
          <div className="footer-col-2">
            <div className="footer-col-title">Kurumsal</div>
            <Link href="/hakkimizda" className="footer-link">Hakkımızda</Link>
            <Link href="/vizyon-misyon" className="footer-link">Vizyon & Misyon</Link>
            <Link href="/basinda-biz" className="footer-link">Basında Biz</Link>
            <Link href="/insan-kaynaklari" className="footer-link">İnsan Kaynakları</Link>
            <Link href="/sss" className="footer-link">Sıkça Sorulan Sorular</Link>
          </div>

          {/* Yasal */}
          <div className="footer-col-2">
            <div className="footer-col-title">Yasal</div>
            <Link href="/kvkk" className="footer-link">KVKK Metni</Link>
            <Link href="/cerez-politikasi" className="footer-link">Çerez Politikası</Link>
            <Link href="/kullanim-sartlari" className="footer-link">Kullanım Şartları</Link>
          </div>

          {/* İletişim */}
          <div className="footer-col-2">
            <div className="footer-col-title">İletişim</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <Phone size={16} color="var(--brand-gold-light)" style={{ marginTop: 2, flexShrink: 0 }} />
                <span style={{ fontSize: "0.95rem" }}>{contact.phone}</span>
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <Mail size={16} color="var(--brand-gold-light)" style={{ marginTop: 2, flexShrink: 0 }} />
                <span style={{ fontSize: "0.9rem" }}>{contact.email}</span>
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <MapPin size={16} color="var(--brand-gold-light)" style={{ marginTop: 2, flexShrink: 0 }} />
                <span style={{ fontSize: "0.9rem" }}>{contact.address}</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="gold-divider" style={{ margin: "40px 0 30px" }} />
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Alıcılar Sigorta Aracılık Hizmetleri Ltd. Şti. Tüm hakları saklıdır.</span>
          <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--brand-gold-light)" }}>
            <Shield size={16} />
            <span style={{ fontWeight: 700 }}>SEGEM Lisanslı & Güvenli</span>
          </div>
        </div>

      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .footer-container { padding-top: 80px; padding-bottom: 40px; }
        .footer-top-divider { margin-bottom: 60px; }
        .footer-bottom { display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; font-size: 0.85rem; }
        @media (max-width: 768px) {
          .footer-container { padding-top: 56px; padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 90px); }
          .footer-top-divider { margin-bottom: 36px; }
          .footer-bottom { font-size: 0.78rem; gap: 12px; }
        }
      `}} />
    </footer>
  );
}
