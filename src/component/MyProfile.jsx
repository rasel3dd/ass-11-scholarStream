import React, { useContext } from 'react';
import { AuthContext } from '../auth/AuthProvider';
import { FaUserEdit, FaEnvelope, FaUserTag, FaIdBadge } from 'react-icons/fa';

const MyProfile = () => {
    const { user } = useContext(AuthContext);

    
    const isAdmin = true; 
    const isModerator = false;
    const userRole = isAdmin ? 'Admin' : isModerator ? 'Moderator' : 'Student';

    return (
        <div className='max-w-4xl mx-auto mt-10 p-4'>
            <div className='bg-white rounded-3xl shadow-xl overflow-hidden'>
               
                <div className={`h-32 bg-gradient-to-r ${
                    isAdmin ? 'from-red-500 to-orange-600' : 
                    isModerator ? 'from-blue-500 to-indigo-600' : 
                    'from-green-500 to-blue-600'
                }`}></div>

                <div className='px-8 pb-10'>
                    <div className='relative flex flex-col items-center -mt-16'>
                        <img
                            className='w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover bg-white'
                            src={user?.photoURL || 'https://i.ibb.co/mR4tYpX/user-placeholder.png'}
                            alt='Profile'
                        />
                        
                        <h2 className='mt-4 text-3xl font-bold text-gray-800'>
                            {user?.displayName || 'User Name'}
                        </h2>

                        
                        <span className={`mt-2 px-4 py-1 rounded-full text-sm font-semibold shadow-sm ${
                            isAdmin ? 'bg-red-100 text-red-600' : 
                            isModerator ? 'bg-blue-100 text-blue-600' : 
                            'bg-green-100 text-green-600'
                        }`}>
                            {userRole}
                        </span> 
                    </div>

                    <div className='mt-10 grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className='flex items-center p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm'>
                            <div className='p-3 bg-green-100 text-green-600 rounded-xl mr-4'>
                                <FaEnvelope size={20} />
                            </div>
                            <div>
                                <p className='text-xs text-gray-500 uppercase font-bold'>Email Address</p>
                                <p className='text-gray-700 font-medium'>{user?.email || 'N/A'}</p>
                            </div>
                        </div>

                        <div className='flex items-center p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm'>
                            <div className='p-3 bg-blue-100 text-blue-600 rounded-xl mr-4'>
                                <FaIdBadge size={20} />
                            </div>
                            <div>
                                <p className='text-xs text-gray-500 uppercase font-bold'>User ID</p>
                                <p className='text-gray-700 font-medium truncate'>{user?.uid?.slice(0, 10)}...</p>
                            </div>
                        </div>

                        <div className='flex items-center p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm'>
                            <div className='p-3 bg-purple-100 text-purple-600 rounded-xl mr-4'>
                                <FaUserTag size={20} />
                            </div>
                            <div>
                                <p className='text-xs text-gray-500 uppercase font-bold'>Role</p>
                                <p className='text-gray-700 font-medium'>{userRole}</p>
                            </div>
                        </div>

                        <div className='flex items-center p-4 bg-gray-50 rounded-2xl border border-gray-100 shadow-sm'>
                            <div className='p-3 bg-orange-100 text-orange-600 rounded-xl mr-4'>
                                <FaUserEdit size={20} />
                            </div>
                            <div>
                                <p className='text-xs text-gray-500 uppercase font-bold'>Status</p>
                                <p className='text-green-600 font-medium'>Active</p>
                            </div>
                        </div>
                    </div>

                    <div className='mt-10 flex justify-center'>
                        <button className='flex items-center gap-2 px-8 py-3 bg-green-600 text-white font-bold rounded-xl hover:bg-green-700 hover:shadow-lg transform hover:-translate-y-1 transition-all duration-200'>
                            <FaUserEdit /> Update Profile
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;