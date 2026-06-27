import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getAdminReports,
  resolveReport,
  deletePost,
} from "../api/api";
import {
  Button,
  PageHeader,
  Card,
  LoadingScreen,
  EmptyState,
  ErrorBox,
  ConfirmModal,
} from "../components/ui";
import { useToast } from "../components/Toast";
import {
  ShieldCheckIcon,
  FlagIcon,
  XIcon,
} from "../components/Icons";

export default function AdminReports() {
  const { user } = useAuth();
  const { show, ToastEl } = useToast();
  
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState("");
  const [confirmModal, setConfirmModal] = useState({ isOpen: false });

  const load = async () => {
    setLoading(true);
    setError("");
    const reportsRes = await getAdminReports(user?.university);
    setLoading(false);

    if (reportsRes.success && reportsRes.data) {
      setReports(reportsRes.data);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleResolveReport = async (id, status) => {
    setActionLoading(id + status);
    const res = await resolveReport(id, status);
    setActionLoading("");
    if (!res.success) {
      show(res.message, "error");
      return;
    }
    setReports((prev) => prev.filter((r) => r.id !== id && r._id !== id));
    show("Report resolved successfully.", "success");
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
        show("Listing deleted successfully.", "success");
        setConfirmModal({ isOpen: false });
      },
    });
  };

  
}
