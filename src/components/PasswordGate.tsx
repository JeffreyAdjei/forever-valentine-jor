import { useState } from 'react'

interface PasswordGateProps {
  onUnlock: () => void
}

export default function PasswordGate({ onUnlock }: PasswordGateProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [shaking, setShaking] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === '030604') {
      onUnlock()
    } else {
      setError(true)
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-linear-to-br from-valentine-dark via-valentine to-valentine-light">
      {/* Subtle floating hearts in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white/6 animate-soft-float"
            style={{
              fontSize: `${40 + i * 20}px`,
              left: `${10 + i * 15}%`,
              top: `${15 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${5 + i}s`,
            }}
          >
            ♥
          </div>
        ))}
      </div>

      <div
        className={`relative w-full max-w-sm mx-4 p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl ${
          shaking ? 'animate-[shake_0.5s_ease-in-out]' : ''
        }`}
        style={{
          animation: shaking
            ? 'shake 0.5s ease-in-out'
            : undefined,
        }}
      >
        {/* Heart icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-white/15 flex items-center justify-center animate-gentle-pulse">
            <svg
              width="28"
              height="26"
              viewBox="0 0 28 26"
              fill="none"
              className="text-white"
            >
              <path
                d="M14 25.5C14 25.5 0.5 17.5 0.5 8.5C0.5 4.36 3.86 1 8 1C10.76 1 13.15 2.54 14 4.83C14.85 2.54 17.24 1 20 1C24.14 1 27.5 4.36 27.5 8.5C27.5 17.5 14 25.5 14 25.5Z"
                fill="currentColor"
                fillOpacity="0.9"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-center font-serif text-2xl font-light text-white mb-2 tracking-wide">
          Our Time Capsule
        </h1>
        <p className="text-center text-white/60 text-sm mb-8 font-light">
          For your eyes only.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setError(false)
              }}
              placeholder="Enter the password"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 text-center text-lg tracking-[0.3em] focus:outline-none focus:border-white/40 focus:bg-white/15 transition-all duration-300"
              autoFocus
            />
          </div>

          {error && (
            <p className="text-center text-white/70 text-sm font-light animate-fade-in">
              That's not it, my love. Try again.
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-white/20 hover:bg-white/30 border border-white/25 rounded-xl text-white font-light tracking-wider transition-all duration-300 hover:shadow-lg cursor-pointer"
          >
            Open
          </button>
        </form>

      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
          20%, 40%, 60%, 80% { transform: translateX(4px); }
        }
      `}</style>
    </div>
  )
}
