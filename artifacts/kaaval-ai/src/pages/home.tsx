import React, { useEffect, useRef, useState } from "react";
import { Shield, ChevronRight, CheckCircle2, Play, Users, MapPin, Radio, Activity, Eye, FileVideo, ShieldAlert, Cpu } from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";

function useOnScreen(ref: React.RefObject<Element>, rootMargin = "0px") {
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
        }
      },
      { rootMargin }
    );
    observer.observe(currentRef);
    return () => observer.unobserve(currentRef);
  }, [ref, rootMargin]);
  return isIntersecting;
}

const AnimatedCounter = ({ end, suffix = "", duration = 2 }: { end: number, suffix?: string, duration?: number }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useOnScreen(ref, "-50px");

  useEffect(() => {
    if (inView) {
      let start = 0;
      const step = end / (duration * 60);
      const interval = setInterval(() => {
        start += step;
        if (start >= end) {
          setCount(end);
          clearInterval(interval);
        } else {
          setCount(Math.floor(start));
        }
      }, 16.6);
      return () => clearInterval(interval);
    }
  }, [inView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const violationFlowSteps = [
  { title: "Motorcycle Detected", icon: Eye, desc: "Camera identifies a two-wheeler entering the frame.", illustration: "motorcycle" },
  { title: "Violation Identified", icon: Cpu, desc: "AI confirms the absence of a helmet on the rider.", illustration: "ai" },
  { title: "Evidence Captured", icon: FileVideo, desc: "Full frame and number plate crop are stored securely.", illustration: "evidence" },
  { title: "Alert Logged", icon: ShieldAlert, desc: "Record created in the enforcement system with timestamp.", illustration: "alert" },
  { title: "Officer Review", icon: Shield, desc: "Assigned officer reviews and acts on the validated alert.", illustration: "review" }
];

export default function Home() {
  const [activeHeroText, setActiveHeroText] = useState(0);
  const [activeFlowStep, setActiveFlowStep] = useState(0);
  const heroTexts = [
    "The Zero Accident Initiative",
    "The Safe City Initiative",
    "The Intelligent Enforcement Initiative"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveHeroText((prev) => (prev + 1) % heroTexts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-ink text-text-light font-sans overflow-x-hidden selection:bg-gold selection:text-ink">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-colors duration-300 bg-ink/90 backdrop-blur-md border-b border-ink-line">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-gold" />
            <span className="font-serif font-bold text-xl tracking-tight text-gold">KAAVAL AI</span>
          </div>
          <div className="flex items-center gap-8">
            <a href="#our-impact" className="text-sm font-medium text-text-muted hover:text-text-light transition-colors hidden sm:block">
              Our Impact
            </a>
            <button className="bg-gold hover:bg-gold-soft text-ink font-semibold px-6 py-2.5 rounded-sm transition-colors shadow-[0_0_20px_rgba(201,162,74,0.1)]">
              Request Pilot
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 px-6 bg-grid-pattern min-h-[90vh] flex items-center">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-start gap-8"
          >
            <div className="border border-gold text-gold font-mono text-xs font-medium tracking-widest px-3 py-1 rounded-full uppercase">
              Smart City Initiative
            </div>
            
            <div className="h-[120px] lg:h-[160px] relative w-full">
              {heroTexts.map((text, idx) => (
                <h1 
                  key={idx}
                  className={`absolute top-0 left-0 font-serif text-5xl lg:text-7xl leading-tight font-bold transition-opacity duration-600 ${
                    idx === activeHeroText ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {text}.
                </h1>
              ))}
            </div>

            <p className="text-text-muted text-lg lg:text-xl leading-relaxed max-w-xl">
              Transforming existing CCTV infrastructure into proactive safety networks. Institutional-grade helmet detection and ANPR for police departments aiming for accident-free roads.
            </p>

            <div className="border-l-2 border-gold pl-6 py-2 my-4">
              <p className="text-sm font-mono text-text-muted uppercase tracking-wider mb-2">Contextual Mandate</p>
              <p className="text-text-light font-medium italic">
                "56% of road fatalities in India involve two-wheelers — the majority not wearing helmets." <br/>
                <span className="text-xs text-text-muted not-italic mt-1 block">— MoRTH 2022</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <button className="bg-gold hover:bg-gold-soft text-ink font-semibold px-8 py-4 rounded-sm transition-colors text-lg">
                Request Pilot Deployment
              </button>
              <button className="border border-ink-line hover:border-text-muted text-text-light font-medium px-8 py-4 rounded-sm transition-colors text-lg">
                View Case Study
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-ink-2 border border-ink-line rounded-lg p-6 shadow-2xl relative overflow-hidden hidden sm:block"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-signal animate-pulse" />
                <span className="font-mono text-xs font-medium text-signal tracking-widest">LIVE</span>
              </div>
              <span className="font-mono text-xs text-text-muted tracking-widest">KAAVAL COMMAND CENTER</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                "Junction 01 – Market St", 
                "Junction 02 – Central Ave", 
                "Junction 03 – NH-47 Bypass", 
                "Junction 04 – Port Road"
              ].map((label, idx) => (
                <div key={idx} className="bg-ink-3 rounded border border-ink-line aspect-video relative flex items-center justify-center overflow-hidden group">
                  {/* SVG Line art for road */}
                  <svg viewBox="0 0 100 100" className="w-full h-full opacity-30 text-steel stroke-current group-hover:opacity-50 transition-opacity">
                    <path d="M40 0 L40 100 M60 0 L60 100 M0 40 L100 40 M0 60 L100 60" strokeWidth="2" strokeDasharray="4 4" fill="none"/>
                    <circle cx="50" cy="50" r="15" fill="none" strokeWidth="2"/>
                  </svg>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-3/80 to-transparent flex items-end p-3">
                    <span className="font-mono text-[10px] text-text-light">{label}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-ink-3 px-4 py-3 rounded border border-ink-line flex justify-between items-center font-mono text-xs text-text-muted">
              <span>AI PROCESSING: 4 FEEDS</span>
              <span className="hidden sm:inline">·</span>
              <span>DETECTION RATE: 99.2%</span>
              <span className="hidden sm:inline">·</span>
              <span>LAST ALERT: 2s AGO</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="border-y border-ink-line bg-ink py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-4 lg:gap-8">
          {[
            "Police Department Pilot",
            "Smart City Ready",
            "Existing CCTV Compatible",
            "Rapid Deployment",
            "Govt. Approved Standards"
          ].map((badge, idx) => (
            <div key={idx} className="border border-gold/30 text-gold-soft px-4 py-1.5 rounded-full font-mono text-xs tracking-wider uppercase bg-gold/5 whitespace-nowrap">
              {badge}
            </div>
          ))}
        </div>
      </section>

      {/* How it Works / Live Demo */}
      <section className="py-24 bg-paper text-ink">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-4 text-ink">From Camera Feed to Enforcement Action.</h2>
            <p className="text-steel font-medium">(Hover a feed to see AI detection in action)</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-paper-2 rounded-lg border border-steel/20 aspect-[3/4] relative overflow-hidden group cursor-crosshair shadow-sm">
                {/* Background generic road */}
                <div className="absolute inset-0 bg-paper p-4 flex flex-col justify-end">
                   <svg viewBox="0 0 100 100" className="w-full h-full opacity-20 text-steel stroke-current absolute inset-0 m-auto max-w-[80%] max-h-[80%]">
                    <path d="M30 100 L50 40 L70 100" strokeWidth="2" fill="none"/>
                    <path d="M50 40 L50 100" strokeWidth="1" strokeDasharray="2 2" fill="none"/>
                    {/* Abstract motorcycle */}
                    <circle cx="50" cy="70" r="4" fill="currentColor" />
                    <rect x="48" y="60" width="4" height="10" fill="currentColor" />
                  </svg>
                  <div className="relative z-10 font-mono text-xs text-steel">Feed {item} / Active</div>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-ink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col items-center justify-center">
                  <div className="relative w-32 h-32 border-2 border-destructive animate-pulse flex items-start p-1">
                    <div className="bg-destructive text-white font-mono text-[10px] px-1 font-bold">⚠ NO HELMET</div>
                  </div>
                  <div className="mt-4 bg-ink text-gold font-mono text-xs px-3 py-1 border border-gold-soft rounded flex flex-col items-center">
                    <span className="text-[9px] text-text-muted">ANPR EXTRACT</span>
                    TN 32 AB 1234
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-24 bg-ink bg-grid-pattern relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-12 items-center">
            
            <div className="bg-ink-2 p-8 rounded-lg border border-ink-line">
              <h3 className="font-serif text-2xl font-bold text-text-muted mb-8 pb-4 border-b border-ink-line">Traditional Approach</h3>
              <ul className="space-y-6">
                {[
                  { title: "Replace Cameras", desc: "Requires specialized new hardware installation" },
                  { title: "High Capital Cost", desc: "₹15–25L per junction deployed" },
                  { title: "Slow Rollout", desc: "6–12 months for procurement and mounting" },
                  { title: "Limited Scalability", desc: "Hard to expand across entire districts quickly" }
                ].map((row, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <div className="mt-1 w-5 h-5 rounded-full bg-ink-3 flex items-center justify-center text-text-muted text-xs shrink-0">×</div>
                    <div>
                      <h4 className="font-medium text-text-light">{row.title}</h4>
                      <p className="text-sm text-text-muted">{row.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="hidden lg:flex flex-col items-center text-ink-line">
              <div className="h-24 w-px bg-ink-line"></div>
              <span className="my-4 font-mono font-bold text-sm text-steel">VS</span>
              <div className="h-24 w-px bg-ink-line"></div>
            </div>

            <div className="bg-ink-2 p-8 rounded-lg border-2 border-gold relative shadow-[0_0_30px_rgba(201,162,74,0.05)]">
              <div className="absolute top-0 right-8 -translate-y-1/2 bg-gold text-ink font-mono text-xs font-bold px-3 py-1 rounded-sm uppercase">Kaaval AI</div>
              <h3 className="font-serif text-2xl font-bold text-gold mb-8 pb-4 border-b border-ink-line">The Modern Upgrade</h3>
              <ul className="space-y-6">
                {[
                  { title: "Reuse Existing CCTV", desc: "Connects directly to your current camera feeds" },
                  { title: "Fraction of Cost", desc: "SaaS model eliminates heavy CapEx" },
                  { title: "Weeks, Not Months", desc: "Software deployment is rapid and remote" },
                  { title: "Infinitely Scalable", desc: "Add junctions with a simple software license" }
                ].map((row, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <CheckCircle2 className="mt-1 w-5 h-5 text-gold shrink-0" />
                    <div>
                      <h4 className="font-medium text-text-light">{row.title}</h4>
                      <p className="text-sm text-text-muted">{row.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* Product Tiers */}
      <section className="py-24 bg-paper text-ink">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-4 text-ink">Choose the Right Tier for Your Junction.</h2>
            <p className="text-steel font-medium text-lg max-w-2xl mx-auto">Enhance existing infrastructure without hardware replacement.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Essential",
                price: "₹2,999",
                focus: "Helmet Detection",
                features: ["Real-time helmet violation detection", "Daily summary reports", "Standard email support"]
              },
              {
                name: "Standard",
                price: "₹4,999",
                focus: "Helmet + ANPR",
                features: ["Helmet violation detection", "Number plate recognition (ANPR)", "Automated evidence capture", "Priority support"]
              },
              {
                name: "Advanced",
                price: "₹7,999",
                focus: "Full Suite",
                highlight: true,
                features: ["Triple-riding detection", "Wrong-way driving alerts", "Live analytics dashboard", "E-challan system integration", "Dedicated account manager"]
              },
              {
                name: "Enterprise",
                price: "Custom",
                focus: "City-wide Rollout",
                features: ["Centralized command center", "Unlimited camera integrations", "Custom AI model training", "On-premise deployment option", "24/7 SLA SLA support"]
              }
            ].map((tier, idx) => (
              <div key={idx} className={`bg-paper-2 rounded-lg p-6 flex flex-col h-full ${tier.highlight ? 'border-2 border-gold shadow-md relative lg:scale-105 z-10' : 'border border-steel/20 mt-0 lg:mt-4 mb-0 lg:mb-4'}`}>
                {tier.highlight && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gold text-ink font-mono text-[10px] font-bold px-3 py-1 rounded-sm uppercase whitespace-nowrap">
                    Most Popular
                  </div>
                )}
                <h3 className="font-mono text-sm font-bold text-steel uppercase tracking-wider mb-2">{tier.name}</h3>
                <div className="mb-2 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-ink">{tier.price}</span>
                  {tier.price !== "Custom" && <span className="text-steel text-sm"> / cam / mo</span>}
                </div>
                <p className="text-sm font-medium text-ink mb-6 pb-6 border-b border-steel/10">{tier.focus}</p>
                
                <ul className="space-y-4 mb-8 flex-grow">
                  {tier.features.map((feat, i) => (
                    <li key={i} className="flex gap-3 text-sm text-steel items-start">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${tier.highlight ? 'text-gold' : 'text-steel/50'}`} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3 rounded-sm font-semibold transition-colors ${tier.highlight ? 'bg-gold text-ink hover:bg-gold-soft' : 'bg-ink text-text-light hover:bg-ink-2'}`}>
                  Select {tier.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-24 bg-ink border-y border-ink-line">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-text-light mb-2">First Live Deployment</h2>
            <p className="text-text-muted font-mono text-sm uppercase tracking-wide flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gold" /> Ramanputhur Junction, Kanyakumari District, Tamil Nadu
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center bg-ink-2 border border-ink-line rounded-lg overflow-hidden">
            <div className="p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-ink-line relative h-full min-h-[300px] flex items-center justify-center bg-ink-3/50">
               {/* Abstract map */}
               <svg viewBox="0 0 200 200" className="w-full max-w-sm text-ink-line stroke-current" fill="none">
                 <path d="M100 0 L100 200 M0 100 L200 100 M40 40 L160 160" strokeWidth="4" />
                 <circle cx="100" cy="100" r="30" strokeWidth="2" strokeDasharray="4 4" />
                 <circle cx="100" cy="40" r="6" fill="#C9A24A" stroke="none" />
                 <circle cx="160" cy="100" r="6" fill="#C9A24A" stroke="none" />
                 <circle cx="100" cy="160" r="6" fill="#C9A24A" stroke="none" />
                 <circle cx="40" cy="100" r="6" fill="#C9A24A" stroke="none" />
               </svg>
            </div>
            
            <div className="p-8 lg:p-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-signal/10 border border-signal/20 text-signal font-mono text-xs font-bold mb-8">
                <div className="w-2 h-2 rounded-full bg-signal animate-pulse" />
                PILOT OPERATIONAL
              </div>

              {/* Timeline */}
              <div className="flex justify-between relative mb-12">
                <div className="absolute top-1.5 left-0 w-full h-px bg-ink-line z-0" />
                {["Concept", "Prototype", "Pilot", "Expansion"].map((step, idx) => {
                  const isActive = step === "Pilot";
                  const isPast = idx < 2;
                  return (
                    <div key={idx} className="relative z-10 flex flex-col items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-gold ring-4 ring-gold/20' : isPast ? 'bg-text-muted' : 'bg-ink-line'}`} />
                      <span className={`font-mono text-[10px] uppercase tracking-wider ${isActive ? 'text-gold font-bold' : 'text-text-muted'}`}>{step}</span>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <Activity className="w-6 h-6 text-gold shrink-0" />
                  <div>
                    <h4 className="text-text-light font-medium mb-1">Operational Integration</h4>
                    <p className="text-sm text-text-muted">Successfully analyzing 4 independent CCTV feeds concurrently via RTSP streams.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <FileVideo className="w-6 h-6 text-gold shrink-0" />
                  <div>
                    <h4 className="text-text-light font-medium mb-1">Evidence Generation</h4>
                    <p className="text-sm text-text-muted">Automated extraction of high-res violation frames with cropped ANPR plates for manual review.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Violation Flow - Interactive Stepper */}
      <section className="py-24 bg-paper text-ink">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">How a Violation Becomes an Enforcement Record.</h2>
          </div>

          <div className="bg-paper-2 border border-steel/20 rounded-lg p-6 lg:p-10">
            <div className="flex flex-col lg:flex-row gap-12">
              
              {/* Stepper Navigation */}
              <div className="lg:w-1/3 flex flex-col gap-2">
                {violationFlowSteps.map((step, idx) => {
                  const isActive = idx === activeFlowStep;
                  return (
                    <button 
                      key={idx} 
                      onClick={() => setActiveFlowStep(idx)}
                      className={`text-left p-4 rounded-md transition-all flex items-center gap-4 ${
                        isActive 
                          ? "bg-gold/10 border border-gold border-l-4 border-l-gold" 
                          : "border border-transparent border-l-4 border-l-transparent hover:bg-steel/5"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded shrink-0 flex items-center justify-center ${isActive ? 'bg-gold text-ink' : 'bg-steel/10 text-steel'}`}>
                        <step.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-mono text-[10px] text-steel mb-1">STEP 0{idx + 1}</div>
                        <div className={`font-semibold ${isActive ? 'text-ink' : 'text-steel'}`}>{step.title}</div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Stepper Content */}
              <div className="lg:w-2/3 bg-ink rounded-lg border border-ink-line p-8 flex flex-col justify-center min-h-[400px] relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-50" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFlowStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10 flex flex-col items-center text-center"
                  >
                    <div className="w-32 h-32 mb-8 relative">
                      {violationFlowSteps[activeFlowStep].illustration === "motorcycle" && (
                        <svg viewBox="0 0 100 100" className="w-full h-full text-gold stroke-current" fill="none">
                          <circle cx="30" cy="70" r="12" strokeWidth="2"/>
                          <circle cx="70" cy="70" r="12" strokeWidth="2"/>
                          <path d="M30 70 L50 40 L70 70 M50 40 L65 40" strokeWidth="2"/>
                          <circle cx="50" cy="25" r="8" strokeWidth="2"/>
                        </svg>
                      )}
                      {violationFlowSteps[activeFlowStep].illustration === "ai" && (
                        <svg viewBox="0 0 100 100" className="w-full h-full text-gold stroke-current" fill="none">
                          <rect x="20" y="20" width="60" height="60" strokeWidth="2" strokeDasharray="4 4"/>
                          <path d="M40 40 L60 60 M60 40 L40 60" strokeWidth="2"/>
                          <circle cx="50" cy="50" r="25" strokeWidth="2"/>
                        </svg>
                      )}
                      {violationFlowSteps[activeFlowStep].illustration === "evidence" && (
                        <svg viewBox="0 0 100 100" className="w-full h-full text-gold stroke-current" fill="none">
                          <rect x="15" y="25" width="70" height="50" strokeWidth="2" rx="4"/>
                          <circle cx="50" cy="50" r="10" strokeWidth="2"/>
                          <path d="M85 35 L75 35 M85 45 L75 45" strokeWidth="2"/>
                        </svg>
                      )}
                      {violationFlowSteps[activeFlowStep].illustration === "alert" && (
                        <svg viewBox="0 0 100 100" className="w-full h-full text-gold stroke-current" fill="none">
                          <path d="M50 15 L85 80 L15 80 Z" strokeWidth="2"/>
                          <path d="M50 40 L50 60" strokeWidth="2"/>
                          <circle cx="50" cy="70" r="2" fill="currentColor"/>
                        </svg>
                      )}
                      {violationFlowSteps[activeFlowStep].illustration === "review" && (
                        <svg viewBox="0 0 100 100" className="w-full h-full text-gold stroke-current" fill="none">
                          <rect x="25" y="15" width="50" height="70" strokeWidth="2" rx="4"/>
                          <path d="M35 35 L65 35 M35 50 L55 50 M35 65 L65 65" strokeWidth="2"/>
                          <circle cx="75" cy="75" r="15" fill="#16304F" strokeWidth="2"/>
                          <path d="M68 75 L73 80 L82 68" stroke="#C9A24A" strokeWidth="2"/>
                        </svg>
                      )}
                    </div>
                    
                    <h3 className="font-serif text-2xl text-text-light mb-4">{violationFlowSteps[activeFlowStep].title}</h3>
                    <p className="text-text-muted max-w-md">{violationFlowSteps[activeFlowStep].desc}</p>
                    
                    {/* Auto-progress indicator */}
                    <div className="mt-8 flex gap-2">
                      {violationFlowSteps.map((_, idx) => (
                        <div key={idx} className={`h-1 rounded-full transition-all ${idx === activeFlowStep ? 'w-8 bg-gold' : 'w-2 bg-ink-line'}`} />
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Built For */}
      <section className="py-24 bg-ink border-t border-ink-line">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-text-light">Built for Public Safety Institutions.</h2>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {[
              { title: "Police Departments", desc: "Frontline enforcement", icon: Shield },
              { title: "District Admin", desc: "Oversight and policy", icon: Users },
              { title: "Smart Cities", desc: "Integrated urban safety", icon: Radio },
              { title: "Highway Auth.", desc: "Corridor monitoring", icon: MapPin },
              { title: "Municipal Corps", desc: "Urban traffic management", icon: Activity }
            ].map((item, idx) => (
              <div key={idx} className="bg-ink-2 p-6 rounded border border-ink-line text-center hover:bg-ink-3 transition-colors">
                <item.icon className="w-8 h-8 text-gold mx-auto mb-4" />
                <h4 className="font-medium text-text-light mb-1">{item.title}</h4>
                <p className="text-xs text-text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* By the Numbers */}
      <section id="our-impact" className="py-24 bg-paper text-ink">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold text-center mb-16">The Road Safety Challenge We're Solving.</h2>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <div className="font-serif text-5xl lg:text-6xl font-bold text-gold mb-4">
                <AnimatedCounter end={56} suffix="%" />
              </div>
              <p className="font-mono text-xs uppercase tracking-wide text-steel font-bold">Of Fatalities Involve Two-Wheelers</p>
            </div>
            <div>
              <div className="font-serif text-5xl lg:text-6xl font-bold text-gold mb-4">
                <AnimatedCounter end={4.7} suffix="L+" duration={2.5} />
              </div>
              <p className="font-mono text-xs uppercase tracking-wide text-steel font-bold">Road Deaths Over 5 Years</p>
            </div>
            <div>
              <div className="font-serif text-5xl lg:text-6xl font-bold text-gold mb-4">
                24/7
              </div>
              <p className="font-mono text-xs uppercase tracking-wide text-steel font-bold">Monitoring per Junction</p>
            </div>
            <div>
              <div className="font-serif text-5xl lg:text-6xl font-bold text-gold mb-4">
                <AnimatedCounter end={1} duration={1} />
              </div>
              <p className="font-mono text-xs uppercase tracking-wide text-steel font-bold">Unified Enforcement Platform</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-32 bg-ink bg-grid-pattern border-t border-ink-line text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent z-0" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 flex flex-col items-center">
          <h2 className="font-serif text-4xl lg:text-6xl font-bold text-text-light mb-10 leading-tight">
            Imagine a District With Zero Preventable Road Fatalities.
          </h2>
          <button className="bg-gold hover:bg-gold-soft text-ink font-bold text-lg px-10 py-5 rounded-sm transition-all hover:scale-105 shadow-[0_0_30px_rgba(201,162,74,0.2)]">
            Request Pilot Deployment
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-ink-2 py-12 border-t border-ink-line">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-gold" />
            <span className="font-serif font-bold text-lg text-text-light">KAAVAL AI</span>
          </div>
          <div className="flex gap-6 text-sm font-medium text-text-muted">
            <a href="#" className="hover:text-gold transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-gold transition-colors">Contact</a>
            <span>contact@kaaval.ai</span>
            <span>Kanyakumari, TN, India</span>
          </div>
          <div className="font-mono text-xs text-text-muted/60">
            © {new Date().getFullYear()} Kaaval AI. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}
