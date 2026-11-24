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
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { FlyfelloLogo } from './FlyfelloLogo';
import { WHATSAPP_API_NUMBER } from '../utils/whatsapp';
import { WhatsAppFloatingButton } from './WhatsAppFloatingButton';
import { TopInternationalDestinations } from './TopInternationalDestinations';

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
  embedded?: boolean;
}

export const HolidayBookingsPage: React.FC<HolidayBookingsPageProps> = ({
  onBackToHome,
  embedded = false,
}) => {
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
  const [pendingReason, setPendingReason] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof HolidayFormState, string>>>({});

  const resolvedDestination =
    form.destination === 'Other'
      ? form.otherDestination.trim() || 'Other'
      : form.destination;

  const updateField = <K extends keyof HolidayFormState>(
    field: K,
    value: HolidayFormState[K]
  ) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validateForm = (): boolean => {
    const nextErrors: Partial<Record<keyof HolidayFormState, string>> = {};

    if (form.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }
    const phoneDigits = form.phone.replace(/\D/g, '');
    if (phoneDigits.length < 7) {
      nextErrors.phone = 'Please enter a valid WhatsApp / phone number.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!form.departureCity.trim()) {
      nextErrors.departureCity = 'Please enter your departure city.';
    }
    if (!form.destination.trim()) {
      nextErrors.destination = 'Please select a holiday destination.';
    }
    if (form.destination === 'Other' && !form.otherDestination.trim()) {
      nextErrors.otherDestination = 'Please enter your destination.';
    }
    if (!form.travelDate.trim()) {
      nextErrors.travelDate = 'Please select a departure date.';
    }
    if (!form.nights.trim()) {
      nextErrors.nights = 'Please select trip duration.';
    }
    if (!form.packageType.trim()) {
      nextErrors.packageType = 'Please select a holiday type.';
    }
    if (!form.adults || form.adults < 1) {
      nextErrors.adults = 'Please select at least 1 adult.';
    }
    if (!form.hotelCategory.trim()) {
      nextErrors.hotelCategory = 'Please select a hotel category.';
    }
    if (!form.budget.trim()) {
      nextErrors.budget = 'Please select an estimated budget.';
    }
    if (!form.notes.trim()) {
      nextErrors.notes = "Please fill in additional requests (or type 'None').";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const sendInquiry = async () => {
    setSubmitting(true);
    let ref = referenceId || `FF-HOL-${Math.floor(100000 + Math.random() * 900000)}`;
    let didSendEmail = false;
    let reason: string | null = null;

    const parsedPayload = {
      referenceId: ref,
      fullName: form.fullName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      departureCity: form.departureCity.trim(),
      destination: resolvedDestination,
      packageType: form.packageType,
      travelDate: form.travelDate,
      nights: form.nights,
      adults: form.adults,
      children: form.children,
      hotelCategory: form.hotelCategory,
      includeFlights: form.includeFlights,
      budget: form.budget,
      notes: form.notes.trim(),
    };
    const payload = JSON.stringify(parsedPayload);

    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        const response = await fetch('/api/holiday-inquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: payload,
        });
        const contentType = response.headers.get('content-type') || '';
        if (response.ok && contentType.includes('application/json')) {
          const data = await response.json();
          if (data?.referenceId) {
            ref = data.referenceId;
          }
          didSendEmail = Boolean(data?.emailSent);
          reason = didSendEmail ? null : data?.reason || 'SMTP_DELIVERY_FAILED';
          break;
        } else {
          reason = `SERVER_HTTP_${response.status}`;
          if (response.status === 404) {
            break;
          }
        }
      } catch {
        reason = 'NETWORK_UNREACHABLE';
      }
    }

    // Static-hosting / fallback delivery: forward to VITE_INQUIRY_WEBHOOK_URL or Formspree endpoint if backend route is unavailable or email wasn't sent
    const envWebhook = (import.meta.env.VITE_INQUIRY_WEBHOOK_URL as string | undefined)?.trim();
    const fallbackWebhook =
      envWebhook && envWebhook !== 'MY_INQUIRY_WEBHOOK_URL'
        ? envWebhook
        : 'https://formspree.io/f/xaeojlae';

    if (!didSendEmail && fallbackWebhook) {
      try {
        const webhookPayload = {
          _subject: `New Holiday Inquiry (${ref}) - ${resolvedDestination} | ${parsedPayload.fullName}`,
          _replyto: parsedPayload.email,
          referenceId: ref,
          fullName: parsedPayload.fullName,
          phone: parsedPayload.phone,
          email: parsedPayload.email,
          departureCity: parsedPayload.departureCity,
          destination: parsedPayload.destination,
          departureDate: parsedPayload.travelDate,
          tripDuration: parsedPayload.nights,
          holidayType: parsedPayload.packageType,
          travelers: `${parsedPayload.adults} Adult(s), ${parsedPayload.children} Child(ren)`,
          hotelCategory: parsedPayload.hotelCategory,
          packageWithFlightTicket: parsedPayload.includeFlights ? 'Yes' : 'No (Land Package Only)',
          estimatedBudget: parsedPayload.budget,
          additionalRequests: parsedPayload.notes,
        };
        const webhookRes = await fetch(fallbackWebhook, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(webhookPayload),
        });
        const webhookData = await webhookRes.json().catch(() => null);
        if (webhookRes.ok && webhookData?.ok !== false) {
          didSendEmail = true;
          reason = null;
        }
      } catch {
        // Keep original failure reason so fallback buttons remain visible
      }
    }

    setSubmitting(false);
    setEmailSent(didSendEmail);
    setPendingReason(reason);
    setReferenceId(ref);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (!validateForm()) return;
    await sendInquiry();
  };

  return (
    <div className={embedded ? 'flex-1 bg-slate-50 flex flex-col text-slate-900 font-["Plus_Jakarta_Sans",sans-serif]' : 'min-h-screen bg-slate-50 flex flex-col text-slate-900 font-["Plus_Jakarta_Sans",sans-serif]'}>
      {!embedded && (
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
      )}

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

          <TopInternationalDestinations compact onBackToHome={onBackToHome} />

          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            {referenceId ? (
              <div className="p-8 sm:p-12 text-center space-y-6">
                <div
                  className={`w-16 h-16 rounded-2xl border flex items-center justify-center mx-auto ${
                    emailSent
                      ? 'bg-emerald-50 text-emerald-600 border-emerald-200'
                      : 'bg-amber-50 text-amber-600 border-amber-200'
                  }`}
                >
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div>
                  <span className="inline-block px-3.5 py-1 rounded-full bg-[#122754] text-amber-300 font-mono text-xs font-bold">
                    Holiday Inquiry Ref #{referenceId}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-[#122754] mt-3">
                    {emailSent ? 'Holiday Inquiry Sent!' : 'Holiday Inquiry Logged (Email Pending)'}
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
                        <strong>{resolvedDestination}</strong> was logged, but automatic email delivery could not complete right now
                        {pendingReason ? ` (${pendingReason})` : ''}. You can retry below or message us directly on WhatsApp.
                      </>
                    )}
                  </p>
                </div>

                {!emailSent && (
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-xl mx-auto">
                    <button
                      type="button"
                      disabled={submitting}
                      onClick={sendInquiry}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#122754] hover:bg-[#F58220] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>Retrying...</span>
                        </>
                      ) : (
                        <span>Retry Email Delivery</span>
                      )}
                    </button>
                    <a
                      href={`https://wa.me/${WHATSAPP_API_NUMBER}?text=${encodeURIComponent(
                        `Hi FlyFello! Holiday Inquiry Ref ${referenceId}\nName: ${form.fullName}\nPhone: ${form.phone}\nEmail: ${form.email}\nFrom: ${form.departureCity}\nDestination: ${resolvedDestination}\nDate: ${form.travelDate} (${form.nights})\nType: ${form.packageType}\nTravelers: ${form.adults} Adult(s), ${form.children} Child(ren)\nHotel: ${form.hotelCategory}\nFlight Ticket: ${form.includeFlights ? 'Yes' : 'No'}\nBudget: ${form.budget}\nNotes: ${form.notes}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Send via WhatsApp</span>
                    </a>
                    <a
                      href={`mailto:info@flyfello.in?subject=${encodeURIComponent(
                        `Holiday Booking Inquiry (${referenceId}) - ${resolvedDestination}`
                      )}&body=${encodeURIComponent(
                        `Holiday Inquiry Ref: ${referenceId}\nName: ${form.fullName}\nPhone: ${form.phone}\nEmail: ${form.email}\nDeparture City: ${form.departureCity}\nDestination: ${resolvedDestination}\nDate: ${form.travelDate} (${form.nights})\nHoliday Type: ${form.packageType}\nTravelers: ${form.adults} Adult(s), ${form.children} Child(ren)\nHotel Category: ${form.hotelCategory}\nPackage with Flight Ticket: ${form.includeFlights ? 'Yes' : 'No (Land Package Only)'}\nBudget: ${form.budget}\nNotes: ${form.notes}`
                      )}`}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-[#122754] font-bold text-xs sm:text-sm flex items-center justify-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Send via Email</span>
                    </a>
                  </div>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setReferenceId(null);
                    setEmailSent(false);
                    setPendingReason(null);
                  }}
                  className="text-xs font-bold text-[#F58220] hover:underline pt-2 cursor-pointer"
                >
                  Submit Another Holiday Booking Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-10 space-y-6">
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
                        autoComplete="name"
                        placeholder="e.g. Amanpreet Singh"
                        value={form.fullName}
                        onChange={(e) => updateField('fullName', e.target.value)}
                        className={`w-full h-11 px-3.5 border rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 ${
                          errors.fullName
                            ? 'bg-rose-50/40 border-rose-400 focus:ring-rose-400/40 focus:border-rose-500'
                            : 'bg-slate-50 border-slate-200 focus:ring-[#F58220]/40 focus:border-[#F58220]'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-xs font-medium text-rose-600">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        WhatsApp / Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        autoComplete="tel"
                        inputMode="tel"
                        placeholder="+91 98765 43210 / +1 ..."
                        value={form.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        className={`w-full h-11 px-3.5 border rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 ${
                          errors.phone
                            ? 'bg-rose-50/40 border-rose-400 focus:ring-rose-400/40 focus:border-rose-500'
                            : 'bg-slate-50 border-slate-200 focus:ring-[#F58220]/40 focus:border-[#F58220]'
                        }`}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs font-medium text-rose-600">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        autoComplete="email"
                        autoCapitalize="none"
                        autoCorrect="off"
                        inputMode="email"
                        placeholder="name@email.com"
                        value={form.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        className={`w-full h-11 px-3.5 border rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 ${
                          errors.email
                            ? 'bg-rose-50/40 border-rose-400 focus:ring-rose-400/40 focus:border-rose-500'
                            : 'bg-slate-50 border-slate-200 focus:ring-[#F58220]/40 focus:border-[#F58220]'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs font-medium text-rose-600">{errors.email}</p>
                      )}
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
                        onChange={(e) => updateField('departureCity', e.target.value)}
                        className={`w-full h-11 px-3.5 border rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 ${
                          errors.departureCity
                            ? 'bg-rose-50/40 border-rose-400 focus:ring-rose-400/40 focus:border-rose-500'
                            : 'bg-slate-50 border-slate-200 focus:ring-[#F58220]/40 focus:border-[#F58220]'
                        }`}
                      />
                      {errors.departureCity && (
                        <p className="mt-1 text-xs font-medium text-rose-600">{errors.departureCity}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Holiday Destination *
                      </label>
                      <select
                        value={form.destination}
                        onChange={(e) => {
                          updateField('destination', e.target.value);
                          if (e.target.value !== 'Other') {
                            updateField('otherDestination', '');
                          }
                        }}
                        className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#F58220]/40 focus:border-[#F58220]"
                      >
                        {POPULAR_HOLIDAY_DESTINATIONS.map((dest) => (
                          <option key={dest} value={dest}>
                            {dest}
                          </option>
                        ))}
                      </select>
                      {form.destination === 'Other' && (
                        <>
                          <input
                            type="text"
                            required
                            placeholder="Enter destination..."
                            aria-label="Other Holiday Destination"
                            value={form.otherDestination}
                            onChange={(e) => updateField('otherDestination', e.target.value)}
                            className={`mt-2 w-full h-11 px-3.5 border rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 ${
                              errors.otherDestination
                                ? 'bg-rose-50/40 border-rose-400 focus:ring-rose-400/40 focus:border-rose-500'
                                : 'bg-slate-50 border-slate-200 focus:ring-[#F58220]/40 focus:border-[#F58220]'
                            }`}
                          />
                          {errors.otherDestination && (
                            <p className="mt-1 text-xs font-medium text-rose-600">
                              {errors.otherDestination}
                            </p>
                          )}
                        </>
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
                        onChange={(e) => updateField('travelDate', e.target.value)}
                        className={`w-full h-11 px-3 border rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 ${
                          errors.travelDate
                            ? 'bg-rose-50/40 border-rose-400 focus:ring-rose-400/40 focus:border-rose-500'
                            : 'bg-slate-50 border-slate-200 focus:ring-[#F58220]/40 focus:border-[#F58220]'
                        }`}
                      />
                      {errors.travelDate && (
                        <p className="mt-1 text-xs font-medium text-rose-600">{errors.travelDate}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Trip Duration *
                      </label>
                      <select
                        value={form.nights}
                        onChange={(e) => updateField('nights', e.target.value)}
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
                    Additional Requests (Sightseeing, Meals, Visa Assistance, Airport Transfers) *
                  </label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Tell us preferred hotels, sightseeing tours, meal preferences (Veg/Jain), visa help, or write 'None'..."
                    value={form.notes}
                    onChange={(e) => updateField('notes', e.target.value)}
                    className={`w-full px-3.5 py-2.5 border rounded-xl text-sm text-slate-900 focus:outline-none focus:ring-2 ${
                      errors.notes
                        ? 'bg-rose-50/40 border-rose-400 focus:ring-rose-400/40 focus:border-rose-500'
                        : 'bg-slate-50 border-slate-200 focus:ring-[#F58220]/40 focus:border-[#F58220]'
                    }`}
                  />
                  {errors.notes && (
                    <p className="mt-1 text-xs font-medium text-rose-600">{errors.notes}</p>
                  )}
                </div>

                {Object.keys(errors).length > 0 && (
                  <div
                    role="alert"
                    className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs sm:text-sm font-medium text-rose-700"
                  >
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                    <span>Please complete all highlighted fields before submitting your holiday request.</span>
                  </div>
                )}

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
                    aria-busy={submitting}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#122754] hover:bg-[#F58220] text-white font-extrabold text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:bg-[#122754]"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Holiday Request</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      {!embedded && <WhatsAppFloatingButton />}
    </div>
  );
};
