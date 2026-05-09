import OfferForm from "@/components/OfferForm";

export const metadata = { title: "Ücretsiz Teklif Al | Alıcılar Sigorta" };

export default function TeklifAlPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--cream)", display: "flex", flexDirection: "column" }}>
      <div style={{ background: "var(--white)", padding: "60px 20px 80px", borderBottom: "1px solid var(--border)", textAlign: "center" }}>
        <div className="section-badge">● Ücretsiz & Hızlı</div>
        <h1 className="section-title">Anında <span className="gold">Teklif Al</span></h1>
        <p className="section-sub" style={{ margin: "16px auto 0", textAlign: "center" }}>
          2 dakika sürmez. 20+ şirketin en iyi teklifleri karşılaştırmalı olarak önünüze gelir.
        </p>
      </div>
      <div className="container" style={{ maxWidth: 720, padding: "60px 2rem" }}>
        <OfferForm />
      </div>
    </div>
  );
}
