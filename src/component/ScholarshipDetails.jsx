import React from 'react'
import { useNavigate, useParams } from 'react-router'


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
  },
  {
    id: 7,
    scholarshipName: 'NextGen Research Fellowship',
    universityName: 'University of Tokyo',
    universityImage: 'https://images.unsplash.com/photo-1549692520-acc6669e2f0c',
    scholarshipCategory: 'Research',
    subjectCategory: 'Data Science',
    degree: 'PhD',
    location: 'Japan',
    applicationFees: '$30'
  },
  {
    id: 8,
    scholarshipName: 'Creative Minds Scholarship',
    universityName: 'University of Arts London',
    universityImage: 'https://images.unsplash.com/photo-1491841550275-ad7854e35ca6',
    scholarshipCategory: 'Merit',
    subjectCategory: 'Design',
    degree: 'Bachelor',
    location: 'UK',
    applicationFees: '$35'
  },
  {
    id: 9,
    scholarshipName: 'Green Future Scholarship',
    universityName: 'ETH Zurich',
    universityImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d',
    scholarshipCategory: 'Merit',
    subjectCategory: 'Environmental Science',
    degree: 'Master',
    location: 'Switzerland',
    applicationFees: '$65'
  },
  {
    id: 10,
    scholarshipName: 'AI Excellence Grant',
    universityName: 'National University of Singapore',
    universityImage: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a',
    scholarshipCategory: 'Merit',
    subjectCategory: 'Artificial Intelligence',
    degree: 'Master',
    location: 'Singapore',
    applicationFees: '$55'
  },
  {
    id: 11,
    scholarshipName: 'Global Scholars Award',
    universityName: 'Heidelberg University',
    universityImage: 'https://images.unsplash.com/photo-1517520287167-4bbf64a00d66',
    scholarshipCategory: 'Need-Based',
    subjectCategory: 'Economics',
    degree: 'Bachelor',
    location: 'Germany',
    applicationFees: '$25'
  }
]

const ScholarshipDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const scholarship = scholarshipsData.find(
    item => item.id === parseInt(id)
  )

  if (!scholarship) {
    return <p className='text-center mt-20 text-red-500'>Scholarship not found</p>
  }

  return (
    <div className='w-11/12 mx-auto py-10'>
     
      <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
        <img
          src={scholarship.universityImage}
          alt={scholarship.universityName}
          className='rounded-2xl shadow-lg'
        />

        <div className='space-y-3'>
          <h1 className='text-3xl font-bold text-green-600'>
            {scholarship.scholarshipName}
          </h1>

          <h2 className='text-xl font-semibold'>
            {scholarship.universityName}
          </h2>

          <p><strong>World Rank:</strong> #{scholarship.worldRank}</p>
          <p><strong>Deadline:</strong> {scholarship.deadline}</p>
          <p><strong>Location:</strong> {scholarship.location}</p>
          <p><strong>Application Fee:</strong> {scholarship.applicationFees}</p>

          <button
              onClick={() =>
    navigate('/checkout', { state: { scholarship } })
  }
  className='btn btn-success mt-4 w-full'
          >
            Apply for Scholarship
          </button>
        </div>
      </div>

      <div className='mt-10 bg-white p-6 rounded-2xl shadow'>
        <h3 className='text-2xl font-bold mb-3'>
          Scholarship Description
        </h3>
        <p className='text-gray-600'>{scholarship.description}</p>
      </div>

      <div className='mt-6 bg-white p-6 rounded-2xl shadow'>
        <h3 className='text-2xl font-bold mb-3'>
          Stipend & Coverage
        </h3>
        <p className='text-gray-600'>{scholarship.stipend}</p>
      </div>
    </div>
  )
}

export default ScholarshipDetails
