import React, { useState, useEffect, useRef, type ReactNode, type CSSProperties } from "react";
import {
  Github, Linkedin, Mail, ExternalLink, ArrowUpRight
} from "lucide-react";

/* ════════════════════════ TYPES ════════════════════════ */

interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  color: string;
  links: { github?: string; github2?: string; live?: string };
  sendsTo?: string;
  receivesFrom?: string[];
}

interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  bullets: string[];
  tech: string[];
}

/* ════════════════════════ DATA ════════════════════════ */

const PROJECTS = [
  {
    id: "syncboard",
    title: "SyncBoard",
    tagline: "Real-time collaborative Kanban board",
    description: "A real-time collaborative Kanban board with WebSocket synchronization and Redis pub/sub for cross-instance broadcasting. Optimistic concurrency control via version-tracked cards prevents silent overwrites. 9-table PostgreSQL schema with cascading constraints. Presence system using Redis SETEX TTL with 15-second heartbeat. Validated with 27 pytest tests and GitHub Actions CI.",
    tech: ["FastAPI", "WebSockets", "Redis", "PostgreSQL", "React", "TypeScript", "dnd-kit", "Docker"],
    color: "#c8ee44",
    links: { github: "https://github.com/abhi-00g/syncboard", live: "https://syncboard-roan.vercel.app" },
  },
  {
    id: "atlas",
    title: "ATLAS — Multi-Tool AI Agent",
    tagline: "Autonomous agent with eval harness",
    description: "An autonomous AI agent with 5 pluggable tools, persistent memory with fuzzy key normalization, two-layer YAML-driven safety guardrails, and a 28-test eval harness — validated with 59 unit tests. Cross-project telemetry feeds real agent usage data to the Dashboard.",
    tech: ["Python", "Groq", "Tavily", "Wikipedia API", "pytest", "Streamlit"],
    color: "#6ee7b7",
    links: { github: "https://github.com/abhi-00g/ai-agent", live: "https://ai-agent-kqppru9yiggruzhppdilfb.streamlit.app" },
    sendsTo: "dashboard",
  },
  {
    id: "dashboard",
    title: "AI Cost & Token Observability Dashboard",
    tagline: "Track every token, every dollar",
    description: "Full observability platform: a Python SDK with background-thread async flushing and exponential backoff, a FastAPI backend, and a React dashboard — tracking costs across 8 models from 3 providers. Validated with 34 end-to-end tests.",
    tech: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Recharts", "Python SDK"],
    color: "#fbbf24",
    links: { github: "https://github.com/abhi-00g/ai-cost-dashboard", live: "https://ai-cost-dashboard-rust.vercel.app" },
    receivesFrom: ["rag", "atlas"],
  },
  {
    id: "cloud-native",
    title: "Cloud-Native Web App",
    tagline: "Production infrastructure from scratch",
    description: "Multi-AZ AWS infrastructure provisioned with Terraform — VPC, RDS, S3, ALB, and Auto Scaling across 3 availability zones with KMS encryption. Cross-account CI/CD pipeline with Packer AMI builds, rolling instance refresh, and CloudWatch instrumentation.",
    tech: ["AWS", "Terraform", "Packer", "GitHub Actions", "Node.js", "PostgreSQL"],
    color: "#93c5fd",
    links: { github: "https://github.com/abhi-00g/webapp", github2: "https://github.com/abhi-00g/tf-aws-infra" },
  },
  {
    id: "rag",
    title: "Intelligent Document Q&A",
    tagline: "RAG pipeline with semantic search",
    description: "A two-stage Retrieval-Augmented Generation pipeline — FAISS vector search followed by cross-encoder reranking (ms-marco-MiniLM-L-6-v2) — with semantic chunking and Gemini 2.5 Flash for grounded, citation-backed answers. Containerized with Docker, CI/CD via GitHub Actions.",
    tech: ["Python", "FAISS", "Gemini API", "LangChain", "Streamlit", "sentence-transformers"],
    color: "#c4b5fd",
    links: { github: "https://github.com/abhi-00g/intelligent-doc-qa", live: "https://intelligent-doc-qa.streamlit.app" },
    sendsTo: "dashboard",
  },
  {
    id: "finance",
    title: "Smart Finance Tracker",
    tagline: "AI-powered personal expense management",
    description: "A full-stack personal finance application with JWT authentication, expense tracking with category-based breakdowns, budget management with overspend alerts, and AI-powered financial insights via Cohere. Features recurring expense detection, interactive pie chart visualizations, and CSV export for financial records.",
    tech: ["Node.js", "Express", "React", "PostgreSQL", "Sequelize", "Cohere API", "JWT"],
    color: "#f9a8d4",
    links: { github: "https://github.com/abhi-00g/smart-finance-tracker" },
  },
];

