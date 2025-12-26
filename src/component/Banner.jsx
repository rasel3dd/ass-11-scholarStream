import React from 'react';
import { motion } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';

const Banner = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <div className='relative w-full h-[550px] md:h-[650px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50'>
      
      <motion.div 
        animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className='absolute -top-24 -left-24 w-64 h-64 bg-green-100 rounded-full blur-3xl opacity-50'
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], y: [0, -50, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className='absolute -bottom-24 -right-24 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-50'
      />

      <motion.div 
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        className='max-w-7xl mx-auto px-4 text-center relative z-10'
      >
        
        <motion.div variants={itemVariants} className='inline-block px-4 py-1.5 mb-6 text-sm font-semibold tracking-wide text-green-700 uppercase bg-green-100 rounded-full'>
          Empowering Future Leaders
        </motion.div>

        <motion.h1 variants={itemVariants} className='text-4xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-6'>
          Unlock Your Future with <br />
          <motion.span 
            className='text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600'
            animate={{ backgroundPosition: ['0%', '100%', '0%'] }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{ backgroundSize: '200%' }}
          >
            ScholarStream
          </motion.span>
        </motion.h1>

        <motion.p variants={itemVariants} className='text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10'>
          Find and apply for top-rated scholarships worldwide. We bridge the gap between your dreams and global opportunities.
        </motion.p>

        <motion.div variants={itemVariants} className='flex flex-col sm:flex-row items-center justify-center gap-4'>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='group flex items-center gap-2 px-8 py-4 bg-green-600 text-white font-bold rounded-2xl hover:bg-green-700 shadow-lg transition-all duration-300'
          >
            <FaSearch /> Explore Scholarships
          </motion.button>
          
          <motion.button 
            whileHover={{ backgroundColor: '#f0fdf4', borderColor: '#16a34a', color: '#16a34a' }}
            className='px-8 py-4 border-2 border-gray-200 text-gray-700 font-bold rounded-2xl transition-all duration-300'
          >
            How it Works
          </motion.button>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className='mt-16 grid grid-cols-3 gap-8 border-t border-gray-100 pt-10 max-w-lg mx-auto'
        >
          {['500+', '$2M+', '10k+'].map((stat, index) => (
            <div key={index}>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 + (index * 0.2) }}
                className='text-2xl font-bold text-gray-800'
              >
                {stat}
              </motion.p>
              <p className='text-xs text-gray-500 uppercase tracking-widest font-bold'>
                {index === 0 ? 'Programs' : index === 1 ? 'Funded' : 'Students'}
              </p>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Banner;