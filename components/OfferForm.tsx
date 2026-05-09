"use client";

import { useState } from "react";
import { User, Phone, Check, Calendar, ArrowRight, ArrowLeft, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useOffers } from "@/lib/offers-context";
import { toast } from "sonner";

const steps = [
  { id: 1, label: "Kimlik" },
  { id: 2, label: "İletişim" },
  { id: 3, label: "Tamam" },
];

const formSchema = z.object({
  tcNo: z.string().length(11, "TC Kimlik No 11 haneli olmalıdır.").regex(/^[0-9]+$/, "Sadece rakam giriniz."),
  birthDate: z.string().min(1, "Doğum tarihi zorunludur."),
  phone: z.string().min(10, "Geçerli bir telefon numarası giriniz.").regex(/^[0-9\s]+$/, "Sadece rakam giriniz."),
  insuranceType: z.string().min(1, "Lütfen bir sigorta türü seçin."),
});

type FormData = z.infer<typeof formSchema>;

const InputField = ({ label, icon: Icon, error, ...rest }: any) => (
  <div className="of-field">
    <label>{label}</label>
    <div className="of-input-wrap">
      <Icon size={16} strokeWidth={1.5} className={error ? "of-icon of-icon--error" : "of-icon"} />
      <input {...rest} className={error ? "of-input of-input--error" : "of-input"} />
    </div>
    {error && <span className="of-error">{error}</span>}
    <style jsx>{`
      .of-field { display: flex; flex-direction: column; gap: 8px; }
      label {
        font-family: var(--font-sans);
        font-weight: 500;
        font-size: 0.78rem;
        color: var(--ink);
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }
      .of-input-wrap { position: relative; }
      :global(.of-icon) {
        position: absolute;
        left: 14px;
        top: 50%;
        transform: translateY(-50%);
        color: var(--muted);
      }
      :global(.of-icon--error) { color: #d4453a; }
      :global(.of-input) {
        width: 100%;
        padding: 14px 14px 14px 40px;
        border-radius: var(--radius-md);
        background: var(--white);
        border: 1px solid var(--hairline);
        color: var(--ink);
        font-family: var(--font-sans);
        font-size: 1rem;
        outline: none;
        transition: border-color 0.2s ease, box-shadow 0.2s ease;
      }
      :global(.of-input:focus) { border-color: var(--ink); box-shadow: 0 0 0 3px rgba(12,12,13,0.06); }
      :global(.of-input--error) { border-color: #d4453a; }
      .of-error { color: #d4453a; font-size: 0.8rem; font-weight: 500; }
    `}</style>
  </div>
);

