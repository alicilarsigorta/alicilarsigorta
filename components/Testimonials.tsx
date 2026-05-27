"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
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
      "Annemin TSS poliçesini 3 dakikada karşılaştırıp aldık. Hastanede fark farkı ödememek için araştırmaya başlamıştık, bizi telefonla aradılar ve teminat farklarını tek tek anlattılar.",
    name: "Ayşe D.",
    role: "Pazarlama Müdürü",
    city: "Ankara",
    policy: "Tamamlayıcı Sağlık",
    initials: "AD",
    rating: 5,
  },
  {
    quote:
      "Geçen kış evimde su baskını oldu. Hasar dosyamı SMS ile açtım, 6 saat içinde eksper geldi, ertesi gün ödeme hesabımdaydı. Sigortayı tanımlamış oldular.",
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

  // Auto-advance every 8s unless paused
  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setActive((a) => (a + 1) % testimonials.length);
    }, 8000);
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
        background: "var(--off-white)",
        position: "relative",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, ease: easeOutExpo }}
          style={{ textAlign: "center", marginBottom: 60, maxWidth: 680, margin: "0 auto 60px" }}
        >
          <span className="eyebrow">Müşterilerimiz · 4,9 / 5 ortalama puan</span>
          <h2 className="section-title">
            Türkiye'nin dört bir yanından{" "}
            <span className="gold">gerçek hikâyeler</span>
          </h2>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="testimonial-stage"
        >
          <Quote
            size={56}
            color="var(--gold)"
            strokeWidth={1.2}
            className="testimonial-quote-glyph"
          />

          <div className="testimonial-card-wrap">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -24, filter: "blur(8px)" }}
                transition={{ duration: 0.6, ease: easeOutExpo }}
                className="testimonial-card"
              >
                <p className="testimonial-quote">"{t.quote}"</p>

                <div className="testimonial-meta">
                  <div className="testimonial-avatar" aria-hidden>
                    {t.initials}
                  </div>
                  <div className="testimonial-meta-text">
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">
                      {t.role} · {t.city}
                    </div>
                  </div>
                  <div className="testimonial-rating">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        fill={i < t.rating ? "var(--gold)" : "transparent"}
                        color="var(--gold)"
                      />
                    ))}
                    <span className="testimonial-policy">{t.policy}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="testimonial-controls">
            <button
              onClick={() => go(-1)}
              aria-label="Önceki yorum"
              className="testimonial-arrow"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="testimonial-dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Yorum ${i + 1}`}
                  className={`testimonial-dot ${active === i ? "active" : ""}`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              aria-label="Sonraki yorum"
              className="testimonial-arrow"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .testimonial-stage {
          position: relative;
          max-width: 880px;
          margin: 0 auto;
        }
        .testimonial-quote-glyph {
          position: absolute;
          top: -32px;
          left: -8px;
          opacity: 0.35;
          z-index: 0;
        }
        .testimonial-card-wrap {
          position: relative;
          z-index: 1;
          min-height: 280px;
        }
        .testimonial-card {
          background: var(--white);
          border: 1px solid var(--border);
          border-left: 3px solid var(--gold);
          border-radius: 24px;
          padding: clamp(28px, 4vw, 48px);
          box-shadow: var(--shadow-soft);
        }
        .testimonial-quote {
          font-family: var(--font-display);
          font-size: clamp(1.15rem, 1.8vw, 1.5rem);
          line-height: 1.55;
          color: var(--ink);
          font-weight: 400;
          letter-spacing: -0.005em;
          margin-bottom: 32px;
          font-optical-sizing: auto;
        }
        .testimonial-meta {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }
        .testimonial-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--gold-dark) 0%, var(--gold) 100%);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 0.95rem;
          letter-spacing: 0.05em;
          flex-shrink: 0;
        }
        .testimonial-meta-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
          min-width: 140px;
        }
        .testimonial-name {
          font-weight: 700;
          font-size: 1rem;
          color: var(--ink);
        }
        .testimonial-role {
          font-size: 0.85rem;
          color: var(--gray);
          font-weight: 500;
        }
        .testimonial-rating {
          display: flex;
          align-items: center;
          gap: 4px;
          padding-left: 16px;
          border-left: 1px solid var(--border);
        }
        .testimonial-policy {
          margin-left: 8px;
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--gold-dark);
          letter-spacing: 0.02em;
        }

        .testimonial-controls {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-top: 40px;
        }
        .testimonial-arrow {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--white);
          border: 1px solid var(--border);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--dark);
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .testimonial-arrow:hover {
          border-color: var(--gold);
          color: var(--gold-dark);
          transform: translateY(-2px);
        }
        .testimonial-dots {
          display: flex;
          gap: 8px;
        }
        .testimonial-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--border-strong);
          border: none;
          padding: 0;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .testimonial-dot.active {
          background: var(--gold);
          width: 28px;
          border-radius: 4px;
        }

        @media (max-width: 640px) {
          .testimonial-quote-glyph { display: none; }
          .testimonial-card { border-radius: 18px; }
          .testimonial-rating {
            padding-left: 0;
            border-left: none;
            width: 100%;
            margin-top: 8px;
          }
          .testimonial-policy { margin-left: auto; }
        }
        `,
      }} />
    </section>
  );
}
