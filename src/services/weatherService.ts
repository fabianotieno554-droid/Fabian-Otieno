export interface DailyForecast {
  date: string;
  dayLabel: string;
  weatherCode: number;
  conditionText: string;
  conditionTextSw: string;
  conditionTextFr: string;
  maxTempC: number;
  minTempC: number;
  precipitationProbability: number;
  windSpeedKmh: number;
}

export interface DestinationWeatherData {
  cityId: string;
  cityName: string;
  currentTempC: number;
  feelsLikeC: number;
  currentWeatherCode: number;
  currentConditionText: string;
  currentConditionTextSw: string;
  currentConditionTextFr: string;
  windSpeedKmh: number;
  isDay: boolean;
  daily: DailyForecast[];
  packingTip: string;
  packingTipSw: string;
  packingTipFr: string;
  lastUpdated: string;
  isLive: boolean;
}

interface DestinationGeo {
  lat: number;
  lon: number;
  timezone: string;
  defaultPackingTip: string;
  defaultPackingTipSw: string;
  defaultPackingTipFr: string;
  fallbackCurrentTemp: number;
  fallbackWeatherCode: number;
  fallbackDaily: Array<{
    code: number;
    max: number;
    min: number;
    rainProb: number;
    wind: number;
  }>;
}

export const DESTINATION_GEOS: Record<string, DestinationGeo> = {
  nairobi: {
    lat: -1.286389,
    lon: 36.817223,
    timezone: 'Africa/Nairobi',
    defaultPackingTip: 'Chilly morning game drives (bring fleece jacket or windbreaker). Sunny afternoons require wide-brim hat & sunglasses.',
    defaultPackingTipSw: 'Asubuhi kuna baridi mbugani (beba sweta au koti jepesi). Mchana kuna jua, beba kofia na miwani ya jua.',
    defaultPackingTipFr: 'Matinées fraîches en safari (prévoyez polaire ou coupe-vent). Après-midis ensoleillés : chapeau et lunettes de soleil.',
    fallbackCurrentTemp: 24,
    fallbackWeatherCode: 1, // Mainly clear
    fallbackDaily: [
      { code: 1, max: 25, min: 14, rainProb: 15, wind: 14 },
      { code: 2, max: 26, min: 15, rainProb: 10, wind: 12 },
      { code: 0, max: 27, min: 14, rainProb: 5, wind: 15 },
    ],
  },
  mombasa: {
    lat: -4.0435,
    lon: 39.6682,
    timezone: 'Africa/Nairobi',
    defaultPackingTip: 'Warm tropical beach climate. Pack lightweight cotton clothing, reef-safe sunscreen SPF 50+, swimwear, and sandals.',
    defaultPackingTipSw: 'Hali ya hewa ya joto na pwani. Beba nguo nyepesi za pamba, mafuta ya jua, nguo za kuogelea na viatu vya wazi.',
    defaultPackingTipFr: 'Climat tropical chaud. Vêtements légers en coton, crème solaire SPF 50+ respectueuse des coraux, maillots de bain.',
    fallbackCurrentTemp: 30,
    fallbackWeatherCode: 0, // Clear sky
    fallbackDaily: [
      { code: 0, max: 31, min: 24, rainProb: 10, wind: 18 },
      { code: 1, max: 31, min: 25, rainProb: 20, wind: 20 },
      { code: 2, max: 30, min: 24, rainProb: 15, wind: 16 },
    ],
  },
  zanzibar: {
    lat: -6.1659,
    lon: 39.2026,
    timezone: 'Africa/Dar_es_Salaam',
    defaultPackingTip: 'Balmy Indian Ocean warmth. Modest light clothing for Stone Town cultural tours, plus snorkeling gear and sandals.',
    defaultPackingTipSw: 'Upepo mwanana wa Bahari ya Hindi. Nguo za heshima za kawaida za mitaa ya Stone Town, miwani na mavazi ya ufukweni.',
    defaultPackingTipFr: 'Douceur océane tropicale. Tenues légères et respectueuses pour Stone Town, matériel de snorkeling et sandales.',
    fallbackCurrentTemp: 29,
    fallbackWeatherCode: 1,
    fallbackDaily: [
      { code: 1, max: 30, min: 24, rainProb: 15, wind: 19 },
      { code: 2, max: 29, min: 23, rainProb: 25, wind: 17 },
      { code: 0, max: 30, min: 24, rainProb: 10, wind: 16 },
    ],
  },
  capetown: {
    lat: -33.9249,
    lon: 18.4241,
    timezone: 'Africa/Johannesburg',
    defaultPackingTip: 'Atlantic coastal breezes and rapid mountain shifts. Dress in layers; bring a sturdy windproof jacket for Table Mountain.',
    defaultPackingTipSw: 'Upepo wa pwani ya Atlantiki. Vaa nguo za tabaka (layers); beba koti imara la kuzuia upepo kwa ajili ya Table Mountain.',
    defaultPackingTipFr: 'Brises vivifiantes de l’Atlantique. Habillez-vous en couches ; prévoyez veste coupe-vent pour Table Mountain.',
    fallbackCurrentTemp: 21,
    fallbackWeatherCode: 2,
    fallbackDaily: [
      { code: 2, max: 22, min: 14, rainProb: 20, wind: 26 },
      { code: 1, max: 24, min: 15, rainProb: 10, wind: 22 },
      { code: 0, max: 25, min: 16, rainProb: 5, wind: 18 },
    ],
  },
  dubai: {
    lat: 25.2048,
    lon: 55.2708,
    timezone: 'Asia/Dubai',
    defaultPackingTip: 'Sunny desert days with strong UV. High SPF sunblock, UV sunglasses, and breathable linen or cotton are essential.',
    defaultPackingTipSw: 'Jua kali la jangwani na mionzi ya UV. Beba mafuta ya kujikinga na jua, miwani meusi na mavazi mepesi ya pamba.',
    defaultPackingTipFr: 'Soleil radieux et indice UV élevé. Crème solaire haute protection, lunettes polarisées et tissus respirants en lin.',
    fallbackCurrentTemp: 32,
    fallbackWeatherCode: 0,
    fallbackDaily: [
      { code: 0, max: 34, min: 23, rainProb: 0, wind: 16 },
      { code: 0, max: 35, min: 24, rainProb: 0, wind: 18 },
      { code: 1, max: 33, min: 23, rainProb: 0, wind: 15 },
    ],
  },
  miami: {
    lat: 25.7617,
    lon: -80.1918,
    timezone: 'America/New_York',
    defaultPackingTip: 'Tropical warmth and ocean breezes. Carry a compact umbrella for sudden brief showers, plus swimwear and beach hats.',
    defaultPackingTipSw: 'Joto la kitropiki na upepo wa bahari. Beba mwavuli mdogo kwa ajili ya mvua fupi za ghafla, na mavazi ya ufukwe.',
    defaultPackingTipFr: 'Chaleur tropicale et brises côtières. Petit parapluie pour les averses passagères, tenues de plage et chapeau.',
    fallbackCurrentTemp: 27,
    fallbackWeatherCode: 1,
    fallbackDaily: [
      { code: 1, max: 28, min: 21, rainProb: 30, wind: 20 },
      { code: 2, max: 29, min: 22, rainProb: 25, wind: 18 },
      { code: 80, max: 27, min: 21, rainProb: 45, wind: 22 },
    ],
  },
  tokyo: {
    lat: 35.6762,
    lon: 139.6503,
    timezone: 'Asia/Tokyo',
    defaultPackingTip: 'Temperate urban walking conditions. Comfortable sneakers for high step counts, and a stylish light coat or cardigan.',
    defaultPackingTipSw: 'Hali ya hewa nzuri ya kutembea mijini. Viatu vya michezo vya starehe kwa ajili ya matembezi, na sweta au koti jepesi.',
    defaultPackingTipFr: 'Idéal pour explorer la ville à pied. Bonnes baskets de marche et veste légère ou cardigan pour les soirées fraîches.',
    fallbackCurrentTemp: 19,
    fallbackWeatherCode: 2,
    fallbackDaily: [
      { code: 2, max: 21, min: 13, rainProb: 20, wind: 14 },
      { code: 0, max: 22, min: 14, rainProb: 10, wind: 12 },
      { code: 61, max: 18, min: 12, rainProb: 60, wind: 16 },
    ],
  },
};

