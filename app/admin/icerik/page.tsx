"use client";

import { useState } from "react";
import { useContent } from "@/lib/content-context";
import { 
  ChevronDown, ChevronUp, Save, RotateCcw, Plus, Trash2, 
  Star, Zap, Headphones, Lock, Award, Type, Image, 
  MessageSquare, Users, Phone, MapPin, Mail, Edit3,
  HelpCircle, Layers, Megaphone, Shield, FileText, Package
} from "lucide-react";
import { toast } from "sonner";
import type { SiteContent, FAQItem, CampaignSlide } from "@/lib/default-content";

interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function CollapsibleSection({ title, icon, children, defaultOpen = false }: SectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="admin-content-section">
      <div className="admin-content-section-header" onClick={() => setOpen(!open)}>
        <div className="admin-content-section-title">
          {icon}
          {title}
        </div>
        {open ? <ChevronUp size={18} color="var(--admin-text-dim)" /> : <ChevronDown size={18} color="var(--admin-text-dim)" />}
      </div>
      {open && <div className="admin-content-section-body">{children}</div>}
    </div>
  );
}

export default function IcerikPage() {
  const { content, updateSection, resetContent } = useContent();
  
  // Local edit state for each section
  const [hero, setHero] = useState(content.hero);
  const [faq, setFaq] = useState(content.faq);
  const [partners, setPartners] = useState(content.partners);
  const [contact, setContact] = useState(content.contact);
  const [promo, setPromo] = useState(content.promo);
  const [about, setAbout] = useState(content.about);
  const [whyUs, setWhyUs] = useState(content.whyUs);
  const [campaigns, setCampaigns] = useState(content.campaigns);
  const [blogs, setBlogs] = useState(content.blogs || []);
  const [products, setProducts] = useState(content.products || []);

  const saveSection = (key: keyof SiteContent, value: any) => {
    updateSection(key, value);
    toast.success("Değişiklikler kaydedildi!");
  };

  const handleReset = () => {
    if (confirm("Tüm içeriği varsayılan haline döndürmek istediğinize emin misiniz?")) {
      resetContent();
      window.location.reload();
    }
  };

  return (
    <div>
      {/* Top Actions */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
        <p style={{ color: "var(--admin-text-muted)", fontSize: "0.92rem" }}>
          Sitenizdeki tüm metin ve içerikleri buradan düzenleyebilirsiniz.
        </p>
        <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={handleReset}>
          <RotateCcw size={14} /> Varsayılana Dön
        </button>
      </div>

      {/* ── HERO SECTION ── */}
      <CollapsibleSection title="Hero Bölümü" icon={<Star size={18} color="var(--admin-gold)" />} defaultOpen>
        <div className="admin-field-group">
          <div>
            <label className="admin-label">Başlık</label>
            <input className="admin-input" value={hero.title} onChange={e => setHero({ ...hero, title: e.target.value })} />
          </div>
          <div>
            <label className="admin-label">Vurgulanan Kısım</label>
            <input className="admin-input" value={hero.titleHighlight} onChange={e => setHero({ ...hero, titleHighlight: e.target.value })} />
          </div>
        </div>
        <div className="admin-field-group">
          <div>
            <label className="admin-label">Badge Metni</label>
            <input className="admin-input" value={hero.badge} onChange={e => setHero({ ...hero, badge: e.target.value })} />
          </div>
          <div>
            <label className="admin-label">Buton Metni</label>
            <input className="admin-input" value={hero.ctaText} onChange={e => setHero({ ...hero, ctaText: e.target.value })} />
          </div>
        </div>
        <div className="admin-field-group full">
          <div>
            <label className="admin-label">Alt Başlık</label>
            <textarea className="admin-input admin-textarea" value={hero.subtitle} onChange={e => setHero({ ...hero, subtitle: e.target.value })} />
          </div>
        </div>
        <div>
          <label className="admin-label" style={{ marginBottom: 12 }}>İstatistikler</label>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 12 }}>
            {hero.stats.map((s, i) => (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <input
                  className="admin-input"
                  value={s.value}
                  placeholder="Değer"
                  onChange={e => {
                    const newStats = [...hero.stats];
                    newStats[i] = { ...newStats[i], value: e.target.value };
                    setHero({ ...hero, stats: newStats });
                  }}
                  style={{ fontSize: "0.85rem" }}
                />
                <input
                  className="admin-input"
                  value={s.label}
                  placeholder="Etiket"
                  onChange={e => {
                    const newStats = [...hero.stats];
                    newStats[i] = { ...newStats[i], label: e.target.value };
                    setHero({ ...hero, stats: newStats });
                  }}
                  style={{ fontSize: "0.85rem" }}
                />
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => saveSection("hero", hero)}>
            <Save size={14} /> Kaydet
          </button>
        </div>
      </CollapsibleSection>

      {/* ── CAMPAIGNS ── */}
      <CollapsibleSection title="Kampanya Slider" icon={<Megaphone size={18} color="var(--admin-gold)" />}>
        {campaigns.map((c, i) => (
          <div key={c.id} style={{ background: "var(--admin-bg)", borderRadius: 12, padding: 20, marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span style={{ fontWeight: 800, color: "#fff", fontSize: "0.9rem" }}>Kampanya {i + 1}</span>
              {campaigns.length > 1 && (
                <button
                  className="admin-btn-icon"
                  style={{ color: "var(--admin-red)" }}
                  onClick={() => setCampaigns(campaigns.filter((_, j) => j !== i))}
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
            <div className="admin-field-group">
              <div>
                <label className="admin-label">Başlık</label>
                <input className="admin-input" value={c.title} onChange={e => {
                  const u = [...campaigns]; u[i] = { ...u[i], title: e.target.value }; setCampaigns(u);
                }} />
              </div>
              <div>
                <label className="admin-label">Etiket</label>
                <input className="admin-input" value={c.tag} onChange={e => {
                  const u = [...campaigns]; u[i] = { ...u[i], tag: e.target.value }; setCampaigns(u);
                }} />
              </div>
            </div>
            <div className="admin-field-group full">
              <div>
                <label className="admin-label">Açıklama</label>
                <textarea className="admin-input admin-textarea" value={c.desc} onChange={e => {
                  const u = [...campaigns]; u[i] = { ...u[i], desc: e.target.value }; setCampaigns(u);
                }} style={{ minHeight: 60 }} />
              </div>
            </div>
          </div>
        ))}
        <button
          className="admin-btn admin-btn-secondary admin-btn-sm"
          onClick={() => setCampaigns([...campaigns, {
            id: Date.now(), title: "Yeni Kampanya", desc: "Açıklama ekleyin",
            tag: "YENİ", color: "linear-gradient(135deg, #fffdf8 0%, #fdf4db 100%)",
            textColor: "var(--black)", image: "/slider_car.png"
          }])}
          style={{ marginBottom: 12 }}
        >
          <Plus size={14} /> Kampanya Ekle
        </button>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => saveSection("campaigns", campaigns)}>
            <Save size={14} /> Kaydet
          </button>
        </div>
      </CollapsibleSection>

      {/* ── WHY US ── */}
      <CollapsibleSection title="Neden Biz Bölümü" icon={<Shield size={18} color="var(--admin-gold)" />}>
        <div className="admin-field-group">
          <div>
            <label className="admin-label">Başlık</label>
            <input className="admin-input" value={whyUs.title} onChange={e => setWhyUs({ ...whyUs, title: e.target.value })} />
          </div>
          <div>
            <label className="admin-label">Vurgulanan Kelime</label>
            <input className="admin-input" value={whyUs.titleHighlight} onChange={e => setWhyUs({ ...whyUs, titleHighlight: e.target.value })} />
          </div>
        </div>
        <div className="admin-field-group full">
          <div>
            <label className="admin-label">Alt Başlık</label>
            <textarea className="admin-input admin-textarea" value={whyUs.subtitle} onChange={e => setWhyUs({ ...whyUs, subtitle: e.target.value })} style={{ minHeight: 60 }} />
          </div>
        </div>
        {whyUs.features.map((f, i) => (
          <div key={i} style={{ background: "var(--admin-bg)", borderRadius: 12, padding: 16 }}>
            <div className="admin-field-group">
              <div>
                <label className="admin-label">Özellik {i + 1} — Başlık</label>
                <input className="admin-input" value={f.title} onChange={e => {
                  const u = [...whyUs.features]; u[i] = { ...u[i], title: e.target.value }; setWhyUs({ ...whyUs, features: u });
                }} />
              </div>
              <div>
                <label className="admin-label">Açıklama</label>
                <input className="admin-input" value={f.desc} onChange={e => {
                  const u = [...whyUs.features]; u[i] = { ...u[i], desc: e.target.value }; setWhyUs({ ...whyUs, features: u });
                }} />
              </div>
            </div>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => saveSection("whyUs", whyUs)}>
            <Save size={14} /> Kaydet
          </button>
        </div>
      </CollapsibleSection>

      {/* ── FAQ ── */}
      <CollapsibleSection title="Sıkça Sorulan Sorular" icon={<HelpCircle size={18} color="var(--admin-gold)" />}>
        {faq.map((f, i) => (
          <div key={i} style={{ background: "var(--admin-bg)", borderRadius: 12, padding: 16, position: "relative" }}>
            <button
              className="admin-btn-icon"
              style={{ position: "absolute", top: 12, right: 12, color: "var(--admin-red)" }}
              onClick={() => setFaq(faq.filter((_, j) => j !== i))}
            >
              <Trash2 size={14} />
            </button>
            <div className="admin-field-group full">
              <div>
                <label className="admin-label">Soru {i + 1}</label>
                <input className="admin-input" value={f.q} onChange={e => {
                  const u = [...faq]; u[i] = { ...u[i], q: e.target.value }; setFaq(u);
                }} />
              </div>
            </div>
            <div className="admin-field-group full">
              <div>
                <label className="admin-label">Cevap</label>
                <textarea className="admin-input admin-textarea" value={f.a} onChange={e => {
                  const u = [...faq]; u[i] = { ...u[i], a: e.target.value }; setFaq(u);
                }} style={{ minHeight: 60 }} />
              </div>
            </div>
          </div>
        ))}
        <button
          className="admin-btn admin-btn-secondary admin-btn-sm"
          onClick={() => setFaq([...faq, { q: "", a: "" }])}
          style={{ marginBottom: 12 }}
        >
          <Plus size={14} /> Soru Ekle
        </button>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => saveSection("faq", faq)}>
            <Save size={14} /> Kaydet
          </button>
        </div>
      </CollapsibleSection>

      {/* ── PARTNERS ── */}
      <CollapsibleSection title="Partner Logoları" icon={<Users size={18} color="var(--admin-gold)" />}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          {partners.map((p, i) => (
            <div key={i} style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "var(--admin-bg)", padding: "8px 14px",
              borderRadius: 10, border: "1px solid var(--admin-border)"
            }}>
              <input
                className="admin-input"
                value={p}
                onChange={e => {
                  const u = [...partners]; u[i] = e.target.value; setPartners(u);
                }}
                style={{ border: "none", background: "transparent", padding: "4px 0", width: 140, fontSize: "0.85rem" }}
              />
              <button
                style={{ background: "none", border: "none", color: "var(--admin-red)", cursor: "pointer", padding: 2 }}
                onClick={() => setPartners(partners.filter((_, j) => j !== i))}
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 12 }}>
          <button
            className="admin-btn admin-btn-secondary admin-btn-sm"
            onClick={() => setPartners([...partners, "Yeni Partner"])}
          >
            <Plus size={14} /> Partner Ekle
          </button>
          <div style={{ marginLeft: "auto" }}>
            <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => saveSection("partners", partners)}>
              <Save size={14} /> Kaydet
            </button>
          </div>
        </div>
      </CollapsibleSection>

      {/* ── CONTACT ── */}
      <CollapsibleSection title="İletişim Bilgileri" icon={<Phone size={18} color="var(--admin-gold)" />}>
        <div className="admin-field-group">
          <div>
            <label className="admin-label">Telefon</label>
            <input className="admin-input" value={contact.phone} onChange={e => setContact({ ...contact, phone: e.target.value })} />
          </div>
          <div>
            <label className="admin-label">E-posta</label>
            <input className="admin-input" value={contact.email} onChange={e => setContact({ ...contact, email: e.target.value })} />
          </div>
        </div>
        <div className="admin-field-group">
          <div>
            <label className="admin-label">Adres</label>
            <input className="admin-input" value={contact.address} onChange={e => setContact({ ...contact, address: e.target.value })} />
          </div>
          <div>
            <label className="admin-label">WhatsApp Numarası</label>
            <input className="admin-input" value={contact.whatsapp} onChange={e => setContact({ ...contact, whatsapp: e.target.value })} />
          </div>
        </div>
        <div className="admin-field-group">
          <div>
            <label className="admin-label">Instagram URL</label>
            <input className="admin-input" value={contact.socialLinks.instagram} onChange={e => setContact({ ...contact, socialLinks: { ...contact.socialLinks, instagram: e.target.value } })} />
          </div>
          <div>
            <label className="admin-label">Facebook URL</label>
            <input className="admin-input" value={contact.socialLinks.facebook} onChange={e => setContact({ ...contact, socialLinks: { ...contact.socialLinks, facebook: e.target.value } })} />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => saveSection("contact", contact)}>
            <Save size={14} /> Kaydet
          </button>
        </div>
      </CollapsibleSection>

      {/* ── ABOUT ── */}
      <CollapsibleSection title="Hakkımızda İçeriği" icon={<Edit3 size={18} color="var(--admin-gold)" />}>
        <div className="admin-field-group">
          <div>
            <label className="admin-label">Başlık</label>
            <input className="admin-input" value={about.title} onChange={e => setAbout({ ...about, title: e.target.value })} />
          </div>
          <div>
            <label className="admin-label">Vurgulanan Kısım</label>
            <input className="admin-input" value={about.titleHighlight} onChange={e => setAbout({ ...about, titleHighlight: e.target.value })} />
          </div>
        </div>
        <div className="admin-field-group full">
          <div>
            <label className="admin-label">1. Paragraf</label>
            <textarea className="admin-input admin-textarea" value={about.description} onChange={e => setAbout({ ...about, description: e.target.value })} />
          </div>
        </div>
        <div className="admin-field-group full">
          <div>
            <label className="admin-label">2. Paragraf</label>
            <textarea className="admin-input admin-textarea" value={about.description2} onChange={e => setAbout({ ...about, description2: e.target.value })} />
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => saveSection("about", about)}>
            <Save size={14} /> Kaydet
          </button>
        </div>
      </CollapsibleSection>

      {/* ── PROMO SECTION ── */}
      <CollapsibleSection title="Tanıtım Bölümü" icon={<Layers size={18} color="var(--admin-gold)" />}>
        <div className="admin-field-group">
          <div>
            <label className="admin-label">Başlık</label>
            <input className="admin-input" value={promo.title} onChange={e => setPromo({ ...promo, title: e.target.value })} />
          </div>
          <div>
            <label className="admin-label">Vurgulanan Kelime</label>
            <input className="admin-input" value={promo.titleHighlight} onChange={e => setPromo({ ...promo, titleHighlight: e.target.value })} />
          </div>
        </div>
        <div className="admin-field-group full">
          <div>
            <label className="admin-label">Alt Başlık</label>
            <textarea className="admin-input admin-textarea" value={promo.subtitle} onChange={e => setPromo({ ...promo, subtitle: e.target.value })} style={{ minHeight: 60 }} />
          </div>
        </div>
        <div>
          <label className="admin-label" style={{ marginBottom: 12 }}>Maddeler</label>
          {promo.bullets.map((b, i) => (
            <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <input className="admin-input" value={b} onChange={e => {
                const u = [...promo.bullets]; u[i] = e.target.value; setPromo({ ...promo, bullets: u });
              }} />
              <button
                className="admin-btn-icon"
                style={{ color: "var(--admin-red)", flexShrink: 0 }}
                onClick={() => setPromo({ ...promo, bullets: promo.bullets.filter((_, j) => j !== i) })}
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          <button
            className="admin-btn admin-btn-secondary admin-btn-sm"
            onClick={() => setPromo({ ...promo, bullets: [...promo.bullets, "Yeni madde"] })}
            style={{ marginTop: 4 }}
          >
            <Plus size={14} /> Madde Ekle
          </button>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => saveSection("promo", promo)}>
            <Save size={14} /> Kaydet
          </button>
        </div>
      </CollapsibleSection>

      {/* ── PRODUCTS ── */}
      <CollapsibleSection title="Ürün ve Hizmetler" icon={<Package size={18} color="var(--admin-gold)" />}>
        {products.map((p, i) => (
          <div key={p.id} style={{ background: "var(--admin-bg)", borderRadius: 12, padding: 20, marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span style={{ fontWeight: 800, color: "#fff", fontSize: "0.9rem" }}>Ürün {i + 1}: {p.title}</span>
            </div>
            <div className="admin-field-group">
              <div>
                <label className="admin-label">Başlık</label>
                <input className="admin-input" value={p.title} onChange={e => {
                  const u = [...products]; u[i] = { ...u[i], title: e.target.value }; setProducts(u);
                }} />
              </div>
              <div>
                <label className="admin-label">Kısa Açıklama (Kart İçin)</label>
                <input className="admin-input" value={p.desc} onChange={e => {
                  const u = [...products]; u[i] = { ...u[i], desc: e.target.value }; setProducts(u);
                }} />
              </div>
            </div>
            <div className="admin-field-group full">
              <div>
                <label className="admin-label">Detaylı Açıklama (Alt Sayfa İçin)</label>
                <textarea className="admin-input admin-textarea" value={p.detailedDescription || ""} onChange={e => {
                  const u = [...products]; u[i] = { ...u[i], detailedDescription: e.target.value }; setProducts(u);
                }} style={{ minHeight: 60 }} />
              </div>
            </div>
          </div>
        ))}
        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
          <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => saveSection("products", products)}>
            <Save size={14} /> Kaydet
          </button>
        </div>
      </CollapsibleSection>

      {/* ── BLOGS ── */}
      <CollapsibleSection title="Blog ve Haberler" icon={<FileText size={18} color="var(--admin-gold)" />}>
        {blogs.map((b, i) => (
          <div key={b.id} style={{ background: "var(--admin-bg)", borderRadius: 12, padding: 20, marginBottom: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <span style={{ fontWeight: 800, color: "#fff", fontSize: "0.9rem" }}>{b.title || "Yeni Blog"}</span>
              <button
                className="admin-btn-icon"
                style={{ color: "var(--admin-red)" }}
                onClick={() => setBlogs(blogs.filter((_, j) => j !== i))}
              >
                <Trash2 size={14} />
              </button>
            </div>
            <div className="admin-field-group">
              <div>
                <label className="admin-label">Başlık</label>
                <input className="admin-input" value={b.title} onChange={e => {
                  const u = [...blogs]; u[i] = { ...u[i], title: e.target.value }; setBlogs(u);
                }} />
              </div>
              <div>
                <label className="admin-label">Slug (URL)</label>
                <input className="admin-input" value={b.slug} onChange={e => {
                  const u = [...blogs]; u[i] = { ...u[i], slug: e.target.value }; setBlogs(u);
                }} />
              </div>
            </div>
            <div className="admin-field-group">
              <div>
                <label className="admin-label">Kategori</label>
                <input className="admin-input" value={b.category} onChange={e => {
                  const u = [...blogs]; u[i] = { ...u[i], category: e.target.value }; setBlogs(u);
                }} />
              </div>
              <div>
                <label className="admin-label">Yazar</label>
                <input className="admin-input" value={b.author} onChange={e => {
                  const u = [...blogs]; u[i] = { ...u[i], author: e.target.value }; setBlogs(u);
                }} />
              </div>
            </div>
            <div className="admin-field-group full">
              <div>
                <label className="admin-label">Özet</label>
                <textarea className="admin-input admin-textarea" value={b.summary} onChange={e => {
                  const u = [...blogs]; u[i] = { ...u[i], summary: e.target.value }; setBlogs(u);
                }} style={{ minHeight: 60 }} />
              </div>
            </div>
          </div>
        ))}
        <button
          className="admin-btn admin-btn-secondary admin-btn-sm"
          onClick={() => setBlogs([...blogs, {
            id: `blog-${Date.now()}`, slug: "yeni-blog", title: "Yeni Blog", summary: "", content: "<p>İçerik buraya...</p>", image: "/logo-dark.png", date: new Date().toISOString().split('T')[0], author: "Admin", category: "Genel"
          }])}
          style={{ marginBottom: 12 }}
        >
          <Plus size={14} /> Blog Ekle
        </button>
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => saveSection("blogs", blogs)}>
            <Save size={14} /> Kaydet
          </button>
        </div>
      </CollapsibleSection>
    </div>
  );
}
