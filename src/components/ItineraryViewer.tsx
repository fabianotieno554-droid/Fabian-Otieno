import React, { useState } from 'react';
import { TourPackage, CityDestination, Currency, DayItinerary } from '../types/tour';
import { formatCurrency } from '../utils/formatters';
import {
  Calendar,
  Clock,
  MapPin,
  Sunrise,
  Sun,
  Moon,
  Utensils,
  Hotel,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Compass,
  ArrowRight,
  MessageSquare
} from 'lucide-react';
import { OFFICIAL_TILL_NUMBER } from '../data/toursData';
import { useLanguage } from '../context/LanguageContext';

interface ItineraryViewerProps {
  currentPackage?: TourPackage | null;
  city?: CityDestination | null;
  availablePackages?: TourPackage[];
  currentCurrency: Currency;
  onSelectPackage?: (pkg: TourPackage) => void;
  onBookPackage?: (pkg: TourPackage) => void;
  onAskAiAboutPackage?: (pkgName: string, dayNumber?: number) => void;
}

export const ItineraryViewer: React.FC<ItineraryViewerProps> = ({
  currentPackage,
  city,
  availablePackages = [],
  currentCurrency,
  onSelectPackage,
  onBookPackage,
  onAskAiAboutPackage,
}) => {
  const { t } = useLanguage();
  
  // Active package state: prioritize currentPackage, or first available package for city, or city-derived
  const [selectedPkgId, setSelectedPkgId] = useState<string>(
    currentPackage?.id || (availablePackages.length > 0 ? availablePackages[0].id : '')
  );

  // Filter package
  const activePackage = availablePackages.find((p) => p.id === selectedPkgId) || currentPackage;

  // Selected Day tab: null means "All Days / Full Timeline"
  const [activeDayFilter, setActiveDayFilter] = useState<number | null>(null);

  // Fallback itinerary if package doesn't have detailed itinerary
  const itineraryDays: DayItinerary[] = activePackage?.itinerary || (
    city?.itinerarySummary.map((item) => ({
      day: item.day,
      title: item.title,
      description: item.description,
      morning: item.description,
      afternoon: 'Guided cultural and landscape sightseeing with licensed safari specialist.',
      evening: 'Evening relaxation, scenic sundowner, and dinner.',
      meals: ['Breakfast', 'Dinner'],
      accommodation: 'Handpicked Safari Lodge or Coastal Resort',
      activities: [item.title],
      highlight: item.title,
    })) || []
  );

  const displayedDays = activeDayFilter === null
    ? itineraryDays
    : itineraryDays.filter((d) => d.day === activeDayFilter);

  return (
    <div className="space-y-6">
      {/* Package Selector Tabs (if multiple packages available) */}
      {availablePackages.length > 1 && (
        <div className="bg-slate-100 dark:bg-slate-800/80 p-2 rounded-2xl border border-slate-200 dark:border-slate-700">
          <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-2 py-1 mb-1">
            Choose Package Itinerary
          </div>
          <div className="flex flex-wrap gap-1.5">
            {availablePackages.map((pkg) => {
              const isSelected = (activePackage?.id === pkg.id);
              return (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => {
                    setSelectedPkgId(pkg.id);
                    setActiveDayFilter(null);
                    if (onSelectPackage) onSelectPackage(pkg);
                  }}
                  className={`px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                    isSelected
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80'
                  }`}
                >
                  <Compass className={`w-3.5 h-3.5 ${isSelected ? 'text-emerald-200' : 'text-emerald-600 dark:text-emerald-400'}`} />
                  <span className="truncate max-w-[200px] sm:max-w-none">{pkg.title}</span>
                  <span className={`text-[11px] px-1.5 py-0.5 rounded-md font-semibold ${
                    isSelected ? 'bg-emerald-800/80 text-emerald-100' : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                  }`}>
                    {pkg.durationDays}D
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Package Header Banner */}
      {activePackage && (
        <div className="bg-gradient-to-r from-emerald-950 via-slate-900 to-slate-900 text-white rounded-2xl p-5 border border-emerald-900/50 relative overflow-hidden shadow-md">
          <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">
                <span>{activePackage.category}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {activePackage.durationDays} Days / {Math.max(1, activePackage.durationDays - 1)} Nights
                </span>
                <span aria-hidden="true">·</span>
                <span className="text-amber-300 font-semibold">★ {activePackage.rating} ({activePackage.reviewCount} reviews)</span>
              </div>
              <h4 className="text-lg sm:text-xl font-extrabold text-white leading-snug">
                {activePackage.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 line-clamp-2">
                {activePackage.description}
              </p>
            </div>

            <div className="sm:text-right shrink-0 bg-slate-800/80 sm:bg-transparent p-3 sm:p-0 rounded-xl border border-slate-700/60 sm:border-0">
              <span className="text-xs text-slate-400 block">Package Price</span>
              <div className="text-xl sm:text-2xl font-black text-white tabular-nums">
                {formatCurrency(activePackage.pricePerPersonKES, currentCurrency)}
                {activePackage.cityId === 'dubai' && currentCurrency !== 'USD' && (
                  <span className="text-xs text-emerald-400 font-semibold block">1,250 USD</span>
                )}
              </div>
              <span className="text-[11px] text-emerald-300 font-medium block">
                Till {OFFICIAL_TILL_NUMBER} (30% deposit)
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Day Filter Pills */}
      <div className="flex items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mr-1">
            Day Plan:
          </span>
          <button
            type="button"
            onClick={() => setActiveDayFilter(null)}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeDayFilter === null
                ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            All Days ({itineraryDays.length})
          </button>
          {itineraryDays.map((d) => (
            <button
              key={d.day}
              type="button"
              onClick={() => setActiveDayFilter(d.day)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeDayFilter === d.day
                  ? 'bg-emerald-700 dark:bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              <span>Day {d.day}</span>
            </button>
          ))}
        </div>

        {onAskAiAboutPackage && activePackage && (
          <button
            type="button"
            onClick={() => onAskAiAboutPackage(activePackage.title, activeDayFilter || undefined)}
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:underline cursor-pointer shrink-0"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Ask AI Guide about this</span>
          </button>
        )}
      </div>

      {/* Day-by-Day Detailed Timeline Cards */}
      <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
        {displayedDays.map((item) => (
          <div key={item.day} className="relative group">
            {/* Timeline Day Pin Node */}
            <div className="absolute -left-6 sm:-left-8 top-1.5 flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-emerald-700 dark:bg-emerald-500 text-white font-extrabold text-xs shadow-md border-2 border-white dark:border-slate-900 group-hover:scale-110 transition-transform">
              {item.day}
            </div>

            {/* Day Card */}
            <div className="bg-slate-50/80 dark:bg-slate-800/60 rounded-2xl p-5 sm:p-6 border border-slate-200/80 dark:border-slate-700/80 shadow-xs hover:border-emerald-500/50 dark:hover:border-emerald-500/50 transition-colors">
              {/* Day Header */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    Day {item.day} Breakdown
                  </span>
                  {item.tagline && (
                    <>
                      <span className="text-slate-300 dark:text-slate-600" aria-hidden="true">·</span>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-medium italic">
                        {item.tagline}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <h5 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug">
                {item.title}
              </h5>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {item.description}
              </p>

              {/* Time-of-day Segments */}
              {(item.morning || item.afternoon || item.evening) && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60">
                  {item.morning && (
                    <div className="bg-amber-500/5 dark:bg-amber-500/10 p-3 rounded-xl border border-amber-500/20">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-700 dark:text-amber-400 mb-1">
                        <Sunrise className="w-3.5 h-3.5" />
                        <span>Morning Activities</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {item.morning}
                      </p>
                    </div>
                  )}

                  {item.afternoon && (
                    <div className="bg-sky-500/5 dark:bg-sky-500/10 p-3 rounded-xl border border-sky-500/20">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-sky-700 dark:text-sky-400 mb-1">
                        <Sun className="w-3.5 h-3.5" />
                        <span>Afternoon Schedule</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {item.afternoon}
                      </p>
                    </div>
                  )}

                  {item.evening && (
                    <div className="bg-indigo-500/5 dark:bg-indigo-500/10 p-3 rounded-xl border border-indigo-500/20">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 dark:text-indigo-400 mb-1">
                        <Moon className="w-3.5 h-3.5" />
                        <span>Evening & Sundowner</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {item.evening}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Highlight callout if present */}
              {item.highlight && (
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-xs text-emerald-900 dark:text-emerald-200 mb-4">
                  <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span className="font-semibold">Day Highlight:</span>
                  <span className="text-emerald-800 dark:text-emerald-300">{item.highlight}</span>
                </div>
              )}

              {/* Day Meta: Meals, Accommodation, Activities */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200/50 dark:border-slate-700/50 text-xs">
                {item.meals && item.meals.length > 0 && (
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    <Utensils className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    <span className="font-semibold text-slate-500 dark:text-slate-400">Meals:</span>
                    <span>{item.meals.join(', ')}</span>
                  </div>
                )}

                {item.accommodation && (
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    <Hotel className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    <span className="font-semibold text-slate-500 dark:text-slate-400">Lodge/Stay:</span>
                    <span className="truncate max-w-[200px]">{item.accommodation}</span>
                  </div>
                )}

                {item.activities && item.activities.length > 0 && (
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    <span>{item.activities.length} Guided Activities</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking & Confirmation Callout */}
      {activePackage && onBookPackage && (
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-700/40 border border-emerald-500/30 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h6 className="text-sm font-bold text-white">Ready for this itinerary?</h6>
              <p className="text-xs text-slate-300">
                Reserve your spot now with a 30% deposit via M-Pesa Till {OFFICIAL_TILL_NUMBER}.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onBookPackage(activePackage)}
            className="w-full sm:w-auto px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition shadow-sm cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Book This Package Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
