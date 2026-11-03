import React from "react";

interface HeaderProps {
  titleLead: string;
  titleAccent: string;
  subtitle: string;
}

export function ArchitectureHeader({ titleLead, titleAccent, subtitle }: HeaderProps) {
  return (
    <header className="eco-header">
      <h2 className="eco-title">
        {titleLead}
        <br />
        <em>{titleAccent}</em>
      </h2>

      <p className="eco-subtitle">{subtitle}</p>
    </header>
  );
}
