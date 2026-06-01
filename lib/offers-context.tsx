"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

export type OfferStatus = "pending" | "contacted" | "completed" | "rejected";

export interface Offer {
  id: string;
  name?: string;
  tcNo?: string;
  birthDate?: string;
  phone: string;
  insuranceType: string;
  city?: string;
  source?: string;
  status: OfferStatus;
  createdAt: string;
  notes: string;
}

interface OffersContextType {
  offers: Offer[];
  addOffer: (offer: Partial<Offer> & { phone: string; insuranceType: string }) => Promise<string>;
  updateOffer: (id: string, updates: Partial<Offer>) => Promise<void>;
  deleteOffer: (id: string) => Promise<void>;
  getOfferById: (id: string) => Offer | undefined;
  refresh: () => Promise<void>;
  stats: {
    total: number;
    pending: number;
    contacted: number;
    completed: number;
    rejected: number;
    todayCount: number;
    weekCount: number;
  };
  isLoaded: boolean;
  exportData: () => string;
  importData: (json: string) => boolean;
}

const OffersContext = createContext<OffersContextType | undefined>(undefined);

export function OffersProvider({ children }: { children: React.ReactNode }) {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/offers", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setOffers((data.offers as Offer[]) ?? []);
      }
    } catch {
      /* offline / unauthorized — leave as is */
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Only the admin can list offers; poll while the admin panel is open.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.location.pathname.startsWith("/admin")) {
      setIsLoaded(true);
      return;
    }
    refresh();
    const t = setInterval(refresh, 20000);
    return () => clearInterval(t);
  }, [refresh]);

  const addOffer = useCallback(
    async (offer: Partial<Offer> & { phone: string; insuranceType: string }) => {
      const res = await fetch("/api/offers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(offer),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data?.error || "Kayıt başarısız.");
      return (data.id as string) || "";
    },
    []
  );

  const updateOffer = useCallback(async (id: string, updates: Partial<Offer>) => {
    setOffers((prev) => prev.map((o) => (o.id === id ? { ...o, ...updates } : o)));
    try {
      await fetch(`/api/offers/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates),
      });
    } catch {
      /* keep optimistic update */
    }
  }, []);

  const deleteOffer = useCallback(async (id: string) => {
    setOffers((prev) => prev.filter((o) => o.id !== id));
    try {
      await fetch(`/api/offers/${id}`, { method: "DELETE" });
    } catch {
      /* ignore */
    }
  }, []);

  const getOfferById = useCallback((id: string) => offers.find((o) => o.id === id), [offers]);

  const stats = React.useMemo(() => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(todayStart);
    weekStart.setDate(weekStart.getDate() - 7);
    return {
      total: offers.length,
      pending: offers.filter((o) => o.status === "pending").length,
      contacted: offers.filter((o) => o.status === "contacted").length,
      completed: offers.filter((o) => o.status === "completed").length,
      rejected: offers.filter((o) => o.status === "rejected").length,
      todayCount: offers.filter((o) => new Date(o.createdAt) >= todayStart).length,
      weekCount: offers.filter((o) => new Date(o.createdAt) >= weekStart).length,
    };
  }, [offers]);

  const exportData = useCallback(() => JSON.stringify(offers, null, 2), [offers]);
  const importData = useCallback((json: string) => {
    try {
      const data = JSON.parse(json);
      if (Array.isArray(data)) {
        setOffers(data);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, []);

  return (
    <OffersContext.Provider
      value={{ offers, addOffer, updateOffer, deleteOffer, getOfferById, refresh, stats, isLoaded, exportData, importData }}
    >
      {children}
    </OffersContext.Provider>
  );
}

const offersFallback: OffersContextType = {
  offers: [],
  addOffer: async () => "",
  updateOffer: async () => {},
  deleteOffer: async () => {},
  getOfferById: () => undefined,
  refresh: async () => {},
  stats: { total: 0, pending: 0, contacted: 0, completed: 0, rejected: 0, todayCount: 0, weekCount: 0 },
  isLoaded: false,
  exportData: () => "[]",
  importData: () => false,
};

export function useOffers() {
  const ctx = useContext(OffersContext);
  return ctx ?? offersFallback;
}
