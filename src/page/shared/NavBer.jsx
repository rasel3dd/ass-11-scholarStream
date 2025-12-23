import React from 'react';
import { Link, NavLink } from 'react-router';
import logo from '../../assets/image/scholar.jpg'
import userImg from '../../assets/image/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg'
const NavBer = () => {
    return (
        <div className='w-full bg-white shadow-md'>
      <div className='max-w-7xl mx-auto px-4 py-3 flex justify-between items-center'>
 
        <div className='flex items-center gap-6'>
          <Link  className='text-2xl font-bold text-green-600'>
            <div className='flex justify-center items-center gap-2'>
                <img className='w-10 h-10' src={logo} alt="" />
                <h1>Scholar<span className='text-blue-600'>Stream</span></h1>
            </div>
          </Link>

          <NavLink
            
            className={({ isActive }) =>
              isActive ? 'text-green-600 font-semibold' : 'text-gray-600'
            }
          >
            Home
          </NavLink>

          <NavLink
            
            className={({ isActive }) =>
              isActive ? 'text-green-600 font-semibold' : 'text-gray-600'
            }
          >
            All Scholarships
          </NavLink>
        </div>

        <div className='flex items-center gap-4'>

              <Link to='/login'
               
                className='px-4 py-2 rounded-lg border border-green-600 text-green-600 hover:bg-green-50'
              >
                Login
              </Link>

              <Link to='/register'
              
                className='px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700'
              >
                Register
              </Link>

          
            <div className='relative group'>
              <img
                src={ userImg}
                alt='User'
                className='w-10 h-10 rounded-full cursor-pointer border'
              />

              <div className='absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition'>
                <Link
                 
                  className='block px-4 py-2 hover:bg-gray-100'
                >
                  Dashboard
                </Link>

                <button
                  
                  className='w-full text-left px-4 py-2 hover:bg-gray-100'
                >
                  Logout
                </button>
              </div>
            </div>
          

        </div>
      </div>
    </div>
    );
};

export default NavBer;