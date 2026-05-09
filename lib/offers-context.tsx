"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "alicilar_offers";

export type OfferStatus = "pending" | "contacted" | "completed" | "rejected";

export interface Offer {
  id: string;
  tcNo: string;
  birthDate: string;
  phone: string;
  insuranceType: string;
  status: OfferStatus;
  createdAt: string;
  notes: string;
}

interface OffersContextType {
  offers: Offer[];
  addOffer: (offer: Omit<Offer, "id" | "status" | "createdAt" | "notes">) => string;
  updateOffer: (id: string, updates: Partial<Offer>) => void;
  deleteOffer: (id: string) => void;
  getOfferById: (id: string) => Offer | undefined;
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

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}

export function OffersProvider({ children }: { children: React.ReactNode }) {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setOffers(JSON.parse(stored));
      }
    } catch {
      // Fallback
    }
    setIsLoaded(true);
  }, []);

  const persist = useCallback((data: Offer[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Storage full
    }
  }, []);

  const addOffer = useCallback((offerData: Omit<Offer, "id" | "status" | "createdAt" | "notes">) => {
    const id = generateId();
    const newOffer: Offer = {
      ...offerData,
      id,
      status: "pending",
      createdAt: new Date().toISOString(),
      notes: "",
    };
    setOffers(prev => {
      const updated = [newOffer, ...prev];
      persist(updated);
      return updated;
    });
    return id;
  }, [persist]);

  const updateOffer = useCallback((id: string, updates: Partial<Offer>) => {
    setOffers(prev => {
      const updated = prev.map(o => o.id === id ? { ...o, ...updates } : o);
      persist(updated);
      return updated;
    });
  }, [persist]);

  const deleteOffer = useCallback((id: string) => {
    setOffers(prev => {
      const updated = prev.filter(o => o.id !== id);
      persist(updated);
      return updated;
    });
  }, [persist]);

  const getOfferById = useCallback((id: string) => {
    return offers.find(o => o.id === id);
  }, [offers]);

  const stats = React.useMemo(() => {
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekStart = new Date(todayStart);
    weekStart.setDate(weekStart.getDate() - 7);

    return {
      total: offers.length,
      pending: offers.filter(o => o.status === "pending").length,
      contacted: offers.filter(o => o.status === "contacted").length,
      completed: offers.filter(o => o.status === "completed").length,
      rejected: offers.filter(o => o.status === "rejected").length,
      todayCount: offers.filter(o => new Date(o.createdAt) >= todayStart).length,
      weekCount: offers.filter(o => new Date(o.createdAt) >= weekStart).length,
    };
  }, [offers]);

  const exportData = useCallback(() => {
    return JSON.stringify(offers, null, 2);
  }, [offers]);

  const importData = useCallback((json: string) => {
    try {
      const data = JSON.parse(json);
      if (Array.isArray(data)) {
        setOffers(data);
        persist(data);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }, [persist]);

  return (
    <OffersContext.Provider value={{ offers, addOffer, updateOffer, deleteOffer, getOfferById, stats, isLoaded, exportData, importData }}>
      {children}
    </OffersContext.Provider>
  );
}

const offersFallback: OffersContextType = {
  offers: [],
  addOffer: () => "",
  updateOffer: () => {},
  deleteOffer: () => {},
  getOfferById: () => undefined,
  stats: { total: 0, pending: 0, contacted: 0, completed: 0, rejected: 0, todayCount: 0, weekCount: 0 },
  isLoaded: false,
  exportData: () => "[]",
  importData: () => false,
};

export function useOffers() {
  const ctx = useContext(OffersContext);
  return ctx ?? offersFallback;
}
