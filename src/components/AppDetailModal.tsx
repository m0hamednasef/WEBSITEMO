import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useI18n } from '../context/I18nContext';
import { MobileApp } from '../types';
import { X, ExternalLink, Check, Star, ShieldCheck, Download, Smartphone } from 'lucide-react';

interface AppDetailModalProps {
  app: MobileApp | null;
  onClose: () => void;
}

export const AppDetailModal: React.FC<AppDetailModalProps> = ({ app, onClose }) => {
  const { language, direction, t } = useI18n();

  if (!app) return null;

  const appName = language === 'ar' && app.nameAr ? app.nameAr : app.name;
  const appDesc = language === 'ar' && app.descriptionAr ? app.descriptionAr : app.description;
  const features = language === 'ar' && app.featuresAr ? app.featuresAr : (app.features || [
    'Ultra-clean native Android architecture with instant startup',
    'Offline-first privacy: your records never leave your local device',
    'Fluid ergonomics designed for seamless one-handed use',
    'Real-time analytics and customizable export capabilities',
  ]);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl bg-white dark:bg-[#0e172b] rounded-[32px] border border-slate-200/90 dark:border-[#1e2e4e] shadow-2xl p-6 sm:p-8 z-10 my-8 overflow-hidden max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 rtl:right-auto rtl:left-5 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#14203b] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header with Icon, Name, Category & Badges */}
          <div className="flex items-start gap-5 pr-10 rtl:pr-0 rtl:pl-10 mb-6">
            <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl overflow-hidden bg-slate-50 dark:bg-[#14203b] border border-slate-200 dark:border-slate-700 shadow-md p-1.5 shrink-0">
              <img
                src={app.iconUrl}
                alt={appName}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950/80 text-[#0284c7] dark:text-[#38bdf8] border border-sky-200 dark:border-sky-900/50">
                  {app.category || 'Android Utility'}
                </span>
                {app.version && (
                  <span className="text-xs text-slate-400 font-mono">
                    v{app.version}
                  </span>
                )}
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
                {appName}
              </h3>

              <div className="flex items-center gap-3 mt-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1 text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  {app.ratingBadge || '4.9 ★'}
                </span>
                <span>•</span>
                <span>{app.downloadsBadge || 'Google Play Store'}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              {t('detail_overview')}
            </h4>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              {appDesc}
            </p>
          </div>

          {/* Key Features */}
          <div className="mb-8">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">
              {t('detail_features')}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {features.map((feat, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-[#14203b]/70 border border-slate-100 dark:border-slate-800"
                >
                  <div className="w-5 h-5 rounded-full bg-sky-100 dark:bg-sky-950/80 text-[#0284c7] dark:text-[#38bdf8] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    {feat}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200 dark:border-[#1e2e4e]">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>{t('hero_badge_privacy')}</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="btn-pill-outline w-full sm:w-auto text-xs !py-3 !px-5 cursor-pointer"
              >
                {language === 'ar' ? 'إغلاق' : 'Close'}
              </button>

              <a
                href={app.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-pill-brand w-full sm:w-auto text-xs !py-3 !px-6 cursor-pointer"
              >
                <span>{t('get_on_play')}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
