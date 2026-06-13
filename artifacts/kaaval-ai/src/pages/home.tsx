import React, { useEffect, useRef, useState } from "react";
import {
  Shield, CheckCircle2, Users, MapPin, Radio, Activity,
  Eye, FileVideo, ShieldAlert, Cpu, Building2, Landmark
} from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ─────────────── helpers ────────────────── */

function useOnScreen(ref: React.RefObject<Element>, rootMargin = "0px") {
  const [isVisible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { rootMargin });
    obs.observe(el);
    return () => obs.unobserve(el);
  }, [ref, rootMargin]);
  return isVisible;
}

const AnimatedCounter = ({ end, suffix = "", prefix = "", duration = 2 }: { end: number; suffix?: string; prefix?: string; duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useOnScreen(ref as React.RefObject<Element>, "-50px");
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = end / (duration * 60);
    const iv = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(iv); }
      else setCount(Math.floor(start * 10) / 10);
    }, 16.6);
    return () => clearInterval(iv);
  }, [inView, end, duration]);
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
};

function useFadeUp(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-60px" });
  return {
    ref,
    style: {
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
    },
  };
}

/* ─────────────── road SVGs ──────────────── */

const RoadSVG = ({ type }: { type: number }) => {
  const roadFill  = "rgba(9, 20, 50, 0.65)";
  const laneStroke = "rgba(120, 155, 210, 0.45)";
  const markingStroke = "rgba(140, 170, 220, 0.7)";

  if (type === 0) return (
    <svg viewBox="0 0 160 120" className="w-full h-full" fill="none">
      <rect x="55" y="0" width="50" height="120" fill={roadFill} />
      <rect x="0" y="35" width="160" height="50" fill={roadFill} />
      <line x1="80" y1="0" x2="80" y2="30" stroke={laneStroke} strokeWidth="1.2" strokeDasharray="5 4" />
      <line x1="80" y1="90" x2="80" y2="120" stroke={laneStroke} strokeWidth="1.2" strokeDasharray="5 4" />
      <line x1="0" y1="60" x2="50" y2="60" stroke={laneStroke} strokeWidth="1.2" strokeDasharray="5 4" />
      <line x1="110" y1="60" x2="160" y2="60" stroke={laneStroke} strokeWidth="1.2" strokeDasharray="5 4" />
      <line x1="55" y1="35" x2="105" y2="35" stroke={markingStroke} strokeWidth="0.9" />
      <line x1="55" y1="85" x2="105" y2="85" stroke={markingStroke} strokeWidth="0.9" />
      <line x1="55" y1="35" x2="55" y2="85" stroke={markingStroke} strokeWidth="0.9" />
      <line x1="105" y1="35" x2="105" y2="85" stroke={markingStroke} strokeWidth="0.9" />
      {[0,1,2,3,4].map(i => <rect key={i} x="55" y={36+i*6} width="5" height="3" fill={markingStroke} opacity="0.65" />)}
      {[0,1,2,3,4].map(i => <rect key={i} x="100" y={36+i*6} width="5" height="3" fill={markingStroke} opacity="0.65" />)}
      <circle cx="44" cy="52" r="4" fill="rgba(231,236,242,0.5)" />
      <rect x="39" y="46" width="10" height="6" rx="1" fill="rgba(231,236,242,0.2)" />
    </svg>
  );
  if (type === 1) return (
    <svg viewBox="0 0 160 120" className="w-full h-full" fill="none">
      <rect x="0" y="40" width="160" height="45" fill={roadFill} />
      <rect x="60" y="85" width="40" height="35" fill={roadFill} />
      <line x1="0" y1="62" x2="55" y2="62" stroke={laneStroke} strokeWidth="1.2" strokeDasharray="5 4" />
      <line x1="105" y1="62" x2="160" y2="62" stroke={laneStroke} strokeWidth="1.2" strokeDasharray="5 4" />
      <line x1="80" y1="90" x2="80" y2="120" stroke={laneStroke} strokeWidth="1.2" strokeDasharray="5 4" />
      <line x1="60" y1="85" x2="100" y2="85" stroke={markingStroke} strokeWidth="1.2" />
      {[0,1,2,3,4].map(i => <rect key={i} x="62" y={87+i*5} width="5" height="3" fill={markingStroke} opacity="0.6" />)}
      {[0,1,2,3,4].map(i => <rect key={i} x="93" y={87+i*5} width="5" height="3" fill={markingStroke} opacity="0.6" />)}
      <path d="M125 53 L135 53 M131 49 L135 53 L131 57" stroke={markingStroke} strokeWidth="1.2" />
      <circle cx="32" cy="55" r="4" fill="rgba(231,236,242,0.5)" />
      <rect x="27" y="49" width="10" height="6" rx="1" fill="rgba(231,236,242,0.2)" />
    </svg>
  );
  if (type === 2) return (
    <svg viewBox="0 0 160 120" className="w-full h-full" fill="none">
      <rect x="55" y="0" width="45" height="55" fill={roadFill} />
      <polygon points="55,55 100,55 160,120 110,120" fill={roadFill} />
      <polygon points="55,55 10,120 55,120 100,55" fill={roadFill} />
      <line x1="77" y1="0" x2="77" y2="50" stroke={laneStroke} strokeWidth="1.2" strokeDasharray="5 4" />
      <line x1="60" y1="60" x2="20" y2="120" stroke={laneStroke} strokeWidth="1.2" strokeDasharray="5 4" />
      <line x1="96" y1="60" x2="136" y2="120" stroke={laneStroke} strokeWidth="1.2" strokeDasharray="5 4" />
      <circle cx="77" cy="55" r="8" stroke={markingStroke} strokeWidth="1" strokeDasharray="3 3" fill="none" />
      <circle cx="77" cy="28" r="5" fill="rgba(231,236,242,0.45)" />
      <rect x="72" y="22" width="10" height="6" rx="1" fill="rgba(231,236,242,0.18)" />
    </svg>
  );
  return (
    <svg viewBox="0 0 160 120" className="w-full h-full" fill="none">
      <rect x="0" y="45" width="160" height="45" fill={roadFill} />
      <path d="M130 0 Q145 0 145 20 L145 45" stroke={roadFill} strokeWidth="28" fill="none" />
      <line x1="0" y1="67" x2="125" y2="67" stroke={laneStroke} strokeWidth="1.2" strokeDasharray="6 5" />
      <line x1="135" y1="67" x2="160" y2="67" stroke={laneStroke} strokeWidth="1.2" strokeDasharray="6 5" />
      <path d="M130 45 Q145 45 145 20" stroke={markingStroke} strokeWidth="1" strokeDasharray="4 3" fill="none" />
      <line x1="0" y1="45" x2="160" y2="45" stroke={markingStroke} strokeWidth="0.8" opacity="0.5" />
      <line x1="0" y1="90" x2="160" y2="90" stroke={markingStroke} strokeWidth="0.8" opacity="0.5" />
      {[0,1,2,3,4,5,6].map(i => <rect key={i} x={10+i*22} y="46" width="7" height="3" fill={markingStroke} opacity="0.5" />)}
      <circle cx="55" cy="59" r="4" fill="rgba(231,236,242,0.5)" />
      <rect x="50" y="53" width="10" height="6" rx="1" fill="rgba(231,236,242,0.2)" />
    </svg>
  );
};

