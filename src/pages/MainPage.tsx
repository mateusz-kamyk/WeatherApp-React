import { LoadWeather } from "../functions/loadWeather";
import { useNavigate } from "react-router-dom";
import { LocalizationButton } from "../components/topbar/localizationButton";
import { SettingsButton } from "../components/topbar/settingsButton";
import { MainInformation } from "../components/home/mainInformation";
import { ActualDetails } from "../components/home/actualDetails";
import { HourlyForecast } from "../components/home/hourlyForecast";
import { DaysForecast } from "../components/home/daysForecast";

export function WeatherPage() {
  const navigate = useNavigate();

  const { weather, forecast } = LoadWeather();

  if (!weather || !forecast) {
    return <p style={{ color: "white" }}>Ładowanie...</p>;
  }

  return (
    <div>
      <div className="header">
        <LocalizationButton />
        <SettingsButton />
      </div>
      <div className="actual-weather">
        <MainInformation weather={weather} />
      </div>
      <ActualDetails weather={weather} />
      <span className="hourly-forecast" onClick={() => navigate("/hourlyForecast")}>
        <HourlyForecast forecast={forecast} />
      </span >
      <span className="daily-forecast" onClick={() => navigate("/dailyForecast")}>
      <DaysForecast forecast={forecast} />
      </span>
    </div>
  );
}
