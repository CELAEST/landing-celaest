import { Code, Users, Award, Shield } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { useTranslation } from '../context/LanguageContext';

export function AboutSection() {
  const { ref, isVisible } = useScrollReveal();
  const { t } = useTranslation();
  
  const values = [
    {
      icon: Code,
      title: t.about.values.devFirst.title,
      description: t.about.values.devFirst.description
    },
    {
      icon: Shield,
      title: t.about.values.security.title,
      description: t.about.values.security.description
    },
    {
      icon: Award,
      title: t.about.values.quality.title,
      description: t.about.values.quality.description
    },
    {
      icon: Users,
      title: t.about.values.support.title,
      description: t.about.values.support.description
    }
  ];

  return (
    <section ref={ref} id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Side */}
          <div className={`relative scroll-reveal-left ${isVisible ? 'is-visible' : ''}`}>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1748346918817-0b1b6b2f9bab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB0ZWFtfGVufDF8fHx8MTc2ODIzODMyOXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Development team working"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-[#10B981] to-[#059669] text-white px-6 py-4 rounded-xl shadow-2xl shadow-[#10B981]/30">
              <div className="text-3xl font-bold">5+ {t.about.badge.split(' ')[0]}</div>
              <div className="text-sm opacity-90">{t.about.badge}</div>
            </div>
          </div>

          {/* Content Side */}
          <div className={`scroll-reveal-right ${isVisible ? 'is-visible' : ''}`}>
            <h2 className="text-5xl md:text-6xl font-bold text-[#0F172A] mb-6">
              {t.about.title1}
              <br />
              <span className="bg-gradient-to-r from-[#10B981] to-[#059669] bg-clip-text text-transparent">{t.about.title2}</span>
            </h2>
            
            <p className="text-xl text-[#475569] mb-8 leading-relaxed">
              {t.about.description1}
            </p>

            <p className="text-lg text-[#475569] mb-12 leading-relaxed">
              {t.about.description2}
            </p>

            {/* Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div
                    key={value.title}
                    className={`flex gap-4 scroll-reveal ${isVisible ? 'is-visible' : ''} delay-${index * 100 + 200}`}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-[#10B981]/10 to-[#059669]/10 rounded-lg flex items-center justify-center flex-shrink-0 border border-[#10B981]/20">
                      <Icon className="w-6 h-6 text-[#10B981]" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0F172A] mb-1">{value.title}</h4>
                      <p className="text-sm text-[#475569]">{value.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-12">
              <button className="px-8 py-4 bg-[#0F172A] text-white font-bold rounded-lg hover:bg-[#334155] transition-all hover:shadow-xl">
                {t.about.learnMore}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}