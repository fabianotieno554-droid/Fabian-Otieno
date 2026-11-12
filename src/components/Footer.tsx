import {
  OFFICIAL_TILL_NUMBER,
  OFFICIAL_BUSINESS_NAME,
  OFFICIAL_SUPPORT_PHONE,
  OFFICIAL_SUPPORT_EMAIL,
  OFFICIAL_WEBSITE_DOMAIN,
  OFFICIAL_WEBSITE_URL,
} from '../data/toursData';
import { Compass, Phone, Mail, MapPin, Globe, Award } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { FooterNewsletter } from './FooterNewsletter';

interface FooterProps {
  onOpenProfile?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenProfile }) => {
  const { t } = useLanguage();

  return (
    <footer id="contact" className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Travel Alerts & Price Drop Subscription Prompt */}
        <FooterNewsletter />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1: Wordmark & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-xl font-extrabold text-white tracking-tight">
              <Compass className="w-5 h-5 text-emerald-500" />
              <span>SafariQuest</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              {t.footer.bio}
            </p>
            <div className="text-[11px] text-slate-500">
              {t.footer.katoLicence}
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              {t.footer.explore}
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#destinations" className="hover:text-white transition-colors">
                  {t.nav.destinations}
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-white transition-colors">
                  {t.nav.packages}
                </a>
              </li>
              <li>
                <a href="#videos" className="hover:text-white transition-colors">
                  {t.nav.videos}
                </a>
              </li>
              <li>
                <a href="#till" className="hover:text-white transition-colors">
                  {t.nav.tillPayment}
                </a>
              </li>
              <li>
                <a href="#facebook-community" className="hover:text-white transition-colors">
                  {t.nav.facebook}
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white transition-colors">
                  Reviews
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  {t.nav.faqs}
                </a>
              </li>
              {onOpenProfile && (
                <li className="pt-1">
                  <button
                    type="button"
                    onClick={onOpenProfile}
                    className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-bold transition-colors cursor-pointer"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>Frequent Traveler Badges</span>
                  </button>
                </li>
              )}
            </ul>
          </div>

          {/* Col 3: Direct Contacts & Social */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              {t.footer.directContact}
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>The Mirage Tower 2, Chiromo Road, Westlands, Nairobi, Kenya</span>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-emerald-500 shrink-0" />
                <a
                  href={OFFICIAL_WEBSITE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white text-emerald-400 font-medium transition-colors"
                >
                  {OFFICIAL_WEBSITE_DOMAIN}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <a href={`tel:${OFFICIAL_SUPPORT_PHONE}`} className="hover:text-white transition-colors font-medium">
                  {OFFICIAL_SUPPORT_PHONE}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{OFFICIAL_SUPPORT_EMAIL}</span>
              </li>
              <li className="pt-2">
                <a
                  href="https://www.facebook.com/SafariQuestToursKe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  <span>Facebook: @SafariQuestToursKe</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Till Details */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-4">
              {t.footer.officialPayment}
            </h4>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
              <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
                Safaricom Buy Goods Till
              </span>
              <div className="text-2xl font-mono font-black text-emerald-400 select-all">
                {OFFICIAL_TILL_NUMBER}
              </div>
              <div className="text-[11px] text-slate-300">
                {t.footer.merchant}: <span className="text-white font-semibold">{OFFICIAL_BUSINESS_NAME}</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-normal pt-1">
                {t.footer.zeroCharges}. Direct helpline: <strong className="text-emerald-400">{OFFICIAL_SUPPORT_PHONE}</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} {OFFICIAL_BUSINESS_NAME}. {t.footer.allRights}
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 transition-colors cursor-pointer">{t.footer.terms}</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">{t.footer.privacy}</span>
            <span aria-hidden="true">·</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Safaricom Merchant Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
