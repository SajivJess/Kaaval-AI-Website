import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestPilot: () => void;
}

const NAV_LINKS = [
  { href: "#platform",   label: "Platform" },
  { href: "#deployment", label: "Deployment" },
  { href: "#our-impact", label: "Impact" },
  { href: "#media",      label: "Media" },
  { href: "#contact",    label: "Contact" },
];

export default function MobileNav({ isOpen, onClose, onRequestPilot }: MobileNavProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed inset-0 z-[200] flex flex-col"
          style={{ background: "rgba(5, 10, 18, 0.97)", backdropFilter: "blur(20px)" }}
        >
          {/* Top bar — logo + close */}
          <div className="flex items-center justify-between px-6 py-5">
            <img
              src="/kaaval-logo.png"
              alt="Kaaval AI"
              className="h-10 w-auto object-contain"
              style={{ filter: "invert(1) brightness(2)" }}
            />
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="w-10 h-10 flex items-center justify-center rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X size={22} />
            </button>
          </div>

          {/* Nav links — centered, stagger up */}
          <div className="flex-1 flex flex-col items-center justify-center gap-2 px-6">
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={onClose}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 12 }}
                transition={{ duration: 0.3, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="w-full text-center py-4 text-white font-serif font-bold transition-colors hover:text-[#CC2929]"
                style={{
                  fontFamily: "'Fraunces', serif",
                  fontSize: "clamp(1.75rem, 7vw, 2.5rem)",
                  letterSpacing: "-0.01em",
                }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>

          {/* Divider */}
          <div className="mx-6 h-px bg-white/10 mb-6" />

          {/* Fixed CTA at bottom */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.28, ease: "easeOut" }}
            className="px-6 pb-8"
            style={{ paddingBottom: "calc(2rem + env(safe-area-inset-bottom, 0px))" }}
          >
            <button
              onClick={() => { onClose(); onRequestPilot(); }}
              className="w-full py-4 rounded-xl font-bold text-white text-base tracking-wide transition-all active:scale-[0.97]"
              style={{ background: "#CC2929" }}
            >
              Request Pilot Deployment
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
