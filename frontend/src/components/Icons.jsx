// Unified SVG icon set — Lucide-style outline icons
// All props: size (default 18), color (default "currentColor"), strokeWidth (default 1.8)

const Icon = ({ size = 18, color = "currentColor", strokeWidth = 1.8, children, viewBox = "0 0 24 24", ...rest }) => (
  <svg width={size} height={size} viewBox={viewBox} fill="none"
    stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
    aria-hidden="true" {...rest}>
    {children}
  </svg>
);

export const HomeIcon = (p) => <Icon {...p}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></Icon>;
export const SearchIcon = (p) => <Icon {...p}><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></Icon>;
export const MapIcon = (p) => <Icon {...p}><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/><line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/></Icon>;
export const MapPinIcon = (p) => <Icon {...p}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></Icon>;
export const LogInIcon = (p) => <Icon {...p}><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></Icon>;
export const HouseIcon = (p) => <Icon {...p}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></Icon>;
export const FoodIcon = (p) => <Icon {...p}><path d="M3 11h18"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/><path d="M9 21h6"/><path d="M9 3v4M12 2v5M15 3v4"/></Icon>;
export const BusIcon = (p) => <Icon {...p}><rect x="2" y="4" width="20" height="14" rx="2"/><path d="M2 9h20"/><path d="M7 4v5M17 4v5"/><circle cx="7" cy="20" r="2"/><circle cx="17" cy="20" r="2"/><path d="M7 18v-2M17 18v-2"/></Icon>;
export const ShieldCheckIcon = (p) => <Icon {...p}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></Icon>;
export const CheckIcon = (p) => <Icon {...p}><polyline points="20 6 9 17 4 12"/></Icon>;
export const XIcon = (p) => <Icon {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></Icon>;
export const FilterIcon = (p) => <Icon {...p}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></Icon>;
export const ClockIcon = (p) => <Icon {...p}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></Icon>;
export const ListIcon = (p) => <Icon {...p}><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></Icon>;
export const FlagIcon = (p) => <Icon {...p}><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></Icon>;

export const ZapIcon = (p) => <Icon {...p}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></Icon>;
export const CoffeeIcon = (p) => <Icon {...p}><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="2" x2="6" y2="4"/><line x1="10" y1="2" x2="10" y2="4"/><line x1="14" y1="2" x2="14" y2="4"/></Icon>;

export function UnifyLogoIcon({ size = 40, className = "" }) {
  return (
    <img 
      src="/app-logo.png" 
      alt="Unify Logo" 
      style={{ width: size, height: size, objectFit: "contain" }} 
      className={className} 
    />
  );
}
