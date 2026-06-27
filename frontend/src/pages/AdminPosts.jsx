import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getPendingPosts,
  getActivePosts,
  updatePostStatus,
  deletePost,
} from "../api/api";
import {
  Button,
  PageHeader,
  Card,
  StatusBadge,
  LoadingScreen,
  EmptyState,
  ErrorBox,
  ConfirmModal,
} from "../components/ui";
import { useToast } from "../components/Toast";
import {
  ShieldCheckIcon,
  HouseIcon,
  FoodIcon,
  BusIcon,
  MapPinIcon,
  CheckIcon,
  XIcon,
  ClockIcon,
} from "../components/Icons";

const CATEGORY_META = {
  BOARDING: {
    Icon: HouseIcon,
    color: "#2563EB",
    bg: "#EFF6FF",
    label: "Boarding",
  },
  FOOD: { Icon: FoodIcon, color: "#EA580C", bg: "#FFF7ED", label: "Food Spot" },
  TRANSPORT: {
    Icon: BusIcon,
    color: "#16A34A",
    bg: "#F0FDF4",
    label: "Transport",
  },
};

export default function AdminPosts() {
  const { user } = useAuth();
  const { show, ToastEl } = useToast();
  
  const [pendingPosts, setPendingPosts] = useState([]);
  const [activePosts, setActivePosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState(null);
  const [actionLoading, setActionLoading] = useState("");
  
  // Tabs: "PENDING" or "APPROVED"
  const [activeTab, setActiveTab] = useState("PENDING");
  const [filter, setFilter] = useState("ALL");
  const [confirmModal, setConfirmModal] = useState({ isOpen: false });

  const load = async () => {
    setLoading(true);
    setError("");
    const [pendingRes, activeRes] = await Promise.all([
      getPendingPosts(user?.university),
      getActivePosts(user?.university),
    ]);
    setLoading(false);

    if (pendingRes.success && pendingRes.data) setPendingPosts(pendingRes.data);
    if (activeRes.success && activeRes.data) setActivePosts(activeRes.data);
  };

  useEffect(() => {
    load();
  }, []);

  const handleAction = async (id, status) => {
    setActionLoading(id + status);
    const res = await updatePostStatus(id, status);
    setActionLoading("");
    if (!res.success) {
      show(res.message, "error");
      return;
    }

    if (status === "APPROVED") {
      const approvedPost = pendingPosts.find(p => p.id === id);
      if(approvedPost) {
        approvedPost.status = "APPROVED";
        setPendingPosts(prev => prev.filter(p => p.id !== id));
        setActivePosts(prev => [approvedPost, ...prev]);
      }
    } else {
       setPendingPosts(prev => prev.filter(p => p.id !== id));
    }
    
    setSelected(null);
    show(
      status === "APPROVED"
        ? "Listing approved and is now active."
        : "Listing rejected and hidden.",
      status === "APPROVED" ? "success" : "info",
    );
  };

  const handleDelete = (id) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete Listing",
      message:
        "Are you sure you want to permanently delete this post? This action cannot be undone.",
      confirmText: "Delete",
      variant: "danger",
      onConfirm: async () => {
        setConfirmModal((prev) => ({ ...prev, loading: true }));
        const res = await deletePost(id);
        if (!res.success) {
          show(res.message, "error");
          setConfirmModal({ isOpen: false });
          return;
        }
        
        setActivePosts((prev) => prev.filter((p) => p.id !== id));
        setPendingPosts((prev) => prev.filter((p) => p.id !== id));
        setSelected(null);
        show("Listing deleted successfully.", "success");
        setConfirmModal({ isOpen: false });
      },
    });
  };

  const currentList = activeTab === "PENDING" ? pendingPosts : activePosts;
  const filtered = filter === "ALL" ? currentList : currentList.filter((p) => p.category === filter);

  
}
