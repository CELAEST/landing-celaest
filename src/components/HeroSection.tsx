import { ArrowRight, Play } from 'lucide-react';
import { useTranslation } from '../context/LanguageContext';
import videoBackgroundWebM from '@/assets/background1.webm';

export function HeroSection() {
  const { t } = useTranslation();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0F172A]" style={{ minHeight: '100vh' }}>
      {/* Video Background */}
      <div className="absolute inset-0" style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-40"
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            position: 'absolute', 
            top: 0, 
            left: 0,
            maskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 70%, transparent 100%)'
          }}
          poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E"
        >
          <source src={videoBackgroundWebM} type="video/webm" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/30 via-[#0F172A]/50 to-[#0F172A]" />
        
        {/* Bottom blur overlay for smooth fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/95 to-transparent backdrop-blur-sm" />
        
        {/* Animated grid overlay - subtle mint accent */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
        
        {/* Subtle gradient accent top right */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-[#10B981]/5 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 text-center" style={{ minHeight: '80vh' }}>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#334155]/40 border border-[#10B981]/20 rounded-full mb-8 backdrop-blur-sm hero-animate">
          <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse" />
          <span className="text-sm text-[#E2E8F0]">{t.hero.badge}</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold text-[#F8FAFC] mb-6 tracking-tight hero-animate delay-100" style={{ minHeight: '280px' }}>
          {t.hero.headline1}
          <br />
          <span className="bg-gradient-to-r from-[#10B981] to-[#059669] bg-clip-text text-transparent">{t.hero.headline2}</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xl md:text-2xl text-[#E2E8F0] max-w-3xl mx-auto mb-12 leading-relaxed hero-animate delay-200" style={{ minHeight: '120px' }}>
          {t.hero.subheadline1}
          <br />
          {t.hero.subheadline2}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 hero-animate delay-300">
          <button className="group px-8 py-4 bg-[#10B981] text-white font-bold rounded-lg hover:bg-[#059669] transition-all hover:shadow-xl hover:shadow-[#10B981]/30 hover:scale-105 flex items-center gap-3">
            {t.hero.browseCTA}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <button className="group px-8 py-4 bg-transparent border-2 border-[#334155] text-[#F8FAFC] font-bold rounded-lg hover:border-[#10B981] hover:bg-[#10B981]/5 transition-all flex items-center gap-3">
            <Play className="w-5 h-5" />
            {t.hero.watchDemo}
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto hero-animate delay-400">
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-[#10B981] mb-2">500+</div>
            <div className="text-sm text-white uppercase tracking-wider">{t.hero.stats.assets}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-[#10B981] mb-2">10K+</div>
            <div className="text-sm text-white uppercase tracking-wider">{t.hero.stats.users}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-[#10B981] mb-2">99.9%</div>
            <div className="text-sm text-white uppercase tracking-wider">{t.hero.stats.uptime}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl md:text-5xl font-bold text-[#10B981] mb-2">24/7</div>
            <div className="text-sm text-white uppercase tracking-wider">{t.hero.stats.support}</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-[#475569] rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-[#10B981] rounded-full" />
        </div>
      </div>
    </section>
  );
}