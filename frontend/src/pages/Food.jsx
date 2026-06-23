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
