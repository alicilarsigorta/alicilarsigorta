"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { InstallPrompt } from "@/components/admin/NotificationCenter";
import { Toaster } from "sonner";
import { usePWA } from "@/lib/use-notifications";
import "./admin.css";

const pageTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/teklifler": "Teklif Yönetimi",
  "/admin/icerik": "İçerik Yönetimi",
  "/admin/gorunum": "Görünüm Ayarları",
  "/admin/ayarlar": "Ayarlar",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const [checking, setChecking] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  // PWA — register the service worker (needed for Web Push)
  usePWA();

  // Auth check — verify the httpOnly admin cookie server-side
  useEffect(() => {
    if (pathname === "/admin/login") {
      setChecking(false);
      setIsAuthed(false);
      return;
    }
    let cancelled = false;
    fetch("/api/admin/login", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (cancelled) return;
        if (d.admin) setIsAuthed(true);
        else router.push("/admin/login");
        setChecking(false);
      })
      .catch(() => {
        if (cancelled) return;
        router.push("/admin/login");
        setChecking(false);
      });
    return () => {
      cancelled = true;
    };
  }, [pathname, router]);

  // Login page gets a minimal layout
  if (pathname === "/admin/login") {
    return (
      <>
        {children}
        <Toaster position="top-right" richColors theme="dark" />
      </>
    );
  }

  if (checking) {
    return (
      <div style={{ minHeight: "100vh", background: "#0c0e14", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div className="admin-loading-spinner" />
      </div>
    );
  }

  if (!isAuthed) return null;

  const title = pageTitles[pathname] || "Admin Panel";

  return (
    <div className="admin-layout">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="admin-main">
        <InstallPrompt />
        <AdminHeader title={title} onMenuToggle={() => setSidebarOpen(prev => !prev)} />
        <div className="admin-content">
          {children}
        </div>
      </main>
      <Toaster position="top-center" richColors theme="dark" />
    </div>
  );
}
