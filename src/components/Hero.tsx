import React, { useState } from 'react';
import { ShieldCheck, Copy, Check, Search, Calendar, MapPin, Users } from 'lucide-react';
import { OFFICIAL_TILL_NUMBER } from '../data/toursData';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onSearch: (cityId: string) => void;
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onSearch }) => {
  const [copied, setCopied] = useState(false);
  const [selectedCity, setSelectedCity] = useState('all');
  const { t } = useLanguage();

  const handleCopyTill = () => {
    navigator.clipboard.writeText(OFFICIAL_TILL_NUMBER);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleFilterSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(selectedCity);
    const elem = document.getElementById('destinations');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 bg-slate-900 text-white overflow-hidden">
      {/* Background Hero Image with measured scrim */}
      <img
        src="/src/assets/images/hero_safari_adventure_1792414486160.jpg"
        alt="African Safari Adventure in Kenya"
        referrerPolicy="no-referrer"
        className="absolute inset-0 w-full h-full object-cover object-center opacity-30 select-none pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-950/70" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          {/* Natural editorial kicker */}
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-4">
            <span>{t.hero.kicker}</span>
            <span aria-hidden="true">·</span>
            <span>{t.hero.officialTill} {OFFICIAL_TILL_NUMBER}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight" style={{ textWrap: 'balance' }}>
            {t.hero.title}
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
            {t.hero.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#destinations"
              className="px-7 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition shadow-lg text-sm whitespace-nowrap cursor-pointer"
            >
              {t.hero.exploreBtn}
            </a>

            {/* Quick Till Box */}
            <div className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 px-4 py-2.5 rounded-xl text-xs sm:text-sm">
              <span className="text-slate-300 font-medium">{t.hero.tillLabel}</span>
              <strong className="text-emerald-300 font-mono tracking-wider font-bold">
                {OFFICIAL_TILL_NUMBER}
              </strong>
              <button
                type="button"
                onClick={handleCopyTill}
                className="p-1.5 hover:bg-white/20 rounded text-slate-200 transition cursor-pointer"
                title={t.hero.copyTill}
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
              {copied && <span className="text-xs text-emerald-300 font-medium">{t.hero.copied}</span>}
            </div>
          </div>
        </div>

        {/* Quick Search and Booking Strip */}
        <div className="mt-12 bg-white dark:bg-slate-900/95 text-slate-900 dark:text-slate-100 rounded-2xl p-4 sm:p-6 shadow-2xl border border-slate-100 dark:border-slate-800">
          <form onSubmit={handleFilterSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  {t.hero.selectCity}
                </span>
              </label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="all">{t.hero.allDestinations}</option>
                <option value="nairobi">Nairobi (Kenya)</option>
                <option value="mombasa">Mombasa & Malindi (Kenya)</option>
                <option value="capetown">Cape Town (South Africa)</option>
                <option value="zanzibar">Stone Town & Zanzibar (Tanzania)</option>
                <option value="dubai">Dubai (United Arab Emirates)</option>
                <option value="miami">Miami, Florida (USA)</option>
                <option value="tokyo">Tokyo (Japan)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  {t.hero.travelSeason}
                </span>
              </label>
              <select className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                <option>{t.hero.upcomingSeason}</option>
                <option>{t.hero.currentSeason}</option>
                <option>{t.hero.peakSeason}</option>
                <option>{t.hero.festiveSeason}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                <span className="inline-flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  {t.hero.partySize}
                </span>
              </label>
              <select className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500">
                <option>{t.hero.soloExplorer}</option>
                <option>{t.hero.twoTravelers}</option>
                <option>{t.hero.groupTravelers}</option>
                <option>{t.hero.largeGroup}</option>
              </select>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl transition text-sm cursor-pointer shadow-sm"
              >
                <Search className="w-4 h-4" />
                <span>{t.hero.findAdventures}</span>
              </button>
            </div>
          </form>

          {/* Trust markers row under search strip */}
          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400 gap-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{t.hero.katoBadge}</span>
            </div>
            <div className="flex items-center gap-4">
              <span>{t.hero.mpesaBadge}</span>
              <span aria-hidden="true">·</span>
              <span>{t.hero.guaranteedBadge}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
