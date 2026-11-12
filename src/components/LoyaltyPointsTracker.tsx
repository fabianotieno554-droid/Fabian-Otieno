import React, { useState, useEffect } from 'react';
import { BookingSubmission } from '../types/tour';
import { Award, Sparkles, TrendingUp, Gift, ChevronDown, ChevronUp, Crown, Star, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LoyaltyPointsTrackerProps {
  booking: BookingSubmission;
}

interface LoyaltyTier {
  id: 'explorer' | 'voyager' | 'elite';
  name: string;
  nameSw: string;
  nameFr: string;
  minPoints: number;
  maxPoints: number;
  icon: React.ComponentType<{ className?: string }>;
  badgeColor: string;
  perk: string;
  perkSw: string;
  perkFr: string;
}

const TIERS: LoyaltyTier[] = [
  {
    id: 'explorer',
    name: 'Explorer Scout',
    nameSw: 'Mpelelezi wa Pori',
    nameFr: 'Éclaireur Safari',
    minPoints: 0,
    maxPoints: 499,
    icon: Star,
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800',
    perk: '5% off guided bush walks & souvenir shop credit',
    perkSw: 'Punguzo la 5% kwa matembezi ya porini na duka la zawadi',
    perkFr: '5% de réduction sur les marches guidées et boutique',
  },
  {
    id: 'voyager',
    name: 'Savannah Voyager',
    nameSw: 'Msafiri wa Savannah',
    nameFr: 'Voyageur de la Savane',
    minPoints: 500,
    maxPoints: 1499,
    icon: Award,
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800',
    perk: 'Free VIP airport transfer & 10% bush dinner discount',
    perkSw: 'Usafiri wa bure wa VIP uwanja wa ndege na punguzo la chakula',
    perkFr: 'Transfert VIP aéroport offert & 10% sur dîner en brousse',
  },
  {
    id: 'elite',
    name: 'Serengeti Elite',
    nameSw: 'Bingwa wa Serengeti',
    nameFr: 'Élite du Serengeti',
    minPoints: 1500,
    maxPoints: Infinity,
    icon: Crown,
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800',
    perk: 'Complimentary hot air balloon voucher & luxury suite upgrade',
    perkSw: 'Vocha ya puto la hewa ya jua na chumba cha kifahari',
    perkFr: 'Vol en montgolfière offert et surclassement en suite de luxe',
  },
];

export const LoyaltyPointsTracker: React.FC<LoyaltyPointsTrackerProps> = ({ booking }) => {
  const { language } = useLanguage();
  const [showPerks, setShowPerks] = useState(false);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [isCredited, setIsCredited] = useState<boolean>(false);

  // Calculate points earned: 1 point for every 100 KES spent
  const earnedFromCurrentBooking = Math.max(10, Math.floor(booking.totalAmountKES / 100));
  // Estimated redemption discount value (KES 5 per point saved)
  const estimatedDiscountKES = earnedFromCurrentBooking * 5;

  // Manage persistent storage of points
  useEffect(() => {
    try {
      const storageKey = `sq_loyalty_${booking.phone.replace(/\D/g, '') || 'guest'}`;
      const creditedKey = `sq_loyalty_credited_${booking.phone.replace(/\D/g, '') || 'guest'}`;

      const savedPoints = parseInt(localStorage.getItem(storageKey) || '0', 10);
      const creditedBookings: string[] = JSON.parse(localStorage.getItem(creditedKey) || '[]');

      if (booking.id && !creditedBookings.includes(booking.id)) {
        // First time opening receipt with this booking ID, credit points
        const updatedTotal = (isNaN(savedPoints) ? 0 : savedPoints) + earnedFromCurrentBooking;
        localStorage.setItem(storageKey, updatedTotal.toString());
        localStorage.setItem(creditedKey, JSON.stringify([...creditedBookings, booking.id]));
        setTotalPoints(updatedTotal);
        setIsCredited(true);
      } else {
        // Already credited or initialized
        setTotalPoints(isNaN(savedPoints) ? earnedFromCurrentBooking : Math.max(savedPoints, earnedFromCurrentBooking));
        setIsCredited(true);
      }
    } catch {
      // Fallback for isolated contexts
      setTotalPoints(earnedFromCurrentBooking);
      setIsCredited(true);
    }
  }, [booking.id, booking.phone, booking.totalAmountKES, earnedFromCurrentBooking]);

  // Determine current tier
  const currentTier =
    TIERS.find((t) => totalPoints >= t.minPoints && totalPoints <= t.maxPoints) || TIERS[0];

  // Determine next tier and progress
  const nextTierIndex = TIERS.findIndex((t) => t.id === currentTier.id) + 1;
  const nextTier = nextTierIndex < TIERS.length ? TIERS[nextTierIndex] : null;

  let progressPercent = 100;
  let pointsNeeded = 0;

  if (nextTier) {
    const tierRange = nextTier.minPoints - currentTier.minPoints;
    const pointsIntoTier = totalPoints - currentTier.minPoints;
    progressPercent = Math.min(100, Math.max(8, Math.round((pointsIntoTier / tierRange) * 100)));
    pointsNeeded = Math.max(0, nextTier.minPoints - totalPoints);
  }

  const TierIcon = currentTier.icon;

  // Localized texts
  const labels = {
    en: {
      trackerTitle: 'Safari Club Loyalty Rewards',
      tagline: 'Track your safari points & unlock private perks',
      pointsEarned: 'Points Earned',
      thisBooking: 'from this trip',
      totalBalance: 'Total Club Balance',
      currentTier: 'Member Status',
      rate: '1 Point per KES 100 spent',
      discountValue: 'Est. Future Discount',
      pointsToNext: `${pointsNeeded} pts to ${nextTier?.name}`,
      maxTier: 'Top Elite Tier Unlocked',
      tierPerksBtn: 'View Rewards & How to Redeem',
      hidePerksBtn: 'Hide Details',
      memberId: 'Member Ref',
      howItWorksTitle: 'How to Redeem Your Points',
      step1: 'Quote your phone number or booking reference on your next trip.',
      step2: 'Apply points for instant price discounts, park fees, or safari add-ons.',
      step3: 'Valid for 24 months across all Kenya, Tanzania & international packages.',
      activePerk: 'Current Tier Perk',
    },
    sw: {
      trackerTitle: 'Zawadi za Safari Club',
      tagline: 'Fuatilia pointi zako za safari na upate faida maalum',
      pointsEarned: 'Pointi Zilizopatikana',
      thisBooking: 'kutoka safari hii',
      totalBalance: 'Jumla ya Pointi Zako',
      currentTier: 'Kiwango cha Uanachama',
      rate: 'Pointi 1 kwa kila KES 100 unazotumia',
      discountValue: 'Punguzo la Baadaye',
      pointsToNext: `Bado pointi ${pointsNeeded} kufikia ${nextTier?.nameSw || nextTier?.name}`,
      maxTier: 'Kiwango cha Juu Kimefikiwa',
      tierPerksBtn: 'Tazama Zawadi & Jinsi ya Kutumia',
      hidePerksBtn: 'Ficha Maelezo',
      memberId: 'Nambari ya Mwanachama',
      howItWorksTitle: 'Jinsi ya Kutumia Pointi Zako',
      step1: 'Taja nambari yako ya simu au rejeleo la safari unayoweka nafasi tena.',
      step2: 'Tumia pointi kupata punguzo la bei papo hapo au vitu vya ziada.',
      step3: 'Zinatumika kwa miezi 24 kwa vifurushi vyote vya Kenya na kimataifa.',
      activePerk: 'Faida ya Kiwango Chako',
    },
    fr: {
      trackerTitle: 'Club Fidélité Safari Rewards',
      tagline: 'Suivez vos points fidélité et débloquez des avantages exclusifs',
      pointsEarned: 'Points Gagnés',
      thisBooking: 'sur cette réservation',
      totalBalance: 'Solde Total des Points',
      currentTier: 'Statut Membre',
      rate: '1 Point par 100 KES dépensés',
      discountValue: 'Réduction Estimée',
      pointsToNext: `Plus que ${pointsNeeded} pts pour ${nextTier?.nameFr || nextTier?.name}`,
      maxTier: 'Niveau Élite Maximum Atteint',
      tierPerksBtn: 'Voir Avantages et Utilisation',
      hidePerksBtn: 'Masquer les Détails',
      memberId: 'Réf. Membre',
      howItWorksTitle: 'Comment Utiliser Vos Points',
      step1: 'Indiquez votre numéro ou référence de réservation lors de votre prochain voyage.',
      step2: 'Utilisez vos points pour une réduction immédiate ou surclassement de lodge.',
      step3: 'Valable pendant 24 mois sur tous nos circuits en Afrique et à l’international.',
      activePerk: 'Avantage Actuel',
    },
  }[language] || {
    trackerTitle: 'Safari Club Loyalty Rewards',
    tagline: 'Track your safari points & unlock private perks',
    pointsEarned: 'Points Earned',
    thisBooking: 'from this trip',
    totalBalance: 'Total Club Balance',
    currentTier: 'Member Status',
    rate: '1 Point per KES 100 spent',
    discountValue: 'Est. Future Discount',
    pointsToNext: `${pointsNeeded} pts to ${nextTier?.name}`,
    maxTier: 'Top Elite Tier Unlocked',
    tierPerksBtn: 'View Rewards & How to Redeem',
    hidePerksBtn: 'Hide Details',
    memberId: 'Member Ref',
    howItWorksTitle: 'How to Redeem Your Points',
    step1: 'Quote your phone number or booking reference on your next trip.',
    step2: 'Apply points for instant price discounts, park fees, or safari add-ons.',
    step3: 'Valid for 24 months across all Kenya, Tanzania & international packages.',
    activePerk: 'Current Tier Perk',
  };

  const getTierLocalizedName = (t: LoyaltyTier) => {
    if (language === 'sw') return t.nameSw;
    if (language === 'fr') return t.nameFr;
    return t.name;
  };

  const getTierLocalizedPerk = (t: LoyaltyTier) => {
    if (language === 'sw') return t.perkSw;
    if (language === 'fr') return t.perkFr;
    return t.perk;
  };

  return (
    <div className="rounded-2xl border border-amber-200/80 dark:border-amber-900/60 bg-gradient-to-br from-amber-50/90 via-orange-50/40 to-emerald-50/60 dark:from-slate-900 dark:via-amber-950/20 dark:to-slate-900/90 p-4 sm:p-5 shadow-xs transition-all duration-200">
      {/* Header bar */}
      <div className="flex items-start justify-between gap-3 pb-3 border-b border-amber-200/60 dark:border-amber-900/40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-400 text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-amber-100 uppercase tracking-wide">
                {labels.trackerTitle}
              </h4>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-sm bg-amber-500/10 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                ACTIVE
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              {labels.tagline}
            </p>
          </div>
        </div>

        {/* Current Tier Badge */}
        <div className={`px-2.5 py-1 rounded-xl border text-[11px] font-bold flex items-center gap-1.5 shadow-2xs ${currentTier.badgeColor}`}>
          <TierIcon className="w-3.5 h-3.5" />
          <span>{getTierLocalizedName(currentTier)}</span>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 py-3">
        {/* Points from current booking */}
        <div className="bg-white/80 dark:bg-slate-800/80 rounded-xl p-2.5 border border-amber-100 dark:border-slate-700/80 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 block">
            {labels.pointsEarned}
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-lg sm:text-xl font-black text-amber-700 dark:text-amber-400 font-mono">
              +{earnedFromCurrentBooking.toLocaleString()}
            </span>
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">pts</span>
          </div>
          <span className="text-[10px] text-emerald-800 dark:text-emerald-400 font-medium block">
            {labels.thisBooking}
          </span>
        </div>

        {/* Total Club Balance */}
        <div className="bg-white/80 dark:bg-slate-800/80 rounded-xl p-2.5 border border-amber-100 dark:border-slate-700/80 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 block">
            {labels.totalBalance}
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-lg sm:text-xl font-black text-slate-900 dark:text-white font-mono">
              {totalPoints.toLocaleString()}
            </span>
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">pts</span>
          </div>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 block truncate">
            {labels.rate}
          </span>
        </div>

        {/* Estimated future discount value */}
        <div className="col-span-2 sm:col-span-1 bg-white/80 dark:bg-slate-800/80 rounded-xl p-2.5 border border-amber-100 dark:border-slate-700/80 shadow-2xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-400 block">
            {labels.discountValue}
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="text-lg sm:text-xl font-black text-emerald-800 dark:text-emerald-400 font-mono">
              KES {estimatedDiscountKES.toLocaleString()}
            </span>
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 block">
            Redeemable on next booking
          </span>
        </div>
      </div>

      {/* Progress to next tier */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
            {nextTier ? labels.pointsToNext : labels.maxTier}
          </span>
          <span className="font-mono text-[10px] font-bold text-slate-500 dark:text-slate-400">
            {nextTier ? `${totalPoints} / ${nextTier.minPoints} pts (${progressPercent}%)` : '100%'}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="h-2 w-full bg-slate-200/80 dark:bg-slate-700/80 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 via-amber-400 to-amber-500 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Current Active Perk banner */}
        <div className="mt-2 py-1.5 px-3 rounded-lg bg-amber-500/10 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/50 flex items-center gap-2 text-[11px] text-amber-900 dark:text-amber-200">
          <Gift className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400 shrink-0" />
          <span className="truncate">
            <strong className="font-bold">{labels.activePerk}:</strong> {getTierLocalizedPerk(currentTier)}
          </span>
        </div>
      </div>

      {/* Toggle button for details & how to redeem */}
      <div className="pt-3 border-t border-amber-200/50 dark:border-amber-900/30 mt-3">
        <button
          type="button"
          onClick={() => setShowPerks(!showPerks)}
          className="w-full flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-300 hover:text-amber-700 dark:hover:text-amber-300 transition py-1 cursor-pointer"
        >
          <span className="flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
            {showPerks ? labels.hidePerksBtn : labels.tierPerksBtn}
          </span>
          {showPerks ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {/* Expandable perks list & redemption guidance */}
        {showPerks && (
          <div className="mt-3 pt-2 space-y-3 text-[11px] animate-fadeIn border-t border-slate-200/60 dark:border-slate-800">
            {/* Tiers Breakdown */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 block">
                Safari Prestige Tiers
              </span>
              <div className="grid gap-1.5">
                {TIERS.map((tier) => {
                  const isCurrent = tier.id === currentTier.id;
                  const Icon = tier.icon;
                  return (
                    <div
                      key={tier.id}
                      className={`p-2 rounded-lg flex items-start justify-between gap-2 border text-[11px] ${
                        isCurrent
                          ? 'bg-amber-100/60 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700 font-semibold'
                          : 'bg-white/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className={`w-3.5 h-3.5 ${isCurrent ? 'text-amber-700 dark:text-amber-400' : 'text-slate-400'}`} />
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-slate-900 dark:text-white">
                              {getTierLocalizedName(tier)}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              ({tier.minPoints}{tier.maxPoints === Infinity ? '+' : `-${tier.maxPoints}`} pts)
                            </span>
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
                            {getTierLocalizedPerk(tier)}
                          </p>
                        </div>
                      </div>
                      {isCurrent && (
                        <span className="px-1.5 py-0.5 rounded-sm text-[9px] font-black bg-amber-500 text-white shrink-0">
                          CURRENT
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Redemption Instructions */}
            <div className="p-2.5 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5 text-slate-600 dark:text-slate-300">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Check className="w-3 h-3 text-emerald-600" />
                {labels.howItWorksTitle}
              </span>
              <ul className="space-y-1 text-[10px] list-disc list-inside text-slate-600 dark:text-slate-400">
                <li>{labels.step1}</li>
                <li>{labels.step2}</li>
                <li>{labels.step3}</li>
              </ul>
              <div className="text-[9px] text-slate-400 pt-1 border-t border-slate-200 dark:border-slate-700">
                {labels.memberId}: <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{booking.phone || booking.id}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
