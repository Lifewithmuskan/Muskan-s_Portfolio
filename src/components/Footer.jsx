import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Footer() {
  useEffect(() => {
    gsap.to('.footer', {
      opacity: 1, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: '.footer', start: 'top 95%' },
    })
  }, [])

  return (
    <footer className="footer">
      <div className="foot-logo">M<em>.</em>Singh</div>
      <div className="foot-copy">© 2024 Muskaan Singh — Crafted with precision.</div>
    </footer>
  )
}
