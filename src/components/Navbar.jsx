import { useState } from 'react'
import { motion } from 'framer-motion'

const links = [
  ['About', '#about'], ['Skills', '#skills'], ['Experience', '#experience'],
  ['Education', '#education'], ['Projects', '#work'], ['Contact', '#contact'],
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const closeMenu = () => setIsOpen(false)

  return <motion.nav initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 1.35 }}>
    <a className="logo" href="#top">S<span>◦</span></a>
    <div className={`nav-links ${isOpen ? 'open' : ''}`}>
      {links.map(([label, href]) => <a href={href} onClick={closeMenu} key={href}>{label}</a>)}
    </div>
    <button className="menu" onClick={() => setIsOpen((open) => !open)} aria-expanded={isOpen} aria-label="Toggle menu">{isOpen ? 'Close' : 'Menu'}</button>
  </motion.nav>
}
