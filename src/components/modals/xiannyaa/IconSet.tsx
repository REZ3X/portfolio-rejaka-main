import React from 'react';

export interface IconProps {
  size?: number;
  className?: string;
}

export const AboutIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <div className={`inline-flex items-center justify-center rounded-full bg-gradient-to-br from-[#e6a2ce] to-[#c678a4] p-1.5 ${className}`}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-12h2v6h-2zm0 8h2v2h-2z" fill="#2e1e2e"/>
    </svg>
  </div>
);

export const ProgrammerIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <div className={`inline-flex items-center justify-center rounded-full bg-gradient-to-br from-[#e6a2ce] to-[#c678a4] p-1.5 ${className}`}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.4 16.6L4.8 12l4.6-4.6L8 6l-6 6 6 6 1.4-1.4zm5.2 0l4.6-4.6-4.6-4.6L16 6l6 6-6 6-1.4-1.4z" fill="#2e1e2e"/>
    </svg>
  </div>
);

export const AcademicIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <div className={`inline-flex items-center justify-center rounded-full bg-gradient-to-br from-[#e6a2ce] to-[#c678a4] p-1.5 ${className}`}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z" fill="#2e1e2e"/>
    </svg>
  </div>
);

export const CreativeIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <div className={`inline-flex items-center justify-center rounded-full bg-gradient-to-br from-[#e6a2ce] to-[#c678a4] p-1.5 ${className}`}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 14c-1.66 0-3 1.34-3 3 0 1.31-1.16 2-2 2 .92 1.22 2.49 2 4 2 2.21 0 4-1.79 4-4 0-1.66-1.34-3-3-3zm13.71-9.37l-1.34-1.34a.996.996 0 00-1.41 0L9 12.25 11.75 15l8.96-8.96a.996.996 0 000-1.41z" fill="#2e1e2e"/>
    </svg>
  </div>
);

export const ProjectsIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <div className={`inline-flex items-center justify-center rounded-full bg-gradient-to-br from-[#e6a2ce] to-[#c678a4] p-1.5 ${className}`}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z" fill="#2e1e2e"/>
    </svg>
  </div>
);

export const ExperienceIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <div className={`inline-flex items-center justify-center rounded-full bg-gradient-to-br from-[#e6a2ce] to-[#c678a4] p-1.5 ${className}`}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z" fill="#2e1e2e"/>
    </svg>
  </div>
);

export const MailIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => (
  <div className={`inline-flex items-center justify-center rounded-full bg-gradient-to-br from-[#e6a2ce] to-[#c678a4] p-1.5 ${className}`}>
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z" fill="#2e1e2e"/>
    </svg>
  </div>
);

export const CloseIcon: React.FC<IconProps> = ({ size = 20, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" fill="currentColor"/>
  </svg>
);