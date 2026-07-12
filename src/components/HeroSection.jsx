import IslamicPattern from "./IslamicPattern";

export default function HeroSection({ title, subtitle, ctaText, ctaHref }) {
  return (
    <section className="relative overflow-hidden gradient-hero py-24 sm:py-32 lg:py-40">
      {/* Background pattern */}
      <div className="absolute inset-0 text-white">
        <IslamicPattern className="h-full w-full" opacity={0.05} />
      </div>

      {/* Decorative circles */}
      <div className="absolute -top-24 -end-24 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="absolute -bottom-24 -start-24 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        {/* Bismillah */}
        <p className="mb-6 text-lg text-emerald-200/80 animate-fade-in" style={{ fontFamily: "serif" }}>
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl animate-fade-in-up">
          {title}
        </h1>

        {subtitle && (
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-emerald-100/90 animate-fade-in-up stagger-2">
            {subtitle}
          </p>
        )}

        {ctaText && (
          <div className="mt-10 animate-fade-in-up stagger-3">
            <a
              href={ctaHref || "#"}
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-emerald-800 shadow-lg transition-all duration-300 hover:bg-ivory hover:shadow-xl hover:scale-105"
            >
              {ctaText}
              <svg className="h-4 w-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
