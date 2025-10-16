import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../Share/FireBase'
import styles from '../admin.module.css'

interface TherapyApplication {
  id: string
  fullName?: string
  email?: string
  phone?: string
  ageGroup?: string
  contactMethod?: string
  therapyType?: string
  therapistGender?: string
  reasons?: string[]
  previousTherapy?: string
  urgencyLevel?: string
  preferredTime?: string
  additionalInfo?: string
  financialHardship?: boolean
  consent?: boolean
  status?: string
  submittedAt?: any
}

export default function AdminFreeTheapy() {
  const [freeTherapyData, setFreeTherapyData] = useState<TherapyApplication[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const itemsPerPage = 6

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const snapshot = await getDocs(collection(db, 'freeTherapy'))
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        setFreeTherapyData(data)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const totalPages = Math.ceil(freeTherapyData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = freeTherapyData.slice(startIndex, startIndex + itemsPerPage)

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'N/A'
    try {
      return timestamp.toDate().toLocaleString()
    } catch {
      return 'Invalid Date'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return '#10b981'
      case 'rejected':
        return '#ef4444'
      case 'in review':
        return '#f59e0b'
      default:
        return '#6b7280'
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency?.toLowerCase()) {
      case 'immediate':
        return '#ef4444'
      case 'soon':
        return '#f59e0b'
      case 'flexible':
        return '#10b981'
      default:
        return '#6b7280'
    }
  }

  return (
    <div className={styles.w100}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>📋 Admin Panel - Free Therapy Applications</h1>
        {loading ? (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: '#6b7280',
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: '16px' }}>⏳</div>
            <div>Loading applications...</div>
          </div>
        ) : (
          <>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
                gap: '24px',
                marginBottom: '32px',
              }}
            >
              {paginatedData.map((item) => (
                <div
                  key={item.id}
                  style={{
                    background: 'white',
                    borderRadius: '12px',
                    padding: '24px',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                    border: '1px solid #f3f4f6',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)'
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: '20px',
                    }}
                  >
                    <h3
                      style={{
                        margin: '0',
                        fontSize: '1.25rem',
                        fontWeight: '600',
                        color: '#1f2937',
                      }}
                    >
                      {item.fullName || 'No Name'}
                    </h3>
                    <div
                      style={{
                        background: getStatusColor(item.status || 'pending'),
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        textTransform: 'uppercase',
                      }}
                    >
                      {item.status || 'Pending'}
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '16px',
                      marginBottom: '16px',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '4px' }}>Email</div>
                      <div style={{ fontWeight: '500', color: '#1f2937' }}>{item.email || 'N/A'}</div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '4px' }}>Phone</div>
                      <div style={{ fontWeight: '500', color: '#1f2937' }}>{item.phone || 'N/A'}</div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '4px' }}>Age Group</div>
                      <div style={{ fontWeight: '500', color: '#1f2937' }}>{item.ageGroup || 'N/A'}</div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '4px' }}>Contact Method</div>
                      <div style={{ fontWeight: '500', color: '#1f2937' }}>{item.contactMethod || 'N/A'}</div>
                    </div>
                  </div>

                  <div
                    style={{
                      background: '#f9fafb',
                      padding: '16px',
                      borderRadius: '8px',
                      marginBottom: '16px',
                    }}
                  >
                    <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '8px' }}>
                      Therapy Preferences
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Type:</span>
                        <div style={{ fontWeight: '500', color: '#1f2937' }}>{item.therapyType || 'N/A'}</div>
                      </div>
                      <div>
                        <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Therapist:</span>
                        <div style={{ fontWeight: '500', color: '#1f2937' }}>{item.therapistGender || 'N/A'}</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginBottom: '16px' }}>
                    <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '8px' }}>Main Concerns</div>
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '6px',
                      }}
                    >
                      {item.reasons?.map((reason, index) => (
                        <span
                          key={index}
                          style={{
                            background: '#e0e7ff',
                            color: '#3730a3',
                            padding: '4px 8px',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            fontWeight: '500',
                          }}
                        >
                          {reason}
                        </span>
                      )) || 'N/A'}
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '16px',
                      marginBottom: '16px',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '4px' }}>
                        Previous Therapy
                      </div>
                      <div style={{ fontWeight: '500', color: '#1f2937' }}>{item.previousTherapy || 'N/A'}</div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '4px' }}>Urgency</div>
                      <div
                        style={{
                          fontWeight: '500',
                          color: getUrgencyColor(item.urgencyLevel || ''),
                        }}
                      >
                        {item.urgencyLevel || 'N/A'}
                      </div>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px 0',
                      borderTop: '1px solid #f3f4f6',
                    }}
                  >
                    <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{formatDate(item.submittedAt)}</div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <span
                        style={{
                          background: item.financialHardship ? '#fef3c7' : '#f3f4f6',
                          color: item.financialHardship ? '#92400e' : '#6b7280',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                        }}
                      >
                        Financial Need: {item.financialHardship ? 'Yes' : 'No'}
                      </span>
                      <span
                        style={{
                          background: item.consent ? '#d1fae5' : '#f3f4f6',
                          color: item.consent ? '#065f46' : '#6b7280',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                        }}
                      >
                        Consent: {item.consent ? 'Yes' : 'No'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {paginatedData.length === 0 && (
              <div
                style={{
                  textAlign: 'center',
                  padding: '60px 20px',
                  background: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📭</div>
                <div style={{ fontSize: '1.125rem', fontWeight: '600', color: '#374151', marginBottom: '8px' }}>
                  No applications yet
                </div>
                <div style={{ color: '#6b7280' }}>Applications will appear here once submitted.</div>
              </div>
            )}

            {totalPages > 1 && (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '24px',
                  background: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                }}
              >
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    background: currentPage === 1 ? '#f3f4f6' : 'white',
                    color: currentPage === 1 ? '#9ca3af' : '#374151',
                    cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== 1) {
                      e.currentTarget.style.background = '#f9fafb'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentPage !== 1) {
                      e.currentTarget.style.background = 'white'
                    }
                  }}
                >
                  ← Previous
                </button>

                <span
                  style={{
                    fontSize: '0.875rem',
                    color: '#6b7280',
                    fontWeight: '500',
                  }}
                >
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '1px solid #d1d5db',
                    background: currentPage === totalPages ? '#f3f4f6' : 'white',
                    color: currentPage === totalPages ? '#9ca3af' : '#374151',
                    cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== totalPages) {
                      e.currentTarget.style.background = '#f9fafb'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentPage !== totalPages) {
                      e.currentTarget.style.background = 'white'
                    }
                  }}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
