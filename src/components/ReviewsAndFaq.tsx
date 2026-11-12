import React, { useState } from 'react';
import { TESTIMONIALS, FAQS } from '../data/toursData';
import { Star, ChevronDown, ChevronUp, ShieldCheck, Award, HeartHandshake } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const ReviewsAndFaq: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const { t } = useLanguage();

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="reviews" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Proof of Rigor / Why Us */}
      <div className="mb-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest mb-2">
            <span>{t.reviewsFaq.kicker}</span>
            <span aria-hidden="true">·</span>
            <span>Unmatched Reliability</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.reviewsFaq.title}
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            {t.reviewsFaq.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              {t.reviewsFaq.katoTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.reviewsFaq.katoDesc}
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              {t.reviewsFaq.tillTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.reviewsFaq.tillDesc}
            </p>
          </div>

          <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center mb-4">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
              {t.reviewsFaq.jeepTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {t.reviewsFaq.jeepDesc}
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-20">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.reviewsFaq.lovedBy}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm mt-2">
            {t.reviewsFaq.feedbackSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 mb-4 text-amber-500">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed italic mb-6">
                  "{testimonial.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{testimonial.name}</h4>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">{testimonial.origin}</span>
                </div>
                <div className="text-right text-[11px] text-emerald-800 dark:text-emerald-400 font-semibold">
                  {testimonial.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs Section */}
      <div id="faq" className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest mb-2">
            <span>{t.reviewsFaq.faqKicker}</span>
            <span aria-hidden="true">·</span>
            <span>Booking & Payments</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {t.reviewsFaq.faqTitle}
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-slate-900 dark:text-white text-sm hover:text-emerald-800 dark:hover:text-emerald-400 transition cursor-pointer"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
