import React, {
    createContext, useContext, useState, useCallback,
    useEffect, useRef,
} from "react";
import axios from "axios";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

/* ─── Helpers ─────────────────────────────────────────────────────────────────*/
const SEEN_KEY = "uc_seen_posts"; // sessionStorage key for known post IDs

function getSeenIds() {
    try { return new Set(JSON.parse(sessionStorage.getItem(SEEN_KEY) || "[]")); }
    catch { return new Set(); }
}
function saveSeenIds(set) {
    try { sessionStorage.setItem(SEEN_KEY, JSON.stringify([...set])); } catch {}
}

const CATEGORY_LABELS = {
    BOARDING:  { emoji: "🏠", label: "New Boarding",  type: "info"    },
    FOOD:      { emoji: "🍽️",  label: "New Food Spot", type: "success" },
    TRANSPORT: { emoji: "🚌", label: "New Transport",  type: "info"    },
};
function formatTime(date) {
    const now = new Date();
    const diff = Math.floor((now - date) / 60000);
    if (diff < 1)  return "Just now";
    if (diff < 60) return `${diff}m ago`;
    if (diff < 1440) return `${Math.floor(diff / 60)}h ago`;
    return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}