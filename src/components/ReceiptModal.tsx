import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { BookingSubmission } from '../types/tour';
import {
  OFFICIAL_TILL_NUMBER,
  OFFICIAL_BUSINESS_NAME,
  OFFICIAL_WEBSITE_URL,
  OFFICIAL_SUPPORT_PHONE,
} from '../data/toursData';
import {
  X,
  CheckCircle2,
  Printer,
  MessageCircle,
  ShieldCheck,
  QrCode,
  Download,
  User,
  Award,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LoyaltyPointsTracker } from './LoyaltyPointsTracker';
import { FrequentTravelerBadge } from './FrequentTravelerBadge';
import { TravelerProfileModal } from './TravelerProfileModal';

import {
  saveOfflineReceipt,
  getLatestOfflineReceipt,
  useOnlineStatus,
} from '../utils/offlineStorage';
import { WifiOff, Smartphone } from 'lucide-react';

interface ReceiptModalProps {
  booking: BookingSubmission | null;
  onClose: () => void;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({ booking, onClose }) => {
  const { t } = useLanguage();
  const [receiptQrUrl, setReceiptQrUrl] = useState<string>('');
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const isOnline = useOnlineStatus();

  // If no live booking is provided (e.g. user opens receipt offline), use latest cached offline receipt
  const activeBooking = booking || (getLatestOfflineReceipt()?.booking ?? null);

  useEffect(() => {
    if (!activeBooking) return;

    // Check if we already have this receipt's QR cached offline
    const cached = getLatestOfflineReceipt();
    if (cached?.booking?.id === activeBooking.id && cached.qrDataUrl) {
      setReceiptQrUrl(cached.qrDataUrl);
    }

    const payload = `SAFARIQUEST TOURS & TRAVEL - DIGITAL PASS\nWebsite: ${OFFICIAL_WEBSITE_URL}\nBooking ID: ${activeBooking.id}\nLead Traveler: ${activeBooking.fullName}\nTour: ${activeBooking.packageName}\nTravel Date: ${activeBooking.travelDate}\nGuests: ${activeBooking.guestsCount}\nStatus: ${activeBooking.mpesaCode ? 'Confirmed (M-Pesa ' + activeBooking.mpesaCode + ')' : 'Reserved'}\nTill: ${OFFICIAL_TILL_NUMBER}\nSupport WhatsApp: ${OFFICIAL_SUPPORT_PHONE}`;
    
    QRCode.toDataURL(payload, {
      width: 256,
      margin: 2,
      color: {
        dark: '#064e3b',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'M',
    })
      .then((url) => {
        setReceiptQrUrl(url);
        saveOfflineReceipt(activeBooking, url);
      })
      .catch((err) => {
        console.error('Error generating receipt QR', err);
        if (cached?.qrDataUrl) {
          setReceiptQrUrl(cached.qrDataUrl);
        }
      });
  }, [activeBooking]);

  if (!activeBooking) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadQr = () => {
    if (!receiptQrUrl) return;
    const a = document.createElement('a');
    a.href = receiptQrUrl;
    a.download = `SafariQuest_Pass_${activeBooking.id}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello SafariQuest, I have reserved my tour for ${activeBooking.packageName} on ${activeBooking.travelDate}. Booking Ref: ${activeBooking.id}. Please confirm my receipt.`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 relative my-8 animate-fadeIn">
        {/* Header */}
        <div className="bg-emerald-900 dark:bg-emerald-950 text-white p-6 flex items-center justify-between border-b border-emerald-800/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-800 dark:bg-emerald-900 flex items-center justify-center text-emerald-300">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-emerald-300 font-bold block">
                {t.modals.voucherTitle}
              </span>
              <h3 className="text-xl font-black">{activeBooking.id}</h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full text-slate-300 hover:text-white transition cursor-pointer"
            aria-label={t.modals.close}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Receipt Voucher Body (Printable) */}
        <div className="p-6 sm:p-8 space-y-6 printable-voucher">
          {/* Offline Ready Status Banner */}
          <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-300">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span className="font-bold">
                {isOnline
                  ? 'Cached for Offline Travel · Accessible in remote safari reserves & flight mode'
                  : 'Safari Offline Mode Active · Cached digital boarding pass loaded from device'}
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-600 text-white shrink-0">
              {isOnline ? 'Offline Ready' : 'Offline'}
            </span>
          </div>

          {/* Status banner */}
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 flex items-center justify-between">
            <div>
              <span className="text-xs text-emerald-950 dark:text-emerald-200 font-bold uppercase tracking-wider block">
                Payment Status
              </span>
              <span className="text-base font-extrabold text-emerald-900 dark:text-emerald-300">
                {activeBooking.mpesaCode ? t.modals.voucherStatusPaid : t.modals.voucherStatusPending}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500 dark:text-slate-400 block">Till Number</span>
              <span className="text-base font-black text-emerald-800 dark:text-emerald-400 font-mono">
                {OFFICIAL_TILL_NUMBER}
              </span>
            </div>
          </div>

          {/* Details Table */}
          <div className="space-y-3 text-xs border border-slate-200 dark:border-slate-800 rounded-2xl p-4 bg-slate-50/50 dark:bg-slate-800/50">
            <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700/80">
              <span className="text-slate-500 dark:text-slate-400">Merchant / Operator</span>
              <span className="font-bold text-slate-900 dark:text-white">{OFFICIAL_BUSINESS_NAME}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700/80">
              <span className="text-slate-500 dark:text-slate-400">{t.modals.leadTraveler}</span>
              <span className="font-bold text-slate-900 dark:text-white">{activeBooking.fullName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700/80">
              <span className="text-slate-500 dark:text-slate-400">Phone & Email</span>
              <span className="font-medium text-slate-900 dark:text-slate-200">
                {activeBooking.phone} · {activeBooking.email}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700/80">
              <span className="text-slate-500 dark:text-slate-400">Tour Package</span>
              <span className="font-bold text-slate-900 dark:text-white">{activeBooking.packageName}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700/80">
              <span className="text-slate-500 dark:text-slate-400">{t.modals.travelDate}</span>
              <span className="font-semibold text-slate-900 dark:text-slate-200">{activeBooking.travelDate}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700/80">
              <span className="text-slate-500 dark:text-slate-400">Travelers</span>
              <span className="font-semibold text-slate-900 dark:text-slate-200">{activeBooking.guestsCount} Persons</span>
            </div>
            {activeBooking.mpesaCode && (
              <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700/80">
                <span className="text-slate-500 dark:text-slate-400">M-Pesa Transaction Ref</span>
                <span className="font-mono font-bold text-emerald-800 dark:text-emerald-400">{activeBooking.mpesaCode}</span>
              </div>
            )}
            <div className="flex justify-between py-2 text-sm font-extrabold text-slate-900 dark:text-white">
              <span>{t.modals.amountPaid}</span>
              <span className="text-emerald-800 dark:text-emerald-400 font-mono">
                KES {(activeBooking.paymentType === 'deposit' ? activeBooking.depositAmountKES : activeBooking.totalAmountKES).toLocaleString()}
              </span>
            </div>
            {activeBooking.paymentType === 'deposit' && (
              <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 pt-1">
                <span>{t.modals.remainingBalance}</span>
                <span className="font-mono">
                  KES {(activeBooking.totalAmountKES - activeBooking.depositAmountKES).toLocaleString()}
                </span>
              </div>
            )}
          </div>

          {/* Digital Boarding Pass & Verification QR Code */}
          <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/80 flex flex-col sm:flex-row items-center gap-4">
            <div className="p-2 bg-white rounded-xl shadow-xs border border-emerald-200 dark:border-emerald-700/50 shrink-0">
              {receiptQrUrl ? (
                <img
                  src={receiptQrUrl}
                  alt={`Digital Pass QR for ${activeBooking.id}`}
                  className="w-24 h-24 object-contain select-none"
                />
              ) : (
                <div className="w-24 h-24 flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded-lg">
                  <QrCode className="w-6 h-6 text-emerald-600 animate-pulse" />
                </div>
              )}
            </div>
            <div className="flex-1 text-center sm:text-left space-y-1">
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                <QrCode className="w-3.5 h-3.5" />
                <span>Digital Verification QR Pass</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                Scan with any smartphone camera at safari pickup or airport transfer to verify booking <span className="font-mono font-bold text-emerald-800 dark:text-emerald-400">{activeBooking.id}</span>.
              </p>
              <div className="pt-1 flex items-center justify-center sm:justify-start gap-2">
                <button
                  type="button"
                  onClick={handleDownloadQr}
                  className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-bold text-emerald-800 dark:text-emerald-200 bg-white dark:bg-slate-800 border border-emerald-300 dark:border-emerald-700 rounded-lg hover:bg-emerald-50 dark:hover:bg-slate-700 transition cursor-pointer shadow-2xs"
                >
                  <Download className="w-3 h-3" />
                  <span>Save QR Pass to Phone</span>
                </button>
              </div>
            </div>
          </div>

          {/* Frequent Traveler Badge System */}
          <FrequentTravelerBadge
            booking={activeBooking}
            onOpenProfile={() => setProfileModalOpen(true)}
          />

          {/* Safari Club Loyalty Points Tracker */}
          <LoyaltyPointsTracker booking={activeBooking} />

          {/* Instructions */}
          <div className="text-xs text-slate-500 dark:text-slate-400 space-y-1">
            <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Next Steps</span>
            </div>
            <p>
              Please present this voucher or SMS code to your tour guide upon pickup. Our reservations desk has logged your itinerary and will reach out via call/WhatsApp shortly.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5 pt-2">
            <button
              type="button"
              onClick={handlePrint}
              className="w-full sm:flex-1 py-3 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>{t.modals.printPdf}</span>
            </button>

            <button
              type="button"
              onClick={() => setProfileModalOpen(true)}
              className="w-full sm:flex-1 py-3 px-3 bg-amber-100 dark:bg-amber-950/70 hover:bg-amber-200 dark:hover:bg-amber-900/80 text-amber-900 dark:text-amber-200 font-bold rounded-xl text-xs transition cursor-pointer flex items-center justify-center gap-2 border border-amber-300 dark:border-amber-700"
            >
              <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Traveler Profile</span>
            </button>

            <a
              href={`https://wa.me/254752632206?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 py-3 px-3 bg-emerald-700 dark:bg-emerald-600 hover:bg-emerald-800 dark:hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition shadow-xs cursor-pointer flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.modals.whatsAppSupport}</span>
            </a>
          </div>
        </div>

        {/* Full Traveler Profile Summary Modal */}
        <TravelerProfileModal
          isOpen={profileModalOpen}
          onClose={() => setProfileModalOpen(false)}
          phone={activeBooking.phone}
        />
      </div>
    </div>
  );
};
