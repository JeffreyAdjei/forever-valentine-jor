import { createContext, useCallback, useContext, useMemo, useRef, useState } from 'react'
import type { ReactNode, RefObject } from 'react'

interface GlobalAudioContextValue {
  play: (src: string) => void
  pause: () => void
  toggle: (src: string) => void
  seek: (time: number) => void
  audioRef: RefObject<HTMLAudioElement | null>
  currentSrc: string | null
  isPlaying: boolean
}

const GlobalAudioContext = createContext<GlobalAudioContextValue | null>(null)

export function useGlobalAudio() {
  const ctx = useContext(GlobalAudioContext)
  if (!ctx) throw new Error('useGlobalAudio must be used within GlobalAudioProvider')
  return ctx
}

export function GlobalAudioProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [currentSrc, setCurrentSrc] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const srcRef = useRef<string | null>(null)
  // Suppress spurious pause events during source changes
  const changingRef = useRef(false)

  const play = useCallback((src: string) => {
    const audio = audioRef.current
    if (!audio) return
    if (srcRef.current !== src) {
      changingRef.current = true
      audio.src = src
      srcRef.current = src
      setCurrentSrc(src)
    } else if (audio.ended) {
      audio.currentTime = 0
    }
    audio.play().then(() => {
      changingRef.current = false
    }).catch(() => {
      changingRef.current = false
    })
  }, [])

  const pause = useCallback(() => {
    audioRef.current?.pause()
  }, [])

  const toggle = useCallback((src: string) => {
    const audio = audioRef.current
    if (!audio) return
    if (srcRef.current === src && !audio.paused && !audio.ended) {
      audio.pause()
    } else {
      play(src)
    }
  }, [play])

  const seek = useCallback((time: number) => {
    const audio = audioRef.current
    if (audio) audio.currentTime = time
  }, [])

  const value = useMemo<GlobalAudioContextValue>(() => ({
    play, pause, toggle, seek, audioRef, currentSrc, isPlaying,
  }), [play, pause, toggle, seek, currentSrc, isPlaying])

  return (
    <GlobalAudioContext.Provider value={value}>
      {/* Hidden audio element — outside ALL transforms/filters for iOS Safari stability */}
      <div style={{ position: 'fixed', left: '-9999px', bottom: '-9999px', pointerEvents: 'none' }}>
        <audio
          ref={audioRef}
          playsInline
          preload="metadata"
          onPlay={() => setIsPlaying(true)}
          onPause={() => { if (!changingRef.current) setIsPlaying(false) }}
          onEnded={() => setIsPlaying(false)}
        />
      </div>
      {children}
    </GlobalAudioContext.Provider>
  )
}
