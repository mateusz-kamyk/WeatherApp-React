import "./mainInformation.css"
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { convertTemp } from "../../functions/convertTemp";
import { mapIcon } from "../../functions/mapIcon";
import { capitalize } from "../../functions/capitalize";
import type { WeatherProps } from "../../types/generic";

export function MainInformation({ weather }: WeatherProps) {
  const icon = mapIcon(weather.weather[0].icon);
  const unit = useSelector((state: RootState) => state.unit);

  return (
    <div id="main-weather-information">
      <span className="material-symbols-outlined weather-icon">
        {icon}
      </span>
      <h1 className="actual-temperature">
        {convertTemp(weather.main.temp, unit)}°
      </h1>
      <p className="weather-description">
        {capitalize(weather.weather[0].description)}
      </p>
      <p className="minmax">
        <span>Max: {convertTemp(weather.main.temp_max, unit)}°</span>{" "}
        <span>Min: {convertTemp(weather.main.temp_min, unit)}°</span>
      </p>
    </div>
  );
}