const EXPERIENCE = [
  {
    role: "AI Engineer Intern",
    company: "Solix Technologies, Inc.",
    period: "Jan – May 2026",
    location: "Boston, MA",
    bullets: [
      "Built a FAISS-based semantic search engine over 10,000+ IP records for Fubon Financial, enabling sub-second similarity retrieval across patent and trademark datasets with configurable distance thresholds",
      "Designed an RBAC authentication system with an admin dashboard and crawl request management interface, enforcing data access restrictions across 5+ user roles and reducing unauthorized queries by 40%",
      "Engineered a Playwright-based multi-site web crawler capable of processing 500+ URLs daily, with structured FastAPI output pipelines that fed directly into the IP infringement detection workflow",
      "Trained an AI-generated image detection pipeline using a fine-tuned Xception model on the FaceForensics++ dataset, achieving 93.3% accuracy in identifying StyleGAN-generated deepfake faces",
      "Collaborated with the data engineering team to integrate crawled IP records into the existing Solixcloud data governance platform, aligning ingestion pipelines with the company's compliance requirements",
    ],
    tech: ["Python", "FAISS", "FastAPI", "Playwright", "TensorFlow", "Xception", "PostgreSQL"],
  },
  {
    role: "Software Engineering Intern",
    company: "Rainier Softech Solutions",
    period: "Jun – Dec 2023",
    location: "Hyderabad, India",
    bullets: [
      "Joined the backend API development team and ramped up on the existing codebase — authentication workflows, ORM-based relational models, API routing structure, and deployment pipelines — mentored by a senior engineer on service-level separation and REST API standards",
      "Standardized user authentication by implementing bcrypt-based password hashing and JWT session handling, resolving login failures caused by inconsistent hashing formats across legacy user records",
      "Refactored Sequelize ORM models by normalizing table relationships and replacing nested sequential queries with optimized JOIN-based queries, reducing API response latency by 30%",
      "Built unit tests for individual service functions and integration tests for full request/response flows using Jest and Postman regression suites, achieving 92% code coverage and catching 4 critical bugs before production deployment",
      "Participated in agile sprint planning and cross-team standups, managing deliverable tracking via Jira and GitHub Projects with a 15% improvement in on-time feature delivery",
    ],
    tech: ["Node.js", "PostgreSQL", "Sequelize", "Jest", "Postman", "JWT", "Jira"],
  },
];

const SKILL_GROUPS = [
  { label: "Languages", items: ["Python", "TypeScript", "JavaScript", "Java", "C++", "SQL"] },
  { label: "AI / ML", items: ["RAG", "LangChain", "FAISS", "Gemini API", "Groq", "Hugging Face", "TensorFlow", "PyTorch"] },
  { label: "Web & Backend", items: ["React", "Node.js", "FastAPI", "Express", "Streamlit", "WebSockets", "REST APIs"] },
  { label: "Cloud & DevOps", items: ["AWS", "Terraform", "Docker", "GitHub Actions", "Packer", "CI/CD"] },
  { label: "Databases", items: ["PostgreSQL", "Redis", "MongoDB", "SQLAlchemy", "Sequelize", "Alembic"] },
  { label: "Testing & Tools", items: ["pytest", "Jest", "Playwright", "Postman", "Git", "Linux"] },
];

const SECTIONS = ["about", "experience", "projects", "skills"];

/* ════════════════════════ HOOKS ════════════════════════ */

function useActiveSection() {
  const [active, setActive] = useState("about");
  useEffect(() => {
    const secs = SECTIONS.map((id) => document.getElementById(id));
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }); },
      { rootMargin: "-30% 0px -50% 0px" }
    );
    secs.forEach((s) => s && obs.observe(s));
    return () => obs.disconnect();
  }, []);
  return active;
}

