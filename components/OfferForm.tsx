"use client";

import { useState } from "react";
import { User, Phone, CheckCircle, Calendar, ArrowRight, ArrowLeft, FileText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useOffers } from "@/lib/offers-context";
import { toast } from "sonner";

const steps = [
  { id: 1, label: "Kimlik", icon: User },
  { id: 2, label: "İletişim", icon: Phone },
  { id: 3, label: "Tamam", icon: CheckCircle },
];

// Zod Schema for Validation
const formSchema = z.object({
  tcNo: z.string()
    .length(11, "TC Kimlik No 11 haneli olmalıdır.")
    .regex(/^[0-9]+$/, "Sadece rakam giriniz."),
  birthDate: z.string().min(1, "Doğum tarihi zorunludur."),
  phone: z.string()
    .min(10, "Geçerli bir telefon numarası giriniz.")
    .regex(/^[0-9\s]+$/, "Sadece rakam giriniz."),
  insuranceType: z.string().min(1, "Lütfen bir sigorta türü seçin."),
});

type FormData = z.infer<typeof formSchema>;

const InputField = ({ label, icon: Icon, error, ...rest }: any) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
    <label style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--dark)" }}>{label}</label>
    <div style={{ position: "relative" }}>
      <Icon size={18} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: error ? "red" : "var(--gold)" }} />
      <input
        {...rest}
        style={{ width: "100%", padding: "15px 16px 15px 48px", borderRadius: 14, background: "var(--cream)", border: `1px solid ${error ? "red" : "var(--border)"}`, color: "var(--dark)", fontSize: "1rem", outline: "none", fontFamily: "Outfit, sans-serif", transition: "border 0.2s, box-shadow 0.2s" }}
        onFocus={e => { if(!error) { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.boxShadow = "0 0 0 3px var(--gold-glow)"; } }}
        onBlur={e => { if(!error) { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; } }}
      />
    </div>
    {error && <span style={{ color: "red", fontSize: "0.8rem", fontWeight: 500 }}>{error}</span>}
  </div>
);

