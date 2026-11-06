"use client";

import React from "react";
import Link from "next/link";
import { DASHBOARD_URL, SUPPORT_EMAIL } from "@/lib/constants";

interface LinkGroupData {
  key: string;
  title: string;
  items: string[];
}

interface FooterLinksProps {
  groups: LinkGroupData[];
}

function getFooterHref(key: string, index: number): string {
  if (key === "product") {
    switch (index) {
      case 0:
      case 1:
        return "/#products";
      case 2:
        return `${DASHBOARD_URL}/?tab=marketplace`;
      case 3:
        return "/#pricing";
      case 4:
        return `mailto:${SUPPORT_EMAIL}?subject=Consulta%20Plan%20Enterprise`;
      default:
        return "/#products";
    }
  }

  if (key === "company") {
    switch (index) {
      case 0:
        return "/#architecture";
      case 1:
        return "/#platform";
      case 2:
        return "/#security";
      case 3:
        return `mailto:${SUPPORT_EMAIL}?subject=Contacto%20Comercial`;
      default:
        return "/#architecture";
    }
  }

  if (key === "support") {
    switch (index) {
      case 0:
        return "/#faq";
      case 1:
        return `${DASHBOARD_URL}/?tab=docs`;
      case 2:
        return `mailto:${SUPPORT_EMAIL}?subject=Soporte%20Tecnico`;
      default:
        return `mailto:${SUPPORT_EMAIL}`;
    }
  }

  if (key === "legal") {
    switch (index) {
      case 0:
        return "/legal/terms";
      case 1:
        return "/legal/privacy";
      case 2:
        return "/legal/refunds";
      case 3:
        return "/legal/license";
      case 4:
        return "/legal/cookies";
      default:
        return "/legal/terms";
    }
  }

  return "#";
}

export function FooterLinks({ groups }: FooterLinksProps) {
  return (
    <>
      {groups.map(({ key, title, items }) => (
        <div key={key}>
          <h4 className="font-semibold text-white text-xs uppercase tracking-[0.15em] mb-4">
            {title}
          </h4>
          <ul className="space-y-2.5">
            {items.map((item, index) => {
              const href = getFooterHref(key, index);
              const isExternal = href.startsWith("http");
              return (
                <li key={item}>
                  <Link
                    href={href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
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
