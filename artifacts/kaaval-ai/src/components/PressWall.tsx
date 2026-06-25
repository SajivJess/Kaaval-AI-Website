import React, { useState, useRef, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// ─── Seeded pseudo-random (no jitter on re-render) ──────────────────────────
function seededRand(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

interface ClippingCard {
  index: number;     // 1-based image index
  layer: 0 | 1 | 2; // 0=bg, 1=mid, 2=fg
  top: number;       // %
  left: number;      // %
  rotate: number;    // deg
  scale: number;
  parallaxSpeed: number;
  isFeatured?: boolean;
}

// Layout: 5 fg, 4 mid, 4 bg  → all 13 clippings
const CARDS: ClippingCard[] = [
  // ── foreground (5) ──────────────────────────────────────
  { index: 1,  layer: 2, top: 15, left: 8,  rotate: -3,  scale: 1.0,  parallaxSpeed: 0.9, isFeatured: false },
  { index: 3,  layer: 2, top: 18, left: 62, rotate:  4,  scale: 0.96, parallaxSpeed: 0.85 },
  { index: 5,  layer: 2, top: 52, left: 5,  rotate: -5,  scale: 0.98, parallaxSpeed: 0.8  },
  { index: 7,  layer: 2, top: 55, left: 70, rotate:  6,  scale: 1.0,  parallaxSpeed: 0.88 },
  { index: 9,  layer: 2, top: 72, left: 38, rotate: -2,  scale: 0.95, parallaxSpeed: 0.92 },
  // ── mid layer (4) ────────────────────────────────────────
  { index: 2,  layer: 1, top: 10, left: 32, rotate:  7,  scale: 0.92, parallaxSpeed: 0.6  },
  { index: 4,  layer: 1, top: 45, left: 50, rotate: -6,  scale: 0.90, parallaxSpeed: 0.55 },
  { index: 6,  layer: 1, top: 68, left: 15, rotate:  3,  scale: 0.93, parallaxSpeed: 0.62 },
  { index: 8,  layer: 1, top: 25, left: 78, rotate: -4,  scale: 0.91, parallaxSpeed: 0.58 },
  // ── background (4) ───────────────────────────────────────
  { index: 10, layer: 0, top: 5,  left: 55, rotate: -8,  scale: 0.85, parallaxSpeed: 0.3  },
  { index: 11, layer: 0, top: 35, left: 80, rotate:  8,  scale: 0.82, parallaxSpeed: 0.28 },
  { index: 12, layer: 0, top: 60, left: 3,  rotate:  5,  scale: 0.84, parallaxSpeed: 0.32 },
  { index: 13, layer: 0, top: 80, left: 60, rotate: -7,  scale: 0.83, parallaxSpeed: 0.29 },
];

const LAYER_OPACITY: Record<number, number>  = { 0: 0.15, 1: 0.55, 2: 1 };
const LAYER_BLUR:    Record<number, string>   = { 0: "blur(4px)", 1: "blur(1px)", 2: "blur(0)" };

interface PressWallProps {
  onOpen: (index: number) => void;
}

export default function PressWall({ onOpen }: PressWallProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Ghost text fade in when section enters
  const ghostOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="media"
      className="relative overflow-hidden py-32"
      style={{
        background: "#070D16",
        minHeight: "90vh",
        maxHeight: "110vh",
      }}
    >
      {/* Ghost text layer */}
      <motion.div
        style={{ opacity: ghostOpacity }}
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-0"
      >
        <p
          className="font-mono font-black text-white tracking-[0.3em] uppercase text-center leading-none"
          style={{ fontSize: "clamp(3rem,10vw,9rem)", opacity: 0.03 }}
        >
          FEATURED
          <br />
          IN
        </p>
        <p
          className="font-serif text-white font-black text-center mt-4"
          style={{ fontSize: "clamp(2rem,7vw,6rem)", opacity: 0.03 }}
        >
          12+ PUBLICATIONS
        </p>
      </motion.div>

      {/* Section header */}
      <div className="relative z-10 text-center mb-8 pointer-events-none">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#CC2929] mb-2">Community & Media Recognition</p>
        <h2
          className="font-serif text-4xl lg:text-5xl font-bold text-white"
          style={{ fontFamily: "'Fraunces',serif" }}
        >
          Media Coverage
        </h2>
        <p className="text-[#8FA3B8] text-sm mt-3 max-w-md mx-auto">
          Featured across print, television, and digital media following the live deployment at Nagercoil.
        </p>
      </div>

      {/* Press Wall cards */}
      <div
        className="relative w-full"
        style={{ height: "70vh" }}
      >
        {CARDS.map((card) => (
          <PressCard
            key={card.index}
            card={card}
            scrollYProgress={scrollYProgress}
            isHovered={hovered === card.index}
            anyHovered={hovered !== null}
            onHover={() => setHovered(card.index)}
            onLeave={() => setHovered(null)}
            onClick={() => onOpen(card.index - 1)}
          />
        ))}
      </div>
    </section>
  );
}

// ─── Individual Press Card ────────────────────────────────────────────────────
function PressCard({
  card,
  scrollYProgress,
  isHovered,
  anyHovered,
  onHover,
  onLeave,
  onClick,
}: {
  card: ClippingCard;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  isHovered: boolean;
  anyHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
}) {
  const yRange = 60 * card.parallaxSpeed;
  const y = useTransform(scrollYProgress, [0, 1], [-yRange / 2, yRange / 2]);

  const targetOpacity = isHovered
    ? 1
    : anyHovered
    ? LAYER_OPACITY[card.layer] * 0.4
    : LAYER_OPACITY[card.layer];

  const targetRotate = isHovered ? 0 : card.rotate;
  const targetScale  = isHovered ? (card.scale + 0.06) : card.scale;
  const targetFilter = isHovered ? "blur(0)" : LAYER_BLUR[card.layer];

  // Card size based on layer
  const w = card.layer === 2 ? 180 : card.layer === 1 ? 148 : 120;

  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        top:    `${card.top}%`,
        left:   `${card.left}%`,
        y,
        zIndex: 10 + card.layer * 10 + (isHovered ? 50 : 0),
        willChange: "transform",
      }}
      animate={{
        opacity: targetOpacity,
        rotate:  targetRotate,
        scale:   targetScale,
        filter:  targetFilter,
      }}
      transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <div
        className="relative overflow-hidden rounded-lg select-none"
        style={{
          width:  w,
          height: w * 1.38,
          boxShadow: isHovered
            ? "0 24px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.12)"
            : "0 8px 24px rgba(0,0,0,0.5)",
          transition: "box-shadow 0.4s ease",
        }}
      >
        <img
          src={`/press/clipping_${card.index}.jpeg`}
          alt={`Press coverage ${card.index}`}
          className="w-full h-full object-cover"
          draggable={false}
        />
        {/* Hover overlay */}
        <div
          className="absolute inset-0 flex items-end justify-center pb-4 transition-opacity duration-300"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
            opacity: isHovered ? 1 : 0,
          }}
        >
          <span className="font-mono text-[9px] uppercase tracking-widest text-white font-bold">
            View Coverage
          </span>
        </div>
      </div>
    </motion.div>
  );
}
