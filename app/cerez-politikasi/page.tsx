export const metadata = { title: "Çerez Politikası | Alıcılar Sigorta" };

export default function CerezPolitikasiPage() {
  return (
    <div style={{ paddingTop: '160px', paddingBottom: '100px', backgroundColor: 'var(--bg-main)', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '2rem' }}>
          Çerez <span style={{ color: 'var(--primary-color)' }}>Politikası</span>
        </h1>
        <div className="card" style={{ padding: '3rem', color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.95rem' }}>
          <p style={{ marginBottom: '1.5rem' }}>
            Alıcılar Sigorta olarak, web sitemizden en verimli şekilde faydalanabilmeniz ve kullanıcı deneyiminizi geliştirebilmek için çerez (Cookie) kullanıyoruz. Çerez kullanılmasını tercih etmezseniz tarayıcınızın ayarlarından siltebilir veya engelleyebilirsiniz.
          </p>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginTop: '2rem', marginBottom: '1rem', fontWeight: 800 }}>Çerez Nedir?</h3>
          <p style={{ marginBottom: '1.5rem' }}>
            Çerezler, ziyaret ettiğiniz internet siteleri tarafından tarayıcılar aracılığıyla cihazınıza veya ağ sunucusuna depolanan küçük metin dosyalarıdır. İşlevleri sitemizin doğru olarak çalışması ve analiz verilerinin toplanması ile sınırlıdır.
          </p>
          <h3 style={{ fontSize: '1.2rem', color: 'var(--text-main)', marginTop: '2rem', marginBottom: '1rem', fontWeight: 800 }}>Sitemizde Kullanılan Çerez Türleri</h3>
          <ul style={{ listStyleType: 'disc', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li><strong style={{ color: 'var(--text-main)' }}>Zorunlu Çerezler:</strong> Web sitesinin doğru biçimde çalışması için kesinlikle gerekli olan çerezlerdir. Güvenlik, doğrulama ve kimlik koruması gibi amaçlar için kullanılırlar.</li>
            <li><strong style={{ color: 'var(--text-main)' }}>Performans Çerezleri:</strong> Ziyaretçilerin web sitesini nasıl kullandığını analiz etmek için kullanılır. (Örn: Hangi sayfaların daha çok ziyaret edildiği). Toplanan veriler anonimleştirilmiştir.</li>
            <li><strong style={{ color: 'var(--text-main)' }}>Fonksiyonel Çerezler:</strong> Kullanıcı tercihlerinin (dil, bölge, vs.) hatırlanmasına olanak tanır.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
