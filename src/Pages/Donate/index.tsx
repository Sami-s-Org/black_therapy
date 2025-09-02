import { useEffect } from 'react'
import HeaderBar from '../../Components/Headbar'

export default function Donate() {
  useEffect(() => {
    window.scrollTo(0, 0)
  })
  const paymentLink = process.env.TEST_STRIPE_LINK
  const handleDonate = () => {
    if (paymentLink) {
      window.location.href = paymentLink
    } else {
      alert(
        'Stripe payment link is not configured. Please set REACT_APP_STRIPE_PAYMENT_LINK in your .env and restart the dev server.'
      )
    }
  }

  return (
    <div style={{ padding: '24px' }}>
      <HeaderBar heading="Donate" />
      <div style={{ marginTop: 24 }}>
        <button
          onClick={handleDonate}
          style={{
            padding: '12px 20px',
            borderRadius: 8,
            background: '#635bff',
            color: '#fff',
            border: 'none',
            cursor: 'pointer',
            fontWeight: 600,
          }}
        >
          Donate with Stripe
        </button>
      </div>
    </div>
  )
}
