import React from 'react';

export const PaymentSection: React.FC = () => {
  return (
    <section id="payment-info" className="scroll-mt-24 py-16 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
            <span>Direct WhatsApp Payment & Ticket Lock</span>
            <span className="text-slate-600" aria-hidden="true">·</span>
            <span>Zero Hidden Fees</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight [text-wrap:balance]">
            Simple & Transparent Payment via WhatsApp
          </h2>
          <p className="text-sm sm:text-base text-slate-300 mt-3">
            Lock exclusive consolidated fares without exorbitant booking fees. Chat directly with our certified ticketing agent on WhatsApp and pay using your preferred regional method.
          </p>
        </div>

        {/* 3 Step Booking & Payment Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 relative">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-slate-950 font-extrabold text-base flex items-center justify-center mb-4">
              01
            </div>
            <h3 className="text-base font-bold text-white mb-2">Select or Inquire Fare</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Find your flight above or send your dates, preferred airline, and traveler details to our WhatsApp desk.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-700 text-[11px] text-amber-400 font-medium">
              Direct agent response in &lt; 2 mins
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 relative">
            <div className="w-10 h-10 rounded-xl bg-sky-500 text-slate-950 font-extrabold text-base flex items-center justify-center mb-4">
              02
            </div>
            <h3 className="text-base font-bold text-white mb-2">Secure Local Payment</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Pay via Interac e-Transfer (Canada), Zelle/Wire (USA), Major Credit Cards, or flexible monthly EMI plans.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-700 text-[11px] text-sky-400 font-medium">
              CAD & USD accepted with zero markup
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-6 relative">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-slate-950 font-extrabold text-base flex items-center justify-center mb-4">
              03
            </div>
            <h3 className="text-base font-bold text-white mb-2">Instant Ticket & PNR</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Receive official airline e-Ticket PDF with verified 6-character PNR code right in your WhatsApp chat & email.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-700 text-[11px] text-emerald-400 font-medium">
              Verifiable on official airline website immediately
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
