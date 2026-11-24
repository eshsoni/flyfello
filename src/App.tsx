import React, { useState, useEffect } from 'react';
import { SearchParams } from './types';
import { Header, ServicePageType } from './components/Header';
import { FlightSearch } from './components/FlightSearch';
import { WhyFlyfello } from './components/WhyFlyfello';
import { Testimonials } from './components/Testimonials';
import { InstagramSection } from './components/InstagramSection';
import { Footer } from './components/Footer';
import { PolicyModal, PolicyPageType } from './components/PolicyModal';
import { CookieConsent } from './components/CookieConsent';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { HolidayBookingsPage } from './components/HolidayBookingsPage';
import { HotelsPage } from './components/HotelsPage';
import { VisaPage } from './components/VisaPage';
import { EsimPage } from './components/EsimPage';
import { TopInternationalDestinations } from './components/TopInternationalDestinations';

function resolveServiceFromLocation(): ServicePageType {
  const queryPage = new URLSearchParams(window.location.search).get('page')?.toLowerCase();
  const hash = window.location.hash.replace('#', '').toLowerCase();

  if (queryPage === 'hotels' || hash === 'hotels') return 'hotels';
  if (
    queryPage === 'holiday-bookings' ||
    queryPage === 'holidays' ||
    hash === 'holiday-bookings' ||
    hash === 'holidays'
  ) {
    return 'holidays';
  }
  if (queryPage === 'visa' || hash === 'visa') return 'visa';
  if (queryPage === 'esim' || hash === 'esim') return 'esim';
  return 'flights';
}

function getPathForService(service: ServicePageType): string {
  switch (service) {
    case 'hotels':
      return '/?page=hotels';
    case 'holidays':
      return '/?page=holiday-bookings';
    case 'visa':
      return '/?page=visa';
    case 'esim':
      return '/?page=esim';
    case 'flights':
    default:
      return '/';
  }
}

export default function App() {
  const [activePage, setActivePage] = useState<PolicyPageType | null>(null);
  const [currentService, setCurrentService] = useState<ServicePageType>(() =>
    resolveServiceFromLocation()
  );

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

  // Support direct URL query & hash linking across Flights, Hotels, Holidays, Visa, eSIM, and Policy modals
  useEffect(() => {
    const validPolicyPages: PolicyPageType[] = [
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
      setCurrentService(resolveServiceFromLocation());
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (validPolicyPages.includes(hash as PolicyPageType)) {
        setActivePage(hash as PolicyPageType);
      } else {
        setActivePage(null);
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
    if (activePage) {
      document.title = pageTitles[activePage];
      return;
    }

    const serviceTitles: Record<ServicePageType, string> = {
      flights: 'FlyFello – Discounted USA & Canada to India Flights',
      hotels: 'Hotels & Resorts Inquiry | FlyFello',
      holidays: 'Holiday Bookings | FlyFello',
      visa: 'Global Visa Assistance | FlyFello',
      esim: 'International Travel eSIM | FlyFello',
    };
    document.title = serviceTitles[currentService];
  }, [activePage, currentService]);

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

  const handleSelectService = (service: ServicePageType) => {
    const nextPath = getPathForService(service);
    window.history.pushState(null, '', nextPath);
    setActivePage(null);
    setCurrentService(service);
    window.scrollTo({ top: 0 });
  };

  const handleSearch = (newParams: SearchParams) => {
    setSearchParams(newParams);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Navigation Header, 5-Service Icon Strip & Air Suvidha Notice */}
      <Header
        activeService={currentService}
        onSelectService={handleSelectService}
        onOpenPage={handleOpenPage}
        onOpenHolidayBookings={() => handleSelectService('holidays')}
      />

      {/* Active Page Content */}
      <main className="flex-1 flex flex-col">
        {currentService === 'flights' && (
          <>
            <FlightSearch
              onSearch={handleSearch}
              currentParams={searchParams}
            />
            <TopInternationalDestinations onBackToHome={() => handleSelectService('flights')} />
            <WhyFlyfello />
            <Testimonials />
            <InstagramSection />
          </>
        )}

        {currentService === 'hotels' && <HotelsPage />}

        {currentService === 'holidays' && (
          <HolidayBookingsPage
            embedded
            onBackToHome={() => handleSelectService('flights')}
          />
        )}

        {currentService === 'visa' && <VisaPage />}

        {currentService === 'esim' && <EsimPage />}
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

      {/* Cookie Consent Pop-up */}
      <CookieConsent onOpenPolicy={handleOpenPage} />
    </div>
  );
}