function useScrollReveal(): [React.RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ════════════════════════ COMPONENTS ════════════════════════ */

function Reveal({ children, className = "", style = {}, delay = 0 }: { children: ReactNode; className?: string; style?: CSSProperties; delay?: number }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div ref={ref} className={`reveal ${visible ? "visible" : ""} ${className}`}
      style={{ ...style, transitionDelay: `${delay * 0.1}s` }}>
      {children}
    </div>
  );
}

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ─── LEFT COLUMN ─── */
function LeftColumn({ active }: { active: string }) {
  return (
    <header style={{
      position: "sticky", top: 0, height: "100vh",
      display: "flex", flexDirection: "column", justifyContent: "space-between",
      paddingTop: 96, paddingBottom: 96,
    }}>
      <div>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)", marginBottom: 8, letterSpacing: "0.02em" }}>
          Abhishek Gade
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 38, fontWeight: 700, lineHeight: 1.15, letterSpacing: "-0.025em", marginBottom: 12, maxWidth: 380 }}>
          <span style={{ cursor: "pointer", color: "var(--text)", transition: "opacity 0.2s" }}
            onClick={() => window.open("https://www.linkedin.com/in/venkata-krishna-raj-abhishek-gade-717147230/", "_blank")}
            onMouseEnter={(e) => e.currentTarget.style.opacity = "0.7"}
            onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}>
            Venkata Krishna Raj Abhishek Gade
          </span>
        </h1>
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 500, color: "var(--text-secondary)", marginBottom: 20, letterSpacing: "-0.01em" }}>
          Software Engineer · AI Systems Builder
        </h2>
        <p style={{ fontSize: 14, color: "var(--text-muted)", maxWidth: 300, lineHeight: 1.65, marginBottom: 56 }}>
          I build production-grade systems — cloud infrastructure, AI applications, and the observability tooling that connects them.
        </p>

        <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {SECTIONS.map((id) => (
            <button key={id} onClick={() => scrollTo(id)}
              className={`nav-indicator ${active === id ? "active" : ""}`}>
              <span className="nav-line" />
              <span className="nav-text">{id.charAt(0).toUpperCase() + id.slice(1)}</span>
            </button>
          ))}
        </nav>
      </div>

      <div style={{ display: "flex", gap: 20 }}>
        {[
          { Icon: Github, href: "https://github.com/abhi-00g", label: "GitHub" },
          { Icon: Linkedin, href: "https://linkedin.com/in/abhishek-gade", label: "LinkedIn" },
          { Icon: Mail, href: "mailto:gade.venk@northeastern.edu", label: "Email" },
        ].map(({ Icon, href, label }) => (
          <button key={label} onClick={() => window.open(href, "_blank")}
            aria-label={label}
            style={{ background: "none", border: "none", padding: 4, cursor: "pointer", color: "var(--text-muted)", transition: "color 0.2s" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "var(--text)"}
            onMouseLeave={(e) => e.currentTarget.style.color = "var(--text-muted)"}>
            <Icon size={20} />
          </button>
        ))}
      </div>
    </header>
  );
}

