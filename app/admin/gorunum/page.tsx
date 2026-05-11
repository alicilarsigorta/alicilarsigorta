"use client";

import { useState } from "react";
import { Image, Upload, Palette, RotateCcw, Save } from "lucide-react";
import { toast } from "sonner";

export default function GorunumPage() {
  const [logo, setLogo] = useState("/logo-dark.png");

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      setLogo(dataUrl);
      try {
        localStorage.setItem("alicilar_logo", dataUrl);
        toast.success("Logo güncellendi!");
      } catch {
        toast.error("Dosya çok büyük. Daha küçük bir logo deneyin.");
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <p style={{ color: "var(--admin-text-muted)", fontSize: "0.92rem", marginBottom: 28 }}>
        Sitenizin görsel ayarlarını buradan düzenleyin.
      </p>

      {/* Logo */}
      <div className="admin-card" style={{ marginBottom: 24 }}>
        <div className="admin-card-header">
          <h3 className="admin-card-title"><Image size={18} style={{ marginRight: 8 }} /> Logo Yönetimi</h3>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <div style={{
            width: 120, height: 120, borderRadius: 20,
            background: "var(--admin-bg)", border: "2px solid var(--admin-border)",
            display: "flex", alignItems: "center", justifyContent: "center",
            overflow: "hidden"
          }}>
            <img src={logo} alt="Logo" style={{ maxWidth: "80%", maxHeight: "80%", objectFit: "contain" }} />
          </div>
          <div>
            <p style={{ color: "var(--admin-text-muted)", fontSize: "0.9rem", marginBottom: 16 }}>
              PNG veya SVG formatında, şeffaf arka planlı logo önerilir.
            </p>
            <label className="admin-btn admin-btn-secondary admin-btn-sm" style={{ cursor: "pointer" }}>
              <Upload size={14} /> Logo Yükle
              <input type="file" accept="image/*" onChange={handleLogoUpload} style={{ display: "none" }} />
            </label>
          </div>
        </div>
      </div>

      {/* Color Theme Info */}
      <div className="admin-card" style={{ marginBottom: 24 }}>
        <div className="admin-card-header">
          <h3 className="admin-card-title"><Palette size={18} style={{ marginRight: 8 }} /> Renk Teması</h3>
        </div>
        <p style={{ color: "var(--admin-text-muted)", fontSize: "0.9rem", marginBottom: 20 }}>
          Mevcut premium altın tema renkleri:
        </p>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          {[
            { name: "Gold", color: "#d4a017" },
            { name: "Gold Light", color: "#f0c040" },
            { name: "Gold Dark", color: "#a07810" },
            { name: "Black", color: "#0a0a0a" },
            { name: "Dark", color: "#1a1a1a" },
            { name: "Cream", color: "#faf6ec" },
          ].map(c => (
            <div key={c.name} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 36, height: 36, borderRadius: 10,
                background: c.color, border: "2px solid var(--admin-border)"
              }} />
              <div>
                <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#fff" }}>{c.name}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--admin-text-dim)" }}>{c.color}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hero Image Info */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title"><Image size={18} style={{ marginRight: 8 }} /> Slider Görselleri</h3>
        </div>
        <p style={{ color: "var(--admin-text-muted)", fontSize: "0.9rem", marginBottom: 16 }}>
          Mevcut slider görselleri <code style={{ background: "var(--admin-bg)", padding: "2px 8px", borderRadius: 6 }}>/public</code> dizininde yer almaktadır.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {["/slider_car.png", "/slider_health.png", "/slider_house.png"].map((src, i) => (
            <div key={i} style={{
              borderRadius: 16, overflow: "hidden",
              border: "1px solid var(--admin-border)",
              background: "var(--admin-bg)", padding: 12
            }}>
              <img src={src} alt="" style={{ width: "100%", height: 140, objectFit: "contain", borderRadius: 10, marginBottom: 8 }} />
              <div style={{ fontSize: "0.8rem", color: "var(--admin-text-dim)", fontWeight: 600 }}>{src}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
