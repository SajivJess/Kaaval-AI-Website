import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../hooks/useIsMobile';

const BG_TEXTS: Record<string, string> = {
  default: 'KAAVAL AI',
  vijay: 'ACADEMIC GUIDANCE',
  binu: 'INDUSTRY INSIGHT',
  sajiv: 'DEPLOYMENT',
  harish: 'DEVELOPMENT'
};

export default function TeamStructure() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const isMobile = useIsMobile();
  
  // Spotlight and Parallax tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      // For spotlight (absolute pixels)
      springX.set(e.clientX - rect.left);
      springY.set(e.clientY - rect.top);
      
      // For parallax (-0.5 to 0.5)
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    }
  };

  const getOpacity = (id: string) => {
    if (!hoveredNode) return 1;
    return hoveredNode === id ? 1 : 0.35;
  };

  const getScale = (id: string) => {
    return hoveredNode === id ? 1.05 : 1;
  };

  // ── DOM-measured connection line refs ───────────────────────────────
  const nodeRefs: Record<string, React.RefObject<HTMLDivElement>> = {
    vijay:    useRef<HTMLDivElement>(null),
    binu:     useRef<HTMLDivElement>(null),
    sajiv:    useRef<HTMLDivElement>(null),
    harish:   useRef<HTMLDivElement>(null),
    santhosh: useRef<HTMLDivElement>(null),
    sakthivel:useRef<HTMLDivElement>(null),
  };
  const svgRef = useRef<SVGSVGElement>(null);
  const [lines, setLines] = useState<Array<{ x1:number;y1:number;x2:number;y2:number }>>([]);

  const measureLines = useCallback(() => {
    // Measure relative to the SVG element itself (absolute inset-0 inside desktop div)
    const svg = svgRef.current;
    if (!svg) return;
    const cr = svg.getBoundingClientRect();
    const center = (ref: React.RefObject<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2 - cr.left, y: r.top + r.height / 2 - cr.top };
    };
    const v = center(nodeRefs.vijay);
    const b = center(nodeRefs.binu);
    const s = center(nodeRefs.sajiv);
    const h = center(nodeRefs.harish);
    const sk = center(nodeRefs.santhosh);
    const sr = center(nodeRefs.sakthivel);
    if (!v || !b || !s || !h || !sk || !sr) return;
    setLines([
      { x1: v.x, y1: v.y, x2: s.x, y2: s.y },
      { x1: b.x, y1: b.y, x2: s.x, y2: s.y },
      { x1: s.x, y1: s.y, x2: h.x, y2: h.y },
      { x1: h.x, y1: h.y, x2: sk.x, y2: sk.y },
      { x1: h.x, y1: h.y, x2: sr.x, y2: sr.y },
    ]);
  }, []);


  useEffect(() => {
    measureLines();
    const ro = new ResizeObserver(measureLines);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener('scroll', measureLines, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener('scroll', measureLines);
    };
  }, [measureLines]);


  return (
    <section 
      ref={containerRef} 
      className="relative bg-[#08111f] min-h-screen lg:h-[90vh] lg:min-h-[800px] w-full overflow-hidden flex flex-col items-center justify-center py-20 lg:py-0"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setHoveredNode(null); mouseX.set(0); mouseY.set(0); }}
    >
      {/* Background Gradients & Grid */}
      <div className="absolute inset-0 bg-[#08111f] z-0" />
      <div className="absolute inset-0 opacity-[0.04] z-0 pointer-events-none" style={{backgroundSize:"40px 40px", backgroundImage:"linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)"}} />
      
      {/* Section Heading */}
      <div className="absolute top-6 left-0 w-full text-center z-20 pointer-events-none">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#8FA3B8] mb-2">Team & Guidance</p>
        <h2 className="font-serif text-2xl lg:text-3xl font-bold text-white tracking-wide" style={{fontFamily:"'Fraunces',serif"}}>The People Behind KAAVAL AI</h2>
      </div>
      
      {/* Dynamic Spotlight */}
      <motion.div 
        className="absolute inset-0 z-0 pointer-events-none hidden lg:block"
        style={{
          background: `radial-gradient(800px circle at ${springX}px ${springY}px, rgba(255,255,255,0.06), transparent 40%)`
        }}
      />

      {/* Morphing Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.h1 
            key={hoveredNode || 'default'}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 0.05, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.4 }}
            className="text-[12vw] lg:text-[10vw] font-black text-white whitespace-nowrap text-center tracking-tighter" 
            style={{fontFamily:"'Inter', sans-serif"}}
          >
            {BG_TEXTS[hoveredNode || 'default']}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* Vertical Hierarchy Flow (Left Side) */}
      <div className="hidden lg:flex absolute left-10 top-1/2 -translate-y-1/2 flex-col items-center gap-2 z-10 opacity-40">
         {['Guidance', 'Leadership', 'Development', 'Execution'].map((text, i, arr) => (
           <React.Fragment key={text}>
             <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#8FA3B8] rotate-180" style={{writingMode: "vertical-rl"}}>{text}</span>
             {i < arr.length - 1 && <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />}
           </React.Fragment>
         ))}
      </div>

      {/* ========================================= */}
      {/* DESKTOP LAYOUT                            */}
      {/* ========================================= */}
      <div className="hidden lg:block relative w-full max-w-[1100px] h-[750px] z-10 pointer-events-none perspective-[1000px]">
        
        {/* SVG Connection Lines — only visible on Sajiv hover, DOM-measured */}
        <svg
          ref={svgRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-30"
          style={{ overflow: 'visible' }}
        >
          <AnimatePresence>
            {hoveredNode === 'sajiv' && lines.map((ln, i) => (
              <motion.line
                key={i}
                x1={ln.x1} y1={ln.y1} x2={ln.x2} y2={ln.y2}
                stroke="rgba(245,158,11,0.45)"
                strokeWidth={1.5}
                strokeDasharray="5 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                exit={{ pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.55, delay: i * 0.08, ease: "easeOut" }}
                vectorEffect="non-scaling-stroke"
              />
            ))}
          </AnimatePresence>
        </svg>

        {/* KV MENTOR */}
        <motion.div 
          className="absolute left-[8%] top-[10%] pointer-events-auto"
          animate={{ x: mouseX.get() * 4, y: mouseY.get() * 4, opacity: getOpacity('vijay'), scale: getScale('vijay') }}
          transition={{ opacity: { duration: 0.3 }, scale: { duration: 0.3 } }}
          onMouseEnter={() => setHoveredNode('vijay')}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] bg-red-500 rounded-full blur-[60px] opacity-[0.1] mix-blend-screen pointer-events-none animate-pulse" />
          <div ref={nodeRefs.vijay} className="bg-white/[0.03] backdrop-blur-xl border border-[#f59e0b]/40 rounded-2xl h-[80px] px-6 flex items-center gap-4 shadow-lg overflow-hidden group">
             <div className="w-14 h-16 rounded-xl bg-gradient-to-br from-[#1e293b] to-black flex items-center justify-center border border-white/20 transition-all group-hover:from-red-600 group-hover:to-red-900 overflow-hidden">
                <span className="text-sm font-bold text-white">KV</span>
             </div>
             <div className="flex flex-col pr-2">
                <span className="font-serif text-base font-bold text-white whitespace-nowrap">Dr. K. Vijay</span>
                <AnimatePresence>
                  {hoveredNode === 'vijay' && (
                    <motion.span initial={{height:0, opacity:0}} animate={{height:'auto', opacity:1}} exit={{height:0, opacity:0}} className="text-[10px] text-[#8FA3B8] font-mono tracking-widest uppercase">
                      Academic Mentor<br/><span className="text-[8px] opacity-70">Rajalakshmi Engineering College Chennai</span>
                    </motion.span>
                  )}
                </AnimatePresence>
             </div>
          </div>
        </motion.div>

        {/* BJ MENTOR */}
        <motion.div 
          className="absolute right-[8%] top-[10%] pointer-events-auto"
          animate={{ x: mouseX.get() * 4, y: mouseY.get() * 4, opacity: getOpacity('binu'), scale: getScale('binu') }}
          transition={{ opacity: { duration: 0.3 }, scale: { duration: 0.3 } }}
          onMouseEnter={() => setHoveredNode('binu')}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150px] h-[150px] bg-red-500 rounded-full blur-[60px] opacity-[0.1] mix-blend-screen pointer-events-none animate-pulse" />
          <div ref={nodeRefs.binu} className="bg-white/[0.03] backdrop-blur-xl border border-[#f59e0b]/40 rounded-2xl h-[80px] px-6 flex items-center gap-4 shadow-lg overflow-hidden group">
             <div className="flex flex-col items-end pl-2">
                <span className="font-serif text-base font-bold text-white whitespace-nowrap">Binu J</span>
                <AnimatePresence>
                  {hoveredNode === 'binu' && (
                    <motion.span initial={{height:0, opacity:0}} animate={{height:'auto', opacity:1}} exit={{height:0, opacity:0}} className="text-[10px] text-[#8FA3B8] font-mono tracking-widest uppercase text-right">
                      Industrial Mentor<br/><span className="text-[8px] opacity-70">Excel Technologies, Nagercoil</span>
                    </motion.span>
                  )}
                </AnimatePresence>
             </div>
             <div className="w-14 h-16 rounded-xl bg-gradient-to-br from-[#1e293b] to-black flex items-center justify-center border border-white/20 transition-all group-hover:from-red-600 group-hover:to-red-900 overflow-hidden">
                <span className="text-sm font-bold text-white">BJ</span>
             </div>
          </div>
        </motion.div>

        {/* SAJIV (Centerpiece) */}
        <motion.div 
          className="absolute left-[50%] top-[20%] w-[260px] h-[300px] pointer-events-auto z-30"
          style={{ marginLeft: -130 }}
          animate={{ x: isMobile ? 0 : mouseX.get() * 12, y: isMobile ? 0 : mouseY.get() * 12, opacity: getOpacity('sajiv'), scale: getScale('sajiv') }}
          transition={{ opacity: { duration: 0.3 }, scale: { duration: 0.3 } }}
          onMouseEnter={() => setHoveredNode('sajiv')}
        >
          {/* Ambient Breathing Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#f59e0b] rounded-full blur-[120px] mix-blend-screen pointer-events-none animate-pulse" style={{ opacity: isMobile ? 0.05 : 0.15 }} />

          {/* Stacked Polaroid Deployments */}
          <div className="absolute inset-0 pointer-events-none -z-10">
            <motion.img 
              src="/hero-mosaic/mosaic-1.jpeg" 
              animate={{ opacity: hoveredNode === 'sajiv' ? 0.4 : 0.18, filter: hoveredNode === 'sajiv' ? 'blur(2px)' : 'blur(4px)' }}
              className="absolute -left-20 top-4 w-[220px] h-[140px] object-cover rounded-lg border border-white/10 -rotate-[8deg] shadow-2xl transition-all duration-500 grayscale" 
            />
            <motion.img 
              src="/hero-mosaic/mosaic-2.jpeg" 
              animate={{ opacity: hoveredNode === 'sajiv' ? 0.4 : 0.18, filter: hoveredNode === 'sajiv' ? 'blur(2px)' : 'blur(4px)' }}
              className="absolute -right-24 top-20 w-[200px] h-[130px] object-cover rounded-lg border border-white/10 rotate-[6deg] shadow-2xl transition-all duration-500 grayscale" 
            />
            <motion.img 
              src="/hero-mosaic/mosaic-4.jpeg" 
              animate={{ opacity: hoveredNode === 'sajiv' ? 0.4 : 0.18, filter: hoveredNode === 'sajiv' ? 'blur(2px)' : 'blur(4px)' }}
              className="absolute left-8 -bottom-16 w-[230px] h-[150px] object-cover rounded-lg border border-white/10 -rotate-[4deg] shadow-2xl transition-all duration-500 grayscale" 
            />
          </div>

          {/* Slide-out Panel */}
          <AnimatePresence>
            {hoveredNode === 'sajiv' && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 280 }} 
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute top-10 w-[200px] bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-2xl p-6 shadow-2xl -z-20 pointer-events-none"
              >
                <p className="text-[#f59e0b] text-[10px] uppercase font-mono tracking-widest mb-1">SIH Winner</p>
                <p className="text-white font-bold text-sm mb-1">KAAVAL AI</p>
                <p className="text-[#8FA3B8] text-xs">Live Deployment<br/>Nagercoil Police</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div ref={nodeRefs.sajiv} className="relative w-full h-full bg-[#0f1729]/60 backdrop-blur-2xl border border-[#f59e0b]/30 rounded-[2rem] p-8 flex flex-col items-center justify-center text-center shadow-[0_0_40px_rgba(245,158,11,0.1)] group">
             <div className="w-24 h-32 rounded-xl bg-gradient-to-br from-[#1e293b] to-black mb-6 flex items-center justify-center border border-white/20 transition-all duration-500 group-hover:from-[#f59e0b] group-hover:to-[#b45309] shadow-inner overflow-hidden">
                <span className="text-4xl font-black text-white/80 group-hover:text-white transition-colors">SJ</span>
             </div>
             <h3 className="font-serif text-2xl font-bold text-white tracking-wide whitespace-nowrap" style={{fontFamily:"'Fraunces',serif"}}>Sajiv Jess B I</h3>
          </div>
        </motion.div>

        {/* HARISH */}
        <motion.div 
          className="absolute left-[50%] top-[60%] w-[220px] h-[255px] pointer-events-auto z-20"
          style={{ marginLeft: -110 }}
          animate={{ x: mouseX.get() * 8, y: mouseY.get() * 8, opacity: getOpacity('harish'), scale: getScale('harish') }}
          transition={{ opacity: { duration: 0.3 }, scale: { duration: 0.3 } }}
          onMouseEnter={() => setHoveredNode('harish')}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-500 rounded-full blur-[80px] opacity-[0.1] mix-blend-screen pointer-events-none animate-pulse" />
          <div ref={nodeRefs.harish} className="w-full h-full bg-[#0f1729]/40 backdrop-blur-xl border border-[#3b82f6]/30 rounded-[1.8rem] p-6 flex flex-col items-center justify-center text-center shadow-[0_0_30px_rgba(59,130,246,0.05)] group">
             <div className="w-20 h-24 rounded-xl bg-gradient-to-br from-[#1e293b] to-black mb-5 flex items-center justify-center border border-white/20 transition-all duration-500 group-hover:from-[#3b82f6] group-hover:to-[#1d4ed8] shadow-inner overflow-hidden">
                <span className="text-3xl font-bold text-white/80 group-hover:text-white transition-colors">HT</span>
             </div>
             <h3 className="font-serif text-2xl font-bold text-white" style={{fontFamily:"'Fraunces',serif"}}>Harish T</h3>
          </div>
        </motion.div>

        {/* SANTHOSH */}
        <motion.div 
          className="absolute left-[20%] bottom-[5%] w-[170px] h-[195px] pointer-events-auto z-10"
          animate={{ x: mouseX.get() * 6, y: mouseY.get() * 6, opacity: getOpacity('santhosh'), scale: getScale('santhosh') }}
          transition={{ opacity: { duration: 0.3 }, scale: { duration: 0.3 } }}
          onMouseEnter={() => setHoveredNode('santhosh')}
        >
          <div ref={nodeRefs.santhosh} className="w-full h-full bg-white/[0.02] backdrop-blur-lg border border-white/10 rounded-[1.5rem] p-5 flex flex-col items-center justify-center text-center shadow-lg group">
             <div className="w-16 h-20 rounded-xl bg-gradient-to-br from-[#1e293b] to-black mb-4 flex items-center justify-center border border-white/10 transition-all duration-500 group-hover:from-[#475569] group-hover:to-[#1e293b] overflow-hidden">
                <span className="text-2xl font-bold text-white/70 group-hover:text-white transition-colors">SK</span>
             </div>
             <h3 className="font-serif text-lg font-bold text-white/90 leading-tight" style={{fontFamily:"'Fraunces',serif"}}>Santhosh<br/>Kumar</h3>
          </div>
        </motion.div>

        {/* SAKTHIVEL */}
        <motion.div 
          className="absolute right-[20%] bottom-[5%] w-[170px] h-[195px] pointer-events-auto z-10"
          animate={{ x: mouseX.get() * 6, y: mouseY.get() * 6, opacity: getOpacity('sakthivel'), scale: getScale('sakthivel') }}
          transition={{ opacity: { duration: 0.3 }, scale: { duration: 0.3 } }}
          onMouseEnter={() => setHoveredNode('sakthivel')}
        >
          <div ref={nodeRefs.sakthivel} className="w-full h-full bg-white/[0.02] backdrop-blur-lg border border-white/10 rounded-[1.5rem] p-5 flex flex-col items-center justify-center text-center shadow-lg group">
             <div className="w-16 h-20 rounded-xl bg-gradient-to-br from-[#1e293b] to-black mb-4 flex items-center justify-center border border-white/10 transition-all duration-500 group-hover:from-[#475569] group-hover:to-[#1e293b] overflow-hidden">
                <span className="text-2xl font-bold text-white/70 group-hover:text-white transition-colors">SR</span>
             </div>
             <h3 className="font-serif text-lg font-bold text-white/90 leading-tight" style={{fontFamily:"'Fraunces',serif"}}>Sakthivel R</h3>
          </div>
        </motion.div>

      </div>

      {/* ========================================= */}
      {/* MOBILE LAYOUT                             */}
      {/* ========================================= */}
      <div className="lg:hidden relative z-10 w-full max-w-sm px-6 flex flex-col gap-6">
        
        {/* Mentors Row */}
        <div className="flex flex-col gap-4">
          {[{initials:'KV', name:'Dr. K. Vijay', role:'Academic Mentor'}, {initials:'BJ', name:'Binu J', role:'Industrial Mentor'}].map((m,i)=>(
            <div key={i} className="bg-white/[0.03] backdrop-blur-xl border border-[#f59e0b]/30 rounded-2xl py-4 px-6 flex items-center gap-4">
              <div className="w-14 h-16 rounded-xl bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center shrink-0 overflow-hidden">
                <span className="font-bold text-white">{m.initials}</span>
              </div>
              <div>
                <p className="font-serif font-bold text-white">{m.name}</p>
                <p className="text-[10px] text-[#8FA3B8] font-mono uppercase tracking-widest">{m.role}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Sajiv */}
        <div className="w-full bg-[#0f1729]/60 backdrop-blur-2xl border border-[#f59e0b]/40 rounded-3xl p-8 flex flex-col items-center text-center shadow-[0_0_30px_rgba(245,158,11,0.1)] mt-4">
           <div className="w-20 h-28 rounded-xl bg-gradient-to-br from-[#f59e0b] to-[#b45309] mb-4 flex items-center justify-center overflow-hidden">
             <span className="text-3xl font-black text-white">SJ</span>
           </div>
           <h3 className="font-serif text-2xl font-bold text-white mb-3 whitespace-nowrap" style={{fontFamily:"'Fraunces',serif"}}>Sajiv Jess B I</h3>
           <div className="flex flex-col gap-1 border-t border-white/10 pt-4 w-full">
             <p className="text-[#f59e0b] text-[10px] uppercase font-mono tracking-widest">SIH Winner</p>
             <p className="text-white font-bold text-sm">KAAVAL AI</p>
             <p className="text-[#8FA3B8] text-xs">Live Deployment</p>
           </div>
        </div>

        {/* Harish */}
        <div className="w-10/12 mx-auto bg-[#0f1729]/40 backdrop-blur-xl border border-[#3b82f6]/40 rounded-3xl p-6 flex flex-col items-center text-center mt-2">
           <div className="w-16 h-20 rounded-xl bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] mb-4 flex items-center justify-center overflow-hidden">
             <span className="text-2xl font-bold text-white">HT</span>
           </div>
           <h3 className="font-serif text-xl font-bold text-white mb-2" style={{fontFamily:"'Fraunces',serif"}}>Harish T</h3>
           <p className="text-[#3b82f6] text-[9px] uppercase tracking-widest font-mono">System Integration</p>
        </div>

        {/* Base Row */}
        <div className="flex gap-4 justify-between mt-2">
          {[{initials:'SK', name:'Santhosh'}, {initials:'SR', name:'Sakthivel'}].map((m,i)=>(
            <div key={i} className="flex-1 bg-white/[0.02] backdrop-blur-lg border border-white/10 rounded-2xl p-5 flex flex-col items-center justify-center text-center">
              <div className="w-14 h-16 rounded-xl bg-gradient-to-br from-[#475569] to-[#1e293b] mb-3 flex items-center justify-center overflow-hidden">
                <span className="text-lg font-bold text-white">{m.initials}</span>
              </div>
              <h3 className="font-serif text-sm font-bold text-white/90">{m.name}</h3>
            </div>
          ))}
        </div>
      </div>
      
    </section>
  );
}
