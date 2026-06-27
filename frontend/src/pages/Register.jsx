import { useState } from "react";
import { UserIcon, MailIcon, LockIcon, MapPinIcon, BuildingIcon, EyeIcon, EyeOffIcon, UnifyLogoIcon } from "../components/Icons";

// University & town data 
const UNIS = [
  { value:"",label:"Choose your university...",short:"",type:null },
  ...([
    ["University of Moratuwa","UOM","state"],["University of Colombo","UOC","state"],
    ["University of Kelaniya","UOK","state"],["University of Peradeniya","UOP","state"],
    ["University of Sri Jayewardenepura","USJP","state"],["University of Jaffna","UOJ","state"],
    ["University of Ruhuna","UOR","state"],["Eastern University Sri Lanka","EUSL","state"],
    ["South Eastern University of Sri Lanka","SEUSL","state"],["Rajarata University of Sri Lanka","RUSL","state"],
    ["Sabaragamuwa University of Sri Lanka","SUSL","state"],["Wayamba University of Sri Lanka","WUSL","state"],
    ["Uva Wellassa University","UWU","state"],["Open University of Sri Lanka","OUSL","state"],
    ["General Sir John Kotelawala Defence University","KDU","state"],
    ["SLIIT","SLIIT","private"],["NSBM Green University","NSBM","private"],
    ["APIIT Sri Lanka","APIIT","private"],["Informatics Institute of Technology","IIT","private"],
    ["CINEC Campus","CINEC","private"],["Horizon Campus","Horizon","private"],
    ["Esoft Metro Campus","Esoft","private"],["ICBT Campus","ICBT","private"],["NIBM","NIBM","private"],
  ].map(([value,short,type])=>({ value, label:`${value} (${short})`, short, type }))),
];
const TOWNS = {
  "University of Moratuwa":["Katubedda","Moratuwa Town","Angulana","Lunawa"],
  "University of Colombo":["Colombo 3","Thurstan","Borella"],
  "University of Kelaniya":["Kelaniya","Dalugama","Wattala"],
  "University of Peradeniya":["Peradeniya","Kandy City","Getambe"],
  "University of Sri Jayewardenepura":["Nugegoda","Gangodawila","Maharagama"],
  "University of Jaffna":["Thirunelveli","Jaffna Town"],
  "University of Ruhuna":["Wellamadama","Matara Town"],
};
const YEARS=[{v:"",l:"Select year..."},{v:"1",l:"Year 1 — First Year"},{v:"2",l:"Year 2 — Second Year"},{v:"3",l:"Year 3 — Third Year"},{v:"4",l:"Year 4 — Fourth Year"},{v:"5",l:"Year 5 — Postgraduate"}];

// Tiny primitives 
function FInput({ label, err, icon, suffix, ...p }) {
  return (
    <div className="flex flex-col gap-1.5 w-full relative">
      <span className={`text-[11px] font-bold tracking-[0.6px] uppercase transition-colors ${err ? 'text-red-500' : 'text-slate-500 focus-within:text-primary-600'}`}>{label}</span>
      <div className="relative group">
        {icon && <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 flex pointer-events-none transition-colors ${err ? 'text-red-400' : 'text-slate-400 group-focus-within:text-primary-500'}`}>{icon}</span>}
        <input 
          className={`w-full rounded-xl text-[13.5px] font-medium outline-none transition-all duration-200 
            ${icon ? 'pl-10' : 'pl-3.5'} 
            ${suffix ? 'pr-11' : 'pr-3.5'} py-2.5
            ${err 
              ? 'bg-red-50/50 border-red-300 text-red-900 focus:border-red-500 focus:ring-4 focus:ring-red-500/20' 
              : 'bg-slate-50/50 border-slate-200 text-slate-900 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 hover:border-slate-300'
            } border-2`}
          {...p}
        />
        {suffix && <span className="absolute right-2 top-1/2 -translate-y-1/2 flex">{suffix}</span>}
      </div>
    </div>
  );
}

function FSel({ label, err, icon, opts=[], ...p }) {
  return (
    <div className="flex flex-col gap-1.5 w-full relative">
      <span className={`text-[11px] font-bold tracking-[0.6px] uppercase transition-colors ${err ? 'text-red-500' : 'text-slate-500 focus-within:text-primary-600'}`}>{label}</span>
      <div className="relative group">
        {icon && <span className={`absolute left-3.5 top-1/2 -translate-y-1/2 flex pointer-events-none transition-colors ${err ? 'text-red-400' : 'text-slate-400 group-focus-within:text-primary-500'}`}>{icon}</span>}
        <select 
          className={`w-full rounded-xl text-[13.5px] font-medium outline-none appearance-none cursor-pointer transition-all duration-200 
            ${icon ? 'pl-10' : 'pl-3.5'} pr-10 py-2.5
            ${err 
              ? 'bg-red-50/50 border-red-300 text-red-900 focus:border-red-500 focus:ring-4 focus:ring-red-500/20' 
              : 'bg-slate-50/50 border-slate-200 text-slate-900 focus:bg-white focus:border-primary-500 focus:ring-4 focus:ring-primary-500/20 hover:border-slate-300'
            } border-2 ${!p.value ? 'text-slate-500' : 'text-slate-900'}`}
          {...p}
        >
          {opts.map(({v,l})=><option key={v} value={v}>{l}</option>)}
        </select>
        <span className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
        </span>
      </div>
    </div>
  );
}

function PBtn({ children, loading, outline, full, type="button", onClick, className="" }) {
  if (outline) return (
    <button type={type} onClick={onClick} className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border-2 border-slate-200 bg-slate-50 text-primary-600 font-bold text-[13.5px] transition-all hover:bg-primary-50 hover:border-primary-200 ${full ? 'w-full' : 'w-auto'} ${className}`}>
      {children}
    </button>
  );
  return (
    <button type={type} onClick={onClick} className={`relative inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border-none bg-gradient-to-br from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white font-bold text-[13.5px] transition-all shadow-lg shadow-primary-500/30 hover:shadow-primary-500/40 hover:-translate-y-0.5 overflow-hidden group ${full ? 'w-full' : 'w-auto'} ${className}`}>
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
      <span className="relative z-10 flex items-center justify-center gap-2 w-full">{children}</span>
    </button>
  );
}

