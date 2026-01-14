import { useEffect, useState } from 'react';
import { useTranslation } from '../context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import Logo from '../assets/icons/Logo';

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useTranslation();

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      const navbarHeight = 80; // altura del navbar
      const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-[#0F172A]/95 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 flex items-center justify-center">
              <Logo color="white" />
            </div>
            <span className="text-2xl font-black text-[#F8FAFC] tracking-tighter notranslate" translate="no" style={{ fontFamily: '"Space Grotesk", sans-serif', letterSpacing: '-0.05em', fontWeight: 900 }}>CELEAST</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a 
              href="#products" 
              onClick={(e) => handleSmoothScroll(e, 'products')}
              className="text-white hover:text-[#10B981] transition-colors duration-300 font-medium"
            >
              {t.nav.products}
            </a>
            <a 
              href="#pricing" 
              onClick={(e) => handleSmoothScroll(e, 'pricing')}
              className="text-white hover:text-[#10B981] transition-colors duration-300 font-medium"
            >
              {t.nav.pricing}
            </a>
            <a 
              href="#about" 
              onClick={(e) => handleSmoothScroll(e, 'about')}
              className="text-white hover:text-[#10B981] transition-colors duration-300 font-medium"
            >
              {t.nav.about}
            </a>
            <a 
              href="#faq" 
              onClick={(e) => handleSmoothScroll(e, 'faq')}
              className="text-white hover:text-[#10B981] transition-colors duration-300 font-medium"
            >
              {t.nav.faq}
            </a>
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-6">
            <LanguageSelector />
            <button className="hidden md:block text-white hover:text-[#10B981] transition-colors">
              {t.nav.signIn}
            </button>
            <button className="px-6 py-3 bg-[#10B981] text-white font-semibold rounded-lg hover:bg-[#059669] transition-all hover:shadow-lg hover:shadow-[#10B981]/30">
              {t.nav.getStarted}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}