export default function OfferForm() {
  const [step, setStep] = useState(1);
  const [offerId, setOfferId] = useState("");
  const { addOffer } = useOffers();

  const { control, handleSubmit, trigger, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { tcNo: "", birthDate: "", phone: "", insuranceType: "Kasko Sigortası" },
    mode: "onTouched"
  });

  const nextStep = async () => {
    let isValid = false;
    if (step === 1) isValid = await trigger(["tcNo", "birthDate"]);
    else if (step === 2) isValid = await trigger(["phone", "insuranceType"]);

    if (isValid) {
      if (step === 2) onSubmit(control._formValues as FormData);
      else setStep(s => s + 1);
    }
  };

  const onSubmit = (data: FormData) => {
    const id = addOffer({ tcNo: data.tcNo, birthDate: data.birthDate, phone: data.phone, insuranceType: data.insuranceType });
    setOfferId(id);
    setStep(3);
    toast.success("Teklif talebiniz başarıyla alındı!", {
      description: `Başvuru No: #${id.slice(0, 8)}`,
      duration: 5000,
    });
  };

  const handleDownloadPDF = async () => {
    try {
      const data = control._formValues as FormData;
      const { default: jsPDF } = await import("jspdf");
      await import("jspdf-autotable");

      const doc = new jsPDF();
      doc.setFontSize(20);
      doc.text("Alicilar Sigorta - Teklif Basvurusu", 14, 22);
      doc.setFontSize(11);
      doc.setTextColor(100);
      doc.text(`Basvuru No: #${offerId.slice(0, 8)}`, 14, 30);
      (doc as any).autoTable({
        startY: 40,
        head: [['Bilgi', 'Detay']],
        body: [
          ['TC Kimlik', data.tcNo],
          ['Dogum Tarihi', data.birthDate],
          ['Telefon', data.phone],
          ['Sigorta Turu', data.insuranceType],
          ['Durum', 'Degerlendiriliyor'],
        ],
        theme: 'plain',
        headStyles: { fillColor: [12, 12, 13], textColor: [255,255,255] },
      });
      doc.save(`basvuru_${offerId.slice(0, 8)}.pdf`);
      toast.success("PDF başarıyla indirildi!");
    } catch (error) {
      toast.error("PDF oluşturulurken bir hata oluştu.");
    }
  };

  return (
    <div className="of-card">
      {/* Editorial step indicator */}
      <div className="of-steps">
        {steps.map(({ id, label }) => (
          <div key={id} className={`of-step ${step >= id ? "is-active" : ""} ${step === id ? "is-current" : ""}`}>
            <span className="of-step__num">{String(id).padStart(2, "0")}</span>
            <span className="of-step__label">{label}</span>
          </div>
        ))}
        <div className="of-steps__rail">
          <div className="of-steps__rail-fill" style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="of-step-content">
            <h2 className="of-h2">Kişisel bilgileriniz</h2>
            <Controller name="tcNo" control={control} render={({ field }) => (
              <InputField {...field} label="TC Kimlik No" icon={User} type="text" inputMode="numeric" placeholder="12345678901" maxLength={11} error={errors.tcNo?.message} />
            )}/>
            <Controller name="birthDate" control={control} render={({ field }) => (
              <InputField {...field} label="Doğum Tarihi" icon={Calendar} type="date" error={errors.birthDate?.message} />
            )}/>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} className="of-step-content">
            <h2 className="of-h2">İletişim bilgileri</h2>
            <Controller name="phone" control={control} render={({ field }) => (
              <InputField {...field} label="Cep Telefonu" icon={Phone} type="tel" inputMode="numeric" placeholder="05xx xxx xx xx" error={errors.phone?.message} />
            )}/>
            <Controller name="insuranceType" control={control} render={({ field }) => (
              <div className="of-field">
                <label>Sigorta Türü</label>
                <select {...field} className="of-select">
                  <option value="Kasko Sigortası">Kasko Sigortası</option>
                  <option value="Trafik Sigortası">Trafik Sigortası</option>
                  <option value="Tamamlayıcı Sağlık Sigortası">Tamamlayıcı Sağlık Sigortası</option>
                  <option value="DASK & Konut Sigortası">DASK & Konut Sigortası</option>
                  <option value="Seyahat Sigortası">Seyahat Sigortası</option>
                  <option value="İş Yeri Sigortası">İş Yeri Sigortası</option>
                </select>
              </div>
            )}/>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="s3" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }} className="of-success">
            <div className="of-success__mark"><Check size={28} strokeWidth={1.75} /></div>
            <h2 className="of-success__title">Talebiniz <span className="gold">alındı</span>.</h2>
            {offerId && <div className="of-success__id">Başvuru No: <strong>#{offerId.slice(0, 8)}</strong></div>}
            <p className="of-success__text">
              Uzman ekibimiz 20+ şirketin tekliflerini analiz edip en kısa sürede size ulaşacak.
            </p>
            <div className="of-success__actions">
              <button onClick={() => window.location.href = "/"} className="btn btn-outline">Ana Sayfaya Dön</button>
              <button onClick={handleDownloadPDF} className="btn btn-gold"><FileText size={16} strokeWidth={1.5} /> PDF İndir</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {step < 3 && (
        <div className="of-nav">
          {step > 1 && (
            <button onClick={() => setStep(s => s - 1)} className="btn btn-outline" style={{ flex: 1 }}>
              <ArrowLeft size={16} strokeWidth={1.5} /> Geri
            </button>
          )}
          <button onClick={nextStep} className="btn btn-gold" style={{ flex: 2 }}>
            {step === 2 ? "Teklifleri Getir" : "Devam Et"} <ArrowRight size={16} strokeWidth={1.5} />
          </button>
        </div>
      )}

      <style jsx>{`
        .of-card {
          background: var(--white);
          border: 1px solid var(--hairline);
          border-radius: var(--radius-lg);
          padding: clamp(28px, 4vw, 56px);
        }

        .of-steps {
          position: relative;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          margin-bottom: clamp(36px, 5vw, 56px);
          padding-bottom: 24px;
          border-bottom: 1px solid var(--hairline);
        }
        .of-step {
          display: flex;
          flex-direction: column;
          gap: 4px;
          opacity: 0.4;
          transition: opacity 0.3s ease;
        }
        .of-step.is-active { opacity: 1; }
        .of-step__num {
          font-family: var(--font-serif);
          font-size: 1.05rem;
          color: var(--gold-dark);
          font-feature-settings: "tnum" 1, "lnum" 1;
        }
        .of-step__label {
          font-family: var(--font-sans);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--ink);
        }
        .of-steps__rail {
          position: absolute;
          left: 0; right: 0; bottom: -1px;
          height: 1px;
          background: transparent;
        }
        .of-steps__rail-fill {
          height: 1px;
          background: var(--ink);
          transition: width 0.5s ease;
        }

        .of-step-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .of-h2 {
          font-family: var(--font-serif);
          font-size: clamp(1.5rem, 3vw, 2rem);
          font-weight: 400;
          letter-spacing: -0.02em;
          color: var(--ink);
          margin: 0 0 4px;
        }

        :global(.of-field) { display: flex; flex-direction: column; gap: 8px; }
        :global(.of-field) label {
          font-family: var(--font-sans);
          font-weight: 500;
          font-size: 0.78rem;
          color: var(--ink);
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }
        .of-select {
          width: 100%;
          padding: 14px;
          border-radius: var(--radius-md);
          background: var(--white);
          border: 1px solid var(--hairline);
          color: var(--ink);
          font-family: var(--font-sans);
          font-size: 1rem;
          outline: none;
          appearance: none;
          cursor: pointer;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23767676' stroke-width='1.5'><polyline points='6 9 12 15 18 9'/></svg>");
          background-repeat: no-repeat;
          background-position: right 14px center;
          background-size: 18px;
          padding-right: 40px;
        }

        .of-success {
          text-align: center;
          padding: 8px 0;
        }
        .of-success__mark {
          width: 64px; height: 64px;
          border-radius: 50%;
          background: var(--ink);
          color: var(--gold-light);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 24px;
        }
        .of-success__title {
          font-family: var(--font-serif);
          font-size: clamp(1.75rem, 3.5vw, 2.5rem);
          font-weight: 400;
          letter-spacing: -0.02em;
          color: var(--ink);
          margin: 0 0 16px;
        }
        .of-success__title :global(.gold) { font-style: italic; color: var(--gold-dark); font-weight: 300; }
        .of-success__id {
          display: inline-block;
          font-family: var(--font-sans);
          font-size: 0.85rem;
          color: var(--muted);
          padding: 8px 16px;
          background: var(--cream);
          border-radius: 999px;
          margin-bottom: 20px;
        }
        .of-success__id strong { color: var(--ink); font-weight: 600; }
        .of-success__text {
          font-family: var(--font-sans);
          color: var(--muted);
          font-size: 1rem;
          line-height: 1.6;
          margin: 0 auto 32px;
          max-width: 440px;
        }
        .of-success__actions { display: flex; gap: 12px; }

        .of-nav {
          display: flex;
          gap: 12px;
          margin-top: 32px;
        }

        @media (max-width: 768px) {
          .of-success__actions { flex-direction: column; }
        }
      `}</style>
    </div>
  );
}
