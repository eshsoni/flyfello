import React, { useState } from 'react';
import {
  FileCheck2,
  Clock,
  Check,
  MessageCircle,
  Mail,
  CheckCircle2,
  AlertCircle,
  Globe2,
  Calendar,
} from 'lucide-react';
import {
  buildWhatsAppVisaQueryUrl,
  triggerWhatsAppLink,
} from '../utils/whatsapp';

interface VisaDestinationInfo {
  country: string;
  visaMode: string;
  processingTime: string;
  validity: string;
  stayDuration: string;
  summary: string;
  checklist: string[];
}

const VISA_DESTINATIONS: VisaDestinationInfo[] = [
  {
    country: 'Dubai / UAE',
    visaMode: 'Tourist e-Visa (Single / Multiple Entry)',
    processingTime: '3 – 5 Working Days',
    validity: '60 Days from Issue',
    stayDuration: '30 Days or 60 Days Stay',
    summary:
      'Express UAE tourist and transit e-Visas processed digitally without embassy visits. Ideal for family holidays, Dubai stopovers, and business trips.',
    checklist: [
      'Scanned color copy of passport front & last page (6+ months validity)',
      'Recent passport-size photograph on plain white background',
      'Confirmed return flight itinerary & hotel reservation (FlyFello can bundle)',
      'PAN Card copy (for Indian passport holders)',
    ],
  },
  {
    country: 'Thailand',
    visaMode: 'Tourist Visa & Digital Arrival Card Guidance',
    processingTime: '2 – 4 Working Days',
    validity: '90 Days',
    stayDuration: 'Up to 60 Days Stay',
    summary:
      'Complete documentation review, e-Visa filing, and Thailand Digital Arrival Card (TDAC) guidance for families, couples, and group travelers.',
    checklist: [
      'Passport valid for at least 6 months from arrival date',
      'Confirmed onward/return flight tickets & hotel stay bookings',
      'Bank statement showing sufficient travel balance (last 3 months)',
      'Clear digital passport photograph',
    ],
  },
  {
    country: 'Singapore',
    visaMode: 'Authorized Agent e-Visa Submission',
    processingTime: '4 – 6 Working Days',
    validity: 'Up to 2 Years (Discretionary)',
    stayDuration: 'Up to 30 Days per Visit',
    summary:
      'End-to-end Singapore tourist and business visa preparation, Form 14A verification, cover letters, and embassy submission assistance.',
    checklist: [
      'Original passport with minimum 6 months validity & 2 blank pages',
      '2 recent matte-finish color photos (35mm x 45mm, white background, 80% face)',
      'Last 3 months stamped bank statement & employment/business proof',
      'Flight itinerary + Singapore hotel confirmation or local LOI (Form V39A)',
    ],
  },
  {
    country: 'Bali / Indonesia',
    visaMode: 'e-VOA & B211A Long-Stay Tourist e-Visa',
    processingTime: '2 – 3 Working Days',
    validity: '90 Days',
    stayDuration: '30 Days (Extendable) or 60 Days',
    summary:
      'Skip long arrival queues at Denpasar Airport (DPS) with pre-approved Indonesia e-VOA and Bali tourism levy guidance.',
    checklist: [
      'Passport bio page scan with 6+ months remaining validity',
      'Passport photo in digital JPEG format',
      'Return ticket out of Indonesia & confirmed Bali accommodation',
    ],
  },
  {
    country: 'Vietnam',
    visaMode: 'Vietnam Tourist e-Visa (Single / Multiple Entry)',
    processingTime: '4 – 6 Working Days',
    validity: '30 to 90 Days',
    stayDuration: 'Up to 90 Days',
    summary:
      'Official Vietnam e-Visa filing with accurate port-of-entry selection (Hanoi, Ho Chi Minh City, Da Nang, Phu Quoc) and error-free passport matching.',
    checklist: [
      'Clear passport bio page scan (minimum 6 months validity)',
      'Digital portrait photo looking straight without glasses',
      'Exact arrival airport & hotel address details',
    ],
  },
  {
    country: 'Schengen (Europe)',
    visaMode: 'VFS / Embassy Tourist Sticker Visa File Prep',
    processingTime: '15 – 21 Working Days Post-Biometrics',
    validity: 'As Issued by Consulate',
    stayDuration: 'Up to 90 Days in 180 Days',
    summary:
      'Comprehensive Schengen documentation support: appointment scheduling, verifiable flight & hotel itineraries, Schengen travel insurance, and day-by-day cover letters.',
    checklist: [
      'Valid passport + copies of previous Schengen/US/UK/Canada visas',
      '6 months personal bank statements + ITR for last 3 years',
      'Employment NOC / leave letter or business registration proof',
      'Minimum €30,000 Schengen travel medical insurance & hotel/flight itinerary',
    ],
  },
  {
    country: 'USA / Canada / UK',
    visaMode: 'B1/B2 · Visitor / Super Visa · UK Standard Visitor',
    processingTime: 'File Prep in 3 – 5 Days',
    validity: '6 Months to 10 Years',
    stayDuration: 'Up to 6 Months per Entry',
    summary:
      'Guidance for DS-160 / IRCC / UKVI applications, parent visitor & Super Visa insurance itineraries, sponsor invitation drafting, and confirmed travel bookings.',
    checklist: [
      'Valid passport & travel history summary',
      'Financial ties, bank statements & tax returns',
      'Host invitation letter, PR/citizenship proof (for visiting family)',
      'Confirmed travel itinerary & Super Visa medical insurance (if applicable)',
    ],
  },
  {
    country: 'India e-Visa / OCI',
    visaMode: 'India e-Tourist / e-Business Visa & Entry Help',
    processingTime: '3 – 5 Working Days',
    validity: '30 Days / 1 Year / 5 Years',
    stayDuration: 'Up to 90 / 180 Days',
    summary:
      'Dedicated India e-Visa and Air Suvidha guidance for US, Canadian, and UK passport holders flying with FlyFello to Delhi, Amritsar, or Mumbai.',
    checklist: [
      'US/Canada/UK/Foreign passport valid for at least 6 months',
      'Square white-background portrait photo',
      'Previous Indian passport / surrender details (if applicable)',
    ],
  },
];

