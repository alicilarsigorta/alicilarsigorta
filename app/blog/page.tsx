"use client";

import { useContent } from "@/lib/content-context";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, User, BookOpen, Search, Sparkles } from "lucide-react";
import { useState, useMemo } from "react";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
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
      const matchCategory =
        activeCategory === "Tümü" || blog.category === activeCategory;
      const matchSearch =
        !searchQuery ||
        blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        blog.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [blogs, activeCategory, searchQuery]);

  const featuredBlog = filteredBlogs[0];
  const restBlogs = filteredBlogs.slice(1);

  return (
    <div style={{ minHeight: "100vh", background: "var(--off-white)" }}>
      {/* ── Hero Section ── */}
      <div
        style={{
          position: "relative",
          background: "var(--cream)",
          borderBottom: "1px solid var(--border)",
          overflow: "hidden",
        }}
      >
        {/* Decorative elements */}
        <div
          style={{
            position: "absolute",
            top: "-50%",
            right: "-20%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(176, 112, 80,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-30%",
            left: "-10%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(176, 112, 80,0.05) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          className="container blog-hero-inner"
          style={{
            textAlign: "center",
            position: "relative",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="section-badge">
              <Sparkles size={14} /> BLOG & HABERLER
            </div>
            <h1 className="section-title" style={{ marginTop: "16px" }}>
              Sigorta Dünyasından <br />
              <span className="gold">Güncel Gelişmeler</span>
            </h1>
            <p
              className="section-sub"
              style={{ margin: "20px auto 0", textAlign: "center" }}
            >
              Sektörel haberler, sigorta ipuçları ve hayatınızı kolaylaştıracak
              rehber içeriklerimiz.
            </p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{
              maxWidth: "500px",
              margin: "40px auto 0",
              position: "relative",
            }}
          >
            <Search
              size={18}
              style={{
                position: "absolute",
                left: "20px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--light-gray)",
              }}
            />
            <input
              type="text"
              placeholder="Yazılarda ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: "100%",
                padding: "16px 20px 16px 52px",
                borderRadius: "100px",
                border: "2px solid var(--border)",
                background: "var(--white)",
                fontSize: "0.95rem",
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 500,
                color: "var(--black)",
                outline: "none",
                transition: "border-color 0.3s, box-shadow 0.3s",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--gold)";
                e.currentTarget.style.boxShadow = "var(--shadow-gold)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.boxShadow = "none";
              }}
            />
          </motion.div>

          {/* Category Filters */}
          {categories.length > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              style={{
                display: "flex",
                gap: "10px",
                justifyContent: "center",
                flexWrap: "wrap",
                marginTop: "28px",
              }}
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    padding: "10px 24px",
                    borderRadius: "100px",
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    fontFamily: "'Outfit', sans-serif",
                    letterSpacing: "0.5px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    border:
                      activeCategory === cat
                        ? "2px solid var(--gold)"
                        : "2px solid var(--border)",
                    background:
                      activeCategory === cat
                        ? "linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)"
                        : "var(--white)",
                    color:
                      activeCategory === cat
                        ? "var(--white)"
                        : "var(--gray)",
                    boxShadow:
                      activeCategory === cat
                        ? "0 8px 25px rgba(176, 112, 80,0.3)"
                        : "none",
                  }}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="container blog-content" style={{ padding: "60px 1.25rem 100px" }}>
        {filteredBlogs.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              textAlign: "center",
              padding: "80px 20px",
            }}
          >
            <BookOpen
              size={64}
              style={{ color: "var(--border)", margin: "0 auto 24px" }}
            />
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                color: "var(--black)",
                marginBottom: "12px",
              }}
            >
              İçerik Bulunamadı
            </h2>
            <p style={{ color: "var(--gray)", fontSize: "1rem" }}>
              {searchQuery
                ? "Aramanızla eşleşen bir yazı bulunamadı."
                : "Henüz bu kategoride blog yazısı bulunmuyor."}
            </p>
          </motion.div>
        ) : (
          <>
            {/* Featured Blog (first post) */}
            {featuredBlog && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                style={{ marginBottom: "60px" }}
              >
                <Link
                  href={`/blog/${featuredBlog.slug}`}
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <motion.div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr",
                      borderRadius: "var(--radius-xl)",
                      overflow: "hidden",
                      background: "var(--white)",
                      border: "1px solid var(--border)",
                      cursor: "pointer",
                    }}
                    whileHover={{
                      boxShadow:
                        "0 30px 80px rgba(176, 112, 80,0.15), 0 0 0 1px rgba(176, 112, 80,0.3)",
                      y: -4,
                    }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr",
                        gap: 0,
                      }}
                      className="blog-featured-grid"
                    >
                      {/* Image */}
                      <div
                        style={{
                          position: "relative",
                          height: "320px",
                          overflow: "hidden",
                        }}
                      >
                        <Image
                          src={featuredBlog.image || "/logo-dark.png"}
                          alt={featuredBlog.title}
                          fill
                          style={{
                            objectFit: "cover",
                            transition: "transform 0.6s ease",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            inset: 0,
                            background:
                              "linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.4) 100%)",
                          }}
                        />
                        <span
                          style={{
                            position: "absolute",
                            top: "20px",
                            left: "20px",
                            background:
                              "linear-gradient(135deg, var(--gold), var(--gold-light))",
                            color: "#fff",
                            fontSize: "0.75rem",
                            fontWeight: 800,
                            padding: "6px 16px",
                            borderRadius: "100px",
                            letterSpacing: "1px",
                            textTransform: "uppercase",
                          }}
                        >
                          ★ ÖNE ÇIKAN
                        </span>
                      </div>

                      {/* Text */}
                      <div className="blog-featured-text" style={{ padding: "clamp(20px, 4vw, 36px) clamp(20px, 4vw, 40px)" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                            marginBottom: "16px",
                            flexWrap: "wrap",
                          }}
                        >
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              background: "var(--cream)",
                              border: "1px solid var(--border)",
                              borderRadius: "100px",
                              padding: "6px 14px",
                              fontSize: "0.8rem",
                              fontWeight: 700,
                              color: "var(--gold-dark)",
                            }}
                          >
                            {featuredBlog.category}
                          </span>
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                              fontSize: "0.85rem",
                              color: "var(--light-gray)",
                              fontWeight: 500,
                            }}
                          >
                            <Calendar size={14} /> {featuredBlog.date}
                          </span>
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "5px",
                              fontSize: "0.85rem",
                              color: "var(--light-gray)",
                              fontWeight: 500,
                            }}
                          >
                            <User size={14} /> {featuredBlog.author}
                          </span>
                        </div>
                        <h2
                          style={{
                            fontSize: "clamp(1.5rem, 3vw, 2rem)",
                            fontWeight: 900,
                            color: "var(--black)",
                            lineHeight: 1.25,
                            marginBottom: "14px",
                            letterSpacing: "-0.02em",
                          }}
                        >
                          {featuredBlog.title}
                        </h2>
                        <p
                          style={{
                            fontSize: "1.05rem",
                            color: "var(--gray)",
                            lineHeight: 1.7,
                            marginBottom: "24px",
                            fontWeight: 500,
                          }}
                        >
                          {featuredBlog.summary}
                        </p>
                        <span
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "8px",
                            color: "var(--gold-dark)",
                            fontWeight: 800,
                            fontSize: "0.95rem",
                          }}
                        >
                          Devamını Oku <ArrowRight size={18} />
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            )}

            {/* Rest of blogs grid */}
            {restBlogs.length > 0 && (
              <motion.div
                className="grid-3"
                variants={container}
                initial="hidden"
                animate="visible"
              >
                {restBlogs.map((blog, idx) => (
                  <motion.div key={blog.id} variants={cardVariant}>
                    <Link
                      href={`/blog/${blog.slug}`}
                      style={{
                        textDecoration: "none",
                        display: "block",
                        height: "100%",
                      }}
                    >
                      <motion.div
                        className="card"
                        style={{
                          height: "100%",
                          display: "flex",
                          flexDirection: "column",
                          overflow: "hidden",
                          cursor: "pointer",
                        }}
                        whileHover={{
                          y: -10,
                          boxShadow:
                            "0 25px 60px rgba(176, 112, 80,0.18), 0 0 0 1px rgba(176, 112, 80,0.3)",
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                      >
                        {/* Card Image */}
                        <div
                          style={{
                            position: "relative",
                            height: "220px",
                            overflow: "hidden",
                          }}
                        >
                          <Image
                            src={blog.image || "/logo-dark.png"}
                            alt={blog.title}
                            fill
                            style={{
                              objectFit: "cover",
                              transition: "transform 0.6s ease",
                            }}
                          />
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              background:
                                "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.3) 100%)",
                            }}
                          />
                          <span
                            style={{
                              position: "absolute",
                              top: "16px",
                              left: "16px",
                              background:
                                "linear-gradient(135deg, var(--gold), var(--gold-light))",
                              color: "#fff",
                              fontSize: "0.7rem",
                              fontWeight: 800,
                              padding: "5px 14px",
                              borderRadius: "100px",
                              letterSpacing: "1px",
                              textTransform: "uppercase",
                            }}
                          >
                            {blog.category}
                          </span>
                        </div>

                        {/* Card Body */}
                        <div
                          style={{
                            padding: "28px 24px",
                            display: "flex",
                            flexDirection: "column",
                            flex: 1,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "14px",
                              marginBottom: "14px",
                              flexWrap: "wrap",
                            }}
                          >
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                fontSize: "0.8rem",
                                color: "var(--light-gray)",
                                fontWeight: 500,
                              }}
                            >
                              <Calendar size={13} /> {blog.date}
                            </span>
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                                fontSize: "0.8rem",
                                color: "var(--light-gray)",
                                fontWeight: 500,
                              }}
                            >
                              <User size={13} /> {blog.author}
                            </span>
                          </div>
                          <h3
                            style={{
                              fontSize: "1.15rem",
                              fontWeight: 800,
                              color: "var(--black)",
                              lineHeight: 1.35,
                              marginBottom: "10px",
                              letterSpacing: "-0.01em",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {blog.title}
                          </h3>
                          <p
                            style={{
                              fontSize: "0.9rem",
                              color: "var(--gray)",
                              lineHeight: 1.65,
                              flex: 1,
                              fontWeight: 500,
                              display: "-webkit-box",
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                            }}
                          >
                            {blog.summary}
                          </p>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                              color: "var(--gold-dark)",
                              fontWeight: 800,
                              fontSize: "0.88rem",
                              marginTop: "20px",
                              letterSpacing: "0.3px",
                            }}
                          >
                            Devamını Oku
                            <motion.span
                              animate={{ x: [0, 4, 0] }}
                              transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                              }}
                            >
                              <ArrowRight size={16} />
                            </motion.span>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* ── CTA Section ── */}
      <div
        className="blog-cta"
        style={{
          background: "var(--black)",
          textAlign: "center",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="container"
          style={{ maxWidth: "700px" }}
        >
          <h2
            style={{
              fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)",
              fontWeight: 900,
              color: "#fff",
              marginBottom: "16px",
              lineHeight: 1.2,
            }}
          >
            En Uygun Sigortayı <span className="gold-shimmer">Biz Bulalım</span>
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              marginBottom: "32px",
              fontWeight: 500,
            }}
          >
            20+ sigorta şirketini anında karşılaştırın, ücretsiz teklif alın.
          </p>
          <Link href="/teklif-al" className="btn btn-gold">
            Ücretsiz Teklif Al <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>

      {/* Responsive styles */}
      <style jsx global>{`
        .blog-hero-inner { padding: 140px 1.25rem 80px; }
        .blog-content { padding: 60px 1.25rem 100px; }
        .blog-cta { padding: 80px 1.25rem; }
        @media (min-width: 768px) {
          .blog-featured-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .blog-featured-grid > div:first-child {
            height: auto !important;
            min-height: 360px;
          }
        }
        @media (max-width: 768px) {
          .blog-hero-inner { padding: 80px 1rem 48px; }
          .blog-content { padding: 36px 1rem 60px; }
          .blog-cta { padding: 56px 1rem; }
        }
      `}</style>
    </div>
  );
}
