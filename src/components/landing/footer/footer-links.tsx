"use client";

import React from "react";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { DASHBOARD_URL } from "@/lib/constants";

interface LinkGroupData {
  key: string;
  title: string;
  items: string[];
}

interface FooterLinksProps {
  groups: LinkGroupData[];
}

interface ResolvedLink {
  href: string;
  type: "hash" | "external" | "legal";
}

function resolveFooterLink(key: string, index: number): ResolvedLink {
  if (key === "product") {
    switch (index) {
      case 0:
        return { href: `${DASHBOARD_URL}/?tab=marketplace`, type: "external" };
      case 1:
        return { href: "#products", type: "hash" };
      case 2:
        return { href: "#pricing", type: "hash" };
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
      default:
        return { href: "#architecture", type: "hash" };
    }
  }

  if (key === "support") {
    switch (index) {
      case 0:
        return { href: "/legal/faq", type: "legal" };
      case 1:
        return { href: `${DASHBOARD_URL}/?tab=docs`, type: "external" };
      default:
        return { href: "/legal/faq", type: "legal" };
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

export function FooterLinks({ groups }: FooterLinksProps) {
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

              // 1. In-Page Smooth Scroll Hash
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

              // 2. External Dashboard / Documentation Link
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

              // 3. Localized Editorial & Legal Pages (Terms, Privacy, Refunds, License, Cookies, FAQ)
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
