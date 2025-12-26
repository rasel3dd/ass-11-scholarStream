import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Users, DollarSign, GraduationCap } from 'lucide-react';

const Analytics = () => {
  const stats = [
    { id: 1, label: 'Total Users', value: '1,250', icon: <Users size={24} />, color: 'bg-blue-500' },
    { id: 2, label: 'Fees Collected', value: '$45,200', icon: <DollarSign size={24} />, color: 'bg-green-500' },
    { id: 3, label: 'Scholarships', value: '85', icon: <GraduationCap size={24} />, color: 'bg-purple-500' },
  ];

  const barData = [
    { name: 'Full Funding', count: 45 },
    { name: 'Partial', count: 32 },
    { name: 'Research', count: 18 },
    { name: 'Exchange', count: 12 },
  ];

  const pieData = [
    { name: 'Oxford', value: 400 },
    { name: 'MIT', value: 300 },
    { name: 'Stanford', value: 300 },
    { name: 'Harvard', value: 200 },
  ];

  const COLORS = ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b'];

  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
      <h2 className='text-2xl font-bold text-gray-800 mb-6'>Platform Analytics</h2>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
        {stats.map((item) => (
          <div key={item.id} className='bg-white p-6 rounded-lg shadow-sm flex items-center gap-4'>
            <div className={`${item.color} p-4 rounded-full text-white`}>
              {item.icon}
            </div>
            <div>
              <p className='text-sm text-gray-500'>{item.label}</p>
              <p className='text-2xl font-bold text-gray-800'>{item.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
        <div className='bg-white p-6 rounded-lg shadow-sm'>
          <h3 className='text-lg font-semibold mb-4 text-gray-700'>Applications by Category</h3>
          <div className='h-64'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={barData}>
                <XAxis dataKey='name' />
                <YAxis />
                <Tooltip />
                <Bar dataKey='count' fill='#3b82f6' radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className='bg-white p-6 rounded-lg shadow-sm'>
          <h3 className='text-lg font-semibold mb-4 text-gray-700'>University Distribution</h3>
          <div className='h-64'>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey='value'
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;