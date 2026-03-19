import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TIMELINE } from '../data/index.js'

function TimelineItem({ item }) {
  const itemRef = useRef(null)

  useEffect(() => {
    const el = itemRef.current
    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: 'top 82%' },
    })
    tl.to(el.querySelector('.tl-left'), { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' }, 0)
      .to(el.querySelector('.tl-dot'),  { scale: 1, duration: 0.5, ease: 'back.out(2)' }, 0.15)
      .to(el.querySelector('.tl-body'), { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' }, 0.1)
  }, [])

  return (
    <div className="tl-item" ref={itemRef}>
      <div className="tl-left">
        <div className="tl-year">{item.year}</div>
      </div>
      <div className="tl-line">
        <div className="tl-dot" />
      </div>
      <div className="tl-body">
        <div className="tl-role">{item.role}</div>
        <div className="tl-org">{item.org}</div>
        <div className="tl-desc">{item.desc}</div>
      </div>
    </div>
  )
}

export default function Experience() {
  useEffect(() => {
    gsap.from('#exp-eyebrow', { opacity: 1, x: -30, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '#exp-eyebrow', start: 'top 88%' } })
    gsap.from('#exp-title',   { opacity: 1, y: 50,  duration: 1,   ease: 'power4.out', scrollTrigger: { trigger: '#exp-title',   start: 'top 85%' } })
  }, [])

  return (
    <section className="section" id="experience-sec" style={{ background: '#050505' }}>
      <div className="s-eyebrow" id="exp-eyebrow">
        <span className="s-eyebrow-line" />
        Journey
      </div>

      <div className="s-title" id="exp-title">
        Experience &amp;<br /><em>Education.</em>
      </div>

      {TIMELINE.map((item) => (
        <TimelineItem key={item.year} item={item} />
      ))}
    </section>
  )
}
