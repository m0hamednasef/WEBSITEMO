/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { I18nProvider } from './context/I18nContext';
import { AuthProvider } from './context/AuthContext';
import { FloatingHeader } from './components/FloatingHeader';
import { HeroSection } from './components/HeroSection';
import { AppsGridSection } from './components/AppsGridSection';
import { About } from './components/About';
import { ContactFooter } from './components/ContactFooter';
import { AdminPanel } from './components/AdminPanel';
import { AppDetailModal } from './components/AppDetailModal';
import { PrivacyModal } from './components/PrivacyModal';
import { ToastContainer } from './components/Toast';
import { MobileApp, SiteSettings, ToastMessage } from './types';
import { DEFAULT_APPS, DEFAULT_SITE_SETTINGS } from './data/defaultData';
import {
  subscribeApps,
  subscribeSiteSettings,
} from './services/firestoreService';

export default function App() {
  const [isAdminRoute, setIsAdminRoute] = useState<boolean>(() => {
    return (
      window.location.pathname === '/admin' ||
      window.location.hash === '#/admin' ||
      window.location.hash === '#admin'
    );
  });

  const [apps, setApps] = useState<MobileApp[]>(DEFAULT_APPS);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [selectedDetailApp, setSelectedDetailApp] = useState<MobileApp | null>(null);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  // Toast helper
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const newToast: ToastMessage = {
      id: 'toast-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      type,
      message,
    };
    setToasts((prev) => [...prev, newToast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync route with browser history
  useEffect(() => {
    const handlePopState = () => {
      setIsAdminRoute(
        window.location.pathname === '/admin' ||
        window.location.hash === '#/admin' ||
        window.location.hash === '#admin'
      );
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const navigateToAdmin = () => {
    setIsAdminRoute(true);
    window.history.pushState({}, '', '/admin');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = () => {
    setIsAdminRoute(false);
    window.history.pushState({}, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Subscribe to real-time Firestore updates
  useEffect(() => {
    // Listen to Apps collection
    const unsubApps = subscribeApps(
      (loadedApps) => {
        if (loadedApps.length > 0) {
          setApps(loadedApps);
        } else {
          // Keep defaults if database collection is empty initially
          setApps(DEFAULT_APPS);
        }
      },
      (err) => {
        console.warn('Apps subscribe notice:', err);
      }
    );

    // Listen to Site Settings doc
    const unsubSettings = subscribeSiteSettings(
      (settings) => {
        setSiteSettings(settings);
      },
      (err) => {
        console.warn('Settings subscribe notice:', err);
      }
    );

    return () => {
      unsubApps();
      unsubSettings();
    };
  }, []);

  // Determine featured app (default to Masarifi or first featured)
  const featuredApp = apps.find((a) => a.featured) || apps[0];

  return (
    <ThemeProvider>
      <I18nProvider>
        <AuthProvider>
          <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#070a14] text-slate-900 dark:text-slate-100 selection:bg-[#0284c7] selection:text-white transition-colors duration-300">
            {/* Unified Floating Brand Header */}
            <FloatingHeader
              isAdminView={isAdminRoute}
              onNavigateAdmin={navigateToAdmin}
              onNavigateHome={navigateToHome}
            />

            <main className="flex-1">
              {isAdminRoute ? (
                <AdminPanel
                  apps={apps}
                  siteSettings={siteSettings}
                  onNavigateHome={navigateToHome}
                  showToast={showToast}
                />
              ) : (
                <>
                  {/* Hero Showcase Section */}
                  <HeroSection
                    headline={siteSettings.heroHeadline}
                    headlineAr={siteSettings.heroHeadlineAr}
                    tagline={siteSettings.tagline}
                    taglineAr={siteSettings.taglineAr}
                    onExploreApps={() => {
                      document.getElementById('apps')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    onContact={() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  />

                  {/* Complete Mobile Apps Grid (Masarifi, CalorieCam, and all additions) */}
                  <AppsGridSection
                    apps={apps}
                    onOpenDetail={(app) => setSelectedDetailApp(app)}
                    onOpenAdminPrompt={navigateToAdmin}
                  />

                  {/* About Mohammed Studio & Engineering Philosophy */}
                  <About
                    aboutText={siteSettings.aboutText}
                    aboutTextAr={siteSettings.aboutTextAr}
                  />
                </>
              )}
            </main>

            {/* Studio Footer with Official Email & App-Ads.txt */}
            {!isAdminRoute && (
              <ContactFooter
                contactEmail={siteSettings.contactEmail || 'mostudioapps@gmail.com'}
                onNavigateAdmin={navigateToAdmin}
                onOpenPrivacy={() => setIsPrivacyOpen(true)}
              />
            )}

            {/* App Detail Modal */}
            <AppDetailModal
              app={selectedDetailApp}
              onClose={() => setSelectedDetailApp(null)}
            />

            {/* Privacy Policy Modal */}
            <PrivacyModal
              isOpen={isPrivacyOpen}
              onClose={() => setIsPrivacyOpen(false)}
            />

            {/* Global Toast Notifications */}
            <ToastContainer toasts={toasts} onDismiss={dismissToast} />
          </div>
        </AuthProvider>
      </I18nProvider>
    </ThemeProvider>
  );
}
