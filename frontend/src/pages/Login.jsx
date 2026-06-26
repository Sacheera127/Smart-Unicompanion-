import { useState } from "react";

/* ─── shared tiny components ───────────────────────────────────────────────── */
function PInput({ label, error, icon, suffix, ...p }) {
  return (
    <label className="flex flex-col gap-1.5 w-full relative">
      <span className="text-[11px] font-bold tracking-[0.6px] uppercase text-slate-500">
        {label}
      </span>
      <div className="relative group">
        {icon && (
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 flex pointer-events-none text-slate-400">
            {icon}
          </span>
        )}
        <input 
          className={`w-full rounded-xl text-[13.5px] font-medium outline-none border-2 border-slate-200 bg-slate-50/50 text-slate-900 py-2.5 ${icon ? 'pl-10' : 'pl-3.5'} ${suffix ? 'pr-11' : 'pr-3.5'}`}
          {...p} 
        />
        {suffix && (
          <span className="absolute right-2 top-1/2 -translate-y-1/2 flex">
            {suffix}
          </span>
        )}
      </div>
    </label>
  );
}

function PBtn({ children, loading, outline, full, type="button", onClick }) {
  if (outline) return (
    <button type={type} onClick={onClick} className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border-2 border-slate-200 bg-slate-50 text-primary-600 font-bold text-[13.5px] ${full ? 'w-full' : 'w-auto'}`}>
      {children}
    </button>
  );
  return (
    <button type={type} onClick={onClick} className={`relative inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-none bg-gradient-to-br from-primary-600 to-primary-500 text-white font-bold text-[13.5px] ${full ? 'w-full' : 'w-auto'}`}>
      <span>{children}</span>
    </button>
  );
}

/* ─── Login page ────────────────────────────────────────────────────────────── */
export default function Login({ isChild }) {
  const content = (
    <div className="w-full max-w-[400px]">
      <div className="mb-6">
        <button type="button" className="inline-flex items-center gap-2 text-[13px] font-bold text-slate-500">
          &larr; Back to Home
        </button>
      </div>

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-primary-50 border border-primary-200 rounded-full px-3.5 py-1.5 mb-5">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
          <span className="text-[11.5px] text-primary-700 font-bold">Available at 39+ universities</span>
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight mb-2">Welcome back</h2>
        <p className="text-[13.5px] text-slate-500 font-medium">Sign in to your Unify account</p>
      </div>

      <form className="flex flex-col gap-4" noValidate>
        <PInput label="University Email" type="email" placeholder="yourname@uni.ac.lk" />
        <PInput label="Password" type="password" placeholder="Enter your password" />
        <div className="mt-2">
          <PBtn type="submit" full>Sign in to your account</PBtn>
        </div>
      </form>

      <p className="text-center text-[13.5px] font-medium text-slate-500 mt-8">
        Don't have an account? <button type="button" className="text-primary-600 font-bold">Create one free &rarr;</button>
      </p>
    </div>
  );

  if (isChild) return content;

  return (
    <div className="flex w-screen h-screen overflow-hidden bg-slate-50">
      <div className="hidden lg:flex w-[45%] h-screen bg-slate-900 p-12 text-white">
        {/* Placeholder for Left Panel branding */}
        <div className="font-bold">Unify Brand Side</div>
      </div>
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        {content}
      </div>
    </div>
  );
}