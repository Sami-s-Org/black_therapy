import { useEffect, useState } from 'react'
import HeaderBar from '../../Components/Headbar'
import styles from './kingTable.module.css'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../../Share/FireBase'
import { notifyError, notifySuccess } from '../../Components/Toast'
// resourcesData.js
export const resources = [
  {
    section: 'Trauma & Grief Healing Resources',
    items: [
      'Post-Traumatic Slave Syndrome, Dr. Joy DeGruy',
      'The Body Keeps The Score, Dr. Bessel van der Kolk',
      'GriefShare (Faith-based grief support groups)',
      'National Center for PTSD (Veterans Affairs resource)',
    ],
  },
  {
    section: 'Fatherhood & Family Support',
    items: [
      'National Fatherhood Initiative',
      'Fathers Incorporated',
      'Black Fathers Foundation',
      'Legacy Builders Foundation',
      'The Fatherhood Project (Massachusetts General Hospital)',
    ],
  },
  {
    section: 'Faith & Spiritual Growth',
    items: ['Dr. Myron Golden', 'Kingdom Men Ministry Networks (local churches, national men’s ministries)'],
  },
  {
    section: 'Financial Empowerment & Wealth Building',
    items: [
      'Dr. Myron Golden',
      'Earn Your Leisure',
      'The Budgetnista',
      'Minding My Black Business Podcast',
      'Operation HOPE Financial Coaching',
      'Greenwood Bank',
    ],
  },
  {
    section: 'Physical Health & Wellness',
    items: ['Black Men Run', 'My Brother’s Keeper Alliance', 'Black Men’s Health Initiative', 'Fit Fathers'],
  },
  {
    section: 'Career, Leadership & Mentorship',
    items: [
      '100 Black Men of America',
      'National Urban League Young Professionals',
      'National Society of Black Engineers (NSBE)',
      'The Executive Leadership Council',
    ],
  },
  {
    section: 'Community & Brotherhood',
    items: [
      'Barbershop Therapy Model',
      'Church Men’s Ministries',
      'Community Peer Support Groups',
      'Therapy for Black Men Peer Circles (COMING SOON)',
    ],
  },
  {
    section: 'Legal & Advocacy Support',
    items: ['NAACP Legal Defense Fund', 'Equal Justice Initiative', 'The Innocence Project'],
  },
  {
    section: 'Crisis & Immediate Help',
    items: [
      '988 Suicide & Crisis Lifeline (Call or Text 988)',
      'National Domestic Violence Hotline: 1-800-799-7233',
      'SAMHSA National Helpline: 1-800-662-HELP (4357)',
    ],
  },
  {
    section: 'Youth & Adolescent Programs',
    items: ["My Brother's Keeper Alliance", 'The Hidden Genius Project', 'I Am A Gentleman', 'Call Me MISTER Program'],
  },
  {
    section: 'Educational Support',
    items: [
      'Thurgood Marshall College Fund',
      'United Negro College Fund (UNCF)',
      'Jack and Jill of America Foundation',
      'Ron Brown Scholar Program',
    ],
  },
  {
    section: 'Veteran & Military Support',
    items: [
      'Minority Veterans of America',
      'National Association of Black Veterans (NABVETS)',
      'Vet Centers (nationwide counseling for combat veterans)',
    ],
  },
  {
    section: 'Incarceration & Reentry Support',
    items: [
      'The Fortune Society',
      'The Osborne Association',
      'Center for Employment Opportunities',
      'Prison Fellowship Ministries',
    ],
  },
]
const categories = [
  'Mental Health & Emotional Wellness',
  'Trauma & Grief Healing',
  'Fatherhood & Family Support',
  'Spiritual & Faith-Based Support',
  'Financial Empowerment & Wealth Building',
  'Physical Health & Wellness',
  'Career & Leadership Development',
  'Brotherhood & Community',
  'Legal Advocacy & Civil Rights',
  'Crisis & Immediate Support',
  'Youth & Adolescent Programs',
  'Educational Support',
  'Veteran & Military Support',
  'Incarceration & Reentry Support',
  'Other (Please Describe Below)',
]
type FormDataType = {
  name: string
  email: string
  resourceName: string
  website: string
  categories: string[]
  description: string
  whyHelpful: string
  consent: boolean
}
export default function KingTable() {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<FormDataType>({
    name: '',
    email: '',
    resourceName: '',
    website: '',
    categories: [],
    description: '',
    whyHelpful: '',
    consent: false,
  })

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox' && name === 'categories') {
      const updatedCategories = checked
        ? [...formData.categories, value]
        : formData.categories.filter((cat) => cat !== value)
      setFormData({ ...formData, categories: updatedCategories })
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked })
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.consent) {
      alert('Please provide your consent before submitting.')
      return
    }
    setLoading(true)
    try {
      await addDoc(collection(db, 'resourceSuggestions'), formData)
      notifySuccess('Thank you for your submission!')
      setFormData({
        name: '',
        email: '',
        resourceName: '',
        website: '',
        categories: [],
        description: '',
        whyHelpful: '',
        consent: false,
      })
    } catch (error) {
      console.error('Error submitting resource:', error)
      notifyError('Something went wrong. Please try again later.')
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div>
      <HeaderBar heading="King's Table" />
      <div className={styles.page}>
        <h1 className={styles.titleSuper}>Resources for Healing, Growth & Wholeness</h1>
        <p className={styles.Textsimple}>
          You are not alone on this journey. Healing is not only possible, it is your birthright. Here you will find
          resources to support your mind, body, soul, relationships, and purpose as you walk toward wholeness. May these
          sacred tools equip you with hope, wisdom, and strength as you reclaim your story.
        </p>
        <div className={styles.container}>
          {resources.map((section, index) => (
            <div key={index} className={styles.card}>
              <p className={styles.titlelist}>{section.section}</p>
              <ul className={styles.list}>
                {section.items.map((item, i) => (
                  <li key={i} className={styles.item}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className={styles.closingSection}>
          <p className={styles.encouragement}>
            You are seen. You are heard. You are deeply loved. This journey you are on is sacred. May every resource you
            find here become a seed of restoration, growth, and courage.
          </p>

          <div className={styles.ctaContainer}>
            <p className={styles.ctaText}>
              Need personal support? Our therapists and coaches are ready to walk with you.
            </p>
            <div className={styles.buttons}>
              <button className={styles.btn}>Find a Therapist</button>
              <button className={styles.btn}>Find a Coach</button>
            </div>
          </div>
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2 className={styles.titleSuper}>Help Us Expand The King’s Table</h2>
          <p className={styles.Textsimple}>
            At Therapy for Black Men, we believe healing grows stronger in community. If you know of a trusted,
            life-giving resource that could bless and support other Black men on their healing journey, we invite you to
            share it with us here. Every submission will be prayerfully reviewed and considered for inclusion in our
            King's Table Resource Guide.
          </p>

          <input
            className={styles.input}
            type="text"
            name="name"
            placeholder="Your Name (Optional)"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            className={styles.input}
            type="email"
            name="email"
            placeholder="Email Address (Optional)"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            className={styles.input}
            type="text"
            name="resourceName"
            placeholder="Name of Resource You’re Suggesting"
            value={formData.resourceName}
            onChange={handleChange}
            required
          />
          <input
            className={styles.input}
            type="text"
            name="website"
            placeholder="Website Link (if applicable)"
            value={formData.website}
            onChange={handleChange}
          />

          <div className={styles.checkboxGroup}>
            <p className={styles.label}>Resource Category (Select One or More):</p>
            {categories.map((cat, i) => (
              <div key={i} className={styles.checkboxLabel}>
                <input
                  style={{ padding: '0px', width: '20px' }}
                  type="checkbox"
                  name="categories"
                  value={cat}
                  checked={formData.categories.includes(cat)}
                  onChange={handleChange}
                />
                {cat}
              </div>
            ))}
          </div>

          <textarea
            className={styles.textarea}
            name="description"
            placeholder="Brief Description of the Resource"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            required
          />

          <textarea
            className={styles.textarea}
            name="whyHelpful"
            placeholder="Why Do You Believe This Resource Would Help Black Men?"
            rows={4}
            value={formData.whyHelpful}
            onChange={handleChange}
            required
          />

          <div className={styles.consent}>
            <input
              style={{ padding: '0px', width: '20px' }}
              type="checkbox"
              name="consent"
              checked={formData.consent}
              onChange={handleChange}
            />
            I understand that not all suggested resources will be included, but I submit this resource for prayerful
            consideration and review.
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Suggestion'}
          </button>
        </form>
      </div>
    </div>
  )
}
