import { profile } from '../data/content';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="on-dark bg-night text-paper">
      <div className="max-w-[1500px] mx-auto px-6 md:px-14 py-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <span className="display text-xl">{profile.name}</span>
        <span className="eyebrow">
          {profile.role} — © {year}
        </span>
      </div>
    </footer>
  );
}
