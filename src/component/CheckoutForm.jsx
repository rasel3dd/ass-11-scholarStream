import React, { useEffect, useState } from 'react'
import {
  CardElement,
  useElements,
  useStripe
} from '@stripe/react-stripe-js'

const CheckoutForm = ({ scholarship }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [clientSecret, setClientSecret] = useState('')
  const [loading, setLoading] = useState(false)

  // create payment intent
  useEffect(() => {
    fetch('http://localhost:5000/create-payment-intent', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        amount: parseInt(scholarship.applicationFees.replace('$', '')) * 100
      })
    })
      .then(res => res.json())
      .then(data => setClientSecret(data.clientSecret))
  }, [scholarship])

  const handleSubmit = async e => {
    e.preventDefault()
    if (!stripe || !elements) return

    setLoading(true)

    const card = elements.getElement(CardElement)

    const { paymentIntent, error } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card }
      })

    if (error) {
      alert(error.message)
      setLoading(false)
      return
    }

    if (paymentIntent.status === 'succeeded') {
      // Save Application
      fetch('http://localhost:5000/applications', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          scholarshipId: scholarship.id,
          scholarshipName: scholarship.scholarshipName,
          universityName: scholarship.universityName,
          fee: scholarship.applicationFees,
          transactionId: paymentIntent.id,
          status: 'pending'
        })
      })

      alert('Payment successful & application submitted 🎉')
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <CardElement className='p-4 border rounded' />
      <button
        disabled={!stripe || loading}
        className='btn btn-success w-full'
      >
        {loading ? 'Processing...' : 'Pay & Apply'}
      </button>
    </form>
  )
}

export default CheckoutForm
