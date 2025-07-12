import { useEffect, useState, useRef } from 'react'
import HeaderBar from '../../Components/Headbar'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../Share/FireBase'
import styles from './appointmentlist.module.css'
import {
  FaLongArrowAltLeft,
  FaLongArrowAltRight,
  FaSearch,
  FaEllipsisV,
  FaCheck,
  FaTimes,
  FaComments,
} from 'react-icons/fa'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ref, onValue } from 'firebase/database'
import { realtimeDB } from '../../Share/FireBase'

type Appointment = {
  id: string
  userName?: string
  therapistName?: string
  appointmentDate?: string
  appointmentTime?: string
  userPhone?: string
  userEmail?: string
  therapistEmail?: string
  status?: string
}

const USER = JSON.parse(localStorage.getItem('user') || '{}')

const getStatusColor = (status: string = '') => {
  switch (status.toLowerCase()) {
    case 'accepted':
      return '#3B82F6' // Blue for accepted
    case 'completed':
      return '#10B981' // Green for completed
    case 'rejected':
      return '#EF4444' // Red for rejected
    case 'pending':
      return '#F59E0B' // Orange for pending
    default:
      return '#6B7280' // Gray for unknown status
  }
}

const formatDate = (dateStr?: string) => {
  if (!dateStr) return 'N/A'
  try {
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  } catch (error) {
    return dateStr
  }
}

const formatTime = (timeStr?: string) => {
  if (!timeStr) return 'N/A'
  try {
    const [hours, minutes] = timeStr.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const hour12 = hour % 12 || 12
    return `${hour12}:${minutes} ${ampm}`
  } catch (error) {
    return timeStr
  }
}

interface AppointmentRowProps {
  appointment: Appointment
  userRole: string
  onStatusUpdate?: (appointmentId: string, newStatus: string) => Promise<void>
}

