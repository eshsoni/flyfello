import React, { useState, useRef, useEffect } from 'react';
import { SearchParams, TripType, CabinClass } from '../types';
import { WORLDWIDE_AIRPORTS, getOrCreateAirport } from '../data/airports';
import { buildWhatsAppFlightQueryUrl } from '../utils/whatsapp';
import { 
  Calendar, Users, ArrowLeftRight, Sparkles, X, 
  Search, ShieldCheck, CheckCircle2, Globe 
} from 'lucide-react';

interface FlightSearchProps {
  onSearch: (params: SearchParams) => void;
  currentParams: SearchParams;
}

const POPULAR_GLOBAL_HUBS = [
  { code: 'YVR', city: 'Vancouver', flag: '🇨🇦' },
  { code: 'YYZ', city: 'Toronto', flag: '🇨🇦' },
  { code: 'LHR', city: 'London', flag: '🇬🇧' },
  { code: 'JFK', city: 'New York', flag: '🇺🇸' },
  { code: 'SFO', city: 'San Francisco', flag: '🇺🇸' },
  { code: 'DEL', city: 'Delhi', flag: '🇮🇳' },
  { code: 'BOM', city: 'Mumbai', flag: '🇮🇳' },
  { code: 'ATQ', city: 'Amritsar', flag: '🇮🇳' },
  { code: 'DXB', city: 'Dubai', flag: '🇦🇪' },
  { code: 'SIN', city: 'Singapore', flag: '🇸🇬' },
  { code: 'SYD', city: 'Sydney', flag: '🇦🇺' },
  { code: 'CDG', city: 'Paris', flag: '🇫🇷' },
  { code: 'FRA', city: 'Frankfurt', flag: '🇩🇪' },
];

type RegionTab = 'all' | 'americas' | 'europe' | 'asia' | 'india' | 'oceania';

