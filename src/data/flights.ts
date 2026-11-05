import { FlightOption, SearchParams } from '../types';
import { getAirport } from './airports';

export const FEATURED_ROUTE_DEALS = [
  {
    id: 'deal-1',
    fromCode: 'YVR',
    fromCity: 'Vancouver',
    toCode: 'DEL',
    toCity: 'Delhi',
    airline: 'Air India',
    airlineCode: 'AI',
    stops: 'Non-stop Direct',
    flightTime: '14h 25m',
    priceCad: 1480,
    priceUsd: 1095,
    tag: 'Bestseller Direct',
    baggage: '2 x 23 kg Included',
    badge: 'Save $260',
  },
  {
    id: 'deal-2',
    fromCode: 'YYZ',
    fromCity: 'Toronto',
    toCode: 'ATQ',
    toCity: 'Amritsar',
    airline: 'Qatar Airways',
    airlineCode: 'QR',
    stops: '1-Stop via Doha',
    flightTime: '18h 10m',
    priceCad: 1540,
    priceUsd: 1140,
    tag: 'Top Rated Punjab',
    baggage: '2 x 23 kg Included',
    badge: 'Popular Route',
  },
  {
    id: 'deal-3',
    fromCode: 'SFO',
    fromCity: 'San Francisco',
    toCode: 'BLR',
    toCity: 'Bengaluru',
    airline: 'Air India',
    airlineCode: 'AI',
    stops: 'Non-stop Direct',
    flightTime: '17h 45m',
    priceCad: 1590,
    priceUsd: 1175,
    tag: 'Silicon to Tech Hub',
    baggage: '2 x 23 kg Included',
    badge: 'Fastest Route',
  },
  {
    id: 'deal-4',
    fromCode: 'YYC',
    fromCity: 'Calgary',
    toCode: 'AMD',
    toCity: 'Ahmedabad',
    airline: 'Emirates',
    airlineCode: 'EK',
    stops: '1-Stop via Dubai',
    flightTime: '19h 30m',
    priceCad: 1620,
    priceUsd: 1198,
    tag: 'Seamless Transit',
    baggage: '2 x 23 kg Included',
    badge: 'Save $310',
  },
  {
    id: 'deal-5',
    fromCode: 'JFK',
    fromCity: 'New York',
    toCode: 'BOM',
    toCity: 'Mumbai',
    airline: 'Emirates',
    airlineCode: 'EK',
    stops: '1-Stop via Dubai',
    flightTime: '17h 50m',
    priceCad: 1420,
    priceUsd: 1050,
    tag: 'Premium Economy Deal',
    baggage: '2 x 23 kg Included',
    badge: 'High Demand',
  },
  {
    id: 'deal-6',
    fromCode: 'ORD',
    fromCity: 'Chicago',
    toCode: 'HYD',
    toCity: 'Hyderabad',
    airline: 'Lufthansa',
    airlineCode: 'LH',
    stops: '1-Stop via Frankfurt',
    flightTime: '18h 40m',
    priceCad: 1510,
    priceUsd: 1120,
    tag: 'Express Connection',
    baggage: '2 x 23 kg Included',
    badge: 'Free Seat Choice',
  },
];

