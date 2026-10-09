import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useI18n } from '../context/I18nContext';
import { X, ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  const { language } = useI18n();

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-2xl bg-white dark:bg-[#0e172b] rounded-[32px] border border-slate-200/90 dark:border-[#1e2e4e] shadow-2xl p-6 sm:p-8 z-10 my-8 max-h-[85vh] overflow-y-auto"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 rtl:right-auto rtl:left-5 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#14203b] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-[#14203b] text-[#0284c7] dark:text-[#38bdf8] flex items-center justify-center border border-sky-100 dark:border-[#1e2e4e]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {language === 'ar' ? 'سياسة الخصوصية — استوديو محمد' : 'Privacy Policy — Mohammed Studio'}
              </h3>
              <p className="text-xs text-slate-500">
                {language === 'ar' ? 'آخر تحديث: 2026' : 'Last updated: 2026'}
              </p>
            </div>
          </div>

          <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              {language === 'ar'
                ? 'في استوديو محمد (Mohammed Studio)، خصوصية مستخدمي تطبيقاتنا وأمان بياناتهم هي أولويتنا القصوى. نحن نصمم تطبيقات أندرويد ترتكز على مبدأ "الخصوصية أولاً" (Privacy-by-Design).'
                : 'At Mohammed Studio, user privacy and data sovereignty are foundational principles. All applications engineered under our brand adhere strictly to privacy-first standards.'}
            </p>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#14203b]/60 border border-slate-100 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>{language === 'ar' ? 'تخزين محلي بدون خوادم خارجية' : 'Local-First Architecture'}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'ar'
                  ? 'البيانات الشخصية والمالية في تطبيقاتنا (مثل مصاريفي) تُحفظ محلياً على جهازك ولا تُرسل لأي خادم سحابي خارجي.'
                  : 'Personal records and financial logs remain securely stored in local SQLite / Room databases on your physical device.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#14203b]/60 border border-slate-100 dark:border-slate-800 space-y-2">
              <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>{language === 'ar' ? 'صفر برمجيات تتبع خفية' : 'Zero Covert Telemetry'}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'ar'
                  ? 'لا نستخدم حزم SDK للتتبع الخفي ولا نبيع أي معلومات لأطراف ثالثة إطلاقاً.'
                  : 'We do not integrate aggressive ad networks or sell personal information to brokers or third parties.'}
              </p>
            </div>

            <p className="pt-2">
              {language === 'ar'
                ? 'لأي استفسارات قانونية أو تقنية، يمكنكم التواصل معنا مباشرة عبر البريد الرسمي: '
                : 'For any privacy-related questions or audit inquiries, contact our engineering desk at: '}
              <a href="mailto:mostudioapps@gmail.com" className="font-semibold text-[#0284c7] dark:text-[#38bdf8] underline">
                mostudioapps@gmail.com
              </a>
            </p>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
            <button
              onClick={onClose}
              className="btn-pill-brand text-xs !py-2.5 !px-6 cursor-pointer"
            >
              {language === 'ar' ? 'فهمت ذلك' : 'Understood'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
