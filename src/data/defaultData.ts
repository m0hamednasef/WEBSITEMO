import { MobileApp, SiteSettings } from '../types';

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  heroHeadline: "We Craft Purposeful Mobile Experiences.",
  heroHeadlineAr: "نبتكر تجارب رقمية تثري حياتك اليومية.",
  tagline: "A modern digital studio engineering fast, native, and beautifully designed Android apps on Google Play. Built native-first, distraction-free, and privacy-respecting.",
  taglineAr: "استوديو رقمي مستقل متخصص في هندسة تطبيقات أندرويد فائقة السرعة، أنيقة التصميم، وبأعلى معايير الخصوصية والأداء على متجر Google Play.",
  aboutText: "Welcome to Mohammed Studio. As an independent mobile application laboratory, we design and engineer Android software combining utilitarian purpose with refined ergonomics. Every app is built native-first with modern Kotlin, lightweight memory footprints, battery-conscious architectures, and zero intrusive tracking. Explore our published mobile apps on Google Play below or get in touch for technical inquiries.",
  aboutTextAr: "مرحباً بكم في استوديو محمد (Mohammed Studio). نحن مختبر هندسي مستقل لتطوير تطبيقات الهواتف الذكية بنظام أندرويد، نجمع بين الدقة النفعية والجمالية الهادئة. كافة تطبيقاتنا مبنية بتقنيات أندرويد الأصلية (Kotlin & Jetpack Compose)، وتتميز بأداء فائق، وخفة في استهلاك البطارية والذاكرة، مع انعدام تام لأي أكواد تتبع أو إعلانات مزعجة. استكشف تطبيقاتنا المنشورة عبر Google Play أو تواصل معنا مباشرة.",
  contactEmail: "mostudioapps@gmail.com",
};

