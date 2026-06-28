import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Card, PageHeader } from "../components/ui";
import { UserIcon, MailIcon, MapPinIcon, BuildingIcon, ShieldCheckIcon, StarIcon } from "../components/Icons";

const ROLE_META = {
  ROLE_STUDENT:      { label: "Student",      color: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-900/20", border: "border-blue-200 dark:border-blue-800", desc: "Browse boardings, food & transport near your campus." },
  ROLE_ADMIN:        { label: "Campus Admin",  color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-900/20", border: "border-green-200 dark:border-green-800", desc: "Moderate listings submitted for your assigned university." },
  ROLE_MASTER_ADMIN: { label: "Master Admin",  color: "text-purple-600 dark:text-purple-400", bg: "bg-purple-50 dark:bg-purple-900/20", border: "border-purple-200 dark:border-purple-800", desc: "Manage all universities and approve campus admin access." },
};

const YEAR_LABELS = { 1: "Year 1 — First Year", 2: "Year 2 — Second Year", 3: "Year 3 — Third Year", 4: "Year 4 — Fourth Year", 5: "Year 5 — Postgraduate" };

export default function Profile() {
  const { user, isMasterAdmin } = useAuth();

  const role = ROLE_META[user?.role] || ROLE_META.ROLE_STUDENT;

  // Build info fields based on role
  const fields = [
    { label: "Full Name",    value: user?.name,       Icon: UserIcon },
    { label: "Email",        value: user?.email,      Icon: MailIcon },
    ...(isMasterAdmin ? [] : [
      { label: "University", value: user?.university, Icon: BuildingIcon },
      { label: "Campus Area",value: user?.area,       Icon: MapPinIcon },
    ]),
    ...(user?.role === "ROLE_STUDENT" && user?.yearOfStudy ? [
      { label: "Year of Study", value: YEAR_LABELS[user.yearOfStudy] || `Year ${user.yearOfStudy}`, Icon: StarIcon },
    ] : []),
  ];

  return (
    <div className="max-w-2xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <PageHeader title="My Profile" subtitle="Your account details and session." />

      {/* Avatar + Role hero */}
      <Card className="p-6 md:p-8 mb-6 overflow-hidden relative">
        {/* Decorative gradient bg */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50/50 to-transparent dark:from-primary-900/10 dark:to-transparent pointer-events-none" />
        
        <div className="relative flex items-center gap-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary-600 to-primary-400 flex items-center justify-center font-black text-3xl text-white shrink-0 shadow-lg shadow-primary-500/30">
            {(user?.name || "U")[0].toUpperCase()}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">{user?.name}</h2>
            <div className="flex items-center gap-3 flex-wrap">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full border ${role.bg} ${role.color} ${role.border}`}>
                <ShieldCheckIcon size={14} /> {role.label}
              </span>
              {!isMasterAdmin && user?.university && (
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <BuildingIcon size={14} className="text-slate-400" /> {user.university}
                </span>
              )}
            </div>
            <p className="text-[13px] text-slate-500 dark:text-slate-400 mt-2.5 font-medium leading-relaxed">{role.desc}</p>
          </div>
        </div>
      </Card>

      {/* Info Fields */}
      <Card className="p-6 md:p-8 mb-6">
        <h3 className="text-[13.5px] font-bold text-slate-900 dark:text-white mb-4 uppercase tracking-wider">Account Details</h3>
        <div className="flex flex-col gap-4">
          {fields.map(({ label, value, Icon }, i) => (
            <div key={label} className={`flex items-center gap-4 pb-4 ${i < fields.length - 1 ? 'border-b border-slate-100 dark:border-slate-800' : ''}`}>
              <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-center text-slate-400 shrink-0">
                <Icon size={18} />
              </div>
              <div className="flex-1">
                <div className="text-[10.5px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{label}</div>
                <div className="text-[14px] font-bold text-slate-800 dark:text-slate-200">{value || "—"}</div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}