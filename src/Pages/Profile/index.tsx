import React, { useEffect, useState } from 'react'
import styles from './profile.module.css'
import { useLocation } from 'react-router-dom'
import Modal from 'react-modal'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db, auth } from '../../Share/FireBase/index'
import emailjs from 'emailjs-com'
import { notifyError, notifySuccess } from '../../Components/Toast'
import RingLoader from '../../Components/RingLoader'
import HeaderBar from '../../Components/Headbar'
import avataar from '../../assets/download.jpeg'
import AuthModal from '../../Components/AuthModels'

Modal.setAppElement('#root')

export default function Profile() {
  const { state } = useLocation()

  useEffect(() => {
    if (state) {
      localStorage.setItem('myData', JSON.stringify(state))
    }
  }, [state])

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [isloading, setisLoading] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authModalType, setAuthModalType] = useState<'login' | 'register'>('login')
  const [user, setUser] = useState<any>(null)
  const [bookingIntent, setBookingIntent] = useState(false)

  const [appointmentData, setAppointmentData] = useState({
    userName: '',
    userEmail: '',
    userPhone: '',
    userLocation: '',
    therapistId: state?.id || '',
    therapistName: state?.name || '',
    therapistSpecialization: state?.specialization || '',
    therapistEmail: state?.email || '',
    appointmentDate: '',
    appointmentTime: '',
    status: 'pending',
    createdAt: null,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setAppointmentData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        const userData = JSON.parse(localStorage.getItem('user') || '{}')
        setUser(userData)
        setAppointmentData((prev) => ({
          ...prev,
          userName: userData?.name || '',
          userEmail: userData?.email || '',
          userPhone: userData?.phone || '',
          userLocation: userData?.location || '',
        }))
        if (bookingIntent) {
          setModalIsOpen(true)
          setBookingIntent(false)
        }
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleBookAppointment = () => {
    if (user) {
      setModalIsOpen(true)
    } else {
      setBookingIntent(true)
      setAuthModalType('login')
      setShowAuthModal(true)
    }
  }
  const prefillUserData = (firebaseUser: any) => {
    if (!firebaseUser) return

    const userData = JSON.parse(localStorage.getItem('user') || '{}')

    const name = userData?.name || firebaseUser.displayName || ''
    const email = firebaseUser.email || ''
    const phone = userData?.phone || ''
    const location = userData?.location || ''

    setUser({ name, email, phone, location })

    setAppointmentData((prev) => ({
      ...prev,
      userName: name,
      userEmail: email,
      userPhone: phone,
      userLocation: location,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setisLoading(true)

    try {
      const docRef = await addDoc(collection(db, 'appointments'), {
        ...appointmentData,
        createdAt: serverTimestamp(),
      })

      console.log('Document written with ID: ', docRef.id)
      sendAppointmentEmails(appointmentData)

      notifySuccess('Appointment booked successfully!')
      setModalIsOpen(false)
      resetForm()
    } catch (e) {
      console.error('Error adding document: ', e)
      notifyError('Error booking appointment. Please try again.')
    } finally {
      setisLoading(false)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  })
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        prefillUserData(firebaseUser)

        if (bookingIntent) {
          setModalIsOpen(true)
          setBookingIntent(false)
        }
      } else {
        setUser(null)
      }
    })
    return () => unsubscribe()
  }, [bookingIntent])

  const sendAppointmentEmails = (data: any) => {
    const userEmailTemplate = {
      user_name: data.userName,
      user_email: data.userEmail,
      appointment_date: data.appointmentDate,
      appointment_time: data.appointmentTime,
      therapist_name: data.therapistName,
      therapist_specialization: data.therapistSpecialization,
    }

    emailjs
      .send(
        'service_6gnuozm', // ✅ Your service ID
        'template_1sr1sk6', // ✅ New user template ID
        userEmailTemplate,
        'T1eJoCXb1R1bXkDjC' // ✅ Your EmailJS public key
      )
      .then((response) => {
        console.log('User email sent:', response.text)
      })
      .catch((error) => {
        console.error('Error sending user email:', error)
      })

    const professionalEmailTemplate = {
      professional_name: data.therapistName,
      professional_email: data.therapistEmail,
      user_name: data.userName,
      user_email: data.userEmail,
      appointment_date: data.appointmentDate,
      appointment_time: data.appointmentTime,
    }
    console.log('professionalEmailTemplate', professionalEmailTemplate)

    emailjs
      .send(
        'service_6gnuozm', // ✅ Your service ID
        'template_1sr1sk6', // ✅ New professional template ID
        professionalEmailTemplate,
        'T1eJoCXb1R1bXkDjC' // ✅ Your EmailJS public key
      )
      .then((response) => {
        console.log(' Email Sucessfully sent:', response.text)
        notifySuccess('Email Sucessfully sent')
      })
      .catch((error) => {
        console.error('Error sending professional email:', error)
        if (error?.text) {
          console.error('EmailJS error text:', error.text)
        }
        if (error?.status) {
          console.error('EmailJS status code:', error.status)
        }
        notifyError(`Error sending  email: ${error.text || error.message}`)
      })
  }

  const resetForm = () => {
    setAppointmentData({
      userName: user?.name || '',
      userEmail: user?.email || '',
      userPhone: user?.phone || '',
      userLocation: user?.location || '',
      therapistId: state?.id || '',
      therapistName: state?.name || '',
      therapistSpecialization: state?.specialization || '',
      therapistEmail: state?.email || '',
      appointmentDate: '',
      appointmentTime: '',
      status: 'pending',
      createdAt: null,
    })
  }

  return (
    <>
      <HeaderBar heading="Profile" />
      <div className={styles.container}>
        <div className={styles.card}>
          <img src={state?.image || avataar} alt="Coach Profile" className={styles.avatar} />
          <h2 style={{ textTransform: 'capitalize' }} className={styles.name}>
            {state?.name}
          </h2>
          <p className={styles.field}>
            <strong>Specialization:</strong> {state?.specialization}
          </p>
          <p className={styles.field}>
            <strong>Location:</strong> {state?.location}
          </p>
          <p className={styles.field}>
            <strong>Pricing:</strong> {state?.price}
          </p>
          <p className={styles.bio}>{state?.bio}</p>
          <button className={styles.buttonBook} onClick={handleBookAppointment}>
            {isloading ? <RingLoader size={20} color="#0000000" /> : '📅 Book Appointment'}
          </button>
        </div>

        {modalIsOpen && (
          <div className={styles.modalBackdrop}>
            <div className={styles.modal}>
              <form onSubmit={handleSubmit} className={styles.form}>
                <h2
                  style={{
                    marginBottom: '16px',
                    fontWeight: '400',
                    fontSize: '32px',
                  }}
                >
                  Book Appointment with {state?.name}
                </h2>

                <div className={styles.formGroup}>
                  <input
                    placeholder="Your Name"
                    type="text"
                    name="userName"
                    value={appointmentData.userName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <input
                    placeholder="Email"
                    type="email"
                    name="userEmail"
                    value={appointmentData.userEmail}
                    onChange={handleInputChange}
                    required
                    disabled
                  />
                </div>

                <div className={styles.formGroup}>
                  <input
                    placeholder="Phone Number"
                    type="tel"
                    name="userPhone"
                    value={appointmentData.userPhone}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <input
                    placeholder="Your Location"
                    type="text"
                    name="userLocation"
                    value={appointmentData.userLocation}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <input
                    type="date"
                    placeholder="Preferred Date"
                    name="appointmentDate"
                    value={appointmentData.appointmentDate}
                    onChange={handleInputChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className={styles.formGroup}>
                  <input
                    type="time"
                    placeholder="Preferred Time"
                    name="appointmentTime"
                    value={appointmentData.appointmentTime}
                    onChange={handleInputChange}
                    required
                    min={
                      appointmentData.appointmentDate === new Date().toISOString().split('T')[0]
                        ? new Date().toTimeString().split(' ')[0].slice(0, 5)
                        : undefined
                    }
                  />
                </div>

                <div className={styles.buttonGroup}>
                  <button type="button" onClick={() => setModalIsOpen(false)} className={styles.cancelButton}>
                    Cancel
                  </button>
                  <button type="submit" className={styles.submitButton}>
                    Confirm Appointment
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {showAuthModal && (
          <AuthModal
            type={authModalType}
            onClose={() => setShowAuthModal(false)}
            onSwitch={() => setAuthModalType((prev) => (prev === 'login' ? 'register' : 'login'))}
            onLoginSuccess={(userData) => {
              setShowAuthModal(false)
              setUser(userData)
              setAppointmentData((prev) => ({
                ...prev,
                userName: userData.name || '',
                userEmail: userData.email || '',
                userPhone: userData.phone || '',
              }))
              if (bookingIntent) {
                setModalIsOpen(true)
                setBookingIntent(false)
              }
            }}
          />
        )}
      </div>
    </>
  )
}
