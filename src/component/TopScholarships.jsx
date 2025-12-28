import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { FaArrowRight, FaCalendarAlt, FaDollarSign, FaGraduationCap } from 'react-icons/fa';
import AxiosSecure from '../hooks/useAxiosSecure';


const TopScholarships = () => {
  const [scholarships, setScholarships] = useState([]);
  const axiosPublic = AxiosSecure();

  useEffect(() => {
    axiosPublic.get('/scholarships')
      .then(res => {
        const sortedData = res.data
          .sort((a, b) => a.applicationFees - b.applicationFees)
          .slice(0, 6);
        setScholarships(sortedData);
      });
  }, [axiosPublic]);

  return (
    <section className='py-20 bg-white'>
      <div className='max-w-7xl mx-auto px-4'>
        
        <div className='flex justify-between items-end mb-12'>
          <div>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className='text-3xl md:text-4xl font-bold text-gray-900'
            >
              Top <span className='text-green-600'>Scholarships</span>
            </motion.h2>
            <p className='text-gray-500 mt-2'>Explore the best opportunities with the lowest fees.</p>
          </div>
          <Link to='/Scholarship' className='text-green-600 font-bold flex items-center gap-2 hover:underline'>
            View All <FaArrowRight />
          </Link>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {scholarships.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className='bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden group'
            >
              <div className='relative h-48 overflow-hidden'>
                <img 
                  src={item.universityLogo} 
                  alt={item.universityName} 
                  className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                />
                <div className='absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-green-600 shadow-sm'>
                  {item.scholarshipCategory}
                </div>
              </div>

              <div className='p-6'>
                <h3 className='text-xl font-bold text-gray-800 mb-2 truncate'>
                  {item.scholarshipName}
                </h3>
                <p className='flex items-center gap-2 text-gray-500 text-sm mb-4'>
                  <FaGraduationCap className='text-green-500' /> {item.universityName}
                </p>

                <div className='grid grid-cols-2 gap-4 mb-6'>
                  <div className='bg-gray-50 p-3 rounded-2xl'>
                    <p className='text-[10px] uppercase font-bold text-gray-400'>App Fee</p>
                    <p className='text-lg font-bold text-gray-700'>${item.applicationFees}</p>
                  </div>
                  <div className='bg-gray-50 p-3 rounded-2xl'>
                    <p className='text-[10px] uppercase font-bold text-gray-400'>Deadline</p>
                    <p className='text-sm font-bold text-gray-700'>{item.applicationDeadline}</p>
                  </div>
                </div>

                <Link 
                  to={`/scholarship-details/${item._id}`}
                  className='block w-full text-center py-3 bg-gray-900 text-white font-bold rounded-xl hover:bg-green-600 transition-colors duration-300'
                >
                  View Details
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopScholarships;