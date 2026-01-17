import { useState } from "react";
import { LoadWeather } from "../functions/loadWeather";
import { GoBack } from "../components/topbar/goBack";
import { ShortInformation } from "../components/hourly/shortInformation";
import { HourlyForecast } from "../components/hourly/hourItem";
import { HourDetail } from "../components/hourly/hourDetail";
import { HourlyTemperatureChart } from "../components/hourly/hourlyChart";
import "../components/hourly/hourlyChart.css";

export function HourlyForecastPage() {
  const { weather, forecast } = LoadWeather();
  const [selectedIndex, setSelectedIndex] = useState(0); 
  
  if (!weather || !forecast) {
    return <p style={{ color: "white" }}>Ładowanie...</p>;
  }

  const data = forecast.list.slice(0, 6).map(h => ({
    hour: new Date(h.dt * 1000).getHours() + ":00",
    temp: Math.round(h.main.temp)
  }));

  return (
    <div>
        <div>
        <GoBack />
        <ShortInformation weather={weather} />
        <HourlyTemperatureChart data={data} />
        </div>
        <span className="hourly-forecast">
        <HourlyForecast forecast={forecast} selectedIndex={selectedIndex} onSelect={setSelectedIndex} />
        </span>
        <div>
            <HourDetail forecast={forecast} index={selectedIndex} />
        </div>
    </div>
  );
}