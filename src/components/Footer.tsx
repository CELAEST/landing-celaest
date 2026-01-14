import { Zap, Twitter, Linkedin, Github, Mail, ArrowRight } from 'lucide-react';

export function Footer() {
  const footerLinks = {
    product: [
      { name: 'Excel Macros', href: '#' },
      { name: 'Python Scripts', href: '#' },
      { name: 'Business Software', href: '#' },
      { name: 'Pricing', href: '#pricing' },
      { name: 'Enterprise', href: '#' }
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Blog', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Press Kit', href: '#' },
      { name: 'Partners', href: '#' }
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'License Agreement', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'GDPR', href: '#' }
    ],
    support: [
      { name: 'Documentation', href: '#' },
      { name: 'Help Center', href: '#' },
      { name: 'Contact Us', href: '#' },
      { name: 'Status', href: '#' },
      { name: 'API', href: '#' }
    ]
  };

  return (
    <footer className="bg-[#0F172A] border-t border-[#334155]/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-[#334155]/30 to-[#334155]/20 backdrop-blur-sm rounded-2xl p-8 mb-16 border border-[#475569]/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-bold text-[#F8FAFC] mb-2">
                Stay Updated
              </h3>
              <p className="text-[#E2E8F0]">
                Get the latest automation tips, product updates, and exclusive offers.
              </p>
            </div>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email..."
                className="flex-1 px-6 py-4 bg-[#0F172A]/50 border border-[#475569]/30 rounded-lg text-white placeholder:text-[#64748B] focus:outline-none focus:border-[#10B981] transition-all"
              />
              <button className="px-6 py-4 bg-gradient-to-r from-[#10B981] to-[#059669] text-white rounded-lg hover:shadow-lg hover:shadow-[#10B981]/30 transition-all flex items-center gap-2 font-bold">
                Subscribe
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-16">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-lg flex items-center justify-center shadow-lg shadow-[#10B981]/20">
                <Zap className="w-6 h-6 text-white" strokeWidth={2.5} />
              </div>
              <span className="text-2xl font-bold text-[#F8FAFC]">AutomateAI</span>
            </div>
            <p className="text-[#E2E8F0] text-sm leading-relaxed mb-6">
              Premium automation tools for professionals who demand excellence.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 bg-[#334155] rounded-lg flex items-center justify-center hover:bg-[#10B981] text-[#E2E8F0] hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#334155] rounded-lg flex items-center justify-center hover:bg-[#10B981] text-[#E2E8F0] hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#334155] rounded-lg flex items-center justify-center hover:bg-[#10B981] text-[#E2E8F0] hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-[#334155] rounded-lg flex items-center justify-center hover:bg-[#10B981] text-[#E2E8F0] hover:text-white transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-bold text-[#F8FAFC] mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-[#E2E8F0] hover:text-[#10B981] transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold text-[#F8FAFC] mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-[#E2E8F0] hover:text-[#10B981] transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-bold text-[#F8FAFC] mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-[#E2E8F0] hover:text-[#10B981] transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-bold text-[#F8FAFC] mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-[#E2E8F0] hover:text-[#10B981] transition-colors text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#334155]/30">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#E2E8F0] text-sm">
              © 2026 AutomateAI. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span className="text-[#E2E8F0] text-sm">Built with precision and care</span>
              <div className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}