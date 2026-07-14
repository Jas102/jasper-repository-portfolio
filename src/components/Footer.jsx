import { SKILL_ICON_MAP } from "./SkillIcons";

const ReactGlyph = SKILL_ICON_MAP["React"];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-zinc-900/10 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-10 relative flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-zinc-500 dark:text-white/40 text-[13px] tracking-wide">
          © {year} Jasper Assle Cruz. All rights reserved.
        </div>

        {/* centered — sits in the middle of the bar on desktop regardless
            of how wide the copyright text or the link on the right are */}
        <span className="sm:absolute sm:left-1/2 sm:-translate-x-1/2 inline-flex items-center gap-1.5 text-zinc-500 dark:text-white/50 text-[13px]">
          <ReactGlyph className="w-[15px] h-[15px] text-sky-500 dark:text-sky-400" />
          Made with React
        </span>

        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="text-zinc-500 dark:text-white/50 text-[13px] hover:text-zinc-900 dark:hover:text-white transition-colors duration-200"
        >
          Back to top
        </a>
      </div>
    </footer>
  );
}