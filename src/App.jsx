import { useCallback, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import Loader from './components/Loader.jsx'
import Navbar from './components/Navbar.jsx'
import Contact from './components/sections/Contact.jsx'
import { Hero, Profile } from './components/sections/IntroSections.jsx'
import { Education, Experience } from './components/sections/JourneySections.jsx'
import { Skills } from './components/sections/SkillsSections.jsx'
import { Approach, Projects } from './components/sections/WorkSections.jsx'
import { ScrollProgress } from './components/ui.jsx'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const finishLoading = useCallback(() => setIsLoading(false), [])
  return <MotionConfig reducedMotion="user" transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
    {isLoading && <Loader onComplete={finishLoading} />}
    <div className="noise" />
    <Navbar />
    <ScrollProgress />
    <main id="top">
      <aside className="page-rail"><span>SIDIT / 26</span><b>SCROLL ↓</b></aside>
      <Hero />
      <Profile />
      <Skills />
      <Experience />
      <Education />
      <Projects />
      <Approach />
      <Contact />
    </main>
  </MotionConfig>
}
