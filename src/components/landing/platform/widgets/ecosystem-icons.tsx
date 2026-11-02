import React from "react";

export function SheetsIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4.5" fill="#107C41" />
      <path d="M6 7.5h12v9H6v-9z" fill="white" fillOpacity="0.15" />
      <path
        d="M8.5 7.5v9M15.5 7.5v9M6 10.5h12M6 13.5h12"
        stroke="white"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SlackIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="4.5" fill="#1E1926" />
      {/* Red */}
      <path
        d="M9.5 5.5a1.25 1.25 0 0 0-1.25 1.25v2.5a1.25 1.25 0 0 0 2.5 0v-2.5A1.25 1.25 0 0 0 9.5 5.5z"
        fill="#E01E5A"
      />
      {/* Green */}
      <path
        d="M17.25 9.5a1.25 1.25 0 0 0-1.25-1.25h-2.5a1.25 1.25 0 0 0 0 2.5h2.5a1.25 1.25 0 0 0 1.25-1.25z"
        fill="#2EB67D"
      />
      {/* Blue */}
      <path
        d="M14.5 18.5a1.25 1.25 0 0 0 1.25-1.25v-2.5a1.25 1.25 0 0 0-2.5 0v2.5a1.25 1.25 0 0 0 1.25 1.25z"
        fill="#36C5F0"
      />
      {/* Yellow */}
      <path
        d="M6.75 14.5a1.25 1.25 0 0 0 1.25 1.25h2.5a1.25 1.25 0 0 0 0-2.5h-2.5a1.25 1.25 0 0 0-1.25 1.25z"
        fill="#ECB22E"
      />
      {/* Center dot clusters */}
      <circle cx="6.75" cy="9.5" r="1.25" fill="#E01E5A" />
      <circle cx="14.5" cy="6.75" r="1.25" fill="#2EB67D" />
      <circle cx="17.25" cy="14.5" r="1.25" fill="#36C5F0" />
      <circle cx="9.5" cy="17.25" r="1.25" fill="#ECB22E" />
    </svg>
  );
}
