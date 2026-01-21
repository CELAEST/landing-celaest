'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Plus, Minus } from 'lucide-react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FAQ {
  question: string;
  answer: string;
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const t = useTranslations('faq');

  const faqs = t.raw('questions') as FAQ[];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={ref} id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className={cn('text-center mb-16 scroll-reveal', isVisible && 'is-visible')}>
          <h2 className="text-5xl md:text-6xl font-bold text-brand-deep mb-6">
            {t('title1')}
            <br />
            <span className="gradient-text">{t('title2')}</span>
          </h2>
          <p className="text-xl text-brand-slate-medium">{t('subtitle')}</p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={cn(
                'border border-brand-soft rounded-xl overflow-hidden transition-all hover:border-brand-mint/30 hover:shadow-lg hover:shadow-brand-mint/5 scroll-reveal',
                isVisible && 'is-visible'
              )}
              style={{ transitionDelay: `${Math.min(index * 100, 600)}ms` }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 flex items-center justify-between bg-white hover:bg-brand-ice transition-colors text-left"
                aria-expanded={openIndex === index}
              >
                <span className="font-bold text-brand-deep text-lg pr-4">{faq.question}</span>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <Minus className="w-6 h-6 text-brand-mint" />
                  ) : (
                    <Plus className="w-6 h-6 text-brand-slate-medium" />
                  )}
                </div>
              </button>

              <div
                className={cn(
                  'overflow-hidden transition-all duration-300',
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                )}
              >
                <div className="px-8 py-6 bg-brand-ice">
                  <p className="text-brand-slate-medium leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-white rounded-2xl p-8 border border-brand-soft">
          <h3 className="text-2xl font-bold text-brand-deep mb-4">{t('stillQuestions')}</h3>
          <p className="text-brand-slate-medium mb-6">{t('supportDescription')}</p>
          <Button size="lg">{t('contactSupport')}</Button>
        </div>
      </div>
    </section>
  );
}
