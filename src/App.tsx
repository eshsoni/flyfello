import React, { useState, useEffect } from 'react';
import { SearchParams } from './types';
import { Header } from './components/Header';
import { FlightSearch } from './components/FlightSearch';
import { WhyFlyfello } from './components/WhyFlyfello';
import { Testimonials } from './components/Testimonials';
import { Footer } from './components/Footer';
import { PolicyModal, PolicyPageType } from './components/PolicyModal';

export default function App() {
  const [activePage, setActivePage] = useState<PolicyPageType | null>(null);

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
    currency: 'INR',
  });

  // Support direct URL hash linking (e.g. #privacy, #refund, #about, #contact)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'privacy' || hash === 'refund' || hash === 'about' || hash === 'contact') {
        setActivePage(hash as PolicyPageType);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleOpenPage = (page: PolicyPageType) => {
    setActivePage(page);
    window.location.hash = page;
  };

  const handleClosePage = () => {
    setActivePage(null);
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  const handleSearch = (newParams: SearchParams) => {
    setSearchParams(newParams);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Navigation Header */}
      <Header onOpenPage={handleOpenPage} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* Real-time Flight Search Engine with Globe & Flights Video Backdrop */}
        <FlightSearch
          onSearch={handleSearch}
          currentParams={searchParams}
        />

        {/* Why Flyfello Feature & Luggage Guarantee Showcase */}
        <WhyFlyfello />

        {/* Customer Testimonials & Verified Reviews */}
        <Testimonials />
      </main>

      {/* Footer with Policy & Company Links */}
      <Footer onOpenPage={handleOpenPage} />

      {/* Policy & Info Modal (Privacy, Refund, About Us, Contact Us) */}
      {activePage && (
        <PolicyModal
          page={activePage}
          onClose={handleClosePage}
          onNavigate={(page) => handleOpenPage(page)}
        />
      )}
    </div>
  );
}


