import React, { useState } from 'react';
import { useOnlineStatus, getLatestOfflineReceipt } from '../utils/offlineStorage';
import { WifiOff, ShieldCheck, CheckCircle2, ChevronRight, X, Sparkles, MapPin } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface OfflineIndicatorProps {
  onOpenReceipt: () => void;
  onOpenTips?: () => void;
}

export const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({
  onOpenReceipt,
  onOpenTips,
}) => {
  const isOnline = useOnlineStatus();
  const [minimized, setMinimized] = useState(false);
  const { language } = useLanguage();

  if (isOnline) return null;

  const title =
    language === 'sw'
      ? 'Hali ya Nje ya Mtandao (Offline Safari)'
      : language === 'fr'
      ? 'Mode Hors-Ligne Safari Activé'
      : 'Offline Safari Mode Active';

  const message =
    language === 'sw'
      ? 'Stakabadhi yako ya safari na vidokezo vya kusafiri vimehifadhiwa tayari kutumika porini bila intaneti.'
      : language === 'fr'
      ? 'Votre reçu de réservation et vos conseils de voyage sont enregistrés et accessibles sans connexion.'
      : 'Your Booking Receipt, QR Pass & Travel Tips are cached locally for remote game parks without cell signal.';

  if (minimized) {
    return (
      <button
        type="button"
        onClick={() => setMinimized(false)}
        className="fixed bottom-20 left-4 z-50 flex items-center gap-2 rounded-full bg-amber-600 hover:bg-amber-700 text-white px-3.5 py-2 text-xs font-bold shadow-xl border border-amber-400/50 cursor-pointer animate-pulse transition"
        title="Offline Mode Active — Click to expand"
      >
        <WifiOff className="w-4 h-4" />
        <span>Offline Active · Voucher Ready</span>
      </button>
    );
  }

  return (
    <aside
      role="status"
      aria-live="polite"
      className="fixed bottom-20 left-4 z-50 max-w-md w-[calc(100vw-2rem)] sm:w-auto rounded-2xl bg-slate-900/95 backdrop-blur-md text-white p-4 shadow-2xl border border-amber-500/80 animate-slideUp"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
            <WifiOff className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                {title}
              </span>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-500 text-slate-950">
                PWA Cached
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              {message}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMinimized(true)}
          className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer shrink-0"
          aria-label="Minimize"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Offline Action Shortcuts */}
      <div className="mt-3 pt-3 border-t border-slate-800 flex items-center gap-2">
        <button
          type="button"
          onClick={onOpenReceipt}
          className="flex-1 py-1.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs"
        >
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-200" />
          <span>View Offline Receipt</span>
        </button>

        <a
          href="#travel-tips"
          onClick={() => {
            if (onOpenTips) onOpenTips();
          }}
          className="py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center justify-center gap-1 transition cursor-pointer border border-slate-700"
        >
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span>Travel Tips</span>
        </a>
      </div>
    </aside>
  );
};
