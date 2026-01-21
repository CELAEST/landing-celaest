import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'es'],
  // Used when no locale matches
  defaultLocale: 'en',
  // Prefix the default locale as well
  localePrefix: 'always',
});

export type Locale = (typeof routing.locales)[number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
};

export const localeCodes: Record<Locale, string> = {
  en: 'EN',
  es: 'ES',
};
