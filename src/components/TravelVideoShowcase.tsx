import React, { useState } from 'react';
import { TravelVideo, TravelVideoCategory } from '../types/tour';
import { TRAVEL_VIDEOS } from '../data/travelVideosData';
import { VideoPlayerModal } from './VideoPlayerModal';
import { useLanguage } from '../context/LanguageContext';
import {
  Play,
  Film,
  Compass,
  Building,
  Palmtree,
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  Eye,
} from 'lucide-react';

interface TravelVideoShowcaseProps {
  onSelectPackage: (packageId: string) => void;
}

export const TravelVideoShowcase: React.FC<TravelVideoShowcaseProps> = ({
  onSelectPackage,
}) => {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<TravelVideoCategory>('all');
  const [activeVideoModal, setActiveVideoModal] = useState<TravelVideo | null>(null);

  // Filter videos based on category
  const filteredVideos =
    selectedCategory === 'all'
      ? TRAVEL_VIDEOS
      : TRAVEL_VIDEOS.filter((v) => v.category === selectedCategory);

  // Modal navigation index
  const currentModalIndex = activeVideoModal
    ? filteredVideos.findIndex((v) => v.id === activeVideoModal.id)
    : -1;

  const handlePreviousVideo = () => {
    if (currentModalIndex > 0) {
      setActiveVideoModal(filteredVideos[currentModalIndex - 1]);
    }
  };

  const handleNextVideo = () => {
    if (currentModalIndex < filteredVideos.length - 1) {
      setActiveVideoModal(filteredVideos[currentModalIndex + 1]);
    }
  };

  // Helper for localized text
  const getVideoTitle = (video: TravelVideo) => {
    if (language === 'sw') return video.titleSw;
    if (language === 'fr') return video.titleFr;
    return video.title;
  };

  const getVideoLocation = (video: TravelVideo) => {
    if (language === 'sw') return video.locationSw || video.location;
    if (language === 'fr') return video.locationFr || video.location;
    return video.location;
  };

  const getVideoDescription = (video: TravelVideo) => {
    if (language === 'sw') return video.descriptionSw;
    if (language === 'fr') return video.descriptionFr;
    return video.description;
  };

  const getCategoryBadgeLabel = (category: TravelVideo['category']) => {
    switch (category) {
      case 'game-park':
        return t.videos.categoryGameParks;
      case 'hotel':
        return t.videos.categoryHotels;
      case 'city':
        return t.videos.categoryCities;
      default:
        return t.videos.categoryAll;
    }
  };

  const getCategoryIcon = (category: TravelVideo['category']) => {
    switch (category) {
      case 'game-park':
        return <Compass className="w-3.5 h-3.5" />;
      case 'hotel':
        return <Palmtree className="w-3.5 h-3.5" />;
      case 'city':
        return <Building className="w-3.5 h-3.5" />;
      default:
        return <Film className="w-3.5 h-3.5" />;
    }
  };

  return (
    <section id="videos" className="py-16 md:py-24 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-2">
            <Film className="w-4 h-4" />
            <span>{t.videos.kicker}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            {t.videos.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300">
            {t.videos.subtitle}
          </p>

          {/* Category Filter Tabs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'all' as TravelVideoCategory, label: t.videos.categoryAll, icon: Film },
              { id: 'game-park' as TravelVideoCategory, label: t.videos.categoryGameParks, icon: Compass },
              { id: 'hotel' as TravelVideoCategory, label: t.videos.categoryHotels, icon: Palmtree },
              { id: 'city' as TravelVideoCategory, label: t.videos.categoryCities, icon: Building },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setSelectedCategory(tab.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-700 text-white shadow-md dark:bg-emerald-600'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                  {tab.id !== 'all' && (
                    <span
                      className={`text-[11px] px-1.5 py-0.2 rounded-md font-semibold ${
                        isActive
                          ? 'bg-emerald-800/60 text-white'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {TRAVEL_VIDEOS.filter((v) => v.category === tab.id).length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredVideos.map((video) => {
            const title = getVideoTitle(video);
            const location = getVideoLocation(video);
            const description = getVideoDescription(video);

            return (
              <div
                key={video.id}
                className="group relative bg-slate-50 dark:bg-slate-800/80 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col"
              >
                {/* Poster / Video Thumbnail Container */}
                <div
                  className="relative aspect-video w-full overflow-hidden bg-slate-900 cursor-pointer"
                  onClick={() => setActiveVideoModal(video)}
                >
                  <img
                    src={video.posterUrl}
                    alt={title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent group-hover:via-slate-950/40 transition-colors" />

                  {/* Category Pill Tag (top-left) */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-md text-white text-xs font-semibold shadow-xs">
                      {getCategoryIcon(video.category)}
                      <span>{getCategoryBadgeLabel(video.category)}</span>
                    </div>
                    {video.chapters && video.chapters.length > 0 && (
                      <span className="px-2 py-1 rounded-md bg-emerald-600/90 text-white text-[11px] font-bold tracking-wide shadow-xs flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-300" />
                        <span>Inside Tour</span>
                      </span>
                    )}
                  </div>

                  {/* Duration Tag (top-right) */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-md bg-black/75 backdrop-blur-md text-white text-xs font-bold tabular-nums">
                    <Clock className="w-3 h-3 text-emerald-400" />
                    <span>{video.duration}</span>
                  </div>

                  {/* Center Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-emerald-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-emerald-500 transition-all duration-200">
                      <Play className="w-6 h-6 ml-0.5 fill-current" />
                    </div>
                  </div>

                  {/* Bottom Stats & Location within Thumbnail */}
                  <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-white text-xs font-medium">
                    <span className="flex items-center gap-1 truncate text-slate-200">
                      <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{location}</span>
                    </span>
                    {video.viewsCount && (
                      <span className="flex items-center gap-1 text-slate-300 shrink-0 bg-black/40 px-1.5 py-0.5 rounded">
                        <Eye className="w-3 h-3" />
                        <span>{video.viewsCount}</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3
                      onClick={() => setActiveVideoModal(video)}
                      className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors cursor-pointer line-clamp-1"
                    >
                      {title}
                    </h3>

                    {/* Chapters badge preview for Inside Tour */}
                    {video.chapters && video.chapters.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-0.5">
                        <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                          Spaces:
                        </span>
                        {video.chapters.map((ch) => (
                          <span
                            key={ch.id}
                            className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/50"
                          >
                            {ch.tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                      {description}
                    </p>

                    {/* Highlights sneak peek */}
                    <div className="pt-2 flex items-center gap-1.5 text-xs text-emerald-800 dark:text-emerald-300 font-medium">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span className="truncate">
                        {video.highlights[0]}
                      </span>
                    </div>
                  </div>

                  {/* Card Bottom CTA Row */}
                  <div className="pt-4 mt-4 border-t border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveVideoModal(video)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300 cursor-pointer"
                    >
                      <span>{t.videos.watchReel}</span>
                      <Play className="w-3 h-3 fill-current" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onSelectPackage(video.relatedPackageId)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/80 text-emerald-800 dark:text-emerald-300 text-xs font-bold transition-colors cursor-pointer"
                    >
                      <span>{t.videos.quickBook}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Video Player Modal */}
      <VideoPlayerModal
        video={activeVideoModal}
        isOpen={Boolean(activeVideoModal)}
        onClose={() => setActiveVideoModal(null)}
        onBookTour={(pkgId) => {
          setActiveVideoModal(null);
          onSelectPackage(pkgId);
        }}
        onPrevious={handlePreviousVideo}
        onNext={handleNextVideo}
        hasPrevious={currentModalIndex > 0}
        hasNext={currentModalIndex < filteredVideos.length - 1}
      />
    </section>
  );
};
