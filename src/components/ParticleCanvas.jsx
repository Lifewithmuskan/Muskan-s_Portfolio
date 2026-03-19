import { useEffect, useRef } from 'react'

export default function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let W, H

    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const N = 60
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.2 + 0.4,
    }))

    let mouse = { x: W / 2, y: H / 2 }
    const onMove = (e) => { mouse = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', onMove)

    let raf
    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      for (let i = 0; i < N; i++) {
        const p = pts[i]
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0

        // Mouse attraction
        const dx = mouse.x - p.x, dy = mouse.y - p.y
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < 180) { p.vx += (dx / d) * 0.012; p.vy += (dy / d) * 0.012 }
        const sp = Math.sqrt(p.vx ** 2 + p.vy ** 2)
        if (sp > 1.2) { p.vx /= sp; p.vy /= sp }

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(139,92,246,.45)'
        ctx.fill()

        for (let j = i + 1; j < N; j++) {
          const dx2 = p.x - pts[j].x, dy2 = p.y - pts[j].y
          const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2)
          if (dist < 120) {
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(pts[j].x, pts[j].y)
            ctx.strokeStyle = `rgba(139,92,246,${0.15 * (1 - dist / 120)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return <canvas className="particle-canvas" ref={canvasRef} />
}
