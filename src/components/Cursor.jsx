import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      gsap.set(dotRef.current, { left: e.clientX, top: e.clientY })
    }
    window.addEventListener('mousemove', onMove)

    let raf
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.1
      ring.current.y += (pos.current.y - ring.current.y) * 0.1
      if (ringRef.current) {
        ringRef.current.style.left = ring.current.x + 'px'
        ringRef.current.style.top = ring.current.y + 'px'
      }
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    // Cursor scale on interactive elements
    const onEnter = () => {
      gsap.to(dotRef.current, { scale: 2.5, background: 'transparent', boxShadow: '0 0 0 1.5px #8b5cf6', duration: 0.25 })
      gsap.to(ringRef.current, { scale: 1.4, opacity: 0.6, duration: 0.25 })
    }
    const onLeave = () => {
      gsap.to(dotRef.current, { scale: 1, background: '#8b5cf6', boxShadow: '0 0 14px #8b5cf6aa', duration: 0.25 })
      gsap.to(ringRef.current, { scale: 1, opacity: 1, duration: 0.25 })
    }

    const targets = document.querySelectorAll('a, button, .proj-card, .tag, .social-link')
    targets.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
      targets.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [])

  return (
    <>
      <div className="cur-dot" ref={dotRef} />
      <div className="cur-ring" ref={ringRef} />
    </>
  )
}