// Generates dynamic, realistic consolidated flight options based on search criteria
export function generateSearchResults(params: SearchParams): FlightOption[] {
  const originAirport = getAirport(params.origin) || { city: params.origin, code: params.origin, country: 'Canada' };
  const destAirport = getAirport(params.destination) || { city: params.destination, code: params.destination, country: 'India' };

  // Base price modifier by cabin
  let cabinMultiplier = 1;
  if (params.cabin === 'premium') cabinMultiplier = 1.65;
  if (params.cabin === 'business') cabinMultiplier = 2.85;
  if (params.cabin === 'first') cabinMultiplier = 4.2;

  // Base price modifier if one-way vs round-trip
  const tripMultiplier = params.tripType === 'one-way' ? 0.62 : 1.0;

  // Realistic airline templates operating North America - India
  const templates = [
    {
      airline: 'Air India',
      code: 'AI',
      direct: true,
      aircraft: 'Boeing 777-300ER',
      baseCad: 1470,
      departureTime: '11:15 AM',
      arrivalTime: '03:45 PM',
      duration: '14h 30m',
      stops: 0,
      stopovers: [],
      returnDep: '02:30 AM',
      returnArr: '07:15 AM',
      returnDur: '15h 15m',
      tags: ['Non-Stop Direct', 'Free Hot Indian Meals', '2x 23kg Luggage'],
    },
    {
      airline: 'Emirates',
      code: 'EK',
      direct: false,
      aircraft: 'Airbus A380 / Boeing 777',
      baseCad: 1530,
      departureTime: '01:40 PM',
      arrivalTime: '09:25 PM',
      duration: '18h 15m',
      stops: 1,
      stopovers: ['DXB (Dubai)'],
      returnDep: '04:15 AM',
      returnArr: '01:10 PM',
      returnDur: '19h 40m',
      tags: ['Award-Winning Service', 'Dubai Stopover Option', '2x 23kg Included'],
    },
    {
      airline: 'Qatar Airways',
      code: 'QR',
      direct: false,
      aircraft: 'Boeing 787-9 / Airbus A350',
      baseCad: 1510,
      departureTime: '08:20 PM',
      arrivalTime: '04:50 AM',
      duration: '17h 55m',
      stops: 1,
      stopovers: ['DOH (Doha)'],
      returnDep: '09:40 AM',
      returnArr: '06:15 PM',
      returnDur: '18h 25m',
      tags: ['World Best Airline 2024', 'Short 2h Layover', '2x 23kg Luggage'],
    },
    {
      airline: 'Air Canada',
      code: 'AC',
      direct: true,
      aircraft: 'Boeing 787-9 Dreamliner',
      baseCad: 1580,
      departureTime: '07:45 PM',
      arrivalTime: '09:55 PM',
      duration: '14h 40m',
      stops: 0,
      stopovers: [],
      returnDep: '11:55 PM',
      returnArr: '06:30 AM',
      returnDur: '15h 05m',
      tags: ['Star Alliance', 'Aeroplan Points', '2x 23kg Baggage'],
    },
    {
      airline: 'Lufthansa',
      code: 'LH',
      direct: false,
      aircraft: 'Airbus A340 / A350',
      baseCad: 1490,
      departureTime: '04:30 PM',
      arrivalTime: '11:45 PM',
      duration: '18h 45m',
      stops: 1,
      stopovers: ['FRA (Frankfurt)'],
      returnDep: '03:10 AM',
      returnArr: '12:50 PM',
      returnDur: '19h 10m',
      tags: ['European Comfort', 'Complimentary Wine & Beer', '2x 23kg Included'],
    },
    {
      airline: 'Virgin Atlantic / Delta',
      code: 'VS',
      direct: false,
      aircraft: 'Boeing 787-9',
      baseCad: 1560,
      departureTime: '06:10 PM',
      arrivalTime: '02:20 AM',
      duration: '19h 10m',
      stops: 1,
      stopovers: ['LHR (London Heathrow)'],
      returnDep: '10:30 AM',
      returnArr: '07:40 PM',
      returnDur: '19h 45m',
      tags: ['Top Entertainment', 'London Transit', '2x 23kg Included'],
    },
  ];

  let filtered = templates;
  if (params.directOnly) {
    filtered = templates.filter(t => t.direct);
    if (filtered.length === 0) {
      filtered = templates.slice(0, 2);
    }
  }

  return filtered.map((t, index) => {
    const rawCad = Math.round(t.baseCad * cabinMultiplier * tripMultiplier);
    const rawUsd = Math.round(rawCad * 0.74);
    const origCad = Math.round(rawCad * 1.18);
    const origUsd = Math.round(rawUsd * 1.18);

    const segmentsOut = [
      {
        flightNumber: `${t.code} ${100 + index * 12}`,
        airline: t.airline,
        airlineCode: t.code,
        aircraft: t.aircraft,
        origin: originAirport.code,
        destination: t.stops > 0 ? t.stopovers[0].split(' ')[0] : destAirport.code,
        departureTime: t.departureTime,
        arrivalTime: t.stops > 0 ? '07:15 PM' : t.arrivalTime,
        duration: t.stops > 0 ? '11h 20m' : t.duration,
        dayOffset: t.stops > 0 ? 0 : 1,
      },
    ];

    if (t.stops > 0) {
      segmentsOut.push({
        flightNumber: `${t.code} ${300 + index * 14}`,
        airline: t.airline,
        airlineCode: t.code,
        aircraft: 'Airbus A321neo / Boeing 777',
        origin: t.stopovers[0].split(' ')[0],
        destination: destAirport.code,
        departureTime: '09:40 PM',
        arrivalTime: t.arrivalTime,
        duration: '4h 15m',
        dayOffset: 1,
      });
    }

    return {
      id: `fl-${t.code}-${index}`,
      airline: t.airline,
      airlineCode: t.code,
      airlineLogoText: t.code,
      outbound: {
        stops: t.stops,
        stopoverCities: t.stopovers,
        departureTime: t.departureTime,
        arrivalTime: t.arrivalTime,
        duration: t.duration,
        dayOffset: 1,
        segments: segmentsOut,
      },
      returnFlight: params.tripType === 'round-trip' ? {
        stops: t.stops,
        stopoverCities: t.stopovers,
        departureTime: t.returnDep,
        arrivalTime: t.returnArr,
        duration: t.returnDur,
        dayOffset: 1,
        segments: [
          {
            flightNumber: `${t.code} ${200 + index * 11}`,
            airline: t.airline,
            airlineCode: t.code,
            aircraft: t.aircraft,
            origin: destAirport.code,
            destination: originAirport.code,
            departureTime: t.returnDep,
            arrivalTime: t.returnArr,
            duration: t.returnDur,
            dayOffset: 1,
          }
        ],
      } : undefined,
      baggage: {
        cabin: '1 x 7 kg Cabin + 1 Personal Bag',
        checked: '2 x 23 kg Checked Baggage (Guaranteed)',
      },
      priceCad: rawCad,
      priceUsd: rawUsd,
      originalPriceCad: origCad,
      originalPriceUsd: origUsd,
      seatsLeft: Math.floor(Math.random() * 4) + 2,
      tags: t.tags,
      refundable: true,
    };
  });
}
