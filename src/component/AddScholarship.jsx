import React, { useState } from 'react';

const AddScholarship = () => {
  const [formData, setFormData] = useState({
    scholarshipName: '',
    universityName: '',
    image: '',
    country: '',
    city: '',
    worldRank: '',
    subjectCategory: '',
    scholarshipCategory: '',
    degree: '',
    tuitionFees: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className='p-6 bg-gray-50 min-h-screen'>
      <div className='max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8'>
        <h2 className='text-2xl font-bold text-gray-800 mb-6 border-b pb-4'>Add New Scholarship</h2>
        
        <form onSubmit={handleSubmit} className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='flex flex-col gap-2'>
            <label className='font-semibold text-gray-700'>Scholarship Name</label>
            <input 
              type='text' name='scholarshipName' required
              className='border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none'
              value={formData.scholarshipName} onChange={handleChange}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className='font-semibold text-gray-700'>University Name</label>
            <input 
              type='text' name='universityName' required
              className='border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none'
              value={formData.universityName} onChange={handleChange}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className='font-semibold text-gray-700'>Image URL</label>
            <input 
              type='url' name='image' required
              className='border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none'
              value={formData.image} onChange={handleChange}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className='font-semibold text-gray-700'>Country</label>
            <input 
              type='text' name='country' required
              className='border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none'
              value={formData.country} onChange={handleChange}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className='font-semibold text-gray-700'>City</label>
            <input 
              type='text' name='city' required
              className='border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none'
              value={formData.city} onChange={handleChange}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className='font-semibold text-gray-700'>World Rank</label>
            <input 
              type='number' name='worldRank' required
              className='border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none'
              value={formData.worldRank} onChange={handleChange}
            />
          </div>

          <div className='flex flex-col gap-2'>
            <label className='font-semibold text-gray-700'>Subject Category</label>
            <select 
              name='subjectCategory' required
              className='border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none'
              value={formData.subjectCategory} onChange={handleChange}
            >
              <option value=''>Select Subject</option>
              <option value='Agriculture'>Agriculture</option>
              <option value='Engineering'>Engineering</option>
              <option value='Doctor'>Doctor</option>
            </select>
          </div>

          <div className='flex flex-col gap-2'>
            <label className='font-semibold text-gray-700'>Scholarship Category</label>
            <select 
              name='scholarshipCategory' required
              className='border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none'
              value={formData.scholarshipCategory} onChange={handleChange}
            >
              <option value=''>Select Category</option>
              <option value='Full Funding'>Full Funding</option>
              <option value='Partial'>Partial</option>
              <option value='Research'>Research</option>
            </select>
          </div>

          <div className='flex flex-col gap-2'>
            <label className='font-semibold text-gray-700'>Degree</label>
            <select 
              name='degree' required
              className='border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none'
              value={formData.degree} onChange={handleChange}
            >
              <option value=''>Select Degree</option>
              <option value='Bachelor'>Bachelor</option>
              <option value='Masters'>Masters</option>
              <option value='PhD'>PhD</option>
            </select>
          </div>

          <div className='flex flex-col gap-2'>
            <label className='font-semibold text-gray-700'>Tuition Fees (Optional)</label>
            <input 
              type='text' name='tuitionFees'
              className='border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 outline-none'
              value={formData.tuitionFees} onChange={handleChange}
            />
          </div>

          <div className='md:col-span-2 mt-4'>
            <button 
              type='submit' 
              className='w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition'
            >
              Add Scholarship
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddScholarship;