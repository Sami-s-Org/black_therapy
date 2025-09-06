import React, { useEffect, useState } from 'react'
import styles from './joinCoach.module.css'
import HeaderBar from '../../Components/Headbar'
import { doc, setDoc } from 'firebase/firestore'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { Timestamp } from 'firebase/firestore'
import { HiOutlineUpload } from 'react-icons/hi'
import { notifyError, notifySuccess } from '../../Components/Toast'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../Share/FireBase'

export default function JoinAsACoach() {
  const storage = getStorage()
  const [imageFileName, setImageFileName] = useState<string | null>(null)
  const [imageUploading, setImageUploading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const [coachData, setCoachData] = useState({
    name: '',
    specialization: '',
    location: '',
    price: '',
    bio: '',
    email: '',
    phone: '',
    password: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setCoachData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    setCoachData((prevData) => ({
      ...prevData,
      bio: value,
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFileName(file.name)
      const storageRef = ref(storage, `coaches/${file.name}`)
      const blob = new Blob([file], { type: file.type })
      const uploadTask = uploadBytesResumable(storageRef, blob)

      uploadTask.on(
        'state_changed',
        () => {
          setImageUploading(true)
        },
        () => {
          notifyError('Image upload error')
          setImageUploading(false)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setPreviewImage(downloadURL)
            setImageUploading(false)
          })
        }
      )
    }
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, coachData.email, coachData.password)
      const userId = userCredential.user.uid

      // Add Therapist to Firestore
      await setDoc(doc(db, 'coaches', userId), {
        ...coachData,
        userId,
        imageUrl: previewImage || '',
        createdAt: Timestamp.now(),
        accepted: false,
      })

      // Add Auth Data to 'users' collection
      await setDoc(doc(db, 'users', userId), {
        name: coachData.name,
        email: coachData.email,
        phone: coachData.phone,
        role: 'coach',
        createdAt: Timestamp.now(),
      })

      notifySuccess('Coach added successfully!')
      setModalOpen(false)
      window.location.reload()
    } catch (error) {
      notifyError('Error saving coach data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <HeaderBar heading="Join As A Coach" />
      <div className={styles.container}>
        <h1 className={styles.heroTitle}>Empower. Inspire. Transform Lives.</h1>
        <p className={styles.intro}>
          Black men and boys deserve guidance, encouragement, and actionable strategies to help them thrive. Too often,
          they face barriers to success, mental well-being, and personal growth. You can be the coach who makes a
          difference.
        </p>
        <p className={styles.bodyText}>
          At Therapy for Black Men, we are building a movement one that empowers Black men to step into their full
          potential, cultivate resilience, and redefine success on their own terms.
        </p>

        <h2 className={styles.sectionTitle}>Why Your Role Matters</h2>
        <ul className={styles.bulletList}>
          <li>
            70% of Black professionals report feeling isolated in their careers due to lack of mentorship and guidance.
          </li>
          <li>Financial literacy and personal growth resources remain scarce in many Black communities.</li>
          <li>
            Mental health and success go hand in hand when Black men have access to coaching, they are better equipped
            to thrive in all areas of life.
          </li>
        </ul>

        <h2 className={styles.sectionTitle}>Why Join Us?</h2>
        <ul className={styles.checkList}>
          <li>
            A Personalized, Editable Profile – Showcase your coaching philosophy, specializations, and expertise to
            connect with potential clients.
          </li>
          <li>
            Direct Client Engagement – Get discovered by Black men actively seeking guidance, mentorship, and personal
            development strategies.
          </li>
          <li>
            Increased Visibility – Feature your coaching services on our website, social media, and marketing campaigns,
            amplifying your influence.
          </li>
          <li>
            Exclusive Community & Networking – Join a powerful network of Black coaches, therapists, and leaders
            dedicated to empowering Black men.
          </li>
        </ul>

        <h2 className={styles.sectionTitle}>Who Can Join?</h2>
        <p className={styles.bodyText}>
          We welcome certified coaches, life strategists, executive coaches, and wellness coaches who are passionate
          about supporting Black men.
        </p>

        <h2 className={styles.sectionTitle}>Membership Details</h2>
        <p className={styles.highlight}>Join for Just $20/Month</p>
        <ul className={styles.bulletList}>
          <li>A customizable profile that allows potential clients to find and book you.</li>
          <li>Access to marketing support, social media promotion, and community events.</li>
          <li>
            Opportunities to contribute workshops, articles, and coaching programs that support Black men’s growth.
          </li>
        </ul>

        <h2 className={styles.sectionTitle}>Your Impact Starts Here</h2>
        <p className={styles.bodyText}>
          Every coaching session you lead is an opportunity to ignite change, inspire growth, and create breakthroughs.
        </p>

        <div className={styles.joinButtonWrapper}>
          <button className={styles.joinButton} onClick={() => setModalOpen(true)}>
            Join Us Today
          </button>
        </div>
      </div>

      {modalOpen && (
        <div className={styles.modalBackdrop}>
          <div className={styles.modal}>
            <h2
              style={{
                marginBottom: '16px',
                fontWeight: '400',
                fontSize: '32px',
              }}
            >
              Join As A Coach
            </h2>
            <div className={styles.w100}>
              <input name="name" placeholder="Full Name" value={coachData.name} onChange={handleInputChange} />
            </div>
            <div className={styles.Flxx}>
              <div className={styles.w50}>
                <select name="specialization" value={coachData.specialization} onChange={handleInputChange} required>
                  <option value="">Select Specialization</option>
                  <option value="Coach">Coach</option>
                </select>
              </div>
              <div className={styles.w50}>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={coachData.password}
                  onChange={handleInputChange}
                  required
                />{' '}
              </div>
            </div>

            <div className={styles.Flxx}>
              <div className={styles.w50}>
                <input
                  name="phone"
                  placeholder="Phone Number"
                  value={coachData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.w50}>
                <input
                  name="email"
                  placeholder="Email Address"
                  value={coachData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className={styles.Flxx}>
              <div className={styles.w50}>
                <input name="location" placeholder="Location" value={coachData.location} onChange={handleInputChange} />
              </div>
              <div className={styles.w50}>
                <input name="price" placeholder="Price" value={coachData.price} onChange={handleInputChange} />
              </div>
            </div>

            <label htmlFor="fileInput" className={styles.uploadBox}>
              {previewImage ? (
                <img src={previewImage} alt="Preview" className={styles.preview} />
              ) : (
                <div className={styles.uploadContent}>
                  <HiOutlineUpload className={styles.UploadIcon} />
                  <p>Click to upload image</p>
                  {imageUploading && <p className={styles.uploadingText}>Uploading image...</p>}
                </div>
              )}
              <input
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={styles.hiddenInput}
              />
            </label>

            {imageFileName && <p className={styles.fileName}>Uploaded: {imageFileName}</p>}

            <textarea
              name="bio"
              placeholder="Professional Bio (Your approach, experience, etc."
              value={coachData.bio}
              onChange={handleBioChange}
            ></textarea>

            <div className={styles.modalButtons}>
              <button className={styles.saveBtn} onClick={() => setModalOpen(false)}>
                Cancel
              </button>
              <button onClick={handleSave} className={styles.saveBtn}>
                {loading ? 'Loading...' : 'Submit'}{' '}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
