export type Currency = 'KES' | 'USD' | 'EUR';

export interface CityDestination {
  id: string;
  name: string;
  country: string;
  region: string;
  tagline: string;
  description: string;
  image: string;
  startingPriceKES: number;
  duration: string;
  topHighlights: string[];
  bestTimeToVisit: string;
  includedItems: string[];
  itinerarySummary: {
    day: number;
    title: string;
    description: string;
  }[];
}

export interface DayItinerary {
  day: number;
  title: string;
  tagline?: string;
  morning?: string;
  afternoon?: string;
  evening?: string;
  description: string;
  meals?: string[];
  accommodation?: string;
  activities?: string[];
  highlight?: string;
}

export interface TourPackage {
  id: string;
  title: string;
  cityId: string;
  cityName: string;
  category: 'City Highlights' | 'Beach & Island' | 'Big Five Safari' | 'International City';
  durationDays: number;
  pricePerPersonKES: number;
  image: string;
  badge?: string;
  rating: number;
  reviewCount: number;
  description: string;
  inclusions: string[];
  featured?: boolean;
  itinerary?: DayItinerary[];
}

export interface BookingSubmission {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  cityId: string;
  packageId: string;
  packageName: string;
  travelDate: string;
  guestsCount: number;
  totalAmountKES: number;
  depositAmountKES: number;
  paymentType: 'full' | 'deposit';
  mpesaCode?: string;
  status: 'confirmed' | 'pending_verification';
  createdAt: string;
  notes?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  origin: string;
  tourTaken: string;
  date: string;
  quote: string;
  rating: number;
}

export type TravelVideoCategory = 'all' | 'game-park' | 'hotel' | 'city';

export interface TourChapter {
  id: string;
  name: string;
  nameSw?: string;
  nameFr?: string;
  timestamp: number; // in seconds
  thumbnailUrl: string;
  tag: string;
}

export interface TravelVideo {
  id: string;
  title: string;
  titleSw: string;
  titleFr: string;
  category: 'game-park' | 'hotel' | 'city';
  location: string;
  locationSw?: string;
  locationFr?: string;
  duration: string;
  videoUrl: string;
  posterUrl: string;
  description: string;
  descriptionSw: string;
  descriptionFr: string;
  highlights: string[];
  highlightsSw?: string[];
  highlightsFr?: string[];
  relatedPackageId: string;
  tags?: string[];
  viewsCount?: string;
  chapters?: TourChapter[];
}

