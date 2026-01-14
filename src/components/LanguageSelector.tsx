import { Globe } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from '../context/LanguageContext';
import type { Locale } from '../types/i18n';

const languages = {
  en: { name: 'English', code: 'EN' },
  es: { name: 'Español', code: 'ES' },
};

export function LanguageSelector() {
  const { locale, setLocale } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (newLocale: Locale) => {
    // Add smooth transition when changing language
    document.body.style.transition = 'opacity 0.15s ease-in-out';
    document.body.style.opacity = '0.95';
    
    setTimeout(() => {
      setLocale(newLocale);
      setIsOpen(false);
      
      setTimeout(() => {
        document.body.style.opacity = '1';
      }, 50);
    }, 100);
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 group"
        aria-label="Select language"
      >
        <Globe className="w-4 h-4 text-[#E2E8F0] group-hover:text-[#10B981] transition-colors" />
        <span className="text-sm font-medium text-[#E2E8F0] group-hover:text-[#10B981] transition-colors">
          {languages[locale].code}
        </span>
        <svg 
          className={`w-4 h-4 text-[#E2E8F0] group-hover:text-[#10B981] transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 rounded-lg bg-white shadow-2xl overflow-hidden animate-fadeIn z-50 border border-[#E2E8F0]">
          {Object.entries(languages).map(([code, lang]) => (
            <button
              key={code}
              onClick={() => handleSelect(code as Locale)}
              className={`w-full px-4 py-3 text-left flex items-center gap-3 transition-all duration-200 ${
                locale === code
                  ? 'bg-[#10B981]/10 text-[#10B981] font-semibold'
                  : 'text-[#475569] hover:bg-[#F8FAFC] hover:text-[#10B981]'
              }`}
            >
              <Globe className="w-4 h-4" />
              <div className="flex-1">
                <div className="text-sm">{lang.name}</div>
              </div>
              {locale === code && (
                <svg className="w-4 h-4 text-[#10B981]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
