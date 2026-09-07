import IsolineField from './IsolineField';

export default function HeroStage() {
  return (
    <div className="hero-stage" aria-hidden="true">
      <div className="absolute inset-0 text-[var(--ink)] opacity-40 ambient-drift-slow">
        <IsolineField className="h-full w-full" opacity={0.9} />
      </div>
      <svg viewBox="0 0 520 500" className="relative">
        <defs>
          <radialGradient id="corona" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="var(--gold)" stopOpacity="0.0" />
            <stop offset="52%" stopColor="var(--gold)" stopOpacity="0.0" />
            <stop offset="62%" stopColor="var(--gold)" stopOpacity="0.35" />
            <stop offset="100%" stopColor="var(--magenta)" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="disk" cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="var(--bg-elevated)" />
            <stop offset="70%" stopColor="var(--bg-deep)" />
            <stop offset="100%" stopColor="var(--bg-deep)" />
          </radialGradient>
        </defs>

        <g className="ambient-spin" opacity="0.55">
          {SPIRAL_ARMS.map((d, i) => (
            <path
              key={i}
              d={d}
              fill="none"
              stroke="var(--teal)"
              strokeWidth={i === 0 ? 1.6 : 1.1}
              strokeOpacity={0.45 - i * 0.08}
            />
          ))}
        </g>

        <g transform="translate(268 228)">
          {Array.from({ length: 18 }).map((_, i) => {
            const a = (i / 18) * Math.PI * 2;
            return (
              <line
                key={i}
                x1={Math.cos(a) * 62}
                y1={Math.sin(a) * 62}
                x2={Math.cos(a) * 118}
                y2={Math.sin(a) * 118}
                stroke="var(--gold)"
                strokeOpacity="0.22"
                strokeWidth="0.8"
              />
            );
          })}
          <circle r="92" fill="url(#corona)" />
          <circle r="54" fill="url(#disk)" stroke="var(--gold)" strokeOpacity="0.35" />
          <circle cx="38" cy="-40" r="3.2" fill="var(--gold)" />
        </g>

        <path
          className="draw-path"
          pathLength="1"
          d="M 36 390 C 140 90, 360 70, 498 250"
          fill="none"
          stroke="var(--copper)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <circle cx="36" cy="390" r="4" fill="var(--copper)" />
        <circle cx="498" cy="250" r="4.5" fill="var(--gold)" />

        <g opacity="0.35" stroke="var(--ink)" fill="none">
          <rect x="28" y="28" width="150" height="90" rx="4" />
          <line x1="28" y1="58" x2="178" y2="58" />
          <line x1="78" y1="28" x2="78" y2="118" />
          <circle cx="153" cy="88" r="18" />
        </g>
      </svg>
    </div>
  );
}

function buildSpiralArms() {
  const arms = [];
  for (let arm = 0; arm < 3; arm += 1) {
    const offset = (arm * Math.PI * 2) / 3;
    let d = '';
    for (let i = 0; i < 140; i += 1) {
      const t = i / 140;
      const theta = offset + t * 4.4;
      const r = 18 * Math.exp(0.32 * theta);
      const x = 268 + r * Math.cos(theta);
      const y = 228 + r * Math.sin(theta) * 0.72;
      d += `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)} `;
    }
    arms.push(d);
  }
  return arms;
}

const SPIRAL_ARMS = buildSpiralArms();
