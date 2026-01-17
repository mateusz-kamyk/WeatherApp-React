import { GoBack } from "../components/topbar/goBack";
import { DayItem } from "../components/daily/dayItem";
import { LoadWeather } from "../functions/loadWeather";

export function DailyForecastPage() {

    const { weather, forecast } = LoadWeather();

    if (!weather || !forecast) {
        return <p style={{ color: "white" }}>Ładowanie...</p>;
      }

  return (
    <div>
        <div>
            <GoBack />
        </div>
        <div>
            <DayItem forecast={forecast} />
        </div>
    </div>
  );
}