export default function OfferForm() {
  const [step, setStep] = useState(1);
  const [offerId, setOfferId] = useState("");
  const { addOffer } = useOffers();

  const { control, handleSubmit, trigger, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tcNo: "",
      birthDate: "",
      phone: "",
      insuranceType: "Kasko Sigortası",
    },
    mode: "onTouched"
  });

  const nextStep = async () => {
    let isValid = false;
    if (step === 1) {
      isValid = await trigger(["tcNo", "birthDate"]);
    } else if (step === 2) {
      isValid = await trigger(["phone", "insuranceType"]);
    }

    if (isValid) {
      if (step === 2) {
        onSubmit(control._formValues as FormData);
      } else {
        setStep(s => s + 1);
      }
    }
  };

  const onSubmit = (data: FormData) => {
    const id = addOffer({
      tcNo: data.tcNo,
      birthDate: data.birthDate,
      phone: data.phone,
      insuranceType: data.insuranceType,
    });
    setOfferId(id);
    setStep(3);
    toast.success("Teklif talebiniz başarıyla alındı! 🎉", {
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
        theme: 'striped',
        headStyles: { fillColor: [212, 175, 55] },
      });

      doc.save(`basvuru_${offerId.slice(0, 8)}.pdf`);
      toast.success("PDF başarıyla indirildi!");
    } catch (error) {
      toast.error("PDF oluşturulurken bir hata oluştu.");
    }
  };

  return (
    <div className="card" style={{ padding: "3rem", border: "1px solid var(--border)" }}>

      {/* Step Indicator */}
      <div style={{ display: "flex", justifyContent: "space-between", position: "relative", marginBottom: 48 }}>
        <div style={{ position: "absolute", top: 20, left: "10%", right: "10%", height: 3, background: "var(--border)", zIndex: 0 }} />
        <div style={{ position: "absolute", top: 20, left: "10%", height: 3, background: "linear-gradient(90deg, var(--gold), var(--gold-light))", zIndex: 0, width: `${((step - 1) / (steps.length - 1)) * 80}%`, transition: "width 0.5s ease" }} />

        {steps.map(({ id, label, icon: Icon }) => (
          <div key={id} style={{ zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: step >= id ? "linear-gradient(135deg, var(--gold), var(--gold-light))" : "var(--white)", border: step >= id ? "none" : "2px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.4s", boxShadow: step >= id ? "0 6px 20px var(--gold-glow)" : "none" }}>
              <Icon size={20} color={step >= id ? "#fff" : "var(--gray)"} />
            </div>
            <span style={{ fontSize: "0.8rem", fontWeight: 800, color: step >= id ? "var(--gold-dark)" : "var(--gray)" }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Steps */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 900, color: "var(--black)" }}>Kişisel Bilgileriniz</h2>
            
            <Controller
              name="tcNo"
              control={control}
              render={({ field }) => (
                <InputField {...field} label="TC Kimlik No" icon={User} type="text" placeholder="12345678901" maxLength={11} error={errors.tcNo?.message} />
              )}
            />

            <Controller
              name="birthDate"
              control={control}
              render={({ field }) => (
                <InputField {...field} label="Doğum Tarihi" icon={Calendar} type="date" error={errors.birthDate?.message} />
              )}
            />
          </motion.div>
        )}
        
        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 900, color: "var(--black)" }}>İletişim Bilgileri</h2>
            
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <InputField {...field} label="Cep Telefonu" icon={Phone} type="tel" placeholder="05xx xxx xx xx" error={errors.phone?.message} />
              )}
            />

            <Controller
              name="insuranceType"
              control={control}
              render={({ field }) => (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <label style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--dark)" }}>Sigorta Türü</label>
                  <select {...field} style={{ width: "100%", padding: "15px 16px", borderRadius: 14, background: "var(--cream)", border: "1px solid var(--border)", color: "var(--dark)", fontSize: "1rem", outline: "none", fontFamily: "Outfit, sans-serif", appearance: "none", cursor: "pointer" }}>
                    <option value="Kasko Sigortası">Kasko Sigortası</option>
                    <option value="Trafik Sigortası">Trafik Sigortası</option>
                    <option value="Tamamlayıcı Sağlık Sigortası">Tamamlayıcı Sağlık Sigortası</option>
                    <option value="DASK & Konut Sigortası">DASK & Konut Sigortası</option>
                    <option value="Seyahat Sigortası">Seyahat Sigortası</option>
                    <option value="İş Yeri Sigortası">İş Yeri Sigortası</option>
                  </select>
                </div>
              )}
            />
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="s3" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, type: "spring" }} style={{ textAlign: "center", padding: "20px 0" }}>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.6, delay: 0.1 }}
              style={{ width: 90, height: 90, borderRadius: "50%", background: "linear-gradient(135deg, var(--gold), var(--gold-light))", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 28px", boxShadow: "0 20px 50px var(--gold-glow)" }}
            >
              <CheckCircle size={44} color="#fff" />
            </motion.div>
            <h2 style={{ fontSize: "2rem", fontWeight: 900, color: "var(--black)", marginBottom: 16 }}>Harika! Tebrikler!</h2>
            {offerId && (
              <div style={{ 
                display: "inline-block", background: "var(--cream)", 
                border: "1px solid var(--gold)", borderRadius: 12, 
                padding: "12px 24px", marginBottom: 20, fontWeight: 800,
                color: "var(--gold-dark)", fontSize: "0.95rem"
              }}>
                Başvuru No: #{offerId.slice(0, 8)}
              </div>
            )}
            <p style={{ color: "var(--gray)", marginBottom: 36, fontSize: "1.05rem", lineHeight: 1.75 }}>
              Talebiniz alındı. Uzman ekibimiz 20+ şirketin tekliflerini analiz edip en kısa sürede size ulaşacak.
            </p>
            <div style={{ display: "flex", gap: 16 }}>
              <button onClick={() => window.location.href = "/"} className="btn btn-outline" style={{ flex: 1 }}>
                Ana Sayfaya Dön
              </button>
              <button onClick={handleDownloadPDF} className="btn btn-gold" style={{ flex: 1, gap: 8 }}>
                <FileText size={18} /> PDF İndir
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      {step < 3 && (
        <div style={{ display: "flex", gap: 16, marginTop: 40 }}>
          {step > 1 && (
            <button onClick={() => setStep(s => s - 1)} className="btn btn-outline" style={{ flex: 1, padding: "1.1rem" }}>
              <ArrowLeft size={18} /> Geri
            </button>
          )}
          <button onClick={nextStep} className="btn btn-gold" style={{ flex: 2, padding: "1.1rem" }}>
            {step === 2 ? "Teklifleri Getir" : "Devam Et"} <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
