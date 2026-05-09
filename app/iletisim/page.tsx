import { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "İletişim | Alıcılar Sigorta",
  description: "Bize ulaşın. Uzman sigorta danışmanlarımız 7/24 size destek olmak için hazır.",
};

const contactItems = [
  { icon: Phone, label: "Telefon", value: "0850 123 45 67" },
  { icon: Mail, label: "E-Posta", value: "bilgi@alicilarsigorta.com.tr" },
  { icon: MapPin, label: "Genel Müdürlük", value: "Levent Mah. Büyükdere Cad. No:199, Şişli / İstanbul" },
  { icon: Clock, label: "Çalışma Saatleri", value: "Hafta içi 09:00 – 18:00 • Destek 7/24" },
];

export default function IletisimPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="page-hero__inner">
            <div className="section-badge">7/24 Destek</div>
            <h1 className="page-hero__title">Bize <span className="gold">ulaşın</span></h1>
            <p className="page-hero__sub">
              Sigorta uzmanlarımız sorularınızı yanıtlamak ve size en uygun çözümleri sunmak için hazır.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--white)" }}>
        <div className="container">
          <div className="il-grid">
            <div className="il-info">
              {contactItems.map(({ icon: Icon, label, value }) => (
                <div key={label} className="il-row">
                  <span className="il-row__icon"><Icon size={18} strokeWidth={1.5} /></span>
                  <div>
                    <p className="il-row__label">{label}</p>
                    <p className="il-row__value">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="il-form">
              <h2 className="il-h2">Mesaj <span className="gold">gönderin</span></h2>
              <form>
                <div className="il-field">
                  <label>Ad Soyad</label>
                  <input type="text" placeholder="Ahmet Yılmaz" />
                </div>
                <div className="il-field">
                  <label>E-posta</label>
                  <input type="email" placeholder="ornek@email.com" />
                </div>
                <div className="il-field">
                  <label>Mesajınız</label>
                  <textarea rows={5} placeholder="Size nasıl yardımcı olabiliriz?" />
                </div>
                <button type="button" className="btn btn-gold" style={{ width: "100%", marginTop: 8 }}>
                  Mesajı Gönder
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .il-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: clamp(40px, 6vw, 96px);
          align-items: start;
        }
        .il-info {
          display: flex;
          flex-direction: column;
          border-top: 1px solid var(--hairline);
        }
        .il-row {
          display: flex;
          align-items: flex-start;
          gap: 18px;
          padding: clamp(20px, 3vw, 28px) 0;
          border-bottom: 1px solid var(--hairline);
        }
        .il-row__icon {
          width: 40px; height: 40px;
          border-radius: 50%;
          border: 1px solid var(--hairline);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--gold-dark);
          flex-shrink: 0;
        }
        .il-row__label {
          font-family: var(--font-sans);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--muted);
          margin: 0 0 4px;
        }
        .il-row__value {
          font-family: var(--font-serif);
          font-size: 1.1rem;
          font-weight: 400;
          color: var(--ink);
          line-height: 1.4;
          letter-spacing: -0.01em;
          margin: 0;
        }

        .il-form {
          background: var(--white);
          border: 1px solid var(--hairline);
          border-radius: var(--radius-lg);
          padding: clamp(28px, 4vw, 48px);
        }
        .il-h2 {
          font-family: var(--font-serif);
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 400;
          letter-spacing: -0.02em;
          color: var(--ink);
          margin: 0 0 28px;
        }
        .il-h2 .gold { font-style: italic; color: var(--gold-dark); font-weight: 300; }
        .il-form form { display: flex; flex-direction: column; gap: 18px; }
        .il-field { display: flex; flex-direction: column; gap: 8px; }
        .il-field label {
          font-family: var(--font-sans);
          font-size: 0.78rem;
          font-weight: 500;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--ink);
        }
        .il-field input, .il-field textarea {
          width: 100%;
          padding: 14px;
          border-radius: var(--radius-md);
          border: 1px solid var(--hairline);
          background: var(--white);
          font-family: var(--font-sans);
          font-size: 1rem;
          color: var(--ink);
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          resize: vertical;
        }
        .il-field input:focus, .il-field textarea:focus {
          border-color: var(--ink);
          box-shadow: 0 0 0 3px rgba(12,12,13,0.05);
        }

        @media (max-width: 768px) {
          .il-grid { grid-template-columns: 1fr; gap: 32px; }
        }
      `}</style>
    </>
  );
}
