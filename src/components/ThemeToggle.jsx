import { useTheme } from '../context/ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="11" fill="none" stroke="currentColor" strokeOpacity="0.35" />
        {Array.from({ length: 8 }).map((_, i) => {
          const a = (i / 8) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={16 + Math.cos(a) * 7}
              y1={16 + Math.sin(a) * 7}
              x2={16 + Math.cos(a) * 13}
              y2={16 + Math.sin(a) * 13}
              stroke="var(--gold)"
              strokeOpacity={isDark ? 0.2 : 0.55}
              strokeWidth="1"
            />
          );
        })}
        <circle cx="16" cy="16" r="6.5" fill={isDark ? '#0c1020' : '#efe8db'} stroke="var(--gold)" />
        <circle
          cx={isDark ? 20.5 : 12.2}
          cy="16"
          r="6.5"
          fill={isDark ? '#070910' : '#d4b06a'}
          opacity={isDark ? 1 : 0.85}
        />
      </svg>
    </button>
  );
}
