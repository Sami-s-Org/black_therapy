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
import LocationPicker from '../../Components/LocationPicker'

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

  const [coordinates, setCoordinates] = useState({ lat: 31.5497, lng: 74.3436 }) // Default: Lahore
  const [exactAddress, setExactAddress] = useState('')

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

  const handleLocationChange = (lat: number, lng: number, address: string) => {
    setCoordinates({ lat, lng })
    setExactAddress(address)
    // Also update the location field with the address
    setTherapistData(prev => ({ ...prev, location: address }))
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      // Validate coordinates
      if (coordinates.lat === 0 && coordinates.lng === 0) {
        notifyError('Please set your exact location on the map')
        setLoading(false)
        return
      }

      // ✅ Create Auth User
      const userCredential = await createUserWithEmailAndPassword(auth, therapistData.email, therapistData.password)
      const userId = userCredential.user.uid

      // ✅ Add Therapist to Firestore with EXACT coordinates
      await setDoc(doc(db, 'therapists', userId), {
        ...therapistData,
        userId,
        imageUrl: previewImage || '',
        lat: coordinates.lat,
        lng: coordinates.lng,
        exactAddress: exactAddress || therapistData.location,
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
      setCoordinates({ lat: 31.5497, lng: 74.3436 })
      setExactAddress('')
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

            {/* Profile Photo Upload */}
            <div className={styles.fieldContainer}>
              <label className={styles.fieldLabel}>📸 Profile Photo</label>
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
            </div>

            {/* Professional Bio */}
            <div className={styles.fieldContainer}>
              <label className={styles.fieldLabel} htmlFor="bio">📝 Professional Bio</label>
              <textarea
                id="bio"
                name="bio"
                placeholder="Tell us about your approach, experience, and what makes you unique as a therapist..."
                value={therapistData.bio}
                onChange={handleBioChange}
                required
              ></textarea>
            </div>

            {/* Location Picker */}
            <div className={styles.locationSection}>
              <h3 className={styles.locationTitle}>📍 Set Your Practice Location</h3>
              <LocationPicker
                initialLat={coordinates.lat}
                initialLng={coordinates.lng}
                onLocationChange={handleLocationChange}
                address={therapistData.location}
              />
            </div>

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
