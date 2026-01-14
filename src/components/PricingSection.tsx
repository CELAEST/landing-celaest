import { Check, Star } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTranslation } from '../context/LanguageContext';

export function PricingSection() {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useTranslation();
  
  const plans = [
    {
      name: t.pricing.plans.starter.name,
      price: '29',
      description: t.pricing.plans.starter.description,
      features: t.pricing.plans.starter.features,
      popular: false
    },
    {
      name: t.pricing.plans.professional.name,
      price: '99',
      description: t.pricing.plans.professional.description,
      features: t.pricing.plans.professional.features,
      popular: true
    },
    {
      name: t.pricing.plans.enterprise.name,
      price: 'Custom',
      description: t.pricing.plans.enterprise.description,
      features: t.pricing.plans.enterprise.features,
      popular: false
    }
  ];

  return (
    <section ref={ref} id="pricing" className="py-24 bg-[#0F172A] relative overflow-hidden">
      {/* Subtle background accents */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#10B981]/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#10B981]/5 rounded-full blur-3xl" />
      
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 scroll-reveal ${isVisible ? 'is-visible' : ''}`}>
          <h2 className="text-5xl md:text-6xl font-bold text-[#F8FAFC] mb-6">
            {t.pricing.title1}
            <br />
            <span className="bg-gradient-to-r from-[#10B981] to-[#059669] bg-clip-text text-transparent">{t.pricing.title2}</span>
          </h2>
          <p className="text-xl text-[#E2E8F0] max-w-2xl mx-auto">
            {t.pricing.subtitle}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 transition-all duration-300 scroll-reveal-scale ${isVisible ? 'is-visible' : ''} delay-${index * 100} ${
                plan.popular
                  ? 'glass-effect border-2 border-[#10B981] shadow-2xl shadow-[#10B981]/20 scale-105 md:scale-110'
                  : 'bg-[#334155]/30 backdrop-blur-sm border border-[#475569]/30 hover:border-[#10B981]/30'
              }`}
            >
              {/* Most Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="px-4 py-2 bg-gradient-to-r from-[#10B981] to-[#059669] text-white text-sm font-bold rounded-full flex items-center gap-2 shadow-lg shadow-[#10B981]/30">
                    <Star className="w-4 h-4" fill="currentColor" />
                    {t.pricing.mostPopular}
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8 pt-4">
                <h3 className="text-2xl font-bold text-[#F8FAFC] mb-2">{plan.name}</h3>
                <p className="text-[#E2E8F0] text-sm mb-6">{plan.description}</p>
                <div className="flex items-baseline justify-center gap-2">
                  {plan.price === 'Custom' ? (
                    <span className="text-5xl font-bold text-[#F8FAFC]">{plan.price}</span>
                  ) : (
                    <>
                      <span className="text-2xl text-[#E2E8F0]">$</span>
                      <span className="text-5xl font-bold text-[#F8FAFC]">{plan.price}</span>
                      <span className="text-[#E2E8F0]">/month</span>
                    </>
                  )}
                </div>
              </div>

              {/* Features List */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-[#10B981]' : 'text-[#64748B]'}`} />
                    <span className="text-[#E2E8F0]">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`w-full py-4 rounded-lg font-bold transition-all ${
                  plan.popular
                    ? 'bg-[#10B981] text-white hover:bg-[#059669] shadow-lg hover:shadow-[#10B981]/40'
                    : 'bg-[#F8FAFC] text-[#0F172A] hover:bg-[#E2E8F0]'
                }`}
              >
                {plan.price === 'Custom' ? t.pricing.contactSales : t.pricing.getStarted}
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-[#E2E8F0]">
            {t.pricing.guarantee}
          </p>
        </div>
      </div>
    </section>
  );
}