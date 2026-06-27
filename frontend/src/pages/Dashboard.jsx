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

/* ─── Listing mini card ──────────────────────────────────────────────────────── */
function ListingCard({ item, gradientClass, type }) {
    return (
        <div className="bg-card border border-border rounded-[20px] overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glass-hover hover:border-primary-300 dark:hover:border-primary-700 group cursor-pointer">
            <div className={`h-24 relative overflow-hidden ${gradientClass}`}>
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {item.genderType && (
                    <span className="absolute top-2.5 left-2.5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-[9.5px] font-black text-slate-800 dark:text-slate-200 px-2.5 py-1 rounded-full uppercase tracking-wider">
            {item.genderType}
          </span>
                )}
                {(item.verified || item.status === "APPROVED") && (
                    <span className="absolute top-2.5 right-2.5 bg-gradient-to-br from-green-500 to-green-600 text-white text-[9px] font-bold px-2 py-1 rounded-full flex items-center gap-1 shadow-[0_2px_8px_rgba(22,163,74,0.4)]">
            <ShieldCheckIcon size={10} className="text-white" /> Verified
          </span>
                )}
            </div>
            <div className="p-3.5">
                <div className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2 truncate">
                    {item.title}
                </div>
                {type === "boarding" ? (
                    <div className="flex justify-between items-center">
            <span className="text-sm font-black text-primary-600 dark:text-primary-400">
              Rs. {(item.price || 8500).toLocaleString()}
                <span className="text-[10px] font-medium text-slate-500">/mo</span>
            </span>
                        <span className="text-[10.5px] text-slate-500 flex items-center gap-1">
              <MapPinIcon size={11} className="text-slate-400" />{item.distance || "< 1 km"}
            </span>
                    </div>
                ) : (
                    <>
                        <div className="flex gap-1.5 flex-wrap mb-2">
                            {(item.tags || []).slice(0,3).map((t) => (
                                <span key={t} className="text-[9.5px] font-bold bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-0.5 rounded-full">{t}</span>
                            ))}
                        </div>
                        <StarRating rating={item.rating || 4.5} size={12} />
                    </>
                )}
            </div>
        </div>
    );
}
