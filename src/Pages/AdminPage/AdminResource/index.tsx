import { useEffect, useState } from 'react'
import styles from '../admin.module.css'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../Share/FireBase'

interface ResourceSuggestion {
  name?: string
  email?: string
  resourceName: string
  website?: string
  categories: string[]
  description: string
  whyHelpful: string
}

export default function AdminResource() {
  const [resources, setResources] = useState<ResourceSuggestion[]>([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const itemsPerPage = 3

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const querySnapshot = await getDocs(collection(db, 'resourceSuggestions'))
        const data: ResourceSuggestion[] = []
        querySnapshot.forEach((doc) => {
          const d = doc.data()
          if (d.resourceName && d.description && Array.isArray(d.categories)) {
            data.push(d as ResourceSuggestion)
          }
        })
        setResources(data)
      } catch (error) {
        console.error('Error fetching resources:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filtered = resources.filter(
    (r) =>
      r.resourceName &&
      typeof r.resourceName === 'string' &&
      r.resourceName.toLowerCase().includes(search.trim().toLowerCase())
  )

  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage)

  return (
    <div className={styles.w100}>
      <h1 className={styles.title}>🗂️ Admin Panel - Resource Suggestions</h1>

      <div className={styles.TableOuter}>
        <input
          type="text"
          placeholder="Search by resource name..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
          style={{
            padding: '8px',
            width: '300px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            marginBottom: '20px',
          }}
        />

        <div className={styles.main}>
          {loading ? (
            <p>Loading...</p>
          ) : filtered.length === 0 ? (
            <p>No matching suggestions found.</p>
          ) : (
            <>
              <div className={styles.cards}>
                {paginated.map((item, idx) => (
                  <div key={idx} className={styles.card}>
                    <h3 className={styles.cardTitle}>{item.resourceName}</h3>

                    <div className={styles.actions} style={{ marginTop: '6px' }}>
                      <strong style={{ width: '40%' }}>Submitted by:</strong>
                      <p>{item.name || 'Anonymous'}</p>
                    </div>
                    <div className={styles.actions} style={{ marginTop: '6px' }}>
                      <strong style={{ width: '40%' }}>Email:</strong>
                      <p>{item.email || 'N/A'}</p>
                    </div>
                    <div className={styles.actions} style={{ marginTop: '6px' }}>
                      <strong style={{ width: '40%' }}>Website:</strong> <p>{item.website || 'N/A'}</p>
                    </div>
                    <div className={styles.actions} style={{ marginTop: '6px' }}>
                      <strong style={{ width: '40%' }}>Description:</strong> <p>{item.description}</p>
                    </div>
                    <div className={styles.actions} style={{ marginTop: '6px' }}>
                      <strong style={{ width: '40%' }}>Why Helpful: </strong>{' '}
                      <p style={{ width: '50%' }}>{item.whyHelpful}</p>
                    </div>
                    <p style={{ marginTop: '16px' }}>
                      <strong>Categories:</strong>
                    </p>
                    <ul>
                      {item.categories.map((cat, i) => (
                        <li key={i} className={styles.item}>
                          {cat}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className={styles.PaginationContainer}>
                <button
                  onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                  disabled={page === 1}
                  className={styles.PaginationBtn}
                >
                  ⬅ Prev
                </button>
                <span className={styles.PaginationText}>
                  Page {page} of {totalPages}
                </span>
                <button
                  className={styles.PaginationBtn}
                  onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={page === totalPages}
                >
                  Next ➡
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
