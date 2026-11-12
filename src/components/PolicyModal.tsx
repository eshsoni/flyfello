import React, { useEffect } from 'react';
import { X, ShieldCheck, RefreshCw, Users, Mail, Phone, MapPin, Clock, CheckCircle2, MessageCircle, FileText, ArrowRight } from 'lucide-react';
import { FlyfelloLogo } from './FlyfelloLogo';

export type PolicyPageType = 'privacy' | 'refund' | 'about' | 'contact';

interface PolicyModalProps {
  page: PolicyPageType;
  onClose: () => void;
  onNavigate: (page: PolicyPageType) => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ page, onClose, onNavigate }) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fade-in-up">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <FlyfelloLogo size="sm" />
            <span className="text-slate-300">|</span>
            {/* Quick Navigation Tabs */}
            <div className="hidden sm:flex items-center gap-1">
              <button
                onClick={() => onNavigate('about')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  page === 'about' ? 'bg-[#122754] text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                About Us
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  page === 'contact' ? 'bg-[#122754] text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Contact Us
              </button>
              <button
                onClick={() => onNavigate('privacy')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  page === 'privacy' ? 'bg-[#122754] text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Privacy Policy
              </button>
              <button
                onClick={() => onNavigate('refund')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                  page === 'refund' ? 'bg-[#122754] text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Refund Policy
              </button>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 text-slate-700 text-sm leading-relaxed">
          {page === 'about' && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#F58220] uppercase tracking-wider mb-2">
                <Users className="w-4 h-4" />
                <span>Our Story & Mission</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#122754] tracking-tight mb-4">
                Connecting Families Across Oceans with Care & wholesale Values
              </h2>
              <p className="text-slate-600 text-base mb-6">
                Founded with a mission to eliminate unfair markups and luggage trickery, <strong>Flyfello</strong> is North America’s premier flight consolidator specialist dedicated exclusively to travel between Canada, the United States, and India.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="p-4 bg-orange-50/70 border border-orange-100 rounded-2xl">
                  <div className="font-extrabold text-2xl text-[#F58220]">2x 23kg</div>
                  <div className="font-bold text-slate-900 text-xs mt-1">Guaranteed Luggage</div>
                  <div className="text-xs text-slate-500 mt-1">No basic economy surprises at check-in counters.</div>
                </div>
                <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-2xl">
                  <div className="font-extrabold text-2xl text-[#122754]">Direct Consolidator</div>
                  <div className="font-bold text-slate-900 text-xs mt-1">Wholesale Airfare Contracts</div>
                  <div className="text-xs text-slate-500 mt-1">Official airline ticketing with partner GDS systems.</div>
                </div>
                <div className="p-4 bg-emerald-50/70 border border-emerald-100 rounded-2xl">
                  <div className="font-extrabold text-2xl text-emerald-700">24/7 Desk</div>
                  <div className="font-bold text-slate-900 text-xs mt-1">Human WhatsApp Agents</div>
                  <div className="text-xs text-slate-500 mt-1">Real specialists ready to assist night & day.</div>
                </div>
              </div>

              <h3 className="text-lg font-bold text-[#122754] mb-3">Our Core Principles</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#F58220] shrink-0 mt-0.5" />
                  <span><strong>Complete Transparency:</strong> All quotes include all taxes, airport security fees, and guaranteed checked suitcases.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#F58220] shrink-0 mt-0.5" />
                  <span><strong>Canadian & US Payment Comfort:</strong> Support for Interac e-Transfer with zero transaction fees, US Zelle, and flexible multi-month EMI installment plans.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#F58220] shrink-0 mt-0.5" />
                  <span><strong>Dedicated Student & Senior Support:</strong> Special assistance with senior wheelchair booking, vegetarian meal requests, and excess student luggage requests.</span>
                </li>
              </ul>
            </div>
          )}

          {page === 'contact' && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#F58220] uppercase tracking-wider mb-2">
                <Mail className="w-4 h-4" />
                <span>Get In Touch</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#122754] tracking-tight mb-4">
                We're Here 24/7 to Assist Your Journey
              </h2>
              <p className="text-slate-600 mb-8">
                Reach our experienced ticketing specialists directly via WhatsApp, phone, or email. We respond to fare inquiries in under 5 minutes.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                  <h3 className="font-bold text-base text-[#122754] flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-emerald-600" />
                    <span>WhatsApp Fare Desk</span>
                  </h3>
                  <p className="text-xs text-slate-600">
                    Get custom flight itinerary recommendations, live seat maps, and price holds directly on WhatsApp.
                  </p>
                  <a
                    href="https://wa.me/16048326304?text=Hi%20Flyfello,%20I%20have%20a%20question%20about%20flights"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-sm transition-colors"
                  >
                    <span>Message +1 (604) 832-6304</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                  <h3 className="font-bold text-base text-[#122754] flex items-center gap-2">
                    <Mail className="w-5 h-5 text-[#F58220]" />
                    <span>Official Email & Hotline</span>
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="font-semibold text-slate-500">Email:</span>{' '}
                      <a href="mailto:flyfello@hotmail.com" className="font-bold text-[#122754] hover:text-[#F58220]">
                        flyfello@hotmail.com
                      </a>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-500">Call / Phone:</span>{' '}
                      <a href="tel:+16048326304" className="font-bold text-[#122754] hover:text-[#F58220]">
                        +1 (604) 832-6304
                      </a>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-500">Instagram:</span>{' '}
                      <a href="https://instagram.com/flyfello" target="_blank" rel="noopener noreferrer" className="font-bold text-pink-600 hover:underline">
                        @flyfello
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 bg-blue-50/60 border border-blue-100 rounded-2xl text-xs text-slate-600">
                <div className="font-bold text-[#122754] mb-1">Operating Hours:</div>
                <div>Ticketing Desk: 24 Hours / 7 Days a Week, 365 Days a Year.</div>
                <div>Customer Service Headquarters: Vancouver, BC, Canada & Service partners in New Delhi, India.</div>
              </div>
            </div>
          )}

          {page === 'privacy' && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#F58220] uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Data Protection & Trust</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#122754] tracking-tight mb-2">
                Privacy Policy
              </h2>
              <div className="text-xs text-slate-400 mb-6">Last Updated: November 2026</div>

              <div className="space-y-6 text-xs sm:text-sm">
                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-2">1. Information We Collect</h3>
                  <p className="text-slate-600">
                    To process your airline reservations, Flyfello collects passenger information including legal names as shown on official passports, dates of birth, contact telephone numbers, email addresses, and passport details when required by airlines or customs border agencies.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-2">2. How We Use Your Data</h3>
                  <p className="text-slate-600">
                    Your details are strictly used to:
                  </p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-600">
                    <li>Generate official airline reservations (PNRs) and e-tickets.</li>
                    <li>Communicate flight schedule alerts, gate changes, and baggage allowances.</li>
                    <li>Process payments via secure Canadian Interac, US Zelle, or encrypted card payment gateways.</li>
                    <li>Provide ongoing 24/7 passenger assistance throughout your journey.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-2">3. Non-Disclosure & Security</h3>
                  <p className="text-slate-600">
                    We never sell, rent, or trade your personal information to third-party advertising brokers. Your information is transmitted solely to the operating airline and certified Global Distribution Systems (GDS) necessary to validate your flight.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-2">4. Your Rights</h3>
                  <p className="text-slate-600">
                    In compliance with PIPEDA (Canada) and applicable state regulations (USA), you have the right to request access to or deletion of your stored passenger profile at any time by contacting <a href="mailto:flyfello@hotmail.com" className="text-[#F58220] underline">flyfello@hotmail.com</a>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {page === 'refund' && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#F58220] uppercase tracking-wider mb-2">
                <RefreshCw className="w-4 h-4" />
                <span>Fair Fare Guarantees</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#122754] tracking-tight mb-2">
                Refund & Cancellation Policy
              </h2>
              <div className="text-xs text-slate-400 mb-6">Last Updated: November 2026</div>

              <div className="space-y-6 text-xs sm:text-sm">
                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-2">1. 24-Hour Void / Free Cancellation Window</h3>
                  <p className="text-slate-600">
                    For bookings made at least 7 days prior to departure, you may request a ticket void within 24 hours of booking with zero agency penalty fees. Any airline transaction fees will be communicated prior to cancellation.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-2">2. Airline Refund Rules</h3>
                  <p className="text-slate-600">
                    Tickets issued by Flyfello are subject to the specific fare rules and conditions of the operating airline (Air India, Air Canada, Emirates, Qatar Airways, Lufthansa, British Airways, etc.). If your fare is refundable, Flyfello will promptly process the refund submission directly with the carrier.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-2">3. Airline Schedule Changes & Cancellations</h3>
                  <p className="text-slate-600">
                    If an airline alters your itinerary by more than 4 hours, cancels a flight, or ceases operations, you are entitled to a full cash refund or complimentary re-accommodation on the next available flight as mandated by transportation authorities.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-2">4. Refund Processing Timeframes</h3>
                  <p className="text-slate-600">
                    Approved refunds are credited directly back to your original form of payment (Interac e-Transfer, Zelle, or credit card). While Flyfello initiates claims within 24 hours, airline GDS processing typically requires 3 to 10 business days depending on the carrier.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Have questions about your booking? Call{' '}
            <a href="tel:+16048326304" className="text-[#122754] font-bold hover:underline">
              +1 (604) 832-6304
            </a>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#122754] hover:bg-[#F58220] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
