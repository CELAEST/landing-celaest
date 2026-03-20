'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Zap, Twitter, Linkedin, Github, Mail, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

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
    <footer className="bg-[#020202] border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl p-6 sm:p-8 mb-14 sm:mb-16 bg-[#080808] border border-white/5 relative overflow-hidden"
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
                className="flex-1 px-5 py-3 bg-[#0a0a0a] border border-white/10 rounded-xl text-white text-sm placeholder:text-brand-slate-light focus:outline-none focus:border-brand-neon/40 transition-colors"
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
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-brand-neon to-brand-neon-blue rounded-lg flex items-center justify-center shadow-lg shadow-brand-neon/20">
                <Zap className="w-5 h-5 text-brand-dark" strokeWidth={2.5} />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">CELAEST</span>
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
                  {items.map((item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="text-brand-slate-light hover:text-brand-neon transition-colors text-sm"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
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
