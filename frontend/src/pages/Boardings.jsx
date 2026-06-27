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
