import { useEffect, useRef, useState } from 'react'
import {
  ArrowDown, ArrowDownToLine, ArrowRight, ArrowUpRight, Boxes, Braces,
  Check, Cloud, Code2, Copy, Database,
  GitBranch, Github, GraduationCap, Layers3, Linkedin, Mail, MapPin,
  Menu, Network, Palette, Server, Terminal, TrainFront, Truck, X,
} from 'lucide-react'

const email = 'sifat.hossain3152@gmail.com'
const cvUrl = '/MD-Sifat-Hossain-CV.pdf'
const themeStorageKey = 'portfolio-theme'
const themes = [
  { id: 'dark', label: 'Dark Mint' },
  { id: 'light', label: 'Light' },
  { id: 'dark-ocean', label: 'Dark Ocean' },
  { id: 'light-ocean', label: 'Light Ocean' },
]
const navigation = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Selected work' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

const projects = [
  {
    name: 'Xcalibur Connect', category: 'Backend & cloud', company: 'Microsec International Ltd.',
    type: 'LOGISTICS & DELIVERY', icon: Truck, featured: true, visual: 'logistics',
    summary: 'Connecting construction materials, teams, and delivery locations.',
    description: 'A construction materials delivery coordination platform supporting operations across multiple locations.',
    detail: 'The technical stack brings together a .NET Core backend, SQL Server, Clean Architecture and MediatR, with Azure App Service hosting, Azure Pipelines for CI/CD, and Azure Service Bus queues, topics and subscriptions for asynchronous messaging. Firebase notifications and GraphQL support application integration.',
    tags: ['.NET Core', 'Azure App Service', 'Azure Pipelines (CI/CD)', 'Azure Service Bus', 'GraphQL', 'SQL Server'],
  },
  {
    name: 'ITAL', category: 'Backend & cloud', company: 'Microsec International Ltd.',
    type: 'RAILWAY & TRANSPORT', icon: TrainFront, featured: true, visual: 'railway',
    summary: 'The backend behind UK National Railway fare calculation.',
    description: 'A railway application focused on train fare calculation for the UK National Railway.',
    detail: 'Built with .NET Core and SQL Server, with SOAP integrations, Linux background services, SQL Server Service Broker and Azure Pipelines.',
    tags: ['.NET Core', 'SOAP', 'Background services', 'Azure Pipelines'],
  },
  {
    name: 'GDN ERP', category: 'Enterprise apps', company: 'Golden Infotech Ltd.',
    type: 'FINANCE & ERP', icon: Boxes, featured: false, visual: '',
    summary: 'An ERP system for accounting and financial management.',
    description: 'Accounting and financial management software developed at Golden Infotech.',
    detail: 'Built with ASP.NET MVC, AngularJS, Bootstrap and SQL Server 2019, alongside software support and maintenance.',
    tags: ['ASP.NET MVC', 'AngularJS', 'SQL Server'],
  },
  {
    name: 'Mail Dispatch Management', category: 'Enterprise apps', company: 'Defense Ministry government project',
    type: 'GOVERNMENT', icon: Mail, featured: false, visual: '',
    summary: 'Organizing branch email dispatch information in one place.',
    description: 'A Mail Dispatch Management System for managing branch email dispatch information.',
    detail: 'Built with ASP.NET MVC, JavaScript, jQuery, Bootstrap and SQL Server 2014 as part of the Technical Capacity Building of Defense Ministry project.',
    tags: ['ASP.NET MVC', 'jQuery', 'SQL Server'],
  },
  {
    name: 'Project Management System', category: 'Enterprise apps', company: 'Defense Ministry government project',
    type: 'GOVERNMENT', icon: Layers3, featured: false, visual: '',
    summary: 'Making project information and status easier to follow.',
    description: 'An application for tracking project information and status within a government project.',
    detail: 'Built with ASP.NET Core 5, AngularJS, Bootstrap, Crystal Reports and SQL Server 2014.',
    tags: ['ASP.NET Core', 'AngularJS', 'Crystal Reports'],
  },
]

