import { BookingSubmission } from '../types/tour';

export interface FrequentTravelerTier {
  id: 'first_time' | 'savannah_wanderer' | 'safari_connoisseur' | 'legendary_nomad';
  tierLevel: number;
  name: string;
  nameSw: string;
  nameFr: string;
  title: string;
  titleSw: string;
  titleFr: string;
  badgeLabel: string;
  minTrips: number;
  maxTrips: number;
  discountPercent: number;
  perks: string[];
  perksSw: string[];
  perksFr: string[];
  cardGradient: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  accentColor: string;
  ribbonColor: string;
}

export interface TravelerBadge {
  id: string;
  name: string;
  nameSw: string;
  nameFr: string;
  category: 'milestone' | 'destination' | 'loyalty';
  description: string;
  descriptionSw: string;
  descriptionFr: string;
  icon: string;
  color: string;
  unlocked: boolean;
  unlockedDate?: string;
}

export interface BookingRecord {
  id: string;
  packageName: string;
  cityId: string;
  travelDate: string;
  guestsCount: number;
  totalAmountKES: number;
  mpesaCode?: string;
  status: string;
  bookedAt: string;
}

export interface TravelerProfile {
  travelerId: string;
  fullName: string;
  phone: string;
  email: string;
  totalTrips: number;
  memberSince: string;
  pastBookings: BookingRecord[];
  isReturningCustomer: boolean;
  currentTier: FrequentTravelerTier;
  nextTier: FrequentTravelerTier | null;
  tripsToNextTier: number;
  earnedBadges: TravelerBadge[];
}

