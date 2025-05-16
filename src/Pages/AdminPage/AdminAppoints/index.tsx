import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../Share/FireBase'
import styles from '../admin.module.css'

interface Appointment {
  id: string
  userName: string
  userEmail: string
  userPhone: string
  userLocation: string
  coachName?: string
  coachSpecialization?: string
  therapistName?: string
  therapistSpecialization?: string
  appointmentDate: string
  appointmentTime: string
  therapistId: string
}

export default function AdminAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'appointments'))
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Appointment[]
        setAppointments(data)
        setFilteredAppointments(data)
      } catch (error) {
        console.error('Error fetching appointments:', error)
      }
    }

    fetchAppointments()
  }, [])

  useEffect(() => {
    const lowerTerm = searchTerm.toLowerCase()
    const filtered = appointments.filter((a) =>
      [a.userName, a.userEmail, a.userPhone, a.userLocation, a.coachName, a.therapistName]
        .filter(Boolean)
        .some((field) => field!.toLowerCase().includes(lowerTerm))
    )
    setFilteredAppointments(filtered)
    setCurrentPage(1)
  }, [searchTerm, appointments])

  const indexOfLast = currentPage * itemsPerPage
  const indexOfFirst = indexOfLast - itemsPerPage
  const currentItems = filteredAppointments.slice(indexOfFirst, indexOfLast)

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage)

  return (
    <div className={styles.w100}>
      <h1 className={styles.title}>📋 Admin Panel - Appointments</h1>
      <div className={styles.TableOuter}>
        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Search by name, email, phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: '8px',
              width: '300px',
              borderRadius: '8px',
              border: '1px solid #ccc',
            }}
          />
        </div>

        {currentItems.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          <>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>User Email</th>
                  <th>User Phone</th>
                  <th>User Location</th>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>{appointment.userName}</td>
                    <td>{appointment.userEmail}</td>
                    <td>{appointment.userPhone}</td>
                    <td>{appointment.userLocation}</td>
                    <td>{appointment.coachName || appointment.therapistName}</td>
                    <td>{appointment.coachSpecialization || appointment.therapistSpecialization}</td>
                    <td>{appointment.appointmentDate}</td>
                    <td>{appointment.appointmentTime}</td>
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
                className={styles.PaginationBtn}
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next ➡
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
