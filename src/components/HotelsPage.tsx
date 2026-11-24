import React, { useMemo, useState } from 'react';
import {
  Building2,
  MapPin,
  Star,
  Calendar,
  Users,
  Check,
  ArrowLeft,
  MessageCircle,
  Mail,
  Search,
  CheckCircle2,
  AlertCircle,
  Clock,
  BedDouble,
  Utensils,
} from 'lucide-react';
import {
  HOTEL_CATEGORIES,
  HOTEL_DESTINATION_GROUPS,
  HOTEL_PROPERTIES,
  HotelCategory,
  HotelDestinationGroup,
  HotelProperty,
} from '../data/hotels';
import {
  buildWhatsAppHotelQueryUrl,
  triggerWhatsAppLink,
} from '../utils/whatsapp';

interface BookingFormState {
  fullName: string;
  phone: string;
  email: string;
  checkIn: string;
  checkOut: string;
  rooms: number;
  adults: number;
  children: number;
  roomType: string;
  mealPlan: string;
  specialRequests: string;
}

interface CustomHotelFormState {
  destinationCity: string;
  preferredHotel: string;
  starCategory: string;
  mealPlan: string;
  checkIn: string;
  checkOut: string;
  rooms: number;
  adults: number;
  children: number;
  budgetPerNight: string;
  fullName: string;
  phone: string;
  email: string;
  notes: string;
}

function calculateNights(checkIn: string, checkOut: string): number {
  if (!checkIn || !checkOut) return 1;
  const start = new Date(checkIn).getTime();
  const end = new Date(checkOut).getTime();
  if (Number.isNaN(start) || Number.isNaN(end) || end <= start) return 1;
  return Math.max(1, Math.round((end - start) / (1000 * 60 * 60 * 24)));
}

