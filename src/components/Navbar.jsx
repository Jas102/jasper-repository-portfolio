import { useState, useEffect } from "react";

function MenuIcon(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...props}>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function XIcon(props) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...props}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#project" },
  { label: "Contact", href: "#contact" },
];

const NAVBAR_OFFSET = 80;
const SCROLL_DURATION = 900;

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function smoothScrollTo(targetY, duration) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();

  function step(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    window.scrollTo(0, startY + distance * easeInOutCubic(progress));
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e, href) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    setOpen(false);

    if (href === "#") {
      smoothScrollTo(0, SCROLL_DURATION);
      return;
    }

    const target = document.querySelector(href);
    if (!target) return;
    const targetY = target.getBoundingClientRect().top + window.scrollY - NAVBAR_OFFSET;
    smoothScrollTo(targetY, SCROLL_DURATION);
  };

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-white/20 dark:bg-black/20 border-b border-zinc-900/10 dark:border-white/10 shadow-[0_8px_30px_-15px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_30px_-15px_rgba(0,0,0,0.5)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => handleNavClick(e, "#")}
            className="text-zinc-900 dark:text-white text-sm font-semibold tracking-[0.2em] uppercase"
          >
            Jasper<span className="text-zinc-400 dark:text-white/40">.</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="group relative text-[15px] tracking-wide text-zinc-600 hover:text-zinc-900 dark:text-white/60 dark:hover:text-white transition-colors duration-200"
              >
                {link.label}
                <span className="absolute -bottom-1.5 left-1/2 h-px w-0 bg-zinc-900 dark:bg-white transition-all duration-300 group-hover:left-0 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, "#contact")}
              className="inline-flex items-center text-[13px] tracking-wide text-zinc-900 border border-zinc-900/15 hover:bg-zinc-900 hover:text-white dark:text-white dark:border-white/20 dark:hover:bg-white dark:hover:text-black rounded-full px-5 py-2 transition-colors duration-200"
            >
              Let's talk
            </a>
          </div>

          {/* Mobile controls */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={() => setOpen(!open)}
              className="text-zinc-700 hover:text-zinc-900 dark:text-white/80 dark:hover:text-white transition-colors"
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-64 border-t border-zinc-900/10 dark:border-white/10" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-6 py-4 gap-4 backdrop-blur-xl bg-white/30 dark:bg-black/30">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-base text-zinc-700 hover:text-zinc-900 dark:text-white/70 dark:hover:text-white transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "#contact")}
            className="mt-2 text-sm text-zinc-900 border border-zinc-900/15 dark:text-white dark:border-white/20 rounded-full px-4 py-2 text-center hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
          >
            Let's talk
          </a>
        </div>
      </div>
    </nav>
  );
}