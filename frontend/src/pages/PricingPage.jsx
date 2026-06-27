import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PublicNavbar from "../components/PublicNavbar";
import { CheckIcon, ZapIcon, HomeIcon, CoffeeIcon } from "../components/Icons";

export default function PricingPage() {
  const fadeInUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 font-sans selection:bg-primary-500 selection:text-white">
      <PublicNavbar transparentOnTop={false} />

      <main className="pt-32 pb-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <span className="inline-block py-1 px-3 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 text-sm font-semibold mb-4">
              Simple, Transparent Pricing
            </span>
            <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              Choose Your Path to <span className="text-primary-600 dark:text-primary-400">Campus Success</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Join hundreds of property owners and food vendors connecting directly with university students. No hidden fees.
            </p>
          </motion.div>
        </div>