/* ─── ECOSYSTEM DIAGRAM ─── */
function EcosystemDiagram() {
  const [hovered, setHovered] = useState<string | null>(null);
  const nodes = [
    { id: "syncboard", label: "SyncBoard", sub: "Real-time", x: 10, y: 20, color: "#c8ee44" },
    { id: "rag", label: "Doc Q&A", sub: "RAG", x: 10, y: 110, color: "#c4b5fd" },
    { id: "atlas", label: "ATLAS", sub: "Agent", x: 10, y: 200, color: "#6ee7b7" },
    { id: "dashboard", label: "Dashboard", sub: "Observability", x: 310, y: 155, color: "#fbbf24" },
    { id: "cloud-native", label: "Cloud-Native", sub: "Infra", x: 310, y: 20, color: "#93c5fd" },
    { id: "finance", label: "Finance", sub: "Full-stack", x: 310, y: 245, color: "#f9a8d4" },
  ];
  const connections = [
    { from: "rag", to: "dashboard" },
    { from: "atlas", to: "dashboard" },
  ];
  const getNode = (id: string) => nodes.find((n) => n.id === id)!;

  return (
    <div style={{ marginBottom: 16 }}>
      <svg viewBox="0 0 460 300" style={{ width: "100%", maxWidth: 460 }}>
        {connections.map((c, i) => {
          const f = getNode(c.from), t = getNode(c.to);
          const active = !hovered || hovered === c.from || hovered === c.to;
          return (
            <g key={i} style={{ opacity: active ? 1 : 0.15, transition: "opacity 0.3s" }}>
              <line x1={f.x + 112} y1={f.y + 18} x2={t.x} y2={t.y + 18}
                stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />
              <line x1={f.x + 112} y1={f.y + 18} x2={t.x} y2={t.y + 18}
                stroke={f.color} strokeWidth="1.5" strokeDasharray="4 4" strokeOpacity="0.5"
                style={{ animation: "flowDash 1.2s linear infinite" }} />
              <text x={(f.x + 112 + t.x) / 2} y={(f.y + t.y) / 2 + 8}
                textAnchor="middle" fill="var(--text-muted)"
                style={{ fontFamily: "var(--font-mono)", fontSize: 8 }}>SDK</text>
            </g>
          );
        })}
        {nodes.map((n) => {
          const active = !hovered || hovered === n.id ||
            connections.some((c) => (c.from === hovered && c.to === n.id) || (c.to === hovered && c.from === n.id));
          return (
            <g key={n.id} style={{ opacity: active ? 1 : 0.2, transition: "opacity 0.3s", cursor: "pointer" }}
              onMouseEnter={() => setHovered(n.id)} onMouseLeave={() => setHovered(null)}
              onClick={() => { const el = document.getElementById(`proj-${n.id}`); if (el) el.scrollIntoView({ behavior: "smooth", block: "center" }); }}>
              <rect x={n.x} y={n.y} width={112} height={36} rx={6}
                fill="var(--bg-elevated)" stroke={n.color}
                strokeWidth={hovered === n.id ? 1.5 : 0.5} strokeOpacity={hovered === n.id ? 0.8 : 0.3}
                style={{ transition: "stroke-width 0.2s, stroke-opacity 0.2s" }} />
              <text x={n.x + 56} y={n.y + 16} textAnchor="middle" fill="var(--text)"
                style={{ fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 600 }}>{n.label}</text>
              <text x={n.x + 56} y={n.y + 28} textAnchor="middle" fill="var(--text-muted)"
                style={{ fontFamily: "var(--font-mono)", fontSize: 8 }}>{n.sub}</text>
            </g>
          );
        })}
      </svg>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", marginTop: 6 }}>
        RAG & ATLAS send live telemetry to the Dashboard via a shared Python SDK.
      </p>
    </div>
  );
}

/* ─── PROJECT CARD ─── */
function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal delay={index}>
      <div className="proj-card" id={`proj-${project.id}`}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
          <div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 600, marginBottom: 4 }}>
              {project.links.live ? (
                <span className="inline-link" style={{ cursor: "pointer" }}
                  onClick={() => window.open(project.links.live, "_blank")}>
                  {project.title} <ArrowUpRight size={14} />
                </span>
              ) : project.links.github ? (
                <span className="inline-link" style={{ cursor: "pointer" }}
                  onClick={() => window.open(project.links.github, "_blank")}>
                  {project.title} <ArrowUpRight size={14} />
                </span>
              ) : project.title}
            </h3>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: project.color, opacity: 0.8 }}>
              {project.tagline}
            </p>
          </div>
          {(project.sendsTo || project.receivesFrom) && (
            <span className="tele-badge">
              <span className="tele-dot" />
              {project.sendsTo ? "sends" : "receives"}
            </span>
          )}
        </div>

        <p style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.65, marginBottom: 16 }}>
          {project.description}
        </p>

        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
          {project.links.github && (
            <button onClick={() => window.open(project.links.github, "_blank")} className="btn-link">
              <Github size={13} /> Code
            </button>
          )}
          {project.links.github2 && (
            <button onClick={() => window.open(project.links.github2, "_blank")} className="btn-link">
              <Github size={13} /> Infra
            </button>
          )}
          {project.links.live && (
            <button onClick={() => window.open(project.links.live, "_blank")} className="btn-link">
              <ExternalLink size={13} /> Demo
            </button>
          )}
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {project.tech.map((t) => (
            <span key={t} className="tech-pill">{t}</span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

/* ─── EXPERIENCE ITEM ─── */
function ExperienceItem({ exp, index }: { exp: Experience; index: number }) {
  return (
    <Reveal delay={index}>
      <div className="exp-item" style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: 16 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--text-muted)", paddingTop: 4, lineHeight: 1.5 }}>
          {exp.period}
        </div>
        <div>
          <h3 style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 600, marginBottom: 2 }}>
            {exp.role}
          </h3>
          <p style={{ fontSize: 14, color: "var(--text-secondary)", fontWeight: 500, marginBottom: 2 }}>
            {exp.company}
          </p>
          <p style={{ fontSize: 12, color: "var(--text-muted)", fontFamily: "var(--font-mono)", marginBottom: 12 }}>
            {exp.location}
          </p>
          <ul style={{ listStyle: "none", padding: 0, margin: 0, marginBottom: 14 }}>
            {exp.bullets.map((b, i) => (
              <li key={i} style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: 6, paddingLeft: 16, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, color: "var(--text-muted)" }}>·</span>
                {b}
              </li>
            ))}
          </ul>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {exp.tech.map((t) => <span key={t} className="tech-pill">{t}</span>)}
          </div>
        </div>
      </div>
    </Reveal>
  );
}

