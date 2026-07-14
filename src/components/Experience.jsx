import { useEffect, useRef, useState } from "react";
import SectionGlow from "./SectionGlow";

const HISTORY = [
  {
    kind: "job-brief",
    date: "Dec 2023 — Apr 2024",
    role: "Customer Service Representative",
    org: "Foundever",
    points: [
      "Delivered customer support in a fast-paced environment.",
      "Resolved customer concerns while meeting performance targets.",
      "Developed strong communication and problem-solving skills.",
    ],
    tech: [],
  },
  {
    kind: "job",
    date: "Jun 2024 — Present",
    role: "Project Manager",
    org: "Technodream LLC",
    points: [
      "Managed multiple website development projects from planning through deployment.",
      "Coordinated daily communication between clients, developers, and designers.",
      "Planned project timelines and monitored deliverables to ensure deadlines were met.",
      "Oversaw website hosting, domain management, and deployment activities.",
      "Assisted with troubleshooting technical issues related to websites and infrastructure.",
      "Worked with Git, GitLab, Docker, and CI/CD workflows as part of the development process.",
    ],
    tech: ["Git", "GitLab", "Docker", "Linux", "WordPress", "CI/CD"],
  },
  {
    kind: "learning",
    date: "Ongoing",
    role: "Frontend Development",
    org: "React & Tailwind CSS",
    points: [
      "Building modern web applications using React and Tailwind CSS.",
      "Learning component-based architecture and responsive UI development.",
      "Deploying projects with GitHub and Vercel.",
      "Expanding knowledge of JavaScript and frontend best practices.",
    ],
    tech: ["React", "Tailwind CSS", "GitHub", "Vercel"],
  },
];

// Tracks how far the viewer has scrolled through a section, as a 0→1 progress
// value, instead of a single fire-once "is it visible yet" boolean. The
// timeline line and each stop use this to unveil in step with the scroll,
// rather than all animating together the moment the section appears.
function useScrollProgress() {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = (e) => setReduceMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const node = ref.current;
    if (!node || reduceMotion) return;

    let frame = null;

    const compute = () => {
      const rect = node.getBoundingClientRect();
      const vh = window.innerHeight;
      // Progress begins once the section's top crosses 85% down the viewport,
      // and completes once its bottom passes 25% down the viewport — so the
      // reveal plays out across the natural scroll through the section.
      const startLine = vh * 0.85;
      const endLine = vh * 0.25;
      const span = rect.height + (startLine - endLine);
      const traveled = startLine - rect.top;
      const p = Math.min(Math.max(traveled / span, 0), 1);
      setProgress(p);
      frame = null;
    };

    const onScroll = () => {
      if (frame != null) return;
      frame = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame != null) cancelAnimationFrame(frame);
    };
  }, [reduceMotion]);

  return [ref, reduceMotion ? 1 : progress];
}

// Reveals a single card the moment it actually enters the viewport, rather
// than waiting on the section-wide scroll-progress calculation below (which
// could finish "catching up" only after the user had already scrolled past
// a card — the delayed-panel issue).
function useCardInView(threshold = 0.2) {
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
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView];
}

