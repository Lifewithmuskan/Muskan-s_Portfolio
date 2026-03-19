import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MARQUEE_ITEMS } from '../data/index.js'

const REPEATED = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS]

export default function Marquee() {
  const innerRef = useRef(null)

  useEffect(() => {
    ScrollTrigger.create({
      trigger: 'body', start: 'top top', end: 'bottom bottom',
      onUpdate: (self) => {
        const speed = Math.max(4, 22 - self.getVelocity() * 0.01)
        if (innerRef.current) innerRef.current.style.animationDuration = speed + 's'
      },
    })
  }, [])

  return (
    <div className="marquee-strip" id="marquee-strip">
      <div className="marquee-inner" ref={innerRef}>
        {REPEATED.map((item, i) => (
          <span className="marquee-item" key={i}>
            {item}<span className="marquee-sep"> · </span>
          </span>
        ))}
      </div>
    </div>
  )
}
