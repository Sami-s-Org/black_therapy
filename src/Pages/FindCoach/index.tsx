import { useEffect, useState } from 'react'
import styles from './findcoach.module.css'
import { useNavigate } from 'react-router-dom'
import { db } from '../../Share/FireBase'
import { collection, getDocs } from 'firebase/firestore'
import HeaderBar from '../../Components/Headbar'
import Avatar from '../../assets/download.jpeg'

interface Coaches {
  id: string
  name: string
  specialization: string
  location: string
  price: string
  image: string
  bio: string
  accepted: boolean
}

export default function FindCoach() {
  const navigate = useNavigate()
  const [data, setData] = useState<Coaches[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  const fetchCoaches = async () => {
    const querySnapshot = await getDocs(collection(db, 'coaches'))
    const coachesData = querySnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        name: data.name || '',
        specialization: data.specialization || '',
        location: data.location || '',
        price: data.price || '',
        image: data.image || Avatar,
        bio: data.bio || '',
        accepted: data.accepted || false,
      }
    }) as Coaches[]

    setData(coachesData)
  }

  useEffect(() => {
    fetchCoaches()
  }, [])

  const handleGoProfile = (coach: Coaches) => {
    navigate('/profile', { state: coach })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const filteredCoaches = data.filter(
    (coach) =>
      coach.accepted === true &&
      (coach.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coach.specialization.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <>
      <HeaderBar heading="Find A Coach" />
      <div className={styles.page}>
        {/* Headline */}
        <h1 className={styles.title}>Find a Coach Who Truly Understands Your Journey</h1>

        {/* Introduction */}
        <p className={styles.intro}>
          At Therapy for Black Men, we recognize that healing extends beyond therapy. Sometimes, what you need is
          guidance, structure, and accountability to achieve your personal and professional goals. Our directory of
          experienced life and executive coaches is designed to help Black men unlock their full potential and navigate
          life’s challenges with confidence.
        </p>

        {/* Why Coaching Section */}
        <section className={styles.section}>
          <p className={styles.title}>Why Work with a Coach?</p>
          <ul className={styles.list}>
            <li>
              <strong>Personal Growth:</strong> Overcome obstacles and build self-discipline.
            </li>
            <li>
              <strong>Career Development:</strong> Strengthen leadership skills and career advancement.
            </li>
            <li>
              <strong>Relationship Coaching:</strong> Improve communication and strengthen relationships.
            </li>
            <li>
              <strong>Health & Wellness Coaching:</strong> Develop habits for mental and physical well-being.
            </li>
            <li>
              <strong>Financial Coaching:</strong> Learn how to manage finances and build wealth.
            </li>
          </ul>
        </section>

        {/* How it Works */}
        <section className={styles.section}>
          <p className={styles.title}>How It Works</p>
          <ol className={styles.numberedList}>
            <li>
              <strong>Search for a Coach:</strong> Use our advanced directory filters to find a coach who specializes in
              your area of need.
            </li>
            <li>
              <strong>Browse Profiles:</strong> View detailed coach profiles, including experience, specialties, and
              client testimonials.
            </li>
            <li>
              <strong>Book a Session:</strong> Contact a coach directly to schedule a free consultation or coaching
              session.
            </li>
          </ol>
        </section>

        {/* Search Filters Section */}
        <section className={styles.section}>
          <p className={styles.title}>Search Filters for Coaches Directory</p>
          <ul className={styles.list}>
            <li>
              <strong>Specialization:</strong> Personal Development, Career Growth, Relationships, Financial Coaching,
              Health & Wellness
            </li>
            <li>
              <strong>Location:</strong> In-person or virtual sessions available
            </li>
            <li>
              <strong>Price & Packages:</strong> Various pricing options and coaching plans
            </li>
            <li>
              <strong>Languages Spoken:</strong> Connect with a coach who understands your background and culture
            </li>
          </ul>
        </section>

        {/* CTA Button */}
        <div style={{ textAlign: 'center', margin: '30px 0' }}>
          <button className={styles.profileBtn}>Start Your Coaching Journey Today</button>
        </div>

        {/* Coaches Directory */}
        <section className={styles.featured}>
          <h2 className={styles.featuredTitle} style={{ textAlign: 'center' }}>
            Coaches
          </h2>
          <div className={styles.searchContainer}>
            <input
              type="text"
              style={{
                padding: '8px',
                width: '300px',
                borderRadius: '8px',
                border: '1px solid #ccc',
              }}
              placeholder="Search coaches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className={styles.coachGrid}>
            {filteredCoaches.length > 0 ? (
              filteredCoaches.map((coach, index) => (
                <div key={index} className={styles.card}>
                  <div>
                    <img src={coach.image} alt={coach.name} className={styles.avatar} />
                    <h2 style={{ textTransform: 'capitalize' }}>{coach.name}</h2>
                    <p style={{ color: '#131313' }}>
                      <strong>Specialization:</strong> {coach.specialization}
                    </p>
                    <p style={{ color: '#131313' }}>
                      <strong>Location:</strong> {coach.location}
                    </p>
                    <p style={{ color: '#131313' }}>
                      <strong>Price:</strong> {coach.price}
                    </p>
                    <p style={{ color: '#444', marginTop: '8px' }}>
                      <strong>About:</strong> {coach.bio?.slice(0, 100)}...
                    </p>
                  </div>
                  <button onClick={() => handleGoProfile(coach)} className={styles.profileBtn}>
                    View Profile
                  </button>
                </div>
              ))
            ) : (
              <p>No accepted coaches found.</p>
            )}
          </div>
        </section>
      </div>
    </>
  )
}