export interface WeatherConditionInfo {
  name: string;
  nameSw: string;
  nameFr: string;
  iconName: 'sun' | 'cloud-sun' | 'cloud' | 'drizzle' | 'rain' | 'thunder' | 'snow' | 'fog';
}

export function interpretWeatherCode(code: number): WeatherConditionInfo {
  if (code === 0) {
    return {
      name: 'Clear & Sunny',
      nameSw: 'Anga Safi & Jua',
      nameFr: 'Ensoleillé & Dégagé',
      iconName: 'sun',
    };
  }
  if (code === 1 || code === 2) {
    return {
      name: 'Partly Cloudy',
      nameSw: 'Mawingu Kiasi',
      nameFr: 'Partiellement Nuageux',
      iconName: 'cloud-sun',
    };
  }
  if (code === 3) {
    return {
      name: 'Overcast',
      nameSw: 'Mawingu Mazito',
      nameFr: 'Couvert',
      iconName: 'cloud',
    };
  }
  if (code === 45 || code === 48) {
    return {
      name: 'Mist & Fog',
      nameSw: 'Ukungu',
      nameFr: 'Brouillard & Brume',
      iconName: 'fog',
    };
  }
  if (code >= 51 && code <= 57) {
    return {
      name: 'Light Drizzle',
      nameSw: 'Manyunyu ya Mvua',
      nameFr: 'Bruine Légère',
      iconName: 'drizzle',
    };
  }
  if ((code >= 61 && code <= 67) || (code >= 80 && code <= 82)) {
    return {
      name: 'Rain Showers',
      nameSw: 'Mvua ya Vipindi',
      nameFr: 'Averses de Pluie',
      iconName: 'rain',
    };
  }
  if (code >= 71 && code <= 77) {
    return {
      name: 'Light Snow',
      nameSw: 'Theluji',
      nameFr: 'Chutes de Neige',
      iconName: 'snow',
    };
  }
  if (code >= 95 && code <= 99) {
    return {
      name: 'Thunderstorm',
      nameSw: 'Ngurumo na Radi',
      nameFr: 'Orage',
      iconName: 'thunder',
    };
  }
  return {
    name: 'Fair Weather',
    nameSw: 'Hali Nzuri',
    nameFr: 'Temps Agréable',
    iconName: 'cloud-sun',
  };
}

