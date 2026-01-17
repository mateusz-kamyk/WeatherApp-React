import type { GeoapifyCity } from "../types/cities";
import { GEOAPI } from "../constants/weather";

export async function searchCity(query: string): Promise<GeoapifyCity[]> {
  if (query.trim().length < 3) return [];

  const url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
    query
  )}&limit=4&type=city&lang=pl&format=json&apiKey=${GEOAPI}`;

  const res = await fetch(url);
  const data = await res.json();

  return data.results || [];
}