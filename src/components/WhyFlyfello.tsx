import React from 'react';
import { CreditCard, Clock, Plane } from 'lucide-react';

export const WhyFlyfello: React.FC = () => {
  return (
    <section
      id="why-flyfello"
      style={{ width: '946px', maxWidth: '100%' }}
      className="mx-auto scroll-mt-24 py-8 sm:py-10 bg-slate-50 border-b border-slate-200 overflow-hidden box-border"
    >
      <div className="w-full px-4 sm:px-6 box-border">
        {/* Section Header */}
        <div className="w-full max-w-3xl mb-6">
          <div className="text-xs font-bold text-[#F58220] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Plane className="w-3.5 h-3.5 rotate-45 text-[#F58220] shrink-0" />
            <span>Why Fly with Flyfello</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold text-[#122754] tracking-tight [text-wrap:balance]">
            The Preferred Flight Specialist for Canada & USA to India
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            Booking long-haul transpacific or transatlantic flights to India shouldn't be stressful. We combine wholesale consolidator contracts with personal human care to ensure your journey is seamless from takeoff to landing.
          </p>
        </div>

        {/* Feature Grid with Visual Storytelling */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left Column: Visual Asset & Core Promise (5 cols) */}
          <div className="lg:col-span-5 relative rounded-2xl border border-slate-200 overflow-hidden shadow-sm h-64 sm:h-72 lg:h-auto min-h-[220px]">
            <img
              src="/assets/aistudio/image_689c70f2.png"
              alt="Comfortable international flight cabin"
              className="w-full h-full object-cover object-top sm:object-center"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#122754]/85 via-[#122754]/30 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#F58220] text-white px-2.5 py-0.5 rounded shadow-sm">
                Long-Haul Comfort
              </span>
              <div className="font-bold text-sm sm:text-base mt-1.5">
                Widebody Aircraft · Premium Economy & Lie-Flat Business
              </div>
            </div>
          </div>

          {/* Right Column: Key Differentiators Bento (7 cols) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Box 3 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
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
            </div>

            {/* Box 4 */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
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
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
