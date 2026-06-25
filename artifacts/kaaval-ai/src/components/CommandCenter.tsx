import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';
import { 
  CheckCircle2, XCircle, FileText, Download, Loader2, PlayCircle, ShieldAlert, Cpu
} from 'lucide-react';

const TABS = ['Detection', 'Verification', 'Analytics', 'Reporting', 'Awareness'];

// Mock Violations for Verification Tab
const MOCK_VIOLATIONS = [
  { id: 'TN 74 XX 1234', type: 'No Helmet', confidence: '97%', time: '14:32', imgClass: 'from-red-900/40 to-[#08111f]' },
  { id: 'TN 74 AB 5678', type: 'Triple Riding', confidence: '94%', time: '14:35', imgClass: 'from-amber-900/40 to-[#08111f]' },
  { id: 'TN 74 CD 9012', type: 'Wrong Direction', confidence: '99%', time: '14:41', imgClass: 'from-red-900/40 to-[#08111f]' },
  { id: 'TN 74 EF 3456', type: 'Signal Jump', confidence: '92%', time: '14:45', imgClass: 'from-blue-900/40 to-[#08111f]' },
  { id: 'TN 74 GH 7890', type: 'Overspeed', confidence: '98%', time: '14:50', imgClass: 'from-purple-900/40 to-[#08111f]' },
];

const LED_MESSAGES = [
  "WEAR HELMET", 
  "FOLLOW TRAFFIC RULES", 
  "DON'T DRINK & DRIVE", 
  "SAVE YOUR LIFE"
];