export const FREQUENT_TRAVELER_TIERS: FrequentTravelerTier[] = [
  {
    id: 'first_time',
    tierLevel: 1,
    name: 'First-Time Explorer',
    nameSw: 'Mpelelezi Mpya',
    nameFr: 'Nouvel Explorateur',
    title: 'Explorer Scout',
    titleSw: 'Mpelelezi wa Pori',
    titleFr: 'Éclaireur Safari',
    badgeLabel: '1st Trip • Welcome',
    minTrips: 1,
    maxTrips: 1,
    discountPercent: 0,
    perks: [
      'Official SafariQuest welcome kit upon pickup',
      'Instant digital QR boarding pass on smartphone',
      'Earn 1 loyalty reward point for every 100 KES spent',
      'Book 1 more safari to unlock Frequent Traveler 5% VIP status',
    ],
    perksSw: [
      'Mfuko maalum wa kukaribishwa unapoanza safari',
      'Tikiti ya kidijitali ya QR kwenye simu yako',
      'Pata pointi 1 kwa kila KES 100 unazotumia',
      'Hifadhi safari 1 zaidi ili upate punguzo la 5% la Mara kwa Mara',
    ],
    perksFr: [
      'Kit de bienvenue SafariQuest officiel dès votre arrivée',
      'Pass QR digital instantané sur votre smartphone',
      'Gagnez 1 point fidélité par tranche de 100 KES dépensés',
      'Réservez 1 voyage de plus pour débloquer 5% de remise VIP',
    ],
    cardGradient: 'from-emerald-950 via-slate-900 to-emerald-900',
    badgeBg: 'bg-emerald-100 dark:bg-emerald-950/70',
    badgeText: 'text-emerald-800 dark:text-emerald-300',
    badgeBorder: 'border-emerald-300 dark:border-emerald-700',
    accentColor: '#10b981',
    ribbonColor: 'bg-emerald-600',
  },
  {
    id: 'savannah_wanderer',
    tierLevel: 2,
    name: 'Savannah Wanderer',
    nameSw: 'Msafiri wa Savannah',
    nameFr: 'Voyageur de la Savane',
    title: 'Frequent Traveler • Savannah Wanderer',
    titleSw: 'Msafiri wa Mara kwa Mara • Kiwango cha Fedha',
    titleFr: 'Voyageur Régulier • Voyageur de la Savane',
    badgeLabel: 'Frequent Traveler • 2-3 Trips',
    minTrips: 2,
    maxTrips: 3,
    discountPercent: 5,
    perks: [
      '5% Returning Customer VIP discount on all bookings',
      'Complimentary African bush sundowner cocktails / drinks',
      'Guaranteed priority window seats in 4x4 safari Land Cruisers',
      'Dedicated 24/7 VIP concierge direct line on WhatsApp (0752632206)',
    ],
    perksSw: [
      'Punguzo la 5% kwa mteja anayerudi kwenye vifurushi vyote',
      'Vinywaji vya jioni vya bure porini wakati wa machweo',
      'Nafasi ya kipaumbele ya dirishani ndani ya gari la 4x4 Land Cruiser',
      'Mawasiliano ya haraka ya VIP masaa 24/7 kupitia WhatsApp 0752632206',
    ],
    perksFr: [
      'Remise VIP voyageur régulier de 5% sur tous vos séjours',
      'Cocktails et apéritifs coucher de soleil en brousse offerts',
      'Siège fenêtre prioritaire garanti en Land Cruiser 4x4',
      'Assistance conciergerie VIP dédiée 24/7 sur WhatsApp (0752632206)',
    ],
    cardGradient: 'from-amber-950 via-slate-900 to-amber-900',
    badgeBg: 'bg-amber-100 dark:bg-amber-950/70',
    badgeText: 'text-amber-800 dark:text-amber-300',
    badgeBorder: 'border-amber-300 dark:border-amber-700',
    accentColor: '#f59e0b',
    ribbonColor: 'bg-amber-600',
  },
  {
    id: 'safari_connoisseur',
    tierLevel: 3,
    name: 'Safari Connoisseur',
    nameSw: 'Mwanachama Mzoefu',
    nameFr: 'Connaisseur Safari',
    title: 'Frequent Traveler • Gold Connoisseur',
    titleSw: 'Msafiri wa Mara kwa Mara • Dhahabu ya Pori',
    titleFr: 'Voyageur Régulier • Connaisseur Or',
    badgeLabel: 'Frequent Traveler • 4-6 Trips',
    minTrips: 4,
    maxTrips: 6,
    discountPercent: 10,
    perks: [
      '10% VIP Returning Customer discount across all safari & coastal packages',
      'Free private airport / SGR train transfer in Nairobi & Mombasa',
      'Complimentary guided bush nature walk with licensed armed ranger',
      'Flexible booking with zero-fee date changes up to 72h before departure',
    ],
    perksSw: [
      'Punguzo kubwa la 10% kwa vifurushi vyote vya safari na pwani',
      'Usafiri wa bure wa kibinafsi kutoka uwanja wa ndege au kituo cha SGR',
      'Matembezi ya kuongozwa porini bila malipo pamoja na mlinzi wa wanyama',
      'Mabadiliko ya tarehe bila ada yoyote ya ziada hadi saa 72 kabla',
    ],
    perksFr: [
      '10% de réduction VIP sur tous vos forfaits safari et côte',
      'Transfert aéroport / gare SGR privé offert à Nairobi et Mombasa',
      'Marche guidée en brousse offerte avec ranger armé agréé',
      'Report de date sans frais jusqu’à 72h avant le départ',
    ],
    cardGradient: 'from-yellow-950 via-slate-900 to-amber-950',
    badgeBg: 'bg-yellow-100 dark:bg-yellow-950/70',
    badgeText: 'text-yellow-800 dark:text-yellow-300',
    badgeBorder: 'border-yellow-400 dark:border-yellow-700',
    accentColor: '#eab308',
    ribbonColor: 'bg-yellow-600',
  },
  {
    id: 'legendary_nomad',
    tierLevel: 4,
    name: 'Legendary Nomad',
    nameSw: 'Balozi Mkuu wa Safari',
    nameFr: 'Ambassadeur Légendaire',
    title: 'Frequent Traveler • Diamond Legendary Nomad',
    titleSw: 'Msafiri wa Mara kwa Mara • Kiwango cha Almasi',
    titleFr: 'Voyageur Régulier • Légendaire Diamant',
    badgeLabel: 'Frequent Traveler VIP • 7+ Trips',
    minTrips: 7,
    maxTrips: Infinity,
    discountPercent: 15,
    perks: [
      '15% Lifetime VIP Discount for traveler and accompanying companions',
      'Maasai Mara Sunrise Hot-Air Balloon flight voucher (1 per year)',
      'Complimentary suite upgrade at partner luxury lodges and beach resorts',
      'Personal Senior Naturalist Guide dedicated exclusively to your group',
    ],
    perksSw: [
      'Punguzo la 15% la maisha yote kwa ajili yako na wenzako unaosafiri nao',
      'Vocha ya safari ya puto la hewa ya jua Maasai Mara mara moja kwa mwaka',
      'Vyumba vya kifahari vilivyoboreshwa bure katika hoteli zetu',
      'Mwongozo mkuu wa wanyamapori anayepewa kundi lako pekee',
    ],
    perksFr: [
      '15% de remise VIP à vie pour vous et vos accompagnateurs',
      'Voucher pour un vol en montgolfière au lever du soleil au Maasai Mara',
      'Surclassement gratuit en suite de luxe dans les lodges partenaires',
      'Guide naturaliste senior dédié exclusivement à votre groupe',
    ],
    cardGradient: 'from-purple-950 via-slate-900 to-indigo-950',
    badgeBg: 'bg-purple-100 dark:bg-purple-950/70',
    badgeText: 'text-purple-800 dark:text-purple-300',
    badgeBorder: 'border-purple-300 dark:border-purple-700',
    accentColor: '#a855f7',
    ribbonColor: 'bg-purple-600',
  },
];

