import { useState } from 'react'
import PasswordGate from './components/PasswordGate'
import CollageLayer from './components/CollageLayer'
import Hero from './components/Hero'
import Songs from './components/Songs'
import BehindScenes from './components/BehindScenes'
import Footer from './components/Footer'

export default function App() {
  const [unlocked, setUnlocked] = useState(false)

  if (!unlocked) {
    return <PasswordGate onUnlock={() => setUnlocked(true)} />
  }

  return (
    <div className="relative min-h-screen bg-cream">
      {/* Photo collage behind all content */}
      <CollageLayer />

      {/* Main content */}
      <main className="relative z-10">
        <Hero />

        {/* Soft divider */}
        <div className="flex justify-center">
          <div className="w-px h-16 bg-linear-to-b from-valentine-muted/20 to-transparent" />
        </div>

        <Songs />

        {/* Soft divider */}
        <div className="flex justify-center">
          <div className="w-px h-16 bg-linear-to-b from-valentine-muted/20 to-transparent" />
        </div>

        <BehindScenes />

        {/* Soft divider */}
        <div className="flex justify-center">
          <div className="w-px h-16 bg-linear-to-b from-valentine-muted/20 to-transparent" />
        </div>

        <Footer />
      </main>
    </div>
  )
}
