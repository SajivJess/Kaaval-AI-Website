import React, { useEffect, useRef, useState } from "react";
import {
  Shield, CheckCircle2, MapPin, Activity, Eye, FileVideo,
  ShieldAlert, Cpu, Building2, Landmark, Newspaper, Tv2, Globe,
  Instagram, Facebook, Linkedin, Phone, Mail, MessageCircle,
  ChevronRight, BarChart2, AlertTriangle, Archive, LayoutDashboard,
  Smartphone, ArrowRight, Users
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";

/* ── helpers ─────────────────────────────────────── */
function useOnScreen(ref: React.RefObject<Element>, rootMargin = "0px") {
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setV(true); }, { rootMargin });
    obs.observe(el); return () => obs.unobserve(el);
  }, [ref, rootMargin]);
  return v;
}
const AnimatedCounter = ({ end, suffix = "" }: { end: number; suffix?: string }) => {
  const [c, setC] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const vis = useOnScreen(ref as React.RefObject<Element>, "-50px");
  useEffect(() => {
    if (!vis) return;
    let s = 0; const step = end / 120;
    const iv = setInterval(() => { s += step; if (s >= end) { setC(end); clearInterval(iv); } else setC(Math.floor(s)); }, 16.6);
    return () => clearInterval(iv);
  }, [vis, end]);
  return <span ref={ref}>{c}{suffix}</span>;
};
function useFadeUp(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-60px" });
  return { ref, style: { opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s` } };
}

/* ── road SVGs ────────────────────────────────────── */
const RoadSVG = ({ type }: { type: number }) => {
  const rd = "rgba(9,20,50,0.65)", ls = "rgba(120,155,210,0.45)", ms = "rgba(140,170,220,0.7)";
  if (type === 0) return (
    <svg viewBox="0 0 160 120" className="w-full h-full" fill="none">
      <rect x="55" y="0" width="50" height="120" fill={rd}/><rect x="0" y="35" width="160" height="50" fill={rd}/>
      <line x1="80" y1="0" x2="80" y2="30" stroke={ls} strokeWidth="1.2" strokeDasharray="5 4"/>
      <line x1="80" y1="90" x2="80" y2="120" stroke={ls} strokeWidth="1.2" strokeDasharray="5 4"/>
      <line x1="0" y1="60" x2="50" y2="60" stroke={ls} strokeWidth="1.2" strokeDasharray="5 4"/>
      <line x1="110" y1="60" x2="160" y2="60" stroke={ls} strokeWidth="1.2" strokeDasharray="5 4"/>
      {[0,1,2,3,4].map(i=><rect key={i} x="55" y={36+i*6} width="5" height="3" fill={ms} opacity="0.65"/>)}
      {[0,1,2,3,4].map(i=><rect key={i} x="100" y={36+i*6} width="5" height="3" fill={ms} opacity="0.65"/>)}
      <circle cx="44" cy="52" r="4" fill="rgba(231,236,242,0.5)"/>
    </svg>);
  if (type === 1) return (
    <svg viewBox="0 0 160 120" className="w-full h-full" fill="none">
      <rect x="0" y="40" width="160" height="45" fill={rd}/><rect x="60" y="85" width="40" height="35" fill={rd}/>
      <line x1="0" y1="62" x2="55" y2="62" stroke={ls} strokeWidth="1.2" strokeDasharray="5 4"/>
      <line x1="105" y1="62" x2="160" y2="62" stroke={ls} strokeWidth="1.2" strokeDasharray="5 4"/>
      <line x1="80" y1="90" x2="80" y2="120" stroke={ls} strokeWidth="1.2" strokeDasharray="5 4"/>
      <line x1="60" y1="85" x2="100" y2="85" stroke={ms} strokeWidth="1.2"/>
      <circle cx="32" cy="55" r="4" fill="rgba(231,236,242,0.5)"/>
    </svg>);
  if (type === 2) return (
    <svg viewBox="0 0 160 120" className="w-full h-full" fill="none">
      <rect x="55" y="0" width="45" height="55" fill={rd}/>
      <polygon points="55,55 100,55 160,120 110,120" fill={rd}/>
      <polygon points="55,55 10,120 55,120 100,55" fill={rd}/>
      <line x1="77" y1="0" x2="77" y2="50" stroke={ls} strokeWidth="1.2" strokeDasharray="5 4"/>
      <line x1="60" y1="60" x2="20" y2="120" stroke={ls} strokeWidth="1.2" strokeDasharray="5 4"/>
      <line x1="96" y1="60" x2="136" y2="120" stroke={ls} strokeWidth="1.2" strokeDasharray="5 4"/>
      <circle cx="77" cy="28" r="5" fill="rgba(231,236,242,0.45)"/>
    </svg>);
  return (
    <svg viewBox="0 0 160 120" className="w-full h-full" fill="none">
      <rect x="0" y="45" width="160" height="45" fill={rd}/>
      <path d="M130 0 Q145 0 145 20 L145 45" stroke={rd} strokeWidth="28" fill="none"/>
      <line x1="0" y1="67" x2="125" y2="67" stroke={ls} strokeWidth="1.2" strokeDasharray="6 5"/>
      <line x1="135" y1="67" x2="160" y2="67" stroke={ls} strokeWidth="1.2" strokeDasharray="6 5"/>
      {[0,1,2,3,4,5,6].map(i=><rect key={i} x={10+i*22} y="46" width="7" height="3" fill={ms} opacity="0.5"/>)}
      <circle cx="55" cy="59" r="4" fill="rgba(231,236,242,0.5)"/>
    </svg>);
};

/* ── camera tile ──────────────────────────────────── */
const PLATES = ["TN 32 AB 1234","KL 01 CD 5678","TN 74 EF 9012","KL 58 GH 3456"];
function CameraFeedTile({ label, roadType, scanClass, isActive, onClick }: { label:string; roadType:number; scanClass:string; isActive:boolean; onClick:()=>void }) {
  const t = new Date().toLocaleTimeString("en-IN",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:false});
  return (
    <div className="relative rounded overflow-hidden aspect-video cursor-pointer select-none"
      style={{background:"#0C2148",border:isActive?"1px solid rgba(204,41,41,0.7)":"1px solid rgba(36,61,110,0.8)"}}
      onClick={onClick} data-testid={`camera-tile-${roadType}`}>
      <div className="absolute inset-0 p-1 opacity-90"><RoadSVG type={roadType}/></div>
      <div className={`scan-line ${scanClass}`}/>
      <div className="absolute top-2 left-2 flex items-center gap-1 z-20">
        <div className="rec-blink w-1.5 h-1.5 rounded-full" style={{background:"#CC2929"}}/>
        <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:"8px",color:"rgba(231,236,242,0.65)",letterSpacing:"0.08em"}}>REC</span>
      </div>
      <div className="absolute top-2 right-2 z-20">
        <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:"8px",color:"rgba(143,163,184,0.8)",letterSpacing:"0.05em"}}>{t}</span>
      </div>
      {isActive && (
        <div className="detection-box absolute inset-0 z-30 flex flex-col items-center justify-center">
          <div className="relative" style={{width:"44%",height:"44%"}}>
            <div className="absolute inset-0 border-2 rounded-sm" style={{borderColor:"#CC2929"}}>
              <div className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2" style={{borderColor:"#CC2929"}}/>
              <div className="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2" style={{borderColor:"#CC2929"}}/>
              <div className="absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2" style={{borderColor:"#CC2929"}}/>
              <div className="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2" style={{borderColor:"#CC2929"}}/>
            </div>
            <div className="absolute -top-5 left-0 right-0 flex justify-center">
              <span style={{background:"#CC2929",color:"#fff",fontFamily:"'IBM Plex Mono',monospace",fontSize:"8px",fontWeight:700,padding:"1px 5px",borderRadius:"2px",letterSpacing:"0.05em",whiteSpace:"nowrap"}}>NO HELMET</span>
            </div>
          </div>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center" style={{background:"rgba(9,20,50,0.95)",border:"1px solid rgba(204,41,41,0.5)",borderRadius:"3px",padding:"3px 8px"}}>
            <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:"7px",color:"rgba(143,163,184,0.9)",letterSpacing:"0.1em"}}>ANPR</span>
            <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:"10px",color:"#CC2929",fontWeight:700,letterSpacing:"0.08em"}}>{PLATES[roadType]}</span>
          </div>
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 z-20" style={{background:"linear-gradient(to top,rgba(9,20,50,0.95),transparent)",padding:"10px 8px 5px"}}>
        <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:"9px",color:"rgba(231,236,242,0.8)",letterSpacing:"0.06em"}}>{label}</span>
      </div>
    </div>
  );
}

/* ── modal component ─────────────────────────────── */
const PilotModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0F1E36]/80 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full p-8 relative">
         <button onClick={onClose} className="absolute top-5 right-5 text-[#8FA3B8] hover:text-[#0F1E36] transition-colors">
           <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
         </button>
         <h2 className="font-serif text-3xl font-bold mb-2 text-[#0F1E36]" style={{fontFamily:"'Fraunces',serif"}}>Request Pilot Deployment</h2>
         <p className="text-sm text-[#4A5E78] mb-6">Leave your details and our deployment team will contact you to arrange a demonstration and infrastructure assessment.</p>
         
         <form action="https://formsubmit.co/sajiv2580@gmail.com" method="POST" className="space-y-4">
            <input type="text" name="_honey" style={{display:"none"}} />
            <input type="hidden" name="_captcha" value="false" />
            <input type="hidden" name="_next" value={typeof window !== "undefined" ? window.location.href : ""} />
            <input type="hidden" name="_subject" value="New Kaaval AI Pilot Request!" />
            
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1B3A6B]" style={{fontFamily:"'IBM Plex Mono',monospace"}}>Full Name</label>
              <input type="text" name="name" required placeholder="Officer / Representative Name" className="w-full px-4 py-3 rounded border border-[#DDE3ED] focus:border-[#CC2929] focus:outline-none transition-colors text-sm" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1B3A6B]" style={{fontFamily:"'IBM Plex Mono',monospace"}}>Official Email</label>
              <input type="email" name="email" required placeholder="gov.in or official email" className="w-full px-4 py-3 rounded border border-[#DDE3ED] focus:border-[#CC2929] focus:outline-none transition-colors text-sm" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1B3A6B]" style={{fontFamily:"'IBM Plex Mono',monospace"}}>Organization</label>
              <input type="text" name="organization" required placeholder="Police Department / City Administration" className="w-full px-4 py-3 rounded border border-[#DDE3ED] focus:border-[#CC2929] focus:outline-none transition-colors text-sm" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#1B3A6B]" style={{fontFamily:"'IBM Plex Mono',monospace"}}>Requirements</label>
              <textarea name="message" required placeholder="Briefly describe your current CCTV setup or enforcement goals..." rows={3} className="w-full px-4 py-3 rounded border border-[#DDE3ED] focus:border-[#CC2929] focus:outline-none transition-colors text-sm resize-none"></textarea>
            </div>
            
            <button type="submit" className="w-full font-bold text-white py-4 rounded transition-colors mt-2" style={{background:"#CC2929"}} onMouseEnter={e=>e.currentTarget.style.background="#E03333"} onMouseLeave={e=>e.currentTarget.style.background="#CC2929"}>Submit Request</button>
            <p className="text-[10px] text-center text-[#8FA3B8] mt-4 font-mono">Or contact us directly at <a href="mailto:kaaval.ai.kanyakumari@gmail.com" className="text-[#CC2929] hover:underline">kaaval.ai.kanyakumari@gmail.com</a></p>
         </form>
      </div>
    </div>
  );
};

/* ── main component ──────────────────────────────── */
export default function Home() {
  const [heroIdx, setHeroIdx]                         = useState(0);
  const [activeStep, setActiveStep]                   = useState(0);
  const [activeDetectionTile, setActiveDetectionTile] = useState(0);
  const [scrolled, setScrolled]                       = useState(false);
  const [isModalOpen, setIsModalOpen]                 = useState(false);

  const heroTexts = [
    "The Zero Accident Initiative",
    "The Safe City Initiative",
    "The Intelligent Enforcement Initiative",
    "The Road Safety Initiative",
  ];

  useEffect(() => { const iv = setInterval(() => setHeroIdx(p=>(p+1)%heroTexts.length), 3000); return ()=>clearInterval(iv); }, []);
  useEffect(() => { const iv = setInterval(() => setActiveDetectionTile(p=>(p+1)%4), 3000); return ()=>clearInterval(iv); }, []);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, {passive:true}); return ()=>window.removeEventListener("scroll",fn);
  }, []);

  const hFade  = useFadeUp(0);
  const cFade  = useFadeUp(0.2);

  const R   = "#CC2929"; // red
  const N   = "#1B3A6B"; // navy
  const INK = "#0F1E36"; // darkest text/section bg
  const S   = "#4A5E78"; // steel / secondary text
  const M   = "#8FA3B8"; // muted text on dark
  const L   = "#E7ECF2"; // light text on dark
  const LN  = "#DDE3ED"; // light border
  const DN  = "#243D6E"; // dark section border
  const GR  = "#2A7A5A"; // green signal
  const AL  = "#F2F4F8"; // alt section bg
  const PNL = "#1B3A6B"; // panel navy
  const TILE= "#0C2148"; // tile dark

  const violationSteps = [
    {title:"Motorcycle Detected",  icon:Eye,        desc:"Camera identifies a two-wheeler entering the monitored zone."},
    {title:"Violation Identified", icon:Cpu,        desc:"AI model confirms the rider is not wearing a helmet."},
    {title:"Evidence Captured",    icon:FileVideo,  desc:"High-res violation frame and cropped ANPR plate stored securely."},
    {title:"Alert Logged",         icon:ShieldAlert,desc:"Timestamped record created in the enforcement management system."},
    {title:"Officer Review",       icon:Shield,     desc:"Assigned officer reviews the validated alert and takes action."},
  ];

  const deploymentModels = [
    { name:"Pilot Deployment",      scope:"Single Junction", bullets:["Rapid evaluation setup","Live AI detection on 1 feed","Evidence generation & review","Weekly performance reports"] },
    { name:"Subdivision Deployment",scope:"Multiple Junctions",bullets:["3–10 junction integration","Centralized monitoring hub","Unified violation dashboard","Dedicated deployment support"] },
    { name:"District Deployment",   scope:"Full District",   bullets:["Command center integration","Multi-subdivision rollout","Cross-junction analytics","District-level reporting"] },
    { name:"Statewide Deployment",  scope:"State Network",   bullets:["Large-scale enforcement network","Unified statewide analytics","Inter-district command visibility","Custom SLA & on-site support"] },
  ];

  const journeySteps = [
    {label:"Research Started",    desc:"Road safety data analysis and technology feasibility study"},
    {label:"Prototype Developed", desc:"First working model tested on recorded CCTV footage"},
    {label:"AI Validation",       desc:"Model accuracy validated across diverse lighting and angle conditions"},
    {label:"Police Discussions",  desc:"Initial consultations with traffic police and district administration"},
    {label:"Pilot Deployment",    desc:"Live deployment at Collectorate Roundabout, Kanyakumari"},
    {label:"Live Operations",     desc:"Real-time violation detection running 24/7"},
    {label:"District Expansion",  desc:"Active discussions for multi-junction district rollout"},
  ];

  const mediaPrint = [
    {name:"Dinamalar",        lang:"Tamil Daily"},
    {name:"Dinathanthi",      lang:"Tamil Daily"},
    {name:"The Hindu",        lang:"English Daily"},
    {name:"Times of India",   lang:"English Daily"},
  ];
  const mediaTV = [
    {name:"News7 Tamil",         ch:"News Channel"},
    {name:"Polimer News",        ch:"News Channel"},
    {name:"Thanthi TV",          ch:"News Channel"},
    {name:"Puthiya Thalaimurai", ch:"News Channel"},
  ];
  const mediaDigital = [
    {name:"IndiaInLast24Hr",     type:"News Portal"},
    {name:"StartupTN",           type:"Startup Ecosystem"},
    {name:"District Police Page",type:"Official Channel"},
    {name:"Tech Communities",    type:"Developer Networks"},
  ];

  const dashScreens = [
    {title:"Command Dashboard",             icon:LayoutDashboard, desc:"Live overview of all active junctions with violation counters and camera status"},
    {title:"Violations Log",                icon:AlertTriangle,   desc:"Timestamped violation records with frame captures and ANPR plate extraction"},
    {title:"Habitual Offender Tracking",    icon:Users,           desc:"Automated identification and ranking of repeat traffic violators based on risk level and offense frequency"},
    {title:"Automated Evidence Processing", icon:Cpu,             desc:"AI-driven confidence scoring with an integrated dual-view interface for verifying vehicle plates and scene context"},
    {title:"Role-Based Access Control",     icon:Shield,          desc:"Hierarchical permission system restricting subdivision officers to their specific jurisdictions while granting command centers global oversight"},
    {title:"Advanced Analytics & Reporting",icon:BarChart2,       desc:"Real-time statistical breakdowns by violation type and location, featuring one-click daily PDF report generation"},
  ];

  return (
    <div className="min-h-screen bg-white text-[#0F1E36] font-sans overflow-x-hidden selection:bg-[#CC2929] selection:text-white">

      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300" style={{
        background: scrolled?"rgba(255,255,255,0.97)":"rgba(255,255,255,0.93)",
        backdropFilter:"blur(12px)",
        borderBottom: scrolled?`1px solid ${LN}`:"1px solid transparent",
        boxShadow: scrolled?"0 1px 14px rgba(15,30,54,0.07)":"none",
      }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-7 h-7" style={{color:N}}/>
            <span className="font-serif font-bold text-xl tracking-tight" style={{color:N,fontFamily:"'Fraunces',serif"}}>KAAVAL AI</span>
          </div>
          <div className="flex items-center gap-6">
            {[["#platform","Platform"],["#deployment","Deployment"],["#our-impact","Impact"],["#media","Media"],["#contact","Contact"]].map(([href,label])=>(
              <a key={label} href={href} className="text-sm font-medium transition-colors hidden md:block" style={{color:S}}
                onMouseEnter={e=>(e.currentTarget.style.color=INK)} onMouseLeave={e=>(e.currentTarget.style.color=S)}>{label}</a>
            ))}
            <button onClick={() => setIsModalOpen(true)} className="font-semibold px-5 py-2.5 rounded-sm transition-all text-sm text-white" style={{background:R}}
              onMouseEnter={e=>(e.currentTarget.style.background="#E03333")} onMouseLeave={e=>(e.currentTarget.style.background=R)}
              data-testid="button-nav-pilot">Request Pilot Deployment</button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center bg-grid-light bg-white" style={{paddingTop:"72px"}}>
        <div className="radar-sweep-line" style={{background:"linear-gradient(to right,transparent,rgba(27,58,107,0.05),transparent)"}}/>
        <div className="max-w-7xl mx-auto w-full px-6 py-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div ref={hFade.ref} style={hFade.style} className="flex flex-col items-start gap-7">
            <div className="flex items-center gap-2">
              <div className="w-5 h-0.5" style={{background:R}}/>
              <span className="font-mono text-xs font-medium uppercase tracking-widest" style={{fontFamily:"'IBM Plex Mono',monospace",color:N,letterSpacing:"0.18em"}}>Smart City Initiative</span>
            </div>

            {/* Fixed rotating headline — one line at a time */}
            <div className="relative overflow-hidden w-full min-h-[140px] md:min-h-[160px]">
              <AnimatePresence mode="wait">
                <motion.h1
                  key={heroIdx}
                  initial={{opacity:0,y:24}}
                  animate={{opacity:1,y:0}}
                  exit={{opacity:0,y:-24}}
                  transition={{duration:0.6,ease:"easeInOut"}}
                  className="absolute top-0 left-0 font-serif font-black leading-tight"
                  style={{fontFamily:"'Fraunces',serif",fontSize:"clamp(2.75rem,5.5vw,4.5rem)",color:INK,maxWidth:"100%"}}
                >
                  {heroTexts[heroIdx]}.
                </motion.h1>
              </AnimatePresence>
            </div>

            <p className="text-lg leading-relaxed max-w-lg" style={{color:S}}>
              Transforming existing CCTV infrastructure into proactive safety networks — institutional-grade helmet detection and ANPR for police departments aiming for accident-free roads.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button onClick={() => setIsModalOpen(true)} className="font-semibold px-8 py-4 rounded-sm transition-all text-base text-white" style={{background:R}}
                onMouseEnter={e=>(e.currentTarget.style.background="#E03333")} onMouseLeave={e=>(e.currentTarget.style.background=R)}
                data-testid="button-hero-pilot">Request Pilot Deployment</button>
              <a href="#deployment" className="font-medium px-8 py-4 rounded-sm transition-all text-base border" style={{borderColor:LN,color:INK}}
                onMouseEnter={e=>{e.currentTarget.style.borderColor=N;e.currentTarget.style.color=N;}}
                onMouseLeave={e=>{e.currentTarget.style.borderColor=LN;e.currentTarget.style.color=INK;}}>View Deployment Models</a>
            </div>

            {/* 4th stat — live deployment indicator */}
            <div className="flex items-center gap-2.5 mt-1">
              <span className="w-2 h-2 rounded-full shrink-0 animate-pulse" style={{background:GR,boxShadow:`0 0 0 3px rgba(42,122,90,0.18)`}}/>
              <span className="font-mono text-xs font-semibold" style={{fontFamily:"'IBM Plex Mono',monospace",color:GR,letterSpacing:"0.08em"}}>Pilot Operational</span>
              <span style={{color:"rgba(74,94,120,0.4)"}}>·</span>
              <span className="font-mono text-xs" style={{fontFamily:"'IBM Plex Mono',monospace",color:S,letterSpacing:"0.05em"}}>Nagercoil, TN</span>
            </div>

            <div className="pl-5 py-2 border-l-[3px] mt-2" style={{borderColor:R}}>
              <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{fontFamily:"'IBM Plex Mono',monospace",color:R,letterSpacing:"0.15em"}}>Contextual Mandate</p>
              <p className="font-medium italic text-base leading-snug" style={{color:INK}}>"56% of road fatalities in India involve two-wheelers — the majority not wearing helmets."</p>
              <p className="text-xs mt-1 not-italic" style={{color:S}}>— Ministry of Road Transport & Highways, 2022</p>
            </div>
          </div>

          {/* Command Center */}
          <div ref={cFade.ref} style={{...cFade.style,background:PNL,border:`1px solid ${DN}`,borderRadius:"10px",boxShadow:"0 24px 64px rgba(15,30,54,0.25)"}} className="p-5 hidden sm:block">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{background:GR}}/>
                <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:"11px",color:GR,letterSpacing:"0.14em",fontWeight:500}}>LIVE</span>
              </div>
              <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:"10px",color:M,letterSpacing:"0.12em"}}>KAAVAL COMMAND CENTER</span>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[{label:"Junction 01 – Market St",road:0},{label:"Junction 02 – Central Ave",road:1},{label:"Junction 03 – NH-47 Bypass",road:2},{label:"Junction 04 – Port Road",road:3}].map((f,idx)=>(
                <CameraFeedTile key={idx} label={f.label} roadType={f.road} scanClass={`scan-line-${idx+1}`} isActive={activeDetectionTile===idx} onClick={()=>setActiveDetectionTile(idx)}/>
              ))}
            </div>
            <div className="px-3 py-2 rounded flex items-center justify-between" style={{background:TILE,border:`1px solid ${DN}`}}>
              {["AI PROCESSING: 4 FEEDS","DETECTION RATE: 99.2%","LAST ALERT: 2s AGO"].map((s,i)=>(
                <React.Fragment key={i}>{i>0&&<span style={{color:DN}}>·</span>}
                  <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:"9px",color:M,letterSpacing:"0.07em"}}>{s}</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <section style={{background:AL,borderTop:`1px solid ${LN}`,borderBottom:`1px solid ${LN}`}} className="py-5">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-3 lg:gap-6">
          {["Police Department Pilot","Smart City Ready","Existing CCTV Compatible","Rapid Deployment","Govt. Approved Standards"].map((b,i)=>(
            <div key={i} className="border px-4 py-1.5 rounded-sm font-mono text-xs tracking-wider uppercase whitespace-nowrap"
              style={{fontFamily:"'IBM Plex Mono',monospace",borderColor:N,color:N,background:"rgba(27,58,107,0.05)",letterSpacing:"0.1em"}}>{b}</div>
          ))}
        </div>
      </section>

      {/* ── Why Kaaval AI ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{fontFamily:"'IBM Plex Mono',monospace",color:R,letterSpacing:"0.18em"}}>Value Proposition</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold" style={{fontFamily:"'Fraunces',serif",color:INK}}>Why KAAVAL AI?</h2>
            <p className="mt-3 text-base max-w-2xl mx-auto" style={{color:S}}>Four reasons a district chooses Kaaval over traditional enforcement — understood in 10 seconds.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {Icon:Shield,     title:"Save Lives",             desc:"Automated helmet violation detection as a direct intervention in India's leading cause of two-wheeler fatalities."},
              {Icon:Eye,        title:"Works With Existing CCTV",desc:"No camera replacement. No civil work. Kaaval connects to your current RTSP feeds — the city's existing investment becomes its safety backbone."},
              {Icon:ShieldAlert,title:"Faster Enforcement",     desc:"Violations are detected, evidenced, and flagged to officers in seconds — not hours. Evidence is camera-ready for challan and court."},
              {Icon:Building2,  title:"District-Wide Scalability",desc:"Start with a single junction pilot. Expand to subdivision, district, and state — one unified platform, one command center."},
            ].map(({Icon,title,desc},i)=>{
              const fade = useFadeUp(i*0.1);
              return (
                <div key={i} ref={fade.ref} style={{...fade.style,background:"#fff",border:`1px solid ${LN}`,borderTop:`3px solid ${R}`,borderRadius:"8px"}} className="p-7 flex flex-col">
                  <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-5" style={{background:"rgba(204,41,41,0.07)"}}>
                    <Icon className="w-5 h-5" style={{color:R}}/>
                  </div>
                  <h3 className="font-serif text-xl font-bold mb-3" style={{fontFamily:"'Fraunces',serif",color:INK}}>{title}</h3>
                  <p className="text-sm leading-relaxed" style={{color:S}}>{desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-24" style={{background:AL}}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-4">
            <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{fontFamily:"'IBM Plex Mono',monospace",color:R,letterSpacing:"0.18em"}}>AI Detection Pipeline</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold" style={{fontFamily:"'Fraunces',serif",color:INK}}>From Camera Feed to Enforcement Action.</h2>
          </div>
          <p className="text-center text-sm mb-12" style={{color:S,fontFamily:"'IBM Plex Mono',monospace"}}>Hover any feed to preview AI detection in action</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
            {[0,1,2,3].map(type=>(
              <div key={type} className="relative overflow-hidden group cursor-crosshair rounded-lg"
                style={{aspectRatio:"3/4",background:TILE,border:`1px solid ${DN}`}}>
                <div className="absolute inset-0 p-2 opacity-85"><RoadSVG type={type}/></div>
                <div className={`scan-line scan-line-${type+1}`}/>
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="relative" style={{width:"45%",height:"38%"}}>
                    <div className="absolute inset-0 border-2 rounded-sm" style={{borderColor:R}}>
                      {["-top-px -left-px border-t-2 border-l-2","-top-px -right-px border-t-2 border-r-2","-bottom-px -left-px border-b-2 border-l-2","-bottom-px -right-px border-b-2 border-r-2"].map((c,i)=>(
                        <div key={i} className={`absolute w-3 h-3 ${c}`} style={{borderColor:R}}/>
                      ))}
                    </div>
                    <div className="absolute -top-5 left-0 right-0 flex justify-center">
                      <span style={{background:R,color:"#fff",fontFamily:"'IBM Plex Mono',monospace",fontSize:"9px",fontWeight:700,padding:"1px 6px",borderRadius:"2px",whiteSpace:"nowrap"}}>NO HELMET</span>
                    </div>
                  </div>
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
                    style={{background:"rgba(9,20,50,0.95)",border:`1px solid rgba(204,41,41,0.5)`,borderRadius:"3px",padding:"4px 10px"}}>
                    <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:"8px",color:"rgba(143,163,184,0.9)",letterSpacing:"0.1em"}}>ANPR EXTRACT</span>
                    <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:"11px",color:R,fontWeight:700,letterSpacing:"0.1em"}}>{PLATES[type]}</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 z-20 p-3" style={{background:"linear-gradient(to top,rgba(9,20,50,0.95),transparent)"}}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{background:R}}/>
                    <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:"8px",color:"rgba(231,236,242,0.6)",letterSpacing:"0.1em"}}>REC · FEED {type+1}</span>
                  </div>
                  <p style={{color:"rgba(143,163,184,0.8)",fontFamily:"'IBM Plex Mono',monospace",fontSize:"9px"}}>
                    {["Junction 01 – Market St","Junction 02 – Central Ave","Junction 03 – NH-47 Bypass","Junction 04 – Port Road"][type]}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Violation flow stepper */}
          <div className="rounded-xl overflow-hidden" style={{border:`1px solid ${LN}`}}>
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-2/5 p-6 bg-white" style={{borderRight:`1px solid ${LN}`}}>
                {violationSteps.map((step,i)=>{
                  const active=i===activeStep;
                  return (
                    <button key={i} onClick={()=>setActiveStep(i)}
                      className="w-full text-left p-4 rounded-lg flex items-center gap-4 mb-2 last:mb-0 transition-all duration-200"
                      style={{background:active?"#F2F4F8":"transparent",border:active?`1px solid ${LN}`:"1px solid transparent",borderLeft:active?`3px solid ${R}`:`3px solid transparent`,boxShadow:active?"0 2px 8px rgba(15,30,54,0.06)":"none"}}
                      data-testid={`button-step-${i}`}>
                      <div className="w-9 h-9 rounded flex items-center justify-center shrink-0" style={{background:active?R:"rgba(27,58,107,0.08)"}}>
                        <step.icon className="w-4 h-4" style={{color:active?"#fff":N}}/>
                      </div>
                      <div>
                        <div className="font-mono text-[10px] mb-0.5" style={{fontFamily:"'IBM Plex Mono',monospace",color:active?R:S,letterSpacing:"0.12em"}}>STEP 0{i+1}</div>
                        <div className="font-semibold text-sm" style={{color:active?INK:S}}>{step.title}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="lg:w-3/5 bg-grid-dark flex flex-col items-center justify-center p-10 min-h-[300px] relative overflow-hidden" style={{background:INK}}>
                <div className="radar-sweep-line" style={{background:"linear-gradient(to right,transparent,rgba(204,41,41,0.05),transparent)"}}/>
                <AnimatePresence mode="wait">
                  <motion.div key={activeStep} initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-14}} transition={{duration:0.3}}
                    className="relative z-10 flex flex-col items-center text-center max-w-sm">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mb-6" style={{background:"rgba(204,41,41,0.12)",border:`1px solid rgba(204,41,41,0.25)`}}>
                      {React.createElement(violationSteps[activeStep].icon,{className:"w-7 h-7",style:{color:R}})}
                    </div>
                    <h3 className="font-serif text-2xl font-bold mb-3" style={{fontFamily:"'Fraunces',serif",color:L}}>{violationSteps[activeStep].title}</h3>
                    <p className="text-sm leading-relaxed" style={{color:M}}>{violationSteps[activeStep].desc}</p>
                    <div className="mt-8 flex gap-2">
                      {violationSteps.map((_,i)=>(
                        <div key={i} className="h-1 rounded-full transition-all duration-300" style={{width:i===activeStep?"28px":"8px",background:i===activeStep?R:DN}}/>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Comparison ── */}
      <section className="py-24 bg-grid-dark relative overflow-hidden" style={{background:INK}}>
        <div className="radar-sweep-line" style={{background:"linear-gradient(to right,transparent,rgba(204,41,41,0.05),transparent)"}}/>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-14">
            <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{fontFamily:"'IBM Plex Mono',monospace",color:R,letterSpacing:"0.18em"}}>Infrastructure Upgrade</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold" style={{fontFamily:"'Fraunces',serif",color:L}}>A Smarter Path to Safer Roads.</h2>
          </div>
          <div className="grid lg:grid-cols-[1fr_60px_1fr] gap-6 items-center">
            <div className="rounded-lg p-8" style={{background:PNL,border:`1px solid ${DN}`}}>
              <h3 className="font-serif text-2xl font-bold mb-7 pb-5" style={{fontFamily:"'Fraunces',serif",color:M,borderBottom:`1px solid ${DN}`}}>Traditional Approach</h3>
              <ul className="space-y-5">
                {[{t:"Replace All Cameras",d:"New hardware at every junction — major procurement"},{t:"₹15–25L Per Junction",d:"High capital expenditure before a single frame is processed"},{t:"6–12 Month Rollout",d:"Procurement, installation, and calibration delays"},{t:"Siloed Systems",d:"Each junction operates independently, no centralized view"}].map((r,i)=>(
                  <li key={i} className="flex gap-4 items-start">
                    <div className="mt-1 w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-bold" style={{background:"#0C2148",color:M}}>×</div>
                    <div><h4 className="font-medium mb-0.5" style={{color:L}}>{r.t}</h4><p className="text-sm" style={{color:M}}>{r.d}</p></div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden lg:flex flex-col items-center justify-center gap-3 h-full">
              <div className="flex-1 w-px" style={{background:DN}}/><span className="font-mono font-bold text-sm" style={{fontFamily:"'IBM Plex Mono',monospace",color:M}}>VS</span>
              <div className="flex-1 w-px" style={{background:DN}}/>
            </div>
            <div className="rounded-lg p-8 relative" style={{background:PNL,border:`2px solid ${R}`}}>
              <div className="absolute top-0 right-8 -translate-y-1/2 font-mono text-xs font-bold px-3 py-1 rounded-sm uppercase" style={{fontFamily:"'IBM Plex Mono',monospace",background:R,color:"#fff",letterSpacing:"0.1em"}}>Kaaval AI</div>
              <h3 className="font-serif text-2xl font-bold mb-7 pb-5" style={{fontFamily:"'Fraunces',serif",color:L,borderBottom:`1px solid ${DN}`}}>The Modern Upgrade</h3>
              <ul className="space-y-5">
                {[{t:"Reuse Existing CCTV",d:"Connects to your current cameras via RTSP — no new hardware"},{t:"Fraction of Capital Cost",d:"SaaS model eliminates CapEx — pay per camera per month"},{t:"Weeks, Not Months",d:"Remote software deployment — operational in days"},{t:"Centralized Command",d:"All junctions visible in one unified dashboard"}].map((r,i)=>(
                  <li key={i} className="flex gap-4 items-start">
                    <CheckCircle2 className="mt-1 w-5 h-5 shrink-0" style={{color:R}}/>
                    <div><h4 className="font-medium mb-0.5" style={{color:L}}>{r.t}</h4><p className="text-sm" style={{color:M}}>{r.d}</p></div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Deployment Models (replaces pricing) ── */}
      <section id="deployment" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{fontFamily:"'IBM Plex Mono',monospace",color:R,letterSpacing:"0.18em"}}>Flexible Rollout</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-3" style={{fontFamily:"'Fraunces',serif",color:INK}}>Deployment Models</h2>
            <p className="text-base max-w-2xl mx-auto" style={{color:S}}>Every deployment is configured to the jurisdiction — single junction pilot to statewide enforcement network. Contact us for a deployment assessment.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {deploymentModels.map((model,idx)=>{
              const fade = useFadeUp(idx*0.08);
              return (
                <div key={idx} ref={fade.ref} style={{...fade.style,background:"#fff",border:`1px solid ${LN}`,borderRadius:"8px"}} className="p-7 flex flex-col transition-all duration-200"
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=N;e.currentTarget.style.boxShadow="0 4px 20px rgba(27,58,107,0.10)";e.currentTarget.style.transform="translateY(-3px)"}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=LN;e.currentTarget.style.boxShadow="none";e.currentTarget.style.transform="none"}}>
                  <div className="mb-2">
                    <p className="font-mono text-[10px] uppercase tracking-widest mb-1" style={{fontFamily:"'IBM Plex Mono',monospace",color:R,letterSpacing:"0.18em"}}>{model.scope}</p>
                    <h3 className="font-serif text-xl font-bold" style={{fontFamily:"'Fraunces',serif",color:INK}}>{model.name}</h3>
                  </div>
                  <div className="h-px my-5" style={{background:LN}}/>
                  <ul className="space-y-3 flex-grow mb-7">
                    {model.bullets.map((b,i)=>(
                      <li key={i} className="flex gap-2.5 text-sm items-start" style={{color:S}}>
                        <ChevronRight className="w-4 h-4 shrink-0 mt-0.5" style={{color:N}}/><span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-3 rounded-sm font-semibold transition-all text-sm border" style={{borderColor:N,color:N,background:"transparent"}}
                    onMouseEnter={e=>{e.currentTarget.style.background=N;e.currentTarget.style.color="#fff"}}
                    onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.color=N}}
                    data-testid={`button-model-${idx}`}>Request Information</button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Live Deployment / Case Study ── */}
      <section className="py-24 bg-grid-dark relative overflow-hidden" style={{background:INK}}>
        <div className="radar-sweep-line" style={{background:"linear-gradient(to right,transparent,rgba(204,41,41,0.05),transparent)"}}/>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-10">
            <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{fontFamily:"'IBM Plex Mono',monospace",color:R,letterSpacing:"0.18em"}}>Live Deployment</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-1" style={{fontFamily:"'Fraunces',serif",color:L}}>First Live Deployment</h2>
            <p className="font-mono text-sm flex items-center gap-2" style={{fontFamily:"'IBM Plex Mono',monospace",color:M}}>
              <MapPin className="w-4 h-4" style={{color:R}}/> Collectorate Roundabout, Kanyakumari District, Tamil Nadu
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-0 rounded-lg overflow-hidden" style={{border:`1px solid ${DN}`}}>
            <div className="flex items-center justify-center p-10 lg:p-14" style={{background:PNL,borderRight:`1px solid ${DN}`}}>
              <svg viewBox="0 0 240 240" fill="none" className="w-full max-w-[280px]">
                <circle cx="120" cy="120" r="110" stroke={DN} strokeWidth="1"/>
                <circle cx="120" cy="120" r="70" stroke={DN} strokeWidth="1" strokeDasharray="4 5"/>
                <line x1="120" y1="10" x2="120" y2="230" stroke={DN} strokeWidth="3"/>
                <line x1="10" y1="120" x2="230" y2="120" stroke={DN} strokeWidth="3"/>
                <line x1="40" y1="40" x2="200" y2="200" stroke={DN} strokeWidth="2"/>
                <rect x="108" y="108" width="24" height="24" stroke={DN} strokeWidth="1.5" fill="#0C2148"/>
                {[{cx:120,cy:30},{cx:210,cy:120},{cx:120,cy:210},{cx:30,cy:120}].map((p,i)=>(
                  <g key={i}>
                    <circle cx={p.cx} cy={p.cy} r="9" fill={R} opacity="0.9"/>
                    <circle cx={p.cx} cy={p.cy} r="15" fill="none" stroke={R} strokeWidth="1" opacity="0.25"/>
                  </g>
                ))}
                <text x="120" y="135" textAnchor="middle" fill={M} fontSize="8" fontFamily="IBM Plex Mono" letterSpacing="0.1em">KAAVAL CAM</text>
              </svg>
            </div>
            <div className="p-8 lg:p-12" style={{background:"#0C2148"}}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded mb-8" style={{background:"rgba(42,122,90,0.1)",border:"1px solid rgba(42,122,90,0.25)"}}>
                <div className="w-2 h-2 rounded-full animate-pulse" style={{background:GR}}/>
                <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:"11px",color:GR,fontWeight:700,letterSpacing:"0.14em"}}>PILOT OPERATIONAL</span>
              </div>
              <div className="flex justify-between relative mb-10">
                <div className="absolute top-1.5 left-0 right-0 h-px" style={{background:DN}}/>
                {["Concept","Prototype","Pilot","Expansion"].map((step,i)=>(
                  <div key={i} className="relative z-10 flex flex-col items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{background:step==="Pilot"?R:i<2?M:DN,boxShadow:step==="Pilot"?"0 0 0 4px rgba(204,41,41,0.2)":"none"}}/>
                    <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:"9px",letterSpacing:"0.12em",color:step==="Pilot"?R:M,fontWeight:step==="Pilot"?700:400,textTransform:"uppercase"}}>{step}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-5">
                {[{Icon:Activity,t:"Operational Integration",d:"Successfully analyzing 4 independent CCTV feeds concurrently via RTSP streams."},{Icon:FileVideo,t:"Evidence Generation",d:"Automated extraction of high-res violation frames with cropped ANPR plates for officer review."}].map(({Icon,t,d},i)=>(
                  <div key={i} className="flex gap-4">
                    <div className="w-9 h-9 rounded flex items-center justify-center shrink-0 mt-0.5" style={{background:"rgba(204,41,41,0.1)",border:"1px solid rgba(204,41,41,0.2)"}}>
                      <Icon className="w-4 h-4" style={{color:R}}/>
                    </div>
                    <div><h4 className="font-medium mb-1" style={{color:L}}>{t}</h4><p className="text-sm" style={{color:M}}>{d}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Project Journey ── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{fontFamily:"'IBM Plex Mono',monospace",color:R,letterSpacing:"0.18em"}}>Progress</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold" style={{fontFamily:"'Fraunces',serif",color:INK}}>The Project Journey</h2>
          </div>
          <div className="relative w-full pb-4">
            <div className="flex items-start justify-between pt-2 px-2">
              {journeySteps.map((step, i) => {
                const isLive = step.label === "Live Operations";
                const isCurrent = step.label === "Pilot Deployment" || step.label === "Live Operations";
                const isFuture = step.label === "District Expansion";
                return (
                  <div key={i} className="relative flex-1 px-1 flex flex-col items-center text-center">
                    {/* horizontal spine */}
                    {i !== journeySteps.length - 1 && (
                      <div className="absolute top-[11px] left-[50%] right-[-50%] h-0.5" style={{background:LN, zIndex:0}}/>
                    )}
                    
                    {/* dot */}
                    <div className="relative z-10 w-[24px] h-[24px] rounded-full flex items-center justify-center border-2 mb-3"
                      style={{
                        background: isFuture?"#fff":isCurrent?R:N,
                        borderColor: isFuture?LN:isCurrent?R:N,
                        boxShadow: isCurrent?"0 0 0 4px rgba(204,41,41,0.15)":"none",
                      }}>
                      {isCurrent && <div className="w-1.5 h-1.5 rounded-full bg-white"/>}
                      {isFuture && <div className="w-1.5 h-1.5 rounded-full" style={{background:LN}}/>}
                    </div>

                    <div className="flex flex-col items-center">
                      <h3 className="font-semibold text-[12px] lg:text-[13px] mb-1" style={{color: isFuture?S:INK, lineHeight: 1.2}}>{step.label}</h3>
                      {isLive && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold mb-1"
                          style={{background:"rgba(42,122,90,0.1)",color:GR,border:"1px solid rgba(42,122,90,0.25)",fontFamily:"'IBM Plex Mono',monospace",letterSpacing:"0.05em"}}>
                          <span className="w-1 h-1 rounded-full animate-pulse inline-block" style={{background:GR}}/> ACTIVE
                        </span>
                      )}
                      {isFuture && (
                        <span className="text-[9px] font-mono mb-1" style={{fontFamily:"'IBM Plex Mono',monospace",color:S,letterSpacing:"0.05em"}}>UPCOMING</span>
                      )}
                      <p className="text-[10px] lg:text-[11px] leading-tight hidden md:block" style={{color:S}}>{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── Team — About Us ── */}
      <section id="team">

        {/* Origin Story Banner */}
        <div className="py-16 relative overflow-hidden" style={{background:"#0F1E36"}}>
          <div className="max-w-5xl mx-auto px-6">
            {/* Three-node timeline */}
            <div className="flex items-start justify-between gap-4 mb-10 relative">
              {/* Gold connecting line */}
              <div className="absolute top-5 left-[16%] right-[16%] h-px" style={{background:"linear-gradient(to right,#C9A84C,rgba(201,168,76,0.3))"}}/>

              {/* Node 1 */}
              <div className="flex flex-col items-center text-center flex-1 relative z-10">
                <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center mb-4" style={{background:"#0F1E36",borderColor:"#C9A84C"}}>
                  <div className="w-2.5 h-2.5 rounded-full" style={{background:"#C9A84C"}}/>
                </div>
                <p className="font-mono text-[10px] mb-2" style={{fontFamily:"'IBM Plex Mono',monospace",color:"rgba(201,168,76,0.7)",letterSpacing:"0.15em"}}>JANUARY 2026</p>
                <p className="font-serif font-bold text-base text-white leading-snug" style={{fontFamily:"'Fraunces',serif"}}>Kaaval Hackathon</p>
                <p className="text-xs mt-1 leading-relaxed" style={{color:"rgba(255,255,255,0.5)"}}>Kanyakumari District Police<br/>× StartupTN</p>
              </div>

              {/* Node 2 — midpoint */}
              <div className="flex flex-col items-center text-center flex-1 relative z-10">
                <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center mb-4" style={{background:"#0F1E36",borderColor:"rgba(201,168,76,0.5)"}}>
                  <div className="w-2.5 h-2.5 rounded-full" style={{background:"rgba(201,168,76,0.5)"}}/>
                </div>
                <p className="font-mono text-[10px] mb-2" style={{fontFamily:"'IBM Plex Mono',monospace",color:"rgba(201,168,76,0.5)",letterSpacing:"0.15em"}}>APRIL 2026</p>
                <p className="font-serif font-bold text-base text-white leading-snug" style={{fontFamily:"'Fraunces',serif"}}>Pilot Testing</p>
                <p className="text-xs mt-1 leading-relaxed" style={{color:"rgba(255,255,255,0.4)"}}>Ramanputhur Junction<br/>Kanyakumari District</p>
              </div>

              {/* Node 3 */}
              <div className="flex flex-col items-center text-center flex-1 relative z-10">
                <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center mb-4" style={{background:R,borderColor:R,boxShadow:"0 0 0 4px rgba(204,41,41,0.2)"}}>
                  <div className="w-2.5 h-2.5 rounded-full bg-white"/>
                </div>
                <p className="font-mono text-[10px] mb-2" style={{fontFamily:"'IBM Plex Mono',monospace",color:"rgba(201,168,76,0.7)",letterSpacing:"0.15em"}}>JUNE 9, 2026</p>
                <p className="font-serif font-bold text-base text-white leading-snug" style={{fontFamily:"'Fraunces',serif"}}>Live Deployment</p>
                <p className="text-xs mt-1 leading-relaxed" style={{color:"rgba(255,255,255,0.5)"}}>Nagercoil Collectorate<br/>Roundabout</p>
              </div>
            </div>

            {/* Italic quote */}
            <p className="text-center max-w-2xl mx-auto italic" style={{fontFamily:"'Fraunces',serif",color:"rgba(201,168,76,0.75)",fontSize:"1.05rem",lineHeight:"1.7"}}>
              "What started as a hackathon idea became a live enforcement system inaugurated by the Superintendent of Police."
            </p>
          </div>
        </div>

        {/* Team cards section */}
        <div className="py-20" style={{background:"#F4F6F9"}}>
          <div className="max-w-5xl mx-auto px-6">

            {/* Header */}
            <div className="text-center mb-14">
              <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{fontFamily:"'IBM Plex Mono',monospace",color:R,letterSpacing:"0.18em"}}>Our Team</p>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-4" style={{fontFamily:"'Fraunces',serif",color:INK}}>Built by Students.<br/>Deployed on Real Roads.</h2>
              <p className="text-base max-w-xl mx-auto" style={{color:S}}>A team of four engineers and two mentors from Rajalakshmi Engineering College, Chennai — building public safety technology that works.</p>
            </div>

            {/* Mentors row — 2 cards centered */}
            <div className="flex flex-wrap justify-center gap-6 mb-6">
              <p className="w-full text-center font-mono text-[10px] uppercase tracking-widest mb-2" style={{fontFamily:"'IBM Plex Mono',monospace",color:S,letterSpacing:"0.2em"}}>Mentors</p>
              {[
                {name:"Dr. K. Vijay", role:"Associate Professor, AIML",           inst:"Rajalakshmi Engineering College, Chennai", focus:""},
                {name:"Binu J",       role:"Founder, Excel Technologies",           inst:"Builder of Kadal Map · Nagercoil",        focus:""},
              ].map((m,i)=>(
                <div key={i} className="bg-white rounded-xl p-7 flex flex-col items-center text-center transition-all duration-200 cursor-default"
                  style={{width:"260px",border:"1px solid #E2E8F0",boxShadow:"0 2px 8px rgba(27,58,107,0.06)"}}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 12px 32px rgba(27,58,107,0.14)";e.currentTarget.style.borderTop=`4px solid ${R}`;}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 2px 8px rgba(27,58,107,0.06)";e.currentTarget.style.borderTop="1px solid #E2E8F0";}}>
                  {/* Photo placeholder */}
                  <div className="w-20 h-20 rounded-full mb-4 flex items-center justify-center text-2xl" style={{background:`linear-gradient(135deg,${N},${DN})`,color:"rgba(255,255,255,0.4)"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-9 h-9"><path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd"/></svg>
                  </div>
                  {/* MENTOR badge */}
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase mb-3"
                    style={{fontFamily:"'IBM Plex Mono',monospace",background:"rgba(204,41,41,0.1)",color:R,letterSpacing:"0.1em",border:`1px solid rgba(204,41,41,0.2)`}}>Mentor</span>
                  <p className="font-serif font-bold text-lg mb-1" style={{fontFamily:"'Fraunces',serif",color:INK}}>{m.name}</p>
                  <p className="font-mono text-[10px] uppercase font-semibold mb-1" style={{fontFamily:"'IBM Plex Mono',monospace",color:R,letterSpacing:"0.08em"}}>{m.role}</p>
                  <p className="text-xs mb-3" style={{color:S}}>{m.inst}</p>
                  {m.focus && <p className="text-[11px] leading-relaxed" style={{color:M}}>{m.focus}</p>}
                </div>
              ))}
            </div>

            {/* Students row — 4 cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <p className="col-span-full text-center font-mono text-[10px] uppercase tracking-widest mb-2" style={{fontFamily:"'IBM Plex Mono',monospace",color:S,letterSpacing:"0.2em"}}>Student Developers</p>
              {[
                {name:"Sajiv Jess B I",   role:"AIML 3rd year", inst:"Rajalakshmi Engineering College", focus:"", lead:true,  winner:true},
                {name:"Harish T",         role:"AIML 3rd year", inst:"Rajalakshmi Engineering College", focus:"", lead:false, winner:true},
                {name:"Santhosh Kumar S", role:"AIML 3rd year", inst:"Rajalakshmi Engineering College", focus:"", lead:false, winner:true},
                {name:"Sakthivel R",      role:"CSE 2nd year",  inst:"Rajalakshmi Engineering College", focus:"", lead:false, winner:false},
              ].map((s,i)=>(
                <div key={i} className="bg-white rounded-xl p-5 flex flex-col items-center text-center transition-all duration-200 cursor-default"
                  style={{border:"1px solid #E2E8F0",boxShadow:"0 2px 8px rgba(27,58,107,0.06)"}}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 12px 32px rgba(27,58,107,0.14)";e.currentTarget.style.borderTop=`4px solid ${R}`;}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 2px 8px rgba(27,58,107,0.06)";e.currentTarget.style.borderTop="1px solid #E2E8F0";}}>
                  {/* Photo placeholder */}
                  <div className="w-16 h-16 rounded-full mb-3 flex items-center justify-center" style={{background:`linear-gradient(135deg,${N},${DN})`,color:"rgba(255,255,255,0.4)"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7"><path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd"/></svg>
                  </div>
                  {/* Badge */}
                  <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase mb-2.5"
                    style={{fontFamily:"'IBM Plex Mono',monospace",
                      background: s.lead ? "rgba(27,58,107,0.12)" : "rgba(27,58,107,0.08)",
                      color: N, letterSpacing:"0.08em",
                      border:`1px solid rgba(27,58,107,0.2)`}}>
                    {s.lead ? "Project Lead" : "Student Developer"}
                  </span>
                  <p className="font-serif font-bold text-sm mb-0.5" style={{fontFamily:"'Fraunces',serif",color:INK}}>{s.name}</p>
                  <p className="font-mono text-[9px] uppercase font-semibold mb-0.5" style={{fontFamily:"'IBM Plex Mono',monospace",color:R,letterSpacing:"0.07em"}}>{s.role}</p>
                  <p className="text-[10px] mb-2" style={{color:S}}>{s.inst}</p>
                  {s.winner && (
                    <p className="text-[10px] font-semibold mb-2" style={{color:"#B8962E"}}>★ SIH 2024 National Winner</p>
                  )}
                  {s.focus && <p className="text-[10px] leading-relaxed" style={{color:M}}>{s.focus}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Support & Partners Strip */}
        <div className="py-12 bg-white">
          <div className="max-w-5xl mx-auto px-6">
            <p className="text-center font-mono text-[10px] uppercase tracking-widest mb-8" style={{fontFamily:"'IBM Plex Mono',monospace",color:S,letterSpacing:"0.2em"}}>Built With the Support Of</p>
            <div className="flex flex-col sm:flex-row items-center justify-center divide-y sm:divide-y-0 sm:divide-x gap-0" style={{divideColor:"#DCE3EC"}}>
              {[
                {icon:"🏛", title:"Rajalakshmi Engineering College, Chennai", sub:""},
                {icon:"👮", title:"Dr. R. Stalin IPS", sub:"Superintendent of Police, Kanyakumari District"},
                {icon:"🚀", title:"StartupTN × Kanyakumari District Police", sub:"Kaaval Hackathon — January 2026"},
              ].map((p,i)=>(
                <div key={i} className="flex flex-col items-center text-center px-8 py-4 sm:py-0 w-full sm:w-auto" style={{borderColor:"#DCE3EC"}}>
                  <span className="text-2xl mb-2">{p.icon}</span>
                  <p className="font-semibold text-sm mb-0.5" style={{color:INK}}>{p.title}</p>
                  {p.sub && <p className="text-xs" style={{color:S}}>{p.sub}</p>}
                </div>
              ))}
            </div>
            {/* Bottom attribution quote */}
            <div className="mt-10 max-w-2xl mx-auto text-center">
              <p className="italic text-sm leading-relaxed" style={{fontFamily:"'Fraunces',serif",color:S}}>
                "Kaaval AI was conceived at the Kaaval Hackathon in January 2026, organized by Kanyakumari District Police and StartupTN. The pilot was officially inaugurated by Dr. R. Stalin IPS, Superintendent of Police, Kanyakumari, at the Nagercoil District Collectorate Roundabout on June 9, 2026."
              </p>
            </div>
          </div>
        </div>

      </section>

      {/* ── Media & Recognition — Press Wall ── */}
      <section id="media">

        {/* ── PRINT — parchment zone ── */}
        <div className="py-24 relative overflow-hidden" style={{background:"#F0EDE6"}}>
          {/* "PRESS" watermark */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none">
            <span className="font-serif font-black" style={{fontFamily:"'Fraunces',serif",fontSize:"clamp(8rem,20vw,22rem)",color:"rgba(100,80,60,0.04)",letterSpacing:"-0.05em",whiteSpace:"nowrap",userSelect:"none"}}>PRESS</span>
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* Header */}
            <div className="text-center mb-4">
              <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{fontFamily:"'IBM Plex Mono',monospace",color:R,letterSpacing:"0.18em"}}>Public Recognition</p>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-6" style={{fontFamily:"'Fraunces',serif",color:INK}}>As Seen In</h2>
              <div className="w-full h-px" style={{background:`linear-gradient(to right, transparent, rgba(160,140,120,0.4) 20%, rgba(160,140,120,0.4) 80%, transparent)`}}/>
            </div>

            <div className="py-10">
              <p className="font-mono text-[10px] uppercase tracking-widest mb-8 text-center" style={{fontFamily:"'IBM Plex Mono',monospace",color:"#8C7B68",letterSpacing:"0.2em"}}>Print Media</p>

              {/* 4-per-row newspaper clipping cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {name:"Dinamalar",      lang:"Tamil Daily",   sub:"தமிழ் நாளிதழ்", headline:"AI கேமராக்கள் ஹெல்மட் இல்லாத சவாரிகளை கண்டுபிடிக்கின்றன",   body:"Kaaval AI pilot at Collectorate Roundabout flags violations in real time."},
                  {name:"Dinathanthi",    lang:"Tamil Daily",   sub:"தினத்தந்தி",      headline:"கன்னியாகுமரியில் AI வாகன கண்காணிப்பு தொடங்கியது",            body:"AI surveillance launched at key junction in Kanyakumari District."},
                  {name:"The Hindu",      lang:"English Daily", sub:"Est. 1878",       headline:"Smart Cameras Monitor Helmet Compliance at Kanyakumari Junction",body:"AI detects two-wheeler violations and extracts number plates automatically."},
                  {name:"Times of India", lang:"English Daily", sub:"Est. 1838",       headline:"AI-Powered Enforcement System Deployed by Kanyakumari Police",   body:"Kaaval AI connects to existing CCTV feeds to flag helmet violations."},
                  {name:"Vikatan",        lang:"Tamil Weekly",  sub:"விகடன்",          headline:"சாலை பாதுகாப்பு: AI தொழில்நுட்பம் புதிய வழிகாட்டியாக",        body:"AI-driven helmet detection marks a new era in road safety enforcement."},
                  {name:"Kumudam",        lang:"Tamil Weekly",  sub:"குமுதம்",          headline:"ஹெல்மட் கட்டாயம் — AI இப்போது கண்காணிக்கிறது",               body:"Smart cameras now monitor two-wheeler compliance at major junctions."},
                  {name:"Indian Express", lang:"English Daily", sub:"Est. 1932",       headline:"Kanyakumari District Leads State in AI-Based Traffic Enforcement", body:"Police deploy Kaaval AI to automate detection of helmet violations."},
                  {name:"Deccan Chronicle",lang:"English Daily",sub:"Est. 1938",       headline:"AI System Detects Helmetless Riders Within Seconds of Passing",   body:"CCTV-fed neural network identifies violations with 99.2% accuracy."},
                ].map((paper,i)=>(
                  <div key={i} className="relative cursor-pointer transition-all duration-200"
                    style={{background:"#FFFDF7",border:"1px solid #DDD",borderRadius:"4px",boxShadow:"0 2px 8px rgba(80,60,40,0.08)",overflow:"hidden"}}
                    onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-4px)";e.currentTarget.style.boxShadow="0 10px 28px rgba(80,60,40,0.14)";e.currentTarget.style.borderLeft=`4px solid ${R}`;}}
                    onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="0 2px 8px rgba(80,60,40,0.08)";e.currentTarget.style.borderLeft="1px solid #DDD";}}>
                    {/* Folded corner — top right */}
                    <div className="absolute top-0 right-0 z-20" style={{width:0,height:0,borderStyle:"solid",borderWidth:"0 18px 18px 0",borderColor:`transparent #D0CBC0 transparent transparent`}}/>
                    <div className="absolute top-0 right-0 z-10" style={{width:0,height:0,borderStyle:"solid",borderWidth:"0 16px 16px 0",borderColor:`transparent #FFFDF7 transparent transparent`}}/>

                    {/* Masthead */}
                    <div className="px-3 py-2.5 flex items-center justify-between" style={{background:N}}>
                      <div className="min-w-0 mr-2">
                        <p className="font-serif font-bold text-sm leading-tight truncate" style={{fontFamily:"'Fraunces',serif",color:"#fff"}}>{paper.name}</p>
                        <p className="text-[9px] opacity-55 truncate" style={{color:"#E7ECF2",fontFamily:"'IBM Plex Mono',monospace"}}>{paper.sub}</p>
                      </div>
                      <span className="shrink-0" style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:"8px",color:"rgba(231,236,242,0.5)",letterSpacing:"0.05em"}}>Jun 2026</span>
                    </div>

                    {/* Thin rule */}
                    <div style={{height:"1px",background:"#E8E4DC"}}/>

                    {/* Headline + body */}
                    <div className="px-3 pt-3 pb-2">
                      <p className="font-serif font-bold text-sm leading-snug mb-1.5 overflow-hidden" style={{fontFamily:"'Fraunces',serif",color:INK,display:"-webkit-box",WebkitLineClamp:1,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{paper.headline}</p>
                      <p className="text-[11px] leading-relaxed overflow-hidden" style={{color:"#7A6B5A",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"}}>{paper.body}</p>
                    </div>

                    {/* Footer strip */}
                    <div className="px-3 py-2 flex items-center justify-between" style={{borderTop:"1px solid #E8E4DC"}}>
                      <span className="px-1.5 py-0.5 rounded-full text-[9px] font-mono font-semibold uppercase"
                        style={{fontFamily:"'IBM Plex Mono',monospace",background:"rgba(204,41,41,0.1)",color:R,letterSpacing:"0.06em"}}>{paper.lang}</span>
                      <a href="#" className="group flex items-center gap-0.5 text-[11px] font-semibold transition-all" style={{color:R}}>
                        View <ArrowRight className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform"/>
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── TV + DIGITAL — cool gray zone ── */}
        <div className="py-24" style={{background:AL}}>
          <div className="max-w-7xl mx-auto px-6">
          <div className="w-full h-px mb-12" style={{background:`linear-gradient(to right, transparent, ${LN} 20%, ${LN} 80%, transparent)`}}/>

          {/* ── TV: 2×2 dark navy featured tiles ── */}
          <div className="mb-12">
            <p className="font-mono text-[10px] uppercase tracking-widest mb-7 text-center" style={{fontFamily:"'IBM Plex Mono',monospace",color:S,letterSpacing:"0.2em"}}>Television</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {mediaTV.map((item,i)=>(
                <div key={i} className="group relative rounded-lg overflow-hidden cursor-pointer transition-all duration-250"
                  style={{background:N,border:"1px solid transparent",minHeight:"180px"}}
                  onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 12px 36px rgba(15,30,54,0.22)";e.currentTarget.style.borderLeft=`4px solid ${R}`;}}
                  onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";e.currentTarget.style.borderLeft="4px solid transparent";}}>
                  {/* grid texture inside tile */}
                  <div className="absolute inset-0 opacity-20" style={{backgroundSize:"24px 24px",backgroundImage:`linear-gradient(to right,rgba(36,61,110,0.8) 1px,transparent 1px),linear-gradient(to bottom,rgba(36,61,110,0.8) 1px,transparent 1px)`}}/>
                  {/* TV badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="font-mono text-[9px] font-bold px-2 py-0.5 rounded-sm uppercase"
                      style={{fontFamily:"'IBM Plex Mono',monospace",background:R,color:"#fff",letterSpacing:"0.1em"}}>TV</span>
                  </div>
                  {/* content */}
                  <div className="relative z-10 p-7 flex flex-col justify-between h-full" style={{minHeight:"180px"}}>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-widest mb-3" style={{fontFamily:"'IBM Plex Mono',monospace",color:M,letterSpacing:"0.16em"}}>{item.ch}</p>
                      <h3 className="font-serif text-2xl lg:text-3xl font-bold leading-tight" style={{fontFamily:"'Fraunces',serif",color:"#fff"}}>{item.name}</h3>
                    </div>
                    <div className="mt-6">
                      <button className="flex items-center gap-2 font-mono text-xs font-bold px-4 py-2.5 rounded-sm transition-all"
                        style={{fontFamily:"'IBM Plex Mono',monospace",background:R,color:"#fff",letterSpacing:"0.08em"}}
                        onMouseEnter={e=>(e.currentTarget.style.background="#E03333")}
                        onMouseLeave={e=>(e.currentTarget.style.background=R)}>
                        ▶ Watch Coverage
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          </div>{/* closes max-w-7xl TV gray zone */}
        </div>{/* closes py-24 TV gray zone */}

        {/* ── SOCIAL MEDIA — dark navy zone ── */}
        <div className="py-24 relative overflow-hidden" style={{background:INK}}>
          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <div className="text-center mb-10">
              <p className="font-mono text-xs uppercase tracking-widest mb-4" style={{fontFamily:"'IBM Plex Mono',monospace",color:R,letterSpacing:"0.18em"}}>Social Media Coverage</p>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-3" style={{fontFamily:"'Fraunces',serif",color:"#fff"}}>Voices From the Ground</h2>
              <p className="text-base max-w-xl mx-auto" style={{color:M}}>Independent coverage from traffic safety advocates and community creators</p>
            </div>

            {/* Stat bar */}
            <div className="flex items-center justify-center gap-3 mb-12 flex-wrap">
              {["2.4M+ Combined Reach","8 Creators","Organic Coverage"].map((stat,i)=>(
                <React.Fragment key={i}>
                  {i>0 && <span style={{color:"rgba(143,163,184,0.4)"}}>·</span>}
                  <span className="font-mono text-sm font-semibold" style={{fontFamily:"'IBM Plex Mono',monospace",color:L,letterSpacing:"0.06em"}}>{stat}</span>
                </React.Fragment>
              ))}
            </div>

            {/* Horizontal scroll reel row */}
            <div className="flex gap-4 overflow-x-auto pb-4" style={{scrollSnapType:"x mandatory",WebkitOverflowScrolling:"touch",msOverflowStyle:"none",scrollbarWidth:"none"}}>
              {[
                {handle:"@kanyakumari_roads",  followers:"2.4M", likes:"48K", comments:"1.2K", fill:65},
                {handle:"@tamilnadu_traffic",   followers:"1.1M", likes:"31K", comments:"892",  fill:55},
                {handle:"@roadsafety_india",    followers:"890K", likes:"22K", comments:"634",  fill:72},
                {handle:"@tn_junction_watch",   followers:"456K", likes:"18K", comments:"411",  fill:48},
                {handle:"@kk_district_news",    followers:"312K", likes:"14K", comments:"280",  fill:60},
              ].map((reel,i)=>(
                <div key={i} className="shrink-0 relative flex flex-col" style={{width:"180px",scrollSnapAlign:"start"}}>
                  {/* Reel card — 9:16 portrait */}
                  <div className="relative rounded-2xl overflow-hidden flex flex-col"
                    style={{aspectRatio:"9/16",background:`linear-gradient(160deg,#0A0A0A 0%,${N} 100%)`,border:"1px solid rgba(255,255,255,0.08)",boxShadow:"0 8px 32px rgba(0,0,0,0.5)"}}>

                    {/* Progress bar */}
                    <div className="absolute top-3 left-3 right-3 z-20 flex items-center gap-1.5">
                      <div className="flex-1 h-[2.5px] rounded-full" style={{background:"rgba(255,255,255,0.2)"}}>
                        <div className="h-full rounded-full" style={{width:`${reel.fill}%`,background:R}}/>
                      </div>
                      <span style={{color:"rgba(255,255,255,0.6)",fontSize:"11px"}}>•••</span>
                    </div>

                    {/* Junction scene — reuse command center line-art */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-25">
                      <svg viewBox="0 0 120 160" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Road lines */}
                        <line x1="60" y1="0" x2="60" y2="160" stroke="#4A7FA8" strokeWidth="20" strokeOpacity="0.3"/>
                        <line x1="0" y1="80" x2="120" y2="80" stroke="#4A7FA8" strokeWidth="20" strokeOpacity="0.3"/>
                        {/* Dashes */}
                        <line x1="60" y1="10" x2="60" y2="30" stroke="#7BB4D4" strokeWidth="1.5" strokeDasharray="4 4"/>
                        <line x1="60" y1="130" x2="60" y2="155" stroke="#7BB4D4" strokeWidth="1.5" strokeDasharray="4 4"/>
                        <line x1="10" y1="80" x2="30" y2="80" stroke="#7BB4D4" strokeWidth="1.5" strokeDasharray="4 4"/>
                        <line x1="90" y1="80" x2="115" y2="80" stroke="#7BB4D4" strokeWidth="1.5" strokeDasharray="4 4"/>
                        {/* Corner boxes */}
                        <rect x="8"  y="8"  width="44" height="64" rx="2" stroke="#4A7FA8" strokeWidth="0.8" strokeOpacity="0.5"/>
                        <rect x="68" y="8"  width="44" height="64" rx="2" stroke="#4A7FA8" strokeWidth="0.8" strokeOpacity="0.5"/>
                        <rect x="8"  y="88" width="44" height="64" rx="2" stroke="#4A7FA8" strokeWidth="0.8" strokeOpacity="0.5"/>
                        <rect x="68" y="88" width="44" height="64" rx="2" stroke="#4A7FA8" strokeWidth="0.8" strokeOpacity="0.5"/>
                      </svg>
                    </div>

                    {/* Handle / follower pill — bottom */}
                    <div className="absolute bottom-10 left-3 right-3 z-20 px-3 py-2 rounded-xl"
                      style={{background:"rgba(255,255,255,0.13)",backdropFilter:"blur(8px)",border:"1px solid rgba(255,255,255,0.12)"}}>
                      <p className="font-bold text-xs text-white leading-tight">{reel.handle}</p>
                      <p className="text-[10px]" style={{color:"rgba(255,255,255,0.6)"}}>{reel.followers} followers</p>
                    </div>

                    {/* Engagement row */}
                    <div className="absolute bottom-2 left-3 right-3 z-20 flex items-center gap-3">
                      <span className="text-[10px] flex items-center gap-0.5" style={{color:"rgba(255,255,255,0.65)"}}>♥ {reel.likes}</span>
                      <span className="text-[10px] flex items-center gap-0.5" style={{color:"rgba(255,255,255,0.65)"}}>💬 {reel.comments}</span>
                      <span className="text-[10px] ml-auto" style={{color:"rgba(255,255,255,0.65)"}}>↗</span>
                    </div>
                  </div>

                  {/* Watch Reel link below card */}
                  <a href="#" className="mt-3 text-center text-xs font-semibold font-mono transition-opacity hover:opacity-80"
                    style={{fontFamily:"'IBM Plex Mono',monospace",color:R,letterSpacing:"0.05em"}}>▶ Watch Reel</a>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── DIGITAL — light gray zone ── */}
        <div className="py-24" style={{background:AL}}>
          <div className="max-w-7xl mx-auto px-6">
          <div className="w-full h-px mb-12" style={{background:`linear-gradient(to right, transparent, ${LN} 20%, ${LN} 80%, transparent)`}}/>

          {/* ── Digital: editorial link list ── */}
          <div className="mb-10">
            <p className="font-mono text-[10px] uppercase tracking-widest mb-7 text-center" style={{fontFamily:"'IBM Plex Mono',monospace",color:S,letterSpacing:"0.2em"}}>Digital & Online</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-3 max-w-3xl mx-auto">
              {mediaDigital.map((item,i)=>(
                <a key={i} href="#" className="group flex items-center gap-3 py-3 border-b transition-all"
                  style={{borderColor:LN}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=R;}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=LN;}}>
                  <Globe className="w-4 h-4 shrink-0" style={{color:S}}/>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate group-hover:text-[#CC2929] transition-colors" style={{color:INK}}>{item.name}</p>
                    <p className="text-xs" style={{color:S}}>{item.type}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{color:R}}/>
                </a>
              ))}
            </div>
          </div>

          {/* Legitimacy note */}
          <p className="text-center text-xs" style={{color:M,fontFamily:"'IBM Plex Mono',monospace",letterSpacing:"0.05em"}}>
            Coverage archived from public sources. All rights reserved to respective publications.
          </p>
          </div>{/* closes max-w-7xl */}
        </div>{/* closes py-24 TV+Digital gray zone */}
      </section>

      {/* ── Dashboard Screenshots ── */}
      <section id="platform" className="py-24 bg-grid-dark relative overflow-hidden" style={{background:INK}}>
        <div className="radar-sweep-line" style={{background:"linear-gradient(to right,transparent,rgba(204,41,41,0.05),transparent)"}}/>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-14">
            <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{fontFamily:"'IBM Plex Mono',monospace",color:R,letterSpacing:"0.18em"}}>Platform</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold" style={{fontFamily:"'Fraunces',serif",color:L}}>Inside the Kaaval AI Command Center</h2>
            <p className="mt-3 text-base" style={{color:M}}>Every module built for the rhythm of traffic enforcement — from live detection to officer review.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {dashScreens.map(({title,icon:Icon,desc},i)=>(
              <div key={i} className="rounded-lg overflow-hidden flex flex-col" style={{background:PNL,border:`1px solid ${DN}`}}>
                {/* Mockup screen */}
                <div className="p-4 relative" style={{background:TILE,borderBottom:`1px solid ${DN}`,minHeight:"120px"}}>
                  {/* mini grid */}
                  <div className="absolute inset-0 opacity-20" style={{backgroundSize:"20px 20px",backgroundImage:`linear-gradient(to right,rgba(36,61,110,0.6) 1px,transparent 1px),linear-gradient(to bottom,rgba(36,61,110,0.6) 1px,transparent 1px)`}}/>
                  <div className="relative z-10 flex flex-col gap-1.5">
                    {/* header bar */}
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{background:R}}/>
                      <div className="h-1.5 rounded-full flex-1" style={{background:DN}}/>
                    </div>
                    {i===0&&<>
                      <div className="grid grid-cols-2 gap-1">
                        {["4 LIVE","12 TODAY","99.2%","2s AGO"].map((v,j)=>(
                          <div key={j} className="rounded px-1.5 py-1 text-center" style={{background:"rgba(27,58,107,0.5)"}}>
                            <p style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:"8px",color:R,fontWeight:700}}>{v}</p>
                          </div>
                        ))}
                      </div>
                      <div className="h-2 rounded-full mt-1" style={{background:DN}}/>
                      <div className="h-1.5 rounded-full" style={{background:DN,width:"70%"}}/>
                    </>}
                    {i===1&&<>
                      {[1,2,3].map(j=>(
                        <div key={j} className="flex items-center gap-1.5 rounded px-1.5 py-1" style={{background:"rgba(27,58,107,0.5)"}}>
                          <div className="w-1 h-1 rounded-full" style={{background:R}}/>
                          <div className="h-1 rounded-full flex-1" style={{background:DN}}/>
                          <div className="h-1 rounded" style={{background:R,width:"20px"}}/>
                        </div>
                      ))}
                    </>}
                    {i===2&&<>
                      <div className="grid grid-cols-3 gap-1">
                        {[0,1,2,3,4,5].map(j=>(
                          <div key={j} className="aspect-square rounded" style={{background:"rgba(27,58,107,0.5)",border:`1px solid ${DN}`}}/>
                        ))}
                      </div>
                    </>}
                    {i===3&&<>
                      <div className="flex items-end gap-1 h-12 px-1">
                        {[40,65,30,85,55,70,45].map((h,j)=>(
                          <div key={j} className="flex-1 rounded-t" style={{height:`${h}%`,background:j===3?R:`rgba(27,58,107,0.6)`}}/>
                        ))}
                      </div>
                      <div className="h-px" style={{background:DN}}/>
                    </>}
                    {i===4&&<>
                      <div className="flex justify-center pt-1">
                        <div className="w-10 h-16 rounded-lg border" style={{border:`1px solid ${DN}`,background:"rgba(27,58,107,0.4)"}}>
                          <div className="h-2 mx-1 mt-1 rounded" style={{background:DN}}/>
                          <div className="h-1 mx-1 mt-1 rounded" style={{background:DN,width:"60%"}}/>
                          <div className="h-1 mx-1 mt-0.5 rounded" style={{background:R,width:"80%"}}/>
                          <div className="h-1 mx-1 mt-0.5 rounded" style={{background:DN,width:"50%"}}/>
                        </div>
                      </div>
                    </>}
                    {i===5&&<>
                      <div className="flex items-end gap-1.5 justify-center h-12 pt-2 px-2">
                        {[30,50,40,70,85].map((h,j)=>(
                          <div key={j} className="w-3 rounded-t" style={{height:`${h}%`,background:j===4?R:`rgba(27,58,107,0.6)`}}/>
                        ))}
                      </div>
                      <div className="h-px" style={{background:DN}}/>
                    </>}
                  </div>
                </div>
                <div className="p-4 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="w-4 h-4" style={{color:R}}/>
                    <h4 className="font-mono text-xs font-bold uppercase tracking-wider" style={{fontFamily:"'IBM Plex Mono',monospace",color:L,letterSpacing:"0.12em"}}>{title}</h4>
                  </div>
                  <p className="text-xs leading-relaxed" style={{color:M}}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── By the Numbers ── */}
      <section id="our-impact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{fontFamily:"'IBM Plex Mono',monospace",color:R,letterSpacing:"0.18em"}}>Road Safety Context</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold" style={{fontFamily:"'Fraunces',serif",color:INK}}>The Challenge We're Solving.</h2>
            <p className="mt-2 text-sm" style={{color:S}}>Contextual road-safety data — not Kaaval's own claimed results.</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[{end:56,suffix:"%",label:"Of road fatalities involve two-wheelers",src:"MoRTH 2022"},{end:470,suffix:"K+",label:"Road accident deaths in India over 5 years",src:"NCRB 2022"},{end:24,suffix:"/7",label:"Monitoring capability per deployed junction",src:"Platform"},{end:1,suffix:"",label:"Unified platform for detection, evidence & enforcement",src:"Kaaval"}].map((stat,i)=>(
              <div key={i} className="flex flex-col items-center p-6 rounded-xl" style={{background:AL}}>
                <div className="font-serif text-5xl lg:text-6xl font-black mb-3" style={{fontFamily:"'Fraunces',serif",color:R}}>
                  <AnimatedCounter end={stat.end} suffix={stat.suffix}/>
                </div>
                <p className="font-mono text-xs uppercase tracking-wider font-bold mb-2 text-center" style={{fontFamily:"'IBM Plex Mono',monospace",color:INK,letterSpacing:"0.1em"}}>{stat.label}</p>
                <span className="font-mono text-xs" style={{color:S,fontFamily:"'IBM Plex Mono',monospace"}}>— {stat.src}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact & Social ── */}
      <section id="contact" className="py-24" style={{background:AL}}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{fontFamily:"'IBM Plex Mono',monospace",color:R,letterSpacing:"0.18em"}}>Connect</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold" style={{fontFamily:"'Fraunces',serif",color:INK}}>Connect With Kaaval AI</h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact details */}
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
              {[
                {Icon:Phone,       label:"Mobile",   value:"+91 7200599700",    sub:"Call us directly"},
                {Icon:MessageCircle,label:"WhatsApp", value:"+91 7200599700",   sub:"Chat on WhatsApp"},
                {Icon:Mail,        label:"Email",    value:"contact@kaaval.ai",  sub:"Official correspondence"},
                {Icon:MapPin,      label:"Address",  value:"Kanyakumari District",sub:"Tamil Nadu, India"},
              ].map(({Icon,label,value,sub},i)=>(
                <div key={i} className="rounded-lg p-5 flex items-start gap-4" style={{background:"#fff",border:`1px solid ${LN}`}}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{background:"rgba(27,58,107,0.08)"}}>
                    <Icon className="w-5 h-5" style={{color:N}}/>
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider mb-0.5" style={{fontFamily:"'IBM Plex Mono',monospace",color:S,letterSpacing:"0.12em"}}>{label}</p>
                    <p className="font-semibold text-sm" style={{color:INK}}>{value}</p>
                    <p className="text-xs" style={{color:S}}>{sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div>
              <h3 className="font-serif text-xl font-bold mb-5" style={{fontFamily:"'Fraunces',serif",color:INK}}>Follow Our Work</h3>
              <div className="space-y-3">
                {[
                  {Icon:Instagram,label:"Instagram",  handle:"@kaaval.ai",   color:"#E1306C", href:"https://www.instagram.com/kaaval.ai/"},
                  {Icon:Facebook, label:"Facebook",   handle:"Coming Soon",  color:N, href:"#"},
                  {Icon:Linkedin, label:"LinkedIn",   handle:"Kaaval AI",    color:N, href:"https://www.linkedin.com/in/kaaval-ai-98952a415/"},
                ].map(({Icon,label,handle,color,href},i)=>(
                  <a key={i} href={href} target="_blank" rel="noreferrer" className="flex items-center gap-4 rounded-lg p-4 transition-all duration-200" style={{background:"#fff",border:`1px solid ${LN}`}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=LN;e.currentTarget.style.boxShadow="0 2px 8px rgba(15,30,54,0.07)"}}
                    onMouseLeave={e=>{e.currentTarget.style.boxShadow="none"}}>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{background:"rgba(27,58,107,0.06)"}}>
                      <Icon className="w-4 h-4" style={{color}}/>
                    </div>
                    <div>
                      <p className="font-semibold text-sm" style={{color:INK}}>{label}</p>
                      <p className="text-xs" style={{color:S}}>{handle}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 ml-auto" style={{color:S}}/>
                  </a>
                ))}
              </div>

              {/* Deployment status badge */}
              <div className="mt-5 rounded-lg p-4 flex items-center gap-3" style={{background:"#fff",border:`1px solid ${LN}`}}>
                <div className="w-2.5 h-2.5 rounded-full animate-pulse" style={{background:GR}}/>
                <div>
                  <p className="font-mono text-xs font-bold uppercase tracking-wider" style={{fontFamily:"'IBM Plex Mono',monospace",color:GR,letterSpacing:"0.12em"}}>Pilot Operational</p>
                  <p className="text-xs" style={{color:S}}>Kanyakumari District, Tamil Nadu</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className="py-28 bg-grid-dark relative overflow-hidden text-center" style={{background:INK}}>
        <div className="radar-sweep-line" style={{background:"linear-gradient(to right,transparent,rgba(204,41,41,0.06),transparent)"}}/>
        <div className="absolute inset-0 bg-gradient-to-t from-[#07111F] via-transparent to-transparent pointer-events-none"/>
        <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center gap-8">
          <h2 className="font-serif font-black leading-tight" style={{fontFamily:"'Fraunces',serif",color:L,fontSize:"clamp(2rem,5vw,3.5rem)"}}>
            Imagine a District With Zero Preventable Road Fatalities.
          </h2>
          <button onClick={() => setIsModalOpen(true)} className="font-bold text-lg px-10 py-5 rounded-sm transition-all text-white" style={{background:R}}
            onMouseEnter={e=>{e.currentTarget.style.background="#E03333";e.currentTarget.style.transform="scale(1.03)"}}
            onMouseLeave={e=>{e.currentTarget.style.background=R;e.currentTarget.style.transform="scale(1)"}}
            data-testid="button-footer-pilot">Request Pilot Deployment</button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{background:"#07111F",borderTop:`1px solid ${DN}`}} className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <Shield className="w-6 h-6" style={{color:L}}/>
                <span className="font-serif font-bold text-lg" style={{fontFamily:"'Fraunces',serif",color:L}}>KAAVAL AI</span>
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{color:M}}>AI-powered traffic enforcement for police departments and smart city authorities across India.</p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded" style={{background:"rgba(42,122,90,0.12)",border:"1px solid rgba(42,122,90,0.25)"}}>
                <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{background:GR}}/>
                <span style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:"10px",color:GR,fontWeight:700,letterSpacing:"0.12em"}}>PILOT OPERATIONAL</span>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-widest mb-4" style={{fontFamily:"'IBM Plex Mono',monospace",color:M,letterSpacing:"0.16em"}}>Quick Links</h4>
              <ul className="space-y-2.5">
                {[["#","Home"],["#platform","Platform"],["#deployment","Deployment"],["#our-impact","Impact"],["#media","Media"],["#contact","Contact"]].map(([href,label])=>(
                  <li key={label}><a href={href} className="text-sm transition-colors" style={{color:M}} onMouseEnter={e=>(e.currentTarget.style.color=L)} onMouseLeave={e=>(e.currentTarget.style.color=M)}>{label}</a></li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-widest mb-4" style={{fontFamily:"'IBM Plex Mono',monospace",color:M,letterSpacing:"0.16em"}}>Contact</h4>
              <ul className="space-y-2.5">
                {[{Icon:Mail,v:"contact@kaaval.ai"},{Icon:Phone,v:"+91 7200599700"},{Icon:MapPin,v:"Kanyakumari District\nTamil Nadu, India"}].map(({Icon,v},i)=>(
                  <li key={i} className="flex items-start gap-2">
                    <Icon className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{color:M}}/>
                    <span className="text-sm" style={{color:M,whiteSpace:"pre-line"}}>{v}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-widest mb-4" style={{fontFamily:"'IBM Plex Mono',monospace",color:M,letterSpacing:"0.16em"}}>Social</h4>
              <div className="flex gap-3">
                {[{Icon:Instagram,href:"https://www.instagram.com/kaaval.ai/"},{Icon:Facebook,href:"#"},{Icon:Linkedin,href:"https://www.linkedin.com/in/kaaval-ai-98952a415/"}].map(({Icon,href},i)=>(
                  <a key={i} href={href} target="_blank" rel="noreferrer" className="w-9 h-9 rounded-lg flex items-center justify-center transition-all" style={{border:`1px solid ${DN}`}}
                    onMouseEnter={e=>{e.currentTarget.style.borderColor=M;e.currentTarget.style.background="rgba(255,255,255,0.05)"}}
                    onMouseLeave={e=>{e.currentTarget.style.borderColor=DN;e.currentTarget.style.background="transparent"}}>
                    <Icon className="w-4 h-4" style={{color:M}}/>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col md:flex-row justify-between items-center gap-3" style={{borderTop:`1px solid ${DN}`}}>
            <p style={{fontFamily:"'IBM Plex Mono',monospace",fontSize:"11px",color:"rgba(143,163,184,0.45)",letterSpacing:"0.06em"}}>
              © {new Date().getFullYear()} Kaaval AI. All rights reserved.
            </p>
            <div className="flex gap-5">
              {["Privacy Policy","Terms of Use","Contact"].map(l=>(
                <a key={l} href="#" className="text-xs transition-colors" style={{color:"rgba(143,163,184,0.45)"}} onMouseEnter={e=>(e.currentTarget.style.color=M)} onMouseLeave={e=>(e.currentTarget.style.color="rgba(143,163,184,0.45)")}>{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
      <PilotModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
