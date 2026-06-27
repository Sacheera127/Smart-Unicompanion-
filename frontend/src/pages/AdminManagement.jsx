import React, { useState, useEffect } from "react";
import { getActiveAdmins, getAdminActivities, downgradeAdmin, deleteAdmin, getAdminRequests, approveAdminRequest } from "../api/api";
import { PageHeader, LoadingScreen, ErrorBox, Button, EmptyState, Card, Badge, ConfirmModal } from "../components/ui";
import { SearchIcon, XIcon, ShieldCheckIcon, UserIcon, InfoIcon, BuildingIcon, MapPinIcon, StarIcon, ClockIcon, IdCardIcon, CheckIcon, ImageIcon } from "../components/Icons";
import { useToast } from "../components/Toast";


const ALL_UNIVERSITIES = [
  
  { name: "University of Moratuwa",                        short: "UOM",    type: "state",   admins: 2, students: 312 },
  { name: "University of Colombo",                         short: "UOC",    type: "state",   admins: 2, students: 287 },
  { name: "University of Kelaniya",                        short: "UOK",    type: "state",   admins: 1, students: 241 },
  { name: "University of Peradeniya",                      short: "UOP",    type: "state",   admins: 2, students: 198 },
  { name: "University of Sri Jayewardenepura",             short: "USJP",   type: "state",   admins: 1, students: 176 },
  { name: "University of Jaffna",                          short: "UOJ",    type: "state",   admins: 1, students: 143 },
  { name: "University of Ruhuna",                          short: "UOR",    type: "state",   admins: 1, students: 119 },
  { name: "Eastern University Sri Lanka",                  short: "EUSL",   type: "state",   admins: 1, students: 88  },
  { name: "South Eastern University of Sri Lanka",         short: "SEUSL",  type: "state",   admins: 1, students: 72  },
  { name: "Rajarata University of Sri Lanka",              short: "RUSL",   type: "state",   admins: 1, students: 65  },
  { name: "Sabaragamuwa University of Sri Lanka",          short: "SUSL",   type: "state",   admins: 1, students: 58  },
  { name: "Wayamba University of Sri Lanka",               short: "WUSL",   type: "state",   admins: 1, students: 54  },
  { name: "Uva Wellassa University",                       short: "UWU",    type: "state",   admins: 0, students: 43  },
  { name: "University of the Visual & Performing Arts",   short: "UVPA",   type: "state",   admins: 0, students: 28  },
  { name: "Open University of Sri Lanka",                  short: "OUSL",   type: "state",   admins: 1, students: 97  },
  { name: "General Sir John Kotelawala Defence University",short: "KDU",    type: "state",   admins: 1, students: 81  },
  { name: "Buddhasravaka Bhikkhu University",              short: "BBU",    type: "state",   admins: 0, students: 12  },
  // Private
  { name: "SLIIT",                                         short: "SLIIT",  type: "private", admins: 2, students: 203 },
  { name: "NSBM Green University",                         short: "NSBM",   type: "private", admins: 1, students: 134 },
  { name: "APIIT Sri Lanka",                               short: "APIIT",  type: "private", admins: 1, students: 89  },
  { name: "Informatics Institute of Technology",           short: "IIT",    type: "private", admins: 1, students: 76  },
  { name: "CINEC Campus",                                  short: "CINEC",  type: "private", admins: 1, students: 61  },
  { name: "Horizon Campus",                                short: "Horizon",type: "private", admins: 0, students: 45  },
  { name: "KAATSU International University",               short: "KAATSU", type: "private", admins: 0, students: 38  },
  { name: "Esoft Metro Campus",                            short: "Esoft",  type: "private", admins: 1, students: 52  },
  { name: "BCI Campus",                                    short: "BCI",    type: "private", admins: 0, students: 29  },
  { name: "IIHE",                                          short: "IIHE",   type: "private", admins: 0, students: 24  },
  { name: "ICBT Campus",                                   short: "ICBT",   type: "private", admins: 1, students: 41  },
  { name: "Cardiff Metropolitan University Sri Lanka",     short: "CardiffMet", type: "private", admins: 0, students: 18 },
  { name: "NIBM",                                          short: "NIBM",   type: "private", admins: 1, students: 63  },
  { name: "SLTC Research University",                      short: "SLTC",   type: "private", admins: 0, students: 21  },
];

