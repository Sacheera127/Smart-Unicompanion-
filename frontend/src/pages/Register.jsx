import { useState } from "react";

// ─── University & town data ───────────────────────────────────────────────────
const UNIS = [
  { value:"",label:"Choose your university...",short:"",type:null },
  ...([
    ["University of Moratuwa","UOM","state"],["University of Colombo","UOC","state"],
    ["University of Kelaniya","UOK","state"],["University of Peradeniya","UOP","state"],
    ["University of Sri Jayewardenepura","USJP","state"],["University of Jaffna","UOJ","state"],
    ["University of Ruhuna","UOR","state"],["Eastern University Sri Lanka","EUSL","state"],
  ].map(([value,short,type])=>({ value, label:`${value} (${short})`, short, type }))),
];

const YEARS=[{v:"",l:"Select year..."},{v:"1",l:"Year 1 — First Year"},{v:"2",l:"Year 2 — Second Year"},{v:"3",l:"Year 3 — Third Year"}];

// ─── Tiny primitives ──────────────────────────────────────────────────────────
function FInput({ label, err, icon, suffix, ...p }) {
  return (
    <div className="flex flex-col gap-1.5 w-full relative">
      <span className="text-[11px] font-bold tracking-[0.6px] uppercase text-slate-500">{label}</span>
      <div className="relative group">
        <input 
          className="w-full rounded-xl text-[13.5px] font-medium outline-none border-2 border-slate-200 bg-slate-50/50 text-slate-900 py-2.5 pl-3.5 pr-3.5"
          {...p}
        />
      </div>
    </div>
  );
}

function FSel({ label, err, icon, opts=[], ...p }) {
  return (
    <div className="flex flex-col gap-1.5 w-full relative">
      <span className="text-[11px] font-bold tracking-[0.6px] uppercase text-slate-500">{label}</span>
      <div className="relative group">
        <select 
          className="w-full rounded-xl text-[13.5px] font-medium outline-none border-2 border-slate-200 bg-slate-50/50 text-slate-900 py-2.5 pl-3.5 pr-10 appearance-none"
          {...p}
        >
          {opts.map(({v,l})=><option key={v} value={v}>{l}</option>)}
        </select>
      </div>
    </div>
  );
}

function PBtn({ children, loading, outline, full, type="button", onClick, className="" }) {
  return (
    <button type={type} onClick={onClick} className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-[13.5px] bg-gradient-to-br from-primary-600 to-primary-500 text-white ${full ? 'w-full' : 'w-auto'} ${className}`}>
      <span className="relative z-10 flex items-center justify-center gap-2 w-full">{children}</span>
    </button>
  );
}

/* ─── Main component ──────────────────────────────────────────────────────────── */
export default function Register({ isChild }) {
  const [form, setForm] = useState({name:"",email:"",password:"",confirmPassword:"",university:"",town:"",yearOfStudy:"",role:"ROLE_STUDENT"});
  const [step, setStep] = useState(1);

  const content = (
    <div className="w-full max-w-[420px]">
      <div className="mb-6">
        <button type="button" className="inline-flex items-center gap-2 text-[13px] font-bold text-slate-500">
          &larr; Back to Home
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-1">Create account</h2>
        <p className="text-[13.5px] text-slate-500 font-medium mb-6">Start with your personal details.</p>
        
        <FInput label="Full Name" placeholder="e.g. Kamal Perera" value={form.name} onChange={e=>setForm({...form, name: e.target.value})}/>
        <FInput label="Email" type="email" placeholder="yourname@uni.ac.lk" value={form.email} onChange={e=>setForm({...form, email: e.target.value})}/>
        <FInput label="Password" type="password" placeholder="Min. 6 characters" value={form.password} onChange={e=>setForm({...form, password: e.target.value})}/>
        <FInput label="Confirm Password" type="password" placeholder="Re-enter password" value={form.confirmPassword} onChange={e=>setForm({...form, confirmPassword: e.target.value})}/>
        
        <PBtn onClick={() => setStep(2)} full className="mt-2">
          Continue to Campus Setup
        </PBtn>
      </div>
    </div>
  );

  if (isChild) return content;

  return (
    <div className="flex w-screen h-screen overflow-hidden bg-slate-50">
      <div className="hidden lg:flex w-[45%] h-screen bg-slate-900 p-12 text-white">
        <div>Unify Registration Layout Panel</div>
      </div>
      <div className="flex-1 h-screen flex items-center justify-center p-6 md:p-10">
        {content}
      </div>
    </div>
  );
}