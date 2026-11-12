import React, { useState, useEffect } from 'react';
import { CityGalleryImage, CITY_GALLERY_IMAGES } from '../data/cityGalleryData';
import { useLanguage } from '../context/LanguageContext';
import {
  Heart,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  MapPin,
  Sparkles,
  Share2,
  MessageCircle,
  Compass,
  Building,
  Users,
  UtensilsCrossed,
} from 'lucide-react';
import { OFFICIAL_SUPPORT_PHONE } from '../data/toursData';

interface CityMasonryGalleryProps {
  cityId: string;
  cityName: string;
}

export const CityMasonryGallery: React.FC<CityMasonryGalleryProps> = ({
  cityId,
  cityName,
}) => {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightboxImage, setActiveLightboxImage] = useState<CityGalleryImage | null>(null);
  const [likedImageIds, setLikedImageIds] = useState<Record<string, boolean>>({});
  const [likesCountDelta, setLikesCountDelta] = useState<Record<string, number>>({});

  // Fetch images for this city (with fallback to nairobi if city has no gallery)
  const cityImages = CITY_GALLERY_IMAGES[cityId] || CITY_GALLERY_IMAGES.nairobi || [];

  // Filter images based on selected category
  const filteredImages =
    selectedCategory === 'all'
      ? cityImages
      : cityImages.filter((img) => img.category === selectedCategory);

  // Lightbox carousel index
  const currentLightboxIndex = activeLightboxImage
    ? filteredImages.findIndex((img) => img.id === activeLightboxImage.id)
    : -1;

  const handlePrevious = () => {
    if (currentLightboxIndex > 0) {
      setActiveLightboxImage(filteredImages[currentLightboxIndex - 1]);
    }
  };

  const handleNext = () => {
    if (currentLightboxIndex < filteredImages.length - 1) {
      setActiveLightboxImage(filteredImages[currentLightboxIndex + 1]);
    }
  };

  // Keyboard controls for Lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeLightboxImage) return;
      if (e.key === 'Escape') {
        setActiveLightboxImage(null);
      } else if (e.key === 'ArrowLeft' && currentLightboxIndex > 0) {
        handlePrevious();
      } else if (e.key === 'ArrowRight' && currentLightboxIndex < filteredImages.length - 1) {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxImage, currentLightboxIndex, filteredImages]);

  // Toggle image like
  const handleToggleLike = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setLikedImageIds((prev) => {
      const isCurrentlyLiked = !!prev[id];
      const nextLiked = !isCurrentlyLiked;
      setLikesCountDelta((deltaPrev) => ({
        ...deltaPrev,
        [id]: (deltaPrev[id] || 0) + (nextLiked ? 1 : -1),
      }));
      return { ...prev, [id]: nextLiked };
    });
  };

  // Localized text helpers
  const getImageTitle = (img: CityGalleryImage) => {
    if (language === 'sw') return img.titleSw || img.title;
    if (language === 'fr') return img.titleFr || img.title;
    return img.title;
  };

  const getImageCaption = (img: CityGalleryImage) => {
    if (language === 'sw') return img.captionSw || img.caption;
    if (language === 'fr') return img.captionFr || img.caption;
    return img.caption;
  };

  const getCategoryIcon = (category: CityGalleryImage['category']) => {
    switch (category) {
      case 'wildlife':
        return <Compass className="w-3.5 h-3.5 text-amber-500" />;
      case 'sights':
        return <Building className="w-3.5 h-3.5 text-emerald-500" />;
      case 'culture':
        return <UtensilsCrossed className="w-3.5 h-3.5 text-indigo-500" />;
      case 'travelers':
        return <Users className="w-3.5 h-3.5 text-sky-500" />;
      default:
        return <Camera className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  const handleShareWhatsApp = () => {
    const rawNumber = OFFICIAL_SUPPORT_PHONE.replace(/\D/g, '');
    const cleanPhone = rawNumber.startsWith('0') ? `254${rawNumber.slice(1)}` : rawNumber;
    const msg = encodeURIComponent(
      `Hello SafariQuest! I'd like to submit my travel photos from ${cityName} to be featured in the official tour gallery. Here is my Till payment receipt #6608497.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-6">
      {/* Gallery Header & Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
            <Camera className="w-4 h-4" />
            <span>{t.modals.galleryKicker}</span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
            {t.modals.galleryTitle}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-0.5">
            {cityName} · {cityImages.length} {t.modals.photosCount}
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
          {[
            { id: 'all', label: t.modals.filterAll },
            { id: 'wildlife', label: t.modals.filterWildlife },
            { id: 'sights', label: t.modals.filterSights },
            { id: 'culture', label: t.modals.filterCulture },
            { id: 'travelers', label: t.modals.filterTravelers },
          ].map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-700 text-white shadow-xs dark:bg-emerald-600'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Masonry Image Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
        {filteredImages.map((img) => {
          const isLiked = !!likedImageIds[img.id];
          const totalLikes = img.likesCount + (likesCountDelta[img.id] || 0);
          const title = getImageTitle(img);
          const caption = getImageCaption(img);

          return (
            <div
              key={img.id}
              className="break-inside-avoid mb-4 group relative rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/90 dark:border-slate-750 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => setActiveLightboxImage(img)}
            >
              {/* Photo Image */}
              <div className="relative overflow-hidden">
                <img
                  src={img.url}
                  alt={title}
                  loading="lazy"
                  className={`w-full object-cover group-hover:scale-105 transition-transform duration-500 ${
                    img.aspectRatio === 'tall'
                      ? 'aspect-3/4'
                      : img.aspectRatio === 'square'
                      ? 'aspect-square'
                      : 'aspect-4/3'
                  }`}
                />

                {/* Gradient vignette on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-3.5 text-white" />

                {/* Top Overlay Badges */}
                <div className="absolute top-3 inset-x-3 flex items-center justify-between pointer-events-none">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-slate-950/75 backdrop-blur-md text-[11px] font-semibold text-white shadow-xs">
                    {getCategoryIcon(img.category)}
                    <span className="capitalize">{img.category}</span>
                  </span>

                  <button
                    type="button"
                    onClick={(e) => handleToggleLike(img.id, e)}
                    className={`pointer-events-auto p-1.5 rounded-full backdrop-blur-md transition-transform active:scale-90 cursor-pointer ${
                      isLiked
                        ? 'bg-rose-500 text-white'
                        : 'bg-slate-950/60 text-white hover:bg-slate-950/80 hover:text-rose-400'
                    }`}
                    title={isLiked ? 'Liked' : 'Like Photo'}
                    aria-label="Like photo"
                  >
                    <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                  </button>
                </div>

                {/* Bottom Overlay Info (Visible on hover & mobile) */}
                <div className="absolute bottom-3 inset-x-3 text-white pointer-events-none transition-all">
                  <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-400 mb-0.5 truncate">
                    <MapPin className="w-3 h-3 shrink-0" />
                    <span className="truncate">{img.location}</span>
                  </div>

                  <h4 className="text-sm font-extrabold tracking-tight leading-snug drop-shadow-sm line-clamp-1">
                    {title}
                  </h4>

                  <p className="text-[11px] text-slate-200 line-clamp-2 mt-0.5 opacity-90 drop-shadow-xs">
                    {caption}
                  </p>

                  <div className="pt-2 mt-2 border-t border-white/20 flex items-center justify-between text-[10px] text-slate-300 font-medium">
                    <span className="truncate">{img.travelerName}</span>
                    <span className="flex items-center gap-1 shrink-0 tabular-nums">
                      <Heart className={`w-3 h-3 ${isLiked ? 'text-rose-400 fill-current' : ''}`} />
                      <span>{totalLikes}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Traveler Photo Submission Callout Banner */}
      <div className="rounded-2xl border border-dashed border-emerald-300 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/20 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3.5">
          <div className="p-2.5 rounded-xl bg-emerald-600 text-white shrink-0 mt-0.5">
            <Camera className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              {t.modals.sharePhotosTitle}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              {t.modals.sharePhotosDesc}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleShareWhatsApp}
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-xs flex items-center justify-center gap-2 shrink-0 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{t.modals.shareOnWhatsApp}</span>
        </button>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxImage && (
        <div
          className="fixed inset-0 z-60 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
          onClick={() => setActiveLightboxImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-800 shadow-2xl flex flex-col my-auto max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top controls */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-slate-950/80 text-white">
              <div className="flex items-center gap-2 text-xs">
                <span className="font-bold text-emerald-400">{cityName}</span>
                <span className="text-slate-600">·</span>
                <span className="text-slate-300 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  {activeLightboxImage.location}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleToggleLike(activeLightboxImage.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition cursor-pointer ${
                    likedImageIds[activeLightboxImage.id]
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      likedImageIds[activeLightboxImage.id] ? 'fill-current' : ''
                    }`}
                  />
                  <span>
                    {activeLightboxImage.likesCount +
                      (likesCountDelta[activeLightboxImage.id] || 0)}
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveLightboxImage(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                  aria-label="Close photo"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Lightbox Media Container */}
            <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[300px] sm:min-h-[460px]">
              <img
                src={activeLightboxImage.url}
                alt={getImageTitle(activeLightboxImage)}
                className="max-h-[65vh] w-auto max-w-full object-contain"
              />

              {/* Prev button */}
              {currentLightboxIndex > 0 && (
                <button
                  type="button"
                  onClick={handlePrevious}
                  className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-white transition cursor-pointer backdrop-blur-xs"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}

              {/* Next button */}
              {currentLightboxIndex < filteredImages.length - 1 && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-950/60 hover:bg-slate-950/90 text-white transition cursor-pointer backdrop-blur-xs"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </div>

            {/* Bottom Caption & Credit bar */}
            <div className="p-4 sm:p-5 bg-slate-950 border-t border-slate-800 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-base font-extrabold text-white">
                  {getImageTitle(activeLightboxImage)}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 mt-0.5 leading-relaxed">
                  {getImageCaption(activeLightboxImage)}
                </p>
                <div className="mt-1 text-[11px] text-slate-400">
                  <span>{t.modals.capturedBy} </span>
                  <strong className="text-emerald-400">{activeLightboxImage.travelerName}</strong>
                  <span> · {activeLightboxImage.date}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0 text-xs text-slate-400 font-mono">
                <span>
                  {currentLightboxIndex + 1} / {filteredImages.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
