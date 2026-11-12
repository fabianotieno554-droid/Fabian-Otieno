import React, { useState } from 'react';
import { CityDestination, Currency } from '../types/tour';
import { formatCurrency } from '../utils/formatters';
import { ArrowRight, Clock, MapPin, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface CityDestinationsProps {
  cities: CityDestination[];
  currentCurrency: Currency;
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
  onSelectCity: (city: CityDestination) => void;
  onBookCity: (city: CityDestination) => void;
}

export const CityDestinations: React.FC<CityDestinationsProps> = ({
  cities,
  currentCurrency,
  selectedFilter,
  onFilterChange,
  onSelectCity,
  onBookCity,
}) => {
  const [imageErrorMap, setImageErrorMap] = useState<Record<string, boolean>>({});
  const { t } = useLanguage();

  const filteredCities = selectedFilter === 'all'
    ? cities
    : cities.filter((c) => c.id === selectedFilter);

  const handleImageError = (id: string) => {
    setImageErrorMap((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="destinations" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest mb-2">
            <span>{t.destinations.kicker}</span>
            <span aria-hidden="true">·</span>
            <span>{t.destinations.curatedPhotos}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.destinations.title}
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300 max-w-2xl">
            {t.destinations.subtitle}
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-x-auto shrink-0 max-w-full">
          <button
            type="button"
            onClick={() => onFilterChange('all')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
              selectedFilter === 'all'
                ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t.destinations.allCities}
          </button>
          {cities.map((city) => (
            <button
              key={city.id}
              type="button"
              onClick={() => onFilterChange(city.id)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                selectedFilter === city.id
                  ? 'bg-white dark:bg-slate-700 text-emerald-800 dark:text-emerald-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {city.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of City Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCities.map((city) => {
          const hasImgError = imageErrorMap[city.id];

          return (
            <div
              key={city.id}
              className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group"
            >
              {/* City Image Container with Aspect Ratio 4:3 */}
              <div className="relative aspect-4/3 overflow-hidden bg-slate-900">
                {!hasImgError ? (
                  <img
                    src={city.image}
                    alt={`${city.name}, ${city.country}`}
                    referrerPolicy="no-referrer"
                    onError={() => handleImageError(city.id)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-emerald-900 to-slate-900 text-white text-center">
                    <MapPin className="w-8 h-8 text-emerald-400 mb-2" />
                    <span className="font-bold text-lg">{city.name}</span>
                    <span className="text-xs text-slate-300">{city.country}</span>
                  </div>
                )}

                {/* Subtle contrast scrim with country text */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

                {/* Location badge */}
                <div className="absolute top-4 left-4 bg-slate-950/60 backdrop-blur-md px-3 py-1 rounded-md text-xs font-semibold text-white border border-white/10">
                  {city.country} · {city.region}
                </div>

                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <div className="text-xl font-extrabold tracking-tight drop-shadow-xs">
                    {city.name}
                  </div>
                  <div className="text-xs text-emerald-300 font-medium line-clamp-1">
                    {city.tagline}
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed line-clamp-2 mb-4">
                    {city.description}
                  </p>

                  {/* Highlights list */}
                  <div className="space-y-1.5 mb-5 text-xs text-slate-600 dark:text-slate-300">
                    {city.topHighlights.slice(0, 2).map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Metadata Row */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 py-3 border-y border-slate-100 dark:border-slate-800">
                    <span className="inline-flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                      {city.duration}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="font-semibold text-emerald-800 dark:text-emerald-400">
                      {t.destinations.from} {formatCurrency(city.startingPriceKES, currentCurrency)}
                      {city.id === 'dubai' && currentCurrency !== 'USD' && ' (1,250 USD)'}
                    </span>
                  </div>
                </div>

                {/* Card CTA Actions */}
                <div className="mt-6 pt-2 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onSelectCity(city)}
                    className="flex-1 py-2.5 px-4 text-xs font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-750 rounded-xl transition text-center cursor-pointer"
                  >
                    {t.destinations.viewItinerary}
                  </button>

                  <button
                    type="button"
                    onClick={() => onBookCity(city)}
                    className="flex-1 py-2.5 px-4 text-xs font-bold text-white bg-emerald-700 dark:bg-emerald-600 hover:bg-emerald-800 dark:hover:bg-emerald-500 rounded-xl transition text-center shadow-xs cursor-pointer flex items-center justify-center gap-1"
                  >
                    <span>{t.destinations.bookTrip}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
