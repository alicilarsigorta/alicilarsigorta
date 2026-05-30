"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Clock, BadgePercent, Check } from "lucide-react";
import { toast } from "sonner";
import { viewportOnce, easeOutExpo } from "@/lib/motion";

const BRANCHES = [
  "Kasko",
  "Trafik Sigortası",
  "Tamamlayıcı Sağlık",
  "Konut Sigortası",
  "DASK",
  "İş Yeri Sigortası",
  "Seyahat Sağlık",
  "Özel Sağlık",
];

/**
 * QuickQuote — "teklif alma yeri".
 * Compact callback-style lead form: branch + name + phone -> success toast.
 * Sits right under the hero as the primary conversion block.
 */
export default function QuickQuote() {
  const [branch, setBranch] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const formatPhone = (v: string) => {
    const d = v.replace(/\D/g, "").slice(0, 11);
    if (d.length <= 4) return d;
    if (d.length <= 7) return `${d.slice(0, 4)} ${d.slice(4)}`;
    if (d.length <= 9) return `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7)}`;
    return `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7, 9)} ${d.slice(9)}`;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const digits = phone.replace(/\D/g, "");
    if (!branch) return toast.error("Lütfen bir branş seçin.");
    if (name.trim().length < 3) return toast.error("Lütfen adınızı ve soyadınızı girin.");
    if (digits.length < 10) return toast.error("Lütfen geçerli bir telefon numarası girin.");

    setSubmitting(true);
    // Simulate quick request — a real callback request, friendly confirmation.
    setTimeout(() => {
      toast.success("Talebiniz alındı! Uzman danışmanımız en kısa sürede sizi arayacak.");
      setBranch("");
      setName("");
      setPhone("");
      setSubmitting(false);
    }, 600);
  };

  return (
    <section className="qq-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.7, ease: easeOutExpo }}
          className="qq-card"
        >
          {/* LEFT — pitch */}
          <div className="qq-left">
            <span className="qq-eyebrow">Ücretsiz · 2 Dakika</span>
            <h2 className="qq-title">Hemen ücretsiz teklif alın</h2>
            <p className="qq-sub">
              Formu doldurun, uzman danışmanımız en uygun teklifi hazırlayıp sizi arasın.
            </p>
            <ul className="qq-points">
              <li><span className="qq-point-ic"><BadgePercent size={15} /></span> 20+ şirket arasında en iyi fiyat</li>
              <li><span className="qq-point-ic"><Clock size={15} /></span> Dakikalar içinde dönüş</li>
              <li><span className="qq-point-ic"><ShieldCheck size={15} /></span> Komisyonsuz, baskısız, şeffaf</li>
            </ul>
          </div>

          {/* RIGHT — form */}
          <form className="qq-form" onSubmit={onSubmit} noValidate>
            <div className="qq-field">
              <label htmlFor="qq-branch">Hangi sigorta?</label>
              <select
                id="qq-branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className={branch ? "" : "qq-placeholder"}
              >
                <option value="" disabled>Branş seçin</option>
                {BRANCHES.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>

            <div className="qq-field">
              <label htmlFor="qq-name">Ad Soyad</label>
              <input
                id="qq-name"
                type="text"
                placeholder="Adınız ve soyadınız"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </div>

            <div className="qq-field">
              <label htmlFor="qq-phone">Telefon</label>
              <input
                id="qq-phone"
                type="tel"
                inputMode="numeric"
                placeholder="05XX XXX XX XX"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                autoComplete="tel"
              />
            </div>

            <button type="submit" className="btn btn-gold qq-submit" disabled={submitting}>
              {submitting ? "Gönderiliyor…" : (<>Ücretsiz Teklif Al <ArrowRight size={17} strokeWidth={2.3} /></>)}
            </button>

            <p className="qq-kvkk">
              <Check size={12} strokeWidth={2.6} /> Bilgileriniz KVKK kapsamında korunur, 3. taraflarla paylaşılmaz.
            </p>
          </form>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .qq-section {
          background: var(--bg);
          padding: clamp(20px, 4vw, 48px) 0 clamp(40px, 6vw, 72px);
        }
        .qq-card {
          display: grid;
          grid-template-columns: 0.82fr 1.18fr;
          border-radius: var(--radius-xl);
          overflow: hidden;
          box-shadow: var(--shadow-elev);
          border: 1px solid var(--border);
          background: var(--surface);
        }

        /* LEFT */
        .qq-left {
          background: linear-gradient(150deg, var(--blue) 0%, var(--blue-deep) 100%);
          color: #fff;
          padding: clamp(28px, 4vw, 44px);
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .qq-left::after {
          content: "";
          position: absolute;
          top: -30%; right: -20%;
          width: 360px; height: 360px;
          background: radial-gradient(circle, rgba(255,115,0,0.28) 0%, transparent 62%);
          pointer-events: none;
        }
        .qq-eyebrow {
          position: relative;
          font-size: 0.74rem; font-weight: 700;
          letter-spacing: 0.16em; text-transform: uppercase;
          color: rgba(255,255,255,0.85);
          margin-bottom: 14px;
        }
        .qq-title {
          position: relative;
          font-size: clamp(1.5rem, 2.6vw, 2.1rem);
          font-weight: 800; letter-spacing: -0.025em;
          line-height: 1.12; margin-bottom: 12px;
        }
        .qq-sub {
          position: relative;
          font-size: 0.98rem; line-height: 1.6;
          color: rgba(255,255,255,0.9);
          margin-bottom: 24px; max-width: 360px;
        }
        .qq-points {
          position: relative;
          list-style: none; display: flex; flex-direction: column; gap: 12px;
        }
        .qq-points li {
          display: flex; align-items: center; gap: 11px;
          font-size: 0.92rem; font-weight: 500;
          color: rgba(255,255,255,0.95);
        }
        .qq-point-ic {
          width: 28px; height: 28px; border-radius: 8px;
          background: rgba(255,255,255,0.16);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        /* RIGHT — form */
        .qq-form {
          padding: clamp(24px, 3.4vw, 40px);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px 18px;
          align-content: center;
        }
        .qq-field { display: flex; flex-direction: column; gap: 7px; }
        .qq-field:nth-child(1) { grid-column: 1 / -1; }
        .qq-field label {
          font-size: 0.82rem; font-weight: 700; color: var(--ink-soft);
          letter-spacing: -0.005em;
        }
        .qq-field input, .qq-field select {
          height: 50px;
          border: 1.5px solid var(--border-strong);
          border-radius: 12px;
          padding: 0 14px;
          font-size: 0.98rem;
          font-family: var(--font-sans);
          color: var(--ink);
          background: var(--surface);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          width: 100%;
        }
        .qq-field select.qq-placeholder { color: var(--text-muted); }
        .qq-field input::placeholder { color: var(--text-muted); }
        .qq-field input:focus, .qq-field select:focus {
          outline: none;
          border-color: var(--blue);
          box-shadow: 0 0 0 3px var(--blue-soft);
        }
        .qq-submit {
          grid-column: 1 / -1;
          width: 100%;
          height: 52px;
          font-size: 1rem;
          margin-top: 4px;
        }
        .qq-kvkk {
          grid-column: 1 / -1;
          display: flex; align-items: center; gap: 6px;
          font-size: 0.76rem; color: var(--text-muted);
          line-height: 1.4;
        }
        .qq-kvkk svg { color: #22c55e; flex-shrink: 0; }

        @media (max-width: 920px) {
          .qq-card { grid-template-columns: 1fr; }
          .qq-left { padding: 28px; }
        }
        @media (max-width: 540px) {
          .qq-form { grid-template-columns: 1fr; gap: 14px; }
        }
      ` }} />
    </section>
  );
}
