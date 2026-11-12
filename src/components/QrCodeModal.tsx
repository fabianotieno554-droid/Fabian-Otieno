import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import {
  X,
  QrCode,
  Download,
  Copy,
  Check,
  ExternalLink,
  Smartphone,
  MessageCircle,
  Facebook,
  Globe,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import {
  OFFICIAL_TILL_NUMBER,
  OFFICIAL_BUSINESS_NAME,
  OFFICIAL_SUPPORT_PHONE,
  OFFICIAL_FACEBOOK_URL,
  OFFICIAL_WEBSITE_URL,
  OFFICIAL_WEBSITE_DOMAIN,
} from '../data/toursData';
import { useLanguage } from '../context/LanguageContext';

export type QrTabType = 'mpesa' | 'whatsapp' | 'facebook' | 'website';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: QrTabType;
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'mpesa',
}) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<QrTabType>(initialTab);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sync activeTab if initialTab changes on open
  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      setCopied(false);
    }
  }, [isOpen, initialTab]);

  // Handle keyboard ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Determine payload based on activeTab
  const getPayloadInfo = () => {
    switch (activeTab) {
      case 'mpesa':
        return {
          payload: `LIPA NA M-PESA BUY GOODS\nTill Number: ${OFFICIAL_TILL_NUMBER}\nMerchant: ${OFFICIAL_BUSINESS_NAME}\nSupport: ${OFFICIAL_SUPPORT_PHONE}`,
          title: t.qrCode.mpesaTitle,
          subtitle: t.qrCode.mpesaDesc,
          accentColor: '#059669', // emerald
          copyText: OFFICIAL_TILL_NUMBER,
          linkUrl: null,
          fileName: `SafariQuest_Mpesa_Till_${OFFICIAL_TILL_NUMBER}_QR.png`,
          badge: 'Safaricom Buy Goods Verified',
        };
      case 'whatsapp':
        return {
          payload: `https://wa.me/254752632206?text=${encodeURIComponent(
            'Hello SafariQuest Tours! I scanned your QR code and would like to inquire about tours, hotels, and custom safari bookings.'
          )}`,
          title: t.qrCode.whatsappTitle,
          subtitle: t.qrCode.whatsappDesc,
          accentColor: '#16a34a', // green
          copyText: OFFICIAL_SUPPORT_PHONE,
          linkUrl: 'https://wa.me/254752632206',
          fileName: 'SafariQuest_WhatsApp_Concierge_QR.png',
          badge: '24/7 Verified Support',
        };
      case 'facebook':
        return {
          payload: OFFICIAL_FACEBOOK_URL,
          title: t.qrCode.facebookTitle,
          subtitle: t.qrCode.facebookDesc,
          accentColor: '#1877f2', // facebook blue
          copyText: OFFICIAL_FACEBOOK_URL,
          linkUrl: OFFICIAL_FACEBOOK_URL,
          fileName: 'SafariQuest_Facebook_Page_QR.png',
          badge: '24,000+ Community Members',
        };
      case 'website':
      default:
        const currentUrl = OFFICIAL_WEBSITE_URL;
        return {
          payload: currentUrl,
          title: t.qrCode.websiteTitle,
          subtitle: `${t.qrCode.websiteDesc} (${OFFICIAL_WEBSITE_DOMAIN})`,
          accentColor: '#0284c7', // sky
          copyText: currentUrl,
          linkUrl: currentUrl,
          fileName: 'Kenya_Quest_Safari_Official_Website_QR.png',
          badge: OFFICIAL_WEBSITE_DOMAIN,
        };
    }
  };

  const currentInfo = getPayloadInfo();

  // Generate QR code data URL whenever payload or tab changes
  useEffect(() => {
    if (!isOpen) return;
    const generateQr = async () => {
      try {
        const url = await QRCode.toDataURL(currentInfo.payload, {
          width: 400,
          margin: 2,
          color: {
            dark: activeTab === 'mpesa' ? '#064e3b' : activeTab === 'whatsapp' ? '#14532d' : activeTab === 'facebook' ? '#1e3a8a' : '#0c4a6e',
            light: '#ffffff',
          },
          errorCorrectionLevel: 'H',
        });
        setQrDataUrl(url);
      } catch (err) {
        console.error('Failed to generate QR code', err);
      }
    };
    generateQr();
  }, [isOpen, activeTab, currentInfo.payload]);

  if (!isOpen) return null;

  const handleCopy = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(currentInfo.copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  const handleDownload = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.href = qrDataUrl;
    link.download = currentInfo.fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800 my-auto animate-in fade-in zoom-in-95 duration-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-900/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block">
                {t.qrCode.kicker}
              </span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
                {t.qrCode.title}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close QR Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-1.5 p-3 bg-slate-100/70 dark:bg-slate-850 border-b border-slate-200 dark:border-slate-800 overflow-x-auto">
          {[
            { id: 'mpesa' as QrTabType, label: t.qrCode.tabMpesa, icon: Smartphone },
            { id: 'whatsapp' as QrTabType, label: t.qrCode.tabWhatsapp, icon: MessageCircle },
            { id: 'facebook' as QrTabType, label: t.qrCode.tabFacebook, icon: Facebook },
            { id: 'website' as QrTabType, label: t.qrCode.tabWebsite, icon: Globe },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id);
                  setCopied(false);
                }}
                className={`flex-1 min-w-[120px] sm:min-w-0 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Content Area */}
        <div className="p-6 sm:p-8 flex flex-col items-center text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 mb-4 border border-slate-200 dark:border-slate-700">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>{currentInfo.badge}</span>
          </div>

          {/* QR Code Container */}
          <div className="relative p-4 rounded-3xl bg-white shadow-xl border-4 border-slate-100 dark:border-slate-800 flex items-center justify-center">
            {qrDataUrl ? (
              <img
                src={qrDataUrl}
                alt={currentInfo.title}
                className="w-56 h-56 sm:w-64 sm:h-64 object-contain rounded-xl select-none"
              />
            ) : (
              <div className="w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center bg-slate-50 text-slate-400">
                <QrCode className="w-12 h-12 animate-pulse" />
              </div>
            )}

            {/* Subtle center brand icon badge */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-11 h-11 rounded-xl bg-white shadow-md border-2 border-slate-100 flex items-center justify-center">
                {activeTab === 'mpesa' ? (
                  <Smartphone className="w-6 h-6 text-emerald-700" />
                ) : activeTab === 'whatsapp' ? (
                  <MessageCircle className="w-6 h-6 text-green-600" />
                ) : activeTab === 'facebook' ? (
                  <Facebook className="w-6 h-6 text-blue-600 fill-current" />
                ) : (
                  <Globe className="w-6 h-6 text-sky-600" />
                )}
              </div>
            </div>
          </div>

          {/* Scan Instructions */}
          <p className="mt-4 text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
            {t.qrCode.scanInstructions}
          </p>

          {/* Info Details Box */}
          <div className="w-full mt-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-left">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              {currentInfo.title}
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
              {currentInfo.subtitle}
            </p>

            {activeTab === 'mpesa' && (
              <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">
                    Merchant Till Number
                  </span>
                  <span className="text-xl font-black font-mono text-emerald-700 dark:text-emerald-400">
                    {OFFICIAL_TILL_NUMBER}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold transition shadow-2xs cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>{t.qrCode.copied}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>{t.qrCode.copyDetails}</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {/* Action Buttons Row */}
          <div className="w-full mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={handleDownload}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{t.qrCode.downloadQr}</span>
            </button>

            {currentInfo.linkUrl ? (
              <a
                href={currentInfo.linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
              >
                <span>{t.qrCode.openLink}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <button
                type="button"
                onClick={handleCopy}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-500 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? t.qrCode.copied : t.qrCode.copyDetails}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
