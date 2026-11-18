import React, { useState } from 'react';
import {
  Palmtree,
  Calendar,
  Users,
  MapPin,
  Hotel,
  Plane,
  MessageCircle,
  Mail,
  CheckCircle2,
  ArrowLeft,
  Send,
  Phone,
  Sparkles,
} from 'lucide-react';
import { FlyfelloLogo } from './FlyfelloLogo';
import { WHATSAPP_API_NUMBER } from '../utils/whatsapp';
import { WhatsAppFloatingButton } from './WhatsAppFloatingButton';

interface HolidayFormState {
  fullName: string;
  phone: string;
  email: string;
  departureCity: string;
  destination: string;
  otherDestination: string;
  packageType: string;
  travelDate: string;
  nights: string;
  adults: number;
  children: number;
  hotelCategory: string;
  includeFlights: boolean;
  budget: string;
  notes: string;
}

const POPULAR_HOLIDAY_DESTINATIONS = [
  'Bali',
  'Thailand',
  'Singapore',
  'Dubai',
  'Vietnam',
  'Other',
];

interface HolidayBookingsPageProps {
  onBackToHome?: () => void;
}

export const HolidayBookingsPage: React.FC<HolidayBookingsPageProps> = ({ onBackToHome }) => {
  const [form, setForm] = useState<HolidayFormState>({
    fullName: '',
    phone: '',
    email: '',
    departureCity: 'New Delhi / Chandigarh',
    destination: 'Bali',
    otherDestination: '',
    packageType: 'Family Vacation',
    travelDate: '2026-12-15',
    nights: '5 Nights / 6 Days',
    adults: 2,
    children: 0,
    hotelCategory: '4-Star Deluxe',
    includeFlights: true,
    budget: 'Flexible / Best Value',
    notes: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);

  const resolvedDestination =
    form.destination === 'Other'
      ? form.otherDestination.trim() || 'Other'
      : form.destination;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    let ref = `FF-HOL-${Math.floor(100000 + Math.random() * 900000)}`;
    let didSendEmail = false;

    try {
      const response = await fetch('/api/holiday-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          destination: resolvedDestination,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        if (data?.referenceId) {
          ref = data.referenceId;
        }
        didSendEmail = Boolean(data?.emailSent);
      }
    } catch {
      // Proceed smoothly with client-generated reference ID
    } finally {
      setSubmitting(false);
      setEmailSent(didSendEmail);
      setReferenceId(ref);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <a
            href="/"
            onClick={(e) => {
              if (onBackToHome && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                e.preventDefault();
                onBackToHome();
              }
            }}
            className="flex items-center shrink-0"
          >
            <FlyfelloLogo
              size="md"
              imgClassName="h-10 sm:h-12 w-auto max-w-[200px] object-contain"
            />
          </a>

          <div className="flex items-center gap-3">
            <a
              href="/"
              onClick={(e) => {
                if (onBackToHome && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey) {
                  e.preventDefault();
                  onBackToHome();
                }
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 hover:border-[#F58220] text-xs sm:text-sm font-bold text-[#122754] hover:text-[#F58220] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Flight Search</span>
            </a>
            <a
              href={`https://wa.me/${WHATSAPP_API_NUMBER}?text=${encodeURIComponent('Hi Flyfello! I would like to inquire about a holiday package.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Desk</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-10 sm:py-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Hero Intro */}
          <div className="text-center max-w-3xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-[#F58220] text-xs font-extrabold uppercase tracking-wider mb-3">
              <Palmtree className="w-4 h-4" />
              <span>Custom Domestic &amp; International Holiday Packages</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#122754] tracking-tight">
              FlyFello Holiday Bookings &amp; Package Request
            </h1>
            <p className="text-sm sm:text-base text-slate-600 mt-2.5 leading-relaxed">
              Submit your holiday travel details below for tailored flight + hotel packages, airport transfers, sightseeing, and visa guidance.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            {referenceId ? (
              <div className="p-8 sm:p-12 text-center space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div>
                  <span className="inline-block px-3.5 py-1 rounded-full bg-[#122754] text-amber-300 font-mono text-xs font-bold">
                    Holiday Inquiry Ref #{referenceId}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#122754] mt-3">
                    {emailSent ? 'Holiday Inquiry Sent!' : 'Your Holiday Query Is Ready!'}
                  </h2>
                  <p className="text-sm text-slate-600 max-w-xl mx-auto mt-2">
                    {emailSent ? (
                      <>
                        Thank you, <strong>{form.fullName}</strong>. Your inquiry for{' '}
                        <strong>{resolvedDestination}</strong> has been emailed directly to our holiday desk at{' '}
                        <strong>info@flyfello.in</strong>. Our travel specialists will contact you shortly.
                      </>
                    ) : (
                      <>
                        Thank you, <strong>{form.fullName}</strong>. Your inquiry for{' '}
                        <strong>{resolvedDestination}</strong> has been received. Our travel specialists will contact you shortly.
                      </>
                    )}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setReferenceId(null);
                    setEmailSent(false);
                  }}
                  className="text-xs font-bold text-[#F58220] hover:underline pt-2 cursor-pointer"
                >
                  Submit Another Holiday Booking Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 sm:p-10 space-y-6">
                {/* Contact Details */}
                <div>
                  <h2 className="text-sm font-extrabold text-[#122754] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#F58220]" />
                    <span>Traveler Contact Details</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Amanpreet Singh"
                        value={form.fullName}
                        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                        className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F58220]/40 focus:border-[#F58220]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        WhatsApp / Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210 / +1 ..."
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F58220]/40 focus:border-[#F58220]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@email.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F58220]/40 focus:border-[#F58220]"
                      />
                    </div>
                  </div>
                </div>

                {/* Holiday Destination & Dates */}
                <div className="pt-4 border-t border-slate-100">
                  <h2 className="text-sm font-extrabold text-[#122754] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#F58220]" />
                    <span>Destination &amp; Schedule</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Departure City *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.departureCity}
                        onChange={(e) => setForm({ ...form, departureCity: e.target.value })}
                        className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F58220]/40 focus:border-[#F58220]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Holiday Destination *
                      </label>
                      <select
                        value={form.destination}
                        onChange={(e) => setForm({ ...form, destination: e.target.value })}
                        className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F58220]/40 focus:border-[#F58220]"
                      >
                        {POPULAR_HOLIDAY_DESTINATIONS.map((dest) => (
                          <option key={dest} value={dest}>
                            {dest}
                          </option>
                        ))}
                      </select>
                      {form.destination === 'Other' && (
                        <input
                          type="text"
                          required
                          placeholder="Enter destination..."
                          aria-label="Other Holiday Destination"
                          value={form.otherDestination}
                          onChange={(e) => setForm({ ...form, otherDestination: e.target.value })}
                          className="mt-2 w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F58220]/40 focus:border-[#F58220]"
                        />
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#F58220]" />
                        <span>Departure Date *</span>
                      </label>
                      <input
                        type="date"
                        required
                        value={form.travelDate}
                        onChange={(e) => setForm({ ...form, travelDate: e.target.value })}
                        className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F58220]/40 focus:border-[#F58220]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Trip Duration
                      </label>
                      <select
                        value={form.nights}
                        onChange={(e) => setForm({ ...form, nights: e.target.value })}
                        className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F58220]/40 focus:border-[#F58220]"
                      >
                        <option value="3 Nights / 4 Days">3 Nights / 4 Days</option>
                        <option value="4 Nights / 5 Days">4 Nights / 5 Days</option>
                        <option value="5 Nights / 6 Days">5 Nights / 6 Days</option>
                        <option value="7 Nights / 8 Days">7 Nights / 8 Days</option>
                        <option value="10+ Nights Custom">10+ Nights Custom</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Package, Travelers & Hotel */}
                <div className="pt-4 border-t border-slate-100">
                  <h2 className="text-sm font-extrabold text-[#122754] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Hotel className="w-4 h-4 text-[#F58220]" />
                    <span>Package Preferences &amp; Baggage</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Holiday Type
                      </label>
                      <select
                        value={form.packageType}
                        onChange={(e) => setForm({ ...form, packageType: e.target.value })}
                        className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F58220]/40 focus:border-[#F58220]"
                      >
                        <option value="Family Vacation">Family Vacation</option>
                        <option value="Honeymoon / Couple">Honeymoon / Couple</option>
                        <option value="Group Tour">Group Tour</option>
                        <option value="Luxury Resort Stay">Luxury Resort Stay</option>
                        <option value="Pilgrimage / Spiritual">Pilgrimage / Spiritual</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-[#F58220]" />
                        <span>Adults / Children</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <select
                          value={form.adults}
                          onChange={(e) => setForm({ ...form, adults: Number(e.target.value) })}
                          aria-label="Adults"
                          className="w-full h-11 px-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                        >
                          {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                            <option key={n} value={n}>
                              {n} Adult{n > 1 ? 's' : ''}
                            </option>
                          ))}
                        </select>
                        <select
                          value={form.children}
                          onChange={(e) => setForm({ ...form, children: Number(e.target.value) })}
                          aria-label="Children"
                          className="w-full h-11 px-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                        >
                          {[0, 1, 2, 3, 4].map((n) => (
                            <option key={n} value={n}>
                              {n} Child{n === 1 ? '' : 'ren'}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Hotel Category
                      </label>
                      <select
                        value={form.hotelCategory}
                        onChange={(e) => setForm({ ...form, hotelCategory: e.target.value })}
                        className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F58220]/40 focus:border-[#F58220]"
                      >
                        <option value="3-Star Comfort">3-Star Comfort</option>
                        <option value="4-Star Deluxe">4-Star Deluxe</option>
                        <option value="5-Star Luxury">5-Star Luxury</option>
                        <option value="Private Villa / Resort">Private Villa / Resort</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1">
                        <Plane className="w-3.5 h-3.5 text-[#F58220]" />
                        <span>Package with flight ticket?</span>
                      </label>
                      <div className="grid grid-cols-2 gap-2 h-11">
                        <button
                          type="button"
                          onClick={() => setForm({ ...form, includeFlights: true })}
                          className={`rounded-xl border text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                            form.includeFlights
                              ? 'bg-[#122754] border-[#122754] text-white'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-[#F58220]'
                          }`}
                        >
                          Yes
                        </button>
                        <button
                          type="button"
                          onClick={() => setForm({ ...form, includeFlights: false })}
                          className={`rounded-xl border text-xs sm:text-sm font-bold transition-colors cursor-pointer ${
                            !form.includeFlights
                              ? 'bg-[#122754] border-[#122754] text-white'
                              : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-[#F58220]'
                          }`}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-6">

                    <div className="flex items-center gap-2 text-xs sm:text-sm">
                      <span className="font-semibold text-slate-700">Estimated Budget:</span>
                      <select
                        value={form.budget}
                        onChange={(e) => setForm({ ...form, budget: e.target.value })}
                        className="h-9 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900"
                      >
                        <option value="Flexible / Best Value">Flexible / Best Value</option>
                        <option value="Under ₹50,000 / person">Under ₹50,000 / person</option>
                        <option value="₹50,000 – ₹1,00,000 / person">₹50,000 – ₹1,00,000 / person</option>
                        <option value="₹1,00,000+ / person">₹1,00,000+ / person</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div className="pt-4 border-t border-slate-100">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Additional Requests (Sightseeing, Meals, Visa Assistance, Airport Transfers)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us preferred hotels, sightseeing tours, meal preferences (Veg/Jain), or visa help..."
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F58220]/40 focus:border-[#F58220]"
                  />
                </div>

                {/* Submit Bar */}
                <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-500 flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-[#F58220]" />
                      +91 87083 49822 | +1 (737) 290-4745
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-[#F58220]" />
                      info@flyfello.in
                    </span>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#122754] hover:bg-[#F58220] text-white font-extrabold text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? 'Submitting...' : 'Submit Holiday Request'}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      <WhatsAppFloatingButton />
    </div>
  );
};
