"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Eye, EyeOff, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const ADMIN_PASSWORD = "alicilar2024";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate a small delay for UX
    await new Promise(r => setTimeout(r, 500));

    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem("admin_auth", "true");
      toast.success("Giriş başarılı! Yönlendiriliyorsunuz...");
      setTimeout(() => router.push("/admin"), 600);
    } else {
      toast.error("Hatalı şifre. Lütfen tekrar deneyin.");
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-glow" />
      
      <div className="admin-login-card">
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <div style={{
            width: 72, height: 72, borderRadius: 20,
            background: "linear-gradient(135deg, var(--admin-gold), var(--admin-gold-light))",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 20px", boxShadow: "0 20px 50px rgba(212,160,23,0.2)"
          }}>
            <Shield size={36} color="#fff" />
          </div>
          <h1 style={{ fontSize: "1.6rem", fontWeight: 900, color: "#fff", marginBottom: 8, letterSpacing: "-0.03em" }}>
            Admin Panel
          </h1>
          <p style={{ color: "var(--admin-text-muted)", fontSize: "0.92rem" }}>
            Alıcılar Sigorta Yönetim Paneli
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 24 }}>
            <label className="admin-label">Yönetici Şifresi</label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••"
                className="admin-input"
                style={{ paddingRight: 48 }}
                autoFocus
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)",
                  background: "none", border: "none", color: "var(--admin-text-dim)",
                  cursor: "pointer", padding: 4
                }}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="admin-btn admin-btn-primary"
            disabled={loading}
            style={{
              width: "100%", padding: "14px", fontSize: "1rem",
              justifyContent: "center", opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Giriş Yapılıyor..." : "Giriş Yap"}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: 32, fontSize: "0.78rem", color: "var(--admin-text-dim)" }}>
          © 2025 Alıcılar Sigorta — Yetkisiz giriş yasaktır.
        </p>
      </div>
    </div>
  );
}
