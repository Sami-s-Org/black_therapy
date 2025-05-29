import React, { useState } from 'react'
import styles from './model.module.css'
import { auth, db } from '../../Share/FireBase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'

type AuthModalProps = {
  closeModal: () => void
}

const AuthModal: React.FC<AuthModalProps> = ({ closeModal }) => {
  const [tab, setTab] = useState<'login' | 'signup'>('login')
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'therapist',
    city: '',
    state: '',
    specialty: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, form.email, form.password)
      alert('Login successful!')
      closeModal()
    } catch (err: unknown) {
      const error = err as { message: string }
      alert(error.message)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password)
      const uid = userCredential.user.uid

      const roleCollection = form.role === 'therapist' ? 'therapists' : 'coaches'

      await setDoc(doc(db, roleCollection, uid), {
        uid,
        name: form.name,
        email: form.email,
        role: form.role,
        city: form.city,
        state: form.state,
        specialty: form.specialty.split(',').map((item) => item.trim()),
        approved: false,
      })

      alert('Signup successful!')
      closeModal()
    } catch (err: unknown) {
      const error = err as { message: string }
      alert(error.message)
    }
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.close} onClick={closeModal}>
          ✖
        </button>

        <div className={styles.tabs}>
          <button className={tab === 'login' ? styles.active : ''} onClick={() => setTab('login')}>
            Login
          </button>
          <button className={tab === 'signup' ? styles.active : ''} onClick={() => setTab('signup')}>
            Sign Up
          </button>
        </div>

        {tab === 'login' ? (
          <form onSubmit={handleLogin} className={styles.form}>
            <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
            <button type="submit" className={styles.button}>
              Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignup} className={styles.form}>
            <input type="text" name="name" placeholder="Full Name" required onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" required onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" required onChange={handleChange} />
            <select name="role" onChange={handleChange}>
              <option value="therapist">Therapist</option>
              <option value="coach">Coach</option>
            </select>
            <input type="text" name="city" placeholder="City" onChange={handleChange} />
            <input type="text" name="state" placeholder="State" onChange={handleChange} />
            <input type="text" name="specialty" placeholder="Specialties (comma separated)" onChange={handleChange} />
            <button type="submit" className={styles.button}>
              Sign Up
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default AuthModal
