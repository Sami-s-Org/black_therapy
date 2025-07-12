import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../Share/FireBase'
import styles from '../admin.module.css'

interface Subscriber {
  id: string
  email: string
  subscribedAt: {
    seconds: number
    nanoseconds: number
    toDate: () => Date
  }
}

export default function AdminNewLetterlist() {
  const [data, setData] = useState<Subscriber[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  useEffect(() => {
    const fetchSubscribers = async () => {
      const snapshot = await getDocs(collection(db, 'subscribers'))
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Subscriber[]
      setData(docs)
    }
    fetchSubscribers()
  }, [])

  const filteredData = data.filter((item) => item.email.toLowerCase().includes(searchTerm.toLowerCase()))

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className={styles.w100}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>📬 Admin Panel - Subscribers</h1>
        <div className={styles.TableOuter}>
          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Search by email..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
                setCurrentPage(1)
              }}
              style={{
                padding: '8px',
                width: '300px',
                borderRadius: '8px',
                border: '1px solid #ccc',
              }}
            />
          </div>

          <table className={styles.table}>
            <thead>
              <tr>
                <th>Email</th>
                <th>Subscribed At</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item) => (
                <tr key={item.id}>
                  <td>{item.email}</td>
                  <td>{new Date(item.subscribedAt.seconds * 1000).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

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
    </div>
  )
}
