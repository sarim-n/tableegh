export default function ContentCard({ title, description, category, date, type, author }) {
  const typeIcons = {
    article: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
      </svg>
    ),
    audio: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
      </svg>
    ),
    video: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    book: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  };

  const typeBadgeColors = {
    article: "bg-blue-100 text-blue-700",
    audio: "bg-purple-100 text-purple-700",
    video: "bg-red-100 text-red-700",
    book: "bg-amber-100 text-amber-700",
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-stone-300/50 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-100">
      {/* Decorative top gradient bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-gold-500" />

      <div className="flex flex-1 flex-col p-6">
        {/* Type badge */}
        <div className="mb-3 flex items-center justify-between">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
              typeBadgeColors[type] || "bg-stone-100 text-stone-600"
            }`}
          >
            {typeIcons[type]}
            {type && type.charAt(0).toUpperCase() + type.slice(1)}
          </span>
          {date && (
            <span className="text-xs text-stone-500">
              {new Date(date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          )}
        </div>

        {/* Content */}
        <h3 className="mb-2 text-lg font-semibold text-charcoal transition-colors group-hover:text-emerald-700">
          {title}
        </h3>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-stone-500">
          {description}
        </p>

        {/* Footer */}
        {author && (
          <div className="mt-auto border-t border-stone-100 pt-3">
            <span className="text-xs font-medium text-emerald-700">{author}</span>
          </div>
        )}
      </div>
    </div>
  );
}
