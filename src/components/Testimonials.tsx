import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/testimonials';
import { TrustpilotWidget } from './TrustpilotWidget';
import { Star, ShieldCheck, CheckCircle, ThumbsUp, Quote } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Family', 'Student', 'Last Minute', 'Business'];

  const filtered = selectedCategory === 'All'
    ? TESTIMONIALS
    : TESTIMONIALS.filter((t) => t.category === selectedCategory);

  return (
    <section id="testimonials" className="scroll-mt-24 py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Proof Adjacency */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="text-xs font-bold text-[#F58220] uppercase tracking-wider mb-2">
              Verified Passenger Experiences
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#122754] tracking-tight">
              Trusted by 10,000+ Diaspora Travelers Across North America
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 max-w-2xl">
              Real reviews from families, international students, and frequent flyers travelling between Canada/USA and India.
            </p>
          </div>

          {/* Trustpilot Social Proof Trust Score Box */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <TrustpilotWidget />
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#122754] text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-[#F58220] hover:border-[#F58220] border border-slate-200'
              }`}
            >
              {cat === 'All' ? 'All Passenger Reviews' : `${cat} Travel`}
            </button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow relative"
            >
              <div>
                {/* Top: Stars & Category */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <span className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                </div>

                {/* Concrete Quantitative Highlight */}
                <div className="text-xs font-bold text-emerald-800 bg-emerald-50/80 border border-emerald-100 rounded-lg p-2.5 mb-3.5 flex items-start gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{item.highlight}</span>
                </div>

                {/* Review Body */}
                <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed italic mb-6">
                  "{item.content}"
                </p>
              </div>

              {/* Author & Route Metadata */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div className="overflow-hidden">
                  <div className="font-bold text-slate-900 text-xs sm:text-sm truncate">
                    {item.name}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate">
                    {item.location}
                  </div>
                  <div className="text-[10px] text-sky-700 font-semibold mt-0.5 truncate">
                    {item.route} · {item.airline}
                  </div>
                </div>

                <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-bold text-xs shrink-0">
                  {item.name.charAt(0)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
