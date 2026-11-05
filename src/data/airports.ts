import { Airport } from '../types';

export const CANADA_AIRPORTS: Airport[] = [
  // British Columbia
  { code: 'YVR', city: 'Vancouver', name: 'Vancouver International', country: 'Canada', flag: '🇨🇦', popular: true, region: 'British Columbia' },
  { code: 'YXX', city: 'Abbotsford', name: 'Abbotsford International', country: 'Canada', flag: '🇨🇦', popular: true, region: 'British Columbia' },
  { code: 'YYJ', city: 'Victoria', name: 'Victoria International', country: 'Canada', flag: '🇨🇦', popular: true, region: 'British Columbia' },
  { code: 'YLW', city: 'Kelowna', name: 'Kelowna International', country: 'Canada', flag: '🇨🇦', popular: true, region: 'British Columbia' },
  { code: 'YKA', city: 'Kamloops', name: 'Kamloops Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'British Columbia' },
  { code: 'YCD', city: 'Nanaimo', name: 'Nanaimo Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'British Columbia' },
  { code: 'YXS', city: 'Prince George', name: 'Prince George Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'British Columbia' },
  { code: 'YQQ', city: 'Comox / Courtenay', name: 'CFB Comox / Comox Valley', country: 'Canada', flag: '🇨🇦', popular: false, region: 'British Columbia' },
  { code: 'YYF', city: 'Penticton', name: 'Penticton Regional Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'British Columbia' },
  { code: 'YXC', city: 'Cranbrook', name: 'Cranbrook / Canadian Rockies International', country: 'Canada', flag: '🇨🇦', popular: false, region: 'British Columbia' },
  { code: 'YCG', city: 'Castlegar', name: 'West Kootenay Regional', country: 'Canada', flag: '🇨🇦', popular: false, region: 'British Columbia' },
  { code: 'YXJ', city: 'Fort St. John', name: 'North Peace Regional', country: 'Canada', flag: '🇨🇦', popular: false, region: 'British Columbia' },
  { code: 'YXT', city: 'Terrace / Kitimat', name: 'Northwest Regional Terrace-Kitimat', country: 'Canada', flag: '🇨🇦', popular: false, region: 'British Columbia' },
  { code: 'YPR', city: 'Prince Rupert', name: 'Prince Rupert Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'British Columbia' },
  { code: 'YBL', city: 'Campbell River', name: 'Campbell River Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'British Columbia' },
  { code: 'YDQ', city: 'Dawson Creek', name: 'Dawson Creek Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'British Columbia' },
  { code: 'YWL', city: 'Williams Lake', name: 'Williams Lake Regional', country: 'Canada', flag: '🇨🇦', popular: false, region: 'British Columbia' },
  { code: 'YYD', city: 'Smithers', name: 'Smithers Regional Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'British Columbia' },
  { code: 'YZP', city: 'Sandspit / Haida Gwaii', name: 'Sandspit Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'British Columbia' },

  // Alberta
  { code: 'YYC', city: 'Calgary', name: 'Calgary International', country: 'Canada', flag: '🇨🇦', popular: true, region: 'Alberta' },
  { code: 'YEG', city: 'Edmonton', name: 'Edmonton International', country: 'Canada', flag: '🇨🇦', popular: true, region: 'Alberta' },
  { code: 'YMM', city: 'Fort McMurray', name: 'Fort McMurray International', country: 'Canada', flag: '🇨🇦', popular: false, region: 'Alberta' },
  { code: 'YQU', city: 'Grande Prairie', name: 'Grande Prairie Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'Alberta' },
  { code: 'YQL', city: 'Lethbridge', name: 'Lethbridge Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'Alberta' },
  { code: 'YXH', city: 'Medicine Hat', name: 'Medicine Hat Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'Alberta' },
  { code: 'YLL', city: 'Lloydminster', name: 'Lloydminster Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'Alberta' },
  { code: 'YQF', city: 'Red Deer', name: 'Red Deer Regional Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'Alberta' },
  { code: 'YPE', city: 'Peace River', name: 'Peace River Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'Alberta' },

  // Ontario
  { code: 'YYZ', city: 'Toronto (Pearson)', name: 'Toronto Pearson International', country: 'Canada', flag: '🇨🇦', popular: true, region: 'Ontario' },
  { code: 'YTZ', city: 'Toronto (Billy Bishop)', name: 'Billy Bishop Toronto City Airport', country: 'Canada', flag: '🇨🇦', popular: true, region: 'Ontario' },
  { code: 'YOW', city: 'Ottawa', name: 'Ottawa Macdonald-Cartier International', country: 'Canada', flag: '🇨🇦', popular: true, region: 'Ontario' },
  { code: 'YHM', city: 'Hamilton', name: 'John C. Munro Hamilton International', country: 'Canada', flag: '🇨🇦', popular: true, region: 'Ontario' },
  { code: 'YKF', city: 'Waterloo / Kitchener', name: 'Region of Waterloo International', country: 'Canada', flag: '🇨🇦', popular: true, region: 'Ontario' },
  { code: 'YXU', city: 'London', name: 'London International Airport (ON)', country: 'Canada', flag: '🇨🇦', popular: false, region: 'Ontario' },
  { code: 'YQG', city: 'Windsor', name: 'Windsor International Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'Ontario' },
  { code: 'YQT', city: 'Thunder Bay', name: 'Thunder Bay International', country: 'Canada', flag: '🇨🇦', popular: false, region: 'Ontario' },
  { code: 'YSB', city: 'Sudbury', name: 'Greater Sudbury Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'Ontario' },
  { code: 'YAM', city: 'Sault Ste. Marie', name: 'Sault Ste. Marie Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'Ontario' },
  { code: 'YTS', city: 'Timmins', name: 'Timmins Victor M. Power', country: 'Canada', flag: '🇨🇦', popular: false, region: 'Ontario' },
  { code: 'YYB', city: 'North Bay', name: 'North Bay Jack Garland', country: 'Canada', flag: '🇨🇦', popular: false, region: 'Ontario' },
  { code: 'YGK', city: 'Kingston', name: 'Kingston Norman Rogers', country: 'Canada', flag: '🇨🇦', popular: false, region: 'Ontario' },
  { code: 'YZR', city: 'Sarnia', name: 'Sarnia Chris Hadfield Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'Ontario' },
  { code: 'YQK', city: 'Kenora', name: 'Kenora Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'Ontario' },
  { code: 'YXL', city: 'Sioux Lookout', name: 'Sioux Lookout Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'Ontario' },

  // Quebec
  { code: 'YUL', city: 'Montreal (Trudeau)', name: 'Montréal-Pierre Elliott Trudeau International', country: 'Canada', flag: '🇨🇦', popular: true, region: 'Quebec' },
  { code: 'YHU', city: 'Montreal (Saint-Hubert)', name: 'Montréal Metropolitan Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'Quebec' },
  { code: 'YQB', city: 'Quebec City', name: 'Québec City Jean Lesage International', country: 'Canada', flag: '🇨🇦', popular: true, region: 'Quebec' },
  { code: 'YBG', city: 'Bagotville / Saguenay', name: 'CFB Bagotville / Saguenay', country: 'Canada', flag: '🇨🇦', popular: false, region: 'Quebec' },
  { code: 'YUY', city: 'Rouyn-Noranda', name: 'Rouyn-Noranda Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'Quebec' },
  { code: 'YVO', city: 'Val-d\'Or', name: 'Val-d\'Or Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'Quebec' },
  { code: 'YZV', city: 'Sept-Îles', name: 'Sept-Îles Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'Quebec' },
  { code: 'YBC', city: 'Baie-Comeau', name: 'Baie-Comeau Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'Quebec' },
  { code: 'YGP', city: 'Gaspé', name: 'Michel-Pouliot Gaspé Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'Quebec' },
  { code: 'YYY', city: 'Mont-Joli', name: 'Mont-Joli Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'Quebec' },
  { code: 'YGR', city: 'Îles-de-la-Madeleine', name: 'Îles-de-la-Madeleine Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'Quebec' },

  // Manitoba
  { code: 'YWG', city: 'Winnipeg', name: 'Winnipeg James Armstrong Richardson', country: 'Canada', flag: '🇨🇦', popular: true, region: 'Manitoba' },
  { code: 'YBR', city: 'Brandon', name: 'Brandon Municipal Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'Manitoba' },
  { code: 'YTH', city: 'Thompson', name: 'Thompson Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'Manitoba' },
  { code: 'YYQ', city: 'Churchill', name: 'Churchill Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'Manitoba' },
  { code: 'YFO', city: 'Flin Flon', name: 'Flin Flon Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'Manitoba' },

  // Saskatchewan
  { code: 'YXE', city: 'Saskatoon', name: 'Saskatoon John G. Diefenbaker International', country: 'Canada', flag: '🇨🇦', popular: true, region: 'Saskatchewan' },
  { code: 'YQR', city: 'Regina', name: 'Regina International Airport', country: 'Canada', flag: '🇨🇦', popular: true, region: 'Saskatchewan' },
  { code: 'YPA', city: 'Prince Albert', name: 'Prince Albert Glass Field', country: 'Canada', flag: '🇨🇦', popular: false, region: 'Saskatchewan' },

  // Nova Scotia & Atlantic
  { code: 'YHZ', city: 'Halifax', name: 'Halifax Stanfield International', country: 'Canada', flag: '🇨🇦', popular: true, region: 'Nova Scotia' },
  { code: 'YQY', city: 'Sydney / Cape Breton', name: 'JA Douglas McCurdy Sydney Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'Nova Scotia' },

  // New Brunswick
  { code: 'YQM', city: 'Moncton', name: 'Greater Moncton Roméo LeBlanc International', country: 'Canada', flag: '🇨🇦', popular: false, region: 'New Brunswick' },
  { code: 'YFC', city: 'Fredericton', name: 'Fredericton International Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'New Brunswick' },
  { code: 'YSJ', city: 'Saint John', name: 'Saint John Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'New Brunswick' },
  { code: 'ZBF', city: 'Bathurst', name: 'Bathurst Regional Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'New Brunswick' },

  // Prince Edward Island
  { code: 'YYG', city: 'Charlottetown', name: 'Charlottetown Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'Prince Edward Island' },

  // Newfoundland & Labrador
  { code: 'YYT', city: 'St. John\'s', name: 'St. John\'s International Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'Newfoundland' },
  { code: 'YDF', city: 'Deer Lake / Corner Brook', name: 'Deer Lake Regional Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'Newfoundland' },
  { code: 'YQX', city: 'Gander', name: 'Gander International Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'Newfoundland' },
  { code: 'YYR', city: 'Goose Bay', name: 'CFB Goose Bay', country: 'Canada', flag: '🇨🇦', popular: false, region: 'Labrador' },
  { code: 'YWK', city: 'Wabush / Labrador City', name: 'Wabush Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'Labrador' },

  // Northern Territories
  { code: 'YXY', city: 'Whitehorse', name: 'Erik Nielsen Whitehorse International', country: 'Canada', flag: '🇨🇦', popular: false, region: 'Yukon' },
  { code: 'YZF', city: 'Yellowknife', name: 'Yellowknife Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'Northwest Territories' },
  { code: 'YFB', city: 'Iqaluit', name: 'Iqaluit International Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'Nunavut' },
  { code: 'YEV', city: 'Inuvik', name: 'Inuvik (Mike Zubko) Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'Northwest Territories' },
  { code: 'YHY', city: 'Hay River', name: 'Hay River/Merlyn Carter Airport', country: 'Canada', flag: '🇨🇦', popular: false, region: 'Northwest Territories' },
];

export const USA_AIRPORTS: Airport[] = [
  // New York / New Jersey / Connecticut
  { code: 'JFK', city: 'New York (JFK)', name: 'John F. Kennedy International', country: 'USA', flag: '🇺🇸', popular: true, region: 'New York' },
  { code: 'EWR', city: 'Newark / New York', name: 'Newark Liberty International', country: 'USA', flag: '🇺🇸', popular: true, region: 'New Jersey' },
  { code: 'LGA', city: 'New York (LaGuardia)', name: 'LaGuardia Airport', country: 'USA', flag: '🇺🇸', popular: true, region: 'New York' },
  { code: 'SWF', city: 'New York (Stewart)', name: 'New York Stewart International', country: 'USA', flag: '🇺🇸', popular: false, region: 'New York' },
  { code: 'HPN', city: 'White Plains / Westchester', name: 'Westchester County Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'New York' },
  { code: 'ISP', city: 'Long Island / Islip', name: 'Long Island MacArthur Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'New York' },
  { code: 'ALB', city: 'Albany', name: 'Albany International Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'New York' },
  { code: 'BUF', city: 'Buffalo', name: 'Buffalo Niagara International', country: 'USA', flag: '🇺🇸', popular: true, region: 'New York' },
  { code: 'ROC', city: 'Rochester', name: 'Frederick Douglass Greater Rochester', country: 'USA', flag: '🇺🇸', popular: false, region: 'New York' },
  { code: 'SYR', city: 'Syracuse', name: 'Syracuse Hancock International', country: 'USA', flag: '🇺🇸', popular: false, region: 'New York' },
  { code: 'BDL', city: 'Hartford / Springfield', name: 'Bradley International Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Connecticut' },
  { code: 'HVN', city: 'New Haven', name: 'Tweed New Haven Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Connecticut' },

  // California
  { code: 'SFO', city: 'San Francisco', name: 'San Francisco International', country: 'USA', flag: '🇺🇸', popular: true, region: 'California' },
  { code: 'LAX', city: 'Los Angeles', name: 'Los Angeles International', country: 'USA', flag: '🇺🇸', popular: true, region: 'California' },
  { code: 'SJC', city: 'San Jose / Silicon Valley', name: 'San Jose Mineta International', country: 'USA', flag: '🇺🇸', popular: true, region: 'California' },
  { code: 'OAK', city: 'Oakland / SF Bay Area', name: 'San Francisco Bay Oakland International', country: 'USA', flag: '🇺🇸', popular: true, region: 'California' },
  { code: 'SAN', city: 'San Diego', name: 'San Diego International', country: 'USA', flag: '🇺🇸', popular: true, region: 'California' },
  { code: 'SMF', city: 'Sacramento', name: 'Sacramento International', country: 'USA', flag: '🇺🇸', popular: true, region: 'California' },
  { code: 'SNA', city: 'Orange County / Santa Ana', name: 'John Wayne Airport', country: 'USA', flag: '🇺🇸', popular: true, region: 'California' },
  { code: 'BUR', city: 'Burbank / Hollywood', name: 'Hollywood Burbank Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'California' },
  { code: 'ONT', city: 'Ontario / Inland Empire', name: 'Ontario International Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'California' },
  { code: 'LGB', city: 'Long Beach', name: 'Long Beach Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'California' },
  { code: 'PSP', city: 'Palm Springs', name: 'Palm Springs International Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'California' },
  { code: 'FAT', city: 'Fresno', name: 'Fresno Yosemite International', country: 'USA', flag: '🇺🇸', popular: true, region: 'California' },
  { code: 'BFL', city: 'Bakersfield', name: 'Meadows Field Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'California' },
  { code: 'SBA', city: 'Santa Barbara', name: 'Santa Barbara Municipal Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'California' },
  { code: 'STS', city: 'Santa Rosa / Sonoma', name: 'Charles M. Schulz–Sonoma County', country: 'USA', flag: '🇺🇸', popular: false, region: 'California' },
  { code: 'MRY', city: 'Monterey', name: 'Monterey Regional Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'California' },
  { code: 'SCK', city: 'Stockton', name: 'Stockton Metropolitan Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'California' },
  { code: 'SBP', city: 'San Luis Obispo', name: 'San Luis Obispo County Regional', country: 'USA', flag: '🇺🇸', popular: false, region: 'California' },
  { code: 'RDD', city: 'Redding', name: 'Redding Regional Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'California' },

  // Pacific Northwest (WA, OR)
  { code: 'SEA', city: 'Seattle', name: 'Seattle-Tacoma International', country: 'USA', flag: '🇺🇸', popular: true, region: 'Washington' },
  { code: 'PAE', city: 'Everett / Seattle North', name: 'Seattle Paine Field International', country: 'USA', flag: '🇺🇸', popular: false, region: 'Washington' },
  { code: 'GEG', city: 'Spokane', name: 'Spokane International Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Washington' },
  { code: 'PSC', city: 'Pasco / Tri-Cities', name: 'Tri-Cities Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Washington' },
  { code: 'BLI', city: 'Bellingham', name: 'Bellingham International Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Washington' },
  { code: 'PDX', city: 'Portland', name: 'Portland International Airport', country: 'USA', flag: '🇺🇸', popular: true, region: 'Oregon' },
  { code: 'EUG', city: 'Eugene', name: 'Eugene Airport (Mahlon Sweet Field)', country: 'USA', flag: '🇺🇸', popular: false, region: 'Oregon' },
  { code: 'RDM', city: 'Redmond / Bend', name: 'Roberts Field', country: 'USA', flag: '🇺🇸', popular: false, region: 'Oregon' },
  { code: 'MFR', city: 'Medford', name: 'Rogue Valley International-Medford', country: 'USA', flag: '🇺🇸', popular: false, region: 'Oregon' },

  // Illinois & Great Lakes / Midwest
  { code: 'ORD', city: 'Chicago (O\'Hare)', name: 'O\'Hare International Airport', country: 'USA', flag: '🇺🇸', popular: true, region: 'Illinois' },
  { code: 'MDW', city: 'Chicago (Midway)', name: 'Chicago Midway International', country: 'USA', flag: '🇺🇸', popular: true, region: 'Illinois' },
  { code: 'MLI', city: 'Moline / Quad Cities', name: 'Quad Cities International', country: 'USA', flag: '🇺🇸', popular: false, region: 'Illinois' },
  { code: 'PIA', city: 'Peoria', name: 'General Wayne A. Downing Peoria', country: 'USA', flag: '🇺🇸', popular: false, region: 'Illinois' },
  { code: 'DTW', city: 'Detroit', name: 'Detroit Metropolitan Wayne County', country: 'USA', flag: '🇺🇸', popular: true, region: 'Michigan' },
  { code: 'GRR', city: 'Grand Rapids', name: 'Gerald R. Ford International', country: 'USA', flag: '🇺🇸', popular: false, region: 'Michigan' },
  { code: 'LAN', city: 'Lansing', name: 'Capital Region International Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Michigan' },
  { code: 'FNT', city: 'Flint', name: 'Bishop International Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Michigan' },
  { code: 'AZO', city: 'Kalamazoo', name: 'Kalamazoo/Battle Creek International', country: 'USA', flag: '🇺🇸', popular: false, region: 'Michigan' },
  { code: 'TVC', city: 'Traverse City', name: 'Cherry Capital Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Michigan' },
  { code: 'MSP', city: 'Minneapolis / St. Paul', name: 'Minneapolis–Saint Paul International', country: 'USA', flag: '🇺🇸', popular: true, region: 'Minnesota' },
  { code: 'RST', city: 'Rochester (MN)', name: 'Rochester International Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Minnesota' },
  { code: 'DLH', city: 'Duluth', name: 'Duluth International Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Minnesota' },
  { code: 'IND', city: 'Indianapolis', name: 'Indianapolis International Airport', country: 'USA', flag: '🇺🇸', popular: true, region: 'Indiana' },
  { code: 'FWA', city: 'Fort Wayne', name: 'Fort Wayne International Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Indiana' },
  { code: 'SBN', city: 'South Bend', name: 'South Bend International Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Indiana' },
  { code: 'CLE', city: 'Cleveland', name: 'Cleveland Hopkins International', country: 'USA', flag: '🇺🇸', popular: true, region: 'Ohio' },
  { code: 'CMH', city: 'Columbus', name: 'John Glenn Columbus International', country: 'USA', flag: '🇺🇸', popular: true, region: 'Ohio' },
  { code: 'CVG', city: 'Cincinnati / N. Kentucky', name: 'Cincinnati/Northern Kentucky International', country: 'USA', flag: '🇺🇸', popular: true, region: 'Ohio' },
  { code: 'DAY', city: 'Dayton', name: 'Dayton International Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Ohio' },
  { code: 'CAK', city: 'Akron / Canton', name: 'Akron-Canton Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Ohio' },
  { code: 'TOL', city: 'Toledo', name: 'Eugene F. Kranz Toledo Express', country: 'USA', flag: '🇺🇸', popular: false, region: 'Ohio' },
  { code: 'MKE', city: 'Milwaukee', name: 'Milwaukee Mitchell International', country: 'USA', flag: '🇺🇸', popular: false, region: 'Wisconsin' },
  { code: 'MSN', city: 'Madison', name: 'Dane County Regional Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Wisconsin' },
  { code: 'GRB', city: 'Green Bay', name: 'Green Bay Austin Straubel International', country: 'USA', flag: '🇺🇸', popular: false, region: 'Wisconsin' },
  { code: 'ATW', city: 'Appleton', name: 'Appleton International Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Wisconsin' },
  { code: 'STL', city: 'St. Louis', name: 'St. Louis Lambert International', country: 'USA', flag: '🇺🇸', popular: true, region: 'Missouri' },
  { code: 'MCI', city: 'Kansas City', name: 'Kansas City International Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Missouri' },
  { code: 'SGF', city: 'Springfield (MO)', name: 'Springfield-Branson National', country: 'USA', flag: '🇺🇸', popular: false, region: 'Missouri' },
  { code: 'DSM', city: 'Des Moines', name: 'Des Moines International Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Iowa' },
  { code: 'CID', city: 'Cedar Rapids', name: 'The Eastern Iowa Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Iowa' },
  { code: 'OMA', city: 'Omaha', name: 'Eppley Airfield', country: 'USA', flag: '🇺🇸', popular: false, region: 'Nebraska' },
  { code: 'ICT', city: 'Wichita', name: 'Wichita Dwight D. Eisenhower National', country: 'USA', flag: '🇺🇸', popular: false, region: 'Kansas' },

  // Texas & Southwest
  { code: 'DFW', city: 'Dallas / Fort Worth', name: 'Dallas/Fort Worth International', country: 'USA', flag: '🇺🇸', popular: true, region: 'Texas' },
  { code: 'DAL', city: 'Dallas (Love Field)', name: 'Dallas Love Field', country: 'USA', flag: '🇺🇸', popular: true, region: 'Texas' },
  { code: 'IAH', city: 'Houston (Intercontinental)', name: 'George Bush Intercontinental', country: 'USA', flag: '🇺🇸', popular: true, region: 'Texas' },
  { code: 'HOU', city: 'Houston (Hobby)', name: 'William P. Hobby Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Texas' },
  { code: 'AUS', city: 'Austin', name: 'Austin-Bergstrom International', country: 'USA', flag: '🇺🇸', popular: true, region: 'Texas' },
  { code: 'SAT', city: 'San Antonio', name: 'San Antonio International Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Texas' },
  { code: 'ELP', city: 'El Paso', name: 'El Paso International Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Texas' },
  { code: 'MAF', city: 'Midland / Odessa', name: 'Midland International Air and Space Port', country: 'USA', flag: '🇺🇸', popular: false, region: 'Texas' },
  { code: 'LBB', city: 'Lubbock', name: 'Lubbock Preston Smith International', country: 'USA', flag: '🇺🇸', popular: false, region: 'Texas' },
  { code: 'MFE', city: 'McAllen', name: 'McAllen Miller International Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Texas' },
  { code: 'HRL', city: 'Harlingen / South Padre', name: 'Valley International Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Texas' },
  { code: 'CRP', city: 'Corpus Christi', name: 'Corpus Christi International Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Texas' },
  { code: 'AMA', city: 'Amarillo', name: 'Rick Husband Amarillo International', country: 'USA', flag: '🇺🇸', popular: false, region: 'Texas' },
  { code: 'PHX', city: 'Phoenix', name: 'Phoenix Sky Harbor International', country: 'USA', flag: '🇺🇸', popular: true, region: 'Arizona' },
  { code: 'AZA', city: 'Phoenix / Mesa', name: 'Phoenix-Mesa Gateway Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Arizona' },
  { code: 'TUS', city: 'Tucson', name: 'Tucson International Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Arizona' },
  { code: 'LAS', city: 'Las Vegas', name: 'Harry Reid International Airport', country: 'USA', flag: '🇺🇸', popular: true, region: 'Nevada' },
  { code: 'RNO', city: 'Reno / Tahoe', name: 'Reno-Tahoe International Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Nevada' },
  { code: 'DEN', city: 'Denver', name: 'Denver International Airport', country: 'USA', flag: '🇺🇸', popular: true, region: 'Colorado' },
  { code: 'COS', city: 'Colorado Springs', name: 'City of Colorado Springs Municipal', country: 'USA', flag: '🇺🇸', popular: false, region: 'Colorado' },
  { code: 'GJT', city: 'Grand Junction', name: 'Grand Junction Regional Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Colorado' },
  { code: 'ASE', city: 'Aspen', name: 'Aspen/Pitkin County Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Colorado' },
  { code: 'EGE', city: 'Vail / Eagle', name: 'Eagle County Regional Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Colorado' },
  { code: 'SLC', city: 'Salt Lake City', name: 'Salt Lake City International', country: 'USA', flag: '🇺🇸', popular: true, region: 'Utah' },
  { code: 'ABQ', city: 'Albuquerque', name: 'Albuquerque International Sunport', country: 'USA', flag: '🇺🇸', popular: false, region: 'New Mexico' },
  { code: 'SAF', city: 'Santa Fe', name: 'Santa Fe Regional Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'New Mexico' },

  // Florida
  { code: 'MIA', city: 'Miami', name: 'Miami International Airport', country: 'USA', flag: '🇺🇸', popular: true, region: 'Florida' },
  { code: 'MCO', city: 'Orlando', name: 'Orlando International Airport', country: 'USA', flag: '🇺🇸', popular: true, region: 'Florida' },
  { code: 'SFB', city: 'Orlando (Sanford)', name: 'Orlando Sanford International', country: 'USA', flag: '🇺🇸', popular: false, region: 'Florida' },
  { code: 'TPA', city: 'Tampa', name: 'Tampa International Airport', country: 'USA', flag: '🇺🇸', popular: true, region: 'Florida' },
  { code: 'PIE', city: 'St. Petersburg / Clearwater', name: 'St. Pete–Clearwater International', country: 'USA', flag: '🇺🇸', popular: false, region: 'Florida' },
  { code: 'FLL', city: 'Fort Lauderdale', name: 'Fort Lauderdale-Hollywood International', country: 'USA', flag: '🇺🇸', popular: true, region: 'Florida' },
  { code: 'PBI', city: 'West Palm Beach', name: 'Palm Beach International Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Florida' },
  { code: 'RSW', city: 'Fort Myers / SW Florida', name: 'Southwest Florida International', country: 'USA', flag: '🇺🇸', popular: false, region: 'Florida' },
  { code: 'JAX', city: 'Jacksonville', name: 'Jacksonville International Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Florida' },
  { code: 'PNS', city: 'Pensacola', name: 'Pensacola International Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Florida' },
  { code: 'SRQ', city: 'Sarasota / Bradenton', name: 'Sarasota-Bradenton International', country: 'USA', flag: '🇺🇸', popular: false, region: 'Florida' },
  { code: 'VPS', city: 'Destin / Fort Walton Beach', name: 'Destin-Fort Walton Beach Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Florida' },
  { code: 'ECP', city: 'Panama City Beach', name: 'Northwest Florida Beaches International', country: 'USA', flag: '🇺🇸', popular: false, region: 'Florida' },
  { code: 'TLH', city: 'Tallahassee', name: 'Tallahassee International Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Florida' },
  { code: 'DAB', city: 'Daytona Beach', name: 'Daytona Beach International', country: 'USA', flag: '🇺🇸', popular: false, region: 'Florida' },
  { code: 'EYW', city: 'Key West', name: 'Key West International Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Florida' },

  // Mid-Atlantic & South (DC, VA, MD, PA, NC, SC, GA, TN, AL, LA, AR, MS)
  { code: 'IAD', city: 'Washington D.C. (Dulles)', name: 'Washington Dulles International', country: 'USA', flag: '🇺🇸', popular: true, region: 'Virginia / DC' },
  { code: 'DCA', city: 'Washington D.C. (Reagan)', name: 'Ronald Reagan Washington National', country: 'USA', flag: '🇺🇸', popular: true, region: 'Virginia / DC' },
  { code: 'BWI', city: 'Baltimore / Washington', name: 'Baltimore/Washington International', country: 'USA', flag: '🇺🇸', popular: true, region: 'Maryland' },
  { code: 'PHL', city: 'Philadelphia', name: 'Philadelphia International Airport', country: 'USA', flag: '🇺🇸', popular: true, region: 'Pennsylvania' },
  { code: 'PIT', city: 'Pittsburgh', name: 'Pittsburgh International Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Pennsylvania' },
  { code: 'MDT', city: 'Harrisburg', name: 'Harrisburg International Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Pennsylvania' },
  { code: 'ABE', city: 'Allentown / Bethlehem', name: 'Lehigh Valley International', country: 'USA', flag: '🇺🇸', popular: false, region: 'Pennsylvania' },
  { code: 'BOS', city: 'Boston', name: 'Logan International Airport', country: 'USA', flag: '🇺🇸', popular: true, region: 'Massachusetts' },
  { code: 'PVD', city: 'Providence', name: 'Rhode Island T. F. Green International', country: 'USA', flag: '🇺🇸', popular: false, region: 'Rhode Island' },
  { code: 'MHT', city: 'Manchester (NH)', name: 'Manchester-Boston Regional Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'New Hampshire' },
  { code: 'PWM', city: 'Portland (ME)', name: 'Portland International Jetport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Maine' },
  { code: 'BTV', city: 'Burlington', name: 'Patrick Leahy Burlington International', country: 'USA', flag: '🇺🇸', popular: false, region: 'Vermont' },
  { code: 'ATL', city: 'Atlanta', name: 'Hartsfield-Jackson Atlanta International', country: 'USA', flag: '🇺🇸', popular: true, region: 'Georgia' },
  { code: 'SAV', city: 'Savannah / Hilton Head', name: 'Savannah/Hilton Head International', country: 'USA', flag: '🇺🇸', popular: false, region: 'Georgia' },
  { code: 'CLT', city: 'Charlotte', name: 'Charlotte Douglas International', country: 'USA', flag: '🇺🇸', popular: true, region: 'North Carolina' },
  { code: 'RDU', city: 'Raleigh / Durham', name: 'Raleigh-Durham International', country: 'USA', flag: '🇺🇸', popular: true, region: 'North Carolina' },
  { code: 'GSO', city: 'Greensboro / High Point', name: 'Piedmont Triad International', country: 'USA', flag: '🇺🇸', popular: false, region: 'North Carolina' },
  { code: 'AVL', city: 'Asheville', name: 'Asheville Regional Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'North Carolina' },
  { code: 'ILM', city: 'Wilmington (NC)', name: 'Wilmington International Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'North Carolina' },
  { code: 'CHS', city: 'Charleston (SC)', name: 'Charleston International Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'South Carolina' },
  { code: 'GSP', city: 'Greenville / Spartanburg', name: 'Greenville-Spartanburg International', country: 'USA', flag: '🇺🇸', popular: false, region: 'South Carolina' },
  { code: 'MYR', city: 'Myrtle Beach', name: 'Myrtle Beach International', country: 'USA', flag: '🇺🇸', popular: false, region: 'South Carolina' },
  { code: 'CAE', city: 'Columbia (SC)', name: 'Columbia Metropolitan Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'South Carolina' },
  { code: 'BNA', city: 'Nashville', name: 'Nashville International Airport', country: 'USA', flag: '🇺🇸', popular: true, region: 'Tennessee' },
  { code: 'MEM', city: 'Memphis', name: 'Memphis International Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Tennessee' },
  { code: 'TYS', city: 'Knoxville', name: 'McGhee Tyson Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Tennessee' },
  { code: 'CHA', city: 'Chattanooga', name: 'Chattanooga Metropolitan Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Tennessee' },
  { code: 'RIC', city: 'Richmond', name: 'Richmond International Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Virginia' },
  { code: 'ORF', city: 'Norfolk / Virginia Beach', name: 'Norfolk International Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Virginia' },
  { code: 'ROA', city: 'Roanoke', name: 'Roanoke-Blacksburg Regional', country: 'USA', flag: '🇺🇸', popular: false, region: 'Virginia' },
  { code: 'BHM', city: 'Birmingham (AL)', name: 'Birmingham-Shuttlesworth International', country: 'USA', flag: '🇺🇸', popular: false, region: 'Alabama' },
  { code: 'HSV', city: 'Huntsville', name: 'Huntsville International Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Alabama' },
  { code: 'MOB', city: 'Mobile', name: 'Mobile Regional Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Alabama' },
  { code: 'MSY', city: 'New Orleans', name: 'Louis Armstrong New Orleans International', country: 'USA', flag: '🇺🇸', popular: false, region: 'Louisiana' },
  { code: 'BTR', city: 'Baton Rouge', name: 'Baton Rouge Metropolitan', country: 'USA', flag: '🇺🇸', popular: false, region: 'Louisiana' },
  { code: 'SHV', city: 'Shreveport', name: 'Shreveport Regional Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Louisiana' },
  { code: 'LIT', city: 'Little Rock', name: 'Bill and Hillary Clinton National', country: 'USA', flag: '🇺🇸', popular: false, region: 'Arkansas' },
  { code: 'XNA', city: 'Bentonville / NW Arkansas', name: 'Northwest Arkansas National Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Arkansas' },
  { code: 'JAN', city: 'Jackson (MS)', name: 'Jackson-Medgar Wiley Evers International', country: 'USA', flag: '🇺🇸', popular: false, region: 'Mississippi' },

  // Mountain & Plains (ID, MT, WY, ND, SD, OK)
  { code: 'BOI', city: 'Boise', name: 'Boise Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Idaho' },
  { code: 'IDA', city: 'Idaho Falls', name: 'Idaho Falls Regional Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Idaho' },
  { code: 'BZN', city: 'Bozeman / Yellowstone', name: 'Bozeman Yellowstone International', country: 'USA', flag: '🇺🇸', popular: false, region: 'Montana' },
  { code: 'BIL', city: 'Billings', name: 'Billings Logan International', country: 'USA', flag: '🇺🇸', popular: false, region: 'Montana' },
  { code: 'MSO', city: 'Missoula', name: 'Missoula Montana Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Montana' },
  { code: 'FCA', city: 'Kalispell / Glacier', name: 'Glacier Park International', country: 'USA', flag: '🇺🇸', popular: false, region: 'Montana' },
  { code: 'JAC', city: 'Jackson Hole', name: 'Jackson Hole Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Wyoming' },
  { code: 'CPR', city: 'Casper', name: 'Casper/Natrona County International', country: 'USA', flag: '🇺🇸', popular: false, region: 'Wyoming' },
  { code: 'FAR', city: 'Fargo', name: 'Hector International Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'North Dakota' },
  { code: 'BIS', city: 'Bismarck', name: 'Bismarck Municipal Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'North Dakota' },
  { code: 'FSD', city: 'Sioux Falls', name: 'Sioux Falls Regional Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'South Dakota' },
  { code: 'RAP', city: 'Rapid City', name: 'Rapid City Regional Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'South Dakota' },
  { code: 'OKC', city: 'Oklahoma City', name: 'Will Rogers World Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Oklahoma' },
  { code: 'TUL', city: 'Tulsa', name: 'Tulsa International Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Oklahoma' },

  // Hawaii & Alaska
  { code: 'HNL', city: 'Honolulu', name: 'Daniel K. Inouye International', country: 'USA', flag: '🇺🇸', popular: true, region: 'Hawaii' },
  { code: 'OGG', city: 'Maui / Kahului', name: 'Kahului Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Hawaii' },
  { code: 'KOA', city: 'Kona', name: 'Ellison Onizuka Kona International', country: 'USA', flag: '🇺🇸', popular: false, region: 'Hawaii' },
  { code: 'LIH', city: 'Kauai / Lihue', name: 'Lihue Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Hawaii' },
  { code: 'ANC', city: 'Anchorage', name: 'Ted Stevens Anchorage International', country: 'USA', flag: '🇺🇸', popular: false, region: 'Alaska' },
  { code: 'FAI', city: 'Fairbanks', name: 'Fairbanks International Airport', country: 'USA', flag: '🇺🇸', popular: false, region: 'Alaska' },
];

export const UK_AIRPORTS: Airport[] = [
  // Greater London & South East
  { code: 'LHR', city: 'London (Heathrow)', name: 'London Heathrow Airport', country: 'UK', flag: '🇬🇧', popular: true, region: 'London & South East' },
  { code: 'LGW', city: 'London (Gatwick)', name: 'London Gatwick Airport', country: 'UK', flag: '🇬🇧', popular: true, region: 'London & South East' },
  { code: 'STN', city: 'London (Stansted)', name: 'London Stansted Airport', country: 'UK', flag: '🇬🇧', popular: true, region: 'London & South East' },
  { code: 'LTN', city: 'London (Luton)', name: 'London Luton Airport', country: 'UK', flag: '🇬🇧', popular: true, region: 'London & South East' },
  { code: 'LCY', city: 'London (City)', name: 'London City Airport', country: 'UK', flag: '🇬🇧', popular: false, region: 'London & South East' },
  { code: 'SEN', city: 'London (Southend)', name: 'London Southend Airport', country: 'UK', flag: '🇬🇧', popular: false, region: 'London & South East' },
  { code: 'SOU', city: 'Southampton', name: 'Southampton Airport', country: 'UK', flag: '🇬🇧', popular: false, region: 'London & South East' },

  // Midlands & East of England
  { code: 'BHX', city: 'Birmingham', name: 'Birmingham Airport', country: 'UK', flag: '🇬🇧', popular: true, region: 'Midlands' },
  { code: 'EMA', city: 'East Midlands (Derby/Nottingham)', name: 'East Midlands Airport', country: 'UK', flag: '🇬🇧', popular: true, region: 'Midlands' },
  { code: 'NWI', city: 'Norwich', name: 'Norwich Airport', country: 'UK', flag: '🇬🇧', popular: false, region: 'East of England' },

  // Northern England
  { code: 'MAN', city: 'Manchester', name: 'Manchester Airport', country: 'UK', flag: '🇬🇧', popular: true, region: 'North West' },
  { code: 'LPL', city: 'Liverpool', name: 'Liverpool John Lennon Airport', country: 'UK', flag: '🇬🇧', popular: false, region: 'North West' },
  { code: 'LBA', city: 'Leeds / Bradford', name: 'Leeds Bradford Airport', country: 'UK', flag: '🇬🇧', popular: true, region: 'Yorkshire' },
  { code: 'NCL', city: 'Newcastle', name: 'Newcastle International Airport', country: 'UK', flag: '🇬🇧', popular: true, region: 'North East' },
  { code: 'MME', city: 'Teesside / Durham', name: 'Teesside International Airport', country: 'UK', flag: '🇬🇧', popular: false, region: 'North East' },
  { code: 'HUY', city: 'Humberside / Hull', name: 'Humberside Airport', country: 'UK', flag: '🇬🇧', popular: false, region: 'Yorkshire & Humber' },

  // South West England
  { code: 'BRS', city: 'Bristol', name: 'Bristol Airport', country: 'UK', flag: '🇬🇧', popular: true, region: 'South West' },
  { code: 'BOH', city: 'Bournemouth', name: 'Bournemouth Airport', country: 'UK', flag: '🇬🇧', popular: false, region: 'South West' },
  { code: 'EXT', city: 'Exeter', name: 'Exeter Airport', country: 'UK', flag: '🇬🇧', popular: false, region: 'South West' },
  { code: 'NQY', city: 'Newquay / Cornwall', name: 'Cornwall Airport Newquay', country: 'UK', flag: '🇬🇧', popular: false, region: 'South West' },

  // Scotland
  { code: 'EDI', city: 'Edinburgh', name: 'Edinburgh Airport', country: 'UK', flag: '🇬🇧', popular: true, region: 'Scotland' },
  { code: 'GLA', city: 'Glasgow', name: 'Glasgow Airport', country: 'UK', flag: '🇬🇧', popular: true, region: 'Scotland' },
  { code: 'PIK', city: 'Glasgow (Prestwick)', name: 'Glasgow Prestwick Airport', country: 'UK', flag: '🇬🇧', popular: false, region: 'Scotland' },
  { code: 'ABZ', city: 'Aberdeen', name: 'Aberdeen International Airport', country: 'UK', flag: '🇬🇧', popular: true, region: 'Scotland' },
  { code: 'INV', city: 'Inverness / Highlands', name: 'Inverness Airport', country: 'UK', flag: '🇬🇧', popular: false, region: 'Scotland' },
  { code: 'DND', city: 'Dundee', name: 'Dundee Airport', country: 'UK', flag: '🇬🇧', popular: false, region: 'Scotland' },
  { code: 'LSI', city: 'Sumburgh / Shetland', name: 'Sumburgh Airport', country: 'UK', flag: '🇬🇧', popular: false, region: 'Scotland' },
  { code: 'KOI', city: 'Kirkwall / Orkney', name: 'Kirkwall Airport', country: 'UK', flag: '🇬🇧', popular: false, region: 'Scotland' },
  { code: 'SYY', city: 'Stornoway / Hebrides', name: 'Stornoway Airport', country: 'UK', flag: '🇬🇧', popular: false, region: 'Scotland' },
  { code: 'BEB', city: 'Benbecula', name: 'Benbecula Airport', country: 'UK', flag: '🇬🇧', popular: false, region: 'Scotland' },
  { code: 'BRR', city: 'Barra', name: 'Barra Airport', country: 'UK', flag: '🇬🇧', popular: false, region: 'Scotland' },
  { code: 'ILY', city: 'Islay', name: 'Islay Airport', country: 'UK', flag: '🇬🇧', popular: false, region: 'Scotland' },
  { code: 'TRE', city: 'Tiree', name: 'Tiree Airport', country: 'UK', flag: '🇬🇧', popular: false, region: 'Scotland' },
  { code: 'CAL', city: 'Campbeltown', name: 'Campbeltown Airport', country: 'UK', flag: '🇬🇧', popular: false, region: 'Scotland' },

  // Wales
  { code: 'CWL', city: 'Cardiff', name: 'Cardiff Airport', country: 'UK', flag: '🇬🇧', popular: true, region: 'Wales' },

  // Northern Ireland
  { code: 'BFS', city: 'Belfast (International)', name: 'Belfast International Airport', country: 'UK', flag: '🇬🇧', popular: true, region: 'Northern Ireland' },
  { code: 'BHD', city: 'Belfast (City)', name: 'George Best Belfast City Airport', country: 'UK', flag: '🇬🇧', popular: false, region: 'Northern Ireland' },
  { code: 'LDY', city: 'Derry / Londonderry', name: 'City of Derry Airport', country: 'UK', flag: '🇬🇧', popular: false, region: 'Northern Ireland' },

  // Channel Islands & Crown Dependencies
  { code: 'JER', city: 'Jersey', name: 'Jersey Airport', country: 'UK', flag: '🇬🇧', popular: false, region: 'Channel Islands' },
  { code: 'GCI', city: 'Guernsey', name: 'Guernsey Airport', country: 'UK', flag: '🇬🇧', popular: false, region: 'Channel Islands' },
  { code: 'IOM', city: 'Isle of Man', name: 'Isle of Man Ronaldsway Airport', country: 'UK', flag: '🇬🇧', popular: false, region: 'Isle of Man' },
  { code: 'GIB', city: 'Gibraltar', name: 'Gibraltar International Airport', country: 'UK', flag: '🇬🇧', popular: false, region: 'Overseas Territory' },
];

export const ORIGIN_AIRPORTS: Airport[] = [
  ...CANADA_AIRPORTS,
  ...USA_AIRPORTS,
  ...UK_AIRPORTS,
];

// Backwards compatibility
export const NORTH_AMERICA_AIRPORTS: Airport[] = [
  ...CANADA_AIRPORTS,
  ...USA_AIRPORTS,
];

export const INDIA_AIRPORTS: Airport[] = [
  // North India / Punjab / NCR / Rajasthan / UP
  { code: 'DEL', city: 'Delhi (NCR)', name: 'Indira Gandhi International Airport', country: 'India', flag: '🇮🇳', popular: true, region: 'Delhi NCR' },
  { code: 'ATQ', city: 'Amritsar', name: 'Sri Guru Ram Dass Jee International (Punjab)', country: 'India', flag: '🇮🇳', popular: true, region: 'Punjab' },
  { code: 'IXC', city: 'Chandigarh', name: 'Shaheed Bhagat Singh International Airport', country: 'India', flag: '🇮🇳', popular: true, region: 'Punjab / Haryana' },
  { code: 'JAI', city: 'Jaipur', name: 'Jaipur International Airport (Rajasthan)', country: 'India', flag: '🇮🇳', popular: true, region: 'Rajasthan' },
  { code: 'LKO', city: 'Lucknow', name: 'Chaudhary Charan Singh International (UP)', country: 'India', flag: '🇮🇳', popular: true, region: 'Uttar Pradesh' },
  { code: 'VNS', city: 'Varanasi', name: 'Lal Bahadur Shastri International Airport', country: 'India', flag: '🇮🇳', popular: true, region: 'Uttar Pradesh' },
  { code: 'AYJ', city: 'Ayodhya', name: 'Maharishi Valmiki International Airport', country: 'India', flag: '🇮🇳', popular: false, region: 'Uttar Pradesh' },
  { code: 'DED', city: 'Dehradun / Rishikesh', name: 'Jolly Grant Airport (Uttarakhand)', country: 'India', flag: '🇮🇳', popular: false, region: 'Uttarakhand' },
  { code: 'SXR', city: 'Srinagar (Kashmir)', name: 'Sheikh ul-Alam International Airport', country: 'India', flag: '🇮🇳', popular: false, region: 'Jammu & Kashmir' },
  { code: 'IXJ', city: 'Jammu', name: 'Jammu Civil Enclave', country: 'India', flag: '🇮🇳', popular: false, region: 'Jammu & Kashmir' },
  { code: 'IXL', city: 'Leh (Ladakh)', name: 'Kushok Bakula Rimpochee Airport', country: 'India', flag: '🇮🇳', popular: false, region: 'Ladakh' },
  { code: 'UDR', city: 'Udaipur', name: 'Maharana Pratap Airport (Rajasthan)', country: 'India', flag: '🇮🇳', popular: false, region: 'Rajasthan' },
  { code: 'JDH', city: 'Jodhpur', name: 'Jodhpur Airport', country: 'India', flag: '🇮🇳', popular: false, region: 'Rajasthan' },
  { code: 'KNU', city: 'Kanpur', name: 'Kanpur Airport', country: 'India', flag: '🇮🇳', popular: false, region: 'Uttar Pradesh' },
  { code: 'AGR', city: 'Agra', name: 'Agra Airport / Kheria Air Force Station', country: 'India', flag: '🇮🇳', popular: false, region: 'Uttar Pradesh' },
  { code: 'BEK', city: 'Bareilly', name: 'Bareilly Airport', country: 'India', flag: '🇮🇳', popular: false, region: 'Uttar Pradesh' },

  // West India & Gujarat / Maharashtra / Goa
  { code: 'BOM', city: 'Mumbai', name: 'Chhatrapati Shivaji Maharaj International', country: 'India', flag: '🇮🇳', popular: true, region: 'Maharashtra' },
  { code: 'AMD', city: 'Ahmedabad', name: 'Sardar Vallabhbhai Patel International (Gujarat)', country: 'India', flag: '🇮🇳', popular: true, region: 'Gujarat' },
  { code: 'PNQ', city: 'Pune', name: 'Pune International Airport', country: 'India', flag: '🇮🇳', popular: true, region: 'Maharashtra' },
  { code: 'NAG', city: 'Nagpur', name: 'Dr. Babasaheb Ambedkar International', country: 'India', flag: '🇮🇳', popular: false, region: 'Maharashtra' },
  { code: 'BDQ', city: 'Vadodara (Baroda)', name: 'Vadodara Airport', country: 'India', flag: '🇮🇳', popular: true, region: 'Gujarat' },
  { code: 'STV', city: 'Surat', name: 'Surat International Airport', country: 'India', flag: '🇮🇳', popular: true, region: 'Gujarat' },
  { code: 'HSR', city: 'Rajkot (Hirasar)', name: 'Rajkot International Airport', country: 'India', flag: '🇮🇳', popular: false, region: 'Gujarat' },
  { code: 'BHU', city: 'Bhavnagar', name: 'Bhavnagar Airport', country: 'India', flag: '🇮🇳', popular: false, region: 'Gujarat' },
  { code: 'BHJ', city: 'Bhuj (Kutch)', name: 'Bhuj Airport', country: 'India', flag: '🇮🇳', popular: false, region: 'Gujarat' },
  { code: 'GOI', city: 'Goa (Dabolim)', name: 'Goa International Airport', country: 'India', flag: '🇮🇳', popular: true, region: 'Goa' },
  { code: 'GOX', city: 'Goa (Mopa)', name: 'Manohar International Airport', country: 'India', flag: '🇮🇳', popular: true, region: 'Goa' },
  { code: 'IDR', city: 'Indore', name: 'Devi Ahilyabai Holkar International', country: 'India', flag: '🇮🇳', popular: false, region: 'Madhya Pradesh' },
  { code: 'BHO', city: 'Bhopal', name: 'Raja Bhoj Airport', country: 'India', flag: '🇮🇳', popular: false, region: 'Madhya Pradesh' },
  { code: 'JLR', city: 'Jabalpur', name: 'Jabalpur Airport (Dumna)', country: 'India', flag: '🇮🇳', popular: false, region: 'Madhya Pradesh' },

  // South India
  { code: 'BLR', city: 'Bengaluru', name: 'Kempegowda International Airport', country: 'India', flag: '🇮🇳', popular: true, region: 'Karnataka' },
  { code: 'HYD', city: 'Hyderabad', name: 'Rajiv Gandhi International Airport', country: 'India', flag: '🇮🇳', popular: true, region: 'Telangana' },
  { code: 'MAA', city: 'Chennai', name: 'Chennai International Airport', country: 'India', flag: '🇮🇳', popular: true, region: 'Tamil Nadu' },
  { code: 'COK', city: 'Kochi (Cochin)', name: 'Cochin International Airport (Kerala)', country: 'India', flag: '🇮🇳', popular: true, region: 'Kerala' },
  { code: 'TRV', city: 'Thiruvananthapuram', name: 'Trivandrum International Airport', country: 'India', flag: '🇮🇳', popular: true, region: 'Kerala' },
  { code: 'CCJ', city: 'Kozhikode (Calicut)', name: 'Calicut International Airport', country: 'India', flag: '🇮🇳', popular: true, region: 'Kerala' },
  { code: 'CNN', city: 'Kannur', name: 'Kannur International Airport', country: 'India', flag: '🇮🇳', popular: false, region: 'Kerala' },
  { code: 'CJB', city: 'Coimbatore', name: 'Coimbatore International Airport', country: 'India', flag: '🇮🇳', popular: false, region: 'Tamil Nadu' },
  { code: 'TRZ', city: 'Tiruchirappalli (Trichy)', name: 'Tiruchirappalli International Airport', country: 'India', flag: '🇮🇳', popular: false, region: 'Tamil Nadu' },
  { code: 'IXM', city: 'Madurai', name: 'Madurai Airport', country: 'India', flag: '🇮🇳', popular: false, region: 'Tamil Nadu' },
  { code: 'IXE', city: 'Mangaluru', name: 'Mangalore International Airport', country: 'India', flag: '🇮🇳', popular: false, region: 'Karnataka' },
  { code: 'VTZ', city: 'Visakhapatnam (Vizag)', name: 'Visakhapatnam International Airport', country: 'India', flag: '🇮🇳', popular: false, region: 'Andhra Pradesh' },
  { code: 'VGA', city: 'Vijayawada', name: 'Vijayawada International Airport', country: 'India', flag: '🇮🇳', popular: false, region: 'Andhra Pradesh' },
  { code: 'TIR', city: 'Tirupati', name: 'Tirupati International Airport', country: 'India', flag: '🇮🇳', popular: false, region: 'Andhra Pradesh' },
  { code: 'HBX', city: 'Hubballi / Dharwad', name: 'Hubli Airport', country: 'India', flag: '🇮🇳', popular: false, region: 'Karnataka' },
  { code: 'IXG', city: 'Belagavi (Belgaum)', name: 'Belagavi Airport', country: 'India', flag: '🇮🇳', popular: false, region: 'Karnataka' },

  // East & North East India
  { code: 'CCU', city: 'Kolkata', name: 'Netaji Subhash Chandra Bose International', country: 'India', flag: '🇮🇳', popular: true, region: 'West Bengal' },
  { code: 'PAT', city: 'Patna', name: 'Jay Prakash Narayan Airport', country: 'India', flag: '🇮🇳', popular: false, region: 'Bihar' },
  { code: 'GAY', city: 'Gaya', name: 'Gaya Airport / Bodhgaya', country: 'India', flag: '🇮🇳', popular: false, region: 'Bihar' },
  { code: 'BBI', city: 'Bhubaneswar', name: 'Biju Patnaik International Airport', country: 'India', flag: '🇮🇳', popular: false, region: 'Odisha' },
  { code: 'IXR', city: 'Ranchi', name: 'Birsa Munda Airport', country: 'India', flag: '🇮🇳', popular: false, region: 'Jharkhand' },
  { code: 'GAU', city: 'Guwahati', name: 'Lokpriya Gopinath Bordoloi International', country: 'India', flag: '🇮🇳', popular: false, region: 'Assam' },
  { code: 'IXB', city: 'Bagdogra / Siliguri', name: 'Bagdogra International Airport', country: 'India', flag: '🇮🇳', popular: false, region: 'West Bengal' },
  { code: 'IMF', city: 'Imphal', name: 'Bir Tikendrajit International Airport', country: 'India', flag: '🇮🇳', popular: false, region: 'Manipur' },
  { code: 'IXA', city: 'Agartala', name: 'Maharaja Bir Bikram Airport', country: 'India', flag: '🇮🇳', popular: false, region: 'Tripura' },
  { code: 'RPR', city: 'Raipur', name: 'Swami Vivekananda Airport', country: 'India', flag: '🇮🇳', popular: false, region: 'Chhattisgarh' },
  { code: 'IXZ', city: 'Port Blair / Andaman', name: 'Veer Savarkar International Airport', country: 'India', flag: '🇮🇳', popular: false, region: 'Andaman & Nicobar' },
];

export const INTERNATIONAL_AIRPORTS: Airport[] = [
  // Middle East
  { code: 'DXB', city: 'Dubai', name: 'Dubai International Airport', country: 'United Arab Emirates', flag: '🇦🇪', popular: true, region: 'Middle East' },
  { code: 'DWC', city: 'Dubai (Al Maktoum)', name: 'Al Maktoum International Airport', country: 'United Arab Emirates', flag: '🇦🇪', popular: false, region: 'Middle East' },
  { code: 'AUH', city: 'Abu Dhabi', name: 'Zayed International Airport', country: 'United Arab Emirates', flag: '🇦🇪', popular: true, region: 'Middle East' },
  { code: 'SHJ', city: 'Sharjah', name: 'Sharjah International Airport', country: 'United Arab Emirates', flag: '🇦🇪', popular: false, region: 'Middle East' },
  { code: 'DOH', city: 'Doha', name: 'Hamad International Airport', country: 'Qatar', flag: '🇶🇦', popular: true, region: 'Middle East' },
  { code: 'RUH', city: 'Riyadh', name: 'King Khalid International Airport', country: 'Saudi Arabia', flag: '🇸🇦', popular: true, region: 'Middle East' },
  { code: 'JED', city: 'Jeddah', name: 'King Abdulaziz International Airport', country: 'Saudi Arabia', flag: '🇸🇦', popular: true, region: 'Middle East' },
  { code: 'KWI', city: 'Kuwait City', name: 'Kuwait International Airport', country: 'Kuwait', flag: '🇰🇼', popular: false, region: 'Middle East' },
  { code: 'MCT', city: 'Muscat', name: 'Muscat International Airport', country: 'Oman', flag: '🇴🇲', popular: false, region: 'Middle East' },
  { code: 'BAH', city: 'Manama', name: 'Bahrain International Airport', country: 'Bahrain', flag: '🇧🇭', popular: false, region: 'Middle East' },

  // Europe (Schengen & Western/Southern/Northern Europe)
  { code: 'CDG', city: 'Paris (Charles de Gaulle)', name: 'Charles de Gaulle Airport', country: 'France', flag: '🇫🇷', popular: true, region: 'Europe' },
  { code: 'ORY', city: 'Paris (Orly)', name: 'Paris Orly Airport', country: 'France', flag: '🇫🇷', popular: false, region: 'Europe' },
  { code: 'FRA', city: 'Frankfurt', name: 'Frankfurt Airport', country: 'Germany', flag: '🇩🇪', popular: true, region: 'Europe' },
  { code: 'MUC', city: 'Munich', name: 'Munich Airport', country: 'Germany', flag: '🇩🇪', popular: true, region: 'Europe' },
  { code: 'BER', city: 'Berlin', name: 'Berlin Brandenburg Airport', country: 'Germany', flag: '🇩🇪', popular: false, region: 'Europe' },
  { code: 'AMS', city: 'Amsterdam', name: 'Amsterdam Airport Schiphol', country: 'Netherlands', flag: '🇳🇱', popular: true, region: 'Europe' },
  { code: 'ZRH', city: 'Zurich', name: 'Zurich Airport', country: 'Switzerland', flag: '🇨🇭', popular: true, region: 'Europe' },
  { code: 'GVA', city: 'Geneva', name: 'Geneva Airport', country: 'Switzerland', flag: '🇨🇭', popular: false, region: 'Europe' },
  { code: 'FCO', city: 'Rome (Fiumicino)', name: 'Leonardo da Vinci–Fiumicino Airport', country: 'Italy', flag: '🇮🇹', popular: true, region: 'Europe' },
  { code: 'MXP', city: 'Milan (Malpensa)', name: 'Milan Malpensa Airport', country: 'Italy', flag: '🇮🇹', popular: true, region: 'Europe' },
  { code: 'MAD', city: 'Madrid', name: 'Adolfo Suárez Madrid–Barajas', country: 'Spain', flag: '🇪🇸', popular: true, region: 'Europe' },
  { code: 'BCN', city: 'Barcelona', name: 'Josep Tarradellas Barcelona-El Prat', country: 'Spain', flag: '🇪🇸', popular: true, region: 'Europe' },
  { code: 'IST', city: 'Istanbul', name: 'Istanbul Airport', country: 'Turkey', flag: '🇹🇷', popular: true, region: 'Europe' },
  { code: 'SAW', city: 'Istanbul (Sabiha Gökçen)', name: 'Sabiha Gökçen International', country: 'Turkey', flag: '🇹🇷', popular: false, region: 'Europe' },
  { code: 'DUB', city: 'Dublin', name: 'Dublin Airport', country: 'Ireland', flag: '🇮🇪', popular: true, region: 'Europe' },
  { code: 'VIE', city: 'Vienna', name: 'Vienna International Airport', country: 'Austria', flag: '🇦🇹', popular: false, region: 'Europe' },
  { code: 'BRU', city: 'Brussels', name: 'Brussels Airport', country: 'Belgium', flag: '🇧🇪', popular: false, region: 'Europe' },
  { code: 'LIS', city: 'Lisbon', name: 'Humberto Delgado Airport', country: 'Portugal', flag: '🇵🇹', popular: false, region: 'Europe' },
  { code: 'CPH', city: 'Copenhagen', name: 'Copenhagen Airport', country: 'Denmark', flag: '🇩🇰', popular: false, region: 'Europe' },
  { code: 'ARN', city: 'Stockholm', name: 'Stockholm Arlanda Airport', country: 'Sweden', flag: '🇸🇪', popular: false, region: 'Europe' },
  { code: 'OSL', city: 'Oslo', name: 'Oslo Airport, Gardermoen', country: 'Norway', flag: '🇳🇴', popular: false, region: 'Europe' },
  { code: 'HEL', city: 'Helsinki', name: 'Helsinki Airport', country: 'Finland', flag: '🇫🇮', popular: false, region: 'Europe' },
  { code: 'ATH', city: 'Athens', name: 'Athens International Airport', country: 'Greece', flag: '🇬🇷', popular: false, region: 'Europe' },
  { code: 'WAW', city: 'Warsaw', name: 'Warsaw Chopin Airport', country: 'Poland', flag: '🇵🇱', popular: false, region: 'Europe' },
  { code: 'PRG', city: 'Prague', name: 'Václav Havel Airport Prague', country: 'Czech Republic', flag: '🇨🇿', popular: false, region: 'Europe' },

  // Asia Pacific & East Asia
  { code: 'SIN', city: 'Singapore', name: 'Singapore Changi Airport', country: 'Singapore', flag: '🇸🇬', popular: true, region: 'Southeast Asia' },
  { code: 'BKK', city: 'Bangkok (Suvarnabhumi)', name: 'Suvarnabhumi Airport', country: 'Thailand', flag: '🇹🇭', popular: true, region: 'Southeast Asia' },
  { code: 'DMK', city: 'Bangkok (Don Mueang)', name: 'Don Mueang International', country: 'Thailand', flag: '🇹🇭', popular: false, region: 'Southeast Asia' },
  { code: 'HKT', city: 'Phuket', name: 'Phuket International Airport', country: 'Thailand', flag: '🇹🇭', popular: false, region: 'Southeast Asia' },
  { code: 'KUL', city: 'Kuala Lumpur', name: 'Kuala Lumpur International', country: 'Malaysia', flag: '🇲🇾', popular: true, region: 'Southeast Asia' },
  { code: 'CGK', city: 'Jakarta', name: 'Soekarno–Hatta International', country: 'Indonesia', flag: '🇮🇩', popular: false, region: 'Southeast Asia' },
  { code: 'DPS', city: 'Bali / Denpasar', name: 'Ngurah Rai International Airport', country: 'Indonesia', flag: '🇮🇩', popular: true, region: 'Southeast Asia' },
  { code: 'MNL', city: 'Manila', name: 'Ninoy Aquino International', country: 'Philippines', flag: '🇵🇭', popular: true, region: 'Southeast Asia' },
  { code: 'HAN', city: 'Hanoi', name: 'Noi Bai International Airport', country: 'Vietnam', flag: '🇻🇳', popular: false, region: 'Southeast Asia' },
  { code: 'SGN', city: 'Ho Chi Minh City', name: 'Tan Son Nhat International', country: 'Vietnam', flag: '🇻🇳', popular: false, region: 'Southeast Asia' },
  { code: 'HND', city: 'Tokyo (Haneda)', name: 'Tokyo Haneda Airport', country: 'Japan', flag: '🇯🇵', popular: true, region: 'East Asia' },
  { code: 'NRT', city: 'Tokyo (Narita)', name: 'Narita International Airport', country: 'Japan', flag: '🇯🇵', popular: true, region: 'East Asia' },
  { code: 'KIX', city: 'Osaka (Kansai)', name: 'Kansai International Airport', country: 'Japan', flag: '🇯🇵', popular: false, region: 'East Asia' },
  { code: 'ICN', city: 'Seoul (Incheon)', name: 'Incheon International Airport', country: 'South Korea', flag: '🇰🇷', popular: true, region: 'East Asia' },
  { code: 'HKG', city: 'Hong Kong', name: 'Hong Kong International Airport', country: 'Hong Kong', flag: '🇭🇰', popular: true, region: 'East Asia' },
  { code: 'TPE', city: 'Taipei (Taoyuan)', name: 'Taoyuan International Airport', country: 'Taiwan', flag: '🇹🇼', popular: false, region: 'East Asia' },
  { code: 'PEK', city: 'Beijing (Capital)', name: 'Beijing Capital International', country: 'China', flag: '🇨🇳', popular: false, region: 'East Asia' },
  { code: 'PVG', city: 'Shanghai (Pudong)', name: 'Shanghai Pudong International', country: 'China', flag: '🇨🇳', popular: false, region: 'East Asia' },
  { code: 'CAN', city: 'Guangzhou', name: 'Guangzhou Baiyun International', country: 'China', flag: '🇨🇳', popular: false, region: 'East Asia' },

  // South Asia Neighbors
  { code: 'CMB', city: 'Colombo', name: 'Bandaranaike International Airport', country: 'Sri Lanka', flag: '🇱🇰', popular: true, region: 'South Asia' },
  { code: 'DAC', city: 'Dhaka', name: 'Hazrat Shahjalal International', country: 'Bangladesh', flag: '🇧🇩', popular: true, region: 'South Asia' },
  { code: 'KTM', city: 'Kathmandu', name: 'Tribhuvan International Airport', country: 'Nepal', flag: '🇳🇵', popular: true, region: 'South Asia' },
  { code: 'MLE', city: 'Male / Maldives', name: 'Velana International Airport', country: 'Maldives', flag: '🇲🇻', popular: true, region: 'South Asia' },
  { code: 'ISB', city: 'Islamabad', name: 'Islamabad International Airport', country: 'Pakistan', flag: '🇵🇰', popular: false, region: 'South Asia' },
  { code: 'LHE', city: 'Lahore', name: 'Allama Iqbal International', country: 'Pakistan', flag: '🇵🇰', popular: false, region: 'South Asia' },
  { code: 'KHI', city: 'Karachi', name: 'Jinnah International Airport', country: 'Pakistan', flag: '🇵🇰', popular: false, region: 'South Asia' },

  // Australia & New Zealand / Oceania
  { code: 'SYD', city: 'Sydney', name: 'Sydney Kingsford Smith Airport', country: 'Australia', flag: '🇦🇺', popular: true, region: 'Australia & Pacific' },
  { code: 'MEL', city: 'Melbourne', name: 'Melbourne Airport (Tullamarine)', country: 'Australia', flag: '🇦🇺', popular: true, region: 'Australia & Pacific' },
  { code: 'BNE', city: 'Brisbane', name: 'Brisbane Airport', country: 'Australia', flag: '🇦🇺', popular: true, region: 'Australia & Pacific' },
  { code: 'PER', city: 'Perth', name: 'Perth Airport', country: 'Australia', flag: '🇦🇺', popular: true, region: 'Australia & Pacific' },
  { code: 'ADL', city: 'Adelaide', name: 'Adelaide Airport', country: 'Australia', flag: '🇦🇺', popular: false, region: 'Australia & Pacific' },
  { code: 'AKL', city: 'Auckland', name: 'Auckland Airport', country: 'New Zealand', flag: '🇳🇿', popular: true, region: 'Australia & Pacific' },
  { code: 'CHC', city: 'Christchurch', name: 'Christchurch International', country: 'New Zealand', flag: '🇳🇿', popular: false, region: 'Australia & Pacific' },
  { code: 'NAN', city: 'Nadi / Fiji', name: 'Nadi International Airport', country: 'Fiji', flag: '🇫🇯', popular: false, region: 'Australia & Pacific' },

  // Africa & South / Central America
  { code: 'CAI', city: 'Cairo', name: 'Cairo International Airport', country: 'Egypt', flag: '🇪🇬', popular: false, region: 'Africa' },
  { code: 'JNB', city: 'Johannesburg', name: 'O. R. Tambo International', country: 'South Africa', flag: '🇿🇦', popular: false, region: 'Africa' },
  { code: 'CPT', city: 'Cape Town', name: 'Cape Town International', country: 'South Africa', flag: '🇿🇦', popular: false, region: 'Africa' },
  { code: 'NBO', city: 'Nairobi', name: 'Jomo Kenyatta International', country: 'Kenya', flag: '🇰🇪', popular: false, region: 'Africa' },
  { code: 'ADD', city: 'Addis Ababa', name: 'Bole International Airport', country: 'Ethiopia', flag: '🇪🇹', popular: false, region: 'Africa' },
  { code: 'CMN', city: 'Casablanca', name: 'Mohammed V International', country: 'Morocco', flag: '🇲🇦', popular: false, region: 'Africa' },
  { code: 'MEX', city: 'Mexico City', name: 'Benito Juárez International', country: 'Mexico', flag: '🇲🇽', popular: false, region: 'Americas' },
  { code: 'CUN', city: 'Cancún', name: 'Cancún International Airport', country: 'Mexico', flag: '🇲🇽', popular: false, region: 'Americas' },
  { code: 'PTY', city: 'Panama City', name: 'Tocumen International Airport', country: 'Panama', flag: '🇵🇦', popular: false, region: 'Americas' },
  { code: 'BOG', city: 'Bogotá', name: 'El Dorado International', country: 'Colombia', flag: '🇨🇴', popular: false, region: 'Americas' },
  { code: 'GRU', city: 'São Paulo (Guarulhos)', name: 'São Paulo/Guarulhos International', country: 'Brazil', flag: '🇧🇷', popular: false, region: 'Americas' },
  { code: 'EZE', city: 'Buenos Aires (Ezeiza)', name: 'Ministro Pistarini International', country: 'Argentina', flag: '🇦🇷', popular: false, region: 'Americas' },
  { code: 'SCL', city: 'Santiago', name: 'Arturo Merino Benítez International', country: 'Chile', flag: '🇨🇱', popular: false, region: 'Americas' },
  { code: 'LIM', city: 'Lima', name: 'Jorge Chávez International', country: 'Peru', flag: '🇵🇪', popular: false, region: 'Americas' },
];

export const WORLDWIDE_AIRPORTS: Airport[] = [
  ...CANADA_AIRPORTS,
  ...USA_AIRPORTS,
  ...UK_AIRPORTS,
  ...INDIA_AIRPORTS,
  ...INTERNATIONAL_AIRPORTS,
];

export const ALL_AIRPORTS: Airport[] = WORLDWIDE_AIRPORTS;

export function getAirport(code: string): Airport | undefined {
  if (!code) return undefined;
  const match = ALL_AIRPORTS.find(a => a.code.toUpperCase() === code.toUpperCase());
  if (match) return match;
  // Check if code matches city or name
  return ALL_AIRPORTS.find(a => a.city.toLowerCase() === code.toLowerCase());
}

/**
 * Returns a normalized Airport object even if the airport is custom/unlisted
 */
export function getOrCreateAirport(codeOrCity: string, fallbackCountry: string = 'Worldwide'): Airport {
  const existing = getAirport(codeOrCity);
  if (existing) return existing;

  const flagMap: Record<string, string> = {
    Canada: '🇨🇦',
    USA: '🇺🇸',
    UK: '🇬🇧',
    India: '🇮🇳',
    'United Arab Emirates': '🇦🇪',
    Australia: '🇦🇺',
    France: '🇫🇷',
    Germany: '🇩🇪',
  };

  const clean = (codeOrCity || '').trim();
  const isLikelyCode = clean.length === 3 && /^[A-Za-z]{3}$/.test(clean);

  return {
    code: isLikelyCode ? clean.toUpperCase() : clean.substring(0, 3).toUpperCase(),
    city: clean,
    name: `${clean} Airport`,
    country: fallbackCountry,
    flag: flagMap[fallbackCountry] || '✈️',
  };
}
