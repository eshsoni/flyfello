import React, { useState } from 'react';
import { InquiryFormData, FlightOption } from '../types';
import { CANADA_AIRPORTS, USA_AIRPORTS, UK_AIRPORTS, INDIA_AIRPORTS } from '../data/airports';
import { Send, CheckCircle2, MessageCircle, Phone, Mail, Luggage, Users, Calendar } from 'lucide-react';

interface InquiryFormProps {
  initialFlight?: FlightOption | null;
  onClose?: () => void;
}

export const InquiryForm: React.FC<InquiryFormProps> = ({ initialFlight, onClose }) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    phone: '',
    email: '',
    origin: initialFlight?.outbound.segments[0].origin || 'YVR',
    destination: initialFlight?.outbound.segments[initialFlight.outbound.segments.length - 1].destination || 'DEL',
    departureDate: '2026-11-10',
    returnDate: '2026-12-10',
    passengers: '1 Adult',
    tripType: initialFlight?.returnFlight ? 'round-trip' : 'round-trip',
    cabin: 'economy',
    flexibleDates: true,
    studentLuggage: false,
    notes: initialFlight ? `Inquiring for ${initialFlight.airline} fare quote` : '',
    preferredContact: 'whatsapp',
  });

  const [submitted, setSubmitted] = useState(false);
  const [inquiryId, setInquiryId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `FF-${Math.floor(100000 + Math.random() * 900000)}`;
    setInquiryId(generatedId);
    setSubmitted(true);
  };

  const handleSendToWhatsApp = () => {
    const text = encodeURIComponent(
      `✈️ *Flyfello Custom Flight Inquiry* (Ref #${inquiryId})\n\n` +
      `👤 *Name:* ${formData.name}\n` +
      `📞 *Phone:* ${formData.phone}\n` +
      `📧 *Email:* ${formData.email}\n` +
      `🛫 *Route:* ${formData.origin} ➔ ${formData.destination}\n` +
      `🗓️ *Departure:* ${formData.departureDate}\n` +
      `${formData.tripType === 'round-trip' ? `🔄 *Return:* ${formData.returnDate}\n` : ''}` +
      `👥 *Passengers:* ${formData.passengers}\n` +
      `💺 *Cabin:* ${formData.cabin.toUpperCase()}\n` +
      `📅 *Dates Flexible:* ${formData.flexibleDates ? 'Yes (+/- 3 days for cheapest fare)' : 'Fixed dates'}\n` +
      `🧳 *Student Luggage Request:* ${formData.studentLuggage ? 'Yes (3x 23kg requested)' : 'Standard 2x 23kg'}\n` +
      `📝 *Notes:* ${formData.notes || 'None'}\n\n` +
      `Please provide the lowest consolidated quote!`
    );
    window.open(`https://wa.me/16048326304?text=${text}`, '_blank');
  };

  return (
    <section id="custom-quote" className="scroll-mt-24 py-16 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl text-white relative overflow-hidden">
          {/* Subtle gold decoration */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />

          {submitted ? (
            <div className="text-center py-10 space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto ring-1 ring-emerald-500/30">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <span className="text-xs font-mono font-bold bg-slate-800 text-amber-400 px-3 py-1 rounded-full">
                  Inquiry Reference #{inquiryId}
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
                  Inquiry Received Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto mt-2 leading-relaxed">
                  Thank you, <strong>{formData.name}</strong>. Our ticketing desk at <strong>flyfello@hotmail.com</strong> has received your travel details and will check live agent seat allocations.
                </p>
              </div>

              {/* Fast-track to WhatsApp CTA */}
              <div className="pt-4 max-w-md mx-auto space-y-3">
                <button
                  type="button"
                  onClick={handleSendToWhatsApp}
                  className="w-full py-3.5 px-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm rounded-xl transition-all shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 text-slate-950" />
                  <span>Get Quote Right Now on WhatsApp (+1 604-832-6304)</span>
                </button>

                <p className="text-[11px] text-slate-400">
                  Fastest response: Sending directly to WhatsApp gets you answers within 2 to 5 minutes!
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-xs text-slate-400 hover:text-white underline pt-2 cursor-pointer"
                >
                  Submit Another Quote Request
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-8">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
                  <span>Custom Itineraries & Group Bookings</span>
                  <span className="text-slate-600" aria-hidden="true">·</span>
                  <span>USA, Canada & UK to India</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Request an Exclusive Fare Quote
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-2">
                  Have special dates, student luggage requirements, or travel with a family group? Our certified agents scour unpublished consolidator blocks to beat online rates.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Row 1: Name, Phone, Email */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jaspreet Gill"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full h-11 px-3.5 bg-slate-800/90 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Phone Number (WhatsApp) *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (604) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full h-11 px-3.5 bg-slate-800/90 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full h-11 px-3.5 bg-slate-800/90 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>
                </div>

                {/* Row 2: Route, Departure, Return */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Departure City / Code
                    </label>
                    <select
                      value={formData.origin}
                      onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                      className="w-full h-11 px-3 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                    >
                      <optgroup label="🇨🇦 Canada">
                        {CANADA_AIRPORTS.map((a) => (
                          <option key={`ca-${a.code}`} value={a.code}>
                            {a.city} ({a.code}) - {a.name}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="🇺🇸 United States">
                        {USA_AIRPORTS.map((a) => (
                          <option key={`us-${a.code}`} value={a.code}>
                            {a.city} ({a.code}) - {a.name}
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="🇬🇧 United Kingdom">
                        {UK_AIRPORTS.map((a) => (
                          <option key={`uk-${a.code}`} value={a.code}>
                            {a.city} ({a.code}) - {a.name}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Destination City in India
                    </label>
                    <select
                      value={formData.destination}
                      onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                      className="w-full h-11 px-3 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                    >
                      {INDIA_AIRPORTS.map((a) => (
                        <option key={a.code} value={a.code}>
                          {a.city} ({a.code}) {a.region ? `· ${a.region}` : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Departure Date
                    </label>
                    <input
                      type="date"
                      value={formData.departureDate}
                      onChange={(e) => setFormData({ ...formData, departureDate: e.target.value })}
                      className="w-full h-11 px-3 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Return Date
                    </label>
                    <input
                      type="date"
                      value={formData.returnDate}
                      onChange={(e) => setFormData({ ...formData, returnDate: e.target.value })}
                      className="w-full h-11 px-3 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>
                </div>

                {/* Row 3: Passengers, Cabin, Preferred Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Travelers & Group Size
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 2 Adults, 1 Child (5y)"
                      value={formData.passengers}
                      onChange={(e) => setFormData({ ...formData, passengers: e.target.value })}
                      className="w-full h-11 px-3.5 bg-slate-800/90 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Cabin Class
                    </label>
                    <select
                      value={formData.cabin}
                      onChange={(e) => setFormData({ ...formData, cabin: e.target.value as any })}
                      className="w-full h-11 px-3 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-400"
                    >
                      <option value="economy">Economy (2x 23kg)</option>
                      <option value="premium">Premium Economy</option>
                      <option value="business">Business Class (Lie Flat)</option>
                      <option value="first">First Class</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Preferred Reply Channel
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, preferredContact: 'whatsapp' })}
                        className={`py-2.5 rounded-lg text-xs font-bold transition-colors ${
                          formData.preferredContact === 'whatsapp'
                            ? 'bg-emerald-500 text-slate-950'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        WhatsApp
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, preferredContact: 'call' })}
                        className={`py-2.5 rounded-lg text-xs font-bold transition-colors ${
                          formData.preferredContact === 'call'
                            ? 'bg-amber-500 text-slate-950'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        Call
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, preferredContact: 'email' })}
                        className={`py-2.5 rounded-lg text-xs font-bold transition-colors ${
                          formData.preferredContact === 'email'
                            ? 'bg-sky-500 text-slate-950'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        Email
                      </button>
                    </div>
                  </div>
                </div>

                {/* Special checkboxes */}
                <div className="flex flex-wrap items-center gap-6 pt-1 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input
                      type="checkbox"
                      checked={formData.flexibleDates}
                      onChange={(e) => setFormData({ ...formData, flexibleDates: e.target.checked })}
                      className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 border-slate-700 bg-slate-800"
                    />
                    <span>Dates Flexible (+/- 3 days for cheapest fare)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                    <input
                      type="checkbox"
                      checked={formData.studentLuggage}
                      onChange={(e) => setFormData({ ...formData, studentLuggage: e.target.checked })}
                      className="w-4 h-4 rounded text-amber-500 focus:ring-amber-400 border-slate-700 bg-slate-800"
                    />
                    <span>International Student (Check 3rd baggage / extra 23kg availability)</span>
                  </label>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Special Requests (Airline preference, layover preference, wheelchair assistance, etc.)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Prefer Air India direct or Emirates via Dubai. Need wheelchair assistance at transit for grandmother."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-400">
                    Direct agent hotline: <strong className="text-white">+1 (604) 832-6304</strong> · <strong className="text-slate-300">flyfello@hotmail.com</strong>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Inquiry for Best Quote</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
