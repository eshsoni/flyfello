import React from 'react';
import { FEATURED_ROUTE_DEALS } from '../data/flights';
import { buildWhatsAppRouteDealUrl } from '../utils/whatsapp';
import { ArrowRight, Luggage, Clock, Check, MessageCircle } from 'lucide-react';

interface PopularRoutesProps {
  onSelectRoute: (fromCode: string, toCode: string) => void;
  currency: 'CAD' | 'USD' | 'GBP';
}

export const PopularRoutes: React.FC<PopularRoutesProps> = ({ onSelectRoute, currency }) => {
  return (
    <section id="popular-deals" className="scroll-mt-24 py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-semibold text-sky-700 uppercase tracking-wider mb-2">
              Bestseller Fares · Special Agent Allocations
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Popular Canada, USA & UK to India Routes
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
              Hand-picked discounted fares negotiated directly with premier international carriers. All fares include 2x 23kg checked baggage.
            </p>
          </div>

          <div className="text-xs text-slate-500 flex items-center gap-2">
            <span>Prices shown in <strong>{currency}</strong></span>
            <span className="text-slate-300">·</span>
            <span>All taxes & luggage included</span>
          </div>
        </div>

        {/* Route Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURED_ROUTE_DEALS.map((deal) => {
            let price = deal.priceCad;
            if (currency === 'USD') price = deal.priceUsd;
            if (currency === 'GBP') price = Math.round(deal.priceCad * 0.58);
            const currencySymbol = currency === 'GBP' ? '£' : '$';

            return (
              <div
                key={deal.id}
                className="bg-slate-50/70 hover:bg-white rounded-2xl border border-slate-200/90 hover:border-slate-300 hover:shadow-lg transition-all p-5 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar with Route Tag */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[11px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                      {deal.tag}
                    </span>
                    <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      {deal.badge}
                    </span>
                  </div>

                  {/* Route City and Codes */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="text-xl font-extrabold text-slate-900">{deal.fromCity}</div>
                      <div className="font-mono text-xs font-bold text-slate-500">{deal.fromCode}</div>
                    </div>

                    <div className="px-3 flex flex-col items-center">
                      <div className="w-16 h-0.5 bg-slate-300 relative my-2">
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400 absolute -right-1 -top-1.5" />
                      </div>
                      <span className="text-[10px] text-slate-500">{deal.stops}</span>
                    </div>

                    <div className="text-right">
                      <div className="text-xl font-extrabold text-slate-900">{deal.toCity}</div>
                      <div className="font-mono text-xs font-bold text-slate-500">{deal.toCode}</div>
                    </div>
                  </div>

                  {/* Key Metadata with zero-pill separators */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-4 pb-4 border-b border-slate-200/80">
                    <span className="font-medium text-slate-700">{deal.airline}</span>
                    <span aria-hidden="true">·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {deal.flightTime}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="text-emerald-700 font-medium flex items-center gap-1">
                      <Luggage className="w-3 h-3" />
                      2x 23kg
                    </span>
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between pt-1">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">From</div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-extrabold text-slate-950 tabular-nums">
                        ${price}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">{currency}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onSelectRoute(deal.fromCode, deal.toCode)}
                      className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                      title="Set as search route"
                    >
                      <span>Dates</span>
                    </button>
                    <a
                      href={buildWhatsAppRouteDealUrl(deal, currency)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5 shadow-xs whitespace-nowrap"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>Inquire WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
