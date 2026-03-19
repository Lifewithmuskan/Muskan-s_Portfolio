import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const SOCIALS = [
  {
    label: 'GitHub',
    href: 'https://github.com/Lifewithmuskan'
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/muskan-singh-94baab226/'
  },
  {
    label: 'Email',
    href: 'mailto:singh112002muskan@gmail.com'
  }
]

export default function Contact() {
  const formRef = useRef(null)
  const [sent, setSent] = useState(false)
  const [fields, setFields] = useState({ name: '', email: '', message: '' })

  useEffect(() => {
    gsap.from('#ct-eyebrow', { opacity: 1, x: -30, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '#ct-eyebrow', start: 'top 88%' } })
    gsap.from('#ct-big',     { opacity: 1, y: 50,  duration: 1,   ease: 'power4.out', scrollTrigger: { trigger: '#ct-big',     start: 'top 85%' } })
    gsap.from('#ct-sub',     { opacity: 1, y: 20,  duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '#ct-sub',     start: 'top 88%' } })

    gsap.to('.social-link', {
      opacity: 1, x: 0, duration: 0.65, stagger: 0.1, ease: 'power3.out',
      scrollTrigger: { trigger: '#socials', start: 'top 85%' },
    })
    gsap.to('.form-side', {
      opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: '.form-side', start: 'top 82%' },
    })
  }, [])

  const handleSend = () => {
    if (!fields.name || !fields.email || !fields.message) return
    gsap.to(formRef.current, {
      opacity: 1, y: -20, duration: 0.4, ease: 'power3.in',
      onComplete: () => setSent(true),
    })
  }

  useEffect(() => {
    if (sent && formRef.current) {
      gsap.from(formRef.current, { opacity: 0, y: 20, duration: 0.6, ease: 'power3.out' })
    }
  }, [sent])

  return (
    <section className="section" id="contact-sec">
      <div className="s-eyebrow" id="ct-eyebrow">
        <span className="s-eyebrow-line" />
        Contact
      </div>

      <div className="contact-grid">
        {/* Left */}
        <div>
          <div className="contact-big" id="ct-big">
            Let's Build<br /><em>Something</em><br />Great.
          </div>
          <p className="contact-sub" id="ct-sub">
            Open to full-time software engineering roles, ML research positions,
            and ambitious collaborations. Don't hesitate to reach out.
          </p>
          <div id="socials">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} className="social-link" target="_blank" rel="noreferrer">
                <span className="s-name">{s.label}</span>
                <span className="s-arr">↗</span>
              </a>
            ))}
          </div>
        </div>

        {/* Right — Form */}
        <div className="form-side">
          <div ref={formRef}>
            {sent ? (
              <div className="send-success">
                <div className="send-success-title">Done.</div>
                <div className="send-success-sub">
                  Message received, {fields.name}. I'll be in touch.
                </div>
              </div>
            ) : (
              <>
                <div>
                  <label className="form-label">Your Name</label>
                  <input className="form-input" type="text" placeholder="Your name"
                    value={fields.name} onChange={(e) => setFields({ ...fields, name: e.target.value })} />
                </div>
                <div>
                  <label className="form-label">Email Address</label>
                  <input className="form-input" type="email" placeholder="something@email.com"
                    value={fields.email} onChange={(e) => setFields({ ...fields, email: e.target.value })} />
                </div>
                <div>
                  <label className="form-label">Message</label>
                  <textarea className="form-input" placeholder="Tell me about your idea, project, or opportunity..."
                    value={fields.message} onChange={(e) => setFields({ ...fields, message: e.target.value })} />
                </div>
                <button className="btn-send" onClick={handleSend}>Send Message →</button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
