import React from 'react';

const Loading = () => {
    return (
        <div className='flex items-center justify-center h-screen bg-gray-900'>
      <div className='relative'>
        <div className='w-20 h-20 border-4 border-purple-600 border-t-transparent rounded-full animate-spin'></div>

        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <div className='w-10 h-10 bg-purple-600 rounded-full animate-ping opacity-75'></div>
        </div>

        <p className='text-purple-300 text-xl mt-4 text-center absolute whitespace-nowrap left-1/2 -translate-x-1/2 translate-y-16'>
          Loading Wait...
        </p>
      </div>
    </div>
    );
};

export default Loading;