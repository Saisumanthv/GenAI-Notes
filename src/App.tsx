import { MotionConfig } from 'motion/react'
import { useEffect } from 'react'
import { HashRouter, Route, Routes, useLocation } from 'react-router'
import { ScrollArrows } from './components/ScrollArrows'
import { ThemeSwitch } from './components/ThemeSwitch'
import { Home } from './pages/Home'
import { Roadmap } from './pages/Roadmap'

// Start each page at the top when navigating
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  return (
    // Respect the OS "reduce motion" setting for every Motion animation
    <MotionConfig reducedMotion="user">
      {/* Hash URLs (/#/roadmap) work on any static host without rewrite rules */}
      <HashRouter>
        <ScrollToTop />
        <ThemeSwitch />
        <ScrollArrows />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </HashRouter>
    </MotionConfig>
  )
}

export default App
