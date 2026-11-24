import hotelDubaiImg from '../assets/images/hotel_dubai_luxury_1795512011353.jpg';
import hotelBaliImg from '../assets/images/hotel_bali_villa_1795512011823.jpg';
import hotelThailandImg from '../assets/images/hotel_thailand_resort_1795512013444.jpg';
import hotelSingaporeImg from '../assets/images/hotel_singapore_skyline_1795512012956.jpg';
import hotelIndiaImg from '../assets/images/hotel_india_palace_1795512013118.jpg';
import hotelMaldivesImg from '../assets/images/hotel_maldives_water_1795512013694.jpg';

export type HotelDestinationGroup =
  | 'All'
  | 'Dubai'
  | 'Bali'
  | 'Thailand'
  | 'Singapore'
  | 'Maldives'
  | 'Vietnam'
  | 'India'
  | 'USA & Canada';

export type HotelCategory =
  | 'Luxury Resort'
  | 'Private Villa'
  | 'Beachfront'
  | 'Boutique Heritage'
  | 'Business & City'
  | 'Family Resort';

export interface HotelRoomOption {
  name: string;
  bedding: string;
  size: string;
  maxOccupancy: string;
  note: string;
}

export interface HotelProperty {
  id: string;
  name: string;
  city: string;
  country: string;
  destinationGroup: Exclude<HotelDestinationGroup, 'All'>;
  category: HotelCategory;
  stars: 3 | 4 | 5;
  startingRateInr: number;
  startingRateUsd: number;
  image: string;
  neighborhood: string;
  shortSummary: string;
  fullDescription: string[];
  highlights: string[];
  amenities: string[];
  roomOptions: HotelRoomOption[];
  boardOptions: string[];
  checkInTime: string;
  checkOutTime: string;
  distanceNote: string;
}

export const HOTEL_DESTINATION_GROUPS: HotelDestinationGroup[] = [
  'All',
  'Dubai',
  'Bali',
  'Thailand',
  'Singapore',
  'Maldives',
  'Vietnam',
  'India',
  'USA & Canada',
];

export const HOTEL_CATEGORIES: ('All' | HotelCategory)[] = [
  'All',
  'Luxury Resort',
  'Private Villa',
  'Beachfront',
  'Boutique Heritage',
  'Business & City',
  'Family Resort',
];