export const DEFAULT_APPS: MobileApp[] = [
  {
    id: "app-masarifi",
    name: "Masarifi — مصاريفي",
    nameAr: "مصاريفي — تتبع النفقات والميزانية",
    description: "Intelligent personal expense tracker and monthly budget planner. Gain full financial clarity with instant categorization, offline privacy, and zero ads.",
    descriptionAr: "تطبيق ذكي وشامل لإدارة المصاريف اليومية وتخطيط الميزانية الشهرية. استمتع برؤية مالية واضحة، وتقارير تفصيلية، وأمان تام لبياناتك بدون إنترنت وبدون إعلانات.",
    iconUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'%3E%3Cdefs%3E%3ClinearGradient id='gm1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%231e2d63'/%3E%3Cstop offset='100%25' stop-color='%230284c7'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='120' height='120' rx='28' fill='url(%23gm1)'/%3E%3Ccircle cx='60' cy='60' r='36' stroke='%2338bdf8' stroke-width='4' stroke-dasharray='120 30' fill='none'/%3E%3Cpath d='M46 68 L56 58 L66 64 L74 52' stroke='white' stroke-width='5' stroke-linecap='round' stroke-linejoin='round' fill='none'/%3E%3Ccircle cx='74' cy='52' r='4' fill='%2338bdf8'/%3E%3Cpath d='M60 38 V44 M60 76 V82 M50 48 C50 44 70 44 70 54 C70 64 50 64 50 74 C50 82 70 82 70 78' stroke='white' stroke-width='4' stroke-linecap='round' fill='none'/%3E%3C/svg%3E",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.mohammedstudio.masarifi",
    order: 0,
    category: "Finance & Productivity",
    downloadsBadge: "50K+ Downloads",
    ratingBadge: "4.9 ★",
    featured: true,
    version: "2.4.1",
    privacyUrl: "#privacy",
    features: [
      "Real-time expense & income recording with one tap",
      "Visual monthly budget envelopes and overspending alerts",
      "Interactive analytics, custom categories, and PDF exports",
      "100% Offline-first local database: your data never leaves your device",
    ],
    featuresAr: [
      "تسجيل فوري للمصاريف والإيرادات بلمسة واحدة",
      "تحديد ميزانيات مخصصة للأقسام وتنبيهات عند اقتراب تجاوز الحد",
      "رسوم بيانية تفاعلية وتقارير شهرية قابلة للتصدير بصيغة PDF",
      "تخزين محلي آمن 100% بدون الحاجة لإنترنت لحماية خصوصيتك المالية",
    ],
    screenshots: [
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 640'%3E%3Crect width='320' height='640' rx='36' fill='%230f172a'/%3E%3Crect x='10' y='10' width='300' height='620' rx='28' fill='%231e293b'/%3E%3Crect x='30' y='40' width='260' height='110' rx='18' fill='%231e2d63'/%3E%3Ccircle cx='60' cy='75' r='18' fill='%2338bdf8'/%3E%3Crect x='90' y='65' width='120' height='10' rx='5' fill='white'/%3E%3Crect x='90' y='85' width='70' height='8' rx='4' fill='%2394a3b8'/%3E%3Crect x='30' y='170' width='260' height='140' rx='18' fill='%230f172a'/%3E%3Cpath d='M50 260 C80 230, 110 270, 150 220 C190 180, 230 250, 270 200' stroke='%2338bdf8' stroke-width='4' fill='none'/%3E%3Crect x='30' y='330' width='260' height='60' rx='14' fill='%23334155'/%3E%3Crect x='30' y='405' width='260' height='60' rx='14' fill='%23334155'/%3E%3Crect x='30' y='480' width='260' height='60' rx='14' fill='%23334155'/%3E%3C/svg%3E",
    ],
  },
  {
    id: "app-caloriecam",
    name: "CalorieCam — AI Nutrition",
    nameAr: "كالوري كام — ماسح السعرات الذكي",
    description: "Snap a photo of any meal to instantly calculate calories, protein, and macros with advanced on-device computer vision and health insights.",
    descriptionAr: "التقط صورة لطبقك ليقوم الذكاء الاصطناعي بحساب السعرات الحرارية، البروتين، والعناصر الغذائية فوراً مع تتبع دقيق لهدفك الصحي اليومي.",
    iconUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 120 120'%3E%3Cdefs%3E%3ClinearGradient id='gc1' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%230284c7'/%3E%3Cstop offset='100%25' stop-color='%2338bdf8'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='120' height='120' rx='28' fill='%23131b34'/%3E%3Crect x='8' y='8' width='104' height='104' rx='24' fill='none' stroke='%231e2d63' stroke-width='2'/%3E%3Crect x='30' y='38' width='60' height='48' rx='14' fill='url(%23gc1)'/%3E%3Ccircle cx='60' cy='62' r='14' fill='%23131b34'/%3E%3Ccircle cx='60' cy='62' r='8' fill='%2338bdf8'/%3E%3Ccircle cx='74' cy='48' r='3.5' fill='white'/%3E%3Cpath d='M44 32 L48 38 M76 32 L72 38' stroke='%2338bdf8' stroke-width='4' stroke-linecap='round'/%3E%3C/svg%3E",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.mohammedstudio.caloriecam",
    order: 1,
    category: "Health & AI Vision",
    downloadsBadge: "25K+ Downloads",
    ratingBadge: "4.8 ★",
    featured: false,
    version: "1.8.0",
    privacyUrl: "#privacy",
    features: [
      "Instant food scanning via camera lens & AI vision recognition",
      "Automatic macro-nutrient breakdown: Protein, Carbs, Fats, Fiber",
      "Daily calorie goal tracking with clean widget integration",
      "Barcode lookup with 1M+ verified food database entries",
    ],
    featuresAr: [
      "التعرف الفوري على الوجبات بمسح الصورة عبر الكاميرا والذكاء الاصطناعي",
      "تحليل دقيق لنسب البروتين، الكربوهيدرات، والدهون في كل وجبة",
      "متابعة الهدف اليومي للسعرات مع دعم ويدجت الشاشة الرئيسية",
      "مسح الباركود السريع وقاعدة بيانات لأكثر من مليون منتج غذائي",
    ],
    screenshots: [
      "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 320 640'%3E%3Crect width='320' height='640' rx='36' fill='%230b1329'/%3E%3Crect x='10' y='10' width='300' height='620' rx='28' fill='%23111c38'/%3E%3Ccircle cx='160' cy='180' r='90' fill='%23162952' stroke='%2338bdf8' stroke-width='4'/%3E%3Crect x='40' y='320' width='240' height='70' rx='16' fill='%231e2d63'/%3E%3Crect x='40' y='410' width='110' height='80' rx='16' fill='%231e2d63'/%3E%3Crect x='170' y='410' width='110' height='80' rx='16' fill='%231e2d63'/%3E%3Crect x='40' y='510' width='240' height='55' rx='14' fill='%230284c7'/%3E%3C/svg%3E",
    ],
  },
];
