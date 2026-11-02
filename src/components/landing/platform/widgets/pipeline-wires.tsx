import React from "react";

export function VerticalConnectionWire() {
  return (
    <div className="wire-v1-wrap">
      <div className="wire-v1-pill" />
      <div className="wire-v1-line" />
      <div className="wire-v1-pill" />
    </div>
  );
}

export function BranchWishboneWire() {
  return (
    <svg className="wire-branch-svg" viewBox="0 0 250 36" fill="none">
      <rect x="123" y="0" width="4" height="6" rx="2" fill="#8b5cf6" />
      <path
        d="M125 5C125 10 120 14 114 14H62C56 14 52 18 52 24V36"
        stroke="#8b5cf6"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M125 5C125 10 130 14 136 14H188C194 14 198 18 198 24V36"
        stroke="#8b5cf6"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <rect x="50" y="30" width="4" height="6" rx="2" fill="#8b5cf6" />
      <rect x="196" y="30" width="4" height="6" rx="2" fill="#8b5cf6" />
    </svg>
  );
}
