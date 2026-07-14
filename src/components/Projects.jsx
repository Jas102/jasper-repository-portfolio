import { useEffect, useRef, useState } from "react";
import SectionGlow from "./SectionGlow";

const END_TO_END = [
  "Project Planning",
  "Client Communication",
  "Team Coordination",
  "Quality Assurance",
  "Website Launch",
];

const SUPPORTING = [
  "Client Communication",
  "Team Coordination",
  "Quality Assurance",
  "Timeline Tracking",
];

const PROJECTS = [
  {
    name: "Graphic Gospel Art",
    industry: "Art / E-commerce",
    platform: "Shopify",
    role: "End-to-End Project Management",
    responsibilities: END_TO_END,
    url: "https://graphicgospelart.com",
    thumbnail:
      "https://graphicgospelart.com/cdn/shop/files/Home_Page_Image_CanaFramed_c07414a1-0e13-4a37-9fee-577f751f792b.jpg?v=1757568875&width=1200",
  },
  {
    name: "Ebony Beauté",
    industry: "Beauty / E-commerce",
    platform: "WooCommerce",
    role: "End-to-End Project Management",
    responsibilities: END_TO_END,
    url: "https://ebony-beaute.com",
    thumbnail: "https://ebony-beaute.com/wp-content/uploads/2026/07/search-appearance.jpg",
  },
  {
    name: "GS Benchmark",
    industry: "Real Estate",
    platform: "WordPress",
    role: "End-to-End Project Management",
    responsibilities: END_TO_END,
    url: "https://gsbenchmark.com",
    thumbnail:
      "https://gsbenchmark.com/wp-content/uploads/2026/02/crw_1240h_620.webp",
  },
  {
    name: "Sabino Recovery",
    industry: "Healthcare / Rehabilitation",
    platform: "WordPress",
    role: "End-to-End Project Management",
    responsibilities: END_TO_END,
    url: "https://sabinorecovery.com",
    thumbnail:
      "https://www.sabinorecovery.com/wp-content/uploads/2024/10/walking-trail-with-cactus-at-our-mental-health-addiction-trauma-center.jpeg",
  },
  {
    name: "Dr. Tadros",
    industry: "Healthcare / Dental",
    platform: "WordPress",
    role: "End-to-End Project Management",
    responsibilities: END_TO_END,
    url: "https://drtadros.com",
    thumbnail: "https://drtadros.com/wp-content/uploads/2025/03/Dalia-Tadros3.jpg",
  },
  {
    name: "Smiles Pianos",
    industry: "Hospitality / Piano Bar",
    platform: "WordPress",
    role: "Project Management",
    responsibilities: SUPPORTING,
    url: "https://smilespianos.com",
    thumbnail:
      "https://assets.zyrosite.com/cdn-cgi/image/format=auto,w=1200,h=630,fit=crop,f=jpeg/YKbrbyeO8RIbV3wa/stage-4-AzG7kvPJxntxnva0.jpg",
  },
  {
    name: "Swagger Custom Apparel",
    industry: "Clothing / E-commerce",
    platform: "WooCommerce",
    role: "Project Management",
    responsibilities: SUPPORTING,
    url: "https://swaggercustomapparel.com",
    thumbnail:
      "https://swaggercustomapparel.com/wp-content/uploads/2023/08/34654484_8156650-1024x602.jpg",
  },
  {
    name: "Demi Cooper",
    industry: "Web Development Agency",
    platform: "WordPress",
    role: "End-to-End Project Management",
    responsibilities: END_TO_END,
    url: "https://demicooper.com",
    thumbnail: "https://demicooper.com/wp-content/uploads/2026/07/HitYourMark-scaled.jpg",
  },
  {
    name: "Hometown Pediatric Dermatology",
    industry: "Healthcare / Pediatrics",
    platform: "WordPress",
    role: "End-to-End Project Management",
    responsibilities: END_TO_END,
    url: "https://hometownpediatricdermatology.com",
    thumbnail:
      "https://demicooper.com/wp-content/uploads/2026/02/Hometown-Feature-768x574.jpg",
  },
];

