import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

const WORDS = ['Initializing...', 'Loading Assets...', 'Crafting UI...', 'Almost Ready...', 'Welcome.']

export default function Preloader({ onComplete }) {
  const barRef = useRef(null)
  const wrapRef = useRef(null)
  const [pct, setPct] = useState(0)
  const [word, setWord] = useState(WORDS[0])

  useEffect(() => {
    let progress = 0
    let wordIdx = 0

    const interval = setInterval(() => {
      progress = Math.min(100, progress + Math.random() * 5 + 2)
      if (barRef.current) barRef.current.style.width = progress + '%'
      setPct(Math.round(progress))

      const threshold = wordIdx * 20
      if (progress > threshold && wordIdx < WORDS.length) {
        setWord(WORDS[wordIdx])
        wordIdx++
      }

      if (progress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          gsap.to(wrapRef.current, {
            opacity: 0, scale: 1.06, duration: 0.8, ease: 'power3.in',
            onComplete,
          })
        }, 300)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <div className="preloader" ref={wrapRef}>
      <div className="pre-title">
        Muskan <em>Singh</em>
      </div>
      <div className="pre-bar-bg">
        <div className="pre-bar" ref={barRef} />
      </div>
      <div className="pre-pct">{pct}%</div>
      <div className="pre-words">{word}</div>
    </div>
  )
}
