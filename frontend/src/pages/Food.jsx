import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getActivePosts, reportPost, deletePost } from "../api/api";
import { PageHeader, LoadingScreen, ErrorBox, EmptyState, StarRating, Dropdown } from "../components/ui";
import { FoodIcon, MapPinIcon, SearchIcon, XIcon, FlagIcon } from "../components/Icons";
import { useToast } from "../components/Toast";
import RatingModal from "../components/RatingModal";
import ReportModal from "../components/ReportModal";

const foodGradients = [
  "bg-gradient-to-br from-cyan-300 to-cyan-500",
  "bg-gradient-to-br from-cyan-400 to-cyan-600",
  "bg-gradient-to-br from-teal-400 to-teal-600",
  "bg-gradient-to-br from-emerald-300 to-emerald-500",
  "bg-gradient-to-br from-green-400 to-green-600",
  "bg-gradient-to-br from-teal-300 to-teal-500",
];

export default function Food() {
  const { user } = useAuth();
  const { show, ToastEl } = useToast();

  const [posts,      setPosts]      = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [search,     setSearch]     = useState("");
  const [filterTag,  setFilterTag]  = useState("");
  const [sortBy,     setSortBy]     = useState("rating");
  const [selected,   setSelected]   = useState(null);
  const [ratingPost, setRatingPost] = useState(null);
  const [reportPostData, setReportPostData] = useState(null);
  const [isReporting, setIsReporting] = useState(false);
  const [ratingIdx,  setRatingIdx]  = useState(0);

  // Optimistic local ratings map
  const [localRatings, setLocalRatings] = useState({});

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

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const res = await getActivePosts(user?.university, "FOOD");
      setLoading(false);
      setPosts(res.success && res.data ? res.data : []);
    };
    load();
  }, [user?.university]);

  const allTags = ["Vegetarian", "Veg-Only", "Non-Veg"];

  const filtered = posts
    .filter((p) => {
      if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
      if (filterTag && !(p.tags || []).includes(filterTag)) return false;
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return (getRating(b)) - (getRating(a));
      return a.title.localeCompare(b.title);
    });

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

  function getRating(p) { return localRatings[p._id || p.id]?.avg || p.rating || 0; }
  function getCount(p)  { return localRatings[p._id || p.id]?.count || p.reviews?.length || 0; }

  return (
    <div className="max-w-7xl mx-auto">
      {ToastEl}
      <PageHeader
        title="Food & Dining near campus"
        subtitle={`Local restaurants and food stalls around ${user?.area || "your campus"}`}
      />

      {/* ── Search + Tags ── */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 items-start md:items-center">
        <div className="flex-1 w-full flex items-center gap-2 bg-card border border-border rounded-xl px-4 py-1 shadow-sm focus-within:border-orange-500 focus-within:ring-2 focus-within:ring-orange-500/20 transition-all">
          <SearchIcon size={16} className="text-slate-400" />
          <input 
            value={search} 
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search food spots..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-foreground py-2.5 w-full" 
          />
          {search && (
            <button onClick={() => setSearch("")} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
              <XIcon size={14} />
            </button>
          )}
        </div>

        {/* Tag pills */}
        <div className="flex gap-2 flex-wrap w-full md:w-auto">
          {allTags.map((t) => (
            <button 
              key={t} 
              onClick={() => setFilterTag(filterTag === t ? "" : t)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                filterTag === t 
                  ? 'bg-orange-50 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 border-orange-500 shadow-sm' 
                  : 'bg-card text-slate-500 border-border hover:border-orange-300 hover:text-orange-500'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <Dropdown
          value={sortBy} 
          onChange={setSortBy}
          options={[
            { value: "rating", label: "Highest Rated" },
            { value: "name", label: "Name A–Z" }
          ]}
        />
      </div>

      {loading && <LoadingScreen message="Finding food spots near you..." />}

      {!loading && filtered.length === 0 && (
        <EmptyState icon={<FoodIcon size={48} />}
          title="No food spots found"
          description="Try removing your filters or searching a different keyword."
          action={<button className="mt-4 bg-orange-50 text-orange-600 px-5 py-2 rounded-xl font-bold hover:bg-orange-100 transition-colors" onClick={() => { setSearch(""); setFilterTag(""); }}>Clear search</button>}
        />
      )}

      {/* ── Cards Grid ── */}
      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((f, i) => {
            const gradClass = foodGradients[i % foodGradients.length];
            const rating = getRating(f);
            const count  = getCount(f);
            return (
              <div 
                key={f._id}
                className="group glass-card rounded-[24px] overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glass-hover animate-fadeInUp"
                style={{ animationDelay: `${0.05 * (i % 6)}s` }}
                onClick={() => setSelected(f)}
              >
                {/* Header */}
                <div className={`h-[140px] relative overflow-hidden ${gradClass}`}>
                  {f.images && f.images.length > 0 ? (
                    <img src={f.images[0]} alt={f.title} className="w-full h-full object-cover absolute inset-0 transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-black/15 backdrop-blur-sm flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                        <FoodIcon size={32} className="text-white" />
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />
                  
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
                  <div className="text-[15px] font-extrabold text-slate-900 dark:text-slate-100 mb-2 truncate group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors">
                    {f.title}
                  </div>

                  {/* Tags */}
                  <div className="flex gap-1.5 flex-wrap mb-3">
                    {(f.tags || []).map((t) => (
                      <span key={t} className="text-[10px] font-bold bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2.5 py-1 rounded-full">{t}</span>
                    ))}
                  </div>

                  {/* Rating row */}
                  <div className="flex justify-between items-center mb-3">
                    <StarRating rating={rating} size={14} />
                    <span className="text-[11.5px] font-bold text-slate-500">{f.priceRange}</span>
                  </div>

                  <div className="text-[11.5px] font-medium text-slate-500 flex items-center gap-1.5 mb-4">
                    <MapPinIcon size={12} className="text-slate-400" />{f.area}
                  </div>

                  {/* Rate button */}
                  <button
                    onClick={e => { e.stopPropagation(); setRatingPost(f); setRatingIdx(i); }}
                    className="w-full py-2.5 bg-orange-50 dark:bg-orange-900/30 hover:bg-orange-100 dark:hover:bg-orange-900/50 border border-orange-200 dark:border-orange-800 rounded-xl text-orange-600 dark:text-orange-400 text-[13px] font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02]"
                  >
                    <svg width={14} height={14} viewBox="0 0 24 24" fill="#F59E0B" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    {rating > 0 ? `${Number(rating).toFixed(1)} · Rate & Reviews` : "Rate this place"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}