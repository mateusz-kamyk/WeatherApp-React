import { API } from "../constants/weather";

export async function LoadFavoriteCityWeather(lat: number, lon: number) {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pl&appid=${API}`;
    const res = await fetch(url);
    return res.json();
  }