/* ─────────────── camera tile ────────────── */

const ANPR_PLATES = ["TN 32 AB 1234", "KL 01 CD 5678", "TN 74 EF 9012", "KL 58 GH 3456"];

function CameraFeedTile({ label, roadType, scanClass, isActive, onClick }: {
  label: string; roadType: number; scanClass: string; isActive: boolean; onClick: () => void;
}) {
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });
  return (
    <div
      className="relative rounded overflow-hidden aspect-video cursor-pointer select-none"
      style={{ background: "#0C2148", border: isActive ? "1px solid rgba(204,41,41,0.7)" : "1px solid rgba(36,61,110,0.8)" }}
      onClick={onClick}
      data-testid={`camera-tile-${roadType}`}
    >
      <div className="absolute inset-0 p-1 opacity-90"><RoadSVG type={roadType} /></div>
      <div className={`scan-line ${scanClass}`} />

      {/* REC indicator */}
      <div className="absolute top-2 left-2 flex items-center gap-1 z-20">
        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#CC2929" }} />
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "8px", color: "rgba(231,236,242,0.65)", letterSpacing: "0.08em" }}>REC</span>
      </div>
      {/* Timestamp */}
      <div className="absolute top-2 right-2 z-20">
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "8px", color: "rgba(143,163,184,0.8)", letterSpacing: "0.05em" }}>{timeStr}</span>
      </div>

      {/* Active detection overlay */}
      {isActive && (
        <div className="detection-box absolute inset-0 z-30 flex flex-col items-center justify-center">
          <div className="relative" style={{ width: "44%", height: "44%" }}>
            <div className="absolute inset-0 border-2 rounded-sm" style={{ borderColor: "#CC2929" }}>
              <div className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2" style={{ borderColor: "#CC2929" }} />
              <div className="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2" style={{ borderColor: "#CC2929" }} />
              <div className="absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2" style={{ borderColor: "#CC2929" }} />
              <div className="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2" style={{ borderColor: "#CC2929" }} />
            </div>
            <div className="absolute -top-5 left-0 right-0 flex justify-center">
              <span style={{ background: "#CC2929", color: "#fff", fontFamily: "'IBM Plex Mono', monospace", fontSize: "8px", fontWeight: 700, padding: "1px 5px", borderRadius: "2px", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
                NO HELMET
              </span>
            </div>
          </div>
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center" style={{ background: "rgba(9,20,50,0.95)", border: "1px solid rgba(204,41,41,0.5)", borderRadius: "3px", padding: "3px 8px" }}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "7px", color: "rgba(143,163,184,0.9)", letterSpacing: "0.1em" }}>ANPR</span>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: "#CC2929", fontWeight: 700, letterSpacing: "0.08em" }}>{ANPR_PLATES[roadType]}</span>
          </div>
        </div>
      )}

      {/* Label */}
      <div className="absolute bottom-0 left-0 right-0 z-20" style={{ background: "linear-gradient(to top, rgba(9,20,50,0.95), transparent)", padding: "10px 8px 5px" }}>
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "9px", color: "rgba(231,236,242,0.8)", letterSpacing: "0.06em" }}>{label}</span>
      </div>
    </div>
  );
}

/* ─────────────── page data ──────────────── */

const violationSteps = [
  { title: "Motorcycle Detected", icon: Eye,        desc: "Camera identifies a two-wheeler entering the monitored zone.", ill: "motorcycle" },
  { title: "Violation Identified", icon: Cpu,       desc: "AI model confirms the rider is not wearing a helmet.", ill: "ai" },
  { title: "Evidence Captured",    icon: FileVideo,  desc: "High-res violation frame and cropped ANPR plate stored securely.", ill: "evidence" },
  { title: "Alert Logged",         icon: ShieldAlert,desc: "Timestamped record created in the enforcement management system.", ill: "alert" },
  { title: "Officer Review",       icon: Shield,     desc: "Assigned officer reviews the validated alert and takes action.", ill: "review" },
];

