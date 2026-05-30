"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { useEffect, useState } from "react";
import { ContentProvider } from "@/lib/content-context";
import { OffersProvider } from "@/lib/offers-context";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <ContentProvider>
        <OffersProvider>
          {children}
        </OffersProvider>
      </ContentProvider>
    </NextThemesProvider>
  );
}
