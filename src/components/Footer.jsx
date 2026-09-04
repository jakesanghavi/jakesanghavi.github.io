import { profile, sections } from '../data/content';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-night bg-night-2 text-paper">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10 py-10">
        <div className="tickline opacity-60 mb-8" aria-hidden="true" />
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="font-display text-2xl">{profile.name}</div>
            <div className="label mt-1">{profile.role} · {profile.location}</div>
          </div>
          <div className="text-left md:text-right">
            <div className="u-mono text-xs text-blue-soft">{profile.coordinates}</div>
            <div className="label label--faint mt-1">
              № {sections.length} sections · Observation log · © {year}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
