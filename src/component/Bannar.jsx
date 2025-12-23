import React, { useEffect, useState } from 'react';

const ScholarSlider = () => {
  const slides = [
    {
      title: '🎓 Global Talent Grant',
      desc: 'Fully funded scholarships for international students.',
    },
    {
      title: '🌍 Study in Germany',
      desc: 'Tuition-free universities with monthly stipends.',
    },
    {
      title: '⚡ Easy Apply',
      desc: 'Low competition & rolling deadlines available.',
    },
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className='bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/10'>
      <h3 className='text-2xl font-bold mb-2'>
        {slides[index].title}
      </h3>

      <p className='text-white/80 text-sm'>
        {slides[index].desc}
      </p>

      <div className='flex gap-2 mt-4'>
        {slides.map((_, i) => (
          <span
            key={i}
            className={`w-2.5 h-2.5 rounded-full ${
              i === index ? 'bg-white' : 'bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

const ScholarStreamHero = ({ onSearch }) => {
  return (
    <section className='bg-gradient-to-br from-indigo-700 to-slate-900 text-white'>
      <div className='max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center'>

        {/* Left */}
        <div>
          <span className='inline-block mb-4 px-4 py-1 rounded-full bg-white/10 text-sm'>
             Discover Scholarships
          </span>

          <h1 className='text-4xl md:text-5xl font-extrabold leading-tight'>
            Find Scholarships <br />
            <span className='text-yellow-300'>Made for You</span>
          </h1>

          <p className='mt-4 text-white/80 max-w-lg'>
            Explore verified scholarships worldwide by country, level, and subject.
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              onSearch?.({
                q: data.get('q'),
                level: data.get('level'),
              });
            }}
            className='mt-6 flex flex-col sm:flex-row gap-3 bg-white/10 p-3 rounded-xl'
          >
            <input
              name='q'
              placeholder='Search by country, subject...'
              className='flex-1 bg-transparent px-4 py-3 outline-none text-white'
            />

            <select
              name='level'
              className='bg-white/10 px-3 py-3 rounded-lg text-white'
            >
              <option value=''>Any Level</option>
              <option value='undergraduate'>Undergraduate</option>
              <option value='masters'>Masters</option>
              <option value='phd'>PhD</option>
            </select>

            <button
              type='submit'
              className='bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold hover:scale-95 transition'
            >
              Search
            </button>
          </form>
        </div>

  
        <ScholarSlider />

      </div>
    </section>
  );
};

export default ScholarStreamHero;
