import React, { useState } from 'react';
import { FlyfelloLogo } from './FlyfelloLogo';
import { Menu, X, MessageCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { PolicyPageType } from './PolicyModal';

interface HeaderProps {
  onOpenChat?: () => void;
  onOpenPage?: (page: PolicyPageType) => void;
  onOpenHolidayBookings?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenPage, onOpenHolidayBookings }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Main Header satisfying strict 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
          {/* Zone 1: Brand Wordmark */}
          <a href="#" className="whitespace-nowrap shrink-0 group flex items-center">
            <FlyfelloLogo
              size="md"
              imgClassName="h-10 sm:h-12 w-auto max-w-[210px] object-contain"
            />
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
            <a
              href="/?page=holiday-bookings"
              onClick={(e) => {
                if (onOpenHolidayBookings && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                  e.preventDefault();
                  onOpenHolidayBookings();
                }
              }}
              className="hover:text-[#F58220] transition-colors whitespace-nowrap shrink-0"
            >
              Holiday Bookings
            </a>
            <button
              type="button"
              onClick={() => onOpenPage?.('about')}
              className="hover:text-[#F58220] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              About Us
            </button>
            <button
              type="button"
              onClick={() => onOpenPage?.('contact')}
              className="hover:text-[#F58220] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Contact Us
            </button>
          </nav>

          {/* Zone 3: Navigation Controls */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-slate-800" /> : <Menu className="w-5 h-5 text-slate-800" />}
            </button>
          </div>
        </div>

        {/* Mobile slide-down navigation menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3 shadow-lg">
            <nav className="flex flex-col space-y-2 text-sm font-medium text-slate-700">
              <a
                href="/?page=holiday-bookings"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (onOpenHolidayBookings && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                    e.preventDefault();
                    onOpenHolidayBookings();
                  }
                }}
                className="py-2 px-3 rounded-md hover:bg-orange-50 hover:text-[#F58220] transition-colors block"
              >
                Holiday Bookings
              </a>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPage?.('about');
                }}
                className="text-left py-2 px-3 rounded-md hover:bg-orange-50 hover:text-[#F58220] transition-colors cursor-pointer"
              >
                About Us
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPage?.('contact');
                }}
                className="text-left py-2 px-3 rounded-md hover:bg-orange-50 hover:text-[#F58220] transition-colors cursor-pointer"
              >
                Contact Us
              </button>
            </nav>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <a
                href="https://wa.me/17372904745?text=Hi%20Flyfello,%20I%20want%20to%20book%20a%20flight%20ticket"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#122754] hover:bg-[#F58220] text-white text-xs font-bold flex items-center justify-center gap-2 text-center transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-[#F58220]" />
                <span>Chat on WhatsApp: +1 (737) 290-4745</span>
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Air Suvidha 2.0 Travel Notice Strip (directly below logo and menu) */}
      <div className="bg-gradient-to-r from-amber-100 via-orange-50 to-amber-100 text-[#122754] border-y-2 border-[#F58220] shadow-md relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex flex-col md:flex-row items-center justify-between gap-3.5 text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center md:items-start gap-2.5 sm:gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#F58220] text-white text-[11px] font-extrabold uppercase tracking-wider shrink-0 shadow-xs">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Travel Notice</span>
            </span>
            <p className="text-sm sm:text-[15px] font-semibold leading-snug text-[#122754]">
              All international passengers travelling to India must complete the mandatory{' '}
              <strong className="font-extrabold underline decoration-[#F58220] decoration-2 underline-offset-2">
                Air Suvidha 2.0 Self Declaration Form
              </strong>{' '}
              before arrival. Please submit your declaration before your journey.
            </p>
          </div>
          <a
            href="https://airsuvidha.civilaviation.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#122754] hover:bg-[#F58220] text-white font-bold text-xs sm:text-sm whitespace-nowrap shrink-0 shadow-md transition-colors"
          >
            <span>Submit Air Suvidha Form</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </>
  );
};
