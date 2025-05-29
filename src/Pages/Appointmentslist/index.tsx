import { useEffect, useState } from 'react'
import HeaderBar from '../../Components/Headbar'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { collection, query, where, getDocs } from 'firebase/firestore'
import { db } from '../../Share/FireBase'
import styles from './appointmentlist.module.css'
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa'

type Appointment = {
  id: string
  name: string
  date: string
  time: string
  status: string
}

export default function AppointmentList() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('Logged in user:', user.uid)
        try {
          const q = query(collection(db, 'appointments'), where('userId', '==', user.uid))
          const snapshot = await getDocs(q)
          const fetchedAppointments: Appointment[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Appointment, 'id'>),
          }))
          setAppointments(fetchedAppointments)
        } catch (error) {
          console.error('Error fetching appointments:', error)
        }
      } else {
        setAppointments([])
        console.log('User not logged in')
      }
    })

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const filtered = appointments.filter((appointment) =>
      Object.values(appointment).some(
        (value) => typeof value === 'string' && value.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    setFilteredAppointments(filtered)
    setCurrentPage(1)
  }, [searchTerm, appointments])

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredAppointments.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage)
  console.log('currentItems............', currentItems)
  return (
    <div style={{ backgroundColor: '#f5f5f5' }}>
      <HeaderBar heading="Appointments" />
      <div className={styles.container}>
        <div style={{ display: 'flex', justifyContent: 'end' }}>
          <input
            type="text"
            placeholder="Search appointments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        {currentItems.length > 0 ? (
          <>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.date}</td>
                    <td>{item.time}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={styles.PaginationContainer}>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`${styles.PaginationBtn} ${currentPage === 1 ? styles.DisabledBtn : ''}`}
              >
                <FaLongArrowAltLeft /> Prev
              </button>

              <span className={styles.PaginationText}>
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`${styles.PaginationBtn} ${currentPage === totalPages ? styles.DisabledBtn : ''}`}
              >
                Next <FaLongArrowAltRight />
              </button>
            </div>
          </>
        ) : (
          <div className={styles.noData}>
            <p className={styles.noDataText}>No appointments found.</p>
          </div>
        )}
      </div>
    </div>
  )
}
