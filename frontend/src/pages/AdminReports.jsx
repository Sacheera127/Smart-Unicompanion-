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

  
}
