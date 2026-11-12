import React, { useRef, useState, useEffect } from 'react';
import { TravelVideo } from '../types/tour';
import { useLanguage } from '../context/LanguageContext';
import {
  X,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Minimize2,
  MapPin,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Calendar,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react';
import { OFFICIAL_SUPPORT_PHONE } from '../data/toursData';

interface VideoPlayerModalProps {
  video: TravelVideo | null;
  isOpen: boolean;
  onClose: () => void;
  onBookTour: (packageId: string) => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  video,
  isOpen,
  onClose,
  onBookTour,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false,
}) => {
  const { language, t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [currentTimeFormatted, setCurrentTimeFormatted] = useState<string>('0:00');
  const [currentTimeSeconds, setCurrentTimeSeconds] = useState<number>(0);
  const [durationFormatted, setDurationFormatted] = useState<string>('0:00');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [hasEnded, setHasEnded] = useState<boolean>(false);
  const [videoError, setVideoError] = useState<boolean>(false);

  // Reset state when video changes or opens
  useEffect(() => {
    if (isOpen && video) {
      setIsPlaying(true);
      setHasEnded(false);
      setProgress(0);
      setVideoError(false);
      if (videoRef.current) {
        try {
          videoRef.current.currentTime = 0;
          videoRef.current.load();
          const playPromise = videoRef.current.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Autoplay with sound may be blocked by browser policy, fallback to muted
              if (videoRef.current) {
                videoRef.current.muted = true;
                setIsMuted(true);
                videoRef.current.play().catch(() => {
                  setIsPlaying(false);
                });
              }
            });
          }
        } catch {
          setIsPlaying(false);
        }
      }
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  }, [isOpen, video]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'ArrowLeft' && hasPrevious && onPrevious) {
        onPrevious();
      } else if (e.key === 'ArrowRight' && hasNext && onNext) {
        onNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isPlaying, hasPrevious, hasNext, onPrevious, onNext, onClose]);

  if (!isOpen || !video) return null;

  // Localized texts
  const localizedTitle =
    language === 'sw'
      ? video.titleSw
      : language === 'fr'
      ? video.titleFr
      : video.title;

  const localizedLocation =
    language === 'sw'
      ? video.locationSw || video.location
      : language === 'fr'
      ? video.locationFr || video.location
      : video.location;

  const localizedDescription =
    language === 'sw'
      ? video.descriptionSw
      : language === 'fr'
      ? video.descriptionFr
      : video.description;

  const localizedHighlights =
    language === 'sw'
      ? video.highlightsSw || video.highlights
      : language === 'fr'
      ? video.highlightsFr || video.highlights
      : video.highlights;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration || 1;
    setProgress((current / total) * 100);
    setCurrentTimeFormatted(formatTime(current));
    setCurrentTimeSeconds(current);
  };

  const handleJumpToChapter = (timestamp: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = timestamp;
    if (!isPlaying) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    }
  };

  const handleLoadedMetadata = () => {
    if (!videoRef.current) return;
    setDurationFormatted(formatTime(videoRef.current.duration));
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused || videoRef.current.ended) {
      videoRef.current.play();
      setIsPlaying(true);
      setHasEnded(false);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !videoRef.current.muted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const seekPercent = parseFloat(e.target.value);
    const seekTime = (seekPercent / 100) * (videoRef.current.duration || 0);
    videoRef.current.currentTime = seekTime;
    setProgress(seekPercent);
  };

  const handleRestart = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
    setHasEnded(false);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  const handleWhatsAppInquiry = () => {
    const rawNumber = OFFICIAL_SUPPORT_PHONE.replace(/\D/g, '');
    const cleanPhone = rawNumber.startsWith('0') ? `254${rawNumber.slice(1)}` : rawNumber;
    const text = encodeURIComponent(
      `Hello SafariQuest! I just watched your travel video of "${localizedTitle}" in ${localizedLocation}. I'd love to inquire about availability, hotel rates, and custom itineraries for my upcoming travel party.`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  const getCategoryLabel = (category: string) => {
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/70">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold tracking-wider uppercase text-emerald-800 dark:text-emerald-400">
              {t.videos.modalTitle}
            </span>
            <span className="text-slate-300 dark:text-slate-700">·</span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              {getCategoryLabel(video.category)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Quick Reel Navigation in top bar */}
            {hasPrevious && onPrevious && (
              <button
                type="button"
                onClick={onPrevious}
                title={t.videos.previousVideo}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            {hasNext && onNext && (
              <button
                type="button"
                onClick={onNext}
                title={t.videos.nextVideo}
                className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              aria-label={t.videos.closePlayer}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Main Content Layout: Video on left/top, Info details on right/bottom */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Video Player Column */}
          <div className="lg:col-span-7 bg-black relative flex flex-col justify-center items-center overflow-hidden min-h-[280px] sm:min-h-[380px] md:min-h-[440px]">
            <div ref={containerRef} className="relative w-full h-full flex items-center justify-center group">
              <video
                key={video.id}
                ref={videoRef}
                poster={video.posterUrl}
                playsInline
                muted={isMuted}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => {
                  setIsPlaying(false);
                  setHasEnded(true);
                }}
                onError={() => {
                  setVideoError(true);
                }}
                onClick={togglePlay}
                className="w-full h-full max-h-[520px] object-cover cursor-pointer"
              >
                <source src={video.videoUrl} type="video/mp4" />
                <source src="/videos/sample_reel.mp4" type="video/mp4" />
              </video>

              {/* Center Play/Replay Overlay when paused or ended */}
              {(!isPlaying || hasEnded || videoError) && (
                <div
                  onClick={hasEnded ? handleRestart : togglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] cursor-pointer transition-opacity"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-600/90 text-white flex items-center justify-center shadow-xl hover:scale-105 hover:bg-emerald-500 transition-transform">
                    {hasEnded ? (
                      <RotateCcw className="w-8 h-8" />
                    ) : (
                      <Play className="w-8 h-8 ml-1 fill-current" />
                    )}
                  </div>
                </div>
              )}

              {/* Bottom Custom Video Controls */}
              <div className="absolute bottom-0 inset-x-0 p-3 sm:p-4 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-2 transition-opacity opacity-100 sm:opacity-0 group-hover:opacity-100">
                {/* Timeline Scrubber */}
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="0.1"
                    value={progress}
                    onChange={handleSeek}
                    className="w-full h-1.5 bg-white/30 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-none"
                    aria-label="Video scrubber"
                  />
                </div>

                {/* Control Buttons Row */}
                <div className="flex items-center justify-between text-white text-xs font-medium">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={togglePlay}
                      className="p-1 hover:text-emerald-400 transition-colors cursor-pointer"
                      title={isPlaying ? 'Pause' : 'Play'}
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5 fill-current" />
                      ) : (
                        <Play className="w-5 h-5 fill-current" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={toggleMute}
                      className="p-1 hover:text-emerald-400 transition-colors cursor-pointer"
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? (
                        <VolumeX className="w-5 h-5" />
                      ) : (
                        <Volume2 className="w-5 h-5" />
                      )}
                    </button>

                    <span className="tabular-nums text-slate-300">
                      {currentTimeFormatted} / {durationFormatted || video.duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline-block text-[11px] text-slate-400 bg-white/10 px-2 py-0.5 rounded">
                      {video.viewsCount || '12.4k views'}
                    </span>
                    <button
                      type="button"
                      onClick={toggleFullscreen}
                      className="p-1 hover:text-emerald-400 transition-colors cursor-pointer"
                      title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                    >
                      {isFullscreen ? (
                        <Minimize2 className="w-4 h-4" />
                      ) : (
                        <Maximize2 className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Hotel Tour Spaces Bar (Reception, Rooms, Lodge, Hotel View) */}
            {video.chapters && video.chapters.length > 0 && (
              <div className="w-full bg-slate-950/95 border-t border-slate-800/80 p-3 z-10">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Hotel Tour Spaces · Click to Tour Inside</span>
                  </div>
                  <span className="text-[10px] text-slate-400 hidden sm:inline">
                    {currentTimeFormatted} of {video.duration}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {video.chapters.map((ch, idx) => {
                    const activeChapterIndex = video.chapters
                      ? video.chapters.reduce((latestIdx, item, i) => {
                          if (currentTimeSeconds >= item.timestamp) {
                            return i;
                          }
                          return latestIdx;
                        }, 0)
                      : -1;
                    const isActive = activeChapterIndex === idx;
                    const chName =
                      language === 'sw'
                        ? ch.nameSw || ch.name
                        : language === 'fr'
                        ? ch.nameFr || ch.name
                        : ch.name;
                    return (
                      <button
                        key={ch.id}
                        type="button"
                        onClick={() => handleJumpToChapter(ch.timestamp)}
                        className={`group/ch flex items-center gap-2 p-1.5 rounded-lg border text-left transition-all duration-150 cursor-pointer ${
                          isActive
                            ? 'bg-emerald-950 border-emerald-500 ring-1 ring-emerald-500 shadow-sm shadow-emerald-950'
                            : 'bg-slate-900/90 border-slate-800 hover:bg-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="relative w-10 h-8 rounded overflow-hidden shrink-0 bg-slate-800">
                          <img
                            src={ch.thumbnailUrl}
                            alt={chName}
                            className="w-full h-full object-cover group-hover/ch:scale-105 transition-transform"
                          />
                          {isActive && (
                            <span className="absolute inset-0 bg-emerald-500/20 ring-1 ring-inset ring-emerald-400" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <span
                            className={`block text-[9px] font-black uppercase tracking-wider ${
                              isActive ? 'text-emerald-400' : 'text-slate-400'
                            }`}
                          >
                            {ch.tag}
                          </span>
                          <span
                            className={`block text-[11px] font-semibold truncate ${
                              isActive ? 'text-white' : 'text-slate-300'
                            }`}
                          >
                            {chName}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Details & Action Column */}
          <div className="lg:col-span-5 p-5 sm:p-6 md:p-7 flex flex-col justify-between bg-white dark:bg-slate-900 border-t lg:border-t-0 lg:border-l border-slate-100 dark:border-slate-800">
            <div className="space-y-4">
              {/* Location & Duration Badges */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
                <span className="inline-flex items-center gap-1 text-emerald-800 dark:text-emerald-300">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{localizedLocation}</span>
                </span>
                <span className="text-slate-300 dark:text-slate-700">·</span>
                <span className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400">
                  <Clock className="w-3.5 h-3.5 shrink-0" />
                  <span>{video.duration}</span>
                </span>
              </div>

              {/* Video Title */}
              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
                {localizedTitle}
              </h3>

              {/* Hotel Tour Inside Spaces Spec Card (if chapters exist) */}
              {video.chapters && video.chapters.length > 0 && (
                <div className="p-3.5 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 space-y-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Tour Inside Highlights</span>
                    </span>
                    <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono">
                      4 Spaces
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-700 dark:text-slate-300">
                    <div className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                      <span><strong>Reception:</strong> Teak concierge & welcome hall</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                      <span><strong>Rooms:</strong> Canopy suite & balcony tub</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                      <span><strong>Lodge:</strong> Stone fireplace & dining</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1 shrink-0" />
                      <span><strong>View:</strong> Sunset infinity pool & savanna</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Description */}
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {localizedDescription}
              </p>

              {/* Highlights checklist */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>{t.videos.highlightsTitle}</span>
                </h4>
                <ul className="space-y-2">
                  {localizedHighlights.map((highlight, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tags */}
              {video.tags && video.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {video.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] font-medium text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBookTour(video.relatedPackageId);
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition-colors cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>{t.videos.quickBook}</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsAppInquiry}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-semibold text-sm transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
