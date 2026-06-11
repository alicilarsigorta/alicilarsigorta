"use client";

import { useEffect, useState } from "react";
import { Bell, BellRing, BellOff, Send } from "lucide-react";
import { toast } from "sonner";

const VAPID = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || "";

function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  const arr = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) arr[i] = raw.charCodeAt(i);
  return arr;
}

type State = "loading" | "unsupported" | "config" | "off" | "on";

export default function PushToggle() {
  const [state, setState] = useState<State>("loading");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    (async () => {
      if (typeof window === "undefined" || !("serviceWorker" in navigator) || !("PushManager" in window) || !("Notification" in window)) {
        setState("unsupported");
        return;
      }
      if (!VAPID) {
        setState("config");
        return;
      }
      try {
        const reg = await navigator.serviceWorker.ready;
        const sub = await reg.pushManager.getSubscription();
        setState(sub && Notification.permission === "granted" ? "on" : "off");
      } catch {
        setState("off");
      }
    })();
  }, []);

  const enable = async () => {
    setBusy(true);
    try {
      const perm = await Notification.requestPermission();
      if (perm !== "granted") {
        toast.error("Bildirim izni verilmedi. Tarayıcı ayarlarından açabilirsin.");
        setBusy(false);
        return;
      }
      const reg = await navigator.serviceWorker.ready;
      let sub = await reg.pushManager.getSubscription();
      if (!sub) {
        sub = await reg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(VAPID) as BufferSource,
        });
      }
      const res = await fetch("/api/push/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sub.toJSON()),
      });
      if (!res.ok) throw new Error();
      setState("on");
      toast.success("Bildirimler açıldı! Yeni teklifler bu cihaza düşecek.");
    } catch {
      toast.error("Bildirimler açılamadı. Lütfen tekrar dene.");
    } finally {
      setBusy(false);
    }
  };

  const disable = async () => {
    setBusy(true);
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      if (sub) {
        await fetch("/api/push/subscribe", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ endpoint: sub.endpoint }),
        });
        await sub.unsubscribe();
      }
      setState("off");
      toast.success("Bildirimler kapatıldı.");
    } catch {
      toast.error("İşlem başarısız.");
    } finally {
      setBusy(false);
    }
  };

  const test = async () => {
    setBusy(true);
    try {
      const res = await fetch("/api/push/test", { method: "POST" });
      const d = await res.json().catch(() => ({}));
      if (res.ok) toast.success(`Test gönderildi (${d.sent ?? 0} cihaz).`);
      else toast.error(d.error || "Test gönderilemedi.");
    } catch {
      toast.error("Test gönderilemedi.");
    } finally {
      setBusy(false);
    }
  };

  if (state === "loading") return null;

  if (state === "unsupported") {
    return (
      <div className="push-banner push-banner-muted">
        <span className="push-banner-ic"><BellOff size={20} /></span>
        <div className="push-banner-text">
          <strong>Bildirimler bu cihazda kullanılamıyor</strong>
          <span>iPhone&apos;da: Safari → Paylaş → &quot;Ana Ekrana Ekle&quot; ile uygulama olarak kurup, açılan uygulamadan tekrar dene. Android&apos;de Chrome ile aç.</span>
        </div>
      </div>
    );
  }

  if (state === "config") {
    return (
      <div className="push-banner push-banner-muted">
        <span className="push-banner-ic"><BellOff size={20} /></span>
        <div className="push-banner-text">
          <strong>Bildirim altyapısı henüz ayarlı değil</strong>
          <span>Vercel ortam değişkenlerine VAPID anahtarları eklenmeli: NEXT_PUBLIC_VAPID_PUBLIC_KEY ve VAPID_PRIVATE_KEY. Eklenip yeniden dağıtıldıktan sonra burası &quot;Bildirimleri Aç&quot;a döner.</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`push-banner ${state === "on" ? "push-banner-on" : ""}`}>
      <span className="push-banner-ic">{state === "on" ? <BellRing size={20} /> : <Bell size={20} />}</span>
      <div className="push-banner-text">
        <strong>{state === "on" ? "Bildirimler açık" : "Telefonuna anlık bildirim al"}</strong>
        <span>
          {state === "on"
            ? "Yeni teklif geldiğinde bu cihaza bildirim düşer."
            : "Aç’a basıp izin ver — yeni teklifler anında telefonuna gelsin."}
        </span>
      </div>
      <div className="push-banner-actions">
        {state === "on" ? (
          <>
            <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={test} disabled={busy}>
              <Send size={14} /> Test
            </button>
            <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={disable} disabled={busy}>
              Kapat
            </button>
          </>
        ) : (
          <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={enable} disabled={busy}>
            <Bell size={14} /> {busy ? "Açılıyor…" : "Bildirimleri Aç"}
          </button>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .push-banner {
          display: flex; align-items: center; gap: 14px;
          padding: 16px 18px; margin-bottom: 24px;
          background: var(--admin-surface-2, #161922);
          border: 1px solid var(--admin-border, rgba(255,255,255,0.08));
          border-radius: 16px;
        }
        .push-banner-on { border-color: rgba(16,185,129,0.4); background: rgba(16,185,129,0.06); }
        .push-banner-muted { opacity: 0.85; }
        .push-banner-ic {
          width: 42px; height: 42px; border-radius: 11px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: rgba(212,160,23,0.14); color: #e0b53e;
        }
        .push-banner-on .push-banner-ic { background: rgba(16,185,129,0.16); color: #10b981; }
        .push-banner-text { display: flex; flex-direction: column; gap: 2px; flex: 1; min-width: 0; }
        .push-banner-text strong { color: #fff; font-size: 0.96rem; }
        .push-banner-text span { color: var(--admin-text-muted, #98a2b3); font-size: 0.82rem; }
        .push-banner-actions { display: flex; gap: 8px; flex-shrink: 0; }
        @media (max-width: 640px) {
          .push-banner { flex-wrap: wrap; }
          .push-banner-actions { width: 100%; }
          .push-banner-actions button { flex: 1; justify-content: center; }
        }
      ` }} />
    </div>
  );
}
