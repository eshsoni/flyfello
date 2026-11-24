import React, { useMemo, useState } from 'react';
import {
  Smartphone,
  Wifi,
  QrCode,
  Check,
  MessageCircle,
  Mail,
  CheckCircle2,
  AlertCircle,
  Globe,
  ShieldCheck,
} from 'lucide-react';
import {
  buildWhatsAppEsimQueryUrl,
  triggerWhatsAppLink,
} from '../utils/whatsapp';

interface EsimPlan {
  id: string;
  name: string;
  dataAllowance: string;
  validity: string;
  priceInr: number;
  priceUsd: number;
  networkNote: string;
}

interface EsimRegion {
  region: string;
  coverageSummary: string;
  networks: string;
  plans: EsimPlan[];
}

const ESIM_REGIONS: EsimRegion[] = [
  {
    region: 'USA',
    coverageSummary: 'Nationwide 5G / 4G LTE across all 50 US states including Hawaii & Alaska.',
    networks: 'AT&T / T-Mobile 5G Roaming',
    plans: [
      { id: 'usa-5gb', name: 'USA Explorer 5GB', dataAllowance: '5 GB High-Speed Data', validity: '15 Days', priceInr: 1150, priceUsd: 14, networkNote: 'Hotspot enabled · Instant QR' },
      { id: 'usa-10gb', name: 'USA Traveler 10GB', dataAllowance: '10 GB High-Speed Data', validity: '30 Days', priceInr: 1790, priceUsd: 22, networkNote: 'Hotspot enabled · Instant QR' },
      { id: 'usa-20gb', name: 'USA Heavy Data 20GB', dataAllowance: '20 GB High-Speed Data', validity: '30 Days', priceInr: 2890, priceUsd: 35, networkNote: 'Hotspot enabled · Instant QR' },
      { id: 'usa-unl', name: 'USA Unlimited 15D', dataAllowance: 'Unlimited Data (FUP)', validity: '15 Days', priceInr: 3450, priceUsd: 42, networkNote: 'Ideal for students & business trips' },
    ],
  },
  {
    region: 'Canada',
    coverageSummary: 'Seamless 5G / LTE across Vancouver, Toronto, Calgary, Montreal & Ottawa.',
    networks: 'Rogers / Bell / Telus 5G',
    plans: [
      { id: 'ca-5gb', name: 'Canada Starter 5GB', dataAllowance: '5 GB High-Speed Data', validity: '15 Days', priceInr: 1390, priceUsd: 17, networkNote: 'Hotspot enabled · Instant QR' },
      { id: 'ca-10gb', name: 'Canada Extended 10GB', dataAllowance: '10 GB High-Speed Data', validity: '30 Days', priceInr: 2290, priceUsd: 28, networkNote: 'Hotspot enabled · Instant QR' },
      { id: 'ca-20gb', name: 'Canada Max 20GB', dataAllowance: '20 GB High-Speed Data', validity: '30 Days', priceInr: 3490, priceUsd: 42, networkNote: 'Hotspot enabled · Instant QR' },
    ],
  },
  {
    region: 'Dubai / UAE',
    coverageSummary: 'Fast UAE 5G data ready immediately when your plane lands at DXB or AUH.',
    networks: 'Etisalat / du 5G',
    plans: [
      { id: 'uae-5gb', name: 'Dubai 5GB Stopover', dataAllowance: '5 GB High-Speed Data', validity: '15 Days', priceInr: 990, priceUsd: 12, networkNote: 'Works across Dubai & Abu Dhabi' },
      { id: 'uae-10gb', name: 'Dubai 10GB Holiday', dataAllowance: '10 GB High-Speed Data', validity: '30 Days', priceInr: 1650, priceUsd: 20, networkNote: 'Hotspot sharing enabled' },
      { id: 'uae-20gb', name: 'Dubai 20GB Pro', dataAllowance: '20 GB High-Speed Data', validity: '30 Days', priceInr: 2650, priceUsd: 32, networkNote: 'Hotspot sharing enabled' },
    ],
  },
  {
    region: 'Thailand',
    coverageSummary: 'Reliable data from Bangkok to Phuket, Krabi, Koh Samui & Chiang Mai.',
    networks: 'AIS / TrueMove 5G',
    plans: [
      { id: 'th-10gb', name: 'Thailand 10GB Saver', dataAllowance: '10 GB High-Speed Data', validity: '15 Days', priceInr: 790, priceUsd: 10, networkNote: 'Island & ferry coverage' },
      { id: 'th-unl-10', name: 'Thailand Unlimited 10D', dataAllowance: 'Unlimited 5G Data', validity: '10 Days', priceInr: 990, priceUsd: 12, networkNote: 'Best for Phuket & Bangkok' },
      { id: 'th-30gb', name: 'Thailand 30GB Month', dataAllowance: '30 GB High-Speed Data', validity: '30 Days', priceInr: 1390, priceUsd: 17, networkNote: 'Hotspot enabled' },
    ],
  },
  {
    region: 'Bali / Indonesia',
    coverageSummary: 'Strong 4G/5G reception across Ubud, Seminyak, Canggu, Uluwatu & Nusa Penida.',
    networks: 'Telkomsel 4G/5G',
    plans: [
      { id: 'id-5gb', name: 'Bali 5GB Week', dataAllowance: '5 GB High-Speed Data', validity: '15 Days', priceInr: 750, priceUsd: 9, networkNote: 'Telkomsel priority network' },
      { id: 'id-10gb', name: 'Bali 10GB Explorer', dataAllowance: '10 GB High-Speed Data', validity: '30 Days', priceInr: 1250, priceUsd: 15, networkNote: 'Hotspot enabled' },
      { id: 'id-20gb', name: 'Bali 20GB Villa Stay', dataAllowance: '20 GB High-Speed Data', validity: '30 Days', priceInr: 1990, priceUsd: 24, networkNote: 'Remote work ready' },
    ],
  },
  {
    region: 'Singapore & Malaysia',
    coverageSummary: 'Dual-country coverage for Singapore, Changi layovers, Kuala Lumpur & Genting.',
    networks: 'Singtel / StarHub / Maxis 5G',
    plans: [
      { id: 'sg-5gb', name: 'SG + MY 5GB', dataAllowance: '5 GB High-Speed Data', validity: '15 Days', priceInr: 790, priceUsd: 10, networkNote: 'Auto-switches across border' },
      { id: 'sg-10gb', name: 'SG + MY 10GB', dataAllowance: '10 GB High-Speed Data', validity: '30 Days', priceInr: 1290, priceUsd: 16, networkNote: 'Hotspot enabled' },
      { id: 'sg-20gb', name: 'SG + MY 20GB', dataAllowance: '20 GB High-Speed Data', validity: '30 Days', priceInr: 1990, priceUsd: 24, networkNote: 'Hotspot enabled' },
    ],
  },
  {
    region: 'Europe (30+ Countries) & UK',
    coverageSummary: 'One single eSIM covering UK, France, Italy, Switzerland, Germany, Spain & 25+ EU nations.',
    networks: 'Vodafone / Orange / Three 5G',
    plans: [
      { id: 'eu-10gb', name: 'Europe + UK 10GB', dataAllowance: '10 GB High-Speed Data', validity: '30 Days', priceInr: 1690, priceUsd: 20, networkNote: 'Zero roaming border drops' },
      { id: 'eu-20gb', name: 'Europe + UK 20GB', dataAllowance: '20 GB High-Speed Data', validity: '30 Days', priceInr: 2590, priceUsd: 31, networkNote: 'Hotspot enabled' },
      { id: 'eu-unl', name: 'Europe Unlimited 15D', dataAllowance: 'Unlimited Data (FUP)', validity: '15 Days', priceInr: 3390, priceUsd: 41, networkNote: 'Full Eurotrip coverage' },
    ],
  },
  {
    region: 'India',
    coverageSummary: 'Pre-activated India travel data for NRIs and international visitors landing in Delhi, Amritsar, or Mumbai.',
    networks: 'Airtel / Jio 4G/5G',
    plans: [
      { id: 'in-10gb', name: 'India Arrival 10GB', dataAllowance: '10 GB High-Speed Data', validity: '30 Days', priceInr: 990, priceUsd: 12, networkNote: 'Keep your US/CA WhatsApp active' },
      { id: 'in-20gb', name: 'India Visit 20GB', dataAllowance: '20 GB High-Speed Data', validity: '30 Days', priceInr: 1590, priceUsd: 19, networkNote: 'Hotspot enabled across India' },
    ],
  },
  {
    region: 'Global (120+ Countries)',
    coverageSummary: 'Multi-continent coverage ideal for North America ↔ Europe/Middle East ↔ India itineraries.',
    networks: 'Tier-1 Global Multi-Carrier',
    plans: [
      { id: 'gl-5gb', name: 'Global 5GB Transit', dataAllowance: '5 GB Global Data', validity: '30 Days', priceInr: 2450, priceUsd: 29, networkNote: 'Works during airport layovers too' },
      { id: 'gl-10gb', name: 'Global 10GB Explorer', dataAllowance: '10 GB Global Data', validity: '30 Days', priceInr: 3990, priceUsd: 48, networkNote: '120+ destinations included' },
    ],
  },
];

