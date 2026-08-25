import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ArrowUpRight, Github, Menu, X, MoveUpRight } from 'lucide-react'
import type { Division, Project } from './data'
import { divisions, githubUrl } from './data'

export function Logo() {
  return <Link className="logo" to="/" aria-label="Pruden Network home"><span className="logo-mark">P</span><span>PRUDEN <b>NETWORK</b></span></Link>
}

export function Header() {
  const [open, setOpen] = useState(false)
  const links = divisions.slice(0, 1).concat(divisions.slice(2, 6))
  return <header className="site-header"><Logo /><nav className={open ? 'nav-links is-open' : 'nav-links'} aria-label="Primary navigation">
    <NavLink to="/network" onClick={() => setOpen(false)}>Network</NavLink><NavLink to="/projects" onClick={() => setOpen(false)}>Projects</NavLink><NavLink to="/labs" onClick={() => setOpen(false)}>Labs</NavLink><NavLink to="/academy" onClick={() => setOpen(false)}>Academy</NavLink><NavLink to="/community" onClick={() => setOpen(false)}>Community</NavLink><NavLink to="/studios" onClick={() => setOpen(false)}>Studios</NavLink><NavLink to="/vault" onClick={() => setOpen(false)}>Vault</NavLink>
    <Link className="nav-cta" to="/projects" onClick={() => setOpen(false)}>Explore <ArrowUpRight size={15} /></Link>
  </nav><button className="menu-button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button></header>
}

export function Footer() {
  return <footer className="footer"><div className="footer-main"><div><Logo /><p className="footer-tagline">Building the technology<br />ecosystem of tomorrow.</p></div><div className="footer-links"><div><small>NETWORK</small><Link to="/network">Network</Link><Link to="/projects">Projects</Link><Link to="/labs">Labs</Link></div><div><small>ECOSYSTEM</small>{divisions.slice(1).map((division) => <Link to={division.path} key={division.id}>{division.shortName}</Link>)}</div><div><small>CONNECT</small><a href={githubUrl} target="_blank" rel="noreferrer"><Github size={14} /> GitHub</a><Link to="/contact">Contact</Link></div></div></div><div className="footer-bottom"><span>PRUDEN NETWORK / 2026</span><span>AN EVOLVING TECHNOLOGY ECOSYSTEM</span></div></footer>
}

export function DivisionCard({ division }: { division: Division }) {
  const Icon = division.icon
  return <Link className="division-card" to={division.path}><div className="card-top"><span className="icon-box"><Icon size={20} /></span><span className="status"><i />{division.status}</span></div><h3>{division.name}</h3><p>{division.description}</p><span className="card-link">Explore division <ArrowUpRight size={15} /></span></Link>
}

export function ProjectCard({ project }: { project: Project }) {
  return <article className="project-card"><div className="project-number">/ {project.id.toUpperCase()}</div><div className="card-top"><span className="eyebrow">{project.category}</span><span className="status"><i />{project.status}</span></div><h3>{project.name}</h3><p>{project.description}</p><div className="tech-list">{project.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div><div className="project-actions">{project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer"><Github size={15} /> Repository</a>}{project.liveUrl ? <a href={project.liveUrl} target="_blank" rel="noreferrer">Live <MoveUpRight size={15} /></a> : <span className="unavailable">Live presence planned</span>}</div></article>
}

export function SectionIntro({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return <div className="section-intro"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>
}

export function PageFrame({ eyebrow, title, copy, children }: { eyebrow: string; title: string; copy: string; children: React.ReactNode }) {
  return <><main className="page-shell"><div className="page-heading"><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{copy}</p></div>{children}</main><Footer /></>
}
