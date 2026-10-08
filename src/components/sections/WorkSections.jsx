import { projects } from '../../data/portfolio.js'
import { Arrow } from '../ui.jsx'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import AnimatedText from '../AnimatedText.jsx'

export function Projects() {
  const [activeProject, setActiveProject] = useState(0)
  const project = projects[activeProject]

  return <section className="work" id="work">
    <div className="work-head"><div className="section-label">05 / Production work</div><p><AnimatedText>Three client projects and an internal enterprise system built at WeBuildTech, spanning real-time interfaces, AI automation, and data insights.</AnimatedText></p></div>
    <div className="project-showcase">
      <div className="project-tabs" role="tablist" aria-label="Select a project">{projects.map((item, index) => <button type="button" role="tab" aria-selected={activeProject === index} aria-controls="active-project-panel" className={activeProject === index ? 'active' : ''} onClick={() => setActiveProject(index)} key={item.id}><span>{item.id}</span><div><strong>{item.title}</strong><small>{item.type}</small></div><b>↗</b></button>)}</div>
      <div className="project-panel-wrap">
        <AnimatePresence mode="wait">
          <motion.article id="active-project-panel" role="tabpanel" className="project-panel" key={project.id} style={{ '--accent': project.color }} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.35 }}>
            <div className="project-panel-top"><span>Case study / {project.id}</span><small>{project.id === '04' ? 'Internal project' : 'Client project'}</small></div>
            <div className="project-panel-copy"><p className="project-type">{project.type}</p><h2>{project.title}</h2><p>{project.description}</p></div>
            <div className="project-panel-impact"><span>My contribution</span><ul>{project.contributions.map((contribution) => <li key={contribution}>{contribution}</li>)}</ul></div>
            <div className="project-panel-footer"><div>{project.stack.map((technology) => <span key={technology}>{technology}</span>)}</div><a href="#contact">Discuss similar work <Arrow /></a></div>
          </motion.article>
        </AnimatePresence>
      </div>
    </div>
  </section>
}

export function Approach() {
  return <section className="approach">
    <div className="section-label reveal">06 / How I build</div>
    <div className="approach-grid"><h2><AnimatedText>Clear architecture.</AnimatedText><br /><i><AnimatedText delay={0.08}>Reliable delivery.</AnimatedText></i></h2><div className="approach-copy"><p><AnimatedText>I start by understanding the user flow, data contract, and failure cases. Then I shape components and state around the actual product behavior.</AnimatedText></p><p><AnimatedText delay={0.08}>Before shipping, I check responsiveness, loading states, API behavior, render performance, and edge cases with the wider team.</AnimatedText></p></div></div>
    <div className="ticker"><div>REQUIREMENTS ✦ ARCHITECTURE ✦ BUILD ✦ TEST ✦ SHIP ✦ REQUIREMENTS ✦ ARCHITECTURE ✦ BUILD ✦ TEST ✦ SHIP ✦ </div></div>
  </section>
}
