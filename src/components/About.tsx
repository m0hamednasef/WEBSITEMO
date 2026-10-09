import React from 'react';
import { motion } from 'motion/react';
import { useI18n } from '../context/I18nContext';
import { Zap, Layers, ShieldCheck, Code2, Sparkles, Smartphone, Terminal } from 'lucide-react';

interface AboutProps {
  aboutText: string;
  aboutTextAr?: string;
}

export const About: React.FC<AboutProps> = ({ aboutText, aboutTextAr }) => {
  const { language, t } = useI18n();

  const pillars = [
    {
      icon: Zap,
      title: t('process_2_title'),
      desc: t('process_2_desc'),
      tag: 'Speed & Battery',
    },
    {
      icon: Layers,
      title: t('process_1_title'),
      desc: t('process_1_desc'),
      tag: 'Ergonomics',
    },
    {
      icon: ShieldCheck,
      title: t('process_3_title'),
      desc: t('process_3_desc'),
      tag: 'Zero Trackers',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 relative scroll-mt-14">
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
            <Code2 className="w-3.5 h-3.5" />
            <span>{t('about_eyebrow')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t('about_title')}
          </h2>
        </motion.div>

        {/* Narrative Box (Editorial Studio Card) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
          className="p-8 sm:p-10 rounded-[28px] bg-white dark:bg-[#0e172b] border border-slate-200/90 dark:border-[#1e2e4e] shadow-xl relative overflow-hidden mb-10"
        >
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#38bdf8]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-start gap-6 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#162952] to-[#0284c7] text-white flex items-center justify-center shrink-0 shadow-md">
              <Terminal className="w-7 h-7 text-[#38bdf8]" />
            </div>

            <div className="flex-1">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {language === 'ar' ? 'استوديو محمد — مختبر برمجيات الهاتف الذكي' : 'Mohammed Studio — Mobile Engineering Lab'}
              </h3>
              <p className="text-base sm:text-[17px] text-slate-600 dark:text-slate-300 leading-relaxed font-normal whitespace-pre-line">
                {language === 'ar' ? (aboutTextAr || aboutText) : aboutText}
              </p>

              <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-6 text-xs font-semibold text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Android Native Architecture
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#0284c7]" />
                  Jetpack Compose & Kotlin
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  Google Play Console Verified
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar, i) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-7 rounded-[24px] bg-white dark:bg-[#0e172b] border border-slate-200/90 dark:border-[#1e2e4e] shadow-md hover:border-[#38bdf8] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-[#14203b] text-[#0284c7] dark:text-[#38bdf8] flex items-center justify-center border border-sky-100 dark:border-[#1e2e4e]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-[#14203b] px-2.5 py-1 rounded-full">
                    {pillar.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
