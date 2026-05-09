import { Newspaper } from "lucide-react";

export const metadata = { title: "Basında Biz | Alıcılar Sigorta" };

const items = [
  { title: "Alıcılar Sigorta Sektöre Dijital Bir Nefes Getiriyor", source: "Ekonomi Haberleri", date: "15 Ekim 2025" },
  { title: "20'den Fazla Acentelik ile Rekor Büyüme", source: "Finans Gündemi", date: "02 Eylül 2025" },
  { title: "Yılın Müşteri Odaklı Sigorta Platformu Ödülü", source: "Tech & Insurtech", date: "18 Haziran 2025" },
];

export default function BasindaBizPage() {
  return (
    <div className="legal-page">
      <div className="container" style={{ maxWidth: 880 }}>
        <h1>Basında <span className="gold">biz</span></h1>

        <div className="press-list">
          {items.map((item, i) => (
            <article key={i} className="press-row">
              <span className="press-row__num">{String(i + 1).padStart(2, "0")}</span>
              <div className="press-row__icon"><Newspaper size={20} strokeWidth={1.5} /></div>
              <div className="press-row__body">
                <span className="press-row__meta">{item.date} · {item.source}</span>
                <h3 className="press-row__title">{item.title}</h3>
                <p className="press-row__sum">
                  Sektör yeniliklerimiz ve dijital dönüşüm adımlarımız medya kuruluşlarında büyük ilgi görmeye devam ediyor.
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
      <style>{`
        .press-list {
          margin-top: clamp(28px, 4vw, 48px);
          border-top: 1px solid var(--hairline);
        }
        .press-row {
          display: grid;
          grid-template-columns: 40px 44px 1fr;
          gap: 18px;
          align-items: flex-start;
          padding: clamp(20px, 3vw, 32px) 0;
          border-bottom: 1px solid var(--hairline);
        }
        .press-row__num {
          font-family: var(--font-serif);
          font-size: 1rem;
          color: var(--gold-dark);
          font-feature-settings: "tnum" 1, "lnum" 1;
          padding-top: 14px;
        }
        .press-row__icon {
          width: 44px; height: 44px;
          border-radius: 50%;
          border: 1px solid var(--hairline);
          background: var(--white);
          color: var(--gold-dark);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 8px;
        }
        .press-row__meta {
          font-family: var(--font-sans);
          font-size: 0.78rem;
          color: var(--muted);
          letter-spacing: 0.05em;
          text-transform: uppercase;
          font-weight: 500;
        }
        .press-row__title {
          font-family: var(--font-serif);
          font-size: clamp(1.15rem, 2.4vw, 1.5rem);
          font-weight: 400;
          letter-spacing: -0.015em;
          line-height: 1.25;
          color: var(--ink);
          margin: 8px 0 8px;
        }
        .press-row__sum {
          font-family: var(--font-sans);
          font-size: 0.95rem;
          color: var(--muted);
          line-height: 1.6;
          margin: 0;
          max-width: 600px;
        }
        @media (max-width: 640px) {
          .press-row { grid-template-columns: 32px 1fr; }
          .press-row__icon { display: none; }
        }
      `}</style>
    </div>
  );
}
