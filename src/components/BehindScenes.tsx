import { useRef, useState } from 'react'
import { useInView } from './useInView'

export default function BehindScenes() {
  const { ref, isVisible } = useInView(0.15)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [paused, setPaused] = useState(false)

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play()
      setPaused(false)
    } else {
      v.pause()
      setPaused(true)
    }
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    const v = videoRef.current
    if (v) v.muted = !v.muted
  }

  return (
    <section className="relative py-24 sm:py-32 px-4">
      <div ref={ref} className="relative z-10 max-w-md mx-auto">
        {/* Section title */}
        <div
          className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-valentine-muted/40" />
            <span className="text-valentine-muted text-sm tracking-[0.3em] uppercase font-light">
              iii
            </span>
            <div className="h-px w-12 bg-valentine-muted/40" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-valentine-dark tracking-wide mb-4">
            Us
          </h2>

          <p className="font-serif text-base sm:text-lg text-valentine-dark/60 font-light italic leading-relaxed">
            Little moments I kept — I just love spending time with you.
          </p>
        </div>

        {/* Portrait video */}
        <div
          className={`transition-all duration-700 delay-200 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }`}
        >
          <div
            className="rounded-2xl overflow-hidden shadow-md mx-auto group relative cursor-pointer"
            style={{ maxWidth: '320px' }}
            onClick={togglePlay}
          >
            <div
              className="relative bg-linear-to-br from-valentine/6 to-blush/40"
              style={{ aspectRatio: '9 / 16' }}
            >
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
              >
                <source src="/videos/jorvideo.mp4" type="video/mp4" />
              </video>

              {/* Centered glass play/pause button — visible on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-16 h-16 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center shadow-lg">
                  {paused ? (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  ) : (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                  )}
                </div>
              </div>

              {/* Small mute button — bottom right corner on hover */}
              <button
                className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-black/30 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                aria-label="Mute / Unmute"
                onClick={toggleMute}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                  <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3A4.5 4.5 0 0 0 14 8.5v7a4.49 4.49 0 0 0 2.5-3.5zM14 3.23v2.06a6.51 6.51 0 0 1 0 13.42v2.06A8.51 8.51 0 0 0 14 3.23z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Bible verse */}
        <div
          className={`glass-panel rounded-2xl p-6 sm:p-8 shadow-sm mt-10 transition-all duration-700 delay-400 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-center font-serif text-xl sm:text-2xl text-valentine-dark/80 font-light italic leading-relaxed">
            1 Corinthians 13:4–7
          </p>
        </div>
      </div>
    </section>
  )
}
