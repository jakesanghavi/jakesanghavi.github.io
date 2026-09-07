export default function Atmosphere() {
  return (
    <div className="atmosphere" aria-hidden="true">
      <svg className="atmosphere__pillars ambient-drift" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="pillar-a" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="35%" stopColor="var(--magenta)" stopOpacity="0.22" />
            <stop offset="100%" stopColor="var(--gold)" stopOpacity="0.08" />
          </linearGradient>
          <linearGradient id="pillar-b" x1="0" y1="1" x2="0.2" y2="0">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="40%" stopColor="var(--violet)" stopOpacity="0.2" />
            <stop offset="100%" stopColor="var(--teal)" stopOpacity="0.1" />
          </linearGradient>
          <filter id="pillar-blur">
            <feGaussianBlur stdDeviation="28" />
          </filter>
        </defs>
        <g filter="url(#pillar-blur)">
          <path d="M180 820 C 210 520, 150 360, 230 40 L 310 40 C 250 380, 300 560, 270 820 Z" fill="url(#pillar-a)" />
          <path d="M300 820 C 360 500, 280 300, 390 -20 L 470 -20 C 370 310, 450 540, 400 820 Z" fill="url(#pillar-b)" />
          <path d="M860 820 C 900 540, 820 280, 940 20 L 1005 20 C 910 300, 980 560, 940 820 Z" fill="url(#pillar-a)" opacity="0.7" />
        </g>
      </svg>
      <div className="atmosphere__grain" />
    </div>
  );
}
