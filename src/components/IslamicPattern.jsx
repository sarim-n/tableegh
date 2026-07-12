export default function IslamicPattern({ className = "", opacity = 0.06 }) {
  return (
    <svg
      className={`pointer-events-none select-none ${className}`}
      style={{ opacity }}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <pattern
          id="islamic-geo"
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          {/* 8-pointed star pattern */}
          <path
            d="M20 0 L24 8 L32 4 L28 12 L36 16 L28 20 L32 28 L24 24 L20 32 L16 24 L8 28 L12 20 L4 16 L12 12 L8 4 L16 8 Z"
            fill="currentColor"
            fillOpacity="0.4"
          />
          <circle cx="20" cy="16" r="4" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.3" />
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#islamic-geo)" />
    </svg>
  );
}
