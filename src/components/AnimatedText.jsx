import { motion, useReducedMotion } from 'framer-motion'

const visible = {
  opacity: 1,
  y: 0,
  filter: 'blur(0px)',
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
}

const hidden = {
  opacity: 0,
  y: '0.7em',
  filter: 'blur(5px)',
  transition: { duration: 0.3, ease: 'easeOut' },
}

export default function AnimatedText({ children, className = '', delay = 0 }) {
  const reduceMotion = useReducedMotion()
  const words = String(children).trim().split(/\s+/)

  if (reduceMotion) return <span className={className}>{children}</span>

  return <motion.span
    className={`animated-text ${className}`.trim()}
    aria-label={String(children)}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: false, amount: 0.65, margin: '-6% 0px -6% 0px' }}
    variants={{
      hidden: {},
      visible: { transition: { delayChildren: delay, staggerChildren: 0.045 } },
    }}
  >
    {words.map((word, index) => <motion.span className="animated-word" aria-hidden="true" variants={{ hidden, visible }} key={`${word}-${index}`}>{word}{index < words.length - 1 ? '\u00A0' : ''}</motion.span>)}
  </motion.span>
}
