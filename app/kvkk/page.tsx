export const metadata = { title: "KVKK Aydınlatma Metni | Alıcılar Sigorta" };

export default function KVKKPage() {
  return (
    <div style={{ paddingTop: '160px', paddingBottom: '100px', backgroundColor: 'var(--bg-main)', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '2rem' }}>
          Kişisel Verilerin Korunması <span style={{ color: 'var(--primary-color)' }}>(KVKK)</span>
        </h1>
        <div className="card" style={{ padding: '3rem', color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.95rem' }}>
          <p style={{ marginBottom: '1.5rem' }}>
            <strong style={{ color: 'var(--text-main)' }}>1. Veri Sorumlusunun Kimliği</strong><br/>
            Alıcılar Sigorta Aracılık Hizmetleri Ltd. Şti. ("Şirket") olarak, müşterilerimizin kişisel verilerinin Türkiye Cumhuriyeti Anayasası ve 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") ile uyumlu bir biçimde işlenmesine ve korunmasına büyük önem vermekteyiz.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            <strong style={{ color: 'var(--text-main)' }}>2. Kişisel Verilerin İşlenme Amacı</strong><br/>
            Kişisel verileriniz, tarafınıza sigorta teklifleri sunulması, poliçelerin tanzimi, hasar işlemlerinin yönetilmesi ve müşteri hizmetleri destek süreçlerinin yürütülmesi amaçlarıyla KVKK'nın 5. ve 6. maddelerinde belirtilen şartlara uygun olarak işlenmektedir.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            <strong style={{ color: 'var(--text-main)' }}>3. İşlenen Kişisel Verilerin Kimlere ve Hangi Amaçla Aktarılabileceği</strong><br/>
            Toplanan kişisel verileriniz, yasal düzenlemelerin getirdiği zorunluluklar doğrultusunda yetkili kamu kurumlarına, teklif hazırlama amacıyla iş birliği yaptığımız anlaşmalı sigorta şirketlerine aktarılabilmektedir. Tüm veriler şifreli sunucularda barındırılmaktadır.
          </p>
          <p>
            <strong style={{ color: 'var(--text-main)' }}>4. Kişisel Veri Sahibinin Hakları</strong><br/>
            KVKK'nın 11. maddesi uyarınca veri sahipleri, kişisel verilerinin işlenip işlenmediğini öğrenme, amacına uygun kullanılıp kullanılmadığını bilme ve eksik/yanlış işlenen verilerin düzeltilmesini talep etme hakkına sahiptir.
          </p>
        </div>
      </div>
    </div>
  );
}