export const FlightSearch: React.FC<FlightSearchProps> = ({ onSearch, currentParams }) => {
  const [tripType, setTripType] = useState<TripType>(currentParams.tripType);
  const [origin, setOrigin] = useState<string>(currentParams.origin || 'YVR');
  const [destination, setDestination] = useState<string>(currentParams.destination || 'DEL');
  const [departureDate, setDepartureDate] = useState<string>(currentParams.departureDate);
  const [returnDate, setReturnDate] = useState<string>(currentParams.returnDate || '2026-11-15');
  const [cabin, setCabin] = useState<CabinClass>(currentParams.cabin);
  const [adults, setAdults] = useState<number>(currentParams.adults);
  const [children, setChildren] = useState<number>(currentParams.children);
  const [infants, setInfants] = useState<number>(currentParams.infants);
  const [directOnly, setDirectOnly] = useState<boolean>(currentParams.directOnly);
  const [currency, setCurrency] = useState<'CAD' | 'USD' | 'GBP'>(currentParams.currency);

  const [passengerDropdownOpen, setPassengerDropdownOpen] = useState(false);
  const [originSearchOpen, setOriginSearchOpen] = useState(false);
  const [destSearchOpen, setDestSearchOpen] = useState(false);
  const [originFilter, setOriginFilter] = useState('');
  const [destFilter, setDestFilter] = useState('');
  const [originRegionTab, setOriginRegionTab] = useState<RegionTab>('all');
  const [destRegionTab, setDestRegionTab] = useState<RegionTab>('all');

  const originContainerRef = useRef<HTMLDivElement>(null);
  const destContainerRef = useRef<HTMLDivElement>(null);
  const passengerContainerRef = useRef<HTMLDivElement>(null);

  // Click outside listener to dismiss dropdowns
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (originContainerRef.current && !originContainerRef.current.contains(target)) {
        setOriginSearchOpen(false);
      }
      if (destContainerRef.current && !destContainerRef.current.contains(target)) {
        setDestSearchOpen(false);
      }
      if (passengerContainerRef.current && !passengerContainerRef.current.contains(target)) {
        setPassengerDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalPassengers = adults + children + infants;

  const handleSwapAirports = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params: SearchParams = {
      origin,
      destination,
      departureDate,
      returnDate: tripType === 'round-trip' ? returnDate : undefined,
      tripType,
      cabin,
      adults,
      children,
      infants,
      directOnly,
      currency,
    };

    // Text the query directly to Flyfello WhatsApp desk
    const whatsappLink = buildWhatsAppFlightQueryUrl(params);
    window.open(whatsappLink, '_blank');

    // Notify parent
    onSearch(params);
  };

  const filterAirportsList = (query: string, regionTab: RegionTab) => {
    return WORLDWIDE_AIRPORTS.filter((a) => {
      if (regionTab === 'americas' && a.country !== 'Canada' && a.country !== 'USA' && a.region !== 'Americas') return false;
      if (regionTab === 'europe' && a.country !== 'UK' && a.region !== 'Europe') return false;
      if (regionTab === 'asia' && a.region !== 'Middle East' && a.region !== 'Southeast Asia' && a.region !== 'East Asia' && a.region !== 'South Asia') return false;
      if (regionTab === 'india' && a.country !== 'India') return false;
      if (regionTab === 'oceania' && a.region !== 'Australia & Pacific' && a.region !== 'Africa') return false;

      if (!query.trim()) return true;
      const q = query.toLowerCase().trim();
      return (
        a.city.toLowerCase().includes(q) ||
        a.code.toLowerCase().includes(q) ||
        a.name.toLowerCase().includes(q) ||
        a.country.toLowerCase().includes(q) ||
        (a.region && a.region.toLowerCase().includes(q))
      );
    });
  };

  const filteredOriginAirports = filterAirportsList(originFilter, originRegionTab);
  const filteredDestAirports = filterAirportsList(destFilter, destRegionTab);

  const selectedOriginAirport = getOrCreateAirport(origin);
  const selectedDestAirport = getOrCreateAirport(destination);

  return (
    <div id="flight-search" className="scroll-mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-20">
      {/* Lowest Fare Guaranteed Visual Line */}
      <div className="mb-3.5 flex flex-wrap items-center justify-between gap-3 px-1">
        <div className="inline-flex items-center gap-2.5 bg-gradient-to-r from-orange-500/15 via-amber-500/10 to-transparent border border-orange-200/90 rounded-full px-4 py-1.5 shadow-xs">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F58220] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F58220]"></span>
          </span>
          <ShieldCheck className="w-4 h-4 text-[#F58220]" />
          <span className="text-xs sm:text-sm font-extrabold text-[#122754] tracking-wide uppercase">
            Lowest fare guaranteed
          </span>
          <span className="hidden sm:inline text-xs text-slate-500 font-medium border-l border-slate-300 pl-2.5">
            Wholesale consolidated airfares · 2x 23kg luggage included · 24/7 personal desk
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
          <span className="inline-flex items-center gap-1.5 text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 text-[11px] font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Best Price Match
          </span>
          <span className="text-slate-300">·</span>
          <span className="text-slate-500 text-[11px] flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            All worldwide routes
          </span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-xl border border-slate-200/90 p-4 sm:p-6 lg:p-7">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Top Control Bar: Trip Type Tabs & Currency */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
            {/* Trip Type Segmented Control */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
              <button
                type="button"
                onClick={() => setTripType('round-trip')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  tripType === 'round-trip'
                    ? 'bg-[#122754] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Round Trip
              </button>
              <button
                type="button"
                onClick={() => setTripType('one-way')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  tripType === 'one-way'
                    ? 'bg-[#122754] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                One Way
              </button>
              <button
                type="button"
                onClick={() => setTripType('multi-city')}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  tripType === 'multi-city'
                    ? 'bg-[#122754] text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Multi-City
              </button>
            </div>

            {/* Currency & Direct Filter */}
            <div className="flex items-center gap-4 text-xs">
              <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 font-medium">
                <input
                  type="checkbox"
                  checked={directOnly}
                  onChange={(e) => setDirectOnly(e.target.checked)}
                  className="w-4 h-4 rounded text-[#F58220] border-slate-300 focus:ring-[#F58220]"
                />
                <span>Direct Flights Only</span>
              </label>

              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setCurrency('CAD')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    currency === 'CAD' ? 'bg-[#F58220] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  CAD $
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('USD')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    currency === 'USD' ? 'bg-[#F58220] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  USD $
                </button>
                <button
                  type="button"
                  onClick={() => setCurrency('GBP')}
                  className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    currency === 'GBP' ? 'bg-[#F58220] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  GBP £
                </button>
              </div>
            </div>
          </div>

          {/* Row 1: From (All over the world) -> Swap -> To (All over the world) */}
          <div className="grid grid-cols-1 lg:grid-cols-11 gap-3 items-center">
            {/* Origin Airport (5 cols) */}
            <div ref={originContainerRef} className="relative lg:col-span-5">
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#F58220]" />
                  <span>From: All over the world</span>
                </label>
                <span className="text-[10px] text-[#F58220] font-bold">
                  {WORLDWIDE_AIRPORTS.length}+ Worldwide Airports
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setOriginSearchOpen(!originSearchOpen);
                  setDestSearchOpen(false);
                }}
                className="w-full h-15 px-3.5 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl flex items-center justify-between text-left transition-colors focus:ring-2 focus:ring-[#F58220] focus:outline-none cursor-pointer"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#F58220] border border-orange-100 flex items-center justify-center shrink-0 font-bold text-xs">
                    {selectedOriginAirport.flag}
                  </div>
                  <div className="truncate">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-base">{selectedOriginAirport.city}</span>
                      <span className="font-mono text-xs font-bold bg-slate-200/80 text-slate-800 px-1.5 py-0.5 rounded">
                        {selectedOriginAirport.code}
                      </span>
                      {selectedOriginAirport.country && (
                        <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-1 rounded hidden sm:inline">
                          {selectedOriginAirport.country}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 truncate">{selectedOriginAirport.name}</div>
                  </div>
                </div>
              </button>

              {/* Origin Dropdown Picker */}
              {originSearchOpen && (
                <div className="absolute top-full left-0 mt-1 w-full sm:w-[480px] bg-white rounded-xl shadow-2xl border border-slate-200 p-3.5 z-50">
                  {/* Search bar with clear button */}
                  <div className="relative mb-2">
                    <input
                      type="text"
                      value={originFilter}
                      onChange={(e) => setOriginFilter(e.target.value)}
                      placeholder="Search any airport or city worldwide (e.g. Vancouver, London, JFK, Delhi, Dubai, Sydney)..."
                      className="w-full pl-3 pr-8 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F58220] text-slate-900"
                      autoFocus
                    />
                    {originFilter && (
                      <button
                        type="button"
                        onClick={() => setOriginFilter('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Region Filter Tabs */}
                  <div className="flex items-center gap-1 overflow-x-auto pb-2 mb-2 border-b border-slate-100 text-[11px]">
                    {(
                      [
                        { id: 'all', label: 'All World' },
                        { id: 'americas', label: 'Americas' },
                        { id: 'europe', label: 'UK & Europe' },
                        { id: 'asia', label: 'Asia & Mid East' },
                        { id: 'india', label: 'India' },
                        { id: 'oceania', label: 'Pacific & Others' },
                      ] as const
                    ).map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setOriginRegionTab(tab.id)}
                        className={`px-2 py-1 rounded whitespace-nowrap font-medium transition-colors cursor-pointer ${
                          originRegionTab === tab.id
                            ? 'bg-[#122754] text-white font-bold'
                            : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Popular Hubs quick-chips */}
                  {!originFilter && (
                    <div className="mb-2 pb-2 border-b border-slate-100">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        Popular Worldwide Hubs
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {POPULAR_GLOBAL_HUBS.map((chip) => (
                          <button
                            key={chip.code}
                            type="button"
                            onClick={() => {
                              setOrigin(chip.code);
                              setOriginSearchOpen(false);
                            }}
                            className={`px-2 py-1 rounded text-[11px] font-medium border transition-colors flex items-center gap-1 cursor-pointer ${
                              origin === chip.code
                                ? 'bg-[#122754] text-white border-[#122754]'
                                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                            }`}
                          >
                            <span>{chip.flag}</span>
                            <span className="font-bold">{chip.code}</span>
                            <span className="text-[10px] text-slate-500">{chip.city}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Custom Airport Fallback if user typed query */}
                  {originFilter.trim().length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        setOrigin(originFilter.trim());
                        setOriginSearchOpen(false);
                        setOriginFilter('');
                      }}
                      className="w-full mb-2 p-2 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg text-xs text-orange-950 font-semibold text-left flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5">
                        <span>✈️</span>
                        <span>Use &quot;{originFilter.trim()}&quot; as Departure Airport</span>
                      </div>
                      <span className="text-[10px] text-orange-800 bg-white px-2 py-0.5 rounded border border-orange-300 font-mono font-bold">
                        Select
                      </span>
                    </button>
                  )}

                  {/* Airport Scroll List */}
                  <div className="max-h-60 overflow-y-auto space-y-1 pr-1">
                    {filteredOriginAirports.length === 0 ? (
                      <div className="py-6 text-center text-xs text-slate-500 space-y-2">
                        <p>No airport directly matched &quot;{originFilter}&quot;.</p>
                        <p className="text-[11px] text-slate-400">
                          Click &quot;Use '{originFilter}' as Departure Airport&quot; above to search for this city!
                        </p>
                      </div>
                    ) : (
                      filteredOriginAirports.map((airport) => (
                        <button
                          key={airport.code}
                          type="button"
                          onClick={() => {
                            setOrigin(airport.code);
                            setOriginSearchOpen(false);
                            setOriginFilter('');
                          }}
                          className={`w-full px-2.5 py-2 rounded-lg text-left flex items-center justify-between text-xs hover:bg-slate-100 transition-colors cursor-pointer ${
                            origin === airport.code ? 'bg-orange-50 text-[#122754] font-bold border-l-2 border-[#F58220]' : 'text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2 truncate pr-2">
                            <span className="text-sm shrink-0">{airport.flag}</span>
                            <div className="truncate">
                              <span className="font-semibold text-slate-900">{airport.city}</span>
                              <span className="text-slate-400 text-[11px] ml-1.5 font-normal">
                                ({airport.country || airport.region})
                              </span>
                              <div className="text-slate-400 text-[10px] truncate">{airport.name}</div>
                            </div>
                          </div>
                          <span className="font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-[11px] shrink-0 border border-slate-200">
                            {airport.code}
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Swap Button (1 col) */}
            <div className="flex items-center justify-center -my-1 lg:my-0 lg:col-span-1">
              <button
                type="button"
                onClick={handleSwapAirports}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-orange-50 text-[#122754] hover:text-[#F58220] flex items-center justify-center transition-all hover:rotate-180 duration-300 border border-slate-200 shadow-xs cursor-pointer"
                title="Swap Departure and Destination"
              >
                <ArrowLeftRight className="w-4 h-4" />
              </button>
            </div>

            {/* Destination Airport (5 cols) */}
            <div ref={destContainerRef} className="relative lg:col-span-5">
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-[#F58220]" />
                  <span>To: All over the world</span>
                </label>
                <span className="text-[10px] text-[#F58220] font-bold">
                  Any Worldwide Destination
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setDestSearchOpen(!destSearchOpen);
                  setOriginSearchOpen(false);
                }}
                className="w-full h-15 px-3.5 bg-slate-50 hover:bg-slate-100/80 border border-slate-200 rounded-xl flex items-center justify-between text-left transition-colors focus:ring-2 focus:ring-[#F58220] focus:outline-none cursor-pointer"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#F58220] border border-orange-100 flex items-center justify-center shrink-0 font-bold text-xs">
                    {selectedDestAirport.flag}
                  </div>
                  <div className="truncate">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 text-base">{selectedDestAirport.city}</span>
                      <span className="font-mono text-xs font-bold bg-slate-200/80 text-slate-800 px-1.5 py-0.5 rounded">
                        {selectedDestAirport.code}
                      </span>
                      {selectedDestAirport.country && (
                        <span className="text-[10px] font-medium text-slate-500 bg-slate-100 px-1 rounded hidden sm:inline">
                          {selectedDestAirport.country}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-slate-500 truncate">{selectedDestAirport.name}</div>
                  </div>
                </div>
              </button>

              {/* Destination Dropdown Picker */}
              {destSearchOpen && (
                <div className="absolute top-full left-0 mt-1 w-full sm:w-[480px] bg-white rounded-xl shadow-2xl border border-slate-200 p-3.5 z-50">
                  {/* Search bar with clear button */}
                  <div className="relative mb-2">
                    <input
                      type="text"
                      value={destFilter}
                      onChange={(e) => setDestFilter(e.target.value)}
                      placeholder="Search any destination city, country, or code worldwide..."
                      className="w-full pl-3 pr-8 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F58220] text-slate-900"
                      autoFocus
                    />
                    {destFilter && (
                      <button
                        type="button"
                        onClick={() => setDestFilter('')}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Region Filter Tabs */}
                  <div className="flex items-center gap-1 overflow-x-auto pb-2 mb-2 border-b border-slate-100 text-[11px]">
                    {(
                      [
                        { id: 'all', label: 'All World' },
                        { id: 'americas', label: 'Americas' },
                        { id: 'europe', label: 'UK & Europe' },
                        { id: 'asia', label: 'Asia & Mid East' },
                        { id: 'india', label: 'India' },
                        { id: 'oceania', label: 'Pacific & Others' },
                      ] as const
                    ).map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setDestRegionTab(tab.id)}
                        className={`px-2 py-1 rounded whitespace-nowrap font-medium transition-colors cursor-pointer ${
                          destRegionTab === tab.id
                            ? 'bg-[#122754] text-white font-bold'
                            : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Popular Destinations quick-chips */}
                  {!destFilter && (
                    <div className="mb-2 pb-2 border-b border-slate-100">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                        Popular Worldwide Destinations
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {POPULAR_GLOBAL_HUBS.map((chip) => (
                          <button
                            key={chip.code}
                            type="button"
                            onClick={() => {
                              setDestination(chip.code);
                              setDestSearchOpen(false);
                            }}
                            className={`px-2 py-1 rounded text-[11px] font-medium border transition-colors flex items-center gap-1 cursor-pointer ${
                              destination === chip.code
                                ? 'bg-[#122754] text-white border-[#122754] font-bold'
                                : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                            }`}
                          >
                            <span>{chip.flag}</span>
                            <span className="font-bold">{chip.code}</span>
                            <span className="text-[10px] text-slate-500">{chip.city}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Custom Destination Fallback */}
                  {destFilter.trim().length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        setDestination(destFilter.trim());
                        setDestSearchOpen(false);
                        setDestFilter('');
                      }}
                      className="w-full mb-2 p-2 bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg text-xs text-orange-950 font-semibold text-left flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-1.5">
                        <span>✈️</span>
                        <span>Use &quot;{destFilter.trim()}&quot; as Destination Airport</span>
                      </div>
                      <span className="text-[10px] text-orange-800 bg-white px-2 py-0.5 rounded border border-orange-300 font-mono font-bold">
                        Select
                      </span>
                    </button>
                  )}

                  {/* Airport Scroll List */}
                  <div className="max-h-60 overflow-y-auto space-y-1 pr-1">
                    {filteredDestAirports.map((airport) => (
                      <button
                        key={airport.code}
                        type="button"
                        onClick={() => {
                          setDestination(airport.code);
                          setDestSearchOpen(false);
                          setDestFilter('');
                        }}
                        className={`w-full px-2.5 py-2 rounded-lg text-left flex items-center justify-between text-xs hover:bg-slate-100 transition-colors cursor-pointer ${
                          destination === airport.code ? 'bg-orange-50 text-[#122754] font-bold border-l-2 border-[#F58220]' : 'text-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate pr-2">
                          <span className="text-sm shrink-0">{airport.flag}</span>
                          <div className="truncate">
                            <span className="font-semibold text-slate-900">{airport.city}</span>
                            <span className="text-slate-400 text-[11px] ml-1.5 font-normal">
                              ({airport.country || airport.region})
                            </span>
                            <div className="text-slate-400 text-[10px] truncate">{airport.name}</div>
                          </div>
                        </div>
                        <span className="font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded text-[11px] shrink-0 border border-slate-200">
                          {airport.code}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Row 2: Dates, Passengers and Class (Above the SEARCH button) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
            {/* Departure Date */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#F58220]" />
                <span>Departure Date</span>
              </label>
              <input
                type="date"
                value={departureDate}
                onChange={(e) => setDepartureDate(e.target.value)}
                className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:ring-1 focus:ring-[#F58220] focus:outline-none"
              />
            </div>

            {/* Return Date (if round-trip) */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#F58220]" />
                <span>Return Date</span>
              </label>
              <input
                type="date"
                value={returnDate}
                disabled={tripType === 'one-way'}
                onChange={(e) => setReturnDate(e.target.value)}
                className={`w-full h-11 px-3 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:ring-1 focus:ring-[#F58220] focus:outline-none ${
                  tripType === 'one-way' ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-slate-50'
                }`}
              />
            </div>

            {/* Passengers Dropdown */}
            <div ref={passengerContainerRef} className="relative">
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#F58220]" />
                <span>Passengers</span>
              </label>
              <button
                type="button"
                onClick={() => setPassengerDropdownOpen(!passengerDropdownOpen)}
                className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 flex items-center justify-between text-left focus:ring-1 focus:ring-[#F58220] cursor-pointer"
              >
                <span>
                  {totalPassengers} Traveler{totalPassengers > 1 ? 's' : ''}
                </span>
                <span className="text-[10px] text-slate-400 font-normal">
                  ({adults}A{children > 0 ? `, ${children}C` : ''}{infants > 0 ? `, ${infants}I` : ''})
                </span>
              </button>

              {passengerDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-4 z-50 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-slate-900">Adults</div>
                      <div className="text-[10px] text-slate-500">12+ years</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setAdults(Math.max(1, adults - 1))}
                        className="w-7 h-7 rounded border border-slate-200 text-slate-700 flex items-center justify-center font-bold hover:bg-slate-100 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-4 text-center font-bold text-xs">{adults}</span>
                      <button
                        type="button"
                        onClick={() => setAdults(Math.min(9, adults + 1))}
                        className="w-7 h-7 rounded border border-slate-200 text-slate-700 flex items-center justify-center font-bold hover:bg-slate-100 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-slate-900">Children</div>
                      <div className="text-[10px] text-slate-500">2-11 years</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setChildren(Math.max(0, children - 1))}
                        className="w-7 h-7 rounded border border-slate-200 text-slate-700 flex items-center justify-center font-bold hover:bg-slate-100 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-4 text-center font-bold text-xs">{children}</span>
                      <button
                        type="button"
                        onClick={() => setChildren(Math.min(6, children + 1))}
                        className="w-7 h-7 rounded border border-slate-200 text-slate-700 flex items-center justify-center font-bold hover:bg-slate-100 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <div className="font-semibold text-slate-900">Infants</div>
                      <div className="text-[10px] text-slate-500">Under 2 years (lap)</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setInfants(Math.max(0, infants - 1))}
                        className="w-7 h-7 rounded border border-slate-200 text-slate-700 flex items-center justify-center font-bold hover:bg-slate-100 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-4 text-center font-bold text-xs">{infants}</span>
                      <button
                        type="button"
                        onClick={() => setInfants(Math.min(adults, infants + 1))}
                        className="w-7 h-7 rounded border border-slate-200 text-slate-700 flex items-center justify-center font-bold hover:bg-slate-100 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setPassengerDropdownOpen(false)}
                    className="w-full py-2 bg-[#122754] text-white text-xs font-bold rounded-lg hover:bg-[#F58220] transition-colors cursor-pointer"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>

            {/* Cabin Class */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#F58220]" />
                <span>Cabin Class</span>
              </label>
              <select
                value={cabin}
                onChange={(e) => setCabin(e.target.value as CabinClass)}
                className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:ring-1 focus:ring-[#F58220] focus:outline-none cursor-pointer"
              >
                <option value="economy">Economy Class (2x 23kg)</option>
                <option value="premium">Premium Economy</option>
                <option value="business">Business Class (Lie-Flat)</option>
                <option value="first">First Class Luxury</option>
              </select>
            </div>
          </div>

          {/* Row 3: SEARCH Button (Placed directly below Dates, Passengers, and Class) */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full h-14 bg-[#122754] hover:bg-[#F58220] active:scale-[0.99] text-white font-extrabold text-base rounded-xl transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2.5 cursor-pointer uppercase tracking-wider group"
            >
              <Search className="w-5 h-5 text-[#F58220] group-hover:text-white transition-colors" />
              <span>SEARCH</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
