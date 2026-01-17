import "./hourlyForecast.css";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { convertTemp } from "../../functions/convertTemp";
import { mapIcon } from "../../functions/mapIcon";
import type { ForecastProps } from "../../types/generic";

export function HourlyForecast({ forecast }: ForecastProps) {
  const nextHours = forecast.list.slice(0, 6);
  const unit = useSelector((state: RootState) => state.unit);

  return (
    <div className="hourly-section">
      <div className="hourly-box">
        <p className="hourly-title">PROGNOZA GODZINOWA</p>

        <div className="hourly-list">
          {nextHours.map((h, i) => (
            <div className="hour-items" key={i}>
              <p className="hour-label">
                {new Date(h.dt * 1000).getHours()}:00
              </p>
              <span className="material-symbols-outlined hour-icon">
                {mapIcon(h.weather[0].icon)}
              </span>
              {h.pop >= 0.05 && (
                <p className="precipitation-probability">
                  {Math.round(h.pop * 100)}%
                </p>
              )}
              <p className="hour-temps">
                {convertTemp(h.main.temp, unit)}°
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
