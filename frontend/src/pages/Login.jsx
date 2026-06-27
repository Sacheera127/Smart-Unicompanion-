import { useState } from "react";
import { MailIcon, LockIcon, EyeIcon, EyeOffIcon, UnifyLogoIcon } from "../components/Icons";

/* ─── shared tiny components ───────────────────────────────────────────────── */
function PInput({ label, error, icon, suffix, ...p }) {
  return (
    <label className="flex flex-col gap-1.5 w-full relative">
      <span className={`text-[11px] font-bold tracking-[0.6px] uppercase transition-colors ${error ? 'text-red-500' : 'text-slate-500 focus-within:text-primary-600'}`}>
        {label}
      </span>
      <div className="relative group">
        {icon && (
          <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 flex pointer-events-none transition-colors ${error ? 'text-red-400' : 'text-slate-400 group-focus-within:text-primary-500'}`}>
            {icon}
          </span>
        )}
        <input 
          className={`w-full rounded-xl text-[13.5px] font-medium outline-none transition-all duration-200 
            ${icon ? 'pl-10' : 'pl-3.5'} 
            ${suffix ? 'pr-11' : 'pr-3.5'} py-2.5
            ${error 
              ? 'bg-red-50/50 border-red-300 text-red-900 focus:border-red-500 focus:ring-4 focus:ring-red-500/20' 
              : 'bg-slate-50/50 border-slate-200 text-slate-900 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 hover:border-slate-300'
            } border-2`}
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
    <button type={type} onClick={onClick} className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border-2 border-slate-200 bg-slate-50 text-primary-600 font-bold text-[13.5px] transition-all hover:bg-primary-50 hover:border-primary-200 ${full ? 'w-full' : 'w-auto'}`}>
      {children}
    </button>
  );
  return (
    <button type={type} onClick={onClick} className={`relative inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-none bg-gradient-to-br from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-bold text-[13.5px] transition-all shadow-lg shadow-primary-500/30 hover:shadow-primary-500/40 hover:-translate-y-0.5 overflow-hidden group ${full ? 'w-full' : 'w-auto'}`}>
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
      <span className="relative z-10">{children}</span>
    </button>
  );
}

/* ─── decorative SVG panel ─────────────────────────────────────────────────── */
function LeftPanel() {
  return (
    <div className="hidden lg:flex flex-col relative overflow-hidden w-[45%] h-screen bg-slate-900 p-12">
      <img src="/auth-bg.jpg" alt="Campus" className="absolute inset-0 w-full h-full object-cover object-top" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(30,0,60,.08) 0%, rgba(60,20,120,.12) 40%, rgba(60,20,100,.72) 70%, #2E0A5A 100%)" }} />

      <div className="flex items-center gap-3 mt-0 mb-auto relative z-10">
        <div className="w-11 h-11 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center backdrop-blur-md">
          <UnifyLogoIcon size={24} />
        </div>
        <div>
          <div className="text-[17px] font-black text-white tracking-tight leading-none mb-1">Unify</div>
          <div className="text-[10px] font-bold text-white/50 tracking-[0.8px] uppercase">Campus Life Platform</div>
        </div>
      </div>

      <div className="relative z-10 mt-auto mb-4">
        <h1 className="text-3xl font-black text-white tracking-tight leading-[1.15] mb-3">
          Your campus life,<br/>
          <span className="bg-gradient-to-r from-cyan-100 to-cyan-300 bg-clip-text text-transparent">simplified.</span>
        </h1>
        <p className="text-[13.5px] text-white/70 leading-relaxed mb-6 max-w-xs font-medium">
          Verified boardings, food spots and transport routes — for every Sri Lankan university student.
        </p>
        <div className="flex gap-3">
          {[["39+","Universities"],["2.4k","Students"],["500+","Listings"]].map(([v,l])=>(
            <div key={l} className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl py-3 px-2 text-center">
              <div className="text-xl font-black text-white leading-none mb-1.5">{v}</div>
              <div className="text-[10px] font-bold text-white/60 tracking-wide">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Login page ────────────────────────────────────────────────────────────── */
export default function Login({ isChild }) {
  const [showPw, setShowPw] = useState(false);

  const content = (
    <div className="w-full max-w-[400px]">
      <div className="mb-6">
        <button type="button" className="inline-flex items-center gap-2 text-[13px] font-bold text-slate-500 hover:text-primary-600 transition-colors">
          &larr; Back to Home
        </button>
      </div>

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 rounded-full px-3.5 py-1.5 mb-5 shadow-sm">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
          <span className="text-[11.5px] text-primary-700 dark:text-primary-400 font-bold">Available at 39+ universities</span>
        </div>
        <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight mb-2">Welcome back</h2>
        <p className="text-[13.5px] text-slate-500 font-medium">Sign in to your Unify account</p>
      </div>

      <form className="flex flex-col gap-4" noValidate>
        <PInput label="University Email" type="email" placeholder="yourname@uni.ac.lk" icon={<MailIcon size={16}/>} />
        <PInput label="Password" type={showPw?"text":"password"} placeholder="Enter your password"
          icon={<LockIcon size={16}/>} 
          suffix={
            <button type="button" onClick={()=>setShowPw(p=>!p)} className="p-1.5 text-slate-400 hover:text-primary-500 hover:bg-primary-50 rounded-lg transition-colors">
              {showPw ? <EyeOffIcon size={15}/> : <EyeIcon size={15}/>}
            </button>
          }/>
        <div className="mt-2">
          <PBtn type="submit" full>Sign in to your account</PBtn>
        </div>
      </form>

      <p className="text-center text-[13.5px] font-medium text-slate-500 mt-8">
        Don't have an account?{" "}
        <button type="button" className="bg-transparent border-none text-primary-600 dark:text-primary-400 font-bold cursor-pointer p-0 hover:underline hover:text-primary-700">
          Create one free &rarr;
        </button>
      </p>
    </div>
  );

  if (isChild) return content;

  return (
    <div className="flex w-screen h-screen overflow-hidden bg-slate-50 dark:bg-slate-900">
      <LeftPanel />
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        {content}
      </div>
    </div>
  );
}