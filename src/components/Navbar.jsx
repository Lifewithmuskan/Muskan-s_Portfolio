import { useEffect, useState } from 'react'

const LINKS = ['About', 'Skills', 'Work', 'Journey', 'Contact']
const IDS   = ['about-sec', 'skills-sec', 'projects-sec', 'experience-sec', 'contact-sec']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <nav id="nav" className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <a className="nav-logo" href="#">M<em>.</em>Singh</a>

      <div className="nav-links">
        {LINKS.map((l, i) => (
          <button key={l} onClick={() => scrollTo(IDS[i])}>{l}</button>
        ))}
      </div>

      <button className="nav-cta" onClick={() => scrollTo('contact-sec')}>
        Hire Me
      </button>
    </nav>
  )
}
