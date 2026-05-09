export const metadata = { title: "İnsan Kaynakları | Alıcılar Sigorta" };

export default function InsanKaynaklariPage() {
  return (
    <div className="legal-page">
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1>İnsan <span className="gold">Kaynakları</span></h1>
        <div className="legal-card">
          <h2>Geleceği Bizimle Şekillendirin</h2>
          <p style={{ marginBottom: '1.5rem' }}>
            Alıcılar Sigorta ekibinin en büyük gücü, sahip olduğu dinamik, yenilikçi ve müşteri odaklı insan kaynağıdır. Şirketimizde açık iletişim, fırsat eşitliği ve sürekli gelişim ilkeleri benimsenmiştir.
          </p>
          <div style={{ padding: 'clamp(16px, 4vw, 24px)', background: 'var(--cream)', borderRadius: 'var(--radius-md)', border: '1px solid var(--hairline)', marginTop: '24px' }}>
            <h3 style={{ color: 'var(--gold-dark)', fontStyle: 'italic' }}>Açık Pozisyonlar</h3>
            <p style={{ marginBottom: '15px' }}>Şu an için aktif bir iş ilanımız bulunmamaktadır, ancak özgeçmişlerinizi veri tabanımızda tutmaktan memnuniyet duyarız.</p>
            <a href="mailto:ik@alicilarsigorta.com.tr" className="btn btn-gold">Özgeçmiş Gönder</a>
          </div>
        </div>
      </div>
    </div>
  );
}
