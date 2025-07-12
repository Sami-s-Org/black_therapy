import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../Share/FireBase'
import styles from '../admin.module.css'

interface TherapyApplication {
  id: string
  fullName?: string
  email?: string
  phone?: string
  contactMethod?: string[]
  ageGroup?: string[]
  therapyPreference?: string[]
  reasons?: string[]
  financial?: string[]
  submittedAt?: any
}

export default function AdminFreeTheapy() {
  const [freeTherapyData, setFreeTherapyData] = useState<TherapyApplication[]>([])

  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, 'freeTherapy'))
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      setFreeTherapyData(data)
    }
    fetchData()
  }, [])

  const filteredData = freeTherapyData.filter((item) => item.fullName?.toLowerCase().includes(searchTerm.toLowerCase()))

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className={styles.w100}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>📋 Admin Panel - Free Therapy Applications</h1>

        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Search applicants..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
            style={{ padding: '8px', width: '300px', borderRadius: '8px', border: '1px solid #ccc' }}
          />
        </div>

        <div className={styles.cardGrid}>
          {paginatedData.map((item) => (
            <div key={item.id} style={{ background: 'white' }} className={styles.card}>
              <h3 className={styles.cardTitle}>{item.fullName}</h3>
              <p>
                <strong>Email:</strong> {item.email}
              </p>
              <p>
                <strong>Phone:</strong> {item.phone || 'N/A'}
              </p>
              <p>
                <strong>Preferred Contact:</strong> {item.contactMethod?.join(', ')}
              </p>
              <p>
                <strong>Age Group:</strong> {item.ageGroup?.join(', ')}
              </p>
              <p>
                <strong>Reason:</strong> {item.reasons?.join(', ')}
              </p>
              <p>
                <strong>Financial Need:</strong> {item.financial?.join(', ')}
              </p>
              <p>
                <strong>Submitted At:</strong> {item.submittedAt?.toDate().toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        <div className={styles.PaginationContainer}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={styles.PaginationBtn}
          >
            ⬅ Prev
          </button>

          <span className={styles.PaginationText}>
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={styles.PaginationBtn}
          >
            Next ➡
          </button>
        </div>
      </div>
    </div>
  )
}
