import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import Preloader      from './components/Preloader.jsx'
import Cursor         from './components/Cursor.jsx'
import ParticleCanvas from './components/ParticleCanvas.jsx'
import Navbar         from './components/Navbar.jsx'
import Hero           from './components/Hero.jsx'
import Marquee        from './components/Marquee.jsx'
import About          from './components/About.jsx'
import Skills         from './components/Skills.jsx'
import Projects       from './components/Projects.jsx'
import Experience     from './components/Experience.jsx'
import Contact        from './components/Contact.jsx'
import Footer         from './components/Footer.jsx'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [loaded, setLoaded] = useState(false)

  /* Refresh ScrollTrigger after fonts / layout settle */
  useEffect(() => {
    if (loaded) {
      setTimeout(() => ScrollTrigger.refresh(), 400)
    }
  }, [loaded])

  return (
    <>
      {/* ── Always-present layers ── */}
      <Cursor />
      <ParticleCanvas />

      {/* ── Parallax orbs ── */}
      <div className="parallax-bg">
        <div className="p-orb" id="orb1" style={{ width: 600, height: 600, top: -100, right: -200 }} />
        <div className="p-orb" id="orb2" style={{ width: 500, height: 500, bottom: '20%', left: -150 }} />
        <div className="p-orb" id="orb3" style={{ width: 400, height: 400, top: '60%', right: '10%' }} />
      </div>

      {/* ── Preloader ── */}
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}

      {/* ── Main site ── */}
      <Navbar />
      <Hero />
      <Marquee />
      <div className="divider" />
      <About />
      <div className="divider" />
      <Skills />
      <div className="divider" />
      <Projects />
      <div className="divider" />
      <Experience />
      <div className="divider" />
      <Contact />
      <Footer />
    </>
  )
}