const tiers = [
  { name: "Essential",   price: "₹2,999", unit: "/ cam / mo", focus: "Helmet Detection",  highlight: false, features: ["Real-time helmet violation detection", "Daily summary reports", "Existing CCTV compatible", "Standard email support"] },
  { name: "Standard",    price: "₹4,999", unit: "/ cam / mo", focus: "Helmet + ANPR",      highlight: false, features: ["Helmet violation detection", "Number plate recognition", "Automated evidence capture", "Priority support"] },
  { name: "Advanced",    price: "₹7,999", unit: "/ cam / mo", focus: "Full Violation Suite",highlight: true,  features: ["Triple-riding detection", "Wrong-way driving alerts", "Live analytics dashboard", "E-challan integration", "Dedicated account manager"] },
  { name: "Enterprise",  price: "Custom",  unit: "",            focus: "District Rollout",   highlight: false, features: ["Centralized command center", "Unlimited camera integrations", "Custom AI model training", "On-premise deployment", "24/7 SLA support"] },
];

const institutions = [
  { title: "Police Departments",    desc: "Frontline violation enforcement",         Icon: Shield },
  { title: "District Administration",desc: "Policy oversight and reporting",          Icon: Landmark },
  { title: "Smart City Missions",   desc: "Integrated urban safety infrastructure",   Icon: Building2 },
  { title: "Highway Authorities",   desc: "Corridor and bypass monitoring",           Icon: MapPin },
  { title: "Municipal Corporations",desc: "Urban traffic management",                 Icon: Activity },
];

/* ─────────────── main component ─────────── */

