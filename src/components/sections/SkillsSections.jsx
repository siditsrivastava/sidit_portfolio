import { skills } from '../../data/portfolio.js'
import { motion } from 'framer-motion'
import AnimatedText from '../AnimatedText.jsx'

export function Skills() {
  return <section className="skills" id="skills">
    <div className="section-label reveal">02 / Skills & toolkit</div>
    <div className="skills-heading"><h2><AnimatedText>Full-stack systems.</AnimatedText><br /><i><AnimatedText delay={0.08}>Intelligent products.</AnimatedText></i></h2><p><AnimatedText>My toolkit spans React and TypeScript, Node.js and Python APIs, SQL, real-time data, Highcharts, and Generative AI with LangChain and RAG.</AnimatedText></p></div>
    <div className="skills-grid">{skills.map((skill) => <motion.article className="skill-card reveal" whileHover={{ y: -7, scale: 1.01 }} key={skill.title}><span>{skill.number}</span><h3>{skill.title}</h3><div>{skill.items.map((item) => <small key={item}>{item}</small>)}</div></motion.article>)}</div>
  </section>
}
