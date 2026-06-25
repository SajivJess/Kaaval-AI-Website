import React, { useEffect, useRef, useState } from "react";
import {
  Shield, CheckCircle2, MapPin, Activity, Eye, FileVideo,
  ShieldAlert, Cpu, Building2, Landmark, Newspaper, Tv2, Globe,
  Instagram, Facebook, Linkedin, Phone, Mail, MessageCircle,
  ChevronRight, BarChart2, AlertTriangle, Archive, LayoutDashboard,
  Smartphone, ArrowRight, Users, ChevronLeft, X
} from "lucide-react";
import { motion, AnimatePresence, useScroll, useVelocity, useSpring } from "framer-motion";
import { useInView } from "framer-motion";
import CommandCenter from "../components/CommandCenter";
import TeamStructure from "../components/TeamStructure";
import MagneticButton from "../components/MagneticButton";
import PressWall from "../components/PressWall";
import MobileNav from "../components/MobileNav";
/* â”€â”€ helpers â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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
const fadeOptions = { once: true, margin: "-60px" };
function useFadeUp(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, fadeOptions);
  return { ref, style: { opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.65s ease ${delay}s, transform 0.65s ease ${delay}s` } };
}

/* ── Section motion variants ───────────────────────────────────────── */
const sectionVariants = {
  up:    { hidden: { opacity: 0, y: 40 },            visible: { opacity: 1, y: 0 } },
  down:  { hidden: { opacity: 0, y: -40 },           visible: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: -60 },           visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 60 },            visible: { opacity: 1, x: 0 } },
  glass: { hidden: { opacity: 0, y: 40, rotateX: 6 }, visible: { opacity: 1, y: 0, rotateX: 0 } },
};
const sectionTransition = { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] };

/* â”€â”€ road SVGs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

/* â”€â”€ camera tile â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

/* â”€â”€ modal component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
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

/* ––– Ecosystem Showcase Component ––– */
const ecosystemSteps = [
  { id: "detection", title: "DETECTION", subtitle: "Eyes of the system", color: "#CC2929", glow: "rgba(204,41,41,0.6)", img: "/flyers/flyer-detection.jpeg", mapLabel: "AI DETECTION" },
  { id: "enforcement", title: "ENFORCEMENT", subtitle: "Evidence to action", color: "#2A7A5A", glow: "rgba(42,122,90,0.6)", img: "/flyers/flyer-enforcement.jpeg", mapLabel: "EVIDENCE" },
  { id: "intelligence", title: "INTELLIGENCE", subtitle: "The brain of KAAVAL AI", color: "#6366F1", glow: "rgba(99,102,241,0.6)", img: "/flyers/flyer-intelligence.jpeg", mapLabel: "INTELLIGENCE" },
  { id: "awareness", title: "AWARENESS", subtitle: "Changing driver behaviour", color: "#F59E0B", glow: "rgba(245,158,11,0.6)", img: "/flyers/flyer-awareness.jpeg", mapLabel: "PUBLIC AWARENESS" },
];

