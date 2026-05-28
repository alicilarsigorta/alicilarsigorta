"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { fadeUp, viewportOnce, easeOutExpo } from "@/lib/motion";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  city: string;
  policy: string;
  initials: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "20 yıldır kasko yaptırıyorum ama bu kadar şeffaf bir teklif sürecini ilk kez gördüm. Komisyon yok dediler, gerçekten yok. Ödediğim primin tüm dökümünü poliçenin arkasında gördüm.",
    name: "Mehmet K.",
    role: "İşletme Sahibi",
    city: "İstanbul",
    policy: "Kasko + Trafik",
    initials: "MK",
    rating: 5,
  },
  {
    quote:
      "Annemin TSS poliçesini 3 dakikada karşılaştırıp aldık. Hastanede fark ödememek için araştırmaya başlamıştık, bizi telefonla aradılar ve teminat farklarını tek tek anlattılar.",
    name: "Ayşe D.",
    role: "Pazarlama Müdürü",
    city: "Ankara",
    policy: "Tamamlayıcı Sağlık",
    initials: "AD",
    rating: 5,
  },
  {
    quote:
      "Geçen kış evimde su baskını oldu. Hasar dosyamı SMS ile açtım, 6 saat içinde eksper geldi, ertesi gün ödeme hesabımdaydı. Sigortayı yeniden tanımladılar.",
    name: "Burak T.",
    role: "Mimar",
    city: "İzmir",
    policy: "Konut + DASK",
    initials: "BT",
    rating: 5,
  },
  {
    quote:
      "İş yeri sigortası için 5 farklı şirketin tekliflerini yan yana koydular. Hangisi neyi karşılıyor, hangisi neyi karşılamıyor — tablonun fotoğrafını çekip ortağıma yolladım, beraber karar verdik.",
    name: "Selin Y.",
    role: "Kafe İşletmecisi",
    city: "Bursa",
    policy: "İş Yeri",
    initials: "SY",
    rating: 5,
  },
  {
    quote:
      "Babam 67 yaşında ve teknolojiyle arası iyi değil. Danışman onunla 25 dakika telefonda kaldı, sabırla her teminatı anlattı. Babam da gönül rahatlığıyla imza attı.",
    name: "Cenk A.",
    role: "Yazılım Mühendisi",
    city: "İstanbul",
    policy: "Sağlık + Konut",
    initials: "CA",
    rating: 5,
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-advance every 9s unless paused
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setActive((a) => (a + 1) % testimonials.length);
    }, 9000);
    return () => clearInterval(t);
  }, [paused]);

  const go = (delta: number) => {
    setActive((a) => (a + delta + testimonials.length) % testimonials.length);
  };

  const t = testimonials[active];

  return (
    <section
      className="section testimonials-section"
      style={{
        background: "var(--paper-soft)",
        position: "relative",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container">
        {/* Editorial 2-column header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease: easeOutExpo }}
          className="testi-header"
        >
          <div className="testi-header-left">
            <span className="issue-marker">Müşterilerimiz &nbsp;·&nbsp; 4,9 / 5 puan</span>
            <h2 className="headline-l">
              Türkiye'nin dört bir yanından{" "}
              <em>gerçek hikâyeler.</em>
            </h2>
          </div>
          <div className="testi-header-right">
            <p className="testi-lede">
              On binlerce müşterimiz <em className="script">"sigorta"</em>{" "}
              kelimesinin anlamını yeniden tarif ediyor. İşte birkaç ses.
            </p>
          </div>
        </motion.div>

        <div className="rule-editorial" aria-hidden style={{ marginBottom: 0 }} />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="testi-stage"
        >
          {/* Open quote glyph, large editorial */}
          <span className="testi-quote-glyph" aria-hidden>"</span>

          <div className="testi-card-wrap">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={active}
                initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -18, filter: "blur(6px)" }}
                transition={{ duration: 0.7, ease: easeOutExpo }}
                className="testi-quote-block"
              >
                <p className="testi-quote-text">{t.quote}</p>

                <footer className="testi-meta">
                  <div className="testi-meta-left">
                    <div className="testi-name">— {t.name}</div>
                    <div className="testi-role">
                      <span>{t.role}</span>
                      <span className="testi-dot" />
                      <span>{t.city}</span>
                      <span className="testi-dot" />
                      <span className="testi-policy">{t.policy}</span>
                    </div>
                  </div>
                  <div className="testi-rating">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i < t.rating ? "var(--gold)" : "transparent"}
                        color="var(--gold)"
                      />
                    ))}
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Controls — editorial pagination */}
          <div className="testi-controls">
            <button
              onClick={() => go(-1)}
              aria-label="Önceki yorum"
              className="testi-arrow"
            >
              <ChevronLeft size={16} strokeWidth={2.2} />
              <span>Önceki</span>
            </button>

            <div className="testi-counter">
              <strong>{String(active + 1).padStart(2, "0")}</strong>
              <span className="testi-counter-sep">/</span>
              <span>{String(testimonials.length).padStart(2, "0")}</span>
            </div>

            <button
              onClick={() => go(1)}
              aria-label="Sonraki yorum"
              className="testi-arrow"
            >
              <span>Sonraki</span>
              <ChevronRight size={16} strokeWidth={2.2} />
            </button>
          </div>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .testimonials-section {
          padding-top: clamp(80px, 10vw, 140px);
          padding-bottom: clamp(80px, 10vw, 140px);
        }

        .testi-header {
          display: grid;
          grid-template-columns: minmax(0, 1.3fr) minmax(0, 1fr);
          gap: clamp(2rem, 6vw, 6rem);
          align-items: flex-end;
          margin-bottom: 56px;
        }
        .testi-header-left .issue-marker { margin-bottom: 24px; }
        .testi-lede {
          font-size: 1.04rem;
          line-height: 1.7;
          color: var(--gray);
          font-weight: 500;
          max-width: 460px;
        }
        .testi-lede em.script { color: var(--gold-dark); font-size: 1.12em; }

        .testi-stage {
          position: relative;
          max-width: 980px;
          margin: 0 auto;
          padding: 56px 0 0;
        }
        .testi-quote-glyph {
          position: absolute;
          top: -10px;
          left: -20px;
          font-family: var(--font-display);
          font-style: italic;
          font-weight: 500;
          font-size: clamp(8rem, 16vw, 14rem);
          line-height: 1;
          color: var(--gold);
          opacity: 0.18;
          user-select: none;
          pointer-events: none;
          font-optical-sizing: auto;
        }
        .testi-card-wrap {
          position: relative;
          z-index: 1;
          min-height: 280px;
        }
        .testi-quote-block {
          margin: 0;
        }
        .testi-quote-text {
          font-family: var(--font-display);
          font-style: italic;
          font-weight: 400;
          font-size: clamp(1.4rem, 2.6vw, 2.1rem);
          line-height: 1.4;
          letter-spacing: -0.015em;
          color: var(--ink);
          margin: 0 0 40px;
          font-optical-sizing: auto;
        }

        .testi-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          padding-top: 24px;
          border-top: 1px solid var(--border-strong);
          flex-wrap: wrap;
        }
        .testi-meta-left {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .testi-name {
          font-family: var(--font-display);
          font-style: italic;
          font-weight: 500;
          font-size: 1.1rem;
          color: var(--ink);
          letter-spacing: -0.01em;
        }
        .testi-role {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-sans);
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--gray);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          flex-wrap: wrap;
        }
        .testi-dot {
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: var(--border-strong);
        }
        .testi-policy { color: var(--gold-dark); }
        .testi-rating {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .testi-controls {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-top: 48px;
          padding-top: 28px;
          border-top: 1px solid var(--border);
        }
        .testi-arrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: none;
          border: none;
          padding: 8px 0;
          cursor: pointer;
          color: var(--ink);
          font-family: var(--font-sans);
          font-size: 0.74rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          transition: gap 0.3s ease, color 0.3s ease;
        }
        .testi-arrow:hover { color: var(--gold-dark); gap: 14px; }
        .testi-counter {
          font-family: var(--font-display);
          font-style: italic;
          font-weight: 500;
          font-size: 1rem;
          color: var(--gray);
          letter-spacing: -0.01em;
        }
        .testi-counter strong {
          color: var(--ink);
          font-weight: 500;
          font-style: italic;
          font-size: 1.4rem;
        }
        .testi-counter-sep {
          color: var(--gold);
          padding: 0 6px;
        }

        @media (max-width: 1024px) {
          .testi-header { grid-template-columns: 1fr; align-items: flex-start; gap: 24px; }
        }
        @media (max-width: 640px) {
          .testi-quote-glyph { font-size: 8rem; top: 8px; left: -8px; }
          .testi-meta { flex-direction: column; align-items: flex-start; gap: 14px; }
          .testi-role { font-size: 0.68rem; letter-spacing: 0.12em; }
          .testi-controls { flex-direction: row; flex-wrap: wrap; justify-content: center; gap: 16px; }
          .testi-counter { order: -1; flex-basis: 100%; text-align: center; }
        }
        `,
      }} />
    </section>
  );
}
