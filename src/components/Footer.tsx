import { useInView } from './useInView'

export default function Footer() {
  const { ref, isVisible } = useInView(0.2)

  return (
    <section
      ref={ref}
      className="relative py-32 sm:py-40 px-4"
    >
      {/* Soft gradient from cream to subtle warmth */}
      <div className="absolute inset-0 bg-linear-to-b from-cream via-cream to-blush/20" />

      <div
        className={`relative z-10 text-center max-w-xl mx-auto transition-all duration-1000 ${
          isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Decorative heart */}
        <div className="mb-10">
          <svg
            width="20"
            height="18"
            viewBox="0 0 28 26"
            fill="none"
            className="text-valentine-muted mx-auto animate-gentle-pulse"
          >
            <path
              d="M14 25.5C14 25.5 0.5 17.5 0.5 8.5C0.5 4.36 3.86 1 8 1C10.76 1 13.15 2.54 14 4.83C14.85 2.54 17.24 1 20 1C24.14 1 27.5 4.36 27.5 8.5C27.5 17.5 14 25.5 14 25.5Z"
              fill="currentColor"
            />
          </svg>
        </div>

        {/* First line */}
        <p className="font-serif text-xl sm:text-2xl md:text-3xl font-light text-valentine-dark/70 italic leading-relaxed mb-4">
          I will always be patient and gentle with you.
        </p>

        {/* Spacer */}
        <div className="my-8 flex justify-center">
          <div className="w-12 h-px bg-valentine-muted/30" />
        </div>

        {/* Closing line */}
        <p
          className={`font-serif text-2xl sm:text-3xl md:text-4xl font-medium text-valentine-dark tracking-wide transition-all duration-1000 delay-300 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          &ldquo;Not just what it&rsquo;s meant to be, but how it&rsquo;s meant to be&hellip;&rdquo;
        </p>

        {/* Signature */}
        <div
          className={`mt-12 transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p
            className="text-valentine-dark/70 text-3xl sm:text-4xl"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            Sweet One
          </p>
        </div>

        {/* Blessing text */}
        <div
          className={`mt-16 transition-all duration-1000 delay-900 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p className="font-serif text-lg sm:text-xl font-semibold italic text-valentine-dark/80 leading-relaxed">
            Whenever it feels right,
            <br />
            It will be a blessing to have you as my friend.
          </p>
        </div>

        {/* I SEE YOU AND I UNDERSTAND. */}
        <div
          className={`mt-20 transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p className="text-valentine-dark/70 text-xs tracking-[0.25em] uppercase font-light">
            I SEE YOU AND I UNDERSTAND.
          </p>
        </div>

        {/* Closing verse */}
        <div
          className={`mt-24 transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="my-6 flex justify-center">
            <div className="w-8 h-px bg-valentine-muted/20" />
          </div>
          <p className="font-serif text-sm sm:text-base text-valentine-dark/40 font-light italic leading-relaxed">
            &ldquo;Trust in the Lord with all your heart and lean not on your own understanding; in all your ways acknowledge Him, and He shall direct your paths.&rdquo;
          </p>
          <p className="mt-2 text-valentine-dark/30 text-xs tracking-wide font-light">
            — Proverbs 3:5–6
          </p>
        </div>
      </div>
    </section>
  )
}
