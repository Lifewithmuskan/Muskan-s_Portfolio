// import { useEffect, useRef, useState } from 'react'
// import { gsap } from 'gsap'
// import { ScrollTrigger } from 'gsap/ScrollTrigger'
// import { SKILLS } from '../data/index.js'

// function SkillItem({ skill, index }) {
//   const [pct, setPct] = useState(0)
//   const barRef = useRef(null)

//   useEffect(() => {
//     ScrollTrigger.create({
//       trigger: `#skill-${index}`,
//       start: 'top 85%',
//       once: true,
//       onEnter: () => {
//         setTimeout(() => {
//           gsap.to(barRef.current, { width: skill.pct + '%', duration: 1.4, ease: 'power3.out' })
//           gsap.to({ val: 0 }, {
//             val: skill.pct, duration: 1.4, ease: 'power3.out',
//             onUpdate: function () { setPct(Math.round(this.targets()[0].val)) },
//           })
//         }, index * 70)
//       },
//     })
//   }, [skill.pct, index])

//   return (
//     <div className="skill-item" id={`skill-${index}`}>
//       <span className="sk-num">0{index + 1}</span>
//       <span className="sk-name">{skill.name}</span>
//       <div className="sk-bar-wrap">
//         <div className="sk-bar" ref={barRef} />
//       </div>
//       <span className="sk-pct">{pct}%</span>
//     </div>
//   )
// }

// export default function Skills() {
//   useEffect(() => {
//     gsap.from('#sk-eyebrow', { opacity: 1, x: -30, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: '#sk-eyebrow', start: 'top 88%' } })
//     gsap.from('#sk-title',   { opacity: 1, y: 50,  duration: 1,   ease: 'power4.out', scrollTrigger: { trigger: '#sk-title',   start: 'top 85%' } })

//     gsap.to('.skill-item', {
//       opacity: 1, x: 0, duration: 0.7, stagger: 0.07, ease: 'power3.out',
//       scrollTrigger: { trigger: '#skill-grid', start: 'top 80%' },
//     })
//   }, [])

//   return (
//     <section className="section" id="skills-sec" style={{ background: '#050505' }}>
//       <div className="s-eyebrow" id="sk-eyebrow">
//         <span className="s-eyebrow-line" />
//         Expertise
//       </div>

//       <div className="s-title" id="sk-title">
//         Skills &amp;<br /><em>Craft.</em>
//       </div>

//       <div className="skills-grid" id="skill-grid">
//         {SKILLS.map((s, i) => (
//           <SkillItem key={s.name} skill={s} index={i} />
//         ))}
//       </div>
//     </section>
//   )
// }


import { useEffect } from 'react'
import { gsap } from 'gsap'

const TECH = [
  	"HTML5"	,"CSS3"	,
"Express.js",	"MongoDB",	
	,"Bootstrap",	"NPM"	,"EJS"
,"jQuery"	,"Machine Learning",	"Artificial Intelligence"	,"Data Structures", "Algorithms"
,"MySQL"	,"DBMS",	"Git	GitHub",
  "React", "Node.js", "Python", "TensorFlow",
  "MongoDB", "Express", "Scikit-learn",
  "Pandas", "NumPy", "C++", "JavaScript"
]

export default function Skills() {
  useEffect(() => {
    gsap.to('.floating-tag', {
      y: 'random(-20, 20)',
      x: 'random(-20, 20)',
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      stagger: 0.8
    })
  }, [])

  return (
    <section className="section" id="skills-sec">
      <div className="s-title">
        Skills & <em>Craft.</em>
      </div>

      <div className="floating-container">
        {TECH.map((tech, i) => (
          <div
            key={i}
            className="floating-tag"
            style={{
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 80}%`
            }}
          >
           <h3>{tech}</h3> 
          </div>
        ))}
      </div>
    </section>
  )
}