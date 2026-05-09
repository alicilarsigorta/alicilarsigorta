"use client";

import { useEffect, useCallback, useRef } from "react";

const OFFERS_KEY = "alicilar_offers";
const LAST_COUNT_KEY = "alicilar_offers_last_count";

/**
 * Hook to manage browser notifications for new offers.
 * Uses localStorage events + polling to detect new submissions
 * even across browser tabs.
 */
export function useNotifications() {
  const permissionRef = useRef<NotificationPermission>("default");

  // Request notification permission
  const requestPermission = useCallback(async () => {
    if (!("Notification" in window)) {
      console.log("Browser does not support notifications");
      return false;
    }

    if (Notification.permission === "granted") {
      permissionRef.current = "granted";
      return true;
    }

    if (Notification.permission !== "denied") {
      const permission = await Notification.requestPermission();
      permissionRef.current = permission;
      return permission === "granted";
    }

    return false;
  }, []);

  // Show notification
  const showNotification = useCallback((title: string, body: string, tag?: string) => {
    if (permissionRef.current !== "granted") return;

    try {
      // Try service worker notification (works in background)
      if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.ready.then((reg) => {
          reg.showNotification(title, {
            body,
            icon: "/icons/icon-192.svg",
            badge: "/icons/icon-72.svg",
            vibrate: [200, 100, 200],
            tag: tag || "new-offer",
            data: { url: "/admin/teklifler" },
            requireInteraction: true,
          } as NotificationOptions);
        });
      } else {
        // Fallback: basic notification
        new Notification(title, {
          body,
          icon: "/icons/icon-192.svg",
          tag: tag || "new-offer",
        });
      }
    } catch {
      // Ignore
    }
  }, []);

  // Monitor for new offers via localStorage changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Initialize permission
    if ("Notification" in window) {
      permissionRef.current = Notification.permission;
    }

    // Store initial count
    try {
      const offers = JSON.parse(localStorage.getItem(OFFERS_KEY) || "[]");
      localStorage.setItem(LAST_COUNT_KEY, String(offers.length));
    } catch {
      // Ignore
    }

    // Listen for storage events (cross-tab)
    const handleStorage = (e: StorageEvent) => {
      if (e.key !== OFFERS_KEY || !e.newValue) return;

      try {
        const newOffers = JSON.parse(e.newValue);
        const lastCount = parseInt(localStorage.getItem(LAST_COUNT_KEY) || "0", 10);

        if (newOffers.length > lastCount) {
          const diff = newOffers.length - lastCount;
          const latest = newOffers[0]; // Most recent offer (prepended)
          
          showNotification(
            `🔔 ${diff} Yeni Teklif Başvurusu!`,
            `${latest.insuranceType} — ${latest.phone}`,
            `offer-${latest.id}`
          );

          localStorage.setItem(LAST_COUNT_KEY, String(newOffers.length));
        }
      } catch {
        // Ignore
      }
    };

    window.addEventListener("storage", handleStorage);

    // Polling fallback (same tab detection)
    const interval = setInterval(() => {
      try {
        const offers = JSON.parse(localStorage.getItem(OFFERS_KEY) || "[]");
        const lastCount = parseInt(localStorage.getItem(LAST_COUNT_KEY) || "0", 10);

        if (offers.length > lastCount) {
          const diff = offers.length - lastCount;
          const latest = offers[0];

          showNotification(
            `🔔 ${diff} Yeni Teklif Başvurusu!`,
            `${latest.insuranceType} — ${latest.phone}`,
            `offer-${latest.id}`
          );

          localStorage.setItem(LAST_COUNT_KEY, String(offers.length));
        }
      } catch {
        // Ignore
      }
    }, 3000); // Check every 3 seconds

    return () => {
      window.removeEventListener("storage", handleStorage);
      clearInterval(interval);
    };
  }, [showNotification]);

  return { requestPermission, showNotification };
}

/**
 * Hook to register service worker and setup PWA.
 */
export function usePWA() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => {
        console.log("SW registered:", reg.scope);
      })
      .catch((err) => {
        console.log("SW registration failed:", err);
      });
  }, []);
}
