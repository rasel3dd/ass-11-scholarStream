import React from 'react';

const testimonials = [
  {
    name: 'Ayesha Rahman',
    country: 'Bangladesh → Germany',
    quote:
      'ScholarStream helped me find a fully funded Masters scholarship. The filters saved me weeks of research!',
    avatar: '🎓',
  },
  {
    name: 'Mahmud Hasan',
    country: 'Bangladesh → Canada',
    quote:
      'I applied to 3 scholarships through ScholarStream and got accepted into one within 2 months.',
    avatar: '🌍',
  },
  {
    name: 'Nusrat Jahan',
    country: 'Bangladesh → UK',
    quote:
      'The platform is very easy to use. I loved the verified scholarship listings.',
    avatar: '✨',
  },
];

const SuccessStories = () => {
  return (
    <section className='bg-slate-50 py-20'>
      <div className='max-w-7xl mx-auto px-6'>

        {/* Section Header */}
        <div className='text-center mb-14'>
          <h2 className='text-3xl md:text-4xl font-extrabold text-slate-800'>
            Success Stories
          </h2>
          <p className='mt-3 text-slate-600 max-w-2xl mx-auto'>
            Hear from students who achieved their study abroad dreams with ScholarStream.
          </p>
        </div>

        {/* Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          {testimonials.map((item, index) => (
            <div
              key={index}
              className='bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition'
            >
              <div className='flex items-center gap-4 mb-4'>
                <div className='w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-2xl'>
                  {item.avatar}
                </div>
                <div>
                  <h4 className='font-semibold text-slate-800'>
                    {item.name}
                  </h4>
                  <p className='text-sm text-slate-500'>
                    {item.country}
                  </p>
                </div>
              </div>

              <p className='text-slate-600 text-sm leading-relaxed'>
                “{item.quote}”
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
