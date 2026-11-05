import React from 'react';
import { Luggage, ShieldCheck, CreditCard, Clock, HeartHandshake, Plane } from 'lucide-react';

export const WhyFlyfello: React.FC = () => {
  return (
    <section id="why-flyfello" className="scroll-mt-24 py-20 bg-slate-50 border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="text-xs font-bold text-[#F58220] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Plane className="w-3.5 h-3.5 rotate-45 text-[#F58220]" />
            <span>Why Fly with Flyfello</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#122754] tracking-tight [text-wrap:balance]">
            The Preferred Flight Specialist for Canada & USA to India
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3 leading-relaxed">
            Booking long-haul transpacific or transatlantic flights to India shouldn't be stressful. We combine wholesale consolidator contracts with personal human care to ensure your journey is seamless from takeoff to landing.
          </p>
        </div>

        {/* Feature Grid with Visual Storytelling */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Visual Asset & Core Promise (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="relative h-64 sm:h-72 w-full overflow-hidden">
              <img
                src="/src/assets/images/flight_cabin_comfort_1792428387992.jpg"
                alt="Comfortable international flight cabin"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#122754]/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F58220] text-white px-2.5 py-0.5 rounded shadow-sm">
                  Long-Haul Comfort
                </span>
                <div className="font-bold text-sm sm:text-base mt-1.5">
                  Widebody Aircraft · Premium Economy & Lie-Flat Business
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-bold text-[#122754] mb-2">
                Uncompromising Baggage & Comfort Standards
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed mb-4">
                Most online search engines offer stripped-down "Basic Economy" tickets that secretly exclude second check-in suitcases. With Flyfello, every India booking is verified to include full 2x 23kg check-in baggage and meal service.
              </p>
              <div className="flex items-center gap-3 text-xs font-semibold text-slate-800 pt-3 border-t border-slate-100">
                <div className="w-2.5 h-2.5 rounded-full bg-[#F58220]"></div>
                <span>Zero surprise baggage fees at airport check-in counters</span>
              </div>
            </div>
          </div>

          {/* Right Column: Key Differentiators Bento (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Box 1 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F58220] flex items-center justify-center mb-4 border border-orange-100">
                  <Luggage className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-[#122754] mb-1.5">
                  Guaranteed 2x 23kg Bags
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Fly home with gifts, sweets, and essentials. Two full 50-lb suitcases included on Air India, Emirates, Qatar, Air Canada, and partner airlines.
                </p>
              </div>
              <div className="mt-4 text-[11px] font-bold text-[#F58220]">
                Student 3-bag options available
              </div>
            </div>

            {/* Box 2 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#122754] flex items-center justify-center mb-4 border border-blue-100">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-[#122754] mb-1.5">
                  IATA Certified Agency
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Official accreditation means your reservations are made directly into global distribution systems (GDS) with immediate confirmed 6-character PNRs.
                </p>
              </div>
              <div className="mt-4 text-[11px] font-bold text-[#122754]">
                100% genuine airline verification
              </div>
            </div>

            {/* Box 3 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#F58220] flex items-center justify-center mb-4 border border-orange-100">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-[#122754] mb-1.5">
                  Flexible EMI & Interac Pay
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pay seamlessly via Canadian Interac e-Transfer with zero processing fees, US Zelle, or split your payment with easy monthly EMI installments.
                </p>
              </div>
              <div className="mt-4 text-[11px] font-bold text-[#F58220]">
                No foreign transaction surcharge
              </div>
            </div>

            {/* Box 4 */}
            <div className="bg-white p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#122754] flex items-center justify-center mb-4 border border-blue-100">
                  <Clock className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-[#122754] mb-1.5">
                  24/7 Human WhatsApp Desk
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  No infuriating automated phone trees or offshore call centers that leave you stranded. Direct human ticketing agents available day & night.
                </p>
              </div>
              <div className="mt-4 text-[11px] font-bold text-[#122754]">
                Direct hotline: +1 (604) 832-6304
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
