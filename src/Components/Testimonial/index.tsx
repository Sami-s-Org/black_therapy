import styles from './testimonial.module.css'
import { FaQuoteLeft } from 'react-icons/fa'
import { GiWorld } from 'react-icons/gi'
import { FaPhone } from 'react-icons/fa6'

const testimonials = [
  {
    quote: "Therapy helped me see that I don't have to be perfect to be worthy of peace.",
    author: 'Jamal W., 34 – Atlanta, GA',
  },
  {
    quote: 'Finding a Black male therapist changed my life. I felt seen, understood, and finally safe.',
    author: 'Kevin B., 29 – Chicago, IL',
  },
  {
    quote: 'For the first time in my life, I realized vulnerability is strength. That shift started with therapy.',
    author: 'Marcus T., 42 – Detroit, MI',
  },
]

const Testimonials = () => {
  return (
    <div className={styles.testimonialSection}>
      <div className={styles.container}>
        <div>
          <h2 className={styles.testimonialsHeading}>What Our Clients Say</h2>
          <div className={styles.decorativeLine}></div>
        </div>

        <h2 className={styles.heading}>Testimonials & Success Stories</h2>
        <div className={styles.carousel}>
          {testimonials.map((item, index) => (
            <div key={index} className={styles.card}>
              <FaQuoteLeft className={styles.quoteIcon} />
              <p className={styles.quote}>{item.quote}</p>
              <p className={styles.author}> {item.author}</p>
            </div>
          ))}
        </div>

        <div className={styles.messageBox}>
          <h3 className={styles.heading}>Strength Still Needs Support</h3>
          <p className={styles.supportText}>
            Even the strongest among us need a safe place to rest, to heal, and to grow. Strength doesn’t mean enduring
            alone it means having the courage to seek support when you need it most.
          </p>
          <p className={styles.supportText}>
            At <strong style={{ color: '#a88757' }}>Therapy for Black Men</strong>, we provide a compassionate,
            judgment-free space with therapists who truly understand your experiences. Our mission is to walk with you
            on your journey to healing, offering the support you deserve to unlock your full potential.
          </p>
          <p className={styles.supportText}>You don’t have to carry it all by yourself.</p>

          <div className={styles.contact}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <GiWorld size={24} color="#a88757" />
              <a href="https://therapyforblackmen.org" target="_blank" rel="noreferrer">
                therapyforblackmen.org
              </a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <FaPhone size={24} color="#a88757" />
              <a href="tel:+16462463064"> +1 (646) 246-3064</a>
            </div>
          </div>

          <div className={styles.cta}>
            Your healing starts <span>here</span>.
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testimonials
