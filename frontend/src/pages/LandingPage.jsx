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

                {/* Floating Background Elements */}
                <motion.div animate={{ y: [0, -20, 0], x: [0, 10, 0], rotate: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }} className="absolute top-1/4 left-10 w-32 h-32 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(99,102,241,0.15)] flex items-center justify-center hidden md:flex">
                    <ShieldCheckIcon size={40} className="text-primary-400 opacity-80" />
                </motion.div>
                <motion.div animate={{ y: [0, 30, 0], x: [0, -15, 0], rotate: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 10, ease: "easeInOut", delay: 1 }} className="absolute bottom-1/4 right-20 w-40 h-40 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_40px_rgba(99,102,241,0.2)] flex items-center justify-center hidden md:flex">
                    <MapPinIcon size={48} className="text-indigo-400 opacity-80" />
                </motion.div>
                <motion.div animate={{ y: [0, -15, 0], scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut", delay: 2 }} className="absolute top-1/3 right-1/3 w-20 h-20 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)] flex items-center justify-center hidden lg:flex">
                    <BuildingIcon size={24} className="text-slate-300 opacity-70" />
                </motion.div>

                <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center relative z-10 gap-16">
                    <motion.div style={{ opacity: opacityHero, y: y1 }} className="flex-1 text-left" initial="hidden" animate="visible" variants={staggerContainer}>
                        <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-primary-300 font-bold tracking-wider uppercase text-xs mb-6 backdrop-blur-md">
                            <ShieldCheckIcon size={14} />
                            Trusted by Sri Lankan Universities
                        </motion.div>

                        <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-[1.1] md:leading-[0.95] text-white drop-shadow-sm">
                            Unify <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-indigo-400">
                Your Campus <br />
              </span>
                            Life
                        </motion.h1>

                        <motion.p variants={fadeInUp} className="text-lg md:text-xl text-slate-300 mb-10 max-w-lg leading-relaxed font-medium">
                            Discover boardings, food spots, and transport routes tailored to your university. A platform built by students, for students.
                        </motion.p>

                        <motion.div variants={fadeInUp} className="flex flex-wrap items-center gap-4">
                            <Link to="/register" className="px-8 py-4 bg-primary-600 hover:bg-primary-500 text-white font-bold rounded-full transition-all shadow-lg hover:shadow-primary-500/30">
                                Get Started Free
                            </Link>
                            <Link to="/about" className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-full transition-all backdrop-blur-sm">
                                Learn More
                            </Link>
                        </motion.div>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.2 }} className="flex-1 relative w-full max-w-2xl">
                        <motion.img animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} src="/hero_3d.png" alt="3D Campus Elements" className="w-full h-auto object-contain drop-shadow-2xl" />
                    </motion.div>
                </div>
            </section>
