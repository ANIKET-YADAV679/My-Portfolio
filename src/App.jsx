import React from "react";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Sparkles,
  Terminal,
  X,
} from "lucide-react";
import { profile, projects, skills } from "./data";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

function App() {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handlePop);
    return () => window.removeEventListener("popstate", handlePop);
  }, []);

  const navigate = (to) => {
    const next = to === "home" ? "/" : to.startsWith("/") ? to : `/${to}`;
    window.history.pushState({}, "", next);
    setPath(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const projectSlug = path.startsWith("/projects/") ? path.split("/")[2] : null;

  if (projectSlug) {
    return <ProjectDetail slug={projectSlug} navigate={navigate} />
  }

  return (
    <div className="site-shell">
      <AmbientBackground />
      <Navbar navigate={navigate} />
      {path === "/projects" ? <ProjectsPage navigate={navigate} /> : <HomePage navigate={navigate} />}
      <Footer />
    </div>
  );
}

function AmbientBackground() {
  return (
    <div className="ambient" aria-hidden="true">
      <div className="ambient-grid" />
      <div className="glow glow-violet" />
      <div className="glow glow-cyan" />
    </div>
  );
}

function Navbar({ navigate }) {
  const [open, setOpen] = useState(false);

  const go = (to) => {
    setOpen(false);
    navigate(to);
  };

  return (
    <header className="navbar-wrap">
      <nav className="navbar container">
        <button className="logo" onClick={() => go("home")} aria-label="Go to home">
          <span className="logo-mark">&lt;/&gt;</span>
          <span>Aniket<span className="violet">.</span></span>
        </button>

        <div className={`nav-menu ${open ? "nav-open" : ""}`}>
          <button onClick={() => go("home")}>Home</button>
          <button onClick={() => { setOpen(false); document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }); }}>About</button>
          <button onClick={() => go("projects")}>Projects</button>
          <a href={profile.github} target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13} /></a>
        </div>

        <button className="mobile-menu" onClick={() => setOpen((v) => !v)} aria-label="Open navigation">
          {open ? <X /> : <Menu />}
        </button>
      </nav>
    </header>
  );
}

function HomePage({ navigate }) {
  return (
    <main>
      <section className="hero container">
        <motion.div className="hero-content" initial="hidden" animate="visible" variants={fadeUp}>
          <div className="eyebrow"><span className="live-dot" /> B.Tech CSE Core · Developer</div>
          <h1>Building ideas<br /><span>into reality.</span></h1>
          <p className="hero-description">{profile.bio}</p>

          <div className="hero-actions">
            <button className="button button-primary" onClick={() => navigate("projects")}>
              Explore my work <ArrowUpRight size={17} />
            </button>
            <a className="button button-ghost" href={profile.github} target="_blank" rel="noreferrer">
              <Github size={17} /> GitHub
            </a>
          </div>

          <div className="social-row">
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a>
            <a href={profile.leetcode} target="_blank" rel="noreferrer" aria-label="LeetCode"><Code2 /></a>
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a>
          </div>
        </motion.div>

        <motion.div className="hero-terminal" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }}>
          <div className="terminal-top">
            <div className="terminal-dots"><i /><i /><i /></div>
            <span>aniket@developer:~</span>
            <span className="terminal-lock">● online</span>
          </div>
          <div className="terminal-body">
            <TerminalLine command="whoami" output="Aniket Yadav" />
            <TerminalLine command="education" output="B.Tech CSE Core" />
            <TerminalLine command="university" output="Chandigarh University" />
            <TerminalLine command="focus" output="Web · Java · Python · DSA" />
            <TerminalLine command="status" output="learning_mode = true" green />
            <span className="terminal-cursor">▌</span>
          </div>
        </motion.div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker-track">BUILD · LEARN · SOLVE · CREATE · BUILD · LEARN · SOLVE · CREATE · BUILD · LEARN · SOLVE · CREATE ·</div>
      </div>

      <section id="about" className="section container">
        <SectionHeading number="01" label="About" title="A little about me." />
        <div className="about-layout">
          <motion.article className="glass about-main" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <p className="about-lead">{profile.about}</p>
            <p>My projects are where I turn concepts into practice — from web interfaces and games to DSA problem solving and developer tools. I enjoy the process of figuring out how something works, building a first version, and then making it better.</p>
            <p className="quote">“{profile.philosophy}”</p>
          </motion.article>

          <div className="about-facts">
            <InfoCard icon={<GraduationCap />} label="Education" text="B.Tech CSE Core" sub="Chandigarh University, Unnao Campus" />
            <InfoCard icon={<Terminal />} label="Focus" text="Building & problem solving" sub="Web · Programming · DSA" />
            <InfoCard icon={<MapPin />} label="Location" text="India" sub="Open to learning opportunities" />
          </div>
        </div>
      </section>

      <section className="section container">
        <SectionHeading number="02" label="Toolkit" title="Technologies I work with." />
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <motion.div className="skill-card" key={skill.name} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.045 }}>
              <span className="skill-symbol">{skill.name.slice(0, 1)}</span>
              <div><strong>{skill.name}</strong><small>{skill.type} · {skill.level}</small></div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section container">
        <SectionHeading
          number="03"
          label="Selected work"
          title="Things I've built."
          action={<button className="link-button" onClick={() => navigate("projects")}>View all <ArrowUpRight size={15} /></button>}
        />
        <div className="projects-grid">
          {projects.filter((project) => project.featured).slice(0, 4).map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} navigate={navigate} />
          ))}
        </div>
      </section>

      <section className="section contact-section container">
        <div className="contact-panel">
          <div className="contact-icon"><Sparkles /></div>
          <div className="eyebrow">04 — Connect</div>
          <h2>Let's build something<br /><span>worth talking about.</span></h2>
          <p>Have an idea, opportunity, or just want to connect? Find me on the platforms below.</p>
          <div className="contact-actions">
            <a className="button button-primary" href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn <ArrowUpRight size={15} /></a>
            <a className="button button-ghost" href={profile.github} target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a>
          </div>
        </div>
      </section>
    </main>
  );
}

