import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { convertTemp } from "../../functions/convertTemp";
import type { ForecastEntry } from "../../types/weather";
import type { ForecastProps } from "../../types/generic";
import { mapIcon } from "../../functions/mapIcon";
import { capitalize } from "../../functions/capitalize";
import "./dayItem.css"

export function DayItem ({ forecast }: ForecastProps) {
    const groups: Record<string, ForecastEntry[]> = {};
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const unit = useSelector((state: RootState) => state.unit);

    forecast.list.forEach((entry) => {
        const date = entry.dt_txt.split(" ")[0];
        if (!groups[date]) groups[date] = [];
        groups[date].push(entry);
    });

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
  
    const formatDay = (dateString: string) => {
      const date = new Date(dateString);
  
      if (date.toDateString() === today.toDateString()) {
        return "Dziś";
      }
  
      if (date.toDateString() === tomorrow.toDateString()) {
        return "Jutro";
      }
      const name = date.toLocaleDateString("pl-PL", { weekday: "long" });
      return name.charAt(0).toUpperCase() + name.slice(1);
    };
  
    const daysArray = Object.entries(groups)
      .slice(0, 6)
      .map(([date, entries]) => {
        const temperature_values = entries.map((e) => e.main.temp);
        const feels_like_values = entries.map((e) => e.main.feels_like);
        const pops = entries.map((e) => e.pop);
        const maxPop = Math.max(...pops);
        const rain_values = entries.map(e => e.rain?.["3h"] ?? 0);
        const total_rain = rain_values.reduce((sum, rain) => sum + rain, 0);
        const wind_speed = entries.map((e) => e.wind.speed);
        const pressure_values = entries.map((e) => e.main.pressure)
        const humidity_values = entries.map((e) => e.main.humidity)
        const cloudiness_values = entries.map((e) => e.clouds.all)
        const visibility_values = entries
            .map((e) => e.visibility)
            .filter((v) => v != null);
  
        return {
          label: formatDay(date),
          max_temp: Math.round(Math.max(...temperature_values)),
          min_temp: Math.round(Math.min(...temperature_values)),
          icon: entries[0].weather[0].icon,
          desc: entries[0].weather[0].description,
          wind_max_speed: Math.round(Math.max(...wind_speed)* 3.6),
          wind_min_speed: Math.round(Math.min(...wind_speed)* 3.6),
          pop: Math.round(maxPop * 100),
          rain: total_rain.toFixed(1),
          max_feels_like: Math.round(Math.max(...feels_like_values)),
          min_feels_like: Math.round(Math.min(...feels_like_values)),
          max_pressure: Math.round(Math.max(...pressure_values)),
          min_pressure: Math.round(Math.min(...pressure_values)),
          max_humidity: Math.round(Math.max(...humidity_values)),
          min_humidity: Math.round(Math.min(...humidity_values)),
          max_cloudiness: Math.round(Math.max(...cloudiness_values)),
          min_cloudiness: Math.round(Math.min(...cloudiness_values)),
          max_visibility: Math.round(Math.max(...visibility_values)/1000),
          min_visibility: Math.round(Math.min(...visibility_values)/1000)
        };
    });

    const rangeOrSingle = (min: number, max: number, unit = "") =>
        min === max ? `${max}${unit}` : `${min}-${max}${unit}`;

    console.log(groups)

    return (
        <div className="day-item-list">
            {daysArray.map((d, i) => (
            <div className="day-item-section"  key={d.label}>
                    <div className="day-item-overwiew" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                        <div className="day-item-header">
                            <span className="material-symbols-outlined day-item-icon">
                                {mapIcon(d.icon)}
                            </span>
                            <div className="day-item-header-info">
                                <p className="day-item-day-label">{d.label}</p>
                                <p className="day-item-weather-desc">{capitalize(d.desc)}</p>
                            </div>
                        </div>
                        <div className="day-item-temperature">
                            <p>{convertTemp(d.max_temp, unit)}° / {convertTemp(d.min_temp, unit)}°</p>
                        </div>
                    </div>
                    {openIndex === i && (
                    <div className="day-item-details">
                        <div className="day-item-details-data">
                            <div className="material-symbols-outlined day-details-icon">
                            air
                            </div>
                            <div className="hour-detail-text">
                                <p className="hour-detail-label">Wiatr</p>
                                <p className="hour-detail-value">{rangeOrSingle(d.wind_min_speed, d.wind_max_speed)} km/h</p>
                            </div>
                        </div>
                        <div className="day-item-details-data">
                            <div className="material-symbols-outlined day-details-icon">
                            thermostat
                            </div>
                            <div className="hour-detail-text">
                                <p className="hour-detail-label">Odczuwalna</p>
                                <p className="hour-detail-value">{convertTemp(d.max_feels_like, unit)}° / {convertTemp(d.min_feels_like, unit)}°</p>
                            </div>
                        </div>
                        <div className="day-item-details-data">
                            <div className="material-symbols-outlined day-details-icon">
                            device_thermostat
                            </div>
                            <div className="hour-detail-text">
                                <p className="hour-detail-label">Ciśnienie</p>
                                <p className="hour-detail-value">{rangeOrSingle(d.min_pressure, d.max_pressure)} hPa</p>
                            </div>
                        </div>
                        <div className="day-item-details-data">
                            <div className="material-symbols-outlined day-details-icon">
                            water_drop
                            </div>
                            <div className="hour-detail-text">
                                <p className="hour-detail-label">Szansa opadów</p>
                                <p className="hour-detail-value">{d.pop}%</p>
                            </div>
                        </div>
                        <div className="day-item-details-data">
                            <div className="material-symbols-outlined day-details-icon">
                            cloud
                            </div>
                            <div className="hour-detail-text">
                                <p className="hour-detail-label">Zachmurzenie</p>
                                <p className="hour-detail-value">{rangeOrSingle(d.min_cloudiness, d.max_cloudiness)} %</p>
                            </div>
                        </div>
                        <div className="day-item-details-data">
                            <div className="material-symbols-outlined day-details-icon">
                            rainy_light
                            </div>
                            <div className="hour-detail-text">
                                <p className="hour-detail-label">Opady</p>
                                <p className="hour-detail-value">{d.rain} mm</p>
                            </div>
                        </div>
                        <div className="day-item-details-data">
                            <div className="material-symbols-outlined day-details-icon">
                            humidity_percentage
                            </div>
                            <div className="hour-detail-text">
                                <p className="hour-detail-label">Wilgotność</p>
                                <p className="hour-detail-value">{rangeOrSingle(d.min_humidity, d.max_humidity)}%</p>
                            </div>
                        </div>
                        <div className="day-item-details-data">
                            <div className="material-symbols-outlined day-details-icon">
                            visibility
                            </div>
                            <div className="hour-detail-text">
                                <p className="hour-detail-label">Widoczność</p>
                                <p className="hour-detail-value">{rangeOrSingle(d.min_visibility, d.max_visibility)} km</p>
                            </div>
                        </div>
                    </div>
                    )}
            </div>
            ))}
        </div>
    )
}