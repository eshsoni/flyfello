import React from 'react';
import { FlyfelloLogo } from './FlyfelloLogo';
import { Mail, Phone, Instagram, MapPin } from 'lucide-react';
import { PolicyPageType } from './PolicyModal';

interface FooterProps {
  onOpenPage?: (page: PolicyPageType) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPage }) => {
  return (
    <footer className="bg-[#0B1530] text-slate-400 text-xs border-t border-[#182B59]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Brand Lockup & Contact Details */}
          <div className="lg:col-span-2 space-y-4">
            <FlyfelloLogo variant="light" size="lg" />
            <p className="text-slate-300 text-xs sm:text-sm max-w-sm leading-relaxed">
              Flyfello is your specialized travel agency booking wholesale and consolidated flights between USA, Canada, and India. Connecting diaspora communities with home since day one.
            </p>

            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-[#F58220] shrink-0" />
                <a href="mailto:flyfello@hotmail.com" className="hover:text-white transition-colors">
                  flyfello@hotmail.com
                </a>
              </div>

              <div className="flex items-center gap-2.5 text-slate-300">
                <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
                <a
                  href="https://instagram.com/flyfello/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  @flyfello (Official Instagram)
                </a>
              </div>

              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-[#F58220] shrink-0" />
                <div className="flex flex-wrap items-center gap-x-2">
                  <a href="tel:+918708349822" className="hover:text-white transition-colors">
                    +91 87083 49822 (India)
                  </a>
                  <span className="text-slate-600">|</span>
                  <a href="tel:+16048326304" className="hover:text-white transition-colors">
                    +1 (604) 832-6304 (Canada)
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5 text-slate-300 pt-1">
                <MapPin className="w-4 h-4 text-[#F58220] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white">Visit Us (India):</span>{' '}
                  <span>#172, Luna Factory Street, Mandi Dabwali, Sirsa</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Company & Support Sections */}
          <div className="space-y-7">
            {/* Company Section */}
            <div className="space-y-3">
              <div className="font-bold text-white text-xs uppercase tracking-wider">
                Company
              </div>
              <ul className="space-y-2 text-slate-300 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenPage?.('about')}
                    className="hover:text-[#F58220] text-slate-300 transition-colors cursor-pointer text-left"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenPage?.('contact')}
                    className="hover:text-[#F58220] text-slate-300 transition-colors cursor-pointer text-left"
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenPage?.('disclaimer')}
                    className="hover:text-[#F58220] text-slate-300 transition-colors cursor-pointer text-left"
                  >
                    Disclaimer
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenPage?.('cookies')}
                    className="hover:text-[#F58220] text-slate-300 transition-colors cursor-pointer text-left"
                  >
                    Cookies and Policy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenPage?.('terms')}
                    className="hover:text-[#F58220] text-slate-300 transition-colors cursor-pointer text-left"
                  >
                    Terms and Conditions
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenPage?.('privacy')}
                    className="hover:text-[#F58220] text-slate-300 transition-colors cursor-pointer text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>

            {/* Support Section (Just below Company) */}
            <div className="space-y-3">
              <div className="font-bold text-white text-xs uppercase tracking-wider">
                Support
              </div>
              <ul className="space-y-2 text-slate-300 text-xs">
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenPage?.('help')}
                    className="hover:text-[#F58220] text-slate-300 transition-colors cursor-pointer text-left"
                  >
                    Help Centre
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenPage?.('protocols')}
                    className="hover:text-[#F58220] text-slate-300 transition-colors cursor-pointer text-left"
                  >
                    Flight Booking Protocols
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenPage?.('cancellation')}
                    className="hover:text-[#F58220] text-slate-300 transition-colors cursor-pointer text-left"
                  >
                    Cancellation Policy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenPage?.('refund')}
                    className="hover:text-[#F58220] text-slate-300 transition-colors cursor-pointer text-left"
                  >
                    Refund Policy
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => onOpenPage?.('baggage')}
                    className="hover:text-[#F58220] text-slate-300 transition-colors cursor-pointer text-left"
                  >
                    Baggage Information
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Hairline & Disclaimer */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            <span>© {new Date().getFullYear()} Flyfello. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-slate-400 font-medium">
            <button
              type="button"
              onClick={() => onOpenPage?.('about')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              About Us
            </button>
            <span className="text-slate-700">·</span>
            <button
              type="button"
              onClick={() => onOpenPage?.('contact')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Contact Us
            </button>
            <span className="text-slate-700">·</span>
            <button
              type="button"
              onClick={() => onOpenPage?.('disclaimer')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Disclaimer
            </button>
            <span className="text-slate-700">·</span>
            <button
              type="button"
              onClick={() => onOpenPage?.('cookies')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Cookies and Policy
            </button>
            <span className="text-slate-700">·</span>
            <button
              type="button"
              onClick={() => onOpenPage?.('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms and Conditions
            </button>
            <span className="text-slate-700">·</span>
            <button
              type="button"
              onClick={() => onOpenPage?.('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
