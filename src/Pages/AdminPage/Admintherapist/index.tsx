import { useEffect, useState } from 'react'
import { collection, getDocs, deleteDoc, doc, updateDoc, addDoc } from 'firebase/firestore'
import { db } from '../../../Share/FireBase'
import styles from '../admin.module.css'
import RingLoader from '../../../Components/RingLoader'
import { notifyError, notifySuccess } from '../../../Components/Toast'
import { Avatar } from '@mui/material'
import Avatars from '../../../assets/download.jpeg'

interface Therapist {
  id: string
  name: string
  specialization: string
  location: string
  bio: string
  imageUrl: string
  accepted: boolean
}

export default function AdminTherapists() {
  const [therapists, setTherapists] = useState<Therapist[]>([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5
  const [_newTherapist, setNewTherapist] = useState<Therapist | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showAcceptModal, setShowAcceptModal] = useState(false)
  const [selectedTherapist, setSelectedTherapist] = useState<Therapist | null>(null)

  useEffect(() => {
    const fetchTherapists = async () => {
      try {
        setLoading(true)
        const snapshot = await getDocs(collection(db, 'therapists'))
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Therapist[]
        setTherapists(data)
      } catch (error) {
        console.error('Error fetching therapists:', error)
        notifyError('Failed to load therapists')
      } finally {
        setLoading(false)
      }
    }

    fetchTherapists()
  }, [])

  const handleDeleteTherapist = async (id: string) => {
    try {
      setLoading(true)
      await deleteDoc(doc(db, 'therapists', id))
      setTherapists((prev) => prev.filter((therapist) => therapist.id !== id))
      notifySuccess('Therapist deleted successfully!')
      setShowDeleteModal(false)
    } catch (error) {
      console.error('Error deleting therapist: ', error)
      notifyError('Error deleting therapist.')
    } finally {
      setLoading(false)
    }
  }

  const handleAcceptTherapist = async (id: string) => {
    try {
      setLoading(true)
      const therapistDocRef = doc(db, 'therapists', id)
      await updateDoc(therapistDocRef, { accepted: true })
      setTherapists((prev) =>
        prev.map((therapist) => (therapist.id === id ? { ...therapist, accepted: true } : therapist))
      )
      notifySuccess('Therapist accepted successfully!')
      setShowAcceptModal(false)
    } catch (error) {
      console.error('Error accepting therapist: ', error)
      notifyError('Error accepting therapist.')
    } finally {
      setLoading(false)
    }
  }

  // @ts-ignore
  const handleAddTherapist = async (newTherapistData: Therapist) => {
    try {
      setLoading(true)
      const docRef = await addDoc(collection(db, 'therapists'), newTherapistData)
      setTherapists((prev) => [...prev, { ...newTherapistData, id: docRef.id }])
      setNewTherapist(newTherapistData)
      notifySuccess('Therapist added successfully!')
    } catch (error) {
      console.error('Error adding therapist:', error)
      notifyError('Error adding therapist.')
    } finally {
      setLoading(false)
    }
  }

  const filteredTherapists = therapists.filter((therapist) =>
    `${therapist.name} ${therapist.specialization} ${therapist.location} ${therapist.bio}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  )

  const totalPages = Math.ceil(filteredTherapists.length / itemsPerPage)
  const paginatedTherapists = filteredTherapists.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const openDeleteModal = (therapist: Therapist) => {
    setSelectedTherapist(therapist)
    setShowDeleteModal(true)
  }

  const openAcceptModal = (therapist: Therapist) => {
    setSelectedTherapist(therapist)
    setShowAcceptModal(true)
  }

  return (
    <div className={styles.w100}>
      <h1 className={styles.title}>📋 Admin Panel - Therapists</h1>

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
            placeholder="Search therapists..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1)
            }}
          />
        </div>

        {loading && paginatedTherapists.length === 0 ? (
          <div className={styles.loadingContainer}>
            <div>
              <RingLoader color="#a88757" size="100px" />
            </div>
          </div>
        ) : paginatedTherapists.length === 0 ? (
          <p className={styles.noResults}>No therapists found.</p>
        ) : (
          <>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Profile</th>
                  <th>Name</th>
                  <th>Specialization</th>
                  <th>Location</th>
                  <th>Bio</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTherapists.map((therapist) => (
                  <tr key={therapist.id}>
                    <td>
                      <Avatar sizes="32px" src={therapist.imageUrl || Avatars} />
                    </td>
                    <td>{therapist.name}</td>
                    <td>{therapist.specialization}</td>
                    <td>{therapist.location}</td>
                    <td className={styles.bioCell}>{therapist.bio}</td>
                    <td>
                      {therapist.imageUrl ? (
                        <img src={therapist.imageUrl} alt={therapist.name} className={styles.therapistImage} />
                      ) : (
                        <span className={styles.noImage}>No image</span>
                      )}
                    </td>
                    <td className={styles.actionsCell}>
                      <button
                        onClick={() => openDeleteModal(therapist)}
                        className={styles.deleteButton}
                        disabled={loading}
                      >
                        Delete
                      </button>
                      {!therapist.accepted && (
                        <button
                          onClick={() => openAcceptModal(therapist)}
                          className={styles.acceptButton}
                          disabled={loading}
                        >
                          Accept
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className={styles.PaginationContainer}>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={styles.PaginationBtn}
              >
                ⬅ Prev
              </button>

              <span className={styles.pageInfo}>
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
                className={styles.PaginationBtn}
              >
                Next ➡
              </button>
            </div>
          </>
        )}
      </div>

      {showDeleteModal && selectedTherapist && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal2}>
            <h3 style={{ color: '#131313', textAlign: 'center' }}>Confirm Deletion</h3>
            <p style={{ color: '#131313', textAlign: 'center' }}>
              {' '}
              Are you sure you want to delete {selectedTherapist.name}?
            </p>
            <div style={{ marginTop: '24px' }} className={styles.modalButtons}>
              <button onClick={() => setShowDeleteModal(false)} className={styles.cancelButton}>
                Cancel
              </button>
              <button
                style={{ width: '180px' }}
                onClick={() => handleDeleteTherapist(selectedTherapist.id)}
                className={`${styles.confirmButton} ${styles.deleteConfirmButton}`}
                disabled={loading}
              >
                {loading ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showAcceptModal && selectedTherapist && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal2}>
            <h3 style={{ color: '#131313', textAlign: 'center' }}>Confirm Approval</h3>
            <p style={{ color: '#131313', textAlign: 'center' }}>
              Are you sure you want to approve {selectedTherapist.name}?
            </p>
            <div style={{ marginTop: '24px' }} className={styles.modalButtons}>
              <button onClick={() => setShowAcceptModal(false)} className={styles.cancelButton}>
                Cancel
              </button>
              <button
                onClick={() => handleAcceptTherapist(selectedTherapist.id)}
                className={styles.confirmButton}
                style={{ width: '180px' }}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Confirm Approval'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
