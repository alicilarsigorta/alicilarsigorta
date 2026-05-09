"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function LoadingScreen() {
  const [show, setShow] = useState(true);
  const pathname = usePathname();

  // We show the loader when the app initially mounts
  useEffect(() => {
    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';
    
    const timer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = 'unset';
    }, 2200); // 2.2s total duration to see the beautiful animation
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99999,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            background: "var(--cream)", // Koyu temadaysa vs düzgün görünsün diye cream verdik. Dark mode için de rgba eklenebilir.
            backdropFilter: "blur(10px)",
          }}
          className="dark:bg-surface" // Dark mode destekli
        >
          <div style={{ position: "relative", width: 140, height: 140, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* Pulse Glow Effect (Güven Hissi) */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0.5 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
              style={{
                position: "absolute",
                inset: 0,
                background: "var(--gold)",
                borderRadius: "50%",
                filter: "blur(20px)",
                zIndex: 0
              }}
            />
            
            {/* Kalkan ve Onay İşareti (Sigorta / Koruma Konsepti) */}
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="var(--gold-dark)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ zIndex: 10, position: "relative" }}>
              <motion.path
                d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                initial={{ pathLength: 0, fill: "rgba(212, 175, 55, 0)" }}
                animate={{ pathLength: 1, fill: "rgba(212, 175, 55, 0.15)" }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
              <motion.path
                d="M9 12l2 2 4-4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
                strokeWidth="2.5"
              />
            </svg>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            style={{
              marginTop: 32,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12
            }}
          >
            <h2 style={{ fontSize: "1.7rem", fontWeight: 900, color: "var(--text-main)", letterSpacing: "0.05em", margin: 0 }} className="text-text-main">
              ALICILAR <span className="text-gold-dark">SİGORTA</span>
            </h2>
            <div style={{ display: "flex", gap: 6 }}>
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: ["0%", "-60%", "0%"],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.15,
                  }}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: "var(--gold-dark)"
                  }}
                />
              ))}
            </div>
            <p className="text-text-muted text-sm mt-2 font-medium tracking-wide uppercase">
              Güveniniz İnşa Ediliyor...
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
