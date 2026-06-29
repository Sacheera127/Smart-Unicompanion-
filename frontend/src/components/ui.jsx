import React, { useState } from "react";

// ─── Spinner ──────────────────────────────────────────────────────────────────
export function Spinner({ size = 18, className = "" }) {
    return (
        <svg className={`animate-spin ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
        </svg>
    );
}

// ─── Button ───────────────────────────────────────────────────────────────────
export function Button({ children, variant = "primary", size = "md", loading = false, fullWidth = false, className = "", ...props }) {
    const sizes = {
        xs: "px-3 py-1.5 text-xs rounded-lg gap-1.5",
        sm: "px-4 py-2 text-sm rounded-xl gap-2",
        md: "px-5 py-2.5 text-sm rounded-xl gap-2",
        lg: "px-7 py-3 text-base rounded-2xl gap-2.5",
        xl: "px-9 py-4 text-lg rounded-2xl gap-3",
    };

    const variants = {
        primary: "bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-glass hover:shadow-glass-hover hover:-translate-y-0.5",
        secondary: "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700",
        danger: "bg-gradient-to-br from-red-500 to-red-600 text-white shadow-[0_4px_12px_rgba(239,68,68,0.25)] hover:shadow-[0_8px_20px_rgba(239,68,68,0.4)] hover:-translate-y-0.5",
        ghost: "text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/30",
        success: "bg-gradient-to-br from-green-500 to-green-600 text-white shadow-[0_4px_12px_rgba(22,163,74,0.25)] hover:shadow-[0_8px_20px_rgba(22,163,74,0.4)] hover:-translate-y-0.5",
        outline: "text-primary-600 dark:text-primary-400 border-2 border-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/30",
        white: "glass text-primary-700 hover:-translate-y-0.5 hover:shadow-glass-hover",
    };

    const baseClasses = "inline-flex items-center justify-center font-semibold tracking-wide transition-all duration-200 ease-out active:scale-95 select-none";
    const widthClass = fullWidth ? "w-full" : "w-auto";
    const stateClass = (loading || props.disabled) ? "opacity-60 cursor-not-allowed pointer-events-none" : "cursor-pointer";
    return (
        <button
            className={`${baseClasses} ${sizes[size]} ${variants[variant]} ${widthClass} ${stateClass} ${className}`}
            disabled={props.disabled || loading}
            {...props}
        >
            {loading ? <Spinner size={size === 'xs' ? 14 : size === 'sm' ? 16 : 18} /> : children}
        </button>
    );
}