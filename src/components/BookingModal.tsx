import React, { useState } from 'react';
import { CityDestination, TourPackage, Currency, BookingSubmission } from '../types/tour';
import { CITIES_DATA, TOUR_PACKAGES, OFFICIAL_TILL_NUMBER } from '../data/toursData';
import { X, Calendar, User, Phone, Mail, Copy, Check } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCity?: CityDestination | null;
  initialPackage?: TourPackage | null;
  currentCurrency: Currency;
  onBookingSubmit: (booking: BookingSubmission) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialPackage,
  onBookingSubmit,
}) => {
  if (!isOpen) return null;

  const [selectedPkgId, setSelectedPkgId] = useState<string>(
    initialPackage?.id || TOUR_PACKAGES[0].id
  );
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [travelDate, setTravelDate] = useState(
    new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0]
  );
  const [guestsCount, setGuestsCount] = useState<number>(2);
  const [paymentType, setPaymentType] = useState<'deposit' | 'full'>('deposit');
  const [mpesaCode, setMpesaCode] = useState('');
  const [notes] = useState('');
  const [copied, setCopied] = useState(false);
  const { t } = useLanguage();

  const activePackage =
    TOUR_PACKAGES.find((p) => p.id === selectedPkgId) || TOUR_PACKAGES[0];
  const activeCity =
    CITIES_DATA.find((c) => c.id === activePackage.cityId) || CITIES_DATA[0];

  const totalAmountKES = activePackage.pricePerPersonKES * guestsCount;
  const depositAmountKES = Math.round(totalAmountKES * 0.3);
  const payableAmountKES = paymentType === 'deposit' ? depositAmountKES : totalAmountKES;

  const handleCopyTill = () => {
    navigator.clipboard.writeText(OFFICIAL_TILL_NUMBER);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !email) {
      alert('Please fill in your name, phone and email.');
      return;
    }

    const booking: BookingSubmission = {
      id: 'SQ-' + Math.floor(100000 + Math.random() * 900000),
      fullName,
      email,
      phone,
      cityId: activeCity.id,
      packageId: activePackage.id,
      packageName: activePackage.title,
      travelDate,
      guestsCount,
      totalAmountKES,
      depositAmountKES,
      paymentType,
      mpesaCode: mpesaCode.trim().toUpperCase() || undefined,
      status: mpesaCode.trim() ? 'confirmed' : 'pending_verification',
      createdAt: new Date().toISOString(),
      notes,
    };

    onBookingSubmit(booking);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 relative my-8 animate-fadeIn">
        {/* Header */}
        <div className="bg-slate-900 dark:bg-slate-950 text-white p-6 flex items-center justify-between border-b border-slate-800">
          <div>
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest block">
              {t.modals.bookSubtitle}
            </span>
            <h3 className="text-xl font-bold mt-1">{t.modals.bookTitle}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition cursor-pointer"
            aria-label={t.modals.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
          {/* Till Reminder Banner */}
          <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-xl flex items-center justify-between text-xs text-emerald-950 dark:text-emerald-200">
            <div>
              <span className="font-semibold text-slate-600 dark:text-slate-300 block">Safaricom Till Number:</span>
              <strong className="text-base text-emerald-800 dark:text-emerald-400 font-mono tracking-wider font-extrabold">
                {OFFICIAL_TILL_NUMBER}
              </strong>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Lipa Na M-Pesa · Buy Goods</span>
            </div>
            <button
              type="button"
              onClick={handleCopyTill}
              className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold text-xs flex items-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Till'}</span>
            </button>
          </div>

          {/* Tour Selection */}
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
              {t.modals.selectTour}
            </label>
            <select
              value={selectedPkgId}
              onChange={(e) => setSelectedPkgId(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {TOUR_PACKAGES.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.cityName} — {pkg.title} ({pkg.durationDays} Days)
                </option>
              ))}
            </select>
          </div>

          {/* User Details: Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                {t.modals.fullName}
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Grace Wambui"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                {t.modals.phone}
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0712 345 678"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Email & Travel Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                {t.modals.email}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="grace@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                {t.modals.date}
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="date"
                  required
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Guests Count & Payment Split */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                {t.modals.guests}
              </label>
              <select
                value={guestsCount}
                onChange={(e) => setGuestsCount(Number(e.target.value))}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === 1 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
                {t.modals.paymentType}
              </label>
              <select
                value={paymentType}
                onChange={(e) => setPaymentType(e.target.value as 'deposit' | 'full')}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="deposit">30% Reservation Deposit</option>
                <option value="full">100% Full Payment</option>
              </select>
            </div>
          </div>

          {/* M-Pesa Code */}
          <div>
            <label className="block text-xs font-bold text-slate-600 dark:text-slate-300 uppercase mb-1">
              {t.modals.mpesaCode}
            </label>
            <input
              type="text"
              value={mpesaCode}
              onChange={(e) => setMpesaCode(e.target.value)}
              placeholder="e.g. QKH7129XYZ"
              className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-mono uppercase tracking-wider text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 placeholder:text-slate-400"
            />
          </div>

          {/* Pricing Summary */}
          <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold block">
                {paymentType === 'deposit' ? t.modals.depositPayable : t.modals.totalPrice}
              </span>
              <div className="text-xl font-black text-emerald-800 dark:text-emerald-400 tabular-nums">
                KES {payableAmountKES.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-500 dark:text-slate-400">
                Total: KES {totalAmountKES.toLocaleString()} ({guestsCount} travelers)
              </div>
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-emerald-700 dark:bg-emerald-600 hover:bg-emerald-800 dark:hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition shadow-sm cursor-pointer whitespace-nowrap"
            >
              {t.modals.confirmBooking}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
