import { useEffect, useRef, useState } from "react";
import SectionGlow from "./SectionGlow";
import { useTheme } from "../context/ThemeContext";
import {
  HeartPulse,
  Scale,
  HardHat,
  ShieldCheck,
  Leaf,
  Building2,
  ShoppingCart,
  Globe,
  Cpu,
  Megaphone,
  UtensilsCrossed,
  BedDouble,
  Sparkles,
  Shirt,
  Wrench,
  HeartHandshake,
  GraduationCap,
  Landmark,
  Car,
  Factory,
  Dumbbell,
} from "lucide-react";

const STATS = [
  { value: 90, suffix: "+", label: "Client Websites" },
  { value: 15, suffix: "+", label: "Industries Served" },
  { value: 2, suffix: "+", label: "Years Experience" },
  { value: null, display: "Multiple", label: "CMS Platforms" },
];

const DETAILS = [
  {
    title: "Technical background",
    body:
      "While my primary role is project management, I enjoy working with the technical side of web development — hands-on with Git, GitLab, Docker, CI/CD pipelines, website hosting, domain management, and troubleshooting deployment issues. I'm currently expanding into frontend work with React and modern web tooling.",
  },
  {
    title: "How I work",
    body:
      "Effective project management starts with understanding both the client's goals and the technical challenges behind them. I focus on solving problems, improving workflows, and helping teams collaborate more efficiently.",
  },
  {
    title: "Current focus",
    body:
      "Building modern web applications with React while growing as both a technical project manager and frontend developer — and looking for opportunities to contribute to meaningful digital products.",
  },
];

// icon per industry — swap any of these out if a different lucide icon reads better
const INDUSTRY_ICON = {
  Healthcare: HeartPulse,
  Legal: Scale,
  Construction: HardHat,
  Insurance: ShieldCheck,
  Recovery: Leaf,
  "Real Estate": Building2,
  "E-commerce": ShoppingCart,
  "Web Agencies": Globe,
  Technology: Cpu,
  Marketing: Megaphone,
  Restaurants: UtensilsCrossed,
  Hospitality: BedDouble,
  Beauty: Sparkles,
  Apparel: Shirt,
  "Home Services": Wrench,
  "Non-profit": HeartHandshake,
  Education: GraduationCap,
  Finance: Landmark,
  Automotive: Car,
  Industrial: Factory,
  Fitness: Dumbbell,
};

const INDUSTRY_ROW_1 = ["Healthcare", "Legal", "Construction", "Insurance", "Recovery", "Real Estate", "E-commerce", "Web Agencies", "Technology", "Marketing", "Restaurants"];
const INDUSTRY_ROW_2 = ["Hospitality", "Beauty", "Apparel", "Home Services", "Non-profit", "Education", "Finance", "Automotive", "Industrial", "Fitness"];

function useInView(threshold = 0.2) {
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

function useCountUp(target, start) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start || target == null) return;
    let frame;
    const duration = 1200;
    const startTime = performance.now();

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, target]);

  return value;
}

function StatBlock({ stat, start, delay }) {
  const count = useCountUp(stat.value, start);
  return (
    <div
      className="transition-all duration-700 ease-out"
      style={{
        transitionDelay: `${delay}ms`,
        opacity: start ? 1 : 0,
        transform: start ? "translateY(0px)" : "translateY(10px)",
      }}
    >
      <div className="text-zinc-900 dark:text-white text-3xl md:text-4xl font-semibold tabular-nums">
        {stat.value != null ? `${count}${stat.suffix}` : stat.display}
      </div>
      <div className="text-zinc-500 dark:text-white/40 text-[12px] tracking-wide mt-1 max-w-[16ch]">
        {stat.label}
      </div>
    </div>
  );
}

