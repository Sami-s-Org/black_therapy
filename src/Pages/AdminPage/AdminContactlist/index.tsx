import { useEffect, useState } from 'react'
import styles from '../admin.module.css'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../Share/FireBase'

export default function AdminContact() {
  const [contactData, setContactData] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, 'contact'))
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setContactData(data)
    }

    fetchData()
  }, [])

  const filteredData = contactData.filter((item) => item.name?.toLowerCase().includes(searchTerm.toLowerCase()))

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

  return (
    <div className={styles.w100}>
      {' '}
      <h1 className={styles.title}>📨 Admin Panel – Contact Messages</h1>
      <div className={styles.TableOuter}>
        <div className={styles.wrapper}>
          <div className={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Search by name..."
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
          <div className={styles.tableContainer}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Message</th>
                  <th>Submitted At</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name || '—'}</td>
                    <td>{item.email || '—'}</td>
                    <td>{item.message || '—'}</td>
                    <td>{item.submittedAt?.toDate ? item.submittedAt.toDate().toLocaleString() : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {paginatedData.length === 0 && <p style={{ padding: '1rem' }}>No results found.</p>}
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
    </div>
  )
}
