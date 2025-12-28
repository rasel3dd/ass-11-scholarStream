import React, { useContext, useState } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router'; 
import { AuthContext } from '../auth/AuthProvider';
import useRole from '../hooks/useRole';
import { 
  FaHome, FaUserGraduate, FaUserCog, FaFolderOpen, 
  FaSignOutAlt, FaBars, FaTimes, FaChartBar, FaEdit, FaStar, FaFileAlt 
} from 'react-icons/fa';

const Dashboard = () => {
    const { user, logOut } = useContext(AuthContext);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [role, isLoading] = useRole();
    const navigate = useNavigate();

    if (isLoading) {
        return <div className="flex justify-center items-center h-screen text-green-600 font-bold">Loading...</div>;
    }

    const isAdmin = role === 'Admin';
    const isModerator = role === 'Moderator';
    const isStudent = role === 'Student';

    const handleLogOut = () => {
        logOut().then(() => navigate('/'));
    };

    const navClass = ({ isActive }) => 
        `flex items-center gap-3 p-3 rounded-lg transition ${isActive ? 'bg-green-600 text-white' : 'text-gray-600 hover:bg-green-50'}`;

    return (
        <div className='flex min-h-screen bg-gray-100'>
            {/* Mobile Menu Toggle */}
            <button 
                className='lg:hidden fixed top-4 left-4 z-50 p-2 bg-green-600 text-white rounded-md shadow-lg'
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? <FaTimes /> : <FaBars />}
            </button>

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-2xl transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                
                <div className='flex flex-col h-full'>
                    {/* Logo Section */}
                    <div className='p-6 border-b'>
                        <Link to='/' className='text-2xl font-bold text-green-600 flex items-center gap-2'>
                            <span className='bg-green-600 text-white px-2 py-1 rounded'>S</span> Stream
                        </Link>
                        <p className='text-[10px] text-gray-400 mt-1 uppercase tracking-widest font-bold'>{role} Portal</p>
                    </div>

                    {/* Navigation Links */}
                    <nav className='flex-1 px-4 py-6 space-y-1 overflow-y-auto'>
                        <NavLink to='/' className={navClass}><FaHome /> Home</NavLink>
                        
                        <div className='my-4 border-t border-gray-100'></div>

                        {/* Admin Routes */}
                        {isAdmin && (
                            <>
                                <div className='px-3 py-2 text-xs font-bold text-gray-400 uppercase'>Admin Panel</div>
                                <NavLink to='/dashboard/profile' className={navClass}><FaUserGraduate /> My Profile</NavLink>
                                <NavLink to='/dashboard/add-scholarship' className={navClass}><FaFolderOpen /> Add Scholarship</NavLink>
                                <NavLink to='/dashboard/manage-scholarships' className={navClass}><FaEdit /> Manage Scholarships</NavLink>
                                <NavLink to='/dashboard/manage-users' className={navClass}><FaUserCog /> Manage Users</NavLink>
                                <NavLink to='/dashboard/analytics' className={navClass}><FaChartBar /> Analytics</NavLink>
                            </>
                        )}

                        {/* Moderator Routes */}
                        {isModerator && (
                            <>
                                <div className='px-3 py-2 text-xs font-bold text-gray-400 uppercase'>Moderator Panel</div>
                                <NavLink to='/dashboard/profile' className={navClass}><FaUserGraduate /> My Profile</NavLink>
                                <NavLink to='/dashboard/manage-scholarships' className={navClass}><FaEdit /> Manage Scholarships</NavLink>
                                <NavLink to='/dashboard/manage-applications' className={navClass}><FaFileAlt /> Manage Applied</NavLink>
                                <NavLink to='/dashboard/all-reviews' className={navClass}><FaStar /> All Reviews</NavLink>
                            </>
                        )}

                        {/* Student Routes */}
                        {isStudent && (
                            <>
                                <div className='px-3 py-2 text-xs font-bold text-gray-400 uppercase'>Student Panel</div>
                                <NavLink to='/dashboard/profile' className={navClass}><FaUserGraduate /> My Profile</NavLink>
                                <NavLink to='/dashboard/my-applications' className={navClass}><FaFileAlt /> My Applications</NavLink>
                                <NavLink to='/dashboard/my-reviews' className={navClass}><FaStar /> My Reviews</NavLink>
                            </>
                        )}
                    </nav>

                    {/* Sidebar Footer (User Info & Logout) */}
                    <div className='p-4 border-t border-gray-100 bg-gray-50'>
                        <div className='flex items-center gap-3 mb-4'>
                            <img 
                                className='w-10 h-10 rounded-full border-2 border-green-500 object-cover' 
                                src={user?.photoURL || 'https://i.ibb.co/0QckV6p/user.png'} 
                                alt='user' 
                            />
                            <div className='overflow-hidden text-left'>
                                <p className='text-sm font-bold text-gray-800 truncate'>{user?.displayName || 'Guest User'}</p>
                                <span className='text-[9px] bg-green-200 text-green-800 px-2 py-0.5 rounded-full font-bold uppercase'>{role}</span>
                            </div>
                        </div>
                        <button 
                            onClick={handleLogOut}
                            className='flex items-center gap-3 w-full p-3 text-red-500 hover:bg-red-50 rounded-lg transition font-bold text-sm'
                        >
                            <FaSignOutAlt /> Logout
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className='flex-1 flex flex-col h-screen overflow-hidden'>
                {/* Desktop Header */}
                <header className='hidden lg:flex items-center justify-between bg-white px-8 py-4 shadow-sm border-b'>
                    <div className='flex items-center gap-2'>
                         <h2 className='text-xl font-bold text-gray-700 capitalize'>{role} Dashboard</h2>
                    </div>
                    <div className='flex items-center gap-4'>
                        <div className='text-right'>
                            <p className='text-xs text-gray-400'>Welcome back,</p>
                            <p className='text-sm font-bold text-gray-800'>{user?.displayName}</p>
                        </div>
                        <img className='w-10 h-10 rounded-full border shadow-sm' src={user?.photoURL} alt="" />
                    </div>
                </header>

                {/* Dashboard Outlet Content */}
                <div className='p-4 sm:p-8 flex-1 overflow-y-auto'>
                    <div className='max-w-6xl mx-auto'>
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;