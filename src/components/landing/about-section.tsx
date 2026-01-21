'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Code, Users, Award, Shield, type LucideIcon } from 'lucide-react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Value {
  icon: LucideIcon;
  key: string;
}

const VALUES: Value[] = [
  { icon: Code, key: 'devFirst' },
  { icon: Shield, key: 'security' },
  { icon: Award, key: 'quality' },
  { icon: Users, key: 'support' },
];

export function AboutSection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const t = useTranslations('about');

  return (
    <section ref={ref} id="about" className="py-24 bg-white">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className={cn('relative scroll-reveal-left', isVisible && 'is-visible')}>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
              <Image
                src="https://images.unsplash.com/photo-1748346918817-0b1b6b2f9bab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB0ZWFtfGVufDF8fHx8MTc2ODIzODMyOXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Development team working"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                loading="lazy"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-gradient-mint text-white px-6 py-4 rounded-xl shadow-2xl shadow-brand-mint/30">
              <div className="text-3xl font-bold">{t('badgeYears')}</div>
              <div className="text-sm opacity-90">{t('badge')}</div>
            </div>
          </div>

          {/* Content Side */}
          <div className={cn('scroll-reveal-right', isVisible && 'is-visible')}>
            <h2 className="text-5xl md:text-6xl font-bold text-brand-deep mb-6">
              {t('title1')}
              <br />
              <span className="gradient-text">{t('title2')}</span>
            </h2>

            <p className="text-xl text-brand-slate-medium mb-8 leading-relaxed">
              {t('description1')}
            </p>

            <p className="text-lg text-brand-slate-medium mb-12 leading-relaxed">
              {t('description2')}
            </p>

            {/* Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {VALUES.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={value.key}
                    className={cn('flex gap-4 scroll-reveal', isVisible && 'is-visible')}
                    style={{ transitionDelay: `${index * 100 + 200}ms` }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-brand-mint/10 to-brand-mint-dark/10 rounded-lg flex items-center justify-center flex-shrink-0 border border-brand-mint/20">
                      <Icon className="w-6 h-6 text-brand-mint" />
                    </div>
                    <div>
                      <h4 className="font-bold text-brand-deep mb-1">
                        {t(`values.${value.key}.title`)}
                      </h4>
                      <p className="text-sm text-brand-slate-medium">
                        {t(`values.${value.key}.description`)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-12">
              <Button variant="secondary" size="lg">
                {t('learnMore')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
