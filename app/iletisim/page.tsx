import { Metadata } from "next";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "İletişim | Alıcılar Sigorta",
  description: "Bize ulaşın. Uzman sigorta danışmanlarımız 7/24 size destek olmak için hazır.",
};

export default function IletisimPage() {
  return (
    <>
      {/* Page Header */}
      <div style={{ background: "var(--cream)", padding: "80px 20px", textAlign: "center", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <div className="section-badge">● 7/24 Destek</div>
          <h1 className="section-title">Bize <span className="gold">Ulaşın</span></h1>
          <p className="section-sub" style={{ margin: "16px auto 0", maxWidth: 600 }}>
            Sigorta uzmanlarımız sorularınızı yanıtlamak ve size en uygun çözümleri sunmak için hazır.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="section" style={{ backgroundColor: "var(--white)" }}>
        <div className="container">
          <div className="grid-2" style={{ gap: "4rem" }}>
            
            {/* Contact Info Cards */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div className="card" style={{ padding: "2rem", display: "flex", gap: "1.5rem", alignItems: "center" }}>
                <div className="icon-box" style={{ width: 64, height: 64 }}><Phone size={28} /></div>
                <div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "0.25rem" }}>Telefon</h3>
                  <p style={{ color: "var(--gray)", fontSize: "1.1rem" }}>0850 123 45 67</p>
                </div>
              </div>
              
              <div className="card" style={{ padding: "2rem", display: "flex", gap: "1.5rem", alignItems: "center" }}>
                <div className="icon-box" style={{ width: 64, height: 64 }}><Mail size={28} /></div>
                <div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "0.25rem" }}>E-Posta</h3>
                  <p style={{ color: "var(--gray)", fontSize: "1.1rem" }}>bilgi@alicilarsigorta.com.tr</p>
                </div>
              </div>

              <div className="card" style={{ padding: "2rem", display: "flex", gap: "1.5rem", alignItems: "center" }}>
                <div className="icon-box" style={{ width: 64, height: 64 }}><MapPin size={28} /></div>
                <div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "0.25rem" }}>Genel Müdürlük</h3>
                  <p style={{ color: "var(--gray)", fontSize: "1rem" }}>Levent Mah. Büyükdere Cad. No:199<br/>Şişli / İstanbul</p>
                </div>
              </div>

              <div className="card" style={{ padding: "2rem", display: "flex", gap: "1.5rem", alignItems: "center" }}>
                <div className="icon-box" style={{ width: 64, height: 64 }}><Clock size={28} /></div>
                <div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 800, marginBottom: "0.25rem" }}>Çalışma Saatleri</h3>
                  <p style={{ color: "var(--gray)", fontSize: "1rem" }}>Hafta İçi: 09:00 - 18:00<br/>Destek Hattı: 7/24 Aktif</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card" style={{ padding: "3rem", border: "1px solid var(--gold)" }}>
              <h2 style={{ fontSize: "1.8rem", fontWeight: 900, marginBottom: "2rem" }}>Mesaj Gönderin</h2>
              <form style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <label style={{ fontWeight: 700, fontSize: "0.9rem" }}>Adınız Soyadınız</label>
                  <input type="text" placeholder="Örn: Ahmet Yılmaz" style={{ width: "100%", padding: "1rem", borderRadius: "12px", border: "1px solid var(--border)", background: "var(--cream)", outline: "none", fontSize: "1rem" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <label style={{ fontWeight: 700, fontSize: "0.9rem" }}>E-Posta Adresiniz</label>
                  <input type="email" placeholder="ornek@email.com" style={{ width: "100%", padding: "1rem", borderRadius: "12px", border: "1px solid var(--border)", background: "var(--cream)", outline: "none", fontSize: "1rem" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <label style={{ fontWeight: 700, fontSize: "0.9rem" }}>Mesajınız</label>
                  <textarea rows={5} placeholder="Size nasıl yardımcı olabiliriz?" style={{ width: "100%", padding: "1rem", borderRadius: "12px", border: "1px solid var(--border)", background: "var(--cream)", outline: "none", fontSize: "1rem", resize: "vertical" }} />
                </div>
                <button type="button" className="btn btn-gold" style={{ width: "100%", padding: "1.2rem", marginTop: "1rem" }}>
                  Mesajı Gönder
                </button>
              </form>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
