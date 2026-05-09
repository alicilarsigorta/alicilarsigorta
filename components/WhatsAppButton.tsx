"use client";

import { useContent } from "@/lib/content-context";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function WhatsAppButton() {
  const { content } = useContent();
  const whatsappNumber = content.contact.whatsapp;

  if (!whatsappNumber) return null;

  const handleClick = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const url = isMobile
      ? `whatsapp://send?phone=${whatsappNumber}&text=Merhaba,%20sigorta%20hakkında%20bilgi%20almak%20istiyorum.`
      : `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=Merhaba,%20sigorta%20hakkında%20bilgi%20almak%20istiyorum.`;
    window.open(url, '_blank');
  };

  return (
    <motion.button
      onClick={handleClick}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="WhatsApp ile iletişime geç"
      className="wa-fab"
    >
      <MessageCircle size={22} strokeWidth={1.75} />
      <span className="wa-fab__pulse" />
      <style jsx>{`
        .wa-fab {
          position: fixed;
          bottom: calc(env(safe-area-inset-bottom, 0px) + 1.25rem);
          left: calc(env(safe-area-inset-left, 0px) + 1.25rem);
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: var(--ink);
          color: var(--gold-light);
          border: 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 95;
          box-shadow: 0 12px 32px -8px rgba(12,12,13,0.35);
          isolation: isolate;
        }
        .wa-fab__pulse {
          position: absolute;
          inset: -2px;
          border-radius: 50%;
          border: 1px solid var(--gold-light);
          opacity: 0;
          animation: wa-pulse 2.4s ease-out infinite;
        }
        @keyframes wa-pulse {
          0% { transform: scale(0.85); opacity: 0.6; }
          100% { transform: scale(1.6); opacity: 0; }
        }
      `}</style>
    </motion.button>
  );
}
