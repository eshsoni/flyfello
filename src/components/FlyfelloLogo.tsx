import React from 'react';

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  imgClassName?: string;
  imgStyle?: React.CSSProperties;
}

export const FlyfelloLogo: React.FC<LogoProps> = ({
  className = '',
  variant = 'dark',
  size = 'md',
  imgClassName = '',
  imgStyle,
}) => {
  const isLight = variant === 'light';

  const heights = {
    sm: 'h-8 sm:h-9',
    md: 'h-10 sm:h-11',
    lg: 'h-12 sm:h-14',
  };

  const defaultClasses = `${heights[size]} w-auto object-contain`;
  const appliedClasses = imgClassName ? `${imgClassName} object-contain` : defaultClasses;

  return (
    <div className={`inline-flex items-center gap-2 select-none ${className}`}>
      {isLight ? (
        // For dark backgrounds (like the deep navy footer), wrap in a crisp rounded white surface to preserve brand logo colors
        <div className="bg-white rounded-xl px-3 py-1.5 shadow-sm ring-1 ring-white/30 flex items-center justify-center">
          <img
            src="/assets/aistudio/FlyFello_Logo_-_Signature_ccc9b6ae.jpeg"
            alt="Flyfello"
            className={`${appliedClasses} rounded-sm`}
            style={imgStyle}
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        // For standard light headers & surfaces
        <div className="flex items-center">
          <img
            src="/assets/aistudio/FlyFello_Logo_-_Signature_ccc9b6ae.jpeg"
            alt="Flyfello"
            className={appliedClasses}
            style={imgStyle}
            referrerPolicy="no-referrer"
          />
        </div>
      )}
    </div>
  );
};

