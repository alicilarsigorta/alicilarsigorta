export const metadata = { title: "Kullanım Şartları | Alıcılar Sigorta" };

export default function KullanimSartlariPage() {
  return (
    <div className="legal-page">
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1>Kullanım <span className="gold">Şartları</span></h1>
        <div className="card legal-card">
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
