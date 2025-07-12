import HeaderBar from '../../Components/Headbar'
import styles from './freetherapy.module.css'
import { motion } from 'framer-motion'
import { db } from '../../Share/FireBase'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import { useState } from 'react'
import { notifyError, notifySuccess } from '../../Components/Toast'

export default function FreeTherapy() {
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(false)
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      setFormData((prev: any) => {
        const existing = prev[name] || []
        return {
          ...prev,
          [name]: checked ? [...existing, value] : existing.filter((item: any) => item !== value),
        }
      })
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true)

    try {
      await addDoc(collection(db, 'freeTherapy'), {
        ...formData,
        submittedAt: Timestamp.now(),
      })
      notifySuccess('Application submitted successfully!')

      setFormData({})
      e.target.reset()
    } catch (error) {
      console.error('Error submitting application:', error)
      notifyError('Something went wrong. Please try again.')
    }

    setLoading(false)
  }

  return (
    <div style={{ backgroundColor: '#f9fafb' }}>
      <HeaderBar heading="Free Therapy" />
      <h1 className={styles.title}>Apply for Free Therapy Help</h1>
      <div className={styles.wrapper}>
        <motion.div
          className={styles.container}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className={styles.subtitle}>
            We see you. We hear you. We're here for you. Therapy for Black Men is committed to ensuring that financial
            barriers don’t prevent you from getting the support you deserve. Please take a moment to answer a few
            questions so we can connect you with the right therapist.
          </p>

          <form className={styles.form} onSubmit={handleSubmit}>
            <h2 className={styles.heading}>1. Basic Information</h2>
            <input
              className={styles.input}
              type="text"
              name="fullName"
              placeholder="Full Name"
              required
              onChange={handleChange}
            />
            <input
              className={styles.input}
              type="email"
              name="email"
              placeholder="Email Address"
              required
              onChange={handleChange}
            />
            <input
              className={styles.input}
              type="tel"
              name="phone"
              placeholder="Phone Number (Optional)"
              onChange={handleChange}
            />
            <label style={{ marginTop: '24px' }} className={styles.label}>
              Preferred Contact Method:
            </label>
            <div className={styles.checkboxGroup}>
              <label>
                <input type="checkbox" name="contactMethod" value="Email" onChange={handleChange} /> Email
              </label>
              <label>
                <input type="checkbox" name="contactMethod" value="Phone" onChange={handleChange} /> Phone
              </label>
              <label>
                <input type="checkbox" name="contactMethod" value="Text" onChange={handleChange} /> Text
              </label>
            </div>

            <h2 className={styles.heading}>2. Age Group</h2>
            <div className={styles.checkboxGroup}>
              <label>
                <input type="checkbox" name="ageGroup" value="Under 18" onChange={handleChange} /> Under 18
              </label>
              <label>
                <input type="checkbox" name="ageGroup" value="18–24" onChange={handleChange} /> 18–24
              </label>
              <label>
                <input type="checkbox" name="ageGroup" value="25–34" onChange={handleChange} /> 25–34
              </label>
              <label>
                <input type="checkbox" name="ageGroup" value="35–44" onChange={handleChange} /> 35–44
              </label>
              <label>
                <input type="checkbox" name="ageGroup" value="45–54" onChange={handleChange} /> 45–54
              </label>
              <label>
                <input type="checkbox" name="ageGroup" value="55+" onChange={handleChange} /> 55+
              </label>
            </div>

            <h2 className={styles.heading}>3. How Would You Like to Receive Therapy?</h2>
            <div className={styles.checkboxGroup}>
              <label>
                <input type="checkbox" name="therapyType" value="Virtual" onChange={handleChange} /> Virtual (Online
                Sessions)
              </label>
              <label>
                <input type="checkbox" name="therapyType" value="In-Person" onChange={handleChange} /> In-Person (If
                available in your area)
              </label>
              <label>
                <input type="checkbox" name="therapyType" value="No Preference" onChange={handleChange} /> No Preference
              </label>
            </div>

            <h2 className={styles.heading}>4. What Brings You to Therapy?</h2>
            <div className={styles.checkboxGroup}>
              <label>
                <input type="checkbox" name="reasons" value="Anxiety or Stress" onChange={handleChange} /> Anxiety or
                Stress
              </label>
              <label>
                <input type="checkbox" name="reasons" value="Depression" onChange={handleChange} /> Depression or Mood
                Concerns
              </label>
              <label>
                <input type="checkbox" name="reasons" value="Relationship Challenges" onChange={handleChange} />{' '}
                Relationship Challenges
              </label>
              <label>
                <input type="checkbox" name="reasons" value="Family Issues" onChange={handleChange} /> Family Issues
              </label>
              <label>
                <input type="checkbox" name="reasons" value="Grief" onChange={handleChange} /> Grief & Loss
              </label>
              <label>
                <input type="checkbox" name="reasons" value="Trauma" onChange={handleChange} /> Trauma or PTSD
              </label>
              <label>
                <input type="checkbox" name="reasons" value="Racial Identity" onChange={handleChange} /> Racial Identity
                & Cultural Issues
              </label>
              <label>
                <input type="checkbox" name="reasons" value="Self-Esteem" onChange={handleChange} /> Personal Growth &
                Self-Esteem
              </label>
              <label>
                <input type="checkbox" name="reasons" value="Career" onChange={handleChange} /> Career or Life
                Transitions
              </label>
              <label>
                <input type="checkbox" name="reasons" value="Other" onChange={handleChange} /> Other (Please describe
                briefly)
              </label>
              <input
                className={styles.input}
                type="text"
                name="otherReason"
                placeholder="Other (Optional)"
                onChange={handleChange}
              />
            </div>

            <h2 className={styles.heading}>5. Have You Ever Attended Therapy Before?</h2>
            <div className={styles.checkboxGroup}>
              <label>
                <input type="checkbox" name="attended" value="Yes" onChange={handleChange} /> Yes
              </label>
              <label>
                <input type="checkbox" name="attended" value="No" onChange={handleChange} /> No
              </label>
            </div>

            <h2 className={styles.heading}>6. Therapist Preference</h2>
            <div className={styles.checkboxGroup}>
              <label>
                <input type="checkbox" name="therapistType" value="Male" onChange={handleChange} /> Male Therapist
              </label>
              <label>
                <input type="checkbox" name="therapistType" value="Female" onChange={handleChange} /> Female Therapist
              </label>
              <label>
                <input type="checkbox" name="therapistType" value="No Preference" onChange={handleChange} /> No
                Preference
              </label>
            </div>

            <h2 className={styles.heading}>7. Financial Need Confirmation</h2>
            <div className={styles.checkboxGroup}>
              <label>
                <input type="checkbox" name="financial" value="Hardship" onChange={handleChange} /> I am experiencing
                financial hardship and cannot afford therapy at this time.
              </label>
            </div>

            <h2 className={styles.heading}>8. Anything Else You’d Like Us to Know?</h2>
            <textarea
              className={styles.textarea}
              name="extraDetails"
              placeholder="Write your message (optional)"
              onChange={handleChange}
            />

            <h2 className={styles.heading}>9. Agreement & Consent</h2>
            <div className={styles.checkboxGroup}>
              <label>
                <input type="checkbox" name="consent" value="Availability" required onChange={handleChange} /> I
                understand that free therapy sessions are subject to availability.
              </label>
              <label>
                <input type="checkbox" name="consent" value="Contact Permission" required onChange={handleChange} /> I
                agree to be contacted regarding my application.
              </label>
            </div>

            <p className={styles.footerNote}>🖤 You are not alone. We are here for you.</p>

            <motion.button type="submit" className={styles.button}>
              {loading ? 'Loading....' : 'Submit Application'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
