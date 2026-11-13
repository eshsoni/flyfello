import React, { useEffect } from 'react';
import {
  X,
  ShieldCheck,
  RefreshCw,
  Users,
  Mail,
  CheckCircle2,
  MessageCircle,
  ArrowRight,
  HelpCircle,
  Plane,
  Luggage,
  FileText,
  Cookie,
  AlertTriangle,
  Ban,
  MapPin,
} from 'lucide-react';
import { FlyfelloLogo } from './FlyfelloLogo';

export type PolicyPageType =
  | 'about'
  | 'contact'
  | 'disclaimer'
  | 'cookies'
  | 'terms'
  | 'privacy'
  | 'help'
  | 'protocols'
  | 'cancellation'
  | 'refund'
  | 'baggage';

interface PolicyModalProps {
  page: PolicyPageType;
  onClose: () => void;
  onNavigate: (page: PolicyPageType) => void;
}

const MODAL_TABS: { id: PolicyPageType; label: string }[] = [
  { id: 'about', label: 'About Us' },
  { id: 'contact', label: 'Contact Us' },
  { id: 'help', label: 'Help Centre' },
  { id: 'refund', label: 'Refund Policy' },
  { id: 'privacy', label: 'Privacy Policy' },
];

export const PolicyModal: React.FC<PolicyModalProps> = ({ page, onClose, onNavigate }) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-fade-in-up"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <FlyfelloLogo size="sm" />
            <span className="text-slate-300 hidden sm:inline">|</span>
            {/* Quick Navigation Tabs */}
            <div className="hidden sm:flex items-center gap-1 flex-wrap">
              {MODAL_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => onNavigate(tab.id)}
                  className={`px-3 py-1 text-xs font-bold rounded-lg transition-colors cursor-pointer ${
                    page === tab.id ? 'bg-[#122754] text-white' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-200/80 hover:bg-slate-300 text-slate-700 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 text-slate-700 text-sm leading-relaxed">
          {page === 'about' && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#F58220] uppercase tracking-wider mb-2">
                <Users className="w-4 h-4" />
                <span>About Us – FlyFello</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#122754] tracking-tight mb-4">
                Your Trusted Partner for Seamless Global Air Travel
              </h2>
              <p className="text-slate-600 text-base mb-6">
                At FlyFello, we believe booking international and domestic flights should be straightforward, transparent, and stress-free. Specializing in long-haul routes connecting North America—including Canada and the United States—to India and destinations worldwide, we bridge the gap between complex airline pricing and personalized, reliable service.
              </p>

              <div className="mb-6">
                <h3 className="text-lg font-bold text-[#122754] mb-2">What We Do</h3>
                <p className="text-slate-600">
                  As an independent flight booking agency, FlyFello works alongside an extensive network of airlines, Global Distribution Systems (GDS), and authorized travel consolidators to source competitive fares and flexible routing options. Whether you are planning a family visit, student travel, corporate trip, or urgent last-minute departure, we handle the search, fare comparison, and ticketing process from start to finish.
                </p>
              </div>

              <h3 className="text-lg font-bold text-[#122754] mb-3">Why Travelers Choose FlyFello</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#F58220] shrink-0 mt-0.5" />
                  <span>
                    <strong>Tailored Flight Options:</strong> Instead of leaving you to dig through hundreds of confusing layovers and hidden fare rules, we find routes that match your schedule, baggage needs, and budget.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#F58220] shrink-0 mt-0.5" />
                  <span>
                    <strong>Transparent Guidance:</strong> We clearly explain baggage allowances, change penalties, and cancellation policies before you book—so there are no surprises at the airport.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#F58220] shrink-0 mt-0.5" />
                  <span>
                    <strong>Dedicated Human Support:</strong> From initial quote to post-booking date changes or airline schedule updates, you deal directly with a responsive travel specialist via phone, WhatsApp, or email.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-[#F58220] shrink-0 mt-0.5" />
                  <span>
                    <strong>Global Reach, Personal Care:</strong> With operational roots spanning North America and India, we understand the specific travel needs, transit requirements, and seasonal demand of international flyers.
                  </span>
                </li>
              </ul>

              <div className="p-5 bg-orange-50/70 border border-orange-100 rounded-2xl">
                <div className="font-bold text-[#122754] text-base">Let’s get your next journey off the ground.</div>
                <p className="text-xs sm:text-sm text-slate-600 mt-1">
                  Reach out to the FlyFello team today for a personalized flight quote.
                </p>
              </div>
            </div>
          )}

          {page === 'contact' && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#F58220] uppercase tracking-wider mb-2">
                <Mail className="w-4 h-4" />
                <span>Get In Touch</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#122754] tracking-tight mb-4">
                We're Here 24/7 to Assist Your Journey
              </h2>
              <p className="text-slate-600 mb-8">
                Reach our experienced ticketing specialists directly via WhatsApp, phone, email, or visit our India office. We respond to fare inquiries in under 5 minutes.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                  <h3 className="font-bold text-base text-[#122754] flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-emerald-600" />
                    <span>WhatsApp Fare Desk</span>
                  </h3>
                  <p className="text-xs text-slate-600">
                    Get custom flight itinerary recommendations, live seat maps, and price holds directly on WhatsApp.
                  </p>
                  <a
                    href="https://wa.me/16048326304?text=Hi%20Flyfello,%20I%20have%20a%20question%20about%20flights"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-sm transition-colors"
                  >
                    <span>Message on WhatsApp</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>

                <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                  <h3 className="font-bold text-base text-[#122754] flex items-center gap-2">
                    <Mail className="w-5 h-5 text-[#F58220]" />
                    <span>Official Email & Hotline</span>
                  </h3>
                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="font-semibold text-slate-500">Email:</span>{' '}
                      <a href="mailto:flyfello@hotmail.com" className="font-bold text-[#122754] hover:text-[#F58220]">
                        flyfello@hotmail.com
                      </a>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-500">Call / Phone:</span>{' '}
                      <a href="tel:+918708349822" className="font-bold text-[#122754] hover:text-[#F58220]">
                        +91 87083 49822 (India)
                      </a>
                      <span className="text-slate-400 mx-1.5">;</span>
                      <a href="tel:+16048326304" className="font-bold text-[#122754] hover:text-[#F58220]">
                        +1 (604) 832-6304 (Canada)
                      </a>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-500">Instagram:</span>{' '}
                      <a href="https://instagram.com/flyfello/" target="_blank" rel="noopener noreferrer" className="font-bold text-pink-600 hover:underline">
                        @flyfello
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visit Us (India) */}
              <div className="p-6 bg-orange-50/60 border border-orange-100 rounded-2xl mb-6 flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-white text-[#F58220] border border-orange-200 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#122754] mb-1">Visit Us (India)</h3>
                  <p className="text-xs sm:text-sm text-slate-700 font-medium">
                    #172, Luna Factory Street, Mandi Dabwali, Sirsa
                  </p>
                </div>
              </div>

              <div className="p-5 bg-blue-50/60 border border-blue-100 rounded-2xl text-xs text-slate-600">
                <div className="font-bold text-[#122754] mb-1">Operating Hours:</div>
                <div>Ticketing Desk: 24 Hours / 7 Days a Week, 365 Days a Year.</div>
                <div>Customer Service: Vancouver, BC (Canada) &amp; Mandi Dabwali, Sirsa (India).</div>
              </div>
            </div>
          )}

          {page === 'disclaimer' && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#F58220] uppercase tracking-wider mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Legal Notice</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#122754] tracking-tight mb-2">
                Disclaimer and Limitation of Liability – FlyFello
              </h2>
              <div className="text-xs text-slate-400 mb-6">Last Updated: November 2026</div>

              <div className="space-y-6 text-xs sm:text-sm text-slate-600">
                <p>
                  In all circumstances and inherent values of our business, we at FlyFello ensure transparency, dedication, and care in assisting our clients with domestic and international flight bookings. FlyFello:
                </p>

                <ul className="list-disc pl-5 space-y-2.5">
                  <li>
                    Effectuates deliberate efforts to include only purposeful, reliable, and up-to-date information. However, we do not take responsibility or proclaim any warranties whatsoever that the information given on the website and its various sections is completely error-free or immune to technical or typographical flaws. The user has the ultimate responsibility of verifying information before making any booking decisions.
                  </li>
                  <li>
                    Holds the right to execute amendments, updates, or modifications to any information on the website at any time without prior notification.
                  </li>
                  <li>
                    Provides website links and URLs of third-party platforms for the convenience of users and visitors. Such external links and the information appearing on them have no direct or indirect corporate affiliation or ownership relationship with FlyFello.
                  </li>
                  <li>
                    Assumes no responsibility whatsoever with respect to the content, availability, or operational policies of third-party websites or external booking portals.
                  </li>
                  <li>
                    Requires Users/Visitors to execute necessary technical precautions at their own end to ensure that their devices are free of viruses, malware, or malicious code. We hold no liability in this regard.
                  </li>
                  <li>
                    Shall hold no liability to any User/Visitor in the event of direct, indirect, primary, secondary, consequential, or punitive loss, harm, injury, cost, or expenses incurred arising out of or related to travel bookings or website usage.
                  </li>
                  <li>
                    Operates strictly as an independent travel agency and booking intermediary, and does not serve as the direct Last-Mile Airline Service Provider. In this context, FlyFello is not deemed responsible for operational disruptions, scheduling alterations, or service failures originating directly from airlines, global distribution systems, or authorized travel suppliers.
                  </li>
                  <li>
                    FlyFello does not warrant or guarantee the absolute correctness of content produced on the website. All contents are published purely on an “AS IS” basis. We disclaim all assurances and implied warranties with respect to the content appearing on the website, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
                  </li>
                </ul>

                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-2">
                    Disclaimers on Content Representation and Ticketing Operations
                  </h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      FlyFello and its affiliates will not be held responsible or answerable for exemplary, consequential, or indirect damages relating to data usage, booking errors, or profit disruptions.
                    </li>
                    <li>
                      We disclaim liability for unintentional inaccuracies, omissions, or delays regarding content originality, accuracy, and completeness.
                    </li>
                    <li>
                      Information provided on the website may occasionally be subject to third-party inventory shifts. Customers and/or clients owe the professional responsibility to verify all booking details prior to final confirmation.
                    </li>
                    <li>
                      FlyFello is not liable for technical inaccuracies or typographical errors. We reserve the right to modify travel products, services, and associated conditions without prior notice.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-2">
                    Flight Fares, Inventory, and Ticketing Partners
                  </h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      The flight fares listed or quoted via FlyFello are subject to change and depend heavily on real-time seat availability managed by airlines, authorized consolidators, and third-party travel suppliers.
                    </li>
                    <li>
                      Availability and pricing are controlled entirely by the terms, conditions, and inventory rules of the underlying suppliers.
                    </li>
                    <li>
                      FlyFello does not guarantee the continuous availability of specific low-cost fares, promotional offers, or preferred seating selections once a quote has been generated, as tickets are secured through third-party ticketing partners.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-2">
                    Information and Data Provided by Customers/Clients
                  </h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      Feedback, data, questions, comments, or suggestions provided by customers remain non-confidential, and FlyFello assumes no legal obligation regarding the exclusive representation, use, or disclosure of such feedback.
                    </li>
                    <li>
                      FlyFello may utilize general concepts, travel preferences, or booking patterns to upscale business strategies and improve service frameworks.
                    </li>
                    <li>
                      While we ensure that personally identifiable information is never sold or traded, trusted travel suppliers, airline partners, technology vendors, and payment processors who assist us in operating our travel services may access customer data strictly for booking and fulfillment purposes.
                    </li>
                    <li>
                      We share personally identifiable information with third-party partners only under strict operational boundaries required to service your travel bookings.
                    </li>
                    <li>
                      FlyFello will release personal information of users only when required to comply with applicable legal frameworks, protect intellectual property rights, or ensure safety compliance. Non-personally identifiable data may be utilized for aggregated marketing and advertising analytics.
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-xs">
                  <strong>Note:</strong> The User/Visitor warrants and acknowledges that the use of FlyFello is subject to our overarching Terms of Use. Website accessibility may occasionally be limited or interrupted by factors outside the control of FlyFello (such as third-party supplier server outages, internet disruptions, or routine maintenance).
                </div>
              </div>
            </div>
          )}

          {page === 'cookies' && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#F58220] uppercase tracking-wider mb-2">
                <Cookie className="w-4 h-4" />
                <span>Cookie & Tracking Practices</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#122754] tracking-tight mb-2">
                Cookies and Policy
              </h2>
              <div className="text-xs text-slate-400 mb-6">Last Updated: November 2026</div>

              <div className="space-y-6 text-xs sm:text-sm">
                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-2">1. Essential Functional Cookies</h3>
                  <p className="text-slate-600">
                    FlyFello uses lightweight browser storage and session cookies strictly necessary to remember your selected currency (INR, CAD, USD, GBP), preferred departure and arrival airports, and passenger counts during your search.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-2">2. Performance &amp; Security</h3>
                  <p className="text-slate-600">
                    We may use basic reliability and security cookies to protect against automated scraping, ensure smooth site performance, and keep your flight inquiry experience responsive.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-2">3. Managing Your Preferences</h3>
                  <p className="text-slate-600">
                    You can choose Allow or Deny on the cookie prompt shown when visiting the site, or adjust cookie permissions in your browser settings at any time.
                  </p>
                </div>
              </div>
            </div>
          )}

          {page === 'terms' && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#F58220] uppercase tracking-wider mb-2">
                <FileText className="w-4 h-4" />
                <span>Service Agreement</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#122754] tracking-tight mb-2">
                Terms and Conditions – FlyFello
              </h2>
              <div className="text-xs text-slate-400 mb-6">Last Updated: November 2026</div>

              <div className="space-y-6 text-xs sm:text-sm text-slate-600">
                <p>
                  Welcome to FlyFello. By accessing our website, requesting a flight quote, or booking travel services through us, you ("Customer," "User," or "Traveler") agree to be bound by the following Terms and Conditions. Please read them carefully before completing any transaction.
                </p>

                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-2">1. Role of FlyFello (Independent Travel Intermediary)</h3>
                  <p className="mb-2">
                    FlyFello operates as an independent travel agency and flight booking intermediary. We facilitate the search, comparison, and reservation of domestic and international airfare through airlines, Global Distribution Systems (GDS), authorized consolidators, and third-party ticketing partners.
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>FlyFello does not own, operate, or control any airline or carrier.</li>
                    <li>Once a ticket is issued, the contract of carriage is strictly between the traveler and the operating airline, governed by the airline’s specific Conditions of Carriage and fare rules.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-2">2. Quotes, Fares, and Payment Terms</h3>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>
                      <strong>Dynamic Pricing:</strong> Airline fares and seat availability fluctuate continuously in real time. A quoted price is not guaranteed until full payment has been received, cleared, and the e-ticket has been officially issued by our ticketing partners.
                    </li>
                    <li>
                      <strong>Price Changes:</strong> If a fare increases or seats sell out between the time a quote is shared and the time payment is processed, FlyFello reserves the right to offer the updated fare or refund your unissued payment in full.
                    </li>
                    <li>
                      <strong>Service Fees:</strong> FlyFello may charge a transparent agency service, consultation, or ticketing fee in addition to the base airline fare and government taxes. All applicable fees will be disclosed prior to payment confirmation.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-2">3. Booking Verification and Passenger Details</h3>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>
                      <strong>Exact Name Match:</strong> It is the sole responsibility of the Customer to ensure that all passenger names, dates of birth, gender, and contact details match the traveler’s valid government-issued passport or ID letter-for-letter before confirming payment.
                    </li>
                    <li>
                      <strong>Correction Fees:</strong> Airlines strictly restrict name changes after ticket issuance. Any penalties, fare differences, or re-issuance fees resulting from inaccurate information provided by the Customer will be borne entirely by the Customer.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-2">4. Cancellations, Changes, and Refunds</h3>
                  <p className="mb-2">
                    All flight cancellations, date changes, and rerouting requests are governed by the specific Fare Rules attached to your ticket by the issuing airline and supplier:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>
                      <strong>Non-Refundable Tickets:</strong> Many promotional and discounted economy fares are strictly non-refundable and non-changeable.
                    </li>
                    <li>
                      <strong>Change &amp; Cancellation Penalties:</strong> Where permitted by the airline, modifications or cancellations will incur airline penalties, any applicable fare difference, plus a FlyFello administrative processing fee.
                    </li>
                    <li>
                      <strong>Refund Timelines:</strong> Approved refunds are processed back to the original method of payment only after FlyFello receives the refunded funds from the airline or third-party ticketing partner. Depending on airline processing times, refunds typically take 15 to 45 business days. FlyFello service fees are non-refundable once a ticket has been issued.
                    </li>
                    <li>
                      <strong>No-Show Policy:</strong> Failure to check in or board a flight without prior cancellation ("No-Show") usually results in the airline forfeiting the entire ticket value, including any connecting or return segments.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-2">5. Passports, Visas, and Travel Documentation</h3>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>
                      Travelers are solely responsible for verifying and obtaining all required travel documents, including valid passports (typically requiring at least 6 months of validity beyond travel dates), entry visas, transit visas, and health or vaccination certificates.
                    </li>
                    <li>
                      FlyFello is not liable if a passenger is denied boarding, refused entry, or deported by immigration or airline authorities due to incomplete or invalid documentation.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-2">6. Schedule Changes and Airline Disruptions</h3>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>
                      Airlines reserve the right to modify flight schedules, change operating aircraft, delay departures, or cancel flights due to operational, weather, or regulatory reasons.
                    </li>
                    <li>
                      While FlyFello will make reasonable efforts to notify you of major schedule changes received from our suppliers, travelers are strongly advised to reconfirm flight timings directly with the airline 24 to 48 hours prior to departure.
                    </li>
                    <li>
                      FlyFello is not liable for missed connections, additional accommodation costs, or alternate transportation expenses caused by airline delays or cancellations.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-2">7. Baggage Allowances and Seat Selection</h3>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>
                      Baggage allowances (carry-on and checked) and seat selection policies vary by airline, fare class, and route. Basic economy fares may not include checked baggage or advance seat assignments.
                    </li>
                    <li>
                      Any additional fees charged by the airline at the airport for excess baggage, seat upgrades, or onboard services are the sole responsibility of the traveler.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-2">8. Fraud Prevention and Chargebacks</h3>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>
                      To protect against unauthorized transactions, FlyFello reserves the right to request identity verification or payment authorization documentation before issuing high-value international tickets.
                    </li>
                    <li>
                      By authorizing a payment with FlyFello, you agree not to initiate an unjustified credit card dispute or chargeback for services rendered in accordance with these Terms and the disclosed airline fare rules.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-2">9. Limitation of Liability</h3>
                  <p>
                    To the maximum extent permitted by applicable law, FlyFello, its owners, employees, and affiliates shall not be liable for any direct, indirect, incidental, special, or consequential damages arising out of your use of our website, reliance on travel information, or any act, omission, error, delay, or default of any airline, consolidator, or third-party service provider. In any event, FlyFello’s total liability shall not exceed the service fee paid directly to FlyFello for the specific booking in question.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-2">10. Governing Law and Dispute Resolution</h3>
                  <p>
                    These Terms and Conditions shall be governed by and construed in accordance with applicable local commercial laws where FlyFello operates. Any disputes arising under these Terms shall first be addressed through good-faith negotiation between the Customer and FlyFello support.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-2">11. Amendments to Terms</h3>
                  <p>
                    FlyFello reserves the right to update or modify these Terms and Conditions at any time without prior notice. Continued use of our website or booking services constitutes acceptance of the revised Terms.
                  </p>
                </div>
              </div>
            </div>
          )}

          {page === 'privacy' && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#F58220] uppercase tracking-wider mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Data Protection &amp; Trust</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#122754] tracking-tight mb-2">
                Privacy Policy – FlyFello
              </h2>
              <div className="text-xs text-slate-400 mb-6">Last Updated: November 2026</div>

              <div className="space-y-6 text-xs sm:text-sm text-slate-600">
                <p>
                  At FlyFello, we respect your privacy and are committed to protecting the personal information you share with us when browsing our website, requesting flight quotes, or booking travel services. This Privacy Policy explains how we collect, use, share, and safeguard your data.
                </p>

                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-2">1. Information We Collect</h3>
                  <p className="mb-2">
                    To process flight quotes, issue airline tickets, and provide customer support, we may collect the following information:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>
                      <strong>Personal &amp; Traveler Identification:</strong> Full name (as shown on passport), date of birth, gender, nationality, passport number, passport expiry date, and frequent flyer details.
                    </li>
                    <li>
                      <strong>Contact Information:</strong> Email address, phone number, WhatsApp number, and billing address.
                    </li>
                    <li>
                      <strong>Payment Information:</strong> Payment confirmation details and billing records. (Note: Sensitive credit/debit card details are processed securely through encrypted third-party payment gateways; FlyFello does not store full card numbers on its servers).
                    </li>
                    <li>
                      <strong>Technical &amp; Usage Data:</strong> IP address, browser type, device information, and website interaction data collected via cookies to improve site performance.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-2">2. How We Use Your Information</h3>
                  <p className="mb-2">
                    We use your personal data strictly for legitimate business and travel fulfillment purposes, including:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>Searching, quoting, booking, and issuing domestic and international flight tickets.</li>
                    <li>Communicating itinerary confirmations, e-tickets, schedule updates, and customer support responses.</li>
                    <li>Verifying identity to prevent payment fraud and unauthorized transactions.</li>
                    <li>Complying with aviation security regulations, immigration requirements, and applicable laws.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-2">3. Sharing Information with Travel Partners</h3>
                  <p className="mb-2">
                    FlyFello never sells, rents, or trades your personal data to third parties for marketing purposes. However, to fulfill your travel reservations, we must share necessary traveler details with:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>
                      <strong>Airlines, Global Distribution Systems (GDS), and Authorized Ticketing Suppliers:</strong> To reserve seats, issue e-tickets, and process modifications or refunds.
                    </li>
                    <li>
                      <strong>Payment Processors &amp; Banks:</strong> To securely authorize and settle transactions.
                    </li>
                    <li>
                      <strong>Regulatory &amp; Aviation Authorities:</strong> When required by law, customs, border control, or national security mandates (such as Advance Passenger Information Systems).
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-2">4. Data Security &amp; Retention</h3>
                  <p>
                    We implement industry-standard administrative and technical safeguards to protect your personal information against unauthorized access, loss, or misuse. We retain your booking records only for as long as necessary to complete your travel, provide post-booking support, and fulfill legal, accounting, or tax obligations.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-2">5. Cookies and Tracking Technologies</h3>
                  <p>
                    Our website uses essential and analytical cookies to enhance user experience, remember search preferences, and monitor site traffic. You may adjust your browser settings to refuse cookies, though some website features may function with limited capability.
                  </p>
                </div>

                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-2">6. Your Privacy Rights</h3>
                  <p>
                    Depending on your jurisdiction, you may have the right to request access to, correction of, or deletion of your personal data held by FlyFello (subject to legal and airline record-keeping requirements). To submit a privacy request, please contact us at{' '}
                    <a href="mailto:flyfello@hotmail.com" className="text-[#F58220] underline">
                      flyfello@hotmail.com
                    </a>.
                  </p>
                </div>
              </div>
            </div>
          )}

          {page === 'help' && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#F58220] uppercase tracking-wider mb-2">
                <HelpCircle className="w-4 h-4" />
                <span>24/7 Passenger Support</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#122754] tracking-tight mb-4">
                Help Centre
              </h2>
              <p className="text-slate-600 mb-6">
                Quick answers to common questions regarding bookings, seat selection, meals, wheelchair assistance, and last-minute itinerary updates.
              </p>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="font-bold text-[#122754] mb-1">How do I verify my ticket with the airline?</div>
                  <p className="text-slate-600">
                    Every issued ticket comes with an official 6-character airline PNR and 13-digit e-ticket number that you can verify directly on the operating airline’s website or mobile app under "Manage Booking."
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="font-bold text-[#122754] mb-1">Can FlyFello add wheelchair assistance or vegetarian meals?</div>
                  <p className="text-slate-600">
                    Yes. Simply mention senior mobility requests, bassinet seats, or special meal preferences (AVML/VGML/Jain) when confirming your booking and our desk adds them free of charge.
                  </p>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="font-bold text-[#122754] mb-1">Need immediate human assistance?</div>
                  <p className="text-slate-600">
                    Message our live ticketing desk on WhatsApp or call +91 87083 49822 (India) / +1 (604) 832-6304 (Canada) anytime 24/7.
                  </p>
                </div>
              </div>
            </div>
          )}

          {page === 'protocols' && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#F58220] uppercase tracking-wider mb-2">
                <Plane className="w-4 h-4" />
                <span>Ticketing Standards</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#122754] tracking-tight mb-4">
                Flight Booking Protocols
              </h2>
              <div className="space-y-5 text-xs sm:text-sm">
                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-1.5">Step 1: Route &amp; Fare Matching</h3>
                  <p className="text-slate-600">
                    Submit your departure city, destination, travel dates, and baggage tier. Our agents check live GDS consolidator contracts across major carriers to find the lowest total fare with full baggage included.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-1.5">Step 2: Passport &amp; Itinerary Verification</h3>
                  <p className="text-slate-600">
                    Before issuing the ticket, we send a full draft itinerary showing layover durations, terminal connections, transit visa considerations, and exact passenger spelling for your approval.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-1.5">Step 3: Instant PNR &amp; E-Ticket Issuance</h3>
                  <p className="text-slate-600">
                    Once payment clears, your official airline e-ticket PDF and verifiable PNR booking reference are delivered immediately via WhatsApp and email.
                  </p>
                </div>
              </div>
            </div>
          )}

          {page === 'cancellation' && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#F58220] uppercase tracking-wider mb-2">
                <Ban className="w-4 h-4" />
                <span>Changes &amp; Cancellations</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#122754] tracking-tight mb-2">
                Cancellation &amp; Refund Policy – FlyFello
              </h2>
              <div className="text-xs text-slate-400 mb-6">Last Updated: November 2026</div>

              <div className="space-y-6 text-xs sm:text-sm text-slate-600">
                <p>
                  At FlyFello, we strive to keep our cancellation, modification, and refund procedures transparent and straightforward. Because FlyFello acts as an independent travel agency booking airfare through airlines, Global Distribution Systems (GDS), and authorized ticketing suppliers, all cancellations and refunds are governed by the Fare Rules of the specific ticket purchased, alongside the terms outlined below.
                </p>

                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-2">1. General Cancellation Rules</h3>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>
                      <strong>Fare Rule Dependency:</strong> Every airline ticket carries specific fare rules (e.g., Basic Economy, Standard Economy, Flex, Business). Many discounted and promotional fares are strictly non-refundable once issued.
                    </li>
                    <li>
                      <strong>How to Request a Cancellation:</strong> All cancellation or date-change requests must be submitted in writing via email or WhatsApp to FlyFello Support at least 24 to 48 hours prior to the scheduled departure (or earlier, depending on the airline's cut-off window). Verbal requests are not considered final until confirmed in writing by our team.
                    </li>
                    <li>
                      <strong>Last-Minute Cancellations:</strong> Cancellations requested within 3 to 4 hours of scheduled flight departure are generally treated as a No-Show by airlines, resulting in complete forfeiture of the ticket value.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-2">2. 24-Hour Risk-Free Cancellation Window (Where Applicable)</h3>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>
                      Certain airlines and jurisdictions (such as flights originating from or arriving in the United States, or qualifying bookings under specific aviation regulations) allow a 24-hour grace period from the time of ticketing for full-fare refunds, provided the booking was made at least 7 days prior to departure.
                    </li>
                    <li>
                      Please note that consolidator/special negotiated fares and certain international carriers may be exempt from 24-hour void windows. Even when an airline waives its penalty within 24 hours, FlyFello’s administrative/service fee (if applicable) remains non-refundable.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-2">3. Cancellation &amp; Date Change Fees</h3>
                  <p className="mb-2">When a ticket is eligible for cancellation or modification, the total deduction includes:</p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>
                      <strong>Airline / Supplier Penalty:</strong> The cancellation or reissue fee charged directly by the issuing airline and ticketing supplier.
                    </li>
                    <li>
                      <strong>Fare Difference (For Date/Route Changes):</strong> Any difference in ticket price and taxes between your original flight and the new selected flight.
                    </li>
                    <li>
                      <strong>FlyFello Administrative Fee:</strong> A transparent agency processing fee per passenger, per ticket, to cover manual re-issuance, supplier coordination, and refund processing. (All applicable fees will be shared with you for approval before we process any change or cancellation).
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-2">4. No-Show Policy</h3>
                  <p className="mb-2">If a passenger fails to check in or board their flight without canceling the reservation prior to the airline’s cut-off time:</p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>
                      The ticket is marked as a No-Show, and no refund will be issued (except for refundable government airport taxes, where permitted by the airline).
                    </li>
                    <li>
                      For round-trip or multi-city itineraries, missing the outbound flight automatically cancels all subsequent connecting and return segments without refund.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-2">5. Airline-Initiated Cancellations &amp; Major Schedule Changes</h3>
                  <p className="mb-2">If an airline cancels your flight or makes a significant involuntary schedule change:</p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>
                      You may be eligible for a full refund of the unused ticket portion, a free date rebooking, or an airline travel credit/voucher, strictly in accordance with the operating airline’s policy.
                    </li>
                    <li>
                      FlyFello will assist in submitting your involuntary refund or rebooking request to our ticketing suppliers, though final approval and processing rest solely with the operating airline.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-2">6. Refund Processing &amp; Timelines</h3>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>
                      <strong>Supplier Settlement First:</strong> FlyFello processes refunds to customers only after the corresponding funds have been approved, settled, and returned to us by the airline or third-party ticketing partner.
                    </li>
                    <li>
                      <strong>Processing Timeline:</strong> Once approved by the airline, refunds typically take 15 to 45 business days to reflect in your account, depending on airline clearing cycles and your bank’s processing speed.
                    </li>
                    <li>
                      <strong>Payment Method:</strong> All approved refunds are credited back strictly to the original method of payment used at the time of booking. Cash or third-party account transfers are not permitted.
                    </li>
                    <li>
                      <strong>Non-Refundable Items:</strong> Agency service fees, convenience charges, seat selection fees, and travel insurance premiums are non-refundable once a booking has been confirmed and ticketed.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {page === 'refund' && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#F58220] uppercase tracking-wider mb-2">
                <RefreshCw className="w-4 h-4" />
                <span>Fair Fare Guarantees</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#122754] tracking-tight mb-2">
                Refund Policy – FlyFello
              </h2>
              <div className="text-xs text-slate-400 mb-6">Last Updated: November 2026</div>

              <div className="space-y-6 text-xs sm:text-sm text-slate-600">
                <p>
                  At FlyFello, we are committed to maintaining a clear, transparent, and fair refund process. Because FlyFello operates as an independent travel agency booking airfare through airlines, Global Distribution Systems (GDS), and authorized ticketing suppliers, all refund eligibility and amounts are strictly governed by the Fare Rules of the issuing airline and supplier.
                </p>

                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-2">1. Refund Eligibility</h3>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>
                      <strong>Refundable vs. Non-Refundable Tickets:</strong> Refund eligibility depends entirely on the fare class purchased at the time of booking. Many discounted, promotional, and basic economy fares are strictly non-refundable once issued.
                    </li>
                    <li>
                      <strong>Partially Used Tickets:</strong> If you cancel a return or multi-city ticket after completing the outbound journey, the refund value (if permitted by the airline) is calculated by recalculating the flown segment at the applicable one-way fare, minus airline penalties and administrative fees. Often, partially used promotional fares hold zero residual refund value.
                    </li>
                    <li>
                      <strong>No-Show Tickets:</strong> Failure to cancel a reservation prior to the airline's cut-off window ("No-Show") forfeits the ticket value. For No-Show tickets, only unused government-imposed airport taxes may be refundable, subject to airline policy and administrative fees.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-2">2. Deductions and Non-Refundable Fees</h3>
                  <p className="mb-2">
                    When a ticket qualifies for a refund, the final refunded amount is calculated as:
                    <br />
                    <strong className="text-[#122754]">
                      Total Paid Amount minus (Airline Cancellation Penalty + Supplier Fees + FlyFello Administrative Fee).
                    </strong>
                  </p>
                  <p className="mb-1.5">The following charges are strictly non-refundable once a ticket has been confirmed and issued:</p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>FlyFello agency service, consultation, or convenience fees.</li>
                    <li>Seat selection fees, extra baggage charges, meal pre-orders, and priority boarding add-ons.</li>
                    <li>Travel insurance premiums (unless canceled within the insurer’s free-look window prior to departure).</li>
                    <li>Payment gateway or currency conversion fees charged by your bank or card issuer.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-2">3. Airline-Initiated Cancellations &amp; Involuntary Refunds</h3>
                  <p className="mb-2">
                    If an airline cancels your flight, suspends a route, or enacts a major involuntary schedule change that prevents you from traveling:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>
                      You may be entitled to a full refund of the unused airfare (or an airline travel credit/voucher), subject to the operating airline’s official disruption policy.
                    </li>
                    <li>
                      FlyFello will file the involuntary refund claim with our ticketing suppliers on your behalf; however, final approval and disbursement remain under the sole authority of the operating airline.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-2">4. Supplier Settlement &amp; Processing Timelines</h3>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>
                      <strong>Upstream Settlement Requirement:</strong> As an intermediary booking through authorized ticketing partners, FlyFello releases customer refunds only after the corresponding refund amount has been officially approved, processed, and settled back to FlyFello by the airline or ticketing supplier.
                    </li>
                    <li>
                      <strong>Estimated Timeline:</strong> Once approved by the airline, refunds typically take 15 to 45 business days to reflect in your account. Complex international itineraries or multi-airline bookings may occasionally require additional clearing time from the carrier.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-2">5. Mode of Refund</h3>
                  <ul className="list-disc pl-5 space-y-1.5">
                    <li>
                      <strong>Original Payment Method Only:</strong> To comply with financial regulations and anti-fraud standards, all approved refunds are credited back exclusively to the original payment method (credit card, debit card, or bank account) used to make the purchase.
                    </li>
                    <li>
                      Refunds cannot be issued in cash, gift cards, or transferred to a third-party bank account.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {page === 'baggage' && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#F58220] uppercase tracking-wider mb-2">
                <Luggage className="w-4 h-4" />
                <span>Checked &amp; Cabin Allowances</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#122754] tracking-tight mb-4">
                Baggage Information
              </h2>
              <div className="space-y-5 text-xs sm:text-sm">
                <div className="p-4 bg-orange-50/70 border border-orange-100 rounded-2xl">
                  <h3 className="font-bold text-[#122754] text-base mb-1">Standard International Economy (2x 23kg)</h3>
                  <p className="text-slate-600">
                    Unlike stripped-down basic economy fares online, FlyFello prioritizes full-allowance consolidated tickets typically including 2 checked bags (up to 23kg / 50lbs each) plus 1 cabin carry-on (7kg–10kg) and 1 personal item on Canada/USA–India routes.
                  </p>
                </div>
                <div className="p-4 bg-blue-50/70 border border-blue-100 rounded-2xl">
                  <h3 className="font-bold text-[#122754] text-base mb-1">Extra Baggage Option (3x 23kg)</h3>
                  <p className="text-slate-600">
                    Need extra luggage for family travel or relocation? Select "Economy with Extra Baggage (3x 23kg)" in the search panel so our agents quote special student or multi-piece consolidator allowances.
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-[#122754] text-base mb-1.5">Dimensions &amp; Excess Weight</h3>
                  <p className="text-slate-600">
                    Standard checked suitcase linear dimensions (L + W + H) must not exceed 158 cm (62 inches). Always verify exact operating carrier allowances printed on your final e-ticket prior to packing.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            24/7 Support:{' '}
            <a href="tel:+918708349822" className="text-[#122754] font-bold hover:underline">
              +91 87083 49822 (India)
            </a>
            <span className="mx-1.5 text-slate-300">|</span>
            <a href="tel:+16048326304" className="text-[#122754] font-bold hover:underline">
              +1 (604) 832-6304 (Canada)
            </a>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#122754] hover:bg-[#F58220] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