const EcosystemShowcase = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  const handleNext = () => {
    if (modalIndex !== null) setModalIndex((modalIndex + 1) % ecosystemSteps.length);
  }
  const handlePrev = () => {
    if (modalIndex !== null) setModalIndex((modalIndex - 1 + ecosystemSteps.length) % ecosystemSteps.length);
  }

  // Handle keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (modalIndex === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setModalIndex(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalIndex]);

  return (
    <section id="ecosystem" className="bg-[#0B1220] text-white py-32 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 md:mb-24 lg:mb-32">
          <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{color:"#CC2929",letterSpacing:"0.18em"}}>KAAVAL AI ECOSYSTEM</p>
          <h2 className="font-serif font-bold mb-6" style={{fontFamily:"'Fraunces',serif",fontSize:"var(--text-section)"}}>One Unified Platform.</h2>
        </div>

        {/* ── Desktop: Horizontal Overlapping Deck ── */}
        <div className="hidden md:flex flex-row justify-center items-center w-full mx-auto" style={{perspective: '1200px'}}>
          {ecosystemSteps.map((step, i) => {
             const isHovered = hoveredIndex === i;
             const isBefore = hoveredIndex !== null && i < hoveredIndex;
             const isAfter = hoveredIndex !== null && i > hoveredIndex;
             const isAnyHovered = hoveredIndex !== null;
             const offset = i - 1.5;
             const baseRotate = offset * 4;
             const baseY = Math.abs(offset) * 15;
             let transform = `translateY(${baseY}px) scale(1) translateX(0) rotate(${baseRotate}deg)`;
             let zIndex = 10 + i;
             if (isHovered) { transform = `translateY(-50px) scale(1.08) translateX(0) rotate(0deg)`; zIndex = 50; }
             else if (isBefore) { transform = `translateY(${baseY}px) scale(0.95) translateX(-80px) rotate(${baseRotate - 6}deg)`; }
             else if (isAfter) { transform = `translateY(${baseY}px) scale(0.95) translateX(80px) rotate(${baseRotate + 6}deg)`; }
             return (
               <div key={i} onClick={() => setModalIndex(i)}
                 className="relative transition-all duration-700 cursor-pointer group deck-card"
                 style={{ width: 'min(90vw, 550px)', transform, zIndex, transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)', marginLeft: i === 0 ? 0 : '-12%' }}
                 onMouseEnter={() => setHoveredIndex(i)} onMouseLeave={() => setHoveredIndex(null)}
               >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[50px] -z-10 rounded-2xl" style={{background: step.color}} />
                  <div className="w-full aspect-[16/9] bg-[#0C1520] rounded-2xl border transition-colors duration-500 overflow-hidden flex flex-col justify-center items-center p-2"
                       style={{ borderColor: isHovered ? step.color : 'rgba(255,255,255,0.05)', boxShadow: isHovered ? `0 30px 60px ${step.glow}` : '0 15px 35px rgba(0,0,0,0.6)' }}>
                    <img src={step.img} alt={step.title} className="w-full h-full object-contain rounded-xl" />
                    <div className="absolute inset-0 bg-black transition-opacity duration-700 rounded-2xl pointer-events-none" style={{opacity: isAnyHovered && !isHovered ? 0.6 : 0}} />
                  </div>
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                     <span className="font-mono text-[9px] font-bold text-white tracking-widest uppercase">Click to Expand</span>
                  </div>
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 z-20 bg-black/90 backdrop-blur-md px-6 py-3 rounded-2xl border shadow-2xl flex flex-col items-center whitespace-nowrap min-w-max" style={{borderColor: `${step.color}40`}}>
                    <span className="font-mono text-[10px] font-bold tracking-widest uppercase mb-1" style={{color: step.color}}>{step.title}</span>
                    <span className="font-serif text-lg text-white" style={{fontFamily:"'Fraunces',serif"}}>{step.subtitle}</span>
                  </div>
               </div>
             );
          })}
        </div>

        {/* ── Mobile: Vertical Staggered Stack ── */}
        <div className="md:hidden flex flex-col items-center gap-6 px-4">
          {ecosystemSteps.map((step, i) => (
            <motion.div
              key={i}
              onClick={() => setModalIndex(i)}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="cursor-pointer w-full max-w-[420px] relative"
              style={{ alignSelf: i % 2 === 0 ? 'flex-start' : 'flex-end', marginLeft: i % 2 === 0 ? '0' : 'auto' }}
            >
              {/* Glow */}
              <div className="absolute inset-0 rounded-2xl -z-10" style={{ background: step.color, filter: 'blur(30px)', opacity: 0.25 }} />
              {/* Card */}
              <div className="w-full aspect-[4/3] bg-[#0C1520] rounded-2xl border overflow-hidden" style={{ borderColor: `${step.color}50` }}>
                <img src={step.img} alt={step.title} className="w-full h-full object-contain" />
              </div>
              {/* Label below */}
              <div className="mt-3 flex flex-col">
                <span className="font-mono text-[10px] font-bold tracking-widest uppercase" style={{color: step.color}}>{step.title}</span>
                <span className="font-serif text-base text-white mt-0.5" style={{fontFamily:"'Fraunces',serif"}}>{step.subtitle}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Fullscreen Modal View */}
      <AnimatePresence>
        {modalIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050A10]/95 backdrop-blur-xl p-4 sm:p-12"
          >
             <button onClick={() => setModalIndex(null)} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[110] bg-black/20 p-2 rounded-full backdrop-blur-md">
               <X size={32} />
             </button>

             <div className="w-full max-w-7xl h-full flex items-center justify-between gap-4 relative">
                {/* Prev Button */}
                <button onClick={(e) => { e.stopPropagation(); handlePrev(); }} className="text-white/30 hover:text-white p-4 hidden sm:block transition-all hover:-translate-x-1 z-10 bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-md">
                  <ChevronLeft size={48} />
                </button>

                {/* Main Image View */}
                <motion.div 
                   key={modalIndex}
                   initial={{ scale: 0.95, opacity: 0, y: 20 }}
                   animate={{ scale: 1, opacity: 1, y: 0 }}
                   transition={{ duration: 0.4, ease: "easeOut" }}
                   className="flex-1 flex flex-col items-center justify-center relative w-full h-full"
                >
                   {/* Massive Background Glow */}
                   <div className="absolute inset-0 opacity-20 blur-[100px] -z-10 rounded-full transition-colors duration-1000" style={{background: ecosystemSteps[modalIndex].color}} />
                   
                   <img src={ecosystemSteps[modalIndex].img} alt="Flyer" className="max-w-full max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/5" style={{boxShadow: `0 30px 80px ${ecosystemSteps[modalIndex].glow}`}} />
                   
                   {/* Description below image */}
                   <div className="mt-8 text-center bg-[#0A1118]/80 px-8 py-4 rounded-2xl border border-white/10 backdrop-blur-md shadow-2xl">
                     <p className="font-mono text-[10px] font-bold tracking-widest uppercase mb-2" style={{color: ecosystemSteps[modalIndex].color}}>{ecosystemSteps[modalIndex].title}</p>
                     <p className="font-serif text-2xl text-white tracking-wide">{ecosystemSteps[modalIndex].subtitle}</p>
                   </div>
                </motion.div>

                {/* Next Button */}
                <button onClick={(e) => { e.stopPropagation(); handleNext(); }} className="text-white/30 hover:text-white p-4 hidden sm:block transition-all hover:translate-x-1 z-10 bg-black/20 hover:bg-black/40 rounded-full backdrop-blur-md">
                  <ChevronRight size={48} />
                </button>

                {/* Mobile Navigation */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-between sm:hidden px-4 z-10">
                  <button onClick={(e) => { e.stopPropagation(); handlePrev(); }} className="bg-black/80 backdrop-blur-md p-4 rounded-full text-white border border-white/10 shadow-xl"><ChevronLeft size={24} /></button>
                  <button onClick={(e) => { e.stopPropagation(); handleNext(); }} className="bg-black/80 backdrop-blur-md p-4 rounded-full text-white border border-white/10 shadow-xl"><ChevronRight size={24} /></button>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const ledMessages = [
  { line1: "VIOLATION", line2: "NO HELMET", line3: "TN74 AC XXXX", color: "#ef4444" },
  { line1: "WEAR HELMET", line2: "SAVE YOUR LIFE", color: "#f59e0b" },
  { line1: "DON'T DRINK", line2: "AND DRIVE", color: "#f59e0b" },
  { line1: "AVOID", line2: "RASH DRIVING", color: "#f59e0b" },
  { line1: "FOLLOW", line2: "TRAFFIC RULES", color: "#f59e0b" },
  { line1: "SAFER ROADS", line2: "START WITH YOU", color: "#10b981" }
];

const PublicAwarenessNetwork = () => {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % ledMessages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const msg = ledMessages[msgIndex];

  return (
    <section className="py-12 sm:py-16 bg-[#0B1220] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <p className="font-mono text-[10px] uppercase tracking-widest mb-2 text-[#F59E0B]">PUBLIC AWARENESS NETWORK</p>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4" style={{fontFamily:"'Fraunces',serif"}}>Driving Awareness. Saving Lives.</h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          
          {/* Left Side: LED Simulator */}
          <div className="lg:col-span-7 flex flex-col h-full">
            <div className="flex-1 rounded-2xl overflow-hidden bg-[#000] border-4 border-[#1e293b] p-6 relative flex flex-col items-center justify-center min-h-[250px] sm:min-h-[300px] shadow-[0_0_40px_rgba(0,0,0,0.6)]">
               
               {/* LED Matrix Background */}
               <div className="absolute inset-0 opacity-20 pointer-events-none" style={{backgroundSize:"4px 4px", backgroundImage:"radial-gradient(circle, #ffffff 1px, transparent 1px)"}} />
               
               <div className="relative z-10 flex flex-col items-center text-center space-y-2">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={msgIndex}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.05 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="flex flex-col items-center space-y-2 sm:space-y-4"
                    >
                      <h3 className="font-mono text-3xl sm:text-5xl font-bold uppercase tracking-widest leading-tight transition-colors duration-500" style={{color: msg.color, textShadow: `0 0 10px ${msg.color}, 0 0 20px ${msg.color}`}}>
                        {msg.line1}
                      </h3>
                      {msg.line2 && (
                        <h3 className="font-mono text-2xl sm:text-4xl font-bold uppercase tracking-widest leading-tight transition-colors duration-500" style={{color: msg.color, textShadow: `0 0 10px ${msg.color}, 0 0 20px ${msg.color}`}}>
                          {msg.line2}
                        </h3>
                      )}
                      {msg.line3 && (
                        <h3 className="font-mono text-xl sm:text-2xl font-bold uppercase tracking-widest leading-tight transition-colors duration-500 mt-2" style={{color: "#fff", textShadow: `0 0 10px #fff`}}>
                          {msg.line3}
                        </h3>
                      )}
                    </motion.div>
                  </AnimatePresence>
               </div>

               {/* Indicator */}
               <div className="absolute bottom-3 left-4 flex items-center gap-2">
                 <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{background: msg.color, boxShadow: `0 0 8px ${msg.color}`}} />
                 <span className="font-mono text-[8px] text-white/50 tracking-widest">LIVE LED SIMULATOR</span>
               </div>
            </div>

            {/* Bottom Timeline */}
            <div className="mt-4 flex justify-between items-center bg-[#0C1520] p-4 rounded-xl border border-white/5">
               <div className="flex flex-col items-center gap-1 flex-1">
                 <span className="font-mono text-[9px] tracking-widest text-white/50">1</span>
                 <span className="font-bold text-xs text-white text-center">AI Detection</span>
               </div>
               <ArrowRight className="w-3 h-3 text-white/20 shrink-0" />
               <div className="flex flex-col items-center gap-1 flex-1">
                 <span className="font-mono text-[9px] tracking-widest text-white/50">2</span>
                 <span className="font-bold text-xs text-white text-center">Verification</span>
               </div>
               <ArrowRight className="w-3 h-3 text-white/20 shrink-0" />
               <div className="flex flex-col items-center gap-1 flex-1 relative">
                 <div className="absolute -top-1 right-2 w-1.5 h-1.5 bg-[#F59E0B] rounded-full animate-pulse shadow-[0_0_8px_#F59E0B]" />
                 <span className="font-mono text-[9px] tracking-widest text-[#F59E0B]">3</span>
                 <span className="font-bold text-xs text-[#F59E0B] text-center">Awareness</span>
               </div>
               <ArrowRight className="w-3 h-3 text-white/20 shrink-0" />
               <div className="flex flex-col items-center gap-1 flex-1">
                 <span className="font-mono text-[9px] tracking-widest text-white/50">4</span>
                 <span className="font-bold text-xs text-white text-center">Safer Roads</span>
               </div>
            </div>
          </div>

          {/* Right Side: Deployment Photos (Vertical/Portrait) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 h-full">
            
            {/* Photo 1 */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 group cursor-pointer h-full bg-[#0C1520]">
               <img src="/awareness/deployment-1.jpeg" alt="Violation Board" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
               <div className="absolute bottom-4 left-4 right-4">
                 <p className="font-mono text-[9px] font-bold text-[#ef4444] tracking-widest mb-1">LIVE DEPLOYMENT</p>
                 <p className="font-serif text-lg leading-tight text-white mb-1">Collectorate</p>
                 <p className="text-white/70 text-xs">Nagercoil</p>
               </div>
            </div>

            {/* Photo 2 */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 group cursor-pointer h-full bg-[#0C1520]">
               <img src="/awareness/deployment-2.jpeg" alt="Awareness Board" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
               <div className="absolute bottom-4 left-4 right-4">
                 <p className="font-mono text-[9px] font-bold text-[#F59E0B] tracking-widest mb-1">CAMPAIGN</p>
                 <p className="font-serif text-lg leading-tight text-white mb-1">LED Network</p>
                 <p className="text-white/70 text-xs">Public Education</p>
               </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

const OverlappingPhones = () => {
  return (
    <div className="relative w-full max-w-[280px] sm:max-w-[340px] aspect-[9/16] mx-auto">
      
      {/* Background Phone (Video 2) */}
      <div className="absolute top-0 right-0 w-[75%] aspect-[9/16] rounded-[20px] sm:rounded-[28px] overflow-hidden bg-[#0A1118] border-[4px] sm:border-[6px] border-[#1e293b] shadow-2xl z-0 opacity-80 translate-x-8 sm:translate-x-12 -translate-y-4 sm:-translate-y-6">
        <video src="/deployment-video/vid-2.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover" />
        <div className="absolute bottom-3 left-0 right-0 flex justify-center pointer-events-none">
          <div className="bg-black/60 backdrop-blur-md px-2 py-1 rounded-full border border-white/10">
            <span className="font-mono text-[6px] sm:text-[7px] font-bold text-white tracking-widest uppercase">Kanyakumari Police</span>
          </div>
        </div>
      </div>

      {/* Foreground Phone (Video 1) */}
      <div className="absolute bottom-0 left-0 w-[80%] aspect-[9/16] rounded-[24px] sm:rounded-[32px] overflow-hidden bg-[#0A1118] border-[6px] sm:border-[8px] border-[#1e293b] shadow-2xl z-10 translate-y-4 sm:translate-y-6">
        <video src="/deployment-video/vid-1.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover" />
        
        <div className="absolute top-3 left-3 right-3 flex justify-between items-start pointer-events-none">
          <div className="bg-black/50 backdrop-blur-md px-2 py-1 rounded-full border border-white/10 flex items-center gap-1.5">
             <div className="w-1.5 h-1.5 bg-[#ef4444] rounded-full shadow-[0_0_8px_#ef4444] animate-pulse" />
             <span className="font-mono text-[6px] sm:text-[8px] font-bold text-white tracking-widest uppercase">Live</span>
          </div>
        </div>
        
        <div className="absolute bottom-4 left-3 right-3 flex justify-center pointer-events-none">
          <div className="bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
            <span className="font-mono text-[7px] sm:text-[8px] font-bold text-white tracking-widest uppercase">Awareness Matrix</span>
          </div>
        </div>
      </div>

    </div>
  );
};

/* â”€â”€ main component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
export default function Home() {
  const [activeStep, setActiveStep]                   = useState(0);
  const [mosaicSetIndex, setMosaicSetIndex]           = useState(0);
  const [scrolled, setScrolled]                       = useState(false);
  const [isModalOpen, setIsModalOpen]                 = useState(false);
  const [activeMedia, setActiveMedia]                 = useState<{name: string, link: string, image: string} | null>(null);
  const [pressModalIdx, setPressModalIdx]             = useState<number | null>(null);
  const [mobileNavOpen, setMobileNavOpen]             = useState(false);

  useEffect(() => { const iv = setInterval(() => setMosaicSetIndex(p=>(p+1)%mosaicSets.length), 5000); return ()=>clearInterval(iv); }, []);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, {passive:true}); return ()=>window.removeEventListener("scroll",fn);
  }, []);

  // ── Scroll velocity glow ────────────────────────────────────────────────
  const { scrollY } = useScroll();
  const rawVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(rawVelocity, { stiffness: 80, damping: 30 });
  useEffect(() => {
    return smoothVelocity.on("change", (v) => {
      const glow = Math.min(Math.abs(v) * 0.04, 20);
      document.documentElement.style.setProperty("--scroll-glow", String(glow.toFixed(1)));
    });
  }, [smoothVelocity]);

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
    { name:"Subdivision Deployment",scope:"Multiple Junctions",bullets:["3â€“10 junction integration","Centralized monitoring hub","Unified violation dashboard","Dedicated deployment support"] },
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

  const mosaicSets = [
    [
      { label: "Public Awareness Display", src: "/hero-mosaic/mosaic-1.jpeg" },
      { label: "Police Collaboration", src: "/hero-mosaic/mosaic-2.jpeg" },
      { label: "Student Innovation", src: "/hero-mosaic/mosaic-3.jpeg" },
      { label: "Live Deployment", src: "/hero-mosaic/mosaic-4.jpeg" }
    ],
    [
      { label: "Public Awareness Display", src: "/hero-mosaic/mosaic-5.jpeg" },
      { label: "Police Collaboration", src: "/hero-mosaic/mosaic-6.jpeg" },
      { label: "Student Innovation", src: "/hero-mosaic/mosaic-7.jpeg" },
      { label: "Live Deployment", src: "/hero-mosaic/mosaic-8.jpeg" }
    ],
    [
      { label: "Public Awareness Display", src: "/hero-mosaic/mosaic-9.jpeg" },
      { label: "Police Collaboration", src: "/hero-mosaic/mosaic-10.jpeg" },
      { label: "Student Innovation", src: "/hero-mosaic/mosaic-11.jpeg" },
      { label: "Live Deployment", src: "/hero-mosaic/mosaic-1.jpeg" }
    ]
  ];

  const mediaCoverageItems = Array.from({ length: 13 }).map((_, i) => ({
    name: `Press Coverage ${i + 1}`,
    link: "",
    image: `/press/clipping_${i + 1}.jpeg`
  }));


  const dashScreens = [
    {title:"Command Dashboard",             icon:LayoutDashboard, desc:"Live overview of all active junctions with violation counters and camera status", mIdx:0},
    {title:"Violations Log",                icon:AlertTriangle,   desc:"Timestamped violation records with frame captures and ANPR plate extraction", mIdx:1},
    {title:"Automated Evidence Processing", icon:Cpu,             desc:"AI-driven confidence scoring with an integrated dual-view interface for verifying vehicle plates and scene context", mIdx:3},
    {title:"Advanced Analytics & Reporting",icon:BarChart2,       desc:"Real-time statistical breakdowns by violation type and location, featuring one-click daily PDF report generation", mIdx:5},
  ];

  const upcomingScreens = [
    {title:"Habitual Offender Tracking",    icon:Users,           desc:"Automated identification and ranking of repeat traffic violators based on risk level and offense frequency", mIdx:2},
    {title:"Role-Based Access Control",     icon:Shield,          desc:"Hierarchical permission system restricting subdivision officers to their specific jurisdictions while granting command centers global oversight", mIdx:4},
  ];

  return (
    <div className="min-h-screen bg-white text-[#0F1E36] font-sans overflow-x-hidden selection:bg-[#CC2929] selection:text-white">

      {/* â”€â”€ Navigation â”€â”€ */}
      {/* Mobile Nav Overlay */}
      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} onRequestPilot={() => setIsModalOpen(true)} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300" style={{
        background: scrolled?"rgba(255,255,255,0.97)":"rgba(255,255,255,0.93)",
        backdropFilter:"blur(12px)",
        borderBottom: scrolled?`1px solid ${LN}`:"1px solid transparent",
        boxShadow: scrolled?"0 1px 14px rgba(15,30,54,0.07)":"none",
      }}>
        <div className="max-w-[1400px] w-full mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
          <a href="#" className="flex items-center shrink-0">
            <img src="/kaaval-logo.png" alt="Kaaval AI Logo" className="h-10 sm:h-12 md:h-14 w-auto object-contain mix-blend-multiply" />
          </a>
          <div className="flex items-center gap-3 lg:gap-6">
            {[["#platform","Platform"],["#deployment","Deployment"],["#our-impact","Impact"],["#media","Media"],["#contact","Contact"]].map(([href,label])=>(
              <a key={label} href={href} className="text-sm font-medium transition-colors hidden md:block" style={{color:S}}
                onMouseEnter={e=>(e.currentTarget.style.color=INK)} onMouseLeave={e=>(e.currentTarget.style.color=S)}>{label}</a>
            ))}
            <MagneticButton onClick={() => setIsModalOpen(true)} className="font-semibold px-5 py-2.5 rounded-sm transition-all text-sm text-white hidden md:block" style={{background:R}}
              onMouseEnter={e=>(e.currentTarget.style.background="#E03333")} onMouseLeave={e=>(e.currentTarget.style.background=R)}
              data-testid="button-nav-pilot">Request Pilot Deployment</MagneticButton>
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileNavOpen(true)}
              className="md:hidden flex flex-col items-center justify-center gap-1.5 w-10 h-10 rounded-lg"
              aria-label="Open menu"
            >
              <span className="block w-5 h-0.5 rounded-full transition-all" style={{background:INK}} />
              <span className="block w-3.5 h-0.5 rounded-full transition-all" style={{background:INK}} />
              <span className="block w-5 h-0.5 rounded-full transition-all" style={{background:INK}} />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section id="hero" className="relative min-h-screen flex items-center bg-grid-light bg-white" style={{paddingTop:"64px"}}>
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 lg:py-12">
          <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-20 items-center">

            {/* Text block */}
            <div ref={hFade.ref} style={hFade.style} className="flex flex-col items-center lg:items-start gap-5 text-center lg:text-left w-full">
              <div className="flex items-center gap-2">
                <div className="w-5 h-0.5" style={{background:R}}/>
                <span className="font-mono text-xs font-medium uppercase tracking-widest" style={{fontFamily:"'IBM Plex Mono',monospace",color:N,letterSpacing:"0.18em"}}>AI-Powered Traffic Safety Platform</span>
              </div>

              <h1 className="font-serif font-black leading-tight relative z-10" style={{fontFamily:"'Fraunces',serif",fontSize:"var(--text-hero)",color:INK,maxWidth:"100%"}}>
                Transforming Existing CCTV Cameras into AI-Powered Traffic Safety Systems.
              </h1>

              <p className="leading-relaxed max-w-lg" style={{color:S, fontSize:"var(--text-sub)"}}>
                In India, over half of road fatalities involve two-wheelers. KAAVAL AI helps authorities detect violations, improve awareness, and promote safer roads using existing CCTV infrastructure.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <MagneticButton onClick={() => setIsModalOpen(true)}
                  className="font-semibold px-6 py-3.5 rounded-sm transition-all text-sm text-white"
                  style={{background:R}}
                  onMouseEnter={e=>(e.currentTarget.style.background="#E03333")} onMouseLeave={e=>(e.currentTarget.style.background=R)}
                  data-testid="button-hero-pilot">Request Pilot Deployment</MagneticButton>
                <a href="#deployment" className="font-medium px-6 py-3.5 rounded-sm transition-all text-sm border text-center" style={{borderColor:LN,color:INK}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=N;e.currentTarget.style.color=N;}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor=LN;e.currentTarget.style.color=INK;}}>View Deployment Models</a>
              </div>

              {/* Live status */}
              <div className="flex items-center gap-2.5">
                <span className="w-2 h-2 rounded-full shrink-0 animate-pulse" style={{background:GR,boxShadow:`0 0 0 3px rgba(42,122,90,0.18)`}}/>
                <span className="font-mono text-xs font-semibold" style={{fontFamily:"'IBM Plex Mono',monospace",color:GR,letterSpacing:"0.08em"}}>Pilot Operational</span>
                <span style={{color:"rgba(74,94,120,0.4)"}}>·</span>
                <span className="font-mono text-xs" style={{fontFamily:"'IBM Plex Mono',monospace",color:S,letterSpacing:"0.05em"}}>Nagercoil, TN</span>
              </div>
            </div>

            {/* Mosaic — right column on lg, stacked on mobile */}
            <div ref={cFade.ref} style={cFade.style} className="flex flex-col gap-4 relative w-full mt-8 lg:mt-0">
              {/* Desktop: 2x2 grid */}
              <div className="hidden lg:grid grid-cols-2 gap-4 w-full">
                {[0, 1, 2, 3].map((posIndex) => (
                  <div key={posIndex} className="relative group overflow-hidden rounded-xl aspect-[4/3] bg-black">
                    {mosaicSets.map((set, setIdx) => (
                      <img
                        key={setIdx}
                        src={set[posIndex].src}
                        alt={set[posIndex].label}
                        className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${mosaicSetIndex === setIdx ? "opacity-100 group-hover:scale-110" : "opacity-0 scale-100 pointer-events-none"}`}
                      />
                    ))}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300 flex items-center justify-center p-4 z-10">
                      <span className="text-white font-serif font-bold text-lg text-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0" style={{fontFamily:"'Fraunces',serif"}}>
                        {mosaicSets[mosaicSetIndex][posIndex].label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Mobile: single crossfading image */}
              <div className="lg:hidden relative rounded-2xl overflow-hidden w-full aspect-video bg-black">
                {mosaicSets.map((set, setIdx) => (
                  <img
                    key={setIdx}
                    src={set[0].src}
                    alt={set[0].label}
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${mosaicSetIndex === setIdx ? "opacity-100" : "opacity-0"}`}
                  />
                ))}
                {/* Slide indicator dots */}
                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                  {mosaicSets.map((_, i) => (
                    <div key={i} className="w-1.5 h-1.5 rounded-full transition-all duration-300" style={{background: i === mosaicSetIndex ? "#CC2929" : "rgba(255,255,255,0.4)"}} />
                  ))}
                </div>
              </div>

              {/* Stats strip */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 rounded-xl w-full" style={{background:AL, border:`1px solid ${LN}`}}>
                {[
                  {icon:"🚦", label:"Live Deployment"},
                  {icon:"📢", label:"LED Awareness"},
                  {icon:"⚡", label:"Edge AI"},
                ].map((stat, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-base">{stat.icon}</span>
                    <span className="font-mono text-[11px] uppercase font-bold" style={{fontFamily:"'IBM Plex Mono',monospace", color:N}}>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€ Initiated By Badges â”€â”€ */}
      <section style={{background:AL,borderTop:`1px solid ${LN}`,borderBottom:`1px solid ${LN}`}} className="py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-8">
          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-lg shadow-sm w-full sm:w-auto transition-transform hover:-translate-y-1" style={{border:`1px solid ${LN}`}}>
            <span className="text-2xl">ðŸ‘®</span>
            <span className="font-semibold text-sm" style={{color:INK}}>Supported by Kanyakumari District Police</span>
          </div>
          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-lg shadow-sm w-full sm:w-auto transition-transform hover:-translate-y-1" style={{border:`1px solid ${LN}`}}>
            <span className="text-2xl">ðŸ«</span>
            <span className="font-semibold text-sm" style={{color:INK}}>Developed by Students of Rajalakshmi Engineering College</span>
          </div>
        </div>
      </section>

      {/* â”€â”€ Why Kaaval AI â”€â”€ */}
      <section id="our-impact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{fontFamily:"'IBM Plex Mono',monospace",color:R,letterSpacing:"0.18em"}}>Value Proposition</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold" style={{fontFamily:"'Fraunces',serif",color:INK}}>Why KAAVAL AI?</h2>
            <p className="mt-5 text-base max-w-3xl mx-auto leading-relaxed" style={{color:S}}>
              Traditional traffic enforcement solutions often require expensive hardware replacement and lengthy deployment cycles. KAAVAL AI transforms existing CCTV infrastructure into an intelligent traffic safety network, enabling rapid deployment with significantly lower costs.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center sm:place-items-stretch">
            {[
              {Icon:Eye,           title:"Works with Existing CCTV"},
              {Icon:Cpu,           title:"Real-Time Edge AI Processing"},
              {Icon:FileVideo,     title:"Number Plate Recognition"},
              {Icon:Tv2,           title:"Public Awareness LED System"},
              {Icon:BarChart2,     title:"Lower Deployment Cost"},
            ].map(({Icon,title},i)=>{
              const fade = useFadeUp(i*0.1);
              return (
                <div key={i} ref={fade.ref} style={{...fade.style,background:"#fff",border:`1px solid ${LN}`}} className="p-6 rounded-xl flex flex-col items-center text-center transition-all hover:-translate-y-1 hover:shadow-lg w-full max-w-[280px] sm:max-w-none">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-4" style={{background:"rgba(204,41,41,0.07)"}}>
                    <Icon className="w-5 h-5" style={{color:R}}/>
                  </div>
                  <h3 className="font-serif text-base font-bold leading-snug" style={{fontFamily:"'Fraunces',serif",color:INK}}>{title}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* —— Transition from White to Dark —— */}
      <div className="h-[120px] w-full" style={{ background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 20%, #e2e8f0 40%, #1e293b 70%, #0B1220 100%)" }} />

      <EcosystemShowcase />

      {/* —— LED Awareness System —— */}
      <PublicAwarenessNetwork />

      {/* ─── Live Deployment / Case Study ─── */}
      <section id="deployment" className="pt-10 pb-16 relative overflow-hidden bg-[#0B1220]">
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          
          <motion.div className="mb-8 text-center" variants={sectionVariants.right} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} transition={sectionTransition}>
            <p className="font-mono text-xs uppercase tracking-widest mb-3 text-[#CC2929]" style={{letterSpacing:"0.18em"}}>DEPLOYMENT INFORMATION</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-4" style={{fontFamily:"'Fraunces',serif"}}>First Live KAAVAL AI Pilot</h2>
            <p className="text-[#8FA3B8] max-w-2xl mx-auto text-lg mb-8">
              Currently 1 kit is deployed with active operations. Works are ongoing for the next major deployments across the state.
            </p>

            <div className="flex flex-col items-center justify-center gap-1 mb-8">
               <p className="text-[10px] text-[#8FA3B8] font-mono tracking-widest uppercase">Initiated by</p>
               <p className="text-white font-serif text-xl font-bold">Dr. R. Stalin IPS</p>
               
               <div className="h-4" />
               
               <p className="text-[10px] text-[#8FA3B8] font-mono tracking-widest uppercase">Supported by</p>
               <p className="text-white font-bold text-lg">[College Name]</p>
            </div>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Side: Overlapping Phones (65% visually) */}
            <div className="lg:col-span-7 relative flex justify-center lg:justify-end lg:pr-12">
               <OverlappingPhones />
            </div>

            {/* Right Side: Status Cards (35% visually) */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              
              <div className="bg-[#0C1520] p-4 sm:p-5 rounded-2xl border border-white/5 flex gap-4 items-start shadow-xl transition-all hover:-translate-y-1">
                 <div className="w-10 h-10 rounded-full bg-[#1e293b] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-white" />
                 </div>
                 <div>
                    <p className="font-mono text-[10px] text-[#8FA3B8] tracking-widest uppercase mb-1">Location</p>
                    <p className="text-white font-medium text-lg">Collectorate Roundana</p>
                    <p className="text-[#8FA3B8] text-sm">Kanyakumari District Police, Tamil Nadu</p>
                 </div>
              </div>
              
              <div className="bg-[#0C1520] p-4 sm:p-5 rounded-2xl border border-white/5 flex gap-4 items-start shadow-xl transition-all hover:-translate-y-1">
                 <div className="w-10 h-10 rounded-full bg-[#2A7A5A]/20 flex items-center justify-center shrink-0">
                    <Activity className="w-5 h-5 text-[#2A7A5A]" />
                 </div>
                 <div>
                    <p className="font-mono text-[10px] text-[#8FA3B8] tracking-widest uppercase mb-1">Status</p>
                    <p className="text-[#2A7A5A] font-bold text-lg flex items-center gap-2">Operational</p>
                    <p className="text-[#8FA3B8] text-sm">Live Pilot Active</p>
                 </div>
              </div>

              <div className="bg-[#0C1520] p-4 sm:p-5 rounded-2xl border border-white/5 flex gap-4 items-start shadow-xl transition-all hover:-translate-y-1">
                 <div className="w-10 h-10 rounded-full bg-[#CC2929]/10 flex items-center justify-center shrink-0">
                    <FileVideo className="w-5 h-5 text-[#CC2929]" />
                 </div>
                 <div>
                    <p className="font-mono text-[10px] text-[#8FA3B8] tracking-widest uppercase mb-1">Cameras</p>
                    <p className="text-white font-medium text-lg">4 Active Streams</p>
                    <p className="text-[#8FA3B8] text-sm">HD RTSP Feeds</p>
                 </div>
              </div>

              <div className="bg-[#0C1520] p-4 sm:p-5 rounded-2xl border border-white/5 flex gap-4 items-start shadow-xl transition-all hover:-translate-y-1">
                 <div className="w-10 h-10 rounded-full bg-[#F59E0B]/10 flex items-center justify-center shrink-0">
                    <Cpu className="w-5 h-5 text-[#F59E0B]" />
                 </div>
                 <div>
                    <p className="font-mono text-[10px] text-[#8FA3B8] tracking-widest uppercase mb-1">Features</p>
                    <p className="text-white font-medium text-lg">Detection + Awareness</p>
                    <p className="text-[#8FA3B8] text-sm">Real-time edge processing</p>
                 </div>
              </div>

            </div>
          </div>

          {/* Bottom Numbers Strip */}
            <div className="mt-10 md:mt-12 pt-8 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-20">
              <div className="flex flex-col items-center text-center">
                 <span className="font-serif text-4xl sm:text-5xl font-bold text-white mb-2"><AnimatedCounter end={4} /></span>
                 <span className="font-mono text-[10px] sm:text-[11px] text-[#8FA3B8] tracking-widest uppercase">Active Camera Streams</span>
              </div>
              <div className="flex flex-col items-center text-center">
                 <span className="font-serif text-5xl font-bold text-white mb-2">24/7</span>
                 <span className="font-mono text-[11px] text-[#8FA3B8] tracking-widest uppercase">Monitoring</span>
              </div>
              <div className="flex flex-col items-center text-center">
                 <span className="font-serif text-5xl font-bold text-white mb-2"><AnimatedCounter end={100} suffix="%" /></span>
                 <span className="font-mono text-[11px] text-[#8FA3B8] tracking-widest uppercase">Edge AI Processing</span>
              </div>
              <div className="flex flex-col items-center text-center">
                 <span className="font-serif text-5xl font-bold text-white mb-2"><AnimatedCounter end={1} /></span>
                 <span className="font-mono text-[11px] text-[#8FA3B8] tracking-widest uppercase">Live Deployment Site</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── Deployment Models ── */}
        <section className="bg-white" style={{paddingTop:"var(--space-section)",paddingBottom:"var(--space-section)"}}>
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10 md:mb-16">
              <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{fontFamily:"'IBM Plex Mono',monospace",color:R,letterSpacing:"0.18em"}}>Scale</p>
              <h2 className="font-serif font-bold" style={{fontFamily:"'Fraunces',serif",color:INK,fontSize:"var(--text-section)"}}>Deployment Models</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {deploymentModels.map((model, i) => (
                <div key={i} className="p-6 rounded-xl transition-all hover:-translate-y-1 group hover:shadow-lg cursor-pointer" style={{background:AL,border:`1px solid ${LN}`}}>
                  <p className="font-mono text-[10px] uppercase tracking-widest mb-2" style={{color:S}}>{model.scope}</p>
                  <h3 className="font-serif text-xl font-bold mb-4" style={{color:INK}}>{model.name}</h3>
                  <ul className="space-y-2">
                    {model.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm leading-relaxed" style={{color:S}}>
                        <span className="shrink-0 mt-0.5" style={{color:R}}>•</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Project Journey ── */}
        <section className="bg-white" style={{paddingTop:"var(--space-section)",paddingBottom:"var(--space-section)"}}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <motion.div className="text-center mb-10 md:mb-16" variants={sectionVariants.left} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-80px" }} transition={sectionTransition}>
              <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{fontFamily:"'IBM Plex Mono',monospace",color:R,letterSpacing:"0.18em"}}>Progress</p>
              <h2 className="font-serif font-bold" style={{fontFamily:"'Fraunces',serif",color:INK,fontSize:"var(--text-section)"}}>The Project Journey</h2>
            </motion.div>

            {/* Desktop: horizontal timeline */}
            <div className="hidden md:block relative w-full pb-4">
              <div className="flex items-start justify-between pt-2 px-2">
                {journeySteps.map((step, i) => {
                  const isLive = step.label === "Live Operations";
                  const isCurrent = step.label === "Pilot Deployment" || step.label === "Live Operations";
                  const isFuture = step.label === "District Expansion";
                  return (
                    <div key={i} className="relative flex-1 px-1 flex flex-col items-center text-center">
                      {i !== journeySteps.length - 1 && (
                        <div className="absolute top-[11px] left-[50%] right-[-50%] h-0.5" style={{background:LN, zIndex:0}}/>
                      )}
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
                        <p className="text-[10px] lg:text-[11px] leading-tight" style={{color:S}}>{step.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile: vertical timeline */}
            <div className="md:hidden timeline-vertical space-y-6 mt-8">
              {journeySteps.map((step, i) => {
                const isLive = step.label === "Live Operations";
                const isCurrent = step.label === "Pilot Deployment" || step.label === "Live Operations";
                const isFuture = step.label === "District Expansion";
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: i * 0.06, ease: "easeOut" }}
                    className="relative pl-1"
                  >
                    <div
                      className="timeline-vertical-dot"
                      style={{
                        background: isFuture ? "#fff" : isCurrent ? R : N,
                        borderColor: isFuture ? LN : isCurrent ? R : N,
                        boxShadow: isCurrent ? "0 0 0 4px rgba(204,41,41,0.15)" : "none",
                      }}
                    />
                    <h3 className="font-semibold text-sm" style={{color: isFuture ? S : INK}}>{step.label}</h3>
                    {isLive && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[9px] font-mono font-bold my-1"
                        style={{background:"rgba(42,122,90,0.1)",color:GR,border:"1px solid rgba(42,122,90,0.25)"}}>
                        <span className="w-1 h-1 rounded-full animate-pulse inline-block" style={{background:GR}}/> ACTIVE
                      </span>
                    )}
                    {isFuture && (
                      <span className="text-[9px] font-mono block mt-0.5" style={{color:S}}>UPCOMING</span>
                    )}
                    <p className="text-xs leading-relaxed mt-1" style={{color:S}}>{step.desc}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

      {/* —— Interactive Command Center —— */}
      <CommandCenter />

      {/* â”€â”€ Media & Recognition â”€â”€ */}
      {/* —— Press Wall (Media) —— */}
      <PressWall onOpen={(idx) => setPressModalIdx(idx)} />

      {/* Press lightbox modal */}
      <AnimatePresence>
        {pressModalIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
            onClick={() => setPressModalIdx(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              className="relative max-w-3xl w-full bg-[#070D16] rounded-2xl overflow-hidden border border-white/10"
              onClick={(e) => e.stopPropagation()}
              style={{ boxShadow: "0 40px 80px rgba(0,0,0,0.8)" }}
            >
              <button
                onClick={() => setPressModalIdx(null)}
                className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors z-10 text-white"
              >
                <X size={18} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setPressModalIdx(i => i !== null ? (i - 1 + 13) % 13 : 0); }}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white z-10"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setPressModalIdx(i => i !== null ? (i + 1) % 13 : 0); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white z-10"
              >
                <ChevronRight size={20} />
              </button>
              <motion.img
                key={pressModalIdx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                src={`/press/clipping_${pressModalIdx + 1}.jpeg`}
                alt={`Press clipping ${pressModalIdx + 1}`}
                className="w-full max-h-[85vh] object-contain"
              />
              <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#070D16] to-transparent pointer-events-none" />
              <p className="absolute bottom-3 left-0 right-0 text-center font-mono text-[9px] uppercase tracking-widest text-white/40">
                {pressModalIdx + 1} / 13 · Press Coverage
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <TeamStructure />

      {/* â”€â”€ Contact & Social â”€â”€ */}
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
                {Icon:Phone,       label:"Mobile",   value:"+91 7200599700",    sub:"Call us directly", href: "tel:+917200599700"},
                {Icon:MessageCircle,label:"WhatsApp", value:"+91 7200599700",   sub:"Chat on WhatsApp", href: "https://wa.me/917200599700"},
                {Icon:Mail,        label:"Email",    value:"kaaval.ai.kanyakumari@gmail.com",  sub:"Official correspondence", href: "mailto:kaaval.ai.kanyakumari@gmail.com"},
                {Icon:MapPin,      label:"Address",  value:"Kanyakumari District",sub:"Tamil Nadu, India", href: "https://maps.google.com/?q=Kanyakumari+District"},
              ].map(({Icon,label,value,sub,href},i)=>(
                <a key={i} href={href} target={href.startsWith('http') ? "_blank" : undefined} rel="noreferrer" className="rounded-lg p-5 flex items-start gap-4 transition-transform hover:-translate-y-1 hover:shadow-md cursor-pointer block w-full min-h-[44px]" style={{background:"#fff",border:`1px solid ${LN}`}}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{background:"rgba(27,58,107,0.08)"}}>
                    <Icon className="w-5 h-5" style={{color:N}}/>
                  </div>
                  <div>
                    <p className="font-mono text-xs uppercase tracking-wider mb-0.5" style={{fontFamily:"'IBM Plex Mono',monospace",color:S,letterSpacing:"0.12em"}}>{label}</p>
                    <p className="font-semibold text-sm" style={{color:INK}}>{value}</p>
                    <p className="text-xs" style={{color:S}}>{sub}</p>
                  </div>
                </a>
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


            </div>
          </div>
        </div>
      </section>

      {/* â”€â”€ Footer CTA â”€â”€ */}
      <section className="py-28 bg-grid-dark relative overflow-hidden text-center" style={{background:INK}}>
        <div className="radar-sweep-line" style={{background:"linear-gradient(to right,transparent,rgba(204,41,41,0.06),transparent)"}}/>
        <div className="absolute inset-0 bg-gradient-to-t from-[#07111F] via-transparent to-transparent pointer-events-none"/>
        <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center gap-8">
          <h2 className="font-serif font-black leading-tight" style={{fontFamily:"'Fraunces',serif",color:L,fontSize:"clamp(2rem,5vw,3.5rem)"}}>
            Imagine a District With Zero Preventable Road Fatalities.
          </h2>
          <MagneticButton onClick={() => setIsModalOpen(true)} className="font-bold text-lg px-10 py-5 rounded-sm transition-all text-white w-full sm:w-auto text-center flex justify-center" style={{background:R}}
            onMouseEnter={e=>{e.currentTarget.style.background="#E03333";e.currentTarget.style.transform="scale(1.03)"}}
            onMouseLeave={e=>{e.currentTarget.style.background=R;e.currentTarget.style.transform="scale(1)"}}
            data-testid="button-footer-pilot">Request Pilot Deployment</MagneticButton>
        </div>
      </section>

      {/* â”€â”€ Footer â”€â”€ */}
      <footer style={{background:"#07111F",borderTop:`1px solid ${DN}`}} className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <img src="/kaaval-logo.png" alt="Kaaval AI Logo" className="h-20 md:h-24 w-auto" />
              </div>
              <p className="text-sm leading-relaxed mb-4" style={{color:M}}>AI-powered traffic enforcement for police departments and smart city authorities across India.</p>
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
                {[{Icon:Mail,v:"kaaval.ai.kanyakumari@gmail.com"},{Icon:Phone,v:"+91 7200599700"},{Icon:MapPin,v:"Kanyakumari District\nTamil Nadu, India"}].map(({Icon,v},i)=>(
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
              Â© {new Date().getFullYear()} Kaaval AI. All rights reserved.
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
