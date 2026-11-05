import React, { useState } from 'react';
import { SearchParams } from './types';
import { Header } from './components/Header';
import { FlightSearch } from './components/FlightSearch';
import { WhyFlyfello } from './components/WhyFlyfello';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';

export default function App() {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    origin: 'YVR',
    destination: 'DEL',
    departureDate: '2026-11-10',
    returnDate: '2026-12-05',
    tripType: 'round-trip',
    cabin: 'economy',
    adults: 1,
    children: 0,
    infants: 0,
    directOnly: false,
    currency: 'CAD',
  });

  const handleSearch = (newParams: SearchParams) => {
    setSearchParams(newParams);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top 3-Zone Navigation Header */}
      <Header />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Real-time Flight Search Engine */}
        <FlightSearch
          onSearch={handleSearch}
          currentParams={searchParams}
        />

        {/* Why Flyfello Feature & Luggage Guarantee Showcase */}
        <WhyFlyfello />

        {/* Customer Testimonials & Verified Reviews */}
        <Testimonials />
      </main>

      {/* Quiet Footer */}
      <Footer />
    </div>
  );
}

