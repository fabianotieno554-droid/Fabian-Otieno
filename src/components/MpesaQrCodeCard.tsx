import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { QrCode, Maximize2, Download, Copy, Check, ShieldCheck, Smartphone } from 'lucide-react';
import { OFFICIAL_TILL_NUMBER, OFFICIAL_BUSINESS_NAME } from '../data/toursData';
import { useLanguage } from '../context/LanguageContext';

interface MpesaQrCodeCardProps {
  onOpenFullModal?: () => void;
}

export const MpesaQrCodeCard: React.FC<MpesaQrCodeCardProps> = ({ onOpenFullModal }) => {
  const { t } = useLanguage();
  const [qrUrl, setQrUrl] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    const payload = `LIPA NA M-PESA BUY GOODS\nTill Number: ${OFFICIAL_TILL_NUMBER}\nMerchant: ${OFFICIAL_BUSINESS_NAME}\nZero Transaction Fees`;
    QRCode.toDataURL(payload, {
      width: 320,
      margin: 2,
      color: {
        dark: '#064e3b',
        light: '#ffffff',
      },
      errorCorrectionLevel: 'H',
    })
      .then(setQrUrl)
      .catch((err) => console.error('Error generating M-Pesa QR', err));
  }, []);

  const handleCopy = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(OFFICIAL_TILL_NUMBER);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    if (!qrUrl) return;
    const a = document.createElement('a');
    a.href = qrUrl;
    a.download = `SafariQuest_Mpesa_Till_${OFFICIAL_TILL_NUMBER}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-emerald-950 p-5 sm:p-6 rounded-3xl border border-emerald-500/30 shadow-xl flex flex-col sm:flex-row items-center gap-5">
      {/* QR Code Container */}
      <div
        className="relative p-2.5 bg-white rounded-2xl shadow-lg border-2 border-emerald-500/40 shrink-0 group cursor-pointer"
        onClick={onOpenFullModal}
        title="Click to expand QR Code"
      >
        {qrUrl ? (
          <img
            src={qrUrl}
            alt={`M-Pesa Till ${OFFICIAL_TILL_NUMBER} QR Code`}
            className="w-36 h-36 sm:w-40 sm:h-40 object-contain rounded-lg select-none"
          />
        ) : (
          <div className="w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center bg-slate-100 text-slate-400">
            <QrCode className="w-8 h-8 animate-pulse" />
          </div>
        )}

        {/* Center tiny logo */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-7 h-7 rounded-lg bg-white shadow-xs border border-emerald-100 flex items-center justify-center">
            <Smartphone className="w-4 h-4 text-emerald-700" />
          </div>
        </div>

        {/* Hover expand hint */}
        <div className="absolute inset-0 bg-emerald-950/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center text-white text-xs font-bold gap-1 backdrop-blur-[1px]">
          <Maximize2 className="w-4 h-4" />
          <span>Expand</span>
        </div>
      </div>

      {/* Details & Fast Actions */}
      <div className="flex-1 space-y-2 text-center sm:text-left">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-900/60 border border-emerald-500/30 text-[11px] font-bold text-emerald-300">
          <ShieldCheck className="w-3 h-3 text-emerald-400" />
          <span>Scan with M-Pesa App</span>
        </div>

        <h4 className="text-base sm:text-lg font-black text-white tracking-tight">
          Quick M-Pesa QR Code
        </h4>

        <p className="text-xs text-slate-300 leading-relaxed">
          Aim your Safaricom M-Pesa App camera to auto-fill Till{' '}
          <strong className="text-emerald-300 font-mono">{OFFICIAL_TILL_NUMBER}</strong> for
          immediate deposit or full payment.
        </p>

        {/* Actions row */}
        <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-2">
          {onOpenFullModal && (
            <button
              type="button"
              onClick={onOpenFullModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-xs cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Full QR Suite</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleDownload}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition cursor-pointer"
            title="Download QR code PNG"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-semibold transition cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied Till' : 'Copy Till'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