/**
 * Build fallback weather data for immediate render or network failure
 */
export function getFallbackWeatherData(cityId: string, cityName: string): DestinationWeatherData {
  const geo = DESTINATION_GEOS[cityId] || DESTINATION_GEOS.nairobi;
  const now = new Date();

  const currentCondition = interpretWeatherCode(geo.fallbackWeatherCode);

  const daily: DailyForecast[] = geo.fallbackDaily.map((item, index) => {
    const forecastDate = new Date(now);
    forecastDate.setDate(now.getDate() + index);

    const condition = interpretWeatherCode(item.code);
    let dayLabel = 'Today';
    if (index === 1) dayLabel = 'Tomorrow';
    else if (index === 2) {
      dayLabel = forecastDate.toLocaleDateString('en-US', { weekday: 'short' });
    }

    return {
      date: forecastDate.toISOString().split('T')[0],
      dayLabel,
      weatherCode: item.code,
      conditionText: condition.name,
      conditionTextSw: condition.nameSw,
      conditionTextFr: condition.nameFr,
      maxTempC: item.max,
      minTempC: item.min,
      precipitationProbability: item.rainProb,
      windSpeedKmh: item.wind,
    };
  });

  return {
    cityId,
    cityName,
    currentTempC: geo.fallbackCurrentTemp,
    feelsLikeC: geo.fallbackCurrentTemp + 1,
    currentWeatherCode: geo.fallbackWeatherCode,
    currentConditionText: currentCondition.name,
    currentConditionTextSw: currentCondition.nameSw,
    currentConditionTextFr: currentCondition.nameFr,
    windSpeedKmh: 14,
    isDay: true,
    daily,
    packingTip: geo.defaultPackingTip,
    packingTipSw: geo.defaultPackingTipSw,
    packingTipFr: geo.defaultPackingTipFr,
    lastUpdated: 'Just now',
    isLive: false,
  };
}

