import React, { useState } from 'react';
import { Currency } from '../types/tour';
import { Compass, Menu, X, Facebook, QrCode, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ThemeToggle } from './ThemeToggle';
import { PWAInstallButton } from './PWAInstallButton';

interface NavbarProps {
  currentCurrency: Currency;
  onCurrencyChange: (c: Currency) => void;
  onOpenBooking: () => void;
  onOpenQrModal?: () => void;
  onOpenProfile?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCurrency,
  onCurrencyChange,
  onOpenBooking,
  onOpenQrModal,
  onOpenProfile,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <header className="fixed top-0 left-0 w-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4 md:gap-6">
        {/* Zone 1: Brand wordmark */}
        <a
          href="#"
          className="flex items-center gap-2 text-xl sm:text-2xl font-extrabold tracking-tight text-emerald-800 dark:text-emerald-400 whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity"
        >
          <Compass className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
          <span>SafariQuest</span>
        </a>

        {/* Zone 2: Nav links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold text-slate-600 dark:text-slate-300">
          <a
            href="#destinations"
            className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.destinations}
          </a>
          <a
            href="#packages"
            className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.packages}
          </a>
          <a
            href="#videos"
            className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.videos}
          </a>
          <a
            href="#till"
            className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.tillPayment}
          </a>
          <a
            href="#facebook-community"
            className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <span>{t.nav.facebook}</span>
          </a>
          <a
            href="#faq"
            className="hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors whitespace-nowrap shrink-0"
          >
            {t.nav.faqs}
          </a>
        </nav>

        {/* Zone 3: Controls (Language Switcher, Theme Toggle, Currency Switcher, Facebook icon, Book CTA) */}
        <div className="hidden sm:flex items-center gap-2.5 xl:gap-3 shrink-0">
          {/* Language Switcher */}
          <LanguageSwitcher variant="dropdown" />

          {/* Dark Mode Toggle */}
          <ThemeToggle />

