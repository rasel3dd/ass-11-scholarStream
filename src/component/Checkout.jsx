import React from 'react'
import { useLocation } from 'react-router'
import { Elements } from '@stripe/react-stripe-js'
import { stripePromise } from '../../public/stripe'
import CheckoutForm from '../component/CheckoutForm'

const Checkout = () => {
  const { state } = useLocation()
  const scholarship = state?.scholarship

  if (!scholarship) {
    return <p className='text-center mt-20'>No scholarship found</p>
  }

  return (
    <div className='min-h-screen bg-gray-100 py-10'>
      <div className='max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow'>
        <h1 className='text-2xl font-bold mb-4 text-green-600'>
          Checkout
        </h1>

        <p className='mb-2'>
          <strong>Scholarship:</strong> {scholarship.scholarshipName}
        </p>
        <p className='mb-6'>
          <strong>Application Fee:</strong> {scholarship.applicationFees}
        </p>

        <Elements stripe={stripePromise}>
          <CheckoutForm scholarship={scholarship} />
        </Elements>
      </div>
    </div>
  )
}

export default Checkout
