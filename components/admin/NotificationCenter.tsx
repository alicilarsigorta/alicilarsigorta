"use client";

import { useState, useEffect, useCallback } from "react";
import { Bell, X, FileText, Smartphone, Download } from "lucide-react";
import { useOffers } from "@/lib/offers-context";
import { useRouter } from "next/navigation";

const OFFERS_KEY = "alicilar_offers";
const LAST_COUNT_KEY = "alicilar_notif_last_count";

interface InAppNotif {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
}

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<InAppNotif[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [latestNotif, setLatestNotif] = useState<InAppNotif | null>(null);
  const { offers, stats } = useOffers();
  const router = useRouter();

  // Monitor for new offers
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkNewOffers = () => {
      try {
        const currentOffers = JSON.parse(localStorage.getItem(OFFERS_KEY) || "[]");
        const lastCount = parseInt(localStorage.getItem(LAST_COUNT_KEY) || "0", 10);

        if (currentOffers.length > lastCount && lastCount > 0) {
          const diff = currentOffers.length - lastCount;
          const latest = currentOffers[0];
          const notif: InAppNotif = {
            id: latest.id || Date.now().toString(),
            title: `🔔 ${diff} Yeni Teklif!`,
            body: `${latest.insuranceType} — ${latest.phone}`,
            time: new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }),
            read: false,
          };

          setNotifications(prev => [notif, ...prev].slice(0, 20));
          setLatestNotif(notif);
          setShowBanner(true);

          // Auto-hide banner after 5s
          setTimeout(() => setShowBanner(false), 5000);

          // Browser notification
          if ("Notification" in window && Notification.permission === "granted") {
            try {
              if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
                navigator.serviceWorker.ready.then((reg) => {
                  reg.showNotification(notif.title, {
                    body: notif.body,
                    icon: "/icons/icon-192.svg",
                    badge: "/icons/icon-72.svg",
                    vibrate: [200, 100, 200],
                    tag: "new-offer-" + notif.id,
                    data: { url: "/admin/teklifler" },
                    requireInteraction: true,
                  } as NotificationOptions);
                });
              } else {
                new Notification(notif.title, {
                  body: notif.body,
                  icon: "/icons/icon-192.svg",
                  tag: "new-offer-" + notif.id,
                });
              }
            } catch {
              // Fallback — only in-app notification
            }
          }
        }

        localStorage.setItem(LAST_COUNT_KEY, String(currentOffers.length));
      } catch {
        // Ignore
      }
    };

    // Check immediately
    checkNewOffers();

    // Listen for cross-tab changes
    const handleStorage = (e: StorageEvent) => {
      if (e.key === OFFERS_KEY) {
        setTimeout(checkNewOffers, 100);
      }
    };
    window.addEventListener("storage", handleStorage);

    // Polling
    const interval = setInterval(checkNewOffers, 3000);

    return () => {
      window.removeEventListener("storage", handleStorage);
      clearInterval(interval);
    };
  }, []);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      {/* Notification Button (replaces default bell) */}
      <div style={{ position: "relative" }}>
        <button
          className="admin-header-btn"
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) markAllRead();
          }}
          title="Bildirimler"
        >
          <Bell size={18} />
          {(unreadCount > 0 || stats.pending > 0) && (
            <span className="admin-notification-dot" style={{ animation: "admin-spin 2s linear infinite" }} />
          )}
        </button>

        {/* Dropdown */}
        {isOpen && (
          <>
            <div 
              style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 998 }} 
              onClick={() => setIsOpen(false)} 
            />
            <div style={{
              position: "absolute", top: "calc(100% + 8px)", right: 0,
              width: 380, maxHeight: 500, overflowY: "auto",
              background: "var(--admin-surface)", border: "1px solid var(--admin-border)",
              borderRadius: 16, boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
              zIndex: 999,
            }}>
              {/* Header */}
              <div style={{
                padding: "16px 20px", borderBottom: "1px solid var(--admin-border)",
                display: "flex", justifyContent: "space-between", alignItems: "center"
              }}>
                <span style={{ fontWeight: 800, color: "#fff", fontSize: "0.95rem" }}>Bildirimler</span>
                {notifications.length > 0 && (
                  <button
                    onClick={markAllRead}
                    style={{ background: "none", border: "none", color: "var(--admin-gold)", cursor: "pointer", fontSize: "0.8rem", fontWeight: 700, fontFamily: "Outfit" }}
                  >
                    Tümünü Oku
                  </button>
                )}
              </div>

              {/* Notifications List */}
              {notifications.length > 0 ? (
                <div style={{ maxHeight: 400, overflowY: "auto" }}>
                  {notifications.map(n => (
                    <div
                      key={n.id}
                      onClick={() => {
                        setIsOpen(false);
                        router.push("/admin/teklifler");
                      }}
                      style={{
                        padding: "14px 20px", borderBottom: "1px solid var(--admin-border)",
                        cursor: "pointer", display: "flex", gap: 12, alignItems: "flex-start",
                        background: n.read ? "transparent" : "rgba(201, 164, 73,0.03)",
                        transition: "background 0.2s",
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = "var(--admin-surface-hover)"}
                      onMouseLeave={e => e.currentTarget.style.background = n.read ? "transparent" : "rgba(201, 164, 73,0.03)"}
                    >
                      <div style={{
                        width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                        background: "rgba(201, 164, 73,0.1)", display: "flex",
                        alignItems: "center", justifyContent: "center", color: "var(--admin-gold)"
                      }}>
                        <FileText size={16} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontWeight: n.read ? 600 : 800,
                          fontSize: "0.88rem", color: n.read ? "var(--admin-text-muted)" : "#fff",
                          marginBottom: 2
                        }}>{n.title}</div>
                        <div style={{ fontSize: "0.8rem", color: "var(--admin-text-dim)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {n.body}
                        </div>
                      </div>
                      <span style={{ fontSize: "0.72rem", color: "var(--admin-text-dim)", whiteSpace: "nowrap", flexShrink: 0 }}>
                        {n.time}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ padding: "40px 20px", textAlign: "center", color: "var(--admin-text-dim)" }}>
                  <Bell size={28} style={{ marginBottom: 12, opacity: 0.3 }} />
                  <p style={{ fontSize: "0.88rem", fontWeight: 600 }}>Henüz bildirim yok</p>
                  <p style={{ fontSize: "0.78rem", marginTop: 4 }}>Yeni teklifler geldiğinde bildirimler burada görünecek.</p>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Floating Banner */}
      {showBanner && latestNotif && (
        <div className="admin-notif-banner">
          <div className="admin-notif-icon">
            <FileText size={20} />
          </div>
          <div className="admin-notif-text">
            <div className="admin-notif-title">{latestNotif.title}</div>
            <div className="admin-notif-body">{latestNotif.body}</div>
          </div>
          <button className="admin-notif-close" onClick={() => setShowBanner(false)}>
            <X size={16} />
          </button>
        </div>
      )}
    </>
  );
}

/**
 * PWA Install Prompt Component
 */
export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true);
    };
    window.addEventListener("beforeinstallprompt", handler);

    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setShowInstall(false);
    }

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      setShowInstall(false);
    }
    setDeferredPrompt(null);
  };

  if (!showInstall) return null;

  return (
    <div className="admin-install-banner">
      <Smartphone size={18} />
      <span>Mobil uygulama olarak yükleyin!</span>
      <button onClick={handleInstall}>
        <Download size={14} style={{ marginRight: 4, verticalAlign: "middle" }} />
        Yükle
      </button>
      <button onClick={() => setShowInstall(false)} style={{ background: "none", marginLeft: 0, padding: "6px" }}>
        <X size={16} />
      </button>
    </div>
  );
}