/* ════════════════════════ MAIN APP ════════════════════════ */

export default function Portfolio() {
  const active = useActiveSection();

  return (
    <>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "0 48px",
        display: "flex", gap: 32, position: "relative",
      }} className="main-layout">

        <div style={{ flex: "0 0 420px", maxWidth: 420 }} className="left-col">
          <LeftColumn active={active} />
        </div>

        <main style={{ flex: 1, paddingTop: 96, paddingBottom: 96 }} className="right-col">

          {/* ── ABOUT ── */}
          <section id="about" style={{ marginBottom: 96 }}>
            <Reveal>
              <div style={{ display: "flex", gap: 40, marginBottom: 28, flexWrap: "wrap" }}>
                <div>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>2024 – 2026</p>
                  <p style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", marginBottom: 2 }}>MS Software Engineering Systems</p>
                  <p style={{ fontSize: 14, color: "#6ee7b7" }}>Northeastern University · GPA 3.81</p>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)" }}>Boston, MA</p>
                </div>
                <div>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", marginBottom: 4 }}>2020 – 2024</p>
                  <p style={{ fontSize: 15, fontWeight: 600, color: "var(--text)", marginBottom: 2 }}>BTech Computer Science & Engineering</p>
                  <p style={{ fontSize: 14, color: "#6ee7b7" }}>Gokaraju Rangaraju Institute of Engineering and Technology</p>
                  <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)" }}>Hyderabad, India</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={1}>
              <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: 16 }}>
                My work spans real-time distributed systems, cloud infrastructure, AI applications, and the observability tooling that ties them together. I've built WebSocket-based collaborative tools with Redis pub/sub, provisioned multi-AZ AWS infrastructure with Terraform, designed autonomous AI agents with evaluation harnesses, and created SDK-driven telemetry pipelines that connect multiple projects into a single observability dashboard.
              </p>
            </Reveal>
            <Reveal delay={2}>
              <p style={{ fontSize: 15, color: "var(--text-secondary)", lineHeight: 1.7 }}>
                I care about building things that work in production — with real tests, real deployments, and architecture I can stand behind.
              </p>
            </Reveal>
          </section>

          {/* ── EXPERIENCE ── */}
          <section id="experience" style={{ marginBottom: 96 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {EXPERIENCE.map((exp, i) => <ExperienceItem key={i} exp={exp} index={i} />)}
            </div>
          </section>

          {/* ── PROJECTS ── */}
          <section id="projects" style={{ marginBottom: 96 }}>
            <Reveal>
              <EcosystemDiagram />
            </Reveal>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
            </div>
          </section>

          {/* ── SKILLS ── */}
          <section id="skills" style={{ marginBottom: 96 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {SKILL_GROUPS.map((group, i) => (
                <Reveal key={group.label} delay={i}>
                  <div>
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text-muted)", marginBottom: 10, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                      {group.label}
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                      {group.items.map((s) => <span key={s} className="tech-pill">{s}</span>)}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ── FOOTER ── */}
          <footer style={{ paddingBottom: 48 }}>
            <Reveal>
              <p style={{ fontSize: 12, color: "var(--text-muted)", lineHeight: 1.7 }}>
                Built with React and TypeScript, deployed on Vercel. Set in Space Grotesk and Inter.
              </p>
            </Reveal>
          </footer>
        </main>
      </div>

    </>
  );
}
