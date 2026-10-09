import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useI18n } from '../context/I18nContext';
import { MobileApp } from '../types';
import { ExternalLink, Smartphone, Star, ArrowRight, ArrowLeft } from 'lucide-react';

interface AppsGridSectionProps {
  apps: MobileApp[];
  onOpenDetail: (app: MobileApp) => void;
  onOpenAdminPrompt?: () => void;
}

export const AppsGridSection: React.FC<AppsGridSectionProps> = ({
  apps,
  onOpenDetail,
  onOpenAdminPrompt,
}) => {
  const { language, direction, t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', ...Array.from(new Set(apps.map((a) => a.category).filter(Boolean))) as string[]];

  const filteredApps = selectedCategory === 'all'
    ? apps
    : apps.filter((a) => a.category === selectedCategory);

  return (
    <section id="apps" className="py-20 md:py-28 relative scroll-mt-14">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t('apps_title')}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {t('apps_subtitle')}
          </p>

          {/* Category Filter Pills if multiple categories exist */}
          {categories.length > 2 && (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-[#162952] text-white shadow-md shadow-[#162952]/30 dark:bg-[#38bdf8] dark:text-[#090d1a]'
                      : 'bg-white dark:bg-[#14203b] text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-[#1e2e4e] hover:border-[#38bdf8]'
                  }`}
                >
                  {cat === 'all' ? t('apps_category_all') : cat}
                </button>
              ))}
            </div>
          )}
        </motion.div>

        {/* Empty State */}
        {filteredApps.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-[28px] border border-dashed border-slate-300 dark:border-slate-800 bg-white/50 dark:bg-[#0e172b]/50">
            <Smartphone className="w-12 h-12 text-slate-400 mx-auto mb-4" />
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-sm mx-auto">
              {t('apps_empty')}
            </p>
            {onOpenAdminPrompt && (
              <button
                onClick={onOpenAdminPrompt}
                className="btn-pill-brand text-xs !py-2.5 !px-5 mt-5 cursor-pointer"
              >
                Open Admin Dashboard
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredApps.map((app, index) => {
              const name = language === 'ar' && app.nameAr ? app.nameAr : app.name;
              const desc = language === 'ar' && app.descriptionAr ? app.descriptionAr : app.description;

              return (
                <motion.div
                  key={app.id || index}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className="card-studio p-7 sm:p-9 flex flex-col justify-between group cursor-pointer"
                  onClick={() => onOpenDetail(app)}
                >
                  <div>
                    {/* Top Row: App Icon + Metadata */}
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-white dark:bg-[#14203b] border border-slate-200 dark:border-slate-700 shadow-md p-1.5 shrink-0 group-hover:scale-105 transition-transform duration-300">
                        <img
                          src={app.iconUrl}
                          alt={name}
                          className="w-full h-full object-cover rounded-xl"
                        />
                      </div>

                      <div className="flex flex-col items-end rtl:items-start gap-1.5">
                        {app.category && (
                          <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 dark:bg-[#14203b] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-[#1e2e4e]">
                            {app.category}
                          </span>
                        )}
                        {(app.ratingBadge || app.downloadsBadge) && (
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-semibold">
                            {app.ratingBadge && (
                              <span className="text-amber-500 flex items-center gap-0.5">
                                <Star className="w-3 h-3 fill-amber-400" /> {app.ratingBadge}
                              </span>
                            )}
                            {app.ratingBadge && app.downloadsBadge && <span>•</span>}
                            {app.downloadsBadge && <span>{app.downloadsBadge}</span>}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* App Name */}
                    <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white group-hover:text-[#0284c7] dark:group-hover:text-[#38bdf8] transition-colors">
                      {name}
                    </h3>

                    {/* App Description */}
                    <p className="mt-3 text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                      {desc}
                    </p>
                  </div>

                  {/* Bottom Action Bar */}
                  <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenDetail(app);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0284c7] dark:text-[#38bdf8] group-hover:underline cursor-pointer"
                    >
                      <span>{t('apps_view_more')}</span>
                      {direction === 'rtl' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                    </button>

                    <a
                      href={app.playStoreUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="btn-pill-brand text-xs !py-2.5 !px-5"
                    >
                      <span>{t('get_on_play')}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
