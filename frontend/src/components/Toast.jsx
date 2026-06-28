import React, { useEffect } from "react";
import { CheckIcon, XIcon, AlertTriangleIcon, InfoIcon } from "./Icons";

const ICONS = {
    success: <CheckIcon size={16} />,
    error: <XIcon size={16} />,
    warning: <AlertTriangleIcon size={16} />,
    info: <InfoIcon size={16} />,
};
const COLORS = {
    success: { bg: "#F0FDF4", border: "#86EFAC", text: "#15803D", icon: "#16A34A" },
    error:   { bg: "#FEF2F2", border: "#FCA5A5", text: "#DC2626", icon: "#EF4444" },
    warning: { bg: "#FFFBEB", border: "#FCD34D", text: "#92400E", icon: "#D97706" },
    info:    { bg: "#EFF6FF", border: "#93C5FD", text: "#1E40AF", icon: "#2563EB" },
};

export default function Toast({ message, type = "info", onClose, duration = 4500 }) {
    useEffect(() => {
        if (!message) return;
        const t = setTimeout(onClose, duration);
        return () => clearTimeout(t);
    }, [message, onClose, duration]);

    if (!message) return null;

    const c = COLORS[type];
