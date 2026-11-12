import React, { useState } from 'react';
import { CityDestination, Currency, TourPackage } from '../types/tour';
import { formatCurrency } from '../utils/formatters';
import { X, Sparkles, Check, ArrowRight, Calendar, Info, Clock, Camera } from 'lucide-react';
import { OFFICIAL_TILL_NUMBER, TOUR_PACKAGES } from '../data/toursData';
import { useLanguage } from '../context/LanguageContext';
import { ItineraryViewer } from './ItineraryViewer';
import { DestinationWeatherWidget } from './DestinationWeatherWidget';
import { CityMasonryGallery } from './CityMasonryGallery';
import { CITY_GALLERY_IMAGES } from '../data/cityGalleryData';

interface CityDetailsModalProps {
  city: CityDestination | null;
  currentCurrency: Currency;
  onClose: () => void;
  onBookCity: (city: CityDestination) => void;
  onBookPackage?: (pkg: TourPackage) => void;
  onAskAiAboutPackage?: (pkgName: string) => void;
}

export const CityDetailsModal: React.FC<CityDetailsModalProps> = ({
  city,
  currentCurrency,
  onClose,
  onBookCity,
  onBookPackage,
  onAskAiAboutPackage,
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'itinerary' | 'overview' | 'gallery'>('itinerary');

  if (!city) return null;

  // Find matching packages for this city
  const cityPackages = TOUR_PACKAGES.filter(
    (p) => p.cityId === city.id || p.cityName.toLowerCase().includes(city.name.toLowerCase())
  );
  const primaryPackage = cityPackages.length > 0 ? cityPackages[0] : null;

  // Photos for this city
  const cityGalleryImages = CITY_GALLERY_IMAGES[city.id] || CITY_GALLERY_IMAGES.nairobi || [];

  const handleBooking = () => {
    onClose();
    if (primaryPackage && onBookPackage) {
      onBookPackage(primaryPackage);
    } else {
      onBookCity(city);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 relative my-6 animate-fadeIn flex flex-col max-h-[92vh]">
        {/* City Image Header */}
        <div className="relative aspect-21/9 sm:aspect-16/6 bg-slate-900 overflow-hidden shrink-0">
          <img
            src={city.image}
            alt={city.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent" />

          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-slate-900/70 hover:bg-slate-900 rounded-full text-white transition cursor-pointer z-10"
            aria-label={t.modals.close}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 sm:bottom-6 left-5 sm:left-8 right-5 sm:right-8 text-white">
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">
              <span>{city.country}</span>
              <span aria-hidden="true">·</span>
              <span>{city.region}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {city.duration}
              </span>
              <span aria-hidden="true">·</span>
              <span>Till {OFFICIAL_TILL_NUMBER}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              {city.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 mt-0.5 max-w-2xl line-clamp-1 sm:line-clamp-2">
              {city.tagline}
            </p>
          </div>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 shrink-0 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('itinerary')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'itinerary'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 dark:border-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Day-by-Day Itinerary</span>
            {cityPackages.length > 0 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-extrabold">
                {cityPackages.length} {cityPackages.length === 1 ? 'Tour' : 'Tours'}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'overview'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 dark:border-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <Info className="w-4 h-4" />
            <span>Highlights & Inclusions</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('gallery')}
            className={`px-4 py-2.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'gallery'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 dark:border-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>{t.modals.galleryTab}</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-extrabold">
              {cityGalleryImages.length}
            </span>
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
          {/* Live 3-Day Weather Forecast Widget */}
          <DestinationWeatherWidget
            cityId={city.id}
            cityName={city.name}
            countryName={city.country}
          />

          {activeTab === 'itinerary' && (
            /* Itinerary Viewer Component */
            <ItineraryViewer
              city={city}
              currentPackage={primaryPackage}
              availablePackages={cityPackages}
              currentCurrency={currentCurrency}
              onSelectPackage={(pkg) => {
                // Keep selected package
              }}
              onBookPackage={(pkg) => {
                onClose();
                if (onBookPackage) {
                  onBookPackage(pkg);
                } else {
                  onBookCity(city);
                }
              }}
              onAskAiAboutPackage={onAskAiAboutPackage}
            />
          )}

          {activeTab === 'gallery' && (
            /* Masonry-Style Image Gallery */
            <CityMasonryGallery
              cityId={city.id}
              cityName={city.name}
            />
          )}

          {activeTab === 'overview' && (
            /* City Overview & Inclusions */
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                  {t.modals.overview}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {city.description}
                </p>
              </div>

              {/* Photo Gallery Teaser Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50/70 via-slate-50 to-sky-50/40 dark:from-emerald-950/20 dark:via-slate-850 dark:to-slate-900 border border-emerald-200/80 dark:border-emerald-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3.5 w-full sm:w-auto">
                  <div className="flex -space-x-3 overflow-hidden shrink-0">
                    {cityGalleryImages.slice(0, 3).map((img) => (
                      <img
                        key={img.id}
                        src={img.url}
                        alt={img.title}
                        className="inline-block h-12 w-12 sm:h-14 sm:w-14 rounded-2xl object-cover ring-2 ring-white dark:ring-slate-900 shadow-sm"
                      />
                    ))}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      {city.name} Photography & Traveler Snaps
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {cityGalleryImages.length} high-resolution captures in masonry gallery
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('gallery')}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shrink-0 cursor-pointer shadow-xs"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>View Full Photo Gallery</span>
                </button>
              </div>

              {/* Top Highlights */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
                  {t.modals.highlights}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {city.topHighlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-100 dark:border-slate-700/60"
                    >
                      <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Best Time to Visit & Included Services */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/60 dark:bg-slate-800/40">
                  <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                    Best Time to Visit
                  </h4>
                  <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
                    {city.bestTimeToVisit}
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-slate-50/60 dark:bg-slate-800/40">
                  <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                    Booking & Payment
                  </h4>
                  <p className="text-xs font-medium text-slate-800 dark:text-slate-200">
                    Lipa Na M-Pesa Till 6608497 (SafariQuest Tours & Travel Ltd). 30% deposit secures booking.
                  </p>
                </div>
              </div>

              {/* Inclusions */}
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
                  {t.packages.inclusionsTitle}
                </h3>
                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  {city.includedItems.map((inc, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Pricing & Booking Call to Action */}
        <div className="p-5 sm:p-6 bg-slate-50 dark:bg-slate-900/95 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div>
            <span className="text-xs text-slate-500 dark:text-slate-400 block">{t.modals.startingFrom}</span>
            <div className="text-2xl font-black text-slate-900 dark:text-white tabular-nums flex items-baseline gap-2">
              <span>{formatCurrency(city.startingPriceKES, currentCurrency)}</span>
              {city.id === 'dubai' && currentCurrency !== 'USD' && (
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">(1,250 USD)</span>
              )}
            </div>
            <div className="text-xs text-emerald-800 dark:text-emerald-400 font-semibold">
              30% Deposit via Till {OFFICIAL_TILL_NUMBER}
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-initial px-5 py-2.5 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold rounded-xl text-xs transition cursor-pointer"
            >
              {t.modals.close}
            </button>
            <button
              type="button"
              onClick={handleBooking}
              className="flex-1 sm:flex-initial px-6 py-2.5 bg-emerald-700 dark:bg-emerald-600 hover:bg-emerald-800 dark:hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition shadow-sm cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{t.modals.bookCityTour} ({city.name})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
