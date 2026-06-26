import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { getActivePosts } from "../api/api";
import { StarRating, LoadingScreen, ErrorBox } from "../components/ui";
import {
    HouseIcon, FoodIcon, BusIcon, MapPinIcon, ShieldCheckIcon,
    TrendingUpIcon, PlusIcon, ChevronRightIcon, MapIcon,
} from "../components/Icons";

/* ─── Stat card ──────────────────────────────────────────────────────────────── */
function StatCard({ label, value, sub, icon: Icon, accentClass, iconBgClass, featured = false, delayClass = "" }) {
    return (
        <div className={`relative group p-5 rounded-[20px] transition-all duration-300 hover:-translate-y-1 ${featured ? 'bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-lg hover:shadow-primary-500/30' : 'bg-card border border-border hover:shadow-glass-hover'} ${delayClass} animate-fadeInUp`}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${featured ? 'bg-white/20 text-white' : iconBgClass}`}>
                <Icon size={24} className={featured ? 'text-white' : accentClass} />
            </div>
            <div className={`text-3xl font-black tracking-tight leading-none mb-1.5 ${featured ? 'text-white' : accentClass}`}>
                {value}
            </div>
            <div className={`text-sm font-bold ${featured ? 'text-white/90' : 'text-slate-700 dark:text-slate-200'}`}>
                {label}
            </div>
            {sub && <div className={`text-xs mt-1 ${featured ? 'text-white/60' : 'text-slate-500'}`}>{sub}</div>}
        </div>
    );
}

/* ─── Category card ──────────────────────────────────────────────────────────── */
function CategoryCard({ to, label, sub, Icon, accentClass, bgClass, hoverBorderClass, delayClass = "" }) {
    return (
        <Link to={to} className={`block group animate-fadeInUp ${delayClass}`}>
            <div className={`bg-card border border-border rounded-[20px] p-5 flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-glass-hover ${hoverBorderClass}`}>
                <div className={`w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${bgClass}`}>
                    <Icon size={24} className={accentClass} />
                </div>
                <div className="flex-1 min-w-0">
                    <div className="text-[15px] font-extrabold text-slate-900 dark:text-slate-100 truncate">{label}</div>
                    <div className="text-xs text-slate-500 mt-0.5 truncate">{sub}</div>
                </div>
                <div className="w-8 h-8 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                    <ChevronRightIcon size={14} className="text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300" />
                </div>
            </div>
        </Link>
    );
}
