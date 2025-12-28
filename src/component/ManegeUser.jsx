import React, { useEffect, useState } from 'react';
import { Trash2, Filter } from 'lucide-react';
import useAxiosSecure from '../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManegeUser = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterRole, setFilterRole] = useState('All');
    const axiosSecure = useAxiosSecure();

    
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await axiosSecure.get('/users'); 
            setUsers(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching users:", error);
            setLoading(false);
        }
    };

    
    const handleRoleChange = async (id, newRole) => {
        try {
            const res = await axiosSecure.patch(`/users/role/${id}`, { role: newRole });
            if (res.data.modifiedCount > 0) {
                Swal.fire("Success!", `User role updated to ${newRole}`, "success");
                
                setUsers(users.map(user => user._id === id ? { ...user, role: newRole } : user));
            }
        } catch (error) {
            Swal.fire("Error", "Failed to update role", "error");
        }
    };

   
    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You want to delete this user!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/users/${id}`);
                    if (res.data.deletedCount > 0) {
                        setUsers(users.filter(user => user._id !== id));
                        Swal.fire("Deleted!", "User has been removed.", "success");
                    }
                } catch (error) {
                    Swal.fire("Error", "Failed to delete user", "error");
                }
            }
        });
    };

    const filteredUsers = filterRole === 'All' 
        ? users 
        : users.filter(user => user.role === filterRole);

    if (loading) return <div className="text-center py-20 font-bold">Loading Users...</div>;

    return (
        <div className='p-6 bg-gray-50 min-h-screen'>
            <div className='max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6'>
                <div className='flex flex-col md:flex-row justify-between items-center mb-6 gap-4'>
                    <h2 className='text-2xl font-bold text-gray-800'>User Management</h2>
                    <div className='flex items-center gap-2'>
                        <Filter size={18} className='text-gray-500' />
                        <select 
                            className='border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500'
                            value={filterRole}
                            onChange={(e) => setFilterRole(e.target.value)}
                        >
                            <option value='All'>All Roles</option>
                            <option value='Student'>Student</option>
                            <option value='Moderator'>Moderator</option>
                            <option value='Admin'>Admin</option>
                        </select>
                    </div>
                </div>

                <div className='overflow-x-auto'>
                    <table className='w-full text-left border-collapse'>
                        <thead>
                            <tr className='bg-gray-100 border-b text-sm'>
                                <th className='p-3 font-semibold text-gray-600'>Name</th>
                                <th className='p-3 font-semibold text-gray-600'>Email</th>
                                <th className='p-3 font-semibold text-gray-600'>Role</th>
                                <th className='p-3 font-semibold text-gray-600 text-center'>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr key={user._id} className='border-b hover:bg-gray-50 transition'>
                                    <td className='p-3 font-medium'>{user.name || user.displayName}</td>
                                    <td className='p-3 text-gray-500'>{user.email}</td>
                                    <td className='p-3'>
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold 
                                            ${user.role === 'Admin' ? 'bg-purple-100 text-purple-700' : 
                                            user.role === 'Moderator' ? 'bg-blue-100 text-blue-700' : 
                                            'bg-green-100 text-green-700'}`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className='p-3'>
                                        <div className='flex justify-center gap-3'>
                                            <select 
                                                className='text-sm border rounded px-2 py-1 outline-none focus:border-blue-500'
                                                value={user.role}
                                                onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                            >
                                                <option value='Student'>Student</option>
                                                <option value='Moderator'>Moderator</option>
                                                <option value='Admin'>Admin</option>
                                            </select>
                                            <button 
                                                onClick={() => handleDelete(user._id)}
                                                className='text-red-500 hover:text-red-700 transition'
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {filteredUsers.length === 0 && (
                        <div className='text-center py-10 text-gray-500'>No users found.</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ManegeUser;