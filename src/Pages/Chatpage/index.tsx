/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useRef } from 'react'
import HeaderBar from '../../Components/Headbar'
import RingLoader from '../../Components/RingLoader'
import { useParams, useNavigate } from 'react-router-dom'
import { db, realtimeDB, auth } from '../../Share/FireBase'
import { doc, getDoc } from 'firebase/firestore'
import { ref, push, onValue, serverTimestamp, set } from 'firebase/database'
import { notifyError } from '../../Components/Toast'
import ToastNotification from '../../Components/Toast'
import { onAuthStateChanged } from 'firebase/auth'
import styles from './chat.module.css'

interface AppointmentData {
  id: string
  userPhone: string
  therapistName: string
  appointmentDate: string
  appointmentTime: string
  createdAt: {
    seconds: number
    nanoseconds: number
  }
  status: string
  therapistEmail: string
  therapistId: string
  therapistSpecialization: string
  userEmail: string
  userLocation: string
  userName: string
}

interface Message {
  id: string
  text: string
  senderId: string
  senderName: string
  timestamp: number
  role: 'user' | 'therapist' | 'coach'
}

export default function Chatpage() {
  const { appointmentId } = useParams()
  const navigate = useNavigate()
  const [appointmentData, setAppointmentData] = useState<AppointmentData | null>(null)
  const [appointmentLoading, setAppointmentLoading] = useState(true)
  const [chatLoading, setChatLoading] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [userRole, setUserRole] = useState<'user' | 'therapist' | 'coach'>('user')
  const messagesRef = useRef<HTMLDivElement>(null)

  // Get user data from localStorage
  const USER = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(() => {
    // Check authentication state
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        // If user is not authenticated, redirect to home page
        notifyError('You must be logged in to access this page')
        navigate('/')
        return
      }
    })

    return () => unsubscribe()
  }, [navigate])

  useEffect(() => {
    const fetchAppointmentData = async () => {
      try {
        if (!appointmentId) {
          notifyError('No appointment ID provided')
          return
        }

        const appointmentRef = doc(db, 'appointments', appointmentId)
        const appointmentSnap = await getDoc(appointmentRef)

        if (!appointmentSnap.exists()) {
          notifyError('Appointment not found')
          navigate('/')
          return
        }

        const data = { id: appointmentSnap.id, ...appointmentSnap.data() } as AppointmentData
        setAppointmentData(data)

        // Verify if the current user has access to this appointment
        if (USER.email !== data.userEmail && USER.email !== data.therapistEmail) {
          notifyError('You do not have access to this appointment')
          navigate('/')
          return
        }

        // Set user role based on localStorage data
        if (USER.role === 'therapist' || USER.role === 'coach') {
          setUserRole(USER.role)
        } else {
          setUserRole('user')
        }
      } catch (err) {
        notifyError(err instanceof Error ? err.message : 'Failed to fetch appointment data')
        navigate('/')
      } finally {
        setAppointmentLoading(false)
      }
    }

    if (USER.email) {
      fetchAppointmentData()
    }
  }, [appointmentId])

  useEffect(() => {
    if (!appointmentId || !USER.email) return

    const chatRef = ref(realtimeDB, `chats/${appointmentId}/messages`)
    const unsubscribe = onValue(chatRef, (snapshot) => {
      const messagesData = snapshot.val()
      if (messagesData) {
        const messagesList = Object.entries(messagesData).map(([id, data]: [string, any]) => ({
          id,
          ...data,
        }))
        setMessages(messagesList.sort((a, b) => a.timestamp - b.timestamp))
        setTimeout(() => {
          scrollToBottom()
        }, 500)
      }
      setChatLoading(false)
    })

    return () => {
      unsubscribe()
    }
  }, [appointmentId])

  const scrollToBottom = () => {
    messagesRef.current?.scrollTo({
      top: messagesRef.current?.scrollHeight,
      behavior: 'smooth',
    })
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !appointmentId || !USER.email || !appointmentData) {
      notifyError('Unable to send message. Please try again.', 1000)
      return
    }

    try {
      const chatRef = ref(realtimeDB, `chats/${appointmentId}/messages`)
      const newMessageRef = push(chatRef)

      await set(newMessageRef, {
        text: newMessage.trim(),
        senderId: USER.email,
        senderName: USER.name,
        timestamp: serverTimestamp(),
        role: userRole,
      })

      setNewMessage('')
    } catch (error) {
      notifyError('Failed to send message. Please try again.', 1000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const getStatusClassName = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return styles.statusPending
      case 'accepted':
        return styles.statusCompleted
      case 'completed':
        return styles.statusCompleted
      case 'rejected':
        return styles.statusCancelled
      default:
        return styles.statusPending
    }
  }

  return (
    <div>
      <HeaderBar heading="Chat" />
      <ToastNotification />
      <div className={styles.container}>
        {appointmentLoading ? (
          <div className={styles.loadingContainer}>
            <RingLoader size={50} color="#007AFF" />
            <p>Loading appointment details...</p>
          </div>
        ) : (
          appointmentData && (
            <>
              <div className={styles.appointmentCard}>
                <h2 className={styles.cardTitle}>Appointment Details</h2>
                <div className={styles.infoGrid}>
                  <div className={styles.infoSection}>
                    <div className={styles.infoItem}>
                      <span className={styles.label}>Patient</span>
                      <span className={styles.value}>{appointmentData.userName}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.label}>Phone</span>
                      <span className={styles.value}>{appointmentData.userPhone}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.label}>Email</span>
                      <span className={styles.value}>{appointmentData.userEmail}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.label}>Location</span>
                      <span className={styles.value}>{appointmentData.userLocation}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.label}>Date</span>
                      <span className={styles.value}>{appointmentData.appointmentDate}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.label}>Time</span>
                      <span className={styles.value}>{appointmentData.appointmentTime}</span>
                    </div>
                  </div>
                  <div className={styles.infoSection}>
                    <div className={styles.infoItem}>
                      <span className={styles.label}>Therapist</span>
                      <span className={styles.value}>{appointmentData.therapistName}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.label}>Specialization</span>
                      <span className={styles.value}>{appointmentData.therapistSpecialization}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.label}>Status</span>
                      <span className={`${styles.status} ${getStatusClassName(appointmentData.status)}`}>
                        {appointmentData.status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.chatContainer}>
                {chatLoading ? (
                  <div className={styles.loadingContainer}>
                    <RingLoader size={40} color="#007AFF" />
                    <p>Loading messages...</p>
                  </div>
                ) : (
                  <>
                    <div ref={messagesRef} className={styles.messagesContainer}>
                      {messages.map((message) => {
                        const isOwnMessage = message.senderId === USER.email
                        return (
                          <div
                            key={message.id}
                            className={`${styles.messageItem} ${
                              isOwnMessage ? styles.messageOwn : styles.messageOther
                            }`}
                          >
                            {!isOwnMessage && <span className={styles.messageSender}>{message.senderName}</span>}
                            <div className={styles.messageContent}>{message.text}</div>
                            <span className={styles.messageTime}>
                              {message.timestamp ? new Date(message.timestamp).toLocaleTimeString() : ''}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                    <div className={styles.inputContainer}>
                      <textarea
                        className={styles.messageInput}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message..."
                        rows={1}
                      />
                      <button className={styles.sendButton} onClick={handleSendMessage} disabled={!newMessage.trim()}>
                        Send
                      </button>
                    </div>
                  </>
                )}
              </div>
            </>
          )
        )}
      </div>
    </div>
  )
}