const ALL_AVAILABLE_BADGES: Omit<TravelerBadge, 'unlocked' | 'unlockedDate'>[] = [
  {
    id: 'first_safari',
    name: 'First Safari Footprint',
    nameSw: 'Hatua ya Kwanza Pori',
    nameFr: 'Première Empreinte Safari',
    category: 'milestone',
    description: 'Booked your inaugural adventure with SafariQuest Kenya',
    descriptionSw: 'Umehifadhi safari yako ya kwanza na SafariQuest',
    descriptionFr: 'A réservé sa première aventure avec SafariQuest',
    icon: 'Compass',
    color: 'emerald',
  },
  {
    id: 'returning_traveler',
    name: 'Frequent Traveler',
    nameSw: 'Msafiri wa Mara kwa Mara',
    nameFr: 'Voyageur Fidèle',
    category: 'loyalty',
    description: 'Verified returning traveler with multiple registered safaris',
    descriptionSw: 'Mteja aliyethibitishwa kuwa na safari zaidi ya moja',
    descriptionFr: 'Client régulier vérifié avec plusieurs voyages enregistrés',
    icon: 'ShieldCheck',
    color: 'amber',
  },
  {
    id: 'big_five',
    name: 'Big Five Tracker',
    nameSw: 'Mfuatiliaji wa Wanyama 5',
    nameFr: 'Traqueur du Big Five',
    category: 'destination',
    description: 'Ventured into iconic savannahs: Maasai Mara or Nairobi National Park',
    descriptionSw: 'Umetembelea Maasai Mara au Hifadhi ya Nairobi',
    descriptionFr: 'A exploré le Maasai Mara ou le parc de Nairobi',
    icon: 'Sparkles',
    color: 'amber',
  },
  {
    id: 'coastal_sun',
    name: 'Swahili Coast Voyager',
    nameSw: 'Msafiri wa Pwani',
    nameFr: 'Voyageur Côte Swahilie',
    category: 'destination',
    description: 'Explored Indian Ocean coral reefs, Diani, Mombasa or Zanzibar',
    descriptionSw: 'Umetembelea ufukwe wa Diani, Mombasa au Zanzibar',
    descriptionFr: 'A profité des plages de Diani, Mombasa ou Zanzibar',
    icon: 'Sun',
    color: 'sky',
  },
  {
    id: 'mpesa_verified',
    name: 'Instant Till Verified',
    nameSw: 'Mlipaji Mahiri wa Till',
    nameFr: 'Paiement Till Vérifié',
    category: 'loyalty',
    description: 'Secured bookings via Safaricom Lipa Na M-Pesa Till 6608497',
    descriptionSw: 'Umelipa kupitia Safaricom M-Pesa Till 6608497',
    descriptionFr: 'A validé son acompte via M-Pesa Till 6608497',
    icon: 'CheckCircle2',
    color: 'emerald',
  },
  {
    id: 'global_explorer',
    name: 'Global Jetsetter',
    nameSw: 'Msafiri wa Kimataifa',
    nameFr: 'Explorateur du Monde',
    category: 'destination',
    description: 'Reserved international escape to Dubai, Tokyo, or Miami',
    descriptionSw: 'Umehifadhi safari ya Dubai, Tokyo au Miami',
    descriptionFr: 'A réservé un forfait à Dubaï, Tokyo ou Miami',
    icon: 'Globe',
    color: 'blue',
  },
  {
    id: 'safari_connoisseur_badge',
    name: 'Master Pathfinder',
    nameSw: 'Kiongozi wa Njia',
    nameFr: 'Maître des Pistes',
    category: 'milestone',
    description: 'Achieved 4 or more completed safaris across Africa',
    descriptionSw: 'Umekamilisha safari 4 au zaidi barani Afrika',
    descriptionFr: 'A réalisé au moins 4 safaris complets en Afrique',
    icon: 'Award',
    color: 'yellow',
  },
  {
    id: 'legendary_ambassador',
    name: 'Serengeti Ambassador',
    nameSw: 'Balozi wa Serengeti',
    nameFr: 'Ambassadeur Serengeti',
    category: 'milestone',
    description: 'Top VIP status with 7+ journeys logged',
    descriptionSw: 'Kiwango cha juu cha heshima cha safari 7+',
    descriptionFr: 'Statut VIP ultime avec plus de 7 périples effectués',
    icon: 'Crown',
    color: 'purple',
  },
];

