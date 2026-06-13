import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Shield, CheckCircle2, Users, MapPin, Radio, Activity,
  Eye, FileVideo, ShieldAlert, Cpu, Building2, Landmark
} from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ─────────────────── helpers ────────────────────── */

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
  return { ref, style: { opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s` } };
}

/* ─────────────────── road SVGs ──────────────────── */

const RoadSVG = ({ type }: { type: number }) => {
  const roadFill = "rgba(42,63,95,0.55)";
  const laneStroke = "rgba(92,113,135,0.55)";
  const markingStroke = "rgba(92,113,135,0.8)";

  if (type === 0) return (
    /* 4-way intersection */
    <svg viewBox="0 0 160 120" className="w-full h-full" fill="none">
      <rect x="55" y="0" width="50" height="120" fill={roadFill} />
      <rect x="0" y="35" width="160" height="50" fill={roadFill} />
      <line x1="80" y1="0" x2="80" y2="30" stroke={laneStroke} strokeWidth="1.2" strokeDasharray="5 4" />
      <line x1="80" y1="90" x2="80" y2="120" stroke={laneStroke} strokeWidth="1.2" strokeDasharray="5 4" />
      <line x1="0" y1="60" x2="50" y2="60" stroke={laneStroke} strokeWidth="1.2" strokeDasharray="5 4" />
      <line x1="110" y1="60" x2="160" y2="60" stroke={laneStroke} strokeWidth="1.2" strokeDasharray="5 4" />
      <line x1="55" y1="35" x2="105" y2="35" stroke={markingStroke} strokeWidth="1" />
      <line x1="55" y1="85" x2="105" y2="85" stroke={markingStroke} strokeWidth="1" />
      <line x1="55" y1="35" x2="55" y2="85" stroke={markingStroke} strokeWidth="1" />
      <line x1="105" y1="35" x2="105" y2="85" stroke={markingStroke} strokeWidth="1" />
      {[0,1,2,3,4].map(i => <rect key={i} x="55" y={36+i*6} width="5" height="3" fill={markingStroke} opacity="0.7" />)}
      {[0,1,2,3,4].map(i => <rect key={i} x="100" y={36+i*6} width="5" height="3" fill={markingStroke} opacity="0.7" />)}
      <circle cx="44" cy="52" r="4" fill="rgba(230,210,160,0.55)" />
      <rect x="39" y="46" width="10" height="6" rx="1" fill="rgba(230,210,160,0.3)" />
    </svg>
  );

  if (type === 1) return (
    /* T-junction — horizontal + vertical from bottom */
    <svg viewBox="0 0 160 120" className="w-full h-full" fill="none">
      <rect x="0" y="40" width="160" height="45" fill={roadFill} />
      <rect x="60" y="85" width="40" height="35" fill={roadFill} />
      <line x1="0" y1="62" x2="55" y2="62" stroke={laneStroke} strokeWidth="1.2" strokeDasharray="5 4" />
      <line x1="105" y1="62" x2="160" y2="62" stroke={laneStroke} strokeWidth="1.2" strokeDasharray="5 4" />
      <line x1="80" y1="90" x2="80" y2="120" stroke={laneStroke} strokeWidth="1.2" strokeDasharray="5 4" />
      <line x1="60" y1="85" x2="100" y2="85" stroke={markingStroke} strokeWidth="1.2" />
      {[0,1,2,3,4].map(i => <rect key={i} x="62" y={87+i*5} width="5" height="3" fill={markingStroke} opacity="0.65" />)}
      {[0,1,2,3,4].map(i => <rect key={i} x="93" y={87+i*5} width="5" height="3" fill={markingStroke} opacity="0.65" />)}
      <path d="M125 53 L135 53 M131 49 L135 53 L131 57" stroke={markingStroke} strokeWidth="1.2" />
      <circle cx="32" cy="55" r="4" fill="rgba(230,210,160,0.55)" />
      <rect x="27" y="49" width="10" height="6" rx="1" fill="rgba(230,210,160,0.3)" />
    </svg>
  );

  if (type === 2) return (
    /* Y / fork junction */
    <svg viewBox="0 0 160 120" className="w-full h-full" fill="none">
      <rect x="55" y="0" width="45" height="55" fill={roadFill} />
      <polygon points="55,55 100,55 160,120 110,120" fill={roadFill} />
      <polygon points="55,55 10,120 55,120 100,55" fill={roadFill} />
      <line x1="77" y1="0" x2="77" y2="50" stroke={laneStroke} strokeWidth="1.2" strokeDasharray="5 4" />
      <line x1="60" y1="60" x2="20" y2="120" stroke={laneStroke} strokeWidth="1.2" strokeDasharray="5 4" />
      <line x1="96" y1="60" x2="136" y2="120" stroke={laneStroke} strokeWidth="1.2" strokeDasharray="5 4" />
      <circle cx="77" cy="55" r="8" stroke={markingStroke} strokeWidth="1" strokeDasharray="3 3" fill="none" />
      <circle cx="77" cy="28" r="5" fill="rgba(230,210,160,0.5)" />
      <rect x="72" y="22" width="10" height="6" rx="1" fill="rgba(230,210,160,0.25)" />
    </svg>
  );

  return (
    /* Highway on-ramp / curved merge */
    <svg viewBox="0 0 160 120" className="w-full h-full" fill="none">
      <rect x="0" y="45" width="160" height="45" fill={roadFill} />
      <path d="M130 0 Q145 0 145 20 L145 45" stroke={roadFill} strokeWidth="28" fill="none" />
      <line x1="0" y1="67" x2="125" y2="67" stroke={laneStroke} strokeWidth="1.2" strokeDasharray="6 5" />
      <line x1="135" y1="67" x2="160" y2="67" stroke={laneStroke} strokeWidth="1.2" strokeDasharray="6 5" />
      <path d="M130 45 Q145 45 145 20" stroke={markingStroke} strokeWidth="1" strokeDasharray="4 3" fill="none" />
      <line x1="0" y1="45" x2="160" y2="45" stroke={markingStroke} strokeWidth="0.8" opacity="0.5" />
      <line x1="0" y1="90" x2="160" y2="90" stroke={markingStroke} strokeWidth="0.8" opacity="0.5" />
      {[0,1,2,3,4,5,6].map(i => <rect key={i} x={10+i*22} y="46" width="7" height="3" fill={markingStroke} opacity="0.5" />)}
      <circle cx="55" cy="59" r="4" fill="rgba(230,210,160,0.55)" />
      <rect x="50" y="53" width="10" height="6" rx="1" fill="rgba(230,210,160,0.3)" />
    </svg>
  );
};

/* ─────────────────── camera tile ────────────────── */

const ANPR_PLATES = ["TN 32 AB 1234", "KL 01 CD 5678", "TN 74 EF 9012", "KL 58 GH 3456"];

function CameraFeedTile({ label, roadType, scanClass, isActive, onClick }: {
  label: string;
  roadType: number;
  scanClass: string;
  isActive: boolean;
  onClick: () => void;
}) {
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false });

  return (
    <div
      className="relative rounded overflow-hidden aspect-video cursor-pointer select-none"
      style={{ background: "#0A1628", border: isActive ? "1px solid rgba(201,162,74,0.6)" : "1px solid rgba(42,63,95,0.7)" }}
      onClick={onClick}
      data-testid={`camera-tile-${roadType}`}
    >
      {/* Road illustration */}
      <div className="absolute inset-0 p-1 opacity-90">
        <RoadSVG type={roadType} />
      </div>

      {/* Scan line */}
      <div className={`scan-line ${scanClass}`} />

      {/* REC indicator top-left */}
      <div className="absolute top-2 left-2 flex items-center gap-1 z-20">
        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "8px", color: "rgba(231,236,242,0.7)", letterSpacing: "0.08em" }}>REC</span>
      </div>

      {/* Timestamp top-right */}
      <div className="absolute top-2 right-2 z-20">
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "8px", color: "rgba(143,163,184,0.8)", letterSpacing: "0.05em" }}>{timeStr}</span>
      </div>

      {/* Active detection overlay */}
      {isActive && (
        <div className="detection-box absolute inset-0 z-30 flex flex-col items-center justify-center">
          <div className="relative" style={{ width: "44%", height: "44%" }}>
            <div className="absolute inset-0 border-2 rounded-sm" style={{ borderColor: "#C9A24A" }}>
              <div className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 rounded-tl-sm" style={{ borderColor: "#C9A24A" }} />
              <div className="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 rounded-tr-sm" style={{ borderColor: "#C9A24A" }} />
              <div className="absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 rounded-bl-sm" style={{ borderColor: "#C9A24A" }} />
              <div className="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 rounded-br-sm" style={{ borderColor: "#C9A24A" }} />
            </div>
            <div className="absolute -top-5 left-0 right-0 flex justify-center">
              <span style={{ background: "#C9A24A", color: "#0A1628", fontFamily: "'IBM Plex Mono', monospace", fontSize: "8px", fontWeight: 700, padding: "1px 5px", borderRadius: "2px", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
                NO HELMET
              </span>
            </div>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center" style={{ background: "rgba(10,22,40,0.92)", border: "1px solid rgba(201,162,74,0.4)", borderRadius: "3px", padding: "3px 8px" }}>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "7px", color: "rgba(143,163,184,0.9)", letterSpacing: "0.1em" }}>ANPR</span>
            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: "#C9A24A", fontWeight: 600, letterSpacing: "0.08em" }}>{ANPR_PLATES[roadType]}</span>
          </div>
        </div>
      )}

      {/* Label bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-20" style={{ background: "linear-gradient(to top, rgba(10,22,40,0.95), transparent)", padding: "10px 8px 5px" }}>
        <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "9px", color: "rgba(231,236,242,0.85)", letterSpacing: "0.06em" }}>{label}</span>
      </div>
    </div>
  );
}

/* ─────────────────── main page ──────────────────── */

const violationSteps = [
  { title: "Motorcycle Detected", icon: Eye, desc: "Camera identifies a two-wheeler entering the monitored zone.", ill: "motorcycle" },
  { title: "Violation Identified", icon: Cpu, desc: "AI model confirms the rider is not wearing a helmet.", ill: "ai" },
  { title: "Evidence Captured", icon: FileVideo, desc: "High-res violation frame and cropped ANPR plate stored securely.", ill: "evidence" },
  { title: "Alert Logged", icon: ShieldAlert, desc: "Timestamped record created in the enforcement management system.", ill: "alert" },
  { title: "Officer Review", icon: Shield, desc: "Assigned officer reviews the validated alert and takes action.", ill: "review" },
];

const tiers = [
  { name: "Essential", price: "₹2,999", unit: "/ cam / mo", focus: "Helmet Detection", features: ["Real-time helmet violation detection", "Daily summary reports", "Existing CCTV compatible", "Standard email support"], highlight: false },
  { name: "Standard", price: "₹4,999", unit: "/ cam / mo", focus: "Helmet + ANPR", features: ["Helmet violation detection", "Number plate recognition", "Automated evidence capture", "Priority support"], highlight: false },
  { name: "Advanced", price: "₹7,999", unit: "/ cam / mo", focus: "Full Violation Suite", features: ["Triple-riding detection", "Wrong-way driving alerts", "Live analytics dashboard", "E-challan integration", "Dedicated account manager"], highlight: true },
  { name: "Enterprise", price: "Custom", unit: "", focus: "District Rollout", features: ["Centralized command center", "Unlimited camera integrations", "Custom AI model training", "On-premise deployment", "24/7 SLA support"], highlight: false },
];

const institutions = [
  { title: "Police Departments", desc: "Frontline violation enforcement", Icon: Shield },
  { title: "District Administration", desc: "Policy oversight and reporting", Icon: Landmark },
  { title: "Smart City Missions", desc: "Integrated urban safety infrastructure", Icon: Building2 },
  { title: "Highway Authorities", desc: "Corridor and bypass monitoring", Icon: MapPin },
  { title: "Municipal Corporations", desc: "Urban traffic management", Icon: Activity },
];

export default function Home() {
  const [heroIdx, setHeroIdx] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [activeDetectionTile, setActiveDetectionTile] = useState(0);
  const [scrolled, setScrolled] = useState(false);

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

  const heroFade = useFadeUp(0);
  const commandFade = useFadeUp(0.2);

  return (
    <div className="min-h-screen bg-white text-[#14213D] font-sans overflow-x-hidden selection:bg-[#C9A24A] selection:text-[#14213D]">

      {/* ── Navigation ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: scrolled ? "1px solid #DCE3EC" : "1px solid transparent",
          boxShadow: scrolled ? "0 1px 12px rgba(20,33,61,0.07)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-18 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-7 h-7" style={{ color: "#C9A24A" }} />
            <span className="font-serif font-bold text-xl tracking-tight" style={{ color: "#C9A24A", fontFamily: "'Fraunces', serif" }}>KAAVAL AI</span>
          </div>
          <div className="flex items-center gap-8">
            <a href="#our-impact" className="text-sm font-medium transition-colors hidden sm:block" style={{ color: "#5A6B85" }} onMouseEnter={e => (e.currentTarget.style.color = "#14213D")} onMouseLeave={e => (e.currentTarget.style.color = "#5A6B85")}>
              Our Impact
            </a>
            <button
              className="font-semibold px-6 py-2.5 rounded-sm transition-all text-sm"
              style={{ background: "#C9A24A", color: "#14213D" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#E6D2A0")}
              onMouseLeave={e => (e.currentTarget.style.background = "#C9A24A")}
              data-testid="button-request-pilot-nav"
            >
              Request Pilot Deployment
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-screen flex items-center bg-grid-light bg-white pt-20">
        <div className="radar-sweep-line" style={{ background: "linear-gradient(to right, transparent, rgba(27,79,114,0.06), transparent)" }} />
        <div className="max-w-7xl mx-auto w-full px-6 py-16 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left copy */}
          <div ref={heroFade.ref} style={heroFade.style} className="flex flex-col items-start gap-7">
            <div
              className="border font-mono text-xs font-medium tracking-widest px-3 py-1.5 rounded-full uppercase"
              style={{ borderColor: "#C9A24A", color: "#C9A24A", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.18em" }}
            >
              Smart City Initiative
            </div>

            <div className="relative h-[130px] sm:h-[160px] w-full">
              {heroTexts.map((text, i) => (
                <h1
                  key={i}
                  className="absolute top-0 left-0 font-serif font-black leading-tight"
                  style={{
                    fontFamily: "'Fraunces', serif",
                    fontSize: "clamp(2.4rem, 5vw, 4rem)",
                    color: "#14213D",
                    opacity: i === heroIdx ? 1 : 0,
                    transition: "opacity 0.6s ease",
                    whiteSpace: "pre-line",
                  }}
                >
                  {text}.
                </h1>
              ))}
            </div>

            <p className="text-lg leading-relaxed max-w-lg" style={{ color: "#5A6B85" }}>
              Transforming existing CCTV infrastructure into proactive safety networks — institutional-grade helmet detection and ANPR for police departments aiming for accident-free roads.
            </p>

            <div className="pl-5 py-2 border-l-[3px]" style={{ borderColor: "#C9A24A" }}>
              <p className="text-xs font-mono uppercase tracking-widest mb-2" style={{ color: "#C9A24A", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: "0.15em" }}>Contextual Mandate</p>
              <p className="font-medium italic text-base leading-snug" style={{ color: "#14213D" }}>
                "56% of road fatalities in India involve two-wheelers — the majority not wearing helmets."
              </p>
              <p className="text-xs mt-1 not-italic" style={{ color: "#5A6B85" }}>— Ministry of Road Transport & Highways, 2022</p>
            </div>

            <div className="flex flex-wrap items-center gap-4 mt-1">
              <button
                className="font-semibold px-8 py-4 rounded-sm transition-all text-base"
                style={{ background: "#C9A24A", color: "#14213D" }}
                onMouseEnter={e => (e.currentTarget.style.background = "#E6D2A0")}
                onMouseLeave={e => (e.currentTarget.style.background = "#C9A24A")}
                data-testid="button-request-pilot-hero"
              >
                Request Pilot Deployment
              </button>
              <button
                className="font-medium px-8 py-4 rounded-sm transition-all text-base border"
                style={{ borderColor: "#DCE3EC", color: "#14213D" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#1B4F72"; e.currentTarget.style.color = "#1B4F72"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "#DCE3EC"; e.currentTarget.style.color = "#14213D"; }}
                data-testid="button-view-case-study"
              >
                View Case Study
              </button>
            </div>
          </div>

          {/* Command Center panel — the one dark island */}
          <div
            ref={commandFade.ref}
            style={{ ...commandFade.style, background: "#0A1628", border: "1px solid #2A3F5F", borderRadius: "10px", boxShadow: "0 24px 60px rgba(10,22,40,0.22), 0 0 0 1px rgba(201,162,74,0.08)" }}
            className="p-5 shadow-2xl hidden sm:block"
          >
            {/* Header row */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#2E8B6F" }} />
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: "#2E8B6F", letterSpacing: "0.14em", fontWeight: 500 }}>LIVE</span>
              </div>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "10px", color: "#8FA3B8", letterSpacing: "0.12em" }}>KAAVAL COMMAND CENTER</span>
            </div>

            {/* 2×2 feed grid */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {[
                { label: "Junction 01 – Market St", road: 0 },
                { label: "Junction 02 – Central Ave", road: 1 },
                { label: "Junction 03 – NH-47 Bypass", road: 2 },
                { label: "Junction 04 – Port Road", road: 3 },
              ].map((feed, idx) => (
                <CameraFeedTile
                  key={idx}
                  label={feed.label}
                  roadType={feed.road}
                  scanClass={`scan-line-${idx + 1}`}
                  isActive={activeDetectionTile === idx}
                  onClick={() => setActiveDetectionTile(idx)}
                />
              ))}
            </div>

            {/* Status bar */}
            <div
              className="px-3 py-2 rounded flex items-center justify-between"
              style={{ background: "#0F2138", border: "1px solid #2A3F5F" }}
            >
              {["AI PROCESSING: 4 FEEDS", "DETECTION RATE: 99.2%", "LAST ALERT: 2s AGO"].map((s, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <span style={{ color: "#2A3F5F" }}>·</span>}
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "9px", color: "#8FA3B8", letterSpacing: "0.07em" }}>{s}</span>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Bar ── */}
      <section style={{ background: "#F4F6F9", borderTop: "1px solid #DCE3EC", borderBottom: "1px solid #DCE3EC" }} className="py-5">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-3 lg:gap-6">
          {["Police Department Pilot", "Smart City Ready", "Existing CCTV Compatible", "Rapid Deployment", "Govt. Approved Standards"].map((b, i) => (
            <div key={i} className="border px-4 py-1.5 rounded-full font-mono text-xs tracking-wider uppercase whitespace-nowrap" style={{ fontFamily: "'IBM Plex Mono', monospace", borderColor: "#C9A24A", color: "#1B4F72", background: "rgba(201,162,74,0.06)", letterSpacing: "0.1em" }}>
              {b}
            </div>
          ))}
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-4">
            <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#C9A24A", letterSpacing: "0.18em" }}>AI Detection Pipeline</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: "#14213D" }}>From Camera Feed to Enforcement Action.</h2>
          </div>
          <p className="text-center text-sm mb-12" style={{ color: "#5A6B85", fontFamily: "'IBM Plex Mono', monospace" }}>Hover any feed to preview AI detection in action</p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[0, 1, 2, 3].map((type) => (
              <div key={type} className="relative overflow-hidden group cursor-crosshair rounded-lg" style={{ aspectRatio: "3/4", background: "#0A1628", border: "1px solid #2A3F5F" }}>
                <div className="absolute inset-0 p-2 opacity-80">
                  <RoadSVG type={type} />
                </div>
                <div className={`scan-line scan-line-${type + 1}`} />

                {/* Hover detection overlay */}
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="relative" style={{ width: "45%", height: "38%" }}>
                    <div className="absolute inset-0 border-2 rounded-sm" style={{ borderColor: "#C9A24A" }}>
                      <div className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2" style={{ borderColor: "#C9A24A" }} />
                      <div className="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2" style={{ borderColor: "#C9A24A" }} />
                      <div className="absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2" style={{ borderColor: "#C9A24A" }} />
                      <div className="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2" style={{ borderColor: "#C9A24A" }} />
                    </div>
                    <div className="absolute -top-5 left-0 right-0 flex justify-center">
                      <span style={{ background: "#C9A24A", color: "#0A1628", fontFamily: "'IBM Plex Mono', monospace", fontSize: "9px", fontWeight: 700, padding: "1px 6px", borderRadius: "2px", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>NO HELMET</span>
                    </div>
                  </div>
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center" style={{ background: "rgba(10,22,40,0.95)", border: "1px solid rgba(201,162,74,0.45)", borderRadius: "3px", padding: "4px 10px" }}>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "8px", color: "rgba(143,163,184,0.9)", letterSpacing: "0.1em" }}>ANPR EXTRACT</span>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: "#C9A24A", fontWeight: 600, letterSpacing: "0.1em" }}>{ANPR_PLATES[type]}</span>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 z-20 p-3" style={{ background: "linear-gradient(to top, rgba(10,22,40,0.95), transparent)" }}>
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "8px", color: "rgba(231,236,242,0.6)", letterSpacing: "0.1em" }}>REC · FEED {type + 1}</span>
                  </div>
                  <p className="font-mono text-xs" style={{ color: "rgba(143,163,184,0.8)", fontFamily: "'IBM Plex Mono', monospace", fontSize: "9px" }}>
                    {["Junction 01 – Market St", "Junction 02 – Central Ave", "Junction 03 – NH-47 Bypass", "Junction 04 – Port Road"][type]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison ── */}
      <section className="py-24 bg-grid-dark relative overflow-hidden" style={{ background: "#14213D" }}>
        <div className="radar-sweep-line" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-14">
            <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#C9A24A", letterSpacing: "0.18em" }}>Infrastructure Upgrade</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: "#E7ECF2" }}>A Smarter Path to Safer Roads.</h2>
          </div>

          <div className="grid lg:grid-cols-[1fr_60px_1fr] gap-6 items-center">
            <div className="rounded-lg p-8" style={{ background: "#0F2138", border: "1px solid #2A3F5F" }}>
              <h3 className="font-serif text-2xl font-bold mb-7 pb-5" style={{ fontFamily: "'Fraunces', serif", color: "#8FA3B8", borderBottom: "1px solid #2A3F5F" }}>Traditional Approach</h3>
              <ul className="space-y-5">
                {[
                  { t: "Replace All Cameras", d: "New hardware at every junction — major procurement" },
                  { t: "₹15–25L Per Junction", d: "High capital expenditure before a single frame is processed" },
                  { t: "6–12 Month Rollout", d: "Procurement, installation, and calibration delays" },
                  { t: "Siloed Systems", d: "Each junction operates independently, no centralized view" },
                ].map((r, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <div className="mt-1 w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs font-bold" style={{ background: "#16304F", color: "#5A6B85" }}>×</div>
                    <div>
                      <h4 className="font-medium mb-0.5" style={{ color: "#E7ECF2" }}>{r.t}</h4>
                      <p className="text-sm" style={{ color: "#8FA3B8" }}>{r.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden lg:flex flex-col items-center justify-center gap-3">
              <div className="flex-1 w-px" style={{ background: "#2A3F5F" }} />
              <span className="font-mono font-bold text-sm" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#5A6B85" }}>VS</span>
              <div className="flex-1 w-px" style={{ background: "#2A3F5F" }} />
            </div>

            <div className="rounded-lg p-8 relative" style={{ background: "#0F2138", border: "2px solid #C9A24A" }}>
              <div className="absolute top-0 right-8 -translate-y-1/2 font-mono text-xs font-bold px-3 py-1 rounded-sm uppercase" style={{ fontFamily: "'IBM Plex Mono', monospace", background: "#C9A24A", color: "#14213D", letterSpacing: "0.1em" }}>Kaaval AI</div>
              <h3 className="font-serif text-2xl font-bold mb-7 pb-5" style={{ fontFamily: "'Fraunces', serif", color: "#C9A24A", borderBottom: "1px solid #2A3F5F" }}>The Modern Upgrade</h3>
              <ul className="space-y-5">
                {[
                  { t: "Reuse Existing CCTV", d: "Connects to your current cameras via RTSP — no new hardware" },
                  { t: "Fraction of Capital Cost", d: "SaaS model eliminates CapEx — pay per camera per month" },
                  { t: "Weeks, Not Months", d: "Remote software deployment — operational in days" },
                  { t: "Centralized Command", d: "All junctions visible in one unified dashboard" },
                ].map((r, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <CheckCircle2 className="mt-1 w-5 h-5 shrink-0" style={{ color: "#C9A24A" }} />
                    <div>
                      <h4 className="font-medium mb-0.5" style={{ color: "#E7ECF2" }}>{r.t}</h4>
                      <p className="text-sm" style={{ color: "#8FA3B8" }}>{r.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Product Tiers ── */}
      <section className="py-24" style={{ background: "#F4F6F9" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#C9A24A", letterSpacing: "0.18em" }}>Deployment Tiers</p>
            <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-3" style={{ fontFamily: "'Fraunces', serif", color: "#14213D" }}>Choose the Right Tier for Your Junction.</h2>
            <p className="text-base" style={{ color: "#5A6B85" }}>Works on existing cameras — no hardware replacement required.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier, idx) => (
              <div
                key={idx}
                className="rounded-lg p-7 flex flex-col relative transition-all duration-200"
                style={{
                  background: "#FFFFFF",
                  border: tier.highlight ? "2px solid #C9A24A" : "1px solid #DCE3EC",
                  transform: tier.highlight ? "translateY(-6px)" : "none",
                  boxShadow: tier.highlight ? "0 12px 32px rgba(201,162,74,0.12)" : "0 2px 8px rgba(20,33,61,0.04)",
                }}
              >
                {tier.highlight && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-xs font-bold px-3 py-1 rounded-sm uppercase whitespace-nowrap" style={{ fontFamily: "'IBM Plex Mono', monospace", background: "#C9A24A", color: "#14213D", letterSpacing: "0.1em" }}>
                    Most Popular
                  </div>
                )}
                <div className="w-9 h-9 rounded flex items-center justify-center mb-4" style={{ background: tier.highlight ? "rgba(201,162,74,0.12)" : "rgba(27,79,114,0.08)" }}>
                  <Shield className="w-4 h-4" style={{ color: tier.highlight ? "#C9A24A" : "#1B4F72" }} />
                </div>
                <p className="font-mono text-xs font-bold uppercase tracking-wider mb-2" style={{ fontFamily: "'IBM Plex Mono', monospace", color: tier.highlight ? "#C9A24A" : "#1B4F72", letterSpacing: "0.14em" }}>{tier.name}</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-bold" style={{ color: "#14213D" }}>{tier.price}</span>
                  {tier.unit && <span className="text-sm" style={{ color: "#5A6B85" }}>{tier.unit}</span>}
                </div>
                <p className="text-sm font-medium mb-5 pb-5" style={{ color: "#5A6B85", borderBottom: "1px solid #DCE3EC" }}>{tier.focus}</p>
                <ul className="space-y-3 mb-7 flex-grow">
                  {tier.features.map((f, i) => (
                    <li key={i} className="flex gap-2.5 text-sm items-start" style={{ color: "#5A6B85" }}>
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" style={{ color: tier.highlight ? "#C9A24A" : "#1B4F72" }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className="w-full py-3 rounded-sm font-semibold transition-all text-sm"
                  style={tier.highlight
                    ? { background: "#C9A24A", color: "#14213D" }
                    : { background: "#14213D", color: "#E7ECF2" }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                  data-testid={`button-select-tier-${idx}`}
                >
                  Select {tier.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Case Study ── */}
      <section className="py-24 bg-grid-dark relative overflow-hidden" style={{ background: "#14213D" }}>
        <div className="radar-sweep-line" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-10">
            <p className="font-mono text-xs uppercase tracking-widest mb-2" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#C9A24A", letterSpacing: "0.18em" }}>Live Deployment</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-1" style={{ fontFamily: "'Fraunces', serif", color: "#E7ECF2" }}>First Live Deployment</h2>
            <p className="font-mono text-sm flex items-center gap-2" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#8FA3B8" }}>
              <MapPin className="w-4 h-4" style={{ color: "#C9A24A" }} />
              Ramanputhur Junction, Kanyakumari District, Tamil Nadu
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-0 rounded-lg overflow-hidden" style={{ border: "1px solid #2A3F5F" }}>
            <div className="flex items-center justify-center p-10 lg:p-14" style={{ background: "#0A1628", borderRight: "1px solid #2A3F5F" }}>
              <svg viewBox="0 0 240 240" fill="none" className="w-full max-w-[280px]">
                <circle cx="120" cy="120" r="110" stroke="#2A3F5F" strokeWidth="1" />
                <circle cx="120" cy="120" r="70" stroke="#2A3F5F" strokeWidth="1" strokeDasharray="4 5" />
                <line x1="120" y1="10" x2="120" y2="230" stroke="#2A3F5F" strokeWidth="3" />
                <line x1="10" y1="120" x2="230" y2="120" stroke="#2A3F5F" strokeWidth="3" />
                <line x1="40" y1="40" x2="200" y2="200" stroke="#2A3F5F" strokeWidth="2" />
                <rect x="108" y="108" width="24" height="24" stroke="#2A3F5F" strokeWidth="1.5" fill="#16304F" />
                {/* Camera markers */}
                {[
                  { cx: 120, cy: 30 },
                  { cx: 210, cy: 120 },
                  { cx: 120, cy: 210 },
                  { cx: 30, cy: 120 },
                ].map((p, i) => (
                  <g key={i}>
                    <circle cx={p.cx} cy={p.cy} r="9" fill="#C9A24A" opacity="0.9" />
                    <circle cx={p.cx} cy={p.cy} r="15" fill="none" stroke="#C9A24A" strokeWidth="1" opacity="0.3" />
                  </g>
                ))}
                <text x="120" y="135" textAnchor="middle" fill="#5A6B85" fontSize="8" fontFamily="IBM Plex Mono" letterSpacing="0.1em">KAAVAL CAM</text>
              </svg>
            </div>

            <div className="p-8 lg:p-12" style={{ background: "#0F2138" }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded mb-8" style={{ background: "rgba(46,139,111,0.1)", border: "1px solid rgba(46,139,111,0.25)" }}>
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#2E8B6F" }} />
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: "#2E8B6F", fontWeight: 700, letterSpacing: "0.14em" }}>PILOT OPERATIONAL</span>
              </div>

              <div className="flex justify-between relative mb-10">
                <div className="absolute top-1.5 left-0 right-0 h-px" style={{ background: "#2A3F5F" }} />
                {["Concept", "Prototype", "Pilot", "Expansion"].map((step, i) => (
                  <div key={i} className="relative z-10 flex flex-col items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: step === "Pilot" ? "#C9A24A" : i < 2 ? "#5A6B85" : "#2A3F5F", boxShadow: step === "Pilot" ? "0 0 0 4px rgba(201,162,74,0.2)" : "none" }} />
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "9px", letterSpacing: "0.12em", color: step === "Pilot" ? "#C9A24A" : "#8FA3B8", fontWeight: step === "Pilot" ? 700 : 400, textTransform: "uppercase" }}>{step}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-5">
                {[
                  { Icon: Activity, title: "Operational Integration", desc: "Successfully analyzing 4 independent CCTV feeds concurrently via RTSP streams." },
                  { Icon: FileVideo, title: "Evidence Generation", desc: "Automated extraction of high-res violation frames with cropped ANPR plates for officer review." },
                ].map(({ Icon, title, desc }, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-9 h-9 rounded flex items-center justify-center shrink-0 mt-0.5" style={{ background: "rgba(201,162,74,0.1)", border: "1px solid rgba(201,162,74,0.2)" }}>
                      <Icon className="w-4 h-4" style={{ color: "#C9A24A" }} />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1" style={{ color: "#E7ECF2" }}>{title}</h4>
                      <p className="text-sm" style={{ color: "#8FA3B8" }}>{desc}</p>
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
            <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#C9A24A", letterSpacing: "0.18em" }}>Enforcement Pipeline</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: "#14213D" }}>How a Violation Becomes an Enforcement Record.</h2>
          </div>

          <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #DCE3EC" }}>
            <div className="flex flex-col lg:flex-row">
              {/* Step nav */}
              <div className="lg:w-2/5 p-6" style={{ background: "#F4F6F9", borderRight: "1px solid #DCE3EC" }}>
                {violationSteps.map((step, i) => {
                  const active = i === activeStep;
                  return (
                    <button
                      key={i}
                      onClick={() => setActiveStep(i)}
                      className="w-full text-left p-4 rounded-lg flex items-center gap-4 mb-2 last:mb-0 transition-all duration-200"
                      style={{
                        background: active ? "#FFFFFF" : "transparent",
                        border: active ? "1px solid #DCE3EC" : "1px solid transparent",
                        borderLeft: active ? "3px solid #C9A24A" : "3px solid transparent",
                        boxShadow: active ? "0 2px 8px rgba(20,33,61,0.06)" : "none",
                      }}
                      data-testid={`button-step-${i}`}
                    >
                      <div className="w-9 h-9 rounded flex items-center justify-center shrink-0" style={{ background: active ? "#C9A24A" : "rgba(27,79,114,0.08)" }}>
                        <step.icon className="w-4 h-4" style={{ color: active ? "#14213D" : "#1B4F72" }} />
                      </div>
                      <div>
                        <div className="font-mono text-[10px] mb-0.5" style={{ fontFamily: "'IBM Plex Mono', monospace", color: active ? "#C9A24A" : "#5A6B85", letterSpacing: "0.12em" }}>STEP 0{i + 1}</div>
                        <div className="font-semibold text-sm" style={{ color: active ? "#14213D" : "#5A6B85" }}>{step.title}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Step content */}
              <div className="lg:w-3/5 bg-grid-dark flex flex-col items-center justify-center p-10 min-h-[360px] relative overflow-hidden" style={{ background: "#14213D" }}>
                <div className="radar-sweep-line" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10 flex flex-col items-center text-center max-w-sm"
                  >
                    <div className="w-28 h-28 mb-6">
                      {/* Step illustrations */}
                      {activeStep === 0 && <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="#C9A24A" strokeWidth="2">
                        <circle cx="28" cy="72" r="12"/><circle cx="72" cy="72" r="12"/>
                        <path d="M28 72 L50 42 L72 72 M50 42 L65 42" /><circle cx="50" cy="27" r="9"/>
                        <rect x="20" y="8" width="60" height="16" rx="3" stroke="#2A3F5F" strokeWidth="1.5" fill="none"/>
                        <path d="M25 16 L75 16" stroke="#2A3F5F" strokeWidth="1" strokeDasharray="4 4"/>
                        <path d="M40 8 L40 24" stroke="#2A3F5F" strokeWidth="1" opacity="0.6"/>
                      </svg>}
                      {activeStep === 1 && <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="#C9A24A" strokeWidth="2">
                        <rect x="20" y="20" width="60" height="60" strokeDasharray="5 3" rx="2"/>
                        <rect x="35" y="35" width="30" height="30" rx="2"/>
                        <path d="M15 50 L25 50 M75 50 L85 50 M50 15 L50 25 M50 75 L50 85" strokeWidth="1.5"/>
                        <circle cx="50" cy="50" r="5" fill="#C9A24A"/>
                        <path d="M35 35 L25 25 M65 35 L75 25 M65 65 L75 75 M35 65 L25 75" strokeWidth="1"/>
                      </svg>}
                      {activeStep === 2 && <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="#C9A24A" strokeWidth="2">
                        <rect x="10" y="25" width="75" height="52" rx="4"/><circle cx="48" cy="51" r="11"/>
                        <circle cx="48" cy="51" r="5"/><path d="M85 35 L75 35 M85 45 L75 45 M85 55 L75 55" strokeWidth="1.5"/>
                        <rect x="15" y="62" width="22" height="10" rx="1" fill="#16304F" stroke="#C9A24A" strokeWidth="1"/>
                        <path d="M17 67 L35 67" strokeWidth="0.8" stroke="#8FA3B8"/>
                      </svg>}
                      {activeStep === 3 && <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="#C9A24A" strokeWidth="2">
                        <rect x="15" y="20" width="70" height="65" rx="4"/>
                        <path d="M25 35 L75 35 M25 48 L60 48 M25 61 L75 61 M25 74 L50 74" strokeWidth="1.5"/>
                        <circle cx="75" cy="25" r="10" fill="#16304F" strokeWidth="1.5"/>
                        <path d="M70 25 L74 29 L82 19" stroke="#C9A24A" strokeWidth="2"/>
                      </svg>}
                      {activeStep === 4 && <svg viewBox="0 0 100 100" className="w-full h-full" fill="none" stroke="#C9A24A" strokeWidth="2">
                        <circle cx="50" cy="28" r="14"/><path d="M50 42 L50 65 M36 55 L64 55 M50 65 L38 82 M50 65 L62 82"/>
                        <rect x="20" y="15" width="60" height="80" rx="4" stroke="#2A3F5F" strokeWidth="1.5" fill="none"/>
                        <path d="M30 45 L70 45 M30 55 L55 55 M30 65 L65 65" stroke="#2A3F5F" strokeWidth="1"/>
                        <circle cx="78" cy="78" r="14" fill="#16304F" strokeWidth="1.5"/>
                        <path d="M72 78 L77 83 L85 71" stroke="#C9A24A" strokeWidth="2"/>
                      </svg>}
                    </div>
                    <h3 className="font-serif text-2xl font-bold mb-3" style={{ fontFamily: "'Fraunces', serif", color: "#E7ECF2" }}>{violationSteps[activeStep].title}</h3>
                    <p style={{ color: "#8FA3B8" }} className="text-sm leading-relaxed">{violationSteps[activeStep].desc}</p>
                    <div className="mt-8 flex gap-2">
                      {violationSteps.map((_, i) => (
                        <div key={i} className="h-1 rounded-full transition-all duration-300" style={{ width: i === activeStep ? "28px" : "8px", background: i === activeStep ? "#C9A24A" : "#2A3F5F" }} />
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
      <section className="py-24" style={{ background: "#F4F6F9" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#C9A24A", letterSpacing: "0.18em" }}>Designed For</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: "#14213D" }}>Built for Public Safety Institutions.</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {institutions.map(({ title, desc, Icon }, i) => (
              <div
                key={i}
                className="rounded-lg p-6 text-center transition-all duration-200 group cursor-default"
                style={{ background: "#FFFFFF", border: "1px solid #DCE3EC" }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = "#C9A24A";
                  e.currentTarget.style.boxShadow = "0 4px 16px rgba(201,162,74,0.10)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = "#DCE3EC";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "none";
                }}
              >
                <div className="w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4" style={{ background: "rgba(27,79,114,0.08)" }}>
                  <Icon className="w-5 h-5" style={{ color: "#1B4F72" }} />
                </div>
                <h4 className="font-semibold text-sm mb-1" style={{ color: "#14213D" }}>{title}</h4>
                <p className="text-xs" style={{ color: "#5A6B85" }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── By the Numbers ── */}
      <section id="our-impact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="font-mono text-xs uppercase tracking-widest mb-3" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#C9A24A", letterSpacing: "0.18em" }}>Road Safety Context</p>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold" style={{ fontFamily: "'Fraunces', serif", color: "#14213D" }}>The Challenge We're Solving.</h2>
            <p className="mt-3 text-sm" style={{ color: "#5A6B85" }}>Contextual road-safety data — not Kaaval's own claimed results.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { end: 56, suffix: "%", label: "Of road fatalities involve two-wheelers", src: "MoRTH 2022" },
              { end: 470, prefix: "", suffix: "K+", label: "Road accident deaths in India over 5 years", src: "NCRB 2022" },
              { end: 24, suffix: "/7", label: "Monitoring capability per deployed junction", src: "Platform spec" },
              { end: 1, suffix: "", label: "Unified platform for detection, evidence & enforcement", src: "Kaaval" },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center p-6 rounded-xl" style={{ background: "#F4F6F9" }}>
                <div className="font-serif text-5xl lg:text-6xl font-black mb-3" style={{ fontFamily: "'Fraunces', serif", color: "#C9A24A" }}>
                  <AnimatedCounter end={stat.end} suffix={stat.suffix} prefix={stat.prefix ?? ""} />
                </div>
                <p className="font-mono text-xs uppercase tracking-wider font-bold mb-2 text-center" style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#14213D", letterSpacing: "0.1em" }}>{stat.label}</p>
                <span className="font-mono text-xs" style={{ color: "#5A6B85", fontFamily: "'IBM Plex Mono', monospace" }}>— {stat.src}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <section className="py-32 bg-grid-dark relative overflow-hidden text-center" style={{ background: "#14213D" }}>
        <div className="radar-sweep-line" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-transparent to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center gap-8">
          <h2 className="font-serif font-black leading-tight" style={{ fontFamily: "'Fraunces', serif", color: "#E7ECF2", fontSize: "clamp(2rem, 5vw, 3.5rem)" }}>
            Imagine a District With Zero Preventable Road Fatalities.
          </h2>
          <button
            className="font-bold text-lg px-10 py-5 rounded-sm transition-all"
            style={{ background: "#C9A24A", color: "#14213D" }}
            onMouseEnter={e => { e.currentTarget.style.background = "#E6D2A0"; e.currentTarget.style.transform = "scale(1.03)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#C9A24A"; e.currentTarget.style.transform = "scale(1)"; }}
            data-testid="button-request-pilot-footer"
          >
            Request Pilot Deployment
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: "#0A1628", borderTop: "1px solid #2A3F5F" }} className="py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-5">
          <div className="flex items-center gap-2.5">
            <Shield className="w-6 h-6" style={{ color: "#C9A24A" }} />
            <span className="font-serif font-bold text-lg" style={{ fontFamily: "'Fraunces', serif", color: "#E7ECF2" }}>KAAVAL AI</span>
          </div>
          <div className="flex flex-wrap gap-5 text-sm justify-center" style={{ color: "#8FA3B8" }}>
            <a href="#" className="transition-colors hover:text-[#C9A24A]">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-[#C9A24A]">Contact</a>
            <span>contact@kaaval.ai</span>
            <span>Kanyakumari, TN, India</span>
          </div>
          <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: "rgba(143,163,184,0.5)", letterSpacing: "0.06em" }}>
            © {new Date().getFullYear()} Kaaval AI
          </div>
        </div>
      </footer>

    </div>
  );
}
