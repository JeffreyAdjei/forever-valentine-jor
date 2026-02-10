interface PhotoConfig {
  src: string
  width: number
  top: string
  left: string
  rotate: number
  opacity: number
  hasTape: boolean
  hideOnMobile: boolean
}

const photos: PhotoConfig[] = [
  // ── Row 1: Top band ──
  {
    src: '/photos/jor1.JPG',
    width: 220,
    top: '2%',
    left: '2%',
    rotate: -6,
    opacity: 0.85,
    hasTape: true,
    hideOnMobile: false,
  },
  {
    src: '/photos/jor2.JPG',
    width: 180,
    top: '1%',
    left: '38%',
    rotate: 4,
    opacity: 0.8,
    hasTape: false,
    hideOnMobile: true,
  },
  {
    src: '/photos/jor3.JPG',
    width: 200,
    top: '3%',
    left: '74%',
    rotate: -8,
    opacity: 0.85,
    hasTape: true,
    hideOnMobile: false,
  },

  // ── Row 2: Upper-mid band ──
  {
    src: '/photos/jor4.JPG',
    width: 190,
    top: '28%',
    left: '8%',
    rotate: 7,
    opacity: 0.8,
    hasTape: false,
    hideOnMobile: false,
  },
  {
    src: '/photos/jor5.JPG',
    width: 240,
    top: '30%',
    left: '58%',
    rotate: -5,
    opacity: 0.85,
    hasTape: true,
    hideOnMobile: true,
  },

  // ── Row 3: Center band ──
  {
    src: '/photos/jor6.JPG',
    width: 210,
    top: '50%',
    left: '42%',
    rotate: -4,
    opacity: 0.8,
    hasTape: false,
    hideOnMobile: false,
  },
  {
    src: '/photos/jor7.JPG',
    width: 170,
    top: '52%',
    left: '3%',
    rotate: -9,
    opacity: 0.85,
    hasTape: true,
    hideOnMobile: true,
  },

  // ── Row 4: Lower band ──
  {
    src: '/photos/jor8.JPG',
    width: 230,
    top: '72%',
    left: '30%',
    rotate: 5,
    opacity: 0.8,
    hasTape: true,
    hideOnMobile: false,
  },
  {
    src: '/photos/jor9.JPG',
    width: 185,
    top: '75%',
    left: '72%',
    rotate: -7,
    opacity: 0.85,
    hasTape: false,
    hideOnMobile: true,
  },
  {
    src: '/photos/jor10.JPG',
    width: 200,
    top: '78%',
    left: '0%',
    rotate: 8,
    opacity: 0.8,
    hasTape: true,
    hideOnMobile: false,
  },
]

export default function CollageLayer() {
  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      {photos.map((photo, index) => (
        <div
          key={index}
          className={`absolute ${
            photo.hideOnMobile ? 'hidden md:block' : ''
          } ${photo.hasTape ? 'tape-effect' : ''}`}
          style={{
            width: `${photo.width}px`,
            top: photo.top,
            left: photo.left,
            transform: `rotate(${photo.rotate}deg)`,
            opacity: photo.opacity,
          }}
        >
          <div className="relative rounded-lg overflow-hidden shadow-2xl bg-white p-2.5">
            <img
              src={photo.src}
              alt=""
              className="w-full h-auto rounded-md object-cover"
              loading="lazy"
              onError={(e) => {
                const target = e.currentTarget
                target.style.display = 'none'
                const parent = target.parentElement
                if (parent) {
                  parent.innerHTML = `
                    <div class="w-full aspect-[3/4] rounded-md bg-linear-to-br from-blush to-valentine-muted flex items-center justify-center">
                      <span class="text-white/40 text-2xl">♥</span>
                    </div>
                  `
                }
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
