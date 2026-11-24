import React, { useState } from 'react';
import {
  MapPin,
  X,
  Send,
  Loader2,
  CheckCircle2,
  PhoneCall,
  ArrowLeft,
  AlertCircle,
  Compass,
  Mail,
  MessageCircle,
} from 'lucide-react';
import baliImg from '../assets/images/hotel_bali_villa_1795512011823.jpg';
import dubaiImg from '../assets/images/hotel_dubai_luxury_1795512011353.jpg';
import thailandImg from '../assets/images/hotel_thailand_resort_1795512013444.jpg';
import { WHATSAPP_API_NUMBER } from '../utils/whatsapp';

export interface InternationalPackage {
  id: 'bali' | 'dubai' | 'thailand';
  name: string;
  country: string;
  startingInr: number;
  startingUsd: number;
  duration: string;
  image: string;
  shortDescription: string;
  fullDescription: string;
  viewpoints: {
    name: string;
    detail: string;
  }[];
  inclusions: string[];
}

export const TOP_INTERNATIONAL_PACKAGES: InternationalPackage[] = [
  {
    id: 'bali',
    name: 'Bali',
    country: 'Indonesia',
    startingInr: 17999,
    startingUsd: 215,
    duration: '4 Nights / 5 Days',
    image: baliImg,
    shortDescription:
      'Tropical Ubud rainforest pool villas, dramatic coastal cliffs, coral beaches, and iconic Balinese temples.',
    fullDescription:
      'Discover the Island of the Gods with curated stays split between lush Ubud jungle resorts and Seminyak beachfront hotels. Ideal for couples, families, and small groups looking for scenic cliffs, private pool relaxation, and effortless local transfers.',
    viewpoints: [
      {
        name: 'Kelingking Cliff & Nusa Penida Viewpoint',
        detail: 'Panoramic turquoise ocean vistas and dramatic limestone coastline.',
      },
      {
        name: 'Uluwatu Cliff Temple Sunset',
        detail: '70-meter oceanfront cliff viewpoint with traditional Kecak sunset performance.',
      },
      {
        name: 'Tegallalang Emerald Rice Terraces',
        detail: 'Iconic stepped valley viewpoints, jungle swings, and Ubud valley cafes.',
      },
      {
        name: 'Handara Gate & Ulun Danu Beratan Lake',
        detail: 'Misty highland mountain backdrop and lakeside heritage temple grounds.',
      },
    ],
    inclusions: [
      '4-Star Hotel / Villa Stay with Daily Breakfast',
      'Private Ngurah Rai (DPS) Airport Pickup & Drop',
      'Full-Day Ubud & Kintamani Scenic Sightseeing',
      'Visa & Flight Add-On Assistance Available',
    ],
  },
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'United Arab Emirates',
    startingInr: 29999,
    startingUsd: 359,
    duration: '4 Nights / 5 Days',
    image: dubaiImg,
    shortDescription:
      'Futuristic skyscrapers, golden desert dunes, Marina waterfront cruises, and world-class shopping.',
    fullDescription:
      'Experience the best of Dubai with centrally located 4-star or 5-star stays, desert safari adventure with BBQ dinner, Dubai Marina evening dhow cruise, and panoramic skyline viewpoints — customizable with UAE Tourist Visa and return flights.',
    viewpoints: [
      {
        name: 'Burj Khalifa At The Top (124th & 125th Floor)',
        detail: '360-degree skyline & Arabian Gulf views above Downtown Dubai Fountains.',
      },
      {
        name: 'The View at The Palm Jumeirah',
        detail: 'Observatory deck overlooking the iconic Palm crescent, Marina, and Atlantis.',
      },
      {
        name: 'Lahbab Red Dunes Sunset Point',
        detail: 'Golden hour dune bashing views followed by desert camp dinner & live shows.',
      },
      {
        name: 'Dubai Marina & Bluewaters Waterfront',
        detail: 'Evening dhow cruise past illuminated Marina towers and Ain Dubai wheel.',
      },
    ],
    inclusions: [
      '4-Star Hotel Accommodation with Daily Breakfast',
      'Return DXB Airport Private Transfers',
      'Half-Day Dubai City Tour + Desert Safari with BBQ Dinner',
      'Dubai Tourist e-Visa & Burj Khalifa Ticket Options',
    ],
  },
  {
    id: 'thailand',
    name: 'Thailand',
    country: 'Phuket · Krabi · Bangkok',
    startingInr: 19999,
    startingUsd: 239,
    duration: '4 Nights / 5 Days',
    image: thailandImg,
    shortDescription:
      'Turquoise Andaman islands, limestone sea cliffs, sunset capes, floating markets, and vibrant city nights.',
    fullDescription:
      'Unwind along Thailand’s turquoise Andaman coast in Phuket & Krabi or combine tropical islands with Bangkok city shopping. Includes island speedboat tours, scenic coastal capes, daily breakfast, and seamless airport-to-hotel transfers.',
    viewpoints: [
      {
        name: 'Phi Phi & Maya Bay Viewpoint',
        detail: 'Emerald lagoons surrounded by towering limestone cliffs in the Andaman Sea.',
      },
      {
        name: 'Promthep Cape & Big Buddha Hilltop, Phuket',
        detail: 'Southernmost ocean sunset overlook and 360-degree island bay panorama.',
      },
      {
        name: 'Phang Nga Bay (James Bond Island)',
        detail: 'Famous karst sea stacks and serene sea-canoe caves across calm emerald water.',
      },
      {
        name: 'Chao Phraya River & Wat Arun Twilight View, Bangkok',
        detail: 'Illuminated riverside spires seen from evening dinner cruises.',
      },
    ],
    inclusions: [
      '4-Star Resort Stay with Daily Breakfast',
      'Airport Pickup & Inter-Hotel Transfers',
      'Phi Phi Island or 4-Island Speedboat Excursion',
      'Thailand Arrival & Flight Add-On Support',
    ],
  },
];

