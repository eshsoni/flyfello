import { SearchParams } from '../types';
import { getAirport } from '../data/airports';

export function buildWhatsAppFlightQueryUrl(params: SearchParams): string {
  const originAirport = getAirport(params.origin) || { city: params.origin, code: params.origin, flag: '🇨🇦' };
  const destAirport = getAirport(params.destination) || { city: params.destination, code: params.destination, flag: '🇮🇳' };

  const tripLabel = params.tripType === 'round-trip' ? 'Round Trip' : params.tripType === 'one-way' ? 'One Way' : 'Multi-City';
  const isTwoBags =
    params.cabin === 'extra-baggage' ||
    params.cabin === 'premium' ||
    params.cabin === 'business' ||
    params.cabin === 'first';
  const cabinLabel =
    params.cabin === 'extra-baggage'
      ? 'Economy (2x 23kg Bags + 7kg Cabin)'
      : params.cabin === 'economy'
      ? 'Economy (1x 23kg Bag + 7kg Cabin)'
      : params.cabin.charAt(0).toUpperCase() + params.cabin.slice(1);
  const baggageLabel = isTwoBags
    ? '2x 23kg Checked Bags + 7kg Cabin'
    : '1x 23kg Checked Bag + 7kg Cabin';
  const totalPassengers = params.adults + params.children + params.infants;

  const text =
    `✈️ *Flyfello Flight Fare Inquiry*\n\n` +
    `🛫 *From:* ${originAirport.city} (${params.origin}) ${originAirport.flag}\n` +
    `🛬 *To:* ${destAirport.city} (${params.destination}) ${destAirport.flag}\n` +
    `🗓️ *Departure Date:* ${params.departureDate}\n` +
    (params.tripType === 'round-trip' && params.returnDate ? `🔄 *Return Date:* ${params.returnDate}\n` : '') +
    `🧭 *Trip Type:* ${tripLabel}\n` +
    `👥 *Travelers:* ${totalPassengers} (${params.adults} Adult${params.adults > 1 ? 's' : ''}` +
    (params.children > 0 ? `, ${params.children} Child${params.children > 1 ? 'ren' : ''}` : '') +
    (params.infants > 0 ? `, ${params.infants} Infant${params.infants > 1 ? 's' : ''}` : '') +
    `)\n` +
    `💺 *Cabin Class:* ${cabinLabel}\n` +
    `🧳 *Baggage:* ${baggageLabel}\n` +
    `⚡ *Direct Flights Preferred:* ${params.directOnly ? 'Yes' : 'Direct & 1-Stop Options'}\n` +
    `💵 *Currency:* ${params.currency}\n\n` +
    `Hello Flyfello team! Please share the lowest consolidated agent fares and seat availability for this route.`;

  return `https://wa.me/17372904745?text=${encodeURIComponent(text)}`;
}

export function buildWhatsAppRouteDealUrl(deal: {
  fromCity: string;
  fromCode: string;
  toCity: string;
  toCode: string;
  airline: string;
  priceCad: number;
  priceUsd: number;
  stops: string;
}, currency: 'CAD' | 'USD' | 'GBP' | 'INR'): string {
  let price = `$${deal.priceCad} CAD`;
  if (currency === 'USD') price = `$${deal.priceUsd} USD`;
  if (currency === 'GBP') price = `£${Math.round(deal.priceCad * 0.58)} GBP`;
  if (currency === 'INR') price = `₹${Math.round(deal.priceCad * 62).toLocaleString('en-IN')} INR`;
  const text =
    `✈️ *Flyfello Promo Route Inquiry*\n\n` +
    `🛫 *Route:* ${deal.fromCity} (${deal.fromCode}) ➔ ${deal.toCity} (${deal.toCode})\n` +
    `🏢 *Airline:* ${deal.airline} (${deal.stops})\n` +
    `🏷️ *Featured Rate:* From ${price} (1x 23kg Bag + 7kg Cabin)\n\n` +
    `Hi Flyfello! I would like to check available dates and book this route deal.`;

  return `https://wa.me/17372904745?text=${encodeURIComponent(text)}`;
}

export const WHATSAPP_API_NUMBER = '17372904745';

export function buildWhatsAppSupportUrl(
  message = 'Hi Flyfello Support! I would like assistance with a flight booking.'
): string {
  return `https://wa.me/${WHATSAPP_API_NUMBER}?text=${encodeURIComponent(message)}`;
}

export interface HotelWhatsAppInquiry {
  hotelName: string;
  destination: string;
  roomType: string;
  mealPlan: string;
  checkIn: string;
  checkOut: string;
  nights: number;
  rooms: number;
  adults: number;
  children: number;
  fullName: string;
  phone: string;
  email: string;
  specialRequests?: string;
}

