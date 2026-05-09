"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "unset";
    }, 1400);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }}
          className="ld-screen"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="ld-content"
          >
            <h1 className="ld-title">
              Alıcılar <span className="ld-italic">Sigorta</span>
            </h1>
            <div className="ld-line">
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
            <p className="ld-meta">Güvenilir Sigorta Platformu</p>
          </motion.div>

          <style jsx>{`
            .ld-screen {
              position: fixed;
              inset: 0;
              z-index: 99999;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              background: var(--white);
            }
            .ld-content {
              text-align: center;
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 18px;
            }
            .ld-title {
              font-family: var(--font-serif);
              font-size: clamp(2rem, 5vw, 3rem);
              font-weight: 400;
              color: var(--ink);
              letter-spacing: -0.025em;
              margin: 0;
            }
            .ld-italic {
              font-style: italic;
              color: var(--gold-dark);
              font-weight: 300;
            }
            .ld-line {
              width: 60px;
              height: 1px;
              background: var(--hairline);
              overflow: hidden;
              transform-origin: left center;
            }
            .ld-line span {
              display: block;
              height: 100%;
              background: var(--gold-dark);
              transform-origin: left center;
            }
            .ld-meta {
              font-family: var(--font-sans);
              font-size: 0.72rem;
              font-weight: 500;
              color: var(--muted);
              letter-spacing: 0.22em;
              text-transform: uppercase;
              margin: 0;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
