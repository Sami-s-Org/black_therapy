import HeaderBar from '../../Components/Headbar'
import styles from './freetherapy.module.css'
import { motion } from 'framer-motion'
import { db } from '../../Share/FireBase'
import { collection, addDoc, Timestamp } from 'firebase/firestore'
import React, { useState } from 'react'
import { notifyError, notifySuccess } from '../../Components/Toast'

const THERAPY_REASONS = [
  'Anxiety or Stress',
  'Depression or Mood Concerns',
  'Relationship Challenges',
  'Family Issues',
  'Grief & Loss',
  'Trauma or PTSD',
  'Racial Identity & Cultural Issues',
  'Personal Growth & Self-Esteem',
  'Career or Life Transitions',
  'Other',
]

const AGE_GROUPS = [
  { value: 'under-18', label: 'Under 18' },
  { value: '18-24', label: '18-24' },
  { value: '25-34', label: '25-34' },
  { value: '35-44', label: '35-44' },
  { value: '45-54', label: '45-54' },
  { value: '55+', label: '55+' },
]

interface FormData {
  fullName: string
  email: string
  phone: string
  ageGroup: string
  contactMethod: string
  therapyType: string
  therapistGender: string
  reasons: string[]
  previousTherapy: string
  urgencyLevel: string
  preferredTime: string
  additionalInfo: string
  financialHardship: boolean
  consent: boolean
}

