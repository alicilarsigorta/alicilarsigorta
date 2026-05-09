export const metadata = { title: "İnsan Kaynakları | Alıcılar Sigorta" };

export default function InsanKaynaklariPage() {
  return (
    <div style={{ paddingTop: '160px', paddingBottom: '100px', backgroundColor: 'var(--bg-main)', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '2rem' }}>
          İnsan <span style={{ color: 'var(--primary-color)' }}>Kaynakları</span>
        </h1>
        <div className="card" style={{ padding: '3rem', color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1.05rem' }}>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '1rem', fontWeight: 800 }}>Geleceği Bizimle Şekillendirin</h2>
          <p style={{ marginBottom: '2rem' }}>
            Alıcılar Sigorta ekibinin en büyük gücü, sahip olduğu dinamik, yenilikçi ve müşteri odaklı insan kaynağıdır. Şirketimizde açık iletişim, fırsat eşitliği ve sürekli gelişim ilkeleri benimsenmiştir.
          </p>
          <div style={{ padding: '24px', background: 'rgba(37,99,235,0.05)', borderRadius: '16px', border: '1px solid rgba(37,99,235,0.2)', marginTop: '30px' }}>
            <h3 style={{ fontSize: '1.2rem', color: 'var(--primary-color)', marginBottom: '10px', fontWeight: 700 }}>Açık Pozisyonlar</h3>
            <p style={{ marginBottom: '15px' }}>Şu an için aktif bir iş ilanımız bulunmamaktadır, ancak özgeçmişlerinizi veri tabanımızda tutmaktan memnuniyet duyarız.</p>
            <a href="mailto:ik@alicilarsigorta.com.tr" className="btn btn-primary" style={{ display: 'inline-block', padding: '0.8rem 1.5rem', fontSize: '0.9rem' }}>Özgeçmiş Gönder</a>
          </div>
        </div>
      </div>
    </div>
  );
}
