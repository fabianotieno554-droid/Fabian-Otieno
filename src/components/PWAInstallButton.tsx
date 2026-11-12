import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, Smartphone, X, Check, ShieldCheck, Compass, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface PWAInstallButtonProps {
  variant?: 'nav' | 'banner' | 'floating';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({ variant = 'nav' }) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const { language } = useLanguage();

  // If already running in standalone mode as installed PWA, hide
  if (isInstalled) {
    return null;
  }

  const label =
    language === 'sw'
      ? 'Sakinisha App'
      : language === 'fr'
      ? 'Installer l’App'
      : 'Install Safari App';

  const subtitle =
    language === 'sw'
      ? 'Inapatikana bila mtandao porini'
      : language === 'fr'
      ? 'Accessible hors-ligne en brousse'
      : 'Works offline in the savannah';

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    if (variant === 'nav') {
      return (
        <button
          type="button"
          onClick={install}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-800 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition shadow-2xs cursor-pointer whitespace-nowrap"
          title="Install KenyaQuest App for offline access"
        >
          <Download className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>{label}</span>
        </button>
      );
    }

    return (
      <button
        type="button"
        onClick={install}
        className="flex items-center gap-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white px-4 py-2 text-xs font-bold shadow-md transition cursor-pointer"
      >
        <Download className="w-4 h-4" />
        <span>{label}</span>
      </button>
    );
  }

  // iOS Safari flow (beforeinstallprompt is not supported by WebKit)
  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-800 dark:text-emerald-200 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 transition shadow-2xs cursor-pointer whitespace-nowrap"
          title="Install on iPhone / iPad for offline access"
        >
          <Smartphone className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>{label}</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 animate-fadeIn">
            <div className="w-full max-w-sm rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 shadow-2xl relative">
              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-800 flex items-center justify-center text-white shadow-xs">
                  <Compass className="w-6 h-6 text-emerald-300" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-base">
                    KenyaQuest Safaris
                  </h4>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    {subtitle}
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-black flex items-center justify-center shrink-0 text-[11px]">
                    1
                  </span>
                  <span>
                    Tap the <strong>Share</strong> button (box with upward arrow) in the Safari toolbar.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-black flex items-center justify-center shrink-0 text-[11px]">
                    2
                  </span>
                  <span>
                    Scroll down and tap <strong>Add to Home Screen</strong>.
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-black flex items-center justify-center shrink-0 text-[11px]">
                    3
                  </span>
                  <span>
                    Open the app from your home screen anytime to access your booking pass and travel tips offline!
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  // Fallback desktop / browser banner button so users always know how to install
  return (
    <button
      type="button"
      onClick={() => {
        alert(
          'To install KenyaQuest on your browser, click the Install icon in the address bar or tap "Install / Add to Home Screen" in your browser menu.'
        );
      }}
      className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 transition cursor-pointer"
      title="Install PWA for offline access"
    >
      <Download className="w-3.5 h-3.5" />
      <span className="hidden lg:inline">{label}</span>
    </button>
  );
};
