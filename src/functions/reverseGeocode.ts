import { GEOAPI } from "../constants/weather";
import type { GeoapifyCity } from "../types/cities";

export async function reverseGeocode(lat: number, lon: number): Promise<GeoapifyCity | null> {
  const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&lang=pl&type=city&format=json&apiKey=${GEOAPI}`;
  const res = await fetch(url);
  const data = await res.json();

  if (!data.results || data.results.length === 0) return null;

  const city = data.results[0];

  return {
    city: city.city,
    address_line1: city.address_line1,
    county: city.county,
    lat: city.lat,
    lon: city.lon,
    country: city.country,
  };
}