function useInView(threshold = 0.1) {
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

function Thumbnail({ project }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-zinc-400 dark:text-white/20 text-sm tracking-wide text-center px-4">
          Site preview
        </span>
      </div>
    );
  }

  return (
    <img
      src={project.thumbnail}
      alt={`${project.name} website preview`}
      loading="lazy"
      onError={() => setFailed(true)}
      className="absolute inset-0 w-full h-full object-cover opacity-90 dark:opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500 ease-out"
    />
  );
}

export default function Projects() {
  const [sectionRef, inView] = useInView();

  return (
    <section id="project" ref={sectionRef} className="relative py-28 md:py-36">
      <SectionGlow variant="rose" position="30% 70%" />
      <div className="relative max-w-6xl mx-auto px-6">
        <p className="text-zinc-500 dark:text-white/40 text-[13px] tracking-[0.3em] uppercase mb-6">
          Projects
        </p>
        <h2 className="text-zinc-900 dark:text-white font-semibold tracking-tight leading-[1.05] text-4xl md:text-5xl max-w-2xl">
          Websites I've helped plan, build, and launch.
        </h2>
        <p className="mt-4 text-zinc-500 dark:text-white/40 text-sm">
          Hover a card to see my responsibilities on that project.
        </p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <div
              key={project.name}
              tabIndex={0}
              className="group border border-zinc-900/10 dark:border-white/10 rounded-2xl overflow-hidden bg-zinc-900/[0.015] dark:bg-white/[0.02] hover:border-zinc-900/20 dark:hover:border-white/25 focus:border-zinc-900/20 dark:focus:border-white/25 transition-all duration-500 ease-out"
              style={{
                transitionDelay: inView ? `${i * 70}ms` : "0ms",
                opacity: inView ? 1 : 0,
                transform: inView ? "translateY(0px)" : "translateY(14px)",
              }}
            >
              <a
                href={project.url}
                target="_blank"
                rel="noreferrer"
                className="relative block aspect-video bg-zinc-900/[0.03] dark:bg-white/[0.03] border-b border-zinc-900/10 dark:border-white/10 overflow-hidden"
              >
                <Thumbnail project={project} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 dark:from-black/70 via-black/0 to-black/0" />
                <span className="absolute bottom-3 right-3 text-[11px] text-white bg-black/60 border border-white/10 rounded-full px-3 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  Visit site ↗
                </span>
              </a>

              <div className="p-6">
                <h3 className="text-zinc-900 dark:text-white text-lg font-medium tracking-tight">
                  {project.name}
                </h3>
                <p className="mt-1 text-zinc-500 dark:text-white/45 text-[13px]">{project.industry}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="text-[12px] text-zinc-600 dark:text-white/70 border border-zinc-900/10 dark:border-white/10 rounded-full px-3 py-1">
                    {project.platform}
                  </span>
                  <span className="text-[12px] text-zinc-600 dark:text-white/70 border border-zinc-900/10 dark:border-white/10 rounded-full px-3 py-1">
                    {project.role}
                  </span>
                </div>

                {/* hover-revealed responsibilities */}
                <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] group-focus:grid-rows-[1fr] transition-[grid-template-rows] duration-400 ease-out">
                  <div className="overflow-hidden">
                    <div className="pt-5 mt-5 border-t border-zinc-900/10 dark:border-white/10">
                      <div className="text-zinc-500 dark:text-white/40 text-[11px] tracking-widest uppercase mb-3">
                        Responsibilities
                      </div>
                      <ul className="space-y-1.5">
                        {project.responsibilities.map((r) => (
                          <li
                            key={r}
                            className="text-zinc-600 dark:text-white/60 text-[13px] leading-relaxed flex gap-2"
                          >
                            <span className="text-zinc-400 dark:text-white/25">—</span>
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
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