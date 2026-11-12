import React, { useState, useRef, useEffect } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage, Language } from '../context/LanguageContext';

export interface LanguageOption {
  code: Language;
  label: string;
  nativeLabel: string;
  flag: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', nativeLabel: 'English', flag: '🇬🇧' },
  { code: 'sw', label: 'Swahili', nativeLabel: 'Kiswahili', flag: '🇰🇪' },
  { code: 'fr', label: 'French', nativeLabel: 'Français', flag: '🇫🇷' },
];

interface LanguageSwitcherProps {
  variant?: 'dropdown' | 'segmented';
  className?: string;
  onSelectLanguage?: (lang: Language) => void;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'dropdown',
  className = '',
  onSelectLanguage,
}) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOption = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  const handleSelect = (lang: Language) => {
    setLanguage(lang);
    if (onSelectLanguage) {
      onSelectLanguage(lang);
    }
    setIsOpen(false);
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (variant === 'segmented') {
    return (
      <div className={`flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-lg border border-slate-200/80 dark:border-slate-700 ${className}`}>
        {LANGUAGES.map((item) => {
          const isActive = language === item.code;
          return (
            <button
              key={item.code}
              type="button"
              onClick={() => handleSelect(item.code)}
              className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                isActive
                  ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-xs border border-slate-200 dark:border-slate-600 font-bold'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-700/50'
              }`}
              title={`${item.label} (${item.nativeLabel})`}
              aria-pressed={isActive}
            >
              <span>{item.flag}</span>
              <span>{item.nativeLabel}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Current language: ${currentOption.label}. Select language`}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors shadow-xs hover:border-slate-300 dark:hover:border-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 cursor-pointer"
      >
        <Globe className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400 shrink-0" />
        <span className="text-sm leading-none">{currentOption.flag}</span>
        <span className="uppercase tracking-wider font-bold text-slate-800 dark:text-slate-200">{currentOption.code}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 dark:text-slate-400 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-emerald-700 dark:text-emerald-400' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Languages"
          className="absolute right-0 mt-2 w-44 rounded-xl bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
        >
          <div className="px-3 py-1 border-b border-slate-100 dark:border-slate-700/80 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400">
            Select Language / Chagua Lugha
          </div>
          {LANGUAGES.map((item) => {
            const isSelected = language === item.code;
            return (
              <button
                key={item.code}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(item.code)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-300 font-bold'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/60 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base leading-none">{item.flag}</span>
                  <div className="text-left">
                    <span className="block leading-tight">{item.nativeLabel}</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-400 font-normal leading-tight">{item.label}</span>
                  </div>
                </div>
                {isSelected && <Check className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
