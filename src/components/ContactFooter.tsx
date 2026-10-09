import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useI18n } from '../context/I18nContext';
import { Mail, Copy, Check, Lock, ArrowUpRight, ShieldCheck, Heart } from 'lucide-react';

interface ContactFooterProps {
  contactEmail: string;
  onNavigateAdmin: () => void;
  onOpenPrivacy?: () => void;
}

export const ContactFooter: React.FC<ContactFooterProps> = ({
  contactEmail,
  onNavigateAdmin,
  onOpenPrivacy,
}) => {
  const { language, direction, t } = useI18n();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(contactEmail);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <footer id="contact" className="relative border-t border-slate-200/90 dark:border-[#1e2e4e] bg-slate-50 dark:bg-[#070a14] transition-colors pt-20 pb-12">
      {/* Background soft glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-[#0284c7]/10 dark:bg-[#38bdf8]/10 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Contact Block */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-50 dark:bg-[#14203b] text-[#0284c7] dark:text-[#38bdf8] border border-sky-200 dark:border-[#1e2e4e] mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>{t('contact_eyebrow')}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t('contact_title')}
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {t('contact_desc')}
          </p>

          {/* Email button pill & copy button */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`mailto:${contactEmail}`}
              className="btn-pill-brand w-full sm:w-auto text-sm !py-3.5 !px-8 cursor-pointer"
            >
              <Mail className="w-4 h-4" />
              <span>{contactEmail}</span>
              <ArrowUpRight className="w-4 h-4 opacity-75" />
            </a>

            <button
              onClick={handleCopy}
              className="btn-pill-outline w-full sm:w-auto text-sm !py-3.5 !px-6 cursor-pointer"
              title="Copy email to clipboard"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{t('contact_copied')}</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>{t('contact_copy_btn')}</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Bottom Bar with Logo & Copyright */}
        <div className="mt-20 pt-8 border-t border-slate-200 dark:border-[#1e2e4e] flex flex-col sm:flex-row items-center justify-between gap-5 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
            <img
              src="/logo.png"
              alt="Mohammed Studio"
              className="h-8 w-auto max-w-[120px] object-contain opacity-90"
            />
            <span>•</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              © {new Date().getFullYear()} Mohammed Studio
            </span>
            <span>•</span>
            <span className="text-slate-400">{t('footer_rights')}</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5">
            {/* Privacy Policy Link */}
            {onOpenPrivacy && (
              <button
                onClick={onOpenPrivacy}
                className="hover:text-[#0284c7] dark:hover:text-[#38bdf8] transition-colors cursor-pointer"
              >
                {language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy'}
              </button>
            )}

            {/* app-ads.txt link */}
            <a
              href="/app-ads.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#0284c7] dark:hover:text-[#38bdf8] transition-colors underline underline-offset-2"
            >
              app-ads.txt
            </a>

            {/* Admin link kept quietly in footer as requested */}
            <button
              onClick={onNavigateAdmin}
              className="inline-flex items-center gap-1.5 text-slate-400 hover:text-[#0284c7] dark:hover:text-[#38bdf8] transition-colors cursor-pointer"
              title="Admin Portal"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{t('footer_admin')}</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
