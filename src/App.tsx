import React, { useState, useEffect } from 'react';
import { SearchParams } from './types';
import { Header } from './components/Header';
import { FlightSearch } from './components/FlightSearch';
import { WhyFlyfello } from './components/WhyFlyfello';
import { Testimonials } from './components/Testimonials';
import { InstagramSection } from './components/InstagramSection';
import { Footer } from './components/Footer';
import { PolicyModal, PolicyPageType } from './components/PolicyModal';
import { CookieConsent } from './components/CookieConsent';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { HolidayBookingsPage } from './components/HolidayBookingsPage';

export default function App() {
  const [activePage, setActivePage] = useState<PolicyPageType | null>(null);
  const [isHolidayPage, setIsHolidayPage] = useState<boolean>(() => {
    const queryPage = new URLSearchParams(window.location.search).get('page')?.toLowerCase();
    const hash = window.location.hash.replace('#', '').toLowerCase();
    return queryPage === 'holiday-bookings' || hash === 'holiday-bookings';
  });

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
    const handleRouteSync = () => {
      const queryPage = new URLSearchParams(window.location.search).get('page')?.toLowerCase();
      const hash = window.location.hash.replace('#', '').toLowerCase() as PolicyPageType | 'holiday-bookings';
      setIsHolidayPage(queryPage === 'holiday-bookings' || hash === 'holiday-bookings');
      if (validPages.includes(hash as PolicyPageType)) {
        setActivePage(hash as PolicyPageType);
      }
    };

    handleRouteSync();
    window.addEventListener('hashchange', handleRouteSync);
    window.addEventListener('popstate', handleRouteSync);
    return () => {
      window.removeEventListener('hashchange', handleRouteSync);
      window.removeEventListener('popstate', handleRouteSync);
    };
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
    if (isHolidayPage) {
      document.title = 'Holiday Bookings | FlyFello';
      return;
    }
    document.title = activePage
      ? pageTitles[activePage]
      : 'FlyFello – Discounted USA & Canada to India Flights';
  }, [activePage, isHolidayPage]);

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

  const handleOpenHolidayBookings = () => {
    window.history.pushState(null, '', '/?page=holiday-bookings');
    setActivePage(null);
    setIsHolidayPage(true);
    window.scrollTo({ top: 0 });
  };

  const handleBackToHome = () => {
    window.history.pushState(null, '', '/');
    setIsHolidayPage(false);
    setActivePage(null);
    window.scrollTo({ top: 0 });
  };

  const handleSearch = (newParams: SearchParams) => {
    setSearchParams(newParams);
  };

  if (isHolidayPage) {
    return <HolidayBookingsPage onBackToHome={handleBackToHome} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Navigation Header & Air Suvidha Notice */}
      <Header
        onOpenPage={handleOpenPage}
        onOpenHolidayBookings={handleOpenHolidayBookings}
      />

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

      {/* Floating WhatsApp Support Button */}
      <WhatsAppFloatingButton />

      {/* Cookie Consent Pop-up (Always opens on every page load) */}
      <CookieConsent onOpenPolicy={handleOpenPage} />
    </div>
  );
}


