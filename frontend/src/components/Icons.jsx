import React from "react";

// Unified SVG icon base component
const Icon = ({ size = 18, color = "currentColor", strokeWidth = 1.8, children, viewBox = "0 0 24 24", ...rest }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox={viewBox} 
    fill="none"
    stroke={color} 
    strokeWidth={strokeWidth} 
    strokeLinecap="round" 
    strokeLinejoin="round"
    aria-hidden="true" 
    {...rest}
  >
    {children}
  </svg>
);

// Form Inputs
export const MailIcon = (p) => <Icon {...p}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></Icon>;
export const LockIcon = (p) => <Icon {...p}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></Icon>;

// Password Visibility Toggle
export const EyeIcon = (p) => <Icon {...p}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></Icon>;
export const EyeOffIcon = (p) => <Icon {...p}><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></Icon>;

// Actions & Navigation
export const LogInIcon = (p) => <Icon {...p}><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></Icon>;
export const ArrowLeftIcon = (p) => <Icon {...p}><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></Icon>;

// Branding App Logo
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