"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, FileText, Edit3, Image, LogOut, 
  Settings, ChevronDown, X, Menu
} from "lucide-react";
import { useOffers } from "@/lib/offers-context";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Teklif Yönetimi", href: "/admin/teklifler", icon: FileText, showBadge: true },
  { label: "İçerik Yönetimi", href: "/admin/icerik", icon: Edit3 },
  { label: "Görünüm", href: "/admin/gorunum", icon: Image },
  { label: "Ayarlar", href: "/admin/ayarlar", icon: Settings },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { stats } = useOffers();

  const isActive = (href: string) => {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile backdrop */}
      <div 
        className={`admin-sidebar-backdrop ${isOpen ? "open" : ""}`} 
        onClick={onClose} 
      />
      
      <aside className={`admin-sidebar ${isOpen ? "open" : ""}`}>
        {/* Brand */}
        <div className="admin-sidebar-brand">
          <img src="/logo.png" alt="Alıcılar Sigorta" />
          <div className="admin-sidebar-brand-text">
            <span className="admin-sidebar-brand-name">ALICILAR</span>
            <span className="admin-sidebar-brand-sub">Admin Panel</span>
          </div>
          <button 
            className="admin-mobile-toggle" 
            onClick={onClose}
            style={{ marginLeft: "auto" }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="admin-sidebar-nav">
          <div className="admin-sidebar-section">Ana Menü</div>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`admin-nav-link ${isActive(item.href) ? "active" : ""}`}
              onClick={onClose}
            >
              <item.icon className="nav-icon" size={20} />
              {item.label}
              {item.showBadge && stats.pending > 0 && (
                <span className="admin-nav-badge">{stats.pending}</span>
              )}
            </Link>
          ))}

          <div className="admin-sidebar-section" style={{ marginTop: 12 }}>Hızlı Erişim</div>
          <Link 
            href="/" 
            className="admin-nav-link"
            target="_blank"
          >
            <ChevronDown className="nav-icon" size={20} style={{ transform: "rotate(-90deg)" }} />
            Siteyi Görüntüle
          </Link>
        </nav>

        {/* Footer */}
        <div className="admin-sidebar-footer">
          <div className="admin-sidebar-user">
            <div className="admin-avatar">AS</div>
            <div>
              <div className="admin-user-name">Admin</div>
              <div className="admin-user-role">Yönetici</div>
            </div>
            <button
              onClick={() => {
                sessionStorage.removeItem("admin_auth");
                window.location.href = "/admin/login";
              }}
              style={{ 
                marginLeft: "auto", background: "none", border: "none",
                color: "var(--admin-text-dim)", cursor: "pointer", padding: 4 
              }}
              title="Çıkış Yap"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
