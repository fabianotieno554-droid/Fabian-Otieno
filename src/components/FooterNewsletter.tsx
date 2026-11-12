import React, { useState, useEffect } from 'react';
import {
  Bell,
  TrendingDown,
  Compass,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Copy,
  Check,
  MessageCircle,
  Mail,
  Zap,
  Phone,
  Flame,
  ArrowRight,
  RefreshCw,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface AlertTopic {
  id: string;
  label: string;
  labelSw: string;
  labelFr: string;
  badge: string;
  iconName: 'price' | 'safari' | 'beach' | 'intl';
}

const ALERT_TOPICS: AlertTopic[] = [
  {
    id: 'price-drops',
    label: 'Tour Package Price Drops & Flash Sales',
    labelSw: 'Punguzo la Bei za Vifurushi & Ofa za Ghafla',
    labelFr: 'Baisses de Prix & Ventes Flash Séjours',
    badge: 'Save up to 30%',
    iconName: 'price',
  },
  {
    id: 'safari-availability',
    label: 'Peak Safari Availability (Mara & Amboseli)',
    labelSw: 'Nafasi za Safari za Mbugani (Mara & Amboseli)',
    labelFr: 'Disponibilités Safari de Pointe (Mara & Amboseli)',
    badge: 'High Demand',
    iconName: 'safari',
  },
  {
    id: 'beach-coastal',
    label: 'Coastal Retreats & Diani / Zanzibar Openings',
    labelSw: 'Ofa za Fukwe za Diani & Zanzibar',
    labelFr: 'Retraites Côtières & Diani / Zanzibar',
    badge: 'Resort Deals',
    iconName: 'beach',
  },
  {
    id: 'international-specials',
    label: 'UAE & Dubai Honeymoon / City Reductions',
    labelSw: 'Punguzo la Safari za Dubai & Honeymoon',
    labelFr: 'Réductions Voyages Dubai & Lune de Miel',
    badge: 'Luxury Deals',
    iconName: 'intl',
  },
];

const RECENT_LIVE_ALERTS = [
  {
    id: 'alt-1',
    time: '2 hours ago',
    timeSw: 'Masaa 2 yaliyopita',
    timeFr: 'Il y a 2 heures',
    text: 'Maasai Mara 3-Day Safari price dropped by 15% (Save KES 6,500 / $50)',
    textSw: 'Safari ya Maasai Mara ya siku 3 imepunguzwa bei kwa 15% (Okoa KES 6,500)',
    textFr: 'Safari 3 Jours Masai Mara : baisse de 15% (Économisez 6 500 KES / 50$)',
    type: 'price',
  },
  {
    id: 'alt-2',
    time: '4 hours ago',
    timeSw: 'Masaa 4 yaliyopita',
    timeFr: 'Il y a 4 heures',
    text: '2 Luxury Tented Camp Suites opened up for Great Migration season',
    textSw: 'Vyumba 2 vya kambi ya kifahari vimefunguka kwa msimu wa Great Migration',
    textFr: '2 suites en lodge de luxe rouvertes pour la saison de la Grande Migration',
    type: 'availability',
  },
  {
    id: 'alt-3',
    time: 'Yesterday',
    timeSw: 'Jana',
    timeFr: 'Hier',
    text: 'New 6-Day UAE Ultra-Luxury Honeymoon Package launched at $3,450 USD',
    textSw: 'Kifurushi kipya cha Honeymoon cha UAE siku 6 kimezinduliwa kwa $3,450 USD',
    textFr: 'Nouveau forfait Lune de Miel 6 Jours aux Émirats lancé à 3 450 $ USD',
    type: 'special',
  },
];

const PROMO_VOUCHER_CODE = 'SAFARI10';

export const FooterNewsletter: React.FC = () => {
  const { language } = useLanguage();

  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    'price-drops',
    'safari-availability',
  ]);
  const [enableWhatsApp, setEnableWhatsApp] = useState<boolean>(false);
  const [alertFrequency, setAlertFrequency] = useState<'instant' | 'weekly'>('instant');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [sampleAlertSent, setSampleAlertSent] = useState<boolean>(false);

  // Load saved subscription preferences from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('safariquest_travel_alerts');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.email) {
          setEmail(parsed.email);
        }
        if (parsed?.phone) {
          setPhone(parsed.phone);
          setEnableWhatsApp(true);
        }
        if (Array.isArray(parsed?.topics) && parsed.topics.length > 0) {
          setSelectedTopics(parsed.topics);
        }
        if (parsed?.frequency) {
          setAlertFrequency(parsed.frequency);
        }
      }
    } catch {
      // Safe fallback
    }
  }, []);

  const toggleTopic = (topicId: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      setErrorMessage(
        language === 'sw'
          ? 'Tafadhali weka anwani sahihi ya barua pepe.'
          : language === 'fr'
          ? 'Veuillez renseigner une adresse email valide.'
          : 'Please enter a valid email address to receive travel alerts.'
      );
      return;
    }

    if (enableWhatsApp && phone.trim().length > 0 && phone.trim().length < 9) {
      setErrorMessage(
        language === 'sw'
          ? 'Tafadhali weka nambari sahihi ya simu ya WhatsApp.'
          : language === 'fr'
          ? 'Veuillez indiquer un numéro WhatsApp valide.'
          : 'Please enter a valid phone number for WhatsApp alerts.'
      );
      return;
    }

    if (selectedTopics.length === 0) {
      setErrorMessage(
        language === 'sw'
          ? 'Tafadhali chagua angalau aina moja ya taarifa unayotaka kupokea.'
          : language === 'fr'
          ? 'Veuillez sélectionner au moins un type d’alerte.'
          : 'Please select at least one alert category (e.g. Price Drops or Safari Availability).'
      );
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      try {
        const payload = {
          email: trimmedEmail,
          phone: enableWhatsApp ? phone.trim() : null,
          topics: selectedTopics,
          frequency: alertFrequency,
          subscribedAt: new Date().toISOString(),
          voucherCode: PROMO_VOUCHER_CODE,
        };
        localStorage.setItem('safariquest_travel_alerts', JSON.stringify(payload));
      } catch {
        // Safe fallback
      }
      setIsSubmitting(false);
      setIsSuccess(true);
    }, 600);
  };

  const handleCopyCode = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(PROMO_VOUCHER_CODE);
      } else {
        const ta = document.createElement('textarea');
        ta.value = PROMO_VOUCHER_CODE;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    } catch {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleSendSampleAlert = () => {
    setSampleAlertSent(true);
    setTimeout(() => setSampleAlertSent(false), 4000);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setErrorMessage('');
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-emerald-950/70 border border-emerald-800/40 shadow-2xl p-6 sm:p-8 lg:p-10 mb-12">
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {!isSuccess ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Alerts Value Prop & Real-Time Ticker */}
            <div className="lg:col-span-6 space-y-4 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-700/60 text-emerald-400 text-[11px] font-bold tracking-wide uppercase">
                <Bell className="w-3.5 h-3.5 text-emerald-400 animate-bounce" />
                <span>Travel Alerts Radar</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span className="text-amber-300">Live Price Drops & Openings</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                {language === 'sw'
                  ? 'Pokea Taarifa za Punguzo la Bei na Nafasi za Safari'
                  : language === 'fr'
                  ? 'Recevez les Alertes Baisse de Prix & Disponibilités Safari'
                  : 'Subscribe for Travel Alerts & Safari Price Drops'}
              </h3>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                {language === 'sw'
                  ? 'Kuwa wa kwanza kufahamu pale bei za vifurushi vya safari zinaposhuka, ofa za ghafla zinapotokea, au nafasi za hoteli na kambi za Maasai Mara zinapofunguka.'
                  : language === 'fr'
                  ? 'Soyez immédiatement informé des baisses de tarifs sur nos forfaits, ventes flash et nouvelles disponibilités dans les lodges de prestige du Masai Mara et d’Amboseli.'
                  : 'Get immediate notifications when tour packages drop in price, flash discounts go live, or sold-out Maasai Mara, Amboseli, and coastal lodge slots open up.'}
              </p>

              {/* Alert Category Preferences */}
              <div className="pt-2">
                <span className="text-[11px] uppercase font-bold tracking-wider text-slate-400 block mb-2.5">
                  {language === 'sw'
                    ? 'Chagua taarifa unazotaka (bofya kubadili):'
                    : language === 'fr'
                    ? 'Personnalisez vos alertes (cliquez pour choisir) :'
                    : 'Select Your Alert Preferences (Click to toggle):'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {ALERT_TOPICS.map((topic) => {
                    const isSelected = selectedTopics.includes(topic.id);
                    const topicLabel =
                      language === 'sw'
                        ? topic.labelSw
                        : language === 'fr'
                        ? topic.labelFr
                        : topic.label;
                    return (
                      <button
                        key={topic.id}
                        type="button"
                        onClick={() => toggleTopic(topic.id)}
                        className={`flex items-center justify-between p-2.5 rounded-xl border text-left transition-all duration-150 cursor-pointer ${
                          isSelected
                            ? 'bg-emerald-950/80 border-emerald-500 text-white shadow-sm shadow-emerald-950'
                            : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2 min-w-0 pr-2">
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                              isSelected
                                ? 'bg-emerald-600 border-emerald-500 text-white'
                                : 'border-slate-600'
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3" />}
                          </div>
                          <span className="text-xs font-medium truncate">{topicLabel}</span>
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-800 text-amber-400 border border-slate-700 shrink-0">
                          {topic.badge}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Live Radar Ticker: Recent Real Alerts */}
              <div className="pt-2">
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    <span className="flex items-center gap-1.5 text-emerald-400">
                      <Zap className="w-3 h-3 text-amber-400" />
                      <span>Recent Live Alerts Dispatched</span>
                    </span>
                    <span className="flex items-center gap-1 text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>Live Monitoring</span>
                    </span>
                  </div>
                  <div className="space-y-1">
                    {RECENT_LIVE_ALERTS.slice(0, 2).map((item) => {
                      const text =
                        language === 'sw'
                          ? item.textSw
                          : language === 'fr'
                          ? item.textFr
                          : item.text;
                      const time =
                        language === 'sw'
                          ? item.timeSw
                          : language === 'fr'
                          ? item.timeFr
                          : item.time;
                      return (
                        <div key={item.id} className="flex items-center justify-between text-xs text-slate-300">
                          <span className="truncate pr-2">• {text}</span>
                          <span className="text-[10px] text-slate-500 shrink-0 font-mono">{time}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Subscription Form */}
            <div className="lg:col-span-6">
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-slate-950/85 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-emerald-900/50 shadow-2xl space-y-4 text-left"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <Flame className="w-4 h-4 text-amber-400" />
                    <span>Instant Alert Activation</span>
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                    100% Free Service
                  </span>
                </div>

                {/* Email Input */}
                <div className="space-y-1.5">
                  <label htmlFor="travel-alerts-email" className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                    <span>Email Address for Alerts:</span>
                    <span className="text-[10px] text-emerald-400 font-normal">Primary Channel</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      id="travel-alerts-email"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errorMessage) setErrorMessage('');
                      }}
                      placeholder="e.g. traveler@domain.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-900 text-white placeholder-slate-500 rounded-xl border border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs sm:text-sm"
                      required
                    />
                  </div>
                </div>

                {/* WhatsApp Notification Toggle */}
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="enable-whatsapp-toggle"
                      className="flex items-center gap-2 text-xs font-semibold text-slate-200 cursor-pointer select-none"
                    >
                      <MessageCircle className="w-4 h-4 text-emerald-400" />
                      <span>Also send high-priority WhatsApp alerts</span>
                    </label>
                    <input
                      id="enable-whatsapp-toggle"
                      type="checkbox"
                      checked={enableWhatsApp}
                      onChange={(e) => setEnableWhatsApp(e.target.checked)}
                      className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-700 bg-slate-800 cursor-pointer"
                    />
                  </div>

                  {enableWhatsApp && (
                    <div className="pt-1 space-y-1 animate-fade-in">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                          <Phone className="w-3.5 h-3.5" />
                        </div>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="WhatsApp number (e.g. +254 7XX XXX XXX)"
                          className="w-full pl-9 pr-3 py-2 bg-slate-950 text-white placeholder-slate-500 rounded-lg border border-slate-700 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 block">
                        Reserved strictly for urgent last-minute drops and permit cancellations.
                      </span>
                    </div>
                  )}
                </div>

                {/* Alert Sensitivity / Frequency */}
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-400 font-medium">Alert Frequency:</span>
                  <div className="flex items-center gap-1 p-1 bg-slate-900 rounded-lg border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setAlertFrequency('instant')}
                      className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                        alertFrequency === 'instant'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      ⚡ Instant Ping
                    </button>
                    <button
                      type="button"
                      onClick={() => setAlertFrequency('weekly')}
                      className={`px-2.5 py-1 rounded text-[11px] font-bold transition-colors cursor-pointer ${
                        alertFrequency === 'weekly'
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      📅 Weekly Digest
                    </button>
                  </div>
                </div>

                {/* Error feedback */}
                {errorMessage && (
                  <p className="text-rose-400 text-xs font-semibold flex items-center gap-1.5 pt-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                    <span>{errorMessage}</span>
                  </p>
                )}

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-all duration-150 shadow-lg shadow-emerald-950/60 disabled:opacity-75 cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Activating Your Travel Radar...</span>
                    </>
                  ) : (
                    <>
                      <Bell className="w-4 h-4 text-emerald-200" />
                      <span>Activate Free Travel & Price Alerts</span>
                    </>
                  )}
                </button>

                {/* Micro-copy & privacy */}
                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>No spam. 1-click unsubscribe anytime.</span>
                  </span>
                  <span className="text-amber-400 font-medium">Includes 10% Welcome Voucher</span>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* Success Confirmation State */
          <div className="bg-slate-950/90 backdrop-blur-md rounded-2xl p-6 sm:p-8 lg:p-10 border border-emerald-500/50 text-center space-y-6 animate-fade-in max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-400 shadow-xl shadow-emerald-950 mx-auto">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-400 text-xs font-mono border border-emerald-800">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Radar Active: Monitoring Tour Rates & Safari Permits</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {language === 'sw'
                  ? 'Karibu! Taarifa Zako za Safari Zimeanzishwa'
                  : language === 'fr'
                  ? 'Félicitations ! Vos Alertes Voyage sont Activées'
                  : 'You’re Subscribed to Safari & Tour Travel Alerts!'}
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
                We will notify <strong className="text-white">{email}</strong>{' '}
                {enableWhatsApp && phone && (
                  <span>
                    and WhatsApp (<strong className="text-emerald-400">{phone}</strong>){' '}
                  </span>
                )}
                instantly whenever package prices drop or peak migration camp slots open up.
              </p>
            </div>

            {/* Active Subscribed Tags Summary */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 max-w-lg mx-auto text-left space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Active Alert Feeds:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedTopics.map((id) => {
                  const topic = ALERT_TOPICS.find((t) => t.id === id);
                  return (
                    <span
                      key={id}
                      className="px-2.5 py-1 rounded-md bg-emerald-950 text-emerald-300 border border-emerald-800/80 text-xs font-semibold"
                    >
                      ✓ {topic?.label || id}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Welcome Voucher Reward Card */}
            <div className="max-w-lg mx-auto p-4 rounded-2xl bg-gradient-to-r from-emerald-950/80 to-slate-900 border border-emerald-700/60 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-left space-y-0.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>Welcome Reward: 10% Off Any Safari</span>
                </span>
                <span className="text-xl font-mono font-black text-white tracking-widest block">
                  {PROMO_VOUCHER_CODE}
                </span>
                <span className="text-[10px] text-slate-400 block">
                  Quote code at booking or on Safaricom Till 6608497
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopyCode}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  copiedCode
                    ? 'bg-emerald-600 text-white'
                    : 'bg-emerald-900/80 hover:bg-emerald-800 text-emerald-200 border border-emerald-600'
                }`}
              >
                {copiedCode ? (
                  <>
                    <Check className="w-4 h-4 text-white" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-emerald-300" />
                    <span>Copy Voucher</span>
                  </>
                )}
              </button>
            </div>

            {/* Test Sample Alert Trigger & Reset */}
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2 text-xs">
              <button
                type="button"
                onClick={handleSendSampleAlert}
                className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer transition-colors"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Test simulated price-drop alert</span>
              </button>
              <span className="text-slate-600">·</span>
              <button
                type="button"
                onClick={handleReset}
                className="text-slate-400 hover:text-white underline cursor-pointer transition-colors"
              >
                Change preferences or register another email
              </button>
            </div>

            {sampleAlertSent && (
              <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-500 text-left text-xs text-white max-w-lg mx-auto flex items-start gap-2.5 animate-bounce">
                <Bell className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-emerald-300">Simulated Alert Dispatched!</strong>
                  <span>"🔔 FLASH ALERT: 3-Day Maasai Mara Sunrise Safari just dropped by KES 6,500! 3 vehicles remaining."</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
