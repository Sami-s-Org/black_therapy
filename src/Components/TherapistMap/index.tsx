import { useMemo, useState, useEffect, useRef } from 'react'
import { GoogleMap, LoadScript } from '@react-google-maps/api'
import { MarkerClusterer } from '@googlemaps/markerclusterer'
import styles from './therapistMap.module.css'

interface TherapistLocation {
  id: string
  name: string
  specialization: string
  location: string
  price: string
  image: string
  lat: number
  lng: number
}

interface TherapistMapProps {
  therapists?: TherapistLocation[]
  onTherapistClick?: (therapist: TherapistLocation) => void
}



const TherapistMap = ({ therapists, onTherapistClick }: TherapistMapProps) => {
  const [mapLoaded, setMapLoaded] = useState(false)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([])
  const infoWindowRef = useRef<google.maps.InfoWindow | null>(null)
  const clustererRef = useRef<MarkerClusterer | null>(null)

  // Use provided therapists data
  const displayTherapists = useMemo(() => {
    return therapists || []
  }, [therapists])

  // Calculate center based on locations
  const mapCenter = useMemo(() => {
    if (displayTherapists.length === 0) {
      return { lat: 30.3753, lng: 69.3451 } // Center of Pakistan (default)
    }

    const avgLat =
      displayTherapists.reduce((sum, t) => sum + t.lat, 0) / displayTherapists.length
    const avgLng =
      displayTherapists.reduce((sum, t) => sum + t.lng, 0) / displayTherapists.length

    return { lat: avgLat, lng: avgLng }
  }, [displayTherapists])

  const mapContainerStyle = {
    width: '100%',
    height: '500px',
    borderRadius: '12px',
  }

  const mapOptions = {
    mapId: 'THERAPY_MAP_ID', // Required for AdvancedMarkerElement
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: true,
  }

  // Create markers when map loads or data changes
  useEffect(() => {
    const createMarkers = async () => {
      if (!map || !mapLoaded || displayTherapists.length === 0) return

      // Clear existing clusterer
      if (clustererRef.current) {
        clustererRef.current.clearMarkers()
      }

      // Clear existing markers
      markersRef.current.forEach((marker) => {
        marker.map = null
      })
      markersRef.current = []

      // Close existing info window
      if (infoWindowRef.current) {
        infoWindowRef.current.close()
      }

      try {
        // Import the Advanced Marker library
        const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary('marker') as google.maps.MarkerLibrary

        // Create info window if it doesn't exist
        if (!infoWindowRef.current) {
          infoWindowRef.current = new google.maps.InfoWindow()
        }

        // Create markers for each location
        displayTherapists.forEach((item) => {
          // Create custom pin with first initial
          const pinGlyph = new PinElement({
            // glyph: therapist.name.charAt(0),
            glyphColor: 'white',
            background: '#f70000',
            borderColor: '#8f7147',
            scale: 1,
          })

          // Create advanced marker
          const marker = new AdvancedMarkerElement({
            map,
            position: { lat: item.lat, lng: item.lng },
            content: pinGlyph.element,
            title: item.name,
          })

          // Add click listener
          marker.addListener('click', () => {
            const content = `
              <div style="padding: 10px; max-width: 250px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;">
                <img src="${item.image}" alt="${item.name}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 10px;" />
                <h3 style="font-size: 16px; font-weight: 600; margin: 0 0 8px 0; color: #333;">${item.name}</h3>
                <p style="font-size: 13px; margin: 4px 0; color: #555; line-height: 1.4;"><strong style="color: #a88757;">Specialization:</strong> ${item.specialization}</p>
                <p style="font-size: 13px; margin: 4px 0; color: #555; line-height: 1.4;"><strong style="color: #a88757;">Location:</strong> ${item.location}</p>
                <p style="font-size: 13px; margin: 4px 0; color: #555; line-height: 1.4;"><strong style="color: #a88757;">Price:</strong> ${item.price}</p>
                ${
                  onTherapistClick
                    ? `<button id="view-profile-${item.id}" style="width: 100%; padding: 8px 16px; margin-top: 10px; background: #a88757; color: white; border: none; border-radius: 6px; font-weight: 600; cursor: pointer; transition: all 0.3s ease; font-size: 13px;">View Profile</button>`
                    : ''
                }
              </div>
            `

            infoWindowRef.current?.setContent(content)
            infoWindowRef.current?.open(map, marker)

            // Add event listener to the button after info window opens
            if (onTherapistClick) {
              setTimeout(() => {
                const button = document.getElementById(`view-profile-${item.id}`)
                if (button) {
                  button.addEventListener('click', () => {
                    onTherapistClick(item)
                  })
                }
              }, 100)
            }
          })

          markersRef.current.push(marker)
        })

        // Add marker clusterer to manage the markers
        if (markersRef.current.length > 0) {
          clustererRef.current = new MarkerClusterer({
            markers: markersRef.current,
            map,
          })
        }
      } catch (error) {
        console.error('Error creating markers:', error)
      }
    }

    createMarkers()
  }, [map, mapLoaded, displayTherapists, onTherapistClick])

  // Replace with your actual Google Maps API key
  const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || 'AIzaSyDM-Edju6Xw160BQS89XGwhugZuQ247b9I'

  const handleMapLoad = (mapInstance: google.maps.Map) => {
    setMap(mapInstance)
    setMapLoaded(true)
  }

  return (
    <div className={styles.mapContainer}>
      <LoadScript googleMapsApiKey={API_KEY} loadingElement={<div className={styles.loading}>Loading map...</div>}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={mapCenter}
          zoom={displayTherapists.length === 1 ? 12 : 4}
          options={mapOptions}
          onLoad={handleMapLoad}
        />
      </LoadScript>

      <div className={styles.mapLegend}>
        <div className={styles.legendItem}>
          <span className={styles.legendIcon}>📍</span>
          <span className={styles.legendText}>
            {displayTherapists.length > 0 
              ? `Showing ${displayTherapists.length} location${displayTherapists.length !== 1 ? 's' : ''}`
              : 'No locations to display'}
          </span>
        </div>
      </div>
    </div>
  )
}

export default TherapistMap
export type { TherapistLocation }

