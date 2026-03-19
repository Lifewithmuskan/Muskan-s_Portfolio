import { useEffect, useRef, useState } from 'react'

/**
 * AvatarHero.jsx
 * ─────────────────────────────────────────────────────────
 * Loads the Ready Player Me .glb avatar via Three.js
 * Plays a proper "hello wave" animation:
 *   • Right upper arm raises to ~90° outward
 *   • Right forearm oscillates fast (the actual wave)
 *   • Right hand follows with phase lag
 *   • Head turns slightly toward the wave + bobs
 *   • Whole body gently floats up/down
 *
 * Install:  npm install three
 * ─────────────────────────────────────────────────────────
 */

const AVATAR_URL = 'https://models.readyplayer.me/69ba65894d98c768213e3fb3.glb'

export default function AvatarHero({ style }) {
  const mountRef  = useRef(null)
  const stateRef  = useRef({})        // holds Three.js objects safely
  const [status, setStatus] = useState('loading') // loading | ready | error

  useEffect(() => {
    let cancelled = false
    const s = stateRef.current

    async function init() {
      const THREE       = await import('three')
      const { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js')
      if (cancelled) return

      const mount = mountRef.current
      const W = () => mount.clientWidth
      const H = () => mount.clientHeight

      // ── Clock ──────────────────────────────────────────
      s.clock = new THREE.Clock()

      // ── Scene ──────────────────────────────────────────
      s.scene = new THREE.Scene()

      // ── Camera ─────────────────────────────────────────
      s.camera = new THREE.PerspectiveCamera(28, W() / H(), 0.1, 20)
      s.camera.position.set(0, 1.6, 2.8)
      s.camera.lookAt(0, 1.5, 0)

      // ── Renderer ───────────────────────────────────────
      s.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      s.renderer.setSize(W(), H())
      s.renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
      s.renderer.outputColorSpace = THREE.SRGBColorSpace
      s.renderer.shadowMap.enabled = true
      mount.appendChild(s.renderer.domElement)

      // ── Lights ─────────────────────────────────────────
      s.scene.add(new THREE.AmbientLight(0xffffff, 0.7))

      const key = new THREE.DirectionalLight(0xffffff, 1.6)
      key.position.set(1.5, 3, 2)
      key.castShadow = true
      s.scene.add(key)

      const fill = new THREE.DirectionalLight(0x8b5cf6, 0.6)
      fill.position.set(-2, 1.5, 1)
      s.scene.add(fill)

      const rim = new THREE.DirectionalLight(0xa855f7, 0.5)
      rim.position.set(0, 3, -2)
      s.scene.add(rim)

      // ── Resize ─────────────────────────────────────────
      const onResize = () => {
        s.camera.aspect = W() / H()
        s.camera.updateProjectionMatrix()
        s.renderer.setSize(W(), H())
      }
      window.addEventListener('resize', onResize)
      s.onResize = onResize

      // ── Load avatar via fetch → GLTFLoader.parse ───────
      // Fetch handles progress; parse avoids CORS preflight issues
      const res = await fetch(AVATAR_URL)
      if (!res.ok) throw new Error('HTTP ' + res.status)
      const buffer = await res.arrayBuffer()
      if (cancelled) return

      await new Promise((resolve, reject) => {
        const loader = new GLTFLoader()
        loader.parse(buffer, '', (gltf) => {
          if (cancelled) return
          const av = gltf.scene

          // Center & baseline
          const box = new THREE.Box3().setFromObject(av)
          const size = box.getSize(new THREE.Vector3())
          const center = box.getCenter(new THREE.Vector3())
          av.position.sub(center)
          av.position.y += size.y * 0.5
          s.baseY = av.position.y

          // Shadows + material quality
          av.traverse(child => {
            if (child.isMesh) {
              child.castShadow = true
              child.receiveShadow = true
              if (child.material) child.material.envMapIntensity = 1.3
            }
          })

          // ── Locate bones ─────────────────────────────
          av.traverse(node => {
            const n = node.name.toLowerCase()
            // Right upper arm — RPM names it "RightArm"
            if (!s.rightUpperArm &&
                (n === 'rightarm' || n === 'right_arm' ||
                 n === 'rightupperarm' || n === 'right_upper_arm' ||
                 (n.includes('upperarm') && n.includes('right')))) {
              s.rightUpperArm = node
            }
            // Right forearm — RPM names it "RightForeArm"
            if (!s.rightLowerArm &&
                (n === 'rightforearm' || n === 'right_forearm' ||
                 n === 'rightlowerarm' || n === 'right_lower_arm' ||
                 (n.includes('forearm') && n.includes('right')))) {
              s.rightLowerArm = node
            }
            // Right hand
            if (!s.rightHand &&
                (n === 'righthand' || n === 'right_hand')) {
              s.rightHand = node
            }
            // Head
            if (!s.headBone && n === 'head') s.headBone = node
          })

          // Store original rotations for offset math
          ;[s.rightUpperArm, s.rightLowerArm, s.rightHand, s.headBone].forEach(b => {
            if (b) b._orig = { x: b.rotation.x, y: b.rotation.y, z: b.rotation.z }
          })

          s.avatar = av
          s.scene.add(av)
          setStatus('ready')
          resolve()
        }, reject)
      })

      // ── Render loop ────────────────────────────────────
      const tick = () => {
        s.raf = requestAnimationFrame(tick)
        const t = s.clock.getElapsedTime()
        const av = s.avatar
        if (!av) { s.renderer.render(s.scene, s.camera); return }

        // ── Body float ───────────────────────────────────
        av.position.y = s.baseY + Math.sin(t * 0.9) * 0.012
        av.rotation.y = Math.sin(t * 0.4) * 0.04

        // ── Right upper arm: raise to ~90° outward ───────
        if (s.rightUpperArm) {
          const o = s.rightUpperArm._orig
          // Negative Z raises the right arm up in RPM humanoid rig
          s.rightUpperArm.rotation.z = o.z - 1.3 + Math.sin(t * 0.5) * 0.05
          s.rightUpperArm.rotation.x = o.x + 0.15
        }

        // ── Right forearm: fast wave — the "hello" motion ─
        if (s.rightLowerArm) {
          const o = s.rightLowerArm._orig
          // 4 Hz oscillation on Z = forearm waves side to side
          s.rightLowerArm.rotation.z = o.z + Math.sin(t * 4.0) * 0.55
          s.rightLowerArm.rotation.x = o.x - 0.3
        }

        // ── Right hand: follows forearm with lag ──────────
        if (s.rightHand) {
          const o = s.rightHand._orig
          s.rightHand.rotation.z = o.z + Math.sin(t * 4.0 - 0.3) * 0.2
        }

        // ── Head: looks toward wave + gentle nod ─────────
        if (s.headBone) {
          const o = s.headBone._orig
          s.headBone.rotation.y = o.y + 0.12 + Math.sin(t * 0.5) * 0.04
          s.headBone.rotation.x = o.x + Math.sin(t * 0.6) * 0.015
        }

        // Camera micro float
        s.camera.position.y = 1.6 + Math.sin(t * 0.5) * 0.006

        s.renderer.render(s.scene, s.camera)
      }
      tick()
    }

    init().catch(err => {
      console.error('AvatarHero error:', err)
      setStatus('error')
    })

    return () => {
      cancelled = true
      if (s.raf) cancelAnimationFrame(s.raf)
      if (s.onResize) window.removeEventListener('resize', s.onResize)
      if (s.renderer) {
        s.renderer.dispose()
        if (s.renderer.domElement.parentNode === mountRef.current) {
          mountRef.current?.removeChild(s.renderer.domElement)
        }
      }
    }
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 480, background: '#0d0d0d', ...style }}>
      {/* Three.js canvas */}
      <div ref={mountRef} style={{ width: '100%', height: '100%', minHeight: 480 }} />

      {/* Loading */}
      {status === 'loading' && (
        <div style={overlayStyle}>
          <Spinner />
          <div style={statusTextStyle}>Loading Avatar</div>
        </div>
      )}

      {/* Error */}
      {status === 'error' && (
        <div style={overlayStyle}>
          <div style={{ fontSize: 28, marginBottom: 8 }}>⚠</div>
          <div style={{ ...statusTextStyle, color: '#ef4444' }}>Failed to load</div>
          <div style={{ fontSize: 11, color: '#444', textAlign: 'center', maxWidth: 220, lineHeight: 1.6 }}>
            Ready Player Me may block requests.<br />
            Run <code style={{ color: '#8b5cf6' }}>npm run dev</code> locally.
          </div>
        </div>
      )}

      {/* Decorations */}
 
    </div>
  )
}

const overlayStyle = {
  position: 'absolute', inset: 0,
  display: 'flex', flexDirection: 'column',
  alignItems: 'center', justifyContent: 'center',
  gap: 14, background: '#0d0d0d',
  fontFamily: 'Inter,sans-serif',
}
const statusTextStyle = {
  fontSize: 10, fontWeight: 700, letterSpacing: 3,
  textTransform: 'uppercase', color: '#333',
}

function Spinner() {
  return (
    <div style={{
      width: 32, height: 32,
      border: '2px solid #1a1a1a', borderTop: '2px solid #8b5cf6',
      borderRadius: '50%', animation: 'avatarSpin 0.9s linear infinite',
    }}>
      <style>{`@keyframes avatarSpin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
