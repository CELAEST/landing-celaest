import React from "react";

interface HeaderProps {
  titleLead: string;
  titleAccent: string;
  subtitle: string;
}

export function ArchitectureHeader({ titleLead, titleAccent, subtitle }: HeaderProps) {
  return (
    <header className="max-w-4xl">
      <h2 className="text-4xl sm:text-5xl lg:text-[62px] font-medium tracking-tight sm:tracking-[-2.2px] leading-[0.96] mb-5 text-white font-sans">
        {titleLead}
        <br />
        <span className="text-[#9da2b1] font-normal">{titleAccent}</span>
      </h2>

      <p className="text-[#9da2b1] text-base sm:text-lg leading-[1.4] tracking-[-0.25px] max-w-2xl font-light">
        {subtitle}
      </p>
    </header>
  );
}
