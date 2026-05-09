export const metadata = { title: "Kullanım Şartları | Alıcılar Sigorta" };

export default function KullanimSartlariPage() {
  return (
    <div style={{ paddingTop: '160px', paddingBottom: '100px', backgroundColor: 'var(--bg-main)', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '2rem' }}>
          Kullanım <span style={{ color: 'var(--primary-color)' }}>Şartları</span>
        </h1>
        <div className="card" style={{ padding: '3rem', color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.95rem' }}>
          <p style={{ marginBottom: '1.5rem' }}>
            Bu web sitesini ziyaret ederek veya bu sitede sunulan hizmetlerden faydalanarak, aşağıdaki kullanım şartlarını kabul etmiş sayılırsınız. Lütfen dikkatlice okuyunuz.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            <strong style={{ color: 'var(--text-main)' }}>1. Hizmet Kapsamı</strong><br/>
            Alıcılar Sigorta, anlaşmalı olduğu sigorta şirketlerinden alınan teklifleri karşılaştırmalı olarak kullanıcıya sunan bir aracılık platformudur. Çıkan teklifler bilgi amaçlı olup, sigorta şirketlerinin poliçe onayı öncesi fiyatlarda değişiklik yapma hakkı saklıdır.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            <strong style={{ color: 'var(--text-main)' }}>2. Fikri Mülkiyet Hakları</strong><br/>
            Sitede yer alan tüm içerikler, logolar, görseller, marka ve tasarım hakları Alıcılar Sigorta'ya ya da hak sahibi 3. kurumlara aittir. Kopyalanması ve izinsiz biçimde yayınlanması yasaktır.
          </p>
          <p style={{ marginBottom: '1.5rem' }}>
            <strong style={{ color: 'var(--text-main)' }}>3. Sorumluluk Sınırları</strong><br/>
            Site üzerinden verilen bilgilerin doğruluğu sigortacılık esasları dâhilinde sigorta şirketlerinin anlık entegrasyon sistemlerine dayanır. Yaşanabilecek teknik aksaklıklardan doğacak dolaylı zararlardan Şirketimiz sorumlu tutulamaz.
          </p>
          <p>
            <strong style={{ color: 'var(--text-main)' }}>4. Şartlarda Değişiklik</strong><br/>
            Alıcılar Sigorta, burada belirtilen yasal uyarıları ve kullanım şartlarını önceden bildirmeksizin değiştirme ve güncelleme hakkını saklı tutar.
          </p>
        </div>
      </div>
    </div>
  );
}
