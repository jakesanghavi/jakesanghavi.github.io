export default function OrbitalMark({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <ellipse
        cx="24"
        cy="24"
        rx="18"
        ry="10"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        transform="rotate(-28 24 24)"
        opacity="0.85"
      />
      <path
        d="M8 34 C 16 8, 34 8, 42 28"
        fill="none"
        stroke="var(--gold)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="31" cy="16" r="2.4" fill="var(--gold)" />
    </svg>
  );
}
