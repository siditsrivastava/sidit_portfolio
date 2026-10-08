import { motion, useScroll, useSpring } from 'framer-motion'

export function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>
}

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.25 })
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />
}

export function SectionLabel({ children, reveal = true }) {
  return <div className={`section-label${reveal ? ' reveal' : ''}`}>{children}</div>
}