/**
 * Fetches real 3-day meteorological forecast from Open-Meteo
 */
export async function fetchDestinationWeather(
  cityId: string,
  cityName: string
): Promise<DestinationWeatherData> {
  const geo = DESTINATION_GEOS[cityId] || DESTINATION_GEOS.nairobi;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4500);

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${geo.lat}&longitude=${geo.lon}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max,windspeed_10m_max&current_weather=true&timezone=${encodeURIComponent(geo.timezone)}`;

    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Open-Meteo status ${res.status}`);
    }

    const data = await res.json();

    if (!data.current_weather || !data.daily || !data.daily.time) {
      throw new Error('Incomplete weather payload');
    }

    const currentCode = Number(data.current_weather.weathercode ?? 0);
    const currentCondition = interpretWeatherCode(currentCode);
    const currentTemp = Math.round(Number(data.current_weather.temperature));
    const windSpeed = Math.round(Number(data.current_weather.windspeed ?? 12));
    const isDay = data.current_weather.is_day !== 0;

    // Build 3 days of forecast
    const daily: DailyForecast[] = [];
    const maxDays = Math.min(3, data.daily.time.length);

    for (let i = 0; i < maxDays; i++) {
      const dateStr = data.daily.time[i];
      const code = Number(data.daily.weathercode[i] ?? 0);
      const condition = interpretWeatherCode(code);
      const maxT = Math.round(Number(data.daily.temperature_2m_max[i] ?? currentTemp + 2));
      const minT = Math.round(Number(data.daily.temperature_2m_min[i] ?? currentTemp - 6));
      const rainProb = Math.round(Number(data.daily.precipitation_probability_max?.[i] ?? 10));
      const windKmh = Math.round(Number(data.daily.windspeed_10m_max?.[i] ?? windSpeed));

      let dayLabel = 'Today';
      if (i === 1) dayLabel = 'Tomorrow';
      else if (i === 2) {
        const d = new Date(dateStr + 'T12:00:00');
        dayLabel = d.toLocaleDateString('en-US', { weekday: 'short' });
      }

      daily.push({
        date: dateStr,
        dayLabel,
        weatherCode: code,
        conditionText: condition.name,
        conditionTextSw: condition.nameSw,
        conditionTextFr: condition.nameFr,
        maxTempC: maxT,
        minTempC: minT,
        precipitationProbability: rainProb,
        windSpeedKmh: windKmh,
      });
    }

    return {
      cityId,
      cityName,
      currentTempC: currentTemp,
      feelsLikeC: currentTemp,
      currentWeatherCode: currentCode,
      currentConditionText: currentCondition.name,
      currentConditionTextSw: currentCondition.nameSw,
      currentConditionTextFr: currentCondition.nameFr,
      windSpeedKmh: windSpeed,
      isDay,
      daily,
      packingTip: geo.defaultPackingTip,
      packingTipSw: geo.defaultPackingTipSw,
      packingTipFr: geo.defaultPackingTipFr,
      lastUpdated: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isLive: true,
    };
  } catch (err) {
    // Return curated fallback data if offline or network error
    return getFallbackWeatherData(cityId, cityName);
  }
}
