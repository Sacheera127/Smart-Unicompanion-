import React, { useState } from "react";

// Spinner
export function Spinner({ size = 18, className = "" }) {
    return (
        <svg className={`animate-spin ${className}`} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor"
             strokeWidth="2.5" strokeLinecap="round">
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
        </svg>
    );
}

// Button
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

//  Input
export function Input({ label, error, icon, hint, suffix, className = "", ...props }) {
    const hasError = !!error;

    return (
        <div className="flex flex-col gap-1.5 w-full">
            {label && (
                <label className={`text-sm font-semibold transition-colors duration-200 flex items-center gap-1.5 ${hasError ? 'text-red-600' : 'text-slate-600 dark:text-slate-300'}`}>
                    {label}
                </label>
            )}
            <div className="relative w-full group">
                {icon && (
                    <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 z-10 transition-colors duration-200 ${hasError ? 'text-red-500' : 'text-slate-400 group-focus-within:text-primary-500'}`}>
            {icon}
          </span>
                )}
                <input
                    className={`w-full rounded-xl text-sm transition-all duration-200 outline-none
            ${icon ? 'pl-10' : 'pl-3.5'} ${suffix ? 'pr-11' : 'pr-3.5'} py-3
            ${hasError
                        ? 'bg-red-50 border-2 border-red-300 text-slate-900 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                        : 'bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:bg-white dark:focus:bg-slate-800 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20'
                    } ${className}`}
                    {...props}
                />
                {suffix && (
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 flex">
            {suffix}
          </span>
                )}
            </div>
            {error && (
                <p className="text-xs text-red-600 font-medium flex items-center gap-1 animate-slideDown">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    {error}
                </p>
            )}
            {hint && !error && <p className="text-xs text-slate-400">{hint}</p>}
        </div>
    );
}

// Select
export function Select({ label, error, options = [], icon, className = "", value, onChange, ...props }) {
    const hasError = !!error;
    const [open, setOpen] = useState(false);
    const selected = options.find(o => o.value === value) || options[0];

    return (
        <div className={`flex flex-col gap-1.5 w-full ${className}`}>
            {label && (
                <label className={`text-sm font-semibold transition-colors duration-200 flex items-center gap-1.5 ${hasError ? 'text-red-600' : 'text-slate-600 dark:text-slate-300'}`}>
                    {label}
                </label>
            )}
            <div className="relative w-full group">
                {icon && (
                    <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 z-10 transition-colors duration-200 ${hasError ? 'text-red-500' : (open ? 'text-primary-500' : 'text-slate-400 group-hover:text-primary-500')}`}>
            {icon}
          </span>
                )}

                {/* trigger */}
                <div
                    onClick={() => setOpen(!open)}
                    className={`w-full rounded-xl text-sm transition-all duration-200 outline-none cursor-pointer flex items-center justify-between select-none
            ${icon ? 'pl-10' : 'pl-4'} pr-4 py-3
            ${hasError
                        ? 'bg-red-50 border-2 border-red-300 text-slate-900 focus:border-red-500 focus:ring-4 focus:ring-red-100'
                        : 'bg-slate-50 dark:bg-slate-900/50 border-2 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 hover:border-primary-400'
                    }
            ${open && !hasError ? 'bg-white dark:bg-slate-800 border-primary-500 ring-4 ring-primary-500/20' : ''}`}
                >
                    <span className={selected?.value === "" ? "text-slate-400" : ""}>{selected?.label || "Select..."}</span>
                    <span className={`text-slate-400 transition-transform duration-200 ${open ? 'rotate-180 text-primary-500' : 'group-hover:text-slate-600 dark:group-hover:text-slate-300'}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </span>
                </div>

                {/* dropdown menu */}
                {open && (
                    <>
                        <div className="fixed inset-0 z-[99]" onClick={() => setOpen(false)} />
                        <div className="absolute top-[calc(100%+8px)] left-0 w-full bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] z-[100] py-2 animate-slideDown overflow-y-auto max-h-60 origin-top flex flex-col">
                            {options.map(opt => (
                                <div
                                    key={opt.value}
                                    onClick={() => { if (onChange) onChange({ target: { value: opt.value } }); setOpen(false); }}
                                    className={`px-4 py-2.5 text-sm font-medium cursor-pointer transition-colors flex items-center justify-between ${
                                        value === opt.value
                                            ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
                                            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'
                                    }`}
                                >
                                    <span className={opt.value === "" ? "text-slate-400" : ""}>{opt.label}</span>
                                    {value === opt.value && (
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" className="text-primary-600 dark:text-primary-400">
                                            <polyline points="20 6 9 17 4 12"/>
                                        </svg>
                                    )}
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>

            {error && (
                <p className="text-xs text-red-600 font-medium flex items-center gap-1 animate-slideDown">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    {error}
                </p>
            )}
        </div>
    );
}

// Card
export function Card({ children, className = "", hover = false, onClick, glass = false, style, ...props }) {
    return (
        <div
            onClick={onClick}
            className={`
        rounded-2xl transition-all duration-300 ease-out overflow-hidden
        ${glass ? "glass" : "bg-card border border-border shadow-sm"}
        ${hover ? "hover:-translate-y-1 hover:shadow-glass-hover hover:border-primary-300 dark:hover:border-primary-700" : ""}
        ${onClick ? "cursor-pointer" : ""}
        ${className}
      `}
            style={style}
            {...props}
        >
            {children}
        </div>
    );
}


