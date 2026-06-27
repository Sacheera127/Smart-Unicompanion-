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