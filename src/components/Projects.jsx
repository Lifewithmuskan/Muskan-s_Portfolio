import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROJECTS } from '../data/index.js'

function Modal({ project, onClose }) {
  const boxRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(boxRef.current,
      { opacity: 1, y: 40, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power4.out' }
    )
    const onKey = (e) => e.key === 'Escape' && handleClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const handleClose = () => {
    gsap.to(boxRef.current, {
      opacity: 1, y: 30, duration: 0.35, ease: 'power3.in',
      onComplete: onClose,
    })
  }

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-box" ref={boxRef} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={handleClose}>✕</button>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 60, fontWeight: 900, color: '#141414', lineHeight: 1, marginBottom: 4 }}>
          {project.n}
        </div>
        <div style={{ fontSize: 26, marginBottom: 16 }}>{project.icon}</div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 900, color: '#f0ede8', marginBottom: 14, lineHeight: 1.2 }}>
          {project.title}
        </h2>
        <p style={{ fontSize: 14, lineHeight: 1.8, color: '#666', marginBottom: 26 }}>{project.desc}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7, marginBottom: 30 }}>
          {project.tech.map((t) => (
            <span className="modal-tag" key={t}>{t}</span>
          ))}
        </div>
        <button
          onClick={handleClose}
          style={{ background: '#8b5cf6', border: 'none', color: '#fff', fontSize: 9, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', padding: '14px 28px', cursor: 'none', fontFamily: 'Inter, sans-serif' }}
        >
          Close
        </button>
      </div>
    </div>
  )
}

function ProjectCard({ project, index }) {
  const cardRef = useRef(null)

  useEffect(() => {
    const card = cardRef.current
    const onMove = (e) => {
      const r = card.getBoundingClientRect()
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2
      const rx = Math.max(-12, Math.min(12, ((e.clientY - cy) / r.height) * 18))
      const ry = Math.max(-12, Math.min(12, -((e.clientX - cx) / r.width) * 18))
      gsap.to(card, { rotateX: rx, rotateY: ry, duration: 0.3, ease: 'power2.out' })
    }
    const onLeave = () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.6, ease: 'elastic.out(1,.6)' })
    }
    card.addEventListener('mousemove', onMove)
    card.addEventListener('mouseleave', onLeave)
    return () => {
      card.removeEventListener('mousemove', onMove)
      card.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  const [modal, setModal] = useState(false)

  return (
    <>
      <div className="proj-card" ref={cardRef} onClick={() => setModal(true)}>
        <div className="proj-bg-num">{project.n}</div>
        <div className="proj-icon">{project.icon}</div>
        <div className="proj-title">{project.title}</div>
        <div className="proj-desc">{project.desc.slice(0, 130)}...</div>
      <div className="proj-links">
  <a href={project.live} target="_blank" rel="noreferrer">
    Live
  </a>
  <a href={project.github} target="_blank" rel="noreferrer">
    Code
  </a>
</div>
        <span className="proj-arrow">↗</span>
      </div>
      {modal && <Modal project={project} onClose={() => setModal(false)} />}
    </>
  )
}

export default function Projects() {
  useEffect(() => {
   gsap.from('#pj-eyebrow', {
  opacity: 1,
  x: -30,
  duration: 0.8,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '#pj-eyebrow',
    start: 'top 88%'
  }
})

gsap.from('#pj-title', {
  opacity:1 ,   
  y: 50,
  duration: 1,
  ease: 'power4.out',
  scrollTrigger: {
    trigger: '#pj-title',
    start: 'top 85%'
  }
})
gsap.fromTo('.proj-card',
  { opacity: 0, y: 60, scale: 0.95 },
  {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.85,
    stagger: 0.12,
    ease: 'power4.out',
    scrollTrigger: {
      trigger: '#proj-grid',
      start: 'top 85%',
      toggleActions: 'play none none none'
    }
  }
)
//   gsap.from('.proj-card', {
//   opacity: 1,
//   y: 60,
//   scale: 0.95,
//   duration: 0.85,
//   stagger: 0.12,
//   ease: 'power4.out',
//   scrollTrigger: {
//     trigger: '#proj-grid',
//     start: 'top 82%'
//   }
// })
  }, [])

  return (
    <section className="section" id="projects-sec">
      <div className="s-eyebrow" id="pj-eyebrow">
        <span className="s-eyebrow-line" />
        Selected Work
      </div>

      <div className="s-title" id="pj-title">
        Featured<br /><em>Projects.</em>
      </div>

      <div className="proj-grid" id="proj-grid">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.n} project={p} index={i} />
        ))}
      </div>
    </section>
  )
}