const STORAGE_KEY = 'kenyaquest_traveler_profile';

export function getFrequentTravelerTier(tripsCount: number): FrequentTravelerTier {
  const count = Math.max(1, tripsCount);
  return (
    FREQUENT_TRAVELER_TIERS.find((tier) => count >= tier.minTrips && count <= tier.maxTrips) ||
    FREQUENT_TRAVELER_TIERS[FREQUENT_TRAVELER_TIERS.length - 1]
  );
}

export function computeBadges(tripsCount: number, pastBookings: BookingRecord[]): TravelerBadge[] {
  const count = Math.max(1, tripsCount);
  const hasBigFive = pastBookings.some((b) =>
    ['mara', 'nairobi', 'serengeti', 'big five', 'maasai'].some((k) =>
      b.packageName.toLowerCase().includes(k)
    )
  );
  const hasCoast = pastBookings.some((b) =>
    ['mombasa', 'malindi', 'diani', 'zanzibar', 'coastal', 'beach'].some((k) =>
      b.packageName.toLowerCase().includes(k)
    )
  );
  const hasMpesa = pastBookings.some((b) => Boolean(b.mpesaCode));
  const hasGlobal = pastBookings.some((b) =>
    ['dubai', 'tokyo', 'miami', 'uae', 'cape town'].some((k) =>
      b.packageName.toLowerCase().includes(k)
    )
  );

  return ALL_AVAILABLE_BADGES.map((b) => {
    let unlocked = false;
    let unlockedDate: string | undefined = undefined;

    switch (b.id) {
      case 'first_safari':
        unlocked = count >= 1;
        unlockedDate = pastBookings[0]?.travelDate || 'Initial Booking';
        break;
      case 'returning_traveler':
        unlocked = count >= 2;
        unlockedDate = pastBookings[1]?.travelDate || (count >= 2 ? 'Active Status' : undefined);
        break;
      case 'big_five':
        unlocked = hasBigFive || count >= 1; // Default safari covers wildlife
        unlockedDate = 'Verified';
        break;
      case 'coastal_sun':
        unlocked = hasCoast || count >= 3;
        unlockedDate = hasCoast ? 'Verified' : undefined;
        break;
      case 'mpesa_verified':
        unlocked = hasMpesa || count >= 1;
        unlockedDate = 'Till 6608497';
        break;
      case 'global_explorer':
        unlocked = hasGlobal || count >= 5;
        unlockedDate = hasGlobal ? 'Verified' : undefined;
        break;
      case 'safari_connoisseur_badge':
        unlocked = count >= 4;
        unlockedDate = count >= 4 ? `${count} Safaris` : undefined;
        break;
      case 'legendary_ambassador':
        unlocked = count >= 7;
        unlockedDate = count >= 7 ? `${count} Safaris` : undefined;
        break;
      default:
        unlocked = false;
    }

    return {
      ...b,
      unlocked,
      unlockedDate,
    };
  });
}

