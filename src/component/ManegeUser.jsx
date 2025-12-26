import React, { useState } from 'react';
import { Trash2, Filter } from 'lucide-react';

const ManegeUser = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Ariful Haque', email: 'arif@example.com', role: 'Student' },
    { id: 2, name: 'Sultana Ahmed', email: 'sultana@example.com', role: 'Moderator' },
    { id: 3, name: 'Tanvir Hossain', email: 'tanvir@example.com', role: 'Admin' },
    { id: 4, name: 'Mim Akter', email: 'mim@example.com', role: 'Student' },
  ]);

  const [filterRole, setFilterRole] = useState('All');

  const handleRoleChange = (id, newRole) => {
    setUsers(users.map(user => user.id === id ? { ...user, role: newRole } : user));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const filteredUsers = filterRole === 'All' 
    ? users 
    : users.filter(user => user.role === filterRole);

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
              <tr className='bg-gray-100 border-b'>
                <th className='p-3 font-semibold text-gray-600'>Name</th>
                <th className='p-3 font-semibold text-gray-600'>Email</th>
                <th className='p-3 font-semibold text-gray-600'>Role</th>
                <th className='p-3 font-semibold text-gray-600 text-center'>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className='border-b hover:bg-gray-50 transition'>
                  <td className='p-3'>{user.name}</td>
                  <td className='p-3 text-gray-500'>{user.email}</td>
                  <td className='p-3'>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium 
                      ${user.role === 'Admin' ? 'bg-purple-100 text-purple-700' : 
                        user.role === 'Moderator' ? 'bg-blue-100 text-blue-700' : 
                        'bg-green-100 text-green-700'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className='p-3'>
                    <div className='flex justify-center gap-3'>
                      <select 
                        className='text-sm border rounded px-2 py-1 outline-none'
                        value={user.role}
                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      >
                        <option value='Student'>Student</option>
                        <option value='Moderator'>Moderator</option>
                        <option value='Admin'>Admin</option>
                      </select>

                      <button 
                        onClick={() => handleDelete(user.id)}
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