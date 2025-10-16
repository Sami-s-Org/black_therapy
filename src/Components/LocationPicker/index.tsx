import { useState, useCallback } from 'react'
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'
import styles from './locationPicker.module.css'

interface LocationPickerProps {
  initialLat?: number
  initialLng?: number
  onLocationChange: (lat: number, lng: number, address: string) => void
  address?: string
}

const LocationPicker = ({ initialLat = 31.5497, initialLng = 74.3436, onLocationChange, address = '' }: LocationPickerProps) => {
  const [markerPosition, setMarkerPosition] = useState({ lat: initialLat, lng: initialLng })
  const [mapCenter, setMapCenter] = useState({ lat: initialLat, lng: initialLng })
  const [searchAddress, setSearchAddress] = useState(address)
  const [isGeocoding, setIsGeocoding] = useState(false)

  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || ''

  const mapContainerStyle = {
    width: '100%',
    height: '400px',
    borderRadius: '8px',
  }

  const mapOptions = {
    mapId: 'LOCATION_PICKER_MAP',
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: true,
    fullscreenControl: true,
  }

  // Handle map click to set marker
  const handleMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat()
      const lng = event.latLng.lng()
      setMarkerPosition({ lat, lng })
      
      // Reverse geocode to get address
      reverseGeocode(lat, lng)
    }
  }, [])

  // Reverse geocode to get address from coordinates
  const reverseGeocode = async (lat: number, lng: number) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`
      )
      const data = await response.json()
      
      if (data.status === 'OK' && data.results[0]) {
        const address = data.results[0].formatted_address
        setSearchAddress(address)
        onLocationChange(lat, lng, address)
      } else {
        onLocationChange(lat, lng, `${lat.toFixed(6)}, ${lng.toFixed(6)}`)
      }
    } catch (error) {
      console.error('Reverse geocoding error:', error)
      onLocationChange(lat, lng, `${lat.toFixed(6)}, ${lng.toFixed(6)}`)
    }
  }

  // Search address and move map to that location
  const handleAddressSearch = async () => {
    if (!searchAddress.trim()) return

    setIsGeocoding(true)
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(searchAddress)}&key=${API_KEY}`
      )
      const data = await response.json()

      if (data.status === 'OK' && data.results[0]) {
        const location = data.results[0].geometry.location
        const lat = location.lat
        const lng = location.lng
        
        setMarkerPosition({ lat, lng })
        setMapCenter({ lat, lng })
        onLocationChange(lat, lng, data.results[0].formatted_address)
      } else {
        alert('Address not found. Please try a different search or click on the map.')
      }
    } catch (error) {
      console.error('Geocoding error:', error)
      alert('Error searching for address. Please try again.')
    } finally {
      setIsGeocoding(false)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.instructions}>
        <p>📍 <strong>Set Your Exact Location:</strong></p>
        <ul>
          <li>Search for your address below, OR</li>
          <li>Click directly on the map where your practice/office is located</li>
        </ul>
      </div>

      {/* Address Search */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search for your address (e.g., '123 Main St, Lahore, Pakistan')"
          value={searchAddress}
          onChange={(e) => setSearchAddress(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddressSearch()}
        />
        <button 
          type="button"
          onClick={handleAddressSearch} 
          className={styles.searchButton}
          disabled={isGeocoding}
        >
          {isGeocoding ? '🔍 Searching...' : '🔍 Search'}
        </button>
      </div>

      {/* Map */}
      <div className={styles.mapWrapper}>
        <LoadScript googleMapsApiKey={API_KEY}>
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={mapCenter}
            zoom={15}
            options={mapOptions}
            onClick={handleMapClick}
          >
            <Marker
              position={markerPosition}
              draggable={true}
              onDragEnd={(e) => {
                if (e.latLng) {
                  const lat = e.latLng.lat()
                  const lng = e.latLng.lng()
                  setMarkerPosition({ lat, lng })
                  reverseGeocode(lat, lng)
                }
              }}
            />
          </GoogleMap>
        </LoadScript>
      </div>

      {/* Coordinates Display */}
      <div className={styles.coordinatesDisplay}>
        <strong>Selected Location:</strong>
        <div className={styles.coordsInfo}>
          <span>Latitude: {markerPosition.lat.toFixed(6)}</span>
          <span>Longitude: {markerPosition.lng.toFixed(6)}</span>
        </div>
        {searchAddress && (
          <div className={styles.addressInfo}>
            <small>📍 {searchAddress}</small>
          </div>
        )}
      </div>
    </div>
  )
}

export default LocationPicker

