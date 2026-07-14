import { useEffect, useState } from "react";
import SectionGlow from "./SectionGlow";

const STATS = [
  { label: "Client websites", value: 90, suffix: "+" },
  { label: "On-time delivery", value: 98, suffix: "%" },
  { label: "Teams led", value: 12, suffix: "" },
];

const STEPS = ["Plan", "Align", "Execute", "Deliver"];

const ROLES = [
  "Project Manager",
  "Frontend Developer",
  "Technical Problem Solver",
  "Web Enthusiast",
];

function useCountUp(target, start) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;
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

function useTypewriter(words, { typingSpeed = 65, deletingSpeed = 35, pause = 1500 } = {}) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = (e) => setReduceMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const current = words[index];

    if (!deleting && subIndex === current.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
      return;
    }
    const t = setTimeout(
      () => setSubIndex((s) => s + (deleting ? -1 : 1)),
      deleting ? deletingSpeed : typingSpeed
    );
    return () => clearTimeout(t);
  }, [subIndex, deleting, index, words, typingSpeed, deletingSpeed, pause, reduceMotion]);

  useEffect(() => {
    const b = setInterval(() => setBlink((v) => !v), 500);
    return () => clearInterval(b);
  }, []);

  if (reduceMotion) return { text: words[0], blink: true };
  return { text: words[index].slice(0, subIndex), blink };
}

function StatBlock({ stat, start, delay }) {
  const value = useCountUp(stat.value, start);
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
        {value}
        {stat.suffix}
      </div>
      <div className="text-zinc-500 dark:text-white/40 text-[12px] tracking-wide mt-1">
        {stat.label}
      </div>
    </div>
  );
}

function useCyclingHighlight(count, { interval = 1800, startDelay = 1400 } = {}) {
  const [active, setActive] = useState(-1);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = (e) => setReduceMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    let timer;
    const start = setTimeout(() => {
      setActive(0);
      timer = setInterval(() => {
        setActive((i) => (i + 1) % count);
      }, interval);
    }, startDelay);
    return () => {
      clearTimeout(start);
      if (timer) clearInterval(timer);
    };
  }, [count, interval, startDelay, reduceMotion]);

  return active;
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [lineDrawn, setLineDrawn] = useState(false);
  const { text: role, blink } = useTypewriter(ROLES);
  const activeStep = useCyclingHighlight(STEPS.length);

  useEffect(() => {
    const t1 = setTimeout(() => setMounted(true), 100);
    const t2 = setTimeout(() => setLineDrawn(true), 500);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center">
      <SectionGlow variant="violet" position="35% 25%" />
      <div className="relative max-w-6xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
        {/* left: copy */}
        <div>
          <p className="text-zinc-500 dark:text-white/40 text-[13px] tracking-[0.3em] uppercase mb-6">
            Hi, I'm
          </p>

          <h1 className="text-zinc-900 dark:text-white font-semibold tracking-tight leading-[0.95] text-[13vw] sm:text-6xl md:text-7xl">
            Jasper
          </h1>

          {/* rotating role — name stays fixed above, this is the only thing that animates */}
          <div className="mt-5 flex items-center gap-2 text-xl md:text-2xl min-h-[1.6em]">
            <span className="text-zinc-500 dark:text-white/50 font-medium">
              I'm a
            </span>
            <span className="text-zinc-900 dark:text-white font-semibold">
              {role}
              <span
                className="inline-block w-[2px] h-[0.9em] ml-1 -mb-[0.1em] bg-zinc-900 dark:bg-white align-middle"
                style={{ opacity: blink ? 1 : 0 }}
              />
            </span>
          </div>

          <p className="mt-6 text-zinc-600 dark:text-white/60 text-lg md:text-xl max-w-xl">
            Turning ideas into successful digital products.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#project"
              className="inline-flex items-center text-[13px] tracking-wide text-white bg-zinc-900 hover:bg-zinc-700 dark:text-black dark:bg-white dark:hover:bg-white/85 rounded-full px-6 py-3 transition-colors duration-200"
            >
              View projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center text-[13px] tracking-wide text-zinc-900 border border-zinc-900/15 hover:border-zinc-900/40 dark:text-white dark:border-white/20 dark:hover:border-white/50 rounded-full px-6 py-3 transition-colors duration-200"
            >
              Get in touch
            </a>
          </div>

          {/* stat counters */}
          <div className="mt-14 flex flex-wrap gap-x-12 gap-y-6 border-t border-zinc-900/10 dark:border-white/10 pt-8 max-w-md">
            {STATS.map((stat, i) => (
              <StatBlock key={stat.label} stat={stat} start={mounted} delay={i * 150} />
            ))}
          </div>
        </div>

        {/* right: workflow infographic */}
        <div className="relative hidden lg:block">
          <div className="relative pl-6">
            {/* vertical connecting line */}
            <div className="absolute left-6 top-2 bottom-2 w-px bg-zinc-900/10 dark:bg-white/10" />
            <div
              className="absolute left-6 top-2 w-px bg-zinc-900 dark:bg-white transition-all ease-out"
              style={{
                height: lineDrawn ? "calc(100% - 16px)" : "0%",
                transitionDuration: "1400ms",
              }}
            />

            <div className="flex flex-col gap-10">
              {STEPS.map((step, i) => {
                const isActive = i === activeStep;
                return (
                  <div
                    key={step}
                    className="relative flex items-center gap-5 transition-all duration-700 ease-out"
                    style={{
                      transitionDelay: `${300 + i * 220}ms`,
                      opacity: mounted ? 1 : 0,
                      transform: mounted ? "translateX(0px)" : "translateX(16px)",
                    }}
                  >
                    <span
                      className={`absolute -left-6 w-3 h-3 rounded-full border-2 transition-colors duration-500 ${
                        isActive
                          ? "bg-zinc-900 dark:bg-white border-zinc-900 dark:border-white"
                          : "bg-white dark:bg-black border-zinc-900 dark:border-white"
                      }`}
                      style={{ transform: "translateX(50%)" }}
                    />
                    <div
                      className={`ml-6 flex items-baseline gap-3 rounded-2xl px-5 py-4 w-full border transition-all duration-500 ease-out ${
                        isActive
                          ? "border-zinc-900/25 dark:border-white/30 bg-zinc-900/[0.05] dark:bg-white/[0.08] scale-[1.03] shadow-[0_10px_30px_-12px_rgba(0,0,0,0.15)] dark:shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]"
                          : "border-zinc-900/10 dark:border-white/10 bg-zinc-900/[0.02] dark:bg-white/[0.03] scale-100"
                      }`}
                    >
                      <span
                        className={`text-xs tracking-widest transition-colors duration-500 ${
                          isActive ? "text-zinc-900 dark:text-white" : "text-zinc-400 dark:text-white/30"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`text-base font-medium tracking-wide transition-colors duration-500 ${
                          isActive ? "text-zinc-900 dark:text-white" : "text-zinc-500 dark:text-white/60"
                        }`}
                      >
                        {step}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* scroll cue */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-zinc-400 dark:text-white/30 text-[11px] tracking-[0.25em] uppercase">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-zinc-400/60 dark:from-white/40 to-transparent" />
      </div>
    </section>
  );
}