function LeftPanel() {
  return (
    <div className="hidden lg:flex flex-col relative overflow-hidden w-[45%] h-screen bg-slate-900 p-12">
      <img src="/auth-bg.jpg" alt="Campus" className="absolute inset-0 w-full h-full object-cover object-top" />
      <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(30,0,60,.08) 0%, rgba(60,20,120,.12) 40%, rgba(60,20,100,.72) 70%, #2E0A5A 100%)" }} />
      <div className="flex items-center gap-3 relative z-10 mb-auto">
        <div className="w-10 h-10 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center backdrop-blur-md">
          <UnifyLogoIcon size={20} />
        </div>
        <div>
          <div className="text-[15px] font-black text-white tracking-tight leading-none mb-1">Unify</div>
          <div className="text-[9.5px] font-bold text-white/50 tracking-[0.8px] uppercase">Campus Life Platform</div>
        </div>
      </div>
      <div className="relative z-10 mt-auto">
        <h1 className="text-2xl font-black text-white tracking-tight leading-[1.15] mb-2">
          Join thousands of<br/>
          <span className="bg-gradient-to-r from-cyan-100 to-cyan-300 bg-clip-text text-transparent">Sri Lankan students.</span>
        </h1>
        <p className="text-[13px] text-white/70 leading-relaxed mb-4 max-w-[300px] font-medium">
          Personalised boardings, food and transport — for every Sri Lankan university.
        </p>
      </div>
    </div>
  );
}

/*Main component*/
export default function Register({ isChild }) {
  const [form, setForm] = useState({name:"",email:"",password:"",confirmPassword:"",university:"",town:"",yearOfStudy:"",role:"ROLE_STUDENT"});
  const [step, setStep] = useState(1);
  const [showPw, setShowPw] = useState(false);

  const set = (k,v) => { setForm(f=>({...f,[k]:v})); };

  const pwScore = (() => {
    const p=form.password; if(!p) return 0;
    return Math.min([p.length>=6,p.length>=10,/[A-Z]/.test(p),/[0-9]/.test(p),/[^A-Za-z0-9]/.test(p)].filter(Boolean).length,5);
  })();
  const pwCol=["","bg-red-500","bg-orange-500","bg-yellow-500","bg-green-500","bg-emerald-600"];
  const pwText=["","text-red-500","text-orange-500","text-yellow-500","text-green-500","text-emerald-600"];
  const pwLbl=["","Too short","Weak","Fair","Good","Strong"];

  const content = (
    <div className="w-full max-w-[420px]">
      {step < 3 && (
        <div className="flex items-center gap-2 mb-6">
          {[1,2].map((n,i)=>(
            <div key={n} className={`flex items-center gap-2 transition-all duration-300 ${n === step ? 'flex-[2]' : 'flex-1'}`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 transition-all duration-300 ${n === step ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                {n}
              </div>
            </div>
          ))}
        </div>
      )}

      {step === 1 && (
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-1">Create account</h2>
          <p className="text-[13.5px] text-slate-500 font-medium mb-6">Start with your personal details.</p>
          
          <div className="flex flex-col gap-4">
            <FInput label="Full Name" placeholder="e.g. Kamal Perera" icon={<UserIcon size={16}/>} value={form.name} onChange={e=>set("name",e.target.value)}/>
            <FInput label="Email" type="email" placeholder="yourname@uni.ac.lk" icon={<MailIcon size={16}/>} value={form.email} onChange={e=>set("email",e.target.value)}/>
            
            <div>
              <FInput label="Password" type={showPw?"text":"password"} placeholder="Min. 6 characters" icon={<LockIcon size={16}/>} value={form.password} onChange={e=>set("password",e.target.value)}
                suffix={
                  <button type="button" onClick={()=>setShowPw(p=>!p)} className="p-1.5 text-slate-400">
                    {showPw ? <EyeOffIcon size={15}/> : <EyeIcon size={15}/>}
                  </button>
                }/>
            </div>
            
            <FInput label="Confirm Password" type={showPw?"text":"password"} placeholder="Re-enter password" icon={<LockIcon size={16}/>} value={form.confirmPassword} onChange={e=>set("confirmPassword",e.target.value)}/>
            
            <PBtn onClick={() => setStep(2)} full className="mt-2">
              Continue to Campus Setup
            </PBtn>
          </div>
        </div>
      )}
    </div>
  );

  if (isChild) return content;

  return (
    <div className="flex w-screen h-screen overflow-hidden bg-slate-50 dark:bg-slate-900">
      <LeftPanel/>
      <div className="flex-1 h-screen flex items-center justify-center p-6 md:p-10">
        {content}
      </div>
    </div>
  );
}