import { useEffect, useRef, useState } from "react";
import { useTheme } from "../context/ThemeContext";

function SunIcon(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.4M12 19.1v2.4M4.6 4.6l1.7 1.7M17.7 17.7l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.6 19.4l1.7-1.7M17.7 6.3l1.7-1.7" />
    </svg>
  );
}

function MoonIcon(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  );
}

const MARGIN = 16;
const SIZE = 56;

export default function FloatingThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  const btnRef = useRef(null);
  const dragState = useRef({ dragging: false, moved: false, startX: 0, startY: 0, originX: 0, originY: 0 });

  const [pos, setPos] = useState(() => ({
    x: typeof window !== "undefined" ? window.innerWidth - SIZE - MARGIN : 24,
    y: typeof window !== "undefined" ? window.innerHeight - SIZE - MARGIN : 24,
  }));

  const clamp = (x, y) => {
    const maxX = window.innerWidth - SIZE - MARGIN;
    const maxY = window.innerHeight - SIZE - MARGIN;
    return { x: Math.min(Math.max(x, MARGIN), Math.max(maxX, MARGIN)), y: Math.min(Math.max(y, MARGIN), Math.max(maxY, MARGIN)) };
  };

  useEffect(() => {
    const onResize = () => setPos((p) => clamp(p.x, p.y));
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handlePointerDown = (e) => {
    const point = e.touches ? e.touches[0] : e;
    dragState.current = {
      dragging: true,
      moved: false,
      startX: point.clientX,
      startY: point.clientY,
      originX: pos.x,
      originY: pos.y,
    };
    window.addEventListener("mousemove", handlePointerMove);
    window.addEventListener("mouseup", handlePointerUp);
    window.addEventListener("touchmove", handlePointerMove, { passive: false });
    window.addEventListener("touchend", handlePointerUp);
  };

  const handlePointerMove = (e) => {
    const s = dragState.current;
    if (!s.dragging) return;
    const point = e.touches ? e.touches[0] : e;
    const dx = point.clientX - s.startX;
    const dy = point.clientY - s.startY;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) s.moved = true;
    if (s.moved && e.cancelable) e.preventDefault();
    setPos(clamp(s.originX + dx, s.originY + dy));
  };

  const handlePointerUp = () => {
    dragState.current.dragging = false;
    window.removeEventListener("mousemove", handlePointerMove);
    window.removeEventListener("mouseup", handlePointerUp);
    window.removeEventListener("touchmove", handlePointerMove);
    window.removeEventListener("touchend", handlePointerUp);
  };

  const handleClick = () => {
    if (dragState.current.moved) return; // was a drag, not a tap
    toggleTheme();
  };

  return (
    <button
      ref={btnRef}
      type="button"
      onMouseDown={handlePointerDown}
      onTouchStart={handlePointerDown}
      onClick={handleClick}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className="fixed z-[60] flex items-center justify-center rounded-full border shadow-lg backdrop-blur-md cursor-grab active:cursor-grabbing select-none touch-none transition-colors duration-300 bg-white/90 border-zinc-900/10 text-zinc-700 hover:border-zinc-900/25 dark:bg-black/80 dark:border-white/15 dark:text-white/85 dark:hover:border-white/30"
      style={{
        left: pos.x,
        top: pos.y,
        width: SIZE,
        height: SIZE,
        transition: dragState.current.dragging ? "none" : "left 120ms ease-out, top 120ms ease-out, background-color 300ms, border-color 300ms",
      }}
    >
      {/* subtle pulse ring so it reads as a floating widget, not an accidental leftover button */}
      <span className="absolute inset-0 rounded-full bg-zinc-900/5 dark:bg-white/10 animate-ping-slow" />
      <span className="relative">{isDark ? <MoonIcon /> : <SunIcon />}</span>
      <style>{`
        @keyframes ping-slow {
          0% { transform: scale(1); opacity: 0.6; }
          80%, 100% { transform: scale(1.35); opacity: 0; }
        }
        .animate-ping-slow { animation: ping-slow 2.8s cubic-bezier(0,0,0.2,1) infinite; }
        @media (prefers-reduced-motion: reduce) {
          .animate-ping-slow { animation: none; }
        }
      `}</style>
    </button>
  );
}
