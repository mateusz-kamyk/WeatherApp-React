import "./daysForecast.css";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { convertTemp } from "../../functions/convertTemp";
import type { ForecastEntry } from "../../types/weather";
import type { ForecastProps } from "../../types/generic";
import { mapIcon } from "../../functions/mapIcon";

export function DaysForecast({ forecast }: ForecastProps) {
  const groups: Record<string, ForecastEntry[]> = {};
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
    .slice(0, 5)
    .map(([date, entries]) => {
      const temps = entries.map((e) => e.main.temp);
      const pops = entries.map((e) => e.pop);
      const maxPop = Math.max(...pops);

      return {
        label: formatDay(date),
        max: Math.round(Math.max(...temps)),
        min: Math.round(Math.min(...temps)),
        icon: entries[0].weather[0].icon,
        pop: maxPop,
      };
    });

    return (
        <div className="days-section">
          <div className="days-box">
            <p className="days-title">PROGNOZA NA 5 DNI</p>
            <div className="days-list">
              {daysArray.map((d) => (
                <div className="days-item" key={d.label}>
                  <p className="days-label">{d.label}</p>
                  <span className="material-symbols-outlined days-icon">
                    {mapIcon(d.icon)}
                    {d.pop > 0 ? (
                    <p className="day-precipitation-probability">
                      {Math.round(d.pop * 100)}%
                    </p>
                    ) : (
                      <div></div>
                    )}
                  </span>
                  <div className="max-temp">{convertTemp(d.max, unit)}°</div>
                  <div className="min-temp">{convertTemp(d.min, unit)}°</div>
                </div>
              ))}
            </div>
          </div>
        </div>
    );
}
