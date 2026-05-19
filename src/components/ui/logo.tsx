import { CELAEST_LOGO_PATH_D, CELAEST_LOGO_VIEWBOX } from "./logo-path";

interface LogoProps {
  className?: string;
  color?: string;
}

export function Logo({ className = "", color = "currentColor" }: LogoProps) {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${CELAEST_LOGO_VIEWBOX.width} ${CELAEST_LOGO_VIEWBOX.height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d={CELAEST_LOGO_PATH_D} fill={color} />
    </svg>
  );
}
