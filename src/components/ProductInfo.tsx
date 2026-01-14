import { FileSpreadsheet, Code2, Package, Shield, Zap, TrendingUp } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTranslation } from '../context/LanguageContext';

export function ProductInfo() {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useTranslation();
  
  const features = [
    {
      icon: FileSpreadsheet,
      title: t.products.features.verified.title,
      description: t.products.features.verified.description,
      color: '#FF5722'
    },
    {
      icon: Shield,
      title: t.products.features.secure.title,
      description: t.products.features.secure.description,
      color: '#FF5722'
    },
    {
      icon: TrendingUp,
      title: t.products.features.roi.title,
      description: t.products.features.roi.description,
      color: '#FF5722'
    },
    {
      icon: Code2,
      title: t.products.features.python.title,
      description: t.products.features.python.description,
      color: '#FF5722'
    },
    {
      icon: Package,
      title: t.products.features.business.title,
      description: t.products.features.business.description,
      color: '#FF5722'
    },
    {
      icon: Zap,
      title: t.products.features.instant.title,
      description: t.products.features.instant.description,
      color: '#FF5722'
    }
  ];

  return (
    <section ref={ref} id="products" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 scroll-reveal ${isVisible ? 'is-visible' : ''}`}>
          <h2 className="text-5xl md:text-6xl font-bold text-[#0F172A] mb-6">
            {t.products.title1}
            <br />
            <span className="bg-gradient-to-r from-[#10B981] to-[#059669] bg-clip-text text-transparent">{t.products.title2}</span>
          </h2>
          <p className="text-xl text-[#475569] max-w-2xl mx-auto">
            {t.products.subtitle}
          </p>
        </div>

        {/* Bento Box Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`group relative bg-gradient-to-br from-[#F8FAFC] to-white border border-[#E2E8F0] rounded-2xl p-8 hover:border-[#10B981]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#10B981]/5 hover:-translate-y-1 overflow-hidden scroll-reveal ${isVisible ? 'is-visible' : ''} delay-${index * 100}`}
              >
                {/* Subtle gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#10B981]/0 to-[#10B981]/0 group-hover:from-[#10B981]/5 group-hover:to-transparent transition-all duration-300 rounded-2xl" />
                
                {/* Icon with animation */}
                <div className="relative w-16 h-16 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-[#10B981]/20">
                  <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                </div>

                {/* Content */}
                <h3 className="relative text-2xl font-bold text-[#0F172A] mb-3">
                  {feature.title}
                </h3>
                <p className="relative text-[#475569] leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover indicator */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-[#10B981] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button className="px-8 py-4 bg-[#0F172A] text-white font-bold rounded-lg hover:bg-[#334155] transition-all hover:shadow-xl">
            {t.products.exploreCTA}
          </button>
        </div>
      </div>
    </section>
  );
}