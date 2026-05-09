export const metadata = { title: "Vizyon & Misyon | Alıcılar Sigorta" };

export default function VizyonMisyonPage() {
  return (
    <div style={{ paddingTop: '160px', paddingBottom: '100px', backgroundColor: 'var(--bg-main)', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--text-main)', marginBottom: '2rem' }}>
          Vizyon & <span style={{ color: 'var(--primary-color)' }}>Misyon</span>
        </h1>
        <div className="card" style={{ padding: '3rem', color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1.05rem' }}>
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '1rem', fontWeight: 800 }}>VİZYONUMUZ</h2>
          <p style={{ marginBottom: '2.5rem' }}>
            Sigortacılık sektöründe dijitalleşmenin öncüsü olarak, tüm Türkiye'nin her an her yerde güvenebileceği, en ulaşılabilir ve en şeffaf sigorta ekosistemini inşa etmek. Geleneksel sigortacılığı modern teknoloji ile harmanlayarak kullanıcılarımıza kusursuz bir deneyim sunmak en büyük vizyonumuzdur.
          </p>
          
          <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '1rem', fontWeight: 800 }}>MİSYONUMUZ</h2>
          <p>
            Bireysel ve kurumsal tüm müşterilerimizin hayatlarındaki risk ve belirsizlikleri minimize etmek için varız. 20'den fazla güvenilir sigorta şirketinin tekliflerini objektif bir şekilde kullanıcılarımıza sunarak, onların ihtiyaçlarına en uygun poliçeyi, en avantajlı fiyatlarla güvenle almalarını sağlamak birincil görevimizdir.
          </p>
        </div>
      </div>
    </div>
  );
}
