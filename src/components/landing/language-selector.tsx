'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import { useLocale } from 'next-intl';
import { Globe, Check, ChevronDown, Loader2 } from 'lucide-react';
import { useRouter, usePathname } from '@/i18n/navigation';
import { routing, localeNames, localeCodes, type Locale } from '@/i18n/routing';
import { cn } from '@/lib/utils';

export function LanguageSelector() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
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
    setIsOpen(false);
    
    // Use React transition for smooth navigation without blocking UI
    startTransition(() => {
      router.replace(
        { pathname },
        { locale: newLocale }
      );
    });
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-300 group",
          isPending && "opacity-70 cursor-wait"
        )}
        aria-label={`Language: ${localeCodes[locale]}`}
        aria-expanded={isOpen}
      >
        {isPending ? (
          <Loader2 className="w-4 h-4 text-brand-mint animate-spin" />
        ) : (
          <Globe className="w-4 h-4 text-brand-soft group-hover:text-brand-mint transition-colors" />
        )}
        <span className="text-sm font-medium text-brand-soft group-hover:text-brand-mint transition-colors">
          {localeCodes[locale]}
        </span>
        <ChevronDown
          className={cn(
            'w-4 h-4 text-brand-soft group-hover:text-brand-mint transition-all duration-300',
            isOpen && 'rotate-180'
          )}
        />
      </button>

      {isOpen && !isPending && (
        <div className="absolute top-full right-0 mt-2 w-48 rounded-xl bg-[#0a0a0a]/95 backdrop-blur-xl shadow-2xl overflow-hidden animate-fade-in z-50 border border-white/10">
          {routing.locales.map((code) => (
            <button
              key={code}
              onClick={() => handleSelect(code)}
              className={cn(
                'w-full px-4 py-3 text-left flex items-center gap-3 transition-all duration-200 first:rounded-t-xl last:rounded-b-xl',
                locale === code
                  ? 'bg-brand-neon/15 text-brand-neon font-semibold'
                  : 'text-brand-soft hover:bg-white/5 hover:text-white'
              )}
            >
              <Globe className={cn("w-4 h-4", locale === code ? "text-brand-neon" : "text-white/40")} />
              <span className="flex-1 text-sm">{localeNames[code]}</span>
              {locale === code && <Check className="w-4 h-4 text-brand-neon" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
