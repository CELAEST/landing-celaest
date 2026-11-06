"use client";

import React from "react";
import Link from "next/link";
import {
  DASHBOARD_URL,
  SUPPORT_EMAIL,
  CAREERS_EMAIL,
  PRESS_EMAIL,
  PARTNERS_EMAIL,
  STATUS_URL,
} from "@/lib/constants";

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
      case 2:
        return "/#products";
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
        return "/#intent-hero";
      case 1:
        return "/#platform";
      case 2:
        return `mailto:${CAREERS_EMAIL}`;
      case 3:
        return `mailto:${PRESS_EMAIL}`;
      case 4:
        return `mailto:${PARTNERS_EMAIL}`;
      default:
        return "/#intent-hero";
    }
  }

  if (key === "support") {
    switch (index) {
      case 0:
        return `${DASHBOARD_URL}/?tab=docs`;
      case 1:
        return `mailto:${SUPPORT_EMAIL}?subject=Ayuda`;
      case 2:
        return `mailto:${SUPPORT_EMAIL}?subject=Contacto`;
      case 3:
        return STATUS_URL;
      case 4:
        return "/#platform";
      default:
        return `mailto:${SUPPORT_EMAIL}`;
    }
  }

  if (key === "legal") {
    switch (index) {
      case 0:
        return "/legal/privacy";
      case 1:
        return "/legal/terms";
      case 2:
        return "/legal/license";
      case 3:
        return "/legal/cookies";
      case 4:
        return "/legal/privacy#zero-training";
      default:
        return "/legal/privacy";
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