const experience = [
  {
    company: 'Microsec International Ltd.', role: 'Software Engineer', date: 'Oct 2022 - Present', current: true,
    highlights: [
      'Developed and maintained scalable REST APIs and backend services using ASP.NET Core and C#.',
      'Designed and implemented new features while resolving production issues to improve application reliability and performance.',
      'Built and maintained Azure CI/CD pipelines for automated build, testing, and deployment.',
      'Utilized Azure Queue and Topic & Subscription services for asynchronous messaging and event-driven communication.',
      'Followed Clean Architecture, CQRS, and MediatR patterns to build modular, maintainable, and scalable applications.',
      'Optimized database performance using Microsoft SQL Server, including stored procedures, Service Broker, indexing, and query optimization.',
      'Integrated Firebase Cloud Messaging (FCM) to deliver real-time notifications.',
      'Gained hands-on experience with Docker for containerizing applications and creating consistent development environments.',
      'Leveraged AI agents and AI-assisted development tools to accelerate software development, code generation, debugging, documentation, and problem-solving.',
      'Collaborated with cross-functional teams using Git-based workflows, code reviews, and agile development practices.',
      'Currently exploring React for modern frontend development and integrating AI-assisted workflows into web application development.',
    ],
    tags: ['C# / .NET', 'Azure', 'SQL Server', 'Docker', 'CI/CD', 'React', 'Firebase', 'Cosmos DB'],
  },
  {
    company: 'Golden Infotech Ltd.', role: 'Software Engineer', date: 'Apr 2022 - Oct 2022', current: false,
    highlights: [
      'Developed an ERP (Account) System to streamline financial operations and enhance organizational efficiency.',
      'Provided technical support and maintenance for existing software systems, ensuring optimal performance and user satisfaction.',
    ],
    tags: ['ASP.NET MVC', 'AngularJS', 'ERP'],
  },
  {
    company: 'Technical Capacity Building of Defense Ministry (Govt. Project)', role: 'Assistant Programmer', date: 'Mar 2020 - Mar 2022', current: false,
    highlights: [
      'Developed the Mail Dispatch System for internal use, ensuring efficient handling of email dispatch between branches.',
      'Communicated with vendors to analyze project requirements and ensure alignment with organizational needs.',
      'Conducted functional testing of existing systems to maintain optimal performance and reliability.',
    ],
    tags: ['Government systems', 'Functional testing'],
  },
  {
    company: 'Sailor Info Tech', role: 'Junior Software Developer', date: 'Sep 2018 - Apr 2019', current: false,
    highlights: [
      'Communicated with clients to provide support and gather requirements.',
      'Developed a web application for client management.',
      'Marketed existing software to prospective clients.',
    ],
    tags: ['Web applications', 'Client support'],
  },
]

