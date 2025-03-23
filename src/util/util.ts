import { location, park } from "../types/types";

export function getCurrentLocation(): Promise<location> {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const origin: location = {
            latLng: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            },
          };
          resolve(origin);
        },
        (error) => {
          reject(error);
        }
      );
    } else {
      reject(new Error("Geolocation is not available"));
    }
  });
}

export async function sortedParks(parks: park[]) {
  const origin = await getCurrentLocation();
  const sortedParks = parks.sort((a, b) => {
    const distA = Math.sqrt(
      Math.pow(a.location.latLng.latitude - origin.latLng.latitude, 2) +
        Math.pow(a.location.latLng.longitude - origin.latLng.longitude, 2)
    );
    const distB = Math.sqrt(
      Math.pow(b.location.latLng.latitude - origin.latLng.latitude, 2) +
        Math.pow(b.location.latLng.longitude - origin.latLng.longitude, 2)
    );
    return distA - distB;
  });
  return sortedParks;
}

export const metersToMiles = (meters: number) => {
    const distance = meters * 0.000621371
    const r1 = Math.round(distance * 10);
    return r1 / 10;
}

export const getHourMinutes = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}:${minutes}`;
}