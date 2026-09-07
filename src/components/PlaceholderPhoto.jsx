const VARIANTS = {
  pillars: Pillars,
  spiral: Spiral,
  totality: Totality,
  diamond: DiamondRing,
  nebula: Nebula,
  corona: Corona,
};

export default function PlaceholderPhoto({ variant, title }) {
  const Scene = VARIANTS[variant] || Nebula;
  return (
    <div className="gallery-frame">
      <span className="placeholder-badge">Placeholder</span>
      <svg viewBox="0 0 400 500" className="h-full w-full" role="img" aria-label={`${title} placeholder`}>
        <Scene />
      </svg>
    </div>
  );
}

function Pillars() {
  return (
    <>
      <rect width="400" height="500" fill="#120c18" />
      <defs>
        <linearGradient id="ph-p" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#3a1830" />
          <stop offset="55%" stopColor="#c45b8c" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#d4b06a" stopOpacity="0.55" />
        </linearGradient>
        <filter id="ph-b">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>
      <g filter="url(#ph-b)">
        <path d="M70 520 C90 280 40 180 110 10 L170 10 C120 200 160 320 140 520Z" fill="url(#ph-p)" />
        <path d="M160 520 C200 300 130 160 210 -10 L270 -10 C200 170 250 330 230 520Z" fill="url(#ph-p)" opacity="0.8" />
        <path d="M250 520 C300 290 240 150 320 20 L370 20 C300 180 350 340 320 520Z" fill="url(#ph-p)" opacity="0.65" />
      </g>
    </>
  );
}

function Spiral() {
  const d = buildArm();
  return (
    <>
      <rect width="400" height="500" fill="#0b1324" />
      <circle cx="200" cy="250" r="18" fill="#e7d7a8" opacity="0.8" />
      <path d={d} fill="none" stroke="#4db6b0" strokeWidth="2.2" opacity="0.8" />
      <path d={d} fill="none" stroke="#c45b8c" strokeWidth="1.2" opacity="0.45" transform="rotate(120 200 250)" />
      <path d={d} fill="none" stroke="#d4b06a" strokeWidth="1" opacity="0.4" transform="rotate(240 200 250)" />
    </>
  );
}

function Totality() {
  return (
    <>
      <rect width="400" height="500" fill="#070910" />
      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i / 24) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={200 + Math.cos(a) * 70}
            y1={250 + Math.sin(a) * 70}
            x2={200 + Math.cos(a) * 170}
            y2={250 + Math.sin(a) * 170}
            stroke="#d4b06a"
            strokeOpacity="0.28"
          />
        );
      })}
      <circle cx="200" cy="250" r="108" fill="#d4b06a" opacity="0.12" />
      <circle cx="200" cy="250" r="62" fill="#0a0d16" stroke="#e7d7a8" strokeWidth="1" />
    </>
  );
}

function DiamondRing() {
  return (
    <>
      <rect width="400" height="500" fill="#101018" />
      <circle cx="200" cy="250" r="70" fill="#0c0c12" stroke="#c9b48a" strokeWidth="6" />
      <circle cx="258" cy="198" r="8" fill="#fff4d2" />
      <circle cx="258" cy="198" r="18" fill="#d4b06a" opacity="0.35" />
    </>
  );
}

function Nebula() {
  return (
    <>
      <rect width="400" height="500" fill="#14101f" />
      <defs>
        <radialGradient id="ph-n1" cx="40%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#4db6b0" stopOpacity="0.55" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="ph-n2" cx="70%" cy="60%" r="45%">
          <stop offset="0%" stopColor="#c45b8c" stopOpacity="0.5" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <circle cx="170" cy="220" r="160" fill="url(#ph-n1)" />
      <circle cx="260" cy="300" r="150" fill="url(#ph-n2)" />
    </>
  );
}

function Corona() {
  return (
    <>
      <rect width="400" height="500" fill="#0a0c12" />
      <circle cx="200" cy="250" r="150" fill="#d4b06a" opacity="0.08" />
      <circle cx="200" cy="250" r="96" fill="#c47a4a" opacity="0.12" />
      <circle cx="200" cy="250" r="48" fill="#0a0c12" />
      <path d="M200 80 C 230 180, 250 200, 200 250 C 150 200, 170 180, 200 80" fill="#e7d7a8" opacity="0.2" />
    </>
  );
}

function buildArm() {
  let d = '';
  for (let i = 0; i < 120; i += 1) {
    const t = i / 120;
    const theta = t * 5.2;
    const r = 12 * Math.exp(0.38 * theta);
    const x = 200 + r * Math.cos(theta);
    const y = 250 + r * Math.sin(theta) * 0.78;
    d += `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)} `;
  }
  return d;
}
