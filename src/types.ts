export interface Airport {
  code: string;
  city: string;
  name: string;
  country: string;
  flag: string;
  popular?: boolean;
  region?: string;
}

export type TripType = 'round-trip' | 'one-way' | 'multi-city';
export type CabinClass = 'economy' | 'premium' | 'business' | 'first';

export interface SearchParams {
  origin: string; // airport code e.g. YVR
  destination: string; // airport code e.g. DEL
  departureDate: string;
  returnDate?: string;
  tripType: TripType;
  cabin: CabinClass;
  adults: number;
  children: number;
  infants: number;
  directOnly: boolean;
  currency: 'CAD' | 'USD' | 'GBP';
}

export interface FlightSegment {
  flightNumber: string;
  airline: string;
  airlineCode: string;
  aircraft: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  dayOffset?: number;
}

export interface FlightOption {
  id: string;
  airline: string;
  airlineCode: string;
  airlineLogoText: string;
  outbound: {
    stops: number;
    stopoverCities: string[];
    departureTime: string;
    arrivalTime: string;
    duration: string;
    dayOffset?: number;
    segments: FlightSegment[];
  };
  returnFlight?: {
    stops: number;
    stopoverCities: string[];
    departureTime: string;
    arrivalTime: string;
    duration: string;
    dayOffset?: number;
    segments: FlightSegment[];
  };
  baggage: {
    cabin: string;
    checked: string;
  };
  priceCad: number;
  priceUsd: number;
  originalPriceCad: number;
  originalPriceUsd: number;
  seatsLeft: number;
  tags: string[];
  refundable: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  route: string;
  airline: string;
  date: string;
  rating: number;
  avatar: string;
  category: 'Family' | 'Student' | 'Last Minute' | 'Business';
  content: string;
  highlight: string;
}

export interface InquiryFormData {
  name: string;
  phone: string;
  email: string;
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  passengers: string;
  tripType: TripType;
  cabin: CabinClass;
  flexibleDates: boolean;
  studentLuggage: boolean;
  notes: string;
  preferredContact: 'whatsapp' | 'call' | 'email';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent' | 'system';
  text: string;
  timestamp: string;
  quickActions?: { label: string; action: string }[];
}
