import { API } from "../constants/weather";
import type { GeoapifyCity, FavoriteCity } from "../types/cities";

export async function addFavorite(
  city: GeoapifyCity,
  favorites: FavoriteCity[],
  setFavorites: (fav: FavoriteCity[]) => void
) {
  const weatherRes = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&lang=pl&appid=${API}`
  );
  const weather = await weatherRes.json();

  const favorite: FavoriteCity = {
    name: city.city || city.address_line1 || city.county,
    lat: city.lat,
    lon: city.lon,
    temp: Math.round(weather.main.temp),
    icon: weather.weather[0].icon,
    country: city.country,
  };

  const updated = [...favorites, favorite];
  setFavorites(updated);
  localStorage.setItem("favorites", JSON.stringify(updated));
}