/**
 * Retrieve the active traveler profile from localStorage or initialize with sensible defaults
 */
export function getTravelerProfile(phoneOrId?: string): TravelerProfile {
  try {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        const currentTier = getFrequentTravelerTier(parsed.totalTrips || 1);
        const currentTierIndex = FREQUENT_TRAVELER_TIERS.findIndex((t) => t.id === currentTier.id);
        const nextTier =
          currentTierIndex < FREQUENT_TRAVELER_TIERS.length - 1
            ? FREQUENT_TRAVELER_TIERS[currentTierIndex + 1]
            : null;
        const tripsToNextTier = nextTier ? Math.max(0, nextTier.minTrips - parsed.totalTrips) : 0;
        const earnedBadges = computeBadges(parsed.totalTrips || 1, parsed.pastBookings || []);

        return {
          ...parsed,
          currentTier,
          nextTier,
          tripsToNextTier,
          earnedBadges,
          isReturningCustomer: (parsed.totalTrips || 1) >= 2,
        };
      }
    }
  } catch (err) {
    console.error('Error reading traveler profile', err);
  }

  // Default initial profile
  const defaultTrips = 1;
  const currentTier = getFrequentTravelerTier(defaultTrips);
  const nextTier = FREQUENT_TRAVELER_TIERS[1];
  const initialBookings: BookingRecord[] = [
    {
      id: 'SQ-660849',
      packageName: 'Maasai Mara Big Five Migration Safari (3 Days)',
      cityId: 'maasai-mara',
      travelDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0],
      guestsCount: 2,
      totalAmountKES: 90000,
      mpesaCode: 'TLL6608497',
      status: 'confirmed',
      bookedAt: new Date().toISOString(),
    },
  ];

  const profile: TravelerProfile = {
    travelerId: 'KQ-884210',
    fullName: 'Fabian Otieno',
    phone: phoneOrId || '0752632206',
    email: 'reservations@Kenya-Quest-Safari.com',
    totalTrips: defaultTrips,
    memberSince: '2025',
    pastBookings: initialBookings,
    isReturningCustomer: false,
    currentTier,
    nextTier,
    tripsToNextTier: 1,
    earnedBadges: computeBadges(defaultTrips, initialBookings),
  };

  return profile;
}

/**
 * Record a new booking to the traveler profile and update their Frequent Traveler status
 */
