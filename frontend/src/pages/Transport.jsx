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