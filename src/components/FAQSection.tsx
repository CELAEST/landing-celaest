import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTranslation } from '../context/LanguageContext';

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { ref, isVisible } = useScrollReveal();
  const { t } = useTranslation();

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={ref} id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 scroll-reveal ${isVisible ? 'is-visible' : ''}`}>
          <h2 className="text-5xl md:text-6xl font-bold text-[#0F172A] mb-6">
            {t.faq.title1}
            <br />
            <span className="bg-gradient-to-r from-[#10B981] to-[#059669] bg-clip-text text-transparent">{t.faq.title2}</span>
          </h2>
          <p className="text-xl text-[#475569]">
            {t.faq.subtitle}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {t.faq.questions.map((faq, index) => (
            <div
              key={index}
              className={`border border-[#E2E8F0] rounded-xl overflow-hidden transition-all hover:border-[#10B981]/30 hover:shadow-lg hover:shadow-[#10B981]/5 scroll-reveal ${isVisible ? 'is-visible' : ''} delay-${Math.min(index * 100, 600)}`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 flex items-center justify-between bg-white hover:bg-[#F8FAFC] transition-colors"
              >
                <span className="font-bold text-[#0F172A] text-left text-lg">
                  {faq.question}
                </span>
                <div className="flex-shrink-0 ml-4">
                  {openIndex === index ? (
                    <Minus className="w-6 h-6 text-[#10B981]" />
                  ) : (
                    <Plus className="w-6 h-6 text-[#475569]" />
                  )}
                </div>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="px-8 py-6 bg-[#F8FAFC]">
                  <p className="text-[#475569] leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-white rounded-2xl p-8 border border-[#E2E8F0]">
          <h3 className="text-2xl font-bold text-[#0F172A] mb-4">
            {t.faq.stillQuestions}
          </h3>
          <p className="text-[#475569] mb-6">
            {t.faq.supportDescription}
          </p>
          <button className="px-8 py-4 bg-[#10B981] text-white font-bold rounded-lg hover:bg-[#059669] transition-all hover:shadow-xl hover:shadow-[#10B981]/30">
            {t.faq.contactSupport}
          </button>
        </div>
      </div>
    </section>
  );
}