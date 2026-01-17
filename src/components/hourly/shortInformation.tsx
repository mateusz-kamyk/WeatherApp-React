import "./shortInformation.css"
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { convertTemp } from "../../functions/convertTemp";
import { capitalize } from "../../functions/capitalize";
import type { WeatherProps } from "../../types/generic";

export function ShortInformation({ weather }: WeatherProps) {
    const unit = useSelector((state: RootState) => state.unit);

  return (
    <div className="actual-weather-short">
        <div className="short-weather-information">
            <h1 className="actual-temperature-short">
                {convertTemp(weather.main.temp, unit)}°
            </h1>
            <p className="weather-description-short">
            {capitalize(weather.weather[0].description)}
            </p>
        </div>
    </div>
  );
}