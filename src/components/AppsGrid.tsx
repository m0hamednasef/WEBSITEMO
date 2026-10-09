import React from 'react';
import { motion } from 'motion/react';
import { MobileApp } from '../types';
import { ExternalLink, Smartphone } from 'lucide-react';

interface AppsGridProps {
  apps: MobileApp[];
  onOpenAdminPrompt?: () => void;
}

// Google Play Badge SVG
const GooglePlayIcon: React.FC<{ className?: string }> = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path
      d="M3.609 1.814L13.793 12 3.61 22.186a2.235 2.235 0 0 1-.61-1.611V3.425c0-.62.226-1.189.609-1.611z"
      fill="#2196F3"
    />
    <path
      d="M17.18 8.613L4.85 1.5c-.39-.22-.84-.33-1.24-.31l10.183 10.81 3.387-3.397z"
      fill="#4CAF50"
    />
    <path
      d="M3.61 22.81c.4.02.85-.09 1.24-.31l12.33-7.113-3.387-3.397-10.183 10.82z"
      fill="#F44336"
    />
    <path
      d="M20.91 10.767l-3.73-2.154-3.387 3.397 3.387 3.397 3.73-2.154a1.867 1.867 0 0 0 0-3.486z"
      fill="#FFEB3B"
    />
  </svg>
);

export const AppsGrid: React.FC<AppsGridProps> = ({ apps, onOpenAdminPrompt }) => {
  return (
    <section id="apps" className="py-20 md:py-28 relative scroll-mt-12 bg-white">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[720px] bg-[#9184D9]/8 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="text-xs font-semibold uppercase tracking-widest text-[#9184D9]">
            Portfolio Showcase
          </span>
          <h2 className="mt-2 text-[28px] sm:text-[36px] font-bold tracking-[-0.54px] text-[#161826] leading-[1.35]">
            Published Applications
          </h2>
          <p className="mt-4 text-[14.5px] text-[#595D6C] leading-[1.85]">
            Engineered with modern Kotlin, Jetpack Compose, and obsessive attention to detail.
          </p>
        </motion.div>

        {apps.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-[20px] border border-dashed border-[#CFD3E5] bg-[#F8F9FE]">
            <Smartphone className="w-12 h-12 text-[#9397AB] mx-auto mb-4" />
            <h3 className="text-lg font-bold text-[#161826]">
              No apps published yet
            </h3>
            <p className="text-sm text-[#595D6C] mt-1 max-w-sm mx-auto leading-[1.8]">
              Open the admin panel to add your first mobile app or restore sample apps.
            </p>
            {onOpenAdminPrompt && (
              <button
                onClick={onOpenAdminPrompt}
                className="btn-pill mt-5 text-sm"
              >
                Open Admin Panel
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {apps.map((app, index) => (
              <motion.div
                key={app.id || index}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.12 }}
                whileHover={{ y: -6 }}
                className="group relative flex flex-col justify-between p-[20px_18px] sm:p-[26px_24px] rounded-[16px] sm:rounded-[20px] bg-white border border-[#E4E7F5] shadow-[0_4px_24px_rgba(22,24,38,0.04)] hover:border-[#9184D9] hover:shadow-[0_16px_40px_rgba(145,132,217,0.14)] transition-all duration-300"
              >
                <div>
                  {/* Top Row: App Icon & Tags */}
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div className="relative">
                      {/* App Icon */}
                      <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-[16px] overflow-hidden bg-[#F8F9FE] border border-[#E4E7F5] shadow-sm flex items-center justify-center p-1.5 group-hover:scale-105 transition-transform duration-300">
                        {app.iconUrl ? (
                          <img
                            src={app.iconUrl}
                            alt={`${app.name} icon`}
                            className="w-full h-full object-cover rounded-[12px]"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <Smartphone className="w-10 h-10 text-[#9184D9]" />
                        )}
                      </div>
                    </div>

                    {/* Metadata Badges */}
                    <div className="flex flex-col items-end gap-1.5">
                      {app.category && (
                        <span className="text-[11px] font-semibold tracking-wide uppercase px-3 py-1 rounded-full bg-[#F3F5FE] text-[#595D6C] border border-[#E4E7F5]">
                          {app.category}
                        </span>
                      )}
                      {(app.ratingBadge || app.downloadsBadge) && (
                        <div className="flex items-center gap-1.5 text-xs text-[#595D6C] font-medium">
                          {app.ratingBadge && (
                            <span className="text-amber-500 font-bold">
                              {app.ratingBadge}
                            </span>
                          )}
                          {app.ratingBadge && app.downloadsBadge && <span>•</span>}
                          {app.downloadsBadge && <span>{app.downloadsBadge}</span>}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* App Title (H3 Token: 24px 700, 1.12 line-height, -0.36px tracking) */}
                  <h3 className="text-[21px] sm:text-[24px] font-bold text-[#161826] tracking-[-0.36px] leading-[1.2] group-hover:text-[#796CBF] transition-colors">
                    {app.name}
                  </h3>

                  {/* App Description (Body: 14.5px, 1.85 line-height) */}
                  <p className="mt-3 text-[14.5px] text-[#595D6C] leading-[1.85] line-clamp-3">
                    {app.description}
                  </p>
                </div>

                {/* Bottom Action: Get it on Google Play (Pill Button) */}
                <div className="mt-8 pt-5 border-t border-[#E4E7F5] flex items-center justify-between">
                  <a
                    href={app.playStoreUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-pill !py-[10px] !px-[20px] text-xs !bg-[#161826] !text-white hover:!bg-[#9184D9] group/btn cursor-pointer shadow-sm"
                  >
                    <GooglePlayIcon className="w-4 h-4 shrink-0" />
                    <div className="flex flex-col text-left leading-none">
                      <span className="text-[8px] uppercase tracking-wider text-slate-300 font-medium">
                        GET IT ON
                      </span>
                      <span className="text-[12px] font-bold tracking-tight">Google Play</span>
                    </div>
                    <ExternalLink className="w-3 h-3 text-slate-400 group-hover/btn:text-white transition-colors ml-1" />
                  </a>

                  <span className="text-xs text-[#75798C] font-medium hidden sm:inline">
                    Android 8.0+
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
