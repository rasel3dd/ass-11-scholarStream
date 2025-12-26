import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../../auth/AuthProvider';
import logo from '../../assets/image/scholar.jpg';
import userImg from '../../assets/image/360_F_229758328_7x8jwCwjtBMmC6rgFzLFhZoEpLobB6L8.jpg';

const NavBer = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogout = () => {
    logOut()
      .then(() => {})
      .catch(error => console.log(error));
  };

  const navLinks = (
    <>
      <NavLink
        to='/'
        className={({ isActive }) =>
          `text-sm font-medium transition-colors duration-200 ${
            isActive ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600 hover:text-green-500'
          }`
        }
      >
        Home
      </NavLink>
      <NavLink
        to='/Scholarship'
        className={({ isActive }) =>
          `text-sm font-medium transition-colors duration-200 ${
            isActive ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-600 hover:text-green-500'
          }`
        }
      >
        All Scholarships
      </NavLink>
    </>
  );

  return (
    <div className='w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm border-b border-gray-100'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          
          {/* Logo Section */}
          <div className='flex items-center gap-8'>
            <Link to='/' className='flex items-center gap-2 hover:opacity-90 transition'>
              <img className='w-10 h-10 rounded-lg shadow-sm' src={logo} alt='logo' />
              <h1 className='text-xl md:text-2xl font-extrabold tracking-tight'>
                <span className='text-green-600'>Scholar</span>
                <span className='text-blue-600'>Stream</span>
              </h1>
            </Link>

            {/* Desktop NavLinks */}
            <div className='hidden md:flex items-center gap-6'>
              {navLinks}
            </div>
          </div>

          {/* Right Section: Auth & Profile */}
          <div className='flex items-center gap-4'>
            {!user ? (
              <div className='flex items-center gap-2'>
                <Link
                  to='/login'
                  className='hidden sm:block px-5 py-2 text-sm font-medium text-green-600 hover:bg-green-50 rounded-full transition'
                >
                  Login
                </Link>
                <Link
                  to='/register'
                  className='px-5 py-2 text-sm font-medium bg-green-600 text-white rounded-full hover:bg-green-700 shadow-md hover:shadow-lg transition-all'
                >
                  Register
                </Link>
              </div>
            ) : (
              <div className='relative group'>
                {/* User Profile Trigger */}
                <div className='flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-50 rounded-full transition'>
                  <img
                    src={user?.photoURL || userImg}
                    alt='user'
                    className='w-9 h-9 rounded-full border-2 border-green-500 object-cover shadow-sm'
                  />
                </div>

                {/* Professional Dropdown */}
                <div className='absolute right-0 mt-2 w-56 bg-white shadow-2xl rounded-2xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right group-hover:translate-y-0 translate-y-2'>
                  <div className='px-4 py-3 border-b border-gray-50'>
                    <p className='text-sm text-gray-500'>Signed in as</p>
                    <p className='text-sm font-bold text-gray-800 truncate'>{user?.displayName || 'User'}</p>
                  </div>
                  
                  <div className='py-2'>
                    <Link
                      to='/dashboard'
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition'
                    >
                      User Dashboard
                    </Link>
                    <Link
                      to='/myProfile'
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600 transition'
                    >
                      My Profile
                    </Link>
                  </div>

                  <div className='py-2 border-t border-gray-50'>
                    <button
                      onClick={handleLogout}
                      className='w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 font-semibold transition'
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBer;