"use client";

import { useState, useMemo } from "react";
import { useOffers, Offer, OfferStatus } from "@/lib/offers-context";
import { 
  Search, ChevronDown, ChevronUp, Eye, Trash2, Edit3,
  Download, Upload, X, MessageCircle, CheckCircle, XCircle, Clock,
  ArrowLeft, ArrowRight, FileText
} from "lucide-react";
import { format } from "date-fns";
import { tr } from "date-fns/locale";
import { toast } from "sonner";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
} from "@tanstack/react-table";

const statusLabels: Record<string, string> = {
  pending: "Bekliyor",
  contacted: "İletişime Geçildi",
  completed: "Tamamlandı",
  rejected: "Reddedildi",
};

const statusFilters = [
  { value: "all", label: "Tümü" },
  { value: "pending", label: "Bekliyor" },
  { value: "contacted", label: "İletişime Geçildi" },
  { value: "completed", label: "Tamamlandı" },
  { value: "rejected", label: "Reddedildi" },
];

const columnHelper = createColumnHelper<Offer>();

export default function TekliflerPage() {
  const { offers, updateOffer, deleteOffer, exportData, importData } = useOffers();
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [sorting, setSorting] = useState<SortingState>([{ id: "createdAt", desc: true }]);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [editNotes, setEditNotes] = useState("");
  const [editStatus, setEditStatus] = useState<OfferStatus>("pending");

  const filteredData = useMemo(() => {
    let data = offers;
    if (statusFilter !== "all") {
      data = data.filter(o => o.status === statusFilter);
    }
    if (search) {
      const s = search.toLowerCase();
      data = data.filter(o =>
        o.phone.toLowerCase().includes(s) ||
        o.tcNo.includes(s) ||
        o.insuranceType.toLowerCase().includes(s) ||
        o.id.includes(s)
      );
    }
    return data;
  }, [offers, statusFilter, search]);

  const columns = useMemo(() => [
    columnHelper.accessor("id", {
      header: "Başvuru No",
      cell: info => (
        <span style={{ fontWeight: 700, color: "#fff" }}>#{info.getValue().slice(0, 8)}</span>
      ),
      size: 120,
    }),
    columnHelper.accessor("tcNo", {
      header: "TC Kimlik",
      cell: info => <span>{info.getValue().slice(0, 3)}****{info.getValue().slice(-3)}</span>,
      size: 130,
    }),
    columnHelper.accessor("phone", {
      header: "Telefon",
      size: 140,
    }),
    columnHelper.accessor("insuranceType", {
      header: "Sigorta Türü",
      size: 180,
    }),
    columnHelper.accessor("status", {
      header: "Durum",
      cell: info => (
        <span className={`admin-status ${info.getValue()}`}>
          <span className="admin-status-dot" />
          {statusLabels[info.getValue()]}
        </span>
      ),
      size: 160,
    }),
    columnHelper.accessor("createdAt", {
      header: "Tarih",
      cell: info => (
        <span style={{ color: "var(--admin-text-muted)" }}>
          {format(new Date(info.getValue()), "dd MMM yyyy HH:mm", { locale: tr })}
        </span>
      ),
      size: 160,
    }),
    columnHelper.display({
      id: "actions",
      header: "İşlem",
      cell: ({ row }) => (
        <div style={{ display: "flex", gap: 6 }}>
          <button
            className="admin-btn-icon"
            title="Detay"
            onClick={() => openDetail(row.original)}
          >
            <Eye size={15} />
          </button>
          <button
            className="admin-btn-icon"
            title="Sil"
            onClick={() => handleDelete(row.original.id)}
            style={{ color: "var(--admin-red)" }}
          >
            <Trash2 size={15} />
          </button>
        </div>
      ),
      size: 100,
    }),
  ], []);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: { pageSize: 10 },
    },
  });

  const openDetail = (offer: Offer) => {
    setSelectedOffer(offer);
    setEditNotes(offer.notes);
    setEditStatus(offer.status);
  };

  const saveDetail = () => {
    if (!selectedOffer) return;
    updateOffer(selectedOffer.id, { status: editStatus, notes: editNotes });
    toast.success("Teklif güncellendi!");
    setSelectedOffer(null);
  };

  const handleDelete = (id: string) => {
    if (confirm("Bu teklifi silmek istediğinize emin misiniz?")) {
      deleteOffer(id);
      toast.success("Teklif silindi.");
    }
  };

  const handleExport = () => {
    const data = exportData();
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `teklifler_${format(new Date(), "yyyy-MM-dd")}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Veriler dışa aktarıldı!");
  };

  const handleExportPDF = async (offer: Offer) => {
    try {
      const { default: jsPDF } = await import("jspdf");
      await import("jspdf-autotable");

      const doc = new jsPDF();
      doc.setFontSize(20);
      doc.text("Alicilar Sigorta - Teklif Detayi", 14, 22);
      
      doc.setFontSize(11);
      doc.setTextColor(100);
      doc.text(`Basvuru No: #${offer.id.slice(0, 8)}`, 14, 30);
      doc.text(`Tarih: ${format(new Date(offer.createdAt), "dd.MM.yyyy HH:mm")}`, 14, 36);

      (doc as any).autoTable({
        startY: 45,
        head: [['Bilgi', 'Detay']],
        body: [
          ['TC Kimlik', offer.tcNo],
          ['Dogum Tarihi', offer.birthDate],
          ['Telefon', offer.phone],
          ['Sigorta Turu', offer.insuranceType],
          ['Durum', statusLabels[offer.status]],
          ['Notlar', offer.notes || '-']
        ],
        theme: 'striped',
        headStyles: { fillColor: [212, 175, 55] },
      });

      doc.save(`teklif_${offer.id.slice(0, 8)}.pdf`);
      toast.success("PDF başarıyla indirildi!");
    } catch (error) {
      toast.error("PDF oluşturulurken bir hata oluştu.");
    }
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = importData(ev.target?.result as string);
        if (result) {
          toast.success("Veriler içe aktarıldı!");
        } else {
          toast.error("Geçersiz dosya formatı.");
        }
      };
      reader.readAsText(file);
    };
    input.click();
  };

  return (
    <div>
      {/* Top Actions */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, flexWrap: "wrap", gap: 16 }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{ position: "relative" }}>
            <Search size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--admin-text-dim)" }} />
            <input
              type="text"
              placeholder="TC, Telefon veya Sigorta türü ara..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="admin-input"
              style={{ paddingLeft: 42, width: 320 }}
            />
          </div>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={handleImport}>
            <Upload size={15} /> İçe Aktar
          </button>
          <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={handleExport}>
            <Download size={15} /> Dışa Aktar
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="admin-filter-tabs">
        {statusFilters.map(f => (
          <button
            key={f.value}
            className={`admin-filter-tab ${statusFilter === f.value ? "active" : ""}`}
            onClick={() => setStatusFilter(f.value)}
          >
            {f.label}
            {f.value !== "all" && (
              <span style={{ marginLeft: 6, opacity: 0.7 }}>
                ({offers.filter(o => o.status === f.value).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="admin-card" style={{ padding: 0, overflow: "hidden" }}>
        {filteredData.length > 0 ? (
          <>
            <div className="admin-table-wrapper">
              <table className="admin-table">
                <thead>
                  {table.getHeaderGroups().map(hg => (
                    <tr key={hg.id}>
                      {hg.headers.map(header => (
                        <th
                          key={header.id}
                          onClick={header.column.getToggleSortingHandler()}
                          style={{ cursor: header.column.getCanSort() ? "pointer" : "default" }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {header.column.getIsSorted() === "asc" && <ChevronUp size={14} />}
                            {header.column.getIsSorted() === "desc" && <ChevronDown size={14} />}
                          </div>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody>
                  {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                      {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="admin-pagination" style={{ padding: "16px 24px" }}>
              <div className="admin-pagination-info">
                {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}
                –{Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, filteredData.length)}
                {" "}/ {filteredData.length} kayıt
              </div>
              <div className="admin-pagination-btns">
                <button
                  className="admin-btn-icon"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                  style={{ opacity: table.getCanPreviousPage() ? 1 : 0.3 }}
                >
                  <ArrowLeft size={16} />
                </button>
                <span style={{ padding: "0 12px", fontSize: "0.85rem", color: "var(--admin-text-muted)", display: "flex", alignItems: "center" }}>
                  Sayfa {table.getState().pagination.pageIndex + 1} / {table.getPageCount()}
                </span>
                <button
                  className="admin-btn-icon"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                  style={{ opacity: table.getCanNextPage() ? 1 : 0.3 }}
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="admin-empty">
            <div className="admin-empty-icon">
              <FileText size={28} />
            </div>
            <div className="admin-empty-title">Teklif bulunamadı</div>
            <p style={{ fontSize: "0.9rem" }}>
              {search ? "Arama kriterlerinize uygun teklif yok." : "Henüz hiç teklif başvurusu yapılmamış."}
            </p>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedOffer && (
        <div className="admin-modal-overlay" onClick={() => setSelectedOffer(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3 className="admin-modal-title">
                Teklif Detayı — #{selectedOffer.id.slice(0, 8)}
              </h3>
              <div style={{ display: "flex", gap: 8 }}>
                <button 
                  className="admin-btn-icon" 
                  title="PDF İndir"
                  onClick={() => handleExportPDF(selectedOffer)}
                  style={{ color: "var(--admin-gold)", marginRight: 8 }}
                >
                  <FileText size={16} />
                </button>
                <button className="admin-btn-icon" onClick={() => setSelectedOffer(null)}>
                  <X size={16} />
                </button>
              </div>
            </div>
            <div className="admin-modal-body">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>
                <div>
                  <div className="admin-label">TC Kimlik</div>
                  <div style={{ fontWeight: 700, color: "#fff" }}>{selectedOffer.tcNo}</div>
                </div>
                <div>
                  <div className="admin-label">Doğum Tarihi</div>
                  <div style={{ fontWeight: 700, color: "#fff" }}>{selectedOffer.birthDate}</div>
                </div>
                <div>
                  <div className="admin-label">Telefon</div>
                  <div style={{ fontWeight: 700, color: "#fff" }}>{selectedOffer.phone}</div>
                </div>
                <div>
                  <div className="admin-label">Sigorta Türü</div>
                  <div style={{ fontWeight: 700, color: "#fff" }}>{selectedOffer.insuranceType}</div>
                </div>
                <div>
                  <div className="admin-label">Başvuru Tarihi</div>
                  <div style={{ fontWeight: 700, color: "#fff" }}>
                    {format(new Date(selectedOffer.createdAt), "dd MMMM yyyy — HH:mm", { locale: tr })}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label className="admin-label">Durum Güncelle</label>
                <select
                  className="admin-select"
                  value={editStatus}
                  onChange={e => setEditStatus(e.target.value as OfferStatus)}
                >
                  <option value="pending">⏳ Bekliyor</option>
                  <option value="contacted">📞 İletişime Geçildi</option>
                  <option value="completed">✅ Tamamlandı</option>
                  <option value="rejected">❌ Reddedildi</option>
                </select>
              </div>

              <div>
                <label className="admin-label">Notlar</label>
                <textarea
                  className="admin-input admin-textarea"
                  placeholder="Bu başvuru hakkında notlarınızı yazın..."
                  value={editNotes}
                  onChange={e => setEditNotes(e.target.value)}
                />
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-btn admin-btn-secondary" onClick={() => setSelectedOffer(null)}>
                İptal
              </button>
              <button className="admin-btn admin-btn-primary" onClick={saveDetail}>
                <CheckCircle size={16} /> Kaydet
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
