import React from 'react';

const ContactUs = () => {
  return (
    <section className='bg-slate-50 py-20'>
      <div className='max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12'>

        {/* Left Info */}
        <div>
          <h2 className='text-3xl md:text-4xl font-extrabold text-slate-800'>
            Contact Us
          </h2>
          <p className='mt-4 text-slate-600 max-w-md'>
            Have questions or need guidance? Our team is always here to help you.
          </p>

          <div className='mt-6 space-y-3 text-slate-700'>
            <p>📧 Email: support@scholarstream.com</p>
            <p>🌍 Location: Dhaka, Bangladesh</p>
            <p>⏰ Support: 24/7 Online</p>
          </div>
        </div>

        {/* Right Form */}
        <form
          onSubmit={(e) => e.preventDefault()}
          className='bg-white p-6 rounded-2xl shadow-lg'
        >
          <div className='space-y-4'>
            <input
              type='text'
              placeholder='Your Name'
              className='w-full border border-slate-200 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500'
            />

            <input
              type='email'
              placeholder='Your Email'
              className='w-full border border-slate-200 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500'
            />

            <textarea
              rows='4'
              placeholder='Your Message'
              className='w-full border border-slate-200 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500'
            />

            <button
              type='submit'
              className='w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition'
            >
              Send Message
            </button>
          </div>
        </form>

      </div>
    </section>
  );
};

export default ContactUs;
