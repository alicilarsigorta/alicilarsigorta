"use client";

import { useState } from "react";
import { Key, Download, Upload, Database, Shield, RefreshCw } from "lucide-react";
import { useContent } from "@/lib/content-context";
import { useOffers } from "@/lib/offers-context";
import { toast } from "sonner";
import { format } from "date-fns";

export default function AyarlarPage() {
  const { content, updateContent, resetContent } = useContent();
  const { offers, exportData, importData } = useOffers();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleExportAll = () => {
    const allData = {
      content,
      offers,
      exportedAt: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(allData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `alicilar_backup_${format(new Date(), "yyyy-MM-dd_HHmm")}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Tüm veriler dışa aktarıldı!");
  };

  const handleImportAll = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target?.result as string);
          if (data.content) updateContent(data.content);
          if (data.offers) importData(JSON.stringify(data.offers));
          toast.success("Yedek başarıyla geri yüklendi!");
          setTimeout(() => window.location.reload(), 1000);
        } catch {
          toast.error("Geçersiz yedek dosyası.");
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  const handleResetAll = () => {
    if (confirm("TÜM VERİLERİ SIFIRLAMAK istediğinize emin misiniz? Bu işlem geri alınamaz!")) {
      localStorage.clear();
      toast.success("Tüm veriler sıfırlandı. Sayfa yenileniyor...");
      setTimeout(() => window.location.reload(), 1000);
    }
  };

  return (
    <div>
      <p style={{ color: "var(--admin-text-muted)", fontSize: "0.92rem", marginBottom: 28 }}>
        Sistem ayarları ve veri yönetimi.
      </p>

      {/* Security */}
      <div className="admin-card" style={{ marginBottom: 24 }}>
        <div className="admin-card-header">
          <h3 className="admin-card-title"><Shield size={18} style={{ marginRight: 8 }} /> Güvenlik</h3>
        </div>
        <p style={{ color: "var(--admin-text-muted)", fontSize: "0.9rem", marginBottom: 20 }}>
          Admin paneline giriş şifresi: <code style={{ background: "var(--admin-bg)", padding: "2px 8px", borderRadius: 6 }}>alicilar2024</code>
        </p>
        <p style={{ color: "var(--admin-text-dim)", fontSize: "0.82rem" }}>
          Şifreyi değiştirmek için <code>/app/admin/login/page.tsx</code> dosyasındaki <code>ADMIN_PASSWORD</code> değişkenini güncelleyin.
        </p>
      </div>

      {/* Data Management */}
      <div className="admin-card" style={{ marginBottom: 24 }}>
        <div className="admin-card-header">
          <h3 className="admin-card-title"><Database size={18} style={{ marginRight: 8 }} /> Veri Yönetimi</h3>
        </div>
        <p style={{ color: "var(--admin-text-muted)", fontSize: "0.9rem", marginBottom: 20 }}>
          Tüm site verileri (içerik + teklifler) tarayıcınızın localStorage&apos;ında saklanır. 
          Verilerinizi yedeklemeyi unutmayın.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          <div style={{
            background: "var(--admin-bg)", borderRadius: 16, padding: 24,
            border: "1px solid var(--admin-border)", textAlign: "center"
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14,
              background: "rgba(16,185,129,0.1)", color: "var(--admin-green)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 16px"
            }}>
              <Download size={24} />
            </div>
            <h4 style={{ fontWeight: 800, color: "#fff", marginBottom: 8, fontSize: "0.95rem" }}>Yedeği Dışa Aktar</h4>
            <p style={{ color: "var(--admin-text-dim)", fontSize: "0.82rem", marginBottom: 16 }}>
              Tüm verileri JSON olarak indirin.
            </p>
            <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={handleExportAll} style={{ width: "100%", justifyContent: "center" }}>
              <Download size={14} /> Dışa Aktar
            </button>
          </div>

          <div style={{
            background: "var(--admin-bg)", borderRadius: 16, padding: 24,
            border: "1px solid var(--admin-border)", textAlign: "center"
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14,
              background: "rgba(59,130,246,0.1)", color: "var(--admin-blue)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 16px"
            }}>
              <Upload size={24} />
            </div>
            <h4 style={{ fontWeight: 800, color: "#fff", marginBottom: 8, fontSize: "0.95rem" }}>Yedeği Geri Yükle</h4>
            <p style={{ color: "var(--admin-text-dim)", fontSize: "0.82rem", marginBottom: 16 }}>
              Daha önce aldığınız yedeği yükleyin.
            </p>
            <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={handleImportAll} style={{ width: "100%", justifyContent: "center" }}>
              <Upload size={14} /> Geri Yükle
            </button>
          </div>

          <div style={{
            background: "var(--admin-bg)", borderRadius: 16, padding: 24,
            border: "1px solid rgba(239,68,68,0.2)", textAlign: "center"
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: 14,
              background: "rgba(239,68,68,0.1)", color: "var(--admin-red)",
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 16px"
            }}>
              <RefreshCw size={24} />
            </div>
            <h4 style={{ fontWeight: 800, color: "#fff", marginBottom: 8, fontSize: "0.95rem" }}>Tümünü Sıfırla</h4>
            <p style={{ color: "var(--admin-text-dim)", fontSize: "0.82rem", marginBottom: 16 }}>
              Tüm verileri varsayılana döndürün.
            </p>
            <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={handleResetAll} style={{ width: "100%", justifyContent: "center" }}>
              <RefreshCw size={14} /> Sıfırla
            </button>
          </div>
        </div>
      </div>

      {/* System Info */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Sistem Bilgileri</h3>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[
            { label: "Platform", value: "Next.js 16 (Turbopack)" },
            { label: "Depolama", value: "LocalStorage (Vercel uyumlu)" },
            { label: "Toplam Teklif", value: `${offers.length} adet` },
            { label: "Versiyon", value: "1.0.0" },
          ].map(info => (
            <div key={info.label} style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid var(--admin-border)" }}>
              <span style={{ color: "var(--admin-text-muted)", fontSize: "0.88rem" }}>{info.label}</span>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: "0.88rem" }}>{info.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
