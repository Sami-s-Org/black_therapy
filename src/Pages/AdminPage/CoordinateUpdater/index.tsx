import { useState } from 'react'
import { updateAllCoordinates, updateTherapistCoordinates, updateCoachCoordinates } from '../../../utils/updateTherapistCoordinates'
import styles from '../admin.module.css'

export default function CoordinateUpdater() {
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [logs, setLogs] = useState<string[]>([])

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const handleUpdateAll = async () => {
    setLoading(true)
    setLogs([])
    setResults(null)
    
    // Override console.log to capture logs
    const originalLog = console.log
    console.log = (...args) => {
      const message = args.join(' ')
      addLog(message)
      originalLog(...args)
    }

    try {
      addLog('🚀 Starting bulk coordinate update...')
      const result = await updateAllCoordinates()
      setResults(result)
      addLog('✅ Update completed successfully!')
    } catch (error: any) {
      addLog(`❌ Error: ${error.message}`)
    } finally {
      console.log = originalLog
      setLoading(false)
    }
  }

  const handleUpdateTherapists = async () => {
    setLoading(true)
    setLogs([])
    setResults(null)
    
    const originalLog = console.log
    console.log = (...args) => {
      const message = args.join(' ')
      addLog(message)
      originalLog(...args)
    }

    try {
      addLog('🚀 Updating therapist coordinates...')
      const result = await updateTherapistCoordinates()
      setResults({ therapistResults: result })
      addLog('✅ Therapist update completed!')
    } catch (error: any) {
      addLog(`❌ Error: ${error.message}`)
    } finally {
      console.log = originalLog
      setLoading(false)
    }
  }

  const handleUpdateCoaches = async () => {
    setLoading(true)
    setLogs([])
    setResults(null)
    
    const originalLog = console.log
    console.log = (...args) => {
      const message = args.join(' ')
      addLog(message)
      originalLog(...args)
    }

    try {
      addLog('🚀 Updating coach coordinates...')
      const result = await updateCoachCoordinates()
      setResults({ coachResults: result })
      addLog('✅ Coach update completed!')
    } catch (error: any) {
      addLog(`❌ Error: ${error.message}`)
    } finally {
      console.log = originalLog
      setLoading(false)
    }
  }

  return (
    <div className={styles.w100}>
      <h2 style={{ marginBottom: '20px', color: '#a88757' }}>📍 Coordinate Updater</h2>
      
      <div style={{ marginBottom: '20px', padding: '15px', background: '#fff3cd', borderRadius: '8px', border: '1px solid #ffc107' }}>
        <p style={{ margin: 0, color: '#856404' }}>
          <strong>⚠️ Important:</strong> This tool adds latitude and longitude coordinates to therapists and coaches 
          who don't have location data. It uses predefined coordinates for major cities or Google's Geocoding API 
          for other locations.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
        <button 
          onClick={handleUpdateAll} 
          disabled={loading}
          style={{
            padding: '12px 24px',
            background: loading ? '#ccc' : '#a88757',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: '600',
            fontSize: '14px'
          }}
        >
          {loading ? '⏳ Updating...' : '🔄 Update All (Therapists + Coaches)'}
        </button>

        <button 
          onClick={handleUpdateTherapists} 
          disabled={loading}
          style={{
            padding: '12px 24px',
            background: loading ? '#ccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: '600',
            fontSize: '14px'
          }}
        >
          {loading ? '⏳ Updating...' : '👨‍⚕️ Update Therapists Only'}
        </button>

        <button 
          onClick={handleUpdateCoaches} 
          disabled={loading}
          style={{
            padding: '12px 24px',
            background: loading ? '#ccc' : '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: '600',
            fontSize: '14px'
          }}
        >
          {loading ? '⏳ Updating...' : '💪 Update Coaches Only'}
        </button>
      </div>

      {/* Logs Display */}
      {logs.length > 0 && (
        <div style={{ 
          marginBottom: '20px', 
          padding: '15px', 
          background: '#f8f9fa', 
          borderRadius: '8px',
          border: '1px solid #dee2e6',
          maxHeight: '400px',
          overflowY: 'auto'
        }}>
          <h3 style={{ marginTop: 0, marginBottom: '10px', fontSize: '16px' }}>📋 Update Log:</h3>
          <div style={{ fontFamily: 'monospace', fontSize: '12px' }}>
            {logs.map((log, index) => (
              <div key={index} style={{ marginBottom: '5px', color: '#495057' }}>
                {log}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results Display */}
      {results && (
        <div style={{ 
          padding: '20px', 
          background: '#d4edda', 
          borderRadius: '8px',
          border: '1px solid #c3e6cb'
        }}>
          <h3 style={{ marginTop: 0, marginBottom: '15px', color: '#155724' }}>✅ Update Summary</h3>
          
          {results.therapistResults && (
            <div style={{ marginBottom: '15px' }}>
              <h4 style={{ color: '#155724', marginBottom: '8px' }}>👨‍⚕️ Therapists:</h4>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#155724' }}>
                <li>Updated: {results.therapistResults.updated}</li>
                <li>Skipped (already had coordinates): {results.therapistResults.skipped}</li>
                <li>Failed: {results.therapistResults.failed}</li>
                <li>Total: {results.therapistResults.total}</li>
              </ul>
            </div>
          )}

          {results.coachResults && (
            <div>
              <h4 style={{ color: '#155724', marginBottom: '8px' }}>💪 Coaches:</h4>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#155724' }}>
                <li>Updated: {results.coachResults.updated}</li>
                <li>Skipped (already had coordinates): {results.coachResults.skipped}</li>
                <li>Failed: {results.coachResults.failed}</li>
                <li>Total: {results.coachResults.total}</li>
              </ul>
            </div>
          )}
        </div>
      )}

      <div style={{ marginTop: '20px', padding: '15px', background: '#d1ecf1', borderRadius: '8px', border: '1px solid #bee5eb' }}>
        <h4 style={{ marginTop: 0, color: '#0c5460' }}>ℹ️ How it works:</h4>
        <ol style={{ margin: 0, paddingLeft: '20px', color: '#0c5460' }}>
          <li>First checks predefined coordinates for major Pakistani and US cities (fastest)</li>
          <li>If not found, uses Google Geocoding API to convert address to coordinates</li>
          <li>Skips records that already have coordinates</li>
          <li>Updates Firestore with lat/lng values</li>
        </ol>
      </div>
    </div>
  )
}

