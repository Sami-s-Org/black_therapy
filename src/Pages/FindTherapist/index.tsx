import { useEffect, useState, useMemo } from 'react'
import styles from './findtherapist.module.css'
import { useNavigate } from 'react-router-dom'
import { db } from '../../Share/FireBase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import HeaderBar from '../../Components/Headbar'
import Avatar from '../../assets/download.jpeg'
import RingLoader from '../../Components/RingLoader'
import TherapistMap, { TherapistLocation } from '../../Components/TherapistMap'

interface Therapist {
  id: string
  name: string
  specialization: string
  location: string
  price: string
  image: string
  bio: string
  accepted: boolean
  lat?: number
  lng?: number
}

// Sample data with coordinates for major cities
const sampleTherapists: TherapistLocation[] = [
  {
    id: '1',
    name: 'Dr. Marcus Johnson',
    specialization: 'Anxiety & Depression',
    location: 'New York, NY',
    price: '$120/session',
    image: 'https://i.pravatar.cc/150?img=12',
    lat: 40.7128,
    lng: -74.006,
  },
  {
    id: '2',
    name: 'Dr. James Williams',
    specialization: 'Trauma & PTSD',
    location: 'Los Angeles, CA',
    price: '$150/session',
    image: 'https://i.pravatar.cc/150?img=13',
    lat: 34.0522,
    lng: -118.2437,
  },
  {
    id: '3',
    name: 'Dr. Terrence Davis',
    specialization: 'Relationship Counseling',
    location: 'Chicago, IL',
    price: '$100/session',
    image: 'https://i.pravatar.cc/150?img=14',
    lat: 41.8781,
    lng: -87.6298,
  },
  {
    id: '4',
    name: 'Dr. Andre Mitchell',
    specialization: 'Family Therapy',
    location: 'Houston, TX',
    price: '$110/session',
    image: 'https://i.pravatar.cc/150?img=15',
    lat: 29.7604,
    lng: -95.3698,
  },
  {
    id: '5',
    name: 'Dr. Kevin Brown',
    specialization: 'Stress Management',
    location: 'Phoenix, AZ',
    price: '$95/session',
    image: 'https://i.pravatar.cc/150?img=33',
    lat: 33.4484,
    lng: -112.074,
  },
  {
    id: '6',
    name: 'Dr. Malcolm Harris',
    specialization: 'Grief Counseling',
    location: 'Philadelphia, PA',
    price: '$130/session',
    image: 'https://i.pravatar.cc/150?img=51',
    lat: 39.9526,
    lng: -75.1652,
  },
  {
    id: '7',
    name: 'Dr. Isaiah Thompson',
    specialization: 'Addiction Recovery',
    location: 'San Antonio, TX',
    price: '$115/session',
    image: 'https://i.pravatar.cc/150?img=52',
    lat: 29.4241,
    lng: -98.4936,
  },
  {
    id: '8',
    name: 'Dr. Darius Martinez',
    specialization: 'Career Counseling',
    location: 'San Diego, CA',
    price: '$105/session',
    image: 'https://i.pravatar.cc/150?img=60',
    lat: 32.7157,
    lng: -117.1611,
  },
  {
    id: '9',
    name: 'Dr. Ayesha Khan',
    specialization: 'Cognitive Behavioral Therapy',
    location: 'Karachi, Pakistan',
    price: 'PKR 4000/session',
    image: 'https://i.pravatar.cc/150?img=65',
    lat: 24.8607,
    lng: 67.0011,
  },
  {
    id: '10',
    name: 'Dr. Imran Siddiqui',
    specialization: 'Child & Adolescent Therapy',
    location: 'Lahore, Pakistan',
    price: 'PKR 3500/session',
    image: 'https://i.pravatar.cc/150?img=66',
    lat: 31.5497,
    lng: 74.3436,
  },
  {
    id: '11',
    name: 'Dr. Fatima Noor',
    specialization: 'Marriage Counseling',
    location: 'Islamabad, Pakistan',
    price: 'PKR 4500/session',
    image: 'https://i.pravatar.cc/150?img=67',
    lat: 33.6844,
    lng: 73.0479,
  },
  {
    id: '12',
    name: 'Dr. Bilal Ahmed',
    specialization: 'Anxiety & Depression',
    location: 'Rawalpindi, Pakistan',
    price: 'PKR 3000/session',
    image: 'https://i.pravatar.cc/150?img=68',
    lat: 33.5651,
    lng: 73.0169,
  },
  {
    id: '13',
    name: 'Dr. Sana Tariq',
    specialization: 'Trauma Therapy',
    location: 'Peshawar, Pakistan',
    price: 'PKR 3200/session',
    image: 'https://i.pravatar.cc/150?img=69',
    lat: 34.0151,
    lng: 71.5249,
  },
  {
    id: '14',
    name: 'Dr. Usman Raza',
    specialization: 'Family Therapy',
    location: 'Multan, Pakistan',
    price: 'PKR 2800/session',
    image: 'https://i.pravatar.cc/150?img=70',
    lat: 30.1575,
    lng: 71.5249,
  },
  {
    id: '15',
    name: 'Dr. Hassan Malik',
    specialization: 'Stress Management',
    location: 'Sargodha, Pakistan',
    price: 'PKR 3000/session',
    image: 'https://i.pravatar.cc/150?img=71',
    lat: 32.0836,
    lng: 72.6711,
  },
  {
    id: '16',
    name: 'Dr. Zainab Ali',
    specialization: 'Depression & Mood Disorders',
    location: 'Faisalabad, Pakistan',
    price: 'PKR 3500/session',
    image: 'https://i.pravatar.cc/150?img=72',
    lat: 31.4504,
    lng: 73.1350,
  },
  {
    id: '17',
    name: 'Dr. Ahmed Rauf',
    specialization: 'Addiction Counseling',
    location: 'Gujranwala, Pakistan',
    price: 'PKR 3200/session',
    image: 'https://i.pravatar.cc/150?img=73',
    lat: 32.1617,
    lng: 74.1883,
  },
  {
    id: '18',
    name: 'Dr. Rabia Sheikh',
    specialization: 'Youth Counseling',
    location: 'Sialkot, Pakistan',
    price: 'PKR 2900/session',
    image: 'https://i.pravatar.cc/150?img=74',
    lat: 32.4972,
    lng: 74.5361,
  },
]

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

  // Convert therapist data to map locations
  const therapistLocations: TherapistLocation[] = useMemo(() => {
    return data
      .filter((t) => t.lat && t.lng)
      .map((t) => ({
        id: t.id,
        name: t.name,
        specialization: t.specialization,
        location: t.location,
        price: t.price,
        image: t.image,
        lat: t.lat!,
        lng: t.lng!,
      }))
  }, [data])

  const handleMapTherapistClick = (therapist: TherapistLocation) => {
    navigate('/profile', { state: therapist })
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

        {/* Google Map Section */}
        <section className={styles.mapSection}>
          <h2 className={styles.mapTitle}>Find Therapists Near You</h2>
          <p className={styles.mapDescription}>
            Explore therapist locations on the map. Click on a marker to view details.
          </p>
          <TherapistMap
            therapists={therapistLocations.length > 0 ? therapistLocations : sampleTherapists}
            onTherapistClick={handleMapTherapistClick}
          />
        </section>

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