function Card({ item, align }) {
  const isLearning = item.kind === "learning";
  const isBrief = item.kind === "job-brief";

  return (
    <div
      className={`rounded-2xl border p-6 md:p-7 transition-colors duration-200 ${
        isLearning
          ? "border-dashed border-zinc-900/15 dark:border-white/20 bg-zinc-900/[0.015] dark:bg-white/[0.02] hover:border-zinc-900/30 dark:hover:border-white/35"
          : "border-zinc-900/10 dark:border-white/10 bg-zinc-900/[0.015] dark:bg-white/[0.02] hover:border-zinc-900/20 dark:hover:border-white/25"
      }`}
    >
      <div className={`flex items-center gap-2 text-zinc-500 dark:text-white/40 text-[11px] tracking-widest uppercase mb-2 ${align === "right" ? "md:justify-end" : ""}`}>
        <span>{item.date}</span>
        {isLearning && (
          <span className="text-zinc-600 dark:text-white/50 border border-zinc-900/15 dark:border-white/15 rounded-full px-2 py-0.5 normal-case tracking-normal text-[10px]">
            Ongoing
          </span>
        )}
      </div>

      <h3 className={`text-zinc-900 dark:text-white text-xl md:text-2xl font-medium tracking-tight ${isBrief ? "text-lg md:text-xl" : ""}`}>
        {item.role}
      </h3>
      <div className={`text-zinc-500 dark:text-white/50 text-sm mt-1 ${align === "right" ? "md:text-right" : ""}`}>
        {item.org}
      </div>

      <ul className={`mt-4 space-y-2 ${align === "right" ? "md:text-right" : ""}`}>
        {item.points.map((point) => (
          <li
            key={point}
            className={`text-zinc-600 dark:text-white/60 text-[15px] leading-relaxed flex gap-3 ${
              align === "right" ? "md:flex-row-reverse" : ""
            }`}
          >
            <span className="text-zinc-400 dark:text-white/25 mt-[3px] shrink-0">—</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>

      {item.tech.length > 0 && (
        <div className={`mt-5 pt-5 border-t border-zinc-900/10 dark:border-white/10 flex flex-wrap gap-2 ${align === "right" ? "md:justify-end" : ""}`}>
          {item.tech.map((t) => (
            <span
              key={t}
              className="text-[12px] text-zinc-600 dark:text-white/60 border border-zinc-900/10 dark:border-white/10 rounded-full px-3 py-1 whitespace-nowrap"
            >
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function TimelineStop({ item, isLeft, dotScale }) {
  const [ref, inView] = useCardInView(0.15);

  const cardStyle = {
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0px) scale(1)" : "translateY(20px) scale(0.97)",
  };

  return (
    <div ref={ref} className="relative md:grid md:grid-cols-2 md:gap-10">
      {/* desktop dot — lights up as the line passes it */}
      <span
        className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2 top-7 w-3.5 h-3.5 rounded-full bg-white dark:bg-black border-2 border-zinc-900 dark:border-white z-10 transition-transform duration-300 ease-out"
        style={{ transform: `translate(-50%, 0) scale(${dotScale})` }}
      />
      {/* mobile dot */}
      <span
        className="md:hidden absolute left-0 top-7 w-3.5 h-3.5 rounded-full bg-white dark:bg-black border-2 border-zinc-900 dark:border-white z-10 transition-transform duration-300 ease-out"
        style={{ transform: `scale(${dotScale})` }}
      />

      <div className="pl-10 md:pl-0">
        {isLeft ? (
          <div className="md:pr-14 transition-[opacity,transform] duration-500 ease-out will-change-transform" style={cardStyle}>
            <Card item={item} align="left" />
          </div>
        ) : (
          <div className="hidden md:block" />
        )}
      </div>

      {!isLeft && (
        <div
          className="pl-10 md:pl-14 md:col-start-2 transition-[opacity,transform] duration-500 ease-out will-change-transform"
          style={cardStyle}
        >
          <Card item={item} align="right" />
        </div>
      )}
    </div>
  );
}

export default function Experience() {
  const [sectionRef, progress] = useScrollProgress();
  const n = HISTORY.length;

  return (
    <section id="experience" ref={sectionRef} className="relative py-28 md:py-36">
      <SectionGlow variant="slate" position="80% 40%" />
      <div className="relative max-w-5xl mx-auto px-6">
        <p className="text-zinc-500 dark:text-white/40 text-[13px] tracking-[0.3em] uppercase mb-6">
          Experience
        </p>
        <h2 className="text-zinc-900 dark:text-white font-semibold tracking-tight leading-[1.05] text-4xl md:text-5xl max-w-xl mb-20">
          Where I've worked, and what I'm building toward.
        </h2>

        <div className="relative">
          {/* desktop center line — height now tracks live scroll progress, not a one-shot reveal */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-zinc-900/10 dark:bg-white/10 -translate-x-1/2" />
          <div
            className="hidden md:block absolute left-1/2 top-0 w-px bg-zinc-900 dark:bg-white -translate-x-1/2"
            style={{ height: `${progress * 100}%` }}
          />

          {/* mobile left line */}
          <div className="md:hidden absolute left-[7px] top-0 bottom-0 w-px bg-zinc-900/10 dark:bg-white/10" />
          <div
            className="md:hidden absolute left-[7px] top-0 w-px bg-zinc-900 dark:bg-white"
            style={{ height: `${progress * 100}%` }}
          />

          <div className="flex flex-col gap-14 md:gap-6">
            {HISTORY.map((item, i) => {
              const isLeft = i % 2 === 0;

              // Dot fill still syncs loosely with the connecting line so the
              // line and its markers feel like one continuous animation —
              // but the card itself (below) reveals on its own visibility,
              // not on this section-wide value.
              const revealAt = (i + 0.25) / n;
              const windowSize = 1.1 / n;
              const local = Math.min(Math.max((progress - revealAt) / windowSize, 0), 1);
              const eased = 1 - Math.pow(1 - local, 3);

              return (
                <TimelineStop key={item.role} item={item} isLeft={isLeft} dotScale={0.5 + eased * 0.5} />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}