interface EsimFormState {
  destination: string;
  selectedPlanId: string;
  quantity: number;
  travelDate: string;
  deviceModel: string;
  fullName: string;
  phone: string;
  email: string;
  notes: string;
}

export const EsimPage: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<EsimRegion>(ESIM_REGIONS[0]);
  const [form, setForm] = useState<EsimFormState>({
    destination: ESIM_REGIONS[0].region,
    selectedPlanId: ESIM_REGIONS[0].plans[1]?.id || ESIM_REGIONS[0].plans[0].id,
    quantity: 1,
    travelDate: '2026-12-15',
    deviceModel: 'iPhone 14 / 15 / 16 (Unlocked)',
    fullName: '',
    phone: '',
    email: '',
    notes: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof EsimFormState, string>>>({});
  const [submittedWaUrl, setSubmittedWaUrl] = useState<string | null>(null);

  const selectedPlan = useMemo(() => {
    return (
      selectedRegion.plans.find((p) => p.id === form.selectedPlanId) ||
      selectedRegion.plans[0]
    );
  }, [selectedRegion, form.selectedPlanId]);

  const handleSelectRegion = (regionObj: EsimRegion) => {
    setSelectedRegion(regionObj);
    setSubmittedWaUrl(null);
    setForm((prev) => ({
      ...prev,
      destination: regionObj.region,
      selectedPlanId: regionObj.plans[0].id,
    }));
  };

  const handleSelectPlanCard = (plan: EsimPlan) => {
    setSubmittedWaUrl(null);
    setForm((prev) => ({ ...prev, selectedPlanId: plan.id }));
  };

  const updateField = <K extends keyof EsimFormState>(field: K, value: EsimFormState[K]) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Partial<Record<keyof EsimFormState, string>> = {};

    if (form.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }
    const phoneDigits = form.phone.replace(/\D/g, '');
    if (phoneDigits.length < 7) {
      nextErrors.phone = 'Please enter a valid WhatsApp / phone number.';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!form.travelDate) {
      nextErrors.travelDate = 'Please select your travel start date.';
    }
    if (!form.deviceModel.trim()) {
      nextErrors.deviceModel = 'Please enter your phone model.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const waUrl = buildWhatsAppEsimQueryUrl({
      destination: selectedRegion.region,
      planName: selectedPlan.name,
      dataAllowance: selectedPlan.dataAllowance,
      validity: selectedPlan.validity,
      travelDate: form.travelDate,
      deviceModel: form.deviceModel.trim(),
      quantity: form.quantity,
      fullName: form.fullName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim(),
      notes: form.notes.trim(),
    });

    setSubmittedWaUrl(waUrl);
    triggerWhatsAppLink(waUrl);
  };

  return (
    <div className="flex-1 bg-slate-50">
      {/* Hero Banner */}
      <section className="bg-[#122754] text-white py-10 sm:py-14 px-4 sm:px-6 lg:px-8 border-b border-[#1d3975]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">
              Instant QR Delivery · Keep Your Home SIM &amp; WhatsApp
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight [text-wrap:balance]">
              International Travel eSIM Plans
            </h1>
            <p className="text-sm sm:text-base text-slate-200 mt-3 leading-relaxed">
              Land connected in USA, Canada, Europe, UK, Dubai, Thailand, Bali, Singapore &amp; India. Zero physical SIM swaps, zero roaming bill shocks — scan your QR code before takeoff.
            </p>
          </div>

          <div className="mt-7 flex items-center gap-2 overflow-x-auto pb-1">
            {ESIM_REGIONS.map((item) => {
              const active = selectedRegion.region === item.region;
              return (
                <button
                  key={item.region}
                  type="button"
                  onClick={() => handleSelectRegion(item)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#F58220] text-white'
                      : 'bg-white/10 text-slate-100 hover:bg-white/20'
                  }`}
                >
                  {item.region}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Split Section: Plans Left + Order Form Right */}
      <section className="py-10 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Plan Cards & Activation Info */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
              <div>
                <div className="text-xs font-semibold text-slate-500 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#F58220]" />
                  <span>{selectedRegion.region}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedRegion.networks}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#122754] mt-2">
                  {selectedRegion.region} eSIM Data Packages
                </h2>
                <p className="text-sm text-slate-600 mt-1.5 leading-relaxed">
                  {selectedRegion.coverageSummary}
                </p>
              </div>

              {/* Selectable Plan Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedRegion.plans.map((plan) => {
                  const isSelected = selectedPlan.id === plan.id;
                  return (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => handleSelectPlanCard(plan)}
                      className={`text-left p-5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                        isSelected
                          ? 'border-[#F58220] bg-orange-50/40 shadow-sm'
                          : 'border-slate-200 bg-slate-50/60 hover:border-slate-300'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-extrabold text-sm text-[#122754]">
                            {plan.name}
                          </span>
                          <Wifi className="w-4 h-4 text-[#F58220] shrink-0" />
                        </div>
                        <div className="text-base font-bold text-slate-900">
                          {plan.dataAllowance}
                        </div>
                        <div className="text-xs text-slate-500">
                          {plan.validity} · {plan.networkNote}
                        </div>
                      </div>
                      <div className="pt-3 border-t border-slate-200/70 flex items-baseline justify-between">
                        <span className="text-lg font-extrabold text-[#122754] tabular-nums">
                          ₹{plan.priceInr.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs font-semibold text-slate-500 tabular-nums">
                          ${plan.priceUsd} USD
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* 3-Step Activation */}
              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-sm font-extrabold text-[#122754] uppercase tracking-wider mb-3">
                  Instant 3-Step eSIM Setup
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs sm:text-sm text-slate-600">
                  <div>
                    <div className="font-extrabold text-[#122754] mb-1 flex items-center gap-1.5">
                      <QrCode className="w-4 h-4 text-[#F58220]" />
                      <span>01. Receive QR Code</span>
                    </div>
                    <p>Delivered to your WhatsApp &amp; email within minutes of confirmation.</p>
                  </div>
                  <div>
                    <div className="font-extrabold text-[#122754] mb-1 flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4 text-[#F58220]" />
                      <span>02. Add Cellular Plan</span>
                    </div>
                    <p>Scan QR in Settings → Mobile/Cellular before leaving home Wi-Fi.</p>
                  </div>
                  <div>
                    <div className="font-extrabold text-[#122754] mb-1 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-[#F58220]" />
                      <span>03. Connect on Landing</span>
                    </div>
                    <p>Enable Data Roaming for the Travel eSIM line upon arrival; keep WhatsApp intact.</p>
                  </div>
                </div>
              </div>

              {/* Device Compatibility */}
              <div className="pt-4 border-t border-slate-100">
                <h3 className="text-sm font-extrabold text-[#122754] uppercase tracking-wider mb-2.5">
                  Compatible Unlocked Devices
                </h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Apple iPhone XR / XS / 11 / 12 / 13 / 14 / 15 / 16 series</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Samsung Galaxy S20 / S21 / S22 / S23 / S24 / S25 &amp; Z Fold/Flip</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Google Pixel 4 / 5 / 6 / 7 / 8 / 9 series</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Verify carrier-unlocked status before travel (dial *#06# to check EID)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Column: eSIM Order & WhatsApp Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 sm:p-7">
              {submittedWaUrl ? (
                <div className="py-6 text-center space-y-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-[#122754]">
                      eSIM Order Ready on WhatsApp
                    </h3>
                    <p className="text-sm text-slate-600 mt-1.5">
                      Thank you, <strong>{form.fullName}</strong>. Your request for{' '}
                      <strong>
                        {form.quantity}x {selectedPlan.name} ({selectedRegion.region})
                      </strong>{' '}
                      is ready to send on WhatsApp for instant QR issuance.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2.5 pt-2">
                    <a
                      href={submittedWaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-sm flex items-center justify-center gap-2"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Open WhatsApp eSIM Desk</span>
                    </a>
                    <a
                      href={`mailto:info@flyfello.in?subject=${encodeURIComponent(
                        `eSIM Order Request - ${selectedPlan.name}`
                      )}&body=${encodeURIComponent(
                        `Region: ${selectedRegion.region}\nPlan: ${selectedPlan.name} (${selectedPlan.dataAllowance} / ${selectedPlan.validity})\nQuantity: ${form.quantity}\nTravel Date: ${form.travelDate}\nPhone Model: ${form.deviceModel}\nName: ${form.fullName}\nPhone: ${form.phone}\nEmail: ${form.email}`
                      )}`}
                      className="w-full py-2.5 px-4 rounded-xl border border-slate-200 text-[#122754] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Or Email info@flyfello.in</span>
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSubmittedWaUrl(null)}
                    className="text-xs font-bold text-[#F58220] hover:underline cursor-pointer"
                  >
                    Order Another eSIM Plan
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <div className="pb-3 border-b border-slate-100 flex items-baseline justify-between gap-4">
                    <div>
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Selected Plan
                      </span>
                      <h2 className="text-lg font-extrabold text-[#122754]">
                        {selectedPlan.name}
                      </h2>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-extrabold text-[#122754] tabular-nums">
                        ₹{(selectedPlan.priceInr * form.quantity).toLocaleString('en-IN')}
                      </div>
                      <div className="text-[11px] text-slate-500 tabular-nums">
                        ${selectedPlan.priceUsd * form.quantity} USD total
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Destination / Region
                      </label>
                      <select
                        value={selectedRegion.region}
                        onChange={(e) => {
                          const found = ESIM_REGIONS.find((r) => r.region === e.target.value);
                          if (found) handleSelectRegion(found);
                        }}
                        className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900"
                      >
                        {ESIM_REGIONS.map((r) => (
                          <option key={r.region} value={r.region}>
                            {r.region}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Data Package
                      </label>
                      <select
                        value={selectedPlan.id}
                        onChange={(e) => updateField('selectedPlanId', e.target.value)}
                        className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900"
                      >
                        {selectedRegion.plans.map((p) => (
                          <option key={p.id} value={p.id}>
                            {p.name} ({p.validity})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Travel Start Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={form.travelDate}
                        onChange={(e) => updateField('travelDate', e.target.value)}
                        className={`w-full h-10 px-3 border rounded-xl text-sm ${
                          errors.travelDate
                            ? 'border-rose-400 bg-rose-50/40'
                            : 'border-slate-200 bg-slate-50'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Quantity (eSIMs)
                      </label>
                      <select
                        value={form.quantity}
                        onChange={(e) => updateField('quantity', Number(e.target.value))}
                        className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900"
                      >
                        {[1, 2, 3, 4, 5, 6].map((n) => (
                          <option key={n} value={n}>
                            {n} eSIM{n > 1 ? 's' : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Phone Model *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. iPhone 15 Pro, Samsung S24, Pixel 8"
                      value={form.deviceModel}
                      onChange={(e) => updateField('deviceModel', e.target.value)}
                      className={`w-full h-10 px-3 border rounded-xl text-sm ${
                        errors.deviceModel
                          ? 'border-rose-400 bg-rose-50/40'
                          : 'border-slate-200 bg-slate-50'
                      }`}
                    />
                    {errors.deviceModel && (
                      <p className="mt-1 text-[11px] text-rose-600">{errors.deviceModel}</p>
                    )}
                  </div>

                  <div className="pt-2 border-t border-slate-100 space-y-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Your full name"
                        value={form.fullName}
                        onChange={(e) => updateField('fullName', e.target.value)}
                        className={`w-full h-10 px-3 border rounded-xl text-sm ${
                          errors.fullName
                            ? 'border-rose-400 bg-rose-50/40'
                            : 'border-slate-200 bg-slate-50'
                        }`}
                      />
                      {errors.fullName && (
                        <p className="mt-1 text-[11px] text-rose-600">{errors.fullName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        WhatsApp Number (for QR Delivery) *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210 / +1 ..."
                        value={form.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        className={`w-full h-10 px-3 border rounded-xl text-sm ${
                          errors.phone
                            ? 'border-rose-400 bg-rose-50/40'
                            : 'border-slate-200 bg-slate-50'
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
                        className={`w-full h-10 px-3 border rounded-xl text-sm ${
                          errors.email
                            ? 'border-rose-400 bg-rose-50/40'
                            : 'border-slate-200 bg-slate-50'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-[11px] text-rose-600">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Additional Notes (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="Multi-country travel, voice minutes inquiry..."
                        value={form.notes}
                        onChange={(e) => updateField('notes', e.target.value)}
                        className="w-full h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                      />
                    </div>
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
                    className="w-full py-3.5 px-5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white font-extrabold text-sm shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Get eSIM QR via WhatsApp</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
