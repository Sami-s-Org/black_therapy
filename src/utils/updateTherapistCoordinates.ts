/**
 * Bulk update script to add coordinates to existing therapists/coaches
 * Run this once to update all existing records
 */

import { collection, getDocs, doc, updateDoc } from 'firebase/firestore'
import { db } from '../Share/FireBase'
import { geocodeAddress } from './geocoding'

interface TherapistOrCoach {
  id: string
  location: string
  lat?: number
  lng?: number
}

export const updateTherapistCoordinates = async () => {
  try {
    console.log('🔄 Starting bulk update for therapists...')
    const therapistsRef = collection(db, 'therapists')
    const snapshot = await getDocs(therapistsRef)
    
    let updated = 0
    let skipped = 0
    let failed = 0

    for (const docSnap of snapshot.docs) {
      const data = docSnap.data() as TherapistOrCoach
      
      // Skip if already has coordinates
      if (data.lat && data.lng) {
        console.log(`⏭️  Skipping ${docSnap.id} - already has coordinates`)
        skipped++
        continue
      }

      if (!data.location) {
        console.log(`⚠️  Skipping ${docSnap.id} - no location`)
        failed++
        continue
      }

      // Get coordinates using Google Geocoding API
      console.log(`🌐 Geocoding ${data.location}...`)
      const geocoded = await geocodeAddress(data.location)
      let coordinates = null
      if (geocoded) {
        coordinates = { lat: geocoded.lat, lng: geocoded.lng }
      }
      // Add delay to avoid hitting rate limits
      await new Promise(resolve => setTimeout(resolve, 200))

      if (coordinates) {
        await updateDoc(doc(db, 'therapists', docSnap.id), {
          lat: coordinates.lat,
          lng: coordinates.lng,
        })
        console.log(`✅ Updated ${docSnap.id}: ${data.location} -> ${coordinates.lat}, ${coordinates.lng}`)
        updated++
      } else {
        console.log(`❌ Failed to geocode ${docSnap.id}: ${data.location}`)
        failed++
      }
    }

    console.log('\n📊 Therapists Update Summary:')
    console.log(`   ✅ Updated: ${updated}`)
    console.log(`   ⏭️  Skipped: ${skipped}`)
    console.log(`   ❌ Failed: ${failed}`)
    console.log(`   📍 Total: ${snapshot.docs.length}`)

    return { updated, skipped, failed, total: snapshot.docs.length }
  } catch (error) {
    console.error('Error updating therapists:', error)
    throw error
  }
}

export const updateCoachCoordinates = async () => {
  try {
    console.log('🔄 Starting bulk update for coaches...')
    const coachesRef = collection(db, 'coaches')
    const snapshot = await getDocs(coachesRef)
    
    let updated = 0
    let skipped = 0
    let failed = 0

    for (const docSnap of snapshot.docs) {
      const data = docSnap.data() as TherapistOrCoach
      
      // Skip if already has coordinates
      if (data.lat && data.lng) {
        console.log(`⏭️  Skipping ${docSnap.id} - already has coordinates`)
        skipped++
        continue
      }

      if (!data.location) {
        console.log(`⚠️  Skipping ${docSnap.id} - no location`)
        failed++
        continue
      }

      // Get coordinates using Google Geocoding API
      console.log(`🌐 Geocoding ${data.location}...`)
      const geocoded = await geocodeAddress(data.location)
      let coordinates = null
      if (geocoded) {
        coordinates = { lat: geocoded.lat, lng: geocoded.lng }
      }
      // Add delay to avoid hitting rate limits
      await new Promise(resolve => setTimeout(resolve, 200))

      if (coordinates) {
        await updateDoc(doc(db, 'coaches', docSnap.id), {
          lat: coordinates.lat,
          lng: coordinates.lng,
        })
        console.log(`✅ Updated ${docSnap.id}: ${data.location} -> ${coordinates.lat}, ${coordinates.lng}`)
        updated++
      } else {
        console.log(`❌ Failed to geocode ${docSnap.id}: ${data.location}`)
        failed++
      }
    }

    console.log('\n📊 Coaches Update Summary:')
    console.log(`   ✅ Updated: ${updated}`)
    console.log(`   ⏭️  Skipped: ${skipped}`)
    console.log(`   ❌ Failed: ${failed}`)
    console.log(`   📍 Total: ${snapshot.docs.length}`)

    return { updated, skipped, failed, total: snapshot.docs.length }
  } catch (error) {
    console.error('Error updating coaches:', error)
    throw error
  }
}

// Run both updates
export const updateAllCoordinates = async () => {
  console.log('🚀 Starting bulk coordinate update...\n')
  
  const therapistResults = await updateTherapistCoordinates()
  console.log('\n')
  const coachResults = await updateCoachCoordinates()
  
  console.log('\n🎉 All updates complete!')
  console.log('\n📊 Total Summary:')
  console.log(`   Therapists: ${therapistResults.updated}/${therapistResults.total} updated`)
  console.log(`   Coaches: ${coachResults.updated}/${coachResults.total} updated`)
  
  return { therapistResults, coachResults }
}

