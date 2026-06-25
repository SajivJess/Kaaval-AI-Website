import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Home, Monitor, Newspaper, Users, Phone } from "lucide-react";
import { useScrollDirection } from "../hooks/useScrollDirection";

const TABS = [
  { icon: Home,      label: "Home",     href: "#" },
  { icon: Monitor,   label: "Platform", href: "#platform" },
  { icon: Newspaper, label: "Media",    href: "#media" },
  { icon: Users,     label: "Team",     href: "#team" },
  { icon: Phone,     label: "Contact",  href: "#contact" },
];

const SECTION_IDS = ["hero", "platform", "media", "team", "contact"];

export default function FloatingBottomNav() {
  const [visible, setVisible] = useState(false);          // after hero
  const [activeIdx, setActiveIdx] = useState(0);
  const scrollDir = useScrollDirection(6);
  const navHidden = scrollDir === "down";

  // Show after scrolling past 80% of viewport height
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track active section via IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTION_IDS.forEach((id, i) => {
      const el = id === "hero"
        ? document.querySelector("section")
        : document.getElementById(id);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveIdx(i); },
        { rootMargin: "-40% 0px -40% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  if (!visible) return null;

  return (
    <div className={`float-nav md:hidden ${navHidden ? "hidden-nav" : ""}`}>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-1 px-3 py-2 rounded-2xl"
        style={{
          background: "rgba(10, 18, 32, 0.75)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.05)",
        }}
      >
        {TABS.map((tab, i) => {
          const isActive = activeIdx === i;
          const Icon = tab.icon;
          return (
            <a
              key={i}
              href={tab.href}
              aria-label={tab.label}
              className="relative flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-all duration-200"
              style={{
                background: isActive ? "rgba(204,41,41,0.15)" : "transparent",
                color: isActive ? "#CC2929" : "rgba(255,255,255,0.45)",
              }}
            >
              <Icon size={18} strokeWidth={isActive ? 2.5 : 1.5} />
              {/* Active dot */}
              {isActive && (
                <span
                  className="absolute bottom-1.5 w-1 h-1 rounded-full"
                  style={{ background: "#CC2929" }}
                />
              )}
            </a>
          );
        })}
      </motion.div>
    </div>
  );
}
