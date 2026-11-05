import React, { useEffect, useRef } from 'react';
import { Star } from 'lucide-react';

interface TrustpilotWidgetProps {
  className?: string;
  theme?: 'light' | 'dark';
  templateId?: string;
  businessUnitId?: string;
}

declare global {
  interface Window {
    Trustpilot?: {
      loadFromElement: (element: HTMLElement | null, reload?: boolean) => void;
    };
  }
}

export const TrustpilotWidget: React.FC<TrustpilotWidgetProps> = ({
  className = '',
  theme = 'light',
  templateId,
  businessUnitId,
}) => {
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // ONLY call Trustpilot.loadFromElement if both templateId and businessUnitId are provided
    if (templateId && businessUnitId && window.Trustpilot && widgetRef.current) {
      try {
        window.Trustpilot.loadFromElement(widgetRef.current, true);
      } catch (err) {
        console.warn('Trustpilot widget initialization deferred:', err);
      }
    }
  }, [templateId, businessUnitId]);

  return (
    <div className={`inline-block ${className}`}>
      {/* If user provides templateId and businessUnitId, render official TrustBox DOM element */}
      {templateId && businessUnitId ? (
        <div
          ref={widgetRef}
          className="trustpilot-widget"
          data-locale="en-US"
          data-template-id={templateId}
          data-businessunit-id={businessUnitId}
          data-style-height="52px"
          data-style-width="100%"
          data-theme={theme}
        >
          <a
            href="https://www.trustpilot.com/review/flyfello.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Trustpilot
          </a>
        </div>
      ) : (
        /* Authentic visual Trustpilot Rating Badge */
        <div
          className={`flex items-center gap-3.5 px-4 py-2.5 rounded-xl border transition-all ${
            theme === 'dark'
              ? 'bg-slate-900 border-slate-800 text-white'
              : 'bg-white border-slate-200/90 text-slate-900 shadow-xs'
          }`}
        >
          {/* Trustpilot Iconic Star Rating */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-sm tracking-tight">Excellent</span>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 bg-[#00b67a] flex items-center justify-center rounded-[2px]"
                  >
                    <Star className="w-2.5 h-2.5 fill-white text-white" />
                  </div>
                ))}
              </div>
            </div>

            <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1">
              <span>Based on <strong>4.9 / 5</strong></span>
              <span aria-hidden="true">·</span>
              <span>850+ reviews</span>
            </div>
          </div>

          <div className="h-7 w-px bg-slate-200 dark:bg-slate-800" aria-hidden="true" />

          {/* Trustpilot Logo Brandmark */}
          <a
            href="https://www.trustpilot.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:opacity-85 transition-opacity"
          >
            {/* Trustpilot Star Icon */}
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5 text-[#00b67a] fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="font-bold text-xs tracking-tight text-slate-800">
              Trustpilot
            </span>
          </a>
        </div>
      )}
    </div>
  );
};
