import React, { useContext, useState } from 'react';
import { NavLink, Outlet, Link } from 'react-router';
import { AuthContext } from '../auth/AuthProvider';
import { 
  FaHome, FaUserGraduate, FaUserCog, FaFolderOpen, 
  FaSignOutAlt, FaBars, FaTimes 
} from 'react-icons/fa';

const Dashboard = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const isAdmin = true; 
    const isModerator = false;

    return (
        <div className='flex min-h-screen bg-gray-100'>
            <button 
                className='lg:hidden fixed top-4 left-4 z-50 p-2 bg-green-600 text-white rounded-md'
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? <FaTimes /> : <FaBars />}
            </button>

            <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-2xl transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                
                <div className='flex flex-col h-full'>
                    <div className='p-6'>
                        <Link to='/' className='text-2xl font-bold text-green-600 flex items-center gap-2'>
                            <span className='bg-green-600 text-white p-1 rounded'>S</span> Stream
                        </Link>
                    </div>

                    <nav className='flex-1 px-4 space-y-2'>
                        <NavLink to='/' className={({isActive}) => `flex items-center gap-3 p-3 rounded-lg transition ${isActive ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-green-50'}`}>
                            <FaHome /> Home
                        </NavLink>

                        {isAdmin && (
                            <>
                                <div className='pt-4 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider'>Admin Menu</div>
                                <NavLink to='/dashboard/manage-users' className={({isActive}) => `flex items-center gap-3 p-3 rounded-lg transition ${isActive ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-green-50'}`}>
                                    <FaUserCog /> Manage Users
                                </NavLink>
                                <NavLink to='/dashboard/add-scholarship' className={({isActive}) => `flex items-center gap-3 p-3 rounded-lg transition ${isActive ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-green-50'}`}>
                                    <FaFolderOpen /> Add Scholarship
                                </NavLink>
                            </>
                        )}

                        {!isAdmin && !isModerator && (
                            <>
                                <div className='pt-4 pb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider'>Student Menu</div>
                                <NavLink to='/dashboard/my-applications' className={({isActive}) => `flex items-center gap-3 p-3 rounded-lg transition ${isActive ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-green-50'}`}>
                                    <FaUserGraduate /> My Applications
                                </NavLink>
                            </>
                        )}
                    </nav>

                    <div className='p-4 border-t border-gray-100'>
                        <div className='flex items-center gap-3 mb-4 p-2'>
                            <img className='w-10 h-10 rounded-full border border-green-500' src={user?.photoURL} alt='user' />
                            <div className='overflow-hidden'>
                                <p className='text-sm font-bold text-gray-800 truncate'>{user?.displayName}</p>
                                <p className='text-xs text-gray-500 truncate'>{user?.email}</p>
                            </div>
                        </div>
                        <button 
                            onClick={logOut}
                            className='flex items-center gap-3 w-full p-3 text-red-500 hover:bg-red-50 rounded-lg transition font-medium'
                        >
                            <FaSignOutAlt /> Logout
                        </button>
                    </div>
                </div>
            </aside>

            <main className='flex-1 flex flex-col min-h-screen overflow-hidden'>
                <header className='hidden lg:flex items-center justify-between bg-white px-8 py-4 shadow-sm'>
                    <h2 className='text-xl font-semibold text-gray-700'>Dashboard Overview</h2>
                    <div className='text-sm text-gray-500'>Welcome back, <span className='text-green-600 font-bold'>{user?.displayName}</span>!</div>
                </header>

                <div className='p-6 sm:p-10 flex-1 overflow-y-auto bg-gray-50'>
                    <div className='max-w-6xl mx-auto'>
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;