import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TAGS, INFO_ROWS } from '../data/index.js'

export default function About() {
  useEffect(() => {
    // Eyebrow + title
    gsap.from('#ab-eyebrow', { opacity: 1, x: -30, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '#ab-eyebrow', start: 'top 88%' } })
    gsap.from('#ab-title',   { opacity: 1, y: 50,  duration: 1,   ease: 'power4.out', scrollTrigger: { trigger: '#ab-title',   start: 'top 85%' } })

    // Paragraphs
    gsap.from('#ab-p1', { opacity: 1, y: 30, duration: 0.9, ease: 'power3.out', scrollTrigger: { trigger: '#ab-p1', start: 'top 87%' } })
    gsap.from('#ab-p2', { opacity: 1, y: 30, duration: 0.9, ease: 'power3.out', delay: 0.1, scrollTrigger: { trigger: '#ab-p2', start: 'top 87%' } })

    // Tags stagger
    gsap.to('.tag', {
      opacity: 1, y: 0, duration: 0.6, stagger: 0.05, ease: 'back.out(1.4)',
      scrollTrigger: { trigger: '#tags-wrap', start: 'top 85%' },
    })

    // Info rows
    gsap.to('#info-col .info-row', {
      opacity: 1, x: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out',
      scrollTrigger: { trigger: '#info-col', start: 'top 82%' },
    })
  }, [])

  return (
    <section className="section" id="about-sec">
      <div className="s-eyebrow" id="ab-eyebrow">
        <span className="s-eyebrow-line" />
        Background
      </div>

      <div className="about-grid">
        {/* Left */}
        <div>
          <div className="s-title" id="ab-title">
            Who I<br /><em>Am.</em>
          </div>

          <p className="about-p" id="ab-p1">
            I'm a <strong>Software Engineer</strong> and Machine Learning enthusiast
            who graduated with a B.Tech in{' '}
            <strong>Electronics &amp; Communication Engineering</strong>. I build
            systems that are as smart as they are elegant.
          </p>

          <p className="about-p" id="ab-p2">
            During my internship at <strong>DRDO</strong>, I shipped a
            production-grade training analysis web application used across defence
            departments. I thrive at the intersection of data, algorithms, and
            great user experience.
          </p>

          <div className="tags-wrap" id="tags-wrap">
            {TAGS.map((t) => (
              <div className="tag" key={t}>{t}</div>
            ))}
          </div>
        </div>

        {/* Right */}
        <div className="info-col" id="info-col">
          {INFO_ROWS.map((row) => (
            <div className="info-row" key={row.key}>
              <span className="info-key">{row.key}</span>
              <span className="info-val">{row.val}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