export default function CommandCenter() {
  const [activeTab, setActiveTab] = useState('Detection');
  
  // Detection State
  const [totalEvents, setTotalEvents] = useState(21026);
  
  useEffect(() => {
    if (activeTab === 'Detection') {
      const timer = setInterval(() => setTotalEvents(p => p + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [activeTab]);

  // Verification State
  const [vIndex, setVIndex] = useState(0);
  const [vStatus, setVStatus] = useState<'idle'|'approved'|'rejected'>('idle');

  const handleVerificationAction = (action: 'approved' | 'rejected') => {
    setVStatus(action);
    setTimeout(() => {
      setVStatus('idle');
      setVIndex((p) => (p + 1) % MOCK_VIOLATIONS.length);
    }, 1200);
  };
  
  const currentViolation = MOCK_VIOLATIONS[vIndex];

  // Reporting State
  const [reportState, setReportState] = useState<'idle' | 'loading' | 'ready'>('idle');
  
  const handleGenerateReport = () => {
    setReportState('loading');
    setTimeout(() => setReportState('ready'), 2500);
  };

  // Awareness State
  const [ledIndex, setLedIndex] = useState(0);
  useEffect(() => {
    if (activeTab === 'Awareness') {
      const timer = setInterval(() => {
        setLedIndex(p => (p + 1) % LED_MESSAGES.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [activeTab]);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  
  const isMobile = useIsMobile();
  // Layered parallax depths (scaled down on mobile for performance)
  const bgTextY    = useTransform(scrollYProgress, [0, 1], isMobile ? [-8, 8] : [-20, 20]);
  const mockupY    = useTransform(scrollYProgress, [0, 1], isMobile ? [-4, 4] : [-10, 10]);
  // content stays at 0

  return (
    <section ref={sectionRef} className="py-24 bg-[#0B1220] text-white relative overflow-hidden" style={{ position: 'relative' }}>
        {/* Layered parallax — ghost BG text, moves 20px */}
        <motion.div
          style={{ y: bgTextY }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0"
          aria-hidden
        >
          <span
            className="font-mono font-black text-white tracking-[0.4em] uppercase"
            style={{ fontSize: "clamp(4rem,15vw,14rem)", opacity: 0.025 }}
          >
            KAAVAL AI
          </span>
        </motion.div>

      <div className="max-w-[1000px] mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <p className="font-mono text-xs uppercase tracking-widest mb-3 text-[#3b82f6]" style={{letterSpacing:"0.18em"}}>COMMAND CENTER</p>
          <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4" style={{fontFamily:"'Fraunces',serif"}}>The KAAVAL AI Lifecycle</h2>
          <p className="text-[#8FA3B8] max-w-2xl mx-auto text-base">
            Experience the rhythm of traffic enforcement. From live detection to public awareness, simulate the actual software workflow.
          </p>
        </div>

        {/* macOS Desktop Application Wrapper — parallax layer: 10px */}
        <motion.div style={{ y: mockupY }} className="vel-glow">
        <div 
          className="rounded-2xl overflow-hidden shadow-2xl border border-[#1e293b] flex flex-col bg-[#08111f] w-full max-w-[1000px] md:aspect-video mx-auto transition-all duration-500 relative"
          style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 1), inset 0 1px 0 rgba(255,255,255,0.1)' }}
        >

          
          {/* Window Title Bar */}
          <div className="hidden md:flex items-center justify-between px-4 py-3 bg-[#0f1729]/90 backdrop-blur-md border-b border-[#1e293b] relative z-20">
            {/* macOS Dots */}
            <div className="flex items-center gap-2 w-1/3">
              <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
              <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
              <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
            </div>
            
            {/* Centered Title */}
            <div className="w-1/3 flex justify-center hidden sm:flex">
              <span className="font-mono text-[10px] sm:text-xs font-bold text-[#8FA3B8] tracking-widest uppercase">
                KAAVAL AI Command Center
              </span>
            </div>
            
            {/* Live Demo Badge */}
            <div className="w-1/3 flex justify-end">
              <div className="flex items-center gap-2 bg-[#22c55e]/10 px-3 py-1 rounded-full border border-[#22c55e]/20">
                 <div className="w-2 h-2 rounded-full bg-[#22c55e] shadow-[0_0_8px_#22c55e] animate-pulse" />
                 <span className="font-mono text-[9px] sm:text-[10px] font-bold text-[#22c55e] tracking-widest uppercase">LIVE DEMO</span>
              </div>
            </div>
          </div>

          {/* Main Layout Area */}
          <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
            
            {/* Sidebar Navigation (The Lifecycle) */}
            <div className="md:w-64 bg-[#0B1220] border-b md:border-b-0 md:border-r border-[#1e293b] flex md:flex-col overflow-x-auto md:overflow-visible relative snap-x snap-mandatory scrollbar-hide">
               {TABS.map((tab, idx) => {
                 const isActive = activeTab === tab;
                 const isPassed = TABS.indexOf(activeTab) > idx;
                 
                 return (
                   <button 
                     key={tab} 
                     onClick={() => setActiveTab(tab)}
                     className={`relative flex items-center justify-center md:justify-start gap-3 px-5 py-3.5 md:px-6 md:py-6 transition-all duration-300 min-w-max md:min-w-0 text-center md:text-left group snap-center`}
                   >
                     {isActive && (
                       <motion.div
                         layoutId="activeTabIndicator"
                         className="absolute inset-0 bg-[#0f1729] md:bg-white/5 border-b-2 md:border-b-0 md:border-l-4 border-[#3b82f6] rounded-lg md:rounded-none m-2 md:m-0"
                         initial={false}
                         transition={{ type: "spring", stiffness: 300, damping: 30 }}
                       />
                     )}
                     <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity z-0 hidden md:block" />
                     {/* Lifecycle Dot & Line logic (desktop only) */}
                     <div className="relative flex flex-col items-center justify-center w-4 h-4 shrink-0 hidden md:flex z-10">
                        {idx !== 4 && <div className="absolute top-4 w-px h-12 bg-[#1e293b] -z-10" />}
                        <div className={`w-2 h-2 rounded-full transition-colors duration-500 ${isActive ? 'bg-[#3b82f6] shadow-[0_0_8px_#3b82f6]' : isPassed ? 'bg-[#22c55e]' : 'bg-[#1e293b]'}`} />
                     </div>
                     <span className={`relative z-10 font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-colors ${isActive ? 'text-white' : 'text-[#8FA3B8] group-hover:text-white'}`}>
                       {tab}
                     </span>
                   </button>
                 )
               })}
            </div>

            {/* Main Content Panel */}
            <div className="flex-1 relative p-5 sm:p-10 bg-[#08111f] overflow-y-auto min-h-[450px] md:min-h-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="h-full flex flex-col justify-center"
                >
                  
                  {/* --- DETECTION TAB --- */}
                  {activeTab === 'Detection' && (
                    <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
                      <div className="bg-[#13203a] p-6 rounded-xl border border-white/5 text-center shadow-lg relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#3b82f6] to-transparent opacity-50" />
                        <p className="font-mono text-[10px] text-[#8FA3B8] tracking-widest uppercase mb-2">Total Events Detected</p>
                        <p className="font-serif text-5xl font-bold text-white mb-1 tabular-nums">{totalEvents.toLocaleString()}</p>
                        <p className="text-xs text-[#22c55e] flex justify-center items-center gap-1"><span className="text-lg leading-none">+</span>1 per second (Simulated)</p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                         <div className="bg-[#13203a] p-5 rounded-xl border border-white/5">
                            <p className="font-mono text-[9px] text-[#8FA3B8] tracking-widest uppercase mb-1">Accuracy</p>
                            <p className="text-2xl font-bold text-white">99.8%</p>
                         </div>
                         <div className="bg-[#13203a] p-5 rounded-xl border border-white/5">
                            <p className="font-mono text-[9px] text-[#8FA3B8] tracking-widest uppercase mb-1">Active Streams</p>
                            <p className="text-2xl font-bold text-white">4/4</p>
                         </div>
                      </div>

                      <div className="bg-[#13203a] p-4 rounded-xl border border-white/5 flex items-center justify-between">
                        <span className="font-mono text-xs font-bold text-[#8FA3B8] tracking-widest uppercase">System Health</span>
                        <span className="bg-[#22c55e]/10 text-[#22c55e] px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full animate-pulse"/> ONLINE
                        </span>
                      </div>
                    </div>
                  )}

                  {/* --- VERIFICATION TAB --- */}
                  {activeTab === 'Verification' && (
                    <div className="h-full flex flex-col relative w-full max-w-2xl mx-auto">
                      
                      {/* Workflow Overlay */}
                      <AnimatePresence>
                        {vStatus !== 'idle' && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            className={`absolute inset-0 z-50 flex items-center justify-center rounded-xl backdrop-blur-sm ${vStatus === 'approved' ? 'bg-[#22c55e]/10' : 'bg-[#ef4444]/10'}`}
                          >
                            <div className="bg-[#0f1729] p-6 rounded-2xl border border-white/10 shadow-2xl flex flex-col items-center">
                               {vStatus === 'approved' ? <CheckCircle2 className="w-16 h-16 text-[#22c55e] mb-4"/> : <XCircle className="w-16 h-16 text-[#ef4444] mb-4"/>}
                               <h3 className="text-2xl font-bold text-white">Violation {vStatus === 'approved' ? 'Approved' : 'Rejected'}</h3>
                               <p className="text-[#8FA3B8] mt-2">Loading next record...</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="bg-[#13203a] rounded-xl border border-white/5 shadow-xl overflow-hidden flex flex-col sm:flex-row flex-1">
                        
                        {/* Fake Evidence Image Area */}
                        <div className={`sm:w-1/2 relative bg-gradient-to-br ${currentViolation.imgClass} flex items-center justify-center border-b sm:border-b-0 sm:border-r border-white/5 min-h-[200px] overflow-hidden group cursor-crosshair`}>
                           {/* Grid Pattern with hover scale */}
                           <div className="absolute inset-0 opacity-10 transition-transform duration-700 group-hover:scale-125" style={{backgroundSize:"10px 10px", backgroundImage:"radial-gradient(circle, #ffffff 1px, transparent 1px)"}} />
                           
                           {/* Scanning Line Animation */}
                           <motion.div 
                             className="absolute top-0 left-0 right-0 h-1 bg-[#3b82f6]/50 shadow-[0_0_15px_#3b82f6] z-10"
                             animate={{ y: [0, 250, 0] }}
                             transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                           />
                           
                           {/* Target Box */}
                           <div className="w-32 h-32 border-2 border-white/30 rounded border-dashed relative z-20 group-hover:border-[#3b82f6]/50 transition-colors">
                             <div className="absolute -top-1 -left-1 w-2 h-2 border-t-2 border-l-2 border-white group-hover:border-[#3b82f6] transition-colors" />
                             <div className="absolute -top-1 -right-1 w-2 h-2 border-t-2 border-r-2 border-white group-hover:border-[#3b82f6] transition-colors" />
                             <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b-2 border-l-2 border-white group-hover:border-[#3b82f6] transition-colors" />
                             <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b-2 border-r-2 border-white group-hover:border-[#3b82f6] transition-colors" />
                           </div>

                           <div className="absolute top-4 left-4 bg-black/60 px-2 py-1 rounded text-[10px] font-mono text-white font-bold border border-white/10 backdrop-blur-sm tracking-widest z-20">EVIDENCE CAMERA 01</div>
                        </div>

                        {/* Details Area */}
                        <div className="sm:w-1/2 p-6 flex flex-col">
                          <p className="font-mono text-[9px] text-[#8FA3B8] tracking-widest uppercase mb-1">AI Detection Result</p>
                          <h3 className="font-serif text-2xl font-bold text-white mb-6">{currentViolation.type}</h3>

                          <div className="space-y-4 flex-1">
                            <div>
                              <p className="text-[10px] text-[#8FA3B8] uppercase tracking-wider mb-1">Vehicle Plate</p>
                              <p className="font-mono font-bold text-lg bg-[#0f1729] px-3 py-1.5 rounded inline-block border border-white/5 text-white">{currentViolation.id}</p>
                            </div>
                            <div className="flex gap-6">
                              <div>
                                <p className="text-[10px] text-[#8FA3B8] uppercase tracking-wider mb-1">Confidence</p>
                                <p className="font-bold text-[#22c55e]">{currentViolation.confidence}</p>
                              </div>
                              <div>
                                <p className="text-[10px] text-[#8FA3B8] uppercase tracking-wider mb-1">Timestamp</p>
                                <p className="font-bold text-white">{currentViolation.time}</p>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="grid grid-cols-2 gap-3 mt-8">
                             <button onClick={() => handleVerificationAction('rejected')} className="py-3 rounded bg-transparent border border-white/10 hover:bg-white/5 text-white font-bold transition-colors">
                               Reject
                             </button>
                             <button onClick={() => handleVerificationAction('approved')} className="py-3 rounded bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold transition-colors shadow-lg shadow-[#3b82f6]/20">
                               Approve
                             </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  )}

                  {/* --- ANALYTICS TAB --- */}
                  {activeTab === 'Analytics' && (
                    <div className="w-full max-w-lg mx-auto bg-[#13203a] p-8 rounded-xl border border-white/5">
                       <p className="font-mono text-[10px] text-[#8FA3B8] tracking-widest uppercase mb-6 text-center">Top Violations Detected</p>
                       
                       <div className="space-y-6">
                         {[
                           { label: 'No Helmet', pct: 85, color: '#ef4444' },
                           { label: 'Triple Riding', pct: 60, color: '#f59e0b' },
                           { label: 'Wrong Route', pct: 45, color: '#3b82f6' },
                           { label: 'Overspeed', pct: 25, color: '#a855f7' }
                         ].map(bar => (
                           <div key={bar.label}>
                             <div className="flex justify-between text-xs font-bold text-white mb-2">
                               <span>{bar.label}</span>
                             </div>
                             <div className="h-3 bg-[#0f1729] rounded-full overflow-hidden border border-white/5 group cursor-pointer">
                               <motion.div 
                                 initial={{ width: 0 }}
                                 animate={{ width: `${bar.pct}%` }}
                                 transition={{ duration: 1, ease: "easeOut" }}
                                 className="h-full rounded-full group-hover:brightness-125 transition-all"
                                 style={{ background: bar.color }}
                               />
                             </div>
                           </div>
                         ))}
                       </div>
                    </div>
                  )}

                  {/* --- REPORTING TAB --- */}
                  {activeTab === 'Reporting' && (
                    <div className="w-full max-w-md mx-auto bg-[#13203a] p-8 rounded-xl border border-white/5 flex flex-col items-center text-center">
                       <div className="w-16 h-16 rounded-full bg-[#0f1729] border border-white/10 flex items-center justify-center mb-6">
                          <FileText className="w-8 h-8 text-[#3b82f6]" />
                       </div>
                       
                       <h3 className="font-serif text-2xl font-bold text-white mb-2">Generate Daily Report</h3>
                       <p className="text-sm text-[#8FA3B8] mb-8">Export comprehensive analytics and verified evidence logs for the past 24 hours.</p>

                       <AnimatePresence mode="wait">
                         {reportState === 'idle' && (
                           <motion.button 
                             key="idle"
                             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                             onClick={handleGenerateReport}
                             className="w-full py-4 rounded bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold transition-colors flex items-center justify-center gap-2"
                           >
                             <Download className="w-5 h-5" /> Export PDF
                           </motion.button>
                         )}
                         {reportState === 'loading' && (
                           <motion.div 
                             key="loading"
                             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                             className="w-full py-4 rounded bg-[#0f1729] border border-white/10 text-white font-bold flex flex-col items-center justify-center relative overflow-hidden"
                           >
                             <div className="flex items-center gap-3 z-10">
                               <Loader2 className="w-5 h-5 animate-spin text-[#3b82f6]" /> Preparing Report...
                             </div>
                             <motion.div 
                               initial={{ width: "0%" }}
                               animate={{ width: "100%" }}
                               transition={{ duration: 2.5, ease: "linear" }}
                               className="absolute bottom-0 left-0 h-1 bg-[#3b82f6]"
                             />
                           </motion.div>
                         )}
                         {reportState === 'ready' && (
                           <motion.div 
                             key="ready"
                             initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                             className="w-full py-4 rounded bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e] font-bold flex items-center justify-center gap-2"
                           >
                             <CheckCircle2 className="w-5 h-5" /> Daily_Report_24_06_2026.pdf Ready
                           </motion.div>
                         )}
                       </AnimatePresence>
                    </div>
                  )}

                  {/* --- AWARENESS TAB --- */}
                  {activeTab === 'Awareness' && (
                    <div className="w-full max-w-xl mx-auto h-[250px] bg-[#000] rounded-xl border-4 border-[#1e293b] p-6 relative flex flex-col items-center justify-center shadow-inner overflow-hidden">
                      {/* LED Matrix Background */}
                      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{backgroundSize:"4px 4px", backgroundImage:"radial-gradient(circle, #ffffff 1px, transparent 1px)"}} />
                      
                      <div className="relative z-10 flex flex-col items-center text-center space-y-2">
                        <AnimatePresence mode="wait">
                          <motion.h3
                            key={ledIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="font-mono text-3xl sm:text-5xl font-bold uppercase tracking-widest leading-tight" 
                            style={{color: '#f59e0b', textShadow: `0 0 10px #f59e0b, 0 0 20px #f59e0b`}}
                          >
                            {LED_MESSAGES[ledIndex]}
                          </motion.h3>
                        </AnimatePresence>
                      </div>

                      <div className="absolute bottom-4 left-4 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full animate-pulse bg-[#f59e0b] shadow-[0_0_8px_#f59e0b]" />
                        <span className="font-mono text-[10px] font-bold text-[#f59e0b] tracking-widest">SIMULATOR ACTIVE</span>
                      </div>
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            </div>
            
          </div>
        </div>
        </motion.div>{/* end mockup parallax layer */}
      </div>
    </section>

  );
}
