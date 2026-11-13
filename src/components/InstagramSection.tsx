import React, { useEffect, useState } from 'react';
import {
  Instagram,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  Film,
  Image as ImageIcon,
  Pause,
  Play,
} from 'lucide-react';
import { motion } from 'motion/react';

const INSTAGRAM_USERNAME = 'flyfello';
const INSTAGRAM_URL = `https://www.instagram.com/${INSTAGRAM_USERNAME}/`;

interface OfficialInstagramPost {
  id: string;
  type: 'reel' | 'post';
  url: string;
  embedUrl: string;
  label: string;
}

const OFFICIAL_INSTAGRAM_POSTS: OfficialInstagramPost[] = [
  {
    id: 'DfB4ZXgNPaU',
    type: 'reel',
    url: 'https://www.instagram.com/flyfello/reel/DfB4ZXgNPaU/',
    embedUrl: 'https://www.instagram.com/reel/DfB4ZXgNPaU/embed/captioned/',
    label: 'Featured Reel',
  },
  {
    id: 'DfT6dClGWWI',
    type: 'post',
    url: 'https://www.instagram.com/flyfello/p/DfT6dClGWWI/',
    embedUrl: 'https://www.instagram.com/p/DfT6dClGWWI/embed/captioned/',
    label: 'Latest Post',
  },
  {
    id: 'DfO-7XiN9ay',
    type: 'post',
    url: 'https://www.instagram.com/flyfello/p/DfO-7XiN9ay/',
    embedUrl: 'https://www.instagram.com/p/DfO-7XiN9ay/embed/captioned/',
    label: 'Travel Update',
  },
  {
    id: 'Dfhe_gUN5hB',
    type: 'post',
    url: 'https://www.instagram.com/flyfello/p/Dfhe_gUN5hB/',
    embedUrl: 'https://www.instagram.com/p/Dfhe_gUN5hB/embed/captioned/',
    label: 'Flight Highlight',
  },
  {
    id: 'DfpaG64tgPF',
    type: 'post',
    url: 'https://www.instagram.com/flyfello/p/DfpaG64tgPF/',
    embedUrl: 'https://www.instagram.com/p/DfpaG64tgPF/embed/captioned/',
    label: 'FlyFello Dispatch',
  },
];

function getSlidesPerView(width: number): number {
  if (width >= 1024) return 3;
  if (width >= 640) return 2;
  return 1;
}

export const InstagramSection: React.FC = () => {
  const [slidesPerView, setSlidesPerView] = useState<number>(() =>
    typeof window !== 'undefined' ? getSlidesPerView(window.innerWidth) : 3
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const maxIndex = Math.max(0, OFFICIAL_INSTAGRAM_POSTS.length - slidesPerView);

  useEffect(() => {
    const handleResize = () => {
      const nextCount = getSlidesPerView(window.innerWidth);
      setSlidesPerView(nextCount);
      setCurrentIndex((prev) =>
        Math.min(prev, Math.max(0, OFFICIAL_INSTAGRAM_POSTS.length - nextCount))
      );
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isPaused || maxIndex === 0) return;
    const timer = window.setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4500);
    return () => window.clearInterval(timer);
  }, [isPaused, maxIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const translatePercent = -(currentIndex * (100 / slidesPerView));

  return (
    <section id="instagram-feed" className="py-12 sm:py-16 bg-white border-b border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F58220] uppercase tracking-wider mb-2">
              <Instagram className="w-4 h-4 text-pink-600" />
              <span>Latest From @flyfello</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#122754] tracking-tight">
              Follow <span className="text-[#F58220]">@{INSTAGRAM_USERNAME}</span> on Instagram
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 max-w-2xl">
              Explore our latest reels and posts directly from our official Instagram feed — swipe or slide through real updates from FlyFello.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {/* Carousel Playback & Navigation Controls */}
            <div className="inline-flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Instagram post"
                className="w-9 h-9 rounded-lg bg-white hover:bg-[#122754] text-[#122754] hover:text-white flex items-center justify-center shadow-xs transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsPaused((prev) => !prev)}
                aria-label={isPaused ? 'Resume auto-slide' : 'Pause auto-slide'}
                className="w-9 h-9 rounded-lg bg-white hover:bg-[#F58220] text-[#122754] hover:text-white flex items-center justify-center shadow-xs transition-colors cursor-pointer"
              >
                {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Instagram post"
                className="w-9 h-9 rounded-lg bg-white hover:bg-[#122754] text-[#122754] hover:text-white flex items-center justify-center shadow-xs transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#122754] to-[#1d3b7a] hover:from-[#F58220] hover:to-[#e06e10] text-white text-xs sm:text-sm font-bold shadow-sm transition-all"
            >
              <Instagram className="w-4 h-4" />
              <span>Visit @{INSTAGRAM_USERNAME}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Sliding Instagram Carousel Viewport */}
        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="overflow-hidden -mx-2.5 py-1">
            <motion.div
              className="flex"
              animate={{ x: `${translatePercent}%` }}
              transition={{ type: 'spring', stiffness: 210, damping: 28, mass: 0.9 }}
            >
              {OFFICIAL_INSTAGRAM_POSTS.map((post, idx) => (
                <div
                  key={post.id}
                  className="basis-full sm:basis-1/2 lg:basis-1/3 shrink-0 px-2.5"
                >
                  <div className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md hover:border-[#F58220]/50 transition-all flex flex-col h-full">
                    {/* Card Top Bar */}
                    <div className="px-4 py-3 bg-white border-b border-slate-200 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-600 text-white flex items-center justify-center shrink-0">
                          {post.type === 'reel' ? (
                            <Film className="w-3.5 h-3.5" />
                          ) : (
                            <ImageIcon className="w-3.5 h-3.5" />
                          )}
                        </span>
                        <div className="leading-tight">
                          <span className="block text-xs font-extrabold text-[#122754]">
                            @{INSTAGRAM_USERNAME}
                          </span>
                          <span className="block text-[10px] font-semibold text-slate-500">
                            {post.label} #{idx + 1}
                          </span>
                        </div>
                      </div>

                      <a
                        href={post.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-[#F58220] text-[#122754] hover:text-white text-[11px] font-bold transition-colors shrink-0"
                      >
                        <span>Open</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>

                    {/* Official Instagram Post / Reel Embed */}
                    <div className="bg-white relative w-full h-[500px] overflow-hidden">
                      <iframe
                        src={post.embedUrl}
                        title={`@${INSTAGRAM_USERNAME} ${post.label} (${post.id})`}
                        className="w-full h-full border-0 bg-white"
                        loading="lazy"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Slide Dots & Progress Indicator */}
          <div className="mt-6 flex items-center justify-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, dotIdx) => {
              const isActive = dotIdx === currentIndex;
              return (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setCurrentIndex(dotIdx)}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'w-8 bg-[#F58220]'
                      : 'w-2.5 bg-slate-300 hover:bg-[#122754]/50'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
