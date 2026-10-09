import React, { createContext, useContext, useEffect, useState } from 'react';

export type Language = 'en' | 'ar';
export type Direction = 'ltr' | 'rtl';

interface I18nContextType {
  language: Language;
  direction: Direction;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    nav_home: 'Home',
    nav_apps: 'Our Apps',
    nav_featured: 'Featured',
    nav_about: 'Studio',
    nav_contact: 'Contact',
    nav_cta: "Let's Talk",

    // Hero
    hero_eyebrow: 'MOHAMMED STUDIO • DIGITAL MOBILE LAB',
    hero_title_1: 'WE CRAFT',
    hero_title_2: 'PURPOSEFUL',
    hero_title_3: 'MOBILE EXPERIENCES.',
    hero_tagline:
      'A modern digital studio engineering fast, focused, and beautifully designed Android apps on Google Play. Built native-first, distraction-free, and privacy-respecting.',
    hero_cta_apps: 'Explore Our Apps',
    hero_cta_contact: 'Get In Touch',
    hero_badge_rating: '4.9★ Google Play Quality',
    hero_badge_native: '100% Native Kotlin',
    hero_badge_privacy: 'Zero Intrusive Tracking',
    hero_badge_performance: 'High Performance',
    hero_location: 'Studio / Worldwide',

    // Featured App
    featured_eyebrow: 'FEATURED APPLICATION',
    featured_title: 'Spotlight Mobile Creation',
    featured_desc:
      'Experience our flagship mobile solution crafted for peak daily flow and financial clarity.',
    get_on_play: 'Get it on Google Play',
    view_details: 'Explore App Features',

    // Apps Section
    apps_eyebrow: 'APPLICATION PORTFOLIO',
    apps_title: 'Engineered for Daily Utility',
    apps_subtitle:
      'Intuitive tools designed with obsessive attention to speed, ergonomic design, and privacy.',
    apps_empty: 'No applications published yet. Add your first app in the admin dashboard.',
    apps_view_more: 'View Details',
    apps_category_all: 'All Apps',
    status_live: 'Live on Google Play',
    status_updated: 'Recently Updated',

    // Capabilities / Process
    capabilities_eyebrow: 'STUDIO PHILOSOPHY',
    capabilities_title: 'How We Build Modern Apps',
    process_1_title: 'Ergonomic Design',
    process_1_desc: 'Thoughtfully tested for comfortable one-handed use with fluid 120Hz physics.',
    process_2_title: 'High Performance',
    process_2_desc: 'Ultra-fast cold startup, tiny APK footprint, and battery-conscious engineering.',
    process_3_title: 'User Privacy First',
    process_3_desc: 'Zero sneaky trackers, minimal system permissions, and local-first data storage.',

    // About Section
    about_eyebrow: 'ABOUT THE STUDIO',
    about_title: 'Crafted with Passion & Precision',

    // CTA
    cta_eyebrow: 'READY TO UPGRADE YOUR DAILY FLOW?',
    cta_title: 'Download Our Apps on Google Play Today',
    cta_desc:
      'Join thousands of satisfied users experiencing lightweight, high-craft mobile software.',
    cta_button: 'Explore Apps on Google Play',

    // App Detail View
    detail_back: 'Back to Showcase',
    detail_features: 'Key Features & Capabilities',
    detail_overview: 'Application Overview',
    detail_download: 'Download on Google Play',
    detail_privacy: 'Privacy Policy',

