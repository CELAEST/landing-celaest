'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import Image from 'next/image';
import { Twitter, Linkedin, Github, Mail, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Logo } from "@/components/ui/logo";

export function Footer() {
  const t = useTranslations('footer');

  const linkGroups = ['product', 'company', 'support', 'legal'] as const;

  const socialLinks = [
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Github, href: '#', label: 'GitHub' },
    { icon: Mail, href: '#', label: 'Email' },
  ];

  return (
    <footer className="bg-brand-deep border-t border-white/5 relative overflow-hidden">
      {/* Background Graphic - Premium SVG + CSS Mesh Gradient */}
      <div className="absolute inset-x-0 bottom-0 h-full z-0 pointer-events-none overflow-hidden flex flex-col justify-end">
        {/* Ambient Glow Effects */}
        <div className="absolute bottom-[-10%] left-[10%] w-[50%] h-[300px] bg-cyan-500/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[10%] w-[50%] h-[300px] bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen" />
        
        {/* Infinite Resolution SVG Wave (Fiber Optic effect) */}
        <svg
          className="w-full relative z-10 opacity-70 mix-blend-screen"
          viewBox="0 0 1200 250"
          preserveAspectRatio="none"
          fill="none"
          style={{ height: '400px' }}
        >
          {[...Array(25)].map((_, i) => (
            <path
              key={i}
              d={`M0,${120 + i * 3} C${300 + i * 12},${250 + i * 5} ${800 - i * 15},${-30 + i * 3} 1200,${100 + i * 4}`}
              stroke={i % 2 === 0 ? "url(#cyanBlueGlow)" : "url(#blueCyanGlow)"}
              strokeWidth={0.5 + (i % 3) * 0.5}
              opacity={0.1 + (i % 5) * 0.15}
            />
          ))}
          
          <defs>
            <linearGradient id="cyanBlueGlow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0" />
              <stop offset="20%" stopColor="#06b6d4" stopOpacity="1" />
              <stop offset="80%" stopColor="#3b82f6" stopOpacity="1" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="blueCyanGlow" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
              <stop offset="30%" stopColor="#3b82f6" stopOpacity="1" />
              <stop offset="70%" stopColor="#22d3ee" stopOpacity="1" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 relative z-10">
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl p-6 sm:p-8 mb-14 sm:mb-16 bg-brand-surface-alt border border-white/5 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-neon/20 to-transparent" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                {t('newsletter.title')}
              </h3>
              <p className="text-brand-slate-light text-sm">{t('newsletter.description')}</p>
            </div>
            <form className="flex gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={t('newsletter.placeholder')}
                className="flex-1 px-5 py-3 bg-brand-gray border border-white/10 rounded-xl text-white text-sm placeholder:text-brand-slate-light focus:outline-none focus:border-brand-neon/40 transition-colors"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="px-5 py-3 bg-brand-neon text-brand-dark font-semibold rounded-xl text-sm hover:brightness-110 transition-all flex items-center gap-2 shrink-0"
              >
                {t('newsletter.subscribe')}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </motion.div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-14 sm:mb-16">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4 overflow-visible">
              <div className="w-10 h-10 flex items-center justify-center drop-shadow-[0_0_20px_rgba(6,182,212,0.8)]">
                <Logo color="#22d3ee" className="w-10 h-10" />
              </div>
              <span
                className="text-2xl font-black bg-gradient-to-r from-white via-brand-ice to-brand-slate-light bg-clip-text text-transparent tracking-tighter notranslate"
                translate="no"
                style={{
                  fontFamily: "var(--font-display)",
                  letterSpacing: "-0.05em",
                }}
              >
                CELAEST
              </span>
            </div>
            <p className="text-brand-slate-light text-xs leading-relaxed mb-5">
              {t('brand.description')}
            </p>
            <div className="flex gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center hover:bg-brand-neon/10 text-brand-slate-light hover:text-brand-neon transition-all duration-300 border border-transparent hover:border-brand-neon/20"
                  aria-label={label}
                >
                  <Icon className="w-4 h-4" />
                </Link>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {linkGroups.map((group) => {
            const items = t.raw(`links.${group}.items`) as string[];
            return (
              <div key={group}>
                <h4 className="font-semibold text-white text-xs uppercase tracking-[0.15em] mb-4">
                  {t(`links.${group}.title`)}
                </h4>
                <ul className="space-y-2.5">
                  {items.map((item, index) => {
                    let href = "#";
                    if (group === "legal") {
                      if (index === 0) href = "/legal/privacy";
                      if (index === 1) href = "/legal/terms";
                    }

                    return (
                      <li key={item}>
                        <Link
                          href={href}
                          className="text-brand-slate-light hover:text-brand-neon transition-colors text-sm"
                        >
                          {item}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Bottom Bar */}
        <div className="pt-7 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-brand-slate-light text-xs">
              © {new Date().getFullYear()} CELAEST. {t('copyright')}
            </p>
            <div className="flex items-center gap-2 text-brand-slate-light text-xs">
              <span>Hecho con</span>
              <span className="text-brand-neon">♥</span>
              <span>para profesionales.</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
