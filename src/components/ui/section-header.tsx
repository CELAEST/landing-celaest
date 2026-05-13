interface SectionHeaderProps {
  title1: string;
  title2: string;
  subtitle?: string;
  badge?: string;
  align?: "center" | "left";
  className?: string;
}

/**
 * Reusable section header component following the enterprise design system.
 * Eliminates the repeated header pattern across all landing sections.
 *
 * Note: uses CSS-only fade-up (see `.animate-fade-up` in globals.css) instead
 * of framer-motion to keep the framework off the critical path. Plays once on
 * mount; sections below the fold are already gated by dynamic imports.
 */
export function SectionHeader({
  title1,
  title2,
  subtitle,
  badge,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  return (
    <div
      className={`animate-fade-up ${align === "center" ? "text-center" : "text-left"} mb-10 w-full ${className}`}
    >
      {badge && (
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05] mb-6 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
          <div className="w-1.5 h-1.5 bg-brand-neon rounded-full animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.6)]" />
          <span className="text-[10px] font-bold tracking-widest text-brand-accent uppercase">
            {badge}
          </span>
        </div>
      )}

      <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-4 sm:mb-6 tracking-tight leading-[1.1]">
        <span className="text-white">{title1} </span>
        <span className="text-brand-slate-light font-medium">{title2}</span>
      </h2>

      {subtitle && (
        <p className="text-brand-slate-light text-base sm:text-lg md:text-xl font-medium tracking-tight leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
