import { useEffect, useState } from 'react'
import style from './dashboard.module.css'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../Share/FireBase'

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
  status: string
  therapistId: string
}

interface Therapist {
  id: string
  name: string
  specialization: string
  location: string
  bio: string
  imageUrl: string
}

interface Coach {
  id: string
  name: string
  specialization: string
  location: string
  bio: string
  imageUrl: string
}
export default function AdminDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [therapists, setTherapists] = useState<Therapist[]>([])
  const [coaches, setCoaches] = useState<Coach[]>([])
  const [_loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appointmentSnapshot = await getDocs(collection(db, 'appointments'))
        const appointmentData = appointmentSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Appointment[]

        const therapistSnapshot = await getDocs(collection(db, 'therapists'))
        const therapistData = therapistSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Therapist[]

        const coachSnapshot = await getDocs(collection(db, 'coaches'))
        const coachData = coachSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Coach[]

        setAppointments(appointmentData)
        setTherapists(therapistData)
        setCoaches(coachData)
      } catch (error) {
        console.error('Error fetching data: ', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>AdminDashboard</h1>
      <div className={style.Containers}>
        <div className={style.dashcard}>
          <p>Appointments</p>
          <h1>{appointments.length}</h1>
        </div>
        <div className={style.dashcard}>
          <p>Coaches</p>
          <h1>{coaches.length}</h1>
        </div>
        <div className={style.dashcard}>
          <p>Therapist</p>
          <h1>{therapists.length}</h1>
        </div>
        <div className={style.dashcard}>
          <p>Bloges</p>
          <h1>10</h1>
        </div>
      </div>
    </div>
  )
}
