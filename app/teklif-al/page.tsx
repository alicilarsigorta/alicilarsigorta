import OfferForm from "@/components/OfferForm";

export const metadata = { title: "Ücretsiz Teklif Al | Alıcılar Sigorta" };

export default function TeklifAlPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--cream)", display: "flex", flexDirection: "column" }}>
      <div className="teklif-hero" style={{ background: "var(--white)", borderBottom: "1px solid var(--border)", textAlign: "center" }}>
        <div className="section-badge">● Ücretsiz & Hızlı</div>
        <h1 className="section-title">Anında <span className="gold">Teklif Al</span></h1>
        <p className="section-sub" style={{ margin: "16px auto 0", textAlign: "center" }}>
          2 dakika sürmez. 20+ şirketin en iyi teklifleri karşılaştırmalı olarak önünüze gelir.
        </p>
      </div>
      <div className="container teklif-form-wrap" style={{ maxWidth: 720 }}>
        <OfferForm />
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        .teklif-hero { padding: 60px 20px 64px; }
        .teklif-form-wrap { padding: 60px 1.25rem 80px; }
        @media (max-width: 768px) {
          .teklif-hero { padding: 36px 18px 40px; }
          .teklif-form-wrap { padding: 32px 1rem 64px; }
        }
      `}} />
    </div>
  );
}
