/**
 * Centralized Site and SaaS Configuration
 * Allows zero-code configuration when deploying across environments, staging, and custom domains.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://celaest.com"
).replace(/\/$/, "");

export const DASHBOARD_URL = (
  process.env.NEXT_PUBLIC_SAAS_DASHBOARD_URL || "https://dashboard.celaest.com"
).replace(/\/$/, "");

export const SUPPORT_EMAIL = "support@celaest.com";
export const CAREERS_EMAIL = "careers@celaest.com";
export const PRESS_EMAIL = "press@celaest.com";
export const PARTNERS_EMAIL = "partners@celaest.com";
export const STATUS_URL = "https://status.celaest.com";
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-6G3ZXG8P6L";
export const GOOGLE_TAG_ID = process.env.NEXT_PUBLIC_GOOGLE_TAG_ID || "GTM-5K4V332D";
export const CLARITY_PROJECT_ID = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID || "ze9xiasgqs";
