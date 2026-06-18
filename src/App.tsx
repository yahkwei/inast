import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import IntroSplash from './components/IntroSplash'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Order from './pages/Order'
import BusinessOrder from './pages/BusinessOrder'
import IndividualOrder from './pages/IndividualOrder'
import Pricing from './pages/Pricing'
import FAQ from './pages/FAQ'
import Portfolio from './pages/Portfolio'
import NotFound from './pages/NotFound'
import MistBackground from './components/MistBackground'
import ScrollToTop from './components/ScrollToTop'
import { getRouterBasename } from './lib/router'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/order" element={<Order />} />
        <Route path="/order/business" element={<BusinessOrder />} />
        <Route path="/order/individual" element={<IndividualOrder />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  const [introComplete, setIntroComplete] = useState(false)

  return (
    <BrowserRouter basename={getRouterBasename()}>
      <ScrollToTop />
      <MistBackground />
      {!introComplete && (
        <IntroSplash onComplete={() => setIntroComplete(true)} />
      )}
      {introComplete && (
        <Layout>
          <AnimatedRoutes />
        </Layout>
      )}
    </BrowserRouter>
  )
}