const AppointmentRow = ({ appointment, userRole, onStatusUpdate }: AppointmentRowProps) => {
  const [showActions, setShowActions] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowActions(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleAction = async (status: string) => {
    if (onStatusUpdate) {
      await onStatusUpdate(appointment.id, status)
      setShowActions(false)
    }
  }

  const menuVariants: Variants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.15,
        ease: 'easeInOut',
      },
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: 'easeOut',
      },
    },
  }

  const isActionDisabled = (action: string) => {
    const status = appointment.status?.toLowerCase()
    if (action === 'accept') return status === 'accepted' || status === 'completed' || status === 'rejected'
    if (action === 'complete') return status === 'completed' || status === 'rejected' || status !== 'accepted'
    if (action === 'reject') return status === 'rejected' || status === 'completed'
    return false
  }

  return (
    <tr key={appointment.id}>
      <td style={{ color: '#131313' }}>{userRole === 'user' ? appointment.therapistName : appointment.userName}</td>
      <td style={{ color: '#131313' }}>{formatDate(appointment.appointmentDate)}</td>
      <td style={{ color: '#131313' }}>{formatTime(appointment.appointmentTime)}</td>
      <td>
        <span
          className={styles.statusBadge}
          style={{
            backgroundColor: getStatusColor(appointment.status),
          }}
        >
          {appointment.status || 'Pending'}
        </span>
      </td>
      {['therapist', 'coach'].includes(userRole) && (
        <td className={styles.actionCell}>
          <div className={styles.actionMenuContainer} ref={menuRef}>
            <button
              className={styles.actionButton}
              onClick={(e) => {
                e.stopPropagation()
                setShowActions(!showActions)
              }}
              aria-label="Toggle actions menu"
            >
              <FaEllipsisV />
            </button>
            <AnimatePresence>
              {showActions && (
                <motion.div
                  className={styles.actionMenu}
                  variants={menuVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <Link to={`/chat/${appointment.id}`} className={`${styles.actionMenuItem} ${styles.accept}`}>
                    <FaComments /> Chat
                  </Link>
                  <button
                    className={`${styles.actionMenuItem} ${styles.accept}`}
                    onClick={() => handleAction('accepted')}
                    disabled={isActionDisabled('accept')}
                  >
                    <FaCheck /> Accept
                  </button>
                  <button
                    className={`${styles.actionMenuItem} ${styles.complete}`}
                    onClick={() => handleAction('completed')}
                    disabled={isActionDisabled('complete')}
                  >
                    <FaCheck /> Complete
                  </button>
                  <button
                    className={`${styles.actionMenuItem} ${styles.reject}`}
                    onClick={() => handleAction('rejected')}
                    disabled={isActionDisabled('reject')}
                  >
                    <FaTimes /> Reject
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </td>
      )}
    </tr>
  )
}

interface AppointmentTableProps {
  appointments: Appointment[]
  userRole: string
  onStatusUpdate?: (appointmentId: string, newStatus: string) => Promise<void>
}

const UserAppointmentTable = ({ appointments }: AppointmentTableProps) => {
  const [chatInitiated, setChatInitiated] = useState<{ [key: string]: boolean }>({})

  useEffect(() => {
    // Check if chat is initiated for each appointment
    appointments.forEach((appointment) => {
      const chatRef = ref(realtimeDB, `chats/${appointment.id}/messages`)
      onValue(chatRef, (snapshot) => {
        const hasMessages = snapshot.exists()
        setChatInitiated((prev) => ({
          ...prev,
          [appointment.id]: hasMessages,
        }))
      })
    })
  }, [appointments])

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Therapist/Coach</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td style={{ color: '#131313' }}>{appointment.therapistName}</td>
              <td style={{ color: '#131313' }}>{formatDate(appointment.appointmentDate)}</td>
              <td style={{ color: '#131313' }}>{formatTime(appointment.appointmentTime)}</td>
              <td>
                <span
                  className={styles.statusBadge}
                  style={{
                    backgroundColor: getStatusColor(appointment.status),
                  }}
                >
                  {appointment.status || 'Pending'}
                </span>
              </td>
              <td className={styles.actionCell}>
                <div className={styles.actionMenuContainer}>
                  {chatInitiated[appointment.id] && (
                    <Link
                      to={`/chat/${appointment.id}`}
                      className={`${styles.actionButton} ${styles.accept}`}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
                    >
                      <FaComments />
                    </Link>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const TherapistAppointmentTable = ({ appointments, userRole, onStatusUpdate }: AppointmentTableProps) => (
  <div className={styles.tableWrapper}>
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Client Name</th>
          <th>Date</th>
          <th>Time</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {appointments.map((appointment) => (
          <AppointmentRow
            key={appointment.id}
            appointment={appointment}
            userRole={userRole}
            onStatusUpdate={onStatusUpdate}
          />
        ))}
      </tbody>
    </table>
  </div>
)

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => (
  <div className={styles.PaginationContainer}>
    <button
      onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
      disabled={currentPage === 1}
      className={`${styles.PaginationBtn} ${currentPage === 1 ? styles.DisabledBtn : ''}`}
    >
      <FaLongArrowAltLeft /> Previous
    </button>

    <span className={styles.PaginationText}>
      Page {currentPage} of {totalPages}
    </span>

    <button
      onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
      disabled={currentPage === totalPages}
      className={`${styles.PaginationBtn} ${currentPage === totalPages ? styles.DisabledBtn : ''}`}
    >
      Next <FaLongArrowAltRight />
    </button>
  </div>
)

export default function AppointmentList() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredAppointments, setFilteredAppointments] = useState<Appointment[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const itemsPerPage = 5

  const handleStatusUpdate = async (appointmentId: string, newStatus: string) => {
    try {
      const appointmentRef = doc(db, 'appointments', appointmentId)
      await updateDoc(appointmentRef, {
        status: newStatus,
      })

      // Update local state
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment.id === appointmentId ? { ...appointment, status: newStatus } : appointment
        )
      )
    } catch (error) {
      console.error('Error updating appointment status:', error)
    }
  }

  useEffect(() => {
    const auth = getAuth()
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // console.log('USER', USER)
      if (user && user.email && USER.role === 'user') {
        try {
          const q = query(collection(db, 'appointments'), where('userEmail', '==', USER.email))
          const snapshot = await getDocs(q)
          const fetchedAppointments: Appointment[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Appointment, 'id'>),
          }))
          // console.log('fetchedAppointments', fetchedAppointments)
          setAppointments(fetchedAppointments)
          setIsLoading(false)
        } catch (error) {
          console.error('Error fetching appointments:', error)
          setIsLoading(false)
        }
      } else if (user && user.email && ['therapist', 'coach'].includes(USER.role)) {
        try {
          const q = query(collection(db, 'appointments'), where('therapistEmail', '==', USER.email))
          const snapshot = await getDocs(q)
          const fetchedAppointments: Appointment[] = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Appointment, 'id'>),
          }))
          // console.log('fetchedAppointments', fetchedAppointments)
          setAppointments(fetchedAppointments)
          setIsLoading(false)
        } catch (error) {
          console.error('Error fetching appointments:', error)
          setIsLoading(false)
        }
      } else {
        setAppointments([])
        setIsLoading(false)
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
    // console.log('filtered', filtered)
    setFilteredAppointments(filtered)
    setCurrentPage(1)
  }, [searchTerm, appointments])

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredAppointments.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage)

  return (
    <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <HeaderBar heading="Appointments" />
      <div className={styles.container}>
        <div className={styles.searchContainer}>
          <div className={styles.searchWrapper}>
            <FaSearch className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search appointments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        {isLoading ? (
          <div className={styles.loadingContainer}>
            <div className={styles.loadingSpinner}></div>
            <p>Loading appointments...</p>
          </div>
        ) : currentItems.length > 0 ? (
          <>
            {USER.role === 'user' ? (
              <UserAppointmentTable appointments={currentItems} userRole={USER.role} />
            ) : (
              <TherapistAppointmentTable
                appointments={currentItems}
                userRole={USER.role}
                onStatusUpdate={handleStatusUpdate}
              />
            )}
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          </>
        ) : (
          <div className={styles.noData}>
            <p className={styles.noDataText}>No appointments found</p>
          </div>
        )}
      </div>
    </div>
  )
}
