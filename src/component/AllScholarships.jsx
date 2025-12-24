import React, { useState } from 'react'
import { Link } from 'react-router'


const scholarshipsData = [
    {
    id: 1,
    scholarshipName: 'Merit Excellence Scholarship',
    universityName: 'Harvard University',
    universityImage: 'https://images.unsplash.com/photo-1562774053-701939374585',
    scholarshipCategory: 'Merit',
    subjectCategory: 'Computer Science',
    degree: 'Bachelor',
    location: 'USA',
    applicationFees: '$50'
  },
  {
    id: 2,
    scholarshipName: 'Global Need Based Scholarship',
    universityName: 'University of Toronto',
    universityImage: 'https://images.unsplash.com/photo-1588072432836-e10032774350',
    scholarshipCategory: 'Need Based',
    subjectCategory: 'Business',
    degree: 'Masters',
    location: 'Canada',
    applicationFees: 'Free'
  },
  {
    id: 3,
    scholarshipName: 'International Research Scholarship',
    universityName: 'University of Oxford',
    universityImage: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a',
    scholarshipCategory: 'Research',
    subjectCategory: 'Engineering',
    degree: 'PhD',
    location: 'UK',
    applicationFees: '$30'
  },
  {
    id: 4,
    scholarshipName: 'Women in STEM Scholarship',
    universityName: 'University of Melbourne',
    universityImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b',
    scholarshipCategory: 'Merit',
    subjectCategory: 'Science',
    degree: 'Bachelor',
    location: 'Australia',
    applicationFees: 'Free'
  },
  {
    id: 5,
    scholarshipName: 'Asia Development Scholarship',
    universityName: 'National University of Singapore',
    universityImage: 'https://images.unsplash.com/photo-1562774053-701939374585',
    scholarshipCategory: 'Need Based',
    subjectCategory: 'Economics',
    degree: 'Masters',
    location: 'Singapore',
    applicationFees: '$20'
  },
  {
    id: 6,
    scholarshipName: 'European Innovation Scholarship',
    universityName: 'Technical University of Munich',
    universityImage: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a',
    scholarshipCategory: 'Merit',
    subjectCategory: 'Technology',
    degree: 'Masters',
    location: 'Germany',
    applicationFees: '$40'
  }
]

const AllScholarships = () => {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [subject, setSubject] = useState('')
  const [location, setLocation] = useState('')

  const filteredScholarships = scholarshipsData.filter(item =>
    (item.scholarshipName.toLowerCase().includes(search.toLowerCase()) ||
      item.universityName.toLowerCase().includes(search.toLowerCase()) ||
      item.degree.toLowerCase().includes(search.toLowerCase())) &&
    (category === '' || item.scholarshipCategory === category) &&
    (subject === '' || item.subjectCategory === subject) &&
    (location === '' || item.location === location)
  )

  return (
    <div className='w-11/12 mx-auto py-10'>
      <h1 className='text-3xl font-bold text-center mb-8 text-green-600'>
        Available Scholarships
      </h1>

      
      <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-8'>
        <input
          type='text'
          placeholder='Search by Name, University or Degree'
          className='input input-bordered w-full'
          onChange={e => setSearch(e.target.value)}
        />

        <select
          className='select select-bordered'
          onChange={e => setCategory(e.target.value)}
        >
          <option value=''>Scholarship Category</option>
          <option value='Merit'>Merit</option>
          <option value='Need Based'>Need Based</option>
        </select>

        <select
          className='select select-bordered'
          onChange={e => setSubject(e.target.value)}
        >
          <option value=''>Subject Category</option>
          <option value='Computer Science'>Computer Science</option>
          <option value='Business'>Business</option>
        </select>

        <select
          className='select select-bordered'
          onChange={e => setLocation(e.target.value)}
        >
          <option value=''>Location</option>
          <option value='USA'>USA</option>
          <option value='Canada'>Canada</option>
        </select>
      </div>

      
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {filteredScholarships.map(item => (
          <div
            key={item.id}
            className='bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition'
          >
            <img
              src={item.universityImage}
              alt={item.universityName}
              className='h-48 w-full object-cover'
            />

            <div className='p-5 space-y-2'>
              <h2 className='text-xl font-bold'>{item.universityName}</h2>
              <p className='text-sm text-gray-500'>{item.scholarshipName}</p>

              <div className='text-sm'>
                <p><span className='font-semibold'>Category:</span> {item.scholarshipCategory}</p>
                <p><span className='font-semibold'>Location:</span> {item.location}</p>
                <p><span className='font-semibold'>Application Fee:</span> {item.applicationFees}</p>
              </div>

              <Link to={`/scholarshipDetail/${item.id}`}>
                <button className='btn btn-success w-full mt-4'>
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AllScholarships
