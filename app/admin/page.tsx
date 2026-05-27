"use client";

import { useOffers } from "@/lib/offers-context";
import { 
  FileText, Clock, CheckCircle, XCircle, Phone,
  TrendingUp, ArrowUpRight, ArrowDownRight, Calendar
} from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";

const statusLabels: Record<string, string> = {
  pending: "Bekliyor",
  contacted: "İletişime Geçildi",
  completed: "Tamamlandı",
  rejected: "Reddedildi",
};

const statusColors: Record<string, string> = {
  pending: "var(--admin-orange)",
  contacted: "var(--admin-blue)",
  completed: "var(--admin-green)",
  rejected: "var(--admin-red)",
};

const CHART_COLORS = ["#f59e0b", "#3b82f6", "#10b981", "#ef4444"];

export default function AdminDashboard() {
  const { offers, stats } = useOffers();

  // Last 7 days chart data
  const chartData = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    const dayStr = format(date, "dd MMM", { locale: tr });
    const dayStart = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    const dayEnd = new Date(dayStart);
    dayEnd.setDate(dayEnd.getDate() + 1);
    const count = offers.filter(o => {
      const d = new Date(o.createdAt);
      return d >= dayStart && d < dayEnd;
    }).length;
    return { name: dayStr, teklif: count };
  });

  // Pie chart data
  const pieData = [
    { name: "Bekliyor", value: stats.pending, color: "#f59e0b" },
    { name: "İletişime Geçildi", value: stats.contacted, color: "#3b82f6" },
    { name: "Tamamlandı", value: stats.completed, color: "#10b981" },
    { name: "Reddedildi", value: stats.rejected, color: "#ef4444" },
  ].filter(d => d.value > 0);

  const recentOffers = offers.slice(0, 5);

  return (
    <div>
      {/* Stats Grid */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ background: "rgba(201, 164, 73,0.1)", color: "var(--admin-gold)" }}>
            <FileText size={24} />
          </div>
          <div className="admin-stat-info">
            <div className="admin-stat-value">{stats.total}</div>
            <div className="admin-stat-label">Toplam Teklif</div>
            <div className="admin-stat-change up">
              <ArrowUpRight size={12} /> Bugün +{stats.todayCount}
            </div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ background: "rgba(245,158,11,0.1)", color: "var(--admin-orange)" }}>
            <Clock size={24} />
          </div>
          <div className="admin-stat-info">
            <div className="admin-stat-value">{stats.pending}</div>
            <div className="admin-stat-label">Bekleyen</div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ background: "rgba(16,185,129,0.1)", color: "var(--admin-green)" }}>
            <CheckCircle size={24} />
          </div>
          <div className="admin-stat-info">
            <div className="admin-stat-value">{stats.completed}</div>
            <div className="admin-stat-label">Tamamlanan</div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon" style={{ background: "rgba(59,130,246,0.1)", color: "var(--admin-blue)" }}>
            <Phone size={24} />
          </div>
          <div className="admin-stat-info">
            <div className="admin-stat-value">{stats.contacted}</div>
            <div className="admin-stat-label">İletişime Geçilen</div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="admin-dashboard-charts" style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 24, marginBottom: 32 }}>
        {/* Area Chart */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Son 7 Gün — Teklif Trendleri</h3>
            <div style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--admin-green)", fontSize: "0.85rem", fontWeight: 700 }}>
              <TrendingUp size={16} /> Bu Hafta {stats.weekCount}
            </div>
          </div>
          <div className="admin-chart-wrapper">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="goldGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d4a017" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#d4a017" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
                <XAxis 
                  dataKey="name" 
                  stroke="var(--admin-text-dim)" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="var(--admin-text-dim)" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--admin-surface-2)",
                    border: "1px solid var(--admin-border)",
                    borderRadius: 12,
                    color: "#fff",
                    fontSize: "0.85rem",
                    fontFamily: "Outfit",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="teklif"
                  stroke="#d4a017"
                  strokeWidth={3}
                  fill="url(#goldGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pie Chart */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Durum Dağılımı</h3>
          </div>
          {pieData.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((entry, idx) => (
                      <Cell key={idx} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "var(--admin-surface-2)",
                      border: "1px solid var(--admin-border)",
                      borderRadius: 12,
                      color: "#fff",
                      fontSize: "0.85rem",
                      fontFamily: "Outfit",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
                {pieData.map(d => (
                  <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.8rem", color: "var(--admin-text-muted)" }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: d.color }} />
                    {d.name}: {d.value}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="admin-empty" style={{ padding: "40px 20px" }}>
              <p style={{ color: "var(--admin-text-dim)", fontSize: "0.9rem" }}>Henüz teklif bulunmuyor</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Offers Table */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">Son Başvurular</h3>
          <a href="/admin/teklifler" className="admin-btn admin-btn-secondary admin-btn-sm">
            Tümünü Gör
          </a>
        </div>

        {recentOffers.length > 0 ? (
          <div className="admin-table-wrapper">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Başvuru No</th>
                  <th>Telefon</th>
                  <th>Sigorta Türü</th>
                  <th>Durum</th>
                  <th>Tarih</th>
                </tr>
              </thead>
              <tbody>
                {recentOffers.map(offer => (
                  <tr key={offer.id}>
                    <td style={{ fontWeight: 700, color: "#fff" }}>#{offer.id.slice(0, 8)}</td>
                    <td>{offer.phone}</td>
                    <td>{offer.insuranceType}</td>
                    <td>
                      <span className={`admin-status ${offer.status}`}>
                        <span className="admin-status-dot" />
                        {statusLabels[offer.status]}
                      </span>
                    </td>
                    <td style={{ color: "var(--admin-text-muted)" }}>
                      {format(new Date(offer.createdAt), "dd MMM yyyy HH:mm", { locale: tr })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="admin-empty">
            <div className="admin-empty-icon">
              <FileText size={28} />
            </div>
            <div className="admin-empty-title">Henüz başvuru yok</div>
            <p style={{ fontSize: "0.9rem" }}>Teklif formu aracılığıyla gelen başvurular burada görünecek.</p>
          </div>
        )}
      </div>
    </div>
  );
}