export function recordTravelerBooking(booking: BookingSubmission): TravelerProfile {
  const current = getTravelerProfile(booking.phone);
  const alreadyExists = current.pastBookings.some((b) => b.id === booking.id);

  let updatedBookings = current.pastBookings;
  let newTotalTrips = current.totalTrips;

  if (!alreadyExists) {
    const newRecord: BookingRecord = {
      id: booking.id,
      packageName: booking.packageName,
      cityId: booking.cityId,
      travelDate: booking.travelDate,
      guestsCount: booking.guestsCount,
      totalAmountKES: booking.totalAmountKES,
      mpesaCode: booking.mpesaCode,
      status: booking.status,
      bookedAt: booking.createdAt,
    };
    updatedBookings = [newRecord, ...current.pastBookings];
    newTotalTrips = current.totalTrips + 1;
  }

  const currentTier = getFrequentTravelerTier(newTotalTrips);
  const currentTierIndex = FREQUENT_TRAVELER_TIERS.findIndex((t) => t.id === currentTier.id);
  const nextTier =
    currentTierIndex < FREQUENT_TRAVELER_TIERS.length - 1
      ? FREQUENT_TRAVELER_TIERS[currentTierIndex + 1]
      : null;
  const tripsToNextTier = nextTier ? Math.max(0, nextTier.minTrips - newTotalTrips) : 0;
  const earnedBadges = computeBadges(newTotalTrips, updatedBookings);

  const updatedProfile: TravelerProfile = {
    travelerId: current.travelerId,
    fullName: booking.fullName || current.fullName,
    phone: booking.phone || current.phone,
    email: booking.email || current.email,
    totalTrips: newTotalTrips,
    memberSince: current.memberSince,
    pastBookings: updatedBookings,
    isReturningCustomer: newTotalTrips >= 2,
    currentTier,
    nextTier,
    tripsToNextTier,
    earnedBadges,
  };

  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProfile));
    }
  } catch (err) {
    console.error('Error saving traveler profile', err);
  }

  return updatedProfile;
}

/**
 * Convenient utility for demo & testing: simulate a customer with N past trips
 */
export function simulateTravelerTrips(tripsCount: number, customName?: string): TravelerProfile {
  const count = Math.max(1, tripsCount);
  const samplePackages = [
    { name: 'Maasai Mara Big Five Migration Safari', city: 'maasai-mara', price: 90000, date: '2025-08-12' },
    { name: 'Mombasa & Malindi Coastal Holiday', city: 'mombasa', price: 100000, date: '2025-11-20' },
    { name: 'Nairobi National Park & City Tour', city: 'nairobi', price: 60000, date: '2026-01-15' },
    { name: 'Zanzibar Spice Island Sandbank Cruise', city: 'zanzibar', price: 108000, date: '2026-04-10' },
    { name: 'Dubai City Lights & Desert Dune Safari', city: 'dubai', price: 325000, date: '2026-07-05' },
    { name: 'Cape Town, Table Mountain & Winelands', city: 'cape-town', price: 196000, date: '2026-09-18' },
    { name: 'Tokyo, Mount Fuji & Shinto Heritage', city: 'tokyo', price: 468000, date: '2026-10-24' },
    { name: 'Amboseli Elephant Sanctuary & Kilimanjaro', city: 'amboseli', price: 85000, date: '2026-12-02' },
  ];

  const simulatedBookings: BookingRecord[] = Array.from({ length: count }).map((_, index) => {
    const pkg = samplePackages[index % samplePackages.length];
    return {
      id: `SQ-${660840 + index}`,
      packageName: pkg.name,
      cityId: pkg.city,
      travelDate: pkg.date,
      guestsCount: 2,
      totalAmountKES: pkg.price,
      mpesaCode: `QK${Math.floor(10000000 + Math.random() * 90000000)}`,
      status: 'confirmed',
      bookedAt: new Date(Date.now() - (count - index) * 30 * 86400000).toISOString(),
    };
  });

  const currentTier = getFrequentTravelerTier(count);
  const currentTierIndex = FREQUENT_TRAVELER_TIERS.findIndex((t) => t.id === currentTier.id);
  const nextTier =
    currentTierIndex < FREQUENT_TRAVELER_TIERS.length - 1
      ? FREQUENT_TRAVELER_TIERS[currentTierIndex + 1]
      : null;
  const tripsToNextTier = nextTier ? Math.max(0, nextTier.minTrips - count) : 0;
  const earnedBadges = computeBadges(count, simulatedBookings);

  const profile: TravelerProfile = {
    travelerId: 'KQ-884210',
    fullName: customName || 'Fabian Otieno',
    phone: '0752632206',
    email: 'reservations@Kenya-Quest-Safari.com',
    totalTrips: count,
    memberSince: '2025',
    pastBookings: simulatedBookings,
    isReturningCustomer: count >= 2,
    currentTier,
    nextTier,
    tripsToNextTier,
    earnedBadges,
  };

  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    }
  } catch (err) {
    console.error('Error saving simulated profile', err);
  }

  return profile;
}
