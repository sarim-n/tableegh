export default function EventCard({ title, date, endDate, time, location, category, description }) {
  const eventDate = new Date(date);
  const day = eventDate.getDate();
  const month = eventDate.toLocaleDateString("en-US", { month: "short" });
  const year = eventDate.getFullYear();

  const categoryColors = {
    ijtema: "bg-emerald-100 text-emerald-700 border-emerald-200",
    bayan: "bg-blue-100 text-blue-700 border-blue-200",
    mashwara: "bg-amber-100 text-amber-700 border-amber-200",
    gasht: "bg-purple-100 text-purple-700 border-purple-200",
  };

  return (
    <div className="group relative flex overflow-hidden rounded-2xl border border-stone-300/50 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-100">
      {/* Date badge */}
      <div className="flex w-24 shrink-0 flex-col items-center justify-center gradient-emerald p-4 text-white">
        <span className="text-3xl font-bold leading-none">{day}</span>
        <span className="mt-1 text-sm font-medium uppercase tracking-wide">{month}</span>
        <span className="text-xs opacity-80">{year}</span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-2">
          <span
            className={`rounded-full border px-2.5 py-0.5 text-xs font-medium ${
              categoryColors[category] || "bg-stone-100 text-stone-600 border-stone-200"
            }`}
          >
            {category && category.charAt(0).toUpperCase() + category.slice(1)}
          </span>
        </div>

        <h3 className="mb-1.5 text-lg font-semibold text-charcoal transition-colors group-hover:text-emerald-700">
          {title}
        </h3>

        {description && (
          <p className="mb-3 text-sm leading-relaxed text-stone-500 line-clamp-2">
            {description}
          </p>
        )}

        <div className="mt-auto flex flex-wrap items-center gap-4 text-xs text-stone-500">
          {/* Location */}
          <span className="inline-flex items-center gap-1">
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {location}
          </span>
          {/* Time */}
          {time && (
            <span className="inline-flex items-center gap-1">
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {time}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
