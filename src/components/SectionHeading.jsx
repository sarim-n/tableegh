export default function SectionHeading({ title, subtitle, light = false, center = true }) {
  return (
    <div className={`mb-12 ${center ? "text-center" : ""}`}>
      <h2
        className={`text-3xl font-bold tracking-tight sm:text-4xl ${
          light ? "text-white" : "text-charcoal"
        }`}
      >
        {title}
      </h2>
      {/* Decorative underline */}
      <div className={`mt-4 flex items-center gap-2 ${center ? "justify-center" : ""}`}>
        <span className="block h-1 w-8 rounded-full bg-gold-500" />
        <span className="block h-1 w-16 rounded-full bg-emerald-600" />
        <span className="block h-1 w-8 rounded-full bg-gold-500" />
      </div>
      {subtitle && (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            light ? "text-emerald-100" : "text-stone-500"
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
