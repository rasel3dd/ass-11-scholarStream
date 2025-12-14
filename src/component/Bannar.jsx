import React, { useEffect, useState, useRef } from 'react';

// Simple auto slider component — no external animation libraries
function ScholarSlider({ items } = {}) {
  const defaultItems = items || [
    {
      title: '🌟 Global Talent Grant',
      desc: 'Full funding for STEM Masters — apply before May.',
      badge: 'Full Funding',
    },
    {
      title: '📉 Low Competition',
      desc: 'Higher acceptance scholarships with rolling deadlines.',
      badge: 'Rolling',
    },
    {
      title: '🌍 Country Spotlight: Germany',
      desc: 'Multiple tuition-free programs and travel stipends.',
      badge: 'Hot',
    },
  ];

  const slides = defaultItems;
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);
  const delay = 4000; // 4s per slide

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, delay);
    return () => {
      resetTimeout();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  return (
    <div className="w-full">
      <div className="relative rounded-3xl p-6 bg-white/6 border border-white/8 backdrop-blur-md shadow-xl overflow-hidden">
        <div className="h-44 sm:h-52 flex items-center">
          {slides.map((s, i) => (
            <div
            key={i}
             className={`absolute inset-0 transition-opacity duration-700 ease-out ${i === index ? 'opacity-100 relative' : 'opacity-0 pointer-events-none'}`}
            >
              <div className="h-full flex flex-col justify-center px-6 sm:px-10">
                <div className="flex items-center gap-3">
                  <div className="text-2xl sm:text-3xl font-bold">{s.title}</div>
                  <div className="ml-auto text-xs px-3 py-1 rounded-full bg-white/10 text-white/90">{s.badge}</div>
                </div>

                <p className="text-white/80 mt-2 text-sm sm:text-base">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Controls: dots + prev/next */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                className={`w-2.5 h-2.5 rounded-full ${i === index ? 'bg-white' : 'bg-white/30'} transition-all`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIndex((idx) => (idx - 1 + slides.length) % slides.length)}
              className="px-3 py-2 rounded-md bg-white/8 hover:bg-white/14 transition"
            >
              Prev
            </button>
            <button
              onClick={() => setIndex((idx) => (idx + 1) % slides.length)}
              className="px-3 py-2 rounded-md bg-white/8 hover:bg-white/14 transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ScholarStreamHero({ onSearch } = {}) {
  return (
    <header className="w-full bg-gradient-to-b from-indigo-700 via-indigo-800 to-slate-900 text-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 bg-pink-400/30 blur-3xl rounded-full" />
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-yellow-300/20 blur-3xl rounded-full" />
        <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-indigo-500/20 blur-3xl rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20 lg:py-28 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left Section */}
          <div className="space-y-7">
            <p className="inline-block bg-white/10 px-4 py-1.5 rounded-full text-sm font-medium tracking-wide shadow-sm backdrop-blur-sm">
              🚀 New • Find top scholarships easily
            </p>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-md">
              Discover Scholarships That Match
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-white to-yellow-300 mt-1">
                Your Ambition
              </span>
            </h1>

            <p className="text-white/90 max-w-xl text-lg leading-relaxed">
              ScholarStream helps you explore verified scholarships worldwide — tailored by country, study level, and field of interest.
            </p>

            {/* Search Box */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const data = new FormData(e.currentTarget);
                const q = data.get('q');
                const level = data.get('level');
                if (onSearch) onSearch({ q, level });
              }}
              className="mt-4"
            >
              <div className="flex flex-col sm:flex-row gap-3 bg-white/10 p-3 rounded-2xl backdrop-blur-xl shadow-lg border border-white/10">
                <input
                  name="q"
                  placeholder="Try ‘engineering’, ‘Germany’, ‘full-tuition’…"
                  className="flex-1 bg-transparent placeholder-white/80 text-white px-4 py-3 rounded-lg outline-none"
                />

                <select
                  name="level"
                  className="w-44 bg-white/10 text-white px-3 py-3 rounded-lg backdrop-blur-md border border-white/10"
                >
                  <option value="">Any level</option>
                  <option value="undergraduate">Undergraduate</option>
                  <option value="masters">Masters</option>
                  <option value="phd">PhD</option>
                  <option value="short-course">Short Course</option>
                </select>

                <button
                  type="submit"
                  className="rounded-xl px-6 py-3 bg-yellow-400 text-black font-bold shadow-xl hover:shadow-2xl transition-transform active:scale-95"
                >
                  Search Scholarships
                </button>
              </div>
            </form>

            {/* Stats */}
            <div className="flex items-center gap-8 text-sm text-white/90 mt-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 grid place-items-center text-lg">🎓</div>
                <div>
                  <div className="font-semibold text-lg">12,000+</div>
                  <div className="text-xs text-white/70">Active scholarships</div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 grid place-items-center text-lg">🌍</div>
                <div>
                  <div className="font-semibold text-lg">150+</div>
                  <div className="text-xs text-white/70">Countries covered</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section — Auto Slider */}
          <div className="relative">
            <ScholarSlider />
          </div>
        </div>
      </div>

     
    </header>
  );
}