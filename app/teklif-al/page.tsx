import OfferForm from "@/components/OfferForm";

export const metadata = { title: "Ücretsiz Teklif Al | Alıcılar Sigorta" };

export default function TeklifAlPage() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--off-white)", display: "flex", flexDirection: "column" }}>
      <section className="page-hero" style={{ background: "var(--cream)", borderBottom: "1px solid var(--hairline)" }}>
        <div className="container">
          <div className="page-hero__inner" style={{ textAlign: "center", margin: "0 auto" }}>
            <div className="section-badge" style={{ justifyContent: "center" }}>Ücretsiz &amp; Hızlı</div>
            <h1 className="page-hero__title">Anında <span className="gold">teklif al</span></h1>
            <p className="page-hero__sub" style={{ margin: "0 auto" }}>
              2 dakika sürmez. 20+ şirketin en iyi teklifleri karşılaştırmalı olarak önünüze gelir.
            </p>
          </div>
        </div>
      </section>

      <div className="container" style={{ maxWidth: 760, padding: "clamp(40px, 6vw, 72px) 1.25rem clamp(64px, 8vw, 100px)" }}>
        <OfferForm />
      </div>
    </div>
  );
}
