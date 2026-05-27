"use client";

import { useContent } from "@/lib/content-context";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, User, Tag, ArrowRight, Share2 } from "lucide-react";
import { use } from "react";

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { content } = useContent();
  const blog = content.blogs?.find(b => b.slug === resolvedParams.slug);
  const otherBlogs = content.blogs?.filter(b => b.slug !== resolvedParams.slug).slice(0, 3) || [];

  if (!blog) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "160px 20px 80px" }}>
        <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "var(--black)", marginBottom: "16px" }}>Yazı Bulunamadı</h1>
        <p style={{ color: "var(--gray)", marginBottom: "32px" }}>Aradığınız blog yazısı mevcut değil veya kaldırılmış olabilir.</p>
        <Link href="/blog" className="btn btn-gold">Blog&apos;a Dön</Link>
      </div>
    );
  }

  return (
    <article style={{ minHeight: "100vh", background: "var(--off-white)" }}>
      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          position: "relative",
          width: "100%",
          height: "clamp(300px, 50vh, 520px)",
          marginTop: "var(--header-h)",
          overflow: "hidden",
        }}
      >
        <Image
          src={blog.image || "/logo-dark.png"}
          alt={blog.title}
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%)",
          }}
        />
        {/* Breadcrumb on image */}
        <div
          className="container"
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translateX(-50%)",
            padding: "0 1.25rem 40px",
            width: "100%",
            maxWidth: "1280px",
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link
              href="/blog"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                color: "rgba(255,255,255,0.8)",
                fontSize: "0.9rem",
                fontWeight: 600,
                textDecoration: "none",
                marginBottom: "16px",
                transition: "color 0.2s",
              }}
            >
              <ArrowLeft size={16} /> Tüm Yazılara Dön
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Content Area */}
      <div className="container" style={{ maxWidth: "900px", padding: "0 1.25rem" }}>
        {/* Article Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: "var(--white)",
            borderRadius: "var(--radius-xl)",
            border: "1px solid var(--border)",
            padding: "clamp(28px, 5vw, 48px)",
            marginTop: "-60px",
            position: "relative",
            zIndex: 10,
            boxShadow: "var(--shadow-soft)",
          }}
        >
          {/* Meta Tags */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "20px",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                background: "linear-gradient(135deg, var(--gold), var(--gold-light))",
                color: "#fff",
                borderRadius: "100px",
                padding: "6px 16px",
                fontSize: "0.78rem",
                fontWeight: 800,
                letterSpacing: "1px",
                textTransform: "uppercase",
              }}
            >
              <Tag size={13} /> {blog.category}
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
              <Calendar size={14} /> {blog.date}
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
              <User size={14} /> {blog.author}
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              fontWeight: 900,
              color: "var(--black)",
              lineHeight: 1.2,
              letterSpacing: "-0.03em",
              marginBottom: "16px",
            }}
          >
            {blog.title}
          </h1>

          {/* Summary */}
          <p
            style={{
              fontSize: "1.15rem",
              color: "var(--gray)",
              lineHeight: 1.75,
              fontWeight: 500,
              borderLeft: "3px solid var(--gold)",
              paddingLeft: "20px",
              margin: "0",
            }}
          >
            {blog.summary}
          </p>
        </motion.div>

        {/* Gold Divider */}
        <div className="gold-divider" style={{ margin: "0 40px" }} />

        {/* Article Body */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          style={{
            background: "var(--white)",
            borderRadius: "0 0 var(--radius-xl) var(--radius-xl)",
            border: "1px solid var(--border)",
            borderTop: "none",
            padding: "clamp(28px, 5vw, 48px)",
          }}
        >
          <div
            style={{
              fontSize: "1.05rem",
              lineHeight: 1.85,
              color: "var(--dark)",
              fontWeight: 450,
            }}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          {/* Author Footer */}
          <div
            style={{
              marginTop: "48px",
              paddingTop: "28px",
              borderTop: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  borderRadius: "16px",
                  background: "linear-gradient(135deg, rgba(201, 164, 73,0.12), rgba(230, 192, 105,0.06))",
                  border: "1px solid rgba(201, 164, 73,0.25)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--gold)",
                }}
              >
                <User size={24} />
              </div>
              <div>
                <p style={{ fontSize: "0.8rem", color: "var(--light-gray)", fontWeight: 500, marginBottom: "2px" }}>
                  Yazar
                </p>
                <p style={{ fontWeight: 800, color: "var(--black)", fontSize: "1rem" }}>
                  {blog.author}
                </p>
              </div>
            </div>
            <Link href="/teklif-al" className="btn btn-gold" style={{ padding: "14px 28px", fontSize: "0.9rem" }}>
              Ücretsiz Teklif Al <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>

        {/* Related Articles */}
        {otherBlogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ marginTop: "80px", paddingBottom: "80px" }}
          >
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <div className="section-badge">DİĞER YAZILAR</div>
              <h2
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 2rem)",
                  fontWeight: 900,
                  color: "var(--black)",
                  marginTop: "12px",
                }}
              >
                İlginizi Çekebilecek <span className="gold">Yazılar</span>
              </h2>
            </div>
            <div className="grid-3">
              {otherBlogs.map((otherBlog) => (
                <Link
                  key={otherBlog.id}
                  href={`/blog/${otherBlog.slug}`}
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <motion.div
                    className="card"
                    style={{
                      overflow: "hidden",
                      cursor: "pointer",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                    whileHover={{
                      y: -8,
                      boxShadow: "0 20px 50px rgba(201, 164, 73,0.15)",
                    }}
                  >
                    <div style={{ position: "relative", height: "180px", overflow: "hidden" }}>
                      <Image
                        src={otherBlog.image || "/logo-dark.png"}
                        alt={otherBlog.title}
                        fill
                        style={{ objectFit: "cover", transition: "transform 0.5s ease" }}
                      />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.25) 100%)",
                        }}
                      />
                    </div>
                    <div style={{ padding: "24px", flex: 1, display: "flex", flexDirection: "column" }}>
                      <span
                        style={{
                          fontSize: "0.75rem",
                          fontWeight: 700,
                          color: "var(--gold-dark)",
                          textTransform: "uppercase",
                          letterSpacing: "1px",
                          marginBottom: "10px",
                        }}
                      >
                        {otherBlog.category}
                      </span>
                      <h3
                        style={{
                          fontSize: "1.05rem",
                          fontWeight: 800,
                          color: "var(--black)",
                          lineHeight: 1.35,
                          marginBottom: "8px",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {otherBlog.title}
                      </h3>
                      <p
                        style={{
                          fontSize: "0.85rem",
                          color: "var(--gray)",
                          lineHeight: 1.6,
                          fontWeight: 500,
                          flex: 1,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {otherBlog.summary}
                      </p>
                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          color: "var(--gold-dark)",
                          fontWeight: 800,
                          fontSize: "0.85rem",
                          marginTop: "16px",
                        }}
                      >
                        Oku <ArrowRight size={14} />
                      </span>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </article>
  );
}
