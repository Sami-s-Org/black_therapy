import React, { useState, useEffect } from 'react'
import styles from './joinasaTherapist.module.css'
import HeaderBar from '../../Components/Headbar'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { Timestamp, doc, setDoc } from 'firebase/firestore'
import { getFirestore } from 'firebase/firestore'
import { HiOutlineUpload } from 'react-icons/hi'
import { notifyError, notifySuccess } from '../../Components/Toast'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../Share/FireBase'

export default function JoinAsATherapist() {
  const storage = getStorage()
  const db = getFirestore()

  const [imageFileName, setImageFileName] = useState<string | null>(null)
  const [imageUploading, setImageUploading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const [therapistData, setTherapistData] = useState({
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
    setTherapistData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleBioChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    setTherapistData((prevData) => ({
      ...prevData,
      bio: value,
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFileName(file.name)
      const storageRef = ref(storage, `therapists/${file.name}`)
      const blob = new Blob([file], { type: file.type })
      const uploadTask = uploadBytesResumable(storageRef, blob)

      uploadTask.on(
        'state_changed',
        () => setImageUploading(true),
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
      // ✅ Create Auth User
      const userCredential = await createUserWithEmailAndPassword(auth, therapistData.email, therapistData.password)
      const userId = userCredential.user.uid

      // ✅ Add Therapist to Firestore
      await setDoc(doc(db, 'therapists', userId), {
        ...therapistData,
        userId,
        imageUrl: previewImage || '',
        createdAt: Timestamp.now(),
        accepted: false,
      })

      // ✅ Add Auth Data to 'users' collection
      await setDoc(doc(db, 'users', userId), {
        name: therapistData.name,
        email: therapistData.email,
        phone: therapistData.phone,
        role: 'therapist',
        createdAt: Timestamp.now(),
      })

      notifySuccess('Therapist application submitted successfully!')
      setModalOpen(false)

      // ✅ Reset form
      setTherapistData({
        name: '',
        specialization: '',
        location: '',
        price: '',
        bio: '',
        email: '',
        phone: '',
        password: '',
      })
      setPreviewImage(null)
      setImageFileName(null)
      window.location.reload()
    } catch (error: any) {
      console.error(error)
      notifyError(error.message || 'Error saving therapist data')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <HeaderBar heading="Join As A Therapist" />
      <div className={styles.container}>
        <h1 className={styles.heroTitle}>Heal Support Transform Lives.</h1>
        <p className={styles.intro}>
          Black men deserve culturally competent mental health support from professionals who understand their unique
          experiences. You can be the therapist who makes a difference.
        </p>
        <p className={styles.bodyText}>
          At Therapy for Black Men, we are building a network of therapists committed to providing accessible,
          culturally-sensitive mental health care to Black men.
        </p>

        <h2 className={styles.sectionTitle}>Why Your Role Matters</h2>
        <ul className={styles.bulletList}>
          <li>
            Only 4% of psychologists in the U.S. are Black, creating a significant gap in culturally competent care.
          </li>
          <li>
            60% of Black men who need mental health care don't seek it due to stigma or lack of access to Black
            therapists.
          </li>
          <li>
            When Black men have access to therapists who share their cultural background, treatment outcomes improve
            significantly.
          </li>
        </ul>

        <h2 className={styles.sectionTitle}>Why Join Us?</h2>
        <ul className={styles.checkList}>
          <li>A Personalized Profile – Showcase your therapeutic approach, specializations, and expertise</li>
          <li>Direct Client Connections – Get discovered by Black men actively seeking mental health support</li>
          <li>Increased Visibility – Feature your practice on our platform and marketing materials</li>
          <li>Professional Community – Join a network of Black mental health professionals</li>
        </ul>

        <h2 className={styles.sectionTitle}>Who Can Join?</h2>
        <p className={styles.bodyText}>
          We welcome licensed therapists, psychologists, counselors, and social workers who are passionate about
          supporting Black men's mental health.
        </p>

        <h2 className={styles.sectionTitle}>Membership Details</h2>
        <p className={styles.highlight}>Join for Just $20/Month</p>
        <ul className={styles.bulletList}>
          <li>A customizable profile that allows potential clients to find and contact you</li>
          <li>Access to our therapist community and professional development resources</li>
          <li>Opportunities to contribute to workshops and mental health initiatives</li>
        </ul>

        <h2 className={styles.sectionTitle}>Your Impact Starts Here</h2>
        <p className={styles.bodyText}>
          Every session you provide is an opportunity to heal, empower, and transform lives.
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
            <h2 className={styles.modalTitle}>Join As A Therapist</h2>
            <div className={styles.Flxx}>
              <div className={styles.w100}>
                <input
                  name="name"
                  placeholder="Full Name"
                  value={therapistData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className={styles.Flxx}>
              <div className={styles.w50}>
                <select
                  name="specialization"
                  value={therapistData.specialization}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Specialization</option>
                  <option value="Therapist">Therapist</option>
                </select>
              </div>
              <div className={styles.w50}>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={therapistData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className={styles.Flxx}>
              <div className={styles.w50}>
                <input
                  name="phone"
                  placeholder="Phone Number"
                  value={therapistData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.w50}>
                <input
                  name="email"
                  placeholder="Email Address"
                  value={therapistData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className={styles.Flxx}>
              <div className={styles.w50}>
                <input
                  name="location"
                  placeholder="Location"
                  value={therapistData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.w50}>
                <input
                  name="price"
                  placeholder="Price"
                  value={therapistData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <label htmlFor="fileInput" className={styles.uploadBox}>
              {previewImage ? (
                <img src={previewImage} alt="Preview" className={styles.preview} />
              ) : (
                <div className={styles.uploadContent}>
                  <HiOutlineUpload className={styles.UploadIcon} />
                  <p>Click to upload profile photo</p>
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
              placeholder="Professional Bio (Your approach, experience, etc.)"
              value={therapistData.bio}
              onChange={handleBioChange}
              required
            ></textarea>

            <div className={styles.modalButtons}>
              <button className={styles.cancelBtn} onClick={() => setModalOpen(false)}>
                Cancel
              </button>
              <button onClick={handleSave} className={styles.saveBtn} disabled={loading}>
                {loading ? 'Loading...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
