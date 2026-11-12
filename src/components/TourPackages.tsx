import React, { useState } from 'react';
import { TourPackage, Currency } from '../types/tour';
import { formatCurrency } from '../utils/formatters';
import { Check, Star, Calendar, Clock } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface TourPackagesProps {
  packages: TourPackage[];
  currentCurrency: Currency;
  onBookPackage: (pkg: TourPackage) => void;
  onViewItinerary?: (pkg: TourPackage) => void;
}

export const TourPackages: React.FC<TourPackagesProps> = ({
  packages,
  currentCurrency,
  onBookPackage,
  onViewItinerary,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { t } = useLanguage();

  const categories = [
    { key: 'All', label: t.packages.all },
    { key: 'City Highlights', label: t.packages.cityHighlights },
    { key: 'Beach & Island', label: t.packages.beachIsland },
    { key: 'Big Five Safari', label: t.packages.bigFiveSafari },
    { key: 'International City', label: t.packages.internationalCity },
  ];

  const filteredPackages = selectedCategory === 'All'
    ? packages
    : packages.filter((p) => p.category === selectedCategory);

  return (
    <section id="packages" className="py-20 bg-slate-100/60 dark:bg-slate-900/60 border-y border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest mb-2">
            <span>{t.packages.kicker}</span>
            <span aria-hidden="true">·</span>
            <span>{t.packages.inclusive}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.packages.title}
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            {t.packages.subtitle}
          </p>

          {/* Category Filter Tabs */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                type="button"
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
                  selectedCategory === cat.key
                    ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-16/10 overflow-hidden bg-slate-900">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-slate-950/70 backdrop-blur-md px-2.5 py-1 rounded text-xs font-semibold text-white border border-white/10">
                    {pkg.cityName}
                  </div>
                  <div className="absolute top-3 right-3 bg-emerald-900/80 backdrop-blur-md text-emerald-200 px-2.5 py-1 rounded text-xs font-semibold">
                    {pkg.durationDays} {t.packages.daysTour}
                  </div>
                </div>

                <div className="p-6">
                  {/* Rating & reviews */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                    <span className="flex items-center gap-1 font-bold text-amber-600 dark:text-amber-400">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                      {pkg.rating.toFixed(1)}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{pkg.reviewCount} {t.packages.reviews}</span>
                    <span aria-hidden="true">·</span>
                    <span>{pkg.category}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug mb-3 line-clamp-2">
                    {pkg.title}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
                    {pkg.description}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-slate-100 dark:border-slate-800 mb-4">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                      {t.packages.inclusionsTitle}
                    </span>
                    {pkg.inclusions.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Package Footer & Pricing */}
              <div className="p-6 pt-0 bg-white dark:bg-slate-900">
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-4 mb-4">
                  <div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 block">{t.packages.perPerson}</span>
                    <span className="text-xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                      {formatCurrency(pkg.pricePerPersonKES, currentCurrency)}
                    </span>
                    {pkg.cityId === 'dubai' && currentCurrency !== 'USD' && (
                      <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold block">
                        (1,250 USD)
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 dark:text-slate-500 block">{t.packages.deposit30}</span>
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 tabular-nums">
                      {formatCurrency(Math.round(pkg.pricePerPersonKES * 0.3), currentCurrency)}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => onViewItinerary && onViewItinerary(pkg)}
                    className="py-2.5 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Clock className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>View Itinerary</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => onBookPackage(pkg)}
                    className="py-2.5 px-3 bg-emerald-700 dark:bg-emerald-600 hover:bg-emerald-800 dark:hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{t.packages.reservePackage}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
