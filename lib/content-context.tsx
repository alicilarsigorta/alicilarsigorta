"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { SiteContent, defaultContent } from "./default-content";

const STORAGE_KEY = "alicilar_site_content";

interface ContentContextType {
  content: SiteContent;
  updateContent: (newContent: SiteContent) => void;
  updateSection: <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => void;
  resetContent: () => void;
  isLoaded: boolean;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Deep merge with defaults to handle new fields
        setContent({ ...defaultContent, ...parsed });
      }
    } catch {
      // Fallback to defaults
    }
    setIsLoaded(true);
  }, []);

  const updateContent = useCallback((newContent: SiteContent) => {
    setContent(newContent);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newContent));
    } catch {
      // Storage full or unavailable
    }
  }, []);

  const updateSection = useCallback(<K extends keyof SiteContent>(key: K, value: SiteContent[K]) => {
    setContent(prev => {
      const updated = { ...prev, [key]: value };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // Storage full or unavailable
      }
      return updated;
    });
  }, []);

  const resetContent = useCallback(() => {
    setContent(defaultContent);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, []);

  return (
    <ContentContext.Provider value={{ content, updateContent, updateSection, resetContent, isLoaded }}>
      {children}
    </ContentContext.Provider>
  );
}

const fallback: ContentContextType = {
  content: defaultContent,
  updateContent: () => {},
  updateSection: () => {},
  resetContent: () => {},
  isLoaded: false,
};

export function useContent() {
  const ctx = useContext(ContentContext);
  return ctx ?? fallback;
}
