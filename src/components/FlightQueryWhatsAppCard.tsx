import React, { useState } from 'react';
import { SearchParams } from '../types';
import { getAirport } from '../data/airports';
import { buildWhatsAppFlightQueryUrl } from '../utils/whatsapp';
import { 
  MessageCircle, Plane, Luggage, Calendar, Users, 
  CheckCircle2, Clock, ShieldCheck, Copy, Check, ArrowRight, Sparkles 
} from 'lucide-react';

interface FlightQueryWhatsAppCardProps {
  params: SearchParams;
  hasSearched?: boolean;
}

export const FlightQueryWhatsAppCard: React.FC<FlightQueryWhatsAppCardProps> = ({
  params,
  hasSearched = false,
}) => {
  const [copied, setCopied] = useState(false);

  const originAirport = getAirport(params.origin) || { city: params.origin, code: params.origin, name: 'Origin', flag: '🇨🇦' };
  const destAirport = getAirport(params.destination) || { city: params.destination, code: params.destination, name: 'Destination', flag: '🇮🇳' };

  const totalPassengers = params.adults + params.children + params.infants;
  const whatsappUrl = buildWhatsAppFlightQueryUrl(params);

  const handleCopyQuery = () => {
    const tripLabel = params.tripType === 'round-trip' ? 'Round Trip' : params.tripType === 'one-way' ? 'One Way' : 'Multi-City';
    const text =
      `Flyfello Flight Query:\n` +
      `Route: ${originAirport.city} (${params.origin}) -> ${destAirport.city} (${params.destination})\n` +
      `Departure: ${params.departureDate}\n` +
      (params.tripType === 'round-trip' && params.returnDate ? `Return: ${params.returnDate}\n` : '') +
      `Trip Type: ${tripLabel}\n` +
      `Passengers: ${totalPassengers}\n` +
      `Cabin: ${params.cabin}\n` +
      `Baggage: 2x 23kg Included`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="flight-results-container" className="scroll-mt-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-3xl border-2 border-emerald-500/30 shadow-xl overflow-hidden">
        {/* Query Summary Card */}
        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Itinerary Details (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Route Display */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5">
                <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center justify-between">
                  <span>Requested Flight Routing</span>
                  <span className="text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                    {params.tripType === 'round-trip' ? 'Round Trip' : 'One Way'}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  {/* Origin */}
                  <div>
                    <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-1.5">
                      <span>{params.origin}</span>
                      <span className="text-base">{originAirport.flag}</span>
                    </div>
                    <div className="text-xs font-bold text-slate-700">{originAirport.city}</div>
                    <div className="text-[11px] text-slate-400 truncate max-w-[130px] sm:max-w-none">{originAirport.name}</div>
                  </div>

                  {/* Route Trajectory */}
                  <div className="flex-1 flex flex-col items-center px-2">
                    <Plane className="w-5 h-5 text-emerald-600 rotate-90 my-1" />
                    <div className="w-full h-0.5 bg-slate-300 relative">
                      <div className="absolute inset-0 bg-emerald-500 w-full animate-pulse"></div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-medium mt-1">
                      Canada / USA / UK ➔ India
                    </span>
                  </div>

                  {/* Destination */}
                  <div className="text-right">
                    <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center justify-end gap-1.5">
                      <span>{destAirport.flag}</span>
                      <span>{params.destination}</span>
                    </div>
                    <div className="text-xs font-bold text-slate-700">{destAirport.city}</div>
                    <div className="text-[11px] text-slate-400 truncate max-w-[130px] sm:max-w-none">{destAirport.name}</div>
                  </div>
                </div>

                {/* Key Query Metadata */}
                <div className="mt-5 pt-4 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">Departure</span>
                    <span className="font-bold text-slate-900 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-sky-600" />
                      {params.departureDate}
                    </span>
                  </div>

                  {params.tripType === 'round-trip' && (
                    <div>
                      <span className="text-[10px] text-slate-400 block font-semibold uppercase">Return</span>
                      <span className="font-bold text-slate-900 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-sky-600" />
                        {params.returnDate || 'Flexible'}
                      </span>
                    </div>
                  )}

                  <div>
                    <span className="text-[10px] text-slate-400 block font-semibold uppercase">Travelers</span>
                    <span className="font-bold text-slate-900 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-sky-600" />
                      {totalPassengers} Passenger{totalPassengers > 1 ? 's' : ''}
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-200/60 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
                  <span className="flex items-center gap-1.5 font-semibold text-emerald-700">
                    <Luggage className="w-3.5 h-3.5" />
                    2x 23kg Checked Bags Included
                  </span>
                  <span className="font-medium text-slate-500">
                    Class: <strong className="text-slate-800 capitalize">{params.cabin}</strong>
                  </span>
                  <span className="font-medium text-slate-500">
                    Currency: <strong className="text-slate-800">{params.currency}</strong>
                  </span>
                </div>
              </div>

              {/* Explanatory trust box */}
              <div className="text-xs text-slate-600 space-y-1.5 bg-amber-50/60 border border-amber-200/70 rounded-xl p-4">
                <div className="font-bold text-amber-950 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Why WhatsApp instead of automated flight tables?</span>
                </div>
                <p className="text-[11px] text-slate-700 leading-relaxed">
                  Flyfello accesses confidential wholesale seat allocations with Air India, Emirates, Qatar Airways, Air Canada, and Lufthansa that are legally protected from automated web scraping. By texting our agent directly, you receive personalized wholesale discounts saving $200–$500 per seat with official PNR issuance.
                </p>
              </div>
            </div>

            {/* Direct WhatsApp Action Box (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-slate-950 text-white rounded-2xl p-6 sm:p-7 shadow-lg">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>IATA Certified Ticketing Desk</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-white leading-tight">
                  Text Your Query to Our WhatsApp
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Tap below to launch WhatsApp with your flight route, dates, and baggage pre-loaded. Our ticketing officer will check live airline GDS inventory and reply in minutes.
                </p>
              </div>

              <div className="my-6 space-y-3">
                {/* Primary WhatsApp Action Link */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-4 bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-slate-950 font-extrabold text-sm sm:text-base rounded-xl transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2.5 text-center cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 text-slate-950 shrink-0" />
                  <span>Text Query on WhatsApp</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </a>

                {/* Secondary Copy Button */}
                <button
                  type="button"
                  onClick={handleCopyQuery}
                  className="w-full py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold border border-slate-700 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Flight Query Copied to Clipboard!' : 'Copy Query Text Manually'}</span>
                </button>
              </div>

              {/* Assistance strip */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-slate-300">
                  <Clock className="w-3 h-3 text-emerald-400" />
                  24/7 Agent Availability
                </span>
                <span>Phone: +1 (604) 832-6304</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
