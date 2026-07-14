import { useEffect, useRef, useState } from "react";
import SectionGlow from "./SectionGlow";
import { Mail, Phone, MessageCircle } from "lucide-react";

// lucide-react dropped some brand glyphs (LinkedIn among them) in newer
// releases, so this is a small custom icon in the same style as the other
// brand glyphs in SkillIcons.jsx.
function LinkedinGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="3.5" />
      <path d="M7.5 10v6.5" />
      <circle cx="7.5" cy="7" r="0.9" fill="currentColor" stroke="none" />
      <path d="M11.5 16.5v-4c0-1.4 1-2.5 2.4-2.5s2.1 1 2.1 2.5v4" />
      <path d="M11.5 10v6.5" />
    </svg>
  );
}

const CHANNELS = [
  { label: "Email", value: "jasperassleccruz10@gmail.com", href: "mailto:jasperassleccruz10@gmail.com", icon: Mail },
  { label: "Phone", value: "+63 994 456 0671", href: "tel:+639944560671", icon: Phone },
  { label: "LinkedIn", value: "linkedin.com/in/jcruz09", href: "https://linkedin.com/in/jcruz09", icon: LinkedinGlyph },
  { label: "WhatsApp", value: "+63 967 350 6716", href: "https://wa.me/639673506716", icon: MessageCircle },
];

function useInView(threshold = 0.25) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

export default function Contact() {
  const [sectionRef, inView] = useInView();

  return (
    <section id="contact" ref={sectionRef} className="relative py-28 md:py-36">
      <SectionGlow variant="violet" position="50% 60%" />
      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <p
          className="text-zinc-500 dark:text-white/40 text-[13px] tracking-[0.3em] uppercase mb-6 transition-all duration-700 ease-out"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0px)" : "translateY(10px)",
          }}
        >
          Contact
        </p>

        <h2
          className="text-zinc-900 dark:text-white font-semibold tracking-tight leading-[1.05] text-4xl md:text-6xl transition-all duration-700 ease-out"
          style={{
            transitionDelay: "100ms",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0px)" : "translateY(10px)",
          }}
        >
          Let's build something together.
        </h2>

        <p
          className="mt-6 text-zinc-600 dark:text-white/60 text-lg max-w-lg mx-auto transition-all duration-700 ease-out"
          style={{
            transitionDelay: "200ms",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0px)" : "translateY(10px)",
          }}
        >
          Have a project that needs a clear plan and someone to run it?
          I'm happy to talk it through.
        </p>

        <div
          className="mt-8 transition-all duration-700 ease-out"
          style={{
            transitionDelay: "300ms",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0px)" : "translateY(10px)",
          }}
        >
          <a
            href="mailto:jasperassleccruz10@gmail.com"
            className="inline-flex items-center text-[13px] tracking-wide text-white bg-zinc-900 hover:bg-zinc-700 dark:text-black dark:bg-white dark:hover:bg-white/85 rounded-full px-7 py-3.5 transition-colors duration-200"
          >
            Say hello
          </a>
        </div>

        {/* contact channels */}
        <div
          className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-2xl mx-auto transition-all duration-700 ease-out"
          style={{
            transitionDelay: "400ms",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0px)" : "translateY(10px)",
          }}
        >
          {CHANNELS.map((channel) => {
            const Icon = channel.icon;
            return (
              <a
                key={channel.label}
                href={channel.href}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel={channel.href.startsWith("http") ? "noreferrer" : undefined}
                className="group flex items-center justify-between border border-zinc-900/10 dark:border-white/10 rounded-xl px-5 py-4 hover:border-zinc-900/25 dark:hover:border-white/30 hover:bg-zinc-900/[0.02] dark:hover:bg-white/[0.03] hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-center gap-3.5">
                  <span className="flex items-center justify-center w-9 h-9 rounded-full border border-zinc-900/10 dark:border-white/10 text-zinc-500 dark:text-white/50 group-hover:text-zinc-900 dark:group-hover:text-white group-hover:border-zinc-900/25 dark:group-hover:border-white/30 transition-colors duration-200 shrink-0">
                    <Icon className="w-4 h-4" strokeWidth={1.8} />
                  </span>
                  <div>
                    <div className="text-zinc-500 dark:text-white/40 text-[11px] tracking-widest uppercase">
                      {channel.label}
                    </div>
                    <div className="text-zinc-900 dark:text-white text-sm mt-1">{channel.value}</div>
                  </div>
                </div>
                <span className="text-zinc-400 dark:text-white/30 group-hover:text-zinc-900 dark:group-hover:text-white group-hover:translate-x-1 transition-all duration-200">
                  →
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}