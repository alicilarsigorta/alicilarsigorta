import { Metadata } from "next";
import { Award, Shield, Users, Clock } from "lucide-react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Hakkımızda | Alıcılar Sigorta",
  description: "Alıcılar Sigorta olarak Türkiye'nin önde gelen 20+ sigorta şirketiyle anlaşmalı güvenilir sigorta platformuyuz.",
};

export default function HakkimizdaPage() {
  return (
    <>
      {/* Page Header */}
      <div style={{ background: "var(--cream)", padding: "80px 20px", textAlign: "center", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <div className="section-badge">● Kurumsal</div>
          <h1 className="section-title">Biz <span className="gold">Kimiz?</span></h1>
          <p className="section-sub" style={{ margin: "16px auto 0", maxWidth: 600 }}>
            Yılların getirdiği tecrübe ile Türkiye'nin en seçkin sigorta şirketlerini tek bir platformda sizin için buluşturuyoruz.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <section className="section" style={{ backgroundColor: "var(--white)" }}>
        <div className="container">
          <div className="grid-2" style={{ gap: "4rem", alignItems: "center" }}>
            <div>
              <h2 style={{ fontSize: "2.5rem", fontWeight: 900, marginBottom: "1.5rem", lineHeight: 1.2, color: "var(--black)" }}>
                Güveniniz, Bizim <br/><span className="gold">En Büyük Sermayemiz</span>
              </h2>
              <p style={{ color: "var(--gray)", fontSize: "1.1rem", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                Alıcılar Sigorta, müşteri odaklı hizmet anlayışıyla sektörde fark yaratan bağımsız bir sigorta platformudur. Amacımız, müşterilerimizin karmaşık sigorta dünyasında yollarını kolayca bulmalarını sağlamak ve onlara en uygun fiyatlarla en geniş kapsamlı korumayı sunmaktır.
              </p>
              <p style={{ color: "var(--gray)", fontSize: "1.1rem", lineHeight: 1.8 }}>
                20'den fazla lider sigorta şirketi ile yaptığımız güçlü ortaklıklar sayesinde, Kasko'dan Sağlığa, DASK'tan İşyeri Sigortalarına kadar geniş bir yelpazede tamamen şeffaf ve karşılaştırmalı teklifler üretiyoruz.
              </p>
            </div>
            
            <div className="grid-2" style={{ gap: "1.5rem" }}>
              <div className="card" style={{ padding: "2rem", textAlign: "center" }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem", color: "var(--gold)" }}><Award size={40} /></div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>15+ Yıl</h3>
                <p style={{ color: "var(--gray)" }}>Sektörel Deneyim</p>
              </div>
              <div className="card" style={{ padding: "2rem", textAlign: "center" }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem", color: "var(--gold)" }}><Shield size={40} /></div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>20+</h3>
                <p style={{ color: "var(--gray)" }}>Anlaşmalı Şirket</p>
              </div>
              <div className="card" style={{ padding: "2rem", textAlign: "center" }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem", color: "var(--gold)" }}><Users size={40} /></div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>500K+</h3>
                <p style={{ color: "var(--gray)" }}>Mutlu Müşteri</p>
              </div>
              <div className="card" style={{ padding: "2rem", textAlign: "center" }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem", color: "var(--gold)" }}><Clock size={40} /></div>
                <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.5rem" }}>7/24</h3>
                <p style={{ color: "var(--gray)" }}>Kesintisiz Destek</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-sm" style={{ background: "var(--black)", textAlign: "center", color: "white" }}>
        <div className="container">
          <h2 style={{ fontSize: "2rem", fontWeight: 900, marginBottom: "1.5rem" }}>Hemen Güvence Altına Alın</h2>
          <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "2rem", fontSize: "1.1rem" }}>
            Siz de binlerce mutlu müşterimiz arasına katılın. Saniyeler içinde ücretsiz teklifinizi alın.
          </p>
          <Link href="/teklif-al" className="btn btn-gold">
            Teklif Al <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </>
  );
}
