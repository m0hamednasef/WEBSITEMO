import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  setDoc,
  deleteDoc,
  updateDoc,
  writeBatch,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { MobileApp, SiteSettings } from '../types';
import { DEFAULT_APPS, DEFAULT_SITE_SETTINGS } from '../data/defaultData';

const APPS_PATH = 'apps';
const SITE_CONTENT_PATH = 'site_content';
const SITE_DOC_ID = 'settings';

export function subscribeApps(
  onData: (apps: MobileApp[]) => void,
  onError?: (error: Error) => void
) {
  const colRef = collection(db, APPS_PATH);
  return onSnapshot(
    colRef,
    (snapshot) => {
      const apps: MobileApp[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        apps.push({
          id: docSnap.id,
          name: data.name ?? 'Untitled App',
          description: data.description ?? '',
          iconUrl: data.iconUrl ?? '',
          playStoreUrl: data.playStoreUrl ?? '',
          order: typeof data.order === 'number' ? data.order : 0,
          category: data.category,
          downloadsBadge: data.downloadsBadge,
          ratingBadge: data.ratingBadge,
          createdAt: data.createdAt,
          updatedAt: data.updatedAt,
          nameAr: data.nameAr,
          descriptionAr: data.descriptionAr,
          features: data.features,
          featuresAr: data.featuresAr,
          screenshots: data.screenshots,
          featured: data.featured ?? false,
          privacyUrl: data.privacyUrl,
          heroImageUrl: data.heroImageUrl,
          version: data.version,
        });
      });
      apps.sort((a, b) => a.order - b.order);
      onData(apps);
    },
    (error) => {
      onError?.(error);
      handleFirestoreError(error, OperationType.LIST, APPS_PATH);
    }
  );
}

export function subscribeSiteSettings(
  onData: (settings: SiteSettings) => void,
  onError?: (error: Error) => void
) {
  const docRef = doc(db, SITE_CONTENT_PATH, SITE_DOC_ID);
  return onSnapshot(
    docRef,
    (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        const resolvedEmail =
          !data.contactEmail || data.contactEmail === 'medonasef27@gmail.com'
            ? 'mostudioapps@gmail.com'
            : data.contactEmail;

        onData({
          heroHeadline: data.heroHeadline ?? DEFAULT_SITE_SETTINGS.heroHeadline,
          heroHeadlineAr: data.heroHeadlineAr ?? DEFAULT_SITE_SETTINGS.heroHeadlineAr,
          tagline: data.tagline ?? DEFAULT_SITE_SETTINGS.tagline,
          taglineAr: data.taglineAr ?? DEFAULT_SITE_SETTINGS.taglineAr,
          aboutText: data.aboutText ?? DEFAULT_SITE_SETTINGS.aboutText,
          aboutTextAr: data.aboutTextAr ?? DEFAULT_SITE_SETTINGS.aboutTextAr,
          contactEmail: resolvedEmail,
          updatedAt: data.updatedAt,
        });
      } else {
        onData(DEFAULT_SITE_SETTINGS);
      }
    },
    (error) => {
      onError?.(error);
      handleFirestoreError(error, OperationType.GET, `${SITE_CONTENT_PATH}/${SITE_DOC_ID}`);
    }
  );
}

export async function addApp(appData: Omit<MobileApp, 'id'>): Promise<string> {
  const newId = 'app-' + Date.now();
  const docRef = doc(db, APPS_PATH, newId);
  const now = new Date().toISOString();
  const payload: Record<string, unknown> = {
    name: appData.name,
    description: appData.description,
    iconUrl: appData.iconUrl,
    playStoreUrl: appData.playStoreUrl,
    order: Number(appData.order ?? 0),
    createdAt: now,
    updatedAt: now,
  };

  if (appData.category) payload.category = appData.category;
  if (appData.downloadsBadge) payload.downloadsBadge = appData.downloadsBadge;
  if (appData.ratingBadge) payload.ratingBadge = appData.ratingBadge;
  if (appData.nameAr) payload.nameAr = appData.nameAr;
  if (appData.descriptionAr) payload.descriptionAr = appData.descriptionAr;
  if (appData.featured !== undefined) payload.featured = appData.featured;
  if (appData.features) payload.features = appData.features;
  if (appData.featuresAr) payload.featuresAr = appData.featuresAr;
  if (appData.screenshots) payload.screenshots = appData.screenshots;
  if (appData.version) payload.version = appData.version;
  if (appData.privacyUrl) payload.privacyUrl = appData.privacyUrl;

  try {
    await setDoc(docRef, payload);
    return newId;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, `${APPS_PATH}/${newId}`);
  }
}