function TimelineItem({ job }: { job: typeof experience[number] }) {
  const [expanded, setExpanded] = useState(false)
  const visibleHighlights = expanded ? job.highlights : job.highlights.slice(0, 3)
  const hasMore = job.highlights.length > 3

  return (
    <article className={`timeline-item ${job.current ? 'current-job' : ''}`}>
      <span className="timeline-dot" />
      <div className="job-date">{job.date}{job.current && <span>Current</span>}</div>
      <h3>{job.role}</h3>
      <h4>{job.company}</h4>
      <ul className="timeline-list">{visibleHighlights.map((item) => <li key={item}>{item}</li>)}</ul>
      {hasMore && <button type="button" className="timeline-toggle" onClick={() => setExpanded((value) => !value)}>{expanded ? 'See less' : '... See more'}</button>}
      <div className="tags">{job.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
    </article>
  )
}

function SystemIllustration() {
  return (
    <div className="system-art" aria-label="Architecture illustration: APIs, Azure and SQL Server connected to a .NET application" role="img">
      <div className="art-grid" />
      <div className="art-heading"><span><Terminal size={13} /> a backend mindset</span><span className="art-dots"><i /><i /><i /></span></div>
      <div className="system-orbit orbit-outer" /><div className="system-orbit orbit-inner" />
      <svg className="connection-lines" viewBox="0 0 460 400" fill="none" aria-hidden="true">
        <path d="M230 192V90H104M230 192V90H365M230 192V304H104M230 192V304H365" />
        <circle cx="230" cy="90" r="3" /><circle cx="230" cy="304" r="3" />
      </svg>
      <div className="system-core"><span className="core-code"><Code2 size={30} strokeWidth={1.5} /></span><strong>.NET</strong><small>BUILT TO CONNECT</small></div>
      <div className="system-node node-api"><Braces size={19} /><span>RESTful APIs<small>THE INTERFACE</small></span></div>
      <div className="system-node node-cloud"><Cloud size={21} /><span>Azure<small>THE CLOUD</small></span></div>
      <div className="system-node node-data"><Database size={20} /><span>SQL Server<small>THE DATA</small></span></div>
      <div className="system-node node-queue"><Network size={20} /><span>Service Bus<small>THE CONNECTION</small></span></div>
      <div className="art-caption"><span className="status-dot" /> Clean architecture. Connected systems.</div>
      <span className="art-coordinate">01 / SYSTEM OVERVIEW</span>
    </div>
  )
}

function ProjectVisual({ type }: { type: string }) {
  return (
    <div className={`project-visual ${type}`} aria-hidden="true">
      <div className="visual-grid" />
      {type === 'logistics' ? (
        <div className="delivery-diagram">
          <span className="diagram-label label-start">MATERIALS</span>
          <div className="delivery-node"><Boxes size={23} /></div>
          <span className="diagram-route"><i /><i /><i /></span>
          <div className="delivery-node delivery-main"><Truck size={32} /></div>
          <span className="diagram-route"><i /><i /><i /></span>
          <div className="delivery-node"><MapPin size={23} /></div>
          <span className="diagram-label label-end">DESTINATION</span>
          <span className="diagram-caption">ONE CONNECTED DELIVERY FLOW</span>
        </div>
      ) : (
        <div className="rail-diagram">
          <div className="rail-route rail-one" /><div className="rail-route rail-two" />
          <div className="station station-one" /><div className="station station-two" />
          <div className="station station-three" /><div className="station station-four" />
          <div className="rail-icon"><TrainFront size={32} /></div>
          <span className="diagram-caption">COMPLEX JOURNEYS. CONNECTED LOGIC.</span>
        </div>
      )}
    </div>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [filter, setFilter] = useState('All projects')
  const [copyState, setCopyState] = useState<'idle' | 'copied' | 'error'>('idle')
  const [theme, setTheme] = useState(() => {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem(themeStorageKey) : null
    return themes.some((item) => item.id === stored) ? stored! : 'dark'
  })
  const copyTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const menuButton = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (theme === 'dark') delete document.documentElement.dataset.theme
    else document.documentElement.dataset.theme = theme
    window.localStorage.setItem(themeStorageKey, theme)
  }, [theme])

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) setActiveSection(entry.target.id)
      }
    }, { rootMargin: '-15% 0px -60% 0px' })
    document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section))
    return () => {
      observer.disconnect()
      clearTimeout(copyTimer.current)
    }
  }, [])

  useEffect(() => {
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && menuOpen) {
        setMenuOpen(false)
        menuButton.current?.focus()
      }
    }
    document.addEventListener('keydown', closeWithEscape)
    return () => document.removeEventListener('keydown', closeWithEscape)
  }, [menuOpen])

  async function copyEmail() {
    clearTimeout(copyTimer.current)
    try {
      await navigator.clipboard.writeText(email)
      setCopyState('copied')
      copyTimer.current = setTimeout(() => setCopyState('idle'), 3500)
    } catch {
      setCopyState('error')
    }
  }

  const visibleProjects = projects.filter((project) => filter === 'All projects' || project.category === filter)

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <div className="container header-inner">
          <a href="#home" className="brand" aria-label="Md. Sifat Hossain home" onClick={() => setMenuOpen(false)}><span className="brand-mark"><Code2 size={22} /></span><span>Md. Sifat Hossain<span className="brand-period">.</span></span></a>
          <nav id="main-navigation" className={menuOpen ? 'navigation is-open' : 'navigation'} aria-label="Main navigation">
            {navigation.map((item) => <a key={item.id} href={`#${item.id}`} aria-current={activeSection === item.id ? 'location' : undefined} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
            <div className="theme-switcher theme-switcher--nav"><Palette size={15} /><select aria-label="Choose color theme" value={theme} onChange={(event) => setTheme(event.target.value)}>{themes.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></div>
          </nav>
          <a href={cvUrl} download className="button button-small header-cv">Resume <ArrowDownToLine size={15} /></a>
          <div className="theme-switcher theme-switcher--header"><Palette size={15} /><select aria-label="Choose color theme" value={theme} onChange={(event) => setTheme(event.target.value)}>{themes.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}</select></div>
          <button ref={menuButton} className="menu-toggle" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-controls="main-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </div>
      </header>

      <main id="main">
        <section id="home" className="hero container">
          <div className="hero-content">
            <div className="eyebrow"><MapPin size={13} /> BASED IN DHAKA, BANGLADESH</div>
            <p className="hero-greeting">Hi, I'm</p>
            <h1 className="hero-name">MD. Sifat <br /><span>Hossain.</span></h1>
            <p className="hero-intro">Software Engineer</p>
            <p className="hero-description">I work with C#, ASP.NET Core, and Azure to build APIs and backend services. My experience spans logistics, railway systems, and enterprise applications.</p>
            <div className="hero-actions"><a href="#work" className="button button-primary">View my projects <ArrowUpRight size={18} /></a><a href="#contact" className="text-link">Get in touch <ArrowRight size={17} /></a></div>
            <div className="hero-socials"><a href="https://github.com/sifat-hossain" target="_blank" rel="noreferrer" aria-label="GitHub (opens in new tab)"><Github size={18} /> GitHub</a><a href="https://www.linkedin.com/in/md-sifat-hossain-a8b534211/" target="_blank" rel="noreferrer" aria-label="LinkedIn (opens in new tab)"><Linkedin size={18} /> LinkedIn</a></div>
          </div>
          <SystemIllustration />
          <div className="hero-bottom"><span>MY EVERYDAY TOOLKIT</span><div><span><Code2 /> C# & .NET</span><span><Cloud /> Microsoft Azure</span><span><Database /> SQL Server</span><span><Layers3 /> Clean Architecture</span></div><a href="#about" aria-label="Scroll to about"><ArrowDown size={18} /></a></div>
        </section>

        <section id="about" className="section container about-section">
          <div className="section-heading"><span className="section-index">01 / ABOUT & EXPERTISE</span><h2>Good software starts<br />with a solid foundation<span>.</span></h2></div>
          <div className="about-copy"><p>I'm a software engineer based in Dhaka, Bangladesh, focused on the systems that make products work.</p><p>My experience spans logistics, railway fare calculation, ERP, and government applications. I work across APIs, data, and cloud infrastructure, with an emphasis on maintainable architecture and practical solutions.</p></div>
          <div className="expertise-grid">
            <article className="expertise-card"><span className="icon-box"><Server /></span><h3>Backend Engineering</h3><p>Clear interfaces. Maintainable services. Business logic with a place to belong.</p><div className="tags"><span>C#</span><span>ASP.NET Core</span><span>REST APIs</span><span>GraphQL</span><span>SOAP</span></div></article>
            <article className="expertise-card"><span className="icon-box"><Cloud /></span><h3>Cloud & Integration</h3><p>Connecting services and moving changes from development to production.</p><div className="tags"><span>Azure App Service</span><span>CI/CD Pipelines</span><span>Service Bus</span><span>Firebase</span></div></article>
            <article className="expertise-card"><span className="icon-box"><Database /></span><h3>Data & Architecture</h3><p>Thoughtful data access and patterns that keep complex systems understandable.</p><div className="tags"><span>SQL Server</span><span>EF Core</span><span>Dapper</span><span>CQRS</span><span>MediatR</span></div></article>
            <article className="expertise-card"><span className="icon-box"><Code2 /></span><h3>Frontend</h3><p>Interfaces and pages built on top of the backend, wherever the project needs them.</p><div className="tags"><span>Razor Pages</span><span>AngularJS</span><span>JavaScript</span><span>jQuery</span><span>HTML</span><span>CSS</span><span>Bootstrap</span><span>React (learning)</span></div></article>
            <article className="expertise-card"><span className="icon-box"><Terminal /></span><h3>Tools & Testing</h3><p>Everyday tools for version control, environments, and verifying things actually work.</p><div className="tags"><span>Git</span><span>Linux</span><span>Docker (basic)</span><span>JMeter</span><span>Playwright</span><span>Functional Testing</span><span>RDLC</span><span>Crystal Reports</span></div></article>
            <article className="expertise-card"><span className="icon-box"><Boxes /></span><h3>Also Exploring</h3><p>Picking up new ground beyond the day-to-day stack.</p><div className="tags"><span>AI Agent Integration</span><span>AI-Assisted Development</span><span>Prompt Engineering</span><span>Java (basic)</span></div></article>
          </div>
        </section>

        <section id="work" className="section work-section">
          <div className="container">
            <div className="section-topline"><div className="section-heading"><span className="section-index">02 / SELECTED WORK</span><h2>Real challenges.<br />Purpose-built solutions<span>.</span></h2></div><p>A selection of professional projects<br className="desktop-break" /> I've worked on along the way.</p></div>
            <div className="project-filters" role="group" aria-label="Filter projects">{['All projects', 'Backend & cloud', 'Enterprise apps'].map((item) => <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}{item === 'All projects' && <span>05</span>}</button>)}</div>
            <div className="project-grid">
              {visibleProjects.map((project) => <article key={project.name} className={`project-card ${project.featured ? 'featured-project' : 'compact-project'}`}>
                {project.featured ? <ProjectVisual type={project.visual} /> : <span className="project-icon"><project.icon size={23} /></span>}
                <div className="project-body"><span className="project-type">{project.type}</span><h3>{project.name}</h3><p>{project.summary}</p><div className="tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <details className="project-details"><summary>Project overview <span className="details-plus">+</span></summary><div><strong>{project.company}</strong><p>{project.description}</p><p>{project.detail}</p></div></details>
                </div>
              </article>)}
            </div>
            <p className="work-note"><GitBranch size={14} /> Professional work, built with teams. Descriptions reflect my CV; proprietary code is not shared.</p>
          </div>
        </section>

        <section id="experience" className="section container experience-section">
          <div className="experience-intro"><div className="section-heading"><span className="section-index">03 / THE JOURNEY</span><h2>Experience that<br />builds perspective<span>.</span></h2></div><p>From client-facing applications to connected backend systems. Learning, solving, and building at every step.</p><a href={cvUrl} download className="text-link">Download full resume <ArrowDownToLine size={16} /></a>
            <div className="education-card"><GraduationCap size={23} /><span className="section-index">EDUCATION</span><h3>BSc in Computer Science<br />and Engineering</h3><p>IUBAT</p><p className="university-name">International University of Business Agriculture and Technology</p><div><span>2015 - 2018</span><span>CGPA <strong>3.54 / 4.00</strong></span></div></div>
          </div>
          <div className="timeline">{experience.map((job) => <TimelineItem job={job} key={job.company} />)}</div>
        </section>

        <section id="contact" className="container contact-section">
          <div className="contact-decoration" aria-hidden="true"><Code2 /></div>
          <span className="section-index">04 / LET'S CONNECT</span>
          <h2>Have something<br />worth building<span>?</span></h2>
          <p>A project, an opportunity, or a conversation about good software.<br className="desktop-break" /> I'd be happy to hear from you.</p>
          <div className="contact-actions"><a className="button button-primary" href={`mailto:${email}`}>Say hello <ArrowUpRight size={19} /></a><div className="email-control"><a href={`mailto:${email}`}>{email}</a><button type="button" onClick={copyEmail} aria-label="Copy email address">{copyState === 'copied' ? <Check size={17} /> : <Copy size={17} />}</button></div></div>
          <div className={`copy-feedback ${copyState === 'error' ? 'copy-error' : ''}`} role="status">{copyState === 'copied' ? 'Email address copied.' : copyState === 'error' ? `Couldn't copy automatically. Select the email address above, or use Say hello.` : ''}</div>
          <div className="contact-bottom"><span><MapPin size={15} /> Dhaka, Bangladesh</span><div><a href="https://www.linkedin.com/in/md-sifat-hossain-a8b534211/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={15} /><span className="sr-only"> (opens in new tab)</span></a><a href="https://github.com/sifat-hossain" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15} /><span className="sr-only"> (opens in new tab)</span></a></div></div>
        </section>
      </main>
      <footer className="container footer"><a className="brand" href="#home">Md. Sifat Hossain<span className="brand-period">.</span></a><p>&copy; {new Date().getFullYear()} MD. Sifat Hossain <span>/</span> Crafted with React.</p><a href="#home" className="back-to-top">Back to top <ArrowUpRight size={15} /></a></footer>
    </>
  )
}

export default App
