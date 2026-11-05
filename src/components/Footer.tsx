import React from 'react';
import { FlyfelloLogo } from './FlyfelloLogo';
import { Mail, Phone, MessageCircle, Instagram, ShieldCheck, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B1530] text-slate-400 text-xs border-t border-[#182B59]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Col 1 & 2: Brand Lockup & Contact Details */}
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
                  +1 (604) 832-6304 (Call / WhatsApp Desk)
                </a>
              </div>

              <div className="flex items-center gap-2.5 text-[#F58220] font-bold">
                <MessageCircle className="w-4 h-4 text-[#F58220] shrink-0" />
                <a
                  href="https://wa.me/16048326304"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  WhatsApp: Wa.me/16048326304
                </a>
              </div>
            </div>
          </div>

          {/* Col 3: Canada & US Hubs */}
          <div className="space-y-3">
            <div className="font-bold text-white text-xs uppercase tracking-wider">
              Departure Hubs
            </div>
            <ul className="space-y-1.5 text-slate-400">
              <li>Vancouver (YVR)</li>
              <li>Toronto Pearson (YYZ)</li>
              <li>Calgary (YYC)</li>
              <li>Montréal-Trudeau (YUL)</li>
              <li>San Francisco (SFO)</li>
              <li>New York (JFK / EWR)</li>
              <li>Chicago O'Hare (ORD)</li>
              <li>Dallas / Fort Worth (DFW)</li>
            </ul>
          </div>

          {/* Col 4: India Destinations */}
          <div className="space-y-3">
            <div className="font-bold text-white text-xs uppercase tracking-wider">
              India Destinations
            </div>
            <ul className="space-y-1.5 text-slate-400">
              <li>New Delhi (DEL)</li>
              <li>Mumbai (BOM)</li>
              <li>Amritsar, Punjab (ATQ)</li>
              <li>Ahmedabad, Gujarat (AMD)</li>
              <li>Bengaluru (BLR)</li>
              <li>Hyderabad (HYD)</li>
              <li>Chennai (MAA)</li>
              <li>Kochi, Kerala (COK)</li>
            </ul>
          </div>

          {/* Col 5: Accreditations & Booking Policy */}
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
              <li>• Student Extra Luggage Request</li>
            </ul>
          </div>
        </div>

        {/* Bottom Hairline & Disclaimer */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Flyfello. All rights reserved.</span>
            <span>·</span>
            <span>USA & Canada to India Flight Agency.</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="https://instagram.com/flyfello" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300">
              Instagram @flyfello
            </a>
            <span>·</span>
            <a href="mailto:flyfello@hotmail.com" className="hover:text-slate-300">
              flyfello@hotmail.com
            </a>
            <span>·</span>
            <a href="https://wa.me/16048326304" target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">
              Wa.me/16048326304
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
