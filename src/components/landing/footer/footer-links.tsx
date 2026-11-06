"use client";

import React from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { DASHBOARD_URL, SUPPORT_EMAIL } from "@/lib/constants";

interface LinkGroupData {
  key: string;
  title: string;
  items: string[];
}

interface FooterLinksProps {
  groups: LinkGroupData[];
  onOpenFaq?: () => void;
}

interface ResolvedLink {
  href: string;
  type: "hash" | "external" | "mailto" | "legal" | "faq-action";
}

function resolveFooterLink(key: string, index: number): ResolvedLink {
  if (key === "product") {
    switch (index) {
      case 0:
      case 1:
        return { href: "#products", type: "hash" };
      case 2:
        return { href: `${DASHBOARD_URL}/?tab=marketplace`, type: "external" };
      case 3:
        return { href: "#pricing", type: "hash" };
      case 4:
        return {
          href: `mailto:${SUPPORT_EMAIL}?subject=Consulta%20Plan%20Enterprise`,
          type: "mailto",
        };
      default:
        return { href: "#products", type: "hash" };
    }
  }

  if (key === "company") {
    switch (index) {
      case 0:
        return { href: "#architecture", type: "hash" };
      case 1:
        return { href: "#platform", type: "hash" };
      case 2:
        return { href: "#security", type: "hash" };
      case 3:
        return {
          href: `mailto:${SUPPORT_EMAIL}?subject=Contacto%20Comercial`,
          type: "mailto",
        };
      default:
        return { href: "#architecture", type: "hash" };
    }
  }

  if (key === "support") {
    switch (index) {
      case 0:
        return { href: "#faq", type: "faq-action" };
      case 1:
        return { href: `${DASHBOARD_URL}/?tab=docs`, type: "external" };
      case 2:
        return {
          href: `mailto:${SUPPORT_EMAIL}?subject=Soporte%20Tecnico`,
          type: "mailto",
        };
      default:
        return { href: `mailto:${SUPPORT_EMAIL}`, type: "mailto" };
    }
  }

  if (key === "legal") {
    switch (index) {
      case 0:
        return { href: "/legal/terms", type: "legal" };
      case 1:
        return { href: "/legal/privacy", type: "legal" };
      case 2:
        return { href: "/legal/refunds", type: "legal" };
      case 3:
        return { href: "/legal/license", type: "legal" };
      case 4:
        return { href: "/legal/cookies", type: "legal" };
      default:
        return { href: "/legal/terms", type: "legal" };
    }
  }

  return { href: "#", type: "hash" };
}

export function FooterLinks({ groups, onOpenFaq }: FooterLinksProps) {
  const locale = useLocale();

  const handleHashClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    const targetId = hash.replace(/^#/, "");
    const el = document.getElementById(targetId);

    if (el) {
      e.preventDefault();
      (document.activeElement as HTMLElement)?.blur();
      const top = el.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      window.history.pushState(null, "", `#${targetId}`);
    }
  };

  return (
    <>
      {groups.map(({ key, title, items }) => (
        <div key={key}>
          <h4 className="font-semibold text-white text-xs uppercase tracking-[0.15em] mb-4">
            {title}
          </h4>
          <ul className="space-y-2.5">
            {items.map((item, index) => {
              const link = resolveFooterLink(key, index);

              // 1. FAQ Modal Action
              if (link.type === "faq-action") {
                return (
                  <li key={item}>
                    <button
                      type="button"
                      onClick={() => onOpenFaq?.()}
                      className="text-zinc-300 hover:text-white transition-colors text-sm drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] text-left cursor-pointer focus:outline-none focus:underline"
                    >
                      {item}
                    </button>
                  </li>
                );
              }

              // 2. In-Page Smooth Scroll Hash
              if (link.type === "hash") {
                return (
                  <li key={item}>
                    <a
                      href={`/${locale}${link.href}`}
                      onClick={(e) => handleHashClick(e, link.href)}
                      className="text-zinc-300 hover:text-white transition-colors text-sm drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] cursor-pointer"
                    >
                      {item}
                    </a>
                  </li>
                );
              }

              // 3. External Dashboard / Documentation Link
              if (link.type === "external") {
                return (
                  <li key={item}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-300 hover:text-white transition-colors text-sm drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
                    >
                      {item}
                    </a>
                  </li>
                );
              }

              // 4. Mailto Contact Action
              if (link.type === "mailto") {
                return (
                  <li key={item}>
                    <a
                      href={link.href}
                      className="text-zinc-300 hover:text-white transition-colors text-sm drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
                    >
                      {item}
                    </a>
                  </li>
                );
              }

              // 5. Localized Legal Pages
              return (
                <li key={item}>
                  <Link
                    href={link.href}
                    className="text-zinc-300 hover:text-white transition-colors text-sm drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]"
                  >
                    {item}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </>
  );
}
