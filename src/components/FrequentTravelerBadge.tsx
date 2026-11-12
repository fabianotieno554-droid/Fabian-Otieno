import React, { useState, useEffect } from 'react';
import { BookingSubmission } from '../types/tour';
import {
  getTravelerProfile,
  recordTravelerBooking,
  TravelerProfile,
} from '../utils/frequentTraveler';
import {
  Award,
  Crown,
  Sparkles,
  Compass,
  ShieldCheck,
  ChevronRight,
  Gift,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FrequentTravelerBadgeProps {
  booking?: BookingSubmission | null;
  onOpenProfile?: () => void;
  compact?: boolean;
}

export const FrequentTravelerBadge: React.FC<FrequentTravelerBadgeProps> = ({
  booking,
  onOpenProfile,
  compact = false,
}) => {
  const { language } = useLanguage();
  const [profile, setProfile] = useState<TravelerProfile>(() =>
    getTravelerProfile(booking?.phone)
  );

  useEffect(() => {
    if (booking) {
      const updated = recordTravelerBooking(booking);
      setProfile(updated);
    } else {
      setProfile(getTravelerProfile());
    }
  }, [booking]);

  const { currentTier, totalTrips, isReturningCustomer, nextTier, tripsToNextTier } = profile;

  // Localized texts
  const tierTitle =
    language === 'sw'
      ? currentTier.titleSw
      : language === 'fr'
      ? currentTier.titleFr
      : currentTier.title;

  const tierName =
    language === 'sw'
      ? currentTier.nameSw
      : language === 'fr'
      ? currentTier.nameFr
      : currentTier.name;

  const currentPerk =
    language === 'sw'
      ? currentTier.perksSw[0]
      : language === 'fr'
      ? currentTier.perksFr[0]
      : currentTier.perks[0];

  const getTierIcon = () => {
    switch (currentTier.id) {
      case 'legendary_nomad':
        return <Crown className="w-5 h-5 text-purple-400" />;
      case 'safari_connoisseur':
        return <Award className="w-5 h-5 text-yellow-400" />;
      case 'savannah_wanderer':
        return <ShieldCheck className="w-5 h-5 text-amber-400" />;
      case 'first_time':
      default:
        return <Compass className="w-5 h-5 text-emerald-400" />;
    }
  };

  if (compact) {
    return (
      <button
        type="button"
        onClick={onOpenProfile}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs hover:border-emerald-500 dark:hover:border-emerald-500 transition-all cursor-pointer text-left group"
        title="View Frequent Traveler Profile Summary"
      >
        <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 flex items-center justify-center shrink-0">
          {getTierIcon()}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
              {isReturningCustomer ? 'Frequent Traveler' : 'Traveler Club'}
            </span>
            {isReturningCustomer && (
              <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-amber-500 text-slate-950">
                VIP
              </span>
            )}
          </div>
          <div className="text-xs font-bold text-slate-900 dark:text-white truncate">
            {tierName} · {totalTrips} {totalTrips === 1 ? 'Trip' : 'Trips'}
          </div>
        </div>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
      </button>
    );
  }

  return (
    <div className="rounded-2xl border border-amber-300/80 dark:border-amber-800/80 bg-linear-to-br from-amber-50/60 via-white to-emerald-50/40 dark:from-slate-900 dark:via-slate-900 dark:to-amber-950/30 p-4 sm:p-5 shadow-xs relative overflow-hidden transition-all">
      {/* Decorative top ribbon */}
      <div className="flex items-center justify-between pb-3 border-b border-amber-200/80 dark:border-slate-800 gap-2">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/10 dark:bg-amber-400/10 text-amber-700 dark:text-amber-400 border border-amber-300 dark:border-amber-700">
            {getTierIcon()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                {isReturningCustomer
                  ? language === 'sw'
                    ? 'Mteja Anayerudi • Msafiri wa Mara kwa Mara'
                    : language === 'fr'
                    ? 'Client Fidèle • Voyageur Régulier'
                    : 'Returning Customer • Frequent Traveler'
                  : language === 'sw'
                  ? 'Kiwango cha Mwanachama wa Safari'
                  : language === 'fr'
                  ? 'Statut Membre Voyageur'
                  : 'Safari Club Member Status'}
              </span>
              {isReturningCustomer && (
                <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase rounded-full bg-emerald-600 text-white shadow-2xs">
                  {currentTier.discountPercent}% VIP Discount
                </span>
              )}
            </div>
            <h4 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
              {tierTitle}
            </h4>
          </div>
        </div>

        {onOpenProfile && (
          <button
            type="button"
            onClick={onOpenProfile}
            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-amber-900 dark:text-amber-200 bg-amber-100 hover:bg-amber-200 dark:bg-amber-950 dark:hover:bg-amber-900 border border-amber-300 dark:border-amber-700 transition cursor-pointer shrink-0"
          >
            <span>
              {language === 'sw'
                ? 'Muhtasari wa Wasifu'
                : language === 'fr'
                ? 'Profil Voyageur'
                : 'Profile Summary'}
            </span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Badge Stats & Perks */}
      <div className="pt-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        {/* Stat 1: Total Trips */}
        <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 font-black text-sm flex items-center justify-center shrink-0">
            {totalTrips}
          </div>
          <div>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold block">
              {language === 'sw'
                ? 'Jumla ya Safari'
                : language === 'fr'
                ? 'Voyages Enregistrés'
                : 'Total Safaris Booked'}
            </span>
            <span className="font-extrabold text-slate-900 dark:text-white">
              {totalTrips} {totalTrips === 1 ? 'Safari' : 'Safaris Logged'}
            </span>
          </div>
        </div>

        {/* Stat 2: Active Benefit */}
        <div className="p-3 rounded-xl bg-white/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 flex items-center gap-3 sm:col-span-2">
          <div className="w-9 h-9 rounded-lg bg-amber-100 dark:bg-amber-950/70 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0">
            <Gift className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] text-amber-800 dark:text-amber-300 uppercase font-black block">
              {language === 'sw'
                ? 'Faida ya Kiwango Chako'
                : language === 'fr'
                ? 'Privilège Actif'
                : 'Unlocked Member Perk'}
            </span>
            <p className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 truncate">
              {currentPerk}
            </p>
          </div>
        </div>
      </div>

      {/* Next Tier Milestone Bar */}
      {nextTier ? (
        <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 w-full sm:w-auto">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>
              {language === 'sw'
                ? `Safari ${tripsToNextTier} zaidi kufikia ${nextTier.nameSw} (${nextTier.discountPercent}% Punguzo)`
                : language === 'fr'
                ? `Plus que ${tripsToNextTier} safari pour le statut ${nextTier.nameFr} (${nextTier.discountPercent}% Remise)`
                : `${tripsToNextTier} more ${tripsToNextTier === 1 ? 'safari' : 'safaris'} to reach ${nextTier.name} (${nextTier.discountPercent}% VIP)`}
            </span>
          </div>

          {onOpenProfile && (
            <button
              type="button"
              onClick={onOpenProfile}
              className="text-emerald-700 dark:text-emerald-400 hover:underline font-bold text-[11px] cursor-pointer sm:hidden self-start"
            >
              {language === 'sw'
                ? 'Tazama Wasifu Kamili →'
                : language === 'fr'
                ? 'Voir le Profil Complet →'
                : 'View Full Profile & Badges →'}
            </button>
          )}
        </div>
      ) : (
        <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 text-[11px] text-purple-700 dark:text-purple-300 font-bold">
          <Crown className="w-3.5 h-3.5" />
          <span>
            {language === 'sw'
              ? 'Hongera! Umefikia kiwango cha juu cha heshima cha Diamond Legendary Nomad!'
              : language === 'fr'
              ? 'Félicitations ! Vous avez atteint le rang suprême Diamond Legendary Nomad !'
              : 'Highest Honorary Rank Unlocked: Diamond Legendary Nomad VIP!'}
          </span>
        </div>
      )}
    </div>
  );
};
