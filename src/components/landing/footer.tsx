'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Twitter, Linkedin, Github, Mail, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Logo } from "@/components/ui/logo";
import { ConstellationBackground } from "@/components/ui/constellation-background";

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
    <footer className="bg-brand-deep relative overflow-hidden">
      {/* Background Graphic - Premium SVG + CSS Mesh Gradient */}
      <div className="absolute inset-0 h-full z-0 pointer-events-none overflow-hidden">
        {/* Ambient Glow Effects (kept for blue/cyan ambience) */}
        <div className="absolute bottom-[-10%] left-[10%] w-[50%] h-[300px] bg-cyan-500/20 blur-[120px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[10%] w-[50%] h-[300px] bg-blue-600/20 blur-[120px] rounded-full mix-blend-screen" />

        {/* Drifting constellation — fades only at bottom so it continues seamlessly from the FAQ section above. */}
        <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,#000_0%,#000_70%,transparent_100%)]">
          <ConstellationBackground nodeCount={90} />
        </div>
      </div>

      <div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 relative z-20"
        style={{ textShadow: "0 2px 16px rgba(0,0,0,0.95), 0 0 4px rgba(0,0,0,0.95)" }}
      >
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
              <p className="text-zinc-300 text-sm">{t('newsletter.description')}</p>
            </div>
            <form className="flex flex-col sm:flex-row gap-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={t('newsletter.placeholder')}
                className="w-full sm:flex-1 px-5 py-3 bg-brand-gray border border-white/10 rounded-xl text-white text-sm placeholder:text-brand-slate-light focus:outline-none focus:border-brand-neon/40 transition-colors"
                aria-label="Email address"
              />
              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-3 bg-brand-neon text-brand-dark font-semibold rounded-xl text-sm hover:brightness-110 transition-all flex items-center justify-center gap-2 shrink-0"
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
            <p className="text-zinc-300 text-xs leading-relaxed mb-5">
              {t('brand.description')}
            </p>
            <div className="flex gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  className="w-9 h-9 bg-black/25 rounded-lg flex items-center justify-center hover:bg-brand-neon/10 text-zinc-300 hover:text-white transition-all duration-300 border border-white/10 hover:border-brand-neon/20 backdrop-blur-[2px]"
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
                          className="text-zinc-300 hover:text-white transition-colors text-sm drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
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
            <p className="text-zinc-300 text-xs">
              © {new Date().getFullYear()} CELAEST. {t('copyright')}
            </p>
            <div className="flex items-center gap-2 text-zinc-300 text-xs">
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
