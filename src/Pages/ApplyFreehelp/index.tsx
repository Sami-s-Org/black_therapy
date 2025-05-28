import { useEffect } from 'react'
import styles from './freehlp.module.css'

export default function ApplyForFreeHelp() {
  useEffect(() => {
    window.scrollTo(0, 0)
  })
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🌿 Apply for Free Therapy Help</h1>
      <p className={styles.subtitle}>We see you. We hear you. We're here for you.</p>

      <form className={styles.form}>
        <input type="text" placeholder="Full Name" className={styles.input} />
        <input type="email" placeholder="Email Address" className={styles.input} />
        <input type="text" placeholder="Phone Number (Optional)" className={styles.input} />

        <select className={styles.input}>
          <option>Preferred Contact Method</option>
          <option>Email</option>
          <option>Phone</option>
          <option>Text</option>
        </select>

        <textarea placeholder="Anything else you'd like us to know?" className={styles.textarea}></textarea>

        <label className={styles.checkboxGroup}>
          <input type="checkbox" />
          <span>I agree to be contacted regarding my application.</span>
        </label>

        <button type="submit" className={styles.button}>
          Submit Application
        </button>
      </form>
    </div>
  )
}
