import React, { useState, useEffect } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { SearchParams } from './types';
import { Header } from './components/Header';
import { FlightSearch } from './components/FlightSearch';
import { WhyFlyfello } from './components/WhyFlyfello';
import { Testimonials } from './components/Testimonials';
import { InstagramSection } from './components/InstagramSection';
import { Footer } from './components/Footer';
import { PolicyModal, PolicyPageType } from './components/PolicyModal';
import { CookieConsent } from './components/CookieConsent';

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

  // Support direct URL hash linking (e.g. #privacy, #refund, #about, #contact, #help, etc.)
  useEffect(() => {
    const validPages: PolicyPageType[] = [
      'about',
      'contact',
      'disclaimer',
      'cookies',
      'terms',
      'privacy',
      'help',
      'protocols',
      'cancellation',
      'refund',
      'baggage',
    ];
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase() as PolicyPageType;
      if (validPages.includes(hash)) {
        setActivePage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Dynamic canonical URL, og:url, and page title management for SEO
  useEffect(() => {
    const canonicalUrl = window.location.origin + window.location.pathname;
    let canonicalLink = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    let ogUrlMeta = document.querySelector<HTMLMetaElement>('meta[property="og:url"]');
    if (!ogUrlMeta) {
      ogUrlMeta = document.createElement('meta');
      ogUrlMeta.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrlMeta);
    }
    ogUrlMeta.setAttribute('content', canonicalUrl);
  }, []);

  useEffect(() => {
    const pageTitles: Record<PolicyPageType, string> = {
      about: 'About Us | FlyFello',
      contact: 'Contact Us | FlyFello',
      disclaimer: 'Disclaimer | FlyFello',
      cookies: 'Cookies Policy | FlyFello',
      terms: 'Terms and Conditions | FlyFello',
      privacy: 'Privacy Policy | FlyFello',
      help: 'Help Centre | FlyFello',
      protocols: 'Flight Booking Protocols | FlyFello',
      cancellation: 'Cancellation Policy | FlyFello',
      refund: 'Refund Policy | FlyFello',
      baggage: 'Baggage Information | FlyFello',
    };
    document.title = activePage
      ? pageTitles[activePage]
      : 'FlyFello – Discounted USA & Canada to India Flights';
  }, [activePage]);

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
      {/* Top Navigation Header & Air Suvidha Notice */}
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

        {/* Instagram Account & Posts Showcase */}
        <InstagramSection />
      </main>

      {/* Footer with Visit Us (India), Company & Support Links */}
      <Footer onOpenPage={handleOpenPage} />

      {/* Policy & Info Modal */}
      {activePage && (
        <PolicyModal
          page={activePage}
          onClose={handleClosePage}
          onNavigate={(page) => handleOpenPage(page)}
        />
      )}

      {/* Cookie Consent Pop-up (Always opens on every page load) */}
      <CookieConsent onOpenPolicy={handleOpenPage} />

      {/* Vercel Web Analytics */}
      <Analytics />
    </div>
  );
}


