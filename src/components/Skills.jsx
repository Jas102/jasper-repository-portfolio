import { useEffect, useRef, useState } from "react";
import SectionGlow from "./SectionGlow";
import SkillIcon from "./SkillIcons";
import { ClipboardList, Code2, Wrench, Cloud, Palette, Users } from "lucide-react";

const CATEGORY_ICONS = {
  "Project Management": ClipboardList,
  "Frontend Development": Code2,
  "Tools & Platforms": Wrench,
  "DevOps & Hosting": Cloud,
  Design: Palette,
  "Soft Skills": Users,
};

const CATEGORIES = [
  {
    title: "Project Management",
    tagline: "Skills I use professionally, day to day.",
    skills: [
      "Project Management",
      "Agile Methodology",
      "Scrum",
      "Sprint Planning",
      "Client Communication",
      "Requirements Gathering",
      "Risk Management",
      "Task Prioritization",
      "Team Coordination",
      "Documentation",
    ],
  },
  {
    title: "Frontend Development",
    tagline: "Technologies I'm comfortable building with.",
    skills: ["HTML5", "CSS3", "JavaScript (ES6+)", "React", "Tailwind CSS", "Responsive Design"],
  },
  {
    title: "Tools & Platforms",
    tagline: "Tools I've used on real projects.",
    skills: ["Git", "GitLab", "Docker", "GitHub", "Linux", "WordPress"],
  },
  {
    title: "DevOps & Hosting",
    tagline: "What sets me apart from a typical PM.",
    skills: ["CI/CD", "Website Deployment", "Domain & DNS Management", "Server Hosting", "Nginx"],
  },
  {
    title: "Design",
    tagline: "Comfortable across the design handoff.",
    skills: ["Adobe Photoshop", "Adobe Illustrator", "Canva"],
  },
  {
    title: "Soft Skills",
    tagline: "How I work with people.",
    skills: ["Leadership", "Problem Solving", "Communication", "Time Management", "Critical Thinking", "Adaptability"],
  },
];

function useInView(threshold = 0.15) {
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

export default function Skills() {
  const [sectionRef, inView] = useInView();

  return (
    <section id="skills" ref={sectionRef} className="relative py-28 md:py-36">
      <SectionGlow variant="amber" position="20% 60%" />
      <div className="relative max-w-6xl mx-auto px-6">
        <p className="text-zinc-500 dark:text-white/40 text-[13px] tracking-[0.3em] uppercase mb-6">
          Skills
        </p>
        <h2 className="text-zinc-900 dark:text-white font-semibold tracking-tight leading-[1.05] text-4xl md:text-5xl max-w-xl">
          What I bring to a project.
        </h2>
        <p className="mt-4 text-zinc-500 dark:text-white/40 text-sm">
          Hover a category to see everything in it.
        </p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((category, i) => (
            <div
              key={category.title}
              tabIndex={0}
              className="group relative border border-zinc-900/10 dark:border-white/10 rounded-2xl p-7 bg-zinc-900/[0.015] dark:bg-white/[0.02] hover:bg-zinc-900/[0.03] dark:hover:bg-white/[0.05] hover:border-zinc-900/20 dark:hover:border-white/25 hover:-translate-y-1 focus:bg-zinc-900/[0.03] dark:focus:bg-white/[0.05] focus:border-zinc-900/20 dark:focus:border-white/25 transition-all duration-300 ease-out"
              style={{
                transitionDelay: inView ? `${i * 90}ms` : "0ms",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0px)" : "translateY(14px)",
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <h3 className="flex items-center gap-2.5 text-zinc-900 dark:text-white text-lg font-medium tracking-tight">
                  {(() => {
                    const CategoryIcon = CATEGORY_ICONS[category.title];
                    return CategoryIcon ? (
                      <CategoryIcon className="w-[18px] h-[18px] text-zinc-500 dark:text-white/50" strokeWidth={1.8} />
                    ) : null;
                  })()}
                  {category.title}
                </h3>
                <span className="shrink-0 text-zinc-400 dark:text-white/30 text-[11px] tracking-wide mt-1">
                  {category.skills.length}
                </span>
              </div>

              <p className="mt-2 text-zinc-500 dark:text-white/45 text-[13px] leading-relaxed">
                {category.tagline}
              </p>

              {/* hover-revealed skill list */}
              <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] group-focus:grid-rows-[1fr] transition-[grid-template-rows] duration-400 ease-out">
                <div className="overflow-hidden">
                  <div className="flex flex-wrap gap-2 pt-5 mt-5 border-t border-zinc-900/10 dark:border-white/10">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1.5 text-[13px] text-zinc-600 dark:text-white/70 border border-zinc-900/10 dark:border-white/10 rounded-full px-3.5 py-1.5 whitespace-nowrap hover:border-zinc-900/25 dark:hover:border-white/30 hover:text-zinc-900 dark:hover:text-white transition-colors duration-200"
                      >
                        <SkillIcon name={skill} className="w-3.5 h-3.5 shrink-0 opacity-70" />
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}