import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getActivePosts, reportPost, deletePost } from "../api/api";
import { PageHeader, LoadingScreen, ErrorBox, EmptyState, Input, Select } from "../components/ui";
import { HouseIcon, MapPinIcon, ShieldCheckIcon, FilterIcon, SearchIcon, FlagIcon, XIcon } from "../components/Icons";
import { useToast } from "../components/Toast";
import RatingModal from "../components/RatingModal";
import ReportModal from "../components/ReportModal";

const gradients = [
  "bg-gradient-to-br from-primary-400 to-primary-600",
  "bg-gradient-to-br from-cyan-400 to-cyan-600",
  "bg-gradient-to-br from-indigo-400 to-indigo-600",
  "bg-gradient-to-br from-emerald-400 to-emerald-600",
];

export default function Boardings() {
  const { user } = useAuth();
  const { show, ToastEl } = useToast();

  const [posts,       setPosts]       = useState([]);
  const [loading,     setLoading]     = useState(true);
  const [error,       setError]       = useState("");
  const [search,      setSearch]      = useState("");
  const [filters,     setFilters]     = useState({ gender: "", kitchen: "", maxPrice: "", sortBy: "distance" });
  const [showFilters, setShowFilters] = useState(false);
  const [selected,    setSelected]    = useState(null);  // detail modal
  const [ratingPost,  setRatingPost]  = useState(null);  // rating modal
  const [reportPostData, setReportPostData] = useState(null); // report modal
  const [isReporting, setIsReporting] = useState(false);
  const [ratingIdx,   setRatingIdx]   = useState(0);

  // Optimistic ratings map: postId → { rating, count }
  const [localRatings, setLocalRatings] = useState({});

  const load = async () => {
    setLoading(true); setError("");
    const res = await getActivePosts(user?.university, "BOARDING");
    setLoading(false);
    if (!res.success) { setPosts([]); return; }
    setPosts(res.data || []);
  };

  useEffect(() => { load(); }, []);

  const filtered = posts
    .filter((p) => {
      if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.area?.toLowerCase().includes(search.toLowerCase())) return false;
      if (filters.gender && p.genderType !== filters.gender) return false;
      if (filters.kitchen === "yes" && !p.hasKitchen) return false;
      if (filters.maxPrice && (p.price || 0) > Number(filters.maxPrice)) return false;
      return true;
    })
    .sort((a, b) => {
      if (filters.sortBy === "price_asc")   return (a.price || 0) - (b.price || 0);
      if (filters.sortBy === "price_desc")  return (b.price || 0) - (a.price || 0);
      if (filters.sortBy === "rating")      return ((localRatings[b._id]?.avg || b.rating || 0)) - ((localRatings[a._id]?.avg || a.rating || 0));
      return (a.distance || 0) - (b.distance || 0);
    });

  const handleReport = async (data) => {
    setIsReporting(true);
    const res = await reportPost(reportPostData._id || reportPostData.id, data);
    setIsReporting(false);
    if (res.success) {
      show("Thank you — this listing has been flagged for admin review.", "success");
      setReportPostData(null);
    } else {
      show(res.message, "error");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this listing?")) return;
    const res = await deletePost(id);
    if (res.success) {
      show("Listing deleted successfully.", "success");
      setPosts((prev) => prev.filter(p => p.id !== id && p._id !== id));
      setSelected(null);
    } else {
      show(res.message, "error");
    }
  };

  const handleRated = (post, { rating }) => {
    const id = post._id || post.id;
    setLocalRatings(prev => {
      const cur = prev[id] || { avg: post.rating || 0, count: post.reviews?.length || 0 };
      const newCount = cur.count + 1;
      const newAvg = ((cur.avg * cur.count) + rating) / newCount;
      return { ...prev, [id]: { avg: parseFloat(newAvg.toFixed(1)), count: newCount } };
    });
    show("Your rating has been submitted! 🌟", "success");
  };

  const getRating = (p) => localRatings[p._id || p.id]?.avg || p.rating || 0;
  const getCount  = (p) => localRatings[p._id || p.id]?.count || p.reviews?.length || 0;

  return (
    <div className="max-w-7xl mx-auto">
      {ToastEl}

      <PageHeader
        title="Boardings near you"
        subtitle={`Showing verified listings around ${user?.area || "your campus"}`}
      />

      {/* ── Search + Filter Bar ── */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="flex-1 flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-1 shadow-sm focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20 transition-all">
          <SearchIcon size={16} className="text-slate-400" />
          <input 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name or area..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-foreground py-2.5 w-full" 
          />
          {search && (
            <button onClick={() => setSearch("")} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
              <XIcon size={14} />
            </button>
          )}
        </div>
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all border ${showFilters ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 border-primary-200 dark:border-primary-800' : 'bg-card text-slate-600 dark:text-slate-300 border-border hover:bg-slate-50 dark:hover:bg-slate-800'}`}
        >
          <FilterIcon size={15} /> Filters
        </button>
      </div>

      {/* ── Filter Panel ── */}
      {showFilters && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-card border border-border rounded-[20px] p-5 mb-8 shadow-sm animate-slideDown">
          <Select label="Gender" value={filters.gender} onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
            options={[{ value: "", label: "Any" }, { value: "Boys", label: "Boys only" }, { value: "Girls", label: "Girls only" }]} />
          <Select label="Kitchen" value={filters.kitchen} onChange={(e) => setFilters({ ...filters, kitchen: e.target.value })}
            options={[{ value: "", label: "Any" }, { value: "yes", label: "Has kitchen" }]} />
          <Input label="Max price (Rs.)" type="number" placeholder="e.g. 10000" value={filters.maxPrice} onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })} />
          <Select label="Sort by" value={filters.sortBy} onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
            options={[{ value: "distance", label: "Distance" }, { value: "rating", label: "Highest Rated" }, { value: "price_asc", label: "Price: Low → High" }, { value: "price_desc", label: "Price: High → Low" }]} />
        </div>
      )}

      {loading && <LoadingScreen message="Finding boardings near you..." />}
      {error   && <ErrorBox message={error} onRetry={load} />}

      {!loading && filtered.length === 0 && (
        <EmptyState icon={<HouseIcon size={48} />}
          title="No boardings found"
          description="Try adjusting your filters or search terms."
          action={<button className="mt-4 bg-primary-50 text-primary-600 px-5 py-2 rounded-xl font-bold hover:bg-primary-100 transition-colors" onClick={() => { setSearch(""); setFilters({ gender: "", kitchen: "", maxPrice: "", sortBy: "distance" }); }}>Clear filters</button>}
        />
      )}

      {/* ── Cards Grid ── */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((b, i) => {
            const gradClass = gradients[i % gradients.length];
            const rating = getRating(b);
            const count  = getCount(b);
            return (
              <div
                key={b._id}
                className="group glass-card rounded-[24px] overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glass-hover animate-fadeInUp"
                style={{ animationDelay: `${0.05 * (i % 6)}s` }}
                onClick={() => setSelected(b)}
              >
                {/* Gradient/Image header */}
                <div className={`h-[150px] relative overflow-hidden ${gradClass}`}>
                  {b.images && b.images.length > 0 ? (
                    <img src={b.images[0]} alt={b.title} className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-black/15 backdrop-blur-sm flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                        <HouseIcon size={32} className="text-white" />
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
                  
                  <span className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-[10px] font-black text-slate-800 dark:text-slate-200 px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {b.genderType || "Mixed"}
                  </span>
                  
                  {b.verified && (
                    <span className="absolute top-3 right-3 bg-gradient-to-br from-green-500 to-green-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-[0_2px_8px_rgba(22,163,74,0.4)]">
                      <ShieldCheckIcon size={10} className="text-white" /> Verified
                    </span>
                  )}
                  
                  {rating > 0 && (
                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-1.5">
                      <svg width={12} height={12} viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      <span className="text-xs font-bold text-white">{Number(rating).toFixed(1)}</span>
                      <span className="text-[10px] text-white/70">({count})</span>
                    </div>
                  )}
                </div>

                {/* Body */}
                <div className="p-5">
                  <div className="text-[15px] font-extrabold text-slate-900 dark:text-slate-100 mb-1.5 truncate group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {b.title}
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-lg font-black text-primary-600 dark:text-primary-400">
                      Rs. {(b.price || 0).toLocaleString()}
                      <span className="text-xs font-medium text-slate-500">/mo</span>
                    </span>
                    <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                      <MapPinIcon size={12} className="text-slate-400" />{b.distance} km
                    </span>
                  </div>

                  <div className="flex gap-1.5 flex-wrap mb-4">
                    {b.hasKitchen && <span className="text-[10px] font-bold bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2.5 py-1 rounded-full">Kitchen</span>}
                    <span className="text-[10px] font-bold bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 px-2.5 py-1 rounded-full">{b.area}</span>
                  </div>

                  <button
                    onClick={e => { e.stopPropagation(); setRatingPost(b); setRatingIdx(i); }}
                    className="w-full py-2.5 bg-primary-50 dark:bg-primary-900/30 hover:bg-primary-100 dark:hover:bg-primary-900/50 border border-primary-200 dark:border-primary-800 rounded-xl text-primary-600 dark:text-primary-400 text-[13px] font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                  >
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    {rating > 0 ? `${Number(rating).toFixed(1)} · Rate & Reviews` : "Rate this listing"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