interface InfoFormState {
  fullName: string;
  phone: string;
  email: string;
  departureCity: string;
  travelDate: string;
  travelers: number;
  notes: string;
}

interface TopInternationalDestinationsProps {
  onBackToHome?: () => void;
  compact?: boolean;
}

export const TopInternationalDestinations: React.FC<TopInternationalDestinationsProps> = ({
  onBackToHome,
  compact = false,
}) => {
  const [selectedPkg, setSelectedPkg] = useState<InternationalPackage | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const [form, setForm] = useState<InfoFormState>({
    fullName: '',
    phone: '',
    email: '',
    departureCity: 'New Delhi / Mumbai / Toronto',
    travelDate: '2026-12-15',
    travelers: 2,
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof InfoFormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{
    referenceId: string;
    emailSent: boolean;
    reason: string | null;
  } | null>(null);

  const openPackageModal = (pkg: InternationalPackage) => {
    setSelectedPkg(pkg);
    setResult(null);
    setErrors({});
  };

  const closeModal = () => {
    setSelectedPkg(null);
    setResult(null);
    setErrors({});
  };

  const handleBackToHomeClick = () => {
    closeModal();
    if (onBackToHome) {
      onBackToHome();
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const updateField = <K extends keyof InfoFormState>(field: K, value: InfoFormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const validate = (): boolean => {
    const nextErrors: Partial<Record<keyof InfoFormState, string>> = {};
    if (form.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }
    const phoneDigits = form.phone.replace(/\D/g, '');
    if (phoneDigits.length < 7) {
      nextErrors.phone = 'Please enter a valid phone / WhatsApp number.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!form.travelDate.trim()) {
      nextErrors.travelDate = 'Please select your preferred travel date.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const sendPackageEmail = async () => {
    if (!selectedPkg) return;
    setSubmitting(true);

    let ref = result?.referenceId || `FF-PKG-${Math.floor(100000 + Math.random() * 900000)}`;
    let emailSent = false;
    let reason: string | null = null;

    const parsedPayload = {
      referenceId: ref,
      fullName: form.fullName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      departureCity: form.departureCity.trim() || 'India / North America',
      destination: `${selectedPkg.name} (${selectedPkg.country})`,
      packageType: `${selectedPkg.name} Top International Package (Starting INR ${selectedPkg.startingInr.toLocaleString('en-IN')} / $${selectedPkg.startingUsd} USD)`,
      travelDate: form.travelDate,
      nights: selectedPkg.duration,
      adults: form.travelers,
      children: 0,
      hotelCategory: '4-Star / Curated Resort',
      includeFlights: true,
      budget: `Starting INR ${selectedPkg.startingInr.toLocaleString('en-IN')} ($${selectedPkg.startingUsd} USD)`,
      notes: form.notes.trim() || `Requested info & viewpoints itinerary for ${selectedPkg.name}`,
    };

    try {
      const response = await fetch('/api/holiday-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedPayload),
      });
      const contentType = response.headers.get('content-type') || '';
      if (response.ok && contentType.includes('application/json')) {
        const data = await response.json();
        if (data?.referenceId) ref = data.referenceId;
        emailSent = Boolean(data?.emailSent);
        reason = emailSent ? null : data?.reason || 'SMTP_DELIVERY_FAILED';
      } else {
        reason = `SERVER_HTTP_${response.status}`;
      }
    } catch {
      reason = 'NETWORK_UNREACHABLE';
    }

    const envWebhook = (import.meta.env.VITE_INQUIRY_WEBHOOK_URL as string | undefined)?.trim();
    const fallbackWebhook =
      envWebhook && envWebhook !== 'MY_INQUIRY_WEBHOOK_URL'
        ? envWebhook
        : 'https://formspree.io/f/xaeojlae';

    if (!emailSent && fallbackWebhook) {
      try {
        const webhookRes = await fetch(fallbackWebhook, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            _subject: `Top Destination Inquiry (${ref}) - ${selectedPkg.name} | ${parsedPayload.fullName}`,
            _replyto: parsedPayload.email,
            to: 'info@flyfello.in',
            referenceId: ref,
            packageSelected: parsedPayload.packageType,
            destination: parsedPayload.destination,
            fullName: parsedPayload.fullName,
            phone: parsedPayload.phone,
            email: parsedPayload.email,
            departureCity: parsedPayload.departureCity,
            travelDate: parsedPayload.travelDate,
            travelers: `${parsedPayload.adults} Traveler(s)`,
            notes: parsedPayload.notes,
          }),
        });
        const webhookData = await webhookRes.json().catch(() => null);
        if (webhookRes.ok && webhookData?.ok !== false) {
          emailSent = true;
          reason = null;
        }
      } catch {
        // Leave fallback buttons available if both server SMTP and webhook fail
      }
    }

    setSubmitting(false);
    setResult({ referenceId: ref, emailSent, reason });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    if (!validate()) return;
    await sendPackageEmail();
  };

  return (
    <section className={compact ? 'mb-10' : 'py-10 sm:py-14 bg-white border-b border-slate-200'}>
      <div className={compact ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}>
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-wider text-[#F58220] mb-1.5 flex items-center gap-1.5">
              <Compass className="w-4 h-4" />
              <span>Curated Holiday Packages</span>
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#122754] tracking-tight">
              Top International Destination
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-2xl">
              Tap any destination below to view package details, scenic viewpoints, and request your custom quote.
            </p>
          </div>
        </div>

        {/* 3 Destination Package Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TOP_INTERNATIONAL_PACKAGES.map((pkg) => {
            const imgFailed = failedImages[pkg.id];
            return (
              <article
                key={pkg.id}
                onClick={() => openPackageModal(pkg)}
                className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg hover:border-[#F58220]/70 transition-all cursor-pointer flex flex-col"
              >
                <div className="aspect-[4/3] w-full bg-gradient-to-br from-[#122754] to-[#1e3a7a] relative overflow-hidden">
                  {!imgFailed ? (
                    <img
                      src={pkg.image}
                      alt={`${pkg.name} holiday package view`}
                      referrerPolicy="no-referrer"
                      onError={() => setFailedImages((prev) => ({ ...prev, [pkg.id]: true }))}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-white p-4 text-center">
                      <MapPin className="w-10 h-10 text-[#F58220] mb-2" />
                      <span className="font-bold text-lg">{pkg.name}</span>
                    </div>
                  )}
                </div>

                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="text-xs font-medium text-slate-500 flex items-center gap-2">
                      <span>{pkg.country}</span>
                      <span aria-hidden="true">·</span>
                      <span>{pkg.duration}</span>
                    </div>
                    <h3 className="text-xl font-extrabold text-[#122754] group-hover:text-[#F58220] transition-colors">
                      {pkg.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {pkg.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-end justify-between gap-3">
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                        Starting at
                      </div>
                      <div className="text-lg font-extrabold text-[#122754] tabular-nums">
                        INR {pkg.startingInr.toLocaleString('en-IN')}
                      </div>
                      <div className="text-xs font-bold text-[#F58220] tabular-nums">
                        USD ${pkg.startingUsd} <span className="font-normal text-slate-500">/ person</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openPackageModal(pkg);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-[#122754] group-hover:bg-[#F58220] text-white text-xs font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer"
                    >
                      Ask for Info
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {/* Interactive Package Detail, Viewpoints & Email Inquiry Modal */}
      {selectedPkg && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="pkg-modal-title"
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md border-b border-slate-100 px-5 sm:px-8 py-4 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-slate-500">
                  Top International Destination · {selectedPkg.country} · {selectedPkg.duration}
                </div>
                <h3 id="pkg-modal-title" className="text-xl sm:text-2xl font-extrabold text-[#122754]">
                  {selectedPkg.name} — Starting at INR {selectedPkg.startingInr.toLocaleString('en-IN')} / USD ${selectedPkg.startingUsd}
                </h3>
              </div>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close package details"
                className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 hover:text-slate-900 cursor-pointer shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {result ? (
              /* Thank You & Call Soon Confirmation Screen */
              <div className="p-8 sm:p-12 text-center space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div className="space-y-2.5 max-w-xl mx-auto">
                  <div className="text-xs font-mono font-bold text-[#F58220] uppercase tracking-wider">
                    Reference #{result.referenceId}
                  </div>
                  <h4 className="text-2xl sm:text-3xl font-extrabold text-[#122754]">
                    Thank You, {form.fullName}!
                  </h4>
                  <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                    {result.emailSent ? (
                      <>
                        Your inquiry for the <strong>{selectedPkg.name}</strong> package (Starting at{' '}
                        <strong>INR {selectedPkg.startingInr.toLocaleString('en-IN')} / USD ${selectedPkg.startingUsd}</strong>) has been received by our holiday team.
                      </>
                    ) : (
                      <>
                        Your inquiry for <strong>{selectedPkg.name}</strong> is ready ({result.reason || 'email queued'}). You can send directly below or contact us anytime.
                      </>
                    )}
                  </p>

                  <div className="mt-4 p-4 rounded-2xl bg-orange-50 border border-orange-200 text-[#122754] flex items-center justify-center gap-3 text-sm font-bold">
                    <PhoneCall className="w-5 h-5 text-[#F58220] shrink-0" />
                    <span>
                      Our FlyFello travel specialist will call you soon on {form.phone}.
                    </span>
                  </div>
                </div>

                {!result.emailSent && (
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={`mailto:info@flyfello.in?subject=${encodeURIComponent(
                        `Top Destination Inquiry (${result.referenceId}) - ${selectedPkg.name}`
                      )}&body=${encodeURIComponent(
                        `Package: ${selectedPkg.name} (Starting INR ${selectedPkg.startingInr} / USD $${selectedPkg.startingUsd})\nName: ${form.fullName}\nPhone: ${form.phone}\nEmail: ${form.email}\nDeparture City: ${form.departureCity}\nTravel Date: ${form.travelDate}\nTravelers: ${form.travelers}\nNotes: ${form.notes}`
                      )}`}
                      className="px-5 py-2.5 rounded-xl bg-[#122754] hover:bg-[#F58220] text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Send via Email App</span>
                    </a>
                    <a
                      href={`https://wa.me/${WHATSAPP_API_NUMBER}?text=${encodeURIComponent(
                        `Hi FlyFello! Package Inquiry Ref ${result.referenceId}\nPackage: ${selectedPkg.name} (Starting INR ${selectedPkg.startingInr} / USD $${selectedPkg.startingUsd})\nName: ${form.fullName}\nPhone: ${form.phone}\nEmail: ${form.email}\nTravel Date: ${form.travelDate}\nTravelers: ${form.travelers}\nNotes: ${form.notes}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-xs sm:text-sm inline-flex items-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp Desk</span>
                    </a>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleBackToHomeClick}
                    className="px-7 py-3 rounded-xl bg-[#122754] hover:bg-[#F58220] text-white font-extrabold text-sm shadow-md transition-colors inline-flex items-center gap-2 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Home Page</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Package Picture, Description, Viewpoints & Ask for Info Form */
              <div className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
                {/* Left: Picture, Description, Viewpoints & Inclusions */}
                <div className="lg:col-span-6 space-y-5">
                  <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden bg-gradient-to-br from-[#122754] to-[#1e3a7a] border border-slate-200">
                    {!failedImages[selectedPkg.id] ? (
                      <img
                        src={selectedPkg.image}
                        alt={`${selectedPkg.name} scenic resort view`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white font-bold">
                        {selectedPkg.name}
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="text-sm font-extrabold text-[#122754] uppercase tracking-wider mb-1.5">
                      Package Overview
                    </h4>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {selectedPkg.fullDescription}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <h4 className="text-sm font-extrabold text-[#122754] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-[#F58220]" />
                      <span>Top Viewpoints &amp; Highlights</span>
                    </h4>
                    <ul className="space-y-2.5">
                      {selectedPkg.viewpoints.map((vp, idx) => (
                        <li key={vp.name} className="text-xs sm:text-sm text-slate-700">
                          <span className="font-bold text-[#122754]">
                            0{idx + 1}. {vp.name}:
                          </span>{' '}
                          <span>{vp.detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <h4 className="text-sm font-extrabold text-[#122754] uppercase tracking-wider mb-2">
                      Package Inclusions
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {selectedPkg.inclusions.join(' · ')}
                    </p>
                  </div>
                </div>

                {/* Right: Ask for Info Email Form */}
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="lg:col-span-6 bg-slate-50 rounded-2xl border border-slate-200 p-5 sm:p-6 space-y-4"
                >
                  <div className="pb-3 border-b border-slate-200">
                    <h4 className="text-lg font-extrabold text-[#122754]">
                      Ask for {selectedPkg.name} Package Info
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Enter your details below to request package info. We will call you soon with custom flight + hotel rates.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rohan Sharma"
                      value={form.fullName}
                      onChange={(e) => updateField('fullName', e.target.value)}
                      className={`w-full h-10 px-3 bg-white border rounded-xl text-sm ${
                        errors.fullName ? 'border-rose-400' : 'border-slate-200'
                      }`}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-[11px] text-rose-600">{errors.fullName}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Phone / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210 / +1 ..."
                        value={form.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        className={`w-full h-10 px-3 bg-white border rounded-xl text-sm ${
                          errors.phone ? 'border-rose-400' : 'border-slate-200'
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
                        className={`w-full h-10 px-3 bg-white border rounded-xl text-sm ${
                          errors.email ? 'border-rose-400' : 'border-slate-200'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-[11px] text-rose-600">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Departure City
                      </label>
                      <input
                        type="text"
                        value={form.departureCity}
                        onChange={(e) => updateField('departureCity', e.target.value)}
                        className="w-full h-10 px-3 bg-white border border-slate-200 rounded-xl text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Travel Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={form.travelDate}
                        onChange={(e) => updateField('travelDate', e.target.value)}
                        className={`w-full h-10 px-3 bg-white border rounded-xl text-sm ${
                          errors.travelDate ? 'border-rose-400' : 'border-slate-200'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Travelers
                      </label>
                      <select
                        value={form.travelers}
                        onChange={(e) => updateField('travelers', Number(e.target.value))}
                        className="w-full h-10 px-3 bg-white border border-slate-200 rounded-xl text-sm"
                      >
                        {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                          <option key={n} value={n}>
                            {n} Traveler{n > 1 ? 's' : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Questions or Preferences (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder={`Ask about ${selectedPkg.name} flights, private pool upgrade, or Indian meals...`}
                      value={form.notes}
                      onChange={(e) => updateField('notes', e.target.value)}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm"
                    />
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
                    disabled={submitting}
                    aria-busy={submitting}
                    className="w-full py-3.5 px-5 rounded-xl bg-[#122754] hover:bg-[#F58220] text-white font-extrabold text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending Info Request...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Info Request</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
