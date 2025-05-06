// src/utils/geocoding.ts
import axios from 'axios';

// Get the Mapbox access token from environment variables
const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

/**
 * Converts coordinates to an address using Mapbox Geocoding API
 * @param {number} longitude - The longitude coordinate
 * @param {number} latitude - The latitude coordinate
 * @returns {Promise<string>} - The address as a string
 */
export async function coordinatesToAddress(longitude: number, latitude: number): Promise<string> {
  try {
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_ACCESS_TOKEN}&language=en`
    );

    if (response.data && response.data.features && response.data.features.length > 0) {
      return response.data.features[0].place_name;
    }
    
    return 'Unknown location';
  } catch (error) {
    console.error('Error in geocoding reverse lookup:', error);
    return 'Error getting location';
  }
}

/**
 * Converts an address to coordinates using Mapbox Geocoding API
 * @param {string} address - The address to convert
 * @returns {Promise<{longitude: number, latitude: number}>} - The coordinates
 */
export async function addressToCoordinates(address: string): Promise<{longitude: number, latitude: number} | null> {
  try {
    const encodedAddress = encodeURIComponent(address);
    const response = await axios.get(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedAddress}.json?access_token=${MAPBOX_ACCESS_TOKEN}&language=en`
    );

    if (response.data && response.data.features && response.data.features.length > 0) {
      const [longitude, latitude] = response.data.features[0].center;
      return { longitude, latitude };
    }
    
    return null;
  } catch (error) {
    console.error('Error in geocoding lookup:', error);
    return null;
  }
}

/**
 * Gets the traffic conditions between two points
 * @param {number} startLng - Starting point longitude
 * @param {number} startLat - Starting point latitude
 * @param {number} endLng - Ending point longitude
 * @param {number} endLat - Ending point latitude
 * @returns {Promise<{duration: number, distance: number, trafficLevel: string}>} - Traffic information
 */
export async function getTrafficConditions(
  startLng: number, 
  startLat: number, 
  endLng: number, 
  endLat: number
): Promise<{duration: number, distance: number, trafficLevel: string} | null> {
  try {
    const response = await axios.get(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${startLng},${startLat};${endLng},${endLat}?access_token=${MAPBOX_ACCESS_TOKEN}&annotations=duration,distance,speed`
    );

    if (response.data && response.data.routes && response.data.routes.length > 0) {
      const route = response.data.routes[0];
      const duration = route.duration / 60; // Convert to minutes
      const distance = route.distance / 1000; // Convert to kilometers
      
      // Calculate average speed
      const avgSpeed = distance / (duration / 60); // km/h
      
      // Determine traffic level based on average speed
      // This is a simplified logic - real implementation would be more sophisticated
      let trafficLevel = 'moderate';
      if (avgSpeed > 40) {
        trafficLevel = 'light';
      } else if (avgSpeed < 20) {
        trafficLevel = 'heavy';
      }
      
      return {
        duration,
        distance,
        trafficLevel
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error getting traffic conditions:', error);
    return null;
  }
}
