import React, { useState } from 'react';
import { FlyfelloLogo } from './FlyfelloLogo';
import { Menu, X, MessageCircle } from 'lucide-react';

interface HeaderProps {
  onOpenChat?: () => void;
}

export const Header: React.FC<HeaderProps> = () => {
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
          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-700">
            <a href="#flight-search" className="hover:text-[#F58220] transition-colors whitespace-nowrap shrink-0">
              Search Flights
            </a>
            <a href="#why-flyfello" className="hover:text-[#F58220] transition-colors whitespace-nowrap shrink-0">
              Why Flyfello
            </a>
            <a href="#why-flyfello" className="hover:text-[#F58220] transition-colors whitespace-nowrap shrink-0">
              Baggage (2x 23kg)
            </a>
            <a href="#testimonials" className="hover:text-[#F58220] transition-colors whitespace-nowrap shrink-0">
              Verified Reviews
            </a>
          </nav>

          {/* Zone 3: Primary Action - Direct WhatsApp Fare Desk */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="https://wa.me/16048326304?text=Hi%20Flyfello,%20I%20would%20like%20to%20inquire%20about%20flights%20to%20India"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#122754] hover:bg-[#F58220] rounded-xl transition-all shadow-sm hover:shadow-md whitespace-nowrap shrink-0 flex items-center gap-2 group"
            >
              <MessageCircle className="w-4 h-4 text-[#F58220] group-hover:text-white transition-colors" />
              <span>WhatsApp Fare Desk</span>
            </a>

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
                href="#flight-search"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-md hover:bg-orange-50 hover:text-[#F58220] transition-colors"
              >
                Search Flights & Real-time Fares
              </a>
              <a
                href="#why-flyfello"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-md hover:bg-orange-50 hover:text-[#F58220] transition-colors"
              >
                Why Flyfello & 2x 23kg Baggage
              </a>
              <a
                href="#testimonials"
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 px-3 rounded-md hover:bg-orange-50 hover:text-[#F58220] transition-colors"
              >
                Customer Testimonials
              </a>
            </nav>

            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <a
                href="https://wa.me/16048326304?text=Hi%20Flyfello,%20I%20want%20to%20book%20a%20flight%20ticket"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-[#122754] hover:bg-[#F58220] text-white text-xs font-bold flex items-center justify-center gap-2 text-center transition-colors shadow-sm"
              >
                <MessageCircle className="w-4 h-4 text-[#F58220]" />
                <span>Chat on WhatsApp: +1 (604) 832-6304</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
