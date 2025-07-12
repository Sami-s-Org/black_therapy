import { useEffect, useState } from 'react'
import styles from './findtherapist.module.css'
import { useNavigate } from 'react-router-dom'
import { db } from '../../Share/FireBase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import HeaderBar from '../../Components/Headbar'
import Avatar from '../../assets/download.jpeg'
import RingLoader from '../../Components/RingLoader'

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
  const [allData, setAllData] = useState<Therapist[]>([]) // Store all data for filter options
  const [loading, setLoading] = useState(true)
  const [filtering, setFiltering] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedPriceRange, setSelectedPriceRange] = useState('')

  // Fetch all therapists for initial load and filter options
  const fetchAllTherapists = async () => {
    try {
      setLoading(true)
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

      const acceptedTherapists = therapistsData.filter((t) => t.accepted)
      setAllData(acceptedTherapists)
      setData(acceptedTherapists)
    } catch (error) {
      console.error('Error fetching therapists:', error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch filtered therapists from database
  const fetchFilteredTherapists = async () => {
    try {
      setFiltering(true)
      const constraints = [where('accepted', '==', true)]

      // Add filters to query
      if (selectedLocation) {
        constraints.push(where('location', '==', selectedLocation))
      }

      // Create query with constraints
      const therapistsQuery = query(collection(db, 'therapists'), ...constraints)

      const querySnapshot = await getDocs(therapistsQuery)
      let therapistsData = querySnapshot.docs.map((doc) => {
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

      // Apply search term filter (client-side for text search)
      if (debouncedSearchTerm) {
        therapistsData = therapistsData.filter(
          (therapist) =>
            therapist.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
            therapist.specialization.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
            therapist.location.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
        )
      }

      // Apply price range filter (client-side as Firebase doesn't support range queries easily)
      if (selectedPriceRange) {
        therapistsData = therapistsData.filter((therapist) => {
          const price = parseInt(therapist.price.replace(/[^0-9]/g, '')) || 0
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

      setData(therapistsData)
    } catch (error) {
      console.error('Error fetching filtered therapists:', error)
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
    fetchAllTherapists()
  }, [])

  // Fetch filtered data when filters change
  useEffect(() => {
    if (!loading) {
      // Only filter after initial load
      fetchFilteredTherapists()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm, selectedLocation, selectedPriceRange, loading])

  const handleGoProfile = (therapist: Therapist) => {
    navigate('/profile', { state: therapist })
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Get unique values for filter options from all data
  const uniqueLocations = Array.from(new Set(allData.map((t) => t.location).filter(Boolean)))

  const clearFilters = () => {
    setSearchTerm('')
    setDebouncedSearchTerm('')
    setSelectedLocation('')
    setSelectedPriceRange('')
  }

  return (
    <>
      <HeaderBar heading="Find A Therapist" />
      <div className={styles.page}>
        {/* Hero Section - Simplified */}
        <div className={styles.heroSection}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Break the Silence. Embrace Healing.</h1>
            <h2 className={styles.heroSubtitle}>Find a Therapist Who Understands You</h2>
            <p className={styles.heroTagline}>Because Your Well-Being Deserves More</p>
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
                Found {data.length} therapist{data.length !== 1 ? 's' : ''}
              </p>
            </div>
          )}
        </section>

        {/* Therapist Grid */}
        <section className={styles.therapistListSection}>
          {loading ? (
            <div className={styles.loadingContainer}>
              <RingLoader color="#a88757" size={80} />
              <p className={styles.loadingText}>Loading therapists...</p>
            </div>
          ) : (
            <div className={styles.therapistGrid}>
              {filtering && (
                <div className={styles.filteringOverlay}>
                  <RingLoader color="#a88757" size={40} />
                </div>
              )}
              {data.length > 0 ? (
                data.map((therapist, index) => (
                  <div key={index} className={styles.card}>
                    <div className={styles.cardContent}>
                      <img src={therapist.image} alt={therapist.name} className={styles.avatar} />
                      <h3 className={styles.therapistName}>{therapist.name}</h3>
                      <div className={styles.therapistInfo}>
                        <p>
                          <strong>Specialization:</strong> {therapist.specialization}
                        </p>
                        <p>
                          <strong>Location:</strong> {therapist.location}
                        </p>
                        <p>
                          <strong>Price:</strong> {therapist.price}
                        </p>
                      </div>
                    </div>
                    <button onClick={() => handleGoProfile(therapist)} className={styles.profileBtn}>
                      View Profile
                    </button>
                  </div>
                ))
              ) : (
                <div className={styles.noResults}>
                  <h3>No therapists found</h3>
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

        {/* Why Therapy Matters - Simplified */}
        <section className={styles.benefitsSection}>
          <h2 className={styles.sectionTitle}>Why Therapy Matters</h2>
          <div className={styles.benefitsGrid}>
            <div className={styles.benefitCard}>
              <h3>Mental Health Support</h3>
              <p>Tools to manage anxiety, depression, and stress</p>
            </div>
            <div className={styles.benefitCard}>
              <h3>Healing from Trauma</h3>
              <p>Safe environment to process past experiences</p>
            </div>
            <div className={styles.benefitCard}>
              <h3>Better Relationships</h3>
              <p>Improve communication and connections</p>
            </div>
            <div className={styles.benefitCard}>
              <h3>Self-Discovery</h3>
              <p>Gain clarity, confidence, and resilience</p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
