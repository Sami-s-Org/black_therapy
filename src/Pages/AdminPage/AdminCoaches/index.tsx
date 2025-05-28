import { useEffect, useState } from 'react'
import { collection, getDocs, deleteDoc, doc, updateDoc, addDoc } from 'firebase/firestore'
import { db } from '../../../Share/FireBase'
import styles from '../admin.module.css'
import { notifyError, notifySuccess } from '../../../Components/Toast'
import { Avatar } from '@mui/material'
import Avatars from '../../../assets/download.jpeg'

interface Coach {
  id: string
  name: string
  specialization: string
  location: string
  bio: string
  imageUrl: string
  accepted: boolean
}

export default function AdminCoaches() {
  const [coaches, setCoaches] = useState<Coach[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const [_newCoach, setNewCoach] = useState<Coach | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showAcceptModal, setShowAcceptModal] = useState(false)
  const [selectedCoach, setSelectedCoach] = useState<Coach | null>(null)

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'coaches'))
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Coach[]
        setCoaches(data)
      } catch (error) {
        console.error('Error fetching coaches:', error)
      }
    }

    fetchCoaches()
  }, [])

  const handleDeleteCoach = async (id: string) => {
    try {
      setLoading(true)
      await deleteDoc(doc(db, 'coaches', id))
      setCoaches((prev) => prev.filter((coach) => coach.id !== id))
      notifySuccess('Coach deleted successfully!')
      setShowDeleteModal(false)
    } catch (error) {
      console.error('Error deleting coach: ', error)
      notifyError('Error deleting coach.')
    } finally {
      setLoading(false)
    }
  }

  const handleAcceptCoach = async (id: string) => {
    try {
      setLoading(true)
      const coachDocRef = doc(db, 'coaches', id)
      await updateDoc(coachDocRef, { accepted: true })
      setCoaches((prev) => prev.map((coach) => (coach.id === id ? { ...coach, accepted: true } : coach)))
      notifySuccess('Coach accepted successfully!')
      setShowAcceptModal(false)
    } catch (error) {
      console.error('Error accepting coach: ', error)
      notifyError('Error accepting coach.')
    } finally {
      setLoading(false)
    }
  }

  // @ts-ignore
  const handleAddCoach = async (newCoachData: Coach) => {
    try {
      setLoading(true)
      const docRef = await addDoc(collection(db, 'coaches'), newCoachData)
      setCoaches((prev) => [...prev, { ...newCoachData, id: docRef.id }])
      setNewCoach(newCoachData)
      notifySuccess('Coach added successfully!')
    } catch (error) {
      console.error('Error adding coach:', error)
      notifyError('Error adding coach.')
    } finally {
      setLoading(false)
    }
  }

  const filteredCoaches = coaches.filter((coach) =>
    `${coach.name} ${coach.specialization} ${coach.location} ${coach.bio}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredCoaches.length / itemsPerPage)
  const paginatedCoaches = filteredCoaches.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  // @ts-ignore
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const openDeleteModal = (coach: Coach) => {
    setSelectedCoach(coach)
    setShowDeleteModal(true)
  }

  const openAcceptModal = (coach: Coach) => {
    setSelectedCoach(coach)
    setShowAcceptModal(true)
  }

  return (
    <div className={styles.w100}>
      <h1 className={styles.title}>📋 Admin Panel - Coaches</h1>

      <div className={styles.TableOuter}>
        <div className={styles.searchWrapper}>
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
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
          />
        </div>
        {paginatedCoaches.length === 0 ? (
          <p>No coaches found.</p>
        ) : (
          <>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Porfile</th>
                  <th>Name</th>
                  <th>Specialization</th>
                  <th>Location</th>
                  <th>Bio</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCoaches.map((coach) => (
                  <tr key={coach.id}>
                    <td>
                      <Avatar sizes="32px" src={coach.imageUrl || Avatars} />
                    </td>
                    <td>{coach.name}</td>
                    <td>{coach.specialization}</td>
                    <td>{coach.location}</td>
                    <td style={{ width: '20%' }}>{coach.bio}</td>
                    <td>
                      {coach.imageUrl ? (
                        <img src={coach.imageUrl} alt={coach.name} className={styles.coachImage} />
                      ) : (
                        'No image'
                      )}
                    </td>
                    <td>
                      <button onClick={() => openDeleteModal(coach)} className={styles.deleteButton}>
                        Delete
                      </button>

                      {!coach.accepted && (
                        <button onClick={() => openAcceptModal(coach)} className={styles.acceptButton}>
                          {loading ? 'Loading ..' : 'Accept'}
                        </button>
                      )}
                    </td>
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
          </>
        )}
      </div>

      {showDeleteModal && selectedCoach && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal2}>
            <h3 style={{ color: '#131313', textAlign: 'center' }}>Confirm Deletion</h3>
            <p style={{ color: '#131313', textAlign: 'center' }}>
              Are you sure you want to delete {selectedCoach.name}?
            </p>
            <div style={{ marginTop: '24px' }} className={styles.modalButtons}>
              <button onClick={() => setShowDeleteModal(false)} className={styles.cancelButton}>
                Cancel
              </button>
              <button
                style={{ width: '180px' }}
                onClick={() => handleDeleteCoach(selectedCoach.id)}
                className={styles.confirmButton}
              >
                {loading ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showAcceptModal && selectedCoach && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal2}>
            <h3 style={{ color: '#131313', textAlign: 'center' }}>Confirm Approval</h3>
            <p style={{ color: '#131313', textAlign: 'center' }}>
              Are you sure you want to approve {selectedCoach.name}?
            </p>
            <div style={{ marginTop: '24px' }} className={styles.modalButtons}>
              <button onClick={() => setShowAcceptModal(false)} className={styles.cancelButton}>
                Cancel
              </button>
              <button
                style={{ width: '180px' }}
                onClick={() => handleAcceptCoach(selectedCoach.id)}
                className={styles.confirmButton}
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
