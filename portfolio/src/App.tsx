import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import ScrollProgress from './components/ScrollProgress'
import WhatsAppButton from './components/WhatsAppButton'
import CursorEffects from './components/CursorEffects'
import Hero from './sections/Hero'
import About from './sections/About'
import Skills from './sections/Skills'
import Experience from './sections/Experience'
import Education from './sections/Education'
import Training from './sections/Training'
import Projects from './sections/Projects'
import Contact from './sections/Contact'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <CursorEffects />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Education />
        <Training />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </MotionConfig>
  )
}
