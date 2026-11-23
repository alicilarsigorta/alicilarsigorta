"use client";

import { useState } from "react";
import { toast } from "sonner";
import Mascot from "@/components/Mascot";

const field: React.CSSProperties = {
  width: "100%", padding: "1rem", borderRadius: 12, border: "1px solid var(--border)",
  background: "var(--cream)", outline: "none", fontSize: "1rem", fontFamily: "inherit", color: "var(--ink)",
};
const label: React.CSSProperties = { fontWeight: 700, fontSize: "0.9rem" };
const group: React.CSSProperties = { display: "flex", flexDirection: "column", gap: "0.5rem" };

/**
 * İletişim formu. Mesaj, teklifler ile aynı kanala (/api/offers) düşer;
 * böylece admin panelinde görünür ve anlık bildirim gönderilir.
 */
export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    if (name.trim().length < 3) return toast.error("Lütfen adınızı ve soyadınızı yazın.");
    if (phone.replace(/\D/g, "").length < 10) return toast.error("Lütfen geçerli bir telefon numarası yazın.");
    if (message.trim().length < 5) return toast.error("Lütfen mesajınızı yazın.");

    setSending(true);
    try {
      const res = await fetch("/api/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          insuranceType: "İletişim Mesajı",
          notes: message.trim(),
          source: "iletisim",
        }),
      });
      if (!res.ok) throw new Error();
      setSent(true);
    } catch {
      toast.error("Mesaj gönderilemedi. Lütfen tekrar deneyin veya bizi arayın.");
    } finally {
      setSending(false);
    }
  };

  if (sent) {
    return (
      <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
        <Mascot pose="ok" height={140} alt="Aliş onay işareti yapıyor" style={{ margin: "0 auto 16px", display: "block" }} />
        <h3 style={{ fontSize: "1.4rem", fontWeight: 900, marginBottom: 8 }}>Mesajınız bize ulaştı</h3>
        <p style={{ color: "var(--gray)", lineHeight: 1.7 }}>
          En kısa sürede {phone.trim()} numarasından size dönüş yapacağız.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
      <div style={group}>
        <label htmlFor="cf-name" style={label}>Adınız Soyadınız</label>
        <input id="cf-name" type="text" autoComplete="name" placeholder="Örn: Ahmet Yılmaz" value={name} onChange={(e) => setName(e.target.value)} style={field} />
      </div>
      <div style={group}>
        <label htmlFor="cf-phone" style={label}>Telefon Numaranız</label>
        <input id="cf-phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="05XX XXX XX XX" value={phone} onChange={(e) => setPhone(e.target.value)} style={field} />
      </div>
      <div style={group}>
        <label htmlFor="cf-message" style={label}>Mesajınız</label>
        <textarea id="cf-message" rows={5} placeholder="Size nasıl yardımcı olabiliriz?" value={message} onChange={(e) => setMessage(e.target.value)} style={{ ...field, resize: "vertical" }} />
      </div>
      <button type="submit" className="btn btn-gold" disabled={sending} style={{ width: "100%", padding: "1.2rem", marginTop: "0.5rem" }}>
        {sending ? "Gönderiliyor…" : "Mesajı Gönder"}
      </button>
    </form>
  );
}