    // Contact & Footer
    contact_eyebrow: 'CONNECT WITH US',
    contact_title: "Let's Build Something Great",
    contact_desc:
      'Inquiries, bug reports, feature requests, or partnership discussions are always welcome.',
    contact_copy_btn: 'Copy Address',
    contact_copied: 'Copied!',
    footer_rights: 'All rights reserved.',
    footer_admin: 'Admin Portal',
  },
  ar: {
    // Navigation
    nav_home: 'الرئيسية',
    nav_apps: 'تطبيقاتنا',
    nav_featured: 'المميز',
    nav_about: 'عن الاستوديو',
    nav_contact: 'تواصل معنا',
    nav_cta: 'تواصل الآن',

    // Hero
    hero_eyebrow: 'استوديو محمد • مختبر تطوير التطبيقات الذكية',
    hero_title_1: 'نبتكر',
    hero_title_2: 'تجارب رقمية',
    hero_title_3: 'تثري حياتك اليومية.',
    hero_tagline:
      'استوديو رقمي مستقل متخصص في هندسة تطبيقات أندرويد فائقة السرعة، أنيقة التصميم، وبأعلى معايير الخصوصية والأداء على Google Play.',
    hero_cta_apps: 'استكشف تطبيقاتنا',
    hero_cta_contact: 'تواصل مع الاستوديو',
    hero_badge_rating: 'تقييم 4.9★ على Google Play',
    hero_badge_native: '100% كوتلن أصيل',
    hero_badge_privacy: 'بدون تتبع أو إعلانات مزعجة',
    hero_badge_performance: 'أداء فائق وسلس',
    hero_location: 'استوديو رقمي / عالمي',

    // Featured App
    featured_eyebrow: 'التطبيق المميز',
    featured_title: 'أحدث إبداعاتنا في متناول يدك',
    featured_desc:
      'تعرّف على حلولنا المبتكرة المصممة لتسهيل روتينك اليومي وتحقيق أعلى إنتاجية بدقة متناهية.',
    get_on_play: 'تحميل من Google Play',
    view_details: 'تفاصيل ومميزات التطبيق',

    // Apps Section
    apps_eyebrow: 'معرض التطبيقات المنشورة',
    apps_title: 'تطبيقات صُنعت لإحداث فارق حقيقي',
    apps_subtitle:
      'أدوات ذكية تجمع بين التصميم المريح، السرعة العالية، والاحترام التام لخصوصية المستخدم.',
    apps_empty: 'لا توجد تطبيقات منشورة حالياً. أضف تطبيقك الأول عبر لوحة التحكم.',
    apps_view_more: 'تفاصيل التطبيق',
    apps_category_all: 'كافة التطبيقات',
    status_live: 'متاح على Google Play',
    status_updated: 'مُحدّث مؤخراً',

    // Capabilities / Process
    capabilities_eyebrow: 'فلسفة التطوير في الاستوديو',
    capabilities_title: 'كيف نصنع تطبيقات تدوم وتُلهم',
    process_1_title: 'تصميم مريح وسهل الاستخدام',
    process_1_desc: 'مُختبر بدقة للاستخدام السلس بيد واحدة مع حركات تفاعلية طبيعية بمعدل 120Hz.',
    process_2_title: 'سرعة فائقة وخفة في الأداء',
    process_2_desc: 'تشغيل فوري، واستهلاك ضئيل للذاكرة والبطارية ومساحة التخزين.',
    process_3_title: 'الخصوصية أولاً وأخيراً',
    process_3_desc: 'تخزين محلي آمن، مع انعدام تام لأي كود تتبع خفي أو تصاريح غير مبررة.',

    // About Section
    about_eyebrow: 'عن استوديو محمد',
    about_title: 'شغف بالهندسة النقية والتصميم الراقي',

    // CTA
    cta_eyebrow: 'هل أنت جاهز لتجربة رقمية أفضل؟',
    cta_title: 'حمّل تطبيقاتنا من متجر Google Play الآن',
    cta_desc:
      'انضم لآلاف المستخدمين الذين يعتمدون على تطبيقاتنا يومياً لحياة أكثر تنظيماً وهدوءاً.',
    cta_button: 'استكشف التطبيقات على Google Play',

    // App Detail View
    detail_back: 'العودة للمعرض',
    detail_features: 'أبرز المميزات والخصائص',
    detail_overview: 'نظرة عامة على التطبيق',
    detail_download: 'تنزيل عبر Google Play',
    detail_privacy: 'سياسة الخصوصية',

    // Contact & Footer
    contact_eyebrow: 'تواصل معنا مباشرة',
    contact_title: 'لنصنع معاً شيئاً استثنائياً',
    contact_desc:
      'نرحب دائماً باقتراحاتكم، تقارير التطوير، أو أي استفسارات تخص التطبيقات والتعاون التقني.',
    contact_copy_btn: 'نسخ البريد الإلكتروني',
    contact_copied: 'تم النسخ!',
    footer_rights: 'جميع الحقوق محفوظة.',
    footer_admin: 'لوحة المشرف',
  },
};

const I18nContext = createContext<I18nContextType>({
  language: 'en',
  direction: 'ltr',
  toggleLanguage: () => {},
  setLanguage: () => {},
  t: (key) => key,
});

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('ms_lang');
      if (saved === 'ar' || saved === 'en') return saved;
    } catch {
      // ignore
    }
    return 'en'; // default English, one-click switch to Arabic
  });

  const direction: Direction = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('lang', language);
    root.setAttribute('dir', direction);
    try {
      localStorage.setItem('ms_lang', language);
    } catch {
      // ignore
    }
  }, [language, direction]);

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  return (
    <I18nContext.Provider value={{ language, direction, toggleLanguage, setLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => useContext(I18nContext);
