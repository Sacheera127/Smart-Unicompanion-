import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import PublicNavbar from "../components/PublicNavbar";
import {
    BuildingIcon,
    ShieldCheckIcon,
    MapPinIcon,
    HouseIcon,
    FoodIcon,
    BusIcon
} from "../components/Icons";

export default function LandingPage() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
    const opacityHero = useTransform(scrollY, [0, 500], [1, 0]);

    const fadeInUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } };
    const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 font-sans overflow-hidden selection:bg-primary-500 selection:text-white">
            <PublicNavbar transparentOnTop={true} />

            {/* ── Hero Section ─────────────────────────────────────────────────────── */}
            <section id="home" className="relative pt-32 pb-32 md:pt-40 md:pb-40 px-6 flex items-center min-h-[90vh] bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div> )