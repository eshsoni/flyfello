import React, { useState } from 'react';
import { Cookie, ShieldCheck, X } from 'lucide-react';
import { PolicyPageType } from './PolicyModal';

interface CookieConsentProps {
  onOpenPolicy: (page: PolicyPageType) => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({ onOpenPolicy }) => {
  // Always opens on every site visit/load as requested
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-slate-950/50 backdrop-blur-[2px] animate-fade-in-up"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-consent-title"
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-orange-50 text-[#F58220] border border-orange-100 flex items-center justify-center shrink-0">
                <Cookie className="w-5 h-5" />
              </div>
              <div>
                <h3 id="cookie-consent-title" className="text-sm sm:text-base font-extrabold text-[#122754]">
                  Cookie Preferences
                </h3>
                <p className="text-[11px] font-medium text-slate-500">FlyFello Privacy &amp; Cookies</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close cookie popup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed mb-4">
            FlyFello uses essential and analytical cookies to remember your currency selection, airport searches, and improve website performance. Choose whether to allow or deny non-essential cookies.{' '}
            <button
              type="button"
              onClick={() => onOpenPolicy('cookies')}
              className="text-[#F58220] font-semibold hover:underline cursor-pointer"
            >
              Read Cookies Policy
            </button>
            .
          </p>

          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mb-5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Your traveler privacy is protected and never sold.</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 px-4 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors cursor-pointer"
            >
              Deny
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-full py-2.5 px-4 rounded-xl bg-[#122754] hover:bg-[#F58220] text-white font-bold text-xs shadow-sm transition-colors cursor-pointer"
            >
              Allow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
