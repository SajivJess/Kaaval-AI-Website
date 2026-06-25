import { useEffect, useRef } from "react";

export default function SpotlightCursor() {
  const spotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = spotRef.current;
    if (!el) return;

    let raf: number;
    let cx = -999, cy = -999;

    const onMove = (e: MouseEvent) => {
      cx = e.clientX;
      cy = e.clientY;
    };

    const tick = () => {
      if (el) {
        el.style.background = `radial-gradient(600px circle at ${cx}px ${cy}px, rgba(255,255,255,0.04), transparent 70%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={spotRef}
      className="pointer-events-none fixed inset-0 z-[9999] transition-opacity duration-300"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
