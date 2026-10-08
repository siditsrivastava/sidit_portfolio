import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import AnimatedText from '../AnimatedText.jsx'
import { contact } from '../../data/portfolio.js'

const Scene = lazy(() => import('../../Scene.jsx'))

export function Hero() {
  const entrance = { initial: { opacity: 0, y: 34 }, animate: { opacity: 1, y: 0 } }
  return <>
    <section className="hero">
      <Suspense fallback={<div className="scene" aria-hidden="true" />}><Scene /></Suspense>
      <motion.div className="hero-identity" initial={entrance.initial} whileInView={entrance.animate} viewport={{ once: false, amount: 0.5 }} transition={{ delay: 0.1, duration: 0.8 }}><strong>Sidit Srivastava</strong><div className="eyebrow"><span className="pulse" /> AI Full Stack Developer — 2026</div></motion.div>
      <motion.h1 className="fullstack-title" initial={entrance.initial} whileInView={entrance.animate} viewport={{ once: false, amount: 0.35 }} transition={{ duration: 0.9 }}>AI-FULL-STACK<br /><span>DEVEL</span>OPER</motion.h1>
      <motion.div className="hero-foot" initial={entrance.initial} whileInView={entrance.animate} viewport={{ once: false, amount: 0.4 }} transition={{ delay: 0.08, duration: 0.8 }}><div className="hero-intro-block"><p>AI Full Stack Developer building production applications with React, TypeScript, Node.js, and Python, from real-time trading to AI email generation and data copilots.</p><div className="resume-actions"><a href={contact.resume} target="_blank" rel="noreferrer">View resume ↗</a><a href={contact.resume} download="Sidit-Srivastava-Resume.pdf">Download resume ↓</a></div></div><motion.a href="#work" className="round-link" aria-label="Explore work" whileHover={{ scale: 1.08, rotate: -45 }} whileTap={{ scale: 0.94 }}>↓</motion.a></motion.div>
      <div className="hero-index">PORTFOLIO / 26</div>
    </section>
    <div className="tech-marquee" aria-label="Core technologies"><div><span>REACT.JS ◆ TYPESCRIPT ◆ NODE.JS ◆ PYTHON ◆ FASTAPI ◆ LANGCHAIN ◆ RAG ◆ HIGHCHARTS ◆ </span><span aria-hidden="true">REACT.JS ◆ TYPESCRIPT ◆ NODE.JS ◆ PYTHON ◆ FASTAPI ◆ LANGCHAIN ◆ RAG ◆ HIGHCHARTS ◆ </span></div></div>
  </>
}

export function Profile() {
  return <section className="manifesto" id="about">
    <div className="section-label reveal">01 / Profile</div>
    <p className="statement"><AnimatedText>I build scalable, high-performance</AnimatedText> <em><AnimatedText delay={0.1}>full-stack products</AnimatedText></em> <AnimatedText delay={0.16}>with real-time data, AI automation, and clear data insights.</AnimatedText></p>
    <div className="capabilities reveal"><span>React.js & TypeScript</span><span>Node.js & FastAPI</span><span>WebSocket</span><span>LangChain & RAG</span></div>
    <div className="profile-stats reveal"><div><strong>2</strong><span>Years of experience</span></div><div><strong>3</strong><span>Client projects delivered</span></div><div><strong>AI</strong><span>Intelligent integrations</span></div></div>
  </section>
}
