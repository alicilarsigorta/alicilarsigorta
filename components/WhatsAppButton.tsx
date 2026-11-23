"use client";

import { useContent } from "@/lib/content-context";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function WhatsAppButton() {
  const { content } = useContent();
  const whatsappNumber = content.contact.whatsapp;

  // Don't render if no whatsapp number
  if (!whatsappNumber) return null;

  const handleWhatsAppClick = () => {
    // Determine mobile or desktop for correct whatsapp link
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const url = isMobile 
      ? `whatsapp://send?phone=${whatsappNumber}&text=Merhaba,%20sigorta%20hakkında%20bilgi%20almak%20istiyorum.`
      : `https://web.whatsapp.com/send?phone=${whatsappNumber}&text=Merhaba,%20sigorta%20hakkında%20bilgi%20almak%20istiyorum.`;
    
    window.open(url, '_blank');
  };

  return (
    <motion.button
      onClick={handleWhatsAppClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="WhatsApp ile iletişime geç"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '50%',
        border: 'none',
        cursor: 'pointer',
        background: '#22c55e',
        color: '#fff',
        boxShadow: '0 10px 24px rgba(34, 197, 94, 0.38)',
        position: 'fixed',
        bottom: 'calc(env(safe-area-inset-bottom, 0px) + 1.25rem)',
        left: 'calc(env(safe-area-inset-left, 0px) + 1.25rem)',
        height: 56,
        width: 56,
        zIndex: 95,
        isolation: 'isolate',
      }}
    >
      <motion.div
        animate={{
          boxShadow: [
            "0 0 0 0 rgba(34, 197, 94, 0.4)",
            "0 0 0 15px rgba(34, 197, 94, 0)",
          ],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeOut",
        }}
        style={{ position: 'absolute', inset: 0, borderRadius: '50%' }}
      />
      <MessageCircle size={28} style={{ position: 'relative', zIndex: 1 }} />
    </motion.button>
  );
}
