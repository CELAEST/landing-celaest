/**
 * Centralized Site and SaaS Configuration
 * Allows zero-code configuration when deploying across environments, staging, and custom domains.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://landing-celaest.vercel.app")
).replace(/\/$/, "");

export const DASHBOARD_URL = (
  process.env.NEXT_PUBLIC_SAAS_DASHBOARD_URL || "https://celaest-dashboard.vercel.app"
).replace(/\/$/, "");

export const SUPPORT_EMAIL = "support@celaest.com";
export const CAREERS_EMAIL = "careers@celaest.com";
export const PRESS_EMAIL = "press@celaest.com";
export const PARTNERS_EMAIL = "partners@celaest.com";
export const STATUS_URL = "https://status.celaest.com";
