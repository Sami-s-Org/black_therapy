import { useEffect, useState } from 'react'
import styles from './findcoach.module.css'
import { useNavigate } from 'react-router-dom'
import { db } from '../../Share/FireBase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import HeaderBar from '../../Components/Headbar'
import Avatar from '../../assets/download.jpeg'
import RingLoader from '../../Components/RingLoader'

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
  const [allData, setAllData] = useState<Coaches[]>([]) // Store all data for filter options
  const [loading, setLoading] = useState(true)
  const [filtering, setFiltering] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedPriceRange, setSelectedPriceRange] = useState('')

  // Fetch all coaches for initial load and filter options
  const fetchAllCoaches = async () => {
    try {
      setLoading(true)
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

      const acceptedCoaches = coachesData.filter((c) => c.accepted)
      setAllData(acceptedCoaches)
      setData(acceptedCoaches)
    } catch (error) {
      console.error('Error fetching coaches:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch filtered coaches from database
  const fetchFilteredCoaches = async () => {
    try {
      setFiltering(true)
      const constraints = [where('accepted', '==', true)]

      // Add filters to query
      if (selectedLocation) {
        constraints.push(where('location', '==', selectedLocation))
      }

      // Create query with constraints
      const coachesQuery = query(collection(db, 'coaches'), ...constraints)

      const querySnapshot = await getDocs(coachesQuery)
      let coachesData = querySnapshot.docs.map((doc) => {
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

      // Apply search term filter (client-side for text search)
      if (debouncedSearchTerm) {
        coachesData = coachesData.filter(
          (coach) =>
            coach.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
            coach.specialization.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
            coach.location.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        )
      }

      // Apply price range filter (client-side as Firebase doesn't support range queries easily)
      if (selectedPriceRange) {
        coachesData = coachesData.filter((coach) => {
          const price = parseInt(coach.price.replace(/[^0-9]/g, '')) || 0
          switch (selectedPriceRange) {
            case 'under-50':
              return price < 50
            case '50-100':
              return price >= 50 && price <= 100
            case '100-150':
              return price >= 100 && price <= 150
            case 'over-150':
              return price > 150
            default:
              return true
          }
        })
      }

      setData(coachesData)
    } catch (error) {
      console.error('Error fetching filtered coaches:', error)
    } finally {
      setFiltering(false)
    }
  }

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm)
    }, 500) // 500ms delay

    return () => clearTimeout(timer)
  }, [searchTerm])

  // Initial fetch
  useEffect(() => {
    fetchAllCoaches()
  }, [])

  // Fetch filtered data when filters change
  useEffect(() => {
    if (!loading) {
      // Only filter after initial load
      fetchFilteredCoaches()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm, selectedLocation, selectedPriceRange, loading])

  const handleGoProfile = (coach: Coaches) => {
    navigate('/profile', { state: coach })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Get unique values for filter options from all data
  const uniqueLocations = Array.from(new Set(allData.map((c) => c.location).filter(Boolean)))

  const clearFilters = () => {
    setSearchTerm('')
    setDebouncedSearchTerm('')
    setSelectedLocation('')
    setSelectedPriceRange('')
  }

  return (
    <>
      <HeaderBar heading="Find A Coach" />
      <div className={styles.page}>
        {/* Hero Section - Simplified */}
        <div className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Unlock Your Full Potential</h1>
            <h2 className={styles.heroSubtitle}>Find a Coach Who Truly Understands Your Journey</h2>
            <p className={styles.heroTagline}>Transform Your Life with Expert Guidance</p>
          </div>
        </div>

        {/* Search and Filters Section - Combined */}
        <section className={styles.searchFiltersSection}>
          <div className={styles.searchFiltersContainer}>
            <div className={styles.searchRow}>
              <div className={styles.searchInputWrapper}>
                <input
                  type="text"
                  className={styles.searchInput}
                  placeholder="Search by name, specialization, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  disabled={loading}
                />
                {(searchTerm !== debouncedSearchTerm || filtering) && (
                  <div className={styles.searchingIndicator}>
                    <small>{filtering ? 'Filtering...' : 'Searching...'}</small>
                  </div>
                )}
              </div>
            </div>

            <div className={styles.filtersRow}>
              <div className={styles.filterCard}>
                <label className={styles.filterLabel}>Location</label>
                <select
                  className={styles.filterSelect}
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  disabled={loading}
                >
                  <option value="">All Locations</option>
                  {uniqueLocations.map((location, index) => (
                    <option key={index} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.filterCard}>
                <label className={styles.filterLabel}>Price Range</label>
                <select
                  className={styles.filterSelect}
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  disabled={loading}
                >
                  <option value="">All Prices</option>
                  <option value="under-50">Under $50</option>
                  <option value="50-100">$50 - $100</option>
                  <option value="100-150">$100 - $150</option>
                  <option value="over-150">Over $150</option>
                </select>
              </div>

              <div className={styles.filterCard}>
                <button className={styles.clearFiltersBtn} onClick={clearFilters} disabled={loading}>
                  Clear All
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          {!loading && (
            <div className={styles.resultsCount}>
              <p>
                Found {data.length} coach{data.length !== 1 ? 'es' : ''}
                {filtering && <span> (filtering...)</span>}
              </p>
            </div>
          )}
        </section>

        {/* Coach Grid */}
        <section className={styles.coachListSection}>
          {loading ? (
            <div className={styles.loadingContainer}>
              <RingLoader color="#a88757" size={80} />
              <p className={styles.loadingText}>Loading coaches...</p>
            </div>
          ) : (
            <div className={styles.coachGrid}>
              {filtering && (
                <div className={styles.filteringOverlay}>
                  <RingLoader color="#a88757" size={40} />
                </div>
              )}
              {data.length > 0 ? (
                data.map((coach, index) => (
                  <div key={index} className={styles.card}>
                    <div className={styles.cardContent}>
                      <img src={coach.image} alt={coach.name} className={styles.avatar} />
                      <h3 className={styles.coachName}>{coach.name}</h3>
                      <div className={styles.coachInfo}>
                        <p>
                          <strong>Specialization:</strong> {coach.specialization}
                        </p>
                        <p>
                          <strong>Location:</strong> {coach.location}
                        </p>
                        <p>
                          <strong>Price:</strong> {coach.price}
                        </p>
                      </div>
                    </div>
                    <button onClick={() => handleGoProfile(coach)} className={styles.profileBtn}>
                      View Profile
                    </button>
                  </div>
                ))
              ) : (
                <div className={styles.noResults}>
                  <h3>No coaches found</h3>
                  <p>Try adjusting your search terms or clearing your filters to see more results.</p>
                  <button onClick={clearFilters} className={styles.resetBtn}>
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Content Sections - Moved to bottom */}
        <section className={styles.contentSection}>
          <div className={styles.contentGrid}>
            <div className={styles.contentCard}>
              <h3>Why Choose Us?</h3>
              <p>
                We've created a powerful, user-friendly tool to connect you with professionals who understand your
                journey.
              </p>
            </div>
            <div className={styles.contentCard}>
              <h3>Our Mission</h3>
              <p>
                At Therapy for Black Men, we're committed to making it easier to find the right mental health support.
              </p>
            </div>
            <div className={styles.contentCard}>
              <h3>Get Started</h3>
              <p>Take the first step toward healing. You don't have to 'man up'; start your healing journey today.</p>
            </div>
          </div>
        </section>

        {/* Why Coaching Matters - Simplified */}
        <section className={styles.benefitsSection}>
          <h2 className={styles.sectionTitle}>Why Coaching Matters</h2>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitCard}>
              <h3>Personal Growth</h3>
              <p>Develop skills and mindsets for success</p>
            </div>
            <div className={styles.benefitCard}>
              <h3>Goal Achievement</h3>
              <p>Create clear paths to reach your objectives</p>
            </div>
            <div className={styles.benefitCard}>
              <h3>Leadership Skills</h3>
              <p>Build confidence and leadership abilities</p>
            </div>
            <div className={styles.benefitCard}>
              <h3>Life Balance</h3>
              <p>Find harmony between work and personal life</p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