export const HOTEL_PROPERTIES: HotelProperty[] = [
  {
    id: 'dubai-marina-palm-grand',
    name: 'Marina Waterfront & Palm Crescent Resort',
    city: 'Dubai',
    country: 'United Arab Emirates',
    destinationGroup: 'Dubai',
    category: 'Luxury Resort',
    stars: 5,
    startingRateInr: 18500,
    startingRateUsd: 220,
    image: hotelDubaiImg,
    neighborhood: 'Dubai Marina & JBR Waterfront',
    shortSummary:
      'Waterfront 5-star retreat featuring temperature-controlled infinity pools, Marina views, private beach access, and complimentary shuttle to Mall of the Emirates.',
    fullDescription: [
      'Positioned along the Dubai Marina promenade overlooking JBR and Bluewaters Island, this contemporary 5-star waterfront resort combines spacious family suites with direct access to promenades, dining, and leisure attractions.',
      'Ideal for both quick Dubai stopovers from India/North America and full 5-night family holidays, FlyFello guests receive preferred wholesale room allotments with optional half-board Indian/International buffet dining and private DXB airport transfers.',
    ],
    highlights: [
      'Temperature-controlled infinity pool overlooking Marina yachts',
      'Interconnecting family rooms & 2-bedroom waterfront residences available',
      'Vegetarian, Jain & Indian breakfast selections daily',
      '25 minutes from Dubai International Airport (DXB)',
    ],
    amenities: [
      'Private Beach Access',
      'Infinity Pool',
      'Kids Club',
      'Spa & Hammam',
      '24h Concierge',
      'High-Speed Wi-Fi',
      'Airport Shuttle Option',
      'Fitness Studio',
    ],
    roomOptions: [
      {
        name: 'Marina Skyline Deluxe King / Twin',
        bedding: '1 King or 2 Twin Beds',
        size: '44 sq.m',
        maxOccupancy: '2 Adults + 1 Child',
        note: 'Private balcony facing Dubai Marina',
      },
      {
        name: 'Palm View Club Suite',
        bedding: '1 King Bed + Sofa Bed',
        size: '68 sq.m',
        maxOccupancy: '3 Adults or 2 Adults + 2 Children',
        note: 'Includes Club Lounge evening refreshments',
      },
      {
        name: 'Two-Bedroom Waterfront Family Suite',
        bedding: '1 King + 2 Twin Beds',
        size: '108 sq.m',
        maxOccupancy: '4 Adults + 2 Children',
        note: 'Living dining area & dual bathrooms',
      },
    ],
    boardOptions: ['Room Only', 'Breakfast Included', 'Half Board (Breakfast + Dinner)', 'All-Inclusive'],
    checkInTime: '3:00 PM',
    checkOutTime: '12:00 PM',
    distanceNote: '6 min walk to Marina Promenade · 22 min drive to Downtown Burj Khalifa',
  },
  {
    id: 'dubai-downtown-boulevard',
    name: 'Downtown Boulevard Executive Hotel',
    city: 'Dubai',
    country: 'United Arab Emirates',
    destinationGroup: 'Dubai',
    category: 'Business & City',
    stars: 4,
    startingRateInr: 11200,
    startingRateUsd: 135,
    image: hotelDubaiImg,
    neighborhood: 'Downtown Dubai & Business Bay',
    shortSummary:
      'Modern 4-star city hotel minutes from Dubai Mall and Burj Khalifa with rooftop pool, metro connectivity, and seamless late check-out options.',
    fullDescription: [
      'Designed for travelers wanting effortless access to Downtown Dubai, Dubai Mall, and Burj Khalifa without paying beachfront resort premiums. Bright acoustic-glazed rooms ensure quiet rest after full days of sightseeing or business meetings.',
      'FlyFello can bundle this property with Dubai Tourist Visas, Desert Safari pickups, and Burj Khalifa At The Top tickets on a single confirmed itinerary.',
    ],
    highlights: [
      '7-minute taxi or shuttle to Dubai Mall & Fountain Promenade',
      'Rooftop pool deck with skyline views',
      'Flexible early check-in / late check-out requests for overnight flights',
      'Connected rooms available for families',
    ],
    amenities: [
      'Rooftop Pool',
      'Metro Shuttle',
      'Indian & Continental Dining',
      'Business Lounge',
      'Free Valet Parking',
      'High-Speed Wi-Fi',
    ],
    roomOptions: [
      {
        name: 'Superior City Room',
        bedding: '1 Queen or 2 Twin Beds',
        size: '34 sq.m',
        maxOccupancy: '2 Adults + 1 Child',
        note: 'Walk-in rain shower & work desk',
      },
      {
        name: 'Burj View Executive Studio',
        bedding: '1 King Bed',
        size: '46 sq.m',
        maxOccupancy: '3 Adults',
        note: 'Upper floor views toward Downtown skyline',
      },
    ],
    boardOptions: ['Room Only', 'Breakfast Included', 'Half Board (Breakfast + Dinner)'],
    checkInTime: '2:00 PM',
    checkOutTime: '12:00 PM',
    distanceNote: '15 min from DXB Airport · 1.8 km from Dubai Mall',
  },
  {
    id: 'bali-ubud-canopy-villas',
    name: 'Ubud Canopy Private Pool Villas',
    city: 'Ubud, Bali',
    country: 'Indonesia',
    destinationGroup: 'Bali',
    category: 'Private Villa',
    stars: 5,
    startingRateInr: 14800,
    startingRateUsd: 178,
    image: hotelBaliImg,
    neighborhood: 'Ubud Emerald Ridge & Rice Terraces',
    shortSummary:
      'Secluded teak-wood private pool villas suspended above emerald Ubud valley terraces, featuring floating breakfast service and open-air Balinese soaking tubs.',
    fullDescription: [
      'Tucked away in the lush hills just 15 minutes from Ubud Palace, each standalone villa features handcrafted Balinese timber doors, a private temperature-balanced infinity plunge pool, and unobstructed views of tropical river valleys.',
      'Popular with honeymooners and quiet luxury travelers, our FlyFello villa rates include daily breakfast (with floating tray setup on request), welcome herbal drinks, and scheduled shuttle into Ubud center.',
    ],
    highlights: [
      'Every villa includes a 100% private infinity plunge pool',
      'Complimentary honeymoon flower bed & floating breakfast upgrade options',
      'Daily yoga pavilion sessions and organic spa treatments',
      'Vegetarian, Vegan & Indian spice menu prepared on request',
    ],
    amenities: [
      'Private Infinity Pool',
      'Floating Breakfast',
      'Balinese Spa',
      'Daily Yoga Deck',
      'Ubud Town Shuttle',
      '24h Butler Desk',
    ],
    roomOptions: [
      {
        name: 'One-Bedroom Jungle Pool Villa',
        bedding: '1 Four-Poster King Bed',
        size: '120 sq.m',
        maxOccupancy: '2 Adults',
        note: 'Private infinity pool & stone garden bathtub',
      },
      {
        name: 'Two-Bedroom Valley Sanctuary Villa',
        bedding: '2 King Beds',
        size: '210 sq.m',
        maxOccupancy: '4 Adults + 2 Children',
        note: 'Shared dining pavilion & large horizon pool',
      },
    ],
    boardOptions: ['Breakfast Included', 'Half Board (Breakfast + Dinner)', 'Honeymoon Special Board'],
    checkInTime: '2:00 PM',
    checkOutTime: '12:00 PM',
    distanceNote: '75 min from Ngurah Rai Airport (DPS) · 15 min to Ubud Art Market',
  },
  {
    id: 'bali-seminyak-beach-sanctuary',
    name: 'Seminyak Sunset Beachfront Resort',
    city: 'Seminyak, Bali',
    country: 'Indonesia',
    destinationGroup: 'Bali',
    category: 'Beachfront',
    stars: 4,
    startingRateInr: 9600,
    startingRateUsd: 115,
    image: hotelBaliImg,
    neighborhood: 'Seminyak Beachfront Promenade',
    shortSummary:
      'Lively 4-star beachfront resort steps from Seminyak dining, sunset beach clubs, and boutique shopping, with lagoon pool suites for families and groups.',
    fullDescription: [
      'Set directly along golden Seminyak sands, this 4-star resort pairs relaxed coastal rooms with direct pool-access suites. Guests walk effortlessly to beach clubs, cafes, spas, and boutiques without long traffic commutes.',
      'A favorite pairing with 2 nights in Ubud for balanced Bali holidays — we arrange private chauffeur transfers between airports, Ubud, and Seminyak.',
    ],
    highlights: [
      'Direct beachfront sunset deck and lagoon swimming pool',
      'Pool-access ground-floor rooms ideal for families & friend groups',
      'Walkable neighborhood with dozens of cafes & Indian restaurants',
      '30 minutes from Denpasar International Airport (DPS)',
    ],
    amenities: [
      'Beachfront Access',
      'Lagoon Swim-Up Bar',
      'Family Suites',
      'Kids Pool',
      'Tour Desk',
      'Free Wi-Fi',
    ],
    roomOptions: [
      {
        name: 'Garden Balcony Deluxe Room',
        bedding: '1 King or 2 Twin Beds',
        size: '40 sq.m',
        maxOccupancy: '2 Adults + 1 Child',
        note: 'Tropical courtyard balcony',
      },
      {
        name: 'Lagoon Pool Access Suite',
        bedding: '1 King Bed',
        size: '54 sq.m',
        maxOccupancy: '3 Adults',
        note: 'Direct terrace step-in to main lagoon pool',
      },
    ],
    boardOptions: ['Room Only', 'Breakfast Included', 'Half Board (Breakfast + Dinner)'],
    checkInTime: '3:00 PM',
    checkOutTime: '12:00 PM',
    distanceNote: '30 min from DPS Airport · Steps to Seminyak Beach',
  },
  {
    id: 'thailand-phuket-kamala-bay',
    name: 'Kamala Bay Andaman Beach Resort',
    city: 'Phuket',
    country: 'Thailand',
    destinationGroup: 'Thailand',
    category: 'Family Resort',
    stars: 5,
    startingRateInr: 11800,
    startingRateUsd: 142,
    image: hotelThailandImg,
    neighborhood: 'Kamala Beach & Andaman Coast',
    shortSummary:
      'Expansive beachfront Phuket resort with terraced ocean-view pavilions, kids water slides, sunset loungers, and easy ferry access to Phi Phi Islands.',
    fullDescription: [
      'Perched above the gentle crescent of Kamala Bay on Phuket’s west coast, this 5-star resort blends traditional Thai teak architecture with sweeping Andaman Sea horizons.',
      'Whether traveling with children for island hopping or celebrating an anniversary, guests enjoy tiered beachfront pools, beachfront dining terraces, and direct tour pickup for Phi Phi and James Bond Island excursions.',
    ],
    highlights: [
      'Uninterrupted Andaman sunset cove with private sunbed terrace',
      'Kids adventure pool, water slide & supervised activity pavilion',
      '20 minutes north of Patong nightlife while remaining peaceful',
      'Halal, Vegetarian & Indian buffet station at morning breakfast',
    ],
    amenities: [
      'Private Cove Beach',
      '3 Swimming Pools',
      'Kids Waterpark',
      'Thai Wellness Spa',
      'Ocean Dining Terrace',
      'Tour Concierge',
    ],
    roomOptions: [
      {
        name: 'Andaman Sea View Deluxe',
        bedding: '1 King or 2 Queen Beds',
        size: '45 sq.m',
        maxOccupancy: '2 Adults + 2 Children',
        note: 'Furnished ocean-facing balcony',
      },
      {
        name: 'Oceanfront Plunge Pool Pavilion',
        bedding: '1 King Bed',
        size: '78 sq.m',
        maxOccupancy: '3 Adults',
        note: 'Private cliffside plunge pool overlooking the bay',
      },
    ],
    boardOptions: ['Breakfast Included', 'Half Board (Breakfast + Dinner)', 'All-Inclusive'],
    checkInTime: '3:00 PM',
    checkOutTime: '12:00 PM',
    distanceNote: '35 min from Phuket Airport (HKT) · Direct beach access',
  },
  {
    id: 'thailand-bangkok-riverside',
    name: 'Chao Phraya Riverside Suites',
    city: 'Bangkok',
    country: 'Thailand',
    destinationGroup: 'Thailand',
    category: 'Business & City',
    stars: 4,
    startingRateInr: 7400,
    startingRateUsd: 89,
    image: hotelThailandImg,
    neighborhood: 'Chao Phraya Riverfront & Asiatique',
    shortSummary:
      'Well-connected 4-star Bangkok riverfront stay with complimentary river shuttle boat to BTS Skytrain and ICONSIAM shopping district.',
    fullDescription: [
      'Stay comfortably beside Bangkok’s historic Chao Phraya River without sitting in downtown traffic. Complimentary resort shuttle boats whisk you directly to Saphan Taksin BTS Skytrain and ICONSIAM every 20 minutes.',
      'Great for families combining Bangkok city shopping with Krabi or Phuket beach segments.',
    ],
    highlights: [
      'Complimentary shuttle boat to BTS Skytrain & ICONSIAM',
      'Spacious 48 sq.m two-bedroom river suites available for families',
      'Rooftop sky pool overlooking evening river cruise boats',
    ],
    amenities: [
      'River Shuttle Boat',
      'Infinity Pool',
      'Fitness Center',
      '24h Room Service',
      'Luggage Storage',
    ],
    roomOptions: [
      {
        name: 'River View Superior',
        bedding: '1 King or 2 Twin Beds',
        size: '36 sq.m',
        maxOccupancy: '2 Adults + 1 Child',
        note: 'Panoramic floor-to-ceiling river windows',
      },
      {
        name: 'Family Two-Bedroom Suite',
        bedding: '1 King + 2 Twin Beds',
        size: '72 sq.m',
        maxOccupancy: '4 Adults + 1 Child',
        note: 'Separate lounge & kitchenette',
      },
    ],
    boardOptions: ['Room Only', 'Breakfast Included'],
    checkInTime: '2:00 PM',
    checkOutTime: '12:00 PM',
    distanceNote: '40 min from Suvarnabhumi Airport (BKK) · River pier on site',
  },
  {
    id: 'singapore-marina-horizon',
    name: 'Marina Horizon Sky Terrace Hotel',
    city: 'Singapore',
    country: 'Singapore',
    destinationGroup: 'Singapore',
    category: 'Luxury Resort',
    stars: 5,
    startingRateInr: 22400,
    startingRateUsd: 268,
    image: hotelSingaporeImg,
    neighborhood: 'Marina Bay & Civic District',
    shortSummary:
      'Architectural 5-star Singapore hotel featuring a rooftop sky terrace facing Marina Bay Sands, Gardens by the Bay, and effortless MRT access.',
    fullDescription: [
      'Located right in the heart of Singapore’s Marina Bay cultural district, this refined property puts Gardens by the Bay, ArtScience Museum, Merlion Park, and MRT stations within a short stroll.',
      'After exploring Sentosa or Universal Studios, unwind on the panoramic rooftop deck as Marina Bay lights up at dusk. Ask FlyFello to package your Singapore e-Visa alongside hotel & attractions.',
    ],
    highlights: [
      'Direct walking access to Marina Bay waterfront & MRT lines',
      'Panoramic evening sky lounge overlooking Gardens by the Bay',
      '20 minutes from Singapore Changi Airport (SIN)',
      'Guaranteed non-smoking soundproofed family rooms',
    ],
    amenities: [
      'Sky Terrace Lounge',
      'Outdoor Lap Pool',
      'Concierge & Attraction Desk',
      'Indian & Asian Breakfast',
      'High-Speed Wi-Fi',
      'EV Airport Limo Option',
    ],
    roomOptions: [
      {
        name: 'Bayfront Premier King / Twin',
        bedding: '1 King or 2 Twin Beds',
        size: '42 sq.m',
        maxOccupancy: '2 Adults + 1 Child',
        note: 'Direct Marina Bay skyline framing',
      },
      {
        name: 'Skyline Club Junior Suite',
        bedding: '1 King Bed + Lounge Seating',
        size: '64 sq.m',
        maxOccupancy: '3 Adults',
        note: 'Includes Club breakfast & evening canapés',
      },
    ],
    boardOptions: ['Room Only', 'Breakfast Included'],
    checkInTime: '3:00 PM',
    checkOutTime: '12:00 PM',
    distanceNote: '20 min from Changi Airport (SIN) · 4 min walk to MRT',
  },
  {
    id: 'maldives-south-male-overwater',
    name: 'Lagoon Overwater Pool Villa Resort',
    city: 'South Malé Atoll',
    country: 'Maldives',
    destinationGroup: 'Maldives',
    category: 'Luxury Resort',
    stars: 5,
    startingRateInr: 36500,
    startingRateUsd: 435,
    image: hotelMaldivesImg,
    neighborhood: 'Private Coral Island (Speedboat Transfer)',
    shortSummary:
      'Iconic thatched overwater villas with private lagoon plunge pools, wooden stairs into coral reefs, and seamless 35-minute speedboat transfers from Malé.',
    fullDescription: [
      'Experience the classic Maldivian postcard stay without exhausting seaplane layovers: a sleek 35-minute luxury speedboat brings you straight from Velana International Airport (MLE) to your private coral lagoon island.',
      'Choose between sunrise beach pool villas or sunset overwater villas featuring glass floor panels, private infinity plunge pools, and all-inclusive dining plans tailored for honeymooners and families.',
    ],
    highlights: [
      'Direct 35-minute speedboat transfer from Malé Airport (MLE) — available day & night',
      'Private overwater deck with steps straight into crystal reef lagoon',
      'All-Inclusive dining with dedicated Indian vegetarian & seafood specialties',
      'Complimentary snorkeling gear, kayaks & sunset dolphin cruise (on All-Inclusive)',
    ],
    amenities: [
      'Overwater Pool Villas',
      'House Reef Snorkeling',
      'Speedboat Transfers',
      'Overwater Spa',
      'All-Inclusive Dining',
      'Sunset Bar',
    ],
    roomOptions: [
      {
        name: 'Sunrise Beach Pool Villa',
        bedding: '1 King Bed',
        size: '95 sq.m',
        maxOccupancy: '2 Adults + 2 Children',
        note: 'Direct white sand beach steps & private garden pool',
      },
      {
        name: 'Sunset Overwater Pool Villa',
        bedding: '1 King Bed',
        size: '112 sq.m',
        maxOccupancy: '2 Adults + 1 Child',
        note: 'Private infinity pool & ocean ladder into lagoon',
      },
    ],
    boardOptions: ['Half Board (Breakfast + Dinner)', 'Full Board', 'All-Inclusive Premium'],
    checkInTime: '2:00 PM',
    checkOutTime: '12:00 PM',
    distanceNote: '35 min Luxury Speedboat from Malé Airport (MLE)',
  },
  {
    id: 'vietnam-danang-coastal',
    name: 'My Khe Coastal Resort & Spa',
    city: 'Da Nang / Hoi An',
    country: 'Vietnam',
    destinationGroup: 'Vietnam',
    category: 'Beachfront',
    stars: 4,
    startingRateInr: 6800,
    startingRateUsd: 82,
    image: hotelThailandImg,
    neighborhood: 'My Khe Beachfront, Da Nang',
    shortSummary:
      'Serene beachfront Vietnam sanctuary between Da Nang Golden Bridge (Ba Na Hills) and UNESCO Hoi An Ancient Town, with spacious sea-view suites.',
    fullDescription: [
      'Ideal base for exploring Central Vietnam’s top highlights — just 20 minutes from Hoi An’s lantern-lit streets and 40 minutes from Ba Na Hills Golden Hand Bridge.',
      'FlyFello arranges complete Vietnam multi-city hotel stays (Hanoi + Ha Long Bay Cruise + Da Nang + Phu Quoc) along with Vietnam e-Visa approvals.',
    ],
    highlights: [
      'Steps from powdery white sand at My Khe Beach',
      '20 minutes to Hoi An Ancient Town · 15 minutes from Da Nang Airport',
      'Indian chef breakfast options & halal-friendly dining nearby',
    ],
    amenities: [
      'Oceanfront Pool',
      'Wellness Spa',
      'Airport Transfers',
      'Bicycle Rentals',
      '24h Concierge',
    ],
    roomOptions: [
      {
        name: 'Ocean Balcony Suite',
        bedding: '1 King or 2 Twin Beds',
        size: '46 sq.m',
        maxOccupancy: '2 Adults + 1 Child',
        note: 'Sweeping East Sea sunrise views',
      },
      {
        name: 'Beachfront Two-Bedroom Residence',
        bedding: '1 King + 2 Twin Beds',
        size: '96 sq.m',
        maxOccupancy: '4 Adults + 2 Children',
        note: 'Private dining terrace overlooking coastline',
      },
    ],
    boardOptions: ['Room Only', 'Breakfast Included', 'Half Board (Breakfast + Dinner)'],
    checkInTime: '2:00 PM',
    checkOutTime: '12:00 PM',
    distanceNote: '15 min from Da Nang Airport (DAD)',
  },
  {
    id: 'india-jaipur-heritage-palace',
    name: 'Rajputana Heritage Courtyard Palace',
    city: 'Jaipur, Rajasthan',
    country: 'India',
    destinationGroup: 'India',
    category: 'Boutique Heritage',
    stars: 5,
    startingRateInr: 13500,
    startingRateUsd: 162,
    image: hotelIndiaImg,
    neighborhood: 'Civil Lines & Royal Palace District, Jaipur',
    shortSummary:
      'Sandstone archways, lotus courtyard pools, and royal Rajasthani hospitality tailored for USA & Canada diaspora families visiting India.',
    fullDescription: [
      'Experience timeless Rajasthani architecture in a serene sandstone courtyard palace featuring hand-carved jharokha balconies, fragrant frangipani gardens, and warm personal service.',
      'Popular among NRI and North American guests adding a Golden Triangle (Delhi–Agra–Jaipur) or heritage weekend after landing in New Delhi or Amritsar.',
    ],
    highlights: [
      'Restored sandstone courtyard with temperature-controlled pool',
      'Traditional folk welcome, courtyard high tea & heritage dining',
      'Chauffeured private Innova Crysta transfers from Delhi / Jaipur Airport',
    ],
    amenities: [
      'Heritage Courtyard Pool',
      'Fine Dining Courtyard',
      'Ayurvedic Spa',
      'Chauffeur Desk',
      'High-Speed Wi-Fi',
    ],
    roomOptions: [
      {
        name: 'Palace Courtyard Suite',
        bedding: '1 King or 2 Twin Beds',
        size: '52 sq.m',
        maxOccupancy: '2 Adults + 1 Child',
        note: 'Overlooks sculpted garden & pool',
      },
      {
        name: 'Maharaja Royal Terrace Suite',
        bedding: '1 Four-Poster King',
        size: '88 sq.m',
        maxOccupancy: '3 Adults',
        note: 'Private jharokha sitting lounge',
      },
    ],
    boardOptions: ['Breakfast Included', 'Half Board (Breakfast + Dinner)'],
    checkInTime: '2:00 PM',
    checkOutTime: '12:00 PM',
    distanceNote: '25 min from Jaipur Airport (JAI) · 4 hrs drive from New Delhi',
  },
  {
    id: 'india-delhi-aerocity-grand',
    name: 'New Delhi Aerocity Transit & Luxury Hotel',
    city: 'New Delhi',
    country: 'India',
    destinationGroup: 'India',
    category: 'Business & City',
    stars: 5,
    startingRateInr: 9800,
    startingRateUsd: 118,
    image: hotelIndiaImg,
    neighborhood: 'IGI Airport Aerocity, New Delhi',
    shortSummary:
      'Ultra-convenient 5-star Aerocity stay 8 minutes from IGI Terminal 3 — ideal for international arrivals from Toronto, Vancouver, and New York.',
    fullDescription: [
      'Step off your long-haul flight from North America and reach a quiet, sanitized 5-star room in under 10 minutes. Perfect for overnight layovers before onward domestic flights to Amritsar, Chandigarh, Mumbai, or Bengaluru.',
      'Features 24-hour dining, day-use or full-night flexibility, and secure private cab pickups straight from Terminal 3 arrivals.',
    ],
    highlights: [
      '8 minutes from Delhi IGI Terminal 3 international arrivals',
      'Day-use & late-night check-in options for North America flights',
      '24-hour North Indian, Punjabi & Continental kitchen',
    ],
    amenities: [
      'Airport Pickup Option',
      '24h Dining',
      'Outdoor Pool',
      'Spa & Steam',
      'Express Check-in',
      'High-Speed Wi-Fi',
    ],
    roomOptions: [
      {
        name: 'Aerocity Deluxe King / Twin',
        bedding: '1 King or 2 Twin Beds',
        size: '38 sq.m',
        maxOccupancy: '2 Adults + 1 Child',
        note: 'Acoustic triple-glazed airport soundproofing',
      },
      {
        name: 'Diplomatic Family Connecting Suite',
        bedding: '1 King + 2 Twin Beds',
        size: '76 sq.m',
        maxOccupancy: '4 Adults + 2 Children',
        note: 'Ideal for diaspora families traveling together',
      },
    ],
    boardOptions: ['Room Only', 'Breakfast Included', 'Half Board (Breakfast + Dinner)'],
    checkInTime: '2:00 PM (Flexible Night Arrival)',
    checkOutTime: '12:00 PM',
    distanceNote: '3.5 km from Delhi IGI Terminal 3 · 2 min to Airport Express Metro',
  },
  {
    id: 'north-america-toronto-harbour',
    name: 'Downtown Harbourfront & Pearson Gateway Suites',
    city: 'Toronto / Vancouver / New York',
    country: 'Canada & USA',
    destinationGroup: 'USA & Canada',
    category: 'Business & City',
    stars: 4,
    startingRateInr: 16200,
    startingRateUsd: 195,
    image: hotelSingaporeImg,
    neighborhood: 'Downtown Core & Airport Corridors',
    shortSummary:
      'Consolidated hotel rates across Toronto (YYZ), Vancouver (YVR), Calgary (YYC), New York (JFK/EWR), and San Francisco (SFO) for travelers & visiting parents.',
    fullDescription: [
      'Flying into Canada or the USA for graduations, family visits, or business travel? FlyFello offers negotiated consolidator rates across 3-star, 4-star, and extended-stay kitchen suites near major airports and downtown hubs.',
      'Select this option or send a custom city query below to tell us the exact North American neighborhood, airport, or hotel brand you need.',
    ],
    highlights: [
      'Airport shuttle hotels & downtown landmark properties across USA & Canada',
      'Kitchenette extended-stay suites ideal for visiting parents',
      'Pay in CAD, USD, or INR with instant confirmation',
    ],
    amenities: [
      'Airport Shuttle',
      'Kitchenette Options',
      'Free Wi-Fi',
      '24h Front Desk',
      'Indoor Pool / Gym',
    ],
    roomOptions: [
      {
        name: 'Standard Double Queen',
        bedding: '2 Queen Beds',
        size: '34 sq.m',
        maxOccupancy: '4 Adults',
        note: 'Great for families & small groups',
      },
      {
        name: 'One-Bedroom Kitchen Suite',
        bedding: '1 King + Sofa Bed + Kitchenette',
        size: '50 sq.m',
        maxOccupancy: '3 Adults + 1 Child',
        note: 'Full fridge, microwave & dining counter',
      },
    ],
    boardOptions: ['Room Only', 'Breakfast Included'],
    checkInTime: '3:00 PM',
    checkOutTime: '11:00 AM',
    distanceNote: 'Properties available near YVR, YYZ, YYC, JFK, EWR, ORD & SFO',
  },
];