function TerminalLine({ command, output, green }) {
  return (
    <div className="terminal-line">
      <div><span className="prompt">$</span> {command}</div>
      <div className={green ? "terminal-output green" : "terminal-output"}>{output}</div>
    </div>
  );
}

function SectionHeading({ number, label, title, action }) {
  return (
    <div className="section-heading">
      <div>
        <div className="section-label"><span>{number}</span> — {label}</div>
        <h2>{title}</h2>
      </div>
      {action}
    </div>
  );
}

function InfoCard({ icon, label, text, sub }) {
  return (
    <div className="info-card glass">
      <div className="info-icon">{icon}</div>
      <div><small>{label}</small><strong>{text}</strong><span>{sub}</span></div>
    </div>
  );
}

function ProjectCard({ project, index, navigate }) {
  return (
    <motion.article className={`project-card ${project.accent}`} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} whileHover={{ y: -6 }}>
      <button className="project-visual" onClick={() => navigate(`projects/${project.slug}`)} aria-label={`Open ${project.title}`}>
        <span className="visual-grid" />
        <strong>{project.symbol}</strong>
        <small>{project.year}</small>
      </button>
      <div className="project-content">
        <div className="project-topline"><span>{project.category}</span><a href={project.repo} target="_blank" rel="noreferrer" onClick={(e) => e.stopPropagation()} aria-label={`Open ${project.title} GitHub`}><Github size={16} /></a></div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="tags">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <button className="project-case" onClick={() => navigate(`projects/${project.slug}`)}>View case study <ArrowUpRight size={14} /></button>
      </div>
    </motion.article>
  );
}

function ProjectsPage({ navigate }) {
  const [filter, setFilter] = useState("All");
  const filters = ["All", ...new Set(projects.map((p) => p.category))];
  const shown = useMemo(() => filter === "All" ? projects : projects.filter((p) => p.category === filter), [filter]);

  return (
    <main className="page container">
      <motion.div className="page-heading" initial="hidden" animate="visible" variants={fadeUp}>
        <div className="section-label">03 — Projects</div>
        <h1>A collection of things<br /><span>I’ve built.</span></h1>
        <p>Projects, experiments, and problem-solving work from my learning journey.</p>
      </motion.div>

      <div className="filters">
        {filters.map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)}>{item}</button>)}
      </div>

      <div className="projects-grid projects-all">
        <AnimatePresence mode="popLayout">
          {shown.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} navigate={navigate} />)}
        </AnimatePresence>
      </div>
    </main>
  );
}

function ProjectDetail({ slug, navigate }) {
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <div className="site-shell">
        <AmbientBackground />
        <Navbar navigate={navigate} />
        <main className="page container not-found"><h1>Project not found.</h1><button className="button button-primary" onClick={() => navigate("projects")}>Back to projects</button></main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="site-shell">
      <AmbientBackground />
      <Navbar navigate={navigate} />
      <main className="project-page container">
        <button className="back-button" onClick={() => navigate("projects")}><ArrowLeft size={16} /> Back to projects</button>

        <motion.div initial="hidden" animate="visible" variants={fadeUp}>
          <div className={`detail-visual ${project.accent}`}><span className="visual-grid" /><strong>{project.symbol}</strong><small>{project.category} · {project.year}</small></div>

          <div className="detail-header">
            <div><div className="section-label">{project.category} · {project.year}</div><h1>{project.title}</h1></div>
            <a className="button button-primary" href={project.repo} target="_blank" rel="noreferrer"><Github size={17} /> View source <ArrowUpRight size={15} /></a>
          </div>

          <div className="detail-layout">
            <article>
              <h2>Overview</h2>
              <p>{project.description}</p>
              <p>This project is part of my hands-on learning journey. I use projects like this to practice turning an idea into working software, understand the problems that appear during development, and improve the implementation as I learn.</p>
              <h2 className="detail-subheading">What I focused on</h2>
              <div className="feature-list">{project.features.map((feature, index) => <div key={feature}><span>0{index + 1}</span><strong>{feature}</strong></div>)}</div>
            </article>

            <aside className="detail-aside">
              <span className="aside-label">Built with</span>
              <div className="tags">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
              <span className="aside-label aside-gap">Repository</span>
              <a className="repository-link" href={project.repo} target="_blank" rel="noreferrer">Open on GitHub <ExternalLink size={14} /></a>
            </aside>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer>
      <div className="container footer">
        <div><strong>Aniket<span className="violet">.</span></strong><p>Built with curiosity, code & consistency.</p></div>
        <div className="footer-links"><a href={profile.github} target="_blank" rel="noreferrer">GitHub</a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={profile.leetcode} target="_blank" rel="noreferrer">LeetCode</a></div>
        <small>© {new Date().getFullYear()} Aniket Yadav</small>
      </div>
    </footer>
  );
}

export default App;