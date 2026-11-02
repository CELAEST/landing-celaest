import React from "react";

/**
 * Real unboxed icons for the CELAEST Asset Ecosystem widget.
 * Authentic brand vector geometry, unboxed without container badges.
 */

export function AutoSyncIcon({ className = "w-[22px] h-[17px]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 3.5L1.5 9L6 14.5"
        stroke="#9d55ff"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M14 1.5L9.5 16.5" stroke="#9d55ff" strokeWidth="2.6" strokeLinecap="round" />
      <path
        d="M18 3.5L22.5 9L18 14.5"
        stroke="#9d55ff"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function DataFetcherIcon({ className = "w-[15px] h-[22px]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 15 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9 0.5L1 12H7.5L5.5 21.5L14 9.5H7.5L9 0.5Z"
        fill="#38bdf8"
        stroke="#38bdf8"
        strokeWidth="0.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function SheetsIcon({ className = "w-[18px] h-[22px]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 19 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Google Sheets Green Folded Document */}
      <path
        d="M2.5 0C1.12 0 0 1.12 0 2.5V21.5C0 22.88 1.12 24 2.5 24H16.5C17.88 24 19 22.88 19 21.5V5.5L13.5 0H2.5Z"
        fill="#0F9D58"
      />
      {/* Folded Top-Right Dog-Ear Corner */}
      <path d="M13.5 0V5.5H19L13.5 0Z" fill="#87CEAC" fillOpacity="0.8" />
      {/* 2x3 White Spreadsheet Grid Table */}
      <rect x="3.5" y="9" width="5" height="3" rx="0.5" fill="white" />
      <rect x="10.5" y="9" width="5" height="3" rx="0.5" fill="white" />
      <rect x="3.5" y="13" width="5" height="3" rx="0.5" fill="white" />
      <rect x="10.5" y="13" width="5" height="3" rx="0.5" fill="white" />
      <rect x="3.5" y="17" width="5" height="3" rx="0.5" fill="white" />
      <rect x="10.5" y="17" width="5" height="3" rx="0.5" fill="white" />
    </svg>
  );
}

export function SlackIcon({ className = "w-[22px] h-[22px]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Red/Aubergine */}
      <path
        d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z"
        fill="#E01E5A"
      />
      {/* Blue/Cyan */}
      <path
        d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z"
        fill="#36C5F0"
      />
      {/* Green */}
      <path
        d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z"
        fill="#2EB67D"
      />
      {/* Yellow/Amber */}
      <path
        d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.527 2.527 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"
        fill="#ECB22E"
      />
    </svg>
  );
}
