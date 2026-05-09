import { Newspaper } from "lucide-react";

export const metadata = { title: "Basında Biz | Alıcılar Sigorta" };

export default function BasindaBizPage() {
  return (
    <div style={{ paddingTop: '160px', paddingBottom: '100px', backgroundColor: 'var(--bg-main)', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '2rem' }}>
          Basında <span style={{ color: 'var(--primary-color)' }}>Biz</span>
        </h1>
        
        <div style={{ display: 'grid', gap: '2rem' }}>
          {[
            { title: "Alıcılar Sigorta Sektöre Dijital Bir Nefes Getiriyor", source: "Ekonomi Haberleri", date: "15 Ekim 2025" },
            { title: "20'den Fazla Acentelik ile Rekor Büyüme", source: "Finans Gündemi", date: "02 Eylül 2025" },
            { title: "Yılın Müşteri Odaklı Sigorta Platformu Ödülü", source: "Tech & Insurtech", date: "18 Haziran 2025" },
          ].map((item, i) => (
            <div key={i} className="card" style={{ padding: '2rem', display: 'flex', gap: '20px', alignItems: 'center' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--primary-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                <Newspaper size={28} />
              </div>
              <div>
                <span style={{ fontSize: '0.85rem', color: 'var(--primary-color)', fontWeight: 700, letterSpacing: '0.05em' }}>{item.date} — {item.source}</span>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-main)', marginTop: '5px' }}>{item.title}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginTop: '10px' }}>
                  Sektör yeniliklerimiz ve dijital dönüşüm adımlarımız medya kuruluşlarında büyük ilgi görmeye devam ediyor...
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
