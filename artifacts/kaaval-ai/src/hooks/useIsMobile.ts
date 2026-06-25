import { useState, useEffect } from "react";

export function useIsMobile(breakpoint = 768): boolean {
  const [mobile, setMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < breakpoint
  );

  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < breakpoint);
    window.addEventListener("resize", fn, { passive: true });
    return () => window.removeEventListener("resize", fn);
  }, [breakpoint]);

  return mobile;
}

export function useIsTablet(): boolean {
  const [tablet, setTablet] = useState(
    () =>
      typeof window !== "undefined" &&
      window.innerWidth >= 768 &&
      window.innerWidth < 1024
  );

  useEffect(() => {
    const fn = () =>
      setTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    window.addEventListener("resize", fn, { passive: true });
    return () => window.removeEventListener("resize", fn);
  }, []);

  return tablet;
}

/** Returns true on any touch-capable device */
export function useIsTouch(): boolean {
  const [touch, setTouch] = useState(false);
  useEffect(() => {
    setTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);
  return touch;
}
