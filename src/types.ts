export interface MobileApp {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  playStoreUrl: string;
  order: number;
  category?: string;
  downloadsBadge?: string;
  ratingBadge?: string;
  createdAt?: string;
  updatedAt?: string;

  // Extended optional attributes for rich mobile studio showcase
  nameAr?: string;
  descriptionAr?: string;
  features?: string[];
  featuresAr?: string[];
  screenshots?: string[];
  featured?: boolean;
  privacyUrl?: string;
  heroImageUrl?: string;
  version?: string;
}

export interface SiteSettings {
  heroHeadline: string;
  tagline: string;
  aboutText: string;
  contactEmail: string;
  updatedAt?: string;
  // Bilingual optional overrides
  heroHeadlineAr?: string;
  taglineAr?: string;
  aboutTextAr?: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}