export default function AdminManagement() {
  const { show, ToastEl } = useToast();

  const [activeTab, setActiveTab] = useState("pending"); // "pending" | "active"
  
  // Data State
  const [admins, setAdmins] = useState([]);
  const [requests, setRequests] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [search, setSearch] = useState("");
  
  // Modals & Details
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [activities, setActivities] = useState(null);
  const [loadingActivities, setLoadingActivities] = useState(false);
  const [idCardModal, setIdCardModal] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false });

  const loadData = async () => {
    setLoading(true);
    const [reqRes, adminsRes] = await Promise.all([
      getAdminRequests(),
      getActiveAdmins()
    ]);
    setLoading(false);
    
    if (reqRes.success && reqRes.data) {
      setRequests(reqRes.data.filter(r => r.status === "PENDING"));
    }
    if (adminsRes.success && adminsRes.data) {
      setAdmins(adminsRes.data);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // ── Actions ──
  const handleApprove = async (id, name) => {
    setActionLoading(id);
    const res = await approveAdminRequest(id);
    setActionLoading("");
    if (!res.success) { show(res.message, "error"); return; }
    setRequests((prev) => prev.filter((r) => r.id !== id));
    show(`${name}'s admin access has been approved.`, "success");
    loadData(); // refresh lists
  };

  const handleDecline = (id, name) => {
    setRequests((prev) => prev.filter((r) => r.id !== id));
    show(`${name}'s admin request has been declined.`, "info");
  };

  const handleAdminClick = async (admin) => {
    setSelectedAdmin(admin);
    setActivities(null);
    setLoadingActivities(true);
    const res = await getAdminActivities(admin.id || admin._id);
    setLoadingActivities(false);
    if (res.success) {
      setActivities(res.data);
    }
  };

  const handleDowngrade = async (id, name) => {
    setConfirmModal({
      isOpen: true,
      title: "Downgrade Admin",
      message: `Are you sure you want to downgrade ${name || 'this user'} to a student?`,
      confirmText: "Downgrade",
      variant: "secondary",
      onConfirm: async () => {
        setConfirmModal((prev) => ({ ...prev, loading: true }));
        const res = await downgradeAdmin(id);
        if (!res.success) { 
          show(res.message, "error"); 
          setConfirmModal({ isOpen: false }); 
          return; 
        }
        setAdmins((prev) => prev.filter((a) => (a.id || a._id) !== id));
        setSelectedAdmin(null);
        show(`${name || 'User'} has been downgraded to a student.`, "success");
        setConfirmModal({ isOpen: false });
      }
    });
  };

  const handleDeleteAdmin = async (id, name) => {
    setConfirmModal({
      isOpen: true,
      title: "Delete Account",
      message: `Are you sure you want to completely delete ${name || 'this user'}'s account? This action cannot be undone.`,
      confirmText: "Delete",
      variant: "danger",
      onConfirm: async () => {
        setConfirmModal((prev) => ({ ...prev, loading: true }));
        const res = await deleteAdmin(id);
        if (!res.success) { 
          show(res.message, "error"); 
          setConfirmModal({ isOpen: false }); 
          return; 
        }
        setAdmins((prev) => prev.filter((a) => (a.id || a._id) !== id));
        setSelectedAdmin(null);
        show(`${name || 'User'}'s account has been completely deleted.`, "success");
        setConfirmModal({ isOpen: false });
      }
    });
  };

  // ── Filters ──
  const filteredAdmins = admins.filter(a => {
    const term = search.toLowerCase();
    return (a.name?.toLowerCase().includes(term) || a.email?.toLowerCase().includes(term) || a.university?.toLowerCase().includes(term));
  });

  const typeColor = (type) => type === "state"
    ? { color: "#1E40AF", bg: "#EFF6FF", border: "#BFDBFE", label: "State" }
    : { color: "#6B21A8", bg: "#FAF5FF", border: "#DDD6FE", label: "Private" };

  
}
