import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getActivePosts, reportPost, deletePost } from "../api/api";
import { PageHeader, EmptyState, LoadingScreen } from "../components/ui";
import { BusIcon, ClockIcon, MapPinIcon, SearchIcon, XIcon, FlagIcon } from "../components/Icons";
import { useToast } from "../components/Toast";
import ReportModal from "../components/ReportModal";

export default function Transport() {
  const { user } = useAuth();
  const { show, ToastEl } = useToast();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [expanded, setExpanded] = useState(null);
  
  const [reportPostData, setReportPostData] = useState(null);
  const [isReporting, setIsReporting] = useState(false);
  
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleReport = async (data) => {
    setIsReporting(true);
    const res = await reportPost(reportPostData.id, data);
    setIsReporting(false);
    if (res.success) {
      show("Thank you — this listing has been flagged for admin review.", "success");
      setReportPostData(null);
    } else {
      show(res.message, "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this route?")) return;
    const res = await deletePost(id);
    if (res.success) {
      show("Route deleted successfully.", "success");
      setRoutes((prev) => prev.filter(p => p.id !== id));
      setExpanded(null);
    } else {
      show(res.message, "error");
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const res = await getActivePosts(user?.university, "TRANSPORT");
      setLoading(false);
      if (res.success && res.data) {
        const mapped = res.data.map(p => ({
          id: p.id || p._id,
          name: p.title || p.routeNumber || "Unknown Route",
          from: p.fromLocation || p.area || "Unknown",
          to: p.toLocation || p.university || "Unknown",
          via: [], 
          departures: [], 
          lastBus: p.lastBus || "N/A",
          frequency: p.frequency || "N/A",
          type: p.title?.toLowerCase().includes("train") ? "Train" : "Bus",
          description: p.description
        }));
        setRoutes(mapped);
      } else {
        setRoutes([]);
      }
    };
    load();
  }, [user]);

  const filtered = routes.filter((r) => {
    if (typeFilter && r.type !== typeFilter) return false;
    if (search && !r.name.toLowerCase().includes(search.toLowerCase()) && !r.from.toLowerCase().includes(search.toLowerCase()) && !r.to.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto">
      {ToastEl}
      <PageHeader title="Transport Timetables" subtitle="Verified bus and train schedules connecting to your campus" />

      {/* ── Filters ── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="flex-1 flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-1 shadow-sm focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
          <SearchIcon size={16} className="text-slate-400" />
          <input 
            value={search} 
            onChange={(e) => setSearch(e.target.value)} 
            placeholder="Search by route or destination..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-foreground py-2.5 w-full"
          />
          {search && (
            <button onClick={() => setSearch("")} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
              <XIcon size={14} />
            </button>
          )}
        </div>
        
        <div className="flex gap-2 w-full sm:w-auto">
          {["Bus", "Train"].map((t) => (
            <button 
              key={t} 
              onClick={() => setTypeFilter(typeFilter === t ? "" : t)}
              className={`flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                typeFilter === t 
                  ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 border-emerald-500 shadow-sm' 
                  : 'bg-card text-slate-500 border-border hover:border-emerald-300 hover:text-emerald-500'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {loading && <LoadingScreen message="Finding transport routes..." />}

      {!loading && filtered.length === 0 && (
        <EmptyState 
          icon={<BusIcon size={48} />} 
          title="No routes found" 
          description="Try a different search term or remove the type filter." 
          action={<button className="mt-4 bg-emerald-50 text-emerald-600 px-5 py-2 rounded-xl font-bold hover:bg-emerald-100 transition-colors" onClick={() => { setSearch(""); setTypeFilter(""); }}>Clear filters</button>} 
        />
      )}
