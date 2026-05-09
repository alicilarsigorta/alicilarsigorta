"use client";

import { Search, Menu } from "lucide-react";
import NotificationCenter from "@/components/admin/NotificationCenter";

interface AdminHeaderProps {
  title: string;
  onMenuToggle: () => void;
}

export default function AdminHeader({ title, onMenuToggle }: AdminHeaderProps) {
  return (
    <header className="admin-header">
      <button className="admin-mobile-toggle" onClick={onMenuToggle}>
        <Menu size={18} />
      </button>
      <h1 className="admin-header-title">{title}</h1>

      <div className="admin-header-search">
        <Search size={16} className="search-icon" />
        <input type="text" placeholder="Ara..." />
      </div>

      <div className="admin-header-actions">
        <NotificationCenter />
      </div>
    </header>
  );
}
