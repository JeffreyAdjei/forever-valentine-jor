import { useEffect, useState } from 'react'
import { useInView } from './useInView'

function Typewriter({
  text,
  delay = 0,
  speed = 70,
  className = '',
  onDone,
}: {
  text: string
  delay?: number
  speed?: number
  className?: string
  onDone?: () => void
}) {
  const [displayed, setDisplayed] = useState('')
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay)
    return () => clearTimeout(timeout)
  }, [delay])

  useEffect(() => {
    if (!started) return
    if (displayed.length >= text.length) {
      onDone?.()
      return
    }
    const timeout = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1))
    }, speed)
    return () => clearTimeout(timeout)
  }, [started, displayed, text, speed, onDone])

  return (
    <span className={className}>
      {displayed}
      {started && displayed.length < text.length && (
        <span className="inline-block w-[2px] h-[1em] bg-valentine-dark/60 ml-0.5 align-middle animate-[blink_1s_steps(2)_infinite]" />
      )}
    </span>
  )
}

export default function Hero() {
  const { ref, isVisible } = useInView(0.2)
  const [line1Done, setLine1Done] = useState(false)
  const [line2Done, setLine2Done] = useState(false)

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center px-4"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-linear-to-b from-valentine/8 via-cream to-cream" />

      <div
        className={`relative z-10 text-center max-w-2xl mx-auto transition-all duration-1000 ${
          isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Small decorative heart */}
        <div className="mb-8 flex justify-center">
          <div className="animate-soft-float">
            <svg
              width="24"
              height="22"
              viewBox="0 0 28 26"
              fill="none"
              className="text-valentine-muted"
            >
              <path
                d="M14 25.5C14 25.5 0.5 17.5 0.5 8.5C0.5 4.36 3.86 1 8 1C10.76 1 13.15 2.54 14 4.83C14.85 2.54 17.24 1 20 1C24.14 1 27.5 4.36 27.5 8.5C27.5 17.5 14 25.5 14 25.5Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </div>

        {/* Main headline — typewriter effect */}
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-valentine-dark leading-tight tracking-wide mb-6 min-h-[3.5em]">
          {isVisible && (
            <>
              <Typewriter
                text="Welcome to Your World,"
                delay={600}
                speed={65}
                onDone={() => setLine1Done(true)}
              />
              {line1Done && <br />}
              {line1Done && (
                <Typewriter
                  text="My Queen Jor."
                  delay={200}
                  speed={75}
                  className="font-medium italic"
                  onDone={() => setLine2Done(true)}
                />
              )}
            </>
          )}
        </h1>

        {/* Subheadline — fades in after typewriter finishes */}
        <p
          className={`text-warm-gray text-base sm:text-lg font-light tracking-wide transition-all duration-1000 ${
            line2Done
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          Built with love… and a little{' '}
          <span className="text-valentine-light font-normal">back-end magic</span>.
        </p>

        {/* Subtle scroll indicator */}
        <div
          className={`mt-16 transition-all duration-1000 ${
            line2Done ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex flex-col items-center gap-2 text-valentine-muted/60">
            <span className="text-xs tracking-[0.2em] uppercase font-light">
              Scroll with me
            </span>
            <div className="w-px h-8 bg-linear-to-b from-valentine-muted/40 to-transparent animate-gentle-pulse" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  )
}
