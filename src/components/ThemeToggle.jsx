import { useTheme } from "../context/ThemeContext";

function SunIcon(props) {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.4M12 19.1v2.4M4.6 4.6l1.7 1.7M17.7 17.7l1.7 1.7M2.5 12h2.4M19.1 12h2.4M4.6 19.4l1.7-1.7M17.7 6.3l1.7-1.7" />
    </svg>
  );
}

function MoonIcon(props) {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  );
}

export default function ThemeToggle({ className = "" }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      className={`relative inline-flex h-7 w-[52px] shrink-0 items-center rounded-full border transition-colors duration-300 border-zinc-900/10 bg-zinc-900/[0.04] hover:border-zinc-900/20 dark:border-white/15 dark:bg-white/5 dark:hover:border-white/25 ${className}`}
    >
      <span className="sr-only">Toggle theme</span>
      <span
        className="pointer-events-none absolute left-[3px] flex h-[22px] w-[22px] items-center justify-center rounded-full border shadow-sm transition-transform duration-300 ease-out bg-white border-zinc-900/10 text-zinc-700 dark:bg-black dark:border-white/20 dark:text-white/80"
        style={{ transform: isDark ? "translateX(24px)" : "translateX(0px)" }}
      >
        {isDark ? <MoonIcon /> : <SunIcon />}
      </span>
    </button>
  );
}
