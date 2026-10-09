import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth, ADMIN_EMAIL } from '../context/AuthContext';
import { MobileApp, SiteSettings } from '../types';
import {
  addApp,
  updateApp,
  deleteApp,
  reorderApps,
  saveSiteSettings,
  seedInitialDataIfEmpty,
} from '../services/firestoreService';
import {
  Plus,
  ArrowUp,
  ArrowDown,
  Edit2,
  Trash2,
  Save,
  LogOut,
  ArrowLeft,
  Upload,
  CheckCircle,
  AlertTriangle,
  Smartphone,
  FileText,
  RefreshCw,
  ExternalLink,
  Lock,
  Globe,
  Languages,
} from 'lucide-react';

interface AdminPanelProps {
  apps: MobileApp[];
  siteSettings: SiteSettings;
  onNavigateHome: () => void;
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  apps,
  siteSettings,
  onNavigateHome,
  showToast,
}) => {
  const {
    user,
    loginWithEmail,
    logout,
    authError,
    clearAuthError,
  } = useAuth();

  // Auth form state - strictly locked to official admin account
  const [email, setEmail] = useState('mostudioapps@gmail.com');
  const [password, setPassword] = useState('');
  const [submittingAuth, setSubmittingAuth] = useState(false);

  // Active admin tab: 'apps' | 'site'
  const [activeTab, setActiveTab] = useState<'apps' | 'site'>('apps');

  // App Modal state - Full Arabic & English support
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [editingAppId, setEditingAppId] = useState<string | null>(null);
  const [modalTab, setModalTab] = useState<'ar' | 'en' | 'general'>('ar');

  // English App fields
  const [appName, setAppName] = useState('');
  const [appDescription, setAppDescription] = useState('');
  const [appFeatures, setAppFeatures] = useState('');

  // Arabic App fields
  const [appNameAr, setAppNameAr] = useState('');
  const [appDescriptionAr, setAppDescriptionAr] = useState('');
  const [appFeaturesAr, setAppFeaturesAr] = useState('');

  // General App fields
  const [appPlayStoreUrl, setAppPlayStoreUrl] = useState('');
  const [appIconUrl, setAppIconUrl] = useState('');
  const [appCategory, setAppCategory] = useState('');
  const [appDownloads, setAppDownloads] = useState('');
  const [appRating, setAppRating] = useState('');
  const [appVersion, setAppVersion] = useState('1.0.0');
  const [iconInputMode, setIconInputMode] = useState<'upload' | 'url'>('upload');
  const [isSavingApp, setIsSavingApp] = useState(false);

  // Delete modal state
  const [deleteTarget, setDeleteTarget] = useState<MobileApp | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Site copy form state (Bilingual)
  const [siteTab, setSiteTab] = useState<'ar' | 'en'>('ar');
  const [heroHeadline, setHeroHeadline] = useState(siteSettings.heroHeadline);
  const [heroHeadlineAr, setHeroHeadlineAr] = useState(siteSettings.heroHeadlineAr || '');
  const [tagline, setTagline] = useState(siteSettings.tagline);
  const [taglineAr, setTaglineAr] = useState(siteSettings.taglineAr || '');
  const [aboutText, setAboutText] = useState(siteSettings.aboutText);
  const [aboutTextAr, setAboutTextAr] = useState(siteSettings.aboutTextAr || '');
  const [contactEmail, setContactEmail] = useState(siteSettings.contactEmail);
  const [isSavingSettings, setIsSavingSettings] = useState(false);

  // Update local copy state if parent settings refresh
  React.useEffect(() => {
    setHeroHeadline(siteSettings.heroHeadline);
    setHeroHeadlineAr(siteSettings.heroHeadlineAr || '');
    setTagline(siteSettings.tagline);
    setTaglineAr(siteSettings.taglineAr || '');
    setAboutText(siteSettings.aboutText);
    setAboutTextAr(siteSettings.aboutTextAr || '');
    setContactEmail(siteSettings.contactEmail);
  }, [siteSettings]);

  // When official admin is authenticated, ensure Firestore has initial data if empty
  React.useEffect(() => {
    if (user && user.email === ADMIN_EMAIL) {
      seedInitialDataIfEmpty().catch(console.warn);
    }
  }, [user]);

  // Auth handler strictly enforcing admin account
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      showToast('Please enter both email and password', 'error');
      return;
    }
    setSubmittingAuth(true);
    try {
      await loginWithEmail(email, password);
      showToast('Welcome back, Admin!', 'success');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Authentication failed';
      showToast(msg, 'error');
    } finally {
      setSubmittingAuth(false);
    }
  };

  // Open modal for Adding new app
  const handleOpenAddModal = () => {
    setEditingAppId(null);
    setAppName('');
    setAppNameAr('');
    setAppDescription('');
    setAppDescriptionAr('');
    setAppFeatures('');
    setAppFeaturesAr('');
    setAppVersion('1.0.0');
    setAppPlayStoreUrl('https://play.google.com/store/apps/details?id=');
    setAppIconUrl('');
    setAppCategory('Productivity / إنتاجية');
    setAppDownloads('10K+ DL');
    setAppRating('4.9 ★');
    setModalTab('ar');
    setIsAppModalOpen(true);
  };

  // Open modal for Editing existing app
  const handleOpenEditModal = (app: MobileApp) => {
    setEditingAppId(app.id);
    setAppName(app.name || '');
    setAppNameAr(app.nameAr || '');
    setAppDescription(app.description || '');
    setAppDescriptionAr(app.descriptionAr || '');
    setAppFeatures(app.features ? app.features.join('\n') : '');
    setAppFeaturesAr(app.featuresAr ? app.featuresAr.join('\n') : '');
    setAppVersion(app.version || '1.0.0');
    setAppPlayStoreUrl(app.playStoreUrl || '');
    setAppIconUrl(app.iconUrl || '');
    setAppCategory(app.category || '');
    setAppDownloads(app.downloadsBadge || '');
    setAppRating(app.ratingBadge || '');
    setIconInputMode(app.iconUrl?.startsWith('data:') ? 'upload' : 'url');
    setModalTab('ar');
    setIsAppModalOpen(true);
  };

  // Image file upload handler with resize compression
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (.png, .jpg, .webp, .svg)', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      if (file.type === 'image/svg+xml') {
        setAppIconUrl(result);
        showToast('Vector icon loaded successfully', 'success');
        return;
      }

      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxSize = 192;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxSize) {
            height = Math.round((height * maxSize) / width);
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width = Math.round((width * maxSize) / height);
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);
        const compressedDataUrl = canvas.toDataURL('image/webp', 0.88);
        setAppIconUrl(compressedDataUrl);
        showToast('Icon loaded & optimized for mobile', 'success');
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  // Save App (Create or Update with Arabic & English fields)
  const handleSaveApp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!appName.trim() && !appNameAr.trim()) {
      showToast('يجب إدخال اسم التطبيق (بالعربية أو الإنجليزية) / App name is required', 'error');
      return;
    }
    if (!appDescription.trim() && !appDescriptionAr.trim()) {
      showToast('يجب إدخال وصف التطبيق / App description is required', 'error');
      return;
    }
    if (!appPlayStoreUrl.trim()) {
      showToast('رابط متجر جوجل بلاي مطلوب / Google Play link is required', 'error');
      return;
    }

    // Graceful fallback if one language wasn't filled
    const resolvedNameEn = appName.trim() || appNameAr.trim();
    const resolvedNameAr = appNameAr.trim() || appName.trim();
    const resolvedDescEn = appDescription.trim() || appDescriptionAr.trim();
    const resolvedDescAr = appDescriptionAr.trim() || appDescription.trim();

    const parsedFeatures = appFeatures
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);
    const parsedFeaturesAr = appFeaturesAr
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const finalIcon =
      appIconUrl.trim() ||
      `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='24' fill='%231e2d63'/%3E%3Cpath d='M30 70V30L50 50L70 30V70' fill='none' stroke='white' stroke-width='8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E`;

    setIsSavingApp(true);
    try {
      if (editingAppId) {
        const existingApp = apps.find((a) => a.id === editingAppId);
        await updateApp(editingAppId, {
          name: resolvedNameEn,
          nameAr: resolvedNameAr,
          description: resolvedDescEn,
          descriptionAr: resolvedDescAr,
          playStoreUrl: appPlayStoreUrl.trim(),
          iconUrl: finalIcon,
          order: existingApp?.order ?? 0,
          category: appCategory.trim(),
          downloadsBadge: appDownloads.trim(),
          ratingBadge: appRating.trim(),
          version: appVersion.trim(),
          features: parsedFeatures.length > 0 ? parsedFeatures : undefined,
          featuresAr: parsedFeaturesAr.length > 0 ? parsedFeaturesAr : undefined,
        });
        showToast(`تم تحديث التطبيق بنجاح (${resolvedNameAr})!`, 'success');
      } else {
        await addApp({
          name: resolvedNameEn,
          nameAr: resolvedNameAr,
          description: resolvedDescEn,
          descriptionAr: resolvedDescAr,
          playStoreUrl: appPlayStoreUrl.trim(),
          iconUrl: finalIcon,
          order: apps.length,
          category: appCategory.trim(),
          downloadsBadge: appDownloads.trim(),
          ratingBadge: appRating.trim(),
          version: appVersion.trim(),
          features: parsedFeatures.length > 0 ? parsedFeatures : undefined,
          featuresAr: parsedFeaturesAr.length > 0 ? parsedFeaturesAr : undefined,
        });
        showToast(`تمت إضافة التطبيق بنجاح (${resolvedNameAr})!`, 'success');
      }
      setIsAppModalOpen(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'فشل حفظ التطبيق';
      showToast(msg, 'error');
    } finally {
      setIsSavingApp(false);
    }
  };

  // Delete App
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await deleteApp(deleteTarget.id);
      showToast(`App "${deleteTarget.name}" deleted`, 'success');
      setDeleteTarget(null);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete app';
      showToast(msg, 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  // Reorder Apps: Up or Down
  const handleMoveApp = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= apps.length) return;

    const newApps = [...apps];
    const [moved] = newApps.splice(index, 1);
    newApps.splice(targetIndex, 0, moved);

    try {
      await reorderApps(newApps);
      showToast('App order updated!', 'success');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to reorder apps';
      showToast(msg, 'error');
    }
  };

  // Save Bilingual Site Content
  const handleSaveSiteContent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroHeadline.trim() || !aboutText.trim()) {
      showToast('Headline and About text are required', 'error');
      return;
    }

    setIsSavingSettings(true);
    try {
      await saveSiteSettings({
        heroHeadline: heroHeadline.trim(),
        heroHeadlineAr: heroHeadlineAr.trim() || undefined,
        tagline: tagline.trim(),
        taglineAr: taglineAr.trim() || undefined,
        aboutText: aboutText.trim(),
        aboutTextAr: aboutTextAr.trim() || undefined,
        contactEmail: contactEmail.trim(),
      });
      showToast('تم حفظ إعدادات الموقع باللغتين بنجاح!', 'success');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'فشل حفظ إعدادات الموقع';
      showToast(msg, 'error');
    } finally {
      setIsSavingSettings(false);
    }
  };

  // Seed sample apps if user wants to restore
  const handleSeedSamples = async () => {
    try {
      const result = await seedInitialDataIfEmpty();
      if (result) {
        showToast('Sample apps and settings restored to Firestore!', 'success');
      } else {
        showToast('Firestore already contains apps.', 'info');
      }
    } catch {
      showToast('Error seeding apps', 'error');
    }
  };

  // --- Render Unauthenticated Login Screen ---
  if (!user || user.email !== ADMIN_EMAIL) {
    return (
      <div className="min-w-full min-h-[calc(100vh-4.5rem)] flex items-center justify-center p-4 bg-[#F8F9FE]">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md p-8 rounded-[24px] bg-white border border-[#E4E7F5] shadow-[0_12px_40px_rgba(22,24,38,0.08)] relative"
        >
          {/* Back button */}
          <button
            onClick={onNavigateHome}
            className="inline-flex items-center gap-1.5 text-xs text-[#595D6C] hover:text-[#161826] mb-6 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> العودة إلى الموقع / Back to Showcase
          </button>

          <div className="flex items-center gap-3.5 mb-6">
            <img
              src="/logo.png"
              alt="Mohammed Studio"
              className="h-10 w-auto object-contain"
            />
            <div>
              <h1 className="text-lg font-bold text-[#161826]">
                لوحة تحكم استوديو محمد
              </h1>
              <p className="text-xs text-[#595D6C]">
                Official Administrator Portal
              </p>
            </div>
          </div>

          <div className="mb-5 p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-[11px] text-amber-800 flex items-start gap-2">
            <Lock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <span>
              محمية بالكامل: الحساب المصرح به فقط هو <strong className="font-semibold">{ADMIN_EMAIL}</strong>
            </span>
          </div>

          {authError && (
            <div className="mb-4 p-3 rounded-[8px] bg-red-50 border border-red-200 text-xs text-red-600 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleAuthSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
                Admin Email (بريد الأدمن)
              </label>
              <input
                type="email"
                required
                readOnly
                value={email}
                className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#CFD3E5] bg-[#F3F5FE] text-[#161826] text-sm cursor-not-allowed font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
                Master Password (كلمة المرور)
              </label>
              <input
                type="password"
                required
                autoFocus
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (authError) clearAuthError();
                }}
                placeholder="Enter admin password"
                className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#CFD3E5] bg-[#F8F9FE] text-[#161826] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#9184D9]"
              />
            </div>

            <button
              type="submit"
              disabled={submittingAuth}
              className="w-full py-2.5 px-4 rounded-full bg-[#1e2d63] hover:bg-[#162952] text-white text-sm font-semibold transition-all shadow-md cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" />
              <span>{submittingAuth ? 'Verifying...' : 'Sign In as Admin'}</span>
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // --- Render Authenticated Admin Dashboard ---
  return (
    <div className="min-h-screen bg-[#F8F9FE] text-[#161826] pb-24">
      {/* Top Admin Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E4E7F5] px-4 sm:px-8 py-3.5 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 text-xs text-[#595D6C] hover:text-[#161826] transition-colors cursor-pointer mr-2 py-1 px-2.5 rounded-full hover:bg-[#F3F5FE]"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Showcase</span>
            </button>

            <img
              src="/logo.png"
              alt="Mohammed Studio"
              className="h-8 w-auto object-contain"
            />
            <div className="hidden sm:block">
              <h1 className="text-sm font-bold text-[#161826] leading-tight">
                Mohammed Studio Admin
              </h1>
              <p className="text-[11px] text-[#595D6C]">
                {ADMIN_EMAIL}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View live site button */}
            <button
              onClick={onNavigateHome}
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold py-1.5 px-3 rounded-full bg-[#F3F5FE] text-[#161826] hover:bg-[#E4E7F5] transition-colors cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Site</span>
            </button>

            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 text-xs font-semibold py-1.5 px-3.5 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-8">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mb-8 border-b border-[#E4E7F5] pb-3">
          <button
            onClick={() => setActiveTab('apps')}
            className={`inline-flex items-center gap-2 py-2 px-4 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'apps'
                ? 'bg-[#1e2d63] text-white shadow-sm'
                : 'text-[#595D6C] hover:text-[#161826] hover:bg-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>إدارة التطبيقات • Manage Apps ({apps.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('site')}
            className={`inline-flex items-center gap-2 py-2 px-4 rounded-full text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'site'
                ? 'bg-[#1e2d63] text-white shadow-sm'
                : 'text-[#595D6C] hover:text-[#161826] hover:bg-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>محتوى الموقع • Website Copy</span>
          </button>
        </div>

        {/* TAB 1: Apps Management */}
        {activeTab === 'apps' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-[#161826] tracking-tight">
                  تطبيقات استوديو محمد (Mobile Showcase)
                </h2>
                <p className="text-xs text-[#595D6C] mt-0.5">
                  إضافة وتعديل بيانات التطبيقات باللغتين العربية والإنجليزية، وتغيير الترتيب وحذف التطبيقات.
                </p>
              </div>

              <div className="flex items-center gap-3">
                {apps.length === 0 && (
                  <button
                    onClick={handleSeedSamples}
                    className="btn-pill-secondary text-xs !py-2 !px-4 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Seed Default Apps</span>
                  </button>
                )}

                <button
                  onClick={handleOpenAddModal}
                  className="btn-pill text-xs !py-2.5 !px-5 cursor-pointer bg-[#1e2d63] hover:bg-[#162952]"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة تطبيق جديد • Add New App</span>
                </button>
              </div>
            </div>

            {apps.length === 0 ? (
              <div className="text-center py-16 px-4 rounded-[20px] border border-dashed border-[#CFD3E5] bg-white">
                <Smartphone className="w-10 h-10 text-[#9397AB] mx-auto mb-3" />
                <h3 className="font-semibold text-[#161826]">
                  لا توجد تطبيقات في قاعدة البيانات
                </h3>
                <p className="text-xs text-[#595D6C] mt-1 max-w-sm mx-auto mb-4">
                  اضغط على "إضافة تطبيق جديد" أو استعد التطبيقات الافتراضية.
                </p>
                <button
                  onClick={handleSeedSamples}
                  className="btn-pill text-xs !py-2 !px-4 cursor-pointer bg-[#1e2d63]"
                >
                  استعادة التطبيقات الافتراضية
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {apps.map((app, index) => (
                  <div
                    key={app.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 rounded-[16px] bg-white border border-[#E4E7F5] shadow-[0_2px_12px_rgba(22,24,38,0.04)] gap-4 transition-colors"
                  >
                    {/* Left: Reorder arrows + Icon + Bilingual Details */}
                    <div className="flex items-center gap-3.5 flex-1 min-w-0">
                      {/* Up / Down reorder controls */}
                      <div className="flex flex-col gap-1">
                        <button
                          onClick={() => handleMoveApp(index, 'up')}
                          disabled={index === 0}
                          title="Move Up"
                          className="p-1 rounded-md text-[#595D6C] hover:text-[#0284c7] hover:bg-[#F3F5FE] disabled:opacity-25 transition-colors cursor-pointer"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleMoveApp(index, 'down')}
                          disabled={index === apps.length - 1}
                          title="Move Down"
                          className="p-1 rounded-md text-[#595D6C] hover:text-[#0284c7] hover:bg-[#F3F5FE] disabled:opacity-25 transition-colors cursor-pointer"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Icon */}
                      <div className="w-14 h-14 rounded-[14px] overflow-hidden bg-[#F8F9FE] shrink-0 border border-[#E4E7F5] flex items-center justify-center p-1">
                        {app.iconUrl ? (
                          <img
                            src={app.iconUrl}
                            alt={app.name}
                            className="w-full h-full object-cover rounded-[10px]"
                          />
                        ) : (
                          <Smartphone className="w-6 h-6 text-[#0284c7]" />
                        )}
                      </div>

                      {/* Details (Shows both Arabic and English names) */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-bold text-[#161826] text-base truncate">
                            {app.nameAr ? (
                              <>
                                <span className="font-bold text-[#0284c7]">{app.nameAr}</span>
                                <span className="text-slate-400 font-normal mx-1.5">•</span>
                                <span className="text-slate-700 font-medium">{app.name}</span>
                              </>
                            ) : (
                              app.name
                            )}
                          </h4>
                          {app.category && (
                            <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-[#F3F5FE] text-[#595D6C] border border-[#E4E7F5]">
                              {app.category}
                            </span>
                          )}
                          {app.version && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                              v{app.version}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-[#595D6C] line-clamp-1 mt-1">
                          {app.descriptionAr ? (
                            <span><strong className="text-slate-700">عربي:</strong> {app.descriptionAr}</span>
                          ) : (
                            app.description
                          )}
                        </p>

                        <div className="flex items-center gap-3 mt-1.5 text-[11px] text-[#595D6C]">
                          <a
                            href={app.playStoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[#0284c7] hover:underline"
                          >
                            <ExternalLink className="w-3 h-3" /> Google Play
                          </a>
                          {app.downloadsBadge && <span>{app.downloadsBadge}</span>}
                          {app.ratingBadge && <span className="text-amber-600 font-semibold">{app.ratingBadge}</span>}
                          {app.featuresAr && <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">مزايا بالعربية ({app.featuresAr.length})</span>}
                        </div>
                      </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => handleOpenEditModal(app)}
                        className="inline-flex items-center gap-1 text-xs font-semibold py-2 px-3.5 rounded-full bg-[#F3F5FE] hover:bg-[#E4E7F5] text-[#161826] transition-colors cursor-pointer"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-[#0284c7]" />
                        <span>تعديل • Edit</span>
                      </button>

                      <button
                        onClick={() => setDeleteTarget(app)}
                        className="inline-flex items-center gap-1 text-xs font-semibold py-2 px-3 rounded-full bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                        title="Delete App"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Site Content Settings (Bilingual) */}
        {activeTab === 'site' && (
          <div className="p-6 sm:p-8 rounded-[24px] bg-white border border-[#E4E7F5] shadow-[0_4px_24px_rgba(22,24,38,0.04)] max-w-3xl">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-[#161826] tracking-tight">
                تعديل نصوص الموقع • Edit Website Content
              </h2>
              <p className="text-xs text-[#595D6C] mt-0.5">
                تحديث العنوان الرئيسي، الشعار، والنبذة التعريفية باللغتين العربية والإنجليزية.
              </p>
            </div>

            {/* Language Switcher for Site Content */}
            <div className="flex items-center gap-2 p-1 bg-[#F3F5FE] rounded-xl mb-6 max-w-md">
              <button
                type="button"
                onClick={() => setSiteTab('ar')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  siteTab === 'ar'
                    ? 'bg-white text-[#161826] shadow-sm'
                    : 'text-[#595D6C] hover:text-[#161826]'
                }`}
              >
                <span>🇸🇦</span>
                <span>المحتوى العربي (Arabic)</span>
              </button>

              <button
                type="button"
                onClick={() => setSiteTab('en')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  siteTab === 'en'
                    ? 'bg-white text-[#161826] shadow-sm'
                    : 'text-[#595D6C] hover:text-[#161826]'
                }`}
              >
                <span>🇬🇧</span>
                <span>English Content (الإنجليزية)</span>
              </button>
            </div>

            <form onSubmit={handleSaveSiteContent} className="space-y-5">
              {siteTab === 'ar' ? (
                <>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
                      العنوان الرئيسي (باللغة العربية)
                    </label>
                    <input
                      type="text"
                      dir="rtl"
                      value={heroHeadlineAr}
                      onChange={(e) => setHeroHeadlineAr(e.target.value)}
                      placeholder="نبتكر تجارب رقمية تثري حياتك اليومية."
                      className="w-full px-4 py-2.5 rounded-[8px] border border-[#CFD3E5] bg-[#F8F9FE] text-[#161826] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
                      الشعار الفرعي (باللغة العربية)
                    </label>
                    <textarea
                      rows={2}
                      dir="rtl"
                      value={taglineAr}
                      onChange={(e) => setTaglineAr(e.target.value)}
                      placeholder="استوديو رقمي مستقل متخصص في هندسة تطبيقات أندرويد فائقة السرعة..."
                      className="w-full px-4 py-2.5 rounded-[8px] border border-[#CFD3E5] bg-[#F8F9FE] text-[#161826] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7] leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
                      نبذة عن استوديو محمد (باللغة العربية)
                    </label>
                    <textarea
                      rows={5}
                      dir="rtl"
                      value={aboutTextAr}
                      onChange={(e) => setAboutTextAr(e.target.value)}
                      placeholder="مرحباً بكم في استوديو محمد..."
                      className="w-full px-4 py-2.5 rounded-[8px] border border-[#CFD3E5] bg-[#F8F9FE] text-[#161826] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7] leading-relaxed"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
                      Hero Headline (English)
                    </label>
                    <input
                      type="text"
                      required
                      value={heroHeadline}
                      onChange={(e) => setHeroHeadline(e.target.value)}
                      placeholder="We Craft Purposeful Mobile Experiences."
                      className="w-full px-4 py-2.5 rounded-[8px] border border-[#CFD3E5] bg-[#F8F9FE] text-[#161826] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
                      Hero Tagline (English)
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={tagline}
                      onChange={(e) => setTagline(e.target.value)}
                      placeholder="A modern digital studio engineering fast, native..."
                      className="w-full px-4 py-2.5 rounded-[8px] border border-[#CFD3E5] bg-[#F8F9FE] text-[#161826] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7] leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
                      About Mohammed Studio Paragraph (English)
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={aboutText}
                      onChange={(e) => setAboutText(e.target.value)}
                      placeholder="Welcome to Mohammed Studio..."
                      className="w-full px-4 py-2.5 rounded-[8px] border border-[#CFD3E5] bg-[#F8F9FE] text-[#161826] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7] leading-relaxed"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1.5">
                  Public Contact Email (البريد الرسمي للتواصل)
                </label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="mostudioapps@gmail.com"
                  className="w-full px-4 py-2.5 rounded-[8px] border border-[#CFD3E5] bg-[#F8F9FE] text-[#161826] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="submit"
                  disabled={isSavingSettings}
                  className="btn-pill text-sm !py-2.5 !px-6 cursor-pointer bg-[#1e2d63] hover:bg-[#162952]"
                >
                  <Save className="w-4 h-4" />
                  <span>{isSavingSettings ? 'جاري الحفظ...' : 'حفظ الإعدادات باللغتين • Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </main>

      {/* --- ADD / EDIT APP MODAL (WITH FULL ARABIC & ENGLISH SUPPORT) --- */}
      <AnimatePresence>
        {isAppModalOpen && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl p-6 sm:p-8 rounded-[24px] bg-white border border-[#E4E7F5] shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-4 border-b border-[#E4E7F5] pb-3">
                <div>
                  <h3 className="text-xl font-bold text-[#161826] tracking-tight">
                    {editingAppId ? 'تعديل التطبيق • Edit App' : 'إضافة تطبيق جديد • Add New App'}
                  </h3>
                  <p className="text-xs text-[#595D6C] mt-0.5">
                    إدارة بيانات التطبيق باللغتين العربية والإنجليزية
                  </p>
                </div>
                <button
                  onClick={() => setIsAppModalOpen(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-[#595D6C] hover:text-[#161826] hover:bg-[#F3F5FE] transition-colors cursor-pointer text-lg"
                >
                  ✕
                </button>
              </div>

              {/* Language & Settings Tabs */}
              <div className="flex items-center gap-1.5 p-1 bg-[#F3F5FE] rounded-xl mb-5">
                <button
                  type="button"
                  onClick={() => setModalTab('ar')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    modalTab === 'ar'
                      ? 'bg-white text-[#0284c7] shadow-sm'
                      : 'text-[#595D6C] hover:text-[#161826]'
                  }`}
                >
                  <span>🇸🇦</span>
                  <span>العربية (Arabic)</span>
                  {appNameAr && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                </button>

                <button
                  type="button"
                  onClick={() => setModalTab('en')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    modalTab === 'en'
                      ? 'bg-white text-[#0284c7] shadow-sm'
                      : 'text-[#595D6C] hover:text-[#161826]'
                  }`}
                >
                  <span>🇬🇧</span>
                  <span>English (الإنجليزية)</span>
                  {appName && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                </button>

                <button
                  type="button"
                  onClick={() => setModalTab('general')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    modalTab === 'general'
                      ? 'bg-white text-[#0284c7] shadow-sm'
                      : 'text-[#595D6C] hover:text-[#161826]'
                  }`}
                >
                  <span>⚙️</span>
                  <span>المتجر والأيقونة (Store & Icon)</span>
                </button>
              </div>

              <form onSubmit={handleSaveApp} className="space-y-4">
                {/* --- TAB 1: ARABIC FIELDS --- */}
                {modalTab === 'ar' && (
                  <div className="space-y-4">
                    <div className="p-3 bg-sky-50/70 border border-sky-100 rounded-xl text-xs text-sky-800 flex items-center gap-2">
                      <Languages className="w-4 h-4 text-[#0284c7] shrink-0" />
                      <span>يتم عرض هذه النصوص للمستخدمين عند تصفح الموقع باللغة العربية.</span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1">
                        اسم التطبيق (باللغة العربية) *
                      </label>
                      <input
                        type="text"
                        dir="rtl"
                        value={appNameAr}
                        onChange={(e) => setAppNameAr(e.target.value)}
                        placeholder="مثال: مصاريفي — تتبع النفقات والميزانية"
                        className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#CFD3E5] bg-[#F8F9FE] text-[#161826] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1">
                        الوصف المختصر (باللغة العربية) *
                      </label>
                      <textarea
                        rows={3}
                        dir="rtl"
                        value={appDescriptionAr}
                        onChange={(e) => setAppDescriptionAr(e.target.value)}
                        placeholder="تطبيق ذكي وشامل لإدارة المصاريف اليومية وتخطيط الميزانية الشهرية..."
                        className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#CFD3E5] bg-[#F8F9FE] text-[#161826] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1">
                        المزايا الرئيسية (باللغة العربية — سطر لكل ميزة)
                      </label>
                      <textarea
                        rows={4}
                        dir="rtl"
                        value={appFeaturesAr}
                        onChange={(e) => setAppFeaturesAr(e.target.value)}
                        placeholder={'تسجيل فوري للمصاريف والإيرادات بلمسة واحدة\nتحديد ميزانيات مخصصة للأقسام وتنبيهات الاستهلاك\nرسوم بيانية تفاعلية وتقارير شهرية قابلة للتصدير\nتخزين محلي آمن 100% بدون إنترنت لحماية خصوصيتك'}
                        className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#CFD3E5] bg-[#F8F9FE] text-[#161826] text-xs font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7] leading-relaxed"
                      />
                      <span className="text-[11px] text-[#595D6C] mt-1 block">
                        اكتب كل ميزة في سطر منفصل لتظهر كقائمة نقطية أنيقة للمستخدمين.
                      </span>
                    </div>

                    <div className="pt-2 flex justify-between items-center">
                      <span className="text-xs text-[#595D6C]">الخطوة 1 من 3</span>
                      <button
                        type="button"
                        onClick={() => setModalTab('en')}
                        className="text-xs font-semibold text-[#0284c7] hover:underline cursor-pointer"
                      >
                        الانتقال إلى الإنجليزية ➔
                      </button>
                    </div>
                  </div>
                )}

                {/* --- TAB 2: ENGLISH FIELDS --- */}
                {modalTab === 'en' && (
                  <div className="space-y-4">
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-slate-500 shrink-0" />
                      <span>These texts appear when visitors browse the website in English.</span>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1">
                        App Name (English) *
                      </label>
                      <input
                        type="text"
                        value={appName}
                        onChange={(e) => setAppName(e.target.value)}
                        placeholder="e.g. Masarifi — Expense & Budget Planner"
                        className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#CFD3E5] bg-[#F8F9FE] text-[#161826] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1">
                        Short Description (English) *
                      </label>
                      <textarea
                        rows={3}
                        value={appDescription}
                        onChange={(e) => setAppDescription(e.target.value)}
                        placeholder="Intelligent personal expense tracker and monthly budget planner..."
                        className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#CFD3E5] bg-[#F8F9FE] text-[#161826] text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1">
                        Key Features & Highlights (English — One per line)
                      </label>
                      <textarea
                        rows={4}
                        value={appFeatures}
                        onChange={(e) => setAppFeatures(e.target.value)}
                        placeholder={'Real-time expense & income recording with one tap\nVisual monthly budget envelopes and overspending alerts\nInteractive analytics, custom categories, and PDF exports\n100% Offline-first local database: your data never leaves your device'}
                        className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#CFD3E5] bg-[#F8F9FE] text-[#161826] text-xs font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7] leading-relaxed"
                      />
                      <span className="text-[11px] text-[#595D6C] mt-1 block">
                        Write each bullet point on its own line to display in the App Detail view.
                      </span>
                    </div>

                    <div className="pt-2 flex justify-between items-center">
                      <button
                        type="button"
                        onClick={() => setModalTab('ar')}
                        className="text-xs font-semibold text-[#595D6C] hover:underline cursor-pointer"
                      >
                        🠔 العودة إلى العربية
                      </button>
                      <button
                        type="button"
                        onClick={() => setModalTab('general')}
                        className="text-xs font-semibold text-[#0284c7] hover:underline cursor-pointer"
                      >
                        Next: Store & Visuals ➔
                      </button>
                    </div>
                  </div>
                )}

                {/* --- TAB 3: GENERAL & STORE FIELDS --- */}
                {modalTab === 'general' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#475569] mb-1">
                        Google Play Store Link (رابط المتجر) *
                      </label>
                      <input
                        type="url"
                        required
                        value={appPlayStoreUrl}
                        onChange={(e) => setAppPlayStoreUrl(e.target.value)}
                        placeholder="https://play.google.com/store/apps/details?id=com.mohammedstudio.app"
                        className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#CFD3E5] bg-[#F8F9FE] text-[#161826] text-sm font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                      />
                    </div>

                    {/* Icon input selector */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-semibold uppercase tracking-wider text-[#475569]">
                          App Icon (أيقونة التطبيق)
                        </label>
                        <div className="flex gap-2 text-xs">
                          <button
                            type="button"
                            onClick={() => setIconInputMode('upload')}
                            className={`px-3 py-1 rounded-full cursor-pointer transition-colors ${
                              iconInputMode === 'upload'
                                ? 'bg-[#1e2d63] text-white'
                                : 'bg-[#F3F5FE] text-[#595D6C] hover:text-[#161826]'
                            }`}
                          >
                            File Upload
                          </button>
                          <button
                            type="button"
                            onClick={() => setIconInputMode('url')}
                            className={`px-3 py-1 rounded-full cursor-pointer transition-colors ${
                              iconInputMode === 'url'
                                ? 'bg-[#1e2d63] text-white'
                                : 'bg-[#F3F5FE] text-[#595D6C] hover:text-[#161826]'
                            }`}
                          >
                            Image URL
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-[14px] overflow-hidden bg-[#F8F9FE] border border-[#CFD3E5] shrink-0 flex items-center justify-center p-1">
                          {appIconUrl ? (
                            <img
                              src={appIconUrl}
                              alt="Icon preview"
                              className="w-full h-full object-cover rounded-[10px]"
                            />
                          ) : (
                            <Smartphone className="w-6 h-6 text-[#9397AB]" />
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          {iconInputMode === 'upload' ? (
                            <label className="flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-[8px] border border-dashed border-[#CFD3E5] hover:border-[#0284c7] bg-[#F8F9FE] text-[#595D6C] text-xs font-medium cursor-pointer transition-colors">
                              <Upload className="w-4 h-4 text-[#0284c7]" />
                              <span>اختر ملف صورة (.png, .webp, .svg)</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageFileChange}
                                className="hidden"
                              />
                            </label>
                          ) : (
                            <input
                              type="url"
                              value={appIconUrl}
                              onChange={(e) => setAppIconUrl(e.target.value)}
                              placeholder="https://example.com/icon.png"
                              className="w-full px-3.5 py-2 rounded-[8px] border border-[#CFD3E5] bg-[#F8F9FE] text-[#161826] text-xs font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                            />
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Additional metadata tags */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                      <div>
                        <label className="block text-[11px] font-semibold text-[#475569] mb-1">
                          Category / التصنيف
                        </label>
                        <input
                          type="text"
                          value={appCategory}
                          onChange={(e) => setAppCategory(e.target.value)}
                          placeholder="Finance / الإنتاجية"
                          className="w-full px-3 py-1.5 rounded-[8px] border border-[#CFD3E5] bg-[#F8F9FE] text-[#161826] text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-[#475569] mb-1">
                          Downloads / التحميلات
                        </label>
                        <input
                          type="text"
                          value={appDownloads}
                          onChange={(e) => setAppDownloads(e.target.value)}
                          placeholder="50K+ Downloads"
                          className="w-full px-3 py-1.5 rounded-[8px] border border-[#CFD3E5] bg-[#F8F9FE] text-[#161826] text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-[#475569] mb-1">
                          Rating / التقييم
                        </label>
                        <input
                          type="text"
                          value={appRating}
                          onChange={(e) => setAppRating(e.target.value)}
                          placeholder="4.9 ★"
                          className="w-full px-3 py-1.5 rounded-[8px] border border-[#CFD3E5] bg-[#F8F9FE] text-[#161826] text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold text-[#475569] mb-1">
                          Version / الإصدار
                        </label>
                        <input
                          type="text"
                          value={appVersion}
                          onChange={(e) => setAppVersion(e.target.value)}
                          placeholder="2.4.1"
                          className="w-full px-3 py-1.5 rounded-[8px] border border-[#CFD3E5] bg-[#F8F9FE] text-[#161826] text-xs font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Modal Footer Controls */}
                <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#E4E7F5]">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#595D6C] hidden sm:inline">
                      {appNameAr ? '🇸🇦 عربي ✓' : '🇸🇦 مطلوب عربي'} • {appName ? '🇬🇧 English ✓' : '🇬🇧 English required'}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setIsAppModalOpen(false)}
                      className="btn-pill-secondary text-xs !py-2 !px-4 cursor-pointer"
                    >
                      إلغاء • Cancel
                    </button>

                    <button
                      type="submit"
                      disabled={isSavingApp}
                      className="btn-pill text-xs !py-2 !px-6 cursor-pointer disabled:opacity-50 bg-[#1e2d63] hover:bg-[#162952]"
                    >
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>{isSavingApp ? 'جاري الحفظ...' : 'حفظ التطبيق باللغتين • Save App'}</span>
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- DELETE CONFIRMATION MODAL --- */}
      <AnimatePresence>
        {deleteTarget && (
          <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md p-6 rounded-[24px] bg-white border border-[#E4E7F5] shadow-2xl"
            >
              <div className="w-12 h-12 rounded-full bg-red-50 text-red-600 flex items-center justify-center mb-4">
                <Trash2 className="w-6 h-6" />
              </div>

              <h3 className="text-lg font-bold text-[#161826] mb-1">
                تأكيد حذف التطبيق
              </h3>
              <p className="text-xs text-[#595D6C] leading-relaxed mb-6">
                هل أنت متأكد من رغبتك في حذف تطبيق <strong className="text-slate-800">"{deleteTarget.nameAr || deleteTarget.name}"</strong> نهائياً من الموقع وقاعدة البيانات؟ لا يمكن التراجع عن هذا الإجراء.
              </p>

              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setDeleteTarget(null)}
                  disabled={isDeleting}
                  className="btn-pill-secondary text-xs !py-2 !px-4 cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                  className="py-2 px-5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isDeleting ? 'جاري الحذف...' : 'نعم، احذف التطبيق'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
