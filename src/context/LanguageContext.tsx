import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { Locale, Translation } from '../types/i18n';
import { en } from '../locales/en';
import { es } from '../locales/es';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translation;
}

const translations: Record<Locale, Translation> = {
  en,
  es,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'preferred-locale';

// Detectar idioma del navegador
const getDefaultLocale = (): Locale => {
  const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
  if (stored && (stored === 'en' || stored === 'es')) {
    return stored;
  }
  
  const browserLang = navigator.language.toLowerCase();
  if (browserLang.startsWith('es')) return 'es';
  return 'en';
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getDefaultLocale);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(STORAGE_KEY, newLocale);
    document.documentElement.lang = newLocale;
  };

  useEffect(() => {
    document.documentElement.lang = locale;
  }, []);

  const value: LanguageContextType = {
    locale,
    setLocale,
    t: translations[locale],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useTranslation() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within LanguageProvider');
  }
  return context;
}
