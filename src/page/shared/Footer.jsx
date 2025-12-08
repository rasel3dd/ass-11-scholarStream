import React from 'react';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <footer className='bg-gray-900 text-gray-300 py-10 mt-16'>
      <div className='max-w-7xl mx-auto px-6'>
        
        <div className='flex flex-col md:flex-row justify-between items-center md:items-start gap-10'>
          
          <div className='text-center md:text-left'>
            <h2 className='text-3xl font-bold text-white'>🎓 ScholarStream</h2>
            <p className='mt-2 text-gray-400'>
              Empowering students with scholarships and opportunities.
            </p>
          </div>

          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center md:text-left'>
            <div>
              <h3 className='font-semibold text-white mb-3'>Pages</h3>
              <ul className='space-y-2'>
                <li><Link to='/' className='hover:text-white'>Home</Link></li>
                <li><Link to='/scholarships' className='hover:text-white'>Scholarships</Link></li>
                <li><Link to='/about' className='hover:text-white'>About</Link></li>
              </ul>
            </div>

            <div>
              <h3 className='font-semibold text-white mb-3'>Support</h3>
              <ul className='space-y-2'>
                <li><Link to='/contact' className='hover:text-white'>Contact</Link></li>
                <li><Link to='/faq' className='hover:text-white'>FAQ</Link></li>
              </ul>
            </div>

            <div>
              <h3 className='font-semibold text-white mb-3'>Legal</h3>
              <ul className='space-y-2'>
                <li><Link to='/privacy' className='hover:text-white'>Privacy Policy</Link></li>
                <li><Link to='/terms' className='hover:text-white'>Terms of Service</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className='border-t border-gray-700 my-8'></div>

        <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
          
          <p className='text-gray-400 text-sm'>
            © {new Date().getFullYear()} EduAid — All Rights Reserved.
          </p>

          <div className='flex gap-5 text-xl'>
            <a href='https://facebook.com' className='hover:text-white transition'>
              <i className='fa-brands fa-facebook'></i>
            </a>

            <a href='https://twitter.com' className='hover:text-white transition'>
              <i className='fa-brands fa-twitter'></i>
            </a>

            <a href='https://instagram.com' className='hover:text-white transition'>
              <i className='fa-brands fa-instagram'></i>
            </a>

            <a href='https://github.com' className='hover:text-white transition'>
              <i className='fa-brands fa-github'></i>
            </a>
          </div>

        </div>
      </div>
    </footer>
    );
};

export default Footer;