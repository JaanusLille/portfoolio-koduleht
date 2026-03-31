import { useEffect } from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import './App.css'

function App() {
  useEffect(() => {
    const root = document.documentElement

    const setGlowPosition = (x: number, y: number) => {
      root.style.setProperty('--mouse-x', `${x}px`)
      root.style.setProperty('--mouse-y', `${y}px`)
    }

    setGlowPosition(window.innerWidth / 2, window.innerHeight / 2)

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      setGlowPosition(event.clientX, event.clientY)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })

    return () => {
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  return (
    <div className="app">
      <Header />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
