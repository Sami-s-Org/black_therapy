// Geocoding utility to convert addresses to coordinates

interface GeocodeResult {
  lat: number
  lng: number
  formattedAddress: string
}

/**
 * Convert an address string to latitude and longitude using Google Geocoding API
 */
export const geocodeAddress = async (address: string): Promise<GeocodeResult | null> => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

  if (!apiKey) {
    console.error('Google Maps API key is missing')
    return null
  }

  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`
    )

    const data = await response.json()

    if (data.status === 'OK' && data.results.length > 0) {
      const result = data.results[0]
      return {
        lat: result.geometry.location.lat,
        lng: result.geometry.location.lng,
        formattedAddress: result.formatted_address,
      }
    } else {
      console.error('Geocoding failed:', data.status)
      return null
    }
  } catch (error) {
    console.error('Error geocoding address:', error)
    return null
  }
}


