"use client";

import Link from "next/link";
import { Instagram, Linkedin, Twitter, Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { useContent } from "@/lib/content-context";

export default function Footer() {
  const { content } = useContent();
  const { contact } = content;

  return (
    <footer className="footer-editorial">
      <div className="container">

        {/* Top — large editorial CTA strip */}
        <div className="footer-editorial__top">
          <h3 className="footer-editorial__big">
            Güveniniz için{" "}
            <span className="gold">en doğru poliçe</span>{" "}
            burada başlar.
          </h3>
          <Link href="/teklif-al" className="footer-editorial__big-cta">
            Ücretsiz Teklif Al
            <ArrowUpRight size={18} strokeWidth={1.5} />
          </Link>
        </div>

        <hr className="footer-editorial__rule" />

        <div className="footer-editorial__cols">
          <div className="footer-editorial__brand">
            <Link href="/" className="footer-editorial__logo">
              <img src="/logo.png" alt="" />
              <span>
                <strong>Alıcılar</strong>
                <em>Sigorta</em>
              </span>
            </Link>
            <p className="footer-editorial__tagline">
              Türkiye&apos;nin en güvenilir sigorta karşılaştırma platformu.
              20+ şirket, anında teklif, gerçek güvence.
            </p>
            <div className="footer-editorial__socials">
              <a href={contact.socialLinks.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram size={16} strokeWidth={1.5} /></a>
              <a href={contact.socialLinks.twitter} target="_blank" rel="noreferrer" aria-label="Twitter"><Twitter size={16} strokeWidth={1.5} /></a>
              <a href={contact.socialLinks.linkedin} target="_blank" rel="noreferrer" aria-label="Linkedin"><Linkedin size={16} strokeWidth={1.5} /></a>
            </div>
          </div>

          <div>
            <p className="footer-editorial__col-title">Ürünler</p>
            <Link href="/urunlerimiz/trafik-sigortasi">Trafik</Link>
            <Link href="/urunlerimiz/kasko">Kasko</Link>
            <Link href="/urunlerimiz/konut-sigortasi">Konut</Link>
            <Link href="/urunlerimiz/saglik-sigortasi-fiyatlari">Sağlık</Link>
            <Link href="/urunlerimiz/dask-sorgulama">DASK</Link>
            <Link href="/urunlerimiz/is-yeri-sigortasi">İş Yeri</Link>
            <Link href="/urunlerimiz/sorumluluk-sigortasi">Sorumluluk</Link>
            <Link href="/urunlerimiz/seyahat-sigortasi">Seyahat</Link>
          </div>

          <div>
            <p className="footer-editorial__col-title">Kurumsal</p>
            <Link href="/hakkimizda">Hakkımızda</Link>
            <Link href="/vizyon-misyon">Vizyon &amp; Misyon</Link>
            <Link href="/basinda-biz">Basında Biz</Link>
            <Link href="/insan-kaynaklari">İnsan Kaynakları</Link>
            <Link href="/sss">SSS</Link>
          </div>

          <div>
            <p className="footer-editorial__col-title">Yasal</p>
            <Link href="/kvkk">KVKK</Link>
            <Link href="/cerez-politikasi">Çerez Politikası</Link>
            <Link href="/kullanim-sartlari">Kullanım Şartları</Link>
          </div>

          <div className="footer-editorial__contact">
            <p className="footer-editorial__col-title">İletişim</p>
            <a href={`tel:${contact.phone}`}><Phone size={14} strokeWidth={1.5} />{contact.phone}</a>
            <a href={`mailto:${contact.email}`}><Mail size={14} strokeWidth={1.5} /><span>{contact.email}</span></a>
            <div className="footer-editorial__addr"><MapPin size={14} strokeWidth={1.5} /><span>{contact.address}</span></div>
          </div>
        </div>

        <hr className="footer-editorial__rule" />

        <div className="footer-editorial__bottom">
          <span>© {new Date().getFullYear()} Alıcılar Sigorta Aracılık Hizmetleri Ltd. Şti.</span>
          <span className="footer-editorial__license">SEGEM Lisanslı &amp; Güvenli</span>
        </div>
      </div>

      <style jsx>{`
        .footer-editorial {
          background: var(--white);
          color: var(--muted);
          border-top: 1px solid var(--hairline);
        }
        .footer-editorial :global(.container) {
          padding-top: clamp(56px, 8vw, 96px);
          padding-bottom: clamp(36px, 4vw, 48px);
        }

        .footer-editorial__top {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 32px;
          padding-bottom: clamp(48px, 6vw, 80px);
          flex-wrap: wrap;
        }
        .footer-editorial__big {
          font-family: var(--font-serif);
          font-weight: 400;
          font-size: clamp(2rem, 5vw, 3.75rem);
          line-height: 1.05;
          letter-spacing: -0.025em;
          color: var(--ink);
          margin: 0;
          max-width: 800px;
        }
        .footer-editorial__big :global(.gold) {
          font-style: italic;
          color: var(--gold-dark);
          font-weight: 300;
        }
        .footer-editorial__big-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--ink);
          font-family: var(--font-sans);
          font-weight: 500;
          font-size: 1rem;
          text-decoration: none;
          padding-bottom: 4px;
          border-bottom: 1px solid var(--ink);
          transition: gap 0.3s ease, opacity 0.2s ease;
          flex-shrink: 0;
        }
        .footer-editorial__big-cta:hover { gap: 14px; opacity: 0.7; }

        .footer-editorial__rule {
          height: 1px;
          background: var(--hairline);
          border: 0;
          margin: 0;
        }

        .footer-editorial__cols {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr 1.2fr;
          gap: 48px 32px;
          padding: clamp(48px, 6vw, 80px) 0;
        }
        .footer-editorial__col-title {
          font-family: var(--font-sans);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ink);
          margin-bottom: 18px;
        }
        .footer-editorial__cols :global(a) {
          display: block;
          color: var(--muted);
          font-family: var(--font-sans);
          font-size: 0.92rem;
          font-weight: 400;
          margin-bottom: 10px;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .footer-editorial__cols :global(a:hover) { color: var(--ink); }

        .footer-editorial__brand :global(a.footer-editorial__logo) {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 18px;
        }
        .footer-editorial__brand img { width: 40px; height: 40px; object-fit: contain; }
        .footer-editorial__brand strong {
          display: block;
          font-family: var(--font-serif);
          font-size: 1.1rem;
          font-weight: 500;
          color: var(--ink);
          letter-spacing: -0.01em;
        }
        .footer-editorial__brand em {
          display: block;
          font-style: normal;
          font-family: var(--font-sans);
          font-size: 0.62rem;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--gold-dark);
        }
        .footer-editorial__tagline {
          font-family: var(--font-sans);
          font-size: 0.92rem;
          line-height: 1.6;
          color: var(--muted);
          margin: 0 0 22px;
          max-width: 320px;
        }
        .footer-editorial__socials {
          display: flex;
          gap: 8px;
        }
        .footer-editorial__socials a {
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 1px solid var(--hairline);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--ink);
          transition: background 0.2s ease, color 0.2s ease;
        }
        .footer-editorial__socials a:hover { background: var(--ink); color: var(--gold-light); }

        .footer-editorial__contact :global(a),
        .footer-editorial__contact :global(.footer-editorial__addr) {
          display: flex !important;
          align-items: flex-start;
          gap: 8px;
          line-height: 1.55;
        }
        .footer-editorial__addr {
          color: var(--muted);
          font-family: var(--font-sans);
          font-size: 0.92rem;
          margin-bottom: 10px;
        }

        .footer-editorial__bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 12px;
          padding-top: 28px;
          font-family: var(--font-sans);
          font-size: 0.78rem;
          color: var(--muted);
        }
        .footer-editorial__license { color: var(--gold-dark); font-weight: 500; }

        @media (max-width: 1024px) {
          .footer-editorial__cols { grid-template-columns: 1fr 1fr 1fr; }
          .footer-editorial__brand { grid-column: 1 / -1; max-width: 480px; }
        }
        @media (max-width: 640px) {
          .footer-editorial__cols { grid-template-columns: 1fr 1fr; gap: 36px 20px; }
          .footer-editorial__brand { grid-column: 1 / -1; }
        }
        @media (max-width: 768px) {
          .footer-editorial :global(.container) { padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 90px); }
        }
      `}</style>
    </footer>
  );
}
