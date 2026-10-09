import React from 'react';
import { motion } from 'motion/react';
import { useI18n } from '../context/I18nContext';
import { ArrowDown, Smartphone, ShieldCheck, Sparkles, Star } from 'lucide-react';

interface HeroSectionProps {
  headline: string;
  headlineAr?: string;
  tagline: string;
  taglineAr?: string;
  onExploreApps: () => void;
  onContact: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  headline,
  headlineAr,
  tagline,
  taglineAr,
  onExploreApps,
  onContact,
}) => {
  const { language, direction, t } = useI18n();

  return (
    <section id="hero" className="relative overflow-hidden pt-6 pb-20 md:pt-10 md:pb-28 min-h-[750px] flex flex-col justify-center">
      {/* Soft Ambient Brand Mesh Background (Extracted from Logo: #162952, #1E2D63, #38BDF8) */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.35, 0.5, 0.35],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[520px] sm:w-[960px] sm:h-[620px] rounded-full bg-gradient-to-br from-[#162952]/40 via-[#1e2d63]/30 to-[#38bdf8]/20 blur-[130px] dark:from-[#162952]/60 dark:via-[#1e2d63]/40 dark:to-[#0284c7]/25"
        />

        <div className="absolute top-1/4 -right-28 w-[420px] h-[420px] rounded-full bg-[#38bdf8]/10 blur-[120px] pointer-events-none" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col items-center text-center">
          {/* Official Brand Logo Mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex items-center justify-center"
          >
            <img
              src="/logo.png"
              alt="Mohammed Studio"
              className="h-16 sm:h-20 md:h-24 w-auto max-w-[260px] sm:max-w-[320px] object-contain drop-shadow-sm"
            />
          </motion.div>

          {/* Eyebrow Pill */}
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-white/90 dark:bg-[#14203b] text-[#0284c7] dark:text-[#38bdf8] border border-[#bae6fd] dark:border-[#1e2e4e] shadow-sm mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#38bdf8] animate-ping" />
            <span>{t('hero_eyebrow')}</span>
          </motion.div>

          {/* Large Bold Editorial Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-[62px] font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] max-w-3xl"
          >
            {language === 'ar' ? (
              headlineAr ? (
                <span>{headlineAr}</span>
              ) : (
                <>
                  <span>نبتكر </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#0284c7] via-[#38bdf8] to-[#1e2d63] dark:from-[#38bdf8] dark:to-[#0284c7]">
                    تطبيقات ذكية
                  </span>
                  <br />
                  <span>تثري حياتك اليومية.</span>
                </>
              )
            ) : (
              headline ? (
                <span>{headline}</span>
              ) : (
                <>
                  <span>{t('hero_title_1')} </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#162952] via-[#0284c7] to-[#38bdf8] dark:from-[#38bdf8] dark:via-[#60a5fa] dark:to-[#93c5fd]">
                    {t('hero_title_2')}
                  </span>
                  <br />
                  <span>{t('hero_title_3')}</span>
                </>
              )
            )}
          </motion.h1>

          {/* Tagline Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed font-normal"
          >
            {language === 'ar' ? (taglineAr || tagline || t('hero_tagline')) : (tagline || t('hero_tagline'))}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto"
          >
            <button
              onClick={onExploreApps}
              className="btn-pill-brand w-full sm:w-auto text-sm !py-3.5 !px-8 cursor-pointer"
            >
              <span>{t('hero_cta_apps')}</span>
              <ArrowDown className="w-4 h-4" />
            </button>

            <button
              onClick={onContact}
              className="btn-pill-outline w-full sm:w-auto text-sm !py-3.5 !px-7 cursor-pointer"
            >
              <span>{t('hero_cta_contact')}</span>
            </button>
          </motion.div>
        </div>

        {/* Studio Summary Strip (4 Pill Columns) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 p-4 sm:p-5 rounded-3xl bg-white/70 dark:bg-[#0e172b]/80 border border-slate-200/90 dark:border-[#1e2e4e] shadow-lg backdrop-blur-md grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/90 dark:bg-[#14203b]/80 border border-slate-100 dark:border-slate-800/80">
            <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/80 text-[#0284c7] dark:text-[#38bdf8] flex items-center justify-center shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">100% Native</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{t('hero_badge_native')}</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/90 dark:bg-[#14203b]/80 border border-slate-100 dark:border-slate-800/80">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/80 text-amber-500 flex items-center justify-center shrink-0">
              <Star className="w-5 h-5 fill-amber-400" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">4.9 ★ Rating</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{t('hero_badge_rating')}</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/90 dark:bg-[#14203b]/80 border border-slate-100 dark:border-slate-800/80">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-500 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">Privacy First</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{t('hero_badge_privacy')}</div>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/90 dark:bg-[#14203b]/80 border border-slate-100 dark:border-slate-800/80">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/80 text-[#1e2d63] dark:text-[#38bdf8] flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">120Hz Fluid</div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{t('hero_badge_performance')}</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
