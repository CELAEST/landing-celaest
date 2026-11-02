"use client";

import React from "react";
import Link from "next/link";

interface LinkGroupData {
  key: string;
  title: string;
  items: string[];
}

interface FooterLinksProps {
  groups: LinkGroupData[];
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
              let href = "#";
              if (key === "legal") {
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
      ))}
    </>
  );
}
