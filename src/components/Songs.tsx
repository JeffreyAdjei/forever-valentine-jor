import { useInView } from './useInView'

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

        {/* Audio player */}
        <audio
          controls
          preload="metadata"
          className="w-full h-10 rounded-lg"
          style={{ filter: 'hue-rotate(-10deg) saturate(0.7)' }}
        >
          <source src={song.src} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

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
            <SongCard key={index} song={song} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