export function buildWhatsAppHotelQueryUrl(inquiry: HotelWhatsAppInquiry): string {
  const text =
    `🏨 *FlyFello Hotel Booking Query*\n\n` +
    `✨ *Hotel / Property:* ${inquiry.hotelName}\n` +
    `📍 *Destination:* ${inquiry.destination}\n` +
    `🛏️ *Room Type:* ${inquiry.roomType}\n` +
    `🍽️ *Meal Plan:* ${inquiry.mealPlan}\n` +
    `📅 *Check-in:* ${inquiry.checkIn}\n` +
    `📅 *Check-out:* ${inquiry.checkOut} (${inquiry.nights} Night${inquiry.nights === 1 ? '' : 's'})\n` +
    `👥 *Occupancy:* ${inquiry.rooms} Room${inquiry.rooms > 1 ? 's' : ''} · ${inquiry.adults} Adult${inquiry.adults > 1 ? 's' : ''}` +
    (inquiry.children > 0 ? `, ${inquiry.children} Child${inquiry.children > 1 ? 'ren' : ''}` : '') +
    `\n\n👤 *Guest Name:* ${inquiry.fullName}\n` +
    `📱 *Phone / WhatsApp:* ${inquiry.phone}\n` +
    `✉️ *Email:* ${inquiry.email}\n` +
    (inquiry.specialRequests?.trim() ? `📝 *Special Requests:* ${inquiry.specialRequests.trim()}\n` : '') +
    `\nHi FlyFello team! Please share room availability and your best wholesale hotel rates for these dates.`;

  return `https://wa.me/${WHATSAPP_API_NUMBER}?text=${encodeURIComponent(text)}`;
}

export interface VisaWhatsAppInquiry {
  country: string;
  visaType: string;
  nationality: string;
  travelDate: string;
  applicants: number;
  departureCity: string;
  fullName: string;
  phone: string;
  email: string;
  notes?: string;
}

export function buildWhatsAppVisaQueryUrl(inquiry: VisaWhatsAppInquiry): string {
  const text =
    `🛂 *FlyFello Visa Assistance Inquiry*\n\n` +
    `🌍 *Destination Country:* ${inquiry.country}\n` +
    `📄 *Visa Category:* ${inquiry.visaType}\n` +
    `🪪 *Passport Nationality:* ${inquiry.nationality}\n` +
    `🛫 *Departure City:* ${inquiry.departureCity}\n` +
    `🗓️ *Intended Travel Date:* ${inquiry.travelDate}\n` +
    `👥 *Applicants:* ${inquiry.applicants}\n\n` +
    `👤 *Applicant Name:* ${inquiry.fullName}\n` +
    `📱 *Phone / WhatsApp:* ${inquiry.phone}\n` +
    `✉️ *Email:* ${inquiry.email}\n` +
    (inquiry.notes?.trim() ? `📝 *Notes:* ${inquiry.notes.trim()}\n` : '') +
    `\nHi FlyFello Visa Desk! Please share the document checklist, visa fees, and processing timeline.`;

  return `https://wa.me/${WHATSAPP_API_NUMBER}?text=${encodeURIComponent(text)}`;
}

export interface EsimWhatsAppInquiry {
  destination: string;
  planName: string;
  dataAllowance: string;
  validity: string;
  travelDate: string;
  deviceModel: string;
  quantity: number;
  fullName: string;
  phone: string;
  email: string;
  notes?: string;
}

export function buildWhatsAppEsimQueryUrl(inquiry: EsimWhatsAppInquiry): string {
  const text =
    `📶 *FlyFello International eSIM Order / Inquiry*\n\n` +
    `🌍 *Destination / Region:* ${inquiry.destination}\n` +
    `📦 *Selected Plan:* ${inquiry.planName} (${inquiry.dataAllowance} · ${inquiry.validity})\n` +
    `🔢 *Quantity:* ${inquiry.quantity} eSIM${inquiry.quantity > 1 ? 's' : ''}\n` +
    `🗓️ *Travel Start Date:* ${inquiry.travelDate}\n` +
    `📱 *Phone Model:* ${inquiry.deviceModel}\n\n` +
    `👤 *Name:* ${inquiry.fullName}\n` +
    `💬 *WhatsApp Number:* ${inquiry.phone}\n` +
    `✉️ *Email:* ${inquiry.email}\n` +
    (inquiry.notes?.trim() ? `📝 *Notes:* ${inquiry.notes.trim()}\n` : '') +
    `\nHi FlyFello team! Please share activation details and payment instructions for this travel eSIM.`;

  return `https://wa.me/${WHATSAPP_API_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function triggerWhatsAppLink(url: string): void {
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.target = '_blank';
  anchor.rel = 'noopener noreferrer';
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
}

