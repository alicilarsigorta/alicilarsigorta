export const metadata = { title: "İnsan Kaynakları | Alıcılar Sigorta" };

export default function InsanKaynaklariPage() {
  return (
    <div className="legal-page">
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1>İnsan <span className="gold">Kaynakları</span></h1>
        <div className="card legal-card">
          <h2 style={{ fontSize: 'clamp(1.15rem, 3vw, 1.5rem)', color: 'var(--dark)', marginBottom: '1rem', fontWeight: 800 }}>Geleceği Bizimle Şekillendirin</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            Alıcılar Sigorta ekibinin en büyük gücü, sahip olduğu dinamik, yenilikçi ve müşteri odaklı insan kaynağıdır. Şirketimizde açık iletişim, fırsat eşitliği ve sürekli gelişim ilkeleri benimsenmiştir.
          </p>
          <div style={{ padding: 'clamp(16px, 4vw, 24px)', background: 'rgba(201, 164, 73,0.06)', borderRadius: '16px', border: '1px solid var(--border)', marginTop: '20px' }}>
            <h3 style={{ fontSize: '1.1rem', color: 'var(--gold-dark)', marginBottom: '10px', fontWeight: 800 }}>Açık Pozisyonlar</h3>
            <p style={{ marginBottom: '15px' }}>Şu an için aktif bir iş ilanımız bulunmamaktadır, ancak özgeçmişlerinizi veri tabanımızda tutmaktan memnuniyet duyarız.</p>
            <a href="mailto:ik@alicilarsigorta.com.tr" className="btn btn-gold">Özgeçmiş Gönder</a>
          </div>
        </div>
      </div>
    </div>
  );
}
