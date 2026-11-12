import React, { useState, useEffect } from 'react';
import {
  getTravelerProfile,
  simulateTravelerTrips,
  FREQUENT_TRAVELER_TIERS,
  TravelerProfile,
  TravelerBadge,
} from '../utils/frequentTraveler';
import {
  X,
  Award,
  Crown,
  Sparkles,
  Compass,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Gift,
  Calendar,
  Phone,
  Mail,
  User,
  MessageCircle,
  TrendingUp,
  RotateCcw,
  Sun,
  Globe,
  Star,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { OFFICIAL_SUPPORT_PHONE, OFFICIAL_TILL_NUMBER, OFFICIAL_BUSINESS_NAME } from '../data/toursData';

interface TravelerProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  phone?: string;
}

export const TravelerProfileModal: React.FC<TravelerProfileModalProps> = ({
  isOpen,
  onClose,
  phone,
}) => {
  const { language } = useLanguage();
  const [profile, setProfile] = useState<TravelerProfile>(() => getTravelerProfile(phone));
  const [activeTab, setActiveTab] = useState<'overview' | 'badges' | 'history'>('overview');

  useEffect(() => {
    if (isOpen) {
      setProfile(getTravelerProfile(phone));
    }
  }, [isOpen, phone]);

  if (!isOpen) return null;

  const {
    travelerId,
    fullName,
    email,
    totalTrips,
    memberSince,
    isReturningCustomer,
    currentTier,
    nextTier,
    tripsToNextTier,
    earnedBadges,
    pastBookings,
  } = profile;

  const handleSimulate = (count: number) => {
    const updated = simulateTravelerTrips(count, fullName);
    setProfile(updated);
  };

  const getTierIcon = (tierId: string, sizeClass = 'w-5 h-5') => {
    switch (tierId) {
      case 'legendary_nomad':
        return <Crown className={`${sizeClass} text-purple-400`} />;
      case 'safari_connoisseur':
        return <Award className={`${sizeClass} text-yellow-400`} />;
      case 'savannah_wanderer':
        return <ShieldCheck className={`${sizeClass} text-amber-400`} />;
      case 'first_time':
      default:
        return <Compass className={`${sizeClass} text-emerald-400`} />;
    }
  };

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Crown':
        return <Crown className="w-5 h-5" />;
      case 'Award':
        return <Award className="w-5 h-5" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5" />;
      case 'Sun':
        return <Sun className="w-5 h-5" />;
      case 'Globe':
        return <Globe className="w-5 h-5" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-5 h-5" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'Compass':
      default:
        return <Compass className="w-5 h-5" />;
    }
  };

  // Localized tier data
  const tierTitle =
    language === 'sw'
      ? currentTier.titleSw
      : language === 'fr'
      ? currentTier.titleFr
      : currentTier.title;

  const tierPerks =
    language === 'sw'
      ? currentTier.perksSw
      : language === 'fr'
      ? currentTier.perksFr
      : currentTier.perks;

  const whatsappMessage = encodeURIComponent(
    `Hello SafariQuest, this is ${fullName} (Traveler Ref: ${travelerId}, Tier: ${currentTier.name}). I am inquiring about my Frequent Traveler benefits.`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 relative my-8 animate-fadeIn">
        {/* Header with Tier styling */}
        <div
          className={`p-6 sm:p-7 bg-linear-to-r ${currentTier.cardGradient} text-white border-b border-slate-800 relative`}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/10 border-2 border-amber-400/80 backdrop-blur-md flex items-center justify-center text-white shadow-lg shrink-0">
                {getTierIcon(currentTier.id, 'w-8 h-8')}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500 text-slate-950">
                    {isReturningCustomer
                      ? language === 'sw'
                        ? 'Msafiri wa Mara kwa Mara'
                        : language === 'fr'
                        ? 'Voyageur Régulier'
                        : 'Frequent Traveler'
                      : language === 'sw'
                      ? 'Mwanachama Mpya'
                      : language === 'fr'
                      ? 'Nouveau Membre'
                      : 'New Explorer'}
                  </span>
                  <span className="text-xs text-amber-300/90 font-mono font-bold">
                    Ref: {travelerId}
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight">{fullName}</h3>
                <p className="text-xs text-slate-300 font-medium">{tierTitle}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition cursor-pointer self-start shrink-0"
              aria-label="Close Profile"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick contact / member strip */}
          <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
            <div className="flex items-center gap-4 flex-wrap">
              <span className="inline-flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>{profile.phone}</span>
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Member Since {memberSince}</span>
              </span>
            </div>

            <a
              href={`https://wa.me/254752632206?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="px-6 pt-4 border-b border-slate-200 dark:border-slate-800 flex gap-6 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`pb-3 transition-colors cursor-pointer border-b-2 ${
              activeTab === 'overview'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            {language === 'sw'
              ? 'Faida & Hadhi'
              : language === 'fr'
              ? 'Statut & Avantages'
              : 'Status & Benefits'}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('badges')}
            className={`pb-3 transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
              activeTab === 'badges'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <span>
              {language === 'sw' ? 'Nishani Zilizoshindwa' : language === 'fr' ? 'Badges Gagnés' : 'Badges Earned'}
            </span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              {earnedBadges.filter((b) => b.unlocked).length}
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('history')}
            className={`pb-3 transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300'
            }`}
          >
            <span>
              {language === 'sw' ? 'Historia ya Safari' : language === 'fr' ? 'Historique Voyages' : 'Travel History'}
            </span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {totalTrips}
            </span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-7 max-h-[62vh] overflow-y-auto space-y-6">
          {activeTab === 'overview' && (
            <>
              {/* Stats Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
                  <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">
                    {language === 'sw' ? 'Safari Zilizopangwa' : language === 'fr' ? 'Total Safaris' : 'Safaris Completed'}
                  </span>
                  <span className="text-xl font-black text-slate-900 dark:text-white mt-0.5 block">
                    {totalTrips}
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                  <span className="text-[10px] uppercase font-bold text-amber-800 dark:text-amber-300 block">
                    {language === 'sw' ? 'Punguzo la VIP' : language === 'fr' ? 'Remise VIP Active' : 'VIP Discount'}
                  </span>
                  <span className="text-xl font-black text-amber-700 dark:text-amber-400 mt-0.5 block">
                    {currentTier.discountPercent}% OFF
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                  <span className="text-[10px] uppercase font-bold text-emerald-800 dark:text-emerald-300 block">
                    {language === 'sw' ? 'Pointi za Safari' : language === 'fr' ? 'Points Fidélité' : 'Club Points'}
                  </span>
                  <span className="text-xl font-black text-emerald-800 dark:text-emerald-400 mt-0.5 block">
                    {totalTrips * 450} pts
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
                  <span className="text-[10px] uppercase font-bold text-slate-500 dark:text-slate-400 block">
                    {language === 'sw' ? 'Malipo M-Pesa' : language === 'fr' ? 'Paiement Sécurisé' : 'M-Pesa Verified'}
                  </span>
                  <span className="text-xs font-mono font-bold text-emerald-800 dark:text-emerald-400 mt-1 block">
                    Till {OFFICIAL_TILL_NUMBER}
                  </span>
                </div>
              </div>

              {/* Tier Progress Milestone Card */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Frequent Traveler Rank Progress</span>
                  </span>
                  <span className="font-bold text-emerald-700 dark:text-emerald-400">
                    {nextTier
                      ? `${tripsToNextTier} more safari to reach ${nextTier.name}`
                      : 'Max VIP Tier Reached'}
                  </span>
                </div>

                {/* Progress bar across 4 tiers */}
                <div className="grid grid-cols-4 gap-1.5 pt-1">
                  {FREQUENT_TRAVELER_TIERS.map((tier) => {
                    const isUnlocked = totalTrips >= tier.minTrips;
                    const isCurrent = currentTier.id === tier.id;
                    return (
                      <div key={tier.id} className="space-y-1">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            isCurrent
                              ? 'bg-amber-500 ring-2 ring-amber-400/50'
                              : isUnlocked
                              ? 'bg-emerald-600'
                              : 'bg-slate-200 dark:bg-slate-700'
                          }`}
                        />
                        <div className="text-[10px] truncate text-slate-600 dark:text-slate-400 text-center font-bold">
                          {tier.name.split(' ')[0]}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Unlocked Perks List */}
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Gift className="w-4 h-4 text-amber-500" />
                  <span>
                    {language === 'sw'
                      ? 'Faida Zako Rasmi za Mteja wa Mara kwa Mara'
                      : language === 'fr'
                      ? 'Vos Avantages Officiels de Voyageur Régulier'
                      : 'Your Active Returning Customer Privileges'}
                  </span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {tierPerks.map((perk, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/60 flex items-start gap-2.5"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-slate-700 dark:text-slate-200 font-medium leading-relaxed">
                        {perk}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'badges' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span>
                  {language === 'sw'
                    ? 'Nishani za heshima unazokusanya unapokamilisha safari'
                    : language === 'fr'
                    ? 'Badges d’honneur obtenus au fil de vos aventures'
                    : 'Honorary badges unlocked through your safari adventures'}
                </span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {earnedBadges.filter((b) => b.unlocked).length} / {earnedBadges.length} Unlocked
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {earnedBadges.map((badge) => {
                  const badgeName =
                    language === 'sw' ? badge.nameSw : language === 'fr' ? badge.nameFr : badge.name;
                  const badgeDesc =
                    language === 'sw'
                      ? badge.descriptionSw
                      : language === 'fr'
                      ? badge.descriptionFr
                      : badge.description;

                  return (
                    <div
                      key={badge.id}
                      className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 ${
                        badge.unlocked
                          ? 'bg-white dark:bg-slate-800/90 border-amber-300 dark:border-amber-700/80 shadow-xs'
                          : 'bg-slate-50/50 dark:bg-slate-900/40 border-slate-200 dark:border-slate-800 opacity-60'
                      }`}
                    >
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          badge.unlocked
                            ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/80 dark:text-amber-300'
                            : 'bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-600'
                        }`}
                      >
                        {badge.unlocked ? getBadgeIcon(badge.icon) : <Lock className="w-4 h-4" />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 mb-0.5">
                          <h5 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {badgeName}
                          </h5>
                          {badge.unlocked ? (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 shrink-0">
                              Earned
                            </span>
                          ) : (
                            <span className="text-[9px] text-slate-400 font-semibold shrink-0">
                              Locked
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                          {badgeDesc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Registered Safaris ({pastBookings.length})
              </h4>
              <div className="space-y-2">
                {pastBookings.map((trip) => (
                  <div
                    key={trip.id}
                    className="p-3.5 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
                          {trip.id}
                        </span>
                        <span className="px-1.5 py-0.2 text-[9px] font-bold rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          Verified M-Pesa
                        </span>
                      </div>
                      <h5 className="font-black text-slate-900 dark:text-white mt-1">
                        {trip.packageName}
                      </h5>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-3 mt-0.5">
                        <span>Date: {trip.travelDate}</span>
                        <span>·</span>
                        <span>{trip.guestsCount} Persons</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="font-mono font-black text-emerald-800 dark:text-emerald-400 text-sm block">
                        KES {trip.totalAmountKES.toLocaleString()}
                      </span>
                      {trip.mpesaCode && (
                        <span className="text-[10px] text-slate-400 font-mono">
                          Ref: {trip.mpesaCode}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Tier Simulator for Instant Review & Demo */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-300 dark:border-amber-800/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-amber-900 dark:text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Test & Simulate Returning Customer Badge Tiers:</span>
              </span>
              <button
                type="button"
                onClick={() => handleSimulate(1)}
                className="text-[11px] text-amber-800 dark:text-amber-400 hover:underline inline-flex items-center gap-1 font-bold cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset to 1st Trip</span>
              </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
              <button
                type="button"
                onClick={() => handleSimulate(1)}
                className={`py-2 px-2.5 rounded-xl font-bold border transition text-center cursor-pointer ${
                  totalTrips === 1
                    ? 'bg-emerald-700 text-white border-emerald-800'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-500'
                }`}
              >
                <div className="text-[10px] opacity-75">1 Safari</div>
                <div>New Explorer</div>
              </button>

              <button
                type="button"
                onClick={() => handleSimulate(2)}
                className={`py-2 px-2.5 rounded-xl font-bold border transition text-center cursor-pointer ${
                  totalTrips >= 2 && totalTrips <= 3
                    ? 'bg-amber-600 text-white border-amber-700'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-amber-500'
                }`}
              >
                <div className="text-[10px] opacity-75">2 Safaris</div>
                <div>5% Frequent VIP</div>
              </button>

              <button
                type="button"
                onClick={() => handleSimulate(4)}
                className={`py-2 px-2.5 rounded-xl font-bold border transition text-center cursor-pointer ${
                  totalTrips >= 4 && totalTrips <= 6
                    ? 'bg-yellow-600 text-white border-yellow-700'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-yellow-500'
                }`}
              >
                <div className="text-[10px] opacity-75">4 Safaris</div>
                <div>10% Gold Connoisseur</div>
              </button>

              <button
                type="button"
                onClick={() => handleSimulate(7)}
                className={`py-2 px-2.5 rounded-xl font-bold border transition text-center cursor-pointer ${
                  totalTrips >= 7
                    ? 'bg-purple-700 text-white border-purple-800'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-purple-500'
                }`}
              >
                <div className="text-[10px] opacity-75">7+ Safaris</div>
                <div>15% Diamond Nomad</div>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <div>
            Verified by <strong className="text-slate-800 dark:text-slate-200">{OFFICIAL_BUSINESS_NAME}</strong>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 dark:bg-slate-700 hover:bg-slate-900 text-white font-bold rounded-xl transition cursor-pointer"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
};
