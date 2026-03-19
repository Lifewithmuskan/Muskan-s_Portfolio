# Muskaan Singh — Portfolio

Bold, classic, GSAP-animated React portfolio.

## Quick Start

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
src/
├── App.jsx                  # Root component
├── main.jsx                 # Entry point
├── styles/
│   └── global.css           # All styles
├── data/
│   └── index.js             # Skills, projects, timeline data
└── components/
    ├── Preloader.jsx         # Animated loading screen
    ├── Cursor.jsx            # Custom magnetic cursor
    ├── ParticleCanvas.jsx    # Interactive particle field
    ├── Navbar.jsx            # Sticky nav with scroll effect
    ├── Hero.jsx              # Hero + GSAP master timeline
    ├── Marquee.jsx           # Scroll-speed-reactive ticker
    ├── About.jsx             # About + tags + info rows
    ├── Skills.jsx            # Animated skill bars
    ├── Projects.jsx          # 3D tilt cards + modal
    ├── Experience.jsx        # Scroll-triggered timeline
    ├── Contact.jsx           # Form + socials
    └── Footer.jsx            # Minimal footer
```

## Tech Stack

- **React 18** + **Vite**
- **GSAP 3.12** + ScrollTrigger
- **Playfair Display** + **Inter** fonts
- Pure CSS (no Tailwind dependency)

## Customise

Edit `src/data/index.js` to update your skills, projects, and timeline.
