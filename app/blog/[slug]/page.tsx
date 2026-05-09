"use client";

import { useContent } from "@/lib/content-context";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, User, Tag, ArrowUpRight } from "lucide-react";
import { use } from "react";

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const { content } = useContent();
  const blog = content.blogs?.find(b => b.slug === resolvedParams.slug);
  const otherBlogs = content.blogs?.filter(b => b.slug !== resolvedParams.slug).slice(0, 3) || [];

  if (!blog) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "160px 20px 80px", textAlign: "center" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", fontWeight: 400, color: "var(--ink)", marginBottom: 16, letterSpacing: "-0.025em" }}>Yazı Bulunamadı</h1>
        <p style={{ color: "var(--muted)", marginBottom: 32, fontFamily: "var(--font-sans)" }}>Aradığınız blog yazısı mevcut değil veya kaldırılmış olabilir.</p>
        <Link href="/blog" className="btn btn-gold">Blog&apos;a Dön</Link>
      </div>
    );
  }

  return (
    <article style={{ minHeight: "100vh", background: "var(--white)" }}>
      {/* Hero image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="bp-hero"
      >
        <Image src={blog.image || "/logo.png"} alt={blog.title} fill style={{ objectFit: "cover" }} priority />
        <div className="bp-hero__overlay" />
        <div className="container bp-hero__back">
          <Link href="/blog" className="bp-back">
            <ArrowLeft size={14} strokeWidth={1.5} /> Tüm Yazılara Dön
          </Link>
        </div>
      </motion.div>

      {/* Header card */}
      <div className="container" style={{ maxWidth: 880 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="bp-head"
        >
          <div className="bp-meta">
            <span className="bp-meta__cat"><Tag size={12} strokeWidth={1.5} /> {blog.category}</span>
            <span className="bp-meta__sep">·</span>
            <span><Calendar size={12} strokeWidth={1.5} /> {blog.date}</span>
            <span className="bp-meta__sep">·</span>
            <span><User size={12} strokeWidth={1.5} /> {blog.author}</span>
          </div>
          <h1 className="bp-title">{blog.title}</h1>
          <p className="bp-summary">{blog.summary}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bp-body"
        >
          <div className="bp-content" dangerouslySetInnerHTML={{ __html: blog.content }} />

          <div className="bp-author">
            <div className="bp-author__info">
              <span className="bp-author__avatar"><User size={20} strokeWidth={1.5} /></span>
              <div>
                <p className="bp-author__label">Yazar</p>
                <p className="bp-author__name">{blog.author}</p>
              </div>
            </div>
            <Link href="/teklif-al" className="btn btn-gold">
              Ücretsiz Teklif Al <ArrowUpRight size={14} strokeWidth={1.5} />
            </Link>
          </div>
        </motion.div>

        {otherBlogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bp-related"
          >
            <div className="bp-related__head">
              <div className="section-badge">Diğer Yazılar</div>
              <h2 className="section-title">İlginizi çekebilecek <span className="gold">yazılar</span></h2>
            </div>

            <div className="bp-related__grid">
              {otherBlogs.map((o) => (
                <Link key={o.id} href={`/blog/${o.slug}`} className="bp-card">
                  <div className="bp-card__img">
                    <Image src={o.image || "/logo.png"} alt={o.title} fill style={{ objectFit: "cover" }} />
                  </div>
                  <div className="bp-card__body">
                    <span className="bp-meta__cat" style={{ marginBottom: 8, display: "inline-block" }}>{o.category}</span>
                    <h3>{o.title}</h3>
                    <p>{o.summary}</p>
                    <span className="bp-card__cta">Oku <ArrowUpRight size={14} strokeWidth={1.5} /></span>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      <style jsx global>{`
        .bp-hero {
          position: relative;
          width: 100%;
          height: clamp(280px, 50vh, 540px);
          margin-top: var(--header-h);
          overflow: hidden;
        }
        .bp-hero__overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.55) 100%);
        }
        .bp-hero__back {
          position: absolute;
          left: 50%;
          bottom: 28px;
          transform: translateX(-50%);
          width: 100%;
          padding: 0 1.25rem;
          z-index: 2;
        }
        .bp-back {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: rgba(255,255,255,0.85);
          font-family: var(--font-sans);
          font-size: 0.85rem;
          font-weight: 500;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .bp-back:hover { color: var(--gold-light); }

        .bp-head {
          background: var(--white);
          border: 1px solid var(--hairline);
          border-radius: var(--radius-xl);
          padding: clamp(28px, 4vw, 56px);
          margin-top: -60px;
          position: relative;
          z-index: 5;
          box-shadow: var(--shadow-soft);
        }
        .bp-meta {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-sans);
          font-size: 0.8rem;
          color: var(--muted);
          flex-wrap: wrap;
          margin-bottom: 18px;
        }
        .bp-meta > span { display: inline-flex; align-items: center; gap: 5px; }
        .bp-meta__cat { color: var(--gold-dark); font-weight: 500; letter-spacing: 0.05em; text-transform: uppercase; font-size: 0.72rem; }
        .bp-meta__sep { opacity: 0.4; }
        .bp-title {
          font-family: var(--font-serif);
          font-size: clamp(1.85rem, 4.5vw, 3.25rem);
          font-weight: 400;
          line-height: 1.1;
          letter-spacing: -0.025em;
          color: var(--ink);
          margin: 0 0 18px;
        }
        .bp-summary {
          font-family: var(--font-sans);
          font-size: clamp(1rem, 1.4vw, 1.15rem);
          line-height: 1.6;
          color: var(--muted);
          padding-left: 18px;
          border-left: 2px solid var(--gold-dark);
          margin: 0;
        }

        .bp-body {
          padding: clamp(36px, 5vw, 64px) 0 clamp(48px, 6vw, 80px);
        }
        .bp-content {
          font-family: var(--font-sans);
          font-size: 1.05rem;
          line-height: 1.85;
          color: var(--ink);
        }
        .bp-content p { margin: 0 0 1.25rem; }
        .bp-content h2 { font-family: var(--font-serif); font-weight: 400; font-size: 1.75rem; letter-spacing: -0.02em; margin: 2rem 0 1rem; color: var(--ink); }
        .bp-content h3 { font-family: var(--font-serif); font-weight: 400; font-size: 1.35rem; letter-spacing: -0.015em; margin: 1.5rem 0 0.75rem; color: var(--ink); }
        .bp-content a { color: var(--gold-dark); text-decoration: underline; text-underline-offset: 3px; }
        .bp-content blockquote { border-left: 2px solid var(--gold-dark); padding-left: 18px; margin: 1.5rem 0; color: var(--muted); font-style: italic; font-family: var(--font-serif); }
        .bp-content ul, .bp-content ol { padding-left: 1.5rem; margin: 0 0 1.25rem; }
        .bp-content li { margin-bottom: 8px; }

        .bp-author {
          margin-top: 48px;
          padding-top: 28px;
          border-top: 1px solid var(--hairline);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
        }
        .bp-author__info { display: flex; align-items: center; gap: 14px; }
        .bp-author__avatar {
          width: 44px; height: 44px;
          border-radius: 50%;
          background: var(--cream);
          border: 1px solid var(--hairline);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: var(--gold-dark);
        }
        .bp-author__label { font-family: var(--font-sans); font-size: 0.72rem; color: var(--muted); letter-spacing: 0.12em; text-transform: uppercase; margin: 0 0 2px; }
        .bp-author__name { font-family: var(--font-serif); font-size: 1.05rem; color: var(--ink); margin: 0; }

        .bp-related { padding: clamp(48px, 6vw, 96px) 0; }
        .bp-related__head { margin-bottom: clamp(32px, 4vw, 48px); }
        .bp-related__grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 640px) { .bp-related__grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1024px) { .bp-related__grid { grid-template-columns: 1fr 1fr 1fr; } }

        .bp-card {
          display: flex;
          flex-direction: column;
          background: var(--white);
          border: 1px solid var(--hairline);
          border-radius: var(--radius-lg);
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          transition: border-color 0.3s ease, transform 0.3s ease;
          height: 100%;
        }
        .bp-card:hover { border-color: var(--ink); transform: translateY(-3px); }
        .bp-card__img { position: relative; height: 180px; }
        .bp-card__body { padding: 22px; flex: 1; display: flex; flex-direction: column; }
        .bp-card__body h3 {
          font-family: var(--font-serif);
          font-size: 1.05rem;
          font-weight: 400;
          line-height: 1.3;
          letter-spacing: -0.015em;
          color: var(--ink);
          margin: 0 0 8px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .bp-card__body p {
          font-family: var(--font-sans);
          font-size: 0.88rem;
          color: var(--muted);
          line-height: 1.55;
          margin: 0 0 16px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          flex: 1;
        }
        .bp-card__cta {
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
        }
      `}</style>
    </article>
  );
}
