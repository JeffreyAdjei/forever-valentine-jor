import { useEffect, useState } from 'react'
import { useInView } from './useInView'
import { useGlobalAudio } from './GlobalAudioPlayer'

interface Song {
  title: string
  caption: string
  src: string
}

const songs: Song[] = [
  {
    title: 'Still Here, Jor',
    caption: 'Written from my heart.',
    src: '/audio/still-here-jor.mp3',
  },
  {
    title: 'The Way I See You, Jor',
    caption: 'Wrote this trying to put you into words.',
    src: '/audio/the-way-i-see-you-jor.mp3',
  },
]

function formatTime(t: number) {
  if (!t || !isFinite(t)) return '0:00'
  const m = Math.floor(t / 60)
  const s = Math.floor(t % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

function SongPlayer({ src }: { src: string }) {
  const { toggle, seek, audioRef, currentSrc, isPlaying } = useGlobalAudio()
  const [time, setTime] = useState(0)
  const [dur, setDur] = useState(0)

  const active = currentSrc === src
  const playing = active && isPlaying

  useEffect(() => {
    const audio = audioRef.current
    if (!audio || !active) {
      setTime(0)
      setDur(0)
      return
    }

    // Sync current state
    setTime(audio.currentTime)
    if (isFinite(audio.duration)) setDur(audio.duration)

    const onTime = () => setTime(audio.currentTime)
    const onMeta = () => { if (isFinite(audio.duration)) setDur(audio.duration) }

    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onMeta)
    audio.addEventListener('durationchange', onMeta)

    return () => {
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onMeta)
      audio.removeEventListener('durationchange', onMeta)
    }
  }, [audioRef, active])

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!active || !dur) {
      toggle(src)
      return
    }
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width))
    seek(ratio * dur)
  }

  const pct = dur > 0 ? (time / dur) * 100 : 0

  return (
    <div
      className="flex items-center gap-2.5 h-10 px-3 rounded-lg"
      style={{ background: 'linear-gradient(to right, var(--color-cream), var(--color-blush))' }}
    >
      {/* Play / Pause */}
      <button
        onClick={() => toggle(src)}
        className="w-7 h-7 rounded-full bg-valentine/15 flex items-center justify-center flex-shrink-0 cursor-pointer hover:bg-valentine/25 transition-colors"
        aria-label={playing ? 'Pause' : 'Play'}
      >
        {playing ? (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-valentine-dark">
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        ) : (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-valentine-dark ml-0.5">
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
      </button>

      {/* Elapsed time */}
      <span className="text-[10px] font-mono text-valentine-dark/60 w-8 text-center flex-shrink-0">
        {formatTime(time)}
      </span>

      {/* Seekable progress bar — padded for larger touch target */}
      <div className="flex-1 py-2 cursor-pointer" onClick={handleSeek}>
        <div className="h-1.5 bg-valentine-dark/10 rounded-full relative overflow-hidden">
          <div
            className="h-full bg-valentine/60 rounded-full"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Duration */}
      <span className="text-[10px] font-mono text-valentine-dark/60 w-8 text-center flex-shrink-0">
        {formatTime(dur)}
      </span>
    </div>
  )
}

function SongCard({ song, index }: { song: Song; index: number }) {
  const { ref, isVisible } = useInView(0.2)

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <div className="glass-panel rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-500">
        {/* Song number pill */}
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-8 rounded-full bg-valentine/10 flex items-center justify-center text-valentine text-sm font-medium">
            {index + 1}
          </span>
          <div className="h-px flex-1 bg-linear-to-r from-valentine-muted/30 to-transparent" />
        </div>

        {/* Title */}
        <h3 className="font-serif text-2xl sm:text-3xl font-medium text-valentine-dark mb-2 italic">
          {song.title}
        </h3>

        {/* Caption */}
        <p className="text-warm-gray text-sm font-light mb-6 tracking-wide">
          {song.caption}
        </p>

        {/* Custom audio player (no <audio> element here — uses global player) */}
        <SongPlayer src={song.src} />

        {/* Download button */}
        <a
          href={song.src}
          download={`${song.title}.mp3`}
          className="inline-block mt-4 px-4 py-2 text-sm font-light tracking-wider text-valentine-dark/70 border border-valentine-muted/40 rounded-xl hover:bg-valentine-muted/10 transition-all duration-300"
        >
          Download
        </a>
      </div>
    </div>
  )
}

export default function Songs() {
  const { ref, isVisible } = useInView(0.1)

  return (
    <section className="relative py-24 sm:py-32 px-4">
      <div ref={ref} className="relative z-10 max-w-2xl mx-auto">
        {/* Section title */}
        <div
          className={`text-center mb-12 sm:mb-16 transition-all duration-700 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }`}
        >
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-12 bg-valentine-muted/40" />
            <svg
              width="16"
              height="15"
              viewBox="0 0 28 26"
              fill="none"
              className="text-valentine-muted"
            >
              <path
                d="M14 25.5C14 25.5 0.5 17.5 0.5 8.5C0.5 4.36 3.86 1 8 1C10.76 1 13.15 2.54 14 4.83C14.85 2.54 17.24 1 20 1C24.14 1 27.5 4.36 27.5 8.5C27.5 17.5 14 25.5 14 25.5Z"
                fill="currentColor"
              />
            </svg>
            <div className="h-px w-12 bg-valentine-muted/40" />
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-valentine-dark tracking-wide">
            I Made These For You.
          </h2>
        </div>

        {/* Song cards */}
        <div className="space-y-6 sm:space-y-8">
          {songs.map((song, index) => (
            <SongCard key={song.src} song={song} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
