import React, { useState } from 'react';
import {
  OFFICIAL_TILL_NUMBER,
  OFFICIAL_BUSINESS_NAME,
  TOUR_PACKAGES,
  OFFICIAL_SUPPORT_PHONE,
} from '../data/toursData';
import { formatCurrency } from '../utils/formatters';
import { Currency } from '../types/tour';
import {
  Check,
  Copy,
  Smartphone,
  ShieldCheck,
  Receipt,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { MpesaQrCodeCard } from './MpesaQrCodeCard';

interface PaybillSectionProps {
  currentCurrency: Currency;
  onVerifyCode: (code: string, amount: number, account: string) => void;
  onStartBookingWithPackage: (packageId: string) => void;
  onOpenQrModal?: () => void;
}

export const PaybillSection: React.FC<PaybillSectionProps> = ({
  currentCurrency,
  onVerifyCode,
  onOpenQrModal,
}) => {
  const [copied, setCopied] = useState(false);
  const [selectedPkgId, setSelectedPkgId] = useState<string>(TOUR_PACKAGES[0].id);
  const [guestCount, setGuestCount] = useState<number>(2);
  const [payType, setPayType] = useState<'deposit' | 'full'>('deposit');
  const [manualCode, setManualCode] = useState('');
  const [accountName, setAccountName] = useState('');
  const [stkSimulating, setStkSimulating] = useState(false);
  const [stkSuccessMessage, setStkSuccessMessage] = useState<string | null>(null);
  const { t } = useLanguage();

  const selectedPackage =
    TOUR_PACKAGES.find((p) => p.id === selectedPkgId) || TOUR_PACKAGES[0];

  const totalCostKES = selectedPackage.pricePerPersonKES * guestCount;
  const depositCostKES = Math.round(totalCostKES * 0.3);
  const payableAmountKES = payType === 'deposit' ? depositCostKES : totalCostKES;

  const handleCopyTill = () => {
    navigator.clipboard.writeText(OFFICIAL_TILL_NUMBER);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSimulateSTK = () => {
    if (!accountName.trim()) {
      alert('Please enter your Name before requesting M-Pesa STK prompt.');
      return;
    }
    setStkSimulating(true);
    setStkSuccessMessage(null);

    setTimeout(() => {
      setStkSimulating(false);
      const generatedCode = 'SQ' + Math.floor(100000 + Math.random() * 900000);
      setManualCode(generatedCode);
      setStkSuccessMessage(
        `${t.tillSection.stkDispatched} KES ${payableAmountKES.toLocaleString()} · Till ${OFFICIAL_TILL_NUMBER}. Code: ${generatedCode}`
      );
    }, 1800);
  };

  const handleVerifyManual = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCode.trim()) return;
    onVerifyCode(
      manualCode.toUpperCase(),
      payableAmountKES,
      accountName.trim() || selectedPackage.cityName
    );
  };

  return (
    <section id="till" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Target anchor fallback */}
      <span id="paybill" className="sr-only">Lipa Na M-Pesa Till</span>

      {/* Background glow & subtle patterns */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 bg-emerald-800/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-widest mb-3">
            <span>{t.tillSection.kicker}</span>
            <span aria-hidden="true">·</span>
            <span>{t.tillSection.verifiedBadge}</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            {t.tillSection.title}
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            {t.tillSection.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Official Till Display & Step-by-Step Guide */}
          <div className="lg:col-span-5 space-y-6">
            {/* Till Card */}
            <div className="bg-gradient-to-br from-emerald-800/90 to-emerald-950 p-6 sm:p-8 rounded-3xl border border-emerald-700/60 shadow-2xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-6 border-b border-emerald-700/50">
                <div>
                  <span className="text-xs uppercase tracking-wider text-emerald-300 font-bold block">
                    {t.tillSection.buyGoodsLabel}
                  </span>
                  <div className="text-lg font-bold text-white mt-0.5">
                    {OFFICIAL_BUSINESS_NAME}
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-emerald-300 border border-white/10">
                  <Smartphone className="w-6 h-6" />
                </div>
              </div>

              {/* Big Till Number */}
              <div className="mt-6 bg-black/40 backdrop-blur-md p-5 rounded-2xl border border-emerald-500/30">
                <div className="flex items-center justify-between text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1">
                  <span>{t.tillSection.merchantTill}</span>
                  <span>{t.tillSection.zeroFees}</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-3xl sm:text-4xl font-black tracking-widest text-emerald-300 font-mono select-all">
                    {OFFICIAL_TILL_NUMBER}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyTill}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition shadow-xs cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>{t.tillSection.copied}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>{t.tillSection.copyTill}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Verified Merchant Badge */}
              <div className="mt-4 bg-black/30 backdrop-blur-md p-4 rounded-xl border border-white/10 text-xs">
                <span className="text-slate-400 uppercase tracking-wider block font-semibold mb-1">
                  {t.tillSection.merchantNameTitle}
                </span>
                <p className="text-white font-medium text-sm">
                  {t.tillSection.merchantNameDesc}
                </p>
              </div>

              {/* 4-Step Till Instructions */}
              <div className="mt-6">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300 block mb-3">
                  {t.tillSection.howToPayTitle}
                </span>
                <ol className="text-xs space-y-2.5 text-emerald-100/90 list-decimal list-inside font-normal">
                  <li>{t.tillSection.step1}</li>
                  <li>{t.tillSection.step2}</li>
                  <li>{t.tillSection.step3}</li>
                  <li>{t.tillSection.step4}</li>
                </ol>
              </div>

              <div className="mt-6 pt-4 border-t border-emerald-700/50 flex items-center gap-2 text-xs text-emerald-200">
                <ShieldCheck className="w-4 h-4 text-emerald-300 shrink-0" />
                <span>{t.tillSection.inquiries} <strong>{OFFICIAL_SUPPORT_PHONE}</strong></span>
              </div>
            </div>

            {/* Instant M-Pesa QR Code Scanner Card */}
            <MpesaQrCodeCard onOpenFullModal={onOpenQrModal} />
          </div>

          {/* Right Column: Interactive Tour Cost Calculator & Instant Verification */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-slate-200 dark:border-slate-800">
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {t.tillSection.calculatorTitle}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {t.tillSection.calculatorSubtitle}
                </p>
              </div>
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 px-3 py-1 rounded-full self-start sm:self-auto">
                {t.tillSection.liveBadge}
              </span>
            </div>

            {/* Tour & Guest Selection Form */}
            <div className="mt-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    {t.tillSection.selectPkg}
                  </label>
                  <select
                    value={selectedPkgId}
                    onChange={(e) => setSelectedPkgId(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {TOUR_PACKAGES.map((pkg) => (
                      <option key={pkg.id} value={pkg.id}>
                        {pkg.cityName} - {pkg.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                    {t.tillSection.guestCount}
                  </label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Deposit vs Full Payment Toggle */}
              <div>
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase mb-2">
                  {t.tillSection.paymentOption}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPayType('deposit')}
                    className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                      payType === 'deposit'
                        ? 'border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-300 font-bold'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <div className="text-xs font-bold">{t.tillSection.depositOptionTitle}</div>
                    <div className="text-base text-emerald-800 dark:text-emerald-400 font-extrabold mt-0.5 tabular-nums">
                      KES {depositCostKES.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      {t.tillSection.depositOptionDesc}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPayType('full')}
                    className={`p-3 rounded-xl border text-left transition cursor-pointer ${
                      payType === 'full'
                        ? 'border-emerald-600 bg-emerald-50/70 dark:bg-emerald-950/40 text-emerald-950 dark:text-emerald-300 font-bold'
                        : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <div className="text-xs font-bold">{t.tillSection.fullOptionTitle}</div>
                    <div className="text-base text-slate-900 dark:text-white font-extrabold mt-0.5 tabular-nums">
                      KES {totalCostKES.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                      {t.tillSection.fullOptionDesc}
                    </div>
                  </button>
                </div>
              </div>

              {/* Lead Traveler Name */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                  {t.tillSection.travelerName}
                </label>
                <input
                  type="text"
                  value={accountName}
                  onChange={(e) => setAccountName(e.target.value)}
                  placeholder="e.g. Samuel Mutua"
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-slate-400"
                />
              </div>

              {/* Summary Calculation Box */}
              <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wide font-semibold block">
                    {t.tillSection.amountToSend} {OFFICIAL_TILL_NUMBER}
                  </span>
                  <div className="text-2xl font-black text-emerald-800 dark:text-emerald-400 tabular-nums">
                    KES {payableAmountKES.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400">
                    {currentCurrency !== 'KES' && `(${t.tillSection.equivalent} ${formatCurrency(payableAmountKES, currentCurrency)})`}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSimulateSTK}
                  disabled={stkSimulating}
                  className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 disabled:opacity-50 text-white font-bold rounded-xl text-xs transition cursor-pointer shadow-xs whitespace-nowrap"
                >
                  {stkSimulating ? t.tillSection.sendingStk : t.tillSection.requestStk}
                </button>
              </div>

              {stkSuccessMessage && (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 rounded-xl text-xs leading-relaxed animate-fadeIn">
                  <div className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <div>{stkSuccessMessage}</div>
                  </div>
                </div>
              )}

              {/* Manual Verification Form */}
              <form onSubmit={handleVerifyManual} className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">
                  {t.tillSection.alreadyPaid}
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={manualCode}
                    onChange={(e) => setManualCode(e.target.value)}
                    placeholder="e.g. QKH7129XYZ"
                    className="flex-1 px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono uppercase tracking-wider text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-slate-400"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-slate-900 dark:bg-emerald-700 hover:bg-slate-800 dark:hover:bg-emerald-600 text-white font-bold rounded-xl text-xs sm:text-sm transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
                  >
                    <Receipt className="w-4 h-4" />
                    <span>{t.tillSection.verifyButton}</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {t.tillSection.verifyHelp} {OFFICIAL_SUPPORT_PHONE}.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
