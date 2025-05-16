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
        <h1 className={styles.title}>Find a Coach Who Truly Understands Your Journey</h1>
        <p className={styles.intro}>
          At Therapy for Black Men, we recognize that healing extends beyond therapy. Sometimes, you need guidance,
          structure, and accountability to achieve your personal and professional goals.
        </p>

        <section className={styles.featured}>
          <h2 className={styles.featuredTitle}>Featured Coaches</h2>
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
