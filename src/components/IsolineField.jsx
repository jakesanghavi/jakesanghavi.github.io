export default function IsolineField({ className = 'h-full w-full', opacity = 0.42 }) {
  const paths = PATHS;

  return (
    <svg
      className={className}
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g fill="none" stroke="currentColor" strokeWidth="0.8" opacity={opacity}>
        {paths.map((d, i) => (
          <path
            key={i}
            d={d}
            strokeOpacity={0.18 + (i / paths.length) * 0.45}
          />
        ))}
      </g>
    </svg>
  );
}

function buildIsolines() {
  const cx = 640;
  const cy = 340;
  const levels = 14;
  const paths = [];

  for (let i = 1; i <= levels; i += 1) {
    const t = i / levels;
    const rx = 70 + t * 520;
    const ry = 48 + t * 310;
    const n = 80;
    let d = '';
    for (let p = 0; p <= n; p += 1) {
      const a = (p / n) * Math.PI * 2;
      const wobble =
        1 +
        0.07 * Math.sin(3 * a + i * 0.45) +
        0.045 * Math.sin(5 * a - i * 0.7) +
        0.03 * Math.sin(2 * a + t * 6);
      const x = cx + rx * Math.cos(a) * wobble;
      const y = cy + ry * Math.sin(a) * wobble * 0.82;
      d += `${p === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)} `;
    }
    paths.push(`${d}Z`);
  }

  return paths;
}

const PATHS = buildIsolines();
