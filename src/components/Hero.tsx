import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Smartphone, ShieldCheck, Sparkles, Star } from 'lucide-react';

interface HeroProps {
  headline: string;
  tagline: string;
  onViewApps: () => void;
}

export const Hero: React.FC<HeroProps> = ({ headline, tagline, onViewApps }) => {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 md:pt-24 md:pb-32 bg-white">
      {/* Light Theme Soft Ambient Mesh Glow (#D2CEFD & #E7E5FE) */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        {/* Soft Violet Radial Blob */}
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.35, 0.55, 0.35],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[720px] h-[540px] sm:w-[900px] sm:h-[650px] rounded-full bg-gradient-to-br from-[#E7E5FE] via-[#D2CEFD]/70 to-[#F5F4FF] blur-[100px]"
        />

        {/* Secondary Soft Elevation Glow */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.25, 0.45, 0.25],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          className="absolute top-1/3 -right-24 w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-[#D2CEFD]/60 to-[#E4E7F5] blur-[90px]"
        />

        {/* Subtle light grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#E4E7F5_1px,transparent_1px),linear-gradient(to_bottom,#E4E7F5_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] opacity-40" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Brand Logo Avatar Showcase (Pill badge, soft elevation) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="inline-flex items-center gap-3 p-1.5 pr-4 rounded-full bg-white border border-[#E4E7F5] shadow-[0_2px_14px_rgba(145,132,217,0.12)] mb-8"
        >
          <img
            src="/logo.png"
            alt="Mohamed Studio"
            className="w-9 h-9 object-contain rounded-full bg-[#F3F5FE] p-0.5"
          />
          <div className="flex items-center gap-2 text-xs font-semibold text-[#161826]">
            <span>Mohamed Studio</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#9184D9]" />
            <span className="text-[#796CBF] flex items-center gap-1 font-medium">
              <Star className="w-3 h-3 fill-[#9184D9] text-[#9184D9]" /> Google Play Developer
            </span>
          </div>
        </motion.div>

        {/* Hero Headline (Typography H1 Token: 56px 700, 1.24 line-height, -0.56px tracking) */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="text-[38px] sm:text-[48px] md:text-[56px] font-bold tracking-[-0.56px] text-[#161826] leading-[1.24]"
        >
          {headline.includes('.') ? (
            <>
              {headline.split('.')[0]}.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#9184D9] via-[#796CBF] to-[#5D5294]">
                {headline.split('.').slice(1).join('.')}
              </span>
            </>
          ) : (
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#161826] via-[#796CBF] to-[#9184D9]">
              {headline}
            </span>
          )}
        </motion.h1>

        {/* Hero Tagline (Body: 14.5px, 1.85 line-height, muted text #595D6C) */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="mt-6 text-[15px] sm:text-[16px] text-[#595D6C] max-w-2xl mx-auto leading-[1.85] font-normal"
        >
          {tagline}
        </motion.p>

        {/* Pill Button CTA (Button: #9184D9, 999px radius, 11px 26px padding, 600 weight) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={onViewApps}
            className="btn-pill text-base !py-[13px] !px-[32px] cursor-pointer group"
          >
            <span>View My Apps</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>
        </motion.div>

        {/* Quality Badges Card (20px radius card, light surface, border #E4E7F5) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-14 p-6 sm:p-7 rounded-[20px] bg-white border border-[#E4E7F5] shadow-[0_4px_24px_rgba(22,24,38,0.05)] grid grid-cols-3 max-w-xl mx-auto gap-4 text-center"
        >
          <div className="flex flex-col items-center">
            <span className="text-xl sm:text-2xl font-bold text-[#161826] tracking-tight">
              100%
            </span>
            <span className="text-xs text-[#595D6C] mt-1 flex items-center gap-1 font-medium">
              <Smartphone className="w-3.5 h-3.5 text-[#9184D9]" /> Native Kotlin
            </span>
          </div>

          <div className="flex flex-col items-center border-x border-[#E4E7F5] px-2">
            <span className="text-xl sm:text-2xl font-bold text-[#161826] tracking-tight">
              Privacy
            </span>
            <span className="text-xs text-[#595D6C] mt-1 flex items-center gap-1 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#9184D9]" /> Zero Tracking
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-xl sm:text-2xl font-bold text-[#161826] tracking-tight">
              Material 3
            </span>
            <span className="text-xs text-[#595D6C] mt-1 flex items-center gap-1 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-[#9184D9]" /> Fluid UI
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
