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
          <div style={{ position: "relative", width: 160, height: 160, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* Pulse Glow Effect */}
            <motion.div
              initial={{ scale: 0.6, opacity: 0.5 }}
              animate={{ scale: 1.6, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeOut" }}
              style={{
                position: "absolute",
                inset: 0,
                background: "var(--gold)",
                borderRadius: "50%",
                filter: "blur(28px)",
                opacity: 0.4,
                zIndex: 0
              }}
            />

            {/* Brand Logo */}
            <motion.img
              src="/logo-dark.png"
              alt="Alıcılar Sigorta"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: 130,
                height: 130,
                objectFit: "contain",
                position: "relative",
                zIndex: 10,
                filter: "drop-shadow(0 8px 24px rgba(176, 112, 80, 0.35))",
              }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            style={{
              marginTop: 28,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 14
            }}
          >
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
