import React, { useState, useEffect } from 'react';
import { LOCATION_TRAVEL_TIPS, DestinationTip } from '../data/travelTipsData';
import { CITIES_DATA } from '../data/toursData';
import { useLanguage } from '../context/LanguageContext';
import {
  Compass,
  Calendar,
  Sun,
  Shield,
  HeartHandshake,
  Wallet,
  Luggage,
  CheckCircle2,
  XCircle,
  AlertCircle,
  PhoneCall,
  Sparkles,
  Droplets,
  Copy,
  Check,
  MapPin,
  ChevronRight,
  WifiOff,
} from 'lucide-react';
import { useOnlineStatus, getOfflineTravelTips } from '../utils/offlineStorage';

interface LocationTravelTipsProps {
  currentFilter: string;
  onFilterChange?: (cityId: string) => void;
}

type TabType = 'bestTime' | 'etiquette' | 'currency' | 'packing' | 'safety';

export const LocationTravelTips: React.FC<LocationTravelTipsProps> = ({
  currentFilter,
  onFilterChange,
}) => {
  const { language } = useLanguage();

  // Active city selection: if filter is 'all', default to 'nairobi' or maintain user choice
  const [activeCityId, setActiveCityId] = useState<string>(() => {
    return currentFilter !== 'all' && LOCATION_TRAVEL_TIPS[currentFilter]
      ? currentFilter
      : 'nairobi';
  });

  const [activeTab, setActiveTab] = useState<TabType>('bestTime');
  const [copiedChecklist, setCopiedChecklist] = useState<boolean>(false);
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const isOnline = useOnlineStatus();

  // Sync when currentFilter changes externally (e.g. from hero search or destinations grid)
  useEffect(() => {
    if (currentFilter !== 'all' && LOCATION_TRAVEL_TIPS[currentFilter]) {
      setActiveCityId(currentFilter);
    }
  }, [currentFilter]);

  const activeTip: DestinationTip =
    LOCATION_TRAVEL_TIPS[activeCityId] ||
    getOfflineTravelTips(activeCityId) ||
    LOCATION_TRAVEL_TIPS['nairobi'];

  const handleSelectCity = (cityId: string) => {
    setActiveCityId(cityId);
    if (onFilterChange) {
      onFilterChange(cityId);
    }
  };

  const toggleCheckItem = (itemKey: string) => {
    setCheckedItems((prev) => ({
      ...prev,
      [itemKey]: !prev[itemKey],
    }));
  };

  const handleCopyPackingList = () => {
    const items =
      language === 'sw'
        ? activeTip.packingAndDress.mustPackItemsSw
        : language === 'fr'
        ? activeTip.packingAndDress.mustPackItemsFr
        : activeTip.packingAndDress.mustPackItems;

    const textToCopy = `SafariQuest Packing List for ${activeTip.cityName} (${activeTip.country}):\n${items.map((i) => `• ${i}`).join('\n')}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopiedChecklist(true);
      setTimeout(() => setCopiedChecklist(false), 2500);
    }
  };

  // Localized texts
  const localizedTagline =
    language === 'sw'
      ? activeTip.taglineSw
      : language === 'fr'
      ? activeTip.taglineFr
      : activeTip.tagline;

  const localizedHeroHeadline =
    language === 'sw'
      ? activeTip.heroHeadlineSw
      : language === 'fr'
      ? activeTip.heroHeadlineFr
      : activeTip.heroHeadline;

  const localizedIdealMonths =
    language === 'sw'
      ? activeTip.bestTimeToVisit.idealMonthsSw
      : language === 'fr'
      ? activeTip.bestTimeToVisit.idealMonthsFr
      : activeTip.bestTimeToVisit.idealMonths;

  const localizedWeatherSummary =
    language === 'sw'
      ? activeTip.bestTimeToVisit.weatherSummarySw
      : language === 'fr'
      ? activeTip.bestTimeToVisit.weatherSummaryFr
      : activeTip.bestTimeToVisit.weatherSummary;

  const localizedWildlifePeak =
    language === 'sw'
      ? activeTip.bestTimeToVisit.wildlifeOrSeasonalPeakSw
      : language === 'fr'
      ? activeTip.bestTimeToVisit.wildlifeOrSeasonalPeakFr
      : activeTip.bestTimeToVisit.wildlifeOrSeasonalPeak;

  const localizedGreeting =
    language === 'sw'
      ? activeTip.localEtiquette.greetingSw
      : language === 'fr'
      ? activeTip.localEtiquette.greetingFr
      : activeTip.localEtiquette.greeting;

  const localizedDos =
    language === 'sw'
      ? activeTip.localEtiquette.dosSw
      : language === 'fr'
      ? activeTip.localEtiquette.dosFr
      : activeTip.localEtiquette.dos;

  const localizedDonts =
    language === 'sw'
      ? activeTip.localEtiquette.dontsSw
      : language === 'fr'
      ? activeTip.localEtiquette.dontsFr
      : activeTip.localEtiquette.donts;

  const localizedCultureTip =
    language === 'sw'
      ? activeTip.localEtiquette.cultureTipSw
      : language === 'fr'
      ? activeTip.localEtiquette.cultureTipFr
      : activeTip.localEtiquette.cultureTip;

  const localizedPaymentAdvice =
    language === 'sw'
      ? activeTip.currencyAndTipping.paymentAdviceSw
      : language === 'fr'
      ? activeTip.currencyAndTipping.paymentAdviceFr
      : activeTip.currencyAndTipping.paymentAdvice;

  const localizedTippingNorms =
    language === 'sw'
      ? activeTip.currencyAndTipping.tippingNormsSw
      : language === 'fr'
      ? activeTip.currencyAndTipping.tippingNormsFr
      : activeTip.currencyAndTipping.tippingNorms;

  const localizedDressCode =
    language === 'sw'
      ? activeTip.packingAndDress.dressCodeSw
      : language === 'fr'
      ? activeTip.packingAndDress.dressCodeFr
      : activeTip.packingAndDress.dressCode;

  const localizedPackItems =
    language === 'sw'
      ? activeTip.packingAndDress.mustPackItemsSw
      : language === 'fr'
      ? activeTip.packingAndDress.mustPackItemsFr
      : activeTip.packingAndDress.mustPackItems;

  const localizedClimateNote =
    language === 'sw'
      ? activeTip.packingAndDress.climateNoteSw
      : language === 'fr'
      ? activeTip.packingAndDress.climateNoteFr
      : activeTip.packingAndDress.climateNote;

  const localizedHealth =
    language === 'sw'
      ? activeTip.healthAndSafety.healthAdviceSw
      : language === 'fr'
      ? activeTip.healthAndSafety.healthAdviceFr
      : activeTip.healthAndSafety.healthAdvice;

  const localizedSafety =
    language === 'sw'
      ? activeTip.healthAndSafety.safetyAdviceSw
      : language === 'fr'
      ? activeTip.healthAndSafety.safetyAdviceFr
      : activeTip.healthAndSafety.safetyAdvice;

  return (
    <section id="travel-tips" className="py-20 bg-slate-900 text-slate-100 border-t border-slate-800 relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-amber-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest mb-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60">
            <Compass className="w-3.5 h-3.5 text-emerald-400" />
            <span>Destination Field Guide</span>
            <span aria-hidden="true">·</span>
            <span>Local Etiquette & Wisdom</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Location-Specific Travel Tips
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-400">
            Curated field notes, best visiting seasons, local customs, tipping guidelines, and essential packing advice tailored to your selected destination.
          </p>

          {/* Offline Caching Status Badge */}
          <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-950/70 border border-emerald-700/60 text-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Offline Ready · Accessible in remote safari reserves</span>
            </span>
            {!isOnline && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-500 text-slate-950 shadow-sm animate-pulse">
                <WifiOff className="w-3.5 h-3.5" />
                <span>Offline Mode Active</span>
              </span>
            )}
          </div>

          {/* Interactive City Selector Bar */}
          <div className="mt-8 flex items-center justify-center flex-wrap gap-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 hidden sm:inline">
              Selected Destination:
            </span>
            {CITIES_DATA.map((city) => {
              const isSelected = activeCityId === city.id;
              return (
                <button
                  key={city.id}
                  type="button"
                  onClick={() => handleSelectCity(city.id)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all duration-150 flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950 border border-emerald-500 scale-105'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/80'
                  }`}
                >
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  <span>{city.name}</span>
                  {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* City Overview Card */}
        <div className="bg-slate-950/80 border border-slate-800 rounded-3xl p-6 sm:p-8 lg:p-10 mb-8 shadow-2xl backdrop-blur-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <span>{activeTip.country}</span>
                <span>·</span>
                <span>{activeTip.region}</span>
                {currentFilter !== 'all' && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 text-[10px] font-mono border border-emerald-800/60">
                    Active City Filter
                  </span>
                )}
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {localizedHeroHeadline}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                {localizedTagline}
              </p>
            </div>

            {/* Quick Badges Pill */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2.5">
                <Sun className="w-4 h-4 text-amber-400" />
                <div className="text-left">
                  <span className="block text-[10px] uppercase font-bold text-slate-500">Prime Season</span>
                  <span className="block text-xs font-semibold text-slate-200">
                    {activeTip.bestTimeToVisit.monthsList.slice(0, 3).join(', ')}...
                  </span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2.5">
                <Wallet className="w-4 h-4 text-emerald-400" />
                <div className="text-left">
                  <span className="block text-[10px] uppercase font-bold text-slate-500">Currency</span>
                  <span className="block text-xs font-semibold text-slate-200">{activeTip.currencyAndTipping.currencyCode}</span>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2.5">
                <Droplets className={`w-4 h-4 ${activeTip.healthAndSafety.tapWaterSafe ? 'text-emerald-400' : 'text-amber-400'}`} />
                <div className="text-left">
                  <span className="block text-[10px] uppercase font-bold text-slate-500">Tap Water</span>
                  <span className="block text-xs font-semibold text-slate-200">
                    {activeTip.healthAndSafety.tapWaterSafe ? 'Safe to Drink' : 'Bottled Advised'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Navigation Tabs for this City */}
          <div className="pt-6">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {[
                { id: 'bestTime' as TabType, label: 'Best Time to Visit', icon: Calendar },
                { id: 'etiquette' as TabType, label: 'Local Etiquette & Customs', icon: HeartHandshake },
                { id: 'currency' as TabType, label: 'Currency, Payments & Tipping', icon: Wallet },
                { id: 'packing' as TabType, label: 'Packing & Dress Code', icon: Luggage },
                { id: 'safety' as TabType, label: 'Health & Safety', icon: Shield },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950'
                        : 'bg-slate-900 text-slate-300 hover:bg-slate-850 hover:text-white border border-slate-800'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab Content Display Area */}
          <div className="mt-6 pt-6 border-t border-slate-800/80">
            {/* 1. Best Time to Visit */}
            {activeTab === 'bestTime' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-fade-in">
                <div className="md:col-span-7 space-y-5">
                  <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                      <Calendar className="w-4 h-4" />
                      <span>Recommended Travel Window</span>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-white">
                      {localizedIdealMonths}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                      {localizedWeatherSummary}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                      <Sparkles className="w-4 h-4" />
                      <span>Peak Phenomenon & Seasonal Highlights</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {localizedWildlifePeak}
                    </p>
                  </div>
                </div>

                <div className="md:col-span-5 flex flex-col justify-between p-5 rounded-2xl bg-emerald-950/30 border border-emerald-800/40 space-y-4">
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-1.5">
                      <Sun className="w-4 h-4" />
                      <span>Monthly Suitability Matrix</span>
                    </h4>
                    <div className="grid grid-cols-6 gap-2">
                      {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => {
                        const isPrime = activeTip.bestTimeToVisit.monthsList.includes(m);
                        return (
                          <div
                            key={m}
                            className={`p-2 rounded-lg text-center text-xs font-bold border transition-colors ${
                              isPrime
                                ? 'bg-emerald-600 text-white border-emerald-500 shadow-xs'
                                : 'bg-slate-900 text-slate-500 border-slate-800'
                            }`}
                          >
                            <span>{m}</span>
                            <span className="block text-[9px] mt-0.5 font-normal opacity-90">
                              {isPrime ? 'Ideal' : 'Fair'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-400 bg-slate-900/60 p-3 rounded-xl border border-slate-800">
                    💡 <strong>Pro-Tip:</strong> Traveling during shoulder months offers lower park crowds and more intimate lodge rates while retaining fantastic safari viewing.
                  </div>
                </div>
              </div>
            )}

            {/* 2. Local Etiquette & Customs */}
            {activeTab === 'etiquette' && (
              <div className="space-y-6 animate-fade-in">
                {/* Greeting Card */}
                <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-700/60 text-emerald-400 flex items-center justify-center shrink-0">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-[11px] uppercase font-bold tracking-wider text-emerald-400">
                      Greeting Norms & Courtesy
                    </span>
                    <p className="text-sm sm:text-base font-semibold text-white leading-relaxed">
                      {localizedGreeting}
                    </p>
                  </div>
                </div>

                {/* Do's and Don'ts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* DO List */}
                  <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-800/50 space-y-4">
                    <div className="flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-wider">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                      <span>Respectful Best Practices (Do)</span>
                    </div>
                    <ul className="space-y-3">
                      {localizedDos.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* DON'T List */}
                  <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-900/40 space-y-4">
                    <div className="flex items-center gap-2 text-sm font-bold text-rose-400 uppercase tracking-wider">
                      <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                      <span>Cultural Taboos to Avoid (Don't)</span>
                    </div>
                    <ul className="space-y-3">
                      {localizedDonts.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Cultural Insight Card */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
                  <span>{localizedCultureTip}</span>
                </div>
              </div>
            )}

            {/* 3. Currency, Payments & Tipping */}
            {activeTab === 'currency' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-fade-in">
                <div className="md:col-span-6 space-y-5">
                  <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                      <Wallet className="w-4 h-4" />
                      <span>Currency & Payment Methods</span>
                    </div>
                    <div className="text-xl font-bold text-white">
                      {activeTip.currencyAndTipping.currencyName}
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {localizedPaymentAdvice}
                    </p>

                    <div className="pt-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                        Commonly Accepted Methods:
                      </span>
                      <div className="flex flex-wrap gap-2">
                        {activeTip.currencyAndTipping.acceptedMethods.map((method, idx) => (
                          <span
                            key={idx}
                            className="px-2.5 py-1 rounded-lg bg-slate-800 border border-slate-700 text-xs text-slate-200 font-medium"
                          >
                            ✓ {method}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-6 space-y-5">
                  <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-800/50 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                      <Sparkles className="w-4 h-4" />
                      <span>Tipping Norms & Gratuity Guide</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                      {localizedTippingNorms}
                    </p>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
                      <strong className="text-emerald-400">SafariQuest Booking Note:</strong>
                      <p>
                        For Kenya trips, all driver-guide and hotel gratuities can be settled in KES or USD, or seamlessly via Safaricom Till 6608497.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Packing & Dress Code */}
            {activeTab === 'packing' && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-fade-in">
                <div className="md:col-span-5 space-y-5">
                  <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                      <Luggage className="w-4 h-4" />
                      <span>Dress Code & Style Notes</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {localizedDressCode}
                    </p>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400">
                      🌤️ <strong>Climate Note:</strong> {localizedClimateNote}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyPackingList}
                    className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer border ${
                      copiedChecklist
                        ? 'bg-emerald-600 text-white border-emerald-500'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                    }`}
                  >
                    {copiedChecklist ? (
                      <>
                        <Check className="w-4 h-4 text-white" />
                        <span>Packing List Copied to Clipboard!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-emerald-400" />
                        <span>Copy Printable Checklist</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="md:col-span-7 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Must-Pack Essentials (Interactive Checklist)</span>
                    </span>
                    <span className="text-[10px] text-slate-400">
                      Tap items to mark packed
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {localizedPackItems.map((item, idx) => {
                      const itemKey = `${activeCityId}-${idx}`;
                      const isChecked = !!checkedItems[itemKey];
                      return (
                        <div
                          key={idx}
                          onClick={() => toggleCheckItem(itemKey)}
                          className={`flex items-start gap-3 p-2.5 rounded-xl border transition-all cursor-pointer ${
                            isChecked
                              ? 'bg-emerald-950/40 border-emerald-700/60 line-through text-slate-400'
                              : 'bg-slate-800/60 border-slate-700/70 text-slate-200 hover:bg-slate-800'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 ${
                              isChecked
                                ? 'bg-emerald-600 border-emerald-500 text-white'
                                : 'border-slate-500'
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3" />}
                          </div>
                          <span className="text-xs sm:text-sm select-none">{item}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* 5. Health & Safety */}
            {activeTab === 'safety' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
                <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                    <Shield className="w-4 h-4" />
                    <span>Health, Vaccinations & Water</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {localizedHealth}
                  </p>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center gap-2.5 text-xs">
                    <Droplets className={`w-5 h-5 shrink-0 ${activeTip.healthAndSafety.tapWaterSafe ? 'text-emerald-400' : 'text-amber-400'}`} />
                    <span>
                      <strong>Tap Water:</strong>{' '}
                      {activeTip.healthAndSafety.tapWaterSafe
                        ? 'High quality and fully potable direct from tap.'
                        : 'Drink sealed bottled or filtered water; avoid ice from unverified roadside stalls.'}
                    </span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                    <AlertCircle className="w-4 h-4" />
                    <span>Neighborhood Safety & Transit</span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    {localizedSafety}
                  </p>
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/60 flex items-center gap-2 text-xs text-emerald-300">
                    <PhoneCall className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{activeTip.healthAndSafety.emergencyNumber}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