          {/* Currency Switcher */}
          <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg p-0.5 bg-slate-50 dark:bg-slate-800 text-xs font-semibold shadow-xs">
            {(['KES', 'USD', 'EUR'] as Currency[]).map((curr) => (
              <button
                key={curr}
                type="button"
                onClick={() => onCurrencyChange(curr)}
                className={`px-2 py-1 rounded transition-colors whitespace-nowrap cursor-pointer ${
                  currentCurrency === curr
                    ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 font-bold shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {curr}
              </button>
            ))}
          </div>

          {/* Facebook Link */}
          <a
            href="https://www.facebook.com/SafariQuestToursKe"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-slate-500 dark:text-slate-400 hover:text-[#1877F2] dark:hover:text-[#3b82f6] transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center shrink-0"
            title="SafariQuest on Facebook"
            aria-label="Official Facebook Page"
          >
            <Facebook className="w-4 h-4 fill-current" />
          </a>

          {/* QR Code Scan Modal Trigger */}
          {onOpenQrModal && (
            <button
              type="button"
              onClick={onOpenQrModal}
              className="p-2 text-slate-600 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center shrink-0 cursor-pointer"
              title={t.nav.scanQr}
              aria-label={t.nav.scanQr}
            >
              <QrCode className="w-4 h-4" />
            </button>
          )}

          {/* PWA In-App Install Prompt */}
          <PWAInstallButton variant="nav" />

          {/* Frequent Traveler Profile & Badges Trigger */}
          {onOpenProfile && (
            <button
              type="button"
              onClick={onOpenProfile}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-amber-900 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/50 border border-amber-300 dark:border-amber-800 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-colors shadow-2xs whitespace-nowrap shrink-0 cursor-pointer"
              title="Frequent Traveler Badges & Profile Summary"
            >
              <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span className="hidden xl:inline">Frequent Traveler</span>
            </button>
          )}

          {/* Primary Action Button */}
          <button
            type="button"
            onClick={onOpenBooking}
            className="px-4 py-2 text-sm font-bold text-white bg-emerald-700 dark:bg-emerald-600 rounded-lg hover:bg-emerald-800 dark:hover:bg-emerald-500 transition-colors shadow-xs whitespace-nowrap shrink-0 cursor-pointer"
          >
            {t.nav.bookTour}
          </button>
        </div>

        {/* Mobile controls & hamburger */}
        <div className="flex sm:hidden items-center gap-1.5">
          <ThemeToggle />
          <LanguageSwitcher variant="dropdown" />
          {onOpenQrModal && (
            <button
              type="button"
              onClick={onOpenQrModal}
              className="p-2 text-slate-700 dark:text-slate-200 hover:text-emerald-700 dark:hover:text-emerald-400 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              title={t.nav.scanQr}
              aria-label={t.nav.scanQr}
            >
              <QrCode className="w-5 h-5" />
            </button>
          )}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drop drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-5 py-4 space-y-4 animate-in fade-in duration-150">
          <div className="space-y-1">
            <a
              href="#destinations"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-emerald-800 dark:hover:text-emerald-400"
            >
              {t.nav.destinations}
            </a>
            <a
              href="#packages"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-emerald-800 dark:hover:text-emerald-400"
            >
              {t.nav.packages}
            </a>
            <a
              href="#videos"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-emerald-800 dark:hover:text-emerald-400"
            >
              {t.nav.videos}
            </a>
            <a
              href="#till"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-emerald-800 dark:hover:text-emerald-400"
            >
              {t.nav.tillPayment}
            </a>
            <a
              href="#facebook-community"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-700 dark:hover:text-blue-400"
            >
              {t.nav.facebook}
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 hover:bg-emerald-50 dark:hover:bg-slate-800 hover:text-emerald-800 dark:hover:text-emerald-400"
            >
              {t.nav.faqs}
            </a>
          </div>

          {/* Mobile Theme Toggle Row */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">{t.nav.theme}</span>
            <ThemeToggle variant="labeled" />
          </div>

          {/* Mobile Language Switcher Row */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1.5">{t.nav.language}</span>
            <LanguageSwitcher variant="segmented" onSelectLanguage={() => {}} />
          </div>

          {/* Mobile Currency Switcher Row */}
          <div className="pt-1 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{t.nav.currency}</span>
            <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg p-0.5 bg-slate-50 dark:bg-slate-800 text-xs font-semibold">
              {(['KES', 'USD', 'EUR'] as Currency[]).map((curr) => (
                <button
                  key={curr}
                  type="button"
                  onClick={() => onCurrencyChange(curr)}
                  className={`px-3 py-1 rounded cursor-pointer ${
                    currentCurrency === curr
                      ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 font-bold shadow-xs'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {curr}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile QR Code Scanner CTA */}
          {onOpenQrModal && (
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQrModal();
              }}
              className="w-full py-2.5 px-3 flex items-center justify-center gap-2 rounded-lg text-sm font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors cursor-pointer"
            >
              <QrCode className="w-4 h-4" />
              <span>{t.nav.scanQr}</span>
            </button>
          )}

          {/* Mobile Frequent Traveler Profile CTA */}
          {onOpenProfile && (
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenProfile();
              }}
              className="w-full py-2.5 px-3 flex items-center justify-center gap-2 rounded-lg text-sm font-semibold text-amber-900 dark:text-amber-200 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/50 transition-colors cursor-pointer"
            >
              <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Frequent Traveler Profile & Badges</span>
            </button>
          )}

          {/* Mobile PWA Install */}
          <div className="pt-1 flex justify-center">
            <PWAInstallButton variant="nav" />
          </div>

          {/* Mobile Book Tour CTA */}
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenBooking();
            }}
            className="w-full py-3 text-center text-sm font-bold text-white bg-emerald-700 dark:bg-emerald-600 rounded-lg hover:bg-emerald-800 dark:hover:bg-emerald-500 shadow-sm transition-colors cursor-pointer"
          >
            {t.nav.bookTour}
          </button>
        </div>
      )}
    </header>
  );
};
