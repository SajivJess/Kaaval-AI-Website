import React, { useRef, useState, useEffect } from "react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  onMouseEnter?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  "data-testid"?: string;
}

export default function MagneticButton({
  children,
  className,
  style,
  onClick,
  onMouseEnter,
  onMouseLeave,
  type = "button",
  ...rest
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isTouch) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    setOffset({ x: dx * 0.15, y: dy * 0.15 });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOffset({ x: 0, y: 0 });
    onMouseLeave?.(e);
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    onMouseEnter?.(e);
  };

  return (
    <button
      ref={ref}
      type={type}
      className={className}
      style={{
        ...style,
        transform: isTouch ? undefined : `translate(${offset.x}px, ${offset.y}px)`,
        transition: isTouch ? undefined : "transform 0.25s cubic-bezier(0.23, 1, 0.32, 1)",
        willChange: isTouch ? undefined : "transform",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