export const HotelsPage: React.FC = () => {
  const [selectedDestination, setSelectedDestination] = useState<HotelDestinationGroup>('All');
  const [selectedCategory, setSelectedCategory] = useState<'All' | HotelCategory>('All');
  const [selectedStars, setSelectedStars] = useState<0 | 3 | 4 | 5>(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeHotel, setActiveHotel] = useState<HotelProperty | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Shared default booking state carried into hotel details
  const [bookingForm, setBookingForm] = useState<BookingFormState>({
    fullName: '',
    phone: '',
    email: '',
    checkIn: '2026-12-15',
    checkOut: '2026-12-20',
    rooms: 1,
    adults: 2,
    children: 0,
    roomType: '',
    mealPlan: 'Breakfast Included',
    specialRequests: '',
  });
  const [bookingErrors, setBookingErrors] = useState<Partial<Record<keyof BookingFormState, string>>>({});
  const [submittedHotelWaUrl, setSubmittedHotelWaUrl] = useState<string | null>(null);

  // Custom hotel query form state
  const [customForm, setCustomForm] = useState<CustomHotelFormState>({
    destinationCity: '',
    preferredHotel: '',
    starCategory: '4-Star / 5-Star',
    mealPlan: 'Breakfast Included',
    checkIn: '2026-12-15',
    checkOut: '2026-12-20',
    rooms: 1,
    adults: 2,
    children: 0,
    budgetPerNight: 'Flexible / Best Wholesale Rate',
    fullName: '',
    phone: '',
    email: '',
    notes: '',
  });
  const [customErrors, setCustomErrors] = useState<Partial<Record<keyof CustomHotelFormState, string>>>({});
  const [submittedCustomWaUrl, setSubmittedCustomWaUrl] = useState<string | null>(null);

  const filteredHotels = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    return HOTEL_PROPERTIES.filter((hotel) => {
      if (selectedDestination !== 'All' && hotel.destinationGroup !== selectedDestination) {
        return false;
      }
      if (selectedCategory !== 'All' && hotel.category !== selectedCategory) {
        return false;
      }
      if (selectedStars !== 0 && hotel.stars !== selectedStars) {
        return false;
      }
      if (query) {
        const haystack = [
          hotel.name,
          hotel.city,
          hotel.country,
          hotel.neighborhood,
          hotel.category,
          ...hotel.amenities,
        ]
          .join(' ')
          .toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });
  }, [selectedDestination, selectedCategory, selectedStars, searchTerm]);

  const handleOpenHotelDetail = (hotel: HotelProperty) => {
    setActiveHotel(hotel);
    setSubmittedHotelWaUrl(null);
    setBookingErrors({});
    setBookingForm((prev) => ({
      ...prev,
      roomType: hotel.roomOptions[0]?.name || 'Standard Room',
      mealPlan: hotel.boardOptions[0] || 'Breakfast Included',
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateBookingField = <K extends keyof BookingFormState>(
    field: K,
    value: BookingFormState[K]
  ) => {
    setBookingForm((prev) => ({ ...prev, [field]: value }));
    setBookingErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const updateCustomField = <K extends keyof CustomHotelFormState>(
    field: K,
    value: CustomHotelFormState[K]
  ) => {
    setCustomForm((prev) => ({ ...prev, [field]: value }));
    setCustomErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleHotelBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeHotel) return;

    const nextErrors: Partial<Record<keyof BookingFormState, string>> = {};
    if (bookingForm.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }
    const phoneDigits = bookingForm.phone.replace(/\D/g, '');
    if (phoneDigits.length < 7) {
      nextErrors.phone = 'Please enter a valid WhatsApp / phone number.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(bookingForm.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!bookingForm.checkIn) {
      nextErrors.checkIn = 'Select check-in date.';
    }
    if (!bookingForm.checkOut || bookingForm.checkOut <= bookingForm.checkIn) {
      nextErrors.checkOut = 'Check-out must be after check-in.';
    }

    setBookingErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const nights = calculateNights(bookingForm.checkIn, bookingForm.checkOut);
    const waUrl = buildWhatsAppHotelQueryUrl({
      hotelName: activeHotel.name,
      destination: `${activeHotel.city}, ${activeHotel.country}`,
      roomType: bookingForm.roomType || activeHotel.roomOptions[0]?.name || 'Standard Room',
      mealPlan: bookingForm.mealPlan,
      checkIn: bookingForm.checkIn,
      checkOut: bookingForm.checkOut,
      nights,
      rooms: bookingForm.rooms,
      adults: bookingForm.adults,
      children: bookingForm.children,
      fullName: bookingForm.fullName.trim(),
      phone: bookingForm.phone.trim(),
      email: bookingForm.email.trim(),
      specialRequests: bookingForm.specialRequests.trim(),
    });

    setSubmittedHotelWaUrl(waUrl);
    triggerWhatsAppLink(waUrl);
  };

  const handleCustomHotelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Partial<Record<keyof CustomHotelFormState, string>> = {};

    if (customForm.destinationCity.trim().length < 2) {
      nextErrors.destinationCity = 'Enter destination city or country.';
    }
    if (customForm.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }
    const phoneDigits = customForm.phone.replace(/\D/g, '');
    if (phoneDigits.length < 7) {
      nextErrors.phone = 'Please enter a valid WhatsApp / phone number.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customForm.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!customForm.checkIn) {
      nextErrors.checkIn = 'Select check-in date.';
    }
    if (!customForm.checkOut || customForm.checkOut <= customForm.checkIn) {
      nextErrors.checkOut = 'Check-out must be after check-in.';
    }

    setCustomErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const nights = calculateNights(customForm.checkIn, customForm.checkOut);
    const propertyName = customForm.preferredHotel.trim()
      ? `${customForm.preferredHotel.trim()} (${customForm.starCategory})`
      : `Best Available ${customForm.starCategory} Property`;

    const notesParts = [`Budget: ${customForm.budgetPerNight}`];
    if (customForm.notes.trim()) notesParts.push(customForm.notes.trim());

    const waUrl = buildWhatsAppHotelQueryUrl({
      hotelName: propertyName,
      destination: customForm.destinationCity.trim(),
      roomType: `${customForm.starCategory} Standard / Deluxe`,
      mealPlan: customForm.mealPlan,
      checkIn: customForm.checkIn,
      checkOut: customForm.checkOut,
      nights,
      rooms: customForm.rooms,
      adults: customForm.adults,
      children: customForm.children,
      fullName: customForm.fullName.trim(),
      phone: customForm.phone.trim(),
      email: customForm.email.trim(),
      specialRequests: notesParts.join(' · '),
    });

    setSubmittedCustomWaUrl(waUrl);
    triggerWhatsAppLink(waUrl);
  };

  // Detailed Hotel View & WhatsApp Booking Inquiry
  if (activeHotel) {
    const nights = calculateNights(bookingForm.checkIn, bookingForm.checkOut);
    const showFallback = failedImages[activeHotel.id];

    return (
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <button
          type="button"
          onClick={() => setActiveHotel(null)}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#122754] hover:text-[#F58220] transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Hotels &amp; Destinations</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Full Hotel Information */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div className="aspect-[4/3] w-full bg-gradient-to-br from-[#122754] to-[#1e3a7a] relative overflow-hidden">
                {!showFallback ? (
                  <img
                    src={activeHotel.image}
                    alt={`${activeHotel.name} in ${activeHotel.city}`}
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setFailedImages((prev) => ({ ...prev, [activeHotel.id]: true }))
                    }
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-white p-6 text-center">
                    <Building2 className="w-12 h-12 text-[#F58220] mb-2" />
                    <span className="font-bold text-lg">{activeHotel.name}</span>
                  </div>
                )}
              </div>

              <div className="p-6 sm:p-8 space-y-5">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
                  <span>{activeHotel.city}, {activeHotel.country}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeHotel.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1 text-[#122754]">
                    {Array.from({ length: activeHotel.stars }).map((_, idx) => (
                      <Star
                        key={idx}
                        className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                      />
                    ))}
                    <span className="ml-0.5">{activeHotel.stars}-Star Property</span>
                  </span>
                </div>

                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-[#122754] tracking-tight [text-wrap:balance]">
                    {activeHotel.name}
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1.5 flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#F58220] shrink-0" />
                    <span>{activeHotel.neighborhood} · {activeHotel.distanceNote}</span>
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-3 text-sm sm:text-[15px] text-slate-700 leading-relaxed">
                  {activeHotel.fullDescription.map((para, index) => (
                    <p key={index}>{para}</p>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h2 className="text-sm font-extrabold text-[#122754] uppercase tracking-wider mb-3">
                    Property Highlights
                  </h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm text-slate-700">
                    {activeHotel.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h2 className="text-sm font-extrabold text-[#122754] uppercase tracking-wider mb-3">
                    Available Room Categories
                  </h2>
                  <div className="space-y-3">
                    {activeHotel.roomOptions.map((room) => {
                      const isSelected = bookingForm.roomType === room.name;
                      return (
                        <button
                          key={room.name}
                          type="button"
                          onClick={() => updateBookingField('roomType', room.name)}
                          className={`w-full text-left p-4 rounded-xl border transition-colors cursor-pointer ${
                            isSelected
                              ? 'border-[#F58220] bg-orange-50/40'
                              : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center justify-between gap-3">
                            <span className="font-bold text-sm text-[#122754] flex items-center gap-2">
                              <BedDouble className="w-4 h-4 text-[#F58220]" />
                              {room.name}
                            </span>
                            <span className="text-xs font-semibold text-slate-500 whitespace-nowrap">
                              {room.size} · {room.maxOccupancy}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1">
                            {room.bedding} — {room.note}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-slate-700">
                  <div>
                    <div className="font-bold text-[#122754] mb-1.5 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#F58220]" />
                      <span>Check-in &amp; Check-out</span>
                    </div>
                    <p>Check-in: {activeHotel.checkInTime}</p>
                    <p>Check-out: {activeHotel.checkOutTime}</p>
                  </div>
                  <div>
                    <div className="font-bold text-[#122754] mb-1.5 flex items-center gap-1.5">
                      <Utensils className="w-4 h-4 text-[#F58220]" />
                      <span>Board Options</span>
                    </div>
                    <p>{activeHotel.boardOptions.join(' · ')}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h2 className="text-sm font-extrabold text-[#122754] uppercase tracking-wider mb-2.5">
                    Amenities &amp; Facilities
                  </h2>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {activeHotel.amenities.join(' · ')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Booking Inquiry Form Forwarded to WhatsApp */}
          <div className="lg:col-span-5 lg:sticky lg:top-32">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 sm:p-7">
              <div className="pb-4 border-b border-slate-100 flex items-baseline justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Indicative Wholesale Rate
                  </span>
                  <div className="text-2xl font-extrabold text-[#122754] tabular-nums">
                    ₹{activeHotel.startingRateInr.toLocaleString('en-IN')}
                    <span className="text-xs font-semibold text-slate-500"> / night</span>
                  </div>
                </div>
                <div className="text-right text-xs font-semibold text-slate-500 tabular-nums">
                  From ${activeHotel.startingRateUsd} USD
                </div>
              </div>

              {submittedHotelWaUrl ? (
                <div className="py-6 text-center space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-[#122754]">
                      Hotel Query Ready for WhatsApp
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1.5">
                      Thank you, <strong>{bookingForm.fullName}</strong>. Your inquiry for{' '}
                      <strong>{activeHotel.name}</strong> ({nights} night
                      {nights === 1 ? '' : 's'}) has been formatted for our WhatsApp hotel desk.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2.5 pt-2">
                    <a
                      href={submittedHotelWaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Open WhatsApp Hotel Desk</span>
                    </a>
                    <a
                      href={`mailto:info@flyfello.in?subject=${encodeURIComponent(
                        `Hotel Booking Inquiry - ${activeHotel.name} (${bookingForm.checkIn})`
                      )}&body=${encodeURIComponent(
                        `Hotel: ${activeHotel.name} (${activeHotel.city})\nRoom: ${bookingForm.roomType}\nMeal Plan: ${bookingForm.mealPlan}\nDates: ${bookingForm.checkIn} to ${bookingForm.checkOut}\nRooms: ${bookingForm.rooms}, Adults: ${bookingForm.adults}, Children: ${bookingForm.children}\nName: ${bookingForm.fullName}\nPhone: ${bookingForm.phone}\nEmail: ${bookingForm.email}\nNotes: ${bookingForm.specialRequests}`
                      )}`}
                      className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-[#122754] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Or Send via Email (info@flyfello.in)</span>
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSubmittedHotelWaUrl(null)}
                    className="text-xs font-bold text-[#F58220] hover:underline cursor-pointer pt-1"
                  >
                    Edit Dates or Guest Details
                  </button>
                </div>
              ) : (
                <form onSubmit={handleHotelBookingSubmit} noValidate className="pt-5 space-y-4">
                  <div>
                    <h2 className="text-base font-extrabold text-[#122754]">
                      Book / Inquire on WhatsApp
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Enter your guest details below to receive exact consolidated rates directly on WhatsApp.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Check-in *
                      </label>
                      <input
                        type="date"
                        required
                        value={bookingForm.checkIn}
                        onChange={(e) => updateBookingField('checkIn', e.target.value)}
                        className={`w-full h-10 px-3 border rounded-xl text-xs sm:text-sm text-slate-900 ${
                          bookingErrors.checkIn
                            ? 'border-rose-400 bg-rose-50/40'
                            : 'border-slate-200 bg-slate-50'
                        }`}
                      />
                      {bookingErrors.checkIn && (
                        <p className="mt-1 text-[11px] text-rose-600">{bookingErrors.checkIn}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Check-out ({nights} night{nights === 1 ? '' : 's'}) *
                      </label>
                      <input
                        type="date"
                        required
                        value={bookingForm.checkOut}
                        onChange={(e) => updateBookingField('checkOut', e.target.value)}
                        className={`w-full h-10 px-3 border rounded-xl text-xs sm:text-sm text-slate-900 ${
                          bookingErrors.checkOut
                            ? 'border-rose-400 bg-rose-50/40'
                            : 'border-slate-200 bg-slate-50'
                        }`}
                      />
                      {bookingErrors.checkOut && (
                        <p className="mt-1 text-[11px] text-rose-600">{bookingErrors.checkOut}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Room Category
                    </label>
                    <select
                      value={bookingForm.roomType}
                      onChange={(e) => updateBookingField('roomType', e.target.value)}
                      className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                    >
                      {activeHotel.roomOptions.map((room) => (
                        <option key={room.name} value={room.name}>
                          {room.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Meal Plan
                    </label>
                    <select
                      value={bookingForm.mealPlan}
                      onChange={(e) => updateBookingField('mealPlan', e.target.value)}
                      className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                    >
                      {activeHotel.boardOptions.map((board) => (
                        <option key={board} value={board}>
                          {board}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Rooms
                      </label>
                      <select
                        value={bookingForm.rooms}
                        onChange={(e) => updateBookingField('rooms', Number(e.target.value))}
                        className="w-full h-10 px-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                      >
                        {[1, 2, 3, 4, 5].map((n) => (
                          <option key={n} value={n}>
                            {n} Room{n > 1 ? 's' : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Adults
                      </label>
                      <select
                        value={bookingForm.adults}
                        onChange={(e) => updateBookingField('adults', Number(e.target.value))}
                        className="w-full h-10 px-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                      >
                        {[1, 2, 3, 4, 5, 6, 8].map((n) => (
                          <option key={n} value={n}>
                            {n} Adult{n > 1 ? 's' : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Children
                      </label>
                      <select
                        value={bookingForm.children}
                        onChange={(e) => updateBookingField('children', Number(e.target.value))}
                        className="w-full h-10 px-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900"
                      >
                        {[0, 1, 2, 3, 4].map((n) => (
                          <option key={n} value={n}>
                            {n} Child{n === 1 ? '' : 'ren'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-100 space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        autoComplete="name"
                        placeholder="e.g. Gurpreet Singh"
                        value={bookingForm.fullName}
                        onChange={(e) => updateBookingField('fullName', e.target.value)}
                        className={`w-full h-10 px-3 border rounded-xl text-sm text-slate-900 ${
                          bookingErrors.fullName
                            ? 'border-rose-400 bg-rose-50/40'
                            : 'border-slate-200 bg-slate-50'
                        }`}
                      />
                      {bookingErrors.fullName && (
                        <p className="mt-1 text-[11px] text-rose-600">{bookingErrors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        WhatsApp / Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        autoComplete="tel"
                        placeholder="+91 98765 43210 / +1 ..."
                        value={bookingForm.phone}
                        onChange={(e) => updateBookingField('phone', e.target.value)}
                        className={`w-full h-10 px-3 border rounded-xl text-sm text-slate-900 ${
                          bookingErrors.phone
                            ? 'border-rose-400 bg-rose-50/40'
                            : 'border-slate-200 bg-slate-50'
                        }`}
                      />
                      {bookingErrors.phone && (
                        <p className="mt-1 text-[11px] text-rose-600">{bookingErrors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        autoComplete="email"
                        placeholder="name@email.com"
                        value={bookingForm.email}
                        onChange={(e) => updateBookingField('email', e.target.value)}
                        className={`w-full h-10 px-3 border rounded-xl text-sm text-slate-900 ${
                          bookingErrors.email
                            ? 'border-rose-400 bg-rose-50/40'
                            : 'border-slate-200 bg-slate-50'
                        }`}
                      />
                      {bookingErrors.email && (
                        <p className="mt-1 text-[11px] text-rose-600">{bookingErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Special Requests (Optional)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Airport pickup, early check-in, connecting rooms, vegetarian meals..."
                        value={bookingForm.specialRequests}
                        onChange={(e) => updateBookingField('specialRequests', e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900"
                      />
                    </div>
                  </div>

                  {Object.keys(bookingErrors).length > 0 && (
                    <div
                      role="alert"
                      className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-700"
                    >
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>Please complete the highlighted fields.</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-3.5 px-5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white font-extrabold text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Continue Booking on WhatsApp</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="flex-1 bg-slate-50">
      {/* Hotels Header Hero */}
      <section className="bg-[#122754] text-white py-10 sm:py-14 px-4 sm:px-6 lg:px-8 border-b border-[#1d3975]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
              Worldwide Hotels · Resorts · Private Villas
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight [text-wrap:balance]">
              Explore Hotels &amp; Book Directly on WhatsApp
            </h1>
            <p className="text-sm sm:text-base text-slate-200 mt-3 leading-relaxed">
              Browse curated 3-star, 4-star, and 5-star stays across Dubai, Bali, Thailand, Singapore, Maldives, Vietnam, India, USA &amp; Canada. Read full property details, select your room &amp; meal plan, and forward your booking inquiry straight to our hotel desk on WhatsApp.
            </p>
          </div>

          {/* Search & Quick Filter Toolbar */}
          <div className="mt-7 bg-white rounded-2xl p-4 sm:p-5 text-slate-900 shadow-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="relative lg:col-span-2">
              <label htmlFor="hotel-search" className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Search Destination or Property
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="hotel-search"
                  type="text"
                  placeholder="Dubai Marina, Ubud villa, Phuket beach, Delhi Aerocity..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-10 pl-9 pr-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-none focus:border-[#F58220]"
                />
              </div>
            </div>

            <div>
              <label htmlFor="hotel-category" className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Stay Style
              </label>
              <select
                id="hotel-category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as 'All' | HotelCategory)}
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900"
              >
                {HOTEL_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'All' ? 'All Stay Styles' : cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="hotel-stars" className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                Star Rating
              </label>
              <select
                id="hotel-stars"
                value={selectedStars}
                onChange={(e) => setSelectedStars(Number(e.target.value) as 0 | 3 | 4 | 5)}
                className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900"
              >
                <option value={0}>All Ratings</option>
                <option value={5}>5-Star Luxury</option>
                <option value={4}>4-Star Deluxe</option>
                <option value={3}>3-Star Comfort</option>
              </select>
            </div>
          </div>

          {/* Interactive Destination Tabs */}
          <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-1">
            {HOTEL_DESTINATION_GROUPS.map((dest) => {
              const active = selectedDestination === dest;
              return (
                <button
                  key={dest}
                  type="button"
                  onClick={() => setSelectedDestination(dest)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#F58220] text-white'
                      : 'bg-white/10 text-slate-100 hover:bg-white/20'
                  }`}
                >
                  {dest === 'All' ? 'All Destinations' : dest}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Hotel Catalog Grid */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#122754]">
              {selectedDestination === 'All'
                ? 'Featured Hotels & Resorts Worldwide'
                : `${selectedDestination} Hotels & Resorts`}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Click any property to read full room details, meal plans, and amenities before booking via WhatsApp.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500 tabular-nums">
            Showing {filteredHotels.length} {filteredHotels.length === 1 ? 'property' : 'properties'}
          </span>
        </div>

        {filteredHotels.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center space-y-3">
            <p className="text-base font-bold text-[#122754]">
              No featured hotels matched your current filter.
            </p>
            <p className="text-sm text-slate-600">
              Reset filters or send a custom hotel request below — we book every hotel worldwide.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedDestination('All');
                setSelectedCategory('All');
                setSelectedStars(0);
                setSearchTerm('');
              }}
              className="px-4 py-2 rounded-xl bg-[#122754] text-white text-xs font-bold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHotels.map((hotel) => {
              const showFallback = failedImages[hotel.id];
              return (
                <article
                  key={hotel.id}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
                >
                  <div className="aspect-[4/3] w-full bg-gradient-to-br from-[#122754] to-[#1e3a7a] relative overflow-hidden">
                    {!showFallback ? (
                      <img
                        src={hotel.image}
                        alt={`${hotel.name} in ${hotel.city}`}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setFailedImages((prev) => ({ ...prev, [hotel.id]: true }))
                        }
                        className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-white p-4 text-center">
                        <Building2 className="w-10 h-10 text-[#F58220] mb-2" />
                        <span className="font-bold text-sm">{hotel.name}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        <span>{hotel.city}</span>
                        <span aria-hidden="true">·</span>
                        <span>{hotel.stars}-Star {hotel.category}</span>
                      </div>
                      <h3 className="text-lg font-bold text-[#122754] leading-snug">
                        {hotel.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                        {hotel.shortSummary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                      <div>
                        <div className="text-[11px] text-slate-500">From</div>
                        <div className="text-base font-extrabold text-[#122754] tabular-nums">
                          ₹{hotel.startingRateInr.toLocaleString('en-IN')}
                          <span className="text-xs font-normal text-slate-500"> / night</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleOpenHotelDetail(hotel)}
                        className="px-4 py-2.5 rounded-xl bg-[#122754] hover:bg-[#F58220] text-white text-xs font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer"
                      >
                        Read Details &amp; Book
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* Custom Any-Hotel / Any-City Query Section */}
      <section className="pb-14 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 sm:p-10">
          <div className="max-w-2xl mb-6">
            <p className="text-xs font-bold uppercase tracking-wider text-[#F58220] mb-1">
              Custom Hotel Desk
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#122754]">
              Looking for Another Hotel or Destination?
            </h2>
            <p className="text-sm text-slate-600 mt-1.5">
              Request rates for any hotel, resort, heritage property, or airport transit room anywhere in the world — your query goes straight to FlyFello on WhatsApp.
            </p>
          </div>

          {submittedCustomWaUrl ? (
            <div className="py-6 text-center space-y-4 border-t border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-extrabold text-[#122754]">
                Custom Hotel Request Ready on WhatsApp
              </h3>
              <p className="text-sm text-slate-600 max-w-lg mx-auto">
                Thank you, <strong>{customForm.fullName}</strong>. Your inquiry for{' '}
                <strong>{customForm.destinationCity}</strong> is ready to send to our hotel team.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={submittedCustomWaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-sm inline-flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Open WhatsApp Chat</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSubmittedCustomWaUrl(null)}
                  className="px-5 py-3 rounded-xl border border-slate-200 text-[#122754] font-bold text-sm cursor-pointer"
                >
                  Submit Another Query
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleCustomHotelSubmit} noValidate className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    City / Destination *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Goa, London, Makkah, Tokyo"
                    value={customForm.destinationCity}
                    onChange={(e) => updateCustomField('destinationCity', e.target.value)}
                    className={`w-full h-11 px-3.5 border rounded-xl text-sm ${
                      customErrors.destinationCity
                        ? 'border-rose-400 bg-rose-50/40'
                        : 'border-slate-200 bg-slate-50'
                    }`}
                  />
                  {customErrors.destinationCity && (
                    <p className="mt-1 text-xs text-rose-600">{customErrors.destinationCity}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Hotel Name (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Taj, Marriott, Hilton, Any"
                    value={customForm.preferredHotel}
                    onChange={(e) => updateCustomField('preferredHotel', e.target.value)}
                    className="w-full h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Hotel Category
                  </label>
                  <select
                    value={customForm.starCategory}
                    onChange={(e) => updateCustomField('starCategory', e.target.value)}
                    className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  >
                    <option value="3-Star Budget / Comfort">3-Star Budget / Comfort</option>
                    <option value="4-Star / 5-Star">4-Star / 5-Star</option>
                    <option value="5-Star Luxury Resort">5-Star Luxury Resort</option>
                    <option value="Private Pool Villa / Suite">Private Pool Villa / Suite</option>
                    <option value="Airport Transit Hotel">Airport Transit Hotel</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Meal Plan
                  </label>
                  <select
                    value={customForm.mealPlan}
                    onChange={(e) => updateCustomField('mealPlan', e.target.value)}
                    className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  >
                    <option value="Room Only">Room Only</option>
                    <option value="Breakfast Included">Breakfast Included</option>
                    <option value="Half Board (Breakfast + Dinner)">Half Board</option>
                    <option value="All-Inclusive">All-Inclusive</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-[#F58220]" />
                    <span>Check-in *</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={customForm.checkIn}
                    onChange={(e) => updateCustomField('checkIn', e.target.value)}
                    className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Check-out *
                  </label>
                  <input
                    type="date"
                    required
                    value={customForm.checkOut}
                    onChange={(e) => updateCustomField('checkOut', e.target.value)}
                    className={`w-full h-11 px-3 border rounded-xl text-sm ${
                      customErrors.checkOut
                        ? 'border-rose-400 bg-rose-50/40'
                        : 'border-slate-200 bg-slate-50'
                    }`}
                  />
                  {customErrors.checkOut && (
                    <p className="mt-1 text-xs text-rose-600">{customErrors.checkOut}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Rooms
                  </label>
                  <select
                    value={customForm.rooms}
                    onChange={(e) => updateCustomField('rooms', Number(e.target.value))}
                    className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <option key={n} value={n}>
                        {n} Room{n > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#F58220]" />
                    <span>Adults</span>
                  </label>
                  <select
                    value={customForm.adults}
                    onChange={(e) => updateCustomField('adults', Number(e.target.value))}
                    className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  >
                    {[1, 2, 3, 4, 5, 6, 8, 10].map((n) => (
                      <option key={n} value={n}>
                        {n} Adult{n > 1 ? 's' : ''}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Children
                  </label>
                  <select
                    value={customForm.children}
                    onChange={(e) => updateCustomField('children', Number(e.target.value))}
                    className="w-full h-11 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  >
                    {[0, 1, 2, 3, 4].map((n) => (
                      <option key={n} value={n}>
                        {n} Child{n === 1 ? '' : 'ren'}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={customForm.fullName}
                    onChange={(e) => updateCustomField('fullName', e.target.value)}
                    className={`w-full h-11 px-3.5 border rounded-xl text-sm ${
                      customErrors.fullName
                        ? 'border-rose-400 bg-rose-50/40'
                        : 'border-slate-200 bg-slate-50'
                    }`}
                  />
                  {customErrors.fullName && (
                    <p className="mt-1 text-xs text-rose-600">{customErrors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    WhatsApp / Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210 / +1 ..."
                    value={customForm.phone}
                    onChange={(e) => updateCustomField('phone', e.target.value)}
                    className={`w-full h-11 px-3.5 border rounded-xl text-sm ${
                      customErrors.phone
                        ? 'border-rose-400 bg-rose-50/40'
                        : 'border-slate-200 bg-slate-50'
                    }`}
                  />
                  {customErrors.phone && (
                    <p className="mt-1 text-xs text-rose-600">{customErrors.phone}</p>
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
                    value={customForm.email}
                    onChange={(e) => updateCustomField('email', e.target.value)}
                    className={`w-full h-11 px-3.5 border rounded-xl text-sm ${
                      customErrors.email
                        ? 'border-rose-400 bg-rose-50/40'
                        : 'border-slate-200 bg-slate-50'
                    }`}
                  />
                  {customErrors.email && (
                    <p className="mt-1 text-xs text-rose-600">{customErrors.email}</p>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-3 border-t border-slate-100">
                <input
                  type="text"
                  placeholder="Optional notes: budget range, locality, connecting rooms..."
                  value={customForm.notes}
                  onChange={(e) => updateCustomField('notes', e.target.value)}
                  className="flex-1 h-11 px-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                />
                <button
                  type="submit"
                  className="px-7 h-11 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white font-extrabold text-sm shadow-sm flex items-center justify-center gap-2 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Hotel Query on WhatsApp</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
