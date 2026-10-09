import React from 'react';
import { motion } from 'motion/react';
import { useI18n } from '../context/I18nContext';
import { MobileApp } from '../types';
import { ExternalLink, Check, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';

interface FeaturedAppSectionProps {
  app?: MobileApp;
  onOpenDetail: (app: MobileApp) => void;
}

export const FeaturedAppSection: React.FC<FeaturedAppSectionProps> = ({
  app,
  onOpenDetail,
}) => {
  const { language, direction, t } = useI18n();

  if (!app) return null;

  const appName = language === 'ar' && app.nameAr ? app.nameAr : app.name;
  const appDesc = language === 'ar' && app.descriptionAr ? app.descriptionAr : app.description;
  const features = language === 'ar' && app.featuresAr ? app.featuresAr : (app.features || [
    'Ultra-clean native Android architecture with instant startup',
    'Offline-first privacy: your records never leave your local device',
    'Fluid Material 3 ergonomics designed for seamless one-handed use',
    'Real-time analytics and customizable export capabilities',
  ]);

  return (
    <section id="featured" className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-50 dark:bg-[#14203b] text-[#0284c7] dark:text-[#38bdf8] border border-sky-200 dark:border-[#1e2e4e] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t('featured_eyebrow')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t('featured_title')}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {t('featured_desc')}
          </p>
        </motion.div>

        {/* Large Rounded Editorial Showcase Card (32px radius) */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="rounded-[32px] bg-gradient-to-br from-white via-slate-50 to-sky-50/40 dark:from-[#0e172b] dark:via-[#131d34] dark:to-[#090d1a] border border-slate-200/90 dark:border-[#1e2e4e] shadow-2xl p-8 sm:p-12 lg:p-16 relative overflow-hidden"
        >
          {/* Subtle ambient cyan glow inside card */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#0284c7]/10 dark:bg-[#38bdf8]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-start text-left rtl:text-right">
              {/* Top Meta: Icon + Category + Rating */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-white dark:bg-[#14203b] border border-slate-200 dark:border-slate-700 shadow-lg p-1.5 shrink-0">
                  <img
                    src={app.iconUrl}
                    alt={appName}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>

                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wide px-3 py-1 rounded-full bg-slate-100 dark:bg-[#14203b] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#1e2e4e]">
                      {app.category || 'Android Utility'}
                    </span>
                    {app.downloadsBadge && (
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {app.downloadsBadge}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
                    {appName}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {appDesc}
              </p>

              {/* Key Features List */}
              <div className="mt-8 space-y-3 w-full">
                {features.slice(0, 4).map((feat, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-sky-100 dark:bg-sky-950/80 text-[#0284c7] dark:text-[#38bdf8] flex items-center justify-center shrink-0 mt-0.5 border border-sky-200 dark:border-sky-800/60">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-sm text-slate-700 dark:text-slate-300 leading-normal">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href={app.playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-pill-brand text-sm !py-3.5 !px-8 cursor-pointer"
                >
                  <span>{t('get_on_play')}</span>
                  <ExternalLink className="w-4 h-4" />
                </a>

                <button
                  onClick={() => onOpenDetail(app)}
                  className="btn-pill-outline text-sm !py-3.5 !px-6 cursor-pointer"
                >
                  <span>{t('view_details')}</span>
                  {direction === 'rtl' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Right Phone Mockup Visual */}
            <div className="lg:col-span-5 flex justify-center items-center">
              <div className="relative w-full max-w-xs sm:max-w-sm rounded-[36px] bg-[#090d1a] border-4 border-slate-800 dark:border-slate-700 p-3 shadow-2xl overflow-hidden hover:scale-102 transition-transform duration-500">
                {/* Phone Notch */}
                <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto mb-3" />

                {/* Phone Screen Mockup UI */}
                <div className="rounded-[28px] bg-gradient-to-b from-[#162952] via-[#0e172b] to-[#070a14] p-5 border border-slate-700/60 text-white min-h-[380px] flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-mono text-[#38bdf8]">Mohammed Studio App</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>

                    <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 mb-4">
                      <div className="text-[11px] text-slate-300">Featured System</div>
                      <div className="text-lg font-bold text-white mt-0.5">{appName}</div>
                      <div className="text-xs text-sky-300 mt-2 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> High Precision Architecture
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="h-2.5 rounded-full bg-white/20 w-3/4" />
                      <div className="h-2.5 rounded-full bg-white/10 w-1/2" />
                      <div className="h-2.5 rounded-full bg-[#38bdf8]/40 w-5/6" />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
                    <span>Google Play Store</span>
                    <span className="text-[#38bdf8] font-bold">Verified Native</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
