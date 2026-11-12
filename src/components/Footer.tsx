import React from 'react';
import { FlyfelloLogo } from './FlyfelloLogo';
import { Mail, Phone, Instagram, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onOpenPage?: (page: 'privacy' | 'refund' | 'about' | 'contact') => void;
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

            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-2.5 text-slate-300">
                <Mail className="w-4 h-4 text-[#F58220] shrink-0" />
                <a href="mailto:flyfello@hotmail.com" className="hover:text-white transition-colors">
                  flyfello@hotmail.com
                </a>
              </div>

              <div className="flex items-center gap-2.5 text-slate-300">
                <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
                <a
                  href="https://instagram.com/flyfello"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  @flyfello (Official Instagram)
                </a>
              </div>

              <div className="flex items-center gap-2.5 text-slate-300">
                <Phone className="w-4 h-4 text-[#F58220] shrink-0" />
                <a href="tel:+16048326304" className="hover:text-white transition-colors">
                  +1 (604) 832-6304 (Call / Fare Desk)
                </a>
              </div>
            </div>
          </div>

          {/* Guarantees & Policy */}
          <div className="space-y-3">
            <div className="font-bold text-white text-xs uppercase tracking-wider">
              Guarantees & Policy
            </div>
            <ul className="space-y-2 text-slate-300 text-xs">
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>IATA Certified Agency</span>
              </li>
              <li>• 2x 23kg Baggage Guaranteed</li>
              <li>• Interac e-Transfer, Zelle, EMI</li>
              <li>• Official Airline PNR Issued</li>
              <li>• 24/7 WhatsApp Assistance</li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPage?.('refund')}
                  className="hover:text-[#F58220] text-slate-300 underline underline-offset-2 transition-colors cursor-pointer"
                >
                  • Refund Policy (24hr Void)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenPage?.('privacy')}
                  className="hover:text-[#F58220] text-slate-300 underline underline-offset-2 transition-colors cursor-pointer"
                >
                  • Privacy & Data Protection
                </button>
              </li>
            </ul>
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
              onClick={() => onOpenPage?.('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span className="text-slate-700">·</span>
            <button
              type="button"
              onClick={() => onOpenPage?.('refund')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Refund Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
