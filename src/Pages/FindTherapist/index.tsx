import { useEffect, useState } from 'react'
import styles from './findtherapist.module.css'
import { useNavigate } from 'react-router-dom'
import { db } from '../../Share/FireBase'
import { collection, getDocs } from 'firebase/firestore'
import HeaderBar from '../../Components/Headbar'
import Avatar from '../../assets/download.jpeg'

interface Therapist {
  id: string
  name: string
  specialization: string
  location: string
  price: string
  image: string
  bio: string
  accepted: boolean
}

export default function FindTherapist() {
  const navigate = useNavigate()
  const [data, setData] = useState<Therapist[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  const fetchTherapists = async () => {
    const querySnapshot = await getDocs(collection(db, 'therapists'))
    const therapistsData = querySnapshot.docs.map((doc) => {
      const data = doc.data()
      return {
        id: doc.id,
        name: data.name || '',
        email: data.email || '',
        specialization: data.specialization || '',
        location: data.location || '',
        price: data.price || '',
        image: data.image || Avatar,
        bio: data.bio || '',
        accepted: data.accepted || false,
      }
    }) as Therapist[]

    setData(therapistsData)
  }

  useEffect(() => {
    fetchTherapists()
  }, [])

  const handleGoProfile = (therapist: Therapist) => {
    navigate('/profile', { state: therapist })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const filteredTherapists = data.filter(
    (therapist) =>
      therapist.accepted === true &&
      (therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        therapist.specialization.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <>
      <HeaderBar heading="Find A Therapist" />
      <div className={styles.page}>
        <h1 className={styles.title}>Break the Silence. Embrace Healing. Find a Therapist Who Understands You</h1>
        <h1 className={styles.title}>(Because Your Well-Being Deserves More)</h1>
        <p className={styles.intro}>Finding the right support can feel overwhelming. You may be asking yourself:</p>
        <ul className={styles.list}>
          <li>How close are they?</li>
          <li>Will they accept my insurance?</li>
          <li>Do they truly understand my experiences?</li>
        </ul>
        <p className={styles.intro}>
          We understand how deeply personal this decision is, and at <strong>Therapy for Black Men</strong>, we’re
          committed to making it easier.
        </p>
        <section className={styles.directory}>
          <h2>A Directory Designed With You in Mind</h2>
          <p>
            We’ve created a powerful, user-friendly tool to connect you with professionals who understand your journey.
          </p>
          <ul className={styles.list}>
            <li>
              <strong>Location:</strong> Find someone near you or explore virtual options for convenience and
              flexibility.
            </li>
            <li>
              <strong>Specialization:</strong> Whether you’re navigating anxiety, trauma, relationships, or
              self-discovery, connect with therapists and coaches who have the expertise to guide you.
            </li>
            <li>
              <strong>Credentials:</strong> Explore qualifications and experiences so you can feel confident in your
              choice.
            </li>
          </ul>
        </section>
        <section className={styles.support}>
          <h2>Support Every Step of the Way</h2>
          <p>
            Healing is a journey, not a destination, and you don’t have to walk it alone. Along with access to
            therapists and coaches, we provide resources and tools to support you as you work toward the peace,
            strength, and clarity you deserve.
          </p>
        </section>
        <section className={styles.closing}>
          <h2>You’re Not Alone</h2>
          <p>
            It’s time to let go of the message that you need to “man up.” Vulnerability is not weakness, it’s a
            courageous step toward a stronger, more fulfilled version of yourself.
          </p>
          <p>
            <strong>Start Your Change Today</strong>
          </p>
          <p>
            Take the first step. Let us help you find the therapist or coach who will stand by your side and help you
            align with your full potential.
          </p>
          <p>You don’t have to ‘man up’; start your healing journey today.</p>
        </section>
        <section className={styles.whyTherapy}>
          <h2>Why Therapy Matters</h2>
          <ul className={styles.list}>
            <li>
              <strong>Mental Health Support:</strong> Therapy provides the tools to manage anxiety, depression, and
              stress.
            </li>
            <li>
              <strong>Healing from Trauma:</strong> Process past experiences in a safe and supportive environment.
            </li>
            <li>
              <strong>Relationship Building:</strong> Improve communication and strengthen connections.
            </li>
            <li>
              <strong>Self-Discovery:</strong> Gain clarity, confidence, and resilience.
            </li>
          </ul>
        </section>
        <section className={styles.howItWorks}>
          <h2>How It Works</h2>
          <ol className={styles.numberedList}>
            <li>
              <strong>Search for a Therapist:</strong> Use our advanced filters to find a therapist that matches your
              needs.
            </li>
            <li>
              <strong>Browse Profiles:</strong> View therapist qualifications, specialties, and client reviews.
            </li>
            <li>
              <strong>Connect & Book a Session:</strong> Reach out directly to schedule an appointment or consultation.
            </li>
          </ol>
        </section>{' '}
        <section className={styles.section}>
          <p className={styles.title}>Search Filters for Therapists Directory</p>
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
        <div style={{ margin: '30px 0' }}>
          <button className={styles.profileBtn}>Find a Therapist</button>
        </div>
        <section className={styles.featured}>
          <h2 className={styles.featuredTitle}>Therapists</h2>
          <div className={styles.searchContainer}>
            <input
              type="text"
              style={{
                padding: '8px',
                width: '300px',
                borderRadius: '8px',
                border: '1px solid #ccc',
              }}
              placeholder="Search therapists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className={styles.therapistGrid}>
            {filteredTherapists.length > 0 ? (
              filteredTherapists.map((therapist, index) => (
                <div key={index} className={styles.card}>
                  <div>
                    <img src={therapist.image} alt={therapist.name} className={styles.avatar} />
                    <h2 style={{ textTransform: 'capitalize' }}>{therapist.name}</h2>
                    <p style={{ color: '#131313' }}>
                      <strong>Specialization:</strong> {therapist.specialization}
                    </p>
                    <p style={{ color: '#131313' }}>
                      <strong>Location:</strong> {therapist.location}
                    </p>
                    <p style={{ color: '#131313' }}>
                      <strong>Price:</strong> {therapist.price}
                    </p>
                  </div>
                  <button onClick={() => handleGoProfile(therapist)} className={styles.profileBtn}>
                    View Profile
                  </button>
                </div>
              ))
            ) : (
              <p className={styles.noResults}>No accepted therapists found.</p>
            )}
          </div>
        </section>
      </div>
    </>
  )
}