export async function updateApp(id: string, appData: Partial<MobileApp>): Promise<void> {
  const docRef = doc(db, APPS_PATH, id);
  const defaultApp = DEFAULT_APPS.find((a) => a.id === id);

  const payload: Record<string, unknown> = {
    updatedAt: new Date().toISOString(),
  };

  if (appData.name !== undefined) payload.name = appData.name;
  else if (defaultApp) payload.name = defaultApp.name;

  if (appData.description !== undefined) payload.description = appData.description;
  else if (defaultApp) payload.description = defaultApp.description;

  if (appData.iconUrl !== undefined) payload.iconUrl = appData.iconUrl;
  else if (defaultApp) payload.iconUrl = defaultApp.iconUrl;

  if (appData.playStoreUrl !== undefined) payload.playStoreUrl = appData.playStoreUrl;
  else if (defaultApp) payload.playStoreUrl = defaultApp.playStoreUrl;

  if (appData.order !== undefined) payload.order = Number(appData.order);
  else if (defaultApp) payload.order = Number(defaultApp.order);

  if (appData.category !== undefined) payload.category = appData.category;
  else if (defaultApp?.category) payload.category = defaultApp.category;

  if (appData.downloadsBadge !== undefined) payload.downloadsBadge = appData.downloadsBadge;
  else if (defaultApp?.downloadsBadge) payload.downloadsBadge = defaultApp.downloadsBadge;

  if (appData.ratingBadge !== undefined) payload.ratingBadge = appData.ratingBadge;
  else if (defaultApp?.ratingBadge) payload.ratingBadge = defaultApp.ratingBadge;

  if (appData.nameAr !== undefined) payload.nameAr = appData.nameAr;
  else if (defaultApp?.nameAr) payload.nameAr = defaultApp.nameAr;

  if (appData.descriptionAr !== undefined) payload.descriptionAr = appData.descriptionAr;
  else if (defaultApp?.descriptionAr) payload.descriptionAr = defaultApp.descriptionAr;

  if (appData.featured !== undefined) payload.featured = appData.featured;
  else if (defaultApp?.featured !== undefined) payload.featured = defaultApp.featured;

  if (appData.features !== undefined) payload.features = appData.features;
  else if (defaultApp?.features) payload.features = defaultApp.features;

  if (appData.featuresAr !== undefined) payload.featuresAr = appData.featuresAr;
  else if (defaultApp?.featuresAr) payload.featuresAr = defaultApp.featuresAr;

  if (appData.screenshots !== undefined) payload.screenshots = appData.screenshots;
  else if (defaultApp?.screenshots) payload.screenshots = defaultApp.screenshots;

  if (appData.version !== undefined) payload.version = appData.version;
  else if (defaultApp?.version) payload.version = defaultApp.version;

  if (appData.privacyUrl !== undefined) payload.privacyUrl = appData.privacyUrl;
  else if (defaultApp?.privacyUrl) payload.privacyUrl = defaultApp.privacyUrl;

  try {
    await setDoc(docRef, payload, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, `${APPS_PATH}/${id}`);
  }
}

export async function deleteApp(id: string): Promise<void> {
  const docRef = doc(db, APPS_PATH, id);
  try {
    await deleteDoc(docRef);
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, `${APPS_PATH}/${id}`);
  }
}

export async function reorderApps(apps: MobileApp[]): Promise<void> {
  const batch = writeBatch(db);
  apps.forEach((app, idx) => {
    const docRef = doc(db, APPS_PATH, app.id);
    batch.update(docRef, { order: idx });
  });

  try {
    await batch.commit();
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, APPS_PATH);
  }
}

export async function saveSiteSettings(settings: SiteSettings): Promise<void> {
  const docRef = doc(db, SITE_CONTENT_PATH, SITE_DOC_ID);
  const payload: Record<string, unknown> = {
    heroHeadline: settings.heroHeadline,
    tagline: settings.tagline,
    aboutText: settings.aboutText,
    contactEmail: settings.contactEmail,
    updatedAt: new Date().toISOString(),
  };

  if (settings.heroHeadlineAr) payload.heroHeadlineAr = settings.heroHeadlineAr;
  if (settings.taglineAr) payload.taglineAr = settings.taglineAr;
  if (settings.aboutTextAr) payload.aboutTextAr = settings.aboutTextAr;

  try {
    await setDoc(docRef, payload, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, `${SITE_CONTENT_PATH}/${SITE_DOC_ID}`);
  }
}

export async function seedInitialDataIfEmpty(): Promise<boolean> {
  try {
    const colRef = collection(db, APPS_PATH);
    const snap = await getDocs(colRef);
    if (snap.empty) {
      const batch = writeBatch(db);
      DEFAULT_APPS.forEach((app, idx) => {
        const appRef = doc(db, APPS_PATH, app.id);
        const payload: Record<string, unknown> = {
          name: app.name,
          description: app.description,
          iconUrl: app.iconUrl,
          playStoreUrl: app.playStoreUrl,
          order: idx,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        if (app.category) payload.category = app.category;
        if (app.downloadsBadge) payload.downloadsBadge = app.downloadsBadge;
        if (app.ratingBadge) payload.ratingBadge = app.ratingBadge;
        if (app.nameAr) payload.nameAr = app.nameAr;
        if (app.descriptionAr) payload.descriptionAr = app.descriptionAr;
        if (app.features) payload.features = app.features;
        if (app.featuresAr) payload.featuresAr = app.featuresAr;
        if (app.screenshots) payload.screenshots = app.screenshots;
        if (app.featured !== undefined) payload.featured = app.featured;
        if (app.version) payload.version = app.version;
        if (app.privacyUrl) payload.privacyUrl = app.privacyUrl;
        batch.set(appRef, payload);
      });
      const settingsRef = doc(db, SITE_CONTENT_PATH, SITE_DOC_ID);
      batch.set(settingsRef, {
        heroHeadline: DEFAULT_SITE_SETTINGS.heroHeadline,
        heroHeadlineAr: DEFAULT_SITE_SETTINGS.heroHeadlineAr,
        tagline: DEFAULT_SITE_SETTINGS.tagline,
        taglineAr: DEFAULT_SITE_SETTINGS.taglineAr,
        aboutText: DEFAULT_SITE_SETTINGS.aboutText,
        aboutTextAr: DEFAULT_SITE_SETTINGS.aboutTextAr,
        contactEmail: DEFAULT_SITE_SETTINGS.contactEmail,
        updatedAt: new Date().toISOString(),
      });
      await batch.commit();
      return true;
    }
    return false;
  } catch (error) {
    console.warn('Initial seeding check skipped or permission deferred:', error);
    return false;
  }
}
