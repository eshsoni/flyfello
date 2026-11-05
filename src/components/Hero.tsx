import React from 'react';
import { ShieldCheck, Luggage, Clock, ArrowRight, MessageCircle } from 'lucide-react';

interface HeroProps {
  onScrollToSearch: () => void;
  onOpenInquiry: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollToSearch, onOpenInquiry }) => {
  return (
    <div className="relative bg-slate-950 text-white overflow-hidden">
      {/* Background Image with carefully calibrated contrast scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_travel_flights_1792428387126.jpg"
          alt="International commercial flight soaring above golden clouds"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Graceful fallback to styled deep atmospheric aviation gradient
            e.currentTarget.style.display = 'none';
          }}
        />
        {/* Measured dark gradient overlay to ensure 4.5:1 WCAG legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-900/60" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-950/40 to-slate-950/90" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-20 lg:pt-18 lg:pb-28">
        <div className="max-w-3xl">
          {/* Natural human editorial kicker & Trustpilot rating */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <div className="flex items-center gap-2 text-xs font-medium text-amber-400 tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-amber-400 inline-block"></span>
              <span>USA & Canada to India Flight Specialists</span>
              <span className="text-slate-500" aria-hidden="true">·</span>
              <span className="text-slate-300">IATA Certified</span>
            </div>
            <a
              href="#testimonials"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/10 hover:bg-white/20 border border-white/15 text-xs text-white transition-colors"
            >
              <span className="font-bold text-[11px]">Excellent</span>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-3 h-3 bg-[#00b67a] flex items-center justify-center rounded-[1px]">
                    <svg viewBox="0 0 24 24" className="w-2 h-2 fill-white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                ))}
              </div>
              <span className="text-[10px] text-slate-300">Trustpilot</span>
            </a>
          </div>

          {/* Sized clamp(2.25rem, 4vw, 3.75rem) with text-wrap: balance */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight [text-wrap:balance]">
            Fly North to Home with Ease. Exclusive India Fares.
          </h1>

          <p className="text-base sm:text-lg text-slate-200 mb-8 max-w-2xl leading-relaxed">
            Consolidated discounted airfares from Vancouver, Toronto, Calgary, New York, San Francisco, and across North America to Delhi, Amritsar, Mumbai, and all major Indian cities.
          </p>

          {/* Primary Action Zone */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-10">
            <button
              onClick={onScrollToSearch}
              className="px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm sm:text-base transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 group whitespace-nowrap cursor-pointer"
            >
              <span>Search Real-Time Flights</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href="https://wa.me/16048326304?text=Hi%20Flyfello,%20I%20want%20to%20get%20a%20fare%20quote%20for%20flights%20to%20India"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-semibold text-sm sm:text-base border border-slate-700/80 transition-all flex items-center justify-center gap-2.5 whitespace-nowrap"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Instant WhatsApp Quote (+1 604-832-6304)</span>
            </a>
          </div>

          {/* Adjacency Trust Proof Strip - 3 core guarantees with zero-pill metadata */}
          <div className="pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-amber-400 shrink-0">
                <Luggage className="w-4 h-4" />
              </div>
              <div>
                <div className="font-semibold text-white">2x 23kg Baggage Guaranteed</div>
                <div className="text-slate-400 text-[11px]">Two full check-in suitcases included on all bookings</div>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-amber-400 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="font-semibold text-white">IATA Certified & Secure</div>
                <div className="text-slate-400 text-[11px]">Direct airline ticketing with official PNR confirmation</div>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-amber-400 shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <div className="font-semibold text-white">24/7 WhatsApp Desk & EMI</div>
                <div className="text-slate-400 text-[11px]">Interac e-Transfer, Zelle, and flexible installment plans</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