interface VisaFormState {
  country: string;
  otherCountry: string;
  visaType: string;
  nationality: string;
  departureCity: string;
  travelDate: string;
  applicants: number;
  fullName: string;
  phone: string;
  email: string;
  notes: string;
}

export const VisaPage: React.FC = () => {
  const [selectedVisa, setSelectedVisa] = useState<VisaDestinationInfo>(VISA_DESTINATIONS[0]);
  const [form, setForm] = useState<VisaFormState>({
    country: VISA_DESTINATIONS[0].country,
    otherCountry: '',
    visaType: 'Tourist Visa',
    nationality: 'Indian Passport',
    departureCity: 'New Delhi / Mumbai / Toronto',
    travelDate: '2026-12-15',
    applicants: 1,
    fullName: '',
    phone: '',
    email: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof VisaFormState, string>>>({});
  const [submittedWaUrl, setSubmittedWaUrl] = useState<string | null>(null);

  const handleSelectCountry = (dest: VisaDestinationInfo) => {
    setSelectedVisa(dest);
    setSubmittedWaUrl(null);
    setForm((prev) => ({ ...prev, country: dest.country, otherCountry: '' }));
  };

  const updateField = <K extends keyof VisaFormState>(field: K, value: VisaFormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Partial<Record<keyof VisaFormState, string>> = {};

    if (form.country === 'Other' && !form.otherCountry.trim()) {
      nextErrors.otherCountry = 'Please enter the destination country.';
    }
    if (form.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter applicant full name.';
    }
    const phoneDigits = form.phone.replace(/\D/g, '');
    if (phoneDigits.length < 7) {
      nextErrors.phone = 'Please enter a valid WhatsApp / phone number.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!form.travelDate) {
      nextErrors.travelDate = 'Please select intended travel date.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const resolvedCountry =
      form.country === 'Other' ? form.otherCountry.trim() : form.country;

    const waUrl = buildWhatsAppVisaQueryUrl({
      country: resolvedCountry,
      visaType: form.visaType,
      nationality: form.nationality.trim() || 'Indian Passport',
      travelDate: form.travelDate,
      applicants: form.applicants,
      departureCity: form.departureCity.trim() || 'India / North America',
      fullName: form.fullName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      notes: form.notes.trim(),
    });

    setSubmittedWaUrl(waUrl);
    triggerWhatsAppLink(waUrl);
  };

  return (
    <div className="flex-1 bg-slate-50">
      {/* Header Banner */}
      <section className="bg-[#122754] text-white py-10 sm:py-14 px-4 sm:px-6 lg:px-8 border-b border-[#1d3975]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
              Tourist e-Visas · Sticker Visa Files · Travel Insurance
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight [text-wrap:balance]">
              Global Visa Assistance &amp; Document Review
            </h1>
            <p className="text-sm sm:text-base text-slate-200 mt-3 leading-relaxed">
              Accurate checklist review, cover letters, flight &amp; hotel itineraries, and timely e-Visa submissions for Dubai, Thailand, Singapore, Bali, Vietnam, Schengen, USA, Canada, UK &amp; India.
            </p>
          </div>

          <div className="mt-7 flex items-center gap-2 overflow-x-auto pb-1">
            {VISA_DESTINATIONS.map((item) => {
              const active = selectedVisa.country === item.country;
              return (
                <button
                  key={item.country}
                  type="button"
                  onClick={() => handleSelectCountry(item)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#F58220] text-white'
                      : 'bg-white/10 text-slate-100 hover:bg-white/20'
                  }`}
                >
                  {item.country}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Split Section: Checklist Guide Left + Inquiry Form Right */}
      <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Selected Country Checklist & Processing Overview */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
              <div>
                <div className="text-xs font-semibold text-slate-500 flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-[#F58220]" />
                  <span>{selectedVisa.country}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedVisa.visaMode}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#122754] mt-2">
                  {selectedVisa.country} Visa Requirements
                </h2>
                <p className="text-sm sm:text-[15px] text-slate-600 mt-2 leading-relaxed">
                  {selectedVisa.summary}
                </p>
              </div>

              {/* Tabular Key Facts */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#F58220]" />
                    <span>Processing</span>
                  </div>
                  <div className="text-sm font-extrabold text-[#122754] mt-1 tabular-nums">
                    {selectedVisa.processingTime}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#F58220]" />
                    <span>Validity</span>
                  </div>
                  <div className="text-sm font-extrabold text-[#122754] mt-1 tabular-nums">
                    {selectedVisa.validity}
                  </div>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                    <FileCheck2 className="w-3.5 h-3.5 text-[#F58220]" />
                    <span>Stay Allowed</span>
                  </div>
                  <div className="text-sm font-extrabold text-[#122754] mt-1 tabular-nums">
                    {selectedVisa.stayDuration}
                  </div>
                </div>
              </div>

              {/* Document Checklist */}
              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-sm font-extrabold text-[#122754] uppercase tracking-wider mb-3">
                  Required Documents Checklist
                </h3>
                <ul className="space-y-2.5 text-sm text-slate-700">
                  {selectedVisa.checklist.map((doc) => (
                    <li key={doc} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Editorial Steps */}
              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-sm font-extrabold text-[#122754] uppercase tracking-wider mb-3">
                  How FlyFello Handles Your Visa
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-600">
                  <div>
                    <div className="font-extrabold text-[#122754] mb-1">01. File Audit</div>
                    <p>Send passport scans on WhatsApp. Our team verifies photo size, validity &amp; dates.</p>
                  </div>
                  <div>
                    <div className="font-extrabold text-[#122754] mb-1">02. Form &amp; Itinerary</div>
                    <p>We prepare error-free visa forms, cover letters, and embassy-compliant flight/hotel itineraries.</p>
                  </div>
                  <div>
                    <div className="font-extrabold text-[#122754] mb-1">03. Approval Tracking</div>
                    <p>Receive e-Visas directly on WhatsApp &amp; email, ready for airport check-in.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Visa Inquiry Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 sm:p-7">
              {submittedWaUrl ? (
                <div className="py-6 text-center space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-[#122754]">
                      Visa Inquiry Ready on WhatsApp
                    </h3>
                    <p className="text-sm text-slate-600 mt-1.5">
                      Thank you, <strong>{form.fullName}</strong>. Tap below to send your{' '}
                      <strong>{form.country === 'Other' ? form.otherCountry : form.country}</strong>{' '}
                      visa request directly to our specialists.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2.5 pt-2">
                    <a
                      href={submittedWaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-sm flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Open WhatsApp Visa Desk</span>
                    </a>
                    <a
                      href={`mailto:info@flyfello.in?subject=${encodeURIComponent(
                        `Visa Assistance Inquiry - ${form.country === 'Other' ? form.otherCountry : form.country}`
                      )}&body=${encodeURIComponent(
                        `Name: ${form.fullName}\nPhone: ${form.phone}\nEmail: ${form.email}\nCountry: ${form.country === 'Other' ? form.otherCountry : form.country}\nVisa Type: ${form.visaType}\nNationality: ${form.nationality}\nTravel Date: ${form.travelDate}\nApplicants: ${form.applicants}\nNotes: ${form.notes}`
                      )}`}
                      className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-[#122754] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Or Email info@flyfello.in</span>
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSubmittedWaUrl(null)}
                    className="text-xs font-bold text-[#F58220] hover:underline cursor-pointer"
                  >
                    Submit Another Visa Query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="pb-3 border-b border-slate-100">
                    <h2 className="text-lg font-extrabold text-[#122754]">
                      Request Visa Assistance
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Submit applicant details to receive exact fees and document instructions on WhatsApp.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Destination Country *
                      </label>
                      <select
                        value={form.country}
                        onChange={(e) => {
                          updateField('country', e.target.value);
                          const matched = VISA_DESTINATIONS.find((d) => d.country === e.target.value);
                          if (matched) setSelectedVisa(matched);
                        }}
                        className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900"
                      >
                        {VISA_DESTINATIONS.map((d) => (
                          <option key={d.country} value={d.country}>
                            {d.country}
                          </option>
                        ))}
                        <option value="Australia">Australia</option>
                        <option value="Japan / South Korea">Japan / South Korea</option>
                        <option value="Other">Other Country</option>
                      </select>
                      {form.country === 'Other' && (
                        <>
                          <input
                            type="text"
                            placeholder="Enter country name..."
                            value={form.otherCountry}
                            onChange={(e) => updateField('otherCountry', e.target.value)}
                            className={`mt-2 w-full h-10 px-3 border rounded-xl text-sm ${
                              errors.otherCountry
                                ? 'border-rose-400 bg-rose-50/40'
                                : 'border-slate-200 bg-slate-50'
                            }`}
                          />
                          {errors.otherCountry && (
                            <p className="mt-1 text-[11px] text-rose-600">{errors.otherCountry}</p>
                          )}
                        </>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Visa Category
                      </label>
                      <select
                        value={form.visaType}
                        onChange={(e) => updateField('visaType', e.target.value)}
                        className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900"
                      >
                        <option value="Tourist Visa">Tourist Visa</option>
                        <option value="Business Visa">Business Visa</option>
                        <option value="Family / Visit Visa">Family / Visit Visa</option>
                        <option value="Transit Visa">Transit Visa</option>
                        <option value="Student / Dependent Visa">Student / Dependent Visa</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Passport Nationality
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Indian, Canadian, US"
                        value={form.nationality}
                        onChange={(e) => updateField('nationality', e.target.value)}
                        className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Departure City
                      </label>
                      <input
                        type="text"
                        placeholder="Delhi, Mumbai, Toronto..."
                        value={form.departureCity}
                        onChange={(e) => updateField('departureCity', e.target.value)}
                        className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Intended Travel Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={form.travelDate}
                        onChange={(e) => updateField('travelDate', e.target.value)}
                        className={`w-full h-10 px-3 border rounded-xl text-sm ${
                          errors.travelDate
                            ? 'border-rose-400 bg-rose-50/40'
                            : 'border-slate-200 bg-slate-50'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Number of Applicants
                      </label>
                      <select
                        value={form.applicants}
                        onChange={(e) => updateField('applicants', Number(e.target.value))}
                        className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900"
                      >
                        {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                          <option key={n} value={n}>
                            {n} Applicant{n > 1 ? 's' : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Applicant Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Navjot Kaur"
                        value={form.fullName}
                        onChange={(e) => updateField('fullName', e.target.value)}
                        className={`w-full h-10 px-3 border rounded-xl text-sm ${
                          errors.fullName
                            ? 'border-rose-400 bg-rose-50/40'
                            : 'border-slate-200 bg-slate-50'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-[11px] text-rose-600">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        WhatsApp / Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210 / +1 ..."
                        value={form.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        className={`w-full h-10 px-3 border rounded-xl text-sm ${
                          errors.phone
                            ? 'border-rose-400 bg-rose-50/40'
                            : 'border-slate-200 bg-slate-50'
                        }`}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-[11px] text-rose-600">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="name@email.com"
                        value={form.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        className={`w-full h-10 px-3 border rounded-xl text-sm ${
                          errors.email
                            ? 'border-rose-400 bg-rose-50/40'
                            : 'border-slate-200 bg-slate-50'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-[11px] text-rose-600">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Notes (Previous refusals, urgent dates, family sponsorship)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Share travel timeline or questions..."
                        value={form.notes}
                        onChange={(e) => updateField('notes', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  {Object.keys(errors).length > 0 && (
                    <div
                      role="alert"
                      className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>Please complete all highlighted fields.</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 px-5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white font-extrabold text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Send Visa Inquiry on WhatsApp</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
