import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface ThemeToggleProps {
  variant?: 'icon' | 'labeled';
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  variant = 'icon',
  className = '',
}) => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  const isDark = theme === 'dark';
  const label = isDark ? t.nav.lightMode : t.nav.darkMode;

  if (variant === 'labeled') {
    return (
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={label}
        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border text-xs font-semibold transition-all cursor-pointer ${
          isDark
            ? 'bg-slate-800 border-slate-700 text-amber-300 hover:bg-slate-750'
            : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200/70'
        } ${className}`}
      >
        <span className="flex items-center gap-2">
          {isDark ? (
            <Sun className="w-4 h-4 text-amber-400 shrink-0" />
          ) : (
            <Moon className="w-4 h-4 text-slate-600 shrink-0" />
          )}
          <span className="text-slate-800 dark:text-slate-200">{label}</span>
        </span>
        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-200/80 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
          {isDark ? 'Dark' : 'Light'}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={`relative p-2 rounded-lg border transition-all cursor-pointer flex items-center justify-center shrink-0 ${
        isDark
          ? 'bg-slate-800/90 border-slate-700 text-amber-400 hover:bg-slate-700 hover:text-amber-300 hover:border-slate-600 shadow-xs'
          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 hover:border-slate-300 shadow-xs'
      } ${className}`}
    >
      <span className="sr-only">{label}</span>
      {isDark ? (
        <Sun className="w-4 h-4 transition-transform duration-300 rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 transition-transform duration-300 rotate-0 hover:-rotate-12 text-slate-600" />
      )}
    </button>
  );
};
