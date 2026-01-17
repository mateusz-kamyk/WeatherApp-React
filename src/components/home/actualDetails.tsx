import "./actualDetails.css";
import type { WeatherProps } from "../../types/generic";

export function ActualDetails({ weather }: WeatherProps) {
  return (
    <div id="actual-info">
      <div className="detail-card">
        <p className="detail-label">Wiatr</p>
        <p className="detail-value">
          {Math.round(weather.wind.speed * 3.6)} km/h
        </p>
      </div>

      <div className="detail-card">
        <p className="detail-label">Wilgotność</p>
        <p className="detail-value">{weather.main.humidity}%</p>
      </div>

      <div className="detail-card detail-card-wide">
        <p className="detail-label">Ciśnienie</p>
        <p className="detail-value">{weather.main.pressure} hPa</p>
      </div>
    </div>
  );
}
