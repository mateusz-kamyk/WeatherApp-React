import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WeatherPage } from "./pages/MainPage";
import { LocalizationPage } from "./pages/LocalizationPage";
import { HourlyForecastPage } from "./pages/HourlyForecastPage";
import { DailyForecastPage } from "./pages/DailyForecastPage";
import { SettingsPage } from "./pages/SettingsPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<WeatherPage />} />
        <Route path="/localization" element={<LocalizationPage />} />
        <Route path="/hourlyForecast" element={<HourlyForecastPage />} />
        <Route path="/dailyForecast" element={<DailyForecastPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  );
}