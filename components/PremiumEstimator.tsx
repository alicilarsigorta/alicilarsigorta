"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Car, ShieldCheck, HeartPulse, Home, ArrowRight, Calculator, Info } from "lucide-react";
import Link from "next/link";
import { fadeUp, viewportOnce, easeOutExpo } from "@/lib/motion";

/**
 * PremiumEstimator — anlık tahmini fiyat widget'i.
 *
 * Not bir gerçek poliçe motoru; sigorta türü ve hızlı parametrelere göre
 * sembolik bir aralık hesaplar (deterministic formula). Amacı kullanıcıyı
 * "tam teklif" akışına yönlendirmek + ilk fiyat şokunu yumuşatmak.
 */

type TabKey = "kasko" | "trafik" | "konut" | "saglik";

const TABS: { key: TabKey; label: string; icon: typeof Car; route: string }[] = [
  { key: "kasko", label: "Kasko", icon: Car, route: "kasko" },
  { key: "trafik", label: "Trafik", icon: ShieldCheck, route: "trafik-sigortasi" },
  { key: "konut", label: "Konut", icon: Home, route: "konut-sigortasi" },
  { key: "saglik", label: "Sağlık", icon: HeartPulse, route: "saglik-sigortasi-fiyatlari" },
];

const CITIES = ["İstanbul", "Ankara", "İzmir", "Bursa", "Antalya", "Adana", "Konya", "Diğer"];

interface KaskoIn { city: string; vehicleAge: number; noDamageYears: number; }
interface TrafikIn { city: string; vehicleClass: "Otomobil" | "Kamyonet" | "Motosiklet"; noDamageYears: number; }
interface KonutIn { city: string; size: number; type: "Daire" | "Müstakil" | "Villa"; }
interface SaglikIn { age: number; plan: "Temel" | "Standart" | "VIP"; }

/* ── Sembolik fiyat formülleri ────────────────────── */
function estimateKasko(i: KaskoIn): [number, number] {
  const cityMult = i.city === "İstanbul" ? 1.25 : i.city === "Ankara" ? 1.10 : i.city === "İzmir" ? 1.08 : 1.0;
  const ageDiscount = Math.max(0, 1 - i.vehicleAge * 0.08);
  const noDamageDiscount = Math.max(0.7, 1 - i.noDamageYears * 0.05);
  const base = 7500 * cityMult * ageDiscount * noDamageDiscount;
  return [Math.round(base * 0.85), Math.round(base * 1.20)];
}

function estimateTrafik(i: TrafikIn): [number, number] {
  const classMult = i.vehicleClass === "Motosiklet" ? 0.55 : i.vehicleClass === "Kamyonet" ? 1.30 : 1.0;
  const cityMult = i.city === "İstanbul" ? 1.18 : 1.0;
  const noDamageDiscount = Math.max(0.7, 1 - i.noDamageYears * 0.06);
  const base = 2400 * classMult * cityMult * noDamageDiscount;
  return [Math.round(base * 0.90), Math.round(base * 1.15)];
}

function estimateKonut(i: KonutIn): [number, number] {
  const typeMult = i.type === "Villa" ? 2.2 : i.type === "Müstakil" ? 1.5 : 1.0;
  const cityMult = i.city === "İstanbul" ? 1.20 : 1.0;
  const base = 1.2 * i.size * typeMult * cityMult;
  return [Math.round(base * 0.85), Math.round(base * 1.20)];
}

function estimateSaglik(i: SaglikIn): [number, number] {
  const ageMult = i.age < 30 ? 1.0 : i.age < 45 ? 1.4 : i.age < 60 ? 2.1 : 3.2;
  const planMult = i.plan === "VIP" ? 2.4 : i.plan === "Standart" ? 1.5 : 1.0;
  const base = 850 * ageMult * planMult;
  return [Math.round(base * 0.88), Math.round(base * 1.18)];
}

function tr(n: number) {
  return n.toLocaleString("tr-TR");
}

export default function PremiumEstimator() {
  const [tab, setTab] = useState<TabKey>("kasko");

  const [kasko, setKasko] = useState<KaskoIn>({ city: "İstanbul", vehicleAge: 3, noDamageYears: 2 });
  const [trafik, setTrafik] = useState<TrafikIn>({ city: "İstanbul", vehicleClass: "Otomobil", noDamageYears: 2 });
  const [konut, setKonut] = useState<KonutIn>({ city: "İstanbul", size: 120, type: "Daire" });
  const [saglik, setSaglik] = useState<SaglikIn>({ age: 35, plan: "Standart" });

  const [min, max] = useMemo<[number, number]>(() => {
    if (tab === "kasko") return estimateKasko(kasko);
    if (tab === "trafik") return estimateTrafik(trafik);
    if (tab === "konut") return estimateKonut(konut);
    return estimateSaglik(saglik);
  }, [tab, kasko, trafik, konut, saglik]);

  const route = TABS.find((t) => t.key === tab)!.route;

  return (
    <section className="estimator-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease: easeOutExpo }}
          className="estimator-header"
        >
          <div>
            <span className="eyebrow">
              <Calculator size={14} strokeWidth={2} />
              Anlık Tahmin
            </span>
            <h2 className="section-title">
              Sigortanız ne kadar olur?{" "}
              <span className="gold">Saniyeler içinde</span> öğrenin.
            </h2>
          </div>
          <p className="estimator-disclaimer">
            <Info size={14} strokeWidth={2} />
            Tahmini fiyat aralığıdır. Tam ve bağlayıcı teklif için TC kimlik bilgileri gerekir.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="estimator-card"
        >
          {/* Tabs */}
          <div className="estimator-tabs" role="tablist">
            {TABS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                role="tab"
                aria-selected={tab === key}
                onClick={() => setTab(key)}
                className={`estimator-tab ${tab === key ? "active" : ""}`}
              >
                <Icon size={16} strokeWidth={1.8} />
                <span>{label}</span>
              </button>
            ))}
          </div>

          <div className="estimator-body">
            {/* Inputs */}
            <div className="estimator-inputs">
              <AnimatePresence mode="wait">
                <motion.div
                  key={tab}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: easeOutExpo }}
                  className="estimator-inputs-grid"
                >
                  {tab === "kasko" && (
                    <>
                      <Field label="Şehir">
                        <select
                          value={kasko.city}
                          onChange={(e) => setKasko({ ...kasko, city: e.target.value })}
                        >
                          {CITIES.map((c) => <option key={c}>{c}</option>)}
                        </select>
                      </Field>
                      <Field label={`Araç yaşı: ${kasko.vehicleAge}`}>
                        <input
                          type="range"
                          min={0}
                          max={15}
                          value={kasko.vehicleAge}
                          onChange={(e) => setKasko({ ...kasko, vehicleAge: parseInt(e.target.value) })}
                        />
                      </Field>
                      <Field label={`Hasarsızlık: ${kasko.noDamageYears} yıl`}>
                        <input
                          type="range"
                          min={0}
                          max={8}
                          value={kasko.noDamageYears}
                          onChange={(e) => setKasko({ ...kasko, noDamageYears: parseInt(e.target.value) })}
                        />
                      </Field>
                    </>
                  )}

                  {tab === "trafik" && (
                    <>
                      <Field label="Araç sınıfı">
                        <select
                          value={trafik.vehicleClass}
                          onChange={(e) => setTrafik({ ...trafik, vehicleClass: e.target.value as TrafikIn["vehicleClass"] })}
                        >
                          <option>Otomobil</option>
                          <option>Kamyonet</option>
                          <option>Motosiklet</option>
                        </select>
                      </Field>
                      <Field label="Şehir">
                        <select
                          value={trafik.city}
                          onChange={(e) => setTrafik({ ...trafik, city: e.target.value })}
                        >
                          {CITIES.map((c) => <option key={c}>{c}</option>)}
                        </select>
                      </Field>
                      <Field label={`Hasarsızlık: ${trafik.noDamageYears} yıl`}>
                        <input
                          type="range"
                          min={0}
                          max={8}
                          value={trafik.noDamageYears}
                          onChange={(e) => setTrafik({ ...trafik, noDamageYears: parseInt(e.target.value) })}
                        />
                      </Field>
                    </>
                  )}

                  {tab === "konut" && (
                    <>
                      <Field label="Konut tipi">
                        <select
                          value={konut.type}
                          onChange={(e) => setKonut({ ...konut, type: e.target.value as KonutIn["type"] })}
                        >
                          <option>Daire</option>
                          <option>Müstakil</option>
                          <option>Villa</option>
                        </select>
                      </Field>
                      <Field label="Şehir">
                        <select
                          value={konut.city}
                          onChange={(e) => setKonut({ ...konut, city: e.target.value })}
                        >
                          {CITIES.map((c) => <option key={c}>{c}</option>)}
                        </select>
                      </Field>
                      <Field label={`Büyüklük: ${konut.size} m²`}>
                        <input
                          type="range"
                          min={40}
                          max={400}
                          step={10}
                          value={konut.size}
                          onChange={(e) => setKonut({ ...konut, size: parseInt(e.target.value) })}
                        />
                      </Field>
                    </>
                  )}

                  {tab === "saglik" && (
                    <>
                      <Field label={`Yaş: ${saglik.age}`}>
                        <input
                          type="range"
                          min={18}
                          max={75}
                          value={saglik.age}
                          onChange={(e) => setSaglik({ ...saglik, age: parseInt(e.target.value) })}
                        />
                      </Field>
                      <Field label="Plan">
                        <select
                          value={saglik.plan}
                          onChange={(e) => setSaglik({ ...saglik, plan: e.target.value as SaglikIn["plan"] })}
                        >
                          <option>Temel</option>
                          <option>Standart</option>
                          <option>VIP</option>
                        </select>
                      </Field>
                      <Field label="">
                        <div style={{ fontSize: "0.8rem", color: "var(--gray)", fontWeight: 500, lineHeight: 1.5, padding: "0 4px" }}>
                          Tamamlayıcı Sağlık Sigortası — SGK üzerinden özel hastane güvencesi.
                        </div>
                      </Field>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Result */}
            <div className="estimator-result">
              <div className="estimator-result-label">Tahmini yıllık prim</div>

              <div className="estimator-range">
                <motion.div
                  key={`${tab}-${min}-${max}`}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: easeOutExpo }}
                  className="estimator-range-numbers"
                >
                  <span className="stat-number estimator-num">₺{tr(min)}</span>
                  <span className="estimator-dash">–</span>
                  <span className="stat-number estimator-num">₺{tr(max)}</span>
                </motion.div>
                <div className="estimator-range-meta">
                  Aylık taksitli: <strong>₺{tr(Math.round(min / 12))} – ₺{tr(Math.round(max / 12))}</strong> · 12 ay vade
                </div>

                {/* Animated range bar */}
                <div className="estimator-bar">
                  <motion.div
                    className="estimator-bar-fill"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    key={`${tab}-${min}`}
                    transition={{ duration: 0.8, ease: easeOutExpo }}
                  />
                </div>
              </div>

              <Link
                href={`/teklif-al?type=${route}`}
                className="btn btn-gold estimator-cta"
              >
                Tam Teklif Al
                <ArrowRight size={18} strokeWidth={2.3} />
              </Link>

              <div className="estimator-sub-cta">
                Detayları görmek için Detay sayfasına bakın →{" "}
                <Link href={`/urunlerimiz/${route}`}>{TABS.find((t) => t.key === tab)?.label} sayfası</Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .estimator-section {
          padding: clamp(80px, 9vw, 130px) 0;
          background: var(--off-white);
          position: relative;
        }
        .estimator-header {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 32px;
          align-items: end;
          margin-bottom: 40px;
        }
        .estimator-disclaimer {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.82rem;
          color: var(--gray);
          font-weight: 500;
          line-height: 1.55;
          justify-self: end;
          max-width: 320px;
        }
        .estimator-disclaimer svg { flex-shrink: 0; margin-top: 2px; color: var(--gold-dark); }

        .estimator-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-radius: 28px;
          overflow: hidden;
          box-shadow: var(--shadow-elev);
        }

        .estimator-tabs {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-bottom: 1px solid var(--border);
          background: var(--off-white);
        }
        .estimator-tab {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 20px 12px;
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          font-family: var(--font-sans);
          font-weight: 700;
          font-size: 0.92rem;
          color: var(--gray);
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .estimator-tab:hover {
          color: var(--ink);
          background: rgba(255,255,255,0.6);
        }
        .estimator-tab.active {
          color: var(--ink);
          background: var(--white);
          border-bottom-color: var(--gold);
        }
        .estimator-tab.active svg { color: var(--gold-dark); }

        .estimator-body {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
        }
        .estimator-inputs {
          padding: 40px;
          border-right: 1px solid var(--border);
          min-height: 320px;
        }
        .estimator-inputs-grid {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .estimator-field { display: flex; flex-direction: column; gap: 8px; }
        .estimator-field-label {
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--ink);
          letter-spacing: 0.01em;
        }
        .estimator-field select {
          width: 100%;
          padding: 13px 16px;
          border-radius: 12px;
          background: var(--cream);
          border: 1px solid var(--border);
          color: var(--ink);
          font-family: var(--font-sans);
          font-size: 0.98rem;
          font-weight: 600;
          outline: none;
          cursor: pointer;
          transition: all 0.2s ease;
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath d='M4 6l4 4 4-4' stroke='%23545861' stroke-width='1.5' fill='none' stroke-linecap='round'/%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 16px center;
          background-size: 14px;
          padding-right: 40px;
        }
        .estimator-field select:focus {
          border-color: var(--gold);
          box-shadow: 0 0 0 3px var(--gold-glow);
        }
        .estimator-field input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background: var(--cream);
          outline: none;
          margin-top: 8px;
        }
        .estimator-field input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--gold-dark), var(--gold));
          cursor: pointer;
          border: 3px solid #fff;
          box-shadow: 0 4px 10px rgba(176,112,80,0.35);
          transition: transform 0.2s ease;
        }
        .estimator-field input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.15);
        }
        .estimator-field input[type="range"]::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--gold-dark), var(--gold));
          cursor: pointer;
          border: 3px solid #fff;
          box-shadow: 0 4px 10px rgba(176,112,80,0.35);
        }

        .estimator-result {
          padding: 40px;
          background: linear-gradient(160deg, var(--blue) 0%, var(--blue-deep) 100%);
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .estimator-result-label {
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--gold-dark);
        }
        .estimator-range {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .estimator-range-numbers {
          display: flex;
          align-items: baseline;
          flex-wrap: wrap;
          gap: 10px;
        }
        .estimator-num {
          font-size: clamp(1.8rem, 3vw, 2.5rem) !important;
          line-height: 1;
        }
        .estimator-dash {
          font-family: var(--font-display);
          font-weight: 400;
          font-size: clamp(1.6rem, 2.5vw, 2.2rem);
          color: var(--light-gray);
        }
        .estimator-range-meta {
          font-size: 0.86rem;
          color: var(--gray);
          font-weight: 500;
        }
        .estimator-range-meta strong {
          color: var(--ink);
          font-weight: 700;
          font-variant-numeric: tabular-nums;
        }

        .estimator-bar {
          margin-top: 6px;
          height: 6px;
          border-radius: 3px;
          background: var(--cream);
          overflow: hidden;
          position: relative;
        }
        .estimator-bar-fill {
          height: 100%;
          width: 100%;
          background: linear-gradient(90deg, var(--gold-dark) 0%, var(--gold) 50%, var(--gold-light) 100%);
          transform-origin: left;
          border-radius: 3px;
        }

        .estimator-cta {
          margin-top: 18px;
          width: 100%;
          padding: 1.05rem 1.6rem;
        }

        .estimator-sub-cta {
          font-size: 0.84rem;
          color: var(--gray);
          font-weight: 500;
          text-align: center;
        }
        .estimator-sub-cta a {
          color: var(--gold-dark);
          font-weight: 700;
          text-decoration: none;
        }
        .estimator-sub-cta a:hover { text-decoration: underline; }

        @media (max-width: 900px) {
          .estimator-header { grid-template-columns: 1fr; gap: 16px; }
          .estimator-disclaimer { justify-self: start; }
          .estimator-body { grid-template-columns: 1fr; }
          .estimator-inputs {
            border-right: none;
            border-bottom: 1px solid var(--border);
            padding: 28px 22px;
          }
          .estimator-result { padding: 28px 22px; }
          .estimator-tabs { grid-template-columns: repeat(4, 1fr); }
          .estimator-tab { padding: 16px 6px; font-size: 0.82rem; }
          .estimator-tab span { display: none; }
        }
        @media (max-width: 480px) {
          .estimator-card { border-radius: 20px; }
        }
        `,
      }} />
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="estimator-field">
      {label && <label className="estimator-field-label">{label}</label>}
      {children}
    </div>
  );
}
