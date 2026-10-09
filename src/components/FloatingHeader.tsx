import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useI18n } from '../context/I18nContext';
import { Sun, Moon, Globe, Menu, X, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';

interface FloatingHeaderProps {
  isAdminView?: boolean;
  onNavigateHome?: () => void;
  onNavigateAdmin?: () => void;
}

export const FloatingHeader: React.FC<FloatingHeaderProps> = ({
  isAdminView = false,
  onNavigateHome,
}) => {
  const { theme, toggleTheme } = useTheme();
  const { language, direction, toggleLanguage, t } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    if (isAdminView && onNavigateHome) {
      onNavigateHome();
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
      return;
    }
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-4 z-[200] w-full px-4 sm:px-6 pointer-events-none mb-6">
      <div className="max-w-6xl mx-auto">
        <div className="pointer-events-auto flex items-center justify-between h-16 sm:h-18 px-4 sm:px-6 rounded-full bg-white/85 dark:bg-[#0e172b]/85 backdrop-blur-xl border border-slate-200/90 dark:border-[#1e2e4e] shadow-[0_8px_30px_rgba(9,13,26,0.08)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-all duration-300">
          {/* Logo (Official Mohammed Studio Brand Mark & Wordmark) */}
          <button
            onClick={() => {
              if (isAdminView && onNavigateHome) {
                onNavigateHome();
              } else {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center focus:outline-none cursor-pointer group shrink-0"
            aria-label="Mohammed Studio Home"
          >
            <img
              src="/logo.png"
              alt="Mohammed Studio"
              className="h-9 sm:h-10 w-auto max-w-[140px] sm:max-w-[180px] object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-9">
            {!isAdminView ? (
              <>
                <button
                  onClick={() => scrollTo('hero')}
                  className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-[#0284c7] dark:hover:text-[#38bdf8] transition-colors cursor-pointer"
                >
                  {t('nav_home')}
                </button>
                <button
                  onClick={() => scrollTo('apps')}
                  className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-[#0284c7] dark:hover:text-[#38bdf8] transition-colors cursor-pointer"
                >
                  {t('nav_apps')}
                </button>
                <button
                  onClick={() => scrollTo('about')}
                  className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-[#0284c7] dark:hover:text-[#38bdf8] transition-colors cursor-pointer"
                >
                  {t('nav_about')}
                </button>
                <button
                  onClick={() => scrollTo('contact')}
                  className="text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-[#0284c7] dark:hover:text-[#38bdf8] transition-colors cursor-pointer"
                >
                  {t('nav_contact')}
                </button>
              </>
            ) : (
              <button
                onClick={onNavigateHome}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0284c7] dark:text-[#38bdf8] hover:underline cursor-pointer"
              >
                {direction === 'rtl' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
                <span>{direction === 'rtl' ? 'العودة للموقع العام' : 'Back to Public Website'}</span>
              </button>
            )}
          </nav>

          {/* Right Controls: Language Selector and Primary Pill CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Selector Pill */}
            <button
              onClick={toggleLanguage}
              className="px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-100 hover:bg-slate-200/80 dark:bg-[#14203b] dark:hover:bg-[#1a294b] text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-[#1e2e4e] transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Toggle English / Arabic"
            >
              <Globe className="w-3.5 h-3.5 text-[#0284c7] dark:text-[#38bdf8]" />
              <span>{language === 'en' ? 'عربي' : 'EN'}</span>
            </button>

            {/* Header CTA Pill Button */}
            {!isAdminView && (
              <button
                onClick={() => scrollTo('contact')}
                className="hidden sm:inline-flex btn-pill-brand text-xs !py-2.5 !px-5"
              >
                <span>{t('nav_cta')}</span>
                {direction === 'rtl' ? <ArrowLeft className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
              </button>
            )}

            {/* Mobile hamburger menu toggle */}
            {!isAdminView && (
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-full text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#14203b] cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && !isAdminView && (
          <div className="pointer-events-auto md:hidden mt-3 p-5 rounded-3xl bg-white/95 dark:bg-[#0e172b]/95 backdrop-blur-2xl border border-slate-200 dark:border-[#1e2e4e] shadow-2xl flex flex-col gap-2.5 animate-in fade-in slide-in-from-top-3 duration-200">
            <button
              onClick={() => scrollTo('hero')}
              className="text-left rtl:text-right py-2 px-3 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#14203b]"
            >
              {t('nav_home')}
            </button>
            <button
              onClick={() => scrollTo('apps')}
              className="text-left rtl:text-right py-2 px-3 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#14203b]"
            >
              {t('nav_apps')}
            </button>
            <button
              onClick={() => scrollTo('about')}
              className="text-left rtl:text-right py-2 px-3 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#14203b]"
            >
              {t('nav_about')}
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="text-left rtl:text-right py-2 px-3 rounded-xl text-sm font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#14203b]"
            >
              {t('nav_contact')}
            </button>
            <button
              onClick={() => scrollTo('contact')}
              className="btn-pill-brand text-xs !py-3 w-full justify-center mt-2"
            >
              <span>{t('nav_cta')}</span>
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
