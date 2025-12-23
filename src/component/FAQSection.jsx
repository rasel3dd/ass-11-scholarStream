import React, { useState } from 'react';

const faqs = [
  {
    q: 'Is ScholarStream free to use?',
    a: 'Yes, ScholarStream is completely free for students to explore and apply for scholarships.',
  },
  {
    q: 'Are the scholarships verified?',
    a: 'Yes, all scholarships are manually reviewed and verified before being published.',
  },
  {
    q: 'Can I apply directly from ScholarStream?',
    a: 'We guide you to the official application links to ensure safe and authentic applications.',
  },
  {
    q: 'Do you support fully funded scholarships?',
    a: 'Yes, we list fully funded, partial, and tuition-free scholarship opportunities.',
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className='bg-white py-20'>
      <div className='max-w-4xl mx-auto px-6'>

        <div className='text-center mb-12'>
          <h2 className='text-3xl md:text-4xl font-extrabold text-slate-800'>
            Frequently Asked Questions
          </h2>
          <p className='mt-3 text-slate-600'>
            Find answers to common questions about ScholarStream.
          </p>
        </div>

        <div className='space-y-4'>
          {faqs.map((item, index) => (
            <div
              key={index}
              className='border border-slate-200 rounded-xl overflow-hidden'
            >
              <button
                onClick={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
                className='w-full flex justify-between items-center p-5 text-left'
              >
                <span className='font-semibold text-slate-800'>
                  {item.q}
                </span>
                <span className='text-xl'>
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>

              {openIndex === index && (
                <div className='px-5 pb-5 text-slate-600 text-sm'>
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