function MarqueeRow({ items, reverse }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden group">
      <div
        className="flex gap-3 w-max"
        style={{
          animation: `${reverse ? "marquee-reverse" : "marquee"} 26s linear infinite`,
        }}
      >
        {doubled.map((item, i) => {
          const Icon = INDUSTRY_ICON[item];
          return (
            <span
              key={item + i}
              className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-white/70 border border-zinc-900/10 dark:border-white/10 rounded-full px-5 py-2 whitespace-nowrap hover:border-zinc-900/25 dark:hover:border-white/30 hover:text-zinc-900 dark:hover:text-white transition-colors duration-200"
            >
              {Icon && <Icon className="w-3.5 h-3.5 shrink-0 opacity-70" strokeWidth={1.8} />}
              {item}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function About() {
  const [sectionRef, inView] = useInView(0.15);
  const { theme } = useTheme();
  // swap between two exported versions of the same cutout — dark mode keeps
  // the black shirt / white stroke, light mode uses the inverted version
  // (white shirt / black stroke) you've already made
  const photoSrc = theme === "dark" ? "/jasper-photo-dark.png" : "/jasper-photo-light.png";

  return (
    <section id="about" ref={sectionRef} className="relative py-28 md:py-36 overflow-hidden">
      <SectionGlow variant="cyan" position="70% 15%" />
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-reverse {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>

      <div className="relative max-w-6xl mx-auto px-6">
        {/* intro row: photo + intro copy */}
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-16 items-center">
          <div
            className="transition-all duration-700 ease-out"
            style={{
              opacity: inView ? 1 : 0,
              transform: inView ? "translateX(0px)" : "translateX(-16px)",
            }}
          >
            <div className="relative w-full max-w-sm mx-auto lg:mx-0 aspect-square">
              <style>{`
                @keyframes about-blob-morph {
                  0%, 100% { border-radius: 42% 58% 61% 39% / 46% 41% 59% 54%; transform: rotate(0deg) scale(1); }
                  33% { border-radius: 61% 39% 44% 56% / 54% 61% 39% 46%; transform: rotate(2deg) scale(1.02); }
                  66% { border-radius: 48% 52% 39% 61% / 60% 44% 56% 40%; transform: rotate(-2deg) scale(1.01); }
                }
                @keyframes about-orb-1 {
                  0%   { transform: translate(0%, 0%) scale(1); }
                  33%  { transform: translate(18%, -14%) scale(1.2); }
                  66%  { transform: translate(-12%, 10%) scale(0.9); }
                  100% { transform: translate(0%, 0%) scale(1); }
                }
                @keyframes about-orb-2 {
                  0%   { transform: translate(0%, 0%) scale(1); }
                  40%  { transform: translate(-16%, 14%) scale(1.15); }
                  70%  { transform: translate(10%, -10%) scale(0.92); }
                  100% { transform: translate(0%, 0%) scale(1); }
                }
                @keyframes about-orb-3 {
                  0%   { transform: translate(0%, 0%) scale(1); }
                  50%  { transform: translate(12%, 16%) scale(1.18); }
                  100% { transform: translate(0%, 0%) scale(1); }
                }
                .about-orb-1 { animation: about-orb-1 14s ease-in-out infinite; }
                .about-orb-2 { animation: about-orb-2 18s ease-in-out infinite; }
                .about-orb-3 { animation: about-orb-3 22s ease-in-out infinite; }
                @media (prefers-reduced-motion: reduce) {
                  .about-photo-blob, .about-orb-1, .about-orb-2, .about-orb-3 { animation: none !important; }
                }
              `}</style>

              {/* colorful backdrop for the cutout to sit on — same drifting
                  orb treatment as the site-wide background, just scaled down
                  and tinted to this section's palette, so it actually moves
                  instead of a static gradient fill */}
              <div
                className="about-photo-blob absolute inset-0 overflow-hidden"
                style={{
                  borderRadius: "42% 58% 61% 39% / 46% 41% 59% 54%",
                  animation: "about-blob-morph 18s ease-in-out infinite",
                }}
              >
                {/* base tone so the blob never looks empty between orbs */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#ede9fe] to-[#fce7f3] dark:from-[#18181b] dark:to-[#0a0a0a]" />

                <div
                  className="about-orb-1 absolute -top-[20%] -left-[10%] w-[75%] h-[75%] rounded-full blur-2xl opacity-90 dark:opacity-70"
                  style={{ background: "radial-gradient(circle, #f0abfc 0%, transparent 70%)" }}
                />
                <div
                  className="about-orb-2 absolute top-[10%] -right-[15%] w-[70%] h-[70%] rounded-full blur-2xl opacity-80 dark:opacity-60"
                  style={{ background: "radial-gradient(circle, #22d3ee 0%, transparent 70%)" }}
                />
                <div
                  className="about-orb-3 absolute -bottom-[15%] left-[15%] w-[65%] h-[65%] rounded-full blur-2xl opacity-75 dark:opacity-55"
                  style={{ background: "radial-gradient(circle, #fbbf24 0%, transparent 70%)" }}
                />
              </div>

              {/* the cutout photo itself — no border, no rounded box, no
                  frame; object-contain guarantees nothing gets cropped */}
              <img
                src={photoSrc}
                alt="Jasper Cruz"
                className="absolute inset-0 w-full h-full object-contain object-bottom drop-shadow-[0_12px_20px_rgba(0,0,0,0.25)]"
              />
            </div>
            <div className="mt-4 max-w-sm mx-auto lg:mx-0 flex items-center gap-2 text-zinc-500 dark:text-white/30 text-[12px] tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400/70" />
              Open to new opportunities
            </div>
          </div>

          <div>
            <p
              className="text-zinc-500 dark:text-white/40 text-[13px] tracking-[0.3em] uppercase mb-6 transition-all duration-700 ease-out"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0px)" : "translateY(10px)",
              }}
            >
              About
            </p>

            <h2
              className="text-zinc-900 dark:text-white font-semibold tracking-tight leading-[1.05] text-4xl md:text-5xl max-w-xl transition-all duration-700 ease-out"
              style={{
                transitionDelay: "100ms",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0px)" : "translateY(10px)",
              }}
            >
              Project management, with a technical edge.
            </h2>

            <p
              className="mt-6 text-zinc-600 dark:text-white/60 text-base md:text-lg max-w-xl leading-relaxed transition-all duration-700 ease-out"
              style={{
                transitionDelay: "200ms",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0px)" : "translateY(10px)",
              }}
            >
              Hi, I'm Jasper Cruz, a project manager with over two years of
              experience managing website development projects. I work
              closely with developers, designers, and clients to keep
              delivery on time while keeping communication clear throughout
              the process.
            </p>
          </div>
        </div>

        {/* detail cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {DETAILS.map((detail, i) => (
            <div
              key={detail.title}
              className="group border border-zinc-900/10 dark:border-white/10 rounded-2xl p-7 bg-zinc-900/[0.02] dark:bg-white/[0.02] hover:bg-zinc-900/[0.035] dark:hover:bg-white/[0.05] hover:border-zinc-900/25 dark:hover:border-white/25 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.15)] dark:hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.5)] transition-all duration-300 ease-out"
              style={{
                transitionDelay: inView ? `${300 + i * 120}ms` : "0ms",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0px)" : "translateY(14px)",
              }}
            >
              <h3 className="text-zinc-500 dark:text-white/50 group-hover:text-zinc-700 dark:group-hover:text-white/70 text-[11px] tracking-widest uppercase mb-3 transition-colors duration-300">
                {detail.title}
              </h3>
              <p className="text-zinc-600 dark:text-white/60 text-[15px] leading-relaxed">
                {detail.body}
              </p>
            </div>
          ))}
        </div>

        {/* stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10 border-t border-zinc-900/10 dark:border-white/10 pt-10">
          {STATS.map((stat, i) => (
            <StatBlock key={stat.label} stat={stat} start={inView} delay={700 + i * 120} />
          ))}
        </div>

        {/* industries carousel */}
        <div
          className="mt-16 transition-all duration-700 ease-out"
          style={{ transitionDelay: "1100ms", opacity: inView ? 1 : 0 }}
        >
          <h3 className="text-zinc-500 dark:text-white/40 text-[12px] tracking-widest uppercase mb-5">
            Industries served
          </h3>
          <div className="flex flex-col gap-3">
            <MarqueeRow items={INDUSTRY_ROW_1} />
            <MarqueeRow items={INDUSTRY_ROW_2} reverse />
          </div>
        </div>
      </div>
    </section>
  );
}