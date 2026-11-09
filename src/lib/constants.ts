/**
 * Centralized Site and SaaS Configuration
 * Allows zero-code configuration when deploying across environments, staging, and custom domains.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  "https://celaest-landing.estebani1421.workers.dev"
).replace(/\/$/, "");

export const DASHBOARD_URL = (
  process.env.NEXT_PUBLIC_SAAS_DASHBOARD_URL || "https://celaest-dashboard.estebani1421.workers.dev"
).replace(/\/$/, "");

export const SUPPORT_EMAIL = "support@celaest.com";
export const CAREERS_EMAIL = "careers@celaest.com";
export const PRESS_EMAIL = "press@celaest.com";
export const PARTNERS_EMAIL = "partners@celaest.com";
export const STATUS_URL = "https://status.celaest.com";
