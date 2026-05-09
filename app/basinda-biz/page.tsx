import { Newspaper } from "lucide-react";

export const metadata = { title: "Basında Biz | Alıcılar Sigorta" };

export default function BasindaBizPage() {
  return (
    <div className="legal-page">
      <div className="container" style={{ maxWidth: '900px' }}>
        <h1>Basında <span className="gold">Biz</span></h1>

        <div style={{ display: 'grid', gap: '1.25rem' }}>
          {[
            { title: "Alıcılar Sigorta Sektöre Dijital Bir Nefes Getiriyor", source: "Ekonomi Haberleri", date: "15 Ekim 2025" },
            { title: "20'den Fazla Acentelik ile Rekor Büyüme", source: "Finans Gündemi", date: "02 Eylül 2025" },
            { title: "Yılın Müşteri Odaklı Sigorta Platformu Ödülü", source: "Tech & Insurtech", date: "18 Haziran 2025" },
          ].map((item, i) => (
            <div key={i} className="card press-card">
              <div className="press-icon">
                <Newspaper size={26} />
              </div>
              <div style={{ minWidth: 0 }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--gold-dark)', fontWeight: 700, letterSpacing: '0.05em' }}>{item.date} — {item.source}</span>
                <h3 style={{ fontSize: 'clamp(1.05rem, 3vw, 1.4rem)', fontWeight: 800, color: 'var(--dark)', marginTop: '6px', lineHeight: 1.3 }}>{item.title}</h3>
                <p style={{ color: 'var(--gray)', fontSize: '0.92rem', marginTop: '8px', lineHeight: 1.6 }}>
                  Sektör yeniliklerimiz ve dijital dönüşüm adımlarımız medya kuruluşlarında büyük ilgi görmeye devam ediyor...
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .press-card { padding: 1.75rem; display: flex; gap: 18px; align-items: center; }
        .press-icon { width: 56px; height: 56px; border-radius: 50%; background: linear-gradient(135deg, var(--gold), var(--gold-light)); display: flex; align-items: center; justify-content: center; color: #fff; flex-shrink: 0; }
        @media (max-width: 640px) {
          .press-card { padding: 1.25rem; gap: 14px; align-items: flex-start; }
          .press-icon { width: 44px; height: 44px; }
        }
      `}} />
    </div>
  );
}
