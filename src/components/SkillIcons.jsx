import {
  ClipboardList,
  Users,
  MessagesSquare,
  ListChecks,
  ShieldAlert,
  ListOrdered,
  FileText,
  Container,
  Cloud,
  Network,
  Server,
  Palette,
  Image,
  Lightbulb,
  Puzzle,
  Clock3,
  BrainCircuit,
  Workflow,
} from "lucide-react";

/* ---- custom monoline glyphs for brands lucide doesn't cover ---- */

function GitGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="6" cy="18" r="2.4" />
      <circle cx="6" cy="6" r="2.4" />
      <circle cx="17" cy="12" r="2.4" />
      <path d="M6 8.4V15.6" />
      <path d="M8.3 6.6C12 7.2 14.6 9.2 15.2 10.3" />
    </svg>
  );
}

function ReactGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
      <circle cx="12" cy="12" r="1.8" fill="currentColor" stroke="none" />
      <ellipse cx="12" cy="12" rx="9.5" ry="3.8" />
      <ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(120 12 12)" />
    </svg>
  );
}

function WordPressGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M4 9.5l3.6 9.8L10 12.4 8 7.2" />
      <path d="M13 7.2l3 9L18.6 9" />
      <path d="M18.6 9c.9.4 1.4 1 1.4 1.9" />
    </svg>
  );
}

function TailwindGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M4 12c1-3 2.6-4.5 5-4.5 3 0 3.6 2.2 6 2.2 2 0 3-1 4-2.7-1 3-2.6 4.5-5 4.5-3 0-3.6-2.2-6-2.2-2 0-3 1-4 2.7Z" />
      <path d="M4 17.5c1-3 2.6-4.5 5-4.5 3 0 3.6 2.2 6 2.2 2 0 3-1 4-2.7-1 3-2.6 4.5-5 4.5-3 0-3.6-2.2-6-2.2-2 0-3 1-4 2.7Z" />
    </svg>
  );
}

function HTMLGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 3h14l-1.3 15L12 20l-5.7-2L5 3Z" />
      <path d="M8 7.5h8l-.3 3.3H9.3l.2 2.4 2.5.8 2.5-.8.2-2" />
    </svg>
  );
}

function CSSGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M5 3h14l-1.3 15L12 20l-5.7-2L5 3Z" />
      <path d="M16 7.5H8l.2 2.6h7.4l-.3 3-3.3 1-3.3-1-.2-1.8" />
    </svg>
  );
}

function JSGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
      <path d="M10.2 9v6c0 1.3-.6 2-1.7 2s-1.6-.6-1.9-1.3" />
      <path d="M17 9.2c-.4-.5-1-.8-1.9-.8-1.2 0-1.9.6-1.9 1.5 0 2 4 1.2 4 3.6 0 1.1-.9 1.8-2.1 1.8s-1.9-.5-2.3-1.2" />
    </svg>
  );
}

function LinuxGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M9 4.2c0-1 1.3-1.7 3-1.7s3 .7 3 1.7c0 1.6.7 2.4 1.5 3.4.9 1.1 1.5 2.3 1.5 4 0 3.6-2.7 6-6 6s-6-2.4-6-6c0-1.7.6-2.9 1.5-4C8.3 6.6 9 5.8 9 4.2Z" />
      <circle cx="9.8" cy="10.5" r=".8" fill="currentColor" stroke="none" />
      <circle cx="14.2" cy="10.5" r=".8" fill="currentColor" stroke="none" />
      <path d="M7 20c1.5-1 3.3-1 5-1s3.5 0 5 1" />
    </svg>
  );
}

function NginxGlyph(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M12 3 20.5 8v8L12 21 3.5 16V8Z" />
      <path d="M8.5 8.5v7l7-7v7" />
    </svg>
  );
}

function BadgeGlyph({ label, ...props }) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <text x="12" y="15.5" textAnchor="middle" fontSize="8.5" fontWeight="600" fill="currentColor" fontFamily="inherit">
        {label}
      </text>
    </svg>
  );
}

const PsGlyph = (props) => <BadgeGlyph label="Ps" {...props} />;
const AiGlyph = (props) => <BadgeGlyph label="Ai" {...props} />;
const CanvaGlyph = (props) => <BadgeGlyph label="C" {...props} />;
const GitHubGlyph = (props) => <BadgeGlyph label="GH" {...props} />;
const GitLabGlyph = (props) => <BadgeGlyph label="GL" {...props} />;

/* ---- lookup: skill label -> icon component ---- */

export const SKILL_ICON_MAP = {
  // project management
  "Project Management": ClipboardList,
  "Agile Methodology": Workflow,
  Scrum: ListOrdered,
  "Sprint Planning": Clock3,
  "Client Communication": MessagesSquare,
  "Requirements Gathering": FileText,
  "Risk Management": ShieldAlert,
  "Task Prioritization": ListChecks,
  "Team Coordination": Users,
  Documentation: FileText,

  // frontend
  "HTML5": HTMLGlyph,
  "CSS3": CSSGlyph,
  "JavaScript (ES6+)": JSGlyph,
  React: ReactGlyph,
  "Tailwind CSS": TailwindGlyph,
  "Responsive Design": Puzzle,

  // tools & platforms
  Git: GitGlyph,
  GitLab: GitLabGlyph,
  Docker: Container,
  GitHub: GitHubGlyph,
  Linux: LinuxGlyph,
  WordPress: WordPressGlyph,

  // devops & hosting
  "CI/CD": Workflow,
  "Website Deployment": Cloud,
  "Domain & DNS Management": Network,
  "Server Hosting": Server,
  Nginx: NginxGlyph,

  // design
  "Adobe Photoshop": PsGlyph,
  "Adobe Illustrator": AiGlyph,
  Canva: CanvaGlyph,

  // soft skills
  Leadership: Lightbulb,
  "Problem Solving": Puzzle,
  Communication: MessagesSquare,
  "Time Management": Clock3,
  "Critical Thinking": BrainCircuit,
  Adaptability: Palette,
};

export default function SkillIcon({ name, className = "w-3.5 h-3.5" }) {
  const Icon = SKILL_ICON_MAP[name] || Image;
  return <Icon className={className} strokeWidth={Icon === Image ? 1.8 : undefined} />;
}