import React, { useState } from 'react';
import { FlyfelloLogo } from './FlyfelloLogo';
import {
  Menu,
  X,
  AlertCircle,
  ExternalLink,
  Plane,
  Building2,
  Palmtree,
  FileCheck2,
  Smartphone,
} from 'lucide-react';
import { PolicyPageType } from './PolicyModal';

export type ServicePageType = 'flights' | 'hotels' | 'holidays' | 'visa' | 'esim';

interface HeaderProps {
  activeService?: ServicePageType;
  onSelectService?: (service: ServicePageType) => void;
  onOpenChat?: () => void;
  onOpenPage?: (page: PolicyPageType) => void;
  onOpenHolidayBookings?: () => void;
}

const SERVICE_NAV_ITEMS: {
  id: ServicePageType;
  label: string;
  href: string;
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}[] = [
  { id: 'flights', label: 'Flights', href: '/', Icon: Plane },
  { id: 'hotels', label: 'Hotels', href: '/?page=hotels', Icon: Building2 },
  { id: 'holidays', label: 'Holidays', href: '/?page=holiday-bookings', Icon: Palmtree },
  { id: 'visa', label: 'Visa', href: '/?page=visa', Icon: FileCheck2 },
  { id: 'esim', label: 'eSIM', href: '/?page=esim', Icon: Smartphone },
];

export const Header: React.FC<HeaderProps> = ({
  activeService = 'flights',
  onSelectService,
  onOpenPage,
  onOpenHolidayBookings,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleServiceClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    service: ServicePageType
  ) => {
    setMobileMenuOpen(false);
    if (!e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
      if (onSelectService) {
        e.preventDefault();
        onSelectService(service);
      } else if (service === 'holidays' && onOpenHolidayBookings) {
        e.preventDefault();
        onOpenHolidayBookings();
      }
    }
  };

  return (
    <>
      {/* Main Header satisfying strict 3-Zone Top Bar Contract + Service Icon Strip */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-6">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="/"
            onClick={(e) => handleServiceClick(e, 'flights')}
            className="whitespace-nowrap shrink-0 group flex items-center"
          >
            <FlyfelloLogo
              size="md"
              imgClassName="h-9 sm:h-11 w-auto max-w-[200px] object-contain"
            />
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-700">
            <a
              href="/?page=holiday-bookings"
              onClick={(e) => handleServiceClick(e, 'holidays')}
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
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-slate-800" />
              ) : (
                <Menu className="w-5 h-5 text-slate-800" />
              )}
            </button>
          </div>
        </div>

        {/* Service Options Strip directly below top bar (Flights, Hotels, Holidays, Visa, eSIM) */}
        <nav
          aria-label="FlyFello Travel Services"
          className="border-t border-slate-100 bg-white"
        >
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between sm:justify-center gap-2 sm:gap-10 overflow-x-auto">
            {SERVICE_NAV_ITEMS.map(({ id, label, href, Icon }) => {
              const isActive = activeService === id;
              return (
                <a
                  key={id}
                  href={href}
                  onClick={(e) => handleServiceClick(e, id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`group flex flex-col items-center justify-center gap-1 py-1.5 sm:py-2 px-3 sm:px-4 border-b-2 transition-colors whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'border-[#F58220] text-[#F58220]'
                      : 'border-transparent text-slate-700 hover:text-[#122754] hover:border-slate-300'
                  }`}
                >
                  <Icon
                    strokeWidth={1.75}
                    className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-150 group-hover:-translate-y-0.5 ${
                      isActive
                        ? 'text-[#F58220]'
                        : 'text-[#122754] group-hover:text-[#F58220]'
                    }`}
                  />
                  <span
                    className={`text-[11px] sm:text-xs tracking-tight ${
                      isActive ? 'font-bold text-[#122754]' : 'font-semibold'
                    }`}
                  >
                    {label}
                  </span>
                </a>
              );
            })}
          </div>
        </nav>

        {/* Mobile slide-down navigation menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-5 space-y-3 shadow-lg">
            <nav className="flex flex-col space-y-2 text-sm font-medium text-slate-700">
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
          </div>
        )}
      </header>

      {/* Air Suvidha 2.0 Travel Notice Strip (Flight page only) */}
      {activeService === 'flights' && (
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
      )}
    </>
  );
};
