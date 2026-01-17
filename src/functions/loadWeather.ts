import { useEffect, useState } from "react";
import { API, DEFAULT_COORDS } from "../constants/weather";
import type { WeatherData, ForecastData } from "../types/weather";

export function LoadWeather() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);

  async function loadWeather(lat: number, lon: number) {
    const currentRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&lang=pl&appid=${API}`
    );
    const currentData: WeatherData = await currentRes.json();

    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&lang=pl&appid=${API}`
    );
    const forecastData: ForecastData = await forecastRes.json();

    setWeather(currentData);
    setForecast(forecastData);
  }

  useEffect(() => {
    const saved = localStorage.getItem("currentCity");

    if (saved) {
      const city = JSON.parse(saved);
      loadWeather(city.lat, city.lon);
    } else {
      const { lat, lon } = DEFAULT_COORDS;
      loadWeather(lat, lon);
    }
  }, []);

  return { weather, forecast, loadWeather };
}