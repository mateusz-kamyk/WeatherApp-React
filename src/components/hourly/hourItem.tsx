import "./hourItem.css";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { convertTemp } from "../../functions/convertTemp";
import { mapIcon } from "../../functions/mapIcon";
import type { HourlyForecastProps} from "../../types/generic";

export function HourlyForecast({ forecast, selectedIndex, onSelect }: HourlyForecastProps) {
  const nextHours = forecast.list.slice(0, 6);
  const unit = useSelector((state: RootState) => state.unit);
  const getHourItemClass = (i: number) =>
    `hour-item ${i === selectedIndex ? "active-hour" : ""}`;

  return (
    <div className="hourly-section">
        <div className="hourly-list">
          {nextHours.map((h, i) => (
            <div className={getHourItemClass(i)} key={i}onClick={() => onSelect(i)}>
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
              <p className="hour-temp">
                {convertTemp(h.main.temp, unit)}°
              </p>
            </div>
          ))}
        </div>
    </div>
  );
}
