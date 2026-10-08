import { education, experience } from '../../data/portfolio.js'
import { motion } from 'framer-motion'
import AnimatedText from '../AnimatedText.jsx'

export function Experience() {
  return <section className="experience" id="experience">
    <div className="journey-heading"><span className="section-label">03 / Experience</span><h2><AnimatedText>The journey</AnimatedText><br /><i><AnimatedText delay={0.08}>so far.</AnimatedText></i></h2><p><AnimatedText>Delivering AI full-stack applications at WeBuildTech, from live trading interfaces to email automation and data copilots.</AnimatedText></p></div>
    <div className="timeline">{experience.map((item, index) => <motion.article className="timeline-row" initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: false, amount: 0.25 }} whileHover={{ x: 7 }} key={item.role}>
      <span className="timeline-number">0{index + 1}</span>
      <span className="timeline-period">{item.period}</span>
      <div><span className="chapter">Professional experience</span><h3><AnimatedText>{item.role}</AnimatedText></h3><span className="timeline-company">{item.company}</span></div>
      <div className="timeline-detail"><p>{item.detail}</p><ul className="achievement-list">{item.achievements.map((achievement) => <li key={achievement}>{achievement}</li>)}</ul><div className="timeline-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
    </motion.article>)}</div>
  </section>
}

export function Education() {
  return <section className="education" id="education">
    <div className="section-label">04 / Education & training</div>
    <div className="education-intro"><h2><AnimatedText>Degrees, learning &</AnimatedText><br /><i><AnimatedText delay={0.08}>brain upgrades.</AnimatedText></i></h2><p><AnimatedText>A master’s degree in computer applications, complemented by intensive full-stack training and hands-on project development.</AnimatedText></p></div>
    <div className="education-grid">{education.map((item) => <motion.article className="education-card degree-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} whileHover={{ y: -6 }} key={item.course}><span>{item.year}</span><motion.div className="degree-mark" whileHover={{ scale: 1.04 }}>{item.mark}</motion.div><h3>{item.course}</h3><h4>{item.place}</h4><p>{item.note}</p></motion.article>)}</div>
  </section>
}
