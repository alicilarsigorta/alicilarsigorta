"use client";

import { useContent } from "@/lib/content-context";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Calendar, User, BookOpen, Search } from "lucide-react";
import { useState, useMemo } from "react";

const stagger = { hidden: {}, visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function BlogPage() {
  const { content } = useContent();
  const blogs = content.blogs || [];
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useMemo(() => {
    const cats = new Set(blogs.map((b) => b.category));
    return ["Tümü", ...Array.from(cats)];
  }, [blogs]);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchCat = activeCategory === "Tümü" || blog.category === activeCategory;
      const matchSearch =
        !searchQuery ||
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [blogs, activeCategory, searchQuery]);

  const featured = filteredBlogs[0];
  const rest = filteredBlogs.slice(1);

  return (
    <div style={{ minHeight: "100vh", background: "var(--white)" }}>
      <section className="page-hero">
        <div className="container">
          <div className="page-hero__inner">
            <div className="section-badge">Blog &amp; Haberler</div>
            <h1 className="page-hero__title">
              Sigorta dünyasından <span className="gold">güncel gelişmeler</span>
            </h1>
            <p className="page-hero__sub">
              Sektörel haberler, sigorta ipuçları ve hayatınızı kolaylaştıracak rehber içerikler.
            </p>
          </div>

          {/* Search + filters */}
          <div className="bl-controls">
            <div className="bl-search">
              <Search size={16} strokeWidth={1.75} />
              <input
                type="text"
                placeholder="Yazılarda ara…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {categories.length > 1 && (
              <div className="bl-tabs">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`bl-tab ${activeCategory === cat ? "is-active" : ""}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: "var(--white)" }}>
        <div className="container">
          {filteredBlogs.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--muted)", fontFamily: "var(--font-sans)" }}>
              <BookOpen size={48} strokeWidth={1.25} style={{ color: "var(--hairline)", margin: "0 auto 20px", display: "block" }} />
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", fontWeight: 400, color: "var(--ink)", marginBottom: 8 }}>İçerik bulunamadı</h2>
              <p>{searchQuery ? "Aramanızla eşleşen bir yazı bulunamadı." : "Bu kategoride yazı yok."}</p>
            </div>
          ) : (
            <>
              {featured && (
                <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
                  <Link href={`/blog/${featured.slug}`} className="bl-featured">
                    <div className="bl-featured__img">
                      <Image src={featured.image || "/logo.png"} alt={featured.title} fill style={{ objectFit: "cover" }} />
                    </div>
                    <div className="bl-featured__text">
                      <div className="bl-meta">
                        <span className="bl-meta__cat">★ Öne Çıkan</span>
                        <span className="bl-meta__sep">·</span>
                        <span className="bl-meta__cat">{featured.category}</span>
                        <span className="bl-meta__sep">·</span>
                        <span><Calendar size={12} strokeWidth={1.5} /> {featured.date}</span>
                        <span className="bl-meta__sep">·</span>
                        <span><User size={12} strokeWidth={1.5} /> {featured.author}</span>
                      </div>
                      <h2 className="bl-featured__title">{featured.title}</h2>
                      <p className="bl-featured__sum">{featured.summary}</p>
                      <span className="bl-featured__cta">
                        Devamını Oku <ArrowUpRight size={16} strokeWidth={1.5} />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              )}

              {rest.length > 0 && (
                <motion.div className="bl-grid" variants={stagger} initial="hidden" animate="visible">
                  {rest.map((blog) => (
                    <motion.div key={blog.id} variants={fadeUp}>
                      <Link href={`/blog/${blog.slug}`} className="bl-card">
                        <div className="bl-card__img">
                          <Image src={blog.image || "/logo.png"} alt={blog.title} fill style={{ objectFit: "cover" }} />
                        </div>
                        <div className="bl-card__body">
                          <div className="bl-meta">
                            <span className="bl-meta__cat">{blog.category}</span>
                            <span className="bl-meta__sep">·</span>
                            <span><Calendar size={12} strokeWidth={1.5} /> {blog.date}</span>
                          </div>
                          <h3 className="bl-card__title">{blog.title}</h3>
                          <p className="bl-card__sum">{blog.summary}</p>
                          <span className="bl-card__cta">
                            Devamını Oku <ArrowUpRight size={14} strokeWidth={1.5} />
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>

      <section style={{ background: "var(--ink)", padding: "clamp(72px, 10vw, 128px) 0", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 4vw, 2.75rem)", fontWeight: 400, color: "#fff", marginBottom: 18, lineHeight: 1.05, letterSpacing: "-0.025em" }}>
            En uygun sigortayı <span style={{ fontStyle: "italic", color: "var(--gold-light)", fontWeight: 300 }}>biz bulalım.</span>
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "1rem", marginBottom: 28, lineHeight: 1.6 }}>
            20+ sigorta şirketini anında karşılaştırın, ücretsiz teklif alın.
          </p>
          <Link href="/teklif-al" className="btn" style={{ background: "#fff", color: "var(--ink)", padding: "1.05rem 2.25rem", borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 8, fontWeight: 500 }}>
            Ücretsiz Teklif Al <ArrowUpRight size={16} strokeWidth={1.5} />
          </Link>
        </div>
      </section>

      <style jsx global>{`
        .bl-controls {
          margin-top: clamp(40px, 5vw, 64px);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .bl-search {
          position: relative;
          max-width: 480px;
        }
        .bl-search :global(svg) {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--muted);
        }
        .bl-search input {
          width: 100%;
          padding: 13px 18px 13px 42px;
          border-radius: 999px;
          border: 1px solid var(--hairline);
          background: var(--white);
          font-family: var(--font-sans);
          font-size: 0.95rem;
          color: var(--ink);
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
        }
        .bl-search input:focus { border-color: var(--ink); box-shadow: 0 0 0 3px rgba(12,12,13,0.05); }
        .bl-tabs { display: flex; gap: 4px; flex-wrap: wrap; }
        .bl-tab {
          padding: 8px 16px;
          border-radius: 999px;
          font-family: var(--font-sans);
          font-size: 0.82rem;
          font-weight: 500;
          letter-spacing: 0.005em;
          cursor: pointer;
          background: transparent;
          color: var(--muted);
          border: 1px solid var(--hairline);
          transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease;
        }
        .bl-tab:hover { color: var(--ink); }
        .bl-tab.is-active { background: var(--ink); color: var(--gold-light); border-color: var(--ink); }

        .bl-featured {
          display: grid;
          grid-template-columns: 1fr;
          background: var(--white);
          border: 1px solid var(--hairline);
          border-radius: var(--radius-xl);
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          transition: border-color 0.3s ease, transform 0.3s ease;
          margin-bottom: clamp(48px, 6vw, 80px);
        }
        .bl-featured:hover { border-color: var(--ink); transform: translateY(-2px); }
        .bl-featured__img { position: relative; height: clamp(260px, 36vw, 420px); }
        .bl-featured__text { padding: clamp(28px, 4vw, 48px); }
        .bl-featured__title {
          font-family: var(--font-serif);
          font-size: clamp(1.5rem, 3.5vw, 2.5rem);
          font-weight: 400;
          line-height: 1.1;
          letter-spacing: -0.025em;
          color: var(--ink);
          margin: 14px 0 14px;
        }
        .bl-featured__sum {
          font-family: var(--font-sans);
          font-size: 1rem;
          line-height: 1.65;
          color: var(--muted);
          margin: 0 0 24px;
          max-width: 640px;
        }
        .bl-featured__cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: var(--ink);
          font-family: var(--font-sans);
          font-weight: 500;
          font-size: 0.95rem;
          padding-bottom: 4px;
          border-bottom: 1px solid var(--ink);
          transition: gap 0.3s ease;
        }
        .bl-featured:hover .bl-featured__cta { gap: 12px; }

        @media (min-width: 768px) {
          .bl-featured { grid-template-columns: 1.1fr 1fr; }
          .bl-featured__img { height: auto; min-height: 380px; }
        }

        .bl-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(24px, 3vw, 36px);
        }
        @media (min-width: 640px) { .bl-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1024px) { .bl-grid { grid-template-columns: 1fr 1fr 1fr; } }

        .bl-card {
          display: flex;
          flex-direction: column;
          height: 100%;
          background: var(--white);
          border: 1px solid var(--hairline);
          border-radius: var(--radius-lg);
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          transition: border-color 0.3s ease, transform 0.3s ease;
        }
        .bl-card:hover { border-color: var(--ink); transform: translateY(-3px); }
        .bl-card__img { position: relative; height: 200px; }
        .bl-card__body { padding: 22px; display: flex; flex-direction: column; flex: 1; }
        .bl-card__title {
          font-family: var(--font-serif);
          font-size: 1.2rem;
          font-weight: 400;
          line-height: 1.25;
          letter-spacing: -0.015em;
          color: var(--ink);
          margin: 12px 0 8px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .bl-card__sum {
          font-family: var(--font-sans);
          font-size: 0.92rem;
          color: var(--muted);
          line-height: 1.55;
          margin: 0 0 18px;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex: 1;
        }
        .bl-card__cta {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: var(--ink);
          font-family: var(--font-sans);
          font-weight: 500;
          font-size: 0.85rem;
          padding-bottom: 2px;
          border-bottom: 1px solid var(--ink);
          align-self: flex-start;
          transition: gap 0.25s ease;
        }
        .bl-card:hover .bl-card__cta { gap: 10px; }

        .bl-meta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--font-sans);
          font-size: 0.78rem;
          color: var(--muted);
          letter-spacing: 0.005em;
          flex-wrap: wrap;
        }
        .bl-meta :global(span) { display: inline-flex; align-items: center; gap: 4px; }
        .bl-meta__cat { color: var(--gold-dark); font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; font-size: 0.72rem; }
        .bl-meta__sep { opacity: 0.4; }
      `}</style>
    </div>
  );
}
