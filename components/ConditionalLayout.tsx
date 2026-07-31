"use client";

import { usePathname } from "next/navigation";
import { Toaster } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  // Admin kendi Toaster'ını kullanır. Site Toaster'ı burada kalmalı; kök
  // layout'ta dursaydı admin sayfalarında iki Toaster olur ve her bildirim
  // ekranda iki kez görünürdü.
  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppButton />
      <Toaster position="top-right" richColors />
    </>
  );
}
