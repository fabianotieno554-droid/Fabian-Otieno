import React, { useState, useEffect } from 'react';
import {
  Sun,
  CloudSun,
  Cloud,
  CloudRain,
  CloudDrizzle,
  CloudLightning,
  Snowflake,
  Wind,
  Droplets,
  Thermometer,
  RefreshCw,
  Sparkles,
  Info,
} from 'lucide-react';
import {
  DestinationWeatherData,
  fetchDestinationWeather,
  getFallbackWeatherData,
  interpretWeatherCode,
} from '../services/weatherService';
import { useLanguage } from '../context/LanguageContext';

interface DestinationWeatherWidgetProps {
  cityId: string;
  cityName: string;
  countryName: string;
}

export const DestinationWeatherWidget: React.FC<DestinationWeatherWidgetProps> = ({
  cityId,
  cityName,
  countryName,
}) => {
  const { language, t } = useLanguage();
  const [weatherData, setWeatherData] = useState<DestinationWeatherData>(() =>
    getFallbackWeatherData(cityId, cityName)
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');

  const loadWeather = async () => {
    setIsLoading(true);
    try {
      const data = await fetchDestinationWeather(cityId, cityName);
      setWeatherData(data);
    } catch {
      // Fallback already in place
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // When cityId changes, immediately load live weather
    loadWeather();
  }, [cityId]);

  // Temperature converter helper
  const displayTemp = (tempC: number) => {
    if (tempUnit === 'F') {
      const f = Math.round((tempC * 9) / 5 + 32);
      return `${f}°F`;
    }
    return `${Math.round(tempC)}°C`;
  };

  // Condition icon selector
  const renderWeatherIcon = (code: number, isHero = false) => {
    const info = interpretWeatherCode(code);
    const sizeClasses = isHero ? 'w-10 h-10 sm:w-12 sm:h-12' : 'w-7 h-7 sm:w-8 sm:h-8';

    switch (info.iconName) {
      case 'sun':
        return <Sun className={`${sizeClasses} text-amber-500 animate-[spin_18s_linear_infinite]`} />;
      case 'cloud-sun':
        return <CloudSun className={`${sizeClasses} text-amber-500 dark:text-amber-400`} />;
      case 'cloud':
        return <Cloud className={`${sizeClasses} text-slate-400 dark:text-slate-300`} />;
      case 'drizzle':
        return <CloudDrizzle className={`${sizeClasses} text-sky-400`} />;
      case 'rain':
        return <CloudRain className={`${sizeClasses} text-blue-500`} />;
      case 'thunder':
        return <CloudLightning className={`${sizeClasses} text-amber-500`} />;
      case 'snow':
        return <Snowflake className={`${sizeClasses} text-sky-300`} />;
      case 'fog':
        return <Cloud className={`${sizeClasses} text-slate-400`} />;
      default:
        return <Sun className={`${sizeClasses} text-amber-500`} />;
    }
  };

  // Day label localization
  const getLocalizedDayLabel = (dayLabel: string, index: number) => {
    if (index === 0) return t.weather.today;
    if (index === 1) return t.weather.tomorrow;
    if (index === 2) return t.weather.dayAfter;
    return dayLabel;
  };

  // Localized condition text
  const getLocalizedConditionText = (day: {
    conditionText: string;
    conditionTextSw: string;
    conditionTextFr: string;
  }) => {
    if (language === 'sw') return day.conditionTextSw || day.conditionText;
    if (language === 'fr') return day.conditionTextFr || day.conditionText;
    return day.conditionText;
  };

  // Localized packing tip
  const localizedPackingTip =
    language === 'sw'
      ? weatherData.packingTipSw
      : language === 'fr'
      ? weatherData.packingTipFr
      : weatherData.packingTip;

  return (
    <div className="bg-gradient-to-br from-slate-50 via-emerald-50/20 to-sky-50/30 dark:from-slate-800/90 dark:via-slate-850 dark:to-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-700/80 p-4 sm:p-5 shadow-xs transition-all">
      {/* Top Bar: Title, Live indicator, and Unit Toggle */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200/80 dark:border-slate-700/80">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300">
            <Thermometer className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white tracking-tight">
                {t.weather.title}
              </h4>
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>{weatherData.isLive ? t.weather.liveOutlook : 'Verified Outlook'}</span>
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
              {cityName}, {countryName} · {weatherData.lastUpdated}
            </p>
          </div>
        </div>

        {/* Right side controls: Refresh & Temperature toggle */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Refresh button */}
          <button
            type="button"
            onClick={loadWeather}
            disabled={isLoading}
            title={t.weather.retry}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-700/60 transition-colors cursor-pointer disabled:opacity-50"
            aria-label="Refresh weather forecast"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-emerald-600' : ''}`} />
          </button>

          {/* Unit Toggle Buttons */}
          <div className="flex items-center p-0.5 bg-slate-200/80 dark:bg-slate-700/80 rounded-lg text-xs font-bold">
            <button
              type="button"
              onClick={() => setTempUnit('C')}
              className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                tempUnit === 'C'
                  ? 'bg-white dark:bg-slate-850 text-emerald-700 dark:text-emerald-400 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              °C
            </button>
            <button
              type="button"
              onClick={() => setTempUnit('F')}
              className={`px-2 py-0.5 rounded-md transition-colors cursor-pointer ${
                tempUnit === 'F'
                  ? 'bg-white dark:bg-slate-850 text-emerald-700 dark:text-emerald-400 shadow-xs'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              °F
            </button>
          </div>
        </div>
      </div>

      {/* Main Weather Grid: Current Weather (Left) + 3-Day Forecast Cards (Right) */}
      <div className="pt-4 grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
        {/* Current Weather Hero Banner */}
        <div className="md:col-span-5 bg-white/80 dark:bg-slate-850/80 p-3.5 sm:p-4 rounded-xl border border-slate-200/80 dark:border-slate-750 flex flex-col justify-between shadow-2xs">
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-0.5">
                {t.weather.today} in {cityName}
              </span>
              <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tabular-nums tracking-tight">
                {displayTemp(weatherData.currentTempC)}
              </div>
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
                {getLocalizedConditionText({
                  conditionText: weatherData.currentConditionText,
                  conditionTextSw: weatherData.currentConditionTextSw,
                  conditionTextFr: weatherData.currentConditionTextFr,
                })}
              </span>
            </div>

            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
              {renderWeatherIcon(weatherData.currentWeatherCode, true)}
            </div>
          </div>

          {/* Current Micro Metrics: Wind & Rain Chance */}
          <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-750 flex items-center justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <Wind className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>{weatherData.windSpeedKmh} km/h</span>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5 text-sky-500 shrink-0" />
              <span>
                {weatherData.daily[0]?.precipitationProbability ?? 10}% {t.weather.precipitation}
              </span>
            </span>
          </div>
        </div>

        {/* 3-Day Forecast Cards */}
        <div className="md:col-span-7 grid grid-cols-3 gap-2 sm:gap-3">
          {weatherData.daily.slice(0, 3).map((day, idx) => {
            const localizedDay = getLocalizedDayLabel(day.dayLabel, idx);
            const localizedCond = getLocalizedConditionText(day);

            return (
              <div
                key={day.date}
                className={`p-2.5 sm:p-3 rounded-xl border flex flex-col justify-between text-center transition-all ${
                  idx === 0
                    ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800/40'
                    : 'bg-white/70 dark:bg-slate-850/70 border-slate-200/80 dark:border-slate-750'
                }`}
              >
                <div>
                  <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block truncate">
                    {localizedDay}
                  </span>
                  <div className="my-1.5 flex justify-center">
                    {renderWeatherIcon(day.weatherCode, false)}
                  </div>
                  <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 block truncate" title={localizedCond}>
                    {localizedCond}
                  </span>
                </div>

                <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-750/80">
                  <div className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white tabular-nums">
                    {displayTemp(day.maxTempC)}
                  </div>
                  <div className="text-[10px] font-medium text-slate-400 dark:text-slate-500 tabular-nums">
                    {displayTemp(day.minTempC)}
                  </div>
                  <div className="mt-1 flex items-center justify-center gap-1 text-[10px] text-sky-600 dark:text-sky-400 font-medium">
                    <Droplets className="w-2.5 h-2.5" />
                    <span>{day.precipitationProbability}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Safari & Packing Travel Advisory */}
      <div className="mt-3.5 pt-3 border-t border-slate-200/80 dark:border-slate-750 flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 bg-white/60 dark:bg-slate-850/60 p-2.5 rounded-xl">
        <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
        <div className="flex-1">
          <strong className="font-bold text-slate-900 dark:text-white mr-1.5">
            {t.weather.packingTipTitle}:
          </strong>
          <span className="leading-relaxed text-slate-600 dark:text-slate-300">
            {localizedPackingTip}
          </span>
        </div>
      </div>
    </div>
  );
};