export default function FreeTherapy() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    // Personal Info
    fullName: '',
    email: '',
    phone: '',
    ageGroup: '',

    // Preferences
    contactMethod: '',
    therapyType: '',
    therapistGender: '',

    // Therapy Details
    reasons: [],
    previousTherapy: '',
    urgencyLevel: '',
    preferredTime: '',

    // Additional Info
    additionalInfo: '',
    financialHardship: false,
    consent: false,
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<any>({})

  const validateStep = (step: number) => {
    const newErrors: any = {}

    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Name is required'
      if (!formData.email.trim()) newErrors.email = 'Email is required'
      if (!formData.ageGroup) newErrors.ageGroup = 'Age group is required'
    } else if (step === 2) {
      if (!formData.contactMethod) newErrors.contactMethod = 'Contact method is required'
      if (!formData.therapyType) newErrors.therapyType = 'Therapy type is required'
      if (!formData.therapistGender) newErrors.therapistGender = 'Therapist preference is required'
    } else if (step === 3) {
      if (formData.reasons.length === 0) newErrors.reasons = 'Please select at least one reason'
      if (!formData.previousTherapy) newErrors.previousTherapy = 'Please answer about previous therapy'
      if (!formData.urgencyLevel) newErrors.urgencyLevel = 'Please select urgency level'
    } else if (step === 4) {
      if (!formData.financialHardship) newErrors.financialHardship = 'Please confirm financial need'
      if (!formData.consent) newErrors.consent = 'Please agree to terms'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4))
    }
  }

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement

    if (type === 'checkbox' && name === 'reasons') {
      setFormData((prev: FormData) => ({
        ...prev,
        reasons: checked ? [...prev.reasons, value] : prev.reasons.filter((reason) => reason !== value),
      }))
    } else if (type === 'checkbox') {
      setFormData((prev: FormData) => ({ ...prev, [name]: checked }))
    } else {
      setFormData((prev: FormData) => ({ ...prev, [name]: value }))
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev: Record<string, string>) => ({ ...prev, [name]: '' }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep(4)) return

    setLoading(true)
    try {
      await addDoc(collection(db, 'freeTherapy'), {
        ...formData,
        submittedAt: Timestamp.now(),
        status: 'pending',
      })
      notifySuccess("Application submitted successfully! We'll contact you within 48 hours.")

      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        ageGroup: '',
        contactMethod: '',
        therapyType: '',
        therapistGender: '',
        reasons: [],
        previousTherapy: '',
        urgencyLevel: '',
        preferredTime: '',
        additionalInfo: '',
        financialHardship: false,
        consent: false,
      })
      setCurrentStep(1)
    } catch (error) {
      console.error('Error submitting application:', error)
      notifyError('Something went wrong. Please try again.')
    }
    setLoading(false)
  }

  const renderStepIndicator = () => (
    <div className={styles.stepIndicator}>
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className={`${styles.step} ${currentStep >= step ? styles.active : ''}`}>
          <span>{step}</span>
          {step < 4 && <div className={styles.connector} />}
        </div>
      ))}
    </div>
  )

  const renderStep1 = () => (
    <motion.div
      className={styles.stepContent}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className={styles.stepTitle}>Personal Information</h2>
      <p className={styles.stepDescription}>Let's start with some basic information about you.</p>

      <div className={styles.formGroup}>
        <label className={styles.label}>Full Name *</label>
        <input
          className={`${styles.input} ${errors.fullName ? styles.error : ''}`}
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="First & Last Name"
        />
        {errors.fullName && <span className={styles.errorText}>{errors.fullName}</span>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Email Address *</label>
        <input
          className={`${styles.input} ${errors.email ? styles.error : ''}`}
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="For confidential updates about your application"
        />
        {errors.email && <span className={styles.errorText}>{errors.email}</span>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Phone Number (Optional)</label>
        <input
          className={styles.input}
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="For scheduling assistance, if needed"
        />
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Age Group *</label>
        <div className={styles.radioGrid}>
          {AGE_GROUPS.map((age) => (
            <label key={age.value} className={styles.radioOption}>
              <input
                type="radio"
                name="ageGroup"
                value={age.value}
                checked={formData.ageGroup === age.value}
                onChange={handleChange}
              />
              <span className={styles.radioLabel} style={{ maxWidth: age.value === 'under-18' ? '300px' : 'auto' }}>
                {age.label}
                {age.value === 'under-18' && ' (If under 18, parent/guardian consent will be required.)'}
              </span>
            </label>
          ))}
        </div>
        {errors.ageGroup && <span className={styles.errorText}>{errors.ageGroup}</span>}
      </div>
    </motion.div>
  )

  const renderStep2 = () => (
    <motion.div
      className={styles.stepContent}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className={styles.stepTitle}>Preferences</h2>
      <p className={styles.stepDescription}>Help us understand how you'd like to receive therapy.</p>

      <div className={styles.formGroup}>
        <label className={styles.label}>Preferred Contact Method *</label>
        <div className={styles.radioRow}>
          {['Email', 'Phone', 'Text'].map((method) => (
            <label key={method} className={styles.radioOption}>
              <input
                type="radio"
                name="contactMethod"
                value={method}
                checked={formData.contactMethod === method}
                onChange={handleChange}
              />
              <span className={styles.radioLabel}>{method}</span>
            </label>
          ))}
        </div>
        {errors.contactMethod && <span className={styles.errorText}>{errors.contactMethod}</span>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Therapy Format *</label>
        <div className={styles.radioRow}>
          {[
            { value: 'Virtual', label: 'Virtual (Online Sessions)' },
            { value: 'In-Person', label: 'In-Person (If available in your area)' },
            { value: 'No Preference', label: 'No Preference' },
          ].map((type) => (
            <label key={type.value} className={styles.radioOption}>
              <input
                type="radio"
                name="therapyType"
                value={type.value}
                checked={formData.therapyType === type.value}
                onChange={handleChange}
              />
              <span className={styles.radioLabel}>{type.label}</span>
            </label>
          ))}
        </div>
        {errors.therapyType && <span className={styles.errorText}>{errors.therapyType}</span>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>What Type of Therapist Would You Feel Most Comfortable With? *</label>
        <p className={styles.helperText}>(Check any that apply, or leave blank if no preference)</p>
        <div className={styles.radioRow}>
          {[
            { value: 'Male', label: 'Male Therapist' },
            { value: 'Female', label: 'Female Therapist' },
            { value: 'No Preference', label: 'No Preference' },
          ].map((gender) => (
            <label key={gender.value} className={styles.radioOption}>
              <input
                type="radio"
                name="therapistGender"
                value={gender.value}
                checked={formData.therapistGender === gender.value}
                onChange={handleChange}
              />
              <span className={styles.radioLabel}>{gender.label}</span>
            </label>
          ))}
        </div>
        {errors.therapistGender && <span className={styles.errorText}>{errors.therapistGender}</span>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Preferred Session Time (Optional)</label>
        <select className={styles.input} name="preferredTime" value={formData.preferredTime} onChange={handleChange}>
          <option value="">Select a time preference</option>
          <option value="Morning">Morning (9 AM - 12 PM)</option>
          <option value="Afternoon">Afternoon (12 PM - 5 PM)</option>
          <option value="Evening">Evening (5 PM - 8 PM)</option>
          <option value="Flexible">Flexible</option>
        </select>
      </div>
    </motion.div>
  )

  const renderStep3 = () => (
    <motion.div
      className={styles.stepContent}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className={styles.stepTitle}>Therapy Details</h2>
      <p className={styles.stepDescription}>Tell us about your therapy needs and background.</p>

      <div className={styles.formGroup}>
        <label className={styles.label}>What brings you to therapy? (Select all that apply) *</label>
        <div className={styles.checkboxGrid}>
          {THERAPY_REASONS.map((reason) => (
            <label key={reason} className={styles.checkboxOption}>
              <input
                type="checkbox"
                name="reasons"
                value={reason}
                checked={formData.reasons.includes(reason)}
                onChange={handleChange}
              />
              <span className={styles.checkboxLabel}>{reason}</span>
            </label>
          ))}
        </div>
        {errors.reasons && <span className={styles.errorText}>{errors.reasons}</span>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Have you attended therapy before? *</label>
        <div className={styles.radioRow}>
          {['Yes', 'No'].map((option) => (
            <label key={option} className={styles.radioOption}>
              <input
                type="radio"
                name="previousTherapy"
                value={option}
                checked={formData.previousTherapy === option}
                onChange={handleChange}
              />
              <span className={styles.radioLabel}>{option}</span>
            </label>
          ))}
        </div>
        {errors.previousTherapy && <span className={styles.errorText}>{errors.previousTherapy}</span>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>How urgent is your need for therapy? *</label>
        <div className={styles.radioColumn}>
          {[
            { value: 'Immediate', label: 'Immediate - I need help right away' },
            { value: 'Soon', label: 'Soon - Within the next 2 weeks' },
            { value: 'Flexible', label: 'Flexible - I can wait for the right match' },
          ].map((urgency) => (
            <label key={urgency.value} className={styles.radioOption}>
              <input
                type="radio"
                name="urgencyLevel"
                value={urgency.value}
                checked={formData.urgencyLevel === urgency.value}
                onChange={handleChange}
              />
              <span className={styles.radioLabel}>{urgency.label}</span>
            </label>
          ))}
        </div>
        {errors.urgencyLevel && <span className={styles.errorText}>{errors.urgencyLevel}</span>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.label}>Additional Information (Optional)</label>
        <textarea
          className={styles.textarea}
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={handleChange}
          placeholder="Share anything else that might help us match you with the right therapist..."
          rows={4}
        />
      </div>
    </motion.div>
  )

  const renderStep4 = () => (
    <motion.div
      className={styles.stepContent}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className={styles.stepTitle}>Confirmation</h2>
      <p className={styles.stepDescription}>Please review and confirm your application.</p>

      <div className={styles.summaryCard}>
        <h3>Application Summary</h3>
        <div className={styles.summaryItem}>
          <strong>Name:</strong> {formData.fullName}
        </div>
        <div className={styles.summaryItem}>
          <strong>Email:</strong> {formData.email}
        </div>
        <div className={styles.summaryItem}>
          <strong>Age Group:</strong> {AGE_GROUPS.find((age) => age.value === formData.ageGroup)?.label}
        </div>
        <div className={styles.summaryItem}>
          <strong>Contact Preference:</strong> {formData.contactMethod}
        </div>
        <div className={styles.summaryItem}>
          <strong>Therapy Type:</strong> {formData.therapyType}
        </div>
        <div className={styles.summaryItem}>
          <strong>Therapist Preference:</strong> {formData.therapistGender}
        </div>
        <div className={styles.summaryItem}>
          <strong>Main Concerns:</strong> {formData.reasons.slice(0, 3).join(', ')}
          {formData.reasons.length > 3 && '...'}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label className={styles.checkboxOption}>
          <input
            type="checkbox"
            name="financialHardship"
            checked={formData.financialHardship}
            onChange={handleChange}
          />
          <span className={styles.checkboxLabel}>
            I am experiencing financial hardship and cannot afford therapy at this time. *
          </span>
        </label>
        {errors.financialHardship && <span className={styles.errorText}>{errors.financialHardship}</span>}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.checkboxOption}>
          <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} />
          <span className={styles.checkboxLabel}>
            I understand that free therapy sessions are subject to availability, and I will be matched based on the best
            available therapist for my needs. I agree to be contacted by Therapy for Black Men regarding my application
            and therapy options. *
          </span>
        </label>
        {errors.consent && <span className={styles.errorText}>{errors.consent}</span>}
      </div>

      <div className={styles.infoBox}>
        <h4>What happens next?</h4>
        <p>
          Once you submit your application, our team will carefully review it and follow up with you as soon as
          possible. Thank you for taking this step toward healing.
        </p>
        <ul>
          <li>We'll review your application within 48 hours</li>
          <li>You'll receive an email with next steps</li>
          <li>We'll match you with a qualified therapist</li>
          <li>Sessions are typically scheduled within 1-2 weeks</li>
        </ul>
      </div>
    </motion.div>
  )

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderStep1()
      case 2:
        return renderStep2()
      case 3:
        return renderStep3()
      case 4:
        return renderStep4()
      default:
        return renderStep1()
    }
  }

  return (
    <div className={styles.pageWrapper}>
      <HeaderBar heading="Free Therapy Application" />

      <div className={styles.hero}>
        <h1 className={styles.title}>Apply for Free Therapy Help</h1>
        <p className={styles.subtitle}>
          We see you. We hear you. We're here for you.
          <br />
          <span className={styles.highlight}>
            Therapy for Black Men is committed to ensuring that financial barriers don't prevent you from getting the
            support you deserve. Please take a moment to answer a few questions so we can connect you with the right
            therapist.
          </span>
        </p>
      </div>

      <div className={styles.wrapper}>
        <div className={styles.container}>
          {renderStepIndicator()}

          <form onSubmit={handleSubmit}>
            {renderStepContent()}

            <div className={styles.navigation}>
              {currentStep > 1 && (
                <button type="button" className={styles.backButton} onClick={handlePrev}>
                  Previous
                </button>
              )}

              {currentStep < 4 ? (
                <button type="button" className={styles.nextButton} onClick={handleNext}>
                  Next Step
                </button>
              ) : (
                <motion.button
                  type="submit"
                  className={styles.submitButton}
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? 'Submitting...' : 'Submit Application'}
                </motion.button>
              )}
            </div>
          </form>

          <div className={styles.footerNote}>🖤 You are not alone. We are here for you.</div>
        </div>
      </div>
    </div>
  )
}
