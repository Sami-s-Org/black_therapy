import { useEffect, useState, useRef } from 'react'
import HeaderBar from '../../Components/Headbar'
import styles from './myprofile.module.css'
import { auth, db, storage } from '../../Share/FireBase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential, sendEmailVerification } from 'firebase/auth'
import { notifyError, notifySuccess } from '../../Components/Toast'
import {
  FiUser,
  FiBriefcase,
  FiLock,
  FiMail,
  FiKey,
  FiCamera,
  FiSave,
  FiLoader,
  FiChevronUp,
  FiChevronDown,
  FiPhone,
} from 'react-icons/fi'
import { MdLocationOn, MdAttachMoney } from 'react-icons/md'
import { BsPencilSquare } from 'react-icons/bs'
import RingLoader from '../../Components/RingLoader'

export default function MyProfile() {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    currentPassword: '',
    role: '',
    location: '',
    price: '',
    bio: '',
    imageUrl: '',
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [needsReauth, setNeedsReauth] = useState(false)
  const [originalEmail, setOriginalEmail] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  // New state for managing sections
  const [openSections, setOpenSections] = useState({
    basicInfo: true,
    professionalInfo: false,
    security: false,
  })
  const [isEditingPassword, setIsEditingPassword] = useState(false)
  const [isEditingEmail, setIsEditingEmail] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const fetchUserData = async () => {
    setIsLoading(true)
    const user = auth.currentUser
    // console.log('user', user)
    if (user) {
      let therapistCoachData: any = {}
      const userRef = doc(db, 'users', user.uid)
      const userSnap = await getDoc(userRef)
      if (userSnap.exists()) {
        const data = userSnap.data()
        // console.log('data', data)
        if (data.role === 'therapist') {
          const therapistCoachRef = doc(db, 'therapists', user.uid)
          const therapistCoachSnap = await getDoc(therapistCoachRef)
          if (therapistCoachSnap.exists()) {
            therapistCoachData = therapistCoachSnap.data()
          }
        }
        if (data.role === 'coach') {
          const coachRef = doc(db, 'coaches', user.uid)
          const coachSnap = await getDoc(coachRef)
          if (coachSnap.exists()) {
            therapistCoachData = coachSnap.data()
          }
        }
        setUserData({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          role: data.role || 'user',
          location: therapistCoachData.location || '',
          price: therapistCoachData.price || '',
          bio: therapistCoachData.bio || '',
          imageUrl: therapistCoachData.imageUrl || data.imageUrl || '',
          password: '',
          confirmPassword: '',
          currentPassword: '',
        })
        setOriginalEmail(data.email || '')
        setImageFile(null)
      }
    }
    setIsLoading(false)
  }

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserData()
      }
    })
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0])
      setUserData((prev) => ({
        ...prev,
        imageUrl: URL.createObjectURL(e.target.files![0]),
      }))
    }
  }

  const handleReauthenticate = async () => {
    const { currentPassword } = userData
    const user = auth.currentUser

    if (!user || !user.email) {
      notifyError('No authenticated user found')
      return false
    }

    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword)
      await reauthenticateWithCredential(user, credential)
      setNeedsReauth(false)
      return true
    } catch (error: any) {
      notifyError('Reauthentication failed: ' + (error.message || error))
      return false
    }
  }

  const handleSave = async () => {
    const { name, email, phone, password, confirmPassword, role, location, price, bio } = userData

    if (!name || !email || !phone) {
      notifyError('Name, Email and Phone cannot be empty')
      return
    }

    if (password && password !== confirmPassword) {
      notifyError('Passwords do not match')
      return
    }

    try {
      setLoading(true)
      const user = auth.currentUser
      if (!user) {
        notifyError('No authenticated user found')
        setLoading(false)
        return
      }

      const changingEmail = email !== originalEmail
      const changingPassword = password && confirmPassword && password === confirmPassword

      if ((changingEmail || changingPassword) && !needsReauth) {
        setNeedsReauth(true)
        notifyError('Please enter your current password to confirm changes')
        setLoading(false)
        return
      }

      if (needsReauth) {
        const reauthSuccess = await handleReauthenticate()
        if (!reauthSuccess) {
          setLoading(false)
          return
        }
      }

      // Basic user data that goes to 'users' collection
      const userRef = doc(db, 'users', user.uid)
      const basicUserData: Record<string, any> = {
        name,
        phone,
      }

      // Only include email if it's being changed
      if (changingEmail) {
        basicUserData.email = email
      }

      // Update user document
      await updateDoc(userRef, basicUserData)

      // Handle role-specific data
      if (role === 'therapist' || role === 'coach') {
        const collectionName = role === 'therapist' ? 'therapists' : 'coaches'
        const roleRef = doc(db, collectionName, user.uid)

        // Professional data with proper typing
        const professionalData: {
          location: string
          price: string
          bio: string
          phone: string
          name: string
          imageUrl?: string
        } = {
          location,
          price,
          bio,
          phone,
          name,
        }

        // Handle image upload if there's a new image
        if (imageFile) {
          const imageRef = ref(storage, `${collectionName}Images/${user.uid}`)
          await uploadBytes(imageRef, imageFile)
          const url = await getDownloadURL(imageRef)
          professionalData.imageUrl = url
        }

        // Update professional document
        await updateDoc(roleRef, professionalData)
      }

      // Handle password change
      if (changingPassword) {
        try {
          await updatePassword(user, password)
          notifySuccess('Password updated successfully')
        } catch (error: any) {
          notifyError('Failed to update password: ' + (error.message || error))
          throw error
        }
      }

      // Handle email verification if email changed
      if (changingEmail) {
        try {
          await sendEmailVerification(user)
          notifySuccess('Verification email sent to your new address. Please verify it.')
        } catch (error: any) {
          notifyError('Failed to send verification email: ' + (error.message || error))
        }
      }

      notifySuccess('Profile updated successfully')
      await fetchUserData() // Refresh the data
      setNeedsReauth(false)
      setIsEditingEmail(false)
      setIsEditingPassword(false)
    } catch (error: any) {
      console.error('Error updating profile:', error)
      notifyError('Failed to update profile: ' + (error.message || error))
    } finally {
      setLoading(false)
    }
  }

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const startPasswordChange = () => {
    setIsEditingPassword(true)
    setOpenSections((prev) => ({ ...prev, security: true }))
  }

  const startEmailChange = () => {
    setIsEditingEmail(true)
    setOpenSections((prev) => ({ ...prev, security: true }))
  }

  const cancelPasswordChange = () => {
    setIsEditingPassword(false)
    setUserData((prev) => ({
      ...prev,
      password: '',
      confirmPassword: '',
      currentPassword: '',
    }))
    setNeedsReauth(false)
  }

  const cancelEmailChange = () => {
    setIsEditingEmail(false)
    setUserData((prev) => ({
      ...prev,
      email: originalEmail,
      currentPassword: '',
    }))
    setNeedsReauth(false)
  }

  const handleImageContainerClick = () => {
    fileInputRef.current?.click()
  }

  const isValidImageUrl = (url: string) => {
    if (!url) return false
    // Basic URL validation
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  return (
    <div className={styles.pageWrapper}>
      <HeaderBar heading="My Profile" />

      {isLoading ? (
        <div className={styles.loadingContainer}>
          <p className={styles.heading}>Loading profile...</p>
          <RingLoader size={700} color="#a88757" />
        </div>
      ) : (
        <div className={styles.outermain}>
          <h1 className={styles.heading}>Update Profile</h1>
          <div className={styles.Containter}>
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              {/* Basic Information Section */}
              <div className={styles.sectionCard}>
                <div className={styles.sectionHeader} onClick={() => toggleSection('basicInfo')}>
                  <div className={styles.sectionTitle}>
                    <FiUser className={styles.sectionIcon} />
                    Basic Information
                  </div>
                  {openSections.basicInfo ? (
                    <FiChevronUp className={styles.sectionIcon} />
                  ) : (
                    <FiChevronDown className={styles.sectionIcon} />
                  )}
                </div>
                {openSections.basicInfo && (
                  <div className={styles.sectionContent}>
                    <div className={styles.imageUpload}>
                      <div
                        className={styles.imagePreviewContainer}
                        onClick={handleImageContainerClick}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault()
                            handleImageContainerClick()
                          }
                        }}
                        aria-label="Click to change profile picture"
                      >
                        {isValidImageUrl(userData.imageUrl) ? (
                          <img src={userData.imageUrl} alt="Profile" className={styles.imagePreview} />
                        ) : (
                          <FiUser className={styles.defaultAvatar} />
                        )}
                        <div className={styles.imageOverlay}>
                          <FiCamera className={styles.cameraIcon} />
                        </div>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        id="profile-image"
                        accept="image/*"
                        onChange={handleImageChange}
                        className={styles.hiddenInput}
                        tabIndex={-1}
                        aria-hidden="true"
                      />
                    </div>
                    <div className={styles.inputGroup}>
                      <label>
                        <FiUser className={styles.inputIcon} />
                        Full Name
                      </label>
                      <div className={styles.inputWithIcon}>
                        <input
                          type="text"
                          name="name"
                          value={userData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                    </div>
                    <div className={styles.inputGroup}>
                      <label>
                        <FiPhone className={styles.inputIcon} />
                        Phone Number
                      </label>
                      <div className={styles.inputWithIcon}>
                        <input
                          type="tel"
                          name="phone"
                          value={userData.phone}
                          onChange={handleChange}
                          placeholder="Enter your phone number"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Professional Information Section */}
              {userData.role !== 'user' && (
                <div className={styles.sectionCard}>
                  <div className={styles.sectionHeader} onClick={() => toggleSection('professionalInfo')}>
                    <div className={styles.sectionTitle}>
                      <FiBriefcase className={styles.sectionIcon} />
                      Professional Information
                    </div>
                    {openSections.professionalInfo ? (
                      <FiChevronUp className={styles.sectionIcon} />
                    ) : (
                      <FiChevronDown className={styles.sectionIcon} />
                    )}
                  </div>
                  {openSections.professionalInfo && (
                    <div className={styles.sectionContent}>
                      <div className={styles.inputGroup}>
                        <label>
                          <MdLocationOn className={styles.inputIcon} />
                          Location
                        </label>
                        <div className={styles.inputWithIcon}>
                          <input
                            type="text"
                            name="location"
                            value={userData.location}
                            onChange={handleChange}
                            placeholder="Enter your location"
                          />
                        </div>
                      </div>
                      <div className={styles.inputGroup}>
                        <label>
                          <MdAttachMoney className={styles.inputIcon} />
                          Price
                        </label>
                        <div className={styles.inputWithIcon}>
                          <input
                            type="text"
                            name="price"
                            value={userData.price}
                            onChange={handleChange}
                            placeholder="Enter your rate"
                          />
                        </div>
                      </div>
                      <div className={styles.inputGroup}>
                        <label>
                          <BsPencilSquare className={styles.inputIcon} />
                          Professional Bio
                        </label>
                        <textarea
                          name="bio"
                          value={userData.bio}
                          onChange={handleChange}
                          placeholder="Tell us about your professional experience..."
                          rows={4}
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Security Section */}
              <div className={styles.sectionCard}>
                <div className={styles.sectionHeader} onClick={() => toggleSection('security')}>
                  <div className={styles.sectionTitle}>
                    <FiLock className={styles.sectionIcon} />
                    Security Settings
                  </div>
                  {openSections.security ? (
                    <FiChevronUp className={styles.sectionIcon} />
                  ) : (
                    <FiChevronDown className={styles.sectionIcon} />
                  )}
                </div>
                {openSections.security && (
                  <div className={styles.sectionContent}>
                    <div className={styles.inputGroup}>
                      <label>Email Address</label>
                      {isEditingEmail ? (
                        <>
                          <div className={styles.inputWithIcon}>
                            <input
                              type="email"
                              name="email"
                              value={userData.email}
                              onChange={handleChange}
                              placeholder="Enter new email address"
                              required
                            />
                          </div>
                          <button type="button" className={styles.actionButton} onClick={cancelEmailChange}>
                            Cancel
                          </button>
                        </>
                      ) : (
                        <div className={styles.emailDisplay}>
                          <span className={styles.emailText}>
                            <FiMail className={styles.inputIcon} />
                            {userData.email}
                          </span>
                          <button type="button" className={styles.actionButton} onClick={startEmailChange}>
                            <FiMail className={styles.buttonIcon} />
                            Change Email
                          </button>
                        </div>
                      )}
                    </div>

                    <div className={styles.inputGroup}>
                      {!isEditingPassword ? (
                        <button type="button" className={styles.actionButton} onClick={startPasswordChange}>
                          <FiKey className={styles.buttonIcon} />
                          Change Password
                        </button>
                      ) : (
                        <>
                          <label>New Password</label>
                          <div className={styles.inputWithIcon}>
                            <input
                              type="password"
                              name="password"
                              value={userData.password}
                              onChange={handleChange}
                              placeholder="Enter new password"
                            />
                          </div>
                          <label>Confirm New Password</label>
                          <div className={styles.inputWithIcon}>
                            <input
                              type="password"
                              name="confirmPassword"
                              value={userData.confirmPassword}
                              onChange={handleChange}
                              placeholder="Confirm new password"
                            />
                          </div>
                          <button type="button" className={styles.actionButton} onClick={cancelPasswordChange}>
                            Cancel Password Change
                          </button>
                        </>
                      )}
                    </div>

                    {(needsReauth || isEditingEmail || isEditingPassword) && (
                      <div className={styles.inputGroup}>
                        <label>Current Password</label>
                        <div className={styles.inputWithIcon}>
                          <input
                            type="password"
                            name="currentPassword"
                            value={userData.currentPassword}
                            onChange={handleChange}
                            placeholder="Enter current password to confirm changes"
                            required
                          />
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                <button type="button" onClick={handleSave} className={styles.saveBtn} disabled={loading}>
                  {loading ? (
                    <>
                      <span>Updating...</span>
                      <FiLoader className={`${styles.buttonIcon} ${styles.spin}`} />
                    </>
                  ) : (
                    <>
                      <span>Save Changes</span>
                      <FiSave className={styles.buttonIcon} />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