export default function Home() {
  const [heroIdx, setHeroIdx]                     = useState(0);
  const [activeStep, setActiveStep]               = useState(0);
  const [activeDetectionTile, setActiveDetectionTile] = useState(0);
  const [scrolled, setScrolled]                   = useState(false);

  const heroTexts = [
    "The Zero Accident\nInitiative",
    "The Safe City\nInitiative",
    "The Intelligent\nEnforcement Initiative",
  ];

  useEffect(() => {
    const iv = setInterval(() => setHeroIdx(p => (p + 1) % heroTexts.length), 4000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const iv = setInterval(() => setActiveDetectionTile(p => (p + 1) % 4), 5000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const heroFade    = useFadeUp(0);
  const commandFade = useFadeUp(0.2);

  /* ── shared inline style shortcuts ── */
  const NAV    = "#1B3A6B";  /* logo navy */
  const RED    = "#CC2929";  /* logo red  */
  const DARK   = "#0F1E36";  /* darkest navy — footer / section bg */
  const PANEL  = "#1B3A6B";  /* command center panel bg */
  const TILE   = "#0C2148";  /* camera tile bg (darker than panel) */
  const INK    = "#0F1E36";  /* primary text */
  const STEEL  = "#4A5E78";  /* secondary text on light */
  const MUTED  = "#8FA3B8";  /* secondary text on dark */
  const LIGHT  = "#E7ECF2";  /* body text on dark */
  const LINE   = "#DDE3ED";  /* borders on light */
  const DLINE  = "#243D6E";  /* borders on dark */
  const GREEN  = "#2A7A5A";  /* LIVE / ACTIVE only */
  const ALT    = "#F2F4F8";  /* alternating section bg */

  return (
    <div className="min-h-screen bg-white text-[#0F1E36] font-sans overflow-x-hidden selection:bg-[#CC2929] selection:text-white">

      {/* ── Navigation ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300" style={{
        background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.93)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? `1px solid ${LINE}` : "1px solid transparent",
        boxShadow: scrolled ? "0 1px 14px rgba(15,30,54,0.07)" : "none",
      }}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-7 h-7" style={{ color: NAV }} />
            <span className="font-serif font-bold text-xl tracking-tight" style={{ color: NAV, fontFamily: "'Fraunces', serif" }}>KAAVAL AI</span>
          </div>
          <div className="flex items-center gap-8">
            <a href="#our-impact" className="text-sm font-medium transition-colors hidden sm:block" style={{ color: STEEL }}
              onMouseEnter={e => (e.currentTarget.style.color = INK)}
              onMouseLeave={e => (e.currentTarget.style.color = STEEL)}>
              Our Impact
            </a>
            <button className="font-semibold px-6 py-2.5 rounded-sm transition-all text-sm text-white"
              style={{ background: RED }}
              onMouseEnter={e => (e.currentTarget.style.background = "#E03333")}
              onMouseLeave={e => (e.currentTarget.style.background = RED)}
              data-testid="button-request-pilot-nav">
              Request Pilot Deployment
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center bg-grid-light bg-white pt-20">
        <div className="radar-sweep-line" style={{ background: "linear-gradient(to right, transparent, rgba(27,58,107,0.05), transparent)" }} />
        <div className="max-w-7xl mx-auto w-full px-6 py-16 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left copy */}
          <div ref={heroFade.ref} style={heroFade.style} className="flex flex-col items-start gap-7">
            {/* Hero badge — navy text, red left accent */}
            <div className="flex items-center gap-2">
              <div className="w-5 h-px" style={{ background: RED }} />
              <span className="font-mono text-xs font-medium uppercase tracking-widest" style={{ fontFamily: "'IBM Plex Mono', monospace", color: NAV, letterSpacing: "0.18em" }}>
                Smart City Initiative
              </span>
            </div>

            <div className="relative h-[130px] sm:h-[160px] w-full">
              {heroTexts.map((text, i) => (
                <h1 key={i} className="absolute top-0 left-0 font-serif font-black leading-tight"
                  style={{ fontFamily: "'Fraunces', serif", fontSize: "clamp(2.4rem, 5vw, 4rem)", color: INK, opacity: i === heroIdx ? 1 : 0, transition: "opacity 0.6s ease", whiteSpace: "pre-line" }}>
                  {text}.
                </h1>
              ))}
            </div>

            <p className="text-lg leading-relaxed max-w-lg" style={{ color: STEEL }}>
              Transforming existing CCTV infrastructure into proactive safety networks — institutional-grade helmet detection and ANPR for police departments aiming for accident-free roads.
            </p>

            <div className="pl-5 py-2 border-l-[3px]" style={{ borderColor: RED }}>
              <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ fontFamily: "'IBM Plex Mono', monospace", color: RED, letterSpacing: "0.15em" }}>Contextual Mandate</p>
              <p className="font-medium italic text-base leading-snug" style={{ color: INK }}>
                "56% of road fatalities in India involve two-wheelers — the majority not wearing helmets."
              </p>
              <p className="text-xs mt-1 not-italic" style={{ color: STEEL }}>— Ministry of Road Transport & Highways, 2022</p>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-1">
              <button className="font-semibold px-8 py-4 rounded-sm transition-all text-base text-white"
                style={{ background: RED }}
                onMouseEnter={e => (e.currentTarget.style.background = "#E03333")}
                onMouseLeave={e => (e.currentTarget.style.background = RED)}
                data-testid="button-request-pilot-hero">
                Request Pilot Deployment
              </button>
              <button className="font-medium px-8 py-4 rounded-sm transition-all text-base border"
                style={{ borderColor: LINE, color: INK }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = NAV; e.currentTarget.style.color = NAV; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = LINE; e.currentTarget.style.color = INK; }}
                data-testid="button-view-case-study">
                View Case Study
              </button>
            </div>
          </div>

          {/* Command Center — logo navy panel */}
          <div ref={commandFade.ref} style={{
            ...commandFade.style,
            background: PANEL,
            border: `1px solid ${DLINE}`,
            borderRadius: "10px",
            boxShadow: "0 24px 64px rgba(15,30,54,0.25), 0 0 0 1px rgba(204,41,41,0.08)",
          }} className="p-5 shadow-2xl hidden sm:block">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: GREEN }} />
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: GREEN, letterSpacing: "0.14em", fontWeight: 500 }}>LIVE</span>
              </div>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: MUTED, letterSpacing: "0.12em" }}>KAAVAL COMMAND CENTER</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { label: "Junction 01 – Market St",   road: 0 },
                { label: "Junction 02 – Central Ave", road: 1 },
                { label: "Junction 03 – NH-47 Bypass",road: 2 },
                { label: "Junction 04 – Port Road",   road: 3 },
              ].map((feed, idx) => (
                <CameraFeedTile key={idx} label={feed.label} roadType={feed.road}
                  scanClass={`scan-line-${idx + 1}`} isActive={activeDetectionTile === idx}
                  onClick={() => setActiveDetectionTile(idx)} />
              ))}
            </div>

            <div className="px-3 py-2 rounded flex items-center justify-between" style={{ background: "#0C2148", border: `1px solid ${DLINE}` }}>
              {["AI PROCESSING: 4 FEEDS", "DETECTION RATE: 99.2%", "LAST ALERT: 2s AGO"].map((s, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <span style={{ color: DLINE }}>·</span>}
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "9px", color: MUTED, letterSpacing: "0.07em" }}>{s}</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <section style={{ background: ALT, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }} className="py-5">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-3 lg:gap-6">
          {["Police Department Pilot", "Smart City Ready", "Existing CCTV Compatible", "Rapid Deployment", "Govt. Approved Standards"].map((b, i) => (
            <div key={i} className="border px-4 py-1.5 rounded-sm font-mono text-xs tracking-wider uppercase whitespace-nowrap"
              style={{ fontFamily: "'IBM Plex Mono', monospace", borderColor: NAV, color: NAV, background: "rgba(27,58,107,0.05)", letterSpacing: "0.1em" }}>
              {b}
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-4">
            <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ fontFamily: "'IBM Plex Mono', monospace", color: RED, letterSpacing: "0.18em" }}>AI Detection Pipeline</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: INK }}>From Camera Feed to Enforcement Action.</h2>
          </div>
          <p className="text-center text-sm mb-12" style={{ color: STEEL, fontFamily: "'IBM Plex Mono', monospace" }}>Hover any feed to preview AI detection in action</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[0, 1, 2, 3].map((type) => (
              <div key={type} className="relative overflow-hidden group cursor-crosshair rounded-lg"
                style={{ aspectRatio: "3/4", background: TILE, border: `1px solid ${DLINE}` }}>
                <div className="absolute inset-0 p-2 opacity-85"><RoadSVG type={type} /></div>
                <div className={`scan-line scan-line-${type + 1}`} />

                {/* Hover detection overlay */}
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="relative" style={{ width: "45%", height: "38%" }}>
                    <div className="absolute inset-0 border-2 rounded-sm" style={{ borderColor: RED }}>
                      <div className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2" style={{ borderColor: RED }} />
                      <div className="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2" style={{ borderColor: RED }} />
                      <div className="absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2" style={{ borderColor: RED }} />
                      <div className="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2" style={{ borderColor: RED }} />
                    </div>
                    <div className="absolute -top-5 left-0 right-0 flex justify-center">
                      <span style={{ background: RED, color: "#fff", fontFamily: "'IBM Plex Mono', monospace", fontSize: "9px", fontWeight: 700, padding: "1px 6px", borderRadius: "2px", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>NO HELMET</span>
                    </div>
                  </div>
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
                    style={{ background: "rgba(9,20,50,0.95)", border: `1px solid rgba(204,41,41,0.5)`, borderRadius: "3px", padding: "4px 10px" }}>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "8px", color: "rgba(143,163,184,0.9)", letterSpacing: "0.1em" }}>ANPR EXTRACT</span>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: RED, fontWeight: 700, letterSpacing: "0.1em" }}>{ANPR_PLATES[type]}</span>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-20 p-3"
                  style={{ background: "linear-gradient(to top, rgba(9,20,50,0.95), transparent)" }}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: RED }} />
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "8px", color: "rgba(231,236,242,0.6)", letterSpacing: "0.1em" }}>REC · FEED {type + 1}</span>
                  </div>
                  <p style={{ color: "rgba(143,163,184,0.8)", fontFamily: "'IBM Plex Mono', monospace", fontSize: "9px" }}>
                    {["Junction 01 – Market St","Junction 02 – Central Ave","Junction 03 – NH-47 Bypass","Junction 04 – Port Road"][type]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison ── */}
      <section className="py-24 bg-grid-dark relative overflow-hidden" style={{ background: DARK }}>
        <div className="radar-sweep-line" style={{ background: "linear-gradient(to right, transparent, rgba(204,41,41,0.05), transparent)" }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-14">
            <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ fontFamily: "'IBM Plex Mono', monospace", color: RED, letterSpacing: "0.18em" }}>Infrastructure Upgrade</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: LIGHT }}>A Smarter Path to Safer Roads.</h2>
          </div>

          <div className="grid lg:grid-cols-[1fr_60px_1fr] gap-6 items-center">
            <div className="rounded-lg p-8" style={{ background: PANEL, border: `1px solid ${DLINE}` }}>
              <h3 className="font-serif text-2xl font-bold mb-7 pb-5" style={{ fontFamily: "'Fraunces', serif", color: MUTED, borderBottom: `1px solid ${DLINE}` }}>Traditional Approach</h3>
              <ul className="space-y-5">
                {[
                  { t: "Replace All Cameras",    d: "New hardware at every junction — major procurement" },
                  { t: "₹15–25L Per Junction",   d: "High capital expenditure before a single frame is processed" },
                  { t: "6–12 Month Rollout",      d: "Procurement, installation, and calibration delays" },
                  { t: "Siloed Systems",           d: "Each junction operates independently, no centralized view" },
                ].map((r, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <div className="mt-1 w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-bold"
                      style={{ background: "#0C2148", color: MUTED }}>×</div>
                    <div>
                      <h4 className="font-medium mb-0.5" style={{ color: LIGHT }}>{r.t}</h4>
                      <p className="text-sm" style={{ color: MUTED }}>{r.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden lg:flex flex-col items-center justify-center gap-3 h-full">
              <div className="flex-1 w-px" style={{ background: DLINE }} />
              <span className="font-mono font-bold text-sm" style={{ fontFamily: "'IBM Plex Mono', monospace", color: MUTED }}>VS</span>
              <div className="flex-1 w-px" style={{ background: DLINE }} />
            </div>

            <div className="rounded-lg p-8 relative" style={{ background: PANEL, border: `2px solid ${RED}` }}>
              <div className="absolute top-0 right-8 -translate-y-1/2 font-mono text-xs font-bold px-3 py-1 rounded-sm uppercase"
                style={{ fontFamily: "'IBM Plex Mono', monospace", background: RED, color: "#fff", letterSpacing: "0.1em" }}>
                Kaaval AI
              </div>
              <h3 className="font-serif text-2xl font-bold mb-7 pb-5" style={{ fontFamily: "'Fraunces', serif", color: "#E7ECF2", borderBottom: `1px solid ${DLINE}` }}>The Modern Upgrade</h3>
              <ul className="space-y-5">
                {[
                  { t: "Reuse Existing CCTV",     d: "Connects to your current cameras via RTSP — no new hardware" },
                  { t: "Fraction of Capital Cost", d: "SaaS model eliminates CapEx — pay per camera per month" },
                  { t: "Weeks, Not Months",         d: "Remote software deployment — operational in days" },
                  { t: "Centralized Command",       d: "All junctions visible in one unified dashboard" },
                ].map((r, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <CheckCircle2 className="mt-1 w-5 h-5 shrink-0" style={{ color: RED }} />
                    <div>
                      <h4 className="font-medium mb-0.5" style={{ color: LIGHT }}>{r.t}</h4>
                      <p className="text-sm" style={{ color: MUTED }}>{r.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Product Tiers ── */}
      <section className="py-24" style={{ background: ALT }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ fontFamily: "'IBM Plex Mono', monospace", color: RED, letterSpacing: "0.18em" }}>Deployment Tiers</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-3" style={{ fontFamily: "'Fraunces', serif", color: INK }}>Choose the Right Tier for Your Junction.</h2>
            <p className="text-base" style={{ color: STEEL }}>Works on existing cameras — no hardware replacement required.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier, idx) => (
              <div key={idx} className="rounded-lg p-7 flex flex-col relative transition-all duration-200"
                style={{
                  background: "#FFFFFF",
                  border: tier.highlight ? `2px solid ${RED}` : `1px solid ${LINE}`,
                  transform: tier.highlight ? "translateY(-6px)" : "none",
                  boxShadow: tier.highlight ? "0 12px 32px rgba(204,41,41,0.1)" : "0 2px 8px rgba(15,30,54,0.04)",
                }}>
                {tier.highlight && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-xs font-bold px-3 py-1 rounded-sm uppercase whitespace-nowrap"
                    style={{ fontFamily: "'IBM Plex Mono', monospace", background: RED, color: "#fff", letterSpacing: "0.1em" }}>
                    Most Popular
                  </div>
                )}
                <div className="w-9 h-9 rounded flex items-center justify-center mb-4"
                  style={{ background: tier.highlight ? "rgba(204,41,41,0.08)" : "rgba(27,58,107,0.07)" }}>
                  <Shield className="w-4 h-4" style={{ color: tier.highlight ? RED : NAV }} />
                </div>
                <p className="font-mono text-xs font-bold uppercase tracking-wider mb-2"
                  style={{ fontFamily: "'IBM Plex Mono', monospace", color: tier.highlight ? RED : NAV, letterSpacing: "0.14em" }}>{tier.name}</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-bold" style={{ color: INK }}>{tier.price}</span>
                  {tier.unit && <span className="text-sm" style={{ color: STEEL }}>{tier.unit}</span>}
                </div>
                <p className="text-sm font-medium mb-5 pb-5" style={{ color: STEEL, borderBottom: `1px solid ${LINE}` }}>{tier.focus}</p>
                <ul className="space-y-3 mb-7 flex-grow">
                  {tier.features.map((f, i) => (
                    <li key={i} className="flex gap-2.5 text-sm items-start" style={{ color: STEEL }}>
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: tier.highlight ? RED : NAV }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full py-3 rounded-sm font-semibold transition-all text-sm"
                  style={tier.highlight ? { background: RED, color: "#fff" } : { background: NAV, color: "#fff" }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                  data-testid={`button-select-tier-${idx}`}>
                  Select {tier.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Case Study ── */}
      <section className="py-24 bg-grid-dark relative overflow-hidden" style={{ background: DARK }}>
        <div className="radar-sweep-line" style={{ background: "linear-gradient(to right, transparent, rgba(204,41,41,0.05), transparent)" }} />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-10">
            <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{ fontFamily: "'IBM Plex Mono', monospace", color: RED, letterSpacing: "0.18em" }}>Live Deployment</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-1" style={{ fontFamily: "'Fraunces', serif", color: LIGHT }}>First Live Deployment</h2>
            <p className="font-mono text-sm flex items-center gap-2" style={{ fontFamily: "'IBM Plex Mono', monospace", color: MUTED }}>
              <MapPin className="w-4 h-4" style={{ color: RED }} />
              Ramanputhur Junction, Kanyakumari District, Tamil Nadu
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-0 rounded-lg overflow-hidden" style={{ border: `1px solid ${DLINE}` }}>
            <div className="flex items-center justify-center p-10 lg:p-14" style={{ background: PANEL, borderRight: `1px solid ${DLINE}` }}>
              <svg viewBox="0 0 240 240" fill="none" className="w-full max-w-[280px]">
                <circle cx="120" cy="120" r="110" stroke={DLINE} strokeWidth="1" />
                <circle cx="120" cy="120" r="70" stroke={DLINE} strokeWidth="1" strokeDasharray="4 5" />
                <line x1="120" y1="10" x2="120" y2="230" stroke={DLINE} strokeWidth="3" />
                <line x1="10" y1="120" x2="230" y2="120" stroke={DLINE} strokeWidth="3" />
                <line x1="40" y1="40" x2="200" y2="200" stroke={DLINE} strokeWidth="2" />
                <rect x="108" y="108" width="24" height="24" stroke={DLINE} strokeWidth="1.5" fill="#0C2148" />
                {[{ cx: 120, cy: 30 }, { cx: 210, cy: 120 }, { cx: 120, cy: 210 }, { cx: 30, cy: 120 }].map((p, i) => (
                  <g key={i}>
                    <circle cx={p.cx} cy={p.cy} r="9" fill={RED} opacity="0.9" />
                    <circle cx={p.cx} cy={p.cy} r="15" fill="none" stroke={RED} strokeWidth="1" opacity="0.25" />
                  </g>
                ))}
                <text x="120" y="135" textAnchor="middle" fill={MUTED} fontSize="8" fontFamily="IBM Plex Mono" letterSpacing="0.1em">KAAVAL CAM</text>
              </svg>
            </div>

            <div className="p-8 lg:p-12" style={{ background: "#0C2148" }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded mb-8"
                style={{ background: "rgba(42,122,90,0.1)", border: "1px solid rgba(42,122,90,0.25)" }}>
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: GREEN }} />
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: GREEN, fontWeight: 700, letterSpacing: "0.14em" }}>PILOT OPERATIONAL</span>
              </div>

              <div className="flex justify-between relative mb-10">
                <div className="absolute top-1.5 left-0 right-0 h-px" style={{ background: DLINE }} />
                {["Concept", "Prototype", "Pilot", "Expansion"].map((step, i) => (
                  <div key={i} className="relative z-10 flex flex-col items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{
                      background: step === "Pilot" ? RED : i < 2 ? MUTED : DLINE,
                      boxShadow: step === "Pilot" ? "0 0 0 4px rgba(204,41,41,0.2)" : "none",
                    }} />
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "9px", letterSpacing: "0.12em", color: step === "Pilot" ? RED : MUTED, fontWeight: step === "Pilot" ? 700 : 400, textTransform: "uppercase" }}>{step}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-5">
                {[
                  { Icon: Activity, t: "Operational Integration", d: "Successfully analyzing 4 independent CCTV feeds concurrently via RTSP streams." },
                  { Icon: FileVideo, t: "Evidence Generation", d: "Automated extraction of high-res violation frames with cropped ANPR plates for officer review." },
                ].map(({ Icon, t, d }, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-9 h-9 rounded flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: "rgba(204,41,41,0.1)", border: "1px solid rgba(204,41,41,0.2)" }}>
                      <Icon className="w-4 h-4" style={{ color: RED }} />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1" style={{ color: LIGHT }}>{t}</h4>
                      <p className="text-sm" style={{ color: MUTED }}>{d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Violation Flow ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ fontFamily: "'IBM Plex Mono', monospace", color: RED, letterSpacing: "0.18em" }}>Enforcement Pipeline</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: INK }}>How a Violation Becomes an Enforcement Record.</h2>
          </div>

          <div className="rounded-xl overflow-hidden" style={{ border: `1px solid ${LINE}` }}>
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-2/5 p-6" style={{ background: ALT, borderRight: `1px solid ${LINE}` }}>
                {violationSteps.map((step, i) => {
                  const active = i === activeStep;
                  return (
                    <button key={i} onClick={() => setActiveStep(i)}
                      className="w-full text-left p-4 rounded-lg flex items-center gap-4 mb-2 last:mb-0 transition-all duration-200"
                      style={{
                        background: active ? "#FFFFFF" : "transparent",
                        border: active ? `1px solid ${LINE}` : "1px solid transparent",
                        borderLeft: active ? `3px solid ${RED}` : `3px solid transparent`,
                        boxShadow: active ? "0 2px 8px rgba(15,30,54,0.06)" : "none",
                      }}
                      data-testid={`button-step-${i}`}>
                      <div className="w-9 h-9 rounded flex items-center justify-center shrink-0"
                        style={{ background: active ? RED : "rgba(27,58,107,0.08)" }}>
                        <step.icon className="w-4 h-4" style={{ color: active ? "#fff" : NAV }} />
                      </div>
                      <div>
                        <div className="font-mono text-[10px] mb-0.5" style={{ fontFamily: "'IBM Plex Mono', monospace", color: active ? RED : STEEL, letterSpacing: "0.12em" }}>STEP 0{i + 1}</div>
                        <div className="font-semibold text-sm" style={{ color: active ? INK : STEEL }}>{step.title}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              <div className="lg:w-3/5 bg-grid-dark flex flex-col items-center justify-center p-10 min-h-[360px] relative overflow-hidden"
                style={{ background: DARK }}>
                <div className="radar-sweep-line" style={{ background: "linear-gradient(to right, transparent, rgba(204,41,41,0.05), transparent)" }} />
                <AnimatePresence mode="wait">
                  <motion.div key={activeStep}
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10 flex flex-col items-center text-center max-w-sm">
                    <div className="w-28 h-28 mb-6">
                      {activeStep === 0 && <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke={RED} strokeWidth="2">
                        <circle cx="28" cy="72" r="12"/><circle cx="72" cy="72" r="12"/>
                        <path d="M28 72 L50 42 L72 72 M50 42 L65 42"/><circle cx="50" cy="27" r="9"/>
                        <rect x="20" y="8" width="60" height="16" rx="3" stroke={DLINE} strokeWidth="1.5" fill="none"/>
                        <path d="M25 16 L75 16" stroke={DLINE} strokeWidth="1" strokeDasharray="4 4"/>
                      </svg>}
                      {activeStep === 1 && <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke={RED} strokeWidth="2">
                        <rect x="20" y="20" width="60" height="60" strokeDasharray="5 3" rx="2"/>
                        <rect x="35" y="35" width="30" height="30" rx="2"/>
                        <path d="M15 50 L25 50 M75 50 L85 50 M50 15 L50 25 M50 75 L50 85" strokeWidth="1.5"/>
                        <circle cx="50" cy="50" r="5" fill={RED}/>
                        <path d="M35 35 L25 25 M65 35 L75 25 M65 65 L75 75 M35 65 L25 75" strokeWidth="1"/>
                      </svg>}
                      {activeStep === 2 && <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke={RED} strokeWidth="2">
                        <rect x="10" y="25" width="75" height="52" rx="4"/><circle cx="48" cy="51" r="11"/>
                        <circle cx="48" cy="51" r="5"/><path d="M85 35 L75 35 M85 45 L75 45 M85 55 L75 55" strokeWidth="1.5"/>
                        <rect x="15" y="62" width="22" height="10" rx="1" fill={DLINE} stroke={RED} strokeWidth="1"/>
                      </svg>}
                      {activeStep === 3 && <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke={RED} strokeWidth="2">
                        <rect x="15" y="20" width="70" height="65" rx="4"/>
                        <path d="M25 35 L75 35 M25 48 L60 48 M25 61 L75 61 M25 74 L50 74" strokeWidth="1.5"/>
                        <circle cx="75" cy="25" r="10" fill={DLINE} strokeWidth="1.5"/>
                        <path d="M70 25 L74 29 L82 19" stroke={RED} strokeWidth="2"/>
                      </svg>}
                      {activeStep === 4 && <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke={RED} strokeWidth="2">
                        <circle cx="50" cy="28" r="14"/><path d="M50 42 L50 65 M36 55 L64 55 M50 65 L38 82 M50 65 L62 82"/>
                        <rect x="20" y="15" width="60" height="80" rx="4" stroke={DLINE} strokeWidth="1.5" fill="none"/>
                        <circle cx="78" cy="78" r="14" fill={DLINE} strokeWidth="1.5"/>
                        <path d="M72 78 L77 83 L85 71" stroke={RED} strokeWidth="2"/>
                      </svg>}
                    </div>
                    <h3 className="font-serif text-2xl font-bold mb-3" style={{ fontFamily: "'Fraunces', serif", color: LIGHT }}>{violationSteps[activeStep].title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: MUTED }}>{violationSteps[activeStep].desc}</p>
                    <div className="mt-8 flex gap-2">
                      {violationSteps.map((_, i) => (
                        <div key={i} className="h-1 rounded-full transition-all duration-300"
                          style={{ width: i === activeStep ? "28px" : "8px", background: i === activeStep ? RED : DLINE }} />
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Built For ── */}
      <section className="py-24" style={{ background: ALT }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ fontFamily: "'IBM Plex Mono', monospace", color: RED, letterSpacing: "0.18em" }}>Designed For</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: INK }}>Built for Public Safety Institutions.</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {institutions.map(({ title, desc, Icon }, i) => (
              <div key={i} className="rounded-lg p-6 text-center transition-all duration-200"
                style={{ background: "#FFFFFF", border: `1px solid ${LINE}` }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = NAV; e.currentTarget.style.boxShadow = "0 4px 16px rgba(27,58,107,0.10)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = LINE; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4"
                  style={{ background: "rgba(27,58,107,0.08)" }}>
                  <Icon className="w-5 h-5" style={{ color: NAV }} />
                </div>
                <h4 className="font-semibold text-sm mb-1" style={{ color: INK }}>{title}</h4>
                <p className="text-xs" style={{ color: STEEL }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── By the Numbers ── */}
      <section id="our-impact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ fontFamily: "'IBM Plex Mono', monospace", color: RED, letterSpacing: "0.18em" }}>Road Safety Context</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: INK }}>The Challenge We're Solving.</h2>
            <p className="mt-3 text-sm" style={{ color: STEEL }}>Contextual road-safety data — not Kaaval's own claimed results.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { end: 56,  suffix: "%",  label: "Of road fatalities involve two-wheelers", src: "MoRTH 2022" },
              { end: 470, suffix: "K+", label: "Road accident deaths in India over 5 years", src: "NCRB 2022" },
              { end: 24,  suffix: "/7", label: "Monitoring capability per deployed junction", src: "Platform spec" },
              { end: 1,   suffix: "",   label: "Unified platform for detection, evidence & enforcement", src: "Kaaval" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center p-6 rounded-xl" style={{ background: ALT }}>
                <div className="font-serif text-5xl lg:text-6xl font-black mb-3"
                  style={{ fontFamily: "'Fraunces', serif", color: RED }}>
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} />
                </div>
                <p className="font-mono text-xs uppercase tracking-wider font-bold mb-2 text-center"
                  style={{ fontFamily: "'IBM Plex Mono', monospace", color: INK, letterSpacing: "0.1em" }}>{stat.label}</p>
                <span className="font-mono text-xs" style={{ color: STEEL, fontFamily: "'IBM Plex Mono', monospace" }}>— {stat.src}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className="py-32 bg-grid-dark relative overflow-hidden text-center" style={{ background: DARK }}>
        <div className="radar-sweep-line" style={{ background: "linear-gradient(to right, transparent, rgba(204,41,41,0.06), transparent)" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07111F] via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center gap-8">
          <h2 className="font-serif font-black leading-tight" style={{ fontFamily: "'Fraunces', serif", color: LIGHT, fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Imagine a District With Zero Preventable Road Fatalities.
          </h2>
          <button className="font-bold text-lg px-10 py-5 rounded-sm transition-all text-white"
            style={{ background: RED }}
            onMouseEnter={e => { e.currentTarget.style.background = "#E03333"; e.currentTarget.style.transform = "scale(1.03)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = RED; e.currentTarget.style.transform = "scale(1)"; }}
            data-testid="button-request-pilot-footer">
            Request Pilot Deployment
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: "#07111F", borderTop: `1px solid ${DLINE}` }} className="py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-5">
          <div className="flex items-center gap-2.5">
            <Shield className="w-6 h-6" style={{ color: LIGHT }} />
            <span className="font-serif font-bold text-lg" style={{ fontFamily: "'Fraunces', serif", color: LIGHT }}>KAAVAL AI</span>
          </div>
          <div className="flex flex-wrap gap-5 text-sm justify-center" style={{ color: MUTED }}>
            <a href="#" className="transition-colors" style={{ color: MUTED }}
              onMouseEnter={e => (e.currentTarget.style.color = LIGHT)} onMouseLeave={e => (e.currentTarget.style.color = MUTED)}>Privacy Policy</a>
            <a href="#" className="transition-colors" style={{ color: MUTED }}
              onMouseEnter={e => (e.currentTarget.style.color = LIGHT)} onMouseLeave={e => (e.currentTarget.style.color = MUTED)}>Contact</a>
            <span>contact@kaaval.ai</span>
            <span>Kanyakumari, TN, India</span>
          </div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: "rgba(143,163,184,0.45)", letterSpacing: "0.06em" }}>
            © {new Date().getFullYear()} Kaaval AI
          </div>
        </div>
      </footer>

    </div>
  );
}
