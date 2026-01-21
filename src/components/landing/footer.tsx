'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Zap, Twitter, Linkedin, Github, Mail, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    <footer className="bg-brand-deep border-t border-brand-slate/30">
      <div className="section-container py-16">
        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-brand-slate/30 to-brand-slate/20 backdrop-blur-sm rounded-2xl p-8 mb-16 border border-brand-slate-medium/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-brand-ice mb-2">
                {t('newsletter.title')}
              </h3>
              <p className="text-brand-soft">{t('newsletter.description')}</p>
            </div>
            <form className="flex gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={t('newsletter.placeholder')}
                className="flex-1 px-6 py-4 bg-brand-deep/50 border border-brand-slate-medium/30 rounded-lg text-white placeholder:text-brand-slate-light focus:outline-none focus:border-brand-mint transition-all"
                aria-label="Email address"
              />
              <Button size="lg" className="gap-2">
                {t('newsletter.subscribe')}
                <ArrowRight className="w-5 h-5" />
              </Button>
            </form>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-mint rounded-lg flex items-center justify-center shadow-lg shadow-brand-mint/20">
                <Zap className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-bold text-brand-ice">Celeast</span>
            </div>
            <p className="text-brand-soft text-sm leading-relaxed mb-6">
              {t('brand.description')}
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="w-10 h-10 bg-brand-slate rounded-lg flex items-center justify-center hover:bg-brand-mint text-brand-soft hover:text-white transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {linkGroups.map((group) => {
            const items = t.raw(`links.${group}.items`) as string[];
            return (
              <div key={group}>
                <h4 className="font-bold text-brand-ice mb-4">{t(`links.${group}.title`)}</h4>
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item}>
                      <Link
                        href="#"
                        className="text-brand-soft hover:text-brand-mint transition-colors text-sm"
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
        <div className="pt-8 border-t border-brand-slate/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-brand-soft text-sm">
              © {new Date().getFullYear()} Celeast. {t('copyright')}
            </p>
            <div className="flex items-center gap-6">
              <span className="text-brand-soft text-sm">
                Made with 💚 for professionals worldwide
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
