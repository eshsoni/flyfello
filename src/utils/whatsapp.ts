import { SearchParams } from '../types';
import { getAirport } from '../data/airports';

export function buildWhatsAppFlightQueryUrl(params: SearchParams): string {
  const originAirport = getAirport(params.origin) || { city: params.origin, code: params.origin, flag: '🇨🇦' };
  const destAirport = getAirport(params.destination) || { city: params.destination, code: params.destination, flag: '🇮🇳' };

  const tripLabel = params.tripType === 'round-trip' ? 'Round Trip' : params.tripType === 'one-way' ? 'One Way' : 'Multi-City';
  const cabinLabel = params.cabin.charAt(0).toUpperCase() + params.cabin.slice(1);
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
    `🧳 *Baggage:* 2x 23kg Check-in Bags Included\n` +
    `⚡ *Direct Flights Preferred:* ${params.directOnly ? 'Yes' : 'Direct & 1-Stop Options'}\n` +
    `💵 *Currency:* ${params.currency}\n\n` +
    `Hello Flyfello team! Please share the lowest consolidated agent fares and seat availability for this route.`;

  return `https://wa.me/16048326304?text=${encodeURIComponent(text)}`;
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
}, currency: 'CAD' | 'USD' | 'GBP'): string {
  let price = `$${deal.priceCad} CAD`;
  if (currency === 'USD') price = `$${deal.priceUsd} USD`;
  if (currency === 'GBP') price = `£${Math.round(deal.priceCad * 0.58)} GBP`;
  const text =
    `✈️ *Flyfello Promo Route Inquiry*\n\n` +
    `🛫 *Route:* ${deal.fromCity} (${deal.fromCode}) ➔ ${deal.toCity} (${deal.toCode})\n` +
    `🏢 *Airline:* ${deal.airline} (${deal.stops})\n` +
    `🏷️ *Featured Rate:* From ${price} (Includes 2x 23kg Baggage)\n\n` +
    `Hi Flyfello! I would like to check available dates and book this route deal.`;

  return `https://wa.me/16048326304?text=${encodeURIComponent(text)}`;
}
