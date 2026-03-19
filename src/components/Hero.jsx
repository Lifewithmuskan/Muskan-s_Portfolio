import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AvatarHero from './AvatarHero'

gsap.registerPlugin(ScrollTrigger)

export default function Hero() {
  const sectionRef = useRef(null)
  const portraitRef = useRef(null)
  const avatarWrapRef = useRef(null)

  useEffect(() => {
    /* ── Master hero entrance timeline ── */
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

    // Nav
    tl.to('.nav-logo',  { opacity: 1, duration: 0.7 }, 0)
      .to('.nav-links', { opacity: 1, duration: 0.6 }, 0.15)
      .to('.nav-cta',   { opacity: 1, duration: 0.6 }, 0.25)

    // Eyebrow
    tl.fromTo('#eyebrow', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, 0.3)

    // Name — clip reveal per line
    tl.to('.hero-line-inner', { y: '0%', duration: 1.1, ease: 'power4.out', stagger: 0.12 }, 0.45)

    // Desc + buttons
    tl.to('#hero-desc', { opacity: 1, y: 0, duration: 0.8 }, 0.9)
      .to('#hero-btns', { opacity: 1, y: 0, duration: 0.7 }, 1.05)

    // Portrait + decorative elements
    tl.to('#portrait',  { opacity: 1, duration: 0.7 }, 0.6)
      .to('#p-vline',   { height: '55%', duration: 1, ease: 'power3.out' }, 0.7)
      .to(['#p-corner', '#p-label'], { opacity: 1, duration: 0.5 }, 1.1)
      .to('#p-corner',  { width: 56, height: 56, duration: 0.7, ease: 'power3.out' }, 1.1)
      .to('#p-footer',  { opacity: 1, y: 0, duration: 0.7 }, 1.2)

    // Stat boxes stagger
    tl.to(['#sb1', '#sb2', '#sb3'], { opacity: 1, x: 0, duration: 0.6, stagger: 0.1 }, 1.2)

    // Scroll hint
    tl.to('#scroll-hint', { opacity: 1, duration: 0.8 }, 1.5)

    // Marquee strip
    tl.to('#marquee-strip', { opacity: 1, duration: 0.6 }, 1.6)

    // Scroll-line infinite bounce
    gsap.to('.scroll-line', {
      scaleY: 0.3, transformOrigin: 'bottom',
      duration: 1, repeat: -1, yoyo: true, ease: 'sine.inOut',
    })

    // Portrait scroll parallax
    gsap.to(portraitRef.current, {
      yPercent: -12, ease: 'none',
      scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: true },
    })

    // Parallax orbs on mouse
    const onMouse = (e) => {
      const nx = (e.clientX / window.innerWidth - 0.5)
      const ny = (e.clientY / window.innerHeight - 0.5)
      gsap.to('#orb1', { x: nx * -60, y: ny * -40, duration: 1.8, ease: 'power2.out' })
      gsap.to('#orb2', { x: nx * 50,  y: ny * 35,  duration: 2.2, ease: 'power2.out' })
      gsap.to('#orb3', { x: nx * -30, y: ny * -50, duration: 1.5, ease: 'power2.out' })
    }
    window.addEventListener('mousemove', onMouse)

    return () => window.removeEventListener('mousemove', onMouse)
  }, [])

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className="hero-section" ref={sectionRef}>
      <div className="hero-grid">
        {/* Left */}
        <div className="hero-left">
          <div className="hero-eyebrow" id="eyebrow">
            <span className="hero-eyebrow-line" />
            Software Engineer &amp; ML Enthusiast
          </div>

          <h1 className="hero-name">
            <span className="hero-line">
              <span className="hero-line-inner">Mus<em>kan</em></span>
            </span>
            <span className="hero-line">
              <span className="hero-line-inner">Singh.</span>
            </span>
          </h1>  <p className="hero-desc" id="hero-desc">
  Software Engineer & Machine Learning enthusiast building intelligent, scalable systems. 

</p>

        

      <div className="hero-btns" id="hero-btns">
            <button className="btn-purple" onClick={() => scrollTo('projects-sec')}>
              View My Work
            </button>

            <a
              href="/resume.pdf"
              download
              className="btn-ghost"
              style={{ textDecoration: "none", display: "inline-block" }}
            >
              Download Resume
            </a>
        </div>
        </div>

  

        
        <div className="hero-right">
          <div className="portrait-frame" id="portrait" ref={portraitRef}>
            <div className="portrait-bg">
              <div className="p-vline" id="p-vline" />
              <div className="p-corner" id="p-corner" />
              
                              <div
  id="avatar-wrap"
  ref={avatarWrapRef}
  onMouseEnter={() => {}}
  style={{
    opacity: 1,
    width: 'min(360px, 90%)',
    aspectRatio: '3/4',
    position: 'relative',
    background: '#0d0d0d',
    border: '1px solid #181818',
    overflow: 'hidden',
    cursor: 'pointer',   // 👈 ADD THIS
  }}
>
  <AvatarHero />
</div>
              <div className="p-footer" id="p-footer">
                <div className="p-footer-name">Muskan Singh</div>
                <div className="p-footer-role">Developer and Innovater </div>
              </div>
            </div>

            <div className="stat-strip">
              {[
                  { id: 'sb1', num: '5+', lbl: 'Hackathons Won' },
  { id: 'sb2', num: '2+', lbl: 'Internships' },
               { id: 'sb3', num: 'Real-World', lbl: 'Projects', small: true },
              ].map((s) => (
                <div className="stat-box" id={s.id} key={s.id}>
                  <div className="stat-num" style={s.small ? { fontSize: 15 } : {}}>
                    {s.num}
                  </div>
                  <div className="stat-lbl">{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

     
      <div className="scroll-hint" id="scroll-hint">
        <span>Scroll</span>
        <div className="scroll-line" />
      </div>
    </section>
  )
}
