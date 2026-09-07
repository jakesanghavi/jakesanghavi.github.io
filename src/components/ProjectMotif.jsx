import IsolineField from './IsolineField';

export default function ProjectMotif({ motif }) {
  if (motif === 'orbit') {
    return (
      <svg viewBox="0 0 360 220" className="absolute inset-0 h-full w-full">
        <ellipse cx="180" cy="110" rx="130" ry="48" fill="none" stroke="var(--teal)" strokeOpacity="0.45" transform="rotate(-18 180 110)" />
        <ellipse cx="180" cy="110" rx="90" ry="30" fill="none" stroke="var(--gold)" strokeOpacity="0.4" transform="rotate(12 180 110)" />
        <circle cx="292" cy="78" r="5" fill="var(--gold)" />
      </svg>
    );
  }

  if (motif === 'arc') {
    return (
      <svg viewBox="0 0 360 220" className="absolute inset-0 h-full w-full">
        <path d="M30 180 C 90 40, 240 30, 330 130" fill="none" stroke="var(--copper)" strokeWidth="2" />
        <path d="M40 40 H 320 M40 40 V 180" stroke="var(--ink)" strokeOpacity="0.2" />
        <circle cx="330" cy="130" r="5" fill="var(--gold)" />
      </svg>
    );
  }

  return (
    <div className="absolute inset-0 text-[var(--violet)]">
      <IsolineField opacity={0.85} />
    